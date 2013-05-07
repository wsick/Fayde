/// <reference path="Shape.ts" />
/// CODE
/// <reference path="../Media/MediaParser.ts" />

module Fayde.Shapes {
    export class Path extends Shape {
        private _ShapeFlags: ShapeFlags; //defined in Shape
        private _Stroke: Media.Brush; //defined in Shape

        private static _DataCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return Media.ParseGeometry(value);
            return value;
        }
        // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
        static DataProperty: DependencyProperty = DependencyProperty.RegisterFull("Data", () => Media.Geometry, Path, undefined, (d, args) => (<Shape>d)._InvalidateNaturalBounds(), undefined, Path._DataCoercer);
        Data: Media.Geometry;

        private _GetFillRule(): FillRule {
            var geom = this.Data;
            if (!geom)
                return super._GetFillRule();
            return (<Media.PathGeometry>geom).FillRule;
        }
        private _DrawPath(ctx: RenderContext) {
            var geom = this.Data;
            if (!geom)
                return;
            geom.Draw(ctx);
        }
        private _ComputeShapeBoundsImpl(logical: bool, matrix: number[]): rect {
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