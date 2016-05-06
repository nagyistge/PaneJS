import * as utils from '../common/utils';
import     vector from '../common/vector';
import      Point from '../geometry/Point';
import    Ellipse from '../geometry/Ellipse';
import   CellView from '../views/CellView';


class LinkView extends CellView {

    render() {

        this.vel.empty();
        this.renderMarkup();

        return this.update();
    }

    update() {
        return this
            .updateAttributes()
            .parseRouter()
            .parseConnection()
            .parseTerminal(true)
            .parseTerminal(false)
            .updateMarker()
            .updateConnector();
    }

    updateAttributes(attrs) {

        let that = this;

        utils.forIn(attrs || this.cell.attrs, function (attrMap, selector) {

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
            let normal = {};

            utils.forIn(attrMap, function (value, key) {
                if (!utils.contains(processed, key)) {
                    normal[key] = value;
                }
            });

            that.applyAttr(selector, normal);
        });

        return this;
    }

    parseRouter() {

        // convert vertices to router points

        let link  = this.cell;
        let cache = this.cache = {};
        let router   = link.getRouter();
        let vertices = utils.filter(link.vertices || [], function (p) {
            return Point.isPointLike(p);
        });

        vertices = utils.map(vertices, function (p) {
            return Point.fromPoint(p);
        });

        let parser = this.paper.getRouter(router.name);

        // parsed vertices
        cache.routerPoints = parser && utils.isFunction(parser)
            ? parser.call(this, vertices, router.options || {})
            : vertices;


        // fixed point
        cache.fixedSourcePoint = link.sourcePoint;
        cache.fixedTargetPoint = link.targetPoint;

        return this;
    }

    parseConnection() {

        let link  = this.cell;
        let cache = this.cache;

        let connector    = link.getConnector();
        let sourceMarker = link.getMarker(true);
        let targetMarker = link.getMarker(false);

        let connectorStrokeWidth    = this.getStrokeWidth(connector.selector);
        let sourceMarkerStrokeWidth = this.getStrokeWidth(sourceMarker.selector);
        let targetMarkerStrokeWidth = this.getStrokeWidth(targetMarker.selector);

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

        return this;
    }

    parseTerminal(isSource) {

        let link  = this.cell;
        let cache = this.cache;

        let node     = isSource ? link.sourceNode : link.targetNode;
        let filter   = isSource ? link.sourcePort : link.targetPort;
        let nodeView = this.paper.getView(node);

        if (nodeView) {
            if (isSource) {
                cache.sourceNodeView = nodeView;
            } else {
                cache.targetNodeView = nodeView;
            }
        }

        if (node && node.queryPort && filter) {

            let ports = node.queryPort(filter);
            let port  = ports && ports[0];

            if (port) {

                let portVel = nodeView.findOne(port.selector);

                if (isSource) {
                    cache.sourcePort    = port;
                    cache.sourcePortVel = portVel;
                } else {
                    cache.targetPort    = port;
                    cache.targetPortVel = portVel;
                }
            }
        }

        return this;
    }

    updateMarker() {

        return this
            .renderMarker(true)
            .renderMarker(false)
            .updateConnectionPoint(true)
            .updateConnectionPoint(false)
            .transformMarker(true)
            .transformMarker(false)
            .updateConnectionPointOnMarker(true)
            .updateConnectionPointOnMarker(false);
    }

    updateConnector() {

        let that        = this;
        let cache       = this.cache;
        let connector   = cache.connector;
        let connectorFn = this.paper.getConnector(connector.name);

        if (connectorFn && utils.isFunction(connectorFn)) {

            let sourcePoint = this.getLinkEndPoint(true);
            let targetPoint = this.getLinkEndPoint(false);

            if (sourcePoint && targetPoint) {
                let pathData = connectorFn.call(this,
                    sourcePoint,
                    targetPoint,
                    cache.routerPoints,
                    connector.options || {}
                );

                that.applyAttr(connector.selector, { d: pathData });
            }
        } else {
            throw new Error('Unknown connector: "' + connector.name + '"');
        }

        return this;
    }

    getStrokeWidth(selector) {

        let vel = this.findOne(selector);
        if (vel && vel.node) {

            let strokeWidth = utils.getComputedStyle(vel.node, 'stroke-width');

            return strokeWidth && utils.toFloat(strokeWidth) || 0;
        }

        return 0;
    }

    getTerminalBBox(isSource) {

        let cache = this.cache;
        let bbox  = isSource
            ? cache.sourceTerminalBBox
            : cache.targetTerminalBBox;

        if (!bbox) {

            let view = isSource
                ? cache.sourceNodeView
                : cache.targetNodeView;

            if (view) {
                bbox = view.getStrokeBBox();
                bbox = this.fixConnectionBBox(bbox, isSource);
            }

            // cache
            if (bbox) {
                if (isSource) {
                    cache.sourceTerminalBBox = bbox;
                } else {
                    cache.targetTerminalBBox = bbox;
                }
            }
        }

        return bbox;
    }

    getPortBodyBBox(isSource) {

        let cache = this.cache;
        let bbox  = isSource ? cache.sourcePortBBox : cache.targetPortBBox;

        if (!bbox) {

            let view = isSource ? cache.sourceNodeView : cache.targetNodeView;
            let vel  = isSource ? cache.sourcePortVel : cache.targetPortVel;

            if (view && vel) {

                let bodyVel = vel.findOne('.port-body');
                if (bodyVel) {
                    bbox = bodyVel.getBBox();
                    bbox = this.fixConnectionBBox(bbox, isSource);
                }
            }

            // cache
            if (bbox) {
                if (isSource) {
                    cache.sourcePortBBox = bbox;
                } else {
                    cache.targetPortBBox = bbox;
                }
            }
        }

        return bbox;
    }

    fixConnectionBBox(bbox, isSource) {

        if (bbox) {

            let cache  = this.cache;
            let marker = isSource ? cache.sourceMarker : cache.targetMarker;

            let markerStrokeWidth = marker && marker.options
                && marker.options.markerStrokeWidth;

            let renderedMarker = isSource
                ? cache.renderedSourceMarker
                : cache.renderedTargetMarker;

            if (renderedMarker && markerStrokeWidth) {

                let rad = renderedMarker.rad || 0;

                if (rad >= Math.PI / 4 || rad === 0) {
                    bbox.grow(markerStrokeWidth / 2);
                } else {
                    bbox.grow(markerStrokeWidth / Math.sin(rad) / 2);
                }
            }
        }

        return bbox;
    }

    renderMarker(isSource) {

        let cache    = this.cache;
        let marker   = isSource ? cache.sourceMarker : cache.targetMarker;
        let selector = marker.selector;
        let vMarker  = this.findOne(selector);

        let renderedMarker;

        if (marker && vMarker) {

            let renderer = this.paper.getMarker(marker.name);

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
                    attrs[selector] = this.cell.attrs[selector];
                    this.updateAttributes(attrs);

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

        return this;
    }

    getReferencePoint(bbox, isSource) {

        let cache = this.cache;

        // fixed point
        let reference = isSource
            ? cache.fixedTargetPoint
            : cache.fixedSourcePoint;

        // vertices
        if (!reference) {

            let vertices = cache.routerPoints;

            reference = isSource ? vertices[0] : vertices[vertices.length - 1];
        }

        // port
        if (!reference) {

            let portBBox = this.getPortBodyBBox(!isSource);
            if (portBBox) {
                reference = portBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
                reference = reference || portBBox.getCenter();
            }
        }

        // terminal
        if (!reference) {

            let terminalBBox = this.getTerminalBBox(!isSource);

            if (terminalBBox) {
                reference = terminalBBox.intersectionWithLineFromCenterToPoint(bbox.getCenter());
                reference = reference || terminalBBox.getCenter();
            }

        }

        return reference;
    }

    getPortBodyGeom(isSource) {

        let cache = this.cache;
        let vel   = isSource ? cache.sourcePortVel : cache.targetPortVel;
        let body  = vel && vel.findOne('.port-body');
        let elem  = body && body.node;

        if (elem) {

            let view   = isSource ? cache.sourceNodeView : cache.targetNodeView;
            let bbox   = body.getBBox(false, view.getPane());
            let center = bbox.getCenter();
            let result;

            if (utils.isNode(elem, 'circle')) {
                let r = utils.getComputedStyle(elem, 'r');

                r = utils.toFloat(r);

                if (r) {
                    result = new Ellipse(center.x, center.y, r, r);
                }
            } else if (utils.isNode(elem, 'ellipse')) {
                let rx = utils.getComputedStyle(elem, 'rx');
                let ry = utils.getComputedStyle(elem, 'ry');

                rx = utils.toFloat(rx);
                ry = utils.toFloat(ry);

                if (rx && ry) {
                    result = new Ellipse(center.x, center.y, rx, ry);
                }
            } else {
                result = bbox;
            }

            return this.fixConnectionBBox(result, isSource);
        }
    }

    updateConnectionPoint(isSource) {

        if (!this.updateConnectionPointOnPort(isSource)) {
            this.updateConnectionPointOnTerminal(isSource);
        }

        return this;
    }

    updateConnectionPointOnPort(isSource) {

        let cache = this.cache;
        let bbox  = this.getPortBodyBBox(isSource);
        let result;

        if (bbox) {

            let ref  = this.getReferencePoint(bbox, isSource);
            let geom = this.getPortBodyGeom(isSource) || bbox;

            if (ref) {
                result = geom.intersectionWithLineFromCenterToPoint(ref);
            }

            result = result || geom.getCenter();
        }

        if (isSource) {
            cache.sourcePointOnPort = result;
        } else {
            cache.targetPointOnPort = result;
        }

        return result;
    }

    updateConnectionPointOnTerminal(isSource) {

        // find the connection point on the terminal

        let point;
        let cache = this.cache;
        let bbox  = this.getTerminalBBox(isSource);

        if (bbox) {

            let reference = this.getReferencePoint(bbox, isSource);
            if (reference) {
                point = bbox.intersectionWithLineFromCenterToPoint(reference);
            }

            point = point || bbox.getCenter();
        }

        // cache the connection point on the terminal node
        if (isSource) {
            cache.sourcePointOnTerminal = point;
        } else {
            cache.targetPointOnTerminal = point;
        }

        return point;
    }

    getLinkEndPoint(isSource) {

        let cache = this.cache;

        if (isSource) {
            return cache.fixedSourcePoint
                || cache.sourcePointOnPort
                || cache.sourcePointOnTerminal;
        }

        return cache.fixedTargetPoint
            || cache.targetPointOnPort
            || cache.targetPointOnTerminal;
    }

    transformMarker(isSource, ref) {

        let cache = this.cache;

        let renderedMarker = isSource
            ? cache.renderedSourceMarker
            : cache.renderedTargetMarker;

        if (renderedMarker) {

            let pane        = this.getPane();
            let vertices    = cache.routerPoints;
            let sourcePoint = this.getLinkEndPoint(true);
            let targetPoint = this.getLinkEndPoint(false);

            let position  = isSource ? sourcePoint : targetPoint;
            let reference = ref || isSource
                ? (vertices[0] || targetPoint)
                : (vertices[vertices.length - 1] || sourcePoint);

            // make the marker at the right position
            let markerVel = isSource
                ? cache.sourceMarkerVel
                : cache.targetMarkerVel;

            if (position && reference) {
                markerVel.translateAndAutoOrient(position, reference, pane);
            }
        }

        return this;
    }

    updateConnectionPointOnMarker(isSource) {

        let cache = this.cache;

        let connectionPoint;

        let renderedMarker = isSource
            ? cache.renderedSourceMarker
            : cache.renderedTargetMarker;

        if (renderedMarker) {

            let pane  = this.getPane();
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

        return this;
    }
}


// exports
// -------

export default LinkView;
