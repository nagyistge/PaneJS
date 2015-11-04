module.exports = {

    common: {
        // translate
        dx: 0,
        dy: 0,

        scale: 1,

        // rotate
        rotation: 0,
        rotationCx: 0,
        rotationCy: 0,

        opacity: 1,

        // fill
        fillColor: '#e3f4ff',
        fillOpacity: 1,
        gradientColor: '',
        gradientOpacity: 1,
        gradientDirection: '',

        // border
        strokeWidth: 1,
        strokeColor: '#289de9',
        dashed: false,
        dashPattern: '3 3',
        dashOffset: 0,
        lineCap: 'butt',   // butt, round, square
        lineJoin: 'miter', // miter, round, bevel
        miterLimit: 10,

        // alignment
        verticalAlign: 'middle',  // top, middle, bottom
        align: 'center',          // left, center, right

        // shadow
        shadow: false,
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowDx: 2,
        shadowDy: 3,

        // label
        labelShape: 'label',
        labelWidth: 0,
        labelSpacing: 2, // [2, 2, 2, 2]
        labelPosition: '',
        labelVerticalPosition: '',
        labelBorderColor: '',
        labelBorderWidth: '',
        labelBackgroundColor: '',
        labelPadding: '',
        whiteSpace: 'wrap',
        overflow: 'hidden',

        glass: false,
        flipH: false,       // 水平翻转
        flipV: false,       // 垂直翻转
        visible: true,      // 默认可见
        outline: false,
        antiAlias: true,

        label: {
            // font
            fontColor: '#774400',
            fontOpacity: 1,
            fontSize: 12,
            fontStyle: 0,
            fontFamily: 'Arial,Helvetica',
            fontVariant: '',
            fontWeight: '',
            fontStretch: '',
            letterSpacing: '',
            wordSpacing: '',
            kerning: '',
            textDecoration: ''
        },
    },

    node: {
        shape: 'rectangle',
        round: 0, // 圆角大小的百分比（0-1）
        label: {}
    },

    link: {
        shape: 'connector',
        endArrow: 'classic',  // classic, block, open, oval, diamond, diamondThin
        label: {}
    },

    label: {
        shape: 'label',
        width: 0,
        spacing: 2,
        position: '',
        verticalPosition: '',

        strokeWidth: 0,
        strokeColor: '#289de9',
        dashed: false,
        dashPattern: '3 3',
        dashOffset: 0,
        shadow: false,
        fillColor: '',
    }
};
