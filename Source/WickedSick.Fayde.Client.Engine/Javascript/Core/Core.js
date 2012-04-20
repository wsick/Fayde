/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Media/MediaParser.js"/>

//#region Fayde

var Fayde = {
    TypeConverters: {
        Thickness: function (str) {
            /// <param name="str" type="String"></param>
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
                throw new ParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        },
        CornerRadius: function (str) {
            /// <param name="str" type="String"></param>
            if (!str)
                return new Thickness();
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
                throw new ParseException("Cannot parse CornerRadius value '" + str + "'");
            }
        }
    },
    TypeConverter: {
        ConvertObject: function (propd, val, objectType, doStringConversion) {
            /// <param name="propd" type="DependencyProperty"></param>
            /// <param name="val" type="Object"></param>
            /// <param name="objectType" type="Function"></param>
            /// <param name="doStringConversion" type="Boolean"></param>

            if (val == null)
                return val;

            var targetType = propd.GetTargetType();
            if (typeof targetType === "function" && targetType._IsNullstone) {
                if (val instanceof targetType)
                    return val;
                var converter = Fayde.TypeConverters[targetType._TypeName];
                if (converter != null)
                    return converter(val);
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    return targetType.Object[val];
                }
            } else if (typeof targetType === "number") {
                if (typeof val === "number")
                    return val;
                return parseFloat(val);
            }

            if (typeof targetType === "string")
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
        },
        GeometryFromString: function (val) {
            return Fayde._MediaParser.ParseGeometry(val);
        },
        PointCollectionFromString: function (val) {
            return Fayde._MediaParser.ParsePointCollection(val);
        }
    }
};

//#endregion