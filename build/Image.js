define(function(require, exports, module) {/**
 * Copyright (c) 2006-2013, JGraph Ltd
 */
/**
 * Class: mxImage
 *
 * Encapsulates the URL, width and height of an image.
 *
 * Constructor: mxImage
 *
 * Constructs a new image.
 */
function mxImage(src, width, height) {
    this.src = src;
    this.width = width;
    this.height = height;
}

/**
 * Variable: src
 *
 * String that specifies the URL of the image.
 */
mxImage.prototype.src = null;

/**
 * Variable: width
 *
 * Integer that specifies the width of the image.
 */
mxImage.prototype.width = null;

/**
 * Variable: height
 *
 * Integer that specifies the height of the image.
 */
mxImage.prototype.height = null;
;module.exports = mxImage;});