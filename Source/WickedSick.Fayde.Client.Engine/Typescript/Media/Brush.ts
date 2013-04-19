/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="Transform.ts" />
/// CODE
/// <reference path="../Primitives/rect.ts" />

module Fayde.Media {
    export interface IBrushChangedListener {
        BrushChanged(newBrush: Brush);
    }

    export class Brush extends DependencyObject implements ITransformChangedListener {
        static TransformProperty: DependencyProperty = DependencyProperty.RegisterCore("Transform", () => Fayde.Media.Transform, Brush, undefined, (d, args) => (<Brush>d)._TransformChanged(args));
        Transform: Fayde.Media.Transform;

        private _CachedBounds: rect = null;
        private _CachedBrush: any = null;
        private _Listener: IBrushChangedListener = null;

        SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect) {
            if (this._CachedBrush && this._CachedBounds && rect.isEqual(this._CachedBounds, bounds))
                return;
            this._CachedBounds = bounds;

            var transform = this.Transform;
            if (transform) {
                var transformedBounds = transform.TransformBounds(bounds);
                var raw = transform.Value._Raw;

                var tmpBrush = this.CreateBrush(ctx, bounds);
                var fillExtents = rect.clone(bounds);
                rect.growBy(fillExtents, raw[2], raw[5], 0, 0);

                var tmpCanvas = <HTMLCanvasElement>document.createElement("canvas");
                tmpCanvas.width = Math.max(transformedBounds.Width, bounds.Width);
                tmpCanvas.height = Math.max(transformedBounds.Height, bounds.Height);
                var tmpCtx = tmpCanvas.getContext("2d");
                tmpCtx.setTransform(raw[0], raw[1], raw[3], raw[4], raw[2], raw[5]);
                tmpCtx.fillStyle = tmpBrush;
                tmpCtx.fillRect(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height);

                this._CachedBrush = ctx.createPattern(tmpCanvas, "no-repeat");
            } else {
                this._CachedBrush = this.CreateBrush(ctx, bounds);
            }
        }
        CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any { return undefined; }
        ToHtml5Object(): any { return this._CachedBrush; }

        Listen(listener: IBrushChangedListener) { this._Listener = listener; }
        Unlisten(listener: IBrushChangedListener) { if (this._Listener === listener) this._Listener = null; }

        InvalidateBrush() {
            this._CachedBrush = null;
            this._CachedBounds = null;
            var listener = this._Listener;
            if (listener) listener.BrushChanged(this);
        }
        private TransformChanged(source: Transform) {
            this.InvalidateBrush();
        }
        private _TransformChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldt = <Transform>args.OldValue;
            var newt = <Transform>args.NewValue;
            if (oldt)
                oldt.Unlisten(this);
            if (newt)
                newt.Listen(this);
            this.InvalidateBrush();
        }
    }
    Nullstone.RegisterType(Brush, "Brush");
}