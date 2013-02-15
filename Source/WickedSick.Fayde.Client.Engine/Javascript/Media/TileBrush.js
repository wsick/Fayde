/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

(function (namespace) {
    var TileBrush = Nullstone.Create("TileBrush", namespace.Brush);

    //#region Properties

    TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () { return new Enum(namespace.AlignmentX); }, TileBrush, namespace.AlignmentX.Center);
    TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () { return new Enum(namespace.AlignmentY); }, TileBrush, namespace.AlignmentY.Center);
    TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(namespace.Stretch); }, TileBrush, namespace.Stretch.Fill);

    Nullstone.AutoProperties(TileBrush, [
        TileBrush.AlignmentXProperty,
        TileBrush.AlignmentYProperty,
        TileBrush.StretchProperty
    ]);

    //#endregion

    var computeImageMatrix = function (width, height, sw, sh, stretch, alignX, alignY) {
        /// <param name="width" type="Number"></param>
        /// <param name="height" type="Number"></param>
        /// <param name="sw" type="Number"></param>
        /// <param name="sh" type="Number"></param>
        /// <param name="stretch" type="Stretch"></param>
        /// <param name="alignX" type="Number"></param>
        /// <param name="alignY" type="Number"></param>

        var sx = width / sw;
        var sy = height / sh;
        if (width === 0)
            sx = 1.0;
        if (height === 0)
            sy = 1.0;

        if (stretch === Fayde.Media.Stretch.Fill) {
            return mat3.createScale(sx, sy);
        }

        var scale = 1.0;
        var dx = 0.0;
        var dy = 0.0;
        switch (stretch) {
            case Fayde.Media.Stretch.Uniform:
                scale = sx < sy ? sx : sy;
                break;
            case Fayde.Media.Stretch.UniformToFill:
                scale = sx < sy ? sy : sx;
                break;
            case Fayde.Media.Stretch.None:
                break;
        }

        switch (alignX) {
            case Fayde.Media.AlignmentX.Left:
                dx = 0.0;
                break;
            case Fayde.Media.AlignmentX.Center:
                dx = (width - (scale * sw)) / 2;
                break;
            case Fayde.Media.AlignmentX.Right:
            default:
                dx = width - (scale * sw);
                break;
        }

        switch (alignY) {
            case Fayde.Media.AlignmentY.Top:
                dy = 0.0;
                break;
            case Fayde.Media.AlignmentY.Center:
                dy = (height - (scale * sh)) / 2;
                break;
            case Fayde.Media.AlignmentY.Bottom:
            default:
                dy = height - (scale * sh);
                break;
        }
        var m = mat3.createScale(scale, scale);
        mat3.translate(m, dx, dy);
        return m;
    };

    TileBrush.Instance.CreateBrush = function (ctx, bounds) {
        var imgExtents = this.GetTileExtents();

        var tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = bounds.Width;
        tmpCanvas.height = bounds.Height;

        var tmpCtx = tmpCanvas.getContext("2d");

        var mat = computeImageMatrix(bounds.Width, bounds.Height,
            imgExtents.Width, imgExtents.Height, this.Stretch, this.AlignmentX, this.AlignmentY);
        tmpCtx.setTransform(mat[0], mat[1], mat[3], mat[4], mat[2], mat[5]);

        this.DrawTile(tmpCtx, bounds);

        return ctx.createPattern(tmpCanvas, "no-repeat");
    };
    TileBrush.Instance.GetTileExtents = function () { };
    TileBrush.Instance.DrawTile = function (canvasCtx, bounds) { };

    TileBrush.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== TileBrush) {
            this._OnPropertyChanged$Brush(args, error);
            return;
        }

        if (args.Property._ID === TileBrush.AlignmentXProperty._ID
            || args.Property._ID === TileBrush.AlignmentYProperty._ID
            || args.Property._ID === TileBrush.StretchProperty._ID) {
            this._InvalidateSurfaceCache();
        }

        this.PropertyChanged.Raise(this, args);
    };

    namespace.TileBrush = Nullstone.FinishCreate(TileBrush);
})(Nullstone.Namespace("Fayde.Media"));