/// <reference path="PathSegment.ts" />

module Fayde.Media {
    export class ArcSegment extends PathSegment {
        static IsLargeArcProperty: DependencyProperty = DependencyProperty.RegisterCore("IsLargeArc", () => Boolean, ArcSegment, false);
        static PointProperty: DependencyProperty = DependencyProperty.Register("Point", () => Point, ArcSegment);
        static RotationAngleProperty: DependencyProperty = DependencyProperty.Register("RotationAngle", () => Number, ArcSegment, 0.0);
        static SizeProperty: DependencyProperty = DependencyProperty.Register("Size", () => size, ArcSegment);
        static SweepDirectionProperty: DependencyProperty = DependencyProperty.Register("SweepDirection", () => new Enum(Shapes.SweepDirection), ArcSegment, Shapes.SweepDirection.Counterclockwise);
        IsLargeArc: boolean;
        Point: Point;
        RotationAngle: number;
        Size: size;
        SweepDirection: Shapes.SweepDirection;

        _Append(path: Path.RawPath) {
            var size = this.Size;
            var width = size ? size.Width : 0.0;
            var height = size ? size.Height : 0.0;

            var endpt = this.Point;
            var ex = endpt ? endpt.X : 0.0;
            var ey = endpt ? endpt.Y : 0.0;

            path.EllipticalArc(width, height, this.RotationAngle, this.IsLargeArc, this.SweepDirection, ex, ey);
        }
    }
    Fayde.RegisterType(ArcSegment, "Fayde.Media", Fayde.XMLNS);

    export class BezierSegment extends PathSegment {
        static Point1Property: DependencyProperty = DependencyProperty.Register("Point1", () => Point, BezierSegment);
        static Point2Property: DependencyProperty = DependencyProperty.Register("Point2", () => Point, BezierSegment);
        static Point3Property: DependencyProperty = DependencyProperty.Register("Point3", () => Point, BezierSegment);
        Point1: Point;
        Point2: Point;
        Point3: Point;

        _Append(path: Path.RawPath) {
	        var p1 = this.Point1;
	        var p2 = this.Point2;
	        var p3 = this.Point3;

	        var x1 = p1 ? p1.X : 0.0;
	        var y1 = p1 ? p1.Y : 0.0;
	        var x2 = p2 ? p2.X : 0.0;
	        var y2 = p2 ? p2.Y : 0.0;
	        var x3 = p3 ? p3.X : 0.0;
	        var y3 = p3 ? p3.Y : 0.0;

	        path.CubicBezier(x1, y1, x2, y2, x3, y3);
        }
    }
    Fayde.RegisterType(BezierSegment, "Fayde.Media", Fayde.XMLNS);

    export class LineSegment extends PathSegment {
        static PointProperty: DependencyProperty = DependencyProperty.Register("Point", () => Point, LineSegment);
        Point: Point;

        _Append(path: Path.RawPath) {
            var p = this.Point;
            var x = p ? p.X : 0.0;
            var y = p ? p.Y : 0.0;
            path.Line(x, y);
        }
    }
    Fayde.RegisterType(LineSegment, "Fayde.Media", Fayde.XMLNS);

    export class PolyBezierSegment extends PathSegment {
        static PointsProperty = DependencyProperty.RegisterImmutable<Shapes.PointCollection>("Points", () => Shapes.PointCollection, PolyBezierSegment);
        Points: Shapes.PointCollection;

        constructor() {
            super();
            PolyBezierSegment.PointsProperty.Initialize(this);
        }

        _Append(path: Path.RawPath) {
            var points = this.Points;
            if (!points || (points.Count % 3) !== 0)
                return;

            var p1: Point;
            var p2: Point;
            var p3: Point;
            var enumerator = points.GetEnumerator();
            while (enumerator.moveNext()) {
                p1 = enumerator.Current;
                enumerator.moveNext();
                p2 = enumerator.Current;
                enumerator.moveNext();
                p3 = enumerator.Current;
                path.CubicBezier(p1.X, p1.Y, p2.X, p2.Y, p3.X, p3.Y);
            }
        }
    }
    Fayde.RegisterType(PolyBezierSegment, "Fayde.Media", Fayde.XMLNS);
    Xaml.Content(PolyBezierSegment, PolyBezierSegment.PointsProperty);

    export class PolyLineSegment extends PathSegment {
        static PointsProperty = DependencyProperty.RegisterImmutable<Shapes.PointCollection>("Points", () => Shapes.PointCollection, PolyLineSegment);
        Points: Shapes.PointCollection;

        constructor() {
            super();
            PolyLineSegment.PointsProperty.Initialize(this);
        }

        _Append(path: Path.RawPath) {
            var p: Point;
            var enumerator = this.Points.GetEnumerator();
            while (enumerator.moveNext()) {
                p = enumerator.Current;
                path.Line(p.X, p.Y);
            }
            NotImplemented("PolyLineSegment._Append");
        }
    }
    Fayde.RegisterType(PolyLineSegment, "Fayde.Media", Fayde.XMLNS);
    Xaml.Content(PolyLineSegment, PolyLineSegment.PointsProperty);

    export class PolyQuadraticBezierSegment extends PathSegment {
        static PointsProperty = DependencyProperty.RegisterImmutable<Shapes.PointCollection>("Points", () => Shapes.PointCollection, PolyQuadraticBezierSegment);
        Points: Shapes.PointCollection;

        constructor() {
            super();
            PolyQuadraticBezierSegment.PointsProperty.Initialize(this);
        }

        _Append(path: Path.RawPath) {
            var points = this.Points;
            if (!points || (points.Count % 2) !== 0)
                return;

            var x0 = path.EndX;
            var y0 = path.EndY;
            var x1: number;
            var y1: number;
            var x2: number;
            var y2: number;
            var x3: number;
            var y3: number;
            var enumerator = points.GetEnumerator();
            while (enumerator.moveNext()) {
                x1 = enumerator.Current.X;
                y1 = enumerator.Current.Y;
                enumerator.moveNext();
                x2 = enumerator.Current.X;
                y2 = enumerator.Current.Y;
                x3 = x2;
                y3 = y2;
                
		        x2 = x1 + (x2 - x1) / 3;
		        y2 = y1 + (y2 - y1) / 3;
		        x1 = x0 + 2 * (x1 - x0) / 3;
		        y1 = y0 + 2 * (y1 - y0) / 3;

                path.CubicBezier(x1, y1, x2, y2, x3, y3);
                x0 = x3;
                y0 = y3;
            }
        }
    }
    Fayde.RegisterType(PolyQuadraticBezierSegment, "Fayde.Media", Fayde.XMLNS);
    Xaml.Content(PolyQuadraticBezierSegment, PolyQuadraticBezierSegment.PointsProperty);

    export class QuadraticBezierSegment extends PathSegment {
        static Point1Property: DependencyProperty = DependencyProperty.Register("Point1", () => Point, QuadraticBezierSegment);
        static Point2Property: DependencyProperty = DependencyProperty.Register("Point2", () => Point, QuadraticBezierSegment);
        Point1: Point;
        Point2: Point;

        _Append(path: Path.RawPath) {
            var p1 = this.Point1;
            var p2 = this.Point2;

            var x1 = p1 ? p1.X : 0.0;
            var y1 = p1 ? p1.Y : 0.0;
            var x2 = p2 ? p2.X : 0.0;
            var y2 = p2 ? p2.Y : 0.0;

            path.QuadraticBezier(x1, y1, x2, y2);
        }
    }
    Fayde.RegisterType(QuadraticBezierSegment, "Fayde.Media", Fayde.XMLNS);
}