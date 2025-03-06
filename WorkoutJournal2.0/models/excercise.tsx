export class Exercise {
    name?: string;
    info?: string;
    reps?: string;
    sets?: string;

    constructor(
        name?: string,
        info?: string,
        reps?: string,
        sets?: string,
    ) {
        this.name = name || "";
        this.info = info || "";
        this.reps = reps || "";
        this.sets = sets || "";
    }
}
