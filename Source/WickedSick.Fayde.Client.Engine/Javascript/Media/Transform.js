/// <reference path="GeneralTransform.js"/>
/// CODE
/// <reference path="MatrixTransform.js"/>

//#region Transform
var Transform = Nullstone.Create("Transform", GeneralTransform);

Transform.Instance.Init = function () {
    this.Init$GeneralTransform();
    this.ValueChanged = new MulticastEvent();
};

Transform.Instance._TryTransform = function (inPoint, outPoint) {
    var o = new Point();
    Matrix.TransformPoint(o, this.Value, inPoint);
    outPointOut.Value = o;
    return true;
};
Transform.Instance._Transform = function (point) {
    /// <param name="point" type="Point"></param>
    /// <returns type="Point" />
    var p = new Point();
    Matrix.TransformPoint(p, this.Value, point);
    return p;
};
Transform.Instance.TransformPoint = function (point) {
    Matrix.TransformPoint(point, this.Value, point);
};
Transform.Instance.TransformBounds = function (rect) {
    /// <param name="rect" type="Rect"></param>
    /// <returns type="Rect" />
    return Matrix.TransformBounds(this.Value, rect);
};

Transform.Instance._UpdateTransform = function () {
    var matrix = this.Value;
    if (matrix)
        this._M = Matrix3D.CreateAffine(this.Value);
    else
        this._M = new Matrix3D();
};
Transform.Instance._GetInverse = function () {
    var inverse = this._GetMatrix().Inverse;
    if (inverse == null)
        return;

    var mt = new MatrixTransform();
    mt._SetMatrix(inverse);
    return mt;
};

Nullstone.Property(Transform, "Value", {
    get: function () {
        if (!this._Value)
            this._Value = this._BuildValue();
        return this._Value;
    }
});
Transform.Instance._BuildValue = function () {
    AbstractMethod("_Transform.BuildValue");
};
Transform.Instance._ClearValue = function () {
    delete this._Value;
    this.ValueChanged.Raise(this, new EventArgs());
};

Nullstone.FinishCreate(Transform);
//#endregion