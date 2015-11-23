import { isFunction, isArray } from './lang';

function invoke(method, args, context) {
    if (!method || !isFunction(method)) {
        return;
    }

    args = isArray(args) ? args : args ? [args] : [];

    var ret;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];

    switch (args.length) {
        case 0:
            ret = method.call(context);
            break;
        case 1:
            ret = method.call(context, a1);
            break;
        case 2:
            ret = method.call(context, a1, a2);
            break;
        case 3:
            ret = method.call(context, a1, a2, a3);
            break;
        default:
            ret = method.apply(context, args);
            break;
    }

    return ret;
}


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
    invoke,
    getFunctionName
};


