/// <reference path="Projection.ts" />
/// CODE
/// <reference path="Matrix3D.ts" />

module Fayde.Media {
    export class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty = DependencyProperty.Register("ProjectionMatrix", () => Matrix3D, Matrix3DProjection, undefined, (d, args) => (<Projection>d)._InvalidateProjection());
        ProjectionMatrix: Matrix3D;

        CreateProjectionMatrix(): Matrix3D { return this.ProjectionMatrix; }
    }
    Nullstone.RegisterType(Matrix3DProjection, "Matrix3DProjection");
}