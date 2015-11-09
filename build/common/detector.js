define(function(require, exports, module) {
var ua = navigator.userAgent;
var av = navigator.appVersion;

module.exports = {
    // IE
    IS_IE: ua.indexOf('MSIE') >= 0,

    IS_QUIRKS: navigator.userAgent.indexOf('MSIE') >= 0 && (document.documentMode === null || document.documentMode === 5),

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

    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),

    IS_WIN: av.indexOf('Win') > 0,

    IS_MAC: av.indexOf('Mac') > 0,

    IS_TOUCH: 'ontouchstart' in document.documentElement,

    IS_POINTER: window.navigator.msPointerEnabled || false,

    IS_OT: navigator.userAgent.indexOf('Presto/2.4.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.3.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.2.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.1.') < 0 &&
    navigator.userAgent.indexOf('Presto/2.0.') < 0 &&
    navigator.userAgent.indexOf('Presto/1.') < 0,

    /**
     * Variable: IS_MT
     *
     * True if -moz-transform is available as a CSS style. This is the case
     * for all Firefox-based browsers newer than or equal 3, such as Camino,
     * Iceweasel, Seamonkey and Iceape.
     */
    IS_MT: (navigator.userAgent.indexOf('Firefox/') >= 0 &&
    navigator.userAgent.indexOf('Firefox/1.') < 0 &&
    navigator.userAgent.indexOf('Firefox/2.') < 0) ||
    (navigator.userAgent.indexOf('Iceweasel/') >= 0 &&
    navigator.userAgent.indexOf('Iceweasel/1.') < 0 &&
    navigator.userAgent.indexOf('Iceweasel/2.') < 0) ||
    (navigator.userAgent.indexOf('SeaMonkey/') >= 0 &&
    navigator.userAgent.indexOf('SeaMonkey/1.') < 0) ||
    (navigator.userAgent.indexOf('Iceape/') >= 0 &&
    navigator.userAgent.indexOf('Iceape/1.') < 0),

};

});