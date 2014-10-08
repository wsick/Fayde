/// <reference path="Shape.ts" />

module Fayde.Shapes {
    import ShapeUpdater = minerva.shapes.shape.ShapeUpdater;
    export class Path extends Shape {
        //CreateLayoutUpdater(node: UINode) { return new PathLayoutUpdater(node); }

        private static _DataCoercer (dobj: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return Media.ParseGeometry(value);
            return value;
        }

        // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
        static DataProperty = DependencyProperty.RegisterFull("Data", () => Media.Geometry, Path, undefined, undefined, Path._DataCoercer, undefined, undefined, false);
        Data: Media.Geometry;
    }
    Fayde.RegisterType(Path, "Fayde.Shapes", Fayde.XMLNS);

    module reactions {
        UIReaction<Media.Geometry>(Path.DataProperty, (upd: ShapeUpdater, ov, nv) => upd.invalidateNaturalBounds());
    }

    //TODO: Implement path updater
    /*
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
     */
}