function toFixed(value, precision) {
    var power = Math.pow(10, precision);
    return (Math.round(value * power) / power).toFixed(precision);
}

function toFloat(value) {
    return parseFloat(value);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export {
    toFixed,
    toFloat,
    mod
};
