module Fayde.Shapes {
    export enum PathEntryType {
        Move = 0,
        Line = 1,
        Rect = 2,
        Quadratic = 3,
        Bezier = 4,
        EllipticalArc = 5,
        Arc = 6,
        ArcTo = 7,
        Close = 8,
    }
    export enum ShapeFlags {
        None = 0,
        Empty = 1,
        Normal = 2,
        Degenerate = 4,
        Radii = 8,
    }

    export enum PenLineCap {
        Flat = 0,
        Square = 1,
        Round = 2,
        Triangle = 3,
    }
    Fayde.RegisterEnum(PenLineCap, {
        Name: "PenLineCap",
        Namespace: "Fayde.Shapes",
        XmlNamespace: Fayde.XMLNS
    });

    export enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    Fayde.RegisterEnum(PenLineJoin, {
        Name: "PenLineJoin",
        Namespace: "Fayde.Shapes",
        XmlNamespace: Fayde.XMLNS
    });

    export enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    Fayde.RegisterEnum(FillRule, {
        Name: "FillRule",
        Namespace: "Fayde.Shapes",
        XmlNamespace: Fayde.XMLNS
    });

    export enum SweepDirection {
        Counterclockwise = 0,
        Clockwise = 1,
    }
    Fayde.RegisterEnum(SweepDirection, {
        Name: "SweepDirection",
        Namespace: "Fayde.Shapes",
        XmlNamespace: Fayde.XMLNS
    });
}