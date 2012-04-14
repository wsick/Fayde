/// <reference path="GeneralTransform.js"/>
/// CODE
/// <reference path="MatrixTransform.js"/>

//#region Transform
var Transform = Nullstone.Create("Transform", GeneralTransform);

Transform.Instance.Init = function () {
};

Transform.Instance.GetInverse = function () {
    var inv = this._Matrix.GetInverse();
    if (inv == null)
        throw new InvalidOperationException("Transform is not invertible");
    var mt = new MatrixTransform();
    mt.SetMatrix(inv);
    return mt;
};
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
Transform.Instance.TryTransform = function (inPoint, outPointOut) {
    this._MaybeUpdateTransform();
    outPointOut.Value = this._TransformPoint(inPoint);
    return true;
};
Transform.Instance.GetMatrix = function () {
    AbstractMethod("Transform.GetMatrix");
};

Nullstone.FinishCreate(Transform);
//#endregion