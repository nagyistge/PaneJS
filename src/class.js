
/* jshint node: true, loopfunc: true, undef: true, unused: true */
// ref: https://github.com/aralejs/class
/*jshint -W030 */

var utils = require('./utils');

var isArray = utils.isArray;
var isFunction = utils.isFunction;
var hasKey = utils.hasKey;
var each = utils.each;

function Class(o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
        return classify(o);
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

    // The created class constructor.
    //function SubClass() {
    //    // Call the parent constructor.
    //    parent.apply(this, arguments);
    //
    //    // Only call initialize in self constructor.
    //    if (this.constructor === SubClass && this.initialize) {
    //        this.initialize.apply(this, arguments);
    //    }
    //}

    // By: bubkoo
    var SubClass = properties.constructor;
    // unspecified constructor
    if (SubClass === Object.prototype.constructor) {
        SubClass = function SubClass() {};
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

    'Extends': function (parent) {
        var existed = this.prototype;
        var parentProto = parent.prototype;
        var proto = createProto(parentProto);

        // Keep existed properties.
        mix(proto, existed);

        // Enforce the constructor to be what we expect.
        proto.constructor = this;

        // Set the prototype chain to inherit from `parent`.
        this.prototype = proto;

        // Set a convenience property in case the parent's prototype is
        // needed later.
        this.superclass = parentProto;
    },

    'Implements': function (items) {

        if (!isArray(items)) {
            items = [items];
        }

        var proto = this.prototype;
        var item;

        while (item = items.shift()) {
            mix(proto, item.prototype || item);
        }
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

    each(properties, function (value, key) {
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

    each(supplier, function (value, key) {
        if (whiteList && indexOf(whiteList, key) === -1) {
            return;
        }

        receiver[key] = value;
    });
}

module.exports = Class;

