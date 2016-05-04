import  Node from '../cells/Node';
import Point from '../geometry/Point';


class Terminal {

    constructor(terminal) {

        if (terminal instanceof Terminal) {
            return terminal;
        }

        if (Node.isNode(terminal)) {

            this.node = terminal;

        } else if (Point.isPointLike(terminal)) {

            this.point = Point.fromPoint(terminal);

        } else {
            this.node  = terminal.node;
            this.port  = terminal.port;
            this.point = terminal.point;
        }
    }

    addLink(link, isSource) {

        if (link) {

            if (this.node) {
                this.node.addLink(link, isSource);
            }

            link.setTerminal(this, isSource);
        }

        return this;
    }

    removeLink(link, isSource) {

        if (link) {

            if (this.node) {
                this.node.removeLink(link, isSource);
            }

            link.setTerminal(null, isSource);
        }

        return this;
    }
}


// exports
// -------

export default Terminal;
