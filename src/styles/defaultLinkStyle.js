import styleNames from '../enums/styleNames';
import shapeNames from '../enums/shapeNames';
import alignments from '../enums/alignments';
import arrowTypes from '../enums/arrowTypes';

var style = {};

style[styleNames.shape] = shapeNames.CONNECTOR;
style[styleNames.END_ARROW] = arrowTypes.CLASSIC;
style[styleNames.VERTICAL_ALIGN] = alignments.MIDDLE;
style[styleNames.ALIGN] = alignments.CENTER;
style[styleNames.STROKE_COLOR] = '#289de9';
style[styleNames.FONT_COLOR] = '#446299';

export default style;

