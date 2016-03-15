import * as utils from '../../common/utils';
import     vector from '../../common/vector';
import   NodeView from '../../views/NodeView';


class PortsView extends NodeView {

    update(specials) {

        this.renderPorts();
        return super.update(specials);
    }

    renderPorts() {

        let that = this;
        let vel = that.vel;
        let cell = that.cell;

        let portMarkup = cell.metadata.portMarkup;
        let inPortWrap = vel.findOne('.pane-ports.in');
        let outPortWrap = vel.findOne('.pane-ports.out');

        inPortWrap.empty();

        utils.forEach(cell.inPorts, function (port) {
            let html = utils.format(portMarkup, port);
            inPortWrap.append(vector(html));
        });


        outPortWrap.empty();

        utils.forEach(cell.outPorts, function (port) {
            let html = utils.format(portMarkup, port);
            outPortWrap.append(vector(html));
        });
    }
}


// exports
// -------

export default PortsView;
