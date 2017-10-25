

class BaseStorage {


	all(cls) {
		throw new Error("Not implemented");
	}

	save(object) {
		throw new Error("Not implemented");
	}

	load(cls, id) {
		throw new Error("Not implemented");
	}


}


//TODO: Implement me!
class LocalStorage extends BaseStorage {




}


//TODO: remove this test code

const storage = new LocalStorage();

let allDrillers = storage.all(Driller);

let newDriller = new Driller({ name: "Буровая 1", code: "XX-01" });
let newDrillerId = storage.save(newDriller);

let sameDriller = storage.load(Driller, newDrillerId);

