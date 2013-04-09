var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts" />
    (function (Controls) {
        var TextBlockNode = (function (_super) {
            __extends(TextBlockNode, _super);
            function TextBlockNode() {
                _super.apply(this, arguments);

            }
            TextBlockNode.prototype.GetInheritedWalker = function () {
                var coll = (this.XObject).GetValue(TextBlock.InlinesProperty);
                if(coll) {
                    return (coll).GetEnumerator();
                }
            };
            return TextBlockNode;
        })(Fayde.UINode);
        Controls.TextBlockNode = TextBlockNode;        
        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock() {
                _super.apply(this, arguments);

            }
            TextBlock.prototype.CreateNode = function () {
                return new TextBlockNode(this);
            };
            return TextBlock;
        })(Fayde.FrameworkElement);
        Controls.TextBlock = TextBlock;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBlock.js.map
