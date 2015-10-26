var ua = navigator.userAgent;
var av = navigator.appVersion;

var client = {
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

    IS_IOS: !!ua.match(/(iPad|iPhone|iPod)/g),

    IS_WIN: av.indexOf('Win') > 0,

    IS_MAC: av.indexOf('Mac') > 0,

    IS_TOUCH: 'ontouchstart' in document.documentElement,

    IS_POINTER: window.navigator.msPointerEnabled || false
};

export default client;
