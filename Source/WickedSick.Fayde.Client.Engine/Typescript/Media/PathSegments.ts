/// <reference path="PathSegment.ts" />
/// CODE
/// <reference path="../Shapes/PointCollection.ts" />

module Fayde.Media {
    declare var NotImplemented;

    export class ArcSegment extends PathSegment {
        static IsLargeArcProperty: DependencyProperty = DependencyProperty.RegisterCore("IsLargeArc", () => Boolean, ArcSegment, false);
        static PointProperty: DependencyProperty = DependencyProperty.Register("Point", () => Point, ArcSegment);
        static RotationAngleProperty: DependencyProperty = DependencyProperty.Register("RotationAngle", () => Number, ArcSegment, 0.0);
        static SizeProperty: DependencyProperty = DependencyProperty.Register("Size", () => size, ArcSegment);
        static SweepDirectionProperty: DependencyProperty = DependencyProperty.Register("SweepDirection", () => new Enum(Shapes.SweepDirection), ArcSegment, Shapes.SweepDirection.Counterclockwise);
        IsLargeArc: bool;
        Point: Point;
        RotationAngle: number;
        Size: size;
        SweepDirection: Shapes.SweepDirection;

        _Append(path: Shapes.RawPath) {
            NotImplemented("ArcSegment._Append");
        }
    }
    Nullstone.RegisterType(ArcSegment, "ArcSegment");

    export class BezierSegment extends PathSegment {
        static Point1Property: DependencyProperty = DependencyProperty.Register("Point1", () => Point, BezierSegment);
        static Point2Property: DependencyProperty = DependencyProperty.Register("Point2", () => Point, BezierSegment);
        static Point3Property: DependencyProperty = DependencyProperty.Register("Point3", () => Point, BezierSegment);
        Point1: Point;
        Point2: Point;
        Point3: Point;

        _Append(path: Shapes.RawPath) {
            NotImplemented("BezierSegment._Append");
        }
    }
    Nullstone.RegisterType(BezierSegment, "BezierSegment");

    export class LineSegment extends PathSegment {
        static PointProperty: DependencyProperty = DependencyProperty.Register("Point", () => Point, LineSegment);
        Point: Point;

        _Append(path: Shapes.RawPath) {
            NotImplemented("LineSegment._Append");
        }
    }
    Nullstone.RegisterType(LineSegment, "LineSegment");

    export class PolyBezierSegment extends PathSegment {
        static Annotations = { ContentProperty: "Points" }
        Points: Shapes.PointCollection;

        _Append(path: Shapes.RawPath) {
            NotImplemented("PolyBezierSegment._Append");
        }
    }
    Nullstone.RegisterType(PolyBezierSegment, "PolyBezierSegment");

    export class PolyLineSegment extends PathSegment {
        static Annotations = { ContentProperty: "Points" }
        Points: Shapes.PointCollection;

        _Append(path: Shapes.RawPath) {
            NotImplemented("PolyLineSegment._Append");
        }
    }
    Nullstone.RegisterType(PolyLineSegment, "PolyLineSegment");

    export class PolyQuadraticBezierSegment extends PathSegment {
        static Annotations = { ContentProperty: "Points" }
        Points: Shapes.PointCollection;

        _Append(path: Shapes.RawPath) {
            NotImplemented("PolyQuadraticBezierSegment._Append");
        }
    }
    Nullstone.RegisterType(PolyQuadraticBezierSegment, "PolyQuadraticBezierSegment");

    export class QuadraticBezierSegment extends PathSegment {
        static Point1Property: DependencyProperty = DependencyProperty.Register("Point1", () => Point, QuadraticBezierSegment);
        static Point2Property: DependencyProperty = DependencyProperty.Register("Point2", () => Point, QuadraticBezierSegment);
        Point1: Point;
        Point2: Point;

        _Append(path: Shapes.RawPath) {
            NotImplemented("QuadraticBezierSegment._Append");
        }
    }
    Nullstone.RegisterType(QuadraticBezierSegment, "QuadraticBezierSegment");
}