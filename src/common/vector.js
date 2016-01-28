import * as utils from '../common/utils';
import Rect  from '../geometry/Rect';
import Point from '../geometry/Point';

let rclass = /[\t\r\n\f]/g;
let rnotwhite = (/\S+/g);

let pathCount = 0;

function createPathId() {

    let id;

    do {
        pathCount += 1;
        id = 'pane-path-' + pathCount;
    } while (document.getElementById(id));

    return id;
}

function getTransformToElement(source, target) {

    // chrome 48 removed svg getTransformToElement api

    let matrix;
    try {
        matrix = target.getScreenCTM().inverse();
    } catch (e) {
        throw new Error('Can not inverse source element\'s ctm.');
    }

    return matrix.multiply(source.getScreenCTM());
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

        if (elem instanceof VElement) {
            elem = elem.node;
        }

        this.node = elem;
    }

    attr(name, value) {

        let that = this;
        let node = that.node;
        let len = arguments.length;

        // return all attributes
        if (!len) {

            let attrs = {};

            utils.forEach(node.attributes, function (attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            return attrs;
        }

        if (len === 1) {
            if (utils.isObject(name)) {
                utils.forIn(name, function (attrValue, attrName) {
                    utils.setAttribute(node, attrName, attrValue);
                });
            } else {
                return node.getAttribute(name);
            }
        } else {
            utils.setAttribute(node, name, value);
        }

        return that;
    }

    show() {
        let that = this;
        that.css({
            visibility: 'visible',
            display: that.attr('olddisplay') || '',
        });
        that.hidden = false;
        return that;
    }
    hide() {
        let that = this;
        let display = that.css().display;
        display = (display === 'none') ? '' : display;
        that.attr('olddisplay', display);
        that.css({
            visibility: 'hidden',
            display: 'none',
        });
        that.hidden = true;
        return that;
    }

    removeAttr(name) {

        let that = this;
        let node = that.node;

        if (node && name) {
            node.removeAttribute(name);
        }

        return that;
    }

    css(style) {
        let that = this;

        if (!style) {
            return that.node.style;
        }

        let node = that.node;
        if (utils.isString(style)) {
            style = vector.styleToObject(style);
        }
        utils.forIn(style, function (value, key) {
            node.style[key] = value;
        });

        return that;
    }

    text(content, options) {

        let that = this;
        let textNode = that.node;

        content = utils.sanitizeText(content);
        options = options || {};

        // `alignment-baseline` does not work in Firefox.
        // Setting `dominant-baseline` on the `<text>` element doesn't work in IE9.
        // In order to have the 0,0 coordinate of the `<text>` element (or the first `<tspan>`)
        // in the top left corner we translate the `<text>` element by `0.8em`.
        // See `http://www.w3.org/Graphics/SVG/WG/wiki/How_to_determine_dominant_baseline`.
        // See also `http://apike.ca/prog_svg_text_style.html`.
        let y = that.attr('y');
        if (!y) {
            that.attr('y', '0.8em');
        }

        // An empty text gets rendered into the DOM in webkit-based browsers.
        // In order to unify this behaviour across all browsers
        // we rather hide the text element when it's empty.
        that.attr('display', content ? null : 'none');

        // Preserve spaces. In other words, we do not want consecutive spaces to get collapsed to one.
        textNode.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');

        // clear all `<tspan>` children
        textNode.textContent = '';

        let textPathOptions = options.textPath;
        if (textPathOptions) {

            // Wrap the text in the SVG <textPath> element that points to a path
            // defined by `options.textPath` inside the internal `<defs>` element.
            let defs = that.find('defs');
            if (!defs.length) {
                defs = createElement('defs');
                that.append(defs);
            }

            // If `opt.textPath` is a plain string, consider it to be directly
            // the SVG path data for the text to go along (this is a shortcut).
            // Otherwise if it is an object and contains the `d` property,
            // then this is our path.
            let isTextPathObject = utils.isObject(textPathOptions);
            // d attr
            let d = isTextPathObject ? textPathOptions.d : textPathOptions;

            let vPath;

            if (d) {

                vPath = createElement('path', {
                    d,
                    id: createPathId()
                });

                defs.append(vPath);
            }

            let vTextPath = createElement('textPath');

            // Set attributes on the `<textPath>`. The most important one
            // is the `xlink:href` that points to our newly created `<path/>` element in `<defs/>`.
            // Note that we also allow the following construct:
            // `t.text('my text', {textPath: {'xlink:href': '#my-other-path'}})`.
            // In other words, one can completely skip the auto-creation of the path
            // and use any other arbitrary path that is in the document.
            if (isTextPathObject) {

                if (!textPathOptions['xlink:href'] && vPath) {
                    vTextPath.attr('xlink:href', '#' + vPath.node.id);
                }

                vTextPath.attr(textPathOptions);
            }

            that.append(vTextPath);
            textNode = vTextPath.node;
        }


        let offset = 0;
        let lines = content.split('\n');
        let lineHeight = options.lineHeight;
        let annotations = options.annotations;

        let includeAnnotationIndices = options.includeAnnotationIndices;

        if (annotations) {
            annotations = utils.isArray(annotations) ? annotations : [annotations];
        }

        lineHeight = lineHeight === 'auto' ? '1.5em' : lineHeight || '1em';


        utils.forEach(lines, function (line, i) {

            let vLine = createElement('tspan', {
                dy: i ? lineHeight : '0',
                x: that.attr('x') || 0
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

                            tspan = createElement('tspan', annotation.attrs);
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
                vLine.node.textContent = '-';
            }

            textNode.appendChild(vLine.node);

            offset += line.length + 1;      // + 1 = newline character.
        });

        return that;
    }

    hasClass(selector) {

        let that = this;
        let node = that.node;

        let className = ' ' + selector + ' ';

        return node.nodeType === 1
            ? (' ' + utils.getClassName(node) + ' ').replace(rclass, ' ').indexOf(className) > -1
            : false;
    }

    addClass(value) {

        let that = this;
        let node = that.node;

        if (utils.isFunction(value)) {
            return that.addClass(value.call(node, utils.getClassName(node)));
        }

        if (value && utils.isString(value) && node.nodeType === 1) {

            let classes = value.match(rnotwhite) || [];
            let oldValue = (' ' + utils.getClassName(node) + ' ').replace(rclass, ' ');
            let newValue = utils.reduce(classes, function (ret, cls) {
                if (ret.indexOf(' ' + cls + ' ') < 0) {
                    ret += cls + ' ';
                }
                return ret;
            }, oldValue);

            newValue = utils.trim(newValue);

            if (oldValue !== newValue) {
                node.setAttribute('class', newValue);
            }
        }

        return that;
    }

    removeClass(value) {

        let that = this;
        let node = that.node;

        if (utils.isFunction(value)) {
            return that.removeClass(value.call(node, utils.getClassName(node)));
        }

        if ((!value || utils.isString(value)) && node.nodeType === 1) {

            let classes = (value || '').match(rnotwhite) || [];
            let oldValue = (' ' + utils.getClassName(node) + ' ').replace(rclass, ' ');
            let newValue = utils.reduce(classes, function (ret, cls) {
                if (ret.indexOf(' ' + cls + ' ') > -1) {
                    ret = ret.replace(' ' + cls + ' ', ' ');
                }
                return ret;
            }, oldValue);

            newValue = value ? utils.trim(newValue) : '';

            if (oldValue !== newValue) {
                node.setAttribute('class', newValue);
            }
        }

        return that;
    }

    toggleClass(value, stateVal) {

        let that = this;
        let node = that.node;

        if (utils.isBoolean(stateVal) && utils.isString(value)) {
            return stateVal ? that.addClass(value) : that.removeClass(value);
        }

        if (utils.isFunction(value)) {
            return that.toggleClass(value.call(node, utils.getClassName(node), stateVal), stateVal);
        }

        if (value && utils.isString(value)) {
            let classes = value.match(rnotwhite) || [];
            utils.forEach(classes, function (cls) {
                that.hasClass(cls) ? that.removeClass(cls) : that.addClass(cls);
            });
        }

        return that;
    }

    remove() {

        let that = this;
        let node = that.node;

        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }

        return that;
    }

    empty() {

        let that = this;
        let node = that.node;

        if (node) {
            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }
        }

        return that;
    }

    append(elem) {

        let that = this;

        elem && utils.forEach(utils.toArray(elem), function (item) {
            that.node.appendChild(normalize(item));
        });

        return that;
    }

    prepend(elem) {

        let that = this;
        let node = that.node;

        elem && node.insertBefore(normalize(elem), node.firstChild);

        return that;
    }

    appendTo(/* elem */) {
        // elem.appendChild(this.node);
        // return this;
    }

    prependTo(/* elem */) {

    }

    before(/* elem */) {

    }

    after(/* elem */) {

    }

    getSVG() {
        let that = this;
        let node = that.node;

        return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
    }

    getDefs() {

        let defs = null;
        let svg = this.getSVG();

        utils.some(svg.node.childNodes, function (node) {
            if (utils.isNode(node, 'defs')) {
                defs = vectorize(node);
                return true;
            }
        });

        if (!defs) {
            defs = createElement('defs');
            svg.append(defs);
        }

        return defs;
    }

    clone() {

        let node = this.node;
        let cloned = vectorize(node.cloneNode(true));

        if (node.id) {
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

        let node = this.node;
        let stop = terminator || node.ownerSVGElement;

        node = node.parentNode;

        while (node && node !== stop) {
            let vel = vectorize(node);
            if (vel.hasClass(className)) {
                return vel;
            }

            node = node.parentNode;
        }

        return null;
    }

    index() {

        let idx = 0;
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
        let ts = utils.parseTranslate(raw);

        if (!arguments.length) {
            return ts;
        }

        let mutant = utils.clearTranslate(raw);

        let dx = relative ? ts.tx + tx : tx;
        let dy = relative ? ts.ty + ty : ty;

        let final = 'translate(' + dx + ',' + dy + ')';

        if (mutant) {
            final = final + ' ' + mutant;
        }

        return this.attr('transform', final);
    }

    rotate(angle, cx, cy, relative) {

        let raw = this.attr('transform') || '';
        let rt = utils.parseRotate(raw);

        if (!arguments.length) {
            return rt;
        }

        let mutant = utils.clearRotate(raw);

        angle %= 360;

        let newAngle = relative ? rt.angle + angle : angle;
        let newOrigin = utils.isUndefined(cx) || utils.isUndefined(cy) ? '' : ',' + cx + ',' + cy;

        let final = 'rotate(' + newAngle + newOrigin + ')';

        if (mutant) {
            final = mutant + ' ' + final;
        }

        return this.attr('transform', final);
    }

    scale(sx, sy, relative) {

        let raw = this.attr('transform') || '';
        let sc = utils.parseScale(raw);
        let len = arguments.length;

        if (!len) {
            return sc;
        }

        let mutant = utils.clearScale(raw);

        if (len === 1) {
            sy = sx;
        } else if (len === 2) {
            if (utils.isBoolean(sy)) {
                relative = sy;
                sy = sx;
            }
        }

        sx = relative ? sc.sx * sx : sx;
        sy = relative ? sc.sy * sy : sy;

        let final = 'scale(' + sx + ',' + sy + ')';

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

        let that = this;
        let node = that.node;

        // If the element is not in the live DOM, it does not have a bounding
        // box defined and so fall back to 'zero' dimension element.
        if (!node.ownerSVGElement) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }


        let box;
        try {
            box = node.getBBox();
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
                x: node.clientLeft,
                y: node.clientTop,
                width: node.clientWidth,
                height: node.clientHeight
            };
        }

        if (!withoutTransformations) {

            let matrix = that.getTransformToElement(target || node.ownerSVGElement);
            box = vector.transformRect(box, matrix);
        }

        return Rect.fromRect(box);
    }

    toLocalPoint(x, y) {

        // Convert global point into the coordinate space of this element.

        let that = this;
        let svg = that.getSVG().node;
        let point = svg.createSVGPoint();

        point.x = x;
        point.y = y;

        try {
            // ref: https://msdn.microsoft.com/zh-cn/library/hh535760(v=vs.85).aspx
            let globalPoint = point.matrixTransform(svg.getScreenCTM().inverse());
            let globalToLocalMatrix = that.getTransformToElement(svg).inverse();
            return globalPoint.matrixTransform(globalToLocalMatrix);

        } catch (e) {
            // IE9 throws an exception in odd cases.
            // (`Unexpected call to method or property access`)
            // We have to make do with the original coordianates.
            return point;
        }
    }

    getTransformToElement(toElem) {

        let node = this.node;

        if (!node) {
            return null;
        }
        return node.getTransformToElement
            ? node.getTransformToElement(toElem)
            : getTransformToElement(node, toElem);
    }

    translateCenterToPoint() {
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

        let that = this;
        let s = that.scale();
        that.attr('transform', '');
        that.scale(s.sx, s.sy);

        let svg = that.getSVG().node;
        let bbox = that.getBBox(false, target);

        // 1. Translate to origin.
        let translateToOrigin = svg.createSVGTransform();
        translateToOrigin.setTranslate(-bbox.x - bbox.width / 2, -bbox.y - bbox.height / 2);

        // 2. Rotate around origin.
        let rotateAroundOrigin = svg.createSVGTransform();
        let angle = Point.fromPoint(position).changeInAngle(position.x - reference.x, position.y - reference.y, reference);
        rotateAroundOrigin.setRotate(angle, 0, 0);

        // 3. Translate to the `position` + the offset (half my width) towards the `reference` point.
        let translateFinal = svg.createSVGTransform();
        let finalPosition = Point.fromPoint(position).move(reference, bbox.width / 2);
        translateFinal.setTranslate(position.x + (position.x - finalPosition.x), position.y + (position.y - finalPosition.y));

        // 4. Apply transformations.
        let ctm = that.getTransformToElement(target);
        let transform = svg.createSVGTransform();
        transform.setMatrix(
            translateFinal.matrix.multiply(
                rotateAroundOrigin.matrix.multiply(
                    translateToOrigin.matrix.multiply(ctm)))
        );


        // Instead of directly setting the `matrix()` transform on the element,
        // first, decompose the matrix into separate transforms. This allows us
        // to use normal vector's methods as they don't work on matrices.
        // An example of this is to retrieve a scale of an element.

        let decomposition = decomposeMatrix(transform.matrix);

        that.translate(decomposition.translateX, decomposition.translateY);
        that.rotate(decomposition.rotation);
        // Note that scale has been already applied
        // this.scale(decomposition.scaleX, decomposition.scaleY);

        return that;
    }

    animateAlongPath() {
    }

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

        let node = this.node;
        let length = node.getTotalLength();
        let distance = 0;
        let samples = [];

        while (distance < length) {

            let sample = node.getPointAtLength(distance);

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

        let that = this;
        let path = vectorize(utils.createSvgElement('path'));
        let d = that.toPathData();

        path.attr(that.attr());

        d && path.attr('d', d);

        return path;
    }

    toPathData() {

        let that = this;
        let node = that.node;

        let tagName = node.tagName.toLowerCase();

        if (tagName === 'path') {
            return that.attr('d');
        }

        let method = utils[tagName + 'ToPathData'];

        if (utils.isFunction(method)) {
            return method(node);
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
        let svg = that.getSVG().node;

        target = target || svg;

        let bbox = Rect.fromRect(that.getBBox(false, target));
        let center = bbox.getCenter();
        let spot = bbox.intersectionWithLineFromCenterToPoint(ref);

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

            let pathNode = (tagName === 'PATH') ? that : that.toPath();
            let samples = pathNode.sample();
            let minDistance = Infinity;
            let closestSamples = [];

            for (let i = 0, len = samples.length; i < len; i++) {

                let sample = samples[i];
                // Convert the sample point in the local coordinate system to the global coordinate system.
                let gp = vector.createSVGPoint(sample.x, sample.y);
                gp = gp.matrixTransform(that.getTransformToElement(target));
                sample = Point.fromPoint(gp);
                let centerDistance = sample.distance(center);
                // Penalize a higher distance to the reference point by 10%.
                // This gives better results. This is due to
                // inaccuracies introduced by rounding errors and getPointAtLength() returns.
                let refDistance = sample.distance(ref) * 1.1;
                let distance = centerDistance + refDistance;
                if (distance < minDistance) {
                    minDistance = distance;
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


function vectorize(node) {
    return new VElement(node);
}

function normalize(elem) {
    return elem instanceof VElement ? elem.node : elem;
}

function createElement(elem, attrs, children) {

    if (!elem) {
        return null;
    }

    if (utils.isObject(elem)) {
        return vectorize(elem);
    }

    if (elem.toLowerCase() === 'svg') {
        return vectorize(utils.createSvgDocument());
    } else if (elem[0] === '<') {
        let svgDoc = utils.createSvgDocument(elem);
        if (svgDoc.childNodes.length > 1) {
            return utils.map(svgDoc.childNodes, function (childNode) {
                return vectorize(document.importNode(childNode, true));
            });
        }

        return vectorize(document.importNode(svgDoc.firstChild, true));
    }


    // create svg node by tagName.
    elem = utils.createSvgElement(elem);

    // set attributes.
    attrs && utils.forIn(attrs, function (value, attr) {
        utils.setAttribute(elem, attr, value);
    });

    // append children.
    if (children) {
        children = utils.isArray(children) ? children : [children];

        utils.forEach(children, function (child) {
            elem.appendChild(child instanceof VElement ? child.node : child);
        });
    }

    return vectorize(elem);
}


// vector
// ------

let vector = VElement.createElement = createElement;
let svgDocument = createElement('svg').node;

vector.isVElement = function (obj) {
    return obj instanceof VElement;
};

vector.createSVGMatrix = function (matrix) {

    let svgMatrix = svgDocument.createSVGMatrix();

    /* eslint guard-for-in: 0 */
    for (let key in matrix) {
        svgMatrix[key] = matrix[key];
    }

    return svgMatrix;
};

vector.createSVGTransform = function () {
    return svgDocument.createSVGTransform();
};

vector.createSVGPoint = function (x, y) {

    let point = svgDocument.createSVGPoint();

    point.x = x;
    point.y = y;

    return point;
};

vector.transformRect = function (rect, matrix) {

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
};

vector.styleToObject = function (styleString) {

    let ret = {};

    utils.forEach(styleString.split(';'), function (style) {

        let pair = style.split('=');

        ret[utils.trim(pair[0])] = utils.trim(pair[1]);
    });

    return ret;
};


// exports
// -------

export default vector;
