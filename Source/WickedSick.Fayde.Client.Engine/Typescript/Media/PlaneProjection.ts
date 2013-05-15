/// <reference path="Projection.ts" />
/// CODE
/// <reference path="Matrix3D.ts" />

module Fayde.Media {
    var FIELD_OF_VIEW = 57.0 / 180 * Math.PI;
    var CAMERA_DIST = 999.0;
    var NEAR_VAL = 1.0;
    var FAR_VAL = 65536.0;
    var XY_PLANE_Z = (NEAR_VAL * FAR_VAL / (NEAR_VAL - FAR_VAL) * (1.0 - CAMERA_DIST)) / CAMERA_DIST;
    var PI_OVER_180 = Math.PI / 180.0;

    export class PlaneProjection extends Projection {
        static CenterOfRotationXProperty: DependencyProperty = DependencyProperty.Register("CenterOfRotationX", () => Number, PlaneProjection, 0.5, (d, args) => (<Projection>d)._InvalidateProjection());
        static CenterOfRotationYProperty: DependencyProperty = DependencyProperty.Register("CenterOfRotationY", () => Number, PlaneProjection, 0.5, (d, args) => (<Projection>d)._InvalidateProjection());
        static CenterOfRotationZProperty: DependencyProperty = DependencyProperty.Register("CenterOfRotationZ", () => Number, PlaneProjection, 0.5, (d, args) => (<Projection>d)._InvalidateProjection());

        static GlobalOffsetXProperty: DependencyProperty = DependencyProperty.Register("GlobalOffsetX", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static GlobalOffsetYProperty: DependencyProperty = DependencyProperty.Register("GlobalOffsetY", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static GlobalOffsetZProperty: DependencyProperty = DependencyProperty.Register("GlobalOffsetZ", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());

        static LocalOffsetXProperty: DependencyProperty = DependencyProperty.Register("LocalOffsetX", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static LocalOffsetYProperty: DependencyProperty = DependencyProperty.Register("LocalOffsetY", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static LocalOffsetZProperty: DependencyProperty = DependencyProperty.Register("LocalOffsetZ", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());

        static RotationXProperty: DependencyProperty = DependencyProperty.Register("RotationX", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static RotationYProperty: DependencyProperty = DependencyProperty.Register("RotationY", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());
        static RotationZProperty: DependencyProperty = DependencyProperty.Register("RotationZ", () => Number, PlaneProjection, 0.0, (d, args) => (<Projection>d)._InvalidateProjection());

        CenterOfRotationX: number;
        CenterOfRotationY: number;
        CenterOfRotationZ: number;

        GlobalOffsetX: number;
        GlobalOffsetY: number;
        GlobalOffsetZ: number;

        LocalOffsetX: number;
        LocalOffsetY: number;
        LocalOffsetZ: number;

        RotationX: number;
        RotationY: number;
        RotationZ: number;

        private _ObjectWidth; //Defined in Projection
        private _ObjectHeight; //Defined in Projection
        GetDistanceFromXYPlane(): number {
            var w = Math.max(this._ObjectWidth, 1.0);
            var h = Math.max(this._ObjectHeight, 1.0);
            var p = [w / 2.0, h / 2.0, 0.0, 1.0];

            var m = this.GetTransform();
            mat4.transformVec4(m, p, p);

            if (p[3] === 0.0)
                return NaN;
            return XY_PLANE_Z - (p[2] / p[3]);
        }

        CreateProjectionMatrix3D(): Matrix3D {
            var rotationX = this.RotationX;
            var rotationY = this.RotationY;
            var rotationZ = this.RotationZ;
            var radiansX = (rotationX || 0.0) * PI_OVER_180;
            var radiansY = (rotationY || 0.0) * PI_OVER_180;
            var radiansZ = (rotationZ || 0.0) * PI_OVER_180;
            var globalOffsetX = this.GlobalOffsetX;
            var globalOffsetY = this.GlobalOffsetY;
            var globalOffsetZ = this.GlobalOffsetZ;
            var globalX = globalOffsetX || 0.0;
            var globalY = globalOffsetY || 0.0;
            var globalZ = globalOffsetZ || 0.0;
            var localOffsetX = this.LocalOffsetX
            var localOffsetY = this.LocalOffsetY
            var localOffsetZ = this.LocalOffsetZ;
            var localX = localOffsetX || 0.0;
            var localY = localOffsetY || 0.0;
            var localZ = localOffsetZ || 0.0;

            var ow = this._ObjectWidth;
            var oh = this._ObjectHeight;

            var m = mat4.identity();
            
            mat4.translate(mat4.identity(), ow * -this.CenterOfRotationX, oh * -this.CenterOfRotationY, -this.CenterOfRotationZ);
            
            mat4.scale(m, 1.0, -1.0, 1.0);
            
            mat4.translate(m, localX, -localY, localZ);
            
            if (radiansX !== 0) {
                var rotX = mat4.createRotateX(radiansX);
                mat4.multiply(m, rotX, m);
            }
            
            if (radiansY !== 0) {
                var rotY = mat4.createRotateY(-radiansY);
                mat4.multiply(m, rotY, m);
            }
            
            if (radiansZ !== 0) {
                var rotZ = mat4.createRotateZ(radiansZ);
                mat4.multiply(m, rotZ, m);
            }
            
            mat4.translate(m, ow * (this.CenterOfRotationX - 0.5) + globalX, -oh * (this.CenterOfRotationY - 0.5) - globalY, this.CenterOfRotationZ - CAMERA_DIST + globalZ);
            
            var perspective = mat4.createPerspective(FIELD_OF_VIEW, ow / oh, NEAR_VAL, FAR_VAL);
            mat4.multiply(m, perspective, m);
            
            var height = 2.0 * CAMERA_DIST * Math.tan(FIELD_OF_VIEW / 2.0);
            var scale = height / oh;
            mat4.scale(m, scale, scale, 1.0);

            var viewport = mat4.createViewport(ow, oh);
            mat4.multiply(m, viewport, m);

            var r = new Matrix3D();
            r._Raw = m;
            return r;
        }
    }
    Nullstone.RegisterType(PlaneProjection, "PlaneProjection");
}