/// <reference path="../Javascript/Primitives/Matrix.js"/>
/// <reference path="../jsTestDriverAsserts.js"/>
/// <reference path="FaydeAsserts.js"/>

MatrixTest = TestCase("MatrixTests");

MatrixTest.prototype.testCreateTranslate = function () {
    var x = 100;
    var y = 200;
    var expected = new Matrix();
    expected._Elements = [1, 0, x, 0, 1, y];
    expected._Type = MatrixTypes.Translate;
    var actual = Matrix.CreateTranslate(x, y);
    assertMatrix(expected, actual);
};
MatrixTest.prototype.testCreateScale = function () {
    var x = 3;
    var y = 6;
    var expected = new Matrix();
    expected._Elements = [x, 0, 0, 0, y, 0];
    expected._Type = MatrixTypes.Scale;
    var actual = Matrix.CreateScale(x, y);
    assertMatrix(expected, actual);
};
MatrixTest.prototype.testCreateShear = function () {
    var x = 25;
    var y = 50;
    var expected = new Matrix();
    expected._Elements = [1, x, 0, y, 1, 0];
    expected._Type = MatrixTypes.Shear;
    var actual = Matrix.CreateShear(x, y);
    assertMatrix(expected, actual);
};
MatrixTest.prototype.testCreateRotate = function () {
    var angle = Math.PI / 4;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var expected = new Matrix();
    expected._Elements = [c, -s, 0, s, c, 0];
    expected._Type = MatrixTypes.Rotate;
    var actual = Matrix.CreateRotate(angle);
    assertMatrix(expected, actual);
};

MatrixTest.prototype.testMultiplyMatrix = function () {
    var expected = Matrix.Create([1.4142135623730951, -1.414213562373095, 50, 2.82842712474619, 2.8284271247461903, 100]);
    var actual = new Matrix();
    Matrix.Multiply(actual, Matrix.CreateScale(2, 4), Matrix.CreateRotate(Math.PI / 4));
    Matrix.Multiply(actual, Matrix.CreateTranslate(50, 100), actual);
    assertMatrix(expected, actual);
};
MatrixTest.prototype.testMultiplyPoint = function () {
    var final = new Matrix();
    Matrix.Multiply(final, Matrix.CreateScale(2, 4), Matrix.CreateRotate(Math.PI / 2));
    var p = new Point(1.0, 1.0);
    var pActual = new Point();
    Matrix.MultiplyPoint(pActual, final, p);
    var pExpected = new Point(-2.0, 4.0);
    assertNumberClose("Expected X value is incorrect.", pExpected.X, pActual.X);
    assertNumberClose("Expected Y value is incorrect.", pExpected.Y, pActual.Y);
};

MatrixTest.prototype.testCopy = function () {
    var m = Matrix.CreateScale(2, 4);
    var copy = m.Copy();
    assertMatrix(m, copy);
};