import Handler from './Handler';
import VertexController from '../controllers/Vertex';

class SelectHandler extends Handler {
    init(/* options */) {
        let that = this;
        let paper = that.paper;

        paper.selection = [];
        that.vertexControllers = [];
        paper.on('cell:pointerDown', function (cell/* , view, e, x, y */) {
            that.executeIfEnabled(function () {
                if (cell.selected) {
                    return;
                }

                let vertexController = new VertexController(that.paper, {
                    cell
                });
                that.vertexControllers.push(vertexController);
                cell.selected = true;
                paper.selection.push(cell);
            });
        });
        return that;
    }
}

export default SelectHandler;
