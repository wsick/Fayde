/// <reference path="Projection.js"/>
/// CODE

//#region Matrix3DProjection
var Matrix3DProjection = Nullstone.Create("Matrix3DProjection", Projection);

//#region Properties

Matrix3DProjection.ProjectionMatrixProperty = DependencyProperty.Register("ProjectionMatrix", function () { return Matrix3D; }, Matrix3DProjection);

Nullstone.AutoProperties(Matrix3DProjection, [
    Matrix3DProjection.ProjectionMatrixProperty
]);

//#endregion

Nullstone.FinishCreate(Matrix3DProjection);
//#endregion