/// <reference path="Brush.ts" />
/// <reference path="Enums.ts" />

module Fayde.Media {
    export class GradientBrush extends Brush {
        static GradientStopsProperty = DependencyProperty.RegisterImmutable<GradientStopCollection>("GradientStops", () => GradientStopCollection, GradientBrush);
        static MappingModeProperty = DependencyProperty.Register("MappingMode", () => new Enum(BrushMappingMode), GradientBrush, BrushMappingMode.RelativeToBoundingBox, (d: GradientBrush, args) => d.InvalidateBrush());
        static SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", () => new Enum(GradientSpreadMethod), GradientBrush, GradientSpreadMethod.Pad, (d: GradientBrush, args) => d.InvalidateBrush());
        GradientStops: GradientStopCollection;
        MappingMode: BrushMappingMode;
        SpreadMethod: GradientSpreadMethod;

        constructor() {
            super();
            var coll = GradientBrush.GradientStopsProperty.Initialize(this);
            coll.AttachTo(this);
            ReactTo(coll, this, () => this.InvalidateBrush());
        }

        CreateBrush(ctx: CanvasRenderingContext2D, bounds: minerva.Rect): any {
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
        _CreatePad(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }
        _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }
        _CreateReflect(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }

        _GetMappingModeTransform(bounds: minerva.Rect): number[] {
            if (!bounds)
                return mat3.identity();
            if (this.MappingMode === BrushMappingMode.Absolute)
                return mat3.identity();
            return mat3.createScale(bounds.width, bounds.height);
        }
    }
    Fayde.RegisterType(GradientBrush, Fayde.XMLNS);
    Markup.Content(GradientBrush, GradientBrush.GradientStopsProperty);
}