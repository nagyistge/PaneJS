/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');
var Event = require('./events/Event');
var constants = require('./constants');
var View = require('./View');
var Model = require('./Model');

var isNUllOrUndefined = utils.isNUllOrUndefined;

module.exports = Class.create({
    Implements: Event,
    constructor: function Graph(container, model/*, stylesheet*/) {

        var graph = this;

        graph.mouseListeners = null;
        graph.model = model ? model : graph.createModel();
        graph.multiplicities = [];
        graph.imageBundles = [];
        //graph.cellRenderer = graph.createCellRenderer();
        //graph.setSelectionModel(graph.createSelectionModel());
        //graph.setStylesheet(stylesheet ? stylesheet : graph.createStylesheet());
        graph.view = graph.createView();

        if (container) {
            graph.init(container);
        }

        graph.view.revalidate();
    },

    EMPTY_ARRAY: [],
    mouseListeners: null,
    isMouseDown: false,
    model: null,
    view: null,
    stylesheet: null,
    selectionModel: null,
    cellEditor: null,
    cellRenderer: null,
    multiplicities: null,

    gridSize: 10,
    gridEnabled: true,
    portsEnabled: true,
    nativeDblClickEnabled: true,
    doubleTapEnabled: true,
    doubleTapTimeout: 500,
    doubleTapTolerance: 25,
    lastTouchX: 0,
    lastTouchY: 0,
    lastTouchTime: 0,
    tapAndHoldEnabled: true,
    tapAndHoldDelay: 500,
    tapAndHoldInProgress: false,
    tapAndHoldValid: false,
    initialTouchX: 0,
    initialTouchY: 0,
    tolerance: 0,
    defaultOverlap: 0.5,
    defaultParent: null,
    alternateEdgeStyle: null,
    backgroundImage: null,
    pageVisible: false,
    pageBreaksVisible: false,
    pageBreakColor: 'gray',
    pageBreakDashed: true,
    minPageBreakDist: 20,
    preferPageSize: false,
    pageFormat: null,// constants.PAGE_FORMAT_A4_PORTRAIT;
    pageScale: 1.5,
    enabled: true,

    escapeEnabled: true,
    invokesStopCellEditing: true,
    enterStopsCellEditing: false,
    useScrollbarsForPanning: true,
    exportEnabled: true,
    importEnabled: true,
    cellsLocked: false,
    cellsCloneable: true,
    foldingEnabled: true,
    cellsEditable: true,
    cellsDeletable: true,
    cellsMovable: true,
    edgeLabelsMovable: true,
    vertexLabelsMovable: false,
    dropEnabled: false,
    splitEnabled: true,
    cellsResizable: true,
    cellsBendable: true,
    cellsSelectable: true,
    cellsDisconnectable: true,
    autoSizeCells: false,
    autoSizeCellsOnAdd: false,
    autoScroll: true,
    timerAutoScroll: false,
    allowAutoPanning: false,
    ignoreScrollbars: false,
    autoExtend: true,
    maximumGraphBounds: null,
    minimumGraphSize: null,
    minimumContainerSize: null,
    maximumContainerSize: null,
    resizeContainer: false,
    border: 0,
    keepEdgesInForeground: false,
    keepEdgesInBackground: false,
    allowNegativeCoordinates: true,
    constrainChildren: true,
    constrainChildrenOnResize: false,
    extendParents: true,
    extendParentsOnAdd: true,
    extendParentsOnMove: false,
    recursiveResize: false,
    collapseToPreferredSize: true,
    zoomFactor: 1.2,
    keepSelectionVisibleOnZoom: false,
    centerZoom: true,
    resetViewOnRootChange: true,
    resetEdgesOnResize: false,
    resetEdgesOnMove: false,
    resetEdgesOnConnect: true,
    allowLoops: false,
    //defaultLoopStyle: mxEdgeStyle.Loop, // TODO
    multigraph: true,
    connectableEdges: false,
    allowDanglingEdges: true,
    cloneInvalidEdges: false,
    disconnectOnMove: true,
    labelsVisible: true,
    htmlLabels: false,
    swimlaneSelectionEnabled: true,
    swimlaneNesting: true,
    swimlaneIndicatorColorAttribute: constants.STYLE_FILLCOLOR,
    imageBundles: null,
    minFitScale: 0.1,
    maxFitScale: 8,
    panDx: 0,
    panDy: 0,

    collapsedImage: null,
    expandedImage: null,
    warningImage: null,
    alreadyConnectedResource: null,
    containsValidationErrorsResource: null,
    collapseExpandResource: null,

    init: function (container) {

        var graph = this;

        graph.container = container;

        // Initializes the in-place editor
        //this.cellEditor = this.createCellEditor();

        // Initializes the container using the view
        graph.view.init();

        // Updates the size of the container for the current graph
        graph.sizeDidChange();

        // Hides tooltips and resets tooltip timer if mouse leaves container
        //mxEvent.addListener(container, 'mouseleave', mxUtils.bind(this, function () {
        //    if (this.tooltipHandler != null) {
        //        this.tooltipHandler.hide();
        //    }
        //}));
    },

    createModel: function () {
        return new Model();
    },

    createView: function () {
        return new View(this);
    },

    getModel: function () {
        return this.model;
    },

    getView: function () {
        return this.view;
    },


    insertVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var graph = this;
        var vertex = graph.createVertex(parent, id, value, x, y, width, height, style, relative);
        return graph.addCell(vertex, parent);
    },

    createVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height);
        geometry.relative = !isNUllOrUndefined(relative) ? relative : false;

        // Creates the vertex
        var vertex = new Cell(value, geometry, style);
        vertex.setId(id);
        vertex.setVertex(true);
        vertex.setConnectable(true);

        return vertex;
    },

    insertEdge: function (parent, id, value, source, target, style) {

    },

    createEdge: function (parent, id, value, source, target, style) {
        var geometry = new Geometry();
        geometry.relative = true;

        var edge = new Cell(value, geometry, style);
        edge.setId(id);
        edge.setEdge(true);

        return edge;
    },

});

