/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Media/MediaParser.js"/>
/// <reference path="../Media/Animation/RepeatBehavior.js"/>

(function (Fayde) {
    Fayde.Run = function () { };
    
    Fayde.Initialize = function () {
        Fayde.Run();
    };

    Fayde.Start = function (appType, rjson, json, canvas) {
        App.Instance = new appType();
        App.Instance.LoadResources(rjson);
        App.Instance.LoadInitial(canvas, json);
    };

    Fayde.TypeConverters = {
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
        },
        Brush: function (str) {
            return new Fayde.Media.SolidColorBrush(Fayde.TypeConverters.Color(str));
        },
        Color: function (str) {
            if (!str)
                return new Color(0, 0, 0, 1.0);
            if (str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if (!color)
                    throw new NotSupportedException("Unknown Color: " + str);
                return color;
            }
            return Color.FromHex(str);
        }
    };
    Fayde.TypeConverter = {
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
                if (converter)
                    return converter(val);
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    var ret = targetType.Object[val];
                    if (ret !== undefined)
                        return ret;
                    return val;
                }
            } else if (typeof targetType === "number" || targetType === Number) {
                if (typeof val === "number")
                    return val;
                if (!val)
                    return 0;
                if (val instanceof Thickness)
                    return val.Left;
                return parseFloat(val.toString());
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
        },
        GeometryFromString: function (val) {
            return Fayde._MediaParser.ParseGeometry(val);
        },
        PointCollectionFromString: function (val) {
            return Fayde._MediaParser.ParsePointCollection(val);
        }
    };
    Fayde.Validators = {
        StyleValidator: function (instance, propd, value, error) {
            /// <param name="instance" type="DependencyObject"></param>
            /// <param name="propd" type="DependencyProperty"></param>
            /// <param name="value" type="Object"></param>
            /// <param name="error" type="BError"></param>
            /// <returns type="Boolean" />

            var parentType = instance.constructor;
            var errorMessage;
            if (value) {
                var root;
                var style = Nullstone.As(value, Fayde.Style);

                if (style.IsSealed) {
                    if (!Nullstone.DoesInheritFrom(parentType, style.TargetType)) {
                        error.SetErrored(BError.XamlParseException, "Style.TargetType (" + style.TargetType._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                        return false;
                    }
                    return true;
                }

                // 1 Check for circular references in the BasedOn tree
                var cycles = [];
                root = style;
                while (root) {
                    if (cycles[root._ID]) {
                        error.SetErrored(BError.InvalidOperation, "Circular reference in Style.BasedOn");
                        return false;
                    }
                    cycles[root._ID] = true;
                    root = root.BasedOn;
                }
                cycles = null;

                // 2 Check that the instance is a subclass of Style::TargetType and also all the styles TargetTypes are
                //   subclasses of their BasedOn styles TargetType.
                root = style;
                while (root) {
                    var targetType = root.TargetType;
                    if (Nullstone.RefEquals(root, style)) {
                        if (!targetType) {
                            error.SetErrored(BError.InvalidOperation, "TargetType cannot be null");
                            return false;
                        } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                            error.SetErrored(BError.XamlParseException, "Style.TargetType (" + targetType._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                            return false;
                        }
                    } else if (!targetType || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                        error.SetErrored(BError.InvalidOperation, "Style.TargetType (" + (targetType ? targetType._TypeName : "<Not Specified>") + ") is not a subclass of (" + parentType._TypeName + ")");
                        return false;
                    }
                    parentType = targetType;
                    root = root.BasedOn;
                }

                // 3 This style is now OK and never needs to be checked again.
                style._Seal();
            }
            return true;
        }
    };
    Fayde.Clone = function (value) {
        if (value instanceof Fayde.DependencyObject)
            return value.Clone();

        if (typeof value === "number")
            return value;

        var typeName = value.constructor._TypeName;
        switch (typeName) {
            case "FontFamily":
                return new FontFamily(value.FamilyNames);
            case "PropertyPath":
                return new Fayde.Data.PropertyPath(value._Path, value._ExpandedPath);
            case "Color":
                return new Color(value.R, value.G, value.B, value.A);
            case "Point":
                return new Point(value.X, value.Y);
            case "Rect":
                return new Rect(value.X, value.Y, value.Width, value.Height);
            case "Size":
                return new Size(value.Width, value.Height);
            case "Uri":
                return new Uri(value._OriginalString);
            case "RepeatBehavior":
                var rb = new Fayde.Media.Animation.RepeatBehavior();
                rb._Duration = value._Duration;
                rb._Count = value._Count;
                rb.IsForever = value.IsForever;
                return rb;
            case "Duration":
                var dur = new Duration();
                dur._Type = value._Type;
                dur._TimeSpan = value._TimeSpan;
                return dur;
            case "KeyTime":
                var kt = new KeyTime();
                kt._TimeSpan = value._TimeSpan;
                kt._IsPaced = value._IsPaced;
                kt._IsUniform = value._IsUniform;
                kt._Percent = value._Percent;
                return kt;
            case "GridLength":
                return new Fayde.Controls.GridLength(value.Value, value.Type);
            case "Thickness":
                return new Thickness(value.Left, value.Top, value.Right, value.Bottom);
            case "CornerRadius":
                return new CornerRadius(value.TopLeft, value.TopRight, value.BottomRight, value.BottomLeft);
        }

        return new value.constructor();
    };
})(Nullstone.Namespace("Fayde"));