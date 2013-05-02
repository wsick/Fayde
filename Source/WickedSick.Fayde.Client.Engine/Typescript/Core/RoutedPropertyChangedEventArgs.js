var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="RoutedEventArgs.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var RoutedPropertyChangedEventArgs = (function (_super) {
        __extends(RoutedPropertyChangedEventArgs, _super);
        function RoutedPropertyChangedEventArgs(oldValue, newValue) {
                _super.call(this);
            this._OldValue = oldValue;
            this._NewValue = newValue;
        }
        Object.defineProperty(RoutedPropertyChangedEventArgs.prototype, "OldValue", {
            get: function () {
                return this._OldValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoutedPropertyChangedEventArgs.prototype, "NewValue", {
            get: function () {
                return this._NewValue;
            },
            enumerable: true,
            configurable: true
        });
        return RoutedPropertyChangedEventArgs;
    })(Fayde.RoutedEventArgs);
    Fayde.RoutedPropertyChangedEventArgs = RoutedPropertyChangedEventArgs;    
    Nullstone.RegisterType(RoutedPropertyChangedEventArgs, "RoutedPropertyChangedEventArgs");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RoutedPropertyChangedEventArgs.js.map
