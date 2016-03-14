// Abstract class for all changes
class Change {

    /*
     constructor() {
        if (new.target === Change) {
            throw new Error('`Change` is an abstract class that cannot be instantiated.');
        }
     }
     */

    digest() { return this; }
}


// exports
// -------

export default Change;
