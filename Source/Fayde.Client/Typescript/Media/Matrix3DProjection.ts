/// <reference path="Projection.ts" />
/// CODE
/// <reference path="Matrix3D.ts" />

module Fayde.Media {
    export class Matrix3DProjection extends Projection {
        static ProjectionMatrixProperty: DependencyProperty = DependencyProperty.Register("ProjectionMatrix", () => Matrix3D, Matrix3DProjection, undefined, (d, args) => (<Projection>d)._InvalidateProjection());
        ProjectionMatrix: Matrix3D;

        CreateProjectionMatrix(): Matrix3D { return this.ProjectionMatrix; }
    }
    Fayde.RegisterType(Matrix3DProjection, {
    	Name: "Matrix3DProjection",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}