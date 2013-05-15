var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="PathSegment.ts" />
    /// CODE
    /// <reference path="../Shapes/PointCollection.ts" />
    (function (Media) {
        var ArcSegment = (function (_super) {
            __extends(ArcSegment, _super);
            function ArcSegment() {
                _super.apply(this, arguments);

            }
            ArcSegment.IsLargeArcProperty = DependencyProperty.RegisterCore("IsLargeArc", function () {
                return Boolean;
            }, ArcSegment, false);
            ArcSegment.PointProperty = DependencyProperty.Register("Point", function () {
                return Point;
            }, ArcSegment);
            ArcSegment.RotationAngleProperty = DependencyProperty.Register("RotationAngle", function () {
                return Number;
            }, ArcSegment, 0.0);
            ArcSegment.SizeProperty = DependencyProperty.Register("Size", function () {
                return size;
            }, ArcSegment);
            ArcSegment.SweepDirectionProperty = DependencyProperty.Register("SweepDirection", function () {
                return new Enum(Fayde.Shapes.SweepDirection);
            }, ArcSegment, Fayde.Shapes.SweepDirection.Counterclockwise);
            ArcSegment.prototype._Append = function (path) {
                var size = this.Size;
                var width = size ? size.Width : 0.0;
                var height = size ? size.Height : 0.0;
                var endpt = this.Point;
                var ex = endpt ? endpt.X : 0.0;
                var ey = endpt ? endpt.Y : 0.0;
                path.EllipticalArc(width, height, this.RotationAngle, this.IsLargeArc, this.SweepDirection, ex, ey);
            };
            return ArcSegment;
        })(Media.PathSegment);
        Media.ArcSegment = ArcSegment;        
        Nullstone.RegisterType(ArcSegment, "ArcSegment");
        var BezierSegment = (function (_super) {
            __extends(BezierSegment, _super);
            function BezierSegment() {
                _super.apply(this, arguments);

            }
            BezierSegment.Point1Property = DependencyProperty.Register("Point1", function () {
                return Point;
            }, BezierSegment);
            BezierSegment.Point2Property = DependencyProperty.Register("Point2", function () {
                return Point;
            }, BezierSegment);
            BezierSegment.Point3Property = DependencyProperty.Register("Point3", function () {
                return Point;
            }, BezierSegment);
            BezierSegment.prototype._Append = function (path) {
                var p1 = this.Point1;
                var p2 = this.Point2;
                var p3 = this.Point3;
                var x1 = p1 ? p1.X : 0.0;
                var y1 = p1 ? p1.Y : 0.0;
                var x2 = p2 ? p2.X : 0.0;
                var y2 = p2 ? p2.Y : 0.0;
                var x3 = p3 ? p3.X : 0.0;
                var y3 = p3 ? p3.Y : 0.0;
                path.Bezier(x1, y1, x2, y2, x3, y3);
            };
            return BezierSegment;
        })(Media.PathSegment);
        Media.BezierSegment = BezierSegment;        
        Nullstone.RegisterType(BezierSegment, "BezierSegment");
        var LineSegment = (function (_super) {
            __extends(LineSegment, _super);
            function LineSegment() {
                _super.apply(this, arguments);

            }
            LineSegment.PointProperty = DependencyProperty.Register("Point", function () {
                return Point;
            }, LineSegment);
            LineSegment.prototype._Append = function (path) {
                var p = this.Point;
                var x = p ? p.X : 0.0;
                var y = p ? p.Y : 0.0;
                path.Line(x, y);
            };
            return LineSegment;
        })(Media.PathSegment);
        Media.LineSegment = LineSegment;        
        Nullstone.RegisterType(LineSegment, "LineSegment");
        var PolyBezierSegment = (function (_super) {
            __extends(PolyBezierSegment, _super);
            function PolyBezierSegment() {
                _super.apply(this, arguments);

            }
            PolyBezierSegment.Annotations = {
                ContentProperty: "Points"
            };
            PolyBezierSegment.prototype._Append = function (path) {
                var points = this.Points;
                if(!points || (points.Count % 3) !== 0) {
                    return;
                }
                var p1;
                var p2;
                var p3;
                var enumerator = points.GetEnumerator();
                while(enumerator.MoveNext()) {
                    p1 = enumerator.Current;
                    enumerator.MoveNext();
                    p2 = enumerator.Current;
                    enumerator.MoveNext();
                    p3 = enumerator.Current;
                    path.Bezier(p1.X, p1.Y, p2.X, p2.Y, p3.X, p3.Y);
                }
            };
            return PolyBezierSegment;
        })(Media.PathSegment);
        Media.PolyBezierSegment = PolyBezierSegment;        
        Nullstone.RegisterType(PolyBezierSegment, "PolyBezierSegment");
        var PolyLineSegment = (function (_super) {
            __extends(PolyLineSegment, _super);
            function PolyLineSegment() {
                _super.apply(this, arguments);

            }
            PolyLineSegment.Annotations = {
                ContentProperty: "Points"
            };
            PolyLineSegment.prototype._Append = function (path) {
                var p;
                var enumerator = this.Points.GetEnumerator();
                while(enumerator.MoveNext()) {
                    p = enumerator.Current;
                    path.Line(p.X, p.Y);
                }
                NotImplemented("PolyLineSegment._Append");
            };
            return PolyLineSegment;
        })(Media.PathSegment);
        Media.PolyLineSegment = PolyLineSegment;        
        Nullstone.RegisterType(PolyLineSegment, "PolyLineSegment");
        var PolyQuadraticBezierSegment = (function (_super) {
            __extends(PolyQuadraticBezierSegment, _super);
            function PolyQuadraticBezierSegment() {
                _super.apply(this, arguments);

            }
            PolyQuadraticBezierSegment.Annotations = {
                ContentProperty: "Points"
            };
            PolyQuadraticBezierSegment.prototype._Append = function (path) {
                var points = this.Points;
                if(!points || (points.Count % 2) !== 0) {
                    return;
                }
                var x0 = path.EndX;
                var y0 = path.EndY;
                var x1;
                var y1;
                var x2;
                var y2;
                var x3;
                var y3;
                var enumerator = points.GetEnumerator();
                while(enumerator.MoveNext()) {
                    x1 = enumerator.Current.X;
                    y1 = enumerator.Current.Y;
                    enumerator.MoveNext();
                    x2 = enumerator.Current.X;
                    y2 = enumerator.Current.Y;
                    x3 = x2;
                    y3 = y2;
                    x2 = x1 + (x2 - x1) / 3;
                    y2 = y1 + (y2 - y1) / 3;
                    x1 = x0 + 2 * (x1 - x0) / 3;
                    y1 = y0 + 2 * (y1 - y0) / 3;
                    path.Bezier(x1, y1, x2, y2, x3, y3);
                    x0 = x3;
                    y0 = y3;
                }
            };
            return PolyQuadraticBezierSegment;
        })(Media.PathSegment);
        Media.PolyQuadraticBezierSegment = PolyQuadraticBezierSegment;        
        Nullstone.RegisterType(PolyQuadraticBezierSegment, "PolyQuadraticBezierSegment");
        var QuadraticBezierSegment = (function (_super) {
            __extends(QuadraticBezierSegment, _super);
            function QuadraticBezierSegment() {
                _super.apply(this, arguments);

            }
            QuadraticBezierSegment.Point1Property = DependencyProperty.Register("Point1", function () {
                return Point;
            }, QuadraticBezierSegment);
            QuadraticBezierSegment.Point2Property = DependencyProperty.Register("Point2", function () {
                return Point;
            }, QuadraticBezierSegment);
            QuadraticBezierSegment.prototype._Append = function (path) {
                var p1 = this.Point1;
                var p2 = this.Point2;
                var x1 = p1 ? p1.X : 0.0;
                var y1 = p1 ? p1.Y : 0.0;
                var x2 = p2 ? p2.X : 0.0;
                var y2 = p2 ? p2.Y : 0.0;
                path.Quadratic(x1, y1, x2, y2);
            };
            return QuadraticBezierSegment;
        })(Media.PathSegment);
        Media.QuadraticBezierSegment = QuadraticBezierSegment;        
        Nullstone.RegisterType(QuadraticBezierSegment, "QuadraticBezierSegment");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathSegments.js.map
