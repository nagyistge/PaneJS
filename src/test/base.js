class Base {
    constructor(name) {
        this.name = name;
    }

    valueOf() {
        return this.name;
    }

    toString() {
        return this.name;
    }
}

export default Base;