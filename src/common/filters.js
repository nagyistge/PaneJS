import {
    isFinite
} from '../common/utils'

var filters = {

    outline: function (args) {

        // `color` ... outline color
        // `width`... outline width
        // `opacity` ... outline opacity
        // `margin` ... gap between outline and the element


        var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="${outerRadius}" /><feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="${innerRadius}" /><feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/><feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

        var margin = isFinite(args.margin) ? args.margin : 2;
        var width = isFinite(args.width) ? args.width : 1;

        return _.template(tpl)({
            color: args.color || 'blue',
            opacity: isFinite(args.opacity) ? args.opacity : 1,
            outerRadius: margin + width,
            innerRadius: margin
        });
    },

    highlight: function (args) {

        // `color` ... color
        // `width`... width
        // `blur` ... blur
        // `opacity` ... opacity

        var tpl = '<filter><feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/><feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/><feComposite result="composed" in="colored" in2="morphed" operator="in"/><feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/><feBlend in="SourceGraphic" in2="blured" mode="normal"/></filter>';

        return _.template(tpl)({
            color: args.color || 'red',
            width: isFinite(args.width) ? args.width : 1,
            blur: isFinite(args.blur) ? args.blur : 0,
            opacity: isFinite(args.opacity) ? args.opacity : 1
        });
    },

    blur: function (args) {

        // `x` ... horizontal blur
        // `y` ... vertical blur (optional)

        var x = isFinite(args.x) ? args.x : 2;

        return _.template('<filter><feGaussianBlur stdDeviation="${stdDeviation}"/></filter>')({
            stdDeviation: isFinite(args.y) ? [x, args.y] : x
        });
    },

    dropShadow: function (args) {

        // `dx` ... horizontal shift
        // `dy` ... vertical shift
        // `blur` ... blur
        // `color` ... color
        // `opacity` ... opacity

        var tpl = 'SVGFEDropShadowElement' in window
            ? '<filter><feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}"/></filter>'
            : '<filter><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dx="${dx}" dy="${dy}" result="offsetblur"/><feFlood flood-color="${color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

        return _.template(tpl)({
            dx: args.dx || 0,
            dy: args.dy || 0,
            opacity: isFinite(args.opacity) ? args.opacity : 1,
            color: args.color || 'black',
            blur: isFinite(args.blur) ? args.blur : 4
        });
    },

    grayscale: function (args) {

        // `amount` ... the proportion of the conversion.
        // A value of 1 is completely grayscale.
        // A value of 0 leaves the input unchanged.

        var amount = isFinite(args.amount) ? args.amount : 1;

        return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/></filter>')({
            a: 0.2126 + 0.7874 * (1 - amount),
            b: 0.7152 - 0.7152 * (1 - amount),
            c: 0.0722 - 0.0722 * (1 - amount),
            d: 0.2126 - 0.2126 * (1 - amount),
            e: 0.7152 + 0.2848 * (1 - amount),
            f: 0.0722 - 0.0722 * (1 - amount),
            g: 0.2126 - 0.2126 * (1 - amount),
            h: 0.0722 + 0.9278 * (1 - amount)
        });
    },

    sepia: function (args) {

        // `amount` ... the proportion of the conversion.
        // A value of 1 is completely sepia.
        // A value of 0 leaves the input unchanged.

        var amount = isFinite(args.amount) ? args.amount : 1;

        return _.template('<filter><feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/></filter>')({
            a: 0.393 + 0.607 * (1 - amount),
            b: 0.769 - 0.769 * (1 - amount),
            c: 0.189 - 0.189 * (1 - amount),
            d: 0.349 - 0.349 * (1 - amount),
            e: 0.686 + 0.314 * (1 - amount),
            f: 0.168 - 0.168 * (1 - amount),
            g: 0.272 - 0.272 * (1 - amount),
            h: 0.534 - 0.534 * (1 - amount),
            i: 0.131 + 0.869 * (1 - amount)
        });
    },

    saturate: function (args) {

        // `amount` ... the proportion of the conversion.
        // A value of 0 is completely un-saturated.
        // A value of 1 leaves the input unchanged.

        var amount = isFinite(args.amount) ? args.amount : 1;

        return _.template('<filter><feColorMatrix type="saturate" values="${amount}"/></filter>')({
            amount: 1 - amount
        });
    },

    hueRotate: function (args) {

        // `angle` ...  the number of degrees around the color
        // circle the input samples will be adjusted.

        return _.template('<filter><feColorMatrix type="hueRotate" values="${angle}"/></filter>')({
            angle: args.angle || 0
        });
    },

    invert: function (args) {

        // `amount` ... the proportion of the conversion.
        // A value of 1 is completely inverted.
        // A value of 0 leaves the input unchanged.

        var amount = isFinite(args.amount) ? args.amount : 1;

        return _.template('<filter><feComponentTransfer><feFuncR type="table" tableValues="${amount} ${amount2}"/><feFuncG type="table" tableValues="${amount} ${amount2}"/><feFuncB type="table" tableValues="${amount} ${amount2}"/></feComponentTransfer></filter>')({
            amount: amount,
            amount2: 1 - amount
        });
    },

    brightness: function (args) {

        // `amount` ... proportion of the conversion.
        // A value of 0 will create an image that is completely black.
        // A value of 1 leaves the input unchanged.

        return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}"/><feFuncG type="linear" slope="${amount}"/><feFuncB type="linear" slope="${amount}"/></feComponentTransfer></filter>')({
            amount: isFinite(args.amount) ? args.amount : 1
        });
    },

    contrast: function (args) {

        // `amount` ... proportion of the conversion.
        // A value of 0 will create an image that is completely black.
        // A value of 1 leaves the input unchanged.

        var amount = isFinite(args.amount) ? args.amount : 1;

        return _.template('<filter><feComponentTransfer><feFuncR type="linear" slope="${amount}" intercept="${amount2}"/><feFuncG type="linear" slope="${amount}" intercept="${amount2}"/><feFuncB type="linear" slope="${amount}" intercept="${amount2}"/></feComponentTransfer></filter>')({
            amount: amount,
            amount2: .5 - amount / 2
        });
    }
};


export default filters;
