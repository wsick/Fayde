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
        var Span = (function (_super) {
            __extends(Span, _super);
            function Span() {
                _super.apply(this, arguments);

            }
            Span.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Span.InlinesProperty;
                return tenode;
            };
            return Span;
        })(Documents.Inline);
        Documents.Span = Span;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Span.js.map
