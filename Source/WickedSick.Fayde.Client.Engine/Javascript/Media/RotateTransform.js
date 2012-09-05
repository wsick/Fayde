/// <reference path="Transform.js"/>
/// CODE

//#region RotateTransform
var RotateTransform = Nullstone.Create("RotateTransform", Transform);

//#region Properties

RotateTransform.AngleProperty = DependencyProperty.Register("Angle", function () { return Number; }, RotateTransform, 0);
RotateTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () { return Number; }, RotateTransform, 0);
RotateTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () { return Number; }, RotateTransform, 0);

Nullstone.AutoProperties(RotateTransform, [
    RotateTransform.AngleProperty,
    RotateTransform.CenterXProperty,
    RotateTransform.CenterYProperty
]);

//#endregion

RotateTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== RotateTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === RotateTransform.AngleProperty._ID
        || args.Property._ID === RotateTransform.CenterXProperty._ID
        || args.Property._ID === RotateTransform.CenterYProperty._ID) {
        this._ClearValue();
    }
    this.PropertyChanged.Raise(this, args);
};

RotateTransform.Instance._BuildValue = function () {
    var cx = this.CenterX;
    var cy = this.CenterY;
    var angleRad = Math.PI / 180 * this.Angle;
    if (cx === 0 && cy === 0)
        return Matrix.CreateRotate(angleRad);

    var m = new Matrix();
    Matrix.Multiply(m, Matrix.CreateRotate(angleRad), Matrix.CreateTranslate(-cx, -cy));
    Matrix.Multiply(m, Matrix.CreateTranslate(cx, cy), m);
    return m;
};

Nullstone.FinishCreate(RotateTransform);
//#endregion