var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Runtime/MulticastEvent.ts" />
/// CODE
/// <reference path="RoutedEventArgs.ts" />
var Fayde;
(function (Fayde) {
    var RoutedEvent = (function (_super) {
        __extends(RoutedEvent, _super);
        function RoutedEvent() {
            _super.apply(this, arguments);

        }
        return RoutedEvent;
    })(MulticastEvent);
    Fayde.RoutedEvent = RoutedEvent;    
    Nullstone.RegisterType(RoutedEvent, "RoutedEvent");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RoutedEvent.js.map
