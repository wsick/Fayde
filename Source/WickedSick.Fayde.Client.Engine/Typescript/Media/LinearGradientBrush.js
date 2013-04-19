var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="GradientBrush.ts" />
    /// <reference path="../Primitives/Point.ts" />
    /// CODE
    /// <reference path="../Primitives/rect.ts" />
    /// <reference path="GradientMetrics.ts" />
    (function (Media) {
        var LinearGradientBrush = (function (_super) {
            __extends(LinearGradientBrush, _super);
            function LinearGradientBrush() {
                _super.apply(this, arguments);

            }
            LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () {
                return Point;
            }, LinearGradientBrush);
            LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterCore("EndPoint", function () {
                return Point;
            }, LinearGradientBrush);
            LinearGradientBrush.prototype._CreatePad = function (ctx, bounds) {
                var data = this._GetPointData(bounds);
                var start = data.start;
                var end = data.end;
                var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
                var enumerator = this.GradientStops.GetEnumerator();
                while(enumerator.MoveNext()) {
                    var stop = enumerator.Current;
                    grd.addColorStop(stop.Offset, stop.Color.toString());
                }
                return grd;
            };
            LinearGradientBrush.prototype._CreateRepeat = function (ctx, bounds) {
                var data = this._GetPointData(bounds);
                var start = data.start;
                var end = data.end;
                var dir = {
                    x: end.X - start.X,
                    y: end.Y - start.Y
                };
                var first = {
                    x: start.X,
                    y: start.Y
                };
                var last = {
                    x: end.X,
                    y: end.Y
                };
                Media.GradientMetrics.Calculate(dir, first, last, bounds);
                var grd = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
                var steps = (last.x - first.x) / dir.x;
                var curOffset = 0.0;
                for(var i = 0; i < steps; i++) {
                    var enumerator = this.GradientStops.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        var stop = enumerator.Current;
                        grd.addColorStop(curOffset + (stop.Offset / steps), stop.Color.toString());
                    }
                    curOffset += (1.0 / steps);
                }
                return grd;
            };
            LinearGradientBrush.prototype._CreateReflect = function (ctx, bounds) {
                var data = this._GetPointData(bounds);
                var start = data.start;
                var end = data.end;
            };
            LinearGradientBrush.prototype._GetPointData = function (bounds) {
                var transform = this._GetMappingModeTransform(bounds);
                var sp = this.StartPoint;
                var ep = this.EndPoint;
                var s = mat3.transformVec2(transform, vec2.createFrom(sp.X, sp.Y));
                var e = mat3.transformVec2(transform, vec2.createFrom(ep.X, ep.Y));
                return {
                    start: new Point(s[0], s[1]),
                    end: new Point(e[0], e[1])
                };
            };
            LinearGradientBrush.prototype.toString = function () {
                var enumerator = this.GradientStops.GetEnumerator();
                var ser = [];
                while(enumerator.MoveNext()) {
                    ser.push(enumerator.Current.toString());
                }
                return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
            };
            return LinearGradientBrush;
        })(Media.GradientBrush);
        Media.LinearGradientBrush = LinearGradientBrush;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LinearGradientBrush.js.map
