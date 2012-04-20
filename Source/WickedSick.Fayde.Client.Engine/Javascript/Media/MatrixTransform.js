/// <reference path="Transform.js"/>
/// CODE

//#region MatrixTransform
var MatrixTransform = Nullstone.Create("MatrixTransform", Transform);

MatrixTransform.Instance.Init = function () {
};

//#region Dependency Properties

MatrixTransform.MatrixProperty = DependencyProperty.RegisterCore("Matrix", function() { return Matrix; }, MatrixTransform, new Matrix());
MatrixTransform.Instance.GetMatrix = function () {
	///<returns type="Matrix"></returns>
	return this.$GetValue(MatrixTransform.MatrixProperty);
};
MatrixTransform.Instance.SetMatrix = function (value) {
    ///<param name="value" type="Matrix"></param>
	this.$SetValue(MatrixTransform.MatrixProperty, value);
};

//#endregion

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
        NewValue: this.$GetValue(propd)
    };
    this.PropertyChanged.Raise(this, newArgs);
};

Nullstone.FinishCreate(MatrixTransform);
//#endregion