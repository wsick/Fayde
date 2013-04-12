var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Walkers.ts" />
/// <reference path="Providers/InheritedProviderStore.ts"/>
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
        UINode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
            //Update total render visibility
            if(!newIsAttached) {
                //cache invalidate hint
                //Remove dirty element from surface
                //If surface focused element === this --> focus element to null on surface
                            }
        };
        UINode.prototype._ElementAdded = function (uie) {
            uie.XamlNode.VisualParentNode = this;
            //Update uie Total Render+HitTest Visibility
            //Invalidate uie
            //Propagate inherited props on adding to tree
            //set loaded to this.IsLoaded
            //Update this Bounds(true)
            //Invalidate this measure
            //LayoutInformation.SetLayoutClip(this, undefined)
            //Clear PreviousConstraint
            //Clear uie render size
            //Update uie transform
            //Update uie projection
            //Invalidate uie measure
            //Invalidate uie arrange
            //if uie has dirtysizehint or uie LastRenderSize !== undefined --> uie.propagateflagup dirtysizeup
                    };
        UINode.prototype._ElementRemoved = function (uie) {
            //this.Invalidate uie subtree bounds
            uie.XamlNode.VisualParentNode = null;
            //set loaded to false
            //LayoutInformation.SetLayoutSlot(uie, emptySlot);
            //LayoutInformation.SetLayoutClip(uie, undefined);
            //Invalidate this measure
            //Clear inherited properties on removing from tree
                    };
        return UINode;
    })(Fayde.XamlNode);
    Fayde.UINode = UINode;    
    var UIElement = (function (_super) {
        __extends(UIElement, _super);
        function UIElement() {
            _super.apply(this, arguments);

        }
        UIElement.prototype.CreateStore = function () {
            return new Fayde.Providers.InheritedProviderStore(this);
        };
        UIElement.prototype.CreateNode = function () {
            return new UINode(this);
        };
        return UIElement;
    })(Fayde.DependencyObject);
    Fayde.UIElement = UIElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UIElement.js.map
