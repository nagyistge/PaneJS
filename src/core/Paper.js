import      * as utils from '../common/utils';
import          vector from '../common/vector';
import        detector from '../common/detector';
import          Events from '../common/Events';
import           Point from '../geometry/Point';

import           Model from '../core/Model';
import            Cell from '../cells/Cell';
import        LinkView from '../views/LinkView';
import        NodeView from '../views/NodeView';

import      RootChange from '../changes/RootChange';
import     ChildChange from '../changes/ChildChange';
import   VisibleChange from '../changes/VisibleChange';
import      SizeChange from '../changes/SizeChange';
import  PositionChange from '../changes/PositionChange';
import  RotationChange from '../changes/RotationChange';
import  TerminalChange from '../changes/TerminalChange';
import  GeometryChange from '../changes/GeometryChange';
import AttributeChange from '../changes/AttributeChange';


const win = window;
const doc = win.document;

let counter = 0;

// the default options for paper
let defaultOptions = {
    container: null,
    model: null,
    manually: false, // for listening life-cycle events should be `true`
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    gridSize: 1,

    // Allowed number of mouseMove events after which the pointerClick event
    // will be still triggered.
    clickThreshold: 0
};

class Paper extends Events {

    constructor(options = {}) {

        super();

        this.id = 'paper-' + counter++;

        if (!options.manually) {
            this.init(options);
        }
    }


    // events
    // ------
    //  - paper:configure
    //  - paper:createPanes
    //  - paper:setup
    //  - paper:init
    //  - paper:destroy
    //  - paper:resize
    //  - paper:translate
    //  - paper:scale


    configure(options) {

        this.options = utils.merge({}, defaultOptions, options);
        this.trigger('paper:configure', this.options);

        return this;
    }

    init(options = {}) {

        this.configure(options);
        this.container = options.container;

        if (!this.container) {
            throw new Error('Invalid container');
        }

        this.createPanes()
            .setup()
            .resize()
            .translate()
            .scale()
            .setModel(options.model);

        this.trigger('paper:init', this.options);

        return this;
    }

    createPanes() {

        let svg  = utils.createSvgDocument();
        let root = utils.createSvgElement('g');

        utils.setAttribute(root, 'class', 'pane-viewport');

        this.backgroundPane = root.appendChild(utils.createSvgElement('g'));
        // container of links
        this.linkPane = root.appendChild(utils.createSvgElement('g'));
        // container of nodes
        this.drawPane = root.appendChild(utils.createSvgElement('g'));
        // layer above the drawing pane, for controllers and handlers
        this.controlPane = root.appendChild(utils.createSvgElement('g'));
        // layer above the drawing pane and controller pane, for decorators
        this.decoratePane = root.appendChild(utils.createSvgElement('g'));

        svg.appendChild(root);
        this.container.appendChild(svg);

        this.svg  = svg;
        this.root = root;

        this.trigger('paper:createPanes', this.container);

        return this;
    }

    setup() {

        utils.addEventListener(this.svg, 'contextmenu', this.onContextMenu.bind(this));
        utils.addEventListener(this.svg, 'dblclick', this.onDblClick.bind(this));
        utils.addEventListener(this.svg, 'click', this.onClick.bind(this));
        utils.addEventListener(this.svg, 'mouseover', '.pane-node', this.onCellMouseOver.bind(this));
        utils.addEventListener(this.svg, 'mouseout', '.pane-node', this.onCellMouseOut.bind(this));
        utils.addEventListener(this.svg, 'mouseover', '.pane-link', this.onCellMouseOver.bind(this));
        utils.addEventListener(this.svg, 'mouseout', '.pane-link', this.onCellMouseOut.bind(this));

        let onPointerDown = this.onPointerDown.bind(this);
        let onPointerMove = this.onPointerMove.bind(this);
        let onPointerUp   = this.onPointerUp.bind(this);

        // save it for destroy
        this.docMouseUpEvent = onPointerUp;

        if (detector.IS_TOUCH) {
            utils.addEventListener(this.svg, 'touchstart', onPointerDown);
            utils.addEventListener(this.svg, 'touchmove', onPointerMove);
            utils.addEventListener(doc, 'touchend', onPointerUp);
        } else {
            utils.addEventListener(this.svg, 'mousedown', onPointerDown);
            utils.addEventListener(this.svg, 'mousemove', onPointerMove);
            utils.addEventListener(doc, 'mouseup', onPointerUp);
        }

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

        this.svg.parentNode.removeChild(this.svg);

        let eventName = detector.IS_TOUCH ? 'touchend' : 'mouseup';
        utils.removeEventListener(doc, eventName, this.docMouseUpEvent);

        if (detector.IS_POINTER) {
            this.container.style.msTouchAction = '';
        }

        this.model.destroy();
        this.trigger('paper:destroy');

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

            node.position = { x, y };
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


    // transform
    // ---------

    resize(width, height, relative) {

        let options      = this.options;
        let nativeWidth  = options.width;
        let nativeHeight = options.height;

        width  = utils.isUndefined(width) ? nativeWidth : width;
        height = utils.isUndefined(height) ? nativeHeight : height;

        if (relative === true) {

            let svg             = this.svg;
            let isPercent       = utils.isPercentage(width);
            let isNativePercent = utils.isPercentage(nativeWidth);

            if (isPercent) {
                if (isNativePercent) {
                    width = utils.toFloat(width, false, 0) + utils.toFloat(nativeWidth, false, 0) + '%';
                } else {
                    width = utils.toFloat(width, true, 1) * nativeWidth;
                }
            } else {
                width += isNativePercent ? svg.offsetWidth : nativeWidth;
            }


            isPercent       = utils.isPercentage(height);
            isNativePercent = utils.isPercentage(nativeHeight);

            if (isPercent) {
                if (isNativePercent) {
                    height = utils.toFloat(height, false, 0) + utils.toFloat(nativeHeight, false, 0) + '%';
                } else {
                    height = utils.toFloat(height, true, 1) * nativeHeight;
                }
            } else {
                height += isNativePercent ? svg.offsetHeight : nativeHeight;
            }
        }

        options.width  = width;
        options.height = height;

        vector(this.svg).attr({
            width,
            height
        });

        this.trigger('paper:resize', width, height);

        return this;
    }

    resizeTo(width, height) {
        return this.resize(width, height, false);
    }

    resizeBy(width, height) {
        return this.resize(width, height, true);
    }

    translate(x, y, relative) {

        let options = this.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        vector(this.root).translate(x, y, relative);

        this.trigger('paper:translate', x, y);

        return this;
    }

    translateTo(x, y) {

        return this.translate(x, y, false);
    }

    translateBy(x, y) {

        return this.translate(x, y, true);
    }

    scale(/* sx, sy, ox = 0, oy = 0 */) {

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

        // console.log(changes);

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
        }

        return this;
    }

    onRootChanged(change) {

        if (change.root) {
            this.invalidate(change.root, true, true);
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

        // If the event is interesting, guard returns `true`.
        // Otherwise, return `false`.

        if (this.options.isValidEvent && !this.options.isValidEvent(e, view)) {
            return false;
        }

        if (view && view.cell && view.cell instanceof Cell) {
            return true;
        }


        let svg    = this.svg;
        let target = e.target;

        if (svg === target || utils.containsElem(svg, target)) {
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
            // view.onContextMenu(e, localPoint.x, localPoint.y);
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
            this.trigger('cell:pointerDblClick', view.cell, view, e, localPoint.x, localPoint.y);
            // view.onDblClick(e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:pointerDblClick', e, localPoint.x, localPoint.y);
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
                this.trigger('cell:pointerClick', view.cell, view, e, localPoint.x, localPoint.y);
                // view.onClick(e, localPoint.x, localPoint.y);
            } else {
                this.trigger('blank:pointerClick', e, localPoint.x, localPoint.y);
            }
        }
    }

    onPointerDown(e) {

        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);

        if (!this.isValidEvent(e, view)) {
            return;
        }

        e.preventDefault();
        this.mouseMoved = 0;

        let localPoint = this.snapToGrid({
            x: e.clientX,
            y: e.clientY
        });

        if (view) {
            this.sourceView = view;
            // view.onPointerDown(e, localPoint.x, localPoint.y);
            this.trigger('cell:pointerDown', view.cell, view, e, localPoint.x, localPoint.y);
        } else {
            this.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
        }
    }

    onPointerMove(e) {

        e.preventDefault();
        e = utils.normalizeEvent(e);

        let sourceView = this.sourceView;

        if (sourceView) {

            let localPoint = this.snapToGrid({
                x: e.clientX,
                y: e.clientY
            });

            this.mouseMoved++;

            this.trigger('cell:pointerMove', sourceView.cell, sourceView, e, localPoint.x, localPoint.y);
            // sourceView.onPointerMove(e, localPoint.x, localPoint.y);
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
            // sourceView.onPointerUp(e, localPoint.x, localPoint.y);
            this.sourceView = null;
        } else {
            this.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
        }
    }

    onCellMouseOver(e) {

        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);
        if (view) {
            if (this.isValidEvent(e, view)) {
                // view.onMouseOver(e);
                this.trigger('cell:mouseOver', view.cell, view, e);
            }
        }
    }

    onCellMouseOut(e) {

        e = utils.normalizeEvent(e);

        let view = this.findViewByElem(e.target);
        if (view) {
            if (this.isValidEvent(e, view)) {
                // view.onMouseOut(e);
                this.trigger('cell:mouseOut', view.cell, view, e);
            }
        }
    }


    // utils
    // -----

    snapToGrid(point) {

        // Convert global coordinates to the local ones of the `drawPane`.
        // Otherwise, improper transformation would be applied when the
        // drawPane gets transformed (scaled/rotated).
        let gridSize   = this.options.gridSize || 1;
        let localPoint = vector(this.drawPane).toLocalPoint(point.x, point.y);

        return {
            x: utils.snapToGrid(localPoint.x, gridSize),
            y: utils.snapToGrid(localPoint.y, gridSize)
        };
    }

    toLocalPoint(point) {

        let svg      = this.svg;
        let svgPoint = svg.createSVGPoint();

        svgPoint.x = point.x;
        svgPoint.y = point.y;

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
            svg.appendChild(fakeRect.node);
        }

        let paperOffset = utils.getOffset(svg);

        if (detector.IS_FF) {
            fakeRect.removeCell();
        }

        let doc        = document;
        let body       = doc.body;
        let docElem    = doc.documentElement;
        let scrollTop  = body.scrollTop || docElem.scrollTop;
        let scrollLeft = body.scrollLeft || docElem.scrollLeft;

        svgPoint.x += scrollLeft - paperOffset.left;
        svgPoint.y += scrollTop - paperOffset.top;

        // Transform point into the viewport coordinate system.
        let result = svgPoint.matrixTransform(this.drawPane.getCTM().inverse());

        return Point.fromPoint(result);
    }

}


// exports
// -------

export default Paper;
