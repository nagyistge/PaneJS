var marker = {

    markers: {},

    addMarker: function (type, func) {
        marker.markers[type] = func;
    },

    createMarker: function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {

        var func = marker.markers[type];

        return func ? func(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) : null;
    }
};

function arrow(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
    // only half the strokewidth is processed ).
    var endOffsetX = unitX * sw * 1.118;
    var endOffsetY = unitY * sw * 1.118;

    unitX = unitX * (size + sw);
    unitY = unitY * (size + sw);

    var pt = pe.clone();
    pt.x -= endOffsetX;
    pt.y -= endOffsetY;

    var f = (type !== 'classic') ? 1 : 3 / 4;
    pe.x += -unitX * f - endOffsetX;
    pe.y += -unitY * f - endOffsetY;

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x, pt.y);
        canvas.lineTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);

        if (type === 'classic') {
            canvas.lineTo(pt.x - unitX * 3 / 4, pt.y - unitY * 3 / 4);
        }

        canvas.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
        canvas.close();

        if (filled) {
            canvas.fillAndStroke();
        } else {
            canvas.stroke();
        }
    };
}

marker.addMarker('classic', arrow);
marker.addMarker('block', arrow);

export default marker;
