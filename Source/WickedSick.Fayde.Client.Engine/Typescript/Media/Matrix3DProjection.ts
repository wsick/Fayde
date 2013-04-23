/// <reference path="Projection.ts" />
/// CODE

module Fayde.Media {
    export class Matrix3DProjection extends Projection {
        //static ProjectionMatrixProperty: DependencyProperty = DependencyProperty.Register("ProjectionMatrix", () => Matrix3D, Matrix3DProjection);
        //ProjectionMatrix: Matrix3D;
    }
    Nullstone.RegisterType(Matrix3DProjection, "Matrix3DProjection");
}