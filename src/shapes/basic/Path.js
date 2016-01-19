import * as utils from '../../common/utils';
import Node       from '../../cells/Node';


class Path extends Node {

    constructor(options) {

        super(options);

        this.parsePathData();
    }

    parsePathData() {

        // parse path data

        let pathData = this.getPathData() || '';
        let operators = pathData.match(/([A-Za-z])/g);

        pathData = pathData
            .replace(/^[A-Za-z]/, '')
            .replace(/[A-Za-z]$/, '');

        let groups = utils.split(pathData, /[A-Za-z]/);

        groups = utils.map(groups, function (group) {

            group = utils.trim(group);

            let xys = utils.split(group, /[\s,]+/);
            let points = [];

            for (let i = 0, l = xys.length; i < l; i += 2) {
                points.push({
                    x: utils.toFloat(xys[i]),
                    y: utils.toFloat(xys[i + 1])
                });
            }

            return points;
        });

        let points = utils.reduce(groups, function (previous, group) {
            return previous.concat(group);
        }, []);

        let minX = points[0].x;
        let minY = points[0].y;
        utils.forEach(points, function (point) {
            minX = Math.min(point.x, minX);
            minY = Math.min(point.y, minY);
        });

        let formatted = [];
        utils.forEach(groups, function (group, index) {

            if (operators[index]) {
                formatted.push(operators[index]);
            }

            utils.forEach(group, function (point) {

                let x = utils.toFixed(point.x - minX, 2);
                let y = utils.toFixed(point.y - minY, 2);

                formatted.push(x, y);
            });
        });

        if (operators[groups.length]) {
            formatted.push(operators[groups.length]);
        }

        let d = formatted.join(' ');
        let attrs = this.metadata.attrs;

        if (attrs.path) {
            attrs.path.d = d;
        } else {
            attrs.path = { d };
        }
    }

    getPathData() {

        let metadata = this.metadata;
        let attrs = metadata.attrs;
        let pathAttr = attrs && attrs.path;
        let pathData = pathAttr && pathAttr.d;

        if (!pathData) {

            let regPath = /<path(?:.+)d=(["|'])(.*?)\1/;
            let markup = metadata.markup || '';
            let match = markup.match(regPath);

            if (match) {
                pathData = match[2];
            }
        }

        return pathData;
    }
}

Path.setDefaults({

    markup: '<g class="pane-rotatable"><g class="pane-scalable"><path/></g><text/></g>',

    size: {
        width: 60,
        height: 60
    },

    attrs: {
        '.': {
            'fill': '#ffffff',
            'stroke': 'none'
        },
        'path': {
            'fill': '#ffffff',
            'stroke': '#000000'
        },
        'text': {
            'font-size': 14,
            'text': '',
            'text-anchor': 'middle',
            'ref': 'path',
            'ref-x': .5,
            'ref-dy': 10,
            'fill': '#000000',
            'font-family': 'Arial, helvetica, sans-serif'
        }
    }
});


export default Path;
