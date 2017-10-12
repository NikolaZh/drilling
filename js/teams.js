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



let drillers = {
    0: { name: "Название БУ", number: "Серийный номер буровой установки" },
    1: { name: "Придорожная", number: "#1234567890" }
}





let addKeys = { //necessary keys on page
    0: { text: "Add Driller", id_li: "li_driller", id_button: "but_driller" },
    1: { text: "Add Equipment", id_li: "li_equip", id_button: "but_quip" }
}


for (let key in addKeys) { //add adding buttons
    addElement("li", addKeys[key].id_li, "buttons_add");
    addElement("button", addKeys[key].id_button, addKeys[key].id_li);
    addTextToElement(addKeys[key].id_button, addKeys[key].text);
}

for (let key in drillers[0]) {
    addElement("input", [key], "form");
    document.querySelector(`#${[key]}`).setAttribute("placeholder", `${drillers[0][key] }`);


}

document.querySelector("#but_driller").addEventListener("click", () => {
    drillers[2] = document.querySelector("#txt").value;
});