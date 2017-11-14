class Buffer extends LocalStorage {
    constructor(all, save, buffer = new Map()) {
        super(all, save);
        this.buffer = buffer;
    }

    allBuf(cls) {
        const data = [];
        const clsName = cls.prototype.constructor.name;
        if (this.buffer.has(clsName)) { // check buffer
            this.buffer.get(clsName).forEach((item) => {
                data.push(item);
            });
        } else if (super.all(cls) !== false) { // here we call super.all twice, it sad :(
            super.all(cls).map((x) => { // if buffer empty - load from local storage
                data.push(x);
                return this._saveToBuffer(x);
            });
        }
        return data;
    }

    saveBuf(object) {
        this.allBuf(object.constructor); // protection of case then save init before load storage
        super.save(object);
        this._saveToBuffer(object);
        return object._id;
    }

    loadBuf(cls, id) {
        let data = [];
        const clsName = cls.prototype.constructor.name;
        if (this.buffer.has(clsName) === false) { this.allBuf(cls); }
        data = this.buffer.get(clsName).get(id);
        return data;
    }

    _saveToBuffer(object) {
        const className = object.constructor.name;
        if (this.buffer.has(className) === false) {
            this.buffer.set(className, new Map());
        }
        this.buffer.get(className).set(object._id, object);
    }
}
