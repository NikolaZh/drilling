import Model from './lib/model/model';

class Driller extends Model {
    static get fields() {
        return { name: 'Название буровой', code: 'Серийный номер' };
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
}


class Equipment extends Model {
    static get fields() {
        return { name: 'Тип оборудования', code: 'Серийный номер' };
    }

    static unwrap(fields) {
        return new Equipment({ name: fields.name, code: fields.code }, fields.id);
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
}


class Project extends Model {
    static get fields() {
        return {
            name: 'Название объекта',
            address: 'Адрес',
            fio: 'ФИО ответственного лица',
            phone: 'Контактный номер',
            date1: 'Начало проекта',
            date2: 'Конец проекта',
        };
    }

    static unwrap(fields) {
        return new Project({
            name: fields.name,
            address: fields.address,
            fio: fields.fio,
            phone: fields.phone,
            date1: new Date(fields.date1),
            date2: new Date(fields.date2),
            owns: fields.owns,
        }, fields.id);
    }

    constructor(fields = { owns: [] }, id = null) {
        super(fields, id);
        this.bufferOwn = new Map();
        for (const key of this.owns) { // init map structure from array owns and save in bufferOwn
            const elOwns = key;
            if (!this.bufferOwn.has(elOwns.type)) {
                this.bufferOwn.set(elOwns.type, new Map());
                this.bufferOwn.get(elOwns.type).set(elOwns.id, elOwns);
            } else {
                this.bufferOwn.get(elOwns.type).set(elOwns.id, elOwns);
            }
        }
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

    get date1() {
        return new Date(this.fields.date1);
    }

    get date2() {
        return new Date(this.fields.date2);
    }

    get owns() {
        return this.fields.owns;
    }

    toJSON() {
        const data = { id: this.id };
        for (const key of Object.keys(this._f)) {
            data[key] = this._f[key];
        }
        return data;
    }

    bind(object, start, end) {
        const clsObj = object.constructor.name;
        const Own = {
            type: clsObj,
            id: object.id,
            dateStart: start,
            dateEnd: end,
        };
        this.owns.push(Own);
        if (!this.bufferOwn.has(clsObj)) {
            this.bufferOwn.set(clsObj, new Map());
        }
        this.bufferOwn.get(clsObj).set(object.id, Own);
        return this;
    }

    unBind(clsName, id) {
        if (this.bufferOwn.has(clsName)) {
            this.bufferOwn.get(clsName).delete(id);
        }
        const newOwns = []; // delete in array-owns note of unBind object
        this._f.owns.forEach((item, index) => {
            if (item.type === clsName && item.id === id) {
                delete this._f.owns[index];
            } else {
                newOwns.push(item);
            }
        });
        this._f.owns = newOwns;
        return this;
    }

    getBinded(object) {
        return this.bufferOwn.get(object.constructor.name);
    }
}

class Operator extends Model {
    static get fields() {
        return { name: 'ФИО оператора', phone: 'Контактный номер' };
    }

    static unwrap(fields) {
        return new Operator({ name: fields.name, phone: fields.phone }, fields.id);
    }

    constructor(fields = {}, id = null) {
        super(fields, id);
    }

    get name() {
        return this.fields.name;
    }

    get phone() {
        return this.fields.phone;
    }
}

class Scheduler {
    constructor(storage) {
        this.storage = storage;
    }

    setObjToBusy(project, object, start, end) {
        const dayS = project.date1;
        const dayE = project.date2;
        if (start > end) {
            throw new RangeError('Дата начала должна быть меньше даты конца');
        }
        if (dayS > start || dayE < end) {
            throw new RangeError('Указанные даты не входят в диапазон Project');
        }
        if (!this.checkItemFreeOnDates(object, start, end)) {
            throw new RangeError(`${object.constructor.name} занят в эти дни`);
        }
        project.bind(object, start, end);
        this.storage.save(project);
    }

    setObjToFree(project, object) {
        project.unBind(object.constructor.name, object.id);
        this.storage.save(project);
    }

    deleteObject(object) {
        const clsName = object.constructor.name;
        if (clsName === 'Project') {
            this.storage.delete(object);
        } else {
            const projectsWhereObjectOwn = this.getProjectsWhereItemOwn(object); // before delete object, we set it free
            if (projectsWhereObjectOwn) {
                for (const item of Array.from(projectsWhereObjectOwn)) {
                    this.setObjToFree(item, object);
                }
            }
            this.storage.delete(object);
        }
    }

    checkItemFreeOnDates(object, start, end) {
        const dataProjects = this.storage.all(Project);
        for (const item of dataProjects) {
            const bindedOwns = item.getBinded(object);
            if (bindedOwns && bindedOwns.has(object.id)) { // getBinded can return undefined, we check it
                const dayS = new Date(bindedOwns.get(object.id).dateStart);
                const dayE = new Date(bindedOwns.get(object.id).dateEnd);
                const startInRange = ((dayS < start) && (dayE > start));
                const endInRange = ((dayS < end) && (dayE > end));
                const startEndIncludeRange = ((start < dayS) && (end > dayS));
                if (startInRange || endInRange || startEndIncludeRange) {
                    return false;
                }
            }
        }
        return true;
    }

    getOwnsItems(project, ModelObject) {
        const dataOwns = project.getBinded(new ModelObject());
        const dataItems = [];
        if (dataOwns) {
            dataOwns.forEach((el) => {
                const itemWithDates = {};
                itemWithDates.item = this.storage.load(ModelObject, el.id);
                itemWithDates.dateStart = el.dateStart;
                itemWithDates.dateEnd = el.dateEnd;
                dataItems.push(itemWithDates);
            });
        }
        return dataItems;
    }

    getAllOwns(project) {
        const models = [Driller, Operator, Equipment];
        let ownsData = [];
        models.forEach((el) => {
            ownsData = [...ownsData, ...this.getOwnsItems(project, el)];
        });
        return ownsData;
    }

    getProjectsWhereItemOwn(object) {
        const objectId = object.id;
        const data = [];
        const dataProjects = Array.from(this.storage.all(Project));
        for (const item of dataProjects) {
            if (item) { // check possible hole after delete object
                const binded = item.getBinded(object);
                if (binded) {
                    binded.forEach((el) => {
                        if (el.id === objectId) {
                            data.push(item);
                        }
                    });
                }
            }
        }
        if (data.length !== 0) {
            return data;
        }
        return undefined;
    }
}

export { Driller, Operator, Equipment, Project, Scheduler };