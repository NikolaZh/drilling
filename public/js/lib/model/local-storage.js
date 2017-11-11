class LocalStorage extends BaseStorage {
    all(cls) {
        super.all(cls);
        const storageName = cls.prototype.constructor.name;
        let unwrapObj = this.loadBuffer(storageName);
        if (unwrapObj == false) { // check buffer, if is not exist - checl local storage
            const wrapObj = localStorage.getItem(storageName);
            if (wrapObj === null) { // check our object in storage browser
                return unwrapObj;
            }
            unwrapObj = JSON.parse(wrapObj).map(fields => cls.prototype.constructor.unwrap(fields));
            this.saveBuffer(unwrapObj, storageName);
        }
        return unwrapObj;
    }

    save(object) {
        super.save(object);
        const storageName = object.constructor.name;
        let data = localStorage.getItem(storageName);
        const newAppropId = (object._id != null) ? false : this.increaseId(object);
        if (data) {
            data = JSON.parse(data).map(fields => object.constructor.unwrap(fields));
        }
        if (data && newAppropId) { // storage and newID exist => just add new object
            object._id = newAppropId;
            data.push(object);
        } else if (data) { // storage exist, but newID false (object is old) = looking for obj with same id in storage and replace
            for (const key in data) {
                if (data[key]._id == object._id) {
                    for (const key1 in data[key]._f) {
                        data[key]._f[key1] = object._f[key1];
                    }
                }
            }
        } else { // no storage, just add object
            object._id = newAppropId;
            data = [object];
        }
        this.saveBuffer(data, storageName);
        localStorage.setItem(storageName, JSON.stringify(data));
        return object._id;
    }

    load(cls, id) {
        super.load(cls, id);
        const storageName = cls.prototype.constructor.name;
        return this.loadBuffer(storageName, id);
    }

    increaseId(object) {
        const objType = object.constructor.name;
        if (localStorage.getItem(`${objType}_ids`) === null) {
            localStorage.setItem(`${objType}_ids`, 1);
            return 1;
        }
        let lastId = parseInt(localStorage.getItem(`${objType}_ids`));
        lastId++;
        localStorage.setItem(`${objType}_ids`, lastId);
        return lastId;
    }

    static buffer() {}

    saveBuffer(arr, clsName) {
        let key;
        if (this.buffer === undefined) { // check buffer exist
            this.buffer = [];
        }
        for (let i = 0; i < arr.length; i++) {
            key = this.hashKey(clsName + arr[i]._id);
            this.buffer[key] = arr[i];
        }
    }

    loadBuffer(clsName, id) { // if id not specified, function return all objects with same class
        let data = [];
        if (this.buffer === undefined) {
            return false;
        } else if (id === undefined) {
            for (const key in this.buffer) {
                if (this.buffer[key].constructor.name == clsName) {
                    data.push(this.buffer[key]);
                }
            }
        } else {
            const key = clsName + id;
            data = this.buffer[this.hashKey(key)];
        }
        return data;
    }

    hashKey(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += ((hash << 4) - hash) + key.charCodeAt(i);
        }
        return hash;
    }
}
