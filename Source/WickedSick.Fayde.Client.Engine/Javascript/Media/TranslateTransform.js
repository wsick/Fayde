/// <reference path="Transform.js"/>
/// CODE

(function (namespace) {
    var TranslateTransform = Nullstone.Create("TranslateTransform", namespace.Transform);

    //#region Properties

    TranslateTransform.XProperty = DependencyProperty.Register("X", function () { return Number; }, TranslateTransform, 0);
    TranslateTransform.YProperty = DependencyProperty.Register("Y", function () { return Number; }, TranslateTransform, 0);

    Nullstone.AutoProperties(TranslateTransform, [
        TranslateTransform.XProperty,
        TranslateTransform.YProperty
    ]);

    //#endregion

    TranslateTransform.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== TranslateTransform) {
            this._OnPropertyChanged$Transform(args, error);
            return;
        }

        if (args.Property._ID === TranslateTransform.XProperty._ID
            || args.Property._ID === TranslateTransform.YProperty._ID) {
            this._ClearValue();
        }
        this.PropertyChanged.Raise(this, args);
    };

    TranslateTransform.Instance._BuildValue = function () {
        return mat3.createTranslate(this.X, this.Y);
    };

    namespace.TranslateTransform = Nullstone.FinishCreate(TranslateTransform);
})(Nullstone.Namespace("Fayde.Media"));