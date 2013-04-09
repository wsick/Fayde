var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="InternalCollection.ts" />
    /// CODE
    /// <reference path="DependencyObject.ts" />
    (function (Core) {
        var DependencyObjectCollection = (function (_super) {
            __extends(DependencyObjectCollection, _super);
            function DependencyObjectCollection() {
                _super.apply(this, arguments);

            }
            DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
                //TODO: On added, subscribe to item property changed
                return true;
            };
            DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                //TODO: On removed, unsubscribe to item property changed
                            };
            DependencyObjectCollection.prototype._RaiseItemChanged = function (item, propd, oldValue, newValue) {
            };
            return DependencyObjectCollection;
        })(Fayde.InternalCollection);
        Core.DependencyObjectCollection = DependencyObjectCollection;        
    })(Fayde.Core || (Fayde.Core = {}));
    var Core = Fayde.Core;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObjectCollection.js.map
