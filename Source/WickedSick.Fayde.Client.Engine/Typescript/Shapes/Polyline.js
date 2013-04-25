var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Shape.ts" />
    /// CODE
    (function (Shapes) {
        function extendLine(p1, p2, thickness) {
            var t5 = thickness * 5.0;
            var dx = p1.X - p2.X;
            var dy = p1.Y - p2.Y;
            if(dy === 0.0) {
                t5 -= thickness / 2.0;
                if(dx > 0.0) {
                    p1.X += t5;
                    p2.X -= t5;
                } else {
                    p1.X -= t5;
                    p2.X += t5;
                }
            } else if(dx === 0.0) {
                t5 -= thickness / 2.0;
                if(dy > 0.0) {
                    p1.Y += t5;
                    p2.Y -= t5;
                } else {
                    p1.Y -= t5;
                    p2.Y += t5;
                }
            } else {
                var angle = Math.atan2(dy, dx);
                var ax = Math.abs(Math.sin(angle) * t5);
                if(dx > 0.0) {
                    p1.X += ax;
                    p2.X -= ax;
                } else {
                    p1.X -= ax;
                    p2.X += ax;
                }
                var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
                if(dy > 0.0) {
                    p1.Y += ay;
                    p2.Y -= ay;
                } else {
                    p1.Y -= ay;
                    p2.Y += ay;
                }
            }
        }
        var Polyline = (function (_super) {
            __extends(Polyline, _super);
            function Polyline() {
                _super.apply(this, arguments);

            }
            Polyline.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () {
                return new Enum(Shapes.FillRule);
            }, Polyline, Shapes.FillRule.EvenOdd, function (d, args) {
                return (d)._FillRuleChanged(args);
            });
            Polyline.PointsProperty = DependencyProperty.RegisterFull("Points", function () {
                return Shapes.PointCollection;
            }, Polyline, undefined, function (d, args) {
                return (d)._PointsChanged(args);
            });
            Object.defineProperty(Polyline.prototype, "Points", {
                get: function () {
                    return this.GetValue(Polyline.PointsProperty);
                },
                set: function (value) {
                    if(typeof value === "string") {
                        value = Shapes.PointCollection.FromData(value);
                    }
                    this.SetValue(Polyline.PointsProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            Polyline.prototype._PointsChanged = function (args) {
                var oldColl = args.OldValue;
                var newColl = args.NewValue;
                if(oldColl instanceof Shapes.PointCollection) {
                    (oldColl).Owner = null;
                }
                if(newColl instanceof Shapes.PointCollection) {
                    (newColl).Owner = this;
                }
                this._InvalidateNaturalBounds();
            };
            Polyline.prototype._BuildPath = function () {
                var points = this.Points;
                var count;
                if(!points || (count = points.Count) < 2) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return;
                }
                this._ShapeFlags = Shapes.ShapeFlags.Normal;
                var path = new Shapes.RawPath();
                var enumerator = points.GetEnumerator();
                enumerator.MoveNext();
                var p = enumerator.Current;
                path.Move(p.X, p.Y);
                while(enumerator.MoveNext()) {
                    p = enumerator.Current;
                    path.Line(p.X, p.Y);
                }
                path.Close();
                this._Path = path;
            };
            Polyline.prototype._FillRuleChanged = function (args) {
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            return Polyline;
        })(Shapes.Shape);
        Shapes.Polyline = Polyline;        
        Nullstone.RegisterType(Polyline, "Polyline");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Polyline.js.map
