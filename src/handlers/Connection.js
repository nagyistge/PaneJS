import Handler from './Handler';
import Rect from '../geometry/Rect';
import vector from '../common/vector';
import * as utils from '../common/utils';

class ConnectionHandler extends Handler {
    init(options = {}) {
        let that = this;
        let paper = that.paper;
        // let model = that.model;

        that.name = options.name || 'connect';

        that.sourceCellView = null;
        that.targetCellView = null;
        that.connecting = false;

        paper.on('cell:mouseOver', function (cell, view, e/* , x, y */) {
            if (that.sourceCellView !== view) {
                if (that.connecting) { // 加校验
                    that.setTargetCellView(view);
                } else { // 加校验
                    that.setSourceCellView(view);
                }
            }
        });
        paper.on('cell:mouseOut', function (cell, view, e/* , x, y */) {
            console.log(e);
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
                vector(decorator).remove();
            });
        }
        that.sourceCellView = view;
        if (view) {
            that._drawPortDecorators(view, 'out');
        }
        return that;
    }

    _drawPortDecorators(view, inOrOut) {
        let that = this;
        let decoratorMarkup = [
            '<g class="port-decorator $className">',
            '<circle class="back port-decorator-layer" r="8" cx="$cx" cy="$cy"></circle>',
            '<circle class="front port-decorator-layer" r="3" cx="$cx" cy="$cy"></circle>',
            '</g>'
        ].join('').replace(/\$className/, inOrOut);
        let ports = view.elem.querySelectorAll('.pane-port.' + inOrOut);
        let paper = that.paper;
        let decoratePane = paper.decoratePane;
        utils.forEach(ports, function (port) {
            let bbox = Rect.fromRect(vector(port).getBBox(false));
            let center = bbox.getCenter();
            console.log(decoratorMarkup.replace(/\$cx/g, center.x).replace(/\$cy/g, center.y));
            let decorator = vector(decoratorMarkup.replace(/\$cx/g, center.x).replace(/\$cy/g, center.y));
            decoratePane.appendChild(decorator.node);
        });
    }

    setTargetCellView(view) {
        let that = this;
        return that;
    }
}

export default ConnectionHandler;
