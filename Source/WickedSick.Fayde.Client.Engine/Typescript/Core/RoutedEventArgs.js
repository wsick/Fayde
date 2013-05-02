var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Runtime/EventArgs.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var RoutedEventArgs = (function (_super) {
        __extends(RoutedEventArgs, _super);
        function RoutedEventArgs() {
            _super.apply(this, arguments);

            this.Handled = false;
            this.Source = null;
            this.OriginalSource = null;
        }
        return RoutedEventArgs;
    })(EventArgs);
    Fayde.RoutedEventArgs = RoutedEventArgs;    
    Nullstone.RegisterType(RoutedEventArgs, "RoutedEventArgs");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RoutedEventArgs.js.map
