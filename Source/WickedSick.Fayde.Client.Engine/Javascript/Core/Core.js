/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Media/MediaParser.js"/>

//#region Fayde

var Fayde = {
    TypeConverter: {
        ConvertObject: function (propd, val, objectType, doStringConversion) {
            /// <param name="propd" type="DependencyProperty"></param>
            /// <param name="val" type="Object"></param>
            /// <param name="objectType" type="Function"></param>
            /// <param name="doStringConversion" type="Boolean"></param>

            if (val == null)
                return val;

            var targetType = propd.GetTargetType();
            if (typeof targetType === "function") {
                if (val instanceof targetType)
                    return val;
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    return targetType.Object[val];
                }
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