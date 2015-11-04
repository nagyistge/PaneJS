import {
    getValue,
    isNullOrUndefined
} from '../common/utils';

import Shape from './Shape';

export default Shape.extend({

    constructor: function Text(state, style, bounds) {
        Text.superclass.constructor.call(this, state, style, bounds);
    },

    draw: function (canvas) {
        var that = this;
        var scale = that.scale;
        var x = that.bounds.x / scale;
        var y = that.bounds.y / scale;
        var w = that.bounds.width / scale;
        var h = that.bounds.height / scale;

        //this.updateTransform(canvas, x, y, w, h);

        canvas.drawString(x, y, w, h, that.text);

        // Checks if text contains HTML markup
        //var realHtml = mxUtils.isNode(this.value) || this.dialect == mxConstants.DIALECT_STRICTHTML;
        //
        //// Always renders labels as HTML in VML
        //var fmt = (realHtml || canvas instanceof mxVmlCanvas2D) ? 'html' : '';
        //var val = this.value;
        //
        //if (!realHtml && fmt == 'html') {
        //    val = mxUtils.htmlEntities(val, false);
        //}
        //
        //val = (!mxUtils.isNode(this.value) && this.replaceLinefeeds && fmt == 'html') ?
        //    val.replace(/\n/g, '<br/>') : val;
        //
        //canvas.text(x, y, w, h, val, this.align, this.valign, this.wrap, fmt, this.overflow,
        //    this.clipped, this.getTextRotation());
    },

});
