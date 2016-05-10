import * as utils from '../../common/utils';
import   detector from '../../common/detector';
import      Paper from '../../core/Paper';


class HTMLPaper extends Paper {

    createPanes() {

        var drawPane = utils.createElement('div');

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

        let onPointerDown = this.onPointerDown.bind(this);
        let onPointerMove = this.onPointerMove.bind(this);
        let onPointerUp   = this.docMouseUpEvent || this.onPointerUp.bind(this);

        this.docMouseUpEvent = onPointerUp;

        if (detector.IS_TOUCH) {
            utils.addEventListener(drawPane, 'touchstart', onPointerDown);
            utils.addEventListener(drawPane, 'touchmove', onPointerMove);
            utils.addEventListener(document, 'touchend', onPointerUp);
        } else {
            utils.addEventListener(drawPane, 'mousedown', onPointerDown);
            utils.addEventListener(drawPane, 'mousemove', onPointerMove);
            utils.addEventListener(document, 'mouseup', onPointerUp);
        }

        return super.setup();
    }

    destroy() {

        utils.removeElement(this.HTMLDrawPane);
        super.destroy();
    }
}


// exports
// -------

export default HTMLPaper;
