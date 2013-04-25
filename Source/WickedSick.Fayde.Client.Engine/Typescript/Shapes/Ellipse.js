var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Shape.ts" />
    /// CODE
    (function (Shapes) {
        var Ellipse = (function (_super) {
            __extends(Ellipse, _super);
            function Ellipse() {
                _super.apply(this, arguments);

            }
            return Ellipse;
        })(Shapes.Shape);
        Shapes.Ellipse = Ellipse;        
        Nullstone.RegisterType(Ellipse, "Ellipse");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Ellipse.js.map
