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
            position: 'center',       // top, right, bottom, left, center
            align: 'center',          // left, center, right
            verticalAlign: 'middle',  // top, middle, bottom
            overflow: '',       // hidden, fill, width
            vertical: true,
            verticalRotation: -90
        },
    },


    node: {
        shape: 'rectangle',
        round: 0 // percentage
    },

    link: {
        shape: 'link',
        endArrow: 'classic',  // classic, block, open, oval, diamond, diamondThin
    }


};
