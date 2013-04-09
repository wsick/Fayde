class FontFamily {
    static _TypeName = "FontFamily";

    constructor(public FamilyNames: string) {
    }
    toString(): string {
        return this.FamilyNames;
    }
}