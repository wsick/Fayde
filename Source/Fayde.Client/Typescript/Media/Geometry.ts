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
            var bounds = rect.copyTo(this._LocalBounds);

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
            this._Path.DrawRenderCtx(ctx);
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
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(this);
        }
        _Build(): Shapes.RawPath { return undefined; }

        Listen(listener: IGeometryListener) { this._Listener = listener; }
        Unlisten(listener: IGeometryListener) { if (this._Listener === listener) this._Listener = null; }

        private _TransformListener: ITransformChangedListener;
        private _TransformChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._TransformListener) {
                this._TransformListener.Detach();
                this._TransformListener = null;
            }
            var newt = <Transform>args.NewValue;
            if (newt)
                this._TransformListener = newt.Listen((source: Transform) => this._InvalidateGeometry());
            this._InvalidateGeometry();
        }
        
        Serialize(): string {
            var path = this._Path;
            if (!path)
                return;
            return path.Serialize();
        }
    }
    Fayde.RegisterType(Geometry, {
    	Name: "Geometry",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });

    export class GeometryCollection extends XamlObjectCollection<Geometry> implements IGeometryListener {
        private _Listener: IGeometryListener;
        Listen(listener: IGeometryListener) { this._Listener = listener; }
        Unlisten(listener: IGeometryListener) { if (this._Listener === listener) this._Listener = null; }

        AddingToCollection(value: Geometry, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(value);
            return true;
        }
        RemovedFromCollection(value: Geometry, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(value);
        }
        GeometryChanged(newGeometry: Geometry) {
            var listener = this._Listener;
            if (listener) listener.GeometryChanged(newGeometry);
        }
    }
    Fayde.RegisterType(GeometryCollection, {
    	Name: "GeometryCollection",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}