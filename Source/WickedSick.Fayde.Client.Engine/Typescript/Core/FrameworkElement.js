var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../../Javascript/Primitives.ts" />
var Fayde;
(function (Fayde) {
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
            _super.apply(this, arguments);

        }
        FrameworkElement.prototype._ComputeActualSize = function () {
            return new size();
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
