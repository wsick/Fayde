/// <reference path="Shape.js"/>
/// CODE

(function (namespace) {
    var Ellipse = Nullstone.Create("Ellipse", namespace.Shape);

    Ellipse.Instance.Init = function () {
        this.Init$Shape();
        this.Stretch = Fayde.Media.Stretch.Fill;
    };

    Ellipse.Instance._DrawPath = function (ctx) {
        if (this._Path == null)
            this._BuildPath();
        this._DrawPath$Shape(ctx);
    };
    Ellipse.Instance._BuildPath = function () {
        var stretch = this.Stretch;
        var t = this._IsStroked() ? this.StrokeThickness : 0.0;
        var rect = new Rect(0, 0, this.ActualWidth, this.ActualHeight);

        switch (stretch) {
            case Fayde.Media.Stretch.None:
                rect.Width = rect.Height = 0;
                break;
            case Fayde.Media.Stretch.Uniform:
                rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
                break;
            case Fayde.Media.Stretch.UniformToFill:
                rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
                break;
            case Fayde.Media.Stretch.Fill:
                break;
        }

        if (t >= rect.Width || t >= rect.Height) {
            rect.Width = Math.max(rect.Width, t + t * 0.001);
            rect.Height = Math.max(rect.Height, t + t * 0.001);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        var ht = -t / 2;
        rect = rect.GrowBy(ht, ht, ht, ht);

        var path = new Fayde.Shapes.RawPath();
        path.Ellipse(rect.X, rect.Y, rect.Width, rect.Height);
        this._Path = path;
    };

    Ellipse.Instance._ComputeStretchBounds = function () {
        /// <returns type="Rect" />
        return this._ComputeShapeBounds(false);
    };
    Ellipse.Instance._ComputeShapeBounds = function (logical) {
        var rect = new Rect(0, 0, this.ActualWidth, this.ActualHeight);
        this._SetShapeFlags(namespace.ShapeFlags.Normal);

        var width = this.Width;
        var height = this.Height;
        if (rect.Width < 0.0 || rect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new Rect();
        }

        var visualParent = this.GetVisualParent();
        if (visualParent != null && visualParent instanceof Fayde.Controls.Canvas) {
            if (isNaN(width) !== isNaN(height)) {
                this._SetShapeFlags(namespace.ShapeFlags.Empty);
                return new Rect();
            }
        }

        var t = this._IsStroked() ? this.StrokeThickness : 0.0;
        switch (this.Stretch) {
            case Fayde.Media.Stretch.None:
                rect.Width = rect.Height = 0.0;
                break;
            case Fayde.Media.Stretch.Uniform:
                rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
                break;
            case Fayde.Media.Stretch.UniformToFill:
                rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
                break;
            case Fayde.Media.Stretch.Fill:
                break;
        }

        if (t >= rect.Width || t >= rect.Height) {
            rect.Width = Math.max(rect.Width, t + t * 0.001);
            rect.Height = Math.max(rect.Height, t + t * 0.001);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        return rect;
    };
    Ellipse.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
        /// <returns type="Rect" />
        return logical ? new Rect(0, 0, 1.0, 1.0) : new Rect();
    };

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Ellipse.Instance.CreateSvgShape = function () {
            var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            ellipse.setAttribute("rx", "50%");
            ellipse.setAttribute("ry", "50%");
            ellipse.setAttribute("cx", "50%");
            ellipse.setAttribute("cy", "50%");
            return ellipse;
        };
    }
    //#endif

    namespace.Ellipse = Nullstone.FinishCreate(Ellipse);
})(Nullstone.Namespace("Fayde.Shapes"));