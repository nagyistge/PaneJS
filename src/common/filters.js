import { isFinite, trim } from '../common/utils';


// exports
// -------

export default {

  outline(args = {}) {

    // `color`   ... outline color
    // `width`   ... outline width
    // `opacity` ... outline opacity
    // `margin`  ... gap between outline and the element

    let color   = args.color || 'blue';
    let width   = isFinite(args.width) ? args.width : 1;
    let margin  = isFinite(args.margin) ? args.margin : 2;
    let opacity = isFinite(args.opacity) ? args.opacity : 1;

    let innerRadius = margin;
    let outerRadius = margin + width;

    return trim(`
      <filter>
        <feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/>
        <feMorphology in="SourceAlpha" result="morphedOuter" operator="dilate" radius="${outerRadius}" />
        <feMorphology in="SourceAlpha" result="morphedInner" operator="dilate" radius="${innerRadius}" />
        <feComposite result="morphedOuterColored" in="colored" in2="morphedOuter" operator="in"/>
        <feComposite operator="xor" in="morphedOuterColored" in2="morphedInner" result="outline"/>
        <feMerge>
          <feMergeNode in="outline"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    `);
  },

  highlight(args = {}) {

    // `color`   ... color
    // `blur`    ... blur
    // `width`   ... width
    // `opacity` ... opacity

    let color   = args.color || 'red';
    let blur    = isFinite(args.blur) ? args.blur : 0;
    let width   = isFinite(args.width) ? args.width : 1;
    let opacity = isFinite(args.opacity) ? args.opacity : 1;

    return trim(`
      <filter>
        <feFlood flood-color="${color}" flood-opacity="${opacity}" result="colored"/>
        <feMorphology result="morphed" in="SourceGraphic" operator="dilate" radius="${width}"/>
        <feComposite result="composed" in="colored" in2="morphed" operator="in"/>
        <feGaussianBlur result="blured" in="composed" stdDeviation="${blur}"/> 
        <feBlend in="SourceGraphic" in2="blured" mode="normal"/>
      </filter>
    `);
  },

  blur(args = {}) {

    // `x` ... horizontal blur
    // `y` ... vertical blur (optional)

    let x            = isFinite(args.x) ? args.x : 2;
    let stdDeviation = isFinite(args.y) ? [x, args.y] : x;

    return trim(`
      <filter>
        <feGaussianBlur stdDeviation="${stdDeviation}"/>
      </filter>
    `);
  },

  dropShadow(args = {}) {

    // `dx`      ... horizontal shift
    // `dy`      ... vertical shift
    // `blur`    ... blur
    // `color`   ... color
    // `opacity` ... opacity

    let dx      = args.dx || 0;
    let dy      = args.dy || 0;
    let color   = args.color || 'black';
    let blur    = isFinite(args.blur) ? args.blur : 4;
    let opacity = isFinite(args.opacity) ? args.opacity : 1;

    let template = 'SVGFEDropShadowElement' in window
      ? `<filter>
           <feDropShadow stdDeviation="${blur}" dx="${dx}" dy="${dy}" flood-color="${color}" flood-opacity="${opacity}" />
         </filter>`
      : `<filter>
           <feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" />
           <feOffset dx="${dx}" dy="${dy}" result="offsetblur" />
           <feFlood flood-color="${color}" />
           <feComposite in2="offsetblur" operator="in" />
           <feComponentTransfer>
             <feFuncA type="linear" slope="${opacity}" />
           </feComponentTransfer>
           <feMerge>
             <feMergeNode/>
             <feMergeNode in="SourceGraphic"/>
           </feMerge>
         </filter>`;

    return trim(template);
  },

  grayScale(args = {}) {

    // `amount` ... the proportion of the conversion.
    // A value of 1 is completely grayscale.
    // A value of 0 leaves the input unchanged.

    let amount = isFinite(args.amount) ? args.amount : 1;

    let a = 0.2126 + 0.7874 * (1 - amount);
    let b = 0.7152 - 0.7152 * (1 - amount);
    let c = 0.0722 - 0.0722 * (1 - amount);
    let d = 0.2126 - 0.2126 * (1 - amount);
    let e = 0.7152 + 0.2848 * (1 - amount);
    let f = 0.0722 - 0.0722 * (1 - amount);
    let g = 0.2126 - 0.2126 * (1 - amount);
    let h = 0.0722 + 0.9278 * (1 - amount);

    return trim(`
      <filter>
        <feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${b} ${h} 0 0 0 0 0 1 0"/>
      </filter>
    `);
  },

  sepia(args = {}) {

    // `amount` ... the proportion of the conversion.
    // A value of 1 is completely sepia.
    // A value of 0 leaves the input unchanged.

    let amount = isFinite(args.amount) ? args.amount : 1;

    let a = 0.393 + 0.607 * (1 - amount);
    let b = 0.769 - 0.769 * (1 - amount);
    let c = 0.189 - 0.189 * (1 - amount);
    let d = 0.349 - 0.349 * (1 - amount);
    let e = 0.686 + 0.314 * (1 - amount);
    let f = 0.168 - 0.168 * (1 - amount);
    let g = 0.272 - 0.272 * (1 - amount);
    let h = 0.534 - 0.534 * (1 - amount);
    let i = 0.131 + 0.869 * (1 - amount);

    return trim(`
      <filter>
        <feColorMatrix type="matrix" values="${a} ${b} ${c} 0 0 ${d} ${e} ${f} 0 0 ${g} ${h} ${i} 0 0 0 0 0 1 0"/>
      </filter>
    `);
  },

  saturate(args = {}) {

    // `amount` ... the proportion of the conversion.
    // A value of 0 is completely un-saturated.
    // A value of 1 leaves the input unchanged.

    let amount = isFinite(args.amount) ? args.amount : 1;

    return trim(`
      <filter>
        <feColorMatrix type="saturate" values="${1 - amount}"/>
      </filter>
    `);
  },

  hueRotate(args = {}) {

    // `angle` ...  the number of degrees around the color
    // circle the input samples will be adjusted.

    let angle = args.angle || 0;

    return trim(`
      <filter>
        <feColorMatrix type="hueRotate" values="${angle}"/>
      </filter>
    `);
  },

  invert(args = {}) {

    // `amount` ... the proportion of the conversion.
    // A value of 1 is completely inverted.
    // A value of 0 leaves the input unchanged.

    let amount  = isFinite(args.amount) ? args.amount : 1;
    let amount2 = 1 - amount;

    return trim(`
      <filter>
        <feComponentTransfer>
          <feFuncR type="table" tableValues="${amount} ${amount2}"/>
          <feFuncG type="table" tableValues="${amount} ${amount2}"/>
          <feFuncB type="table" tableValues="${amount} ${amount2}"/>
        </feComponentTransfer>
      </filter>
    `);
  },

  brightness(args = {}) {

    // `amount` ... proportion of the conversion.
    // A value of 0 will create an image that is completely black.
    // A value of 1 leaves the input unchanged.

    let amount = isFinite(args.amount) ? args.amount : 1;

    return trim(`
      <filter>
        <feComponentTransfer>
          <feFuncR type="linear" slope="${amount}"/>
          <feFuncG type="linear" slope="${amount}"/>
          <feFuncB type="linear" slope="${amount}"/>
        </feComponentTransfer>
      </filter>
    `);
  },

  contrast(args = {}) {

    // `amount` ... proportion of the conversion.
    // A value of 0 will create an image that is completely black.
    // A value of 1 leaves the input unchanged.

    let amount  = isFinite(args.amount) ? args.amount : 1;
    let amount2 = 0.5 - amount / 2;

    return trim(`
      <filter>
       <feComponentTransfer>
          <feFuncR type="linear" slope="${amount}" intercept="${amount2}"/>
          <feFuncG type="linear" slope="${amount}" intercept="${amount2}"/>
          <feFuncB type="linear" slope="${amount}" intercept="${amount2}"/>
        </feComponentTransfer>
      </filter>
    `);
  }
};
