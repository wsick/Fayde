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

    TileBrush.Instance.CreateBrush = function (ctx, bounds) {
        var imgExtents = this.GetTileExtents();

        var tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = bounds.Width;
        tmpCanvas.height = bounds.Height;

        var tmpCtx = tmpCanvas.getContext("2d");

        var mat = Fayde.Image.ComputeMatrix(bounds.Width, bounds.Height,
            imgExtents.Width, imgExtents.Height, this.Stretch, this.AlignmentX, this.AlignmentY);
        var els = mat._Elements;
        tmpCtx.setTransform(els[0], els[1], els[3], els[4], els[2], els[5]);

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