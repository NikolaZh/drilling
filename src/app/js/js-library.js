import StorageBuffer from './lib/model/buffer';
import {
    Driller,
    Operator,
    Equipment,
    Project,
    Scheduler,
} from './models';

const storage = new StorageBuffer();

// storage.all(Driller);
// const drillers = storage.buffer.get('Driller');

// if (!storage.all(Driller).length) {
//     storage.buffer.set('Driller', new Map());
// }
// if (!storage.all(Equipment).length) {
//     storage.buffer.set('Equipment', new Map());
// }
// if (!storage.all(Operator).length) {
//     storage.buffer.set('Operator', new Map());
// }
// if (!storage.all(Project).length) {
//     storage.buffer.set('Project', new Map());
// }


// const drillers = storage.buffer.get('Driller');
// const equipments = storage.buffer.get('Equipment');
// const projects = storage.buffer.get('Project');
// const operators = storage.buffer.get('Operator');

// console.log(storage);

export { storage, Driller, Operator, Equipment, Project, Scheduler };
