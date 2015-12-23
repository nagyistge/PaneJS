import {
    merge,
    forEach,
    isString,
    isUndefined,
    isPercentage,
    toFloat,
    toFixed,
    fixNumber,
    getOffset,
    snapToGrid,
    containsElem,
    normalizeEvent,
    addEventListener,
    removeEventListener,
    createSvgElement,
    createSvgDocument
} from '../common/utils';

import Events     from '../common/Events';
import vector     from '../common/vector';
import detector   from '../common/detector';
import * as utils from '../common/utils';

import Point from '../geometry/Point';
import Rect  from '../geometry/Rect';

import Model    from './Model';
import Cell     from '../cells/Cell';
import LinkView from '../views/LinkView';
import NodeView from '../views/NodeView';

import RootChange     from '../changes/RootChange';
import ChildChange    from '../changes/ChildChange';
import TerminalChange from '../changes/TerminalChange';

let counter = 0;

// the default options for paper
let defaultOptions = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    gridSize: 1,
    viewportClassName: 'pane-viewport',
    linkClassName: '',
    nodeClassName: '',
    getCellClassName (cell) {},
    getView (cell) {}
};

class Paper extends Events {

    constructor(container, model, options) {

        super();

        let that = this;

        that.id = 'paper' + counter++;
        that.model = model || new Model();

        that.configure(options);

        if (container) {
            that.init(container)
                .setup()
                .resize()
                .translate();
        }
    }


    // events
    // ------
    //  - paper:configure
    //  - paper:init
    //  - paper:setup
    //  - paper:destroy
    //  - paper:resize


    configure(options) {

        let that = this;

        that.options = merge({}, defaultOptions, options);
        that.trigger('paper:configure', that.options);

        return that;
    }

    snapToGrid(point) {

        // Convert global coordinates to the local ones of the `drawPane`.
        // Otherwise, improper transformation would be applied when the
        // drawPane gets transformed (scaled/rotated).

        let that = this;
        let gridSize = that.options.gridSize || 1;
        let localPoint = vector(that.drawPane).toLocalPoint(point.x, point.y);

        return {
            x: snapToGrid(localPoint.x, gridSize),
            y: snapToGrid(localPoint.y, gridSize)
        };
    }

    toLocalPoint(point) {

        let that = this;
        let svg = that.svg;
        let svgPoint = svg.createSVGPoint();

        svgPoint.x = point.x;
        svgPoint.y = point.y;

        // This is a hack for Firefox! If there wasn't a fake (non-visible)
        // rectangle covering the whole SVG area, the `$(paper.svg).offset()`
        // used below won't work.
        if (detector.IS_FF) {
            let fakeRect = vector('rect', {
                width: that.options.width,
                height: that.options.height,
                x: 0,
                y: 0,
                opacity: 0
            });
            svg.appendChild(fakeRect.node);
        }

        let paperOffset = getOffset(svg);

        if (detector.IS_FF) {
            fakeRect.remove();
        }

        let doc = document;
        let body = doc.body;
        let docElem = doc.documentElement;
        let scrollTop = body.scrollTop || docElem.scrollTop;
        let scrollLeft = body.scrollLeft || docElem.scrollLeft;

        svgPoint.x += scrollLeft - paperOffset.left;
        svgPoint.y += scrollTop - paperOffset.top;

        // Transform point into the viewport coordinate system.
        return svgPoint.matrixTransform(that.drawPane.getCTM().inverse());
    }


    // lift cycle
    // ----------

    init(container) {

        let that = this;

        if (container) {

            let svg = createSvgDocument();
            let root = createSvgElement('g');
            let backgroundPane = createSvgElement('g');
            let drawPane = createSvgElement('g');

            root.appendChild(backgroundPane);
            root.appendChild(drawPane);
            svg.appendChild(root);
            container.appendChild(svg);

            that.svg = svg;
            that.root = root;
            that.backgroundPane = backgroundPane;
            that.drawPane = drawPane;
            that.container = container;

            that.trigger('paper:init', container);
        }

        return that;
    }

    setup() {

        let that = this;
        let svg = that.svg;

        addEventListener(svg, 'contextmenu', that.onContextMenu.bind(that));
        addEventListener(svg, 'dblclick', that.onDblClick.bind(that));
        addEventListener(svg, 'click', that.onClick.bind(that));
        addEventListener(svg, 'mousedown', that.onPointerDown.bind(that));
        addEventListener(svg, 'touchstart', that.onPointerDown.bind(that));
        addEventListener(svg, 'mousemove', that.onPointerMove.bind(that));
        addEventListener(svg, 'touchmove', that.onPointerMove.bind(that));
        addEventListener(svg, 'mouseover', '.pane-element', that.onCellMouseOver.bind(that));
        addEventListener(svg, 'mouseout', '.pane-element', that.onCellMouseOut.bind(that));
        addEventListener(svg, 'mouseover', '.pane-link', that.onCellMouseOver.bind(that));
        addEventListener(svg, 'mouseout', '.pane-link', that.onCellMouseOut.bind(that));

        // Disables built-in pan and zoom in IE10 and later
        if (detector.IS_POINTER) {
            that.container.style.msTouchAction = 'none';
        }

        that.model.on('change', that.processChanges, that);

        that.trigger('paper:setup');

        return that;
    }

    remove() {

    }

    destroy() {
        let that = this;

        that.trigger('paper:destroy');

        return that;
    }


    // validate
    // --------

    reValidate() {
        return this.invalidate().validate();
    }

    clear(cell, force = false, recurse = true) {

        let that = this;
        let model = that.model;

        cell = cell || model.getRoot();

        that.removeState(cell);

        if (recurse && (force || cell !== that.currentRoot)) {
            cell.eachChild(function (child) {
                that.clear(child, force, recurse);
            });
        } else {
            that.invalidate(cell, true, true);
        }

        return that;
    }

    invalidate(cell, recurse = true, includeLink = true) {

        let that = this;
        let model = that.model;

        cell = cell || model.getRoot();

        let view = that.getView(cell);

        if (view) {
            view.invalid = true;
        }

        if (!cell.invalidating) {

            cell.invalidating = true;

            if (recurse) {
                cell.eachChild(function (child) {
                    that.invalidate(child, recurse, includeLink);
                });
            }

            if (includeLink) {
                cell.eachLink(function (link) {
                    that.invalidate(link, recurse, includeLink);
                });
            }

            cell.invalidating = false;
        }

        return that;
    }

    validate(cell) {

        let that = this;

        cell = cell || that.model.getRoot();

        that.validateCell(cell)
            .validateView(cell);

        return that;
    }

    validateCell(cell, visible = true) {

        // create or remove view for cell

        let that = this;

        if (cell) {

            visible = visible && cell.visible;

            let view = that.getView(cell, visible);

            if (view && !visible) {
                that.removeView(cell);
            }

            cell.eachChild(function (child) {
                that.validateCell(child, visible);
            });
        }

        return that;
    }

    validateView(cell, recurse = true) {

        let that = this;

        if (cell) {

            let view = that.getView(cell);

            if (view) {
                if (view.invalid) {
                    view.invalid = false;

                    that
                        .validateView(cell.getParent(), false)
                        .updateCellGeometry(cell)
                        .renderView(cell);
                }
            }

            if (recurse) {
                cell.eachChild(function (child) {
                    that.validateView(child, recurse);
                });
            }
        }

        return that;
    }

    updateCellGeometry(cell) {

        return cell.isNode
            ? this.updateNodeGeometry(cell) : cell.isLink
            ? this.updateLinkGeometry(cell)
            : this;
    }

    updateNodeGeometry(node) {

        // update the geometry

        return this
            .updateNodeSize(node)
            .updateNodePosition(node)
            .updateNodeRotation(node);
    }

    updateNodeSize(node) {

        // only update the node's size
        if (node && node.isNode) {

            let parent = node.parent;
            let raw = node.metadata.size || {};
            let width = !isUndefined(raw.width) ? raw.width : 1;
            let height = !isUndefined(raw.height) ? raw.height : 1;

            if (raw.relative && parent && parent.isNode) {

                let parentSize = parent.size;
                let isPercent = isPercentage(width);

                width = fixNumber(width, isPercent, 0);

                if (isPercent || width > 0 && width < 1) {
                    width *= parentSize.width;
                } else {
                    width += parentSize.width;
                }

                isPercent = isPercentage(height);
                height = fixNumber(height, isPercent, 0);

                if (isPercent || height > 0 && height < 1) {
                    height *= parentSize.height;
                } else {
                    height += parentSize.height;
                }

            } else {
                width = fixNumber(width, false, 1);
                height = fixNumber(height, false, 1);
            }

            node.size = {
                width: Math.max(width, 1),
                height: Math.max(height, 1)
            };
        }

        return this;
    }

    updateNodePosition(node) {

        if (node && node.isNode) {

            let parent = node.parent;
            let raw = node.metadata.position || {};
            let x = !isUndefined(raw.x) ? raw.x : 0;
            let y = !isUndefined(raw.y) ? raw.y : 0;

            if (raw.relative && parent && parent.isNode) {

                let parentSize = parent.size;
                let parentPosition = parent.position;
                let isPercent = isPercentage(x);

                x = fixNumber(x, isPercent, 0);

                if (isPercent || x > -1 && x < 1) {
                    x = parentPosition.x + parentSize.width * x;
                } else {
                    x += parentPosition.x;
                }

                isPercent = isPercentage(y);

                y = fixNumber(y, isPercent, 0);

                if (isPercent || y > -1 && y < 1) {
                    y = parentPosition.y + parentSize.height * y;
                } else {
                    y += parentPosition.y;
                }

            } else {
                x = fixNumber(x, false, 0);
                y = fixNumber(y, false, 0);
            }

            node.position = {
                x: x,
                y: y
            };
        }


        return this;
    }

    updateNodeRotation(node) {

        if (node && node.isNode) {

            let parent = node.parent;
            let raw = node.metadata.rotation || {};
            let angle = fixNumber(raw.angle, false, 0);

            if (raw.inherited && parent && parent.isNode && parent.rotation !== 0) {

                // update node's position
                let size = node.size;
                let position = node.position;
                let nodeCenter = new Point(position.x + size.width / 2, position.y + size.height / 2);

                let parentSize = parent.size;
                let parentPosition = parent.position;
                let parentCenter = new Point(parentPosition.x + parentSize.width / 2, parentPosition.y + parentSize.height / 2);

                // angle is according to the clockwise
                nodeCenter.rotate(parentCenter, -parent.rotation);

                // move the node to the new position
                position.x = nodeCenter.x - size.width / 2;
                position.y = nodeCenter.y - size.height / 2;

                angle += parent.rotation;
            }

            node.rotation = angle;
        }

        return this;
    }

    updateLinkGeometry(link) {

        let source = link.getTerminal(true);
        let target = link.getTerminal(false);
        let sourceBBox = new Rect(source.position.x, source.position.y, source.size.width, source.size.height);
        let targetBBox = new Rect(target.position.x, target.position.y, target.size.width, target.size.height);
        var sourcePoint = sourceBBox.intersectionWithLineFromCenterToPoint(targetBBox.getCenter());
        var targetPoint = targetBBox.intersectionWithLineFromCenterToPoint(sourceBBox.getCenter());

        link.points = [
            sourcePoint,
            targetPoint
        ];

        return this;
    }


    // transform
    // ---------

    resize(width, height, relative) {

        let that = this;
        let options = that.options;
        let nativeWidth = options.width;
        let nativeHeight = options.height;

        width = isUndefined(width) ? nativeWidth : width;
        height = isUndefined(height) ? nativeHeight : height;

        if (relative === true) {

            let svg = that.svg;
            let isPercent = isPercentage(width);
            let isNativePercent = isPercentage(nativeWidth);

            if (isPercent) {
                if (isNativePercent) {
                    width = toFloat(width, false, 0) + toFloat(nativeWidth, false, 0) + '%';
                } else {
                    width = toFloat(width, true, 1) * nativeWidth;
                }
            } else {
                width += isNativePercent ? svg.offsetWidth : nativeWidth;
            }


            isPercent = isPercentage(height);
            isNativePercent = isPercentage(nativeHeight);

            if (isPercent) {
                if (isNativePercent) {
                    height = toFloat(height, false, 0) + toFloat(nativeHeight, false, 0) + '%';
                } else {
                    height = toFloat(height, true, 1) * nativeHeight;
                }
            } else {
                height += isNativePercent ? svg.offsetHeight : nativeHeight;
            }
        }

        options.width = width;
        options.height = height;

        vector(that.svg).attr({width: width, height: height});

        that.trigger('paper:resize', width, height);

        return that;
    }

    resizeTo(width, height) {
        return this.resize(width, height, false);
    }

    resizeBy(width, height) {
        return this.resize(width, height, true);
    }

    translate(x, y, absolute) {

        let that = this;
        let options = that.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        vector(that.root).translate(x, y, absolute);

        that.trigger('paper:translate', x, y);

        return that;
    }

    translateTo(x, y) {
        return this.translate(x, y, true);
    }

    translateBy(x, y) {

    }

    scale(sx, sy, ox = 0, oy = 0) {

    }


    // view
    // ----

    getView(cell, create) {

        let that = this;
        let views = that.views;

        if (cell) {
            let view = views ? views[cell.id] : null;

            if (!view && create && cell.visible) {
                view = that.createView(cell);
            }

            return view;
        }
    }

    createView(cell) {

        let that = this;
        let options = that.options;

        // get view's constructor from options.
        // TODO: getCellView
        let ViewConstructor = options.getView.call(that, cell);

        if (!ViewConstructor) {
            ViewConstructor = cell.isLink
                ? LinkView : cell.isNode
                ? NodeView
                : null;
        }

        if (ViewConstructor) {

            let view = new ViewConstructor(that, cell);
            let views = that.views;

            if (!views) {
                views = that.views = {};
            }

            views[cell.id] = view;

            return view;
        }
    }

    removeView(cell) {

        let that = this;
        let view = that.getView(cell);

        if (view) {
            delete that.views[cell.id];
            view.destroy();
        }

        return that;
    }

    renderView(cell) {

        let that = this;
        let view = that.getView(cell);

        if (view) {
            view.render();
        }

        return that;
    }

    findViewByElem(elem) {

        let that = this;
        let svg = that.svg;

        elem = isString(elem) ? svg.querySelector(elem) : elem;

        while (elem && elem !== svg && elem !== document) {

            let cellId = elem.cellId;
            if (cellId) {
                return that.views[cellId];
            }

            elem = elem.parentNode;
        }

        return null;
    }

    findViewByCell(cell) {

        let id = isString(cell) ? cell : cell.id;
        return this.views[id];
    }

    findViewByPoint(point) {

    }

    findViewsInArea(rect) {

    }


    // changes
    // -------

    processChanges(changes) {

        let that = this;

        console.log(changes);

        forEach(changes, function (change) {
            that.distributeChange(change);
        });


        that.validate();

        return that;
    }

    distributeChange(change) {

        let that = this;

        if (change instanceof RootChange) {
            that.onRootChanged(change);
        } else if (change instanceof ChildChange) {
            that.onChildChanged(change);
        } else if (change instanceof TerminalChange) {
            that.onTerminalChange(change);
        }

        return that;
    }

    onRootChanged(change) {

    }

    onChildChanged(change) {

        let that = this;

        let newParent = change.parent;
        let oldParent = change.previous;

        that.invalidate(change.child, true, true);

        //if (newParent == null || this.isCellCollapsed(newParent)) {
        //    this.view.invalidate(change.child, true, true);
        //    this.removeStateForCell(change.child);
        //
        //    // Handles special case of current root of view being removed
        //    if (this.view.currentRoot == change.child) {
        //        this.home();
        //    }
        //}

        if (newParent !== oldParent) {
            // Refreshes the collapse/expand icons on the parents
            if (newParent) {
                that.invalidate(newParent, false, false);
            }

            if (oldParent) {
                that.invalidate(oldParent, false, false);
            }
        }
    }

    onTerminalChange(change) {
        this.invalidate(change.link);
    }


    // event handlers
    // --------------

    isValidEvent(e, view) {

        // If the event is interesting, guard returns `true`.
        // Otherwise, it return `false`.

        if (view && view.cell && view.cell instanceof Cell) {
            return true;
        } else {

            let that = this;
            let svg = that.svg;
            let target = e.target;

            if (svg === target || containsElem(svg, target)) {
                return true;
            }
        }
    }

    onContextMenu(e) {

        e = normalizeEvent(e);

        let that = this;
        let view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        let localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            that.sourceView = view;
            view.onContextMenu(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:contextmenu', e, localPoint.x, localPoint.y);
        }
    }

    onDblClick(e) {

        e.preventDefault();
        e = normalizeEvent(e);

        let that = this;
        let view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        let localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            view.onDblClick(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:pointerdblclick', e, localPoint.x, localPoint.y);
        }
    }

    onClick(e) {}

    onPointerDown(e) {

        e = normalizeEvent(e);

        let that = this;
        let view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        let localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            view.onPointerDown(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
        }
    }

    onPointerMove(e) {

        e.preventDefault();
        e = normalizeEvent(e);

        let that = this;
        let sourceView = that.sourceView;

        if (sourceView) {

            let localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

            that._mouseMoved++;

            sourceView.onPointerMove(e, localPoint.x, localPoint.y);
        }
    }

    onPointerUp(e) {

        e = normalizeEvent(e);

        let that = this;
        let localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});
        let sourceView = that.sourceView;

        if (sourceView) {
            sourceView.onPointerUp(e, localPoint.x, localPoint.y);
            that.sourceView = null;
        } else {
            that.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
        }
    }

    onCellMouseOver(e) {

        e = normalizeEvent(e);

        let that = this;
        let view = that.findViewByElem(e.target);

        if (view) {

            if (!that.isValidEvent(e, view)) {
                return;
            }

            view.mouseover(e);
        }
    }

    onCellMouseOut(e) {

        e = normalizeEvent(e);

        let that = this;
        let view = that.findViewByElem(e.target);

        if (view) {

            if (!that.isValidEvent(e, view)) {
                return;
            }

            view.mouseout(e);
        }
    }
}

export default Paper;
