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
            Object.defineProperty(this, "OldValue", {
                value: oldValue,
                writable: false
            });
            Object.defineProperty(this, "NewValue", {
                value: newValue,
                writable: false
            });
        }
        return RoutedPropertyChangedEventArgs;
    })(Fayde.RoutedEventArgs);
    Fayde.RoutedPropertyChangedEventArgs = RoutedPropertyChangedEventArgs;    
    Nullstone.RegisterType(RoutedPropertyChangedEventArgs, "RoutedPropertyChangedEventArgs");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RoutedPropertyChangedEventArgs.js.map
