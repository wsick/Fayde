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
        var Polygon = (function (_super) {
            __extends(Polygon, _super);
            function Polygon() {
                _super.apply(this, arguments);

            }
            Polygon.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () {
                return new Enum(Shapes.FillRule);
            }, Polygon, Shapes.FillRule.EvenOdd, function (d, args) {
                return (d)._FillRuleChanged(args);
            });
            Polygon.PointsProperty = DependencyProperty.RegisterFull("Points", function () {
                return Shapes.PointCollection;
            }, Polygon, undefined, function (d, args) {
                return (d)._PointsChanged(args);
            });
            Object.defineProperty(Polygon.prototype, "Points", {
                get: function () {
                    return this.GetValue(Polygon.PointsProperty);
                },
                set: function (value) {
                    if(typeof value === "string") {
                        value = Shapes.PointCollection.FromData(value);
                    }
                    this.SetValue(Polygon.PointsProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            Polygon.prototype._PointsChanged = function (args) {
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
            Polygon.prototype._BuildPath = function () {
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
                if(count === 2) {
                    enumerator.MoveNext();
                    var p2 = enumerator.Current;
                    extendLine(p, p2, this.StrokeThickness);
                    path.Move(p.X, p.Y);
                    path.Line(p2.X, p2.Y);
                } else {
                    path.Move(p.X, p.Y);
                    while(enumerator.MoveNext()) {
                        p = enumerator.Current;
                        path.Line(p.X, p.Y);
                    }
                }
                path.Close();
                this._Path = path;
            };
            Polygon.prototype._FillRuleChanged = function (args) {
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            return Polygon;
        })(Shapes.Shape);
        Shapes.Polygon = Polygon;        
        Nullstone.RegisterType(Polygon, "Polygon");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Polygon.js.map
