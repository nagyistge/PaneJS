import {
    forEach,
} from '../common/utils';

import Class  from '../common/Class';
import Events from '../common/Events';
import vector from '../common/vector';

import LinkView from '../views/LinkView';
import NodeView from '../views/NodeView';
import Graph    from './Graph';


export default Class.create({

    Extends: Events,

    options: {
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        gridSize: 1,
        viewportClassName: 'pane-viewport',
        linkClassName: '',
        nodeClassName: '',
        getCellClassName: function (cell) {},
        getCellView: function (cell) {},
    },

    // events
    //  - paper:configure
    //  - paper:init
    //  - paper:setup
    //  - paper:destroy
    //  - paper:resize

    constructor: function Paper(container, graph, options) {

        var that = this;

        that.graph = graph || new Graph();

        that.configure(options);

        if (container) {
            that.init(container)
                .setup()
                .resize()
                .translate();
        }
    },

    configure: function (options) {

        var that = this;

        that.trigger('paper:configure', options);

        return that;
    },


    // lift cycle
    // ----------

    init: function (container) {

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
    },

    setup: function () {

        // install event listeners.

        var that = this;

        that.graph.on('change', that.processChanges, that);

        that.trigger('paper:setup');

        return that;
    },

    remove: function () {

    },

    destroy: function () {
        var that = this;

        that.trigger('paper:destroy');

        return that;
    },

    revalidate() {
        return this.invalidate().validate();
    },

    clear(cell, force = false, recurse = true) {

        var that = this;
        var model = that.graph.model;

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
    },

    invalidate(cell, recurse = true, includeLink = true) {

        var that = this;
        var graph = that.graph;

        cell = cell || graph.getRoot();

        var view = that.getCellView(cell);

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
    },

    validate(cell) {

        var that = this;

        cell = cell || that.graph.getRoot();

        that.validateCell(cell)
            .validateCellView(cell);

        return that;
    },

    validateCell(cell, visible = true) {

        // create or remove view for cell

        var that = this;

        if (!cell) {
            return cell;
        }

        visible = visible && cell.isVisible();

        var view = that.getCellView(cell, visible);

        if (view && !visible) {
            // remove the cell view, or wo can just hide it?
            that.removeCellView(cell);
        }

        cell.eachChild(function (child) {
            that.validateCell(child, visible);
        });

        return that;
    },

    validateCellView(cell, recurse = true) {

        var that = this;
        var view = that.getCellView(cell);

        if (view) {
            if (view.invalid) {
                view.invalid = false;

                // render
            }
        }

        if (recurse) {
            cell.eachChild(function (child) {
                that.validateCellView(child, recurse);
            });
        }

        var state = that.getState(cell);

        if (state) {
            if (state.invalid) {
                state.invalid = false;

                if (cell !== that.currentRoot) {
                    that.validateCellState(cell.parent, false);
                }

                if (cell.isLink) {
                    var sourceNode = that.getVisibleTerminal(cell, true);
                    var targetNode = that.getVisibleTerminal(cell, false);
                    var sourceState = that.validateCellState(sourceNode, false);
                    var targetState = that.validateCellState(targetNode, false);
                    state.setVisibleTerminalState(sourceState, true);
                    state.setVisibleTerminalState(targetState, false);
                }

                that.updateCellState(state);

                if (cell !== that.currentRoot) {
                    that.renderer.redraw(state, false, that.rendering);
                }
            }

            if (recurse) {
                // update `state.cellBounds` and `state.paintBounds`
                state.updateCachedBounds();

                // update order in DOM if recursively traversing
                if (state.shape) {
                    // TODO: stateValidated
                    //that.stateValidated(state);
                }

                cell.eachChild(function (child) {
                    that.validateCellState(child, true);
                });
            }
        }

        return state;
    },


    // transform
    // ---------

    resize: function (width, height) {

        var that = this;
        var options = that.options;

        width = options.width = width || options.width;
        height = options.height = height || options.height;

        vector(that.svg).attr({width: width, height: height});

        that.trigger('paper:resize', width, height);

        return that;
    },

    translate: function (x, y, absolute) {

        var that = this;
        var options = that.options;

        x = options.x = x || options.x;
        y = options.y = y || options.y;

        vector(that.root).translate(x, y, absolute);

        that.trigger('paper:translate', x, y);

        return that;
    },

    translateTo: function (x, y) {
        return this.translate(x, y, true);
    },

    scale: function (sx, sy, ox = 0, oy = 0) {

    },

    rotate: function (deg, ox = 0, oy = 0) {

    },


    // view
    // ----

    getCellView: function (cell, create) {

        var that = this;
        var views = that.views;

        if (cell) {
            var view = views ? views[cell.id] : null;

            if (!view && create && cell.visible) {
                view = that.createCellView(cell);
            }

            return view;
        }
    },

    createCellView: function (cell) {

        var that = this;
        var options = that.options;

        // get view constructor from options.
        var ViewClass = options.getCellView.call(that, cell);

        // get default view constructor.
        if (!ViewClass) {
            ViewClass = cell.isLink()
                ? LinkView : cell.isNode()
                ? NodeView
                : null;
        }

        if (ViewClass) {

            var view = new ViewClass(cell);
            var views = that.views;

            if (!views) {
                views = that.views = {};
            }

            views[cell.id] = view;

            return view;
        }
    },

    removeCellView: function (cell) {

    },

    renderCellView: function (cell) {

    },


    // changes
    // -------

    processChanges: function (changes) {

        var that = this;

        console.log(changes);

        forEach(changes, function (change) {
            that.distributeChange(change);
        });

        return that;
    },

    distributeChange: function (change) {

        var that = this;

        if (change instanceof RootChange) {
            that.onRootChanged(change);
        } else if (change instanceof ChildChange) {
            that.onChildChanged(change);
        }
    },

    onRootChanged: function (rootChange) {


    },

    onChildChanged: function (childChange) {

    },


    // event handlers
    // --------------

    onPointerDown: function (e) {},

    onPointerMove: function (e) {},

    onPointerUp: function (e) {}
});