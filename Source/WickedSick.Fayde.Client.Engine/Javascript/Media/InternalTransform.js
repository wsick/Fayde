/// <reference path="GeneralTransform.js"/>
/// CODE

//#region InternalTransform
var InternalTransform = Nullstone.Create("InternalTransform", GeneralTransform);

InternalTransform.Instance.Init = function () {
    this.Init$GeneralTransform();
    this.raw = mat4.identity();
};

InternalTransform.Instance.Transform = function (p) {
    var pi = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
    var po = vec4.create();
    mat4.transformVec4(this.raw, pi, po);
    if (po[3] != 0.0){
        var w = 1.0 / po[3];
        return new Point(po[0] * w, p[1] * w);
    }
    return new Point(NaN, NaN);
};

Nullstone.FinishCreate(InternalTransform);
//#endregion