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

const displayForm = (obj) => { // display form on page to create new position in base 
    document.querySelector("#input_form").innerHTML = "";

    for (let key in obj[0]) {
        addElement("li", `${[key]}_li`, "input_form");
        addElement("input", [key], `${[key]}_li`);
        document.querySelector(`#${[key]}`).setAttribute("placeholder", `${obj[0][key] }`);
    }
    addElement("li", "save_li", "input_form");
    addElement("button", "save_button", "save_li");
    addTextToElement("save_button", "Save");
    document.querySelector("#save_button").addEventListener("click", () => {
        saveButton(obj);
    })
}

const addKeyCreateForm = (text, obj) => { //add adding buttons in "#buttons_add" section with options from objects

    addElement("li", `${text}_li`, "buttons_add");
    addElement("button", `${text}_button`, `${text}_li`);
    addTextToElement(`${text}_button`, `Add ${text}`);
    document.querySelector(`#${text}_button`).addEventListener("click", () => {
        displayForm(obj)
    });

}

const saveButton = (obj) => {
    let counter = 0; //find place in obj to save new position, counter return new empty position
    for (let key in obj) {
        counter++;
    }
    obj[counter] = {};

    for (let key in obj[0]) {
        obj[counter][key] = document.querySelector(`#${key}`).value;
    }

    saveLocalObj();

    addTabs(); // redraw all tabs
    document.querySelector("#input_form").innerHTML = "Сохранено!";
}

const addTabFromObj = (parentEl, objectName) => { // add tab from object in parent element, set counter for table "td" elements
    let counterEl = 0;
    let obj = JSON.parse(localStorage.getItem(objectName));
    document.querySelector(`#${parentEl}`).innerHTML = "";

    addElement("table", `table_${parentEl}`, `${parentEl}`);
    addClassToElement(`table_${parentEl}`, "table");

    for (let key in obj[0]) {
        addElement("th", `table_${parentEl}_${key}_th`, `table_${parentEl}`);
        addTextToElement(`table_${parentEl}_${key}_th`, `${obj[0][key] }`);
    }

    for (let key in obj) {
        let temp = key;
        if (temp == 0) continue;
        else {
            addElement("tr", `tr_${parentEl}_${temp}`, `table_${parentEl}`);

            for (let key in obj[temp]) {
                addElement("td", `${parentEl}_${counterEl}_td`, `tr_${parentEl}_${temp}`);
                addTextToElement(`${parentEl}_${counterEl}_td`, obj[temp][key]);
                counterEl++;
            }
        }
    }
}

const addTabs = () => {
    addTabFromObj("drillers_tab", "drillers");
    addTabFromObj("equipment_tab", "equipment");
    addTabFromObj("project_tab", "project");
    addTabFromObj("operators_tab", "operators");
}


const chekLocalObj = (nameObj) => {
    let obj = JSON.parse(localStorage.getItem(nameObj));
    if (obj == null) return false;
    else return obj;
}

const saveLocalObj = () => {
    localStorage.setItem('drillers', JSON.stringify(drillers));
    localStorage.setItem('equipment', JSON.stringify(equipment));
    localStorage.setItem('project', JSON.stringify(project));
    localStorage.setItem('operators', JSON.stringify(operators));
}




let drillers = (chekLocalObj("drillers")) ? chekLocalObj("drillers") : { 0: { name: "Название БУ", number: "Серийный номер буровой установки", } };
localStorage.setItem('drillers', JSON.stringify(drillers));

let equipment = (chekLocalObj("equipment")) ? chekLocalObj("equipment") : { 0: { name: "Тип оборудования", number: "Серийный номер" } };
localStorage.setItem('equipment', JSON.stringify(equipment));

let project = (chekLocalObj("project")) ? chekLocalObj("project") : { 0: { name: "Название объекта", address: "Адрес", fio: "ФИО ответственного лица", phone: "Контактный номер" } };
localStorage.setItem('project', JSON.stringify(project));

let operators = (chekLocalObj("operators")) ? chekLocalObj("operators") : { 0: { name: "ФИО оператора", number: "Контактный номер" } };
localStorage.setItem('operators', JSON.stringify(operators));


addTabs();


addKeyCreateForm("Driller", drillers);
addKeyCreateForm("Equip", equipment);
addKeyCreateForm("Project", project);
addKeyCreateForm("Operator", operators);