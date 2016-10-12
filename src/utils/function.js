import { isFunction } from './lang';
import { slice      } from './array';


function invoke(fn, args, context) {

    let ret;

    if (isFunction(fn)) {

        let len = args.length;
        let a1  = args[0];
        let a2  = args[1];
        let a3  = args[2];

        if (len === 0) {
            ret = fn.call(context);
        } else if (len === 1) {
            ret = fn.call(context, a1);
        } else if (len === 2) {
            ret = fn.call(context, a1, a2);
        } else if (len === 3) {
            ret = fn.call(context, a1, a2, a3);
        } else {
            ret = fn.apply(context, args);
        }
    }

    return ret;
}

function bind(fn /* [, context, arg1[,arg2[,argN]]] */) {

    if (isFunction(fn)) {

        let args = slice(arguments, 1);

        return invoke(Function.prototype.bind, args, fn);
    }

    return fn;
}


const deferred = [];

const defer = (fn) => {
    deferred.push(fn);
};

const flush = () => {

    let fn;
    while (fn = deferred.pop()) {
        fn();
    }
};


// exports
// -------

export {
    defer,
    flush,
    bind,
    invoke
};
