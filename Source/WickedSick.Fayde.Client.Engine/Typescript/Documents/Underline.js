var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Span.ts" />
    /// CODE
    (function (Documents) {
        var Underline = (function (_super) {
            __extends(Underline, _super);
            function Underline() {
                _super.apply(this, arguments);

            }
            return Underline;
        })(Documents.Span);
        Documents.Underline = Underline;        
        Nullstone.RegisterType(Underline, "Underline");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Underline.js.map
