var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Inline.ts" />
    /// CODE
    (function (Documents) {
        var LineBreak = (function (_super) {
            __extends(LineBreak, _super);
            function LineBreak() {
                _super.apply(this, arguments);

            }
            return LineBreak;
        })(Documents.Inline);
        Documents.LineBreak = LineBreak;        
        Nullstone.RegisterType(LineBreak, "LineBreak");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LineBreak.js.map
