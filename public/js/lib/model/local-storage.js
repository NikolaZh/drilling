class LocalStorage extends BaseStorage {
    all(cls) {
        super.all(cls);
        const storageName = cls.prototype.constructor.name;
        let wrapObj = localStorage.getItem(storageName);
        if (!wrapObj) {
            wrapObj = [];
            return wrapObj;
        } // check our object in storage browser
        const unwrapObj = JSON.parse(wrapObj).map(fields => cls.unwrap(fields));
        return unwrapObj;
    }

    save(object) {
        super.save(object);
        let isNewObj = false;
        const storageName = object.constructor.name;
        let data = localStorage.getItem(storageName);
        if (data) {
            data = JSON.parse(data).map(fields => object.constructor.unwrap(fields));
        }
        if (!object._id) { // check object old or new (if new add id)
            object._id = this._increaseId(object);
            isNewObj = true;
        }
        if (data && isNewObj) { // storage and newID exist => just add new object
            data.push(object);
        } else if (data) { // storage exist, but object is old = looking for obj with same id in storage and replace
            for (const key in data) {
                if (data[key]._id === object._id) {
                    for (const key1 in data[key]._f) {
                        data[key]._f[key1] = object._f[key1];
                    }
                }
            }
        } else { // no storage, just add object
            data = [object];
        }
        localStorage.setItem(storageName, JSON.stringify(data));
        return object._id;
    }

    load(cls, id) {
        super.load(cls, id);
        const data = this.all(cls);
        if (data) {
            for (const key in data) {
                if (data[key]._id === +id) { return data[key]; }
            }
        }
        return null;
    }

    _increaseId(object) {
        const objType = object.constructor.name;
        if (!localStorage.getItem(`${objType}_ids`)) {
            localStorage.setItem(`${objType}_ids`, 1);
            return 1;
        }
        let lastId = parseInt(localStorage.getItem(`${objType}_ids`));
        lastId++;
        localStorage.setItem(`${objType}_ids`, lastId);
        return lastId;
    }
}
