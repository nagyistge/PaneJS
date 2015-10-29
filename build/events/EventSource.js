define(function(require, exports, module) {/* jshint node: true, loopfunc: true, undef: true, unused: true */

var Class = require('../common/class');
//var utils = require('../common/utils');
var EventObject = require('./EventObject');

var EventSource = Class.create({
    constructor: function EventSource(eventSource) {
        this.setEventSource(eventSource);
    },
    /**
     * Variable: eventListeners
     *
     * Holds the event names and associated listeners in an array. The array
     * contains the event name followed by the respective listener for each
     * registered listener.
     */
    eventListeners: null,

    /**
     * Variable: eventsEnabled
     *
     * Specifies if events can be fired. Default is true.
     */
    eventsEnabled: true,

    /**
     * Variable: eventSource
     *
     * Optional source for events. Default is null.
     */
    eventSource: null,

    /**
     * Function: isEventsEnabled
     *
     * Returns <eventsEnabled>.
     */
    isEventsEnabled: function () {
        return this.eventsEnabled;
    },

    /**
     * Function: setEventsEnabled
     *
     * Sets <eventsEnabled>.
     */
    setEventsEnabled: function (value) {
        this.eventsEnabled = value;
    },

    /**
     * Function: getEventSource
     *
     * Returns <eventSource>.
     */
    getEventSource: function () {
        return this.eventSource;
    },

    /**
     * Function: setEventSource
     *
     * Sets <eventSource>.
     */
    setEventSource: function (value) {
        this.eventSource = value;
    },

    /**
     * Function: addListener
     *
     * Binds the specified function to the given event name. If no event name
     * is given, then the listener is registered for all events.
     *
     * The parameters of the listener are the sender and an <mxEventObject>.
     */
    addListener: function (name, funct) {
        if (this.eventListeners === null) {
            this.eventListeners = [];
        }

        this.eventListeners.push(name);
        this.eventListeners.push(funct);
    },

    /**
     * Function: removeListener
     *
     * Removes all occurrences of the given listener from <eventListeners>.
     */
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

    /**
     * Function: fireEvent
     *
     * Dispatches the given event to the listeners which are registered for
     * the event. The sender argument is optional. The current execution scope
     * ("this") is used for the listener invocation (see <mxUtils.bind>).
     *
     * Example:
     *
     * (code)
     * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
     * (end)
     *
     * Parameters:
     *
     * evt - <mxEventObject> that represents the event.
     * sender - Optional sender to be passed to the listener. Default value is
     * the return value of <getEventSource>.
     */
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
    },
});

module.exports = EventSource;

});