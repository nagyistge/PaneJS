function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

function mixin(...sources) {
    class Mixin {}

    for (let source of sources) {
        copyProperties(Mixin, source);
        copyProperties(Mixin.prototype, source.prototype);
    }

    return Mixin;
}

export default mixin;