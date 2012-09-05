/// <reference path="Transform.js"/>
/// CODE

//#region SkewTransform
var SkewTransform = Nullstone.Create("SkewTransform", Transform);

//#region Properties

SkewTransform.AngleXProperty = DependencyProperty.Register("AngleX", function () { return Number; }, SkewTransform, 0);
SkewTransform.AngleYProperty = DependencyProperty.Register("AngleY", function () { return Number; }, SkewTransform, 0);
SkewTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () { return Number; }, SkewTransform, 0);
SkewTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () { return Number; }, SkewTransform, 0);

Nullstone.AutoProperties(SkewTransform, [
    SkewTransform.AngleXProperty,
    SkewTransform.AngleYProperty,
    SkewTransform.CenterXProperty,
    SkewTransform.CenterYProperty
]);

//#endregion

SkewTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== SkewTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === SkewTransform.AngleXProperty._ID
        || args.Property._ID === SkewTransform.AngleYProperty._ID
        || args.Property._ID === SkewTransform.CenterXProperty._ID
        || args.Property._ID === SkewTransform.CenterYProperty._ID) {
        this._ClearValue();
    }
    this.PropertyChanged.Raise(this, args);
};

SkewTransform.Instance._BuildValue = function () {
    var cx = this.CenterX;
    var cy = this.CenterY;
    var angleXRad = Math.PI / 180 * this.AngleX;
    var angleYRad = Math.PI / 180 * this.AngleY;
    if (cx === 0 && cy === 0)
        return Matrix.CreateSkew(angleXRad, angleYRad);

    var m = new Matrix();
    Matrix.Multiply(m, Matrix.CreateSkew(angleXRad, angleYRad), Matrix.CreateTranslate(-cx, -cy));
    Matrix.Multiply(m, Matrix.CreateTranslate(cx, cy), m);
    return m;
};

Nullstone.FinishCreate(SkewTransform);
//#endregion