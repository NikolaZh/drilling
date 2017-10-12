'use strict';
let json = '{"name": ["Вася","Петя"], "id":["0","1"], "color":["red","blue"]}';

let base = {
    "id0": { name: "vasya", color: "red", position: "free" },
    "id1": { name: "petya", color: "blue", position: "busy" }
};


let tmp = [];



fun();

function fun() {


    let key = "";

    let h2 = document.getElementById('#list');


    for (let i = 0; i < 2; i++) {

        key = "id" + i;

        console.log(base[key].hasOwnProperty(color));



    }

    let newWorker = { name: "egor", color: "green", position: "busy" };



    //console.log(newWorker);


    base["id2"] = newWorker;
    delete base["id1"];

    let idall = base[key];
    //console.log(base);



    console.log(idall.hasOwnProperty(color));





    /*


    for (let key in base) {

        tmp.push(base[key]);
    }

    for (let i = 0; i < tmp.length; i++) {
        console.log(tmp[i].name);
        console.log(tmp[i].position);
        console.log("\n ");
    }





    console.log(tmp);
*/


}