export class Session {
    user: string;
    date: string;
    notes: string;
    exercises: Exercise[];

    constructor(
        user: string,
        date: string,
        notes: string,
        exercises: Exercise[]
    ) {
        this.user = user;
        this.date = date;
        this.notes = notes;
        this.exercises = exercises;
    }
}
