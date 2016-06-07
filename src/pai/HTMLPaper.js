import * as utils from '../common/utils';
import     vector from '../common/vector';
import   detector from '../common/detector';
import      Paper from '../core/Paper';


class HTMLPaper extends Paper {

    createPanes() {

        super.createPanes();

        let htmlPane = utils.createElement('div');

        utils.addClass(htmlPane, 'pane-html-pane');

        this.root.appendChild(htmlPane);
        this.htmlPane = htmlPane;

        return this;
    }

    setup() {

        let drawPane = this.htmlPane;

        utils.addEventListener(drawPane, 'contextmenu', this.onContextMenu.bind(this));
        utils.addEventListener(drawPane, 'dblclick', this.onDblClick.bind(this));
        utils.addEventListener(drawPane, 'click', this.onClick.bind(this));
        utils.addEventListener(drawPane, 'mouseover', '.pane-node', this.onCellMouseOver.bind(this));
        utils.addEventListener(drawPane, 'mouseout', '.pane-node', this.onCellMouseOut.bind(this));
        utils.addEventListener(drawPane, detector.IS_TOUCH ? 'touchstart' : 'mousedown', this.onPointerDown.bind(this));

        return super.setup();
    }

    getContentBBox(withoutTransformations) {

        let rect = super.getContentBBox(withoutTransformations);

        var screenCTM   = this.viewport.getScreenCTM();
        var viewportCTM = this.viewport.getCTM();

        return rect;
    }

    translate(x, y, relative) {

        super.translate(x, y, relative);

        return this;
    }

    scale(sx, sy, ox = 0, oy = 0) {

        sy = sy || sx;

        utils.setStyle(this.htmlPane, {
            transform: 'scale(' + sx + ',' + sy + ')'
        });

        super.scale(sx, sy, ox, oy);

        return this;
    }

    destroy() {

        utils.removeElement(this.htmlPane);
        super.destroy();
    }
}


// exports
// -------

export default HTMLPaper;
