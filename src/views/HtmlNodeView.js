import * as utils from '../common/utils';
import     vector from '../common/vector';
import    filters from '../common/filters';
import       Rect from '../geometry/Rect';
import   CellView from '../views/CellView';


class HtmlNodeView extends CellView {

    static get specialAttributes() {

        return [
            'text',
            'html',
            'style'
        ];
    }

    render() {

        this.renderMarkup();

        this.scalableNode  = this.findOne('.pane-scalable');
        this.rotatableNode = this.findOne('.pane-rotatable');

        return this
            .update()
            .resize()
            .rotate()
            .translate();
    }

    ensureElement() {

        this.elem = utils.createElement(this.cell.getTagName());
        // attach cell's id to elem
        this.elem.cellId = this.cell.id;

        var className = this.cell.getClassName();
        if (className) {
            utils.addClass(this.elem, className);
        }

        let pane = this.getPane();
        if (pane) {
            pane.appendChild(this.elem);
        }

        return this;
    }

    renderMarkup() {

        this.elem.innerHTML = this.cell.getMarkup() || '';

        return this;
    }

    find(selector) {

        return selector === '.' ? [this.elem] : this.elem.querySelectorAll(selector)
    }

    findOne(selector) {

        return selector === '.' ? this.elem : this.elem.querySelector(selector);
    }

    update(specifiedAttrs) {

        utils.forIn(specifiedAttrs || this.cell.attrs, function (attrs, selector) {

            let nodes = this.find(selector);
            if (!nodes.length) {
                return;
            }

            let specials = HtmlNodeView.specialAttributes.slice();
            let normal   = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(specials, key)) {
                    normal[key] = value;
                }
            });

            // set regular attributes
            if (!utils.isEmptyObject(normal)) {
                utils.forEach(nodes, function (node) {
                    utils.forIn(normal, function (attrVal, attrName) {
                        utils.setAttribute(node, attrName, attrVal);
                    });
                });
            }

            if (!utils.isUndefined(attrs.style)) {

                if (utils.isString(attrs.style)) {
                    utils.forEach(nodes, function (node) {
                        utils.setAttribute(node, 'style', attrs.style);
                    });
                } else if (utils.isObject(attrs.style)) {
                    utils.forEach(nodes, function (node) {
                        utils.forIn(attrs.style, function (val, name) {
                            node.style[name] = val;
                        });
                    });
                }
            }

            if (!utils.isUndefined(attrs.html)) {
                utils.forEach(nodes, function (node) {
                    node.innerHTML = attrs.html || '';
                });
            }

            if (!utils.isUndefined(attrs.text)) {
                utils.forEach(nodes, function (node) {
                    utils.emptyElement(node);
                    node.appendChild(document.createTextNode(attrs.text || ''));
                });
            }

        }, this);

        return this;
    }

    resize() {

        let scalable = this.scalableNode;
        if (!scalable) {
            return this;
        }

        let width  = scalable.clientWidth || scalable.offsetWidth || 1;
        let height = scalable.clientHeight || scalable.offsetHeight || 1;

        let size = this.cell.getSize();

        let sx = size.width / width;
        let sy = size.height / height;

        sx = utils.toFixed(sx, 2);
        sy = utils.toFixed(sy, 2);

        utils.setScale(scalable, sx, sy);

        return this;
    }

    rotate() {

        if (this.rotatableNode) {

            let size = this.cell.getSize();
            let ox   = size.width / 2;
            let oy   = size.height / 2;

            utils.setRotation(this.rotatableNode, this.cell.getRotation(), ox, oy);
        }

        return this;
    }

    translate() {

        let position = this.cell.getPosition();

        utils.setTranslate(this.elem, position.x, position.y);

        return this;
    }

    getBBox() {
        return utils.getBounds(this.elem);
    }

    getStrokeBBox() {

        let position = this.cell.getPosition();
        let size     = this.cell.getSize();

        var bbox = new Rect(
            position.x,
            position.y,
            size.width,
            size.height
        );

        return bbox.grow(0);
    }
}


// exports
// -------

export default HtmlNodeView;
