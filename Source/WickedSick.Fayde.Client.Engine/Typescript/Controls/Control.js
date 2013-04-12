var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/Providers/ControlProviderStore.ts" />
    (function (Controls) {
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                _super.apply(this, arguments);

            }
            Control.prototype.CreateStore = function () {
                return new Fayde.Providers.ControlProviderStore(this);
            };
            return Control;
        })(Fayde.FrameworkElement);
        Controls.Control = Control;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Control.js.map
