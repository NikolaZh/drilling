import LocalStorage from './local-storage';

class StorageBuffer extends LocalStorage {
    constructor() {
        super();
        this.buffer = new Map();
    }

    all(cls) {
        const clsName = cls.prototype.constructor.name;
        if (this.buffer.has(clsName)) { // check buffer
            return this.buffer.get(clsName).values();
        }
        return super.all(cls).map((x) => { // if buffer empty - load from local storage
            this._saveToBuffer(x);
            return x;
        });
    }

    save(object) {
        super.save(object);
        this._saveToBuffer(object);
        return object._id;
    }

    load(cls, id) {
        const clsName = cls.prototype.constructor.name;
        if (!this.buffer.has(clsName)) { // protection of case then load init before load storage
            this.all(cls);
        }
        if (!this.buffer.has(clsName)) {
            return null;
        }
        return this.buffer.get(clsName).get(+id) || null;
    }

    delete(object) {
        super.delete(object);
        const className = object.constructor.name;
        if (this.buffer.has(className)) {
            this.buffer.get(className).delete(object._id);
        }
    }

    _saveToBuffer(object) {
        if (!object) return null; // protection of holes after delete objects
        const className = object.constructor.name;
        if (!this.buffer.has(className)) {
            this.buffer.set(className, new Map());
        }
        this.buffer.get(className).set(object._id, object);
    }
}

export default StorageBuffer;
