var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Walkers.ts" />
var Fayde;
(function (Fayde) {
    var UINode = (function (_super) {
        __extends(UINode, _super);
        function UINode(xobj) {
                _super.call(this, xobj);
        }
        UINode.prototype.GetInheritedEnumerator = function () {
            return this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
        };
        UINode.prototype._ElementAdded = function (uie) {
        };
        UINode.prototype._ElementRemoved = function (uie) {
        };
        return UINode;
    })(Fayde.XamlNode);
    Fayde.UINode = UINode;    
    var UIElement = (function (_super) {
        __extends(UIElement, _super);
        function UIElement() {
            _super.apply(this, arguments);

        }
        UIElement.prototype.CreateNode = function () {
            return new UINode(this);
        };
        return UIElement;
    })(Fayde.DependencyObject);
    Fayde.UIElement = UIElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UIElement.js.map
