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
    var m = mat3.createSkew(angleXRad, angleYRad);
    if (cx === 0 && cy === 0)
        return m;

    mat3.multiply(m, mat3.createTranslate(-cx, -cy), m);
    mat3.translate(m, cx, cy);
    return m;
};

Nullstone.FinishCreate(SkewTransform);
//#endregion