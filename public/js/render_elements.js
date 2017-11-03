const addElement = (type, id, parentEl) => { // add an element on page
  const new_el = document.createElement(type);
  new_el.setAttribute('id', id);
  document.querySelector(`#${parentEl}`).appendChild(new_el);
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
  const empty_obj = new object();
  for (const key in object.fields) {
    empty_obj.fields[key] = document.querySelector(`#in_${key}`).value;
  }

  // delete this after
  if (document.querySelector('#in_id').value != '') {
    empty_obj._id = document.querySelector('#in_id').value;
  }

  document.querySelector('#input_form').innerHTML = 'Сохранено!';
  storage.save(empty_obj);
  reloadStorage();
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
  let counterTr = 0;
  let counterTd = 0;
  for (const key in object) {
    addElement('tr', `tr_${counterTr}_${tableName}`, `${tableName}`);
    for (const key1 in object[key].fields) {
      addElement('td', `td_${counterTd}_${tableName}`, `tr_${counterTr}_${tableName}`);
      addTextToElement(`td_${counterTd}_${tableName}`, object[key].fields[key1]);
      counterTd++;
    }
    counterTr++;
  }
};

const renderAll = () => {
  renderTableHeader('drillers_tab', 'Drillers', Driller);
  renderTable('Drillers', drillers);
  renderTableHeader('equipment_tab', 'Equipments', Equipment);
  renderTable('Equipments', equipments);
  renderTableHeader('project_tab', 'Projects', Project);
  renderTable('Projects', projects);
  renderTableHeader('operators_tab', 'Operators', Operator);
  renderTable('Operators', operators);
};

const reloadStorage = () => {
  drillers = storage.all(Driller);
  equipments = storage.all(Equipment);
  projects = storage.all(Project);
  operators = storage.all(Operator);
};

let storage = new LocalStorage();
let drillers = storage.all(Driller);
let equipments = storage.all(Equipment);
let projects = storage.all(Project);
let operators = storage.all(Operator);

renderAll();
addKeyCreateForm(Driller);
addKeyCreateForm(Equipment);
addKeyCreateForm(Project);
addKeyCreateForm(Operator);
