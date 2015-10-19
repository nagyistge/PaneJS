var constants = require('./constants');

var marker = {
    markers: [],
    addMarker: function (type, fn) {
        marker.markers[type] = fn;
    },
    createMarker: function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
        var fn = marker.markers[type];

        return fn ? fn(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) : null;
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

    var f = (type != constants.ARROW_CLASSIC) ? 1 : 3 / 4;
    pe.x += -unitX * f - endOffsetX;
    pe.y += -unitY * f - endOffsetY;

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x, pt.y);
        canvas.lineTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);

        if (type == constants.ARROW_CLASSIC) {
            canvas.lineTo(pt.x - unitX * 3 / 4, pt.y - unitY * 3 / 4);
        }

        canvas.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
        canvas.close();

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
}

marker.addMarker('classic', arrow);
marker.addMarker('block', arrow);

marker.addMarker('open', function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
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

    pe.x += -endOffsetX * 2;
    pe.y += -endOffsetY * 2;

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);
        canvas.lineTo(pt.x, pt.y);
        canvas.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
        canvas.stroke();
    };
});

marker.addMarker('oval', function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    var a = size / 2;

    var pt = pe.clone();
    pe.x -= unitX * a;
    pe.y -= unitY * a;

    return function () {
        canvas.ellipse(pt.x - a, pt.y - a, size, size);

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
});

function diamond(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 45 degrees, 1/sin(45) = 1.4142 / 2 = 0.7071 ( / 2 allows for
    // only half the strokewidth is processed ). Or 0.9862 for thin diamond.
    // Note these values and the tk variable below are dependent, update
    // both together (saves trig hard coding it).
    var swFactor = (type == constants.ARROW_DIAMOND) ? 0.7071 : 0.9862;
    var endOffsetX = unitX * sw * swFactor;
    var endOffsetY = unitY * sw * swFactor;

    unitX = unitX * (size + sw);
    unitY = unitY * (size + sw);

    var pt = pe.clone();
    pt.x -= endOffsetX;
    pt.y -= endOffsetY;

    pe.x += -unitX - endOffsetX;
    pe.y += -unitY - endOffsetY;

    // thickness factor for diamond
    var tk = ((type == constants.ARROW_DIAMOND) ? 2 : 3.4);

    return function () {
        canvas.begin();
        canvas.moveTo(pt.x, pt.y);
        canvas.lineTo(pt.x - unitX / 2 - unitY / tk, pt.y + unitX / tk - unitY / 2);
        canvas.lineTo(pt.x - unitX, pt.y - unitY);
        canvas.lineTo(pt.x - unitX / 2 + unitY / tk, pt.y - unitY / 2 - unitX / tk);
        canvas.close();

        if (filled) {
            canvas.fillAndStroke();
        }
        else {
            canvas.stroke();
        }
    };
}

marker.addMarker('diamond', diamond);
marker.addMarker('diamondThin', diamond);


module.exports = marker;
