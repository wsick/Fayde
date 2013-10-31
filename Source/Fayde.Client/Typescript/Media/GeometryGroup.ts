/// <reference path="Geometry.ts" />
/// <reference path="../Shapes/Enums.ts" />

module Fayde.Media {
    export class GeometryGroup extends Geometry implements IGeometryListener {
        static FillRulleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), GeometryGroup, Shapes.FillRule.EvenOdd);
        static ChildrenProperty = DependencyProperty.RegisterImmutable("Children", () => GeometryCollection, GeometryGroup);
        FillRule: Shapes.FillRule;
        Children: GeometryCollection;
        constructor() {
            super();
            var coll = GeometryGroup.ChildrenProperty.Initialize<GeometryCollection>(this);
            coll.AttachTo(this);
            coll.Listen(this);
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

        GeometryChanged(newGeometry: Geometry) { this._InvalidateGeometry(); }
    }
    Fayde.RegisterType(GeometryGroup, {
    	Name: "GeometryGroup",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}