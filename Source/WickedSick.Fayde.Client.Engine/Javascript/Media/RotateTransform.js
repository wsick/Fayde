/// <reference path="Transform.js"/>
/// CODE

//#region RotateTransform
var RotateTransform = Nullstone.Create("RotateTransform", Transform);

//#region Properties

RotateTransform.AngleProperty = DependencyProperty.Register("Angle", function () { return Number; }, RotateTransform);
RotateTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () { return Number; }, RotateTransform);
RotateTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () { return Number; }, RotateTransform);

Nullstone.AutoProperties(RotateTransform, [
    RotateTransform.AngleProperty,
    RotateTransform.CenterXProperty,
    RotateTransform.CenterYProperty
]);

Nullstone.Property(RotateTransform, "Value", {
    get: function () {
        if (!this._Value)
            this._Value = this._BuildValue();
        return this._Value;
    }
});

//#endregion

RotateTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== RotateTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === RotateTransform.AngleProperty._ID
        || args.Property._ID === RotateTransform.CenterXProperty._ID
        || args.Property._ID === RotateTransform.CenterYProperty._ID) {
        delete this._Value;
    }
    this.PropertyChanged.Raise(this, args);
};

RotateTransform.Instance._BuildValue = function () {
    NotImplemented("RotateTransform._BuildValue");
    return new Matrix();
};

Nullstone.FinishCreate(RotateTransform);
//#endregion