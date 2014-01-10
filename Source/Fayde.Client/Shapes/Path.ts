/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Path extends Shape implements Media.IGeometryListener {
        CreateLayoutUpdater(node: UINode) { return new PathLayoutUpdater(node); }

        private static _DataCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return Media.ParseGeometry(value);
            return value;
        }
        // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
        static DataProperty: DependencyProperty = DependencyProperty.RegisterFull("Data", () => Media.Geometry, Path, undefined, (d, args) => (<Path>d)._OnDataChanged(args), Path._DataCoercer, undefined, undefined, false);
        Data: Media.Geometry;

        private _OnDataChanged(args: IDependencyPropertyChangedEventArgs) {
            var old = args.OldValue;
            if (old instanceof Media.Geometry)
                (<Media.Geometry>old).Unlisten(this);
            this.GeometryChanged(args.NewValue);
            var n = args.NewValue;
            if (n instanceof Media.Geometry)
                (<Media.Geometry>n).Listen(this);

            var lu = <PathLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.Data = args.NewValue;
        }
        GeometryChanged(newGeometry: Media.Geometry) {
            var lu = <PathLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu.InvalidateNaturalBounds();
        }
    }
    Fayde.RegisterType(Path, {
    	Name: "Path",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });

    export class PathLayoutUpdater extends ShapeLayoutUpdater {
        Data: Media.Geometry = null;

        ComputeShapeBoundsImpl(logical: boolean, matrix?: number[]): rect {
            var geom = this.Data;
            if (!geom) {
                this.SFlags = ShapeFlags.Empty;
                return new rect();
            }
            return geom.GetBounds(this.CreateStrokeParameters(logical));
        }
        Draw(ctx: RenderContextEx) {
            var geom = this.Data;
            if (geom)
                geom.Draw(ctx);
        }
        GetFillRule(): string {
            var geom = this.Data;
            if (!geom)
                return super.GetFillRule();
            return (<Media.PathGeometry>geom).FillRule === FillRule.EvenOdd ? "evenodd" : "nonzero";
        }
    }
}