const setObjToBusy = (project, object, start, end) => {
    if (start > end) {
        document.querySelector('#input_form').innerHTML = 'Incorrect Dates!';
        return console.log('Incorrect Dates!');
    }
    const dayS = project.date1;
    const dayE = project.date2;
    if (!(dayS <= start && dayE >= end)) {
        document.querySelector('#input_form').innerHTML = 'Your dates not in range of Project';
        return console.log('Your dates not in range of Project');
    }
    if (!checkFreeOrNotObj(object, start, end)) {
        document.querySelector('#input_form').innerHTML = 'Obj busy on this dates, set another dates or set obj free first';
        return console.log('Obj busy on this dates, set another dates or set obj free first');
    }
    const ownObj = {
        type: object.constructor.name,
        id: object.id,
        dateStart: start,
        dateEnd: end,
    };
    project._f.owns.push(ownObj);
    storage.save(project);
    document.querySelector('#input_form').innerHTML = 'Obj successfully added to Project';
    return console.log('Obj successfully added to Project');
};

const checkFreeOrNotObj = (object, start, end) => {
    const cls = object.constructor.name;
    let objNotAtOwns = true;
    let objFreeOnDates = true;
    returnAllOwns().forEach((el) => {
        if (el.id === object._id && el.type === cls) {
            objNotAtOwns = false; // chek obj is listed at Owns of Project, if not - obj is free on any dates
            const dayS = new Date(el.dateStart);
            const dayE = new Date(el.dateEnd);
            if (!(((dayS && dayE) < start) || ((dayS && dayE) > end))) {
                objFreeOnDates = false;
            }
        }
    });
    return (objNotAtOwns || objFreeOnDates);
};

const dateToString = (date) => {
    const options = {
        day: 'numeric',
        year: 'numeric',
        month: 'numeric',
    };
    return date.toLocaleString('ru', options);
};

const returnAllOwns = () => { // return all busy objects in our projects
    const data = [];
    storage.all(Project).forEach((currentValue) => {
        currentValue._f.owns.forEach((curentValue2) => {
            data.push(curentValue2);
        });
    });
    return data;
};
