class LocalStorage extends BaseStorage {

    constructor() {
        super();
        let lastId = localStorage.getItem("ids");

        if (lastId === null) {                                     //check lastID exist, if not - set empty
            lastId = { "Driller": -1, "Equipment": -1, "Project": -1, "Operator": -1 };

            localStorage.setItem("ids", JSON.stringify(lastId));
        }

    }

    all(cls) {
        super.all(cls);
        let storage_name = cls.prototype.constructor.name;

        const wrapObj = localStorage.getItem(storage_name);

        if (wrapObj === null) { // check our object in storage browser
            return false
        };

        let unwrapObj = JSON.parse(wrapObj).map((fields) => {
            return cls.prototype.constructor.unwrap(fields);
        });

        return unwrapObj;
    }

    save(object) {
        super.save(object);
        let storage_name = object.constructor.name;

        let data = localStorage.getItem(storage_name);
        let newAppropId = this.increase_id(object);

        if (data) {
            data = JSON.parse(data).map((fields) => {
                return object.constructor.unwrap(fields);
            });
        };

        if (data && newAppropId) { //storage and newID exist => just add new object
            object._id = newAppropId;
            data.push(object);

        } else if (data) { //storage exist, but newID false (object is old) => looking for object with same id in storage and replace

            for (let key in data) {
                if (data[key]._id == object._id) {

                    for (let key1 in data[key]._f) {
                        data[key]._f[key1] = object._f[key1];
                    }
                }
            }

        } else { // no storage, just add object
            object._id = newAppropId;
            data = [object];
        }

        localStorage.setItem(storage_name, JSON.stringify(data));

        return object._id;
    }

    load(cls, id) {
        super.load(cls, id);
        let data = this.all(cls);

        if (data) {
            for (let key in data) {
                if (data[key]._id == id) { return data[key]; }
            }
        } else return false;

    }



    increase_id(object) {
        if (object._id != null) return false; //id exist = object old

        let lastId = JSON.parse(localStorage.getItem("ids"));
        let newAppropId = 0;

        for (let key in lastId) {

            if (object.constructor.name == key) {
                lastId[key]++;
                newAppropId = lastId[key];
                break;
            }

        }

        localStorage.setItem("ids", JSON.stringify(lastId));

        return newAppropId;
    }

}
