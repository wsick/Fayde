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
        var ControlNode = (function (_super) {
            __extends(ControlNode, _super);
            function ControlNode(xobj) {
                        _super.call(this, xobj);
            }
            ControlNode.prototype.TabTo = function () {
                var xobj = this.XObject;
                return xobj.IsEnabled && xobj.IsTabStop && xobj.Focus();
            };
            return ControlNode;
        })(Fayde.FENode);
        Controls.ControlNode = ControlNode;        
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                _super.apply(this, arguments);

            }
            Control.prototype.CreateStore = function () {
                return new Fayde.Providers.ControlProviderStore(this);
            };
            Control.prototype.CreateNode = function () {
                return new ControlNode(this);
            };
            Control.prototype.Focus = function () {
                return App.Instance.MainSurface.Focus(this);
            };
            Control.prototype.GetDefaultStyle = function () {
                return undefined;
            };
            return Control;
        })(Fayde.FrameworkElement);
        Controls.Control = Control;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Control.js.map
