/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE

(function (namespace) {
    var Brush = Nullstone.Create("Brush", DependencyObject);

    //#region Properties

    Brush.TransformProperty = DependencyProperty.RegisterCore("Transform", function () { return Fayde.Media.Transform; }, Brush);

    Nullstone.AutoProperties(Brush, [
        Brush.TransformProperty
    ]);

    Brush.ChangedProperty = DependencyProperty.Register("Changed", function () { return Boolean; }, Brush);

    Nullstone.AutoProperties(Brush, [
        Brush.ChangedProperty
    ]);

    //#endregion

    Brush.Instance.SetupBrush = function (ctx, bounds) {
        /// <param name="ctx" type="CanvasRenderingContext2D">HTML5 Canvas Context</param>
        /// <param name="bounds" type="Rect"></param>
        if (this._IsSurfaceCached(bounds))
            return;
        this._CacheSurface(bounds);

        var transform = this.Transform;
        if (!transform) {
            this._Brush = this.CreateBrush(ctx, bounds, bounds);
            return;
        }

        var transformedBounds = transform.TransformBounds(bounds);
        var raw = transform.Value.raw;

        this._Brush = this.CreateBrush(ctx, bounds);
        var fillExtents = bounds.GrowBy(raw[2], raw[5], 0, 0);

        var tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = Math.max(transformedBounds.Width, bounds.Width);
        tmpCanvas.height = Math.max(transformedBounds.Height, bounds.Height);
        var tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.setTransform(raw[0], raw[1], raw[3], raw[4], raw[2], raw[5]);
        tmpCtx.fillStyle = this._Brush;
        tmpCtx.fillRect(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height);

        this._Brush = ctx.createPattern(tmpCanvas, "no-repeat");
    };
    Brush.Instance.CreateBrush = function (ctx, bounds) { };
    Brush.Instance.ToHtml5Object = function () { return this._Brush; };

    Brush.Instance._IsSurfaceCached = function (bounds) {
        if (!this._Brush)
            return false;
        if (!this._SC)
            return false;
        if (!Rect.Equals(this._SC.Bounds, bounds))
            return false;
        return true;
    };
    Brush.Instance._CacheSurface = function (bounds) {
        this._SC = { Bounds: bounds };
    };
    Brush.Instance._InvalidateSurfaceCache = function () {
        delete this._Brush;
        delete this._SC;
    };

    Brush.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== Brush) {
            this._OnPropertyChanged$DependencyObject(args, error);
            return;
        }

        if (args.Property._ID === Brush.TransformProperty._ID) {
            if (args.OldValue != null) {
                args.OldValue.ValueChanged.Subscribe(this._TransformValueChanged, this);
            }
            if (args.NewValue != null) {
                args.NewValue.ValueChanged.Subscribe(this._TransformValueChanged, this);
            }
            this._InvalidateSurfaceCache();
        }

        this.PropertyChanged.Raise(this, args);
    };
    Brush.Instance._TransformValueChanged = function (sender, args) {
        this._InvalidateSurfaceCache();
    };

    Brush.Instance._OnSubPropertyChanged = function (propd, sender, args) {
        if (propd._ID === Brush.ChangedProperty._ID) {
            var newArgs = {
                Property: Brush.ChangedProperty,
                OldValue: false,
                NewValue: true
            };
            this.PropertyChanged.Raise(this, newArgs);
        }

        this._OnSubPropertyChanged$DependencyObject(propd, sender, args);
    };

    namespace.Brush = Nullstone.FinishCreate(Brush);
})(Nullstone.Namespace("Fayde.Media"));