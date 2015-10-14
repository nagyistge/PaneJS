/* jshint node: true, loopfunc: true, undef: true, unused: true */
///* global document */
/*jshint -W030 */

// TODO: cell 可以细分为 连线和节点 两种，这里放在同一个类中有点生硬

var Class = require('./class');
var utils = require('./utils');
var constants = require('./constants');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    constructor: function Cell(value, geometry, style) {

        var cell = this;

        cell.value = value;
        cell.setGeometry(geometry);
        cell.setStyle(style);

        cell.onInit && cell.onInit();
    },

    id: null,
    value: null,
    geometry: null,
    style: null,

    vertex: false,
    edge: false,
    connectable: true,
    visible: true,
    collapsed: false,

    source: null,
    target: null,

    parent: null,
    children: null,
    edges: null,

    // getter, setter
    // --------------
    getId: function () {
        return this.id;
    },

    setId: function (id) {
        this.id = id;
    },

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        this.value = value;
    },

    getGeometry: function () {
        return this.geometry;
    },

    setGeometry: function (geometry) {
        this.geometry = geometry;
    },

    getStyle: function () {
        return this.style;
    },

    setStyle: function (style) {
        this.style = style;
    },

    isVertex: function () {
        return this.vertex;
    },

    setVertex: function (vertex) {
        this.vertex = vertex;
    },

    isEdge: function () {
        return this.edge;
    },

    setEdge: function (edge) {
        this.edge = edge;
    },

    isConnectable: function () {
        return this.connectable;
    },

    setConnectable: function (connectable) {
        this.connectable = connectable;
    },

    isVisible: function () {
        return this.visible;
    },

    setVisible: function (visible) {
        this.visible = visible;
    },

    isCollapsed: function () {
        return this.collapsed;
    },

    setCollapsed: function (collapsed) {
        this.collapsed = collapsed;
    },

    getParent: function () {
        return this.parent;
    },

    setParent: function (parent) {
        this.parent = parent;
    },

    getTerminal: function (source) {
        return (source) ? this.source : this.target;
    },

    setTerminal: function (terminal, isSource) {
        if (isSource) {
            this.source = terminal;
        }
        else {
            this.target = terminal;
        }

        return terminal;
    },

    getChildCount: function () {
        return this.children ? this.children.length : 0;
    },

    getIndex: function (child) {
        return utils.indexOf(this.children, child);
    },

    getChildAt: function (index) {
        return this.children ? this.children[index] : null;
    },

    insert: function (child, index) {
        if (child) {
            if (isNullOrUndefined(index)) {
                index = this.getChildCount();

                if (child.getParent() === this) {
                    index--;
                }
            }

            child.removeFromParent();
            child.setParent(this);

            if (!this.children) {
                this.children = [];
                this.children.push(child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        return child;
    },

    remove: function (index) {
        var child = null;

        if (this.children !== null && index >= 0) {
            child = this.getChildAt(index);

            if (child !== null) {
                this.children.splice(index, 1);
                child.setParent(null);
            }
        }

        return child;
    },

    removeFromParent: function () {
        if (this.parent !== null) {
            var index = this.parent.getIndex(this);
            this.parent.remove(index);
        }
    },

    getEdgeCount: function () {
        return (this.edges === null) ? 0 : this.edges.length;
    },

    getEdgeIndex: function (edge) {
        return utils.indexOf(this.edges, edge);
    },

    getEdgeAt: function (index) {
        return (this.edges === null) ? null : this.edges[index];
    },

    insertEdge: function (edge, isOutgoing) {
        if (edge !== null) {
            edge.removeFromTerminal(isOutgoing);
            edge.setTerminal(this, isOutgoing);

            if (this.edges === null ||
                edge.getTerminal(!isOutgoing) !== this ||
                utils.indexOf(this.edges, edge) < 0) {
                if (this.edges === null) {
                    this.edges = [];
                }

                this.edges.push(edge);
            }
        }

        return edge;
    },

    removeEdge: function (edge, isOutgoing) {
        if (edge !== null) {
            if (edge.getTerminal(!isOutgoing) !== this &&
                this.edges !== null) {
                var index = this.getEdgeIndex(edge);

                if (index >= 0) {
                    this.edges.splice(index, 1);
                }
            }

            edge.setTerminal(null, isOutgoing);
        }

        return edge;
    },

    removeFromTerminal: function (isSource) {
        var terminal = this.getTerminal(isSource);

        if (terminal !== null) {
            terminal.removeEdge(this, isSource);
        }
    },

    getAttribute: function (name, defaultValue) {
        var userObject = this.getValue();

        var val = (userObject !== null &&
        userObject.nodeType === constants.NODETYPE_ELEMENT) ?
            userObject.getAttribute(name) : null;

        return val || defaultValue;
    },

    setAttribute: function (name, value) {
        var userObject = this.getValue();

        if (userObject !== null &&
            userObject.nodeType === constants.NODETYPE_ELEMENT) {
            userObject.setAttribute(name, value);
        }
    },

    clone: function () {
        var clone = utils.clone(this, this.mxTransient);
        clone.setValue(this.cloneValue());

        return clone;
    },

    cloneValue: function () {
        var value = this.getValue();

        if (value !== null) {
            if (typeof(value.clone) === 'function') {
                value = value.clone();
            }
            else if (!isNaN(value.nodeType)) {
                value = value.cloneNode(true);
            }
        }

        return value;
    },

    valueChanged: function (newValue) {
        var previous = this.getValue();
        this.setValue(newValue);

        return previous;
    }
});
