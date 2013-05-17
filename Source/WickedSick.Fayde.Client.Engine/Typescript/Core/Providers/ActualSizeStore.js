var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="PropertyStore.ts" />
    /// CODE
    (function (Providers) {
        var ActualSizeStore = (function (_super) {
            __extends(ActualSizeStore, _super);
            function ActualSizeStore() {
                _super.apply(this, arguments);

            }
            ActualSizeStore.prototype.GetValue = function (storage) {
                return storage.Local;
            };
            ActualSizeStore.prototype.GetValuePrecedence = function (storage) {
                return Providers.PropertyPrecedence.LocalValue;
            };
            ActualSizeStore.prototype.SetLocalValue = function (storage, newValue) {
                var oldValue = storage.Local;
                storage.Local = newValue;
                if(oldValue === newValue) {
                    return;
                }
                this.OnPropertyChanged(storage, Providers.PropertyPrecedence.LocalValue, oldValue, newValue);
            };
            ActualSizeStore.prototype.SetLocalStyleValue = function (storage, newValue) {
            };
            ActualSizeStore.prototype.SetImplicitStyle = function (storage, newValue) {
            };
            ActualSizeStore.prototype.ClearValue = function (storage, notifyListeners) {
            };
            return ActualSizeStore;
        })(Providers.PropertyStore);
        Providers.ActualSizeStore = ActualSizeStore;        
        ActualSizeStore.Instance = new ActualSizeStore();
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ActualSizeStore.js.map
