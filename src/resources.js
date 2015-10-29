
var resources = {
    resources: [],

    extension: mxResourceExtension,
    loadDefaultBundle: true,
    loadSpecialBundle: true,
    resourcesEncoded: false,

    isLanguageSupported: function (lan) {
        if (mxClient.languages !== null) {
            return mxUtils.indexOf(mxClient.languages, lan) >= 0;
        }

        return true;
    },

    getDefaultBundle: function (basename, lan) {
        if (mxResources.loadDefaultBundle || !mxResources.isLanguageSupported(lan)) {
            return basename + mxResources.extension;
        }
        else {
            return null;
        }
    },

    getSpecialBundle: function (basename, lan) {
        if (mxClient.languages === null || !this.isLanguageSupported(lan)) {
            var dash = lan.indexOf('-');

            if (dash > 0) {
                lan = lan.substring(0, dash);
            }
        }

        if (mxResources.loadSpecialBundle && mxResources.isLanguageSupported(lan) && lan !== mxClient.defaultLanguage) {
            return basename + '_' + lan + mxResources.extension;
        }
        else {
            return null;
        }
    },

    add: function (basename, lan) {
        lan = (lan !== null) ? lan : mxClient.language.toLowerCase();

        if (lan !== mxConstants.NONE) {
            // Loads the common language file (no extension)
            var defaultBundle = mxResources.getDefaultBundle(basename, lan);

            if (defaultBundle !== null) {
                try {
                    var req = mxUtils.load(defaultBundle);

                    if (req.isReady()) {
                        mxResources.parse(req.getText());
                    }
                }
                catch (e) {
                    // ignore
                }
            }

            // Overlays the language specific file (_lan-extension)
            var specialBundle = mxResources.getSpecialBundle(basename, lan);

            if (specialBundle !== null) {
                try {
                    var req1 = mxUtils.load(specialBundle);

                    if (req1.isReady()) {
                        mxResources.parse(req1.getText());
                    }
                }
                catch (e) {
                    // ignore
                }
            }
        }
    },

    parse: function (text) {
        if (text !== null) {
            var lines = text.split('\n');

            for (var i = 0; i < lines.length; i++) {
                if (lines[i].charAt(0) !== '#') {
                    var index = lines[i].indexOf('=');

                    if (index > 0) {
                        var key = lines[i].substring(0, index);
                        var idx = lines[i].length;

                        if (lines[i].charCodeAt(idx - 1) === 13) {
                            idx--;
                        }

                        var value = lines[i].substring(index + 1, idx);

                        if (this.resourcesEncoded) {
                            value = value.replace(/\\(?=u[a-fA-F\d]{4})/g, "%");
                            mxResources.resources[key] = unescape(value);
                        }
                        else {
                            mxResources.resources[key] = value;
                        }
                    }
                }
            }
        }
    },

    get: function (key, params, defaultValue) {
        var value = mxResources.resources[key];

        // Applies the default value if no resource was found
        if (value === null) {
            value = defaultValue;
        }

        // Replaces the placeholders with the values in the array
        if (value !== null &&
            params !== null) {
            var result = [];
            var index = null;

            for (var i = 0; i < value.length; i++) {
                var c = value.charAt(i);

                if (c === '{') {
                    index = '';
                }
                else if (index !== null && c === '}') {
                    index = parseInt(index) - 1;

                    if (index >= 0 && index < params.length) {
                        result.push(params[index]);
                    }

                    index = null;
                }
                else if (index !== null) {
                    index += c;
                }
                else {
                    result.push(c);
                }
            }

            value = result.join('');
        }

        return value;
    }
};

module.exports = resources;
