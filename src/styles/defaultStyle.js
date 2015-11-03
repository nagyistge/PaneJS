module.exports = {

    common: {
        // 平移
        dx: 0,
        dy: 0,

        // 缩放
        scale: 1,

        // 旋转
        rotation: 0,
        rotationCx: 0,
        rotationCy: 0,

        opacity: 1,

        // 填充
        fillColor: '#e3f4ff',
        fillOpacity: 1,
        gradientColor: '',
        gradientOpacity: 1,
        gradientDirection: '',

        // 边框
        strokeWidth: 1,
        strokeColor: '#289de9',
        dashed: false,
        dashPattern: '3 3',
        dashOffset: 0,
        lineCap: 'butt',   // butt, round, square
        lineJoin: 'miter', // miter, round, bevel
        miterLimit: 10,

        // 字体
        fontColor: '#774400',
        fontBackgroundColor: '',
        fontBorderColor: '',
        fontSize: 12,
        fontStyle: 0,
        fontFamily: 'Arial,Helvetica',

        // 对齐
        verticalAlign: 'middle',  // top, middle, bottom
        align: 'center',          // left, center, right

        // 阴影
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
        labelBackgroundColor: '',
        labelPadding: '',
        whiteSpace: 'wrap',
        overflow: 'hidden',

        glass: false,
        flipH: false,       // 水平翻转
        flipV: false,       // 垂直翻转
        visible: true,      // 默认可见
        outline: false,
        antiAlias: true
    },

    // 节点
    node: {
        shape: 'rectangle',
        round: 0, // 圆角大小的百分比（0-1）
    },

    // 连线
    link: {
        shape: 'connector',
        endArrow: 'classic',  // classic, block, open, oval, diamond, diamondThin
    }
};
