class Exercise {
    user: string;
    date: Date;
    notes: string;
    exercies: Exercise[];

    constructor(user: string, date: Date, notes: string, exercies: Exercise[]) {
        this.user = user;
        this.date = date;
        this.notes = notes;
        this.exercies = exercies;
    }
}
