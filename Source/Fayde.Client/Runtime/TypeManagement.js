var Fayde;
(function (Fayde) {
    Fayde.XMLNS = "http://schemas.wsick.com/fayde";
    Fayde.XMLNSX = "http://schemas.wsick.com/fayde/x";

    var jsNamespaces = [];
    var xmlNamespaces = [];

    var Interface = (function () {
        function Interface(name) {
            Object.defineProperty(this, "Name", { value: name, writable: false });
        }
        return Interface;
    })();
    Fayde.Interface = Interface;

    function RegisterType(type, reg) {
        var t = type;

        var name = reg.Name;
        if (!name)
            throw new Error("Type Name not specified.");
        var ns = reg.Namespace;
        if (!ns)
            throw new Error("Type Namespace not specified.");

        var xn = reg.XmlNamespace;
        if (!xn)
            xn = "";

        var i = reg.Interfaces;
        if (!i)
            i = [];

        var bc = Object.getPrototypeOf(type.prototype).constructor;

        Object.defineProperty(t, "_BaseClass", { value: bc, writable: false });
        Object.defineProperty(t, "_TypeName", { value: name, writable: false });
        Object.defineProperty(t, "_JsNamespace", { value: ns, writable: false });
        Object.defineProperty(t, "_XmlNamespace", { value: xn, writable: false });
        Object.defineProperty(t, "_Interfaces", { value: i, writable: false });

        var jarr = jsNamespaces[ns];
        if (!jarr)
            jarr = jsNamespaces[ns] = [];
        jarr[name] = t;

        if (xn) {
            var xarr = xmlNamespaces[xn];
            if (!xarr)
                xarr = xmlNamespaces[xn] = [];
            xarr[name] = t;
        }
    }
    Fayde.RegisterType = RegisterType;
    function RegisterEnum(e, reg) {
        var name = reg.Name;
        var ns = reg.Namespace;
        var xn = reg.XmlNamespace;

        e.IsEnum = true;

        var jarr = jsNamespaces[ns];
        if (!jarr)
            jarr = jsNamespaces[ns] = [];
        jarr[name] = e;

        if (xn) {
            var xarr = xmlNamespaces[xn];
            if (!xarr)
                xarr = xmlNamespaces[xn] = [];
            xarr[name] = e;
        }
    }
    Fayde.RegisterEnum = RegisterEnum;
    function RegisterInterface(name) {
        return new Interface(name);
    }
    Fayde.RegisterInterface = RegisterInterface;
    var PRIMITIVE_MAPPINGS = [];
    PRIMITIVE_MAPPINGS["String"] = String;
    PRIMITIVE_MAPPINGS["Number"] = Number;
    PRIMITIVE_MAPPINGS["Date"] = Date;
    PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
    PRIMITIVE_MAPPINGS["Array"] = Array;
    PRIMITIVE_MAPPINGS["Null"] = null;

    var ALIASES = [];
    ALIASES["Boolean"] = Boolean;
    ALIASES["Double"] = Number;

    var SIMPLES = [];
    SIMPLES["Color"] = true;
    SIMPLES["FontFamily"] = true;

    Fayde.TypeResolver = {
        GetAnnotation: function (type, name) {
            if (!type)
                return;
            var t = type;
            var anns = (t).Annotations;
            var annotation;
            if (anns && (annotation = anns[name]))
                return annotation;
            return Fayde.TypeResolver.GetAnnotation(t._BaseClass, name);
        },
        Resolve: function (xmlns, xmlname) {
            var isSystem = false;
            var isSimple = false;
            if (xmlns === Fayde.XMLNSX) {
                var mapping = PRIMITIVE_MAPPINGS[xmlname];
                if (mapping !== undefined) {
                    return {
                        Type: mapping,
                        IsPrimitive: true,
                        IsSystem: false,
                        IsSimple: false,
                        IsEnum: false
                    };
                }
                isSystem = true;
            } else if (xmlns === Fayde.XMLNS) {
                var alias = ALIASES[xmlname];
                if (alias !== undefined) {
                    return {
                        Type: alias,
                        IsPrimitive: true,
                        IsSystem: false,
                        IsSimple: false,
                        IsEnum: false
                    };
                }
                isSimple = SIMPLES[xmlname] === true;
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsSystem: isSystem, IsPrimitive: false, IsSimple: isSimple, IsEnum: t.IsEnum === true, Type: t };
            }
            return undefined;
        },
        ResolveFullyQualifiedName: function (xmlname, resolver) {
            var ns = Fayde.XMLNS;
            var typeName = xmlname;
            var tokens = xmlname.split(":");
            if (tokens.length === 2) {
                ns = resolver.lookupNamespaceURI(tokens[0]);
                typeName = tokens[1];
            }
            return Fayde.TypeResolver.Resolve(ns, typeName);
        }
    };

    var converters = [];
    converters[Boolean] = function (val) {
        if (val == null)
            return null;
        if (typeof val === "boolean")
            return val;
        var c = val.toString().toUpperCase();
        return c === "TRUE" ? true : (c === "FALSE" ? false : null);
    };
    converters[String] = function (val) {
        if (val == null)
            return "";
        return val.toString();
    };
    converters[Number] = function (val) {
        if (!val)
            return 0;
        if (typeof val === "number")
            return val;
        if (val instanceof Thickness)
            return (val).Left;
        return parseFloat(val.toString());
    };
    converters[Date] = function (val) {
        if (val == null)
            return new Date(0);
        return new Date(val.toString());
    };
    converters[RegExp] = function (val) {
        if (val instanceof RegExp)
            return val;
        if (val = null)
            throw new XamlParseException("Cannot specify an empty RegExp.");
        val = val.toString();
        return new RegExp(val);
    };
    function ConvertAnyToType(val, type) {
        var converter = (converters)[type];
        if (converter)
            return converter(val);
        if (type instanceof Enum) {
            if (!val)
                return 0;
            if (typeof val === "number")
                return val;
            var enumo = (type).Object;
            return enumo[val];
        }
        return val;
    }
    Fayde.ConvertAnyToType = ConvertAnyToType;
    function RegisterTypeConverter(type, converter) {
        converters[type] = converter;
    }
    Fayde.RegisterTypeConverter = RegisterTypeConverter;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=TypeManagement.js.map
