import * as utils from '../common/utils';
import vector   from '../common/vector';
import Point    from '../geometry/Point';
import CellView from './CellView';
import normalConnector from '../shapes/connectors/normal';

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
            .updateConnection();
    }

    updateAttributes() {

        var that = this;

        utils.forIn(that.cell.attrs, function (attrs, selector) {

            var processed = [];

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
            let finalAttributes = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(processed, key)) {
                    finalAttributes[key] = value;
                }
            });

            that.applyAttrs(selector, finalAttributes);
        });

        return that;
    }

    updateConnection() {

        let that   = this;
        let points = that.cell.points;

        //that.applyAttrs('.connection', {d: normalConnector(points[0], points[1])});

        return that;
    }

    parseRoute() {

    }
}


// exports
// -------

export default LinkView;
