export class Session {
    user: string;
    date: string;
    notes: string;
    exercies: Exercise[];

    constructor(
        user: string,
        date: string,
        notes: string,
        exercies: Exercise[]
    ) {
        this.user = user;
        this.date = date;
        this.notes = notes;
        this.exercies = exercies;
    }
}
