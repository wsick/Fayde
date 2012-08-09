/// <reference path="Transform.js"/>
/// CODE

//#region TranslateTransform
var TranslateTransform = Nullstone.Create("TranslateTransform", Transform);

//#region Dependency Properties

TranslateTransform.XProperty = DependencyProperty.Register("X", function () { return Number; }, TranslateTransform);
TranslateTransform.YProperty = DependencyProperty.Register("Y", function () { return Number; }, TranslateTransform);

Nullstone.AutoProperties(TranslateTransform, [
    TranslateTransform.XProperty,
    TranslateTransform.YProperty
]);

Nullstone.Property(TranslateTransform, "Value", {
    get: function () {
        if (!this._Value)
            this._Value = this._BuildValue();
        return this._Value;
    }
});

//#endregion

TranslateTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TranslateTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }

    if (args.Property._ID === TranslateTransform.XProperty._ID
        || args.Property._ID === TranslateTransform.YProperty._ID) {
        delete this._Value;
    }
    this.PropertyChanged.Raise(this, args);
};

TranslateTransform.Instance._BuildValue = function () {
    NotImplemented("TranslateTransform._BuildValue");
    return new Matrix();
};

Nullstone.FinishCreate(TranslateTransform);
//#endregion