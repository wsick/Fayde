/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

//#region TileBrush
var TileBrush = Nullstone.Create("TileBrush", Brush);

//#region Dependency Properties

TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () { return new Enum(AlignmentX); }, TileBrush, AlignmentX.Center);
TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () { return new Enum(AlignmentY); }, TileBrush, AlignmentY.Center);
TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, TileBrush, Stretch.Fill);

Nullstone.AutoProperties(TileBrush, [
    TileBrush.AlignmentXProperty,
    TileBrush.AlignmentYProperty,
    TileBrush.StretchProperty
]);

//#endregion

TileBrush.Instance.SetupBrush = function (ctx, bounds) {
    if (this._IsSurfaceCached(bounds))
        return;

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

    this._SC = {
        Bounds: bounds
    };
    this._Brush = ctx.createPattern(tmpCanvas, "no-repeat");
};
TileBrush.Instance.GetTileExtents = function () { };
TileBrush.Instance.DrawTile = function (canvasCtx, bounds) { };

TileBrush.Instance._IsSurfaceCached = function (bounds) {
    if (!this._Brush)
        return false;
    if (!this._SC)
        return false;
    if (!Rect.Equals(this._SC.Bounds, bounds))
        return false;
    return true;
};
TileBrush.Instance._InvalidateSurfaceCache = function () {
    delete this._Brush;
    delete this._SC;
};

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

Nullstone.FinishCreate(TileBrush);
//#endregion