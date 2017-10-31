'use strict';

class Model {

    constructor(fields = {}, id = null) {
        this._id = id;
        this._f = fields;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get fields() {
        return this._f;
    }

    toJSON() {
        const data = { id: this.id };
        for (let key of Object.keys(this._f)) {
            data[key] = this._f[key];
        }
        return data;
    }

};

class Driller extends Model {

    static get fields() {
        return { "name": "Название буровой", "code": "Серийный номер" };
    }

    static unwrap(fields) {
        return new Driller({ name: fields.name, code: fields.code }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);

    }

    get name() {
        return this.fields.name;
    }

    get code() {
        return this.fields.code;
    }

};


class Equipment extends Model {

    static get fields() {
        return { "type": "Тип оборудования", "code": "Серийный номер" };
    }

    static unwrap(fields) {
        return new Equipment({ type: fields.type, code: fields.code }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);

    }

    get type() {
        return this.fields.type;
    }

    get code() {
        return this.fields.code;
    }

};


class Project extends Model {

    static get fields() {
        return { "name": "Название объекта", "address": "Адрес", "fio": "ФИО ответственного лица", "phone": "Контактный номер" };
    }

    static unwrap(fields) {
        return new Project({ name: fields.name, address: fields.address, fio: fields.fio, phone: fields.phone }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);

    }

    get name() {
        return this.fields.name;
    }

    get address() {
        return this.fields.address;
    }

    get fio() {
        return this.fields.fio;
    }

    get phone() {
        return this.fields.phone;
    }

};


class Operator extends Model {

    static get fields() {
        return { "fio": "ФИО оператора", "phone": "Контактный номер" };
    }

    static unwrap(fields) {
        return new Operator({ fio: fields.fio, phone: fields.phone }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);

    }

    get name() {
        return this.fields.fio;
    }

    get phone() {
        return this.fields.phone;
    }

};




class BaseStorage {

    all(cls) {
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
        let storage_name = object.constructor.name;

        let data = localStorage.getItem(storage_name);
        let newAppropId = this._increase_id(object);

        if (data) {
            data = JSON.parse(data).map((fields) => {
                return object.constructor.unwrap(fields);
            });
        };

        if (data && newAppropId) {
            object._id = newAppropId;
            data.push(object);

        } else if (data) {

            for (let key in data) {
                if (data[key]._id == object._id) {

                    for (let key1 in data[key]._f) {
                        data[key]._f[key1] = object._f[key1];
                    }
                }
            }

        } else {
            object._id = newAppropId;
            data = [object];
        }

        data = JSON.stringify(data);
        localStorage.setItem(storage_name, data);

        return object._id;
    }

    load(cls, id) {
        let data = this.all(cls);
        let callObj;

        if (data) {
            for (let key in data) {
                if (data[key]._id == id) { return data[key]; }
            }
        } else return false;

    }



    _increase_id(object) {
        if (object._id != null) return false;

        let lastId = localStorage.getItem("ids");
        let newAppropId = 0;

        if (lastId === null) { // where to transfer it for auto-init at startup?
            lastId = { "Driller": -1, "Equipment": -1, "Project": -1, "Operator": -1 };
        } else { lastId = JSON.parse(lastId) };


        for (let key in lastId) {

            if (object.constructor.name == key) {
                lastId[key]++;
                newAppropId = lastId[key];
                break;
            }

        }

        lastId = JSON.stringify(lastId);

        localStorage.setItem("ids", lastId);

        return newAppropId;
    }

};

class LocalStorage extends BaseStorage {


};