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
    export enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    export enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    export enum SweepDirection {
        Counterclockwise = 0,
        Clockwise = 1,
    }
}