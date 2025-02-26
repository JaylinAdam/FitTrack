class Exercise {
    name: string;
    weight: number;
    rep: number;
    sets: number;
    comments: string;

    constructor(
        name: string,
        weight: number,
        rep: number,
        sets: number,
        comments: string
    ) {
        this.name = name;
        this.weight = weight;
        this.rep = rep;
        this.sets = sets;
        this.comments = comments;
    }
}
