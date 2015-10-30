/* jshint node: true, loopfunc: true, undef: true, unused: true */
/* global document */

var Class = require('../common/class');
var utils = require('../common/utils');
var detector = require('../common/detector');
var Point = require('../Point');
var Rectangle = require('../Rectangle');
var domEvent = require('../events/domEvent');
var MouseEvent = require('../events/MouseEvent');

var Rubberband = Class.create({

    defaultOpacity : 20,
    enabled : true,
    div : null,
    sharedDiv : null,
    currentX : 0,
    currentY : 0,

    constructor: function Rubberband(graph) {
        if (graph != null) {
            this.graph = graph;
            this.graph.addMouseListener(this);

            // Handles force rubberband event
            this.forceRubberbandHandler = utils.bind(this, function (sender, evt) {
                var evtName = evt.getProperty('eventName');
                var me = evt.getProperty('event');

                if (evtName == domEvent.MOUSE_DOWN && this.isForceRubberbandEvent(me)) {
                    var offset = utils.getOffset(this.graph.container);
                    var origin = utils.getScrollOrigin(this.graph.container);
                    origin.x -= offset.x;
                    origin.y -= offset.y;
                    this.start(me.getX() + origin.x, me.getY() + origin.y);
                    me.consume(false);
                }
            });

            this.graph.on(domEvent.FIRE_MOUSE_EVENT, this.forceRubberbandHandler);

            // Repaints the marquee after autoscroll
            this.panHandler = utils.bind(this, function () {
                this.repaint();
            });

            this.graph.on(domEvent.PAN, this.panHandler);

            // Does not show menu if any touch gestures take place after the trigger
            this.gestureHandler = utils.bind(this, function (sender, eo) {
                if (this.first != null) {
                    this.reset();
                }
            });

            this.graph.on(domEvent.GESTURE, this.gestureHandler);

            // Automatic deallocation of memory
            if (detector.IS_IE) {
                domEvent.on(window, 'unload',
                    utils.bind(this, function () {
                        this.destroy();
                    })
                );
            }
        }
    },

    isEnabled : function () {
        return this.enabled;
    },


    setEnabled : function (enabled) {
        this.enabled = enabled;
    },


    isForceRubberbandEvent : function (me) {
        return domEvent.isAltDown(me.getEvent());
    },


    mouseDown : function (sender, me) {
        if (!me.isConsumed() && this.isEnabled() && this.graph.isEnabled() &&
            me.getState() == null && !domEvent.isMultiTouchEvent(me.getEvent())) {
            var offset = utils.getOffset(this.graph.container);
            var origin = utils.getScrollOrigin(this.graph.container);
            origin.left -= offset.left;
            origin.left -= offset.left;
            this.start(me.getX() + origin.left, me.getY() + origin.left);

            me.consume(false);
        }
    },


    start : function (x, y) {
        this.first = new Point(x, y);

        var container = this.graph.container;

        function createMouseEvent(evt) {
            var me = new MouseEvent(evt);
            var pt = utils.convertPoint(container, me.getX(), me.getY());

            me.graphX = pt.x;
            me.graphY = pt.y;

            return me;
        };

        this.dragHandler = utils.bind(this, function (evt) {
            this.mouseMove(this.graph, createMouseEvent(evt));
        });

        this.dropHandler = utils.bind(this, function (evt) {
            this.mouseUp(this.graph, createMouseEvent(evt));
        });

        if (detector.IS_FF) {
            domEvent.onGesture(document, null, this.dragHandler, this.dropHandler);
        }
    },


    mouseMove : function (sender, me) {
        if (!me.isConsumed() && this.first != null) {
            var origin = utils.getScrollOrigin(this.graph.container);
            var offset = utils.getOffset(this.graph.container);
            origin.left -= offset.left;
            origin.top -= offset.top;
            var x = me.getX() + origin.left;
            var y = me.getY() + origin.top;
            var dx = this.first.x - x;
            var dy = this.first.y - y;
            var tol = this.graph.tolerance;

            if (this.div != null || Math.abs(dx) > tol || Math.abs(dy) > tol) {
                if (this.div == null) {
                    this.div = this.createShape();
                }

                // Clears selection while rubberbanding. This is required because
                // the event is not consumed in mouseDown.
                utils.clearSelection();

                this.update(x, y);
                me.consume();
            }
        }
    },


    createShape : function () {
        if (this.sharedDiv == null) {
            this.sharedDiv = document.createElement('div');
            this.sharedDiv.className = 'rubberband';
            utils.setOpacity(this.sharedDiv, this.defaultOpacity);
        }

        this.graph.container.appendChild(this.sharedDiv);

        return this.sharedDiv;
    },


    mouseUp : function (sender, me) {
        var execute = this.div != null && this.div.style.display != 'none';
        this.reset();

        if (execute) {
            var rect = new Rectangle(this.x, this.y, this.width, this.height);
            this.graph.selectRegion(rect, me.getEvent());
            me.consume();
        }
    },


    reset : function () {
        if (this.div != null) {
            this.div.parentNode.removeChild(this.div);
        }

        domEvent.offGesture(document, null, this.dragHandler, this.dropHandler);
        this.dragHandler = null;
        this.dropHandler = null;

        this.currentX = 0;
        this.currentY = 0;
        this.first = null;
        this.div = null;
    },


    update : function (x, y) {
        this.currentX = x;
        this.currentY = y;

        this.repaint();
    },


    repaint : function () {
        if (this.div != null) {
            var x = this.currentX - this.graph.panDx;
            var y = this.currentY - this.graph.panDy;

            this.x = Math.min(this.first.x, x);
            this.y = Math.min(this.first.y, y);
            this.width = Math.max(this.first.x, x) - this.x;
            this.height = Math.max(this.first.y, y) - this.y;

            var dx = 0;
            var dy = 0;

            this.div.style.left = (this.x + dx) + 'px';
            this.div.style.top = (this.y + dy) + 'px';
            this.div.style.width = Math.max(1, this.width) + 'px';
            this.div.style.height = Math.max(1, this.height) + 'px';
        }
    },

    destroy : function () {
        if (!this.destroyed) {
            this.destroyed = true;
            this.graph.removeMouseListener(this);
            this.graph.removeListener(this.forceRubberbandHandler);
            this.graph.removeListener(this.panHandler);
            this.reset();

            if (this.sharedDiv != null) {
                this.sharedDiv = null;
            }
        }
    }

});

module.exports = Rubberband;

