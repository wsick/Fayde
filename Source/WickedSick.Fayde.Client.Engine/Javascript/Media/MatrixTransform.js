/// <reference path="Transform.js"/>
/// CODE

//#region MatrixTransform
var MatrixTransform = Nullstone.Create("MatrixTransform", Transform);

//#region Properties

MatrixTransform.ValueProperty = DependencyProperty.RegisterFull("Value", function () { return Matrix; }, MatrixTransform, undefined, { GetValue: function () { return new Matrix(); } });

Nullstone.AutoProperty(MatrixTransform, MatrixTransform.ValueProperty, undefined, true);

//#endregion

MatrixTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== MatrixTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }
    //We need to subscribe Matrix._ChangedCallback to notify ValueProperty changed
    if (args.Property._ID === MatrixTransform.ValueProperty._ID) {
        if (args.OldValue != null)
            args.OldValue._ChangedCallback = null;
        if (args.NewValue != null) {
            var mt = this;
            args.NewValue._ChangedCallback = function () { mt._OnSubPropertyChanged(MatrixTransform.ValueProperty, this, args) };
        }
    }
    this.PropertyChanged.Raise(this, args);
};
MatrixTransform.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    this._NeedUpdate = true;
    this._OnSubPropertyChanged$Transform(propd, sender, args);
    var newArgs = {
        Property: propd,
        OldValue: null,
        NewValue: this._GetValue(propd)
    };
    this.PropertyChanged.Raise(this, newArgs);
};

Nullstone.FinishCreate(MatrixTransform);
//#endregion