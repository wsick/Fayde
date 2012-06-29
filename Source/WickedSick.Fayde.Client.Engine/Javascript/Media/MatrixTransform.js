/// <reference path="Transform.js"/>
/// CODE

//#region MatrixTransform
var MatrixTransform = Nullstone.Create("MatrixTransform", Transform);

MatrixTransform.Instance.Init = function () {
    this.Init$Transform();
};

//#region Dependency Properties

MatrixTransform.MatrixProperty = DependencyProperty.RegisterFull("Matrix", function () { return Matrix; }, MatrixTransform, undefined, { GetValue: function () { return new Matrix(); } });

Nullstone.AutoProperties(MatrixTransform, [
    MatrixTransform.MatrixProperty
]);

//#endregion

MatrixTransform.Instance._UpdateTransform = function () {
    var matrix = this.Matrix;
    if (matrix)
        this._M = Matrix3D.CreateAffine(this.Matrix);
    else
        this._M = new Matrix3D();
};

MatrixTransform.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== MatrixTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }
    //We need to subscribe Matrix._ChangedCallback to notify MatrixProperty changed
    if (args.Property._ID === MatrixTransform.MatrixProperty._ID) {
        if (args.OldValue != null)
            args.OldValue._ChangedCallback = null;
        if (args.NewValue != null) {
            var mt = this;
            args.NewValue._ChangedCallback = function () { mt._OnSubPropertyChanged(MatrixTransform.MatrixProperty, this, args) };
        }
    }
    this.PropertyChanged.Raise(this, args);
};
MatrixTransform.prototype._OnSubPropertyChanged = function (propd, sender, args) {
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