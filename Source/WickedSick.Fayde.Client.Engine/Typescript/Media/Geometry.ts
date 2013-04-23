/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="Transform.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Engine/RenderContext.ts" />
/// <reference path="../Shapes/RawPath.ts" />

module Fayde.Media {
    export interface IGeometryListener {
        GeometryChanged(newGeometry: Geometry);
    }

    export class Geometry extends DependencyObject {
        private _Path: Shapes.RawPath = null;
        private _LocalBounds: rect = new rect();
        private _Listener: IGeometryListener = null;

        static TransformProperty: DependencyProperty = DependencyProperty.Register("Transform", () => Transform, Geometry, undefined, (d, args) => (<Geometry>d)._TransformChanged(args));
        Transform: Transform;

        constructor() {
            super();
            this._LocalBounds.Width = Number.NEGATIVE_INFINITY;
            this._LocalBounds.Height = Number.NEGATIVE_INFINITY;
        }

        GetBounds(thickness?: number): rect {
            var compute = rect.isEmpty(this._LocalBounds);

            if (!this._Path) {
                this._Path = this._Build();
                compute = true;
            }

            if (compute)
                rect.copyTo(this.ComputePathBounds(thickness), this._LocalBounds);
            var bounds = rect.clone(this._LocalBounds);

            var transform = this.Transform
            if (transform != null)
                bounds = transform.TransformBounds(bounds);

            return bounds;
        }
        Draw(ctx: RenderContext) {
            if (!this._Path)
                return;

            var transform = this.Transform;
            if (transform != null) {
                ctx.Save();
                ctx.Transform(transform);
            }
            this._Path.Draw(ctx);
            if (transform != null)
                ctx.Restore();
        }
        ComputePathBounds(thickness: number): rect {
            if (!this._Path)
                this._Path = this._Build();
            if (!this._Path)
                return new rect();
            return this._Path.CalculateBounds(thickness);
        }
        _InvalidateGeometry() {
            this._Path = null;
            rect.set(this._LocalBounds, 0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
        _Build(): Shapes.RawPath { return undefined; }

        Listen(listener: IGeometryListener) { this._Listener = listener; }
        Unlisten(listener: IGeometryListener) { if (this._Listener === listener) this._Listener = null; }

        private TransformChanged(source: Transform) {
            this._InvalidateGeometry();
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(this);
        }
        private _TransformChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldt = <Transform>args.OldValue;
            var newt = <Transform>args.NewValue;
            if (oldt)
                oldt.Unlisten(this);
            if (newt)
                newt.Listen(this);
            this._InvalidateGeometry();
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(this);
        }
    }
    Nullstone.RegisterType(Geometry, "Geometry");

    export class GeometryCollection extends XamlObjectCollection implements IGeometryListener {
        private _Listener: IGeometryListener;
        Listen(listener: IGeometryListener) { this._Listener = listener; }
        Unlisten(listener: IGeometryListener) { if (this._Listener === listener) this._Listener = null; }

        AddedToCollection(value: Geometry, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(value);
        }
        RemovedFromCollection(value: Geometry, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(value);
        }
        private GeometryChanged(newGeometry: Geometry) {
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(newGeometry);
        }
    }
    Nullstone.RegisterType(GeometryCollection, "GeometryCollection");
}