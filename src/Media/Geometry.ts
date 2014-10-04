/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export class Geometry extends DependencyObject {
        private _Path: Path.RawPath = null;
        private _LocalBounds: rect = new rect();

        static TransformProperty: DependencyProperty = DependencyProperty.Register("Transform", () => Transform, Geometry, undefined, LReaction((g: Geometry, nv, ov) => g._InvalidateGeometry()));
        Transform: Transform;

        constructor () {
            super();
            this._LocalBounds.Width = Number.NEGATIVE_INFINITY;
            this._LocalBounds.Height = Number.NEGATIVE_INFINITY;
        }

        GetBounds (pars?: Path.IStrokeParameters): rect {
            var compute = rect.isEmpty(this._LocalBounds);

            if (!this._Path) {
                this._Path = this._Build();
                compute = true;
            }

            if (compute)
                rect.copyTo(this.ComputePathBounds(pars), this._LocalBounds);
            var bounds = rect.copyTo(this._LocalBounds);

            var transform = this.Transform
            if (transform != null)
                bounds = transform.TransformBounds(bounds);

            return bounds;
        }

        Draw (ctx: RenderContextEx) {
            if (!this._Path)
                return;

            var transform = this.Transform;
            if (transform != null) {
                ctx.save();
                ctx.transformTransform(transform);
            }
            this._Path.Draw(ctx);
            if (transform != null)
                ctx.restore();
        }

        ComputePathBounds (pars: Path.IStrokeParameters): rect {
            if (!this._Path)
                this._Path = this._Build();
            if (!this._Path)
                return new rect();
            return this._Path.CalculateBounds(pars);
        }

        _InvalidateGeometry () {
            this._Path = null;
            rect.set(this._LocalBounds, 0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            Incite(this);
        }

        _Build (): Path.RawPath {
            return undefined;
        }

        Serialize (): string {
            var path = this._Path;
            if (!path)
                return;
            return path.Serialize();
        }
    }
    Fayde.RegisterType(Geometry, "Fayde.Media", Fayde.XMLNS);

    export class GeometryCollection extends XamlObjectCollection<Geometry> {
        AddingToCollection (value: Geometry, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            ReactTo(value, this, () => Incite(this));
            Incite(this);
            return true;
        }

        RemovedFromCollection (value: Geometry, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            UnreactTo(value, this);
            Incite(this);
        }
    }
    Fayde.RegisterType(GeometryCollection, "Fayde.Media", Fayde.XMLNS);
}