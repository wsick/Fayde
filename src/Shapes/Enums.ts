module Fayde.Shapes {
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
    Fayde.RegisterEnum(PenLineCap, "PenLineCap", Fayde.XMLNS);

    export enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    Fayde.RegisterEnum(PenLineJoin, "PenLineJoin", Fayde.XMLNS);

    export enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    Fayde.RegisterEnum(FillRule, "FillRule", Fayde.XMLNS);

    export enum SweepDirection {
        Counterclockwise = 0,
        Clockwise = 1,
    }
    Fayde.RegisterEnum(SweepDirection, "SweepDirection", Fayde.XMLNS);
}