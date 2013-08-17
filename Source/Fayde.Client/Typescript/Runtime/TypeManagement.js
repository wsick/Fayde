var Fayde;
(function (Fayde) {
    Fayde.XMLNS = "http://schemas.wsick.com/fayde";
    Fayde.XMLNSX = "http://schemas.wsick.com/fayde/x";

    var jsNamespaces = [];
    var xmlNamespaces = [];

    function Declare(type) {
        var itr = extendType(type);
        itr._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
        return itr;
    }
    Fayde.Declare = Declare;

    function RegisterInterface(name) {
        return { Name: name };
    }
    Fayde.RegisterInterface = RegisterInterface;

    function extendType(type) {
        var t = type;
        Object.defineProperty(t, "_Interfaces", { value: [], writable: false });
        t.Namespace = function (jsNamespace, xmlNamespace) {
            Object.defineProperty(t, "_JsNamespace", { value: jsNamespace, writable: false });
            Object.defineProperty(t, "_XmlNamespace", { value: xmlNamespace, writable: false });
            return t;
        };
        t.Name = function (typeName) {
            Object.defineProperty(t, "_TypeName", { value: typeName, writable: false });
            return t;
        };
        t.Interface = function (inter) {
            t._Interfaces.push(inter);
            return t;
        };
        t.Register = function () {
            var jarr = jsNamespaces[t._JsNamespace];
            if (!jarr)
                jarr = jsNamespaces[t._JsNamespace] = [];
            jarr[t._TypeName] = t;

            var xarr = xmlNamespaces[t._XmlNamespace];
            if (!xarr)
                xarr = xmlNamespaces[t._XmlNamespace] = [];
            xarr[t._TypeName] = t;
        };
        return t;
    }

    var PRIMITIVE_MAPPINGS = [];
    PRIMITIVE_MAPPINGS["String"] = String;
    PRIMITIVE_MAPPINGS["Number"] = Number;
    PRIMITIVE_MAPPINGS["Date"] = Date;
    PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
    PRIMITIVE_MAPPINGS["Array"] = Array;
    PRIMITIVE_MAPPINGS["Null"] = null;

    Fayde.TypeResolver = {
        GetAnnotation: function (type, name) {
            if (!type)
                return;
            var t = type;
            var anns = (t).Annotations;
            var annotation;
            if (anns && (annotation = anns[name]))
                return annotation;
            return this.GetAnnotationMember(t._BaseClass, name);
        },
        Resolve: function (xmlns, xmlname) {
            if (xmlns === Fayde.XMLNS) {
                var mapping = PRIMITIVE_MAPPINGS[xmlname];
                if (mapping !== undefined) {
                    return {
                        Type: mapping,
                        IsPrimitive: true
                    };
                }
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsPrimitive: false, Type: t };
            }
            return undefined;
        }
    };
})(Fayde || (Fayde = {}));
//# sourceMappingURL=TypeManagement.js.map
