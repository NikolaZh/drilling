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
        return { type: 'Тип оборудования', code: 'Серийный номер' };
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
}

class Operator extends Model {
    static get fields() {
        return { fio: 'ФИО оператора', phone: 'Контактный номер' };
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
}
