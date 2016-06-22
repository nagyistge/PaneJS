import * as utils from '../common/utils';
import detector   from '../common/detector';
import Paper      from '../core/Paper';


class HTMLPaper extends Paper {

    createPanes() {

        super.createPanes();

        const htmlPane = utils.createElement('div');

        utils.addClass(htmlPane, 'pane-html');

        this.htmlPane = htmlPane;
        this.stage.appendChild(htmlPane);

        return this;
    }

    setup() {

        const htmlPane = this.htmlPane;

        utils.addEventListener(htmlPane, 'contextmenu', this.onContextMenu.bind(this));
        utils.addEventListener(htmlPane, 'dblclick', this.onDblClick.bind(this));
        utils.addEventListener(htmlPane, 'click', this.onClick.bind(this));
        utils.addEventListener(htmlPane, 'mouseover', '.pane-node', this.onCellMouseOver.bind(this));
        utils.addEventListener(htmlPane, 'mouseout', '.pane-node', this.onCellMouseOut.bind(this));
        utils.addEventListener(htmlPane, detector.IS_TOUCH ? 'touchstart' : 'mousedown', this.onPointerDown.bind(this));

        super.setup();

        return this;
    }

    getContentBBox(withoutTransformations) {

        let bbox   = super.getContentBBox(withoutTransformations);
        let bounds = null;

        utils.forIn(this.getModel().cells, function (cell) {
            if (cell.isNode()) {
                let rect = cell.getBBox();
                if (rect) {
                    bounds = bounds ? bounds.union(rect) : rect;
                }
            }
        });

        if (!withoutTransformations && bounds) {

            const screenCTM   = this.viewport.getScreenCTM();
            const viewportCTM = this.viewport.getCTM();

            const dx = viewportCTM.e - screenCTM.e;
            const dy = viewportCTM.f - screenCTM.f;
            const sx = viewportCTM.a;
            const sy = viewportCTM.d;

            bounds.x = bounds.x * sx + dx;
            bounds.y = bounds.y * sy + dy;
            bounds.width *= sx;
            bounds.height *= sy;
        }

        if (bounds) {
            bbox = bounds.union(bbox);
        }

        return bbox;
    }

    translate(tx, ty, relative) {

        if (!utils.isNil(tx) && !utils.isNil(ty)) {

            if (relative) {
                tx += utils.isNil(this.tx) || 0;
                ty += utils.isNil(this.ty) || 0;
            }

            utils.setStyle(this.htmlPane, {
                top: ty + 'px',
                left: tx + 'px'
            });

            super.translate(tx, ty);
        }

        return this;
    }

    scale(sx, sy, ox = 0, oy = 0) {

        sy = sy || sx;

        if (sx && sy) {

            utils.setStyle(this.htmlPane, {
                transform: 'scale3d(' + sx + ',' + sy + ', 1)'
            });

            //utils.setStyle(this.htmlPane, {
            //    zoom: sx
            //});

            super.scale(sx, sy, ox, oy);
        }

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
