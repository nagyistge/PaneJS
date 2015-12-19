let ua = navigator.userAgent;
let av = navigator.appVersion;


// exports
// -------

export default {
    // IE
    IS_IE: ua.indexOf('MSIE') >= 0,

    IS_IE11: !!ua.match(/Trident\/7\./),

    // Netscape
    IS_NS: ua.indexOf('Mozilla/') >= 0 && ua.indexOf('MSIE') < 0,

    // Firefox
    IS_FF: ua.indexOf('Firefox/') >= 0,

    // Chrome
    IS_GC: ua.indexOf('Chrome/') >= 0,

    // Safari
    IS_SF: ua.indexOf('AppleWebKit/') >= 0 && ua.indexOf('Chrome/') < 0,

    // Opera
    IS_OP: ua.indexOf('Opera/') >= 0,

    // True if -o-transform is available as a CSS style. This is the case
    // for Opera browsers that use Presto/2.5 and later.
    IS_OT: ua.indexOf('Presto/2.4.') < 0 &&
    ua.indexOf('Presto/2.3.') < 0 &&
    ua.indexOf('Presto/2.2.') < 0 &&
    ua.indexOf('Presto/2.1.') < 0 &&
    ua.indexOf('Presto/2.0.') < 0 &&
    ua.indexOf('Presto/1.') < 0,

    // True if -moz-transform is available as a CSS style. This is the case
    // for all Firefox-based browsers newer than or equal 3, such as Camino,
    // Iceweasel, Seamonkey and Iceape.
    IS_MT: (ua.indexOf('Firefox/') >= 0 && ua.indexOf('Firefox/1.') < 0 && ua.indexOf('Firefox/2.') < 0) ||
    (ua.indexOf('Iceweasel/') >= 0 && ua.indexOf('Iceweasel/1.') < 0 && ua.indexOf('Iceweasel/2.') < 0) ||
    (ua.indexOf('SeaMonkey/') >= 0 && ua.indexOf('SeaMonkey/1.') < 0) ||
    (ua.indexOf('Iceape/') >= 0 && ua.indexOf('Iceape/1.') < 0),

    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),

    IS_WIN: av.indexOf('Win') > 0,

    IS_MAC: av.indexOf('Mac') > 0,

    IS_TOUCH: 'ontouchstart' in document.documentElement,

    IS_POINTER: window.navigator.msPointerEnabled || false
};
