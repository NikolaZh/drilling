import StorageBuffer from './lib/model/buffer';
import LocalStorage from './lib/model/local-storage';
import {
    Driller,
    Operator,
    Equipment,
    Project,
    Scheduler,
} from './models';

const storage = new StorageBuffer();
const scheduler = new Scheduler(storage);

export { storage, scheduler, Driller, Operator, Equipment, Project };
