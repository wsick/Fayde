/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="Surface.js"/>
/// <reference path="../../gl-matrix.js"/>
/// <reference path="../Runtime/gl-matrix-ex.js"/>

(function (Fayde) {
    var _RenderContext = Nullstone.Create("_RenderContext", undefined, 1);

    _RenderContext.Instance.Init = function (surface) {
        this.Surface = surface;
        this.CanvasContext = this.Surface._Ctx;
        this._Transforms = [];

        if (!this.CanvasContext.hasOwnProperty("currentTransform")) {
            Object.defineProperty(this.CanvasContext, "currentTransform", {
                get: function () { return this._CurrentTransform; },
                set: function (value) {
                    this.setTransform(value[0], value[1], value[3], value[4], value[2], value[5]);
                    this._CurrentTransform = value;
                }
            });
        }
    };

    Nullstone.AutoProperties(_RenderContext, [
        "CurrentTransform",
        "CanvasContext"
    ]);

    //#region Clip/Point Test

    _RenderContext.Instance.Clip = function (clip) {
        this._DrawClip(clip);
        this.CanvasContext.clip();
    };
    _RenderContext.Instance.IsPointInPath = function (p) {
        return this.CanvasContext.isPointInPath(p.X, p.Y);
    };
    _RenderContext.Instance.IsPointInClipPath = function (clip, p) {
        this._DrawClip(clip);
        return this.CanvasContext.isPointInPath(p.X, p.Y);
    };
    _RenderContext.Instance._DrawClip = function (clip) {
        if (clip instanceof Rect) {
            this.CanvasContext.beginPath();
            this.CanvasContext.rect(clip.X, clip.Y, clip.Width, clip.Height);
            DrawDebug("DrawClip (Rect): " + clip.toString());
        } else if (clip instanceof Fayde.Media.Geometry) {
            clip.Draw(this);
            DrawDebug("DrawClip (Geometry): " + clip.toString());
        } else if (clip instanceof Fayde.Shapes.RawPath) {
            clip.Draw(this);
            DrawDebug("DrawClip (RawPath): " + clip.toString());
        }
    };

    //#endregion

    //#region Transforms

    _RenderContext.Instance.PreTransform = function (matrix) {
        if (matrix instanceof Fayde.Media.Transform) {
            matrix = matrix.Value.raw;
        }

        var ct = this.CurrentTransform;
        mat3.multiply(matrix, ct, ct); //ct = ct * matrix
        this.CanvasContext.currentTransform = ct;

        TransformDebug("PreTransform", ct);
    };
    _RenderContext.Instance.Transform = function (matrix) {
        if (matrix instanceof Fayde.Media.Transform) {
            matrix = matrix.Value.raw;
        }

        var ct = this.CurrentTransform;
        mat3.multiply(ct, matrix, ct); //ct = matrix * ct
        this.CanvasContext.currentTransform = ct;

        TransformDebug("Transform", ct);
    };
    _RenderContext.Instance.Translate = function (x, y) {
        var ct = this.CurrentTransform;
        mat3.translate(ct, x, y);
        this.CanvasContext.translate(x, y);

        TransformDebug("Translate", ct);
    };

    //#endregion

    //#region State

    _RenderContext.Instance.Save = function () {
        this.CanvasContext.save();
        var ct = this.CurrentTransform;
        this._Transforms.push(ct);
        this.CurrentTransform = ct == null ? mat3.identity() : mat3.create(ct);
        if (this.CurrentTransform)
            TransformDebug("Save", this.CurrentTransform);
    };
    _RenderContext.Instance.Restore = function () {
        var curXform = this._Transforms.pop();
        this.CurrentTransform = curXform;
        this.CanvasContext.restore();
        if (this.CurrentTransform)
            TransformDebug("Restore", this.CurrentTransform);
    };

    //#endregion

    //#region Stroke/Fill/Clear

    _RenderContext.Instance.Rect = function (rect) {
        var ctx = this.CanvasContext;
        ctx.beginPath();
        ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
        DrawDebug("Rect: " + rect.toString());
    };
    _RenderContext.Instance.Fill = function (brush, region) {
        /// <param name="brush" type="Brush"></param>
        var ctx = this.CanvasContext;
        brush.SetupBrush(ctx, region);
        ctx.fillStyle = brush.ToHtml5Object();
        ctx.fill();
        DrawDebug("Fill: [" + ctx.fillStyle.toString() + "]");
    };
    _RenderContext.Instance.FillRect = function (brush, rect) {
        /// <param name="brush" type="Brush"></param>
        /// <param name="rect" type="Rect"></param>
        var ctx = this.CanvasContext;
        brush.SetupBrush(ctx, rect);
        ctx.beginPath();
        ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
        ctx.fillStyle = brush.ToHtml5Object();
        ctx.fill();
        DrawDebug("FillRect: [" + ctx.fillStyle.toString() + "] " + rect.toString());
    };
    _RenderContext.Instance.StrokeAndFillRect = function (strokeBrush, thickness, strokeRect, fillBrush, fillRect) {
        var ctx = this.CanvasContext;
        strokeBrush.SetupBrush(ctx, strokeRect);
        fillBrush.SetupBrush(ctx, fillRect);
        ctx.beginPath();
        ctx.rect(fillRect.X, fillRect.Y, fillRect.Width, fillRect.Height);
        ctx.fillStyle = fillBrush.ToHtml5Object();
        ctx.fill();
        ctx.lineWidth = thickness;
        ctx.strokeStyle = strokeBrush.ToHtml5Object();
        ctx.stroke();
        DrawDebug("StrokeAndFillRect: [" + ctx.strokeStyle.toString() + "] [" + ctx.fillStyle.toString() + "] " + fillRect.toString());
    };
    _RenderContext.Instance.Stroke = function (stroke, thickness, region) {
        /// <param name="stroke" type="Brush"></param>
        var ctx = this.CanvasContext;
        stroke.SetupBrush(ctx, region);
        ctx.lineWidth = thickness;
        ctx.strokeStyle = stroke.ToHtml5Object();
        ctx.stroke();
        DrawDebug("Stroke: [" + ctx.strokeStyle.toString() + "] -> " + ctx.lineWidth.toString());
    };
    _RenderContext.Instance.Clear = function (rect) {
        this.CanvasContext.clearRect(rect.X, rect.Y, rect.Width, rect.Height);
        DrawDebug("Clear: " + rect.toString());
    };

    //#endregion

    _RenderContext.ToArray = function (args) {
        var arr = [];
        for (var i in args)
            arr.push(args[i]);
        return arr;
    };

    Fayde._RenderContext = Nullstone.FinishCreate(_RenderContext);
})(Nullstone.Namespace("Fayde"));