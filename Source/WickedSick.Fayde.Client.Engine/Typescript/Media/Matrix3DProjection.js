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
        var Matrix3DProjection = (function (_super) {
            __extends(Matrix3DProjection, _super);
            function Matrix3DProjection() {
                _super.apply(this, arguments);

            }
            Matrix3DProjection.ProjectionMatrixProperty = DependencyProperty.Register("ProjectionMatrix", function () {
                return Media.Matrix3D;
            }, Matrix3DProjection, undefined, function (d, args) {
                return (d)._InvalidateProjection();
            });
            Matrix3DProjection.prototype.CreateProjectionMatrix = function () {
                return this.ProjectionMatrix;
            };
            return Matrix3DProjection;
        })(Media.Projection);
        Media.Matrix3DProjection = Matrix3DProjection;        
        Nullstone.RegisterType(Matrix3DProjection, "Matrix3DProjection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Matrix3DProjection.js.map
