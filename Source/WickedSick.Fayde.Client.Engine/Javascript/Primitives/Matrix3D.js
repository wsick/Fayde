/// <reference path="Matrix.js"/>

function Matrix3D() {
    /// _Elements -> 16 element array
    ///  [  0  1  2  3 ] 
    ///  [  4  5  6  7 ]
    ///  [  8  9 10 11 ] 
    ///  [ 12 13 14 15 ]
    this._Elements = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    Object.defineProperty(this, "Inverse", {
        get: function () {
            if (!this._InverseEls)
                this._InverseEls = Matrix3D._CalculateInverse(this);
            var m3 = new Matrix3D();
            m3._Elements = this._InverseEls;
            m3._InverseEls = this._Elements;
            return m3;
        }
    });
}
Matrix3D.prototype.toString = function () {
    return this._Elements.toString();
};

Matrix3D.Init = function (A, B) {
    /// <summary>Copies B onto A.</summary>
    /// <param name="A" type="Matrix3D"></param>
    /// <param name="B" type="Matrix3D"></param>
    A._Elements = B._Elements.slice(0);
};
Matrix3D.CreateAffine = function (matrix) {
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Matrix3D" />
    var els = matrix._Elements;
    var m = new Matrix3D();
    m._Elements = [
        els[0], els[1], 0, els[2],
        els[3], els[4], 0, els[5],
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    return m;
};
Matrix3D.Multiply = function (C, A, B) {
    /// <summary>Sets C = A*B</summary>
    /// <param name="C" type="Matrix3D"></param>
    /// <param name="A" type="Matrix3D"></param>
    /// <param name="B" type="Matrix3D"></param>

    var c = C._Elements;
    var a = A._Elements;
    //if user passed in same in-mem Matrix3D for C and B, we don't want to overwrite values as we're using them
    var b = B._Elements.slice(0);

    c[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
    c[4] = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
    c[8] = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
    c[12] = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];

    c[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
    c[5] = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
    c[9] = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
    c[13] = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];
    
    c[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
    c[6] = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
    c[10] = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
    c[14] = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];
    
    c[3] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];
    c[7] = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];
    c[11] = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];
    c[15] = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];
};
Matrix3D.TransformPoint = function (c, A, b) {
    /// <param name="c" type="Array">[x, y, z, w]</param>
    /// <param name="A" type="Matrix3D"></param>
    /// <param name="b" type="Array">[x, y, z, w]</param>
    var e = A._Elements;
    //if user passed in same in-mem point for c and b, we don't want to overwrite values as we're using them
    var d = b.slice(0);
    c[0] = e[0] * d[0] + e[1] * d[1] + e[2] * d[2] + e[3];
    c[1] = e[4] * d[0] + e[5] * d[1] + e[6] * d[2] + e[7];
    c[2] = e[8] * d[0] + e[9] * d[1] + e[10] * d[2] + e[11];
    c[3] = e[12] * d[0] + e[13] * d[1] + e[14] * d[2] + e[15];
};
Matrix3D.Equals = function (A, B) {
    /// <summary>Performs equality test on all items in A & B.</summary>
    /// <param name="A" type="Matrix3D"></param>
    /// <param name="B" type="Matrix3D"></param>
    /// <returns type="Boolean" />
    var elsA = A._Elements;
    var elsB = B._Elements;
    if (elsA.length !== elsB.length)
        return false;
    return !(elsA < elsB) && !(elsA > elsB);
};
Matrix3D.Get2DAffine = function (A) {
    /// <param name="A" type="Matrix3D"></param>
    /// <returns type="Matrix" />
    var els = A._Elements;
    if (els[2] === 0.0 && els[6] === 0.0
        && els[8] === 0.0 && els[9] === 0.0 && els[10] === 1.0 && els[11] === 0.0
        && els[12] === 0.0 && els[13] === 0.0 && els[14] === 0.0 && els[15] === 1.0) {
        var mt = new Matrix();
        mt._Elements = [els[0], els[1], els[3], els[4], els[5], els[7]];
        mt._Type = MatrixTypes.Unknown;
        return mt;
    }
};
Matrix3D._CalculateInverse = function (m) {
    var els = m._Elements;
    var tmp = [];

    tmp[0] = els[5] * els[10] * els[15] - els[5] * els[14] * els[11] - els[6] * els[9] * els[15] +
		els[6] * els[13] * els[11] + els[7] * els[9] * els[14] - els[7] * els[13] * els[10];
    tmp[1] = -els[1] * els[10] * els[15] + els[1] * els[14] * els[11] + els[2] * els[9] * els[15] -
		els[2] * els[13] * els[11] - els[3] * els[9] * els[14] + els[3] * els[13] * els[10];
    tmp[2] = els[1] * els[6] * els[15] - els[1] * els[14] * els[7] - els[2] * els[5] * els[15] +
		els[2] * els[13] * els[7] + els[3] * els[5] * els[14] - els[3] * els[13] * els[6];
    tmp[3] = -els[1] * els[6] * els[11] + els[1] * els[10] * els[7] + els[2] * els[5] * els[11] -
		els[2] * els[9] * els[7] - els[3] * els[5] * els[10] + els[3] * els[9] * els[6];
    tmp[4] = -els[4] * els[10] * els[15] + els[4] * els[14] * els[11] + els[6] * els[8] * els[15] -
		els[6] * els[12] * els[11] - els[7] * els[8] * els[14] + els[7] * els[12] * els[10];
    tmp[5] = els[0] * els[10] * els[15] - els[0] * els[14] * els[11] - els[2] * els[8] * els[15] +
		els[2] * els[12] * els[11] + els[3] * els[8] * els[14] - els[3] * els[12] * els[10];
    tmp[6] = -els[0] * els[6] * els[15] + els[0] * els[14] * els[7] + els[2] * els[4] * els[15] -
		els[2] * els[12] * els[7] - els[3] * els[4] * els[14] + els[3] * els[12] * els[6];
    tmp[7] = els[0] * els[6] * els[11] - els[0] * els[10] * els[7] - els[2] * els[4] * els[11] +
		els[2] * els[8] * els[7] + els[3] * els[4] * els[10] - els[3] * els[8] * els[6];
    tmp[8] = els[4] * els[9] * els[15] - els[4] * els[13] * els[11] - els[5] * els[8] * els[15] +
		els[5] * els[12] * els[11] + els[7] * els[8] * els[13] - els[7] * els[12] * els[9];
    tmp[9] = -els[0] * els[9] * els[15] + els[0] * els[13] * els[11] + els[1] * els[8] * els[15] -
		els[1] * els[12] * els[11] - els[3] * els[8] * els[13] + els[3] * els[12] * els[9];
    tmp[10] = els[0] * els[5] * els[15] - els[0] * els[13] * els[7] - els[1] * els[4] * els[15] +
		els[1] * els[12] * els[7] + els[3] * els[4] * els[13] - els[3] * els[12] * els[5];
    tmp[11] = -els[0] * els[5] * els[11] + els[0] * els[9] * els[7] + els[1] * els[4] * els[11] -
		els[1] * els[8] * els[7] - els[3] * els[4] * els[9] + els[3] * els[8] * els[5];
    tmp[12] = -els[4] * els[9] * els[14] + els[4] * els[13] * els[10] + els[5] * els[8] * els[14] -
		els[5] * els[12] * els[10] - els[6] * els[8] * els[13] + els[6] * els[12] * els[9];
    tmp[13] = els[0] * els[9] * els[14] - els[0] * els[13] * els[10] - els[1] * els[8] * els[14] +
		els[1] * els[12] * els[10] + els[2] * els[8] * els[13] - els[2] * els[12] * els[9];
    tmp[14] = -els[0] * els[5] * els[14] + els[0] * els[13] * els[6] + els[1] * els[4] * els[14] -
		els[1] * els[12] * els[6] - els[2] * els[4] * els[13] + els[2] * els[12] * els[5];
    tmp[15] = els[0] * els[5] * els[10] - els[0] * els[9] * els[6] - els[1] * els[4] * els[10] +
		els[1] * els[8] * els[6] + els[2] * els[4] * els[9] - els[2] * els[8] * els[5];

    var det = els[0] * tmp[0] + els[4] * tmp[1] + els[8] * tmp[2] + els[12] * tmp[3];
    if (det === 0)
        return;
    det = 1.0 / det;
    for (var i = 0; i < 16; i++) {
        tmp[i] *= det;
    }
    return tmp;
};