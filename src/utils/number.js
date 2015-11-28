function toInt(value) {
    return parseInt(value, 10);
}

function toFloat(value) {
    return parseFloat(value);
}

function toFixed(value, precision) {
    var power = Math.pow(10, precision);
    return toFloat((Math.round(value * power) / power).toFixed(precision));
}

export {
    toInt,
    toFloat,
    toFixed,
};
