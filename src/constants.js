var Rectangle = require('./Rectangle');

module.exports = {

    NONE: 'none',
    NS_SVG: 'http://www.w3.org/2000/svg',

    EVENT_SPLITTER: /\s+/,
    OBJECT_ID: 'objectId',

    SHADOW_COLOR: 'gray',
    SHADOW_OFFSET_X: 2,
    SHADOW_OFFSET_Y: 3,
    SHADOW_OPACITY: 1,

    DEFAULT_FONT_SIZE: 11,
    DEFAULT_FONT_FAMILY: 'Arial,Helvetica',

    NODETYPE_ELEMENT: 1,

    PAGE_FORMAT_A4_PORTRAIT: new Rectangle(0, 0, 826, 1169),
    PAGE_FORMAT_A4_LANDSCAPE: new Rectangle(0, 0, 1169, 826),
    PAGE_FORMAT_LETTER_PORTRAIT: new Rectangle(0, 0, 850, 1100),
    PAGE_FORMAT_LETTER_LANDSCAPE: new Rectangle(0, 0, 1100, 850),

    STYLE_FILLCOLOR: 'fillColor',

};

