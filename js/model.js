'use strict';

class Model {

    static toIdFormat(s) {
        return s.replace(/\s+/g, '-');
    }

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

    get type(){
        return this._type;
    }

    toJSON() {
        const data = { id: this.id };
        for (let key of Object.keys(this._f)) {
            data[key] = this._f[key];
        }
        return data;
    }

}

class Driller extends Model {

    static unwrap(fields) {
        return new Driller({ name: fields.name, code: fields.code}, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);
        if (!id && (fields.code !== undefined)) {
            this.id = Model.toIdFormat(fields.code);
        };
                
    }

    get name() {
        return this.fields.name;
    }

    get code() {
        return this.fields.code;
    }

    

}












//TODO: remove this test code


/*let drillers = [
    new Driller({ name: "Буровая #1", code: "XXX-001" }),
    new Driller({ name: "Буровая #2", code: "XO XD 13" })
];
/*
const drillersData = JSON.stringify(drillers);
console.log("JSON representation:\n", drillersData);

drillers = JSON.parse(drillersData).map((fields) => {
    return Driller.unwrap(fields);
});
console.log("Unwrapped objects:\n", drillers);
*/