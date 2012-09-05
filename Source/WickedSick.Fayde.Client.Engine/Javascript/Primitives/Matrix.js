/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>

//#region Matrix

function Matrix() {
    this._Elements = [1, 0, 0, 0, 1, 0];
    this._Type = MatrixTypes.Identity;
    Object.defineProperty(this, "M11", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 1;
            return this._Elements[0];
        },
        set: function (value) {
            if (this._Elements[0] !== value) {
                this._Elements[0] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "M12", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 0;
            return this._Elements[1];
        },
        set: function (value) {
            if (this._Elements[1] !== value) {
                this._Elements[1] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "M21", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 0;
            return this._Elements[3];
        },
        set: function (value) {
            if (this._Elements[3] !== value) {
                this._Elements[3] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "M22", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 1;
            return this._Elements[4];
        },
        set: function (value) {
            if (this._Elements[4] !== value) {
                this._Elements[4] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "OffsetX", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 0;
            return this._Elements[2];
        },
        set: function (value) {
            if (this._Elements[2] !== value) {
                this._Elements[2] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "OffsetY", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return 0;
            return this._Elements[5];
        },
        set: function (value) {
            if (this._Elements[5] !== value) {
                this._Elements[5] = value;
                this._DeriveType();
                this._OnChanged();
            }
        }
    });
    Object.defineProperty(this, "Inverse", {
        get: function () {
            if (this._Type === MatrixTypes.Identity)
                return Matrix.CreateIdentity();
            if (!this._InverseArr)
                this._InverseArr = Matrix.BuildInverse(this._Elements);
            if (this._InverseArr == null)
                return null;
            return Matrix.Create(this._InverseArr, this._Elements);
        }
    });
}

Matrix.prototype.Copy = function () {
    var matrix = new Matrix();
    matrix._Elements = this._Elements.slice(0);
    if (this._Inverse)
        matrix._Inverse = this._Inverse.slice(0);
    matrix._Type = this._Type;
    return matrix;
};

Matrix.prototype.toString = function () {
    var arr = this._Elements;
    var t = "";
    t += arr[0];
    t += ",";
    t += arr[1];
    t += ",";
    t += arr[2];
    t += "\n";
    t += arr[3];
    t += ",";
    t += arr[4];
    t += ",";
    t += arr[5];
    t += "\n";
    t += "0,0,1";
    return t;
};

//#region Modifiers

Matrix.Translate = function (matrix, x, y) {
    /// <param name="matrix" type="Matrix"></param>
    /// <param name="x" type="Number"></param>
    /// <param name="y" type="Number"></param>
    if (x === 0 && y === 0)
        return;

    var els = matrix._Elements;
    els[2] += x;
    els[5] += y;

    delete matrix._Inverse;
    matrix._DeriveType();
};
Matrix.Scale = function (matrix, scaleX, scaleY, centerX, centerY) {
    /// <param name="matrix" type="Matrix"></param>
    /// <param name="scaleX" type="Number"></param>
    /// <param name="scaleY" type="Number"></param>
    /// <param name="centerX" type="Number"></param>
    /// <param name="centerY" type="Number"></param>
    if (scaleX === 1 && scaleY === 1)
        return;

    var translationExists = !((centerX == null || centerX === 0) && (centerY == null || centerY === 0));

    var els = matrix._Elements;
    if (translationExists)
        Matrix.Translate(matrix, -centerX, -centerY);

    els[0] *= scaleX;
    els[1] *= scaleX;
    els[2] *= scaleX;

    els[3] *= scaleY;
    els[4] *= scaleY;
    els[5] *= scaleY;

    if (translationExists)
        Matrix.Translate(matrix, centerX, centerY);

    delete matrix._Inverse;
    matrix._DeriveType();
};
Matrix.Multiply = function (C, A, B) {
    /// <param name="C" type="Matrix"></param>
    /// <param name="A" type="Matrix"></param>
    /// <param name="B" type="Matrix"></param>
    /// <summary>Sets C = A*B</summary>
    if (A._Type === MatrixTypes.Identity) {
        if (B._Type === MatrixTypes.Identity) {
            C._Elements = [1, 0, 0, 0, 1, 0];
            C._Inverse = [1, 0, 0, 0, 1, 0];
            C._Type = MatrixTypes.Identity;
            return;
        }
        C._Elements = B._Elements.slice(0);
        if (B._Inverse)
            C._Inverse = B._Inverse.slice(0);
        C._Type = B._Type;
        return;
    } else if (B._Type === MatrixTypes.Identity) {
        C._Elements = A._Elements.slice(0);
        if (A._Inverse)
            C._Inverse = A._Inverse.slice(0);
        C._Type = A._Type;
        return;
    }


    var e1 = A._Elements;
    var e2 = B._Elements;
    var e3 = [];

    // Matrix e1:
    //  a1              b1              c1
    //  d1              e1              f1
    //  0               0               1

    // Matrix e2:
    //  a2              b2              c2
    //  d2              e2              f2
    //  0               0               1

    // Matrix e3:
    // a1a2 + b1d2      a1b2 + b1e2     a1c2 + b1f2 + c1
    // d1a2 + e1d2      d1b2 + e1e2     d1c2 + e1f2 + f1
    // 0                0               1

    //Column 1
    e3[0] = e1[0] * e2[0] + e1[1] * e2[3];
    e3[3] = e1[3] * e2[0] + e1[4] * e2[3]

    //Column 2
    e3[1] = e1[0] * e2[1] + e1[1] * e2[4];
    e3[4] = e1[3] * e2[1] + e1[4] * e2[4]

    //Column 3
    e3[2] = e1[0] * e2[2] + e1[1] * e2[5] + e1[2];
    e3[5] = e1[3] * e2[2] + e1[4] * e2[5] + e1[5];

    C._Elements = e3;
    C._Type = MatrixTypes.Unknown;
};
Matrix.TransformBounds = function (m, bounds) {
    /// <param name="m" type="Matrix"></param>
    /// <param name="bounds" type="Rect"></param>
    /// <returns type="Rect" />
    var p1 = new Point(bounds.X, bounds.Y);
    var p2 = new Point(bounds.X + bounds.Width, bounds.Y);
    var p3 = new Point(bounds.X + bounds.Width, bounds.Y + bounds.Height);
    var p4 = new Point(bounds.X, bounds.Y + bounds.Height);

    Matrix.TransformPoint(p1, m, p1);
    Matrix.TransformPoint(p2, m, p2);
    Matrix.TransformPoint(p3, m, p3);
    Matrix.TransformPoint(p4, m, p4);

    var l = Math.min(Math.min(Math.min(p1.X, p2.X), p3.X), p4.X);
    var t = Math.min(Math.min(Math.min(p1.Y, p2.Y), p3.Y), p4.Y);
    var r = Math.max(Math.max(Math.max(p1.X, p2.X), p3.X), p4.X);
    var b = Math.max(Math.max(Math.max(p1.Y, p2.Y), p3.Y), p4.Y);

    return new Rect(l, t, r - l, b - t);
};
Matrix.TransformPoint = function (c, A, b) {
    /// <param name="c" type="Point"></param>
    /// <param name="A" type="Matrix"></param>
    /// <param name="b" type="Point"></param>
    /// <summary>Sets c = A*b</summary>
    var x;
    var y;
    if (A._Type === MatrixTypes.Identity) {
        x = b.X;
        y = b.Y;
    } else {
        var e = A._Elements;
        x = e[0] * b.X + e[1] * b.Y + e[2];
        y = e[3] * b.X + e[4] * b.Y + e[5];
    }
    c.X = x;
    c.Y = y;
};

//#endregion

//#region Factory

Matrix.Create = function (els, inverse) {
    var matrix = new Matrix();
    matrix._Elements = els;
    matrix._Inverse = inverse;
    matrix._DeriveType();
    return matrix;
};
Matrix.CreateIdentity = function () {
    var matrix = new Matrix();
    matrix._Elements = [1, 0, 0, 0, 1, 0];
    matrix._Inverse = [1, 0, 0, 0, 1, 0];
    matrix._Type = MatrixTypes.Identity;
    return matrix;
};
Matrix.CreateTranslate = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 0;
    if (y == null) y = 0;
    var matrix = new Matrix();
    matrix._Elements = [1, 0, x, 0, 1, y];
    matrix._Inverse = [1, 0, -x, 0, 1, -y];
    matrix._Type = MatrixTypes.Translate;
    return matrix;
};
Matrix.CreateScale = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 1;
    if (y == null) y = 1;
    var ix = x === 0 ? 0 : 1 / x;
    var iy = y === 0 ? 0 : 1 / y;
    var matrix = new Matrix();
    matrix._Elements = [x, 0, 0, 0, y, 0];
    matrix._Inverse = [ix, 0, 0, 0, iy, 0];
    matrix._Type = MatrixTypes.Scale;
    return matrix;
};
Matrix.CreateRotate = function (angleRad) {
    /// <returns type="Matrix" />
    if (angleRad == null)
        return Matrix.CreateIdentity();
    var c = Math.cos(angleRad);
    var s = Math.sin(angleRad);

    var matrix = new Matrix();
    matrix._Angle = angleRad;
    matrix._Elements = [c, -s, 0, s, c, 0];
    matrix._Type = MatrixTypes.Rotate;
    return matrix;
};
Matrix.CreateShear = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 0;
    if (y == null) y = 0;
    var matrix = new Matrix();
    matrix._Elements = [1, x, 0, y, 1, 0];
    matrix._Inverse = [1, -x, 0, -y, 1, 0];
    matrix._Type = MatrixTypes.Shear;
    return matrix;
};
Matrix.CreateSkew = function (angleRadX, angleRadY) {
    /// <returns type="Matrix" />
    if (angleRadX == null) angleRadX = 0;
    if (angleRadY == null) angleRadY = 0;

    var x = Math.tan(angleRadX);
    var ix = -x;
    var y = Math.tan(angleRadY);
    var iy = -y;

    var matrix = new Matrix();
    matrix._Elements = [1, y, 0, x, 1, 0];
    matrix._Inverse = [1, iy, 0, ix, 1, 0];
    matrix._Type = MatrixTypes.Shear;
    return matrix;
};

//#endregion

//#region Helpers

Matrix.BuildInverse = function (arr) {
    //Calculate determinant (ad - bc)
    var det = (arr[0] * arr[4]) - (arr[1] * arr[3]);
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

Matrix.prototype._DeriveType = function () {
    var els = this._Elements;
    this._Type = MatrixTypes.Unknown;
    if (els[1] === 0 && els[3] === 0) {
        if (els[0] === 1 && els[4] === 1) {
            if (els[2] === 0 && els[5] === 0)
                this._Type = MatrixTypes.Identity;
            else
                this._Type = MatrixTypes.Translate;
        } else {
            this._Type = MatrixTypes.Scale;
        }
    } else {
        if (els[0] === 1 && els[2] === 0 && els[4] === 1 && els[5] === 0)
            this._Type = MatrixTypes.Shear;
    }
};
Matrix.prototype._OnChanged = function () {
    if (this._ChangedCallback)
        this._ChangedCallback();
};

//#endregion

//#endregion