import { isFunction } from './lang';

export function invoke(fn, args, context) {

    let ret;

    if (isFunction(fn)) {

        let len = args.length;
        let [a1, a2, a3] = args;

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

export function bind(fn, ...args) {

    return isFunction(fn)
        ? invoke(Function.prototype.bind, args, fn)
        : fn;
}


const deferred = [];

export function defer(fn) {

    deferred.push(fn);
}

export function flush() {

    let fn = deferred.pop();
    while (fn) {
        fn();
        fn = deferred.pop();
    }
}
