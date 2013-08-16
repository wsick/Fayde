var Fayde;
(function (Fayde) {
    Fayde.XMLNS = "http://schemas.wsick.com/fayde";
    Fayde.XMLNSX = "http://schemas.wsick.com/fayde/x";

    function Register(type) {
        var itr = extendType(type);
        itr.BaseClass = Object.getPrototypeOf(type.prototype).constructor;
        return itr;
    }
    Fayde.Register = Register;

    function RegisterInterface(name) {
        return { Name: name };
    }
    Fayde.RegisterInterface = RegisterInterface;

    function extendType(type) {
        var t = type;
        Object.defineProperty(t, "Interfaces", { value: [], writable: false });
        t.Namespace = function (jsNamespace, xmlNamespace) {
            Object.defineProperty(t, "JsNamespace", { value: jsNamespace, writable: false });
            Object.defineProperty(t, "XmlNamespace", { value: xmlNamespace, writable: false });
            return t;
        };
        t.Name = function (typeName) {
            Object.defineProperty(t, "TypeName", { value: typeName, writable: false });
            return t;
        };
        t.Interface = function (inter) {
            t.Interfaces.push(inter);
            return t;
        };
        return t;
    }
})(Fayde || (Fayde = {}));
//# sourceMappingURL=TypeManagement.js.map
