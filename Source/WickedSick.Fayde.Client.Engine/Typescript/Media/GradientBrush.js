var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Brush.ts" />
    /// <reference path="../Runtime/Enum.ts" />
    /// CODE
    /// <reference path="GradientStop.ts" />
    (function (Media) {
        (function (BrushMappingMode) {
            BrushMappingMode._map = [];
            BrushMappingMode.Absolute = 0;
            BrushMappingMode.RelativeToBoundingBox = 1;
        })(Media.BrushMappingMode || (Media.BrushMappingMode = {}));
        var BrushMappingMode = Media.BrushMappingMode;
        (function (GradientSpreadMethod) {
            GradientSpreadMethod._map = [];
            GradientSpreadMethod.Pad = 0;
            GradientSpreadMethod.Reflect = 1;
            GradientSpreadMethod.Repeat = 2;
        })(Media.GradientSpreadMethod || (Media.GradientSpreadMethod = {}));
        var GradientSpreadMethod = Media.GradientSpreadMethod;
        var GradientBrush = (function (_super) {
            __extends(GradientBrush, _super);
            function GradientBrush() {
                        _super.call(this);
                var coll = new Media.GradientStopCollection();
                coll.Listen(this);
                Object.defineProperty(this, "GradientStops", {
                    value: coll,
                    writable: false
                });
            }
            GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () {
                return new Enum(BrushMappingMode);
            }, GradientBrush, BrushMappingMode.RelativeToBoundingBox, function (d, args) {
                return (d).InvalidateBrush();
            });
            GradientBrush.SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", function () {
                return new Enum(GradientSpreadMethod);
            }, GradientBrush, GradientSpreadMethod.Pad, function (d, args) {
                return (d).InvalidateBrush();
            });
            GradientBrush.Annotations = {
                ContentProperty: "GradientStops"
            };
            GradientBrush.prototype.CreateBrush = function (ctx, bounds) {
                var spread = this.SpreadMethod;
                switch(spread) {
                    case GradientSpreadMethod.Pad:
                    default:
                        return this._CreatePad(ctx, bounds);
                    case GradientSpreadMethod.Repeat:
                        return this._CreateRepeat(ctx, bounds);
                    case GradientSpreadMethod.Reflect:
                        return this._CreateReflect(ctx, bounds);
                }
            };
            GradientBrush.prototype._CreatePad = function (ctx, bounds) {
            };
            GradientBrush.prototype._CreateRepeat = function (ctx, bounds) {
            };
            GradientBrush.prototype._CreateReflect = function (ctx, bounds) {
            };
            GradientBrush.prototype._GetMappingModeTransform = function (bounds) {
                if(!bounds) {
                    return mat3.identity();
                }
                if(this.MappingMode === BrushMappingMode.Absolute) {
                    return mat3.identity();
                }
                return mat3.createScale(bounds.Width, bounds.Height);
            };
            GradientBrush.prototype.GradientStopsChanged = function (newGradientStops) {
                this.InvalidateBrush();
            };
            return GradientBrush;
        })(Media.Brush);
        Media.GradientBrush = GradientBrush;        
        Nullstone.RegisterType(GradientBrush, "GradientBrush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GradientBrush.js.map
