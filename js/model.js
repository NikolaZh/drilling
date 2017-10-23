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
        return new Driller({ name: fields.name, code: fields.code }, fields.id);
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

class Equipment extends Model {

    static unwrap(fields) {
        return new Equipment({ type: fields.type, code: fields.code }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);
        if (!id && (fields.code !== undefined)) {
            this.id = Model.toIdFormat(fields.code);
        };

    }

    get type() {
        return this.fields.type;
    }

    get code() {
        return this.fields.code;
    }

}










class LocalStorage {

    static objFromLS(object) { // return unwrap obj (finded by class input obj) from storage, if obj does not exist - return false.
        let typeObj = object.constructor["name"] + "s";

        const objectData = localStorage.getItem(typeObj);

        if (String(objectData) == "null") { // check our object in storage browser. Can we do it better?
            console.log("vozvrat false")
            return false
        };

        let unwrapObj = JSON.parse(objectData).map((fields) => {
            return object.constructor.unwrap(fields);
        });

        return unwrapObj;
    };

    static objLoadFromLS(nameArrOfObj) { //load arr of objects by type.
        const objectData = localStorage.getItem(nameArrOfObj);
        let object;

        if (String(objectData) == "null") { // check our object in storage browser. Can we do it better?
            return false;
        };

        switch (nameArrOfObj) {
            case "Drillers":
                object = new Driller;
                break;

            case "Equipments":
                object = new Equipment;
                break;


            default:
                console.log("Error, no arr with this type of obj");
        }

        let unwrapObj = JSON.parse(objectData).map((fields) => {
            return object.constructor.unwrap(fields);
        });

        return unwrapObj;
    };

    static getNewID(object) {
        let data = this.objFromLS(object);
        let idname = object.constructor["name"] + "#";
        let newid = idname + ((Math.random()) + "").slice(-6);

        if (data) {

            let arr = [];
            let switcher = 1;

            for (let key in data) { arr.push(data[key]._id) }; //create array id-s

            do {
                switcher = 0;

                for (let i = 0; i < arr.length; i++) {
                    if (newid == arr[i]) {
                        newid = idname + ((Math.random()) + "").slice(-6);;
                        switcher++;
                    }
                }

            } while (switcher != 0);

            return newid;


        } else {
            object._id = idname + ((Math.random()) + "").slice(-6);;
            return newid;
        }


    };




};

class SaveLoadStorage extends LocalStorage {
    // save new object to localstorage, with new unic generated id.
    save(object) {
        object._id = LocalStorage.getNewID(object);
        let data = LocalStorage.objFromLS(object);

        if (data) {
            data.push(object);
            console.log(data);
        } else data = [object];

        console.log(data);

        const jsonData = JSON.stringify(data);

        localStorage.setItem(object.constructor["name"] + "s", jsonData);
    }

    saveEditedObj(object) { //overwrite obj in storage with same id 
        let data = LocalStorage.objFromLS(object);

        console.log(data);

        for (let key in data) {
            if (data[key]._id == object._id) {
                for (let key1 in data[key]._f) {
                    data[key]._f[key1] = object._f[key1];
                }
            }
        }

        console.log(data);

        const jsonData = JSON.stringify(data);

        localStorage.setItem(object.constructor["name"] + "s", jsonData);


    }

    loadById(id) {
        let id = LocalStorage.getNewID(object);
        console.log("poluchili id: ", id);
    }

    loadByType(nameArrOfObj) {
        let loadObj = LocalStorage.objLoadFromLS(nameArrOfObj);
        return loadObj;
    }

    newEmptyObj(type) { //return new empty obj by requested type
        switch (type) {
            case 'driller':
                return (new Driller({ name: "", code: "" }));

            case 'equipment':
                return (new Equipment({ type: "", code: "" }));


            default:
                console.log("error!")
        }
    };


}


/*

let drillers = [
    new Driller({ name: "Буровая #1", code: "XXX-001" }),
    new Driller({ name: "Буровая #2", code: "XO XD 13" })
];



const drillersData = JSON.stringify(drillers);
console.log("JSON representation:\n", drillersData);

localStorage.setItem("Drillers", drillersData);

const back_drillersData = localStorage.getItem("Drillers");
console.log("vernuli s local storage: ", back_drillersData)

drillers = JSON.parse(back_drillersData).map((fields) => {
    return Driller.unwrap(fields);
});
console.log("Unwrapped objects:\n", drillers);*/