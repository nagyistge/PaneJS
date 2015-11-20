import { isFunction } from './lang';
import { toArray    } from './array';

function invoke(fn, args, context) {
    if (!fn || !isFunction(fn)) {
        return;
    }

    args = toArray(args);

    var ret;
    var a1 = args[0];
    var a2 = args[1];
    var a3 = args[2];

    switch (args.length) {
        case 0:
            ret = fn.call(context);
            break;
        case 1:
            ret = fn.call(context, a1);
            break;
        case 2:
            ret = fn.call(context, a1, a2);
            break;
        case 3:
            ret = fn.call(context, a1, a2, a3);
            break;
        default:
            ret = fn.apply(context, args);
            break;
    }

    return ret;
}

function bind(fn, context /* [,arg1[,arg2[,argN]]] */) {
    return isFunction(fn) ? Function.prototype.bind.apply(arguments) : fn;
}

export {
    bind,
    invoke
};
