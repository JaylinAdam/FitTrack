class Exercise {
    name?: string;
    weight?: string;
    rep?: string;
    sets?: string;
    comments?: string;

    constructor(
        name?: string,
        weight?: string,
        rep?: string,
        sets?: string,
        comments?: string
    ) {
        this.name = name || "";
        this.weight = weight || "";
        this.rep = rep || "";
        this.sets = sets || "";
        this.comments = comments || "";
    }
}
