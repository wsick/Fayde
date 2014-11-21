class Length {
}
Fayde.RegisterType(Length, "window", Fayde.XMLNSX);
Fayde.RegisterTypeConverter(Length, (val: any): number => {
    if (!val || val.toString().toLowerCase() === "auto")
        return Number.NaN;
    if (typeof val === "number")
        return val;
    return parseFloat(val.toString());
});