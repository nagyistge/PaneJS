var container = document.getElementById('container')
var canvas    = new Canvas(container);


var startNode = panejs.utils.merge({
    id: panejs.utils.uuid(),
    name: '开始',
    outPorts: [{
        id: panejs.utils.uuid()
    }],
    position: {
        x: 100,
        y: 100
    }
}, nodesMapping.start);

var endNode = panejs.utils.merge({
    id: panejs.utils.uuid(),
    name: '结束',
    inPorts: [{
        id: panejs.utils.uuid()
    }],
    position: {
        x: 200,
        y: 200
    }
}, nodesMapping.end);

var judgeNode = panejs.utils.merge({
    id: panejs.utils.uuid(),
    name: '判定',
    position: {
        x: 320,
        y: 180
    }
}, nodesMapping.judge);


var subFlowNode = panejs.utils.merge({
    id: panejs.utils.uuid(),
    name: '子流程',
    position: {
        x: 320,
        y: 380
    }
}, nodesMapping.subFlow);

var commonNode = panejs.utils.merge({
    id: panejs.utils.uuid(),
    name: '通用节点',
    inPorts: [{
        id: panejs.utils.uuid()
    }, {
        id: panejs.utils.uuid()
    }],
    outPorts: [{
        id: panejs.utils.uuid()
    }, {
        id: panejs.utils.uuid()
    }, {
        id: panejs.utils.uuid()
    }],
    position: {
        x: 480,
        y: 120
    }
}, nodesMapping.common);

canvas.addNode(startNode);

canvas.addNodes([endNode, judgeNode, subFlowNode, commonNode]);


// 缩放
var MAX_SCALE  = 4;
var MIN_SCALE  = 0.2;
var SCALE_GRID = 0.1;
var SCALE_STEP = 0.1;

$('#zoomIn').on('click', function () {

    canvas.paperScroll.zoom(SCALE_STEP, {
        minScale: MIN_SCALE,
        maxScale: MAX_SCALE,
        scaleGrid: SCALE_GRID
    });
});

$('#zoomOut').on('click', function () {

    canvas.paperScroll.zoom(-SCALE_STEP, {
        minScale: MIN_SCALE,
        maxScale: MAX_SCALE,
        scaleGrid: SCALE_GRID
    });
});

$('#realSize').on('click', function () {

    canvas.paperScroll.zoom(1, {
        absolute: true,
        minScale: MIN_SCALE,
        maxScale: MAX_SCALE,
        scaleGrid: SCALE_GRID
    });
});

$('#fitScreen').on('click', function () {

    canvas.paperScroll.zoomToFit({
        padding: 20,
        minScale: MIN_SCALE,
        maxScale: MAX_SCALE,
        scaleGrid: SCALE_GRID
    });
});