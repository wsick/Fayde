/// <reference path="Shape.ts" />
/// CODE
/// <reference path="../Media/MediaParser.ts" />

module Fayde.Shapes {
    export class Path extends Shape {
        private static _DataCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return Media.ParseGeometry(value);
            return value;
        }
        // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
        static DataProperty: DependencyProperty = DependencyProperty.RegisterFull("Data", () => Media.Geometry, Path, undefined, (d, args) => (<Shape>d)._InvalidateNaturalBounds(), Path._DataCoercer);
        Data: Media.Geometry;

        _GetFillRule(): FillRule {
            var geom = this.Data;
            if (!geom)
                return super._GetFillRule();
            return (<Media.PathGeometry>geom).FillRule;
        }
        _DrawPath(ctx: RenderContext) {
            var geom = this.Data;
            if (!geom)
                return;
            geom.Draw(ctx);
        }
        _ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect {
            var geom = this.Data;
            if (!geom) {
                this._ShapeFlags = ShapeFlags.Empty;
                return new rect();
            }
            if (logical)
                return geom.GetBounds();

            var thickness = (logical || this._Stroke != null) ? 0.0 : this.StrokeThickness;
            return geom.GetBounds(thickness);
        }
    }
    Nullstone.RegisterType(Path, "Path");
}