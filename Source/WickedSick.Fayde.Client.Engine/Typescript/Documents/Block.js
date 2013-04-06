var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextElement.ts" />
    /// CODE
    (function (Documents) {
        var Block = (function (_super) {
            __extends(Block, _super);
            function Block() {
                _super.apply(this, arguments);

            }
            return Block;
        })(Documents.TextElement);
        Documents.Block = Block;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Block.js.map
