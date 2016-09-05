/// <reference path="Brush" />
/// <reference path="Enums" />
/// <reference path="../Primitives/Color" />

module Fayde.Media {
    var fallbackColorStop = Color.FromHex("#FF000000");

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
                    return this.CreatePad(ctx, bounds);
                case GradientSpreadMethod.Repeat:
                    return this.CreateRepeat(ctx, bounds);
                case GradientSpreadMethod.Reflect:
                    return this.CreateReflect(ctx, bounds);
            }
        }
        CreatePad(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }
        CreateRepeat(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }
        CreateReflect(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) { }

        /**
         * In Silverlight gradient offsets can be outside the range 0..1, but
         * in HTML5 they cannot.  Ensure that the gradient offsets are in range
         * even at the expense of differences in rendering between Silverlight
         * and Fayde.  Without this, an attempt to set an out-of-range offset
         * will cause an exception and you get no rendering at all.
         */
        public AddColorStop(grd: any, offset: number, color: Color) {
            if (offset < 0.0) offset = 0.0;
            if (offset > 1.0) offset = 1.0;
            grd.addColorStop(offset, (color || fallbackColorStop).toString());
        }
    }
    Fayde.CoreLibrary.add(GradientBrush);
    Markup.Content(GradientBrush, GradientBrush.GradientStopsProperty);
}
