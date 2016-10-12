import * as utils from '../common/utils';
import vector     from '../common/vector';
import Point      from '../geometry/Point';
import VectorView from '../views/VectorView';


class LinkView extends VectorView {

    render() {

        this.vel.empty();

        this.renderMarkup()
            .update();

        return this;
    }

    update() {

        this.cache = {};

        return this
            .parseConnector()
            .parseTerminal(true)
            .parseTerminal(false)
            .updateMarker()
            .updateConnector()
            .updateComment();
    }

    parseConnector() {

        let link         = this.cell;
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
        this.cacheConnector(connector);
        this.cacheMarker(sourceMarker, true);
        this.cacheMarker(targetMarker, false);

        return this;
    }

    parseTerminal(isSource) {

        let link  = this.cell;
        let point = link.getTerminalPoint(isSource);
        let port  = link.getTerminalPort(isSource);
        let node  = link.getTerminalNode(isSource);
        let view  = node && this.paper.getView(node);

        this.cacheStaticConnPoint(point, isSource);
        this.cacheTerminalView(view, isSource);
        this.cacheTerminalPort(port, isSource);

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

        let connector = this.fetchConnector();

        let parser = connector.parse && utils.isFunction(connector.parse)
            ? connector.parse
            : connector.name && this.paper.getConnector(connector.name);

        if (parser && utils.isFunction(parser)) {

            let sourcePoint = this.getConnectionPoint(true);
            let targetPoint = this.getConnectionPoint(false);
            if (sourcePoint && targetPoint) {

                let pathData = parser.call(this, sourcePoint, targetPoint);

                this.applyAttr('.connector-wrap', { d: pathData });
                this.applyAttr(connector.selector, { d: pathData });
            } else {
                this.vel.empty();
            }
        } else {
            throw new Error('Unknown connector: "' + connector.name + '"');
        }

        return this;
    }

    updateComment(comment) {

        let data  = this.cell.data;
        let bbox  = this.vel.getBBox(true);
        let vBg   = this.vel.findOne('.comment-bg');
        let vText = this.vel.findOne('.comment');


        if (utils.isUndefined(comment)) {
            comment = data ? data.comment : '';
        } else {
            if (data) {
                data.comment = comment;
            }
        }

        if (vBg && vText) {

            if (comment) {

                vText.text(comment);

                // Remove the previous translate() from the transform attribute
                // and translate the element relative to the bounding box following
                // the `ref-x` and `ref-y` attributes.
                let transformAttr = vText.attr('transform');
                if (transformAttr) {
                    vText.attr('transform', utils.clearTranslate(transformAttr));
                }

                let velBBox = vText.getBBox(true);

                let tx = bbox.x + bbox.width * 0.5;
                let ty = bbox.y + bbox.height * 0.5;

                tx -= velBBox.width / 2;
                ty -= velBBox.height / 2;

                tx = utils.toFixed(tx, 2);
                ty = utils.toFixed(ty, 2);

                vText.translate(tx, ty);
                vBg.attr({
                    width: velBBox.width + 10,
                    height: velBBox.height + 10
                });

                vBg.translate(tx - 5, ty - 5);

            } else {
                vBg.attr({
                    width: '',
                    height: '',
                    transform: ''
                });

                vText.attr({
                    y: '',
                    transform: ''
                });

                vText.empty();
            }
        }

        return this;
    }

    renderMarker(isSource) {

        let marker  = this.fetchMarker(isSource);
        let vMarker = this.findOne(marker.selector);

        if (marker && vMarker) {

            let parser = marker.parse && utils.isFunction(marker.parse)
                ? marker.parse
                : marker.name && this.paper.getMarker(marker.name);

            if (parser && utils.isFunction(parser)) {

                let renderedMarker = parser(vMarker, marker.options);

                // if return a new marker element, replace the old one
                let newVel = renderedMarker.vel;
                if (newVel) {

                    // replace
                    let elem      = vMarker.node;
                    let parent    = elem.parentNode;
                    let className = vMarker.getClassName();

                    parent.insertBefore(newVel.node, elem);
                    parent.removeChild(elem);
                    newVel.addClass(className);

                    vMarker = newVel;
                }

                this.cacheMarkerVel(vMarker, isSource);
                this.cacheRenderedMarker(renderedMarker, isSource);
            }
        }

        return this;
    }

    updateConnectionPoint(isSource) {

        let staticPoint = this.fetchStaticConnPoint(isSource);
        if (!staticPoint) {
            this.updateConnPointOnPort(isSource) ||
            this.updateConnPointOnNode(isSource);
        }

        return this;
    }

    updateConnPointOnPort(isSource) {

        let rect = this.getPortBodyBBox(isSource);
        if (rect) {
            let point = new Point(rect.getCenter().x, isSource ? rect.y + rect.height : rect.y);
            this.cacheConnPointOnPort(point, isSource);
        }

        return this.fetchConnPointOnPort(isSource);
    }

    updateConnPointOnNode(isSource) {

        let point = null;
        let bbox  = this.getTerminalBBox(isSource);
        if (bbox) {

            let reference = this.getReferencePoint(bbox, isSource);
            if (reference) {
                point = bbox.intersectionWithLineFromCenterToPoint(reference);
            }

            point = point || bbox.getCenter();

            this.cacheConnPointOnNode(point, isSource);
        }

        return this.fetchConnPointOnNode(isSource);
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

        let bbox = this.fetchTerminalBBox(isSource);
        if (!bbox) {

            let view = this.fetchTerminalView(isSource);
            if (view) {
                bbox = view.getStrokedBBox();
                bbox = this.fixStrokedBBox(bbox, isSource);
            }

            // cache
            this.cacheTerminalBBox(bbox, isSource);
        }

        return bbox;
    }

    fixStrokedBBox(bbox, isSource) {

        if (bbox) {

            let marker         = this.fetchMarker(isSource);
            let renderedMarker = this.fetchRenderedMarker(isSource);

            if (marker && renderedMarker) {

                let markerStrokeWidth = marker.options.markerStrokeWidth;
                if (markerStrokeWidth) {

                    let rad = renderedMarker.rad || 0;
                    if (rad >= Math.PI / 4 || rad === 0) {
                        bbox.grow(markerStrokeWidth / 2);
                    } else {
                        bbox.grow(markerStrokeWidth / Math.sin(rad) / 2);
                    }
                }
            }
        }

        return bbox;
    }

    getReferencePoint(bbox, isSource) {

        // static point
        let reference = this.fetchStaticConnPoint(isSource);

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

    getPortBodyBBox(isSource) {

        let bbox = this.fetchPortBodyBBox(isSource);
        if (!bbox) {

            let view = this.fetchTerminalView(isSource);
            let port = this.fetchTerminalPort(isSource);
            if (view && port) {

                if (view.getPortBodyBBox) {
                    bbox = view.getPortBodyBBox(port, !isSource);
                }

                if (bbox) {
                    bbox = this.fixStrokedBBox(bbox, isSource);
                    this.cachePortBodyBBox(bbox, isSource);
                }
            }
        }

        return bbox;
    }

    getConnectionPoint(isSource) {

        let point = this.fetchConnPointOnMarker(isSource)
            || this.fetchStaticConnPoint(isSource)
            || this.fetchConnPointOnPort(isSource)
            || this.fetchConnPointOnNode(isSource);

        return point;
    }

    transformMarker(isSource) {

        let renderedMarker = this.fetchRenderedMarker(isSource);
        if (renderedMarker) {

            let pane = this.getPane();

            let markerVel = this.fetchMarkerVel(isSource);
            let position  = this.getConnectionPoint(isSource);
            let reference = new Point(position.x, position.y + (isSource ? 50 : -50));

            if (position && reference && markerVel) {
                markerVel.translateAndAutoOrient(position, reference, pane);
            }
        }

        return this;
    }

    updateConnectionPointOnMarker(isSource) {

        let markerVel      = this.fetchMarkerVel(isSource);
        let renderedMarker = this.fetchRenderedMarker(isSource);

        if (markerVel && renderedMarker) {

            let pane  = this.getPane();
            let point = renderedMarker.point;

            let p = vector.createSVGPoint(point.x, point.y);

            p = p.matrixTransform(markerVel.getTransformToElement(pane));

            let connectionPoint = Point.fromPoint(p);

            this.cacheConnPointOnMarker(connectionPoint, isSource);
        }

        return this;
    }


    // cache
    // -----

    cacheConnector(connector) {

        this.cache.connector = connector;
    }

    fetchConnector() {

        return this.cache.connector;
    }

    cacheMarker(marker, isSource) {

        if (isSource) {
            this.cache.sourceMarker = marker;
        } else {
            this.cache.targetMarker = marker;
        }
    }

    fetchMarker(isSource) {

        return isSource ? this.cache.sourceMarker : this.cache.targetMarker;
    }

    cacheRenderedMarker(renderedMarker, isSource) {

        if (renderedMarker) {
            if (isSource) {
                this.cache.renderedSourceMarker = renderedMarker;
            } else {
                this.cache.renderedTargetMarker = renderedMarker;
            }
        }
    }

    fetchRenderedMarker(isSource) {

        return isSource ? this.cache.renderedSourceMarker : this.cache.renderedTargetMarker;
    }

    cacheMarkerVel(vel, isSource) {

        if (vel) {
            if (isSource) {
                this.cache.sourceMarkerVel = vel;
            } else {
                this.cache.targetMarkerVel = vel;
            }
        }
    }

    fetchMarkerVel(isSource) {

        return isSource ? this.cache.sourceMarkerVel : this.cache.targetMarkerVel;
    }

    cacheTerminalView(view, isSource) {

        if (view) {
            if (isSource) {
                this.cache.sourceView = view;
            } else {
                this.cache.targetView = view;
            }
        }
    }

    fetchTerminalView(isSource) {

        return isSource ? this.cache.sourceView : this.cache.targetView;
    }

    cacheTerminalPort(port, isSource) {

        if (!utils.isNil(port)) {
            if (isSource) {
                this.cache.sourcePort = port;
            } else {
                this.cache.targetPort = port;
            }
        }
    }

    fetchTerminalPort(isSource) {

        return isSource ? this.cache.sourcePort : this.cache.targetPort;
    }

    cacheStaticConnPoint(point, isSource) {

        if (point) {
            if (isSource) {
                this.cache.staticSourcePoint = point;
            } else {
                this.cache.staticTargetPoint = point;
            }
        }
    }

    fetchStaticConnPoint(isSource) {

        return isSource ? this.cache.staticSourcePoint : this.cache.staticTargetPoint;
    }

    cacheConnPointOnMarker(point, isSource) {

        if (point) {
            if (isSource) {
                this.cache.sourcePointOnMarker = point;
            } else {
                this.cache.targetPointOnMarker = point;
            }
        }
    }

    fetchConnPointOnMarker(isSource) {

        return isSource ? this.cache.sourcePointOnMarker : this.cache.targetPointOnMarker;
    }

    cacheConnPointOnPort(point, isSource) {

        if (point) {
            if (isSource) {
                this.cache.sourcePointOnPort = point;
            } else {
                this.cache.targetPointOnPort = point;
            }
        }
    }

    fetchConnPointOnPort(isSource) {

        return isSource ? this.cache.sourcePointOnPort : this.cache.targetPointOnPort;
    }

    cacheConnPointOnNode(point, isSource) {

        if (point) {
            if (isSource) {
                this.cache.sourcePointOnTerminal = point;
            } else {
                this.cache.targetPointOnTerminal = point;
            }
        }
    }

    fetchConnPointOnNode(isSource) {

        return isSource ? this.cache.sourcePointOnTerminal : this.cache.targetPointOnTerminal;
    }

    cacheTerminalBBox(bbox, isSource) {

        if (bbox) {
            if (isSource) {
                this.cache.sourceTerminalBBox = bbox;
            } else {
                this.cache.targetTerminalBBox = bbox;
            }
        }
    }

    fetchTerminalBBox(isSource) {

        return isSource ? this.cache.sourceTerminalBBox : this.cache.targetTerminalBBox;
    }

    cachePortBodyBBox(bbox, isSource) {

        if (bbox) {
            if (isSource) {
                this.cache.sourcePortBBox = bbox;
            } else {
                this.cache.targetPortBBox = bbox;
            }
        }
    }

    fetchPortBodyBBox(isSource) {

        return isSource ? this.cache.sourcePortBBox : this.cache.targetPortBBox;
    }
}


// exports
// -------

export default LinkView;
