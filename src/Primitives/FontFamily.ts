class FontFamily implements ICloneable {
    constructor(public FamilyNames: string) { }
    toString(): string {
        return this.FamilyNames;
    }
    Clone(): FontFamily {
        return new FontFamily(this.FamilyNames);
    }
}
Fayde.RegisterType(FontFamily, "window", Fayde.XMLNS);
Fayde.RegisterTypeConverter(FontFamily, (val: any): any => {
    if (!val) return new FontFamily(Font.DEFAULT_FAMILY);
    return new FontFamily(val.toString());
});