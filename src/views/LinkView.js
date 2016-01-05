import * as utils from '../common/utils';
import vector     from '../common/vector';
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
            .updateMarker(true)
            .updateMarker(false)
            .updateConnection();
    }

    updateAttributes() {

        let that = this;

        utils.forIn(that.cell.attrs, function (attrs, selector) {

            let processed = [];

            if (utils.isObject(attrs.fill)) {

                that.applyGradient(selector, 'fill', attrs.fill);
                processed.push('fill');
            }

            if (utils.isObject(attrs.stroke)) {

                that.applyGradient(selector, 'stroke', attrs.stroke);
                processed.push('stroke');
            }

            if (utils.isObject(attrs.filter)) {

                that.applyFilter(selector, attrs.filter);
                processed.push('filter');
            }

            // remove processed special attributes from attrs
            let surplus = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(processed, key)) {
                    surplus[key] = value;
                }
            });

            that.applyAttrs(selector, surplus);
        });

        return that;
    }

    updateConnection() {

        let that = this;
        let link = that.cell;
        let connector = link.connector;
        let connectorName;
        let connectorOptions;

        if (utils.isObject(connector)) {
            connectorName = connector.name;
            connectorOptions = connector.options;
        } else {
            connectorName = connector;
        }


        let connectorFn = that.paper.getConnector(connectorName);

        if (connectorFn && utils.isFunction(connectorFn)) {

            let routerPoints = link.routerPoints;
            let sourcePoint = link.sourcePoint;
            let targetPoint = link.targetPoint;

            let pathData = connectorFn(sourcePoint, targetPoint, routerPoints, connectorOptions || {});

            that.applyAttrs('.connection', { d: pathData });

        } else {
            throw new Error('Unknown connector: "' + connectorName + '"');
        }

        return that;
    }

    updateMarker(isSource) {

        let that = this;
        let link = that.cell;
        let marker = isSource ? link.sourceMarker : link.targetMarker;
        let vMarker = that.findOne(isSource ? '.source-marker' : '.target-marker');
        let connectionPoint = that.applyMarker(vMarker, marker);

        if (connectionPoint) {

            let drawPane = that.paper.drawPane;
            let sourcePoint = link.sourcePoint;
            let targetPoint = link.targetPoint;
            let routerPoints = link.routerPoints;

            let position = isSource ? sourcePoint : targetPoint;
            let reference = isSource
                ? (routerPoints[0] || targetPoint)
                : (routerPoints[routerPoints.length - 1] || sourcePoint);

            // make the marker at the right position
            vMarker.translateAndAutoOrient(position, reference, drawPane);

            // update the connection point on the marker
            if (connectionPoint !== true) {

                let p = vector.createSVGPoint(connectionPoint.x, connectionPoint.y);
                p = p.matrixTransform(vMarker.node.getTransformToElement(drawPane));

                let newPoint = Point.fromPoint(p);

                if (isSource) {
                    link.sourcePoint = newPoint;
                } else {
                    link.targetPoint = newPoint;
                }
            }
        }

        return that;
    }

    applyMarker(vMarker, marker) {

        if (marker && vMarker) {

            let that = this;
            let markerName;
            let markerOption;

            if (utils.isObject(marker)) {
                markerName = marker.name || '';
                markerOption = marker.options;
            } else {
                markerName = '' + marker;
            }

            let markerFn = that.paper.getMarker(markerName);

            if (markerFn && utils.isFunction(markerFn)) {
                return markerFn(vMarker, markerOption || {});
            }
        }
    }
}


// exports
// -------

export default LinkView;
