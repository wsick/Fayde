var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    (function (Controls) {
        var UserControl = (function (_super) {
            __extends(UserControl, _super);
            function UserControl() {
                _super.apply(this, arguments);

            }
            return UserControl;
        })(Controls.Control);
        Controls.UserControl = UserControl;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UserControl.js.map
