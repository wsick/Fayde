var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Projection.ts" />
    /// CODE
    (function (Media) {
        var Matrix3DProjection = (function (_super) {
            __extends(Matrix3DProjection, _super);
            function Matrix3DProjection() {
                _super.apply(this, arguments);

            }
            return Matrix3DProjection;
        })(Media.Projection);
        Media.Matrix3DProjection = Matrix3DProjection;        
        Nullstone.RegisterType(Matrix3DProjection, "Matrix3DProjection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Matrix3DProjection.js.map
