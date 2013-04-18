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
        function DependencyObjectCollection(handleItemChanged) {
                _super.call(this);
            this._HandleItemChanged = handleItemChanged;
        }
        DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
            _super.prototype.AddedToCollection.call(this, value, error);
            if(this._HandleItemChanged) {
                value._Store._SubscribePropertyChanged(this);
            }
            return true;
        };
        DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
            if(this._HandleItemChanged) {
                value._Store._UnsubscribePropertyChanged(this);
            }
        };
        DependencyObjectCollection.prototype.OnPropertyChanged = function (sender, args) {
            this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
        };
        DependencyObjectCollection.prototype._RaiseItemChanged = function (item, propd, oldValue, newValue) {
        };
        return DependencyObjectCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.DependencyObjectCollection = DependencyObjectCollection;    
    Nullstone.RegisterType(DependencyObjectCollection, "DependencyObjectCollection");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObjectCollection.js.map
