const setObjToBusy = (project, object, start, end) => {
    const dayS = project.date1;
    const dayE = project.date2;
    if (start > end) {
        throw new RangeError('Дата начала должна быть меньше даты конца');
    }
    if (dayS > start || dayE < end) {
        throw new RangeError('Указанные даты не входят диапазон Project');
    }
    if (!checkFreeOrNotObj(project, object, start, end)) {
        throw new RangeError(`${object.constructor.name} занят в эти дни`);
    }
    project.bind(object, start, end);
    storage.save(project);
    return true;
};

const checkFreeOrNotObj = (project, object, start, end) => {
    const cls = object.constructor.name;
    let objNotAtOwns = true;
    let objFreeOnDates = true;
    const dataProjects = storage.all(Project);
    for (const key in dataProjects) {
        const bindedOwns = dataProjects[key].getBinded(object);
        if (bindedOwns && bindedOwns.has(object.id)) { // getBinded can return undefined, we check it
            objNotAtOwns = false;
            const dayS = new Date(bindedOwns.get(object.id).dateStart);
            const dayE = new Date(bindedOwns.get(object.id).dateEnd);
            if (dataProjects[key].id === project.id || ((dayS < start) && (dayE > start)) || ((dayS < end) && (dayE > end)) || ((start < dayS) && (end > dayS))) {
                objFreeOnDates = false;
                break;
            }
        }
    }
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
