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
        var irect = new rect();
        irect.Width = this.ActualWidth;
        irect.Height = this.ActualHeight;

        switch (stretch) {
            case Fayde.Media.Stretch.None:
                irect.Width = irect.Height = 0;
                break;
            case Fayde.Media.Stretch.Uniform:
                irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                break;
            case Fayde.Media.Stretch.UniformToFill:
                irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                break;
            case Fayde.Media.Stretch.Fill:
                break;
        }

        if (t >= irect.Width || t >= irect.Height) {
            irect.Width = Math.max(irect.Width, t + t * 0.001);
            irect.Height = Math.max(irect.Height, t + t * 0.001);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        var ht = -t / 2;
        rect.growBy(irect, ht, ht, ht, ht);

        var path = new Fayde.Shapes.RawPath();
        path.Ellipse(irect.X, irect.Y, irect.Width, irect.Height);
        this._Path = path;
    };

    Ellipse.Instance._ComputeStretchBounds = function () {
        /// <returns type="rect" />
        return this._ComputeShapeBounds(false);
    };
    Ellipse.Instance._ComputeShapeBounds = function (logical) {
        var irect = new rect();
        irect.Width = this.ActualWidth;
        irect.Height = this.ActualHeight;
        this._SetShapeFlags(namespace.ShapeFlags.Normal);

        var width = this.Width;
        var height = this.Height;
        if (irect.Width < 0.0 || irect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new rect();
        }

        var visualParent = this.GetVisualParent();
        if (visualParent != null && visualParent instanceof Fayde.Controls.Canvas) {
            if (isNaN(width) !== isNaN(height)) {
                this._SetShapeFlags(namespace.ShapeFlags.Empty);
                return new rect();
            }
        }

        var t = this._IsStroked() ? this.StrokeThickness : 0.0;
        switch (this.Stretch) {
            case Fayde.Media.Stretch.None:
                irect.Width = irect.Height = 0.0;
                break;
            case Fayde.Media.Stretch.Uniform:
                irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                break;
            case Fayde.Media.Stretch.UniformToFill:
                irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                break;
            case Fayde.Media.Stretch.Fill:
                break;
        }

        if (t >= irect.Width || t >= irect.Height) {
            irect.Width = Math.max(irect.Width, t + t * 0.001);
            irect.Height = Math.max(irect.Height, t + t * 0.001);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        return irect;
    };
    Ellipse.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
        /// <returns type="rect" />
        var r = new rect();
        if (logical) {
            r.Width = 1.0;
            r.Height = 1.0;
        }
        return r;
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
