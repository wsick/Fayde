var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    (function (Controls) {
        var Border = (function (_super) {
            __extends(Border, _super);
            function Border() {
                _super.apply(this, arguments);

            }
            Border.prototype.CreateNode = function () {
                var n = _super.prototype.CreateNode.call(this);
                n.LayoutUpdater.SetContainerMode(true);
                return n;
            };
            return Border;
        })(Fayde.FrameworkElement);
        Controls.Border = Border;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Border.js.map
