import * as utils from '../common/utils';
import vector   from '../common/vector';
import Point    from '../geometry/Point';
import CellView from './CellView';

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
