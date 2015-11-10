var cellRoute = {

    separator: '.',

    create: function (cell) {

        var result = '';

        if (cell) {
            var parent = cell.parent;

            while (parent) {
                var index = parent.getChildIndex(cell);
                result = index + cellRoute.separator + result;

                cell = parent;
                parent = cell.parent;
            }
        }

        var l = result.length;
        if (l > 1) {
            result = result.substring(0, l - 1);
        }

        return result;
    },

    getParentRoute: function (path) {

        if (path) {
            var index = path.lastIndexOf(cellRoute.separator);

            if (index >= 0) {
                return path.substring(0, index);
            } else if (path.length > 0) {
                return '';
            }
        }

        return null;
    },

    resolve: function (root, path) {
        var parent = root;

        if (path) {
            var tokens = path.split(cellRoute.separator);
            for (var i = 0; i < tokens.length; i++) {
                parent = parent.getChildAt(parseInt(tokens[i]));
            }
        }

        return parent;
    },

    compare: function (p1, p2) {
        var min = Math.min(p1.length, p2.length);
        var comp = 0;

        for (var i = 0; i < min; i++) {
            if (p1[i] != p2[i]) {
                if (p1[i].length == 0 ||
                    p2[i].length == 0) {
                    comp = (p1[i] == p2[i]) ? 0 : ((p1[i] > p2[i]) ? 1 : -1);
                }
                else {
                    var t1 = parseInt(p1[i]);
                    var t2 = parseInt(p2[i]);

                    comp = (t1 == t2) ? 0 : ((t1 > t2) ? 1 : -1);
                }

                break;
            }
        }

        // Compares path length if both paths are equal to this point
        if (comp == 0) {
            var t1 = p1.length;
            var t2 = p2.length;

            if (t1 != t2) {
                comp = (t1 > t2) ? 1 : -1;
            }
        }

        return comp;
    }
};

export default cellRoute;
