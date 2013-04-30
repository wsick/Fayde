var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="UserControl.ts" />
    /// CODE
    (function (Controls) {
        var Page = (function (_super) {
            __extends(Page, _super);
            function Page() {
                _super.apply(this, arguments);

            }
            Page.TitleProperty = DependencyProperty.Register("Title", function () {
                return String;
            }, Page);
            return Page;
        })(Controls.UserControl);
        Controls.Page = Page;        
        Nullstone.RegisterType(Page, "Page");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Page.js.map
