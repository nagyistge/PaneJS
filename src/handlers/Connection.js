import Handler from './Handler';
import Rect from '../geometry/Rect';
import vector from '../common/vector';
import * as utils from '../common/utils';
import Link from '../cells/Link';

class ConnectionHandler extends Handler {
    init(options = {}) {
        let that = this;
        let paper = that.paper;
        let model = that.model;

        that.name = options.name || 'connect';

        that.sourceCellView = null;
        that.sourcePort = null;
        that.targetCellView = null;
        that.targetPort = null;
        that.connecting = false;
        that.previewingLink = null;

        paper.on('cell:mouseOver', function (cell, view) {
            if (that.sourceCellView !== view) {
                if (that.connecting) { // 加校验
                    that.setTargetCellView(view);
                } else { // 加校验
                    that.setSourceCellView(view);
                }
            }
        });
        paper.on('cell:mouseOut', function (cell, view, e/* , x, y */) {
            if (that.connecting) {
                if (that.targetCellView === view && that._isOut(view, e.toElement)) {
                    that.setTargetCellView(null);
                }
            } else {
                if (that.sourceCellView === view && that._isOut(view, e.toElement)) {
                    that.setSourceCellView(null);
                }
            }
        });

        utils.addEventListener(paper.decoratePane, 'mouseout', '.port-decorator.out', function (e) {
            if (!that.connecting && !utils.containsClassName(e.toElement, 'port-decorator-layer')) {
                that.setSourceCellView(null);
            }
        });
        utils.addEventListener(paper.decoratePane, 'mousedown', '.port-decorator.out', function (e) {
            that.connecting = true;
            let decoratorNode = e.delegateTarget;
            that.sourcePort = decoratorNode.cellView.findPortByElem(decoratorNode.portBody);
            that._drawInPortDecorators();
        });
        utils.addEventListener(paper.container, 'mousemove', function (e) {
            if (that.connecting) {
                if (that.previewingLink) {
                    model.setTerminal(that.previewingLink, paper.toLocalPoint({
                        x: e.x,
                        y: e.y
                    }), false);
                } else {
                    that.previewingLink = new Link({
                        sourceMarker: 'block',
                        targetMarker: 'block'
                    });
                    model.addLink(that.previewingLink, {
                        node: that.sourceCellView.cell,
                        port: that.sourcePort,
                    }, paper.toLocalPoint({
                        x: e.x,
                        y: e.y
                    }));
                }
            }
        });

        paper.on('cell:pointerUp', function (/* cell, view, e, x, y */) {
            // console.log('cell:mouseup');
            // if (that.connecting) {
            // } else {
            // }
            that.connecting = false;
            that.setSourceCellView(null);
            that._clearInPortDecorators();
        });
        paper.on('blank:pointerUp', function (/* cell, view, e, x, y */) {
            // console.log('blank:mouseup');
            // if (that.connecting) {
            // } else {
            // }
            that.connecting = false;
            that.setSourceCellView(null);
            that._clearInPortDecorators();
        });
        return that;
    }

    _isOut(view, elem) {
        return !utils.containsElem(view.elem, elem) && !utils.containsClassName(elem, 'port-decorator-layer');
    }

    setSourceCellView(view) {
        let that = this;
        let paper = that.paper;
        if (that.sourceCellView) {
            utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.out'), function (decorator) {
                vector(decorator).removeCell();
            });
        }
        that.sourceCellView = view;
        if (view) {
            that._drawPortDecorators(view, 'out');
        }
        return that;
    }

    _drawInPortDecorators() {
        let that = this;
        // let sourceView = that.sourceCellView;
        return that;
    }

    _clearInPortDecorators() {
        let that = this;
        let paper = that.paper;
        utils.forEach(paper.decoratePane.querySelectorAll('.port-decorator.in'), function (decorator) {
            vector(decorator).removeCell();
        });
        return that;
    }

    _drawPortDecorators(view, inOrOut) {
        let that = this;
        let decoratorMarkup = [
            '<g class="port-decorator ${className}">',
            '<circle class="back port-decorator-layer" r="8" cx="${x}" cy="${y}"></circle>',
            '<circle class="front port-decorator-layer" r="3" cx="${x}" cy="${y}"></circle>',
            '</g>'
        ].join('');
        let portBodies = view.elem.querySelectorAll('.pane-ports.' + inOrOut + ' .pane-port .port-body');
        let paper = that.paper;
        let decoratePane = paper.decoratePane;
        utils.forEach(portBodies, function (portBody) {
            let bbox = Rect.fromRect(vector(portBody).getBBox(false));
            let center = bbox.getCenter();
            let decorator = vector(utils.format(decoratorMarkup, utils.extend({
                className: inOrOut
            }, center)));
            decoratePane.appendChild(decorator.node);
            decorator.node.cellView = view;
            decorator.node.portBody = portBody;
            // TODO decorator.node.portMeta = portMeta
        });
    }

    setTargetCellView(/* view */) {
        let that = this;
        return that;
    }
}

export default ConnectionHandler;
