var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObjectCollection.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />
var Fayde;
(function (Fayde) {
    var DependencyObjectCollection = (function (_super) {
        __extends(DependencyObjectCollection, _super);
        function DependencyObjectCollection() {
            _super.apply(this, arguments);

        }
        DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
            _super.prototype.AddedToCollection.call(this, value, error);
            //TODO: On added, subscribe to item property changed
            return true;
        };
        DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
            //TODO: On removed, unsubscribe to item property changed
                    };
        DependencyObjectCollection.prototype._RaiseItemChanged = function (item, propd, oldValue, newValue) {
        };
        return DependencyObjectCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.DependencyObjectCollection = DependencyObjectCollection;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObjectCollection.js.map
