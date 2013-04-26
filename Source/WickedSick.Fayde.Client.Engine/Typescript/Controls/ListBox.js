var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ItemsControl.ts" />
    /// CODE
    (function (Controls) {
        var ListBox = (function (_super) {
            __extends(ListBox, _super);
            function ListBox() {
                _super.apply(this, arguments);

            }
            return ListBox;
        })(Controls.ItemsControl);
        Controls.ListBox = ListBox;        
        Nullstone.RegisterType(ListBox, "ListBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ListBox.js.map
