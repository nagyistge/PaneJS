import * as utils from '../common/utils';
import     vector from '../common/vector';
import      Point from '../geometry/Point';
import   CellView from '../views/CellView';


class LinkView extends CellView {

    render() {

        let that = this;
        let vel  = that.vel;

        vel.empty();

        that.renderMarkup();

        return that.update();
    }

    update() {
        return this
            .updateAttributes()
            .parseRouter()
            .parseConnection()
            .updateMarker()
            .updateConnector();
    }

    updateAttributes(attrs) {

        let that = this;

        utils.forIn(attrs || that.cell.attrs, function (attrMap, selector) {

            let processed = [];

            if (utils.isObject(attrMap.fill)) {

                that.applyGradient(selector, 'fill', attrMap.fill);
                processed.push('fill');
            }

            if (utils.isObject(attrMap.stroke)) {

                that.applyGradient(selector, 'stroke', attrMap.stroke);
                processed.push('stroke');
            }

            if (utils.isObject(attrMap.filter)) {

                that.applyFilter(selector, attrMap.filter);
                processed.push('filter');
            }

            // remove processed attributes from attrs
            let surplus = {};

            utils.forIn(attrMap, function (value, key) {
                if (!utils.contains(processed, key)) {
                    surplus[key] = value;
                }
            });

            that.applyAttr(selector, surplus);
        });

        return that;
    }

    parseRouter() {

        // convert vertices to router points

        let that   = this;
        let link   = that.cell;
        let router = link.getRouter();
        let cache  = that.cache = {};
        let vertices = utils.filter(link.vertices || [], function (p) {
            return Point.isPointLike(p);
        });

        vertices = utils.map(vertices, function (p) {
            return Point.fromPoint(p);
        });

        let parser = that.paper.getRouter(router.name);

        // parsed vertices
        cache.routerPoints = parser && utils.isFunction(parser)
            ? parser.call(that, vertices, router.options || {})
            : vertices;


        // fixed point
        cache.fixedSourcePoint = link.sourcePoint;
        cache.fixedTargetPoint = link.targetPoint;

        return that;
    }

    parseConnection() {

        let that  = this;
        let link  = that.cell;
        let cache = that.cache;

        let connector    = link.getConnector();
        let sourceMarker = link.getMarker(true);
        let targetMarker = link.getMarker(false);

        let connectorStrokeWidth    = that.getStrokeWidth(connector.selector);
        let sourceMarkerStrokeWidth = that.getStrokeWidth(sourceMarker.selector);
        let targetMarkerStrokeWidth = that.getStrokeWidth(targetMarker.selector);

        // update stroke width to marker options
        let sourceMarkerOptions = sourceMarker.options;
        if (!sourceMarkerOptions) {
            sourceMarkerOptions = sourceMarker.options = {};
        }

        sourceMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
        sourceMarkerOptions.markerStrokeWidth    = sourceMarkerStrokeWidth;

        let targetMarkerOptions = targetMarker.options;
        if (!targetMarkerOptions) {
            targetMarkerOptions = targetMarker.options = {};
        }

        targetMarkerOptions.connectorStrokeWidth = connectorStrokeWidth;
        targetMarkerOptions.markerStrokeWidth    = targetMarkerStrokeWidth;


        // cache
        cache.connector    = connector;
        cache.sourceMarker = sourceMarker;
        cache.targetMarker = targetMarker;

        return that;
    }

    updateMarker() {

        return this
            .renderMarker(true)
            .renderMarker(false)
            .updateConnectionPointOnTerminal(true)
            .updateConnectionPointOnTerminal(false)
            .transformMarker(true)
            .transformMarker(false)
            .updateConnectionPointOnMarker(true)
            .updateConnectionPointOnMarker(false);
    }

    updateConnector() {

        let that        = this;
        let cache       = that.cache;
        let connector   = cache.connector;
        let connectorFn = that.paper.getConnector(connector.name);

        if (connectorFn && utils.isFunction(connectorFn)) {

            let pathData = connectorFn.call(that,
                cache.sourcePointOnMarker || cache.sourcePointOnTerminal,
                cache.targetPointOnMarker || cache.targetPointOnTerminal,
                cache.routerPoints,
                connector.options || {}
            );

            that.applyAttr(connector.selector, { d: pathData });

        } else {
            throw new Error('Unknown connector: "' + connector.name + '"');
        }

        return that;
    }

    getStrokeWidth(selector) {

        let vel = this.findOne(selector);

        if (vel && vel.node) {

            let sw = utils.getComputedStyle(vel.node, 'stroke-width');

            return sw && utils.toFloat(sw) || 0;
        }

        return 0;
    }

    getTerminalOuterBox(isSource) {

        let that = this;
        let view = that.paper.getTerminalView(that.cell, isSource);

        if (view) {

            let bbox  = view.getStrokeBBox();
            let cache = that.cache;

            let markerStrokeWidth = isSource
                ? cache.sourceMarkerStrokeWidth
                : cache.targetMarkerStrokeWidth;
            let renderedMarker    = isSource
                ? cache.renderedSourceMarker
                : cache.renderedTargetMarker;

            if (renderedMarker && markerStrokeWidth) {

                let rad = renderedMarker.rad || 0;

                if (rad >= Math.PI / 4 || rad === 0) {
                    bbox.grow(markerStrokeWidth / 2);
                } else {
                    bbox.grow(markerStrokeWidth / Math.cos(rad));
                }
            }

            return bbox;
        }
    }

    renderMarker(isSource) {

        let that     = this;
        let cache    = that.cache;
        let marker   = isSource ? cache.sourceMarker : cache.targetMarker;
        let selector = marker.selector;
        let vMarker  = that.findOne(selector);

        let renderedMarker;

        if (marker && vMarker) {

            let renderer = that.paper.getMarker(marker.name);

            if (renderer && utils.isFunction(renderer)) {

                renderedMarker = renderer(vMarker, marker.options);

                let newVel = renderedMarker.vel;
                if (newVel) {

                    let elem   = vMarker.node;
                    let parent = elem.parentNode;

                    parent.insertBefore(newVel.node, elem);
                    parent.removeChild(elem);

                    let className = selector;
                    if (className[0] === '.') {
                        className = className.substr(1);
                    }

                    newVel.addClass(className);

                    let attrs       = {};
                    attrs[selector] = that.cell.attrs[selector];
                    that.updateAttributes(attrs);

                    vMarker = newVel;
                }
            }

            // cache the marker vector element
            if (isSource) {
                cache.renderedSourceMarker = renderedMarker;
                cache.sourceMarkerVel      = vMarker;
            } else {
                cache.renderedTargetMarker = renderedMarker;
                cache.targetMarkerVel      = vMarker;
            }
        }

        return that;
    }

    updateConnectionPointOnTerminal(isSource) {

        // find the connection point on the terminal

        let that  = this;
        let cache = that.cache;

        let terminalOuterBox = that.getTerminalOuterBox(isSource);
        let connectionPoint;

        if (terminalOuterBox) {

            let reference = isSource
                ? cache.fixedTargetPoint
                : cache.fixedSourcePoint;

            if (!reference) {

                let vertices = cache.routerPoints;

                reference = isSource ? vertices[0] : vertices[vertices.length - 1];
            }

            if (!reference) {

                let referenceOuterBox = that.getTerminalOuterBox(!isSource);

                if (referenceOuterBox) {

                    reference = referenceOuterBox.intersectionWithLineFromCenterToPoint(terminalOuterBox.getCenter());
                    reference = reference || terminalOuterBox.getCenter();
                }
            }

            if (reference) {
                connectionPoint = terminalOuterBox.intersectionWithLineFromCenterToPoint(reference);
            }

            connectionPoint = connectionPoint || terminalOuterBox.getCenter();
        }

        // cache the connection point on the terminal node
        if (isSource) {
            cache.sourcePointOnTerminal = connectionPoint;
        } else {
            cache.targetPointOnTerminal = connectionPoint;
        }

        return that;
    }

    transformMarker(isSource, ref) {

        let that  = this;
        let cache = that.cache;

        let renderedMarker = isSource
            ? cache.renderedSourceMarker
            : cache.renderedTargetMarker;

        if (renderedMarker) {

            let pane        = that.getPane();
            let vertices    = cache.routerPoints;
            let sourcePoint = cache.sourcePointOnTerminal || cache.fixedSourcePoint;
            let targetPoint = cache.targetPointOnTerminal || cache.fixedTargetPoint;

            let position  = isSource ? sourcePoint : targetPoint;
            let reference = ref || isSource
                ? (vertices[0] || targetPoint)
                : (vertices[vertices.length - 1] || sourcePoint);

            // make the marker at the right position
            let markerVel = isSource
                ? cache.sourceMarkerVel
                : cache.targetMarkerVel;

            markerVel.translateAndAutoOrient(position, reference, pane);
        }

        return that;
    }

    updateConnectionPointOnMarker(isSource) {

        let that  = this;
        let cache = that.cache;

        let renderedMarker = isSource
            ? cache.renderedSourceMarker
            : cache.renderedTargetMarker;
        let connectionPoint;

        if (renderedMarker) {

            let pane  = that.getPane();
            let point = renderedMarker.point;

            let markerVel = isSource
                ? cache.sourceMarkerVel
                : cache.targetMarkerVel;

            let p = vector.createSVGPoint(point.x, point.y);
            p     = p.matrixTransform(markerVel.getTransformToElement(pane));

            connectionPoint = Point.fromPoint(p);
        }

        if (isSource) {
            cache.sourcePointOnMarker = connectionPoint;
        } else {
            cache.targetPointOnMarker = connectionPoint;
        }

        return that;
    }
}


// exports
// -------

export default LinkView;
