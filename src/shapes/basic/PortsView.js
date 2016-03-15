import * as utils from '../../common/utils';
import     vector from '../../common/vector';
import   NodeView from '../../views/NodeView';


class PortsView extends NodeView {

    render() {

        let that = this;
        let vel  = that.vel;

        that.inPortContainer = vel.findOne('.pane-ports.in');
        that.inPortContainer = vel.findOne('.pane-ports.out');

        return super.render();

    }

    update(specifiedAttrs) {

        this.renderPorts();
        return super.update(specifiedAttrs);
    }

    renderPorts() {


        let that = this;
        let vel  = that.vel;
        let cell = that.cell;

        let portMarkup  = cell.metadata.portMarkup;
        let inPortWrap  = vel.findOne('.pane-ports.in');
        let outPortWrap = vel.findOne('.pane-ports.out');

        inPortWrap.empty();

        utils.forEach(cell.inPorts, function (port) {
            inPortWrap.append(vector(portMarkup));
        });


        outPortWrap.empty();

        utils.forEach(cell.outPorts, function (port) {
            inPortWrap.append(vector(portMarkup));
        });
    }
}


// exports
// -------

export default PortsView;
