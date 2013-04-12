var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts"/>
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts"/>
    /// <reference path="../Core/Providers/InheritedProviderStore.ts"/>
    (function (Documents) {
        var TextElementNode = (function (_super) {
            __extends(TextElementNode, _super);
            function TextElementNode() {
                _super.apply(this, arguments);

            }
            TextElementNode.prototype.GetInheritedEnumerator = function () {
                var coll = this.XObject.GetValue(this.InheritedWalkProperty);
                if(coll) {
                    return (coll).GetEnumerator();
                }
            };
            return TextElementNode;
        })(Fayde.XamlNode);
        Documents.TextElementNode = TextElementNode;        
        var TextElement = (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                _super.apply(this, arguments);

            }
            TextElement.prototype.CreateStore = function () {
                return new Fayde.Providers.InheritedProviderStore(this);
            };
            TextElement.prototype.CreateNode = function () {
                return new TextElementNode(this);
            };
            return TextElement;
        })(Fayde.DependencyObject);
        Documents.TextElement = TextElement;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextElement.js.map
