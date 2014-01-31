/// <reference path="Geometry.ts" />
/// <reference path="../Shapes/Enums.ts" />

module Fayde.Media {
    export class GeometryGroup extends Geometry implements IGeometryListener {
        static FillRulleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), GeometryGroup, Shapes.FillRule.EvenOdd);
        static ChildrenProperty = DependencyProperty.RegisterImmutable<GeometryCollection>("Children", () => GeometryCollection, GeometryGroup);
        FillRule: Shapes.FillRule;
        Children: GeometryCollection;
        constructor() {
            super();
            var coll = GeometryGroup.ChildrenProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }

        ComputePathBounds(pars: Path.IStrokeParameters): rect {
            var bounds = new rect();
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                rect.unionLogical(bounds, (<Geometry>enumerator.Current).GetBounds(pars));
            }
            return bounds;
        }
        Draw(ctx: RenderContextEx) {
            var transform = this.Transform;
            if (transform != null) {
                ctx.save();
                ctx.transformTransform(transform);
            }
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Geometry>enumerator.Current).Draw(ctx);
            }
            if (transform != null)
                ctx.restore();
        }

        GeometryChanged(newGeometry: Geometry) { this._InvalidateGeometry(); }
    }
    Fayde.RegisterType(GeometryGroup, "Fayde.Media", Fayde.XMLNS);
}