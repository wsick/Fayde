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
    var m = mat3.createScale(this.ScaleX, this.ScaleY);
    if (cx === 0 && cy === 0)
        return m;

    mat3.multiply(mat3.createTranslate(-cx, -cy), m, m); //m = m * translation
    mat3.translate(m, cx, cy);
    return m;
};

Nullstone.FinishCreate(ScaleTransform);
//#endregion