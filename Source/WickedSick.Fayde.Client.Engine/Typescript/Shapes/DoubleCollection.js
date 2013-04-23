var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    (function (Shapes) {
        var DoubleCollection = (function (_super) {
            __extends(DoubleCollection, _super);
            function DoubleCollection() {
                _super.apply(this, arguments);

            }
            return DoubleCollection;
        })(Fayde.XamlObjectCollection);
        Shapes.DoubleCollection = DoubleCollection;        
        Nullstone.RegisterType(DoubleCollection, "DoubleCollection");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DoubleCollection.js.map
