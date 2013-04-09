var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../../Javascript/Primitives.ts" />
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode) {
            subtreeNode.AttachTo(this);
            this.SubtreeNode = subtreeNode;
        };
        FENode.prototype.GetVisualTreeEnumerator = function (direction) {
            if(this.SubtreeNode) {
                if(this.SubtreeNode instanceof Fayde.InternalCollection) {
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                }
                return Fayde.ArrayEx.GetEnumerator([
                    this.SubtreeNode
                ]);
            }
        };
        return FENode;
    })(Fayde.UINode);
    Fayde.FENode = FENode;    
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
            _super.apply(this, arguments);

        }
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.prototype._ComputeActualSize = function () {
            return new size();
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
