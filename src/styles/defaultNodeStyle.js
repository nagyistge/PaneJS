import styleNames from '../enums/styleNames';
import shapeNames from '../enums/shapeNames';
import alignments from '../enums/alignments';

import { rectanglePerimeter } from '../common/perimeter';

var style = {};

style[styleNames.SHAPE] = shapeNames.RECTANGLE;
style[styleNames.PERIMETER] = rectanglePerimeter;
style[styleNames.VERTICAL_ALIGN] = alignments.MIDDLE;
style[styleNames.ALIGN] = alignments.CENTER;
style[styleNames.FILL_COLOR] = '#e3f4ff';
style[styleNames.STROKE_COLOR] = '#289de9';
style[styleNames.FONT_COLOR] = '#774400';

export default style;
