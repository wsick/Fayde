/// <reference path="../Primitives/CornerRadius.ts" />
/// <reference path="../Primitives/Color.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="../Media/Brush.ts" />
var Fayde;
(function (Fayde) {
    var TypeConverters = (function () {
        function TypeConverters() {
        }
        TypeConverters.ThicknessConverter = function (str) {
            if (!str)
                return new Thickness();
            var tokens = str.split(",");
            var left, top, right, bottom;
            if (tokens.length === 1) {
                left = top = right = bottom = parseFloat(tokens[0]);
            } else if (tokens.length === 2) {
                left = right = parseFloat(tokens[0]);
                top = bottom = parseFloat(tokens[1]);
            } else if (tokens.length === 4) {
                left = parseFloat(tokens[0]);
                top = parseFloat(tokens[1]);
                right = parseFloat(tokens[2]);
                bottom = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        };
        TypeConverters.CornerRadiusConverter = function (str) {
            if (!str)
                return new CornerRadius();
            var tokens = str.split(",");
            var topLeft, topRight, bottomRight, bottomLeft;
            if (tokens.length === 1) {
                topLeft = topRight = bottomRight = bottomLeft = parseFloat(tokens[0]);
            } else if (tokens.length === 4) {
                topLeft = parseFloat(tokens[0]);
                topRight = parseFloat(tokens[1]);
                bottomLeft = parseFloat(tokens[2]);
                bottomRight = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse CornerRadius value '" + str + "'");
            }
            return new CornerRadius(topLeft, topRight, bottomRight, bottomLeft);
        };
        TypeConverters.BrushConverter = function (str) {
            var scb = new Fayde.Media.SolidColorBrush();
            scb.Color = TypeConverters.ColorConverter(str);
            return scb;
        };
        TypeConverters.ColorConverter = function (str) {
            if (!str)
                return new Color();
            if (str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if (!color)
                    throw new NotSupportedException("Unknown Color: " + str);
                return color;
            }
            return Color.FromHex(str);
        };
        TypeConverters.GeometryConverter = function (str) {
            return Fayde.Media.ParseGeometry(str);
        };
        return TypeConverters;
    })();

    var TypeConverter = (function () {
        function TypeConverter() {
        }
        TypeConverter.Register = function (type, converter) {
            TypeConverter._Converters[type] = converter;
        };
        TypeConverter.ConvertObject = function (propd, val, objectType, doStringConversion) {
            if (val == null)
                return val;

            var targetType = propd.GetTargetType();
            if (typeof targetType === "string" || targetType === String) {
                return doStringConversion ? val.toString() : "";
            } else if (typeof targetType === "number" || targetType === Number) {
                if (typeof val === "number")
                    return val;
                if (!val)
                    return 0;
                if (val instanceof Thickness)
                    return val.Left;
                return parseFloat(val.toString());
            } else if (typeof targetType === "function") {
                var f = targetType;
                if (val instanceof f)
                    return val;
                var converter = TypeConverter._Converters[targetType];
                if (converter)
                    return converter(val);
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    var ret = (targetType).Object[val];
                    if (ret !== undefined)
                        return ret;
                    return val;
                }
            }

            if (typeof targetType === "string" || targetType === String)
                return doStringConversion ? val.toString() : "";

            var tc;
            if (propd.IsAttached) {
                //TODO: Find type converter for attached property
            } else {
                //TODO: Find type converter
            }
            return val;
            //TODO: Default to basic type converter, return
            //if (tc == null)
            //tc = new TypeConverter();
            //return tc.ConvertFrom(val);
        };
        TypeConverter._Converters = [];
        return TypeConverter;
    })();
    Fayde.TypeConverter = TypeConverter;

    TypeConverter.Register(Thickness, TypeConverters.ThicknessConverter);
    TypeConverter.Register(CornerRadius, TypeConverters.CornerRadiusConverter);
    TypeConverter.Register(Fayde.Media.Brush, TypeConverters.BrushConverter);
    TypeConverter.Register(Color, TypeConverters.ColorConverter);
    TypeConverter.Register(Fayde.Media.Geometry, TypeConverters.GeometryConverter);
})(Fayde || (Fayde = {}));
//# sourceMappingURL=TypeConverter.js.map
