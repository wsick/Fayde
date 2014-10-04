/// <reference path="../Core/DependencyObject.ts" />

module Fayde.Media {
    export class Projection extends DependencyObject implements minerva.IProjection {
        private _ProjectionMatrix: Matrix3D = null;

        getDistanceFromXYPlane (objectWidth: number, objectHeight: number): number {
            return NaN;
        }

        getTransform (): number[] {
            var m3 = this._ProjectionMatrix;
            if (!m3)
                m3 = this._ProjectionMatrix = this.CreateProjectionMatrix();
            if (m3)
                return mat4.clone(m3._Raw);
            return mat4.identity();
        }

        CreateProjectionMatrix (): Matrix3D {
            return null;
        }

        _InvalidateProjection () {
            this._ProjectionMatrix = null;
            Incite(this);
        }
    }
    Fayde.RegisterType(Projection, "Fayde.Media", Fayde.XMLNS);
}