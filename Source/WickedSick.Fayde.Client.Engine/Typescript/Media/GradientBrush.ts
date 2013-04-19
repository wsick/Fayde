/// <reference path="Brush.ts" />
/// <reference path="../Runtime/Enum.ts" />
/// CODE
/// <reference path="GradientStop.ts" />

module Fayde.Media {
    export enum BrushMappingMode {
        Absolute = 0,
        RelativeToBoundingBox = 1,
    }
    export enum GradientSpreadMethod {
        Pad = 0,
        Reflect = 1,
        Repeat = 2,
    }

    export class GradientBrush extends Brush implements IGradientStopsListener {
        static MappingModeProperty = DependencyProperty.Register("MappingMode", () => new Enum(BrushMappingMode), GradientBrush, BrushMappingMode.RelativeToBoundingBox, (d, args) => (<Brush>d).InvalidateBrush());
        static SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", () => new Enum(GradientSpreadMethod), GradientBrush, GradientSpreadMethod.Pad, (d, args) => (<Brush>d).InvalidateBrush());
        GradientStops: GradientStopCollection;
        MappingMode: BrushMappingMode;
        SpreadMethod: GradientSpreadMethod;

        static Annotations = { ContentProperty: "GradientStops" }

        constructor() {
            super();
            var coll = new GradientStopCollection();
            coll.Listen(this);
            Object.defineProperty(this, "GradientStops", {
                value: coll,
                writable: false
            });
        }

        private CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
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

        private GradientStopsChanged(newGradientStops: GradientStopCollection) { this.InvalidateBrush(); }
    }
    Nullstone.RegisterType(GradientBrush, "GradientBrush");
}