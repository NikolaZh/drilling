
const checkType = (obj, cls) => {
    if (!(obj instanceof cls)) {
        throw new TypeError(`${obj} must be an instance of ${cls}`);
    }
};

const checkIsSubclass = (a, b) => {
    if (!(a.prototype instanceof b)) {
        throw new TypeError(`${a} must be a subclass of ${b}`);
    }
};


class BaseStorage {

    all(cls) {
        checkIsSubclass(cls, Model);
    }

    save(object) {
        checkType(object, Model);
    }

    load(cls, id) {
        checkIsSubclass(cls, Model);
    }

}

