import { v4 as uuidv4 } from 'uuid';

export class Exercise {
    id?: string;
    name: string;
    info: string;
    reps: string;
    sets: string;

    constructor(name: string, info: string, reps: string, sets: string) {
        this.id = uuidv4();
        this.name = name || '';
        this.info = info || '';
        this.reps = reps || '';
        this.sets = sets || '';
    }
}
