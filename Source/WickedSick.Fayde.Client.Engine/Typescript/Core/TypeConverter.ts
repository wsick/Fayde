/// <reference path="../Primitives/CornerRadius.ts" />
/// <reference path="../Primitives/Color.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="../Media/Brush.ts" />
/// CODE
/// <reference path="DependencyProperty.ts" />
/// <reference path="../Runtime/Enum.ts" />
/// <reference path="../Media/MediaParser.ts" />
/// <reference path="../Media/SolidColorBrush.ts" />

module Fayde {
    class TypeConverters {
        static ThicknessConverter(str: string): Thickness {
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
        }
        static CornerRadiusConverter(str: string): CornerRadius {
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
        }
        static BrushConverter(str: string): Media.Brush {
            var scb = new Media.SolidColorBrush();
            scb.Color = ColorConverter(str);
            return scb;
        }
        static ColorConverter(str: string): Color {
            if (!str)
                return new Color();
            if (str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if (!color)
                    throw new NotSupportedException("Unknown Color: " + str);
                return color;
            }
            return Color.FromHex(str);
        }
        static GeometryConverter(str: string): Media.Geometry {
            return Media.ParseGeometry(str);
        }
    }

    export class TypeConverter {
        private static _Converters: Function[] = [];
        static Register(type: any, converter: (str: string) => any) {
            TypeConverter._Converters[type] = converter;
        }
        static ConvertObject(propd: DependencyProperty, val: any, objectType: Function, doStringConversion: bool) {
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
                if (val instanceof targetType)
                    return val;
                var converter = TypeConverter._Converters[<any>targetType];
                if (converter)
                    return converter(val);

            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    var ret = (<Enum><any>targetType).Object[val];
                    if (ret !== undefined)
                        return ret;
                    return val;
                }
            }

            if (typeof targetType === "string" || targetType === String)
                return doStringConversion ? val.toString() : "";

            var tc;
            if (propd._IsAttached) {
                //TODO: Find type converter for attached property
            } else {
                //TODO: Find type converter
            }
            return val;

            //TODO: Default to basic type converter, return
            //if (tc == null)
            //tc = new TypeConverter();
            //return tc.ConvertFrom(val);
        }
    }

    TypeConverter.Register(Thickness, TypeConverters.ThicknessConverter);
    TypeConverter.Register(CornerRadius, TypeConverters.CornerRadiusConverter);
    TypeConverter.Register(Media.Brush, TypeConverters.BrushConverter);
    TypeConverter.Register(Color, TypeConverters.ColorConverter);
    TypeConverter.Register(Media.Geometry, TypeConverters.GeometryConverter);
}