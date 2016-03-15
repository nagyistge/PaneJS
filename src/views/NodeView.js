import * as utils from '../common/utils';
import       Rect from '../geometry/Rect';
import   CellView from '../views/CellView';


class NodeView extends CellView {

    static get specialAttributes() {

        return [
            'text',
            'html',
            'style',
            'ref',
            'ref-x',
            'ref-y',
            'ref-dx',
            'ref-dy',
            'ref-width',
            'ref-height',
            'x-alignment',
            'y-alignment',
            'port'
        ];
    }

    render() {

        let that = this;
        let vel  = that.vel;

        vel.empty();
        that.renderMarkup();

        that.scalableNode  = vel.findOne('.pane-scalable');
        that.rotatableNode = vel.findOne('.pane-rotatable');

        return that
            .update()
            .resize()
            .rotate()
            .translate();
    }

    update(specifiedAttrs) {

        // process the `attrs` object and set attributes
        // on sub elements based on the selectors.

        let that      = this;
        let cell      = that.cell;
        let allAttrs  = cell.attrs;
        let rotatable = that.rotatableNode;
        let rotation;

        if (rotatable) {
            rotation = rotatable.attr('transform');
            rotatable.attr('transform', '');
        }

        let relatives   = [];
        let nodeMapping = {};

        utils.forIn(specifiedAttrs || allAttrs, function (attrs, selector) {

            let vElements = that.find(selector);

            if (!vElements.length) {
                return;
            }

            nodeMapping[selector] = vElements;

            let specials = NodeView.specialAttributes.slice();

            if (utils.isObject(attrs.filter)) {
                specials.push('filter');
                that.applyFilter(vElements, attrs.filter);
            }

            if (utils.isObject(attrs.fill)) {
                specials.push('fill');
                that.applyGradient(vElements, 'fill', attrs.fill);
            }

            if (utils.isObject(attrs.stroke)) {
                specials.push('stroke');
                that.applyGradient(vElements, 'stroke', attrs.stroke);
            }

            if (!utils.isUndefined(attrs.text)) {
                specials.push('lineHeight', 'textPath', 'annotations');
                utils.forEach(vElements, function (vel) {
                    vel.text(attrs.text + '', {
                        textPath   : attrs.textPath,
                        lineHeight : attrs.lineHeight,
                        annotations: attrs.annotations
                    });
                });
            }

            let surplus = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(specials, key)) {
                    surplus[key] = value;
                }
            });

            // set regular attributes
            utils.forEach(vElements, function (vel) {
                vel.attr(surplus);
            });

            // if (attrs.port) {
            //    forEach(vels, function (vel) {
            //        vel.attr('port', isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
            //    });
            // }

            // TODO: vel.css()

            // if (attrs.style) {
            //    forEach(vels, function (vel) {
            //        vel.css(attrs.style);
            //    });
            // }

            // TODO: attrs.html

            // if (!utils.isUndefined(attrs.html)) {
            //    utils.forEach(vElements, function (vel) {
            //
            //    });
            // }


            // Special `ref-x` and `ref-y` attributes make it possible to
            // set both absolute or relative positioning of sub elements.
            let hasRelative = utils.some([
                'ref-x',
                'ref-y',
                'ref-dx',
                'ref-dy',
                'x-alignment',
                'y-alignment',
                'ref-width',
                'ref-height'
            ], function (key) {
                return !utils.isUndefined(attrs[key]);
            });

            hasRelative && relatives.push(selector);
        });


        // Note that we're using the bounding box without transformation
        // because we are already inside a transformed coordinate system.
        let size = cell.size;
        let bbox = {
            x     : 0,
            y     : 0,
            width : size.width,
            height: size.height
        };

        utils.forEach(relatives, function (selector) {

            let attrs     = allAttrs[selector];
            let specified = specifiedAttrs && specifiedAttrs[selector];
            if (specified) {
                attrs = utils.merge({}, attrs, specified);
            }

            utils.forEach(nodeMapping[selector], function (vel) {
                that.positionRelative(vel, bbox, attrs, nodeMapping);
            });
        });

        if (rotatable) {
            rotatable.attr('transform', rotation || '');
        }

        return that;
    }

    positionRelative(vel, bbox, attrs, nodeMapping) {

        let that  = this;
        let ref   = attrs.ref;
        let refDx = utils.toFloat(attrs['ref-dx']);
        let refDy = utils.toFloat(attrs['ref-dy']);

        let yAlign = attrs['y-alignment'];
        let xAlign = attrs['x-alignment'];

        let refX        = attrs['ref-x'];
        let xPercentage = utils.isPercentage(refX);
        refX            = utils.toFloat(refX, xPercentage);

        let refY        = attrs['ref-y'];
        let yPercentage = utils.isPercentage(refY);
        refY            = utils.toFloat(refY, yPercentage);

        let refWidth    = attrs['ref-width'];
        let wPercentage = utils.isPercentage(refWidth);
        refWidth        = utils.toFloat(refWidth, wPercentage);

        let refHeight   = attrs['ref-height'];
        let hPercentage = utils.isPercentage(refHeight);
        refHeight       = utils.toFloat(refHeight, hPercentage);


        // Check if the node is a descendant of the scalable group.
        let scalableNode = vel.findParent('pane-scalable', that.elem);

        // `ref` is the selector of the reference element.
        // If no `ref` specified, reference element is the root element.
        if (ref) {

            let refVel = nodeMapping && nodeMapping[ref];

            if (refVel) {
                refVel = refVel[0];
            } else {
                refVel = ref === '.' ? that.vel : that.vel.findOne(ref);
            }

            if (!refVel) {
                throw new Error('NodeView: reference does not exists.');
            }

            // Get the bounding box of the reference element
            // relative to the root `<g>` element.
            bbox = refVel.getBBox(false, that.elem);
        }


        // Remove the previous translate() from the transform attribute
        // and translate the element relative to the bounding box following
        // the `ref-x` and `ref-y` attributes.
        let transformAttr = vel.attr('transform');
        if (transformAttr) {
            vel.attr('transform', utils.clearTranslate(transformAttr));
        }


        // `ref-width` and `ref-height` defines the width and height
        // of the sub element relatively to the reference element size.
        if (utils.isFinite(refWidth)) {
            if (wPercentage || refWidth >= 0 && refWidth <= 1) {
                vel.attr('width', utils.toFixed(refWidth * bbox.width, 2));
            } else {
                vel.attr('width', Math.max(utils.toFixed(refWidth + bbox.width, 2), 0));
            }
        }

        if (utils.isFinite(refHeight)) {
            if (hPercentage || refHeight >= 0 && refHeight <= 1) {
                vel.attr('height', utils.toFixed(refHeight * bbox.height, 2));
            } else {
                vel.attr('height', Math.max(utils.toFixed(refHeight + bbox.height, 2), 0));
            }
        }


        // The final translation of the sub element.
        let tx = 0;
        let ty = 0;
        let scale;

        // `ref-dx` and `ref-dy` define the offset of the sub element relative
        // to the right and/or bottom coordinate of the reference element.
        if (utils.isFinite(refDx)) {
            if (scalableNode) {
                scale = scalableNode.scale();
                tx    = bbox.x + bbox.width + refDx / scale.sx;
            } else {
                tx = bbox.x + bbox.width + refDx;
            }
        }

        if (utils.isFinite(refDy)) {
            if (scalableNode) {
                scale = scale || scalableNode.scale();
                ty    = bbox.y + bbox.height + refDy / scale.sy;
            } else {
                ty = bbox.y + bbox.height + refDy;
            }
        }

        if (utils.isFinite(refX)) {
            if (xPercentage || refX > 0 && refX < 1) {
                tx = bbox.x + bbox.width * refX;
            } else if (scalableNode) {
                scale = scale || scalableNode.scale();
                tx    = bbox.x + refX / scale.sx;
            } else {
                tx = bbox.x + refX;
            }
        }

        if (utils.isFinite(refY)) {
            if (xPercentage || refY > 0 && refY < 1) {
                ty = bbox.y + bbox.height * refY;
            } else if (scalableNode) {
                scale = scale || scalableNode.scale();
                ty    = bbox.y + refY / scale.sy;
            } else {
                ty = bbox.y + refY;
            }
        }

        if (!utils.isUndefined(yAlign) || !utils.isUndefined(xAlign)) {

            let velBBox = vel.getBBox(false, that.getPane());

            if (yAlign === 'middle') {
                ty -= velBBox.height / 2;
            } else if (utils.isFinite(yAlign)) {
                ty += (yAlign > -1 && yAlign < 1) ? velBBox.height * yAlign : yAlign;
            }

            if (xAlign === 'middle') {
                tx -= velBBox.width / 2;
            } else if (utils.isFinite(xAlign)) {
                tx += (xAlign > -1 && xAlign < 1) ? velBBox.width * xAlign : xAlign;
            }
        }

        vel.translate(utils.toFixed(tx, 2), utils.toFixed(ty, 2));

        return that;
    }

    scale(sx, sy) {
        this.vel.scale(sx, sy);
        return this;
    }

    resize() {

        let that     = this;
        let scalable = that.scalableNode;

        if (!scalable) {
            return that;
        }


        // get bbox without transform
        let nativeBBox = scalable.getBBox(true);

        // Make sure `scalableBBox.width` and `scalableBBox.height` are not
        // zero which can happen if the element does not have any content.
        // By making the width(height) 1, we prevent HTML errors of the type
        // `scale(Infinity, Infinity)`.
        let size = that.cell.size;
        let sx   = size.width / (nativeBBox.width || 1);
        let sy   = size.height / (nativeBBox.height || 1);

        sx = utils.toFixed(sx, 2);
        sy = utils.toFixed(sy, 2);

        scalable.attr('transform', 'scale(' + sx + ',' + sy + ')');

        // let rotation = that.cell.rotation;
        // let angle = rotation.angle;
        //
        // // Cancel the rotation but now around a different origin,
        // // which is the center of the scaled object.
        // let rotatableNode = that.rotatableNode;
        // let rotateAttr = rotatableNode && rotatableNode.attr('transform');
        //
        // if (rotateAttr && rotateAttr !== 'null') {
        //
        //    rotatableNode.attr('transform', rotateAttr + ' rotate(' + (-angle) + ',' + (size.width / 2) + ',' + (size.height / 2) + ')');
        //    let rotatableBBox = scalableNode.bbox(false, that.paper.drawPane);
        //
        //    // Store new x, y and perform rotate() again against the new rotation origin.
        //    that.position = {
        //        x: rotatableBBox.x,
        //        y: rotatableBBox.y
        //    };
        //    that.rotate();
        // }

        // Update must always be called on non-rotated element. Otherwise,
        // relative positioning would work with wrong (rotated) bounding boxes.
        that.update();

        return that;
    }

    rotate() {

        let that = this;
        let node = that.rotatableNode;

        if (node) {

            let cell = that.cell;
            let size = cell.size;
            let ox   = size.width / 2;
            let oy   = size.height / 2;

            node.attr('transform', 'rotate(' + cell.rotation + ',' + ox + ',' + oy + ')');
        }

        return that;
    }

    translate() {

        let that = this;
        let pos  = that.cell.position;

        that.vel.attr('transform', 'translate(' + pos.x + ',' + pos.y + ')');

        return that;
    }

    getBBox() {
        return this.vel.getBBox();
    }

    getStrokeWidth() {

        let vel     = this.vel;
        let vTarget = vel.findOne('rect')
            || vel.findOne('path')
            || vel.findOne('circle')
            || vel.findOne('ellipse')
            || vel.findOne('polyline')
            || vel.findOne('polygon');

        if (vTarget && vTarget.node) {

            let sw = utils.getComputedStyle(vTarget.node, 'stroke-width');

            return sw && utils.toFloat(sw) || 0;
        }

        return 0;
    }

    getStrokeBBox() {

        let cell        = this.cell;
        let strokeWidth = this.getStrokeWidth();

        let bbox = new Rect(
            cell.position.x,
            cell.position.y,
            cell.size.width,
            cell.size.height
        );

        strokeWidth -= 1;

        return strokeWidth ? bbox.grow(strokeWidth / 2) : bbox;
    }
}


// exports
// -------

export default NodeView;
