/// <reference path="../gl-matrix-min.js"/>
mat3.toAffineMat4 = function (mat, dest) {
    if (!dest) { dest = mat4.create(); }
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = 0;
    dest[3] = mat[2];
    dest[4] = mat[3];
    dest[5] = mat[4];
    dest[6] = 0;
    dest[7] = mat[5];
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = 1;
    dest[11] = 0;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;
    return dest;
};

mat3.createTranslate = function (x, y, dest) {
    if (!dest) { dest = mat3.create(); }
    dest[0] = 1;
    dest[1] = 0;
    dest[2] = x;
    dest[3] = 0;
    dest[4] = 1;
    dest[5] = y;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 1;
    return dest;
};
mat3.translate = function (mat, x, y) {
    mat[2] += x;
    mat[5] += y;
};
mat3.createScale = function (x, y, dest) {
    if (!dest) { dest = mat3.create(); }
    dest[0] = x;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = y;
    dest[5] = 0;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 1;
    return dest;
};
mat3.scale = function (mat, x, y) {
    mat[0] *= x;
    mat[1] *= x;
    mat[2] *= x;

    mat[3] *= y;
    mat[4] *= y;
    mat[5] *= y;
};
mat3.createSkew = function (angleRadX, angleRadY, dest) {
    if (!dest) { dest = mat3.create(); }
    dest[0] = 1;
    dest[1] = Math.tan(angleRadY);
    dest[2] = 0;
    dest[3] = Math.tan(angleRadX);
    dest[4] = 1;
    dest[5] = 0;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 1;
    return dest;
};
mat3.createRotate = function (angleRad, dest) {
    if (!dest) { dest = mat3.create(); }
    var c = Math.cos(angleRad);
    var s = Math.sin(angleRad);
    dest[0] = c;
    dest[1] = -s;
    dest[2] = 0;
    dest[3] = s;
    dest[4] = c;
    dest[5] = 0;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 1;
    return dest;
};

mat3.transformVec2 = function (mat, vec, dest) {
    if (!dest) dest = vec;
    var x = vec[0], y = vec[1];
    dest[0] = x * mat[0] + y * mat[3] + mat[2];
    dest[1] = x * mat[1] + y * mat[4] + mat[5];
    return dest;
};

mat4.toAffineMat3 = function (mat, dest) {
    if (!dest) { dest = mat3.create(); }

    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[3];
    dest[3] = mat[4];
    dest[4] = mat[5];
    dest[5] = mat[7];

    return dest;
};
mat4.transformVec4 = function (mat, vec, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
    dest[0] = mat[0] * x + mat[1] * y + mat[2] * z + mat[3] * w;
    dest[1] = mat[4] * x + mat[5] * y + mat[6] * z + mat[7] * w;
    dest[2] = mat[8] * x + mat[9] * y + mat[10] * z + mat[11] * w;
    dest[3] = mat[12] * x + mat[13] * y + mat[14] * z + mat[15] * w;

    return dest;
};