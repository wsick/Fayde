/// <reference path="Projection.js"/>
/// CODE

(function (namespace) {
    var Matrix3DProjection = Nullstone.Create("Matrix3DProjection", namespace.Projection);

    //#region Properties

    Matrix3DProjection.ProjectionMatrixProperty = DependencyProperty.Register("ProjectionMatrix", function () { return Matrix3D; }, Matrix3DProjection);

    Nullstone.AutoProperties(Matrix3DProjection, [
        Matrix3DProjection.ProjectionMatrixProperty
    ]);

    //#endregion

    namespace.Matrix3DProjection = Nullstone.FinishCreate(Matrix3DProjection);
})(Nullstone.Namespace("Fayde.Media"));