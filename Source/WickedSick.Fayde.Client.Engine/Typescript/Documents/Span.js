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
                        _super.call(this);
                var coll = new Documents.InlineCollection();
                coll.AttachTo(this);
                coll.Listen(this);
                Object.defineProperty(this, "Inlines", {
                    value: coll,
                    writable: false
                });
            }
            Span.prototype.CreateNode = function () {
                return new Documents.TextElementNode(this, "Inlines");
            };
            Span.Annotations = {
                ContentProperty: "Inlines"
            };
            Span.prototype.InlinesChanged = function (newInline, isAdd) {
                if(isAdd) {
                    this._Store.PropagateInheritedOnAdd(newInline.XamlNode);
                }
            };
            Span.prototype._SerializeText = function () {
                var str = "";
                var enumerator = this.Inlines.GetEnumerator();
                while(enumerator.MoveNext()) {
                    str += (enumerator.Current)._SerializeText();
                }
                return str;
            };
            return Span;
        })(Documents.Inline);
        Documents.Span = Span;        
        Nullstone.RegisterType(Span, "Span");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Span.js.map
