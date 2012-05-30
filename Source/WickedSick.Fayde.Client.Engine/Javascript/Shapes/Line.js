/// <reference path="Shape.js"/>
/// CODE
/// <reference path="RawPath.js"/>

//#region Line
var Line = Nullstone.Create("Line", Shape);

Line.Instance.Init = function () {
    this.Init$Shape();
};

//#region Dependency Properties

Line.X1Property = DependencyProperty.Register("X1", function () { return Number; }, Line, 0);
Line.Y1Property = DependencyProperty.Register("Y1", function () { return Number; }, Line, 0);
Line.X2Property = DependencyProperty.Register("X2", function () { return Number; }, Line, 0);
Line.Y2Property = DependencyProperty.Register("Y2", function () { return Number; }, Line, 0);

Nullstone.AutoProperties(Line, [
    Line.X1Property,
    Line.Y1Property,
    Line.X2Property,
    Line.Y2Property
]);

//#endregion

Line.Instance._DrawPath = function (ctx) {
    if (this._Path == null)
        this._BuildPath();
    this._DrawPath$Shape(ctx);
};
Line.Instance._BuildPath = function () {
    this._SetShapeFlags(ShapeFlags.Normal);

    this._Path = new RawPath();

    var x1 = this.X1;
    var y1 = this.Y1;
    var x2 = this.X2;
    var y2 = this.Y2;

    this._Path.Move(x1, y1);
    this._Path.Line(x2, y2);
};

Line.Instance._ComputeShapeBounds = function (logical) {
    var shapeBounds = new Rect();

    var thickness = 0;
    if (!logical)
        thickness = this.StrokeThickness;

    if (thickness <= 0.0 && !logical)
        return shapeBounds;

    var x1 = this.X1;
    var y1 = this.Y1;
    var x2 = this.X2;
    var y2 = this.Y2;

    shapeBounds = new Rect(
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.abs(x2 - x1),
        Math.abs(y2 - y1)
    );
    //TODO: Handle startcap, endcap, thickness

    return shapeBounds;
};

Line.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Line) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }

    if (args.Property._ID == Line.X1Property._ID
        || args.Property._ID == Line.X2Property._ID
        || args.Property._ID == Line.Y1Property._ID
        || args.Property._ID == Line.Y2Property._ID) {
        this._InvalidateNaturalBounds();
    }

    this.PropertyChanged.Raise(this, args);
};

Nullstone.FinishCreate(Line);
//#endregion