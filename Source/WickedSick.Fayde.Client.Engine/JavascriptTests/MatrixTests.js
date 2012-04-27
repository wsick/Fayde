/// <reference path="../Javascript/Primitives/Matrix.js"/>
/// <reference path="../jsTestDriverAsserts.js"/>
/// <reference path="FaydeAsserts.js"/>

MatrixTests = TestCase("MatrixTests");

MatrixTests.prototype.TestCreateTranslate = function () {
    var x = 100;
    var y = 200;
    var expected = new Matrix();
    expected._Elements = [1, 0, x, 0, 1, y];
    expected._Type = MatrixTypes.Translate;
    var actual = Matrix.CreateTranslate(x, y);
    assertMatrix(expected, actual);
};
MatrixTests.prototype.TestCreateScale = function () {
    var x = 3;
    var y = 6;
    var expected = new Matrix();
    expected._Elements = [x, 0, 0, 0, y, 0];
    expected._Type = MatrixTypes.Scale;
    var actual = Matrix.CreateScale(x, y);
    assertMatrix(expected, actual);
};
MatrixTests.prototype.TestCreateShear = function () {
    var x = 25;
    var y = 50;
    var expected = new Matrix();
    expected._Elements = [1, x, 0, y, 1, 0];
    expected._Type = MatrixTypes.Shear;
    var actual = Matrix.CreateShear(x, y);
    assertMatrix(expected, actual);
};
MatrixTests.prototype.TestCreateRotate = function () {
    var angle = Math.PI / 4;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var expected = new Matrix();
    expected._Elements = [c, -s, 0, s, c, 0];
    expected._Type = MatrixTypes.Unknown;
    var actual = Matrix.CreateRotate(angle);
    assertMatrix(expected, actual);
};

MatrixTests.prototype.TestMultiplyMatrix = function () {
};
MatrixTests.prototype.TestMultiplyPoint = function () {
    var final = Matrix.CreateScale(2, 4).MultiplyMatrix(Matrix.CreateRotate(Math.PI / 2));
    var p = new Point(1.0, 1.0);
    var pActual = final.MultiplyPoint(p);
    var pExpected = new Point(-2.0, 4.0);
    assertSame("Expected X value is incorrect.", pExpected.X, pActual.X);
    assertSame("Expected Y value is incorrect.", pExpected.Y, pActual.Y);
};

MatrixTests.prototype.TestCopy = function () {
    var m = Matrix.CreateScale(2, 4);
    var copy = m.Copy();
    assertNullstoneNotRefEquals("Copy should not be the same Nullstone.", m, copy);
    assertMatrix(m, copy);
};