/// <reference path="GeneralTransform.js"/>
/// CODE
/// <reference path="MatrixTransform.js"/>

//#region Transform
var Transform = Nullstone.Create("Transform", GeneralTransform);

Transform.Instance.Init = function () {
    this.Init$GeneralTransform();
    this.ValueChanged = new MulticastEvent();
};

//#region Properties

Nullstone.Property(Transform, "Value", {
    get: function () {
        if (!this._Value) {
            var val = new Matrix();
            val.raw = this._BuildValue();
            this._Value = val;
        }
        return this._Value;
    }
});
Nullstone.Property(Transform, "Inverse", {
    get: function () {
        var inverse = this.Value.Inverse;
        if (inverse == null)
            return;

        var mt = new MatrixTransform();
        mt.Value = inverse;
        return mt;
    }
});

//#endregion

Transform.Instance.TransformPoint = function (point) {
    var v = mat3.transformVec2(this.Value.raw, vec2.createFrom(point.X, point.Y));
    return new Point(v[0], v[1]);
};
Transform.Instance.TransformBounds = function (rect) {
    /// <param name="rect" type="Rect"></param>
    /// <returns type="Rect" />
    if (!rect)
        return;
    return rect.Transform(this.Value.raw);
};

Transform.Instance._BuildValue = function () {
    AbstractMethod("Transform.BuildValue");
};
Transform.Instance._ClearValue = function () {
    delete this._Value;
    this.ValueChanged.Raise(this, new EventArgs());
};

Nullstone.FinishCreate(Transform);
//#endregion