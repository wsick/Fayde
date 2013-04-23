var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    (function (Media) {
        var Projection = (function (_super) {
            __extends(Projection, _super);
            function Projection() {
                _super.apply(this, arguments);

            }
            return Projection;
        })(Fayde.DependencyObject);
        Media.Projection = Projection;        
        Nullstone.RegisterType(Projection, "Projection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Projection.js.map
