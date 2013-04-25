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
        var PointCollection = (function (_super) {
            __extends(PointCollection, _super);
            function PointCollection() {
                _super.apply(this, arguments);

            }
            PointCollection.prototype._RaiseItemAdded = function (value, index) {
                var shapeNode = this.XamlNode.ParentNode;
                shapeNode.XObject._InvalidateNaturalBounds();
            };
            PointCollection.prototype._RaiseItemRemoved = function (value, index) {
                var shapeNode = this.XamlNode.ParentNode;
                shapeNode.XObject._InvalidateNaturalBounds();
            };
            PointCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                var shapeNode = this.XamlNode.ParentNode;
                shapeNode.XObject._InvalidateNaturalBounds();
            };
            PointCollection.prototype._RaiseCleared = function () {
                var shapeNode = this.XamlNode.ParentNode;
                shapeNode.XObject._InvalidateNaturalBounds();
            };
            return PointCollection;
        })(Fayde.XamlObjectCollection);
        Shapes.PointCollection = PointCollection;        
        Nullstone.RegisterType(PointCollection, "PointCollection");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PointCollection.js.map
