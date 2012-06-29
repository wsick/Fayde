/// <reference path="GeneralTransform.js"/>
/// CODE
/// <reference path="MatrixTransform.js"/>

//#region Transform
var Transform = Nullstone.Create("Transform", GeneralTransform);

Transform.Instance.Init = function () {
    this.Init$GeneralTransform();
};

/*
Transform.Instance.TransformBounds = function (rect) {
    /// <param name="rect" type="Rect"></param>
    /// <returns type="Rect" />
    var p1 = this._TransformPoint(new Point(rect.X, rect.Y));
    var p2 = this._TransformPoint(new Point(rect.X + rect.Width, rect.Y + rect.Height));
    return new Rect(
        Math.min(p1.X, p2.X), 
        Math.min(p1.Y, p2.Y),
        Math.abs(p2.X - p1.X), 
        Math.abs(p2.Y - p1.Y));
};
*/
Transform.Instance._GetInverse = function () {
    var inverse = this._GetMatrix().Inverse;
    if (inverse == null)
        return;

    var mt = new MatrixTransform();
    mt._SetMatrix(inverse);
    return mt;
};
Transform.Instance._TryTransform = function (inPoint, outPoint) {
    this._MaybeUpdateTransform();
    var p4 = [inPoint.X, inPoint.Y, 0.0, 1.0];
    Matrix3D.TransformPoint(p4, this._M, p4);
    outPointOut.Value = new Point(p4[0], p4[1]);
    return true;
};

Nullstone.AbstractProperty(Transform, "Matrix", true);

Nullstone.FinishCreate(Transform);
//#endregion