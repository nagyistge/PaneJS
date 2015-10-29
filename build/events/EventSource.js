define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
//var utils = require('../common/utils');
var EventObject = require('./EventObject');

var EventSource = Class.create({

    eventListeners: null,
    eventsEnabled: true,
    eventSource: null,

    constructor: function EventSource(eventSource) {
        this.setEventSource(eventSource);
    },

    isEventsEnabled: function () {
        return this.eventsEnabled;
    },


    setEventsEnabled: function (value) {
        this.eventsEnabled = value;
    },

    getEventSource: function () {
        return this.eventSource;
    },

    setEventSource: function (value) {
        this.eventSource = value;
    },

    addListener: function (name, funct) {
        if (this.eventListeners === null) {
            this.eventListeners = [];
        }

        this.eventListeners.push(name);
        this.eventListeners.push(funct);
    },

    removeListener: function (funct) {
        if (this.eventListeners !== null) {
            var i = 0;

            while (i < this.eventListeners.length) {
                if (this.eventListeners[i + 1] == funct) {
                    this.eventListeners.splice(i, 2);
                } else {
                    i += 2;
                }
            }
        }
    },

    fireEvent: function (evt, sender) {
        if (this.eventListeners !== null && this.isEventsEnabled()) {
            if (evt === null) {
                evt = new EventObject();
            }

            if (sender === null) {
                sender = this.getEventSource();
            }

            if (sender === null) {
                sender = this;
            }

            var args = [sender, evt];

            for (var i = 0; i < this.eventListeners.length; i += 2) {
                var listen = this.eventListeners[i];

                if (listen === null || listen == evt.getName()) {
                    this.eventListeners[i + 1].apply(this, args);
                }
            }
        }
    }
});

module.exports = EventSource;

});