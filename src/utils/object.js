import { forEach }                from './array';
import { isArray, isPlainObject } from './lang';


function hasKey(obj, key) {

    return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}

function keys(obj) {

    return obj ? Object.keys(obj) : [];
}

function forIn(obj, iterator, context) {

    forEach(keys(obj), function (key) {
        iterator.call(context, obj[key], key);
    });
}

function extend(target) {

    if (!target) {
        target = {};
    }

    for (let i = 1, l = arguments.length; i < l; i++) {
        let source = arguments[i];

        if (source) {

            /* eslint guard-for-in: 0 */
            for (let key in source) {
                target[key] = source[key];
            }
        }
    }

    return target;
}

function merge(target) {

    if (!target) {
        target = {};
    }

    for (let i = 1, l = arguments.length; i < l; i++) {

        let source = arguments[i];
        if (source) {

            /* eslint guard-for-in: 0 */
            for (let name in source) {

                let src         = target[name];
                let copy        = source[name];
                let copyIsArray = isArray(copy);

                if (copyIsArray || isPlainObject(copy)) {

                    let clone;
                    if (copyIsArray) {
                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    target[name] = merge(clone, copy);

                } else {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}

function getByPath(obj, path, delimiter) {

    delimiter = delimiter || '.';

    let paths = path.split(delimiter);

    while (paths.length) {

        let key = paths.shift();

        if (Object(obj) === obj && key in obj) {
            obj = obj[key];
        } else {
            return undefined;
        }
    }

    return obj;
}

function destroy(obj) {

    if (obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                delete obj[prop];
            }
        }
        if (obj) {

            /* eslint no-proto: 0 */
            obj.prototype = obj.__proto__ = null;
        }
        obj.destroyed = true;
    }
}


// exports
// -------

export {
    hasKey,
    keys,
    forIn,
    merge,
    extend,
    destroy,
    getByPath
};
