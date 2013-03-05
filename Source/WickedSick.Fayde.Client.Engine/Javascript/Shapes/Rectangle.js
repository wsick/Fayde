/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Engine/RenderContext.js"/>

(function (namespace) {
    var Rectangle = Nullstone.Create("Rectangle", namespace.Shape);

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
        var irect = new rect();
        irect.Width = this.ActualWidth;
        irect.Height = this.ActualHeight;
        var radiusX = this.RadiusX;
        var radiusY = this.RadiusY;

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

        if (irect.Width === 0)
            irect.X = t * 0.5;
        if (irect.Height === 0)
            irect.Y = t * 0.5;

        var ta;
        if (t >= irect.Width || t >= irect.Height) {
            ta = t * 0.001;
            rect.growBy(irect, ta, ta, ta, ta);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            ta = -t * 0.5;
            rect.growBy(irect, ta, ta, ta, ta);
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        var path = new Fayde.Shapes.RawPath();
        if ((radiusX === 0.0 && radiusY === 0.0) || (radiusX === radiusY))
            path.RoundedRect(irect.X, irect.Y, irect.Width, irect.Height, radiusX, radiusY);
        else
            NotImplemented("Rectangle._BuildPath with RadiusX !== RadiusY");
        this._Path = path;
    };

    Rectangle.Instance._ComputeStretchBounds = function () {
        /// <returns type="rect" />
        return this._ComputeShapeBounds(false);
    };
    Rectangle.Instance._ComputeShapeBounds = function (logical) {
        /// <returns type="rect" />
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

        if (irect.Width === 0)
            irect.X = t * 0.5;
        if (irect.Height === 0)
            irect.Y = t * 0.5;

        if (t >= irect.Width || t >= irect.Height) {
            var g = t * 0.5005;
            rect.growBy(irect, g, g, g, g);
            this._SetShapeFlags(namespace.ShapeFlags.Degenerate);
        } else {
            this._SetShapeFlags(namespace.ShapeFlags.Normal);
        }

        return irect;
    };
    Rectangle.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
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
        Rectangle.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Rectangle) {
                this._OnPropertyChanged$Shape(args, error);
                return;
            }

            if (args.Property._ID === Rectangle.RadiusXProperty._ID || args.Property._ID === Rectangle.RadiusYProperty._ID) {
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            }

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Rectangle.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Rectangle) {
                this._OnPropertyChanged$Shape(args, error);
                return;
            }

            if (args.Property._ID === Rectangle.RadiusXProperty._ID || args.Property._ID === Rectangle.RadiusYProperty._ID) {
                this._InvalidateMeasure();
                this._InvalidatePathCache();
            }

            this._Invalidate();
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Rectangle.Instance.CreateSvgShape = function () {
            return document.createElementNS("http://www.w3.org/2000/svg", "rect");
        };
        Rectangle.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Rectangle) {
                this.ApplyHtmlChange$Shape(change);
                return;
            }

            var shape = this.GetSvgShape();
            if (propd._ID === Rectangle.RadiusXProperty._ID) {
                shape.setAttribute("rx", change.NewValue);
            } else if (propd._ID === Rectangle.RadiusYProperty._ID) {
                shape.setAttribute("ry", change.NewValue);
            }
        };
    }
    //#endif

    namespace.Rectangle = Nullstone.FinishCreate(Rectangle);
})(Nullstone.Namespace("Fayde.Shapes"));