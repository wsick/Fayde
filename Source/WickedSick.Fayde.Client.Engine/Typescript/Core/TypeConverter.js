/// CODE
/// <reference path="DependencyProperty.ts" />
/// <reference path="../Runtime/Enum.ts" />
/// <reference path="../Primitives/CornerRadius.ts" />
/// <reference path="../Primitives/Color.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="../Media/MediaParser.ts" />
/// <reference path="../Media/SolidColorBrush.ts" />
var Fayde;
(function (Fayde) {
    var TypeConverters = (function () {
        function TypeConverters() { }
        TypeConverters.ThicknessConverter = function ThicknessConverter(str) {
            if(!str) {
                return new Thickness();
            }
            var tokens = str.split(",");
            var left, top, right, bottom;
            if(tokens.length === 1) {
                left = top = right = bottom = parseFloat(tokens[0]);
            } else if(tokens.length === 2) {
                left = right = parseFloat(tokens[0]);
                top = bottom = parseFloat(tokens[1]);
            } else if(tokens.length === 4) {
                left = parseFloat(tokens[0]);
                top = parseFloat(tokens[1]);
                right = parseFloat(tokens[2]);
                bottom = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        };
        TypeConverters.CornerRadiusConverter = function CornerRadiusConverter(str) {
            if(!str) {
                return new CornerRadius();
            }
            var tokens = str.split(",");
            var topLeft, topRight, bottomRight, bottomLeft;
            if(tokens.length === 1) {
                topLeft = topRight = bottomRight = bottomLeft = parseFloat(tokens[0]);
            } else if(tokens.length === 4) {
                topLeft = parseFloat(tokens[0]);
                topRight = parseFloat(tokens[1]);
                bottomLeft = parseFloat(tokens[2]);
                bottomRight = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse CornerRadius value '" + str + "'");
            }
            return new CornerRadius(topLeft, topRight, bottomRight, bottomLeft);
        };
        TypeConverters.BrushConverter = function BrushConverter(str) {
            var scb = new Fayde.Media.SolidColorBrush();
            scb.Color = TypeConverters.ColorConverter(str);
            return scb;
        };
        TypeConverters.ColorConverter = function ColorConverter(str) {
            if(!str) {
                return new Color();
            }
            if(str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if(!color) {
                    throw new NotSupportedException("Unknown Color: " + str);
                }
                return color;
            }
            return Color.FromHex(str);
        };
        return TypeConverters;
    })();    
    var TypeConverter = (function () {
        function TypeConverter() { }
        TypeConverter.ConvertObject = function ConvertObject(propd, val, objectType, doStringConversion) {
            if(val == null) {
                return val;
            }
            var targetType = propd.GetTargetType();
            if(typeof targetType === "function" && (targetType)._IsNullstone) {
                if(val instanceof targetType) {
                    return val;
                }
                var converter = TypeConverters[(targetType)._TypeName + "Converter"];
                if(converter) {
                    return converter(val);
                }
            } else if(targetType instanceof Enum) {
                if(typeof val === "string") {
                    var ret = (targetType).Object[val];
                    if(ret !== undefined) {
                        return ret;
                    }
                    return val;
                }
            } else if(typeof targetType === "number" || targetType === Number) {
                if(typeof val === "number") {
                    return val;
                }
                if(!val) {
                    return 0;
                }
                if(val instanceof Thickness) {
                    return val.Left;
                }
                return parseFloat(val.toString());
            }
            if(typeof targetType === "string" || targetType === String) {
                return doStringConversion ? val.toString() : "";
            }
            var tc;
            if(propd._IsAttached) {
            } else {
            }
            return val;
            //TODO: Default to basic type converter, return
            //if (tc == null)
            //tc = new TypeConverter();
            //return tc.ConvertFrom(val);
                    };
        TypeConverter.GeometryFromString = function GeometryFromString(val) {
            return Fayde.Media.ParseGeometry(val);
        };
        return TypeConverter;
    })();
    Fayde.TypeConverter = TypeConverter;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TypeConverter.js.map
