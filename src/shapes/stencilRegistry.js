
var stencilRegistry = {
    /**
     * Class: StencilRegistry
     *
     * A singleton class that provides a registry for stencils and the methods
     * for painting those stencils onto a canvas or into a DOM.
     */
    stencils: [],

    /**
     * Function: addStencil
     *
     * Adds the given <Stencil>.
     */
    addStencil: function (name, stencil) {
        StencilRegistry.stencils[name] = stencil;
    },

    /**
     * Function: getStencil
     *
     * Returns the <Stencil> for the given name.
     */
    getStencil: function (name) {
        return stencilRegistry.stencils[name];
    }
};

module.exports = stencilRegistry;

