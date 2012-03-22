/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Matrix
var Matrix = Nullstone.Create("Matrix");

Matrix.Instance.Init = function (args) {
    if (args.length === 2) {
        var els = args[0];
        this._Elements = els;
        this._Identity = els[0] === 1 && els[1] === 0 && els[2] === 0
            && els[3] === 0 && els[4] === 1 && els[5] === 0;
        this._Inverse = args[1];
        return;
    }
    this._Elements = [1, 0, 0, 0, 1, 0];
    this._Identity = true;
};

Matrix.Instance.GetInverse = function () {
    if (this._Identity)
        return new Matrix();
    if (!this._Inverse)
        this._Inverse = Matrix.BuildInverse(this._Elements);
    return new Matrix(this._Inverse, this._Elements);
};
Matrix.Instance.Apply = function (ctx) {
    var els = this._Elements;
    ctx.transform(els[0], els[3], els[1], els[4], els[2], els[5]);
};
Matrix.Instance.MultiplyMatrix = function (val) {
    if (this._Identity === true && val._Identity === true)
        return new Matrix();
    if (this._Identity === true)
        return new Matrix(val._Elements.slice(0));
    if (val._Identity === true)
        return new Matrix(this._Elements.slice(0));

    var e1 = this._Elements;
    var e2 = val._Elements;
    var e3 = [];

    e3[0] = e1[0] * e2[0] + e1[1] * e2[3];
    e3[1] = e1[0] * e2[1] + e1[1] * e2[4];
    e3[2] = e1[0] * e2[2] + e1[1] * e2[5] + e1[2];

    e3[3] = e1[3] * e2[0] + e1[4] * e2[3]
    e3[4] = e1[3] * e2[1] + e1[4] * e2[4]
    e3[5] = e1[3] * e2[2] + e1[4] * e2[5] + e1[5];

    return new Matrix(e3);
};
Matrix.Instance.MultiplyPoint = function (val) {
    var e = this._Elements;
    return new Point(
        e[0] * val.X + e[1] * val.Y + e[2],
        e[3] * val.X + e[4] * val.Y + e[5]
    );
};
Matrix.Instance.Copy = function () {
    return new Matrix(this._Elements.slice(0));
};
Matrix.Instance.toString = function () {
    var t = new String();
    t += "[\n";
    var arr = this.GetElements();
    for (var i = 0; i < arr.length; i++) {
        t += "[";
        for (var j = 0; j < arr[i].length; j++) {
            t += arr[i][j].toString();
            t += ",";
        }
        t = t.substr(0, t.length - 1)
        t += "],\n";
    }
    t = t.substr(0, t.length - 2);
    t += "\n]";
    return t;
};

Matrix.BuildInverse = function (arr) {
    var det = Matrix.GetDeterminant(arr);
    if (det === 0)
        return null;
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    var d = arr[3];
    var e = arr[4];
    var f = arr[5];
    return [
        e / det, -b / det, (b * f - c * e) / det,
        -d / det, a / det, (c * d - a * f) / det
    ];
};
Matrix.GetDeterminant = function (arr) {
    //ad - bc
    return (arr[0] * arr[4]) - (arr[1] * arr[3]);
};

Nullstone.FinishCreate(Matrix);
//#endregion

//#region TranslationMatrix
var TranslationMatrix = Nullstone.Create("TranslationMatrix", Matrix, 2);

TranslationMatrix.Instance.Init = function (x, y) {
    if (!x) x = 0;
    if (!y) y = 0;
    this._Elements = [1, 0, x, 0, 1, y];
};

TranslationMatrix.Instance.GetInverse = function () {
    return new TranslationMatrix(-this._Elements[2], -this._Elements[5]);
};
TranslationMatrix.Instance.Apply = function (ctx) {
    ctx.translate(this._Elements[2], this._Elements[5]);
};

Nullstone.FinishCreate(TranslationMatrix);
//#endregion

//#region RotationMatrix
var RotationMatrix = Nullstone.Create("RotationMatrix", Matrix, 1);

RotationMatrix.Instance.Init = function (angleRad) {
    this.Angle = angleRad == null ? 0 : angleRad;
    this._Elements = [Math.cos(this.Angle), -1 * Math.sin(this.Angle),  0, Math.sin(this.Angle), Math.cos(this.Angle), 0];
};

RotationMatrix.Instance.GetInverse = function () {
    return new RotationMatrix(-this.Angle);
};
RotationMatrix.Instance.Apply = function (ctx) {
    ctx.rotate(this.Angle);
};

Nullstone.FinishCreate(RotationMatrix);
//#endregion

//#region ScalingMatrix
var ScalingMatrix = Nullstone.Create("ScalingMatrix", Matrix, 2);

ScalingMatrix.Instance.Init = function (x, y) {
    if (!x) x = 0;
    if (!y) y = 0;
    this._Elements = [x, 0, 0,  0, y, 0];
};
ScalingMatrix.Instance.GetInverse = function () {
    return new ScalingMatrix(-this._Elements[0], -this._Elements[4]);
};
ScalingMatrix.Instance.Apply = function (ctx) {
    ctx.scale(this._Elements[0], this._Elements[4]);
};

Nullstone.FinishCreate(ScalingMatrix);
//#endregion

//#region ShearingMatrix
var ShearingMatrix = Nullstone.Create("ShearingMatrix", Matrix, 2);

ShearingMatrix.Instance.Init = function (x, y) {
    if (!x) x = 0;
    if (!y) y = 0;
    this._Elements = [1, x, 0,  y, 1, 0];
};

ShearingMatrix.Instance.GetInverse = function () {
    return new ShearingMatrix(-this._Elements[1], -this._Elements[3]);
};

Nullstone.FinishCreate(ShearingMatrix);
//#endregion