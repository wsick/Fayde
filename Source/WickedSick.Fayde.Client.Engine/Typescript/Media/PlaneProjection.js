var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Projection.ts" />
    /// CODE
    /// <reference path="Matrix3D.ts" />
    (function (Media) {
        var FIELD_OF_VIEW = 57.0 / 180 * Math.PI;
        var CAMERA_DIST = 999.0;
        var NEAR_VAL = 1.0;
        var FAR_VAL = 65536.0;
        var XY_PLANE_Z = (NEAR_VAL * FAR_VAL / (NEAR_VAL - FAR_VAL) * (1.0 - CAMERA_DIST)) / CAMERA_DIST;
        var PI_OVER_180 = Math.PI / 180.0;
        var PlaneProjection = (function (_super) {
            __extends(PlaneProjection, _super);
            function PlaneProjection() {
                _super.apply(this, arguments);

            }
            PlaneProjection.CenterOfRotationXProperty = DependencyProperty.Register("CenterOfRotationX", function () {
                return Number;
            }, PlaneProjection, 0.5, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.CenterOfRotationYProperty = DependencyProperty.Register("CenterOfRotationY", function () {
                return Number;
            }, PlaneProjection, 0.5, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.CenterOfRotationZProperty = DependencyProperty.Register("CenterOfRotationZ", function () {
                return Number;
            }, PlaneProjection, 0.5, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.GlobalOffsetXProperty = DependencyProperty.Register("GlobalOffsetX", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.GlobalOffsetYProperty = DependencyProperty.Register("GlobalOffsetY", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.GlobalOffsetZProperty = DependencyProperty.Register("GlobalOffsetZ", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.LocalOffsetXProperty = DependencyProperty.Register("LocalOffsetX", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.LocalOffsetYProperty = DependencyProperty.Register("LocalOffsetY", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.LocalOffsetZProperty = DependencyProperty.Register("LocalOffsetZ", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.RotationXProperty = DependencyProperty.Register("RotationX", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.RotationYProperty = DependencyProperty.Register("RotationY", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.RotationZProperty = DependencyProperty.Register("RotationZ", function () {
                return Number;
            }, PlaneProjection, 0.0, function (d, args) {
                return (d)._InvalidateProjection();
            });
            PlaneProjection.prototype.GetDistanceFromXYPlane = //Defined in Projection
            function () {
                var w = Math.max(this._ObjectWidth, 1.0);
                var h = Math.max(this._ObjectHeight, 1.0);
                var p = [
                    w / 2.0, 
                    h / 2.0, 
                    0.0, 
                    1.0
                ];
                var m = this.GetTransform();
                mat4.transformVec4(m, p, p);
                if(p[3] === 0.0) {
                    return NaN;
                }
                return XY_PLANE_Z - (p[2] / p[3]);
            };
            PlaneProjection.prototype.CreateProjectionMatrix3D = function () {
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
                var localOffsetX = this.LocalOffsetX;
                var localOffsetY = this.LocalOffsetY;
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
                if(radiansX !== 0) {
                    var rotX = mat4.createRotateX(radiansX);
                    mat4.multiply(m, rotX, m);
                }
                if(radiansY !== 0) {
                    var rotY = mat4.createRotateY(-radiansY);
                    mat4.multiply(m, rotY, m);
                }
                if(radiansZ !== 0) {
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
                var r = new Media.Matrix3D();
                r._Raw = m;
                return r;
            };
            return PlaneProjection;
        })(Media.Projection);
        Media.PlaneProjection = PlaneProjection;        
        Nullstone.RegisterType(PlaneProjection, "PlaneProjection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PlaneProjection.js.map
