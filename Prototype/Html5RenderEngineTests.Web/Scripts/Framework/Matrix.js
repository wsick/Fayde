Matrix.prototype = new Object;
Matrix.prototype.constructor = Matrix;
function Matrix() {
    this._Elements = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
}
Matrix.prototype.GetElements = function () {
    return this._Elements;
};
Matrix.prototype.Apply = function (ctx) {
    var elements = this.GetElements();
    ctx.transform(elements[0][0], elements[1][0], elements[0][1], elements[1][1], elements[0][2], elements[1][2]);
};
Matrix.Multiply = function (mat1, mat2) {
    NotImplemented("Matrix.Multiply(mat1, mat2)");
};

TranslationMatrix.prototype = new Matrix;
TranslationMatrix.prototype.constructor = TranslationMatrix;
function TranslationMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
TranslationMatrix.prototype.GetElements = function () {
    return [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ];
};
TranslationMatrix.prototype.Apply = function (ctx) {
    ctx.translate(this.X, this.Y);
};

RotationMatrix.prototype = new Matrix;
RotationMatrix.prototype.constructor = RotationMatrix;
function RotationMatrix(angleRad) {
    Matrix.call(this);
    this.Angle = angleRad == null ? 0 : angleRad;
}
RotationMatrix.prototype.GetElements = function () {
    return [
        [Math.cos(this.Angle), -1 * Math.sin(this.Angle), 0],
        [Math.sin(this.Angle), Math.cos(this.Angle), 0],
        [0, 0, 1]
    ];
};
RotationMatrix.prototype.Apply = function (ctx) {
    ctx.rotate(this.Angle);
};

ScalingMatrix.prototype = new Matrix;
ScalingMatrix.prototype.constructor = ScalingMatrix;
function ScalingMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 1 : x;
    this.Y = y == null ? 1 : y;
}
ScalingMatrix.prototype.GetElements = function () {
    return [
        [this.X, 0, 0],
        [0, this.Y, 0],
        [0, 0, 1]
    ];
};
ScalingMatrix.prototype.Apply = function (ctx) {
    ctx.scale(this.X, this.Y);
};

ShearingMatrix.prototype = new Matrix;
ShearingMatrix.prototype.constructor = ShearingMatrix;
function ShearingMatrix(shearX, shearY) {
    Matrix.call(this);
    this.ShearX = shearX == null ? 0 : shearX;
    this.ShearY = shearY == null ? 0 : shearY;
}
ShearingMatrix.prototype.GetElements = function () {
    return [
        [1, this.ShearX, 0],
        [this.ShearY, 1, 0],
        [0, 0, 1]
    ];
};