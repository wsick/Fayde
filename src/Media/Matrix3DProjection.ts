/// <reference path="Projection.ts" />

module Fayde.Media {
    export class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty = DependencyProperty.Register("ProjectionMatrix", () => Matrix3D, Matrix3DProjection, undefined, (d, args) => (<Projection>d)._InvalidateProjection());
        ProjectionMatrix: Matrix3D;

        CreateProjectionMatrix(): Matrix3D { return this.ProjectionMatrix; }
    }
    Fayde.RegisterType(Matrix3DProjection, "Fayde.Media", Fayde.XMLNS);
}