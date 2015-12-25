import {
    some,
    merge,
    forIn,
    forEach,
    toFloat,
    toFixed,
    contains,
    isObject,
    isFinite,
    isUndefined,
    isPercentage,
    clearTranslate,
} from '../common/utils';

import vector   from '../common/vector';
import Point    from '../geometry/Point';
import CellView from './CellView';


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

    update(specifiedAttrs) {

        // process the `attrs` object and set attributes
        // on sub elements based on the selectors.

        let that = this;
        let cell = that.cell;
        let allAttrs = cell.attrs;
        let rotatableNode = that.rotatableNode;
        let rotationAttr;

        if (rotatableNode) {
            rotationAttr = rotatableNode.attr('transform');
            rotatableNode.attr('transform', '');
        }

        let relativelySelectors = [];
        let nodesBySelector = {};

        forIn(specifiedAttrs || allAttrs, function (attrs, selector) {

            let vElements = that.find(selector);

            if (!vElements.length) {
                return;
            }

            nodesBySelector[selector] = vElements;

            let specialAttributes = NodeView.specialAttributes.slice();


            // TODO: test attrs.filter
            if (isObject(attrs.filter)) {
                specialAttributes.push('filter');
                that.applyFilter(vElements, attrs.filter);
            }

            // TODO: test attrs.fill
            if (isObject(attrs.fill)) {
                specialAttributes.push('fill');
                that.applyGradient(vElements, 'fill', attrs.fill);
            }

            // TODO: test attrs.stroke
            if (isObject(attrs.stroke)) {
                specialAttributes.push('stroke');
                that.applyGradient(vElements, 'stroke', attrs.stroke);
            }

            // TODO: test attrs.text
            if (!isUndefined(attrs.text)) {
                specialAttributes.push('lineHeight', 'textPath', 'annotations');
                forEach(vElements, function (vel) {
                    vel.text(attrs.text + '', {
                        lineHeight: attrs.lineHeight,
                        textPath: attrs.textPath,
                        annotations: attrs.annotations
                    });
                });
            }

            let surplus = {};

            forIn(attrs, function (value, key) {
                if (!contains(specialAttributes, key)) {
                    surplus[key] = value;
                }
            });

            // set regular attributes
            forEach(vElements, function (vel) {
                vel.attr(surplus);
            });

            //if (attrs.port) {
            //    forEach(vels, function (vel) {
            //        vel.attr('port', isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
            //    });
            //}

            // TODO: vel.css()

            //if (attrs.style) {
            //    forEach(vels, function (vel) {
            //        vel.css(attrs.style);
            //    });
            //}

            // TODO: attrs.html

            if (!isUndefined(attrs.html)) {
                forEach(vElements, function (vel) {

                });
            }

            // Special `ref-x` and `ref-y` attributes make it possible to
            // set both absolute or relative positioning of sub elements.
            some([
                'ref-x',
                'ref-y',
                'ref-dx',
                'ref-dy',
                'x-alignment',
                'y-alignment',
                'ref-width',
                'ref-height'
            ], function (key) {
                return !isUndefined(attrs[key]);
            }) && relativelySelectors.push(selector);
        });


        // Note that we're using the bounding box without transformation
        // because we are already inside a transformed coordinate system.
        let size = cell.size;
        let bbox = {x: 0, y: 0, width: size.width, height: size.height};

        forEach(relativelySelectors, function (selector) {

            let specified = specifiedAttrs && specifiedAttrs[selector];
            let all = allAttrs[selector];
            let attrs = specified ? merge({}, all, specified) : all;

            forEach(nodesBySelector[selector], function (vel) {
                that.positionRelative(vel, bbox, attrs, nodesBySelector);
            });
        });

        if (rotatableNode) {
            rotatableNode.attr('transform', rotationAttr || '');
        }

        return that;
    }

    positionRelative(vel, bbox, attributes, nodesBySelector) {

        let that = this;
        let ref = attributes['ref'];
        let refDx = toFloat(attributes['ref-dx']);
        let refDy = toFloat(attributes['ref-dy']);
        let yAlignment = attributes['y-alignment'];
        let xAlignment = attributes['x-alignment'];

        let refX = attributes['ref-x'];
        let refXPercentage = isPercentage(refX);
        refX = toFloat(refX, refXPercentage);

        let refY = attributes['ref-y'];
        let refYPercentage = isPercentage(refY);
        refY = toFloat(refY, refYPercentage);

        let refWidth = attributes['ref-width'];
        let refWidthPercentage = isPercentage(refWidth);
        refWidth = toFloat(refWidth, refWidthPercentage);

        let refHeight = attributes['ref-height'];
        let refHeightPercentage = isPercentage(refHeight);
        refHeight = toFloat(refHeight, refHeightPercentage);


        // Check if the node is a descendant of the scalable group.
        let scalableNode = vel.findParent('pane-scalable', that.elem);

        // `ref` is the selector of the reference element.
        // If no `ref` specified, reference element is the root element.
        if (ref) {

            let vref = nodesBySelector && nodesBySelector[ref];

            if (vref) {
                vref = vref[0];
            } else {
                vref = ref === '.' ? that.vel : that.vel.findOne(ref);
            }

            if (!vref) {
                throw new Error('NodeView: reference does not exists.');
            }

            // Get the bounding box of the reference element
            // relative to the root `<g>` element.
            bbox = vref.bbox(false, that.elem);
        }

        // Remove the previous translate() from the transform attribute
        // and translate the element relative to the root bounding box
        // following the `ref-x` and `ref-y` attributes.
        let transformAttr = vel.attr('transform');
        if (transformAttr) {
            vel.attr('transform', clearTranslate(transformAttr));
        }

        // `ref-width` and `ref-height` defines the width and height of the
        // sub element relatively to the reference element size.
        if (isFinite(refWidth)) {
            if (refWidthPercentage || refWidth >= 0 && refWidth <= 1) {
                vel.attr('width', refWidth * bbox.width);
            } else {
                vel.attr('width', Math.max(refWidth + bbox.width, 0));
            }
        }

        if (isFinite(refHeight)) {
            if (refHeightPercentage || refHeight >= 0 && refHeight <= 1) {
                vel.attr('height', refHeight * bbox.height);
            } else {
                vel.attr('height', Math.max(refHeight + bbox.height, 0));
            }
        }

        // The final translation of the sub element.
        let tx = 0;
        let ty = 0;
        let scale;

        // `ref-dx` and `ref-dy` define the offset of the sub element relative
        // to the right and/or bottom coordinate of the reference element.
        if (isFinite(refDx)) {
            if (scalableNode) {
                scale = scalableNode.scale();
                tx = bbox.x + bbox.width + refDx / scale.sx;
            } else {
                tx = bbox.x + bbox.width + refDx;
            }
        }

        if (isFinite(refDy)) {
            if (scalableNode) {
                scale = scale || scalableNode.scale();
                ty = bbox.y + bbox.height + refDy / scale.sy;
            } else {
                ty = bbox.y + bbox.height + refDy;
            }
        }

        if (isFinite(refX)) {
            if (refXPercentage || refX > 0 && refX < 1) {
                tx = bbox.x + bbox.width * refX;
            } else if (scalableNode) {
                scale = scale || scalableNode.scale();
                tx = bbox.x + refX / scale.sx;
            } else {
                tx = bbox.x + refX;
            }
        }

        if (isFinite(refY)) {
            if (refXPercentage || refY > 0 && refY < 1) {
                ty = bbox.y + bbox.height * refY;
            } else if (scalableNode) {
                scale = scale || scalableNode.scale();
                ty = bbox.y + refY / scale.sy;
            } else {
                ty = bbox.y + refY;
            }
        }

        if (!isUndefined(yAlignment) || !isUndefined(xAlignment)) {

            let velBBox = vel.bbox(false, that.paper.drawPane);

            if (yAlignment === 'middle') {
                ty -= velBBox.height / 2;
            } else if (isFinite(yAlignment)) {
                ty += (yAlignment > -1 && yAlignment < 1) ? velBBox.height * yAlignment : yAlignment;
            }

            if (xAlignment === 'middle') {
                tx -= velBBox.width / 2;
            } else if (isFinite(xAlignment)) {
                tx += (xAlignment > -1 && xAlignment < 1) ? velBBox.width * xAlignment : xAlignment;
            }
        }

        vel.translate(tx, ty);

        return that;
    }

    render() {

        let that = this;
        let vel = that.vel;

        vel.empty();

        that.renderMarkup();

        that.scalableNode = vel.findOne('.pane-scalable');
        that.rotatableNode = vel.findOne('.pane-rotatable');

        return that.update()
            .resize()
            .rotate()
            .translate();
    }



    scale(sx, sy) {
        this.vel.scale(sx, sy);
        return this;
    }

    resize() {

        let that = this;
        let scalableNode = that.scalableNode;

        if (!scalableNode) {
            return;
        }

        // get bbox without transform
        let nativeBBox = scalableNode.bbox(true);

        // Make sure `scalableBBox.width` and `scalableBBox.height` are not
        // zero which can happen if the element does not have any content.
        // By making the width(height) 1, we prevent HTML errors of the type
        // `scale(Infinity, Infinity)`.
        let size = that.cell.size;
        let sx = size.width / (nativeBBox.width || 1);
        let sy = size.height / (nativeBBox.height || 1);

        sx = toFixed(sx, 2);
        sy = toFixed(sy, 2);

        scalableNode.attr('transform', 'scale(' + sx + ',' + sy + ')');


        //let rotation = that.cell.rotation;
        //let angle = rotation.angle;
        //
        //// Cancel the rotation but now around a different origin,
        //// which is the center of the scaled object.
        //let rotatableNode = that.rotatableNode;
        //let rotateAttr = rotatableNode && rotatableNode.attr('transform');
        //
        //if (rotateAttr && rotateAttr !== 'null') {
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
        //}

        // Update must always be called on non-rotated element. Otherwise,
        // relative positioning would work with wrong (rotated) bounding boxes.
        that.update();

        return that;
    }

    translate() {

        let that = this;
        let position = that.cell.position;

        that.vel.attr('transform', 'translate(' + position.x + ',' + position.y + ')');

        return that;
    }

    rotate() {

        let that = this;
        let node = that.rotatableNode;

        if (node) {

            let cell = that.cell;
            let rotation = cell.rotation;
            let size = cell.size;
            let ox = size.width / 2;
            let oy = size.height / 2;

            node.attr('transform', 'rotate(' + rotation + ',' + ox + ',' + oy + ')');
        }

        return that;
    }

    getBBox() {}
}


// exports
// -------

export default NodeView;
