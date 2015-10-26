function toFixed(value, precision) {
    var power = Math.pow(10, precision);
    return (Math.round(value * power) / power).toFixed(precision);
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export {
    toFixed,
    mod
};
