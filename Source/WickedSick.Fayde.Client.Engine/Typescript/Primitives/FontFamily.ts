/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class FontFamily {
    constructor(public FamilyNames: string) {
    }
    toString(): string {
        return this.FamilyNames;
    }
}
Nullstone.RegisterType(FontFamily, "FontFamily");