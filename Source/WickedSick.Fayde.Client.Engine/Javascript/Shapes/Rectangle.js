/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Engine/RenderContext.js"/>

(function (namespace) {
    var Rectangle = Nullstone.Create("Rectangle", Shape);

    Rectangle.Instance.Init = function () {
        this.Init$Shape();
        this.Stretch = Fayde.Media.Stretch.Fill;
    };

    //#region Properties

    Rectangle.RadiusXProperty = DependencyProperty.Register("RadiusX", function () { return Number; }, Rectangle, 0.0);
    Rectangle.RadiusYProperty = DependencyProperty.Register("RadiusY", function () { return Number; }, Rectangle, 0.0);

    Nullstone.AutoProperties(Rectangle, [
        Rectangle.RadiusXProperty,
        Rectangle.RadiusYProperty
    ]);

    //#endregion

    Rectangle.Instance._DrawPath = function (ctx) {
        if (this._Path == null)
            this._BuildPath();
        this._DrawPath$Shape(ctx);
    };
    Rectangle.Instance._BuildPath = function () {
        var stretch = this.Stretch;
        var t = this._IsStroked() ? this.StrokeThickness : 0.0;
        var rect = new Rect(0, 0, this.ActualWidth, this.ActualHeight);
        var radiusX = this.RadiusX;
        var radiusY = this.RadiusY;

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

        if (rect.Width === 0)
            rect.X = t * 0.5;
        if (rect.Height === 0)
            rect.Y = t * 0.5;

        var ta;
        if (t >= rect.Width || t >= rect.Height) {
            ta = t * 0.001;
            rect = rect.GrowBy(ta, ta, ta, ta);
            this._SetShapeFlags(ShapeFlags.Degenerate);
        } else {
            ta = -t * 0.5;
            rect = rect.GrowBy(ta, ta, ta, ta);
            this._SetShapeFlags(ShapeFlags.Normal);
        }

        var path = new RawPath();
        if ((radiusX === 0.0 && radiusY === 0.0) || (radiusX === radiusY))
            path.RoundedRect(rect.X, rect.Y, rect.Width, rect.Height, radiusX, radiusY);
        else
            NotImplemented("Rectangle._BuildPath with RadiusX !== RadiusY");
        this._Path = path;
    };

    Rectangle.Instance._ComputeStretchBounds = function () {
        /// <returns type="Rect" />
        return this._ComputeShapeBounds(false);
    };
    Rectangle.Instance._ComputeShapeBounds = function (logical) {
        /// <returns type="Rect" />
        var rect = new Rect(0, 0, this.ActualWidth, this.ActualHeight);
        this._SetShapeFlags(ShapeFlags.Normal);

        var width = this.Width;
        var height = this.Height;
        if (rect.Width < 0.0 || rect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
            this._SetShapeFlags(ShapeFlags.Empty);
            return new Rect();
        }

        var visualParent = this.GetVisualParent();
        if (visualParent != null && visualParent instanceof Canvas) {
            if (isNaN(width) !== isNaN(height)) {
                this._SetShapeFlags(ShapeFlags.Empty);
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

        if (rect.Width === 0)
            rect.X = t * 0.5;
        if (rect.Height === 0)
            rect.Y = t * 0.5;

        if (t >= rect.Width || t >= rect.Height) {
            var g = t * 0.5005;
            rect = rect.GrowBy(g, g, g, g);
            this._SetShapeFlags(ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(ShapeFlags.Normal);
        }

        return rect;
    };
    Rectangle.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
        /// <returns type="Rect" />
        return logical ? new Rect(0, 0, 1.0, 1.0) : new Rect();
    };

    Rectangle.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== Rectangle) {
            this._OnPropertyChanged$Shape(args, error);
            return;
        }

        if (args.Property._ID === Rectangle.RadiusXProperty || args.Property._ID === Rectangle.RadiusYProperty) {
            this._InvalidateMeasure();
            this._InvalidatePathCache();
        }

        this._Invalidate();
        this.PropertyChanged.Raise(this, args);
    };

    namespace.Rectangle = Nullstone.FinishCreate(Rectangle);
})(window);