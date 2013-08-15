/// <reference path="Brush.ts" />
/// <reference path="../Runtime/Enum.ts" />
/// <reference path="Enums.ts" />
/// CODE
/// <reference path="GradientStop.ts" />

module Fayde.Media {
    export class GradientBrush extends Brush implements IGradientStopsListener {
        static GradientStopsProperty = DependencyProperty.RegisterImmutable("GradientStops", () => GradientStopCollection, GradientBrush);
        static MappingModeProperty = DependencyProperty.Register("MappingMode", () => new Enum(BrushMappingMode), GradientBrush, BrushMappingMode.RelativeToBoundingBox, (d, args) => (<Brush>d).InvalidateBrush());
        static SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", () => new Enum(GradientSpreadMethod), GradientBrush, GradientSpreadMethod.Pad, (d, args) => (<Brush>d).InvalidateBrush());
        GradientStops: GradientStopCollection;
        MappingMode: BrushMappingMode;
        SpreadMethod: GradientSpreadMethod;

        static Annotations = { ContentProperty: "GradientStops" }

        constructor() {
            super();
            var coll = GradientBrush.GradientStopsProperty.Initialize<GradientStopCollection>(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }

        CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
            var spread = this.SpreadMethod;
            switch (spread) {
                case GradientSpreadMethod.Pad:
                default:
                    return this._CreatePad(ctx, bounds);
                case GradientSpreadMethod.Repeat:
                    return this._CreateRepeat(ctx, bounds);
                case GradientSpreadMethod.Reflect:
                    return this._CreateReflect(ctx, bounds);
            }
        }
        _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect) { }
        _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect) { }
        _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect) { }

        _GetMappingModeTransform(bounds: rect): number[] {
            if (!bounds)
                return mat3.identity();
            if (this.MappingMode === BrushMappingMode.Absolute)
                return mat3.identity();
            return mat3.createScale(bounds.Width, bounds.Height);
        }

        GradientStopsChanged(newGradientStops: GradientStopCollection) { this.InvalidateBrush(); }
    }
    Nullstone.RegisterType(GradientBrush, "GradientBrush");
}