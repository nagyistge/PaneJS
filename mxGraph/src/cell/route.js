var cellRoute = {

    separator: '.',

    create(cell) {

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

    getParentRoute(path) {

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

    resolve(root, path) {
        var parent = root;

        if (path) {
            var tokens = path.split(cellRoute.separator);
            for (var i = 0; i < tokens.length; i++) {
                parent = parent.getChildAt(parseInt(tokens[i]));
            }
        }

        return parent;
    },

    compare(arr1, arr2) {

        var comp = 0;
        var l1 = arr1.length;
        var l2 = arr2.length;
        var min = Math.min(l1, l2);

        for (var i = 0; i < min; i++) {

            if (arr1[i] !== arr2[i]) {

                var v1 = arr1[i].length ? parseInt(arr1[i]) : -1;
                var v2 = arr2[i].length ? parseInt(arr2[i]) : -1;

                comp = v1 > v2 ? 1 : -1;

                break;
            }
        }

        // compare path length if both paths are equal to this point
        if (comp === 0) {
            l1 = arr1.length;
            l2 = arr2.length;

            if (l1 !== l1) {
                comp = l1 > l2 ? 1 : -1;
            }
        }

        return comp;
    }
};

export default cellRoute;
