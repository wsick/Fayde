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
                NotImplemented("ArcSegment._Append");
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
                NotImplemented("BezierSegment._Append");
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
                NotImplemented("LineSegment._Append");
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
                NotImplemented("PolyBezierSegment._Append");
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
                NotImplemented("PolyQuadraticBezierSegment._Append");
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
                NotImplemented("QuadraticBezierSegment._Append");
            };
            return QuadraticBezierSegment;
        })(Media.PathSegment);
        Media.QuadraticBezierSegment = QuadraticBezierSegment;        
        Nullstone.RegisterType(QuadraticBezierSegment, "QuadraticBezierSegment");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathSegments.js.map
