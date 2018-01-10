const addElement = (type, id, parentEl) => { // add an element on page
    const newEl = document.createElement(type);
    newEl.setAttribute('id', id);
    document.querySelector(`#${parentEl}`).appendChild(newEl);
};

const addClassToElement = (id, className) => {
    document.querySelector(`#${id}`).className = className;
};

const addTextToElement = (id, text) => {
    document.querySelector(`#${id}`).textContent = text;
};

const displayForm = (object) => { // display form on page to create new position in base
    document.querySelector('#input_form').innerHTML = '';
    for (const key in object.fields) {
        addElement('li', `li_${key}`, 'input_form');
        addElement('input', `in_${key}`, `li_${key}`);
        document.querySelector(`#in_${key}`).setAttribute('placeholder', `${object.fields[key]}`);

        if (key === 'date1' || key === 'date2') {
            document.querySelector(`#in_${key}`).setAttribute('type', 'date');
        }
    }

    // delete this after
    addElement('li', 'li_id', 'input_form');
    addElement('input', 'in_id', 'li_id');
    document.querySelector('#in_id').setAttribute('placeholder', 'id(optional to check save edited)');

    addElement('li', 'save_li', 'input_form');
    addElement('button', 'save_button', 'save_li');
    addTextToElement('save_button', 'Save');
    document.querySelector('#save_button').addEventListener('click', () => {
        saveButton(object);
        renderAll();
    });
};

const addKeyCreateForm = (object) => { // add adding buttons in "#buttons_add" section with
    const text = object.name;
    addElement('li', `${text}_li`, 'buttons_add');
    addElement('button', `${text}_button`, `${text}_li`);
    addTextToElement(`${text}_button`, `Add ${text}`);
    document.querySelector(`#${text}_button`).addEventListener('click', () => {
        displayForm(object);
    });
};

const saveButton = (object) => {
    const emptyObj = new object();
    for (const key in object.fields) {
        emptyObj.fields[key] = document.querySelector(`#in_${key}`).value;
    }

    // delete this after
    if (document.querySelector('#in_id').value != '') {
        emptyObj._id = +document.querySelector('#in_id').value;
    }

    document.querySelector('#input_form').innerHTML = 'Сохранено!';
    storage.save(emptyObj);
    renderAll();
};

const renderTableHeader = (parentEl, tableName, object) => {
    document.querySelector(`#${parentEl}`).innerHTML = '';
    addElement('table', `${tableName}`, `${parentEl}`);
    addClassToElement(`${tableName}`, 'table');
    for (const key in object.fields) {
        addElement('th', `th${key}${tableName}`, `${tableName}`);
        addTextToElement(`th${key}${tableName}`, `${object.fields[key]}`);
    }
};

const renderTable = (tableName, object) => {
    if (object) {
        let counterTr = 0;
        let counterTd = 0;
        object.forEach((el) => {
            addElement('tr', `tr_${counterTr}_${tableName}`, `${tableName}`);
            for (const key in el.fields) {
                addElement('td', `td_${counterTd}_${tableName}`, `tr_${counterTr}_${tableName}`);
                addTextToElement(`td_${counterTd}_${tableName}`, el.fields[key]);
                counterTd++;
            }
            counterTr++;
        });
    }
};

const renderTableForProjects = (tableName, object, options) => {
    let counterTr = 0;
    let counterTd = 0;
    object.forEach((el) => {
        Object.defineProperty(el._f, 'owns', {
            enumerable: false,
        });
        return el;
    });
    object.forEach((el) => {
        addElement('tr', `tr_${counterTr}_${tableName}`, `${tableName}`);
        for (const key in el.fields) {
            addElement('td', `td_${counterTd}_${tableName}`, `tr_${counterTr}_${tableName}`);
            if (key === 'date1' || key === 'date2') {
                addTextToElement(`td_${counterTd}_${tableName}`, (new Date(el.fields[key])).toLocaleString('ru', options));
            } else {
                addTextToElement(`td_${counterTd}_${tableName}`, el.fields[key]);
            }
            counterTd++;
        }
        counterTr++;
        addElement('tr', `tr_${counterTr}_${tableName}`, `${tableName}`);
        renderOwnsTable(`tr_${counterTr}_${tableName}`, el);
        counterTr++;
    });
};

const renderOwnsTable = (tableName, object) => {
    let counterTr = 0;
    let counterTd = 0;
    if (object._f.owns[0]) {
        addElement('table', `owns_${tableName}`, `${tableName}`);
        addClassToElement(`owns_${tableName}`, 'table');
        addElement('tr', `tr_owns_${tableName}`, `owns_${tableName}`);
        addTextToElement(`tr_owns_${tableName}`, 'Заняты на проекте:');
        counterTr++;
        for (const key in object._f.owns) {
            addElement('tr', `tr_owns_${tableName}_${counterTr}`, `owns_${tableName}`);
            for (const key1 in object._f.owns[key]) {
                addElement('td', `td_${counterTd}_tr_owns_${tableName}`, `tr_owns_${tableName}_${counterTr}`);
                if (key1 === 'dateStart' || key1 === 'dateEnd') {
                    addTextToElement(`td_${counterTd}_tr_owns_${tableName}`, (new Date(object._f.owns[key][key1])).toLocaleString('ru', options));
                } else {
                    addTextToElement(`td_${counterTd}_tr_owns_${tableName}`, object._f.owns[key][key1]);
                }
                counterTd++;
            }
            counterTr++;
        }
    }
};

const formForOwn = () => {
    if (projects) {
        document.querySelector('#input_projects').setAttribute('min', '1');
        document.querySelector('#input_projects').setAttribute('max', `${projects.size}`);
    } else {
        document.querySelector('#input_projects').setAttribute('min', '0');
        document.querySelector('#input_projects').setAttribute('max', `${projects.size}`);
    }
    const li_own = ['li_own1', 'li_own2', 'li_own3'];
    for (const key in li_own) {
        document.querySelector(`#${li_own[key]}`).setAttribute('onclick', 'radioChecked()');
    }
};

const radioChecked = () => {
    const radioValue = ['rad1', 'rad2', 'rad3'];
    let keyChecked;
    for (const key in radioValue) {
        if (document.getElementsByName('own')[key].checked) {
            keyChecked = radioValue[key];
            break;
        }
    }
    let data;
    switch (keyChecked) {
        case 'rad1':
            data = drillers;
            nameOwn = 'Driller';
            break;
        case 'rad2':
            data = operators;
            nameOwn = 'Operator';
            break;
        case 'rad3':
            data = equipments;
            nameOwn = 'Equipment';
            break;
    }
    if (data) {
        document.querySelector('#input_own').innerHTML = nameOwn;
        resetOwnForm();
        addElement('input', 'input_own_id', 'input_own_idlist');
        document.querySelector('#input_own_id').setAttribute('type', 'number');
        document.querySelector('#input_own_id').setAttribute('min', '1');
        document.querySelector('#input_own_id').setAttribute('max', `${data.size}`);
        addElement('input', 'own_date1', 'input_own_date1');
        document.querySelector('#own_date1').setAttribute('type', 'date');
        addElement('input', 'own_date2', 'input_own_date2');
        document.querySelector('#own_date2').setAttribute('type', 'date');
        addElement('button', 'send_own_button', 'send_own_button_li');
        addTextToElement('send_own_button', `Send ${nameOwn}`);
        document.querySelector('#send_own_button').setAttribute('onclick', 'sendOwnButton(nameOwn)');
    } else {
        document.querySelector('#input_own').innerHTML = `Нет ни одного ${nameOwn}`;
        resetOwnForm();
    }
};

const resetOwnForm = () => {
    document.querySelector('#input_own_idlist').innerHTML = '';
    document.querySelector('#input_own_date1').innerHTML = '';
    document.querySelector('#input_own_date2').innerHTML = '';
    document.querySelector('#send_own_button_li').innerHTML = '';
};

const sendOwnButton = (nameOwn) => {
    const projectId = +document.querySelector('#input_projects').value;
    const objectId = +document.querySelector('#input_own_id').value;
    const dateStart = document.querySelector('#own_date1').value;
    const dateEnd = document.querySelector('#own_date2').value;
    if (!projectId) {
        document.querySelector('#input_own').innerHTML = 'Вы не указали id Project!';
    } else if (!objectId) {
        document.querySelector('#input_own').innerHTML = `Вы не указали id ${nameOwn}!`;
    } else if (!dateStart || !dateEnd) {
        document.querySelector('#input_own').innerHTML = 'Вы указали некоректные даты занятости';
    } else {
        const projectChecked = storage.load(Project, projectId);
        let objectChecked = {};
        switch (nameOwn) {
            case 'Driller':
                objectChecked = storage.load(Driller, objectId);
                break;
            case 'Operator':
                objectChecked = storage.load(Operator, objectId);
                break;
            case 'Equipment':
                objectChecked = storage.load(Equipment, objectId);
                break;
        }
        resetOwnForm();
        try {
            scheduler.setObjToBusy(projectChecked, objectChecked, new Date(dateStart), new Date(dateEnd));
            document.querySelector('#input_form').innerHTML = `${nameOwn} successfull added`;
        } catch (e) {
            document.querySelector('#input_form').innerHTML = e;
        }
        renderAll();
    }
};

let nameOwn;

const options = {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
};

const renderAll = () => {
    renderTableHeader('drillers_tab', 'Drillers', Driller);
    renderTable('Drillers', drillers);
    renderTableHeader('equipment_tab', 'Equipments', Equipment);
    renderTable('Equipments', equipments);
    renderTableHeader('operators_tab', 'Operators', Operator);
    renderTable('Operators', operators);
    renderTableHeader('project_tab', 'Projects', Project);
    renderTableForProjects('Projects', projects, options);
    formForOwn();
};

let storage = new StorageBuffer();
if (!storage.all(Driller).length) {
    storage.buffer.set('Driller', new Map());
}
if (!storage.all(Equipment).length) {
    storage.buffer.set('Equipment', new Map());
}
if (!storage.all(Operator).length) {
    storage.buffer.set('Operator', new Map());
}
if (!storage.all(Project).length) {
    storage.buffer.set('Project', new Map());
}
const scheduler = new Scheduler(storage);
const drillers = storage.buffer.get('Driller');
const equipments = storage.buffer.get('Equipment');
const projects = storage.buffer.get('Project');
const operators = storage.buffer.get('Operator');
renderAll();
addKeyCreateForm(Driller);
addKeyCreateForm(Equipment);
addKeyCreateForm(Project);
addKeyCreateForm(Operator);
