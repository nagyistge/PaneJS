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
        let vel  = that.vel;
        let cell = that.cell;

        let portMarkup  = cell.metadata.portMarkup;
        let inPortWrap  = vel.findOne('.pane-ports.in');
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

    findPortByElem(elem) {

        let that  = this;
        let vel   = that.vel;
        let cell  = that.cell;
        let vPort = vector(elem).findParent('.pane-port', vel.node);

        if (vPort) {

            let vWrap = vPort.parent();
            if (vWrap) {

                let index = vPort.index();
                let type  = vWrap.hasClass('in')
                    ? 'in' : vWrap.hasClass('out')
                    ? 'out' : '';
                let ports = type === 'in'
                    ? cell.inPorts : type === 'out'
                    ? cell.outPorts
                    : [];

                let selector = cell.getPortSelector(type, index);
                let result   = null;

                utils.some(ports, function (port) {
                    if (port.selector === selector) {
                        result = port;
                        return true;
                    }
                });

                return result;
            }
        }

        return null;
    }
}


// exports
// -------

export default PortsView;
