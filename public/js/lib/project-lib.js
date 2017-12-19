const setObjToBusy = (project, object, start, end) => {
    try {
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
    } catch (e) {
        return e;
    }
    return `${object.constructor.name} успешно добавлен`;
};

const checkFreeOrNotObj = (project, object, start, end) => {
    const cls = object.constructor.name;
    let objNotAtOwns = true;
    let objFreeOnDates = true;
    storage.all(Project).forEach((el) => {
        const bindedOwns = el.getBinded(object);
        if (bindedOwns.has(object.id)) {
            objNotAtOwns = false;
            const dayS = new Date(bindedOwns.get(object.id).dateStart);
            const dayE = new Date(bindedOwns.get(object.id).dateEnd);
            if ((dayS < start && dayE > start) || (dayS < end && dayE > end) || (start < dayS && end > dayS) || el.id === project.id) {
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
