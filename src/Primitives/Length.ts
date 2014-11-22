class Length {
}
Fayde.RegisterType(Length, Fayde.XMLNSX);
nullstone.registerTypeConverter(Length, (val: any): number => {
    if (!val || val.toString().toLowerCase() === "auto")
        return Number.NaN;
    if (typeof val === "number")
        return val;
    return parseFloat(val.toString());
});