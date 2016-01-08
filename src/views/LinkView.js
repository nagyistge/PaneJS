import * as utils from '../common/utils';
import vector     from '../common/vector';
// import Line       from '../geometry/Line';
import Point      from '../geometry/Point';
import CellView   from './CellView';

class LinkView extends CellView {

    render() {

        let that = this;
        let vel = that.vel;

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

            // remove processed special attributes from attrs
            let surplus = {};

            utils.forIn(attrMap, function (value, key) {
                if (!utils.contains(processed, key)) {
                    surplus[key] = value;
                }
            });

            that.applyAttrs(selector, surplus);
        });

        return that;
    }

    parseRouter() {

        let that = this;
        let link = that.cell;
        let router = link.getRouter();
        let vertices = link.vertices || [];

        let parser = that.paper.getRouter(router.name);

        link.routerPoints = parser && utils.isFunction(parser)
            ? parser.call(that, vertices, router.options || {})
            : vertices;

        return that;
    }

    parseConnection() {

        let that = this;
        let link = that.cell;

        that.connector = link.getConnector();
        that.sourceMarker = link.getMarker(true);
        that.targetMarker = link.getMarker(false);

        that.connectorStrokeWidth = that.getStrokeWidth(that.connector.selector);
        that.sourceMarkerStrokeWidth = that.getStrokeWidth(that.sourceMarker.selector);
        that.targetMarkerStrokeWidth = that.getStrokeWidth(that.targetMarker.selector);


        let options = that.sourceMarker.options;

        options.connectorStrokeWidth = that.connectorStrokeWidth;
        options.markerStrokeWidth = that.sourceMarkerStrokeWidth;

        options = that.targetMarker.options;
        options.connectorStrokeWidth = that.connectorStrokeWidth;
        options.markerStrokeWidth = that.targetMarkerStrokeWidth;

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

        let that = this;
        let link = that.cell;
        let connector = that.connector;
        let connectorFn = that.paper.getConnector(connector.name);

        if (connectorFn && utils.isFunction(connectorFn)) {

            let pathData = connectorFn.call(that,
                link.sourcePoint,
                link.targetPoint,
                link.routerPoints,
                connector.options || {}
            );

            that.applyAttrs(connector.selector, { d: pathData });

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
        let terminalView = that.paper.getTerminalView(that.cell, isSource);

        if (terminalView) {

            let bbox = terminalView.getStrokeBBox();
            let markerStrokeWidth = isSource
                ? that.sourceMarkerStrokeWidth
                : that.targetMarkerStrokeWidth;
            let renderedMarker = isSource
                ? that.renderedSourceMarker
                : that.renderedTargetMarker;

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

    updateConnectionPointOnTerminal(isSource) {

        // find the connection point on the terminal

        let that = this;
        let link = that.cell;
        let terminalOuterBox = that.getTerminalOuterBox(isSource);
        let connectionPoint;

        if (terminalOuterBox) {

            let vertices = link.routerPoints;
            let reference = isSource ? vertices[0] : vertices[vertices.length - 1];

            if (!reference) {

                let referenceOuterBox = that.getTerminalOuterBox(!isSource);

                if (referenceOuterBox) {

                    reference = referenceOuterBox.intersectionWithLineFromCenterToPoint(terminalOuterBox.getCenter());
                    reference = reference || terminalOuterBox.getCenter();
                }
            }

            if (!reference) {
                reference = isSource ? link.targetPoint : link.sourcePoint;
            }

            if (reference) {
                connectionPoint = terminalOuterBox.intersectionWithLineFromCenterToPoint(reference);
            }

            connectionPoint = connectionPoint || terminalOuterBox.getCenter();

            if (isSource) {
                link.sourcePoint = connectionPoint;
            } else {
                link.targetPoint = connectionPoint;
            }

            link[isSource ? 'sourcePoint' : 'targetPoint'] = connectionPoint;
        }

        return that;
    }

    renderMarker(isSource) {

        let that = this;
        let marker = isSource ? that.sourceMarker : that.targetMarker;
        let selector = marker.selector;
        let vMarker = that.findOne(selector);

        if (marker && vMarker) {

            let renderer = that.paper.getMarker(marker.name);

            if (renderer && utils.isFunction(renderer)) {

                let result = renderer(vMarker, marker.options);
                let replacedVel = result.vel;

                if (replacedVel) {

                    let elem = vMarker.node;
                    let parent = elem.parentNode;

                    parent.insertBefore(replacedVel.node, elem);
                    parent.removeChild(elem);

                    let className = selector;
                    if (className[0] === '.') {
                        className = className.substr(1);
                    }

                    replacedVel.addClass(className);

                    let attrs = {};
                    attrs[selector] = that.cell.attrs[selector];
                    that.updateAttributes(attrs);

                    vMarker = replacedVel;

                }

                if (isSource) {
                    that.renderedSourceMarker = result;
                } else {
                    that.renderedTargetMarker = result;
                }
            }

            // cache the marker vector element
            if (isSource) {
                that.sourceMarkerVel = vMarker;
            } else {
                that.targetMarkerVel = vMarker;
            }
        }

        return that;
    }

    transformMarker(isSource) {

        let that = this;
        let renderedMarker = isSource
            ? that.renderedSourceMarker
            : that.renderedTargetMarker;

        if (renderedMarker) {

            let link = that.cell;
            let drawPane = that.paper.drawPane;
            let sourcePoint = link.sourcePoint;
            let targetPoint = link.targetPoint;
            let routerPoints = link.routerPoints;

            let startPoint = isSource ? sourcePoint : targetPoint;
            let endPoint = isSource
                ? (routerPoints[0] || targetPoint)
                : (routerPoints[routerPoints.length - 1] || sourcePoint);

            // make the marker at the right position
            let vMarker = isSource ? that.sourceMarkerVel : that.targetMarkerVel;
            vMarker.translateAndAutoOrient(startPoint, endPoint, drawPane);
        }

        return that;
    }

    updateConnectionPointOnMarker(isSource) {

        let that = this;
        let renderedMarker = isSource
            ? that.renderedSourceMarker
            : that.renderedTargetMarker;

        if (renderedMarker) {

            let link = that.cell;
            let vMarker = isSource ? that.sourceMarkerVel : that.targetMarkerVel;
            let drawPane = that.paper.drawPane;

            let connectionPoint = renderedMarker.point;
            let p = vector.createSVGPoint(connectionPoint.x, connectionPoint.y);
            p = p.matrixTransform(vMarker.node.getTransformToElement(drawPane));

            let newConnectionPoint = Point.fromPoint(p);

            if (isSource) {
                link.sourcePoint = newConnectionPoint;
            } else {
                link.targetPoint = newConnectionPoint;
            }
        }

        return that;
    }
}


// exports
// -------

export default LinkView;
