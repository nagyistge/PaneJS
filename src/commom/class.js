import {
    forIn,
    hasKey,
    forEach,
    isArray,
    indexOf,
    isFunction
} from './utils';


function Class(fn) {
    if (!(this instanceof Class) && isFunction(fn)) {
        return classify(fn);
    }
}

Class.create = function (parent, properties) {

    if (!isFunction(parent)) {
        properties = parent;
        parent = null;
    }

    properties || (properties = {});
    parent || (parent = properties.Extends || Class);
    properties.Extends = parent;

    var SubClass = properties.constructor;
    if (SubClass === Object.prototype.constructor) {
        SubClass = function Superclass() {};
    }

    // Inherit class (static) properties from parent.
    if (parent !== Class) {
        mix(SubClass, parent, parent.StaticsWhiteList);
    }

    // Add instance properties to the subclass.
    implement.call(SubClass, properties);

    // Make subclass extendable.
    return classify(SubClass);
};

Class.extend = function (properties) {

    // Create a sub Class based on `Class`.

    properties || (properties = {});
    properties.Extends = this;

    return Class.create(properties);
};

Class.Mutators = {
    // define special properties.

    'Extends': function (parent) {
        var that = this;
        var existed = that.prototype;
        var parentProto = parent.prototype;
        var proto = createProto(parentProto);

        // Keep existed properties.
        mix(proto, existed);

        // Enforce the constructor to be what we expect.
        proto.constructor = that;

        that.prototype = proto;
        that.superclass = parentProto;
    },

    'Implements': function (items) {

        var proto = this.prototype;
        var list = isArray(items) ? items : [items];

        forEach(list, function (item) {
            mix(proto, item.prototype || item);
        });

    },

    'Statics': function (staticProperties) {
        mix(this, staticProperties);
    }
};

function classify(cls) {

    cls.extend = Class.extend;
    cls.implement = implement;
    return cls;
}

function implement(properties) {

    var that = this;
    var mutators = Class.Mutators;

    forIn(properties, function (value, key) {
        if (hasKey(mutators, key)) {
            mutators[key].call(that, value);
        } else {
            that.prototype[key] = value;
        }
    });
}


// Helpers
// -------

var createProto = Object.__proto__ ?
    function (proto) {
        return {__proto__: proto};
    } :
    function (proto) {
        function Ctor() {}

        Ctor.prototype = proto;
        return new Ctor();
    };

function mix(receiver, supplier, whiteList) {

    forIn(supplier, function (value, key) {
        if (whiteList && indexOf(whiteList, key) === -1) {
            return;
        }

        receiver[key] = value;
    });
}


// export
// ------

export default Class;
