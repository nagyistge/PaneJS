import {
    some,
    merge,
    forIn,
    forEach,
    contains,
    isObject,
    isUndefined,
    toFloat,
    isPercentage,
    clearTranslate,
} from '../common/utils';

import vector   from '../common/vector';
import CellView from './CellView';

class NodeView extends CellView {

    update(specifiedAttrs) {

        var that = this;
        var cell = that.cell;
        var allAttrs = cell.attrs;
        var rotatableNode = that.rotatableNode;

        if (rotatableNode) {
            var rotationAttr = rotatableNode.attr('transform');
            rotatableNode.attr('transform', '');
        }

        var relativelySelectors = [];
        var nodesBySelector = {};

        forIn(specifiedAttrs || allAttrs, function (attrs, selector) {

            var vElements = that.find(selector);

            if (!vElements.length) {
                return;
            }

            nodesBySelector[selector] = vElements;

            var specialAttributes = NodeView.specialAttributes.slice();

            if (isObject(attrs.filter)) {
                specialAttributes.push('filter');
                that.applyFilter(vElements, attrs.filter);
            }

            if (isObject(attrs.fill)) {
                specialAttributes.push('fill');
                that.applyGradient(vElements, 'fill', attrs.fill);
            }

            if (isObject(attrs.stroke)) {
                specialAttributes.push('stroke');
                that.applyGradient(vElements, 'stroke', attrs.stroke);
            }

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

            var finalAttributes = {};

            forIn(attrs, function (value, key) {
                if (!contains(specialAttributes, key)) {
                    finalAttributes[key] = value;
                }
            });

            // set regular attributes
            forEach(vElements, function (vel) {
                vel.attr(finalAttributes);
            });

            if (attrs.port) {
                forEach(vElements, function (vel) {
                    vel.attr('port', isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
                });
            }

            if (attrs.style) {
                forEach(vElements, function (vel) {
                    vel.css(attrs.style);
                });
            }

            if (!isUndefined(attrs.html)) {
                forEach(vElements, function (vel) {

                });
            }

            // Special `ref-x` and `ref-y` attributes make it possible to
            // set both absolute or relative positioning of subElements.
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
            })
            && relativelySelectors.push(selector);
        });


        // Note that we're using the bounding box without transformation
        // because we are already inside a transformed coordinate system.
        var size = cell.size;
        var bbox = {x: 0, y: 0, width: size.width, height: size.height};

        specifiedAttrs = specifiedAttrs || {};

        forEach(relativelySelectors, function (selector) {

            var specified = specifiedAttrs[selector];
            var all = allAttrs[selector];
            var attrs = specified ? merge({}, all, specified) : all;

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

        var that = this;
        var ref = attributes['ref'];
        var refDx = toFloat(attributes['ref-dx']);
        var refDy = toFloat(attributes['ref-dy']);
        var yAlignment = attributes['y-alignment'];
        var xAlignment = attributes['x-alignment'];

        var refX = attributes['ref-x'];
        var refXPercentage = isPercentage(refX);
        refX = toFloat(refX, refXPercentage);

        var refY = attributes['ref-y'];
        var refYPercentage = isPercentage(refY);
        refY = toFloat(refY, refYPercentage);

        var refWidth = attributes['ref-width'];
        var refWidthPercentage = isPercentage(refWidth);
        refWidth = toFloat(refWidth, refWidthPercentage);

        var refHeight = attributes['ref-height'];
        var refHeightPercentage = isPercentage(refHeight);
        refHeight = toFloat(refHeight, refHeightPercentage);


        // Check if the node is a descendant of the scalable group.
        var scalableNode = vel.findParent('pane-scalable', that.el);

        // `ref` is the selector of the reference element.
        // If no `ref` specified, reference element is the root element.
        if (ref) {

            var vref;

            if (nodesBySelector && nodesBySelector[ref]) {
                vref = nodesBySelector[ref][0];
            } else {
                vref = ref === '.' ? that.vel : that.vel.findOne(ref);
            }

            if (!vref) {
                throw new Error('NodeView: reference does not exists.');
            }

            // Get the bounding box of the reference element
            // relative to the root `<g>` element.
            bbox = vref.bbox(false, that.el);
        }

        // Remove the previous translate() from the transform attribute
        // and translate the element relative to the root bounding box
        // following the `ref-x` and `ref-y` attributes.
        var transformAttr = vel.attr('transform');
        if (transformAttr) {
            vel.attr('transform', clearTranslate(transformAttr));
        }

        // `ref-width` and `ref-height` defines the width and height of the
        // subElement relatively to the reference element size.
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

        // The final translation of the subElement.
        var tx = 0;
        var ty = 0;
        var scale;

        // `ref-dx` and `ref-dy` define the offset of the subElement relative
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

            var velBBox = vel.bbox(false, that.paper.drawPane);

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

        var that = this;
        var vel = that.vel;

        vel.empty();

        that.renderMarkup();

        that.scalableNode = vel.findOne('.pane-scalable');
        that.rotatableNode = vel.findOne('.pane-rotatable');

        return that.update()
            .resize()
            .rotate()
            .translate();
    }

    renderMarkup() {

        var that = this;
        var cell = that.cell;
        var markup = cell.markup;

        if (markup) {
            that.vel.append(vector(markup));
        } else {
            throw new Error('invalid markup');
        }

        return that;
    }

    resize() {

        var that = this;
        var size = that.cell.size || {width: 1, height: 1};

        var scalableNode = that.scalableNode;
        if (!scalableNode) {
            return;
        }

        var scalableBBox = scalableNode.bbox(true);

        // Make sure `scalableBBox.width` and `scalableBBox.height` are not
        // zero which can happen if the element does not have any content.
        // By making the width(height) 1, we prevent HTML errors of the type
        // `scale(Infinity, Infinity)`.
        var sx = size.width / (scalableBBox.width || 1);
        var sy = size.height / (scalableBBox.height || 1);
        scalableNode.attr('transform', 'scale(' + sx + ',' + sy + ')');


        var rotation = that.cell.rotation || {angle: 0};
        var angle = rotation.angle;

        // Cancel the rotation but now around a different origin,
        // which is the center of the scaled object.
        var rotatableNode = that.rotatableNode;
        var rotateAttr = rotatableNode && rotatableNode.attr('transform');

        if (rotateAttr && rotateAttr !== 'null') {

            rotatableNode.attr('transform', rotateAttr + ' rotate(' + (-angle) + ',' + (size.width / 2) + ',' + (size.height / 2) + ')');
            var rotatableBBox = scalableNode.bbox(false, that.paper.drawPane);

            // Store new x, y and perform rotate() again against the new rotation origin.
            that.position = {
                x: rotatableBBox.x,
                y: rotatableBBox.y
            };
            that.rotate();
        }

        // Update must always be called on non-rotated element. Otherwise,
        // relative positioning would work with wrong (rotated) bounding boxes.
        that.update();

        return that;
    }

    translate() {

        var that = this;
        var position = that.cell.position || {x: 0, y: 0};

        that.vel.attr('transform', 'translate(' + position.x + ',' + position.y + ')');
        return that;
    }

    rotate() {

        var that = this;
        var node = that.rotatableNode;

        if (node) {

            var cell = that.cell;
            var rotation = cell.rotation;
            var angle = rotation && rotation.angle || 0;


            var size = cell.size || {width: 1, height: 1};
            var ox = size.width / 2;
            var oy = size.height / 2;

            node.attr('transform', 'rotate(' + angle + ',' + ox + ',' + oy + ')');
        }

        return that;
    }

    scale(sx, sy) {
        var that = this;
        that.vel.scale(sx, sy);
        return that;
    }

    getBBox() {}
}


NodeView.specialAttributes = [
    'style',
    'text',
    'html',
    'ref-x',
    'ref-y',
    'ref-dx',
    'ref-dy',
    'ref-width',
    'ref-height',
    'ref',
    'x-alignment',
    'y-alignment',
    'port'
];

export default NodeView;
