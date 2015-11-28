import {
    merge,
    forEach,
} from '../common/utils';

import Events from '../common/Events';
import vector from '../common/vector';

import Model    from './Model';
import LinkView from '../views/LinkView';
import NodeView from '../views/NodeView';

import RootChange  from '../changes/RootChange';
import ChildChange from '../changes/ChildChange';


// the default options for paper
const OPTIONS = {
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
    //  - paper:configure
    //  - paper:init
    //  - paper:setup
    //  - paper:destroy
    //  - paper:resize

    configure(options) {

        var that = this;

        that.options = merge({}, OPTIONS, options);
        that.trigger('paper:configure', that.options);

        return that;
    }


    // lift cycle
    // ----------

    init(container) {

        // create svg

        var that = this;

        if (container) {

            var svg = vector('svg');
            var root = vector('g');
            var drawPane = vector('g');

            root.append(drawPane);
            svg.append(root);
            container.appendChild(svg.node);

            that.container = container;
            that.svg = svg.node;
            that.root = root.node;
            that.drawPane = drawPane.node;

            that.trigger('paper:init', container);
        }

        return that;
    }

    setup() {

        // install event listeners.

        var that = this;

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

            visible = visible && cell.isVisible();

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

    onPointerDown(e) {}

    onPointerMove(e) {}

    onPointerUp(e) {}
}

export default Paper;