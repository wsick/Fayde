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
                _super.apply(this, arguments);

            }
            Paragraph.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Paragraph.InlinesProperty;
                return tenode;
            };
            return Paragraph;
        })(Documents.Block);
        Documents.Paragraph = Paragraph;        
        Nullstone.RegisterType(Paragraph, "Paragraph");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Paragraph.js.map
