/// <reference path="Transform.js"/>
/// CODE

//#region SkewTransform
var SkewTransform = Nullstone.Create("SkewTransform", Transform);

//#region Dependency Properties

SkewTransform.AngleXProperty = DependencyProperty.Register("AngleX", function () { return Number; }, SkewTransform);
SkewTransform.AngleYProperty = DependencyProperty.Register("AngleY", function () { return Number; }, SkewTransform);
SkewTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () { return Number; }, SkewTransform);
SkewTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () { return Number; }, SkewTransform);

Nullstone.AutoProperties(SkewTransform, [
    SkewTransform.AngleXProperty,
    SkewTransform.AngleYProperty,
    SkewTransform.CenterXProperty,
    SkewTransform.CenterYProperty
]);

Nullstone.Property(SkewTransform, "Value", {
    get: function () {
        if (!this._Value)
            this._Value = this._BuildValue();
        return this._Value;
    }
});

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
        delete this._Value;
    }
    this.PropertyChanged.Raise(this, args);
};

SkewTransform.Instance._BuildValue = function () {
    NotImplemented("SkewTransform._BuildValue");
    return new Matrix();
};

Nullstone.FinishCreate(SkewTransform);
//#endregion