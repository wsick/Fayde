/// <reference path="Interfaces.ts" />
/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Surface.ts" />

module Fayde {
    export class RenderContext implements IRenderContext {
        CanvasContext: CanvasRenderingContext2D;
        CurrentTransform: number[] = null;
        private _Transforms: number[][] = [];
        constructor(ctx: CanvasRenderingContext2D) {
            this.CanvasContext = ctx;
            if (!ctx.hasOwnProperty("currentTransform")) {
                Object.defineProperty(ctx, "currentTransform", {
                    get: () => this.CurrentTransform,
                    set: (value: number[]) => {
                        ctx.setTransform(value[0], value[1], value[3], value[4], value[2], value[5]);
                        this.CurrentTransform = value;
                    }
                });
            }
        }

        DoRender(layers: Fayde.UINode[], r: rect) {
            this.Clear(r);
            this.CanvasContext.save();
            this.ClipRect(r);
            if (layers) {
                var len = layers.length;
                for (var i = 0; i < len; i++) {
                    layers[i].LayoutUpdater.DoRender(this, r);
                }
            }
            this.CanvasContext.restore();
        }

        Save() {
            this.CanvasContext.save();
            var ct = this.CurrentTransform;
            this._Transforms.push(ct);
            this.CurrentTransform = ct == null ? mat3.identity() : mat3.create(ct);
            //if (this.CurrentTransform)
            //TransformDebug("Save", this.CurrentTransform);
        }
        Restore() {
            var curXform = this._Transforms.pop();
            this.CurrentTransform = curXform;
            this.CanvasContext.restore();
            //if (this.CurrentTransform)
            //TransformDebug("Restore", this.CurrentTransform);
        }

        ClipRect(r: rect) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("DrawClip (Rect): " + r.toString());
            cc.clip();
        }
        ClipGeometry(g: Media.Geometry) {
            g.Draw(this);
            //DrawDebug("DrawClip (Geometry): " + g.toString());
            this.CanvasContext.clip();
        }
        ClipRawPath(p: any/* Change to Fayde.Shapes.RawPath */) {
            p.Draw(this);
            //DrawDebug("DrawClip (RawPath): " + p.toString());
            this.CanvasContext.clip();
        }

        IsPointInPath(p: Point): bool {
            return this.CanvasContext.isPointInPath(p.X, p.Y);
        }
        IsPointInClipPath(clip: Media.Geometry, p: Point): bool {
            clip.Draw(this);
            //DrawDebug("DrawClip (Geometry): " + clip.toString());
            return this.CanvasContext.isPointInPath(p.X, p.Y);
        }

        Rect(r: rect) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("Rect: " + r.toString());
        }
        Fill(brush: Media.Brush, r: rect) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
            //DrawDebug("Fill: [" + cc.fillStyle.toString() + "]");
        }
        FillRect(brush: Media.Brush, r: rect) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
            //DrawDebug("FillRect: [" + ctx.fillStyle.toString() + "] " + r.toString());
        }
        StrokeAndFillRect(strokeBrush: Media.Brush, thickness: number, strokeRect: rect, fillBrush: Media.Brush, fillRect: rect) {
            var cc = this.CanvasContext;
            strokeBrush.SetupBrush(cc, strokeRect);
            fillBrush.SetupBrush(cc, fillRect);
            cc.beginPath();
            cc.rect(fillRect.X, fillRect.Y, fillRect.Width, fillRect.Height);
            cc.fillStyle = fillBrush.ToHtml5Object();
            cc.fill();
            cc.lineWidth = thickness;
            cc.strokeStyle = strokeBrush.ToHtml5Object();
            cc.stroke();
            //DrawDebug("StrokeAndFillRect: [" + cc.strokeStyle.toString() + "] [" + cc.fillStyle.toString() + "] " + fillRect.toString());
        }
        Stroke(stroke: Media.Brush, thickness: number, region: rect) {
            var cc = this.CanvasContext;
            stroke.SetupBrush(cc, region);
            cc.lineWidth = thickness;
            cc.strokeStyle = stroke.ToHtml5Object();
            cc.stroke();
            //DrawDebug("Stroke: [" + cc.strokeStyle.toString() + "] -> " + cc.lineWidth.toString());
        }
        Clear(r: rect) {
            this.CanvasContext.clearRect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("Clear: " + r.toString());
        }

        PreTransformMatrix(mat: number[]) {
            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct); //ct = ct * matrix
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;

            //TransformDebug("PreTransform", ct);
        }
        PreTransform(transform: Fayde.Media.Transform) {
            var v = transform.Value;
            var mat: number[];
            if (!v || !(mat = v._Raw))
                return;

            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct); //ct = ct * matrix
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;

            //TransformDebug("PreTransform", ct);
        }
        TransformMatrix(mat: number[]) {
            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct); //ct = matrix * ct
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;

            //TransformDebug("Transform", ct);
        }
        Transform(transform: Fayde.Media.Transform) {
            var v = transform.Value;
            var mat: number[];
            if (!v || !(mat = v._Raw))
                return;

            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct); //ct = matrix * ct
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;

            //TransformDebug("Transform", ct);
        }
        Translate(x: number, y: number) {
            var ct = this.CurrentTransform;
            mat3.translate(ct, x, y);
            this.CanvasContext.translate(x, y);

            //TransformDebug("Translate", ct);
        }
    }
    Nullstone.RegisterType(RenderContext, "RenderContext");
}