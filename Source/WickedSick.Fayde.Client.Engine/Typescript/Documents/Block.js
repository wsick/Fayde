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
        Nullstone.RegisterType(Block, "Block");
        var BlockCollection = (function (_super) {
            __extends(BlockCollection, _super);
            function BlockCollection() {
                _super.apply(this, arguments);

            }
            BlockCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            BlockCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            BlockCollection.prototype.AddedToCollection = function (value, error) {
                if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                    return false;
                }
                var listener = this._Listener;
                if(listener) {
                    listener.BlocksChanged(value, true);
                }
                return true;
            };
            BlockCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                var listener = this._Listener;
                if(listener) {
                    listener.BlocksChanged(value, false);
                }
            };
            return BlockCollection;
        })(Fayde.XamlObjectCollection);
        Documents.BlockCollection = BlockCollection;        
        Nullstone.RegisterType(BlockCollection, "BlockCollection");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Block.js.map
