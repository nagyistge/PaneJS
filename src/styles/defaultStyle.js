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
        strokeColor: '#2db7f5',
        dashed: false,
        dashPattern: '3 3',
        dashOffset: 0,
        lineCap: 'butt',   // butt, round, square
        lineJoin: 'miter', // miter, round, bevel
        miterLimit: 10,

        // shadow
        shadow: false,
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowDx: 2,
        shadowDy: 3,

        glass: false,
        flipH: false,       // 水平翻转
        flipV: false,       // 垂直翻转
        visible: true,      // 默认可见
        outline: false,
        antiAlias: true,

        label: {
            shape: 'label',
            width: 0, // 0 表示直接
            spacing: 2,
            align: 'center',         // left, center, right
            verticalAlign: 'middle', // top, middle, bottom
            position: 'center',      // top, right, bottom, left, center

            whiteSpace: 'wrap', // 自动换行
            overflow: 'hidden',

            strokeWidth: 0,
            dashed: false,
            shadow: false,
            fillColor: '',

            // font
            fontColor: '#774400',
            fontSize: 12,
            fontFamily: 'Arial,Helvetica',
            fontOpacity: 1,
            fontWeight:'',
            italic: false,
            textDecoration: '',  // line-through, underline,
            fontVariant: '',
            fontStretch: '',
            letterSpacing: '',
            wordSpacing: '',
            kerning: '',
            lineHeight: 1
        },
    },


    node: {
        shape: 'rectangle',
        round: 0, // percentage
        label: {}
    },

    link: {
        shape: 'link',
        endArrow: 'classic',  // classic, block, open, oval, diamond, diamondThin
        label: {}
    }
};
