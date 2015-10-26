function getFunctionName(fn) {
    var str = fn && fn.name || '';

    if (!str && fn) {
        var tmp = fn.toString();
        var idx1 = 9;

        while (tmp.charAt(idx1) === ' ') {
            idx1++;
        }

        var idx2 = tmp.indexOf('(', idx1);
        str = tmp.substring(idx1, idx2);
    }

    return str;
}

export {
    getFunctionName
};


