import styleNames from '../enums/styleNames';
import shapeNames from '../enums/shapeNames';
import alignments from '../enums/alignments';

import { rectanglePerimeter } from '../common/perimeter';

var style = {};

style[styleNames.shape] = shapeNames.RECTANGLE;
style[styleNames.perimeter] = rectanglePerimeter;
style[styleNames.VERTICAL_ALIGN] = alignments.MIDDLE;
style[styleNames.ALIGN] = alignments.CENTER;
style[styleNames.fillColor] = '#e3f4ff';
style[styleNames.STROKE_COLOR] = '#289de9';
style[styleNames.FONT_COLOR] = '#774400';

export default style;
