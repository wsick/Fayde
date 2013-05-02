var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Runtime/EventArgs.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />
var Fayde;
(function (Fayde) {
    var PropertyChangedEventArgs = (function (_super) {
        __extends(PropertyChangedEventArgs, _super);
        function PropertyChangedEventArgs(propertyName) {
                _super.call(this);
            this._PropertyName = propertyName;
        }
        Object.defineProperty(PropertyChangedEventArgs.prototype, "PropertyName", {
            get: function () {
                return this._PropertyName;
            },
            enumerable: true,
            configurable: true
        });
        return PropertyChangedEventArgs;
    })(EventArgs);
    Fayde.PropertyChangedEventArgs = PropertyChangedEventArgs;    
    Nullstone.RegisterType(PropertyChangedEventArgs, "PropertyChangedEventArgs");
    Fayde.INotifyPropertyChanged_ = Nullstone.RegisterInterface("INotifyPropertyChanged");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=INotifyPropertyChanged.js.map
