import {
    each,
    forIn,
    hasKey,
    isArray,
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

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
    properties || (properties = {});
    properties.Extends = this;

    return Class.create(properties);
};

// define special properties.
Class.Mutators = {

    // 继承
    'Extends': function (parent) {
        var existed = this.prototype;
        var parentProto = parent.prototype;
        var proto = createProto(parentProto);

        // Keep existed properties.
        mix(proto, existed);

        // Enforce the constructor to be what we expect.
        proto.constructor = this;

        this.prototype = proto;
        this.superclass = parentProto;
    },

    // 实现
    'Implements': function (items) {

        var list = isArray(items) ? items : [items];
        var proto = this.prototype;

        each(list, function (item) {
            mix(proto, item.prototype || item);
        });

    },

    // 属性访问器
    'Accessors': function (propNames) {

        var props = isArray(propNames) ? propNames : [propNames];
        var proto = this.prototype;

        each(props, function (prop) {

            var uc = ucFirst(prop);

            proto['set' + uc] = function (value) {
                this[prop] = value;
                return this;
            };

            proto['get' + uc] = function () {
                return this[prop];
            };
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

export default Class;
