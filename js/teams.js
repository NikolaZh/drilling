'use strict';


const addElement = (type, id, parentEl) => { //add an element on page
    let new_el = document.createElement(type);
    new_el.setAttribute("id", id);
    document.querySelector(`#${parentEl}`).appendChild(new_el);

};

const addClassToElement = (id, className) => {
    document.querySelector(`#${id}`).className = className;
};

const addTextToElement = (id, text) => {
    document.querySelector(`#${id}`).textContent = text;
};

const displayForm = (arr, type) => { // display form on page to create new position in base 
    document.querySelector("#input_form").innerHTML = "";

    for (let i in arr) {
        addElement("li", `li_${i}`, "input_form");
        addElement("input", `in_${i}`, `li_${i}`);
        document.querySelector(`#in_${i}`).setAttribute("placeholder", `${arr[i]}`);
    }

    addElement("li", "save_li", "input_form");
    addElement("button", "save_button", "save_li");
    addTextToElement("save_button", "Save");

    document.querySelector("#save_button").addEventListener("click", () => {
        saveButton(type);
        renderAll();
    })
};

const addKeyCreateForm = (tagsArr, type) => { //add adding buttons in "#buttons_add" section with 
    let text = type.slice(0,-1); 

    addElement("li", `${text}_li`, "buttons_add");
    addElement("button", `${text}_button`, `${text}_li`);
    addTextToElement(`${text}_button`, `Add ${text}`);
    document.querySelector(`#${text}_button`).addEventListener("click", () => {

        displayForm(tagsArr, type);
    });

};

const saveButton = (type) => {
    let obj = storage.newEmptyObj(type); //return type of new Class which saveButton create in storage
    let i = 0;


    for (let key in obj["fields"]) {
        obj["fields"][key] = document.querySelector(`#in_${i}`).value;
        i++;
    }

    document.querySelector("#input_form").innerHTML = "Сохранено!";
    storage.save(obj);
    reloadStorage();
};

const renderTableHeader = (parentEl, tableName, arr) => {

    document.querySelector(`#${parentEl}`).innerHTML = "";

    addElement("table", `${tableName}`, `${parentEl}`);
    addClassToElement(`${tableName}`, "table");

    for (let i in arr) {
        addElement("th", `th${i}${tableName}`, `${tableName}`);
        addTextToElement(`th${i}${tableName}`, `${arr[i]}`);
    }

};

const renderTable = (tableName, object) => {
    let counterTr = 0;
    let counterTd = 0;

    for (let key in object) {

        addElement("tr", `tr_${counterTr}_${tableName}`, `${tableName}`);

        for (let key1 in object[key]["fields"]) {
            addElement("td", `td_${counterTd}_${tableName}`, `tr_${counterTr}_${tableName}`);
            addTextToElement(`td_${counterTd}_${tableName}`, object[key]["fields"][key1]);

            counterTd++;
        }
        counterTr++;
    }
};


const renderAll = () => {
    renderTableHeader("drillers_tab", "Drillers", TAGS_DRILLERS);
    renderTable("Drillers", drillers);


    renderTableHeader("equipment_tab", "Equipments", TAGS_EQUIPMENTS);
    renderTable("Equipments", equipments);


    renderTableHeader("project_tab", "Projects", TAGS_PROJECTS);
    renderTable("Projects", projects);

    renderTableHeader("operators_tab", "Operators", TAGS_OPERATORS);
    renderTable("Operators", operators);

};


const reloadStorage = () => {
    drillers = storage.loadByType(NAME_DRILLERS_STORAGE);
    equipments = storage.loadByType(NAME_EQUIPMENTS_STORAGE);
    projects = storage.loadByType(NAME_PROJECTS_STORAGE);
    operators = storage.loadByType(NAME_OPERATORS_STORAGE);
}





let storage = new SaveLoadStorage;

let drillers = storage.loadByType(NAME_DRILLERS_STORAGE);
let equipments = storage.loadByType(NAME_EQUIPMENTS_STORAGE);
let projects = storage.loadByType(NAME_PROJECTS_STORAGE);
let operators = storage.loadByType(NAME_OPERATORS_STORAGE);


renderAll();
addKeyCreateForm(TAGS_DRILLERS, NAME_DRILLERS_STORAGE);
addKeyCreateForm(TAGS_EQUIPMENTS, NAME_EQUIPMENTS_STORAGE);
addKeyCreateForm(TAGS_PROJECTS, NAME_PROJECTS_STORAGE);
addKeyCreateForm(TAGS_OPERATORS, NAME_OPERATORS_STORAGE);
