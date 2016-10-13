import * as utils from '../common/utils';
import vector     from '../common/vector';
import detector   from '../common/detector';
import Events     from '../common/Events';
import Rect       from '../geometry/Rect';
import Point      from '../geometry/Point';

import Model    from '../core/Model';
import Cell     from '../cells/Cell';
import LinkView from '../views/LinkView';
import NodeView from '../views/NodeView';

import RootChange      from '../changes/RootChange';
import ChildChange     from '../changes/ChildChange';
import SizeChange      from '../changes/SizeChange';
import VisibleChange   from '../changes/VisibleChange';
import PositionChange  from '../changes/PositionChange';
import RotationChange  from '../changes/RotationChange';
import TerminalChange  from '../changes/TerminalChange';
import GeometryChange  from '../changes/GeometryChange';
import CollapseChange  from '../changes/CollapseChange';
import AttributeChange from '../changes/AttributeChange';


// const
// -----
const win = window;
const doc = win.document;

const classNames = {
    wrap: 'pane-wrap',
    stage: 'pane-stage',
    svg: 'pane-svg',
    viewport: 'pane-viewport',
    htmlPane: 'pane-html',
    rawPane: 'pane-raw'
};

// the default options for paper
const defaultOptions = {
    // container: null,
    // model: null,
    width: '100%',
    height: '100%',
    tx: 0,
    ty: 0,
    sx: 1,
    sy: 1,
    gridSize: 1,

    // number of mouseMove events after which the
    // pointerClick event will be still triggered.
    clickThreshold: 0,
    isValidEvent: null,
    eventDelegate: null
};

let idCounter = 0;


// Paper
// -----

class Paper extends Events {

    constructor(options) {

        super();

        this.id = 'paper-' + idCounter++;

        // You should call `init` manually when `options` is empty.
        // That's useful when you want to listen life-cycle events.
        if (options) {
            this.init(options);
        }
    }


    // events
    // ------
    //  - paper:configure
    //  - paper:ensureElements
    //  - paper:createPanes
    //  - paper:setup
    //  - paper:init
    //  - paper:destroy
    //  - paper:resize
    //  - paper:scale
    //  - paper:translate


    configure(options) {

        this.options = utils.merge({}, defaultOptions, options);
        this.trigger('paper:configure', this.options);

        return this;
    }

    init(options = {}) {

        this.configure(options);
        this.container = options.container;

        if (!this.container) {
            throw new Error('Initialize error: invalid container');
        }

        options = this.options;

        this.ensureElement()
            .createPanes()
            .setup()
            .resize(options.width, options.height)
            .translate(options.tx, options.ty)
            .scale(options.sx, options.sy)
            .setModel(options.model);

        this.trigger('paper:init', this.options);

        return this;
    }

    ensureElement() {

        this.wrap     = utils.createElement('div');
        this.stage    = utils.createElement('div');
        this.svg      = utils.createSvgDocument();
        this.viewport = utils.createSvgElement('g');

        utils.addClass(this.wrap, classNames.wrap);
        utils.addClass(this.stage, classNames.stage);
        utils.addClass(this.svg, classNames.svg);
        utils.addClass(this.viewport, classNames.viewport);

        this.svg.appendChild(this.viewport);
        this.stage.appendChild(this.svg);
        this.wrap.appendChild(this.stage);
        this.container.appendChild(this.wrap);

        this.trigger('paper:ensureElements');

        return this;
    }

    getContainer() {

        return this.container;
    }

    getWrap() {

        return this.wrap;
    }

    getStage() {

        return this.stage;
    }

    getSvg() {

        return this.svg;
    }

    getViewport() {

        return this.viewport;
    }

    getEventDelegate() {

        let eventDelegate = this.eventDelegate;

        if (!eventDelegate) {

            eventDelegate = this.options.eventDelegate;

            if (utils.isFunction(eventDelegate)) {
                eventDelegate = eventDelegate.call(this);
            }

            this.eventDelegate = eventDelegate || this.getWrap();
        }

        return this.eventDelegate;
    }

    createPanes() {

        const viewport = this.viewport;
        const stage    = this.stage;

        this.backgroundPane = viewport.appendChild(utils.createSvgElement('g'));

        // container of links
        this.linkPane = viewport.appendChild(utils.createSvgElement('g'));

        // container of nodes
        this.drawPane = viewport.appendChild(utils.createSvgElement('g'));

        // layer above the drawing pane, for controllers and handlers
        this.controlPane = viewport.appendChild(utils.createSvgElement('g'));

        // layer above the drawing pane and controller pane, for decorators
        this.decoratePane = viewport.appendChild(utils.createSvgElement('g'));

        // html pane for hold html element, with scale and translation
        this.htmlPane = stage.appendChild(utils.createElement('div'));

        utils.addClass(this.htmlPane, classNames.htmlPane);

        // whithout scale and translation
        this.rawPane = stage.appendChild(utils.createElement('div'));

        utils.addClass(this.rawPane, classNames.rawPane);

        this.trigger('paper:createPanes');

        return this;
    }

    setup() {

        let eventDelegate = this.getEventDelegate();

        utils.addEventListener(eventDelegate, 'contextmenu', this.onContextMenu.bind(this));
        utils.addEventListener(eventDelegate, 'dblclick', this.onDblClick.bind(this));
        utils.addEventListener(eventDelegate, 'click', this.onClick.bind(this));
        utils.addEventListener(eventDelegate, 'mouseenter', '.pane-cell', this.onCellMouseEnter.bind(this));
        utils.addEventListener(eventDelegate, 'mouseleave', '.pane-cell', this.onCellMouseLeave.bind(this));
        utils.addEventListener(eventDelegate, 'mouseover', '.pane-cell', this.onCellMouseOver.bind(this));
        utils.addEventListener(eventDelegate, 'mouseout', '.pane-cell', this.onCellMouseOut.bind(this));

        // utils.addEventListener(eventDelegate, detector.IS_TOUCH ? 'touchstart' : 'mousedown', this.onPointerDown.bind(this));
        utils.addEventListener(eventDelegate, 'mousedown', this.onPointerDown.bind(this));


        // Hold the value when mouse has been moved: when mouse moved,
        // no click event will be triggered.
        this.mouseMoved = 0;

        // Disables built-in pan and zoom in IE10 and later
        if (detector.IS_POINTER) {
            this.container.style.msTouchAction = 'none';
        }

        this.trigger('paper:setup');

        return this;
    }

    getModel() {

        return this.model;
    }

    setModel(model = new Model()) {

        // one model can be used in different papers

        this.model = model;
        this.model.on('change', this.handleChanges, this);

        this.reValidate();

        return this;
    }

    destroy() {

        this.trigger('paper:destroy');

        utils.removeElement(this.wrap);

        if (detector.IS_POINTER) {
            this.container.style.msTouchAction = '';
        }

        let model = this.getModel();
        if (model && !model.destroyed) {
            model.destroy();
        }

        utils.destroy(this);
    }

    registerHandlers(handlers) {

        handlers = utils.isArray(handlers) ? handlers : [handlers];

        this.handlers      = this.handlers || [];
        this.handlerByName = this.handlerByName || {};

        utils.forEach(handlers, function (handler) {
            if (this.handlerByName[handler.name]) {
                throw new Error('handler with name "' + handler.name + '" is already registered');
            }
            // handler = utils.isFunction(handler) ? new handler(that) : handler;
            this.handlers.push(handler);
            this.handlerByName[handler.name] = handler;
        }, this);

        return this;
    }


    // transform
    // ---------

    resize(width, height, relative) {

        if (!utils.isNil(width) && !utils.isNil(height)) {

            let isPercent = utils.isPercentage(width);
            if (isPercent) {
                width = utils.toFloat(width, true) * this.container.clientWidth;
            }

            isPercent = utils.isPercentage(height);
            if (isPercent) {
                height = utils.toFloat(height, true) * this.container.clientHeight;
            }

            if (relative) {
                width += utils.isNil(this.width) ? 0 : this.width;
                height += utils.isNil(this.height) ? 0 : this.height;
            }

            width  = Math.round(width);
            height = Math.round(height);

            vector(this.svg).attr({
                width,
                height
            });

            utils.setStyle(this.stage, {
                width: width + 'px',
                height: height + 'px'
            });

            this.width  = width;
            this.height = height;

            this.trigger('paper:resize', width, height);
        }

        return this;
    }

    resizeTo(width, height) {

        return this.resize(width, height, false);
    }

    resizeBy(width, height) {

        return this.resize(width, height, true);
    }

    translate(tx, ty, relative) {

        if (!utils.isNil(tx) && !utils.isNil(ty)) {

            if (relative) {
                tx += utils.isNil(this.tx) || 0;
                ty += utils.isNil(this.ty) || 0;
            }

            vector(this.viewport).translate(tx, ty);

            // translate htmlPane
            utils.setStyle(this.htmlPane, {
                top: ty + 'px',
                left: tx + 'px'
            });

            this.tx = tx;
            this.ty = ty;

            this.trigger('paper:translate', tx, ty);
        }

        return this;
    }

    translateTo(x, y) {

        return this.translate(x, y, false);
    }

    translateBy(x, y) {

        return this.translate(x, y, true);
    }

    scale(sx, sy, ox = 0, oy = 0) {

        sy = sy || sx;

        if (sx && sy) {

            let vViewport = vector(this.viewport);

            // remove previous transform so that the new scale is not affected
            // by previous scales, especially the old translate() does not
            // affect the new translate if an origin is specified.
            vViewport.attr('transform', '');

            let oldTx = this.tx;
            let oldTy = this.ty;

            if (ox || oy || oldTx || oldTy) {

                let newTx = oldTx - ox * (sx - 1);
                let newTy = oldTy - oy * (sy - 1);
                this.translateTo(newTx, newTy);
            }

            vViewport.scale(sx, sy);
            // scale htmlPane
            utils.setStyle(this.htmlPane, {
                transform: 'translate3d(0, 0, 0) scale3d(' + sx + ',' + sy + ', 1)'
            });


            this.sx = sx;
            this.sy = sy;

            this.trigger('paper:scale', sx, sy, ox, oy);
        }

        return this;
    }

    getContentBBox(withoutTransformations) {

        if (withoutTransformations) {

            return vector(this.viewport).getBBox(true, this.svg);
        }

        let rect = this.viewport.getBoundingClientRect();

        // Using Screen CTM was the only way to get the real viewport
        // bounding box working in both Google Chrome and Firefox.
        let screenCTM = this.viewport.getScreenCTM();

        // for non-default origin we need to take the
        // viewport translation into account
        let viewportCTM = this.viewport.getCTM();

        return Rect.fromRect({
            x: rect.left - screenCTM.e + viewportCTM.e,
            y: rect.top - screenCTM.f + viewportCTM.f,
            width: rect.width,
            height: rect.height
        });
    }

    fitToContent(frameWidth, frameHeight, padding, options) {

        // Expand/shrink the paper to fit the content. Snap the width/height to
        // the grid defined in `gridWidth`, `gridHeight`. `padding` adds to the
        // resulting width/height of the paper.

        if (utils.isObject(frameWidth)) {

            options     = frameWidth;
            padding     = options.padding || 0;
            frameWidth  = options.frameWidth || 1;
            frameHeight = options.frameHeight || 1;

        } else {

            options     = options || {};
            padding     = padding || 0;
            frameWidth  = frameWidth || 1;
            frameHeight = frameHeight || 1;
        }

        padding = utils.normalizeSides(padding);

        // get the content boundary
        let cBounds = this.getContentBBox(true);

        cBounds.x *= this.sx;
        cBounds.y *= this.sy;
        cBounds.width *= this.sx;
        cBounds.height *= this.sy;

        let width  = utils.snapToGrid(cBounds.width + cBounds.x || 1, frameWidth, 'ceil');
        let height = utils.snapToGrid(cBounds.height + cBounds.y || 1, frameHeight, 'ceil');

        let tx = this.tx;
        let ty = this.ty;

        function needTranslate(val) {

            return !options.allowNewOrigin
                || options.allowNewOrigin === 'any'
                || (options.allowNewOrigin === 'negative' && val < 0)
                || (options.allowNewOrigin === 'positive' && val >= 0);
        }

        if (needTranslate(cBounds.x)) {

            tx = Math.ceil(-cBounds.x / frameWidth) * frameWidth;
            tx += padding.left;
            width += tx;
        }

        if (needTranslate(cBounds.y)) {

            ty = Math.ceil(-cBounds.y / frameHeight) * frameHeight;
            ty += padding.top;
            height += ty;
        }

        width += padding.right;
        height += padding.bottom;

        width  = utils.clamp(width, options.minWidth || 0, options.maxWidth || Number.MAX_VALUE);
        height = utils.clamp(height, options.minHeight || 0, options.maxHeight || Number.MAX_VALUE);

        let sizeChanged   = width !== this.width || height !== this.height;
        let originChanged = tx !== this.tx || ty !== this.ty;

        if (originChanged) {
            this.translate(tx, ty);
        }

        if (sizeChanged) {
            this.resize(width, height);
        }

        return sizeChanged || originChanged;
    }

    scaleContentToFit(options = {}) {

        let contentBBox = this.getContentBBox(true);

        if (!contentBBox.width || !contentBBox.height) {
            return this;
        }

        options = utils.merge({
            padding: 0,
            minScale: null,
            maxScale: null,
            scaleGrid: null,
            preserveAspectRatio: true,
            // minScaleX,
            // minScaleY,
            // maxScaleX,
            // maxScaleY,
            // fittingBBox
        }, options);


        let padding     = utils.normalizeSides(options.padding);
        let fittingBBox = options.fittingBBox;

        if (!fittingBBox) {
            fittingBBox = {
                x: this.tx,
                y: this.ty,
                width: this.width,
                height: this.height
            };
        }

        fittingBBox = Rect.fromRect(fittingBBox).moveAndExpand({
            x: padding.left,
            y: padding.top,
            width: -(padding.left + padding.right),
            height: -(padding.top + padding.bottom)
        });


        let sx = fittingBBox.width / contentBBox.width;
        let sy = fittingBBox.height / contentBBox.height;

        // snap scale to a grid
        let scaleGrid = options.scaleGrid;
        if (scaleGrid) {
            sx = utils.snapToGrid(sx, scaleGrid, 'floor');
            sy = utils.snapToGrid(sy, scaleGrid, 'floor');
        }

        // scale min/max boundaries
        let minScaleX = options.minScaleX || options.minScale;
        let maxScaleX = options.maxScaleX || options.maxScale;
        let minScaleY = options.minScaleY || options.minScale;
        let maxScaleY = options.maxScaleY || options.maxScale;

        sx = utils.clamp(sx, minScaleX, maxScaleX);
        sy = utils.clamp(sy, minScaleY, maxScaleY);

        if (options.preserveAspectRatio) {
            sx = sy = Math.min(sx, sy);
        }

        this.scale(sx, sy);

        contentBBox = this.getContentBBox(true);

        let tx = fittingBBox.x - contentBBox.x;
        let ty = fittingBBox.y - contentBBox.y;

        this.translateTo(tx, ty);

        return this;
    }


    // validate
    // --------

    reValidate() {

        return this
            .invalidate()
            .validate();
    }

    clear(cell = this.model.getRoot(), force = false, recurse = true) {

        this.removeView(cell);

        if (recurse && (force || cell !== this.currentRoot)) {
            cell.eachChild(function (child) {
                this.clear(child, force, recurse);
            }, this);
        } else {
            this.invalidate(cell, true, true);
        }

        return this;
    }

    invalidate(cell = this.model.getRoot(), recurse = true, includeLink = true) {

        let view = this.getView(cell);
        if (view) {
            view.invalid = true;
        }

        if (!cell.invalidating) {

            cell.invalidating = true;

            if (recurse) {
                cell.eachChild(function (child) {
                    this.invalidate(child, recurse, includeLink);
                }, this);
            }

            if (includeLink) {
                cell.eachLink(function (link) {
                    this.invalidate(link, recurse, includeLink);
                }, this);
            }

            cell.invalidating = false;
        }

        return this;
    }

    validate(cell = this.model.getRoot()) {

        return this
            .validateCell(cell)
            .validateView(cell);
    }

    validateCell(cell, visible = true) {

        // create or remove view for cell
        if (cell) {

            visible = visible && cell.isVisible();

            let view = this.getView(cell, visible);
            if (view && !visible) {
                this.removeView(cell, false, false);
            }

            cell.eachChild(function (child) {
                this.validateCell(child, visible);
            }, this);
        }

        return this;
    }

    validateView(cell, recurse = true) {

        if (cell) {

            let view = this.getView(cell);
            if (view) {
                if (view.invalid) {
                    // geometry shoule be updated after the parent be validated
                    // for child node may has relative geometry
                    this.validateView(cell.getParent(), false)
                        .updateNodeGeometry(cell)
                        .renderView(cell);

                    view.invalid = false;
                }
            }

            if (recurse) {
                cell.eachChild(function (child) {
                    this.validateView(child, recurse);
                }, this);
            }
        }

        return this;
    }

    updateNodeGeometry(node) {
        // update the node's geometry
        if (node && node.isNode()) {
            this.updateNodeSize(node)
                .updateNodePosition(node)
                .updateNodeRotation(node);
        }

        return this;
    }

    updateNodeSize(node) {

        // only update the node's size
        if (node && node.isNode()) {

            let size   = node.metadata.size || {};
            let width  = !utils.isUndefined(size.width) ? size.width : 1;
            let height = !utils.isUndefined(size.height) ? size.height : 1;

            let parent = node.parent;

            if (size.relative && parent && parent.isNode()) {

                let parentSize = parent.size;
                let isPercent  = utils.isPercentage(width);

                width = utils.fixNumber(width, isPercent, 0);

                if (isPercent || width > 0 && width < 1) {
                    width *= parentSize.width;
                } else {
                    width += parentSize.width;
                }

                isPercent = utils.isPercentage(height);
                height    = utils.fixNumber(height, isPercent, 0);

                if (isPercent || height > 0 && height < 1) {
                    height *= parentSize.height;
                } else {
                    height += parentSize.height;
                }

            } else {
                width  = utils.fixNumber(width, false, 1);
                height = utils.fixNumber(height, false, 1);
            }

            // update size attribute of node
            node.size = {
                width: Math.max(width, 1),
                height: Math.max(height, 1)
            };
        }

        return this;
    }

    updateNodePosition(node) {

        if (node && node.isNode()) {

            let pos = node.metadata.position || {};
            let x   = !utils.isUndefined(pos.x) ? pos.x : 0;
            let y   = !utils.isUndefined(pos.y) ? pos.y : 0;

            let parent = node.parent;

            if (pos.relative && parent && parent.isNode()) {

                let parentPos  = parent.position;
                let parentSize = parent.size;

                let isPercent = utils.isPercentage(x);

                x = utils.fixNumber(x, isPercent, 0);

                if (isPercent || x > -1 && x < 1) {
                    x = parentPos.x + parentSize.width * x;
                } else {
                    x += parentPos.x;
                }

                isPercent = utils.isPercentage(y);

                y = utils.fixNumber(y, isPercent, 0);

                if (isPercent || y > -1 && y < 1) {
                    y = parentPos.y + parentSize.height * y;
                } else {
                    y += parentPos.y;
                }

            } else {
                x = utils.fixNumber(x, false, 0);
                y = utils.fixNumber(y, false, 0);
            }

            node.position = this.snapToGrid({
                x,
                y
            }, true);
        }


        return this;
    }

    updateNodeRotation(node) {

        if (node && node.isNode()) {

            let raw    = node.metadata.rotation || {};
            let angle  = utils.fixNumber(raw.angle, false, 0);
            let parent = node.parent;

            if (raw.inherited && parent && parent.isNode() && parent.rotation !== 0) {

                // update node's position
                let pos    = node.position;
                let size   = node.size;
                let center = new Point(pos.x + size.width / 2, pos.y + size.height / 2);

                let parentPos    = parent.position;
                let parentSize   = parent.size;
                let parentCenter = new Point(parentPos.x + parentSize.width / 2, parentPos.y + parentSize.height / 2);

                // angle is according to the clockwise
                center.rotate(parentCenter, -parent.rotation);

                // move the node to the new position
                pos.x = center.x - size.width / 2;
                pos.y = center.y - size.height / 2;

                angle += parent.rotation;
            }

            node.rotation = angle;
        }

        return this;
    }


    // view
    // ----

    getView(cell, create) {

        if (cell) {
            let view = this.getViewById(cell.id);
            if (!view && create && cell.isVisible()) {
                view = this.createView(cell);
            }

            return view;
        }
    }

    getViewById(cellId) {

        return this.views ? this.views[cellId] : null;
    }

    eachView(iterator, context) {

        return utils.forIn(this.views, iterator, context);
    }

    getTerminalView(link, isSource) {

        let terminal = this.model.getTerminal(link, isSource);

        return terminal && terminal.node ? this.getView(terminal.node) : null;
    }

    createView(cell) {

        if (cell) {

            let View = cell.metadata.view;
            if (!View) {
                View = cell.isLink() ? LinkView
                    : cell.isNode() ? NodeView
                    : null;
            }

            if (View) {

                let view = new View(this, cell);

                if (!this.views) {
                    this.views = {};
                }

                this.views[cell.id] = view;

                return view;
            }
        }

        return null;
    }

    removeView(cell, recurse = true, includeLink = true) {

        if (cell) {

            if (recurse) {
                cell.eachChild(function (child) {
                    this.removeView(child, recurse, includeLink);
                }, this);
            }

            if (includeLink) {
                cell.eachLink(function (link) {
                    this.removeView(link, recurse, includeLink);
                }, this);
            }

            let view = this.getView(cell);
            if (view) {
                delete this.views[cell.id];
                view.destroy();
            }
        }

        return this;
    }

    renderView(cell) {

        let view = this.getView(cell);
        if (view) {
            if (cell.isLink() && !this.canRenderLink(cell)) {
                this.removeView(cell);
            } else {
                view.render();
            }
        }

        return this;
    }

    canRenderLink(link) {

        let sourceNode = link.getTerminalNode(true);
        let targetNode = link.getTerminalNode(false);

        // unVisible or do not in the paper(view is null)
        if (sourceNode && (!sourceNode.isVisible() || !this.getView(sourceNode))) {
            return false;
        }

        if (targetNode && (!targetNode.isVisible() || !this.getView(targetNode))) {
            return false;
        }

        return (sourceNode || link.getTerminalPoint(true))
            && (targetNode || link.getTerminalPoint(false));
    }

    findViewByElem(elem) {

        if (this.views) {

            elem = utils.isString(elem)
                ? this.svg.querySelector(elem)
                : elem;

            while (elem && elem !== this.svg && elem !== document) {

                let cellId = elem.cellId;
                if (cellId) {
                    return this.views[cellId];
                }

                elem = elem.parentNode;
            }
        }

        return null;
    }

    findViewByCell(cell) {

        return utils.isString(cell)
            ? this.getViewById(cell)
            : this.getView(cell);
    }

    findViewByPoint(/* point */) {

    }

    findViewsInArea(/* rect */) {

    }


    // changes
    // -------

    handleChanges(changes) {

        utils.forEach(changes, function (change) {
            this.distributeChange(change);
        }, this);

        this.validate();

        return this;
    }

    distributeChange(change) {

        if (change instanceof RootChange) {

            this.onRootChanged(change);

        } else if (change instanceof ChildChange) {

            this.onChildChanged(change);

        } else if (change instanceof VisibleChange) {

            this.onVisibleChange(change);

        } else if (change instanceof TerminalChange) {

            this.onTerminalChange(change);

        } else if (change instanceof SizeChange) {

            this.onSizeChange(change);

        } else if (change instanceof PositionChange) {

            this.onPositionChange(change);

        } else if (change instanceof RotationChange) {

            this.onRotationChange(change);

        } else if (change instanceof AttributeChange) {

            this.onAttributeChange(change);

        } else if (change instanceof GeometryChange) {

            this.onGeometryChange(change);

        } else if (change instanceof CollapseChange) {

            this.onCollapseChange(change);
        }

        return this;
    }

    onRootChanged(change) {

        if (change.viewport) {
            this.invalidate(change.viewport, true, true);
        }

        if (change.previous) {
            this.removeView(change.previous, true, true);
        }
    }

    onChildChanged(change) {

        let newParent = change.parent;
        let oldParent = change.previous;

        this.invalidate(change.child, true, true);

        if (!newParent) {
            this.removeView(change.child, true, true);
        }

        if (newParent !== oldParent) {
            newParent && this.invalidate(newParent, false, false);
            oldParent && this.invalidate(oldParent, false, false);
        }
    }

    onVisibleChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onTerminalChange(change) {

        this.invalidate(change.link, true, true);
    }

    onSizeChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onPositionChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onRotationChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onAttributeChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onGeometryChange(change) {

        this.invalidate(change.cell, true, true);
    }

    onCollapseChange(change) {

        this.invalidate(change.cell, true, true);
    }


    // router
    // ------

    static registerRouter(name, fn) {

        if (!this.router) {
            this.router = {};
        }

        this.router[name] = fn;

        return this;
    }

    static getRouter(name) {

        return this.router ? this.router[name] : null;
    }

    getRouter(name) {

        return this.constructor.getRouter(name);
    }


    // connector
    // ---------

    static registerConnector(name, fn) {

        if (!this.connectors) {
            this.connectors = {};
        }

        this.connectors[name] = fn;

        return this;
    }

    static getConnector(name) {

        return this.connectors ? this.connectors[name] : null;
    }

    getConnector(name) {

        return this.constructor.getConnector(name);
    }


    // marker
    // ------

    static registerMarker(name, fn) {

        if (!this.markers) {
            this.markers = {};
        }

        this.markers[name] = fn;

        return this;
    }

    static getMarker(name) {

        return this.markers ? this.markers[name] : null;
    }

    getMarker(name) {

        return this.constructor.getMarker(name);
    }


    // events
    // ------

    isValidEvent(e, view) {

        // If the event is interesting, returns `true`.
        // Otherwise, return `false`.

        const cell = view && view.cell;

        if (this.options.isValidEvent && !this.options.isValidEvent(e, cell, view)) {
            return false;
        }

        if (cell && cell instanceof Cell) {
            return true;
        }


        let target   = e.target;
        let delegate = this.eventDelegate;

        if (delegate === target || utils.containsElement(delegate, target)) {
            return true;
        }
    }

    onContextMenu(e) {

        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);

        if (!this.isValidEvent(e, view)) {
            return;
        }

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        if (view) {
            this.trigger('cell:contextmenu', view.cell, view, e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:contextmenu', e, localPoint.x, localPoint.y);
        }
    }

    onDblClick(e) {

        e.preventDefault();
        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);

        if (!this.isValidEvent(e, view)) {
            return;
        }

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        if (view) {
            this.trigger('cell:dblclick', view.cell, view, e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:dblclick', e, localPoint.x, localPoint.y);
        }
    }

    onClick(e) {

        if (this.mouseMoved <= this.options.clickThreshold) {

            e = utils.normalizeEvent(e);

            let view = this.findViewByElem(e.target);

            if (!this.isValidEvent(e, view)) {
                return;
            }

            let localPoint = this.snapToGrid({
                x: e.clientX,
                y: e.clientY
            });

            if (view) {
                this.trigger('cell:click', view.cell, view, e, localPoint.x, localPoint.y);
            } else {
                this.trigger('blank:click', e, localPoint.x, localPoint.y);
            }
        }
    }

    onCellMouseOver(e) {

        this.onCellHover(e, 'mouseover');
    }

    onCellMouseOut(e) {

        this.onCellHover(e, 'mouseout');
    }

    onCellMouseEnter(e) {

        this.onCellHover(e, 'mouseenter');
    }

    onCellMouseLeave(e) {

        this.onCellHover(e, 'mouseleave');
    }

    onCellHover(e, eventName) {

        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);

        if (!this.isValidEvent(e, view)) {
            return;
        }

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        this.trigger('cell:' + eventName, view.cell, view, e, localPoint.x, localPoint.y);
    }

    onPointerDown(e) {

        e = utils.normalizeEvent(e);

        if (!utils.isLeftMouseButton(e)) {
            return;
        }

        let view = this.findViewByElem(e.target);
        let cell = view && view.cell;

        if (!this.isValidEvent(e, view)) {
            return;
        }

        this.triggerPointDown(e, cell, view);
    }

    triggerPointDown(e, cell, view) {

        e.preventDefault();

        this.mouseMoved = 0;

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        if (view) {
            this.sourceView = view;
            this.trigger('cell:pointerDown', cell, view, e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
        }

        this.onMouseMoveHandler = this.onMouseMoveHandler || this.onPointerMove.bind(this);
        this.onMouseUpHandler   = this.onMouseUpHandler || this.onPointerUp.bind(this);

        // utils.addEventListener(doc, detector.IS_TOUCH ? 'touchmove' : 'mousemove', this.onMouseMoveHandler);
        // utils.addEventListener(doc, detector.IS_TOUCH ? 'touchend' : 'mouseup', this.onMouseUpHandler);

        utils.addEventListener(doc, 'mousemove', this.onMouseMoveHandler);
        utils.addEventListener(doc, 'mouseup', this.onMouseUpHandler);
    }

    onPointerMove(e) {

        e.preventDefault();
        e = utils.normalizeEvent(e);

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        let sourceView = this.sourceView;
        if (sourceView) {
            this.mouseMoved++;
            this.trigger('cell:pointerMove', sourceView.cell, sourceView, e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:pointerMove', e, localPoint.x, localPoint.y);
        }
    }

    onPointerUp(e) {

        e = utils.normalizeEvent(e);

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        let sourceView = this.sourceView;
        if (sourceView) {
            this.trigger('cell:pointerUp', sourceView.cell, sourceView, e, localPoint.x, localPoint.y);
            this.sourceView = null;
        } else {
            this.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
        }

        // Chrome in windows8: `'ontouchstart' in document.documentElement` return `true`
        // utils.removeEventListener(doc, detector.IS_TOUCH ? 'touchmove' : 'mousemove', this.onMouseMoveHandler);
        // utils.removeEventListener(doc, detector.IS_TOUCH ? 'touchend' : 'mouseup', this.onMouseUpHandler);

        utils.removeEventListener(doc, 'mousemove', this.onMouseMoveHandler);
        utils.removeEventListener(doc, 'mouseup', this.onMouseUpHandler);
    }


    // utils
    // -----

    snapToGrid(point, isLocal) {

        // Convert global coordinates to the local ones of the `drawPane`.
        // Otherwise, improper transformation would be applied when the
        // drawPane gets transformed (scaled/rotated).
        let gridSize = this.options.gridSize || 1;

        if (!isLocal) {
            point = vector(this.drawPane).toLocalPoint(point.x, point.y);
        }

        return {
            x: utils.snapToGrid(point.x, gridSize),
            y: utils.snapToGrid(point.y, gridSize)
        };
    }

    toLocalPoint(point) {

        let offset   = this.getRootOffset();
        let svgPoint = this.svg.createSVGPoint();

        svgPoint.x = point.x + offset.left;
        svgPoint.y = point.y + offset.top;

        let result = svgPoint.matrixTransform(this.drawPane.getCTM().inverse());

        return Point.fromPoint(result);
    }

    toClientPoint(point) {

        let offset   = this.getRootOffset();
        let svgPoint = this.svg.createSVGPoint();

        svgPoint.x = point.x;
        svgPoint.y = point.y;

        let result = svgPoint.matrixTransform(this.drawPane.getCTM());

        result.x -= offset.left;
        result.y -= offset.top;

        return Point.fromPoint(result);
    }

    getRootOffset() {

        // This is a hack for Firefox! If there wasn't a fake (non-visible)
        // rectangle covering the whole SVG area, the `$(paper.svg).offset()`
        // used below won't work.
        let fakeRect;
        if (detector.IS_FF) {

            fakeRect = vector('rect', {
                width: this.options.width,
                height: this.options.height,
                x: 0,
                y: 0,
                opacity: 0
            });

            this.svg.appendChild(fakeRect.node);
        }

        let paperOffset = utils.getOffset(this.svg);

        if (detector.IS_FF) {
            fakeRect.remove();
        }

        let body       = doc.body;
        let docElem    = doc.documentElement;
        let scrollTop  = body.scrollTop || docElem.scrollTop;
        let scrollLeft = body.scrollLeft || docElem.scrollLeft;

        return {
            left: scrollLeft - paperOffset.left,
            top: scrollTop - paperOffset.top
        };
    }

    toLocalRect(rect) {

        let origin = this.toLocalPoint({
            x: rect.x,
            y: rect.y
        });
        let corner = this.toLocalPoint({
            x: rect.x + rect.width,
            y: rect.y + rect.height
        });

        return new Rect(origin.x, origin.y, corner.x - origin.x, corner.y - origin.y);
    }
}


// exports
// -------

export default Paper;
