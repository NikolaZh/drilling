class LocalStorage extends BaseStorage {
  all(cls) {
    super.all(cls);
    const storageName = cls.prototype.constructor.name;
    const wrapObj = localStorage.getItem(storageName);
    if (wrapObj === null) { // check our object in storage browser
      return false;
    }
    const unwrapObj = JSON.parse(wrapObj).map(fields => cls.prototype.constructor.unwrap(fields));
    return unwrapObj;
  }

  save(object) {
    super.save(object);
    const storageName = object.constructor.name;
    let data = localStorage.getItem(storageName);
    const newAppropId = this.increase_id(object);
    if (data) {
      data = JSON.parse(data).map(fields => object.constructor.unwrap(fields));
    }
    if (data && newAppropId) { // storage and newID exist => just add new object
      object._id = newAppropId;
      data.push(object);
    } else if (data) { // storage exist, but newID false (object is old) = looking for obj with same id in storage and replace
      for (const key in data) {
        if (data[key]._id == object._id) {
          for (const key1 in data[key]._f) {
            data[key]._f[key1] = object._f[key1];
          }
        }
      }
    } else { // no storage, just add object
      object._id = newAppropId;
      data = [object];
    }
    localStorage.setItem(storageName, JSON.stringify(data));
    return object._id;
  }

  load(cls, id) {
    super.load(cls, id);
    const data = this.all(cls);
    if (data) {
      for (const key in data) {
        if (data[key]._id == id) { return data[key]; }
      }
    } else return false;
  }

  increase_id(object) {
    const objType = object.constructor.name;
    if (object._id != null) return false; // id exist = object old
    if (localStorage.getItem(`${objType}_ids`) === null) {
      localStorage.setItem(`${objType}_ids`, JSON.stringify(1));
      return 1;
    }
    let lastId = JSON.parse(localStorage.getItem(`${objType}_ids`));
    lastId++;
    localStorage.setItem(`${objType}_ids`, JSON.stringify(lastId));
    return lastId;
  }
}
