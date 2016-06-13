import * as utils from '../common/utils';
import       Rect from '../geometry/Rect';
import      Point from '../geometry/Point';


let pathCount = 0;

function createPathId() {

    let id;

    do {
        pathCount += 1;
        id = 'pane-path-' + pathCount;
    } while (document.getElementById(id));

    return id;
}

function deltaTransformPoint(matrix, point) {

    return {
        x: point.x * matrix.a + point.y * matrix.c,
        y: point.x * matrix.b + point.y * matrix.d
    };
}

function decomposeMatrix(matrix) {

    // @see https://gist.github.com/2052247

    // calculate delta transform point
    let px = deltaTransformPoint(matrix, {
        x: 0,
        y: 1
    });
    let py = deltaTransformPoint(matrix, {
        x: 1,
        y: 0
    });

    // calculate skew
    let skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
    let skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

    return {
        skewX,
        skewY,
        translateX: matrix.e,
        translateY: matrix.f,
        scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
        scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
        rotation: skewX // rotation is the same as skew x
    };
}

export class VElement {

    constructor(elem) {

        if (!(this instanceof VElement)) {
            return new VElement(elem);
        }

        if (elem instanceof VElement) {
            elem = elem.node;
        }

        if (!elem) {
            throw new Error('Unknown elem for VElement');
        }

        this.node = elem;
    }

    attr(name, value) {

        if (utils.isUndefined(name)) {
            // return all attributes.
            return utils.reduce(this.node.attributes, function (result, attr) {
                result[attr.nodeName] = attr.nodeValue;
                return result;
            }, {});
        }

        if (utils.isString(name) && utils.isUndefined(value)) {
            return this.node.getAttribute(name);
        }

        if (utils.isObject(name)) {
            this.setAttrs(name);
        } else {
            this.setAttr(name, value);
        }

        return this;
    }

    setAttr(name, value) {

        if (utils.isNil(value)) {
            this.removeAttr(name);
        } else {
            utils.setAttribute(this.node, name, value);
        }

        return this;
    }

    setAttrs(attrs) {

        utils.forIn(attrs, function (value, name) {
            this.setAttr(name, value);
        }, this);

        return this;
    }

    removeAttr(name) {

        utils.removeAttribute(this.node, name);

        return this;
    }

    show() {

        utils.showHide(this.node, true);

        return this;
    }

    hide() {

        utils.showHide(this.node, false);

        return this;
    }

    toggle(state) {

        if (utils.isBoolean(state)) {
            return state ? this.show() : this.hide();
        }

        if (utils.isHidden(this.node)) {
            this.show();
        } else {
            this.hide();
        }

        return this;
    }

    getClassName() {

        return utils.getClassName(this.node);
    }

    hasClass(selector) {

        return utils.hasClass(this.node, selector);
    }

    addClass(selector) {

        utils.addClass(this.node, selector);

        return this;
    }

    removeClass(selector) {

        utils.removeClass(this.node, selector);

        return this;
    }

    toggleClass(selector, stateVal) {

        utils.toggleClass(this.node, selector, stateVal);

        return this;
    }

    css(name, value) {

        if (!name) {
            return this.node.style;
        }

        utils.setStyle(this.node, name, value);

        return this;
    }

    text(content, options) {

        // replace all spaces with the Unicode No-break space
        // (http://www.fileformat.info/info/unicode/char/a0/index.htm).
        // IE would otherwise collapse all spaces into one.
        content = utils.sanitizeText(content);
        options = options || {};

        // `alignment-baseline` does not work in Firefox.
        // Setting `dominant-baseline` on the `<text>` element doesn't work in IE9.
        // In order to have the 0,0 coordinate of the `<text>` element (or the first `<tspan>`)
        // in the top left corner we translate the `<text>` element by `0.8em`.
        // See `http://www.w3.org/Graphics/SVG/WG/wiki/How_to_determine_dominant_baseline`.
        // See also `http://apike.ca/prog_svg_text_style.html`.
        let y = this.attr('y');
        if (!y) {
            this.attr('y', '0.8em');
        }

        // An empty text gets rendered into the DOM in webkit-based browsers.
        // In order to unify this behaviour across all browsers we rather
        // hide the text element when it's empty.
        this.attr('display', content ? null : 'none');

        // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
        this.attr('xml:space', 'preserve');

        // Easy way to erase all `<tspan>` children;
        this.node.textContent = '';


        let textNode        = this.node;
        let textPathOptions = options.textPath;
        if (textPathOptions) {

            // Wrap the text in the SVG <textPath> element that points to a path
            // defined by `options.textPath` inside the internal `<defs>` element.
            let defs = this.find('defs');
            if (!defs.length) {
                defs = createVElement('defs');
                this.append(defs);
            }

            // If `opt.textPath` is a plain string, consider it to be directly
            // the SVG path data for the text to go along (this is a shortcut).
            // Otherwise if it is an object and contains the `d` property,
            // then this is our path.
            let isTextPathObject = Object(textPathOptions) === textPathOptions;
            // d attr
            let d = isTextPathObject ? textPathOptions.d : textPathOptions;

            let vPath;

            if (d) {

                vPath = createVElement('path', {
                    d,
                    id: createPathId()
                });

                defs.append(vPath);
            }

            let vTextPath = createVElement('textPath');

            // Set attributes on the `<textPath>`. The most important one
            // is the `xlink:href` that points to our newly created `<path/>` element in `<defs/>`.
            // Note that we also allow the following construct:
            // `t.text('my text', {textPath: {'xlink:href': '#my-other-path'}})`.
            // In other words, one can completely skip the auto-creation of the path
            // and use any other arbitrary path that is in the document.
            if (!textPathOptions['xlink:href'] && vPath) {
                vTextPath.attr('xlink:href', '#' + vPath.node.id);
            }

            if (isTextPathObject) {
                vTextPath.attr(textPathOptions);
            }

            this.append(vTextPath);

            // Now all the `<tspan>`s will be inside the `<textPath>`.
            textNode = vTextPath.node;
        }


        let offset      = 0;
        let lines       = content.split('\n');
        let lineHeight  = options.lineHeight;
        let annotations = options.annotations;

        let includeAnnotationIndices = options.includeAnnotationIndices;

        if (annotations) {
            annotations = utils.isArray(annotations) ? annotations : [annotations];
        }

        lineHeight = lineHeight === 'auto' ? '1.5em' : lineHeight || '1em';


        utils.forEach(lines, function (line, i) {

            let vLine = createVElement('tspan', {
                dy: i ? lineHeight : '0',
                x: this.attr('x') || 0
            });

            vLine.addClass('pane-text-line');

            if (line) {

                if (annotations) {
                    // Get the line height based on the biggest font size
                    // in the annotations for this line.
                    let maxFontSize = 0;

                    // Find the *compacted* annotations for this line.
                    let lineAnnotations = vector.annotateString(line, annotations, {
                        offset: -offset,
                        includeAnnotationIndices
                    });

                    utils.forEach(lineAnnotations, function (annotation) {

                        let tspan;

                        if (utils.isObject(annotation)) {

                            let fontSize = utils.toInt(annotation.attrs['font-size']);
                            if (fontSize && fontSize > maxFontSize) {
                                maxFontSize = fontSize;
                            }

                            tspan = createVElement('tspan', annotation.attrs);
                            if (includeAnnotationIndices) {
                                // If `includeAnnotationIndices` is `true`,
                                // set the list of indices of all the applied annotations
                                // in the `annotations` attribute. This list is a comma
                                // separated list of indices.
                                tspan.attr('annotations', annotation.annotations);
                            }

                            if (annotation.attrs.class) {
                                tspan.addClass(annotation.attrs.class);
                            }

                            tspan.node.textContent = annotation.t;

                        } else {
                            tspan = document.createTextNode(annotation || ' ');
                        }

                        vLine.append(tspan);
                    });

                    if (options.lineHeight === 'auto' && maxFontSize && i !== 0) {
                        vLine.attr('dy', (maxFontSize * 1.2) + 'px');
                    }

                } else {
                    vLine.node.textContent = line;
                }

            } else {

                // Make sure the textContent is never empty.
                // If it is, add a dummy character and make it invisible,
                // making the following lines correctly relatively positioned.
                // `dy=1em` won't work with empty lines otherwise.
                vLine.addClass('pane-text-empty');
                vLine.node.style.opacity = 0;
                vLine.node.textContent   = '-';
            }

            textNode.appendChild(vLine.node);

            offset += line.length + 1;      // + 1 = newline character.

        }, this);

        return this;
    }

    remove() {

        utils.removeElement(this.node);

        return this;
    }

    empty() {

        utils.emptyElement(this.node);

        return this;
    }

    append(elem) {
        eachElem(elem, function (item) {
            this.node.appendChild(normalize(item));
        }, this);

        return this;
    }

    prepend(elem) {
        eachElem(elem, function (item) {
            this.node.insertBefore(normalize(item), this.node.firstChild);
        }, this);

        return this;
    }

    before(elem) {
        eachElem(elem, function (item) {
            if (this.node.parentNode) {
                this.node.parentNode.insertBefore(normalize(item), this.node);
            }
        }, this);

        return this;
    }

    after(elem) {
        eachElem(elem, function (item) {
            if (this.node.parentNode) {
                this.node.parentNode.insertBefore(normalize(item), this.node.nextSibling);
            }
        }, this);

        return this;
    }

    appendTo(elem) {

        getLastVElement(elem).append(this);

        return this;
    }

    prependTo(elem) {

        getLastVElement(elem).prepend(this);

        return this;
    }

    insertBefore(elem) {

        getLastVElement(elem).before(this);

        return this;
    }

    insertAfter(elem) {

        getLastVElement(elem).after(this);

        return this;
    }

    getSVG() {

        return this.node instanceof window.SVGSVGElement
            ? this
            : vectorize(this.node.ownerSVGElement);
    }

    getDefs() {

        let svg  = this.getSVG();
        let defs = svg.node.getElementsByTagName('defs');

        if (defs && defs.length) {
            defs = vectorize(defs[0]);
        } else {
            defs = createVElement('defs');
            svg.append(defs);
        }

        return defs;
    }

    clone() {

        let cloned = vectorize(this.node.cloneNode(true));

        if (this.node.id) {
            cloned.node.removeAttribute('id');
        }

        return cloned;
    }

    find(selector) {

        return utils.map(this.node.querySelectorAll(selector), vectorize);
    }

    findOne(selector) {

        let found = this.node.querySelector(selector);
        return found ? vectorize(found) : null;
    }

    findParent(className, terminator) {

        let stop = terminator || this.node.ownerSVGElement;
        let node = this.node.parentNode;

        while (node && node !== stop) {
            let vel = vectorize(node);
            if (vel.hasClass(className)) {
                return vel;
            }

            node = node.parentNode;
        }

        return null;
    }

    parent() {

        let parentNode = this.node && this.node.parentNode;
        if (parentNode) {
            return vectorize(parentNode);
        }

        return null;
    }

    index() {

        let idx  = 0;
        let node = this.node.previousSibling;

        while (node) {
            // nodeType 1 for ELEMENT_NODE
            if (node.nodeType === 1) {
                idx++;
            }
            node = node.previousSibling;
        }

        return idx;
    }

    translate(tx, ty, relative) {

        let raw = this.attr('transform') || '';
        let ts  = utils.parseTranslate(raw);

        if (utils.isUndefined(tx)) {
            return ts;
        }

        tx = relative ? ts.tx + tx : tx;
        ty = relative ? ts.ty + ty : ty;

        let mutant = utils.clearTranslate(raw);
        let final  = 'translate(' + tx + ',' + ty + ')';

        // Note that `translate()` is always the first transformation.
        // This is usually the desired case.
        if (mutant) {
            final = final + ' ' + mutant;
        }

        this.attr('transform', final);

        return this;
    }

    rotate(angle, cx, cy, relative) {

        let raw = this.attr('transform') || '';
        let rt  = utils.parseRotate(raw);

        if (utils.isUndefined(angle)) {
            return rt;
        }

        angle %= 360;

        let newAngle  = relative ? rt.angle + angle : angle;
        let newOrigin = utils.isUndefined(cx) || utils.isUndefined(cy) ? '' : ',' + cx + ',' + cy;

        let mutant = utils.clearRotate(raw);
        let final  = 'rotate(' + newAngle + newOrigin + ')';

        if (mutant) {
            final = mutant + ' ' + final;
        }

        return this.attr('transform', final);
    }

    scale(sx, sy, relative) {

        let raw = this.attr('transform') || '';
        let sc  = utils.parseScale(raw);

        if (utils.isUndefined(sx)) {
            return sc;
        }

        if (utils.isUndefined(sy)) {
            sy = sx;
        }


        sx = relative ? sc.sx * sx : sx;
        sy = relative ? sc.sy * sy : sy;

        let mutant = utils.clearScale(raw);
        let final  = 'scale(' + sx + ',' + sy + ')';

        if (mutant) {
            final = mutant + ' ' + final;
        }

        return this.attr('transform', final);
    }

    getBBox(withoutTransformations, target) {

        // Get SVGRect that contains coordinates and dimension of the real
        // bounding box, i.e. after transformations are applied.
        // If `target` is specified, bounding box will be computed
        // relatively to `target` element.

        // If the element is not in the live DOM, it does not have a bounding
        // box defined and so fall back to 'zero' dimension element.
        if (!this.node.ownerSVGElement) {
            return new Rect(0, 0, 0, 0);
        }

        let box;
        try {
            box = this.node.getBBox();
            // We are creating a new object as the standard says that
            // you can't modify the attributes of a bbox.
            box = {
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height
            };
        } catch (e) {
            // fallback for IE
            box = {
                x: this.node.clientLeft,
                y: this.node.clientTop,
                width: this.node.clientWidth,
                height: this.node.clientHeight
            };
        }

        if (!withoutTransformations) {

            let matrix = this.getTransformToElement(target || this.node.ownerSVGElement);

            box = vector.transformRect(box, matrix);
        }

        return Rect.fromRect(box);
    }

    toLocalPoint(x, y) {

        // Convert global point into the coordinate space of this element.
        let svg   = this.getSVG().node;
        let point = svg.createSVGPoint();

        point.x = x;
        point.y = y;

        try {
            // ref: https://msdn.microsoft.com/zh-cn/library/hh535760(v=vs.85).aspx
            let globalPoint         = point.matrixTransform(svg.getScreenCTM().inverse());
            let globalToLocalMatrix = this.getTransformToElement(svg).inverse();
            return globalPoint.matrixTransform(globalToLocalMatrix);

        } catch (e) {
            // IE9 throws an exception in odd cases.
            // (`Unexpected call to method or property access`)
            // We have to make do with the original coordianates.
            return point;
        }
    }

    getTransformToElement(toElem) {

        return utils.getTransformToElement(this.node, toElem);
    }

    translateCenterToPoint(point) {

        let bbox   = this.getBBox();
        let center = bbox.getCenter();

        this.translate(point.x - center.x, point.y - center.y);

        return this;
    }

    translateAndAutoOrient(position, reference, target) {

        // Efficiently auto-orient an element.
        // This basically implements the orient=auto attribute of markers.
        // The easiest way of understanding on what this does is to imagine
        // the element is an arrowhead. Calling this method on the arrowhead
        // makes it point to the `position` point while being auto-oriented
        // (properly rotated) towards the `reference` point. `target` is the
        // element relative to which the transformations are applied. Usually
        // a viewport.


        // Clean-up previously set transformations except the scale. If we
        // didn't clean up the previous transformations then they'd add up
        // with the old ones. Scale is an exception as it doesn't add up,
        // consider: `this.scale(2).scale(2).scale(2)`. The result is that the
        // element is scaled by the factor 2, not 8.

        let scale = this.scale();
        this.attr('transform', '');
        this.scale(scale.sx, scale.sy);

        let svg  = this.getSVG().node;
        let bbox = this.getBBox(false, target);

        // 1. Translate to origin.
        let translateToOrigin = svg.createSVGTransform();
        translateToOrigin.setTranslate(-bbox.x - bbox.width / 2, -bbox.y - bbox.height / 2);


        // 2. Rotate around origin.
        let rotateAroundOrigin = svg.createSVGTransform();

        let angle = Point
            .fromPoint(position)
            .changeInAngle(position.x - reference.x, position.y - reference.y, reference);
        rotateAroundOrigin.setRotate(angle, 0, 0);


        // 3. Translate to the `position` + the offset (half my width) towards the `reference` point.
        let translateFinal = svg.createSVGTransform();
        let finalPosition  = Point.fromPoint(position).move(reference, bbox.width / 2);
        translateFinal.setTranslate(position.x + (position.x - finalPosition.x), position.y + (position.y - finalPosition.y));


        // 4. Apply transformations.
        let matrix    = this.getTransformToElement(target);
        let transform = svg.createSVGTransform();
        transform.setMatrix(
            translateFinal.matrix.multiply(
                rotateAroundOrigin.matrix.multiply(
                    translateToOrigin.matrix.multiply(matrix)))
        );


        // Instead of directly setting the `matrix()` transform on the element,
        // first, decompose the matrix into separate transforms. This allows us
        // to use normal vector's methods as they don't work on matrices.
        // An example of this is to retrieve a scale of an element.

        let decomposition = decomposeMatrix(transform.matrix);

        this.translate(utils.toFixed(decomposition.translateX, 2), utils.toFixed(decomposition.translateY, 2));
        this.rotate(utils.toFixed(decomposition.rotation, 2));
        // Note that scale has been already applied
        // this.scale(decomposition.scaleX, decomposition.scaleY);

        return this;
    }

    animateAlongPath() { }

    sample(interval) {

        // Interpolate path by discrete points.
        // The precision of the sampling is controlled by `interval`.
        // In other words, `sample()` will generate a point on the path
        // starting at the beginning of the path going to the end every
        // `interval` pixels.
        // The sampler can be very useful. E.g. finding intersection between
        // two paths (finding the two closest points from two samples).


        // `path.getTotalLength()`
        // Returns the computed value for the total length of the path using
        // the browser's distance-along-a-path algorithm, as a distance in the
        // current user coordinate system.

        // `path.getPointAtLength(distance)`
        // Returns the (x,y) coordinate in user space which is distance units
        // along the path, utilizing the browser's distance-along-a-path algorithm.

        interval = interval || 1;

        let length   = this.node.getTotalLength();
        let distance = 0;
        let samples  = [];

        while (distance < length) {

            let sample = this.node.getPointAtLength(distance);

            samples.push({
                distance,
                x: sample.x,
                y: sample.y
            });

            distance += interval;
        }

        return samples;
    }

    toPath() {

        let path = vectorize(utils.createSvgElement('path'));
        let d    = this.toPathData();

        path.attr(this.attr());

        d && path.attr('d', d);

        return path;
    }

    toPathData() {

        let tagName = this.node.tagName.toLowerCase();
        if (tagName === 'path') {
            return this.attr('d');
        }

        let method = utils[tagName + 'ToPathData'];
        if (utils.isFunction(method)) {
            return method(this.node);
        }

        throw new Error(tagName + ' cannot be converted to PATH.');
    }

    findIntersection(ref, target) {

        // Find the intersection of a line starting in the center of the `node`
        // ending in the point `ref`. `target` is an SVG element to which
        // node's transformations are relative to. Note that `ref` point must
        // be in  the coordinate system of the `target` for this function to
        // work  properly. Returns a point in the `target` coordinate system
        // (the same system as `ref` is in) if an intersection is found.
        // Returns `undefined` otherwise.

        let that = this;
        let svg  = that.getSVG().node;

        target = target || svg;

        let bbox   = Rect.fromRect(that.getBBox(false, target));
        let center = bbox.getCenter();
        let spot   = bbox.intersectionWithLineFromCenterToPoint(ref);

        if (!spot) {
            return undefined;
        }

        let tagName = that.node.localName.toUpperCase();

        // Little speed up optimalization for `<rect>` element. We do not do conversion
        // to path element and sampling but directly calculate the intersection through
        // a transformed geometrical rectangle.
        if (tagName === 'RECT') {

            let gRect = new Rect(
                parseFloat(this.attr('x') || 0),
                parseFloat(this.attr('y') || 0),
                parseFloat(this.attr('width')),
                parseFloat(this.attr('height'))
            );
            // Get the rect transformation matrix with regards to the SVG document.
            let rectMatrix = that.getTransformToElement(target);
            // Decompose the matrix to find the rotation angle.
            let rectMatrixComponents = vector.decomposeMatrix(rectMatrix);
            // Now we want to rotate the rectangle back so that we
            // can use `intersectionWithLineFromCenterToPoint()` passing the angle as the second argument.
            let resetRotation = svg.createSVGTransform();
            resetRotation.setRotate(-rectMatrixComponents.rotation, center.x, center.y);
            let rect = vector.transformRect(gRect, resetRotation.matrix.multiply(rectMatrix));

            spot = Rect.fromRect(rect).intersectionWithLineFromCenterToPoint(ref, rectMatrixComponents.rotation);

        } else if (tagName === 'PATH'
            || tagName === 'POLYGON'
            || tagName === 'POLYLINE'
            || tagName === 'CIRCLE'
            || tagName === 'ELLIPSE') {

            let pathNode       = (tagName === 'PATH') ? that : that.toPath();
            let samples        = pathNode.sample();
            let minDistance    = Infinity;
            let closestSamples = [];

            for (let i = 0, len = samples.length; i < len; i++) {

                let sample = samples[i];
                // Convert the sample point in the local coordinate system to the global coordinate system.
                let gp             = vector.createSVGPoint(sample.x, sample.y);
                gp                 = gp.matrixTransform(that.getTransformToElement(target));
                sample             = Point.fromPoint(gp);
                let centerDistance = sample.distance(center);
                // Penalize a higher distance to the reference point by 10%.
                // This gives better results. This is due to
                // inaccuracies introduced by rounding errors and getPointAtLength() returns.
                let refDistance = sample.distance(ref) * 1.1;
                let distance    = centerDistance + refDistance;
                if (distance < minDistance) {
                    minDistance    = distance;
                    closestSamples = [{
                        sample,
                        refDistance
                    }];
                } else if (distance < minDistance + 1) {
                    closestSamples.push({
                        sample,
                        refDistance
                    });
                }
            }

            closestSamples.sort(function (a, b) {
                return a.refDistance - b.refDistance;
            });
            spot = closestSamples[0].sample;
        }

        return spot;
    }
}

function getLastVElement(elem) {

    let vel = vector.isVElement(elem) ? elem : createVElement(elem);

    return utils.isArray(vel) ? vel[vel.length - 1] : vel;
}

function eachElem(elem, iterator, context) {

    if (elem) {

        let vel = utils.map(utils.isArray(elem) ? elem : [elem], function (item) {
            return vector.isVElement(item) ? item : createVElement(elem);
        });

        utils.forEach(vel, iterator, context);
    }
}

function vectorize(node) {
    return new VElement(node);
}

function normalize(elem) {
    return elem instanceof VElement ? elem.node : elem;
}

function createVElement(elem, attrs, children) {

    if (!elem) {
        return null;
    }

    if (elem instanceof VElement) {
        elem = elem.node;
    }

    if (utils.isString(elem)) {

        if (elem.toLowerCase() === 'svg') {
            // create a new SVG canvas
            elem = utils.createSvgDocument();

        } else if (elem[0] === '<') {

            // Create element from an SVG string.
            let svgDoc = utils.createSvgDocument(elem);
            if (svgDoc.childNodes.length > 1) {
                return utils.map(svgDoc.childNodes, function (childNode) {
                    return vectorize(document.importNode(childNode, true));
                });
            }

            elem = document.importNode(svgDoc.firstChild, true);
        } else {
            // create svg node by tagName.
            elem = utils.createSvgElement(elem);
        }
    }

    let vel = vectorize(elem);

    // set attributes.
    attrs && vel.setAttrs(attrs);

    // append children.
    children && vel.append(children);

    return vel;
}


// vector
// ------

let vector = VElement.create = createVElement;
let svgDocument = createVElement('svg').node;


utils.extend(vector, {

    isVElement(obj) {

        return obj instanceof VElement;
    },

    createSVGPoint(x, y) {

        let point = svgDocument.createSVGPoint();

        point.x = x;
        point.y = y;

        return point;
    },

    createSVGMatrix(matrix) {

        let svgMatrix = svgDocument.createSVGMatrix();

        /* eslint guard-for-in: 0 */
        for (let key in matrix) {
            svgMatrix[key] = matrix[key];
        }

        return svgMatrix;
    },

    createSVGTransform(matrix) {

        if (!utils.isUndefined(matrix)) {

            if (!(matrix instanceof SVGMatrix)) {
                matrix = vector.createSVGMatrix(matrix);
            }
            return svgDocument.createSVGTransformFromMatrix(matrix);
        }

        return svgDocument.createSVGTransform();
    },

    transformRect(rect, matrix) {

        let point = svgDocument.createSVGPoint();

        point.x = rect.x;
        point.y = rect.y;

        let corner1 = point.matrixTransform(matrix);


        point.x = rect.x + rect.width;
        point.y = rect.y;

        let corner2 = point.matrixTransform(matrix);


        point.x = rect.x + rect.width;
        point.y = rect.y + rect.height;

        let corner3 = point.matrixTransform(matrix);


        point.x = rect.x;
        point.y = rect.y + rect.height;

        let corner4 = point.matrixTransform(matrix);


        let minX = Math.min(corner1.x, corner2.x, corner3.x, corner4.x);
        let maxX = Math.max(corner1.x, corner2.x, corner3.x, corner4.x);
        let minY = Math.min(corner1.y, corner2.y, corner3.y, corner4.y);
        let maxY = Math.max(corner1.y, corner2.y, corner3.y, corner4.y);

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    },

    annotations(t, annotations, options) {

        annotations = annotations || [];
        annotations = utils.isArray(annotations) ? annotations : [annotations];
        options     = options || {};

        let compacted = [];
        let ret       = [];
        let offset    = options.offset || 0;
        let batch;
        let item;
        let prev;

        for (let i = 0, l = t.length; i < l; i++) {

            item = ret[i] = t[i];

            for (let j = 0, k = annotations.length; j < k; j++) {

                let annotation = annotations[j];
                let start      = annotation.start + offset;
                let end        = annotation.end + offset;

                if (i >= start && i < end) {
                    // Annotation applies.
                    if (utils.isObject(item)) {
                        // There is more than one annotation to be applied => Merge attributes.
                        item.attrs = utils.merge({}, item.attrs, annotation.attrs);
                    } else {
                        item = ret[i] = {
                            t: t[i],
                            attrs: annotation.attrs
                        };
                    }
                    if (options.includeAnnotationIndices) {

                        if (!item.annotations) {
                            item.annotations = [];
                        }

                        item.annotations.push(j);
                    }
                }
            }

            prev = ret[i - 1];

            if (!prev) {

                batch = item;

            } else if (utils.isObject(item) && utils.isObject(prev)) {
                // Both previous item and the current one are annotations. If the attributes
                // didn't change, merge the text.
                if (JSON.stringify(item.attrs) === JSON.stringify(prev.attrs)) {
                    batch.t += item.t;
                } else {
                    compacted.push(batch);
                    batch = item;
                }

            } else if (utils.isObject(item)) {
                // Previous item was a string, current item is an annotation.
                compacted.push(batch);
                batch = item;

            } else if (utils.isObject(prev)) {
                // Previous item was an annotation, current item is a string.
                compacted.push(batch);
                batch = item;

            } else {
                // Both previous and current item are strings.
                batch = (batch || '') + item;
            }
        }

        if (batch) {
            compacted.push(batch);
        }

        return compacted;
    }
});


// exports
// -------

export default vector;
