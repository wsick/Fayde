/// <reference path="../Runtime/TypeManagement.ts" />
var Length = (function () {
    function Length() {
    }
    return Length;
})();
Fayde.RegisterType(Length, {
    Name: "Length",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});
Fayde.RegisterTypeConverter(Length, function (val) {
    if (!val || val.toString().toLowerCase() === "auto")
        return Number.NaN;
    if (typeof val === "number")
        return val;
    return parseFloat(val.toString());
});
//# sourceMappingURL=Length.js.map
