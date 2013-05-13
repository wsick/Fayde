var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextElement.ts"/>
    /// CODE
    /// <reference path="Block.ts"/>
    (function (Documents) {
        var Section = (function (_super) {
            __extends(Section, _super);
            function Section() {
                        _super.call(this);
                var coll = new Documents.BlockCollection();
                coll.Listen(this);
                Object.defineProperty(this, "Blocks", {
                    value: coll,
                    writable: false
                });
            }
            Section.prototype.CreateNode = function () {
                return new Documents.TextElementNode(this, "Blocks");
            };
            Section.Annotations = {
                ContentProperty: "Blocks"
            };
            Section.prototype.BlocksChanged = function (newBlock, isAdd) {
                if(isAdd) {
                    this._Store.PropagateInheritedOnAdd(newBlock.XamlNode);
                }
            };
            return Section;
        })(Documents.TextElement);
        Documents.Section = Section;        
        Nullstone.RegisterType(Section, "Section");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Section.js.map
