/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>

//#region Matrix
var Matrix = Nullstone.Create("Matrix", null, 2);

Matrix.Instance.Init = function (els, inverse) {
    if (els === undefined) {
        this._Elements = [1, 0, 0, 0, 1, 0];
        this._Type = MatrixTypes.Identity;
        return;
    }
    this._Elements = els;
    this._Inverse = inverse;
    this._DeriveType();
};

//#region Properties

Matrix.prototype.GetM11 = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 1;
    return this._Elements[0];
};
Matrix.prototype.SetM11 = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[0] !== value) {
        this._Elements[0] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

Matrix.prototype.GetM12 = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[1];
};
Matrix.prototype.SetM12 = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[1] !== value) {
        this._Elements[1] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

Matrix.prototype.GetM21 = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[3];
};
Matrix.prototype.SetM21 = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[3] !== value) {
        this._Elements[3] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

Matrix.prototype.GetM22 = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 1;
    return this._Elements[4];
};
Matrix.prototype.SetM22 = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[4] !== value) {
        this._Elements[4] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

Matrix.prototype.GetOffsetX = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[2];
};
Matrix.prototype.SetOffsetX = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[2] !== value) {
        this._Elements[2] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

Matrix.prototype.GetOffsetY = function () {
    ///<returns type="Number"></returns>
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[5];
};
Matrix.prototype.SetOffsetY = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._Elements[5] !== value) {
        this._Elements[5] = value;
        this._DeriveType();
        this._OnChanged();
    }
};

//#endregion

Matrix.Instance.GetInverse = function () {
    if (this._Type === MatrixTypes.Identity)
        return new Matrix();
    if (!this._Inverse)
        this._Inverse = Matrix.BuildInverse(this._Elements);
    if (this._Inverse == null)
        return null;
    return new Matrix(this._Inverse, this._Elements);
};
Matrix.Instance.Apply = function (ctx) {
    if (this._Type === MatrixTypes.Identity)
        return;
    var els = this._Elements;
    switch (this._Type) {
        case MatrixTypes.Translate:
            ctx.translate(els[2], els[5]);
            break;
        case MatrixTypes.Scale:
            ctx.scale(els[0], els[4]);
            break;
        case MatrixTypes.Rotate:
            ctx.rotate(this._Angle);
            break;
        default:
            ctx.transform(els[0], els[3], els[1], els[4], els[2], els[5]);
            break;
    }
};
Matrix.Instance.MultiplyMatrix = function (val) {
    /// <param name="val" type="Matrix"></param>
    if (this._Type === MatrixTypes.Identity) {
        if (val._Type === MatrixTypes.Identity)
            return new Matrix();
        return new Matrix(val._Elements.slice(0));
    }
    if (val._Type === MatrixTypes.Identity)
        return new Matrix(this._Elements.slice(0));

    var e1 = this._Elements;
    var e2 = val._Elements;
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

Matrix.Instance._DeriveType = function () {
    this._Angle = undefined;
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
Matrix.Instance._OnChanged = function () {
    if (this._ChangedCallback)
        this._ChangedCallback();
};

Matrix.Translate = function (matrix, x, y) {
    /// <param name="matrix" type="Matrix"></param>
    /// <param name="x" type="Number"></param>
    /// <param name="y" type="Number"></param>
    /// <returns type="Matrix" />
    if (x === 0 && y === 0)
        return matrix;

    var els = matrix._Elements;
    els[2] += x;
    els[5] += y;

    matrix._Inverse = undefined;
    matrix._DeriveType();
    return matrix;
};
Matrix.Scale = function (matrix, scaleX, scaleY, centerX, centerY) {
    /// <param name="matrix" type="Matrix"></param>
    /// <param name="scaleX" type="Number"></param>
    /// <param name="scaleY" type="Number"></param>
    /// <param name="centerX" type="Number"></param>
    /// <param name="centerY" type="Number"></param>
    /// <returns type="Matrix" />
    if (scaleX === 1 && scaleY === 1)
        return matrix;

    var m1 = matrix;
    var translationExists = !((centerX == null || centerX === 0) && (centerY == null || centerY === 0));

    var els = m1._Elements;
    if (translationExists)
        m1 = Matrix.Translate(m1, -centerX, -centerY);

    els[0] *= scaleX;
    els[1] *= scaleX;
    els[2] *= scaleX;

    els[3] *= scaleY;
    els[4] *= scaleY;
    els[5] *= scaleY;

    if (translationExists)
        m1 = Matrix.Translate(m1, centerX, centerY);

    m1._Inverse = undefined;
    m1._DeriveType();

    return m1;
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

//#region Factory

Matrix.CreateTranslate = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 0;
    if (y == null) y = 0;
    return new Matrix([1, 0, x, 0, 1, y], [1, 0, -x, 0, 1, -y]);
};
Matrix.CreateScale = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 1;
    if (y == null) y = 1;
    var ix = x === 0 ? 0 : 1 / x;
    var iy = y === 0 ? 0 : 1 / y;
    return new Matrix([x, 0, 0, 0, y, 0], [ix, 0, 0, 0, iy, 0]);
};
Matrix.CreateRotate = function (angleRad) {
    /// <returns type="Matrix" />
    if (angleRad == null)
        return new Matrix();
    var c = Math.cos(angleRad);
    var s = Math.sin(angleRad);
    var mt = new Matrix([c, -s, 0, s, c, 0]);
    mt._Angle = angleRad;
    return mt;
};
Matrix.CreateShear = function (x, y) {
    /// <returns type="Matrix" />
    if (x == null) x = 0;
    if (y == null) y = 0;
    return new Matrix([1, x, 0, y, 1, 0], [1, -x, 0, -y, 1, 0]);
};

//#endregion

Nullstone.FinishCreate(Matrix);
//#endregion