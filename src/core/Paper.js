import {
    merge,
    forEach,
    isString,
    getOffset,
    snapToGrid,
    containsElem,
    normalizeEvent,
    addEventListener,
    removeEventListener,
    createSvgElement,
    createSvgDocument
} from '../common/utils';

import Events   from '../common/Events';
import vector   from '../common/vector';
import detector from '../common/detector';

import Model    from './Model';
import Cell     from '../cells/Cell';
import LinkView from '../views/LinkView';
import NodeView from '../views/NodeView';

import RootChange  from '../changes/RootChange';
import ChildChange from '../changes/ChildChange';

var counter = 0;

// the default options for paper
var defaultOptions = {
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

        var that = this;

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

        var that = this;

        that.options = merge({}, defaultOptions, options);
        that.trigger('paper:configure', that.options);

        return that;
    }

    snapToGrid(point) {

        // Convert global coordinates to the local ones of the `drawPane`.
        // Otherwise, improper transformation would be applied when the
        // drawPane gets transformed (scaled/rotated).

        var that = this;
        var gridSize = that.options.gridSize || 1;
        var localPoint = vector(that.drawPane).toLocalPoint(point.x, point.y);

        return {
            x: snapToGrid(localPoint.x, gridSize),
            y: snapToGrid(localPoint.y, gridSize)
        };
    }

    toLocalPoint(point) {

        var that = this;
        var svg = that.svg;
        var svgPoint = svg.createSVGPoint();

        svgPoint.x = point.x;
        svgPoint.y = point.y;

        // This is a hack for Firefox! If there wasn't a fake (non-visible)
        // rectangle covering the whole SVG area, the `$(paper.svg).offset()`
        // used below won't work.
        if (detector.IS_FF) {
            var fakeRect = vector('rect', {
                width: that.options.width,
                height: that.options.height,
                x: 0,
                y: 0,
                opacity: 0
            });
            svg.appendChild(fakeRect.node);
        }

        var paperOffset = getOffset(svg);

        if (detector.IS_FF) {
            fakeRect.remove();
        }

        var doc = document;
        var body = doc.body;
        var docElem = doc.documentElement;
        var scrollTop = body.scrollTop || docElem.scrollTop;
        var scrollLeft = body.scrollLeft || docElem.scrollLeft;

        svgPoint.x += scrollLeft - paperOffset.left;
        svgPoint.y += scrollTop - paperOffset.top;

        // Transform point into the viewport coordinate system.
        return svgPoint.matrixTransform(that.drawPane.getCTM().inverse());
    }

    // lift cycle
    // ----------

    init(container) {

        var that = this;

        if (container) {

            var svg = createSvgDocument();
            var root = createSvgElement('g');
            var drawPane = createSvgElement('g');

            root.appendChild(drawPane);
            svg.appendChild(root);
            container.appendChild(svg);

            that.svg = svg;
            that.root = root;
            that.drawPane = drawPane;
            that.container = container;

            that.trigger('paper:init', container);
        }

        return that;
    }

    setup() {

        var that = this;
        var svg = that.svg;

        addEventListener(svg, 'contextmenu', that.onContextMenu.bind(that));
        addEventListener(svg, 'dblclick', that.onMouseDblClick.bind(that));
        addEventListener(svg, 'click', that.onMouseClick.bind(that));
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
        var that = this;

        that.trigger('paper:destroy');

        return that;
    }


    // validate
    // --------

    revalidate() {
        return this.invalidate().validate();
    }

    clear(cell, force = false, recurse = true) {

        var that = this;
        var model = that.model;

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

        var that = this;
        var model = that.model;

        cell = cell || model.getRoot();

        var view = that.getView(cell);

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

        var that = this;

        cell = cell || that.model.getRoot();

        that.validateCell(cell)
            .validateView(cell);

        return that;
    }

    validateCell(cell, visible = true) {

        // create or remove view for cell

        var that = this;

        if (cell) {

            visible = visible && cell.visible;

            var view = that.getView(cell, visible);

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

        var that = this;

        if (cell) {

            var view = that.getView(cell);

            if (view) {
                if (view.invalid) {
                    view.invalid = false;

                    that.validateView(cell.getParent(), recurse);

                    // render
                    that.renderView(cell);
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


    // transform
    // ---------

    resize(width, height) {

        var that = this;
        var options = that.options;

        width = options.width = width || options.width;
        height = options.height = height || options.height;

        vector(that.svg).attr({width: width, height: height});

        that.trigger('paper:resize', width, height);

        return that;
    }

    translate(x, y, absolute) {

        var that = this;
        var options = that.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        vector(that.root).translate(x, y, absolute);

        that.trigger('paper:translate', x, y);

        return that;
    }

    translateTo(x, y) {
        return this.translate(x, y, true);
    }

    scale(sx, sy, ox = 0, oy = 0) {

    }

    rotate(deg, ox = 0, oy = 0) {

    }


    // view
    // ----

    getView(cell, create) {

        var that = this;
        var views = that.views;

        if (cell) {
            var view = views ? views[cell.id] : null;

            if (!view && create && cell.visible) {
                view = that.createView(cell);
            }

            return view;
        }
    }

    createView(cell) {

        var that = this;
        var options = that.options;

        // get view's constructor from options.
        var ViewClass = options.getView.call(that, cell);

        if (!ViewClass) {
            ViewClass = cell.isLink()
                ? LinkView : cell.isNode()
                ? NodeView
                : null;
        }

        if (ViewClass) {

            var view = new ViewClass(that, cell);
            var views = that.views;

            if (!views) {
                views = that.views = {};
            }

            views[cell.id] = view;

            return view;
        }
    }

    removeView(cell) {

        var that = this;
        var view = that.getView(cell);

        if (view) {
            delete that.views[cell.id];
            view.destroy();
        }

        return that;
    }

    renderView(cell) {

        var that = this;
        var view = that.getView(cell);

        if (view) {
            view.render();
        }
    }

    findViewByElem(elem) {

        var that = this;
        var svg = that.svg;

        elem = isString(elem) ? svg.querySelector(elem) : elem;

        while (elem && elem !== svg && elem !== document) {

            var cellId = elem.cellId;
            if (cellId) {
                return that.views[cellId];
            }

            elem = elem.parentNode;
        }

        return null;
    }

    findViewByCell(cell) {

        var id = isString(cell) ? cell : cell.id;
        return this.views[id];
    }

    findViewByPoint(point) {

    }

    findViewsInArea(rect) {

    }


    // changes
    // -------

    processChanges(changes) {

        var that = this;

        console.log(changes);

        forEach(changes, function (change) {
            that.distributeChange(change);
        });


        that.validate();

        return that;
    }

    distributeChange(change) {

        var that = this;

        if (change instanceof RootChange) {
            that.onRootChanged(change);
        } else if (change instanceof ChildChange) {
            that.onChildChanged(change);
        }

        return that;
    }

    onRootChanged(change) {

    }

    onChildChanged(change) {

        var that = this;

        var newParent = change.parent;
        var oldParent = change.previous;

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


    // event handlers
    // --------------

    isValidEvent(e, view) {

        // If the event is interesting, guard returns `true`.
        // Otherwise, it return `false`.

        if (view && view.cell && view.cell instanceof Cell) {
            return true;
        } else {

            var that = this;
            var svg = that.svg;
            var target = e.target;

            if (svg === target || containsElem(svg, target)) {
                return true;
            }
        }
    }

    onContextMenu(e) {

        e = normalizeEvent(e);

        var that = this;
        var view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        var localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            that.sourceView = view;
            view.onContextMenu(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:contextmenu', e, localPoint.x, localPoint.y);
        }
    }

    onMouseDblClick(e) {

        e.preventDefault();
        e = normalizeEvent(e);

        var that = this;
        var view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        var localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            view.onMouseDblClick(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:pointerdblclick', e, localPoint.x, localPoint.y);
        }
    }

    onMouseClick(e) {}

    onPointerDown(e) {

        e = normalizeEvent(e);

        var that = this;
        var view = that.findViewByElem(e.target);

        if (!that.isValidEvent(e, view)) {
            return;
        }

        var localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

        if (view) {
            view.onPointerDown(e, localPoint.x, localPoint.y);
        } else {
            that.trigger('blank:pointerDown', e, localPoint.x, localPoint.y);
        }
    }

    onPointerMove(e) {

        e.preventDefault();
        e = normalizeEvent(e);

        var that = this;
        var sourceView = that.sourceView;

        if (sourceView) {

            var localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});

            that._mouseMoved++;

            sourceView.onPointerMove(e, localPoint.x, localPoint.y);
        }
    }

    onPointerUp(e) {

        e = normalizeEvent(e);

        var that = this;
        var localPoint = that.snapToGrid({x: e.clientX, y: e.clientY});
        var sourceView = that.sourceView;

        if (sourceView) {
            sourceView.onPointerUp(e, localPoint.x, localPoint.y);
            that.sourceView = null;
        } else {
            that.trigger('blank:pointerUp', e, localPoint.x, localPoint.y);
        }
    }

    onCellMouseOver(e) {

        e = normalizeEvent(e);

        var that = this;
        var view = that.findViewByElem(e.target);

        if (view) {

            if (!that.isValidEvent(e, view)) {
                return;
            }

            view.mouseover(e);
        }
    }

    onCellMouseOut(e) {

        e = normalizeEvent(e);

        var that = this;
        var view = that.findViewByElem(e.target);

        if (view) {

            if (!that.isValidEvent(e, view)) {
                return;
            }

            view.mouseout(e);
        }
    }
}

export default Paper;
