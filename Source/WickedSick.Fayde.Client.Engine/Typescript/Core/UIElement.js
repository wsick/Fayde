var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="VisualTreeWalker.ts" />
var Fayde;
(function (Fayde) {
    var UINode = (function (_super) {
        __extends(UINode, _super);
        function UINode() {
            _super.apply(this, arguments);

        }
        UINode.prototype.GetInheritedWalker = function () {
            return Fayde.VisualTreeWalker.Logical(this);
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
