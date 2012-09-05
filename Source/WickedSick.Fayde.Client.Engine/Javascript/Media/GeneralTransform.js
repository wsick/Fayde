/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Point.js"/>

//#region GeneralTransform
var GeneralTransform = Nullstone.Create("GeneralTransform", DependencyObject);

GeneralTransform.Instance.Init = function () {
    this.Init$DependencyObject();
    this._NeedUpdate = true;
    this._M = new Matrix3D();
};

GeneralTransform.Instance._GetMatrix = function () {
    this._MaybeUpdateTransform();
    var m3 = this._M;
    var m = new Matrix();
    m._Elements = [
        m3[0], m3[1], m3[3],
        m3[4], m3[5], m3[7]
    ];
    return m;
};
GeneralTransform.Instance._TryTransform = function (inPoint, outPoint) {
    this._MaybeUpdateTransform();
    var p4 = [inPoint.X, inPoint.Y, 0.0, 1.0];
    Matrix3D.TransformPoint(p4, this._M, p4);
    outPointOut.Value = new Point(p4[0], p4[1]);
    return true;
};
GeneralTransform.Instance._Transform = function (point) {
    /// <param name="point" type="Point"></param>
    /// <returns type="Point" />
    this._MaybeUpdateTransform();
    var p4 = [point.X, point.Y, 0.0, 1.0];
    Matrix3D.TransformPoint(p4, this._M, p4);

    if (p4[3] !== 0.0) {
        var w = 1.0 / p4[3];
        return new Point(p4[0] * w, p4[1] * w);
    }
    return new Point(NaN, NaN);
};
GeneralTransform.Instance._TransformPoint = function (point) {
    this._MaybeUpdateTransform();
    var p4 = [point.X, point.Y, 0.0, 1.0];
    Matrix3D.TransformPoint(p4, this._M, p4);
    point.X = p4[0];
    point.Y = p4[1];
};
GeneralTransform.Instance._TransformXY = function (x, y) {
    return this._Transform(new Point(x, y));
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

GeneralTransform._TransformPoint = function (p, r) {
    var t = t._Transform(p);
    r.X = t.X;
    r.Y = t.Y;
};

Nullstone.FinishCreate(GeneralTransform);
//#endregion