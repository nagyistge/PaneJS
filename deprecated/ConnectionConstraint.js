function ConnectionConstraint(point, perimeter) {
    this.point = point;
    this.perimeter = (perimeter != null) ? perimeter : true;
}

module.exports = ConnectionConstraint;
