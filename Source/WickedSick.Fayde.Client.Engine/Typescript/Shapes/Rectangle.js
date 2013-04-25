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
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle() {
                _super.apply(this, arguments);

            }
            return Rectangle;
        })(Shapes.Shape);
        Shapes.Rectangle = Rectangle;        
        Nullstone.RegisterType(Rectangle, "Rectangle");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Rectangle.js.map
