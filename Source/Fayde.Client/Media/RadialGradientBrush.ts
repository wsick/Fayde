/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty: DependencyProperty = DependencyProperty.RegisterCore("Center", () => Point, RadialGradientBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        static GradientOriginProperty: DependencyProperty = DependencyProperty.RegisterCore("GradientOrigin", () => Point, RadialGradientBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        static RadiusXProperty: DependencyProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RadialGradientBrush, 0.5, (d, args) => (<Brush>d).InvalidateBrush());
        static RadiusYProperty: DependencyProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RadialGradientBrush, 0.5, (d, args) => (<Brush>d).InvalidateBrush());
        Center: Point; //undefined should be treated as 0.5,0.5
        GradientOrigin: Point; //undefined should be treated as 0.5,0.5
        RadiusX: number;
        RadiusY: number;

        CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
            //TODO: Implement
            return undefined;
        }
    }
    Fayde.RegisterType(RadialGradientBrush, "Fayde.Media", Fayde.XMLNS);
}