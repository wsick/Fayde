/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Matrix
var Matrix = Nullstone.Create("Matrix");

Matrix.Instance.Init = function () {
    this._Elements = Matrix.CreateIdentityArray();
};

Matrix.Instance.GetElements = function () {
    return this._Elements;
};
Matrix.Instance.SetElement = function (i, j, value) {
    this._Elements[i][j] = value;
};
Matrix.Instance.Apply = function (ctx) {
    var elements = this.GetElements();
    ctx.transform(elements[0][0], elements[1][0], elements[0][1], elements[1][1], elements[0][2], elements[1][2]);
};
Matrix.Instance.MultiplyMatrix = function (val) {
    var arr1 = this.GetElements();
    var result = new Matrix();
    var arr2 = val.GetElements();
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            var temp = 0;
            for (var k = 0; k < arr2[j].length; k++) {
                temp += arr1[i][k] * arr2[k][j];
            }
            result._Elements[i][j] = temp;
        }
    }
    return result;
};
Matrix.Instance.MultiplyPoint = function (val) {
    var arr1 = this.GetElements();
    var result = new Point();
    val = [[val.X], [val.Y], [1]];
    for (var i = 0; i < 3; i++) {
        result.X += arr1[0][i] * val[i][0];
        result.Y += arr1[1][i] * val[i][0];
    }
    return result;
};
Matrix.Instance.Copy = function () {
    var m = new Matrix();
    var els = this.GetElements();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            m._Elements[i][j] = els[i][j];
        }
    }
    return m;
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
Matrix.CreateIdentityArray = function () {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
};

Nullstone.FinishCreate(Matrix);
//#endregion

//#region TranslationMatrix
var TranslationMatrix = Nullstone.Create("TranslationMatrix", Matrix, 2);

TranslationMatrix.Instance.Init = function (x, y) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
};

TranslationMatrix.Instance.GetElements = function () {
    return [
        [1, 0, this.X],
        [0, 1, this.Y],
        [0, 0, 1]
    ];
};
TranslationMatrix.Instance.GetInverse = function () {
    return new TranslationMatrix(-this.X, -this.Y);
};
TranslationMatrix.Instance.Apply = function (ctx) {
    ctx.translate(this.X, this.Y);
};

Nullstone.FinishCreate(TranslationMatrix);
//#endregion

//#region RotationMatrix
var RotationMatrix = Nullstone.Create("RotationMatrix", Matrix, 1);

RotationMatrix.Instance.Init = function (angleRad) {
    this.Angle = angleRad == null ? 0 : angleRad;
};

RotationMatrix.Instance.GetElements = function () {
    return [
        [Math.cos(this.Angle), -1 * Math.sin(this.Angle), 0],
        [Math.sin(this.Angle), Math.cos(this.Angle), 0],
        [0, 0, 1]
    ];
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
    this.X = x == null ? 1 : x;
    this.Y = y == null ? 1 : y;
};

ScalingMatrix.Instance.GetElements = function () {
    return [
        [this.X, 0, 0],
        [0, this.Y, 0],
        [0, 0, 1]
    ];
};
ScalingMatrix.Instance.GetInverse = function () {
    return new ScalingMatrix(-this.X, -this.Y);
};
ScalingMatrix.Instance.Apply = function (ctx) {
    ctx.scale(this.X, this.Y);
};

Nullstone.FinishCreate(ScalingMatrix);
//#endregion

//#region ShearingMatrix
var ShearingMatrix = Nullstone.Create("ShearingMatrix", Matrix, 2);

ShearingMatrix.Instance.Init = function (shearX, shearY) {
    this.ShearX = shearX == null ? 0 : shearX;
    this.ShearY = shearY == null ? 0 : shearY;
};

ShearingMatrix.Instance.GetElements = function () {
    return [
        [1, this.ShearX, 0],
        [this.ShearY, 1, 0],
        [0, 0, 1]
    ];
};
ShearingMatrix.Instance.GetInverse = function () {
    return new ShearingMatrix(-this.ShearX, -this.ShearY);
};
ShearingMatrix.Instance.Apply = function () {
    NotImplemented("ShearingMatrix.Apply");
};

Nullstone.FinishCreate(ShearingMatrix);
//#endregion