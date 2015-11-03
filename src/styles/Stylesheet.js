import { extend }       from '../common/utils'
import Base             from '../lib/Base';
import defaultLinkStyle from './defaultLinkStyle';
import defaultNodeStyle from './defaultNodeStyle';
import defaultStyle from './defaultStyle';

export default Base.extend({

    constructor: function Stylesheet() {
        var that = this;

        that.styles = {};
        that.setDefaultNodeStyle(extend({}, defaultStyle.common, defaultStyle.node));
        that.setDefaultLinkStyle(extend({}, defaultLinkStyle));
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
