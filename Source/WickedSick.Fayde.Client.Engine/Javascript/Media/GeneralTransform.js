/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Point.js"/>

//#region GeneralTransform
var GeneralTransform = Nullstone.Create("GeneralTransform", DependencyObject);

GeneralTransform.Instance.Init = function () {
    this.Init$DependencyObject();
    this._NeedUpdate = true;
    this._Matrix = new Matrix();
};

GeneralTransform.Instance.GetInverse = function () {
    /// <returns type="GeneralTransform" />
    AbstractMethod("GeneralTransform.GetInverse");
};
GeneralTransform.Instance.TransformBounds = function (rect) {
    /// <param name="rect" type="Rect"></param>
    /// <returns type="Rect" />
    AbstractMethod("GeneralTransform.TransformBounds");
};
GeneralTransform.Instance.Transform = function (point) {
    /// <param name="point" type="Point"></param>
    /// <returns type="Point" />
    var po = { Value: null };
    if (this.TryTransform(point, po))
        return po.Value;
    throw new InvalidOperationException("Could not transform.");
};
GeneralTransform.Instance.TryTransform = function (inPoint, outPointOut) {
    /// <param name="inPoint" type="Point"></param>
    /// <param name="outPoint" type="Object"></param>
    /// <returns type="Boolean" />
    AbstractMethod("GeneralTransform.TryTransform");
};

GeneralTransform.Instance._TransformPoint = function (p) {
    return this._Matrix.MultiplyPoint(p);
};
GeneralTransform.Instance._MaybeUpdateTransform = function () {
    if (this._NeedUpdate) {
        this._UpdateTransform();
        this._NeedUpdate = false;
    }
};
GeneralTransform.Instance._UpdateTransform = function () {
    AbstractMethod("GeneralTransform._UpdateTransform");
};

GeneralTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== GeneralTransform) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._NeedUpdate = true;
    this.PropertyChanged.Raise(this, args);
};

Nullstone.FinishCreate(GeneralTransform);
//#endregion