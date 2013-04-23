/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Media/Brush.ts" />
/// <reference path="../Media/Enums.ts" />
/// <reference path="Enums.ts" />
/// <reference path="DoubleCollection.ts" />

module Fayde.Shapes {
    export class Shape extends FrameworkElement {
        private _ShapeFlags = 0;
        private _StretchXform: number[] = mat3.identity();
        private _NaturalBounds: rect = new rect();

        static FillProperty: DependencyProperty = DependencyProperty.Register("Fill", () => Media.Brush, Shape);
        //http://msdn.microsoft.com/en-us/library/system.windows.shapes.shape.stretch(v=vs.95).aspx
        static StretchProperty: DependencyProperty = DependencyProperty.Register("Stretch", () => new Enum(Media.Stretch), Shape, Media.Stretch.None);
        static StrokeProperty: DependencyProperty = DependencyProperty.Register("Stroke", () => Media.Brush, Shape);
        static StrokeThicknessProperty: DependencyProperty = DependencyProperty.Register("StrokeThickness", () => Number, Shape, 1.0);
        static StrokeDashArrayProperty: DependencyProperty = DependencyProperty.Register("StrokeDashArray", () => DoubleCollection, Shape);
        static StrokeDashCapProperty: DependencyProperty = DependencyProperty.Register("StrokeDashCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat);
        static StrokeDashOffsetProperty: DependencyProperty = DependencyProperty.Register("StrokeDashOffset", () => Number, Shape, 0.0);
        static StrokeEndLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeEndLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat);
        static StrokeLineJoinProperty: DependencyProperty = DependencyProperty.Register("StrokeLineJoin", () => new Enum(PenLineJoin), Shape, PenLineJoin.Miter);
        static StrokeMiterLimitProperty: DependencyProperty = DependencyProperty.Register("StrokeMiterLimit", () => Number, Shape, 10.0);
        static StrokeStartLineCapProperty: DependencyProperty = DependencyProperty.Register("StrokeStartLineCap", () => new Enum(PenLineCap), Shape, PenLineCap.Flat);
        Fill: Media.Brush;
        Stretch: Media.Stretch;
        Stroke: Media.Brush;
        StrokeThickness: number;
        StrokeDashArray: DoubleCollection;
        StrokeDashCap: PenLineCap;
        StrokeDashOffset: number;
        StrokeEndLineCap: PenLineCap;
        StrokeLineJoin: PenLineJoin;
        StrokeMiterLimit: number;
        StrokeStartLineCap: PenLineCap;
    }
    Nullstone.RegisterType(Shape, "Shape");
}