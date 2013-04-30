var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextElement.ts" />
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts" />
    (function (Documents) {
        var Inline = (function (_super) {
            __extends(Inline, _super);
            function Inline() {
                _super.apply(this, arguments);

                this.Autogen = false;
            }
            return Inline;
        })(Documents.TextElement);
        Documents.Inline = Inline;        
        Nullstone.RegisterType(Inline, "Inline");
        var InlineCollection = (function (_super) {
            __extends(InlineCollection, _super);
            function InlineCollection() {
                _super.apply(this, arguments);

            }
            InlineCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            InlineCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            InlineCollection.prototype.AddedToCollection = function (value, error) {
                if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                    return false;
                }
                var listener = this._Listener;
                if(listener) {
                    listener.InlinesChanged(value, true);
                }
                return true;
            };
            InlineCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                var listener = this._Listener;
                if(listener) {
                    listener.InlinesChanged(value, false);
                }
            };
            return InlineCollection;
        })(Fayde.XamlObjectCollection);
        Documents.InlineCollection = InlineCollection;        
        Nullstone.RegisterType(InlineCollection, "InlineCollection");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Inline.js.map
