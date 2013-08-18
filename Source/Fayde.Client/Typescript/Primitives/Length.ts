/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE

class Length {
}
Fayde.RegisterType(Length, {
    Name: "Length",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});
Fayde.RegisterTypeConverter(Length, (val: string): number => {
    if (!val || val.toLowerCase() === "auto")
        return Number.NaN;
    return parseFloat(val);
});