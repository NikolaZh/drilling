class Buffer extends LocalStorage {
    constructor() {
        super();
        this.buffer = new Map();
    }

    all(cls) {
        const data = [];
        const clsName = cls.prototype.constructor.name;
        if (this.buffer.has(clsName)) { // check buffer
            this.buffer.get(clsName).forEach((item) => {
                data.push(item);
            });
            return data;
        } else if (super.all(cls)) { // here we call super.all twice, it sad :(
            super.all(cls).map((x) => { // if buffer empty - load from local storage
                data.push(x);
                return this._saveToBuffer(x);
            });
            return data;
        }
        return null;
    }

    save(object) {
        this.all(object.constructor); // protection of case then save init before load storage
        super.save(object);
        this._saveToBuffer(object);
        return object._id;
    }

    load(cls, id) {
        let data = [];
        const clsName = cls.prototype.constructor.name;
        if (!this.buffer.has(clsName)) { // protection of case then load init before load storage
            this.all(cls);
        }
        if (!this.buffer.has(clsName)) { return null; }
        data = this.buffer.get(clsName).get(+id);
        data = (!data) ? null : data;
        return data;
    }

    _saveToBuffer(object) {
        const className = object.constructor.name;
        if (!this.buffer.has(className)) {
            this.buffer.set(className, new Map());
        }
        this.buffer.get(className).set(object._id, object);
    }
}
