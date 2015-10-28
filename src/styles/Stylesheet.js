import { extend }       from '../common/utils'
import Base             from '../lib/Base';
import defaultLinkStyle from './defaultLinkStyle';
import defaultNodeStyle from './defaultNodeStyle';

export default Base.extend({
    constructor: function Stylesheet() {
        var that = this;

        that.styles = {};
        that.setDefaultNodeStyle(extend({}, defaultNodeStyle));
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

    getStyle: function () {},

    setStyle: function (name, style) {
        this.styles[name] = style;
        return this;
    }
});
