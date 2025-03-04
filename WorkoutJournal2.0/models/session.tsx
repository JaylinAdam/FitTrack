import { Exercise } from "./excercise";

class Session {
    user: string;
    date: Date;
    notes: string;
    exercises: Exercise[];

    constructor(user: string, date: Date, notes: string, exercises: Exercise[]) {
        this.user = user;
        this.date = date;
        this.notes = notes;
        this.exercises = exercises;
    }
}
