import * as utils from '../common/utils';
import     vector from '../common/vector';
import   detector from '../common/detector';
import      Paper from '../core/Paper';


class HTMLPaper extends Paper {

    createPanes() {

        let drawPane = utils.createElement('div');

        utils.addClass(drawPane, 'pane-html-pane');

        this.container.appendChild(drawPane);
        this.HTMLDrawPane = drawPane;

        return super.createPanes();
    }

    setup() {

        let drawPane = this.HTMLDrawPane;

        utils.addEventListener(drawPane, 'contextmenu', this.onContextMenu.bind(this));
        utils.addEventListener(drawPane, 'dblclick', this.onDblClick.bind(this));
        utils.addEventListener(drawPane, 'click', this.onClick.bind(this));
        utils.addEventListener(drawPane, 'mouseover', '.pane-node', this.onCellMouseOver.bind(this));
        utils.addEventListener(drawPane, 'mouseout', '.pane-node', this.onCellMouseOut.bind(this));

        utils.addEventListener(drawPane, detector.IS_TOUCH ? 'touchstart' : 'mousedown', this.onPointerDown.bind(this));

        return super.setup();
    }

    scale(sx, sy) {

        sy = sy || sx;

        vector(this.root).scale(sx, sy);
        vector(this.HTMLDrawPane).scale(sx, sy);

        return this;
    }

    destroy() {

        utils.removeElement(this.HTMLDrawPane);
        super.destroy();
    }
}


// exports
// -------

export default HTMLPaper;
