var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    (function (Controls) {
        var ContentPresenter = (function (_super) {
            __extends(ContentPresenter, _super);
            function ContentPresenter() {
                _super.apply(this, arguments);

            }
            return ContentPresenter;
        })(Fayde.FrameworkElement);
        Controls.ContentPresenter = ContentPresenter;        
        Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContentPresenter.js.map
