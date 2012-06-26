/// <reference path="GeneralTransform.js"/>
/// CODE

//#region InternalTransform
var InternalTransform = Nullstone.Create("InternalTransform", GeneralTransform);

InternalTransform.Instance.Init = function () {
    this.Init$GeneralTransform();
};

InternalTransform.Instance._GetInverse = function () {
    var inverse = this._M.Inverse;
    var t = new InternalTransform();
    Matrix3D.Init(t._M, inverse._M);
    return t;
};
InternalTransform.Instance._GetMatrix3D = function () {
    var m3 = new Matrix3D();
    Matrix3D.Init(m3, this._M);
    return m3;
};
InternalTransform.Instance._TryTransform = function (inPoint, outPoint) {
    var p4 = [inPoint.X, inPoint.Y, 0.0, 1.0];
    Matrix3D.TransformPoint(p4, this._M, p4);
    outPoint.Value = new Point(p4[0], p4[1]);
    return true;
};
InternalTransform.Instance._SetTransform = function (m3) {
    Matrix3D.Init(this._M, m3);
};
InternalTransform.Instance._UpdateTransform = function () {
    //do nothing
};

Nullstone.FinishCreate(InternalTransform);
//#endregion