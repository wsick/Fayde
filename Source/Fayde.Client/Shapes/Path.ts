/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Path extends Shape implements Media.IGeometryListener {
        private static _DataCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return Media.ParseGeometry(value);
            return value;
        }
        // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
        static DataProperty: DependencyProperty = DependencyProperty.RegisterFull("Data", () => Media.Geometry, Path, undefined, (d, args) => (<Path>d)._OnDataChanged(args), Path._DataCoercer, undefined, undefined, false);
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
            var pars: Fayde.Path.IStrokeParameters = {
                thickness: thickness,
                startCap: this.StrokeStartLineCap,
                endCap: this.StrokeEndLineCap,
                join: this.StrokeLineJoin,
                miterLimit: this.StrokeMiterLimit
            };
            return geom.GetBounds(pars);
        }

        private _OnDataChanged(args: IDependencyPropertyChangedEventArgs) {
            var old = args.OldValue;
            if (old instanceof Media.Geometry)
                (<Media.Geometry>old).Unlisten(this);
            this.GeometryChanged(args.NewValue);
            var n = args.NewValue;
            if (n instanceof Media.Geometry)
                (<Media.Geometry>n).Listen(this);
        }
        GeometryChanged(newGeometry: Media.Geometry) {
            this._InvalidateNaturalBounds();
        }
    }
    Fayde.RegisterType(Path, {
    	Name: "Path",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });
}