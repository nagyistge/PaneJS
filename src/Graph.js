/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('./common/class');
var utils = require('./common/utils');
var Event = require('./events/Event');
var EventObject = require('./events/EventObject');
var constants = require('./constants');
var View = require('./View');
var Model = require('./Model');
var Cell = require('./Cell');
var Geometry = require('./Geometry');
var Point = require('./Point');
var CellRenderer = require('./CellRenderer');
var Stylesheet = require('./Stylesheet');
var RootChange = require('./changes/RootChange');
var ChildChange = require('./changes/ChildChange');

var isNullOrUndefined = utils.isNullOrUndefined;

module.exports = Class.create({
    Implements: Event,

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

    constructor: function Graph(container, model, stylesheet) {

        var graph = this;

        graph.mouseListeners = null;
        graph.model = model ? model : new Model();
        graph.multiplicities = [];
        graph.imageBundles = [];
        graph.cellRenderer = graph.createCellRenderer();
        graph.setSelectionModel(graph.createSelectionModel());
        graph.setStylesheet(stylesheet ? stylesheet : graph.createStylesheet());
        graph.view = graph.createView();

        graph.model.on('change', function (evt) {
            graph.graphModelChanged(evt.getData('edit').changes);
        });

        if (container) {
            graph.init(container);
        }

        graph.view.revalidate();
    },

    init: function (container) {

        var graph = this;

        graph.container = container;

        // Initializes the in-place editor
        this.cellEditor = this.createCellEditor();

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


    createHandlers: function () {},
    //
    //
    createSelectionModel: function () {},
    createStylesheet: function () {
        return new Stylesheet();
    },
    createView: function () {
        return new View(this);
    },
    createCellRenderer: function () {
        return new CellRenderer();
    },
    createCellEditor: function () {},
    getModel: function () {
        return this.model;
    },
    getView: function () {
        return this.view;
    },

    getStylesheet: function () {
        return this.stylesheet;
    },
    setStylesheet: function (stylesheet) {
        this.stylesheet = stylesheet;
    },
    getSelectionModel: function () {
        return this.selectionModel;
    },
    setSelectionModel: function (selectionModel) {
        this.selectionModel = selectionModel;
    },
    getSelectionCellsForChanges: function () {},
    graphModelChanged: function (changes) {
        console.log(changes);
        for (var i = 0; i < changes.length; i++) {
            this.processChange(changes[i]);
        }

        this.removeSelectionCells(this.getRemovedCellsForChanges(changes));

        this.view.validate();
        this.sizeDidChange();
    },
    processChange: function (change) {
        if (change instanceof RootChange) {

        } else if (change instanceof ChildChange) {
            var newParent = this.model.getParent(change.child);
            this.view.invalidate(change.child, true, true);

            if (!newParent || this.isCellCollapsed(newParent)) {
                this.view.invalidate(change.child, true, true);
                this.removeStateForCell(change.child);

                // Handles special case of current root of view being removed
                if (this.view.currentRoot === change.child) {
                    this.home();
                }
            }

            if (newParent !== change.previous) {
                // Refreshes the collapse/expand icons on the parents
                if (newParent) {
                    this.view.invalidate(newParent, false, false);
                }

                if (change.previous != null) {
                    this.view.invalidate(change.previous, false, false);
                }
            }
        }

    },
    getRemovedCellsForChanges: function () {},
    removeStateForCell: function (cell) {
        var childCount = this.model.getChildCount(cell);

        for (var i = 0; i < childCount; i++) {
            this.removeStateForCell(this.model.getChildAt(cell, i));
        }

        this.view.invalidate(cell, false, true);
        this.view.removeState(cell);
    },


    // Overlays
    // ---------
    addCellOverlay: function (cell, overlay) {},
    getCellOverlays: function (cell) {
        return cell.overlays;
    },
    removeCellOverlay: function (cell, overlay) {},
    removeCellOverlays: function (cell) {},
    clearCellOverlays: function (cell) {},
    setCellWarning: function () {},


    // In-place editing
    // ----------------
    startEditing: function (evt) {},
    startEditingAtCell: function (cell, evt) {},
    getEditingValue: function (cell, evt) {},
    stopEditing: function (cancel) {},
    labelChanged: function (cell, value, evt) {},
    cellLabelChanged: function (cell, value, autoSize) {},


    // Event processing
    // ----------------
    escape: function (evt) {},
    click: function (me) {},
    dblClick: function (evt, cell) {},
    tapAndHold: function (me) {},

    scrollPointToVisible: function (x, y, extend, border) {},
    createPanningManager: function () {},
    getBorderSizes: function () {},
    getPreferredPageSize: function (bounds, width, height) {},
    sizeDidChange: function () {},
    doResizeContainer: function (width, height) {},
    updatePageBreaks: function (visible, width, height) {},


    // Cell styles
    // -----------
    getCellStyle: function (cell) {
        var stylename = this.model.getStyle(cell);
        var style = null;

        // Gets the default style for the cell
        if (this.model.isEdge(cell)) {
            style = this.stylesheet.getDefaultEdgeStyle();
        }
        else {
            style = this.stylesheet.getDefaultVertexStyle();
        }

        // Resolves the stylename using the above as the default
        if (stylename != null) {
            style = this.postProcessCellStyle(this.stylesheet.getCellStyle(stylename, style));
        }

        // Returns a non-null value if no style can be found
        if (style == null) {
            style = [];//mxGraph.prototype.EMPTY_ARRAY;
        }

        return style;
    },
    postProcessCellStyle: function (style) {},
    setCellStyle: function (style, cells) {},
    setCellStyles: function (key, value, cells) {},
    toggleCellStyle: function (key, defaultValue, cell) {},
    toggleCellStyles: function (key, defaultValue, cells) {},
    toggleCellStyleFlags: function (key, flag, cells) {},
    setCellStyleFlags: function (key, flag, value, cells) {},


    // Cell alignment and orientation
    // ------------------------------
    alignCells: function (align, cells, param) {},
    flipEdge: function (edge) {},
    addImageBundle: function (bundle) {},
    removeImageBundle: function (bundle) {},
    getImageFromBundles: function (key) {},


    // Order
    // -----
    orderCells: function (back, cells) {},
    cellsOrdered: function (cells, back) {},


    // Grouping
    // --------
    groupCells: function (group, border, cells) {},
    getCellsForGroup: function (cells) {},
    getBoundsForGroup: function (group, children, border) {},
    createGroupCell: function (cells) {},
    ungroupCells: function (cells) {},
    removeCellsFromParent: function (cells) {},
    updateGroupBounds: function (cells, border, moveGroup, topBorder, rightBorder, bottomBorder, leftBorder) {},


    // Cell cloning, insertion and removal
    // -----------------------------------
    cloneCells: function (cells, allowInvalidEdges) {},
    insertVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var graph = this;
        var vertex = graph.createVertex(parent, id, value, x, y, width, height, style, relative);
        return graph.addCell(vertex, parent);
    },
    createVertex: function (parent, id, value, x, y, width, height, style, relative) {
        var geometry = new Geometry(x, y, width, height);
        geometry.relative = !isNullOrUndefined(relative) ? relative : false;

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
    addEdge: function (edge, parent, source, target, index) {},
    addCell: function (cell, parent, index, source, target) {
        return this.addCells([cell], parent, index, source, target)[0];
    },
    addCells: function (cells, parent, index, source, target) {
        parent = parent || this.getDefaultParent();
        index = !isNullOrUndefined(index) ? index : this.model.getChildCount(parent);

        this.model.beginUpdate();
        try {
            this.cellsAdded(cells, parent, index, source, target, false, true);

            //this.fireEvent(new mxEventObject(mxEvent.ADD_CELLS, 'cells', cells,
            //    'parent', parent, 'index', index, 'source', source, 'target', target));

            this.emit(new EventObject('addCells', {
                cells: cells,
                parent: parent,
                index: index,
                source: source,
                target: target
            }));
        }
        finally {
            this.model.endUpdate();
        }

        return cells;
    },
    cellsAdded: function (cells, parent, index, source, target, absolute, constrain) {
        if (cells && parent && !isNullOrUndefined(index)) {
            this.model.beginUpdate();
            try {
                var parentState = absolute ? this.view.getState(parent) : null;
                var o1 = parentState ? parentState.origin : null;
                var zero = new Point(0, 0);

                for (var i = 0; i < cells.length; i++) {
                    if (!cells[i]) {
                        index--;
                    } else {
                        var previous = this.model.getParent(cells[i]);

                        // Keeps the cell at its absolute location
                        if (o1 && cells[i] !== parent && parent !== previous) {
                            var oldState = this.view.getState(previous);
                            var o2 = oldState ? oldState.origin : zero;
                            var geo = this.model.getGeometry(cells[i]);

                            if (geo) {
                                var dx = o2.x - o1.x;
                                var dy = o2.y - o1.y;

                                // FIXME: Cells should always be inserted first before any other edit
                                // to avoid forward references in sessions.
                                geo = geo.clone();
                                geo.translate(dx, dy);

                                if (!geo.relative && this.model.isVertex(cells[i]) && !this.isAllowNegativeCoordinates()) {
                                    geo.x = Math.max(0, geo.x);
                                    geo.y = Math.max(0, geo.y);
                                }

                                this.model.setGeometry(cells[i], geo);
                            }
                        }

                        // Decrements all following indices
                        // if cell is already in parent
                        if (parent === previous && index + i > this.model.getChildCount(parent)) {
                            index--;
                        }

                        this.model.add(parent, cells[i], index + i);

                        if (this.autoSizeCellsOnAdd) {
                            this.autoSizeCell(cells[i], true);
                        }

                        // Extends the parent or constrains the child
                        if (this.isExtendParentsOnAdd() && this.isExtendParent(cells[i])) {
                            this.extendParent(cells[i]);
                        }

                        // Additionally constrains the child after extending the parent
                        if (constrain == null || constrain) {
                            this.constrainChild(cells[i]);
                        }

                        // Sets the source terminal
                        if (source != null) {
                            this.cellConnected(cells[i], source, true);
                        }

                        // Sets the target terminal
                        if (target != null) {
                            this.cellConnected(cells[i], target, false);
                        }
                    }
                }

                //this.fireEvent(new mxEventObject(mxEvent.CELLS_ADDED, 'cells', cells,
                //    'parent', parent, 'index', index, 'source', source, 'target', target,
                //    'absolute', absolute));

                this.emit(new EventObject('cellsAdded', {
                    cells: cells,
                    parent: parent,
                    index: index,
                    source: source,
                    target: target,
                    absolute: absolute
                }));
            }
            finally {
                this.model.endUpdate();
            }
        }
    },
    autoSizeCell: function (cell, recurse) {},
    removeCells: function (cells, includeEdges) {},
    cellsRemoved: function (cells) {},
    splitEdge: function (edge, cells, newEdge, dx, dy) {},


    // Cell visibility
    // ---------------
    toggleCells: function (show, cells, includeEdges) {},
    cellsToggled: function (cells, show) {},


    // Folding
    // -------
    foldCells: function () {},
    cellsFolded: function () {},
    swapBounds: function () {},
    updateAlternateBounds: function () {},
    addAllEdges: function () {},
    getAllEdges: function () {},


    // Cell sizing
    // -----------
    updateCellSize: function () {},
    cellSizeUpdated: function () {},
    getPreferredSizeForCell: function () {},
    resizeCell: function () {},
    resizeCells: function () {},
    cellsResized: function () {},
    cellResized: function () {},
    resizeChildCells: function () {},
    constrainChildCells: function () {},
    scaleCell: function () {},
    extendParent: function () {},


    // Cell moving
    // -----------
    importCells: function () {},
    moveCells: function () {},
    cellsMoved: function () {},
    translateCell: function () {},
    getCellContainmentArea: function () {},
    getMaximumGraphBounds: function () {},
    constrainChild: function () {},
    resetEdges: function () {},
    resetEdge: function () {},


    // Cell connecting and connection constraints
    // ------------------------------------------
    getOutlineConstraint: function () {},
    getAllConnectionConstraints: function () {},
    getConnectionConstraint: function () {},
    setConnectionConstraint: function () {},
    getConnectionPoint: function () {},
    connectCell: function () {},
    cellConnected: function () {},
    disconnectGraph: function () {},


    // Drilldown
    // ---------
    getCurrentRoot: function () {
        return this.view.currentRoot;
    },
    getTranslateForRoot: function () {},
    isPort: function () {},
    getTerminalForPort: function () {},
    getChildOffsetForCell: function (cell) {
        return null;
    },
    enterGroup: function () {},
    exitGroup: function () {},
    home: function () {},
    isValidRoot: function () {},


    // Graph display
    // -------------
    getGraphBounds: function () {},
    getCellBounds: function () {},
    getBoundingBoxFromGeometry: function () {},
    refresh: function () {},
    snap: function () {},
    panGraph: function () {},
    zoomIn: function () {},
    zoomOut: function () {},
    zoomActual: function () {},
    zoomTo: function () {},
    center: function () {},
    zoom: function () {},
    zoomToRect: function () {},
    fit: function () {},
    scrollCellToVisible: function () {},
    scrollRectToVisible: function () {},
    getCellGeometry: function (cell) {
        return this.model.getGeometry(cell);
    },
    isCellVisible: function (cell) {
        return this.model.isVisible(cell);
    },
    isCellCollapsed: function (cell) {
        return this.model.isCollapsed(cell);
    },
    isCellConnectable: function () {},
    isOrthogonal: function () {},
    isLoop: function () {},
    isCloneEvent: function () {},
    isToggleEvent: function () {},
    isGridEnabledEvent: function () {},
    isConstrainedEvent: function () {},


    // Validation
    // ----------

    validationAlert: function () {},
    isEdgeValid: function () {},
    getEdgeValidationError: function () {},
    validateEdge: function () {},
    validateGraph: function () {},
    getCellValidationError: function () {},
    validateCell: function () {},


    // Graph appearance
    // ----------------
    getBackgroundImage: function () {},
    setBackgroundImage: function () {},
    getFoldingImage: function () {},
    convertValueToString: function (cell) {
        var value = this.model.getValue(cell);

        if (value) {
            if (utils.isNode(value)) {
                return value.nodeName;
            } else if (utils.isFunction(value.toString)) {
                return value.toString();
            }
        }

        return '';
    },
    getLabel: function (cell) {
        var result = '';

        if (this.labelsVisible && cell) {
            var state = this.view.getState(cell);
            var style = (state) ? state.style : this.getCellStyle(cell);

            if (!utils.getValue(style, constants.STYLE_NOLABEL, false)) {
                result = this.convertValueToString(cell);
            }
        }

        return result;
    },
    isHtmlLabel: function () {
        return this.isHtmlLabels();
    },
    isHtmlLabels: function () {
        return this.htmlLabels;
    },
    setHtmlLabels: function () {},
    isWrapping: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_WHITE_SPACE] == 'wrap' : false;
    },
    isLabelClipped: function (cell) {
        var state = this.view.getState(cell);
        var style = (state) ? state.style : this.getCellStyle(cell);

        return (style) ? style[constants.STYLE_OVERFLOW] == 'hidden' : false;
    },
    getTooltip: function () {},
    getTooltipForCell: function () {},
    getCursorForMouseEvent: function () {},
    getCursorForCell: function () {},
    getStartSize: function () {},
    getImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_IMAGE] : null;
    },
    getVerticalAlign: function () {},
    getIndicatorColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_COLOR] : null;
    },
    getIndicatorGradientColor: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_GRADIENTCOLOR] : null;
    },
    getIndicatorShape: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_SHAPE] : null;

    },
    getIndicatorImage: function (state) {
        return (state && state.style) ? state.style[constants.STYLE_INDICATOR_IMAGE] : null;
    },
    getBorder: function () {},
    setBorder: function () {},
    isSwimlane: function () {},


    // Graph behaviour
    // ---------------
    isResizeContainer: function () {},
    setResizeContainer: function () {},
    isEnabled: function () {},
    setEnabled: function () {},
    isEscapeEnabled: function () {},
    setEscapeEnabled: function () {},
    isInvokesStopCellEditing: function () {},
    setInvokesStopCellEditing: function () {},
    isEnterStopsCellEditing: function () {},
    setEnterStopsCellEditing: function () {},
    isCellLocked: function () {},
    isCellsLocked: function () {},
    setCellsLocked: function () {},
    getCloneableCells: function () {},
    isCellCloneable: function () {},
    isCellsCloneable: function () {},
    setCellsCloneable: function () {},
    getExportableCells: function () {},
    canExportCell: function () {},
    getImportableCells: function () {},
    canImportCell: function () {},
    isCellSelectable: function () {},
    isCellsSelectable: function () {},
    setCellsSelectable: function () {},
    getDeletableCells: function () {},
    isCellDeletable: function () {},
    isCellsDeletable: function () {},
    setCellsDeletable: function () {},
    isLabelMovable: function () {},
    isCellRotatable: function () {},
    getMovableCells: function () {},
    isCellMovable: function () {},
    isCellsMovable: function () {},
    setCellsMovable: function () {},
    isGridEnabled: function () {},
    setGridEnabled: function () {},
    isPortsEnabled: function () {},
    setPortsEnabled: function () {},
    getGridSize: function () {},
    setGridSize: function () {},
    getTolerance: function () {},
    setTolerance: function () {},
    isVertexLabelsMovable: function () {},
    setVertexLabelsMovable: function () {},
    isEdgeLabelsMovable: function () {},
    setEdgeLabelsMovable: function () {},
    isSwimlaneNesting: function () {},
    setSwimlaneNesting: function () {},
    isSwimlaneSelectionEnabled: function () {},
    setSwimlaneSelectionEnabled: function () {},
    isMultigraph: function () {},
    setMultigraph: function () {},
    isAllowLoops: function () {},
    setAllowDanglingEdges: function () {},
    isAllowDanglingEdges: function () {},
    setConnectableEdges: function () {},
    isConnectableEdges: function () {},
    setCloneInvalidEdges: function () {},
    isCloneInvalidEdges: function () {},
    setAllowLoops: function () {},
    isDisconnectOnMove: function () {},
    setDisconnectOnMove: function () {},
    isDropEnabled: function () {},
    setDropEnabled: function () {},
    isSplitEnabled: function () {},
    setSplitEnabled: function () {},
    isCellResizable: function () {},
    isCellsResizable: function () {},
    setCellsResizable: function () {},
    isTerminalPointMovable: function () {},
    isCellBendable: function () {},
    isCellsBendable: function () {},
    setCellsBendable: function () {},
    isCellEditable: function () {},
    isCellsEditable: function () {},
    setCellsEditable: function () {},
    isCellDisconnectable: function () {},
    isCellsDisconnectable: function () {},
    setCellsDisconnectable: function () {},
    isValidSource: function () {},
    isValidTarget: function () {},
    isValidConnection: function () {},
    setConnectable: function () {},
    isConnectable: function () {},
    setTooltips: function () {},
    setPanning: function () {},
    isEditing: function () {},
    isAutoSizeCell: function () {},
    isAutoSizeCells: function () {},
    setAutoSizeCells: function () {},
    isExtendParent: function () {},
    isExtendParents: function () {},
    setExtendParents: function () {},
    isExtendParentsOnAdd: function () {},
    setExtendParentsOnAdd: function () {},
    isExtendParentsOnMove: function () {},
    setExtendParentsOnMove: function () {},
    isRecursiveResize: function () {},
    setRecursiveResize: function () {},
    isConstrainChild: function () {},
    isConstrainChildren: function () {},
    setConstrainChildren: function () {},
    setConstrainChildrenOnResize: function () {},
    isConstrainChildrenOnResize: function () {},
    isAllowNegativeCoordinates: function () {},
    setAllowNegativeCoordinates: function () {},
    getOverlap: function () {},
    isAllowOverlapParent: function () {},
    getFoldableCells: function () {},
    isCellFoldable: function () {},
    isValidDropTarget: function () {},
    isSplitTarget: function () {},
    getDropTarget: function () {},


    // Cell retrieval
    // ---------------
    getDefaultParent: function () {
        var parent = this.getCurrentRoot() || this.defaultParent;

        if (!parent) {
            var root = this.model.getRoot();
            parent = this.model.getChildAt(root, 0);
        }

        return parent;
    },
    setDefaultParent: function () {},
    getSwimlane: function () {},
    getSwimlaneAt: function () {},
    getCellAt: function () {},
    intersects: function () {},
    hitsSwimlaneContent: function () {},
    getChildVertices: function () {},
    getChildEdges: function () {},
    getChildCells: function () {},
    getConnections: function () {},
    getIncomingEdges: function () {},
    getOutgoingEdges: function () {},
    getEdges: function () {},
    isValidAncestor: function () {},
    getOpposites: function () {},
    getEdgesBetween: function () {},
    getPointForEvent: function () {},
    getCells: function () {},
    getCellsBeyond: function () {},
    findTreeRoots: function () {},
    traverse: function () {},


    // Selection
    // ---------
    isCellSelected: function () {},
    isSelectionEmpty: function () {},
    clearSelection: function () {},
    getSelectionCount: function () {},
    getSelectionCell: function () {},
    getSelectionCells: function () {},
    setSelectionCell: function () {},
    setSelectionCells: function () {},
    addSelectionCell: function () {},
    addSelectionCells: function () {},
    removeSelectionCell: function () {},
    removeSelectionCells: function () {},
    selectRegion: function () {},
    selectNextCell: function () {},
    selectPreviousCell: function () {},
    selectParentCell: function () {},
    selectChildCell: function () {},
    selectCell: function () {},
    selectAll: function () {},
    selectVertices: function () {},
    selectEdges: function () {},
    selectCells: function () {},
    selectCellForEvent: function () {},
    selectCellsForEvent: function () {},

    // Selection state
    // ---------------
    createHandler: function () {},
    createVertexHandler: function () {},
    createEdgeHandler: function () {},
    createEdgeSegmentHandler: function () {},
    createElbowEdgeHandler: function () {},


    // Graph events
    // ------------
    addMouseListener: function () {},
    removeMouseListener: function () {},
    updateMouseEvent: function () {},
    getStateForTouchEvent: function () {},
    isEventIgnored: function () {},
    isSyntheticEventIgnored: function () {},
    isEventSourceIgnored: function () {},
    fireMouseEvent: function () {},
    consumeMouseEvent: function () {},
    fireGestureEvent: function () {},

    destroy: function () {}
});

