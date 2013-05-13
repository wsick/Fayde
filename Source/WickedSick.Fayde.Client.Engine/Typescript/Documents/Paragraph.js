var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Block.ts" />
    /// CODE
    (function (Documents) {
        var Paragraph = (function (_super) {
            __extends(Paragraph, _super);
            function Paragraph() {
                        _super.call(this);
                var coll = new Documents.InlineCollection();
                coll.Listen(this);
                Object.defineProperty(this, "Inlines", {
                    value: coll,
                    writable: false
                });
            }
            Paragraph.prototype.CreateNode = function () {
                return new Documents.TextElementNode(this, "Inlines");
            };
            Paragraph.Annotations = {
                ContentProperty: "Inlines"
            };
            Paragraph.prototype.InlinesChanged = function (newInline, isAdd) {
                if(isAdd) {
                    this._Store.PropagateInheritedOnAdd(newInline.XamlNode);
                }
            };
            return Paragraph;
        })(Documents.Block);
        Documents.Paragraph = Paragraph;        
        Nullstone.RegisterType(Paragraph, "Paragraph");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Paragraph.js.map
