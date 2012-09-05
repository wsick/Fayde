/// <reference path="Transform.js"/>
/// CODE

//#region ScaleTransform
var ScaleTransform = Nullstone.Create("ScaleTransform", Transform);

//#region Properties

ScaleTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () { return Number; }, ScaleTransform, 0);
ScaleTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () { return Number; }, ScaleTransform, 0);
ScaleTransform.ScaleXProperty = DependencyProperty.Register("ScaleX", function () { return Number; }, ScaleTransform, 0);
ScaleTransform.ScaleYProperty = DependencyProperty.Register("ScaleY", function () { return Number; }, ScaleTransform, 0);

Nullstone.AutoProperties(ScaleTransform, [
    ScaleTransform.CenterXProperty,
    ScaleTransform.CenterYProperty,
    ScaleTransform.ScaleXProperty,
    ScaleTransform.ScaleYProperty
]);

//#endregion

ScaleTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ScaleTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === ScaleTransform.ScaleXProperty._ID
        || args.Property._ID === ScaleTransform.ScaleYProperty._ID
        || args.Property._ID === ScaleTransform.CenterXProperty._ID
        || args.Property._ID === ScaleTransform.CenterYProperty._ID) {
        this._ClearValue();
    }
    this.PropertyChanged.Raise(this, args);
};

ScaleTransform.Instance._BuildValue = function () {
    var cx = this.CenterX;
    var cy = this.CenterY;
    if (cx === 0 && cy === 0)
        return Matrix.CreateScale(this.ScaleX, this.ScaleY);

    var m = new Matrix();
    Matrix.Multiply(m, Matrix.CreateScale(this.ScaleX, this.ScaleY), Matrix.CreateTranslate(-cx, -cy));
    Matrix.Multiply(m, Matrix.CreateTranslate(cx, cy), m);
    return m;
};

Nullstone.FinishCreate(ScaleTransform);
//#endregion