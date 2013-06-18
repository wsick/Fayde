/// <reference path="Geometry.ts" />
/// CODE
/// <reference path="../Runtime/Enum.ts" />
/// <reference path="../Shapes/Enums.ts" />

module Fayde.Media {
    export class GeometryGroup extends Geometry implements IGeometryListener {
        static FillRulleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), GeometryGroup, Shapes.FillRule.EvenOdd);
        FillRule: Shapes.FillRule;
        Children: GeometryCollection;
        constructor() {
            super();
            var coll = new GeometryCollection();
            coll.AttachTo(this);
            coll.Listen(this);
            Object.defineProperty(this, "Children", {
                value: coll,
                writable: false
            });
        }

        ComputePathBounds(thickness: number): rect {
            var bounds = new rect();
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                rect.unionLogical(bounds, (<Geometry>enumerator.Current).GetBounds(thickness));
            }
            return bounds;
        }
        Draw(ctx: RenderContext) {
            var transform = this.Transform;
            if (transform != null) {
                ctx.Save();
                ctx.Transform(transform);
            }
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Geometry>enumerator.Current).Draw(ctx);
            }
            if (transform != null)
                ctx.Restore();
        }

        private GeometryChanged(newGeometry: Geometry) { this._InvalidateGeometry(); }
    }
    Nullstone.RegisterType(GeometryGroup, "GeometryGroup");
}