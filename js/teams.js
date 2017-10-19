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



/////////////////////////////////////////////////////////////////////////////
const displayForm = (arr, text, objectName) => { // display form on page to create new position in base 
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
        objectName.push(saveButton(arr, text));
        renderAll();
    })
};


const saveButton = (arr, text) => {
    let obj = typeAddPos(text); //return type of new Class which saveButton create in storage
    let i = 0;


    for (let key in obj["fields"]) {
        obj["fields"][key] = document.querySelector(`#in_${i}`).value;
        i++;
    }

    document.querySelector("#input_form").innerHTML = "Сохранено!";
    return obj;

};

const typeAddPos = (text) => {
    switch (text) {
        case 'driller':
            return (new Driller({ name: "", code: "" }));

        case 'value2':

        default:
            console.log("error!")
    }
};



const renderTableHeader = (parentEl, tableName, arr) => {

    document.querySelector(`#${parentEl}`).innerHTML = "";

    addElement("table", `${tableName}`, `${parentEl}`);
    addClassToElement(`${tableName}`, "table");

    for (let i in arr) {
        addElement("th", `th${i}`, `${tableName}`);
        addTextToElement(`th${i}`, `${arr[i]}`);
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
    renderTableHeader("drillers_tab", "Drillers", tagsDrillers);
    renderTable("Drillers", drillers);
};

const addKeyCreateForm = (tagsArr, text, obj) => { //add adding buttons in "#buttons_add" section with options from objects

    addElement("li", `${text}_li`, "buttons_add");
    addElement("button", `${text}_button`, `${text}_li`);
    addTextToElement(`${text}_button`, `Add ${text}`);
    document.querySelector(`#${text}_button`).addEventListener("click", () => {

        displayForm(tagsArr, text, obj);
    });

}





let drillers = [
    new Driller({ name: "Буровая #1", code: "XXX-001" }),
    new Driller({ name: "Буровая #2", code: "XO XD 13" })
];

let tagsDrillers = ["Название буровой", "Серийный номер"];


//let drillers = (chekLocalObj("drillers")) ? chekLocalObj("drillers") : { 0: { name: "Название БУ", number: "Серийный номер буровой установки", } };
//localStorage.setItem('drillers', JSON.stringify(drillers));

let equipment = (chekLocalObj("equipment")) ? chekLocalObj("equipment") : { 0: { name: "Тип оборудования", number: "Серийный номер" } };
localStorage.setItem('equipment', JSON.stringify(equipment));

let project = (chekLocalObj("project")) ? chekLocalObj("project") : { 0: { name: "Название объекта", address: "Адрес", fio: "ФИО ответственного лица", phone: "Контактный номер" } };
localStorage.setItem('project', JSON.stringify(project));

let operators = (chekLocalObj("operators")) ? chekLocalObj("operators") : { 0: { name: "ФИО оператора", number: "Контактный номер" } };
localStorage.setItem('operators', JSON.stringify(operators));




renderAll();

addKeyCreateForm(tagsDrillers, "driller", drillers)

//displayForm(tagsDrillers, "driller", drillers);






//addTabFromObj("drillers_tab", "drillers");

//addKeyCreateForm("Driller", drillers);
//addKeyCreateForm("Equip", equipment);
//addKeyCreateForm("Project", project);
//addKeyCreateForm("Operator", operators);


//addDelKey("Driller", "drillers");