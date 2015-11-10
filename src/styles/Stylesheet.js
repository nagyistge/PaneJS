import { extend }       from '../common/utils'
import Base             from '../lib/Base';
import defaultLinkStyle from './defaultLinkStyle';
import defaultNodeStyle from './defaultNodeStyle';
import defaultStyle     from './defaultStyle';
import perimeter        from '../shapes/perimeter';

export default Base.extend({

    constructor: function Stylesheet() {
        var that = this;

        that.styles = {};
        var common = defaultStyle.common;
        var nodeStyle = defaultStyle.node;
        var linkStyle = defaultStyle.link;

        nodeStyle.label = extend({}, common.label, nodeStyle.label);
        linkStyle.label = extend({}, common.label, linkStyle.label);

        nodeStyle.perimeter = perimeter.RectanglePerimeter;

        that.setDefaultNodeStyle(extend({}, common, nodeStyle));
        that.setDefaultLinkStyle(extend({}, common, linkStyle));
    },

    getDefaultNodeStyle: function () {
        return this.styles['defaultNode'];
    },

    setDefaultNodeStyle: function (style) {
        return this.setStyle('defaultNode', style);
    },

    getDefaultLinkStyle: function () {
        return this.styles['defaultLink'];
    },

    setDefaultLinkStyle: function (style) {
        return this.setStyle('defaultLink', style);
    },

    getStyle: function (name) {
        return this.styles[name];
    },

    setStyle: function (name, style) {
        this.styles[name] = style;
        return this;
    }
});
