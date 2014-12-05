/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty = DependencyProperty.RegisterCore("Center", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static GradientOriginProperty = DependencyProperty.RegisterCore("GradientOrigin", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        Center: Point; //undefined should be treated as 0.5,0.5
        GradientOrigin: Point; //undefined should be treated as 0.5,0.5
        RadiusX: number;
        RadiusY: number;

        CreateBrush (ctx: CanvasRenderingContext2D, bounds: minerva.Rect): any {
            //TODO: Implement
            return undefined;
        }
    }
    Fayde.CoreLibrary.add(RadialGradientBrush);
}