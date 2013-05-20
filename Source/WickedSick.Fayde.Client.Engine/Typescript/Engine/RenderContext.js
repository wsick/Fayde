/// <reference path="Interfaces.ts" />
/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Surface.ts" />
var Fayde;
(function (Fayde) {
    var RenderContext = (function () {
        function RenderContext(ctx) {
            var _this = this;
            this.CurrentTransform = null;
            this._Transforms = [];
            this.CanvasContext = ctx;
            if(!ctx.hasOwnProperty("currentTransform")) {
                Object.defineProperty(ctx, "currentTransform", {
                    get: function () {
                        return _this.CurrentTransform;
                    },
                    set: function (value) {
                        ctx.setTransform(value[0], value[1], value[3], value[4], value[2], value[5]);
                        _this.CurrentTransform = value;
                    }
                });
            }
        }
        RenderContext.prototype.DoRender = function (layers, r) {
            this.Clear(r);
            this.CanvasContext.save();
            this.ClipRect(r);
            if(layers) {
                var len = layers.length;
                for(var i = 0; i < len; i++) {
                    layers[i].LayoutUpdater.DoRender(this, r);
                }
            }
            this.CanvasContext.restore();
        };
        RenderContext.prototype.Save = function () {
            this.CanvasContext.save();
            var ct = this.CurrentTransform;
            this._Transforms.push(ct);
            this.CurrentTransform = ct == null ? mat3.identity() : mat3.create(ct);
            //if (this.CurrentTransform)
            //TransformDebug("Save", this.CurrentTransform);
                    };
        RenderContext.prototype.Restore = function () {
            var curXform = this._Transforms.pop();
            this.CurrentTransform = curXform;
            this.CanvasContext.restore();
            //if (this.CurrentTransform)
            //TransformDebug("Restore", this.CurrentTransform);
                    };
        RenderContext.prototype.ClipRect = function (r) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("DrawClip (Rect): " + r.toString());
            cc.clip();
        };
        RenderContext.prototype.ClipGeometry = function (g) {
            g.Draw(this);
            //DrawDebug("DrawClip (Geometry): " + g.toString());
            this.CanvasContext.clip();
        };
        RenderContext.prototype.ClipRawPath = function (p/* Change to Fayde.Shapes.RawPath */ ) {
            p.Draw(this);
            //DrawDebug("DrawClip (RawPath): " + p.toString());
            this.CanvasContext.clip();
        };
        RenderContext.prototype.IsPointInPath = function (x, y) {
            return this.CanvasContext.isPointInPath(x, y);
        };
        RenderContext.prototype.IsPointInClipPath = function (clip, x, y) {
            clip.Draw(this);
            //DrawDebug("DrawClip (Geometry): " + clip.toString());
            return this.CanvasContext.isPointInPath(x, y);
        };
        RenderContext.prototype.Rect = function (r) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("Rect: " + r.toString());
                    };
        RenderContext.prototype.Fill = function (brush, r) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
            //DrawDebug("Fill: [" + cc.fillStyle.toString() + "]");
                    };
        RenderContext.prototype.FillRect = function (brush, r) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
            //DrawDebug("FillRect: [" + ctx.fillStyle.toString() + "] " + r.toString());
                    };
        RenderContext.prototype.StrokeAndFillRect = function (strokeBrush, thickness, strokeRect, fillBrush, fillRect) {
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
                    };
        RenderContext.prototype.Stroke = function (stroke, thickness, region) {
            var cc = this.CanvasContext;
            stroke.SetupBrush(cc, region);
            cc.lineWidth = thickness;
            cc.strokeStyle = stroke.ToHtml5Object();
            cc.stroke();
            //DrawDebug("Stroke: [" + cc.strokeStyle.toString() + "] -> " + cc.lineWidth.toString());
                    };
        RenderContext.prototype.Clear = function (r) {
            this.CanvasContext.clearRect(r.X, r.Y, r.Width, r.Height);
            //DrawDebug("Clear: " + r.toString());
                    };
        RenderContext.prototype.SetLineDash = function (offsets) {
            var ctx = this.CanvasContext;
            if((ctx).setLineDash) {
                (ctx).setLineDash(offsets);
            }
        };
        RenderContext.prototype.PreTransformMatrix = function (mat) {
            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct)//ct = ct * matrix
            ;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
            //TransformDebug("PreTransform", ct);
                    };
        RenderContext.prototype.PreTransform = function (transform) {
            var v = transform.Value;
            var mat;
            if(!v || !(mat = v._Raw)) {
                return;
            }
            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct)//ct = ct * matrix
            ;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
            //TransformDebug("PreTransform", ct);
                    };
        RenderContext.prototype.TransformMatrix = function (mat) {
            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct)//ct = matrix * ct
            ;
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
            //TransformDebug("Transform", ct);
                    };
        RenderContext.prototype.Transform = function (transform) {
            var v = transform.Value;
            var mat;
            if(!v || !(mat = v._Raw)) {
                return;
            }
            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct)//ct = matrix * ct
            ;
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
            //TransformDebug("Transform", ct);
                    };
        RenderContext.prototype.Translate = function (x, y) {
            var ct = this.CurrentTransform;
            mat3.translate(ct, x, y);
            this.CanvasContext.translate(x, y);
            //TransformDebug("Translate", ct);
                    };
        return RenderContext;
    })();
    Fayde.RenderContext = RenderContext;    
    Nullstone.RegisterType(RenderContext, "RenderContext");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RenderContext.js.map
