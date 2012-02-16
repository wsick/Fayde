/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region Matrix

function Matrix() {
    RefObject.call(this);
    this._Elements = Matrix.CreateIdentityArray();
}
Matrix.InheritFrom(RefObject);

Matrix.prototype.GetElements = function () {
    return this._Elements;
};
Matrix.prototype.SetElement = function (i, j, value) {
    this._Elements[i][j] = value;
};
Matrix.prototype.Apply = function (ctx) {
    var elements = this.GetElements();
    ctx.transform(elements[0][0], elements[1][0], elements[0][1], elements[1][1], elements[0][2], elements[1][2]);
};
Matrix.prototype.Multiply = function (val) {
    var arr1 = this.GetElements();
    if (val instanceof Point) {
        var result = new Point();
        val = [[val.X], [val.Y], [1]];
        for (var i = 0; i < 3; i++) {
            result.X += arr1[0][i] * val[i][0];
            result.Y += arr1[1][i] * val[i][0];
        }
        return result;
    }
    if (val instanceof Matrix) {
        var result = new Matrix();
        var arr2 = val.GetElements();
        for (var i = 0; i < arr1.length; i++) {
            result[i] = new Array();
            for (var j = 0; j < arr2.length; j++) {
                var temp = 0;
                for (var k = 0; k < arr2[j].length; k++) {
                    temp += arr1[i][k] * arr2[k][j];
                }
                result.SetElement(i, j, temp);
            }
        }
        return result;
    }
    NotImplemented("Matrix.Multiply");
};
Matrix.prototype.Copy = function () {
    var m = new Matrix();
    var els = this.GetElements();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            m.SetElement(i, j, els[i][j]);
        }
    }
    return m;
};
Matrix.prototype.toString = function () {
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

//#endregion

//#region TranslationMatrix

function TranslationMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
TranslationMatrix.InheritFrom(Matrix);

TranslationMatrix.prototype.GetElements = function () {
    return [
        [1, 0, this.X],
        [0, 1, this.Y],
        [0, 0, 1]
    ];
};
TranslationMatrix.prototype.GetInverse = function () {
    return new TranslationMatrix(-this.X, -this.Y);
};
TranslationMatrix.prototype.Apply = function (ctx) {
    ctx.translate(this.X, this.Y);
};

//#endregion

//#region RotationMatrix

RotationMatrix.prototype = new Matrix;
RotationMatrix.prototype.constructor = RotationMatrix;
function RotationMatrix(angleRad) {
    Matrix.call(this);
    this.Angle = angleRad == null ? 0 : angleRad;
}
RotationMatrix.GetBaseClass = function () { return Matrix; };

RotationMatrix.prototype.GetElements = function () {
    return [
        [Math.cos(this.Angle), -1 * Math.sin(this.Angle), 0],
        [Math.sin(this.Angle), Math.cos(this.Angle), 0],
        [0, 0, 1]
    ];
};
RotationMatrix.prototype.GetInverse = function () {
    return new RotationMatrix(-this.Angle);
};
RotationMatrix.prototype.Apply = function (ctx) {
    ctx.rotate(this.Angle);
};

//#endregion

//#region ScalingMatrix

function ScalingMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 1 : x;
    this.Y = y == null ? 1 : y;
}
ScalingMatrix.InheritFrom(Matrix);

ScalingMatrix.prototype.GetElements = function () {
    return [
        [this.X, 0, 0],
        [0, this.Y, 0],
        [0, 0, 1]
    ];
};
ScalingMatrix.prototype.GetInverse = function () {
    return new ScalingMatrix(-this.X, -this.Y);
};
ScalingMatrix.prototype.Apply = function (ctx) {
    ctx.scale(this.X, this.Y);
};

//#endregion

//#region ShearingMatrix

function ShearingMatrix(shearX, shearY) {
    Matrix.call(this);
    this.ShearX = shearX == null ? 0 : shearX;
    this.ShearY = shearY == null ? 0 : shearY;
}
ShearingMatrix.InheritFrom(Matrix);

ShearingMatrix.prototype.GetElements = function () {
    return [
        [1, this.ShearX, 0],
        [this.ShearY, 1, 0],
        [0, 0, 1]
    ];
};
ShearingMatrix.prototype.GetInverse = function () {
    return new ShearingMatrix(-this.ShearX, -this.ShearY);
};
ShearingMatrix.prototype.Apply = function () {
    NotImplemented("ShearingMatrix.Apply");
};

//#endregion
