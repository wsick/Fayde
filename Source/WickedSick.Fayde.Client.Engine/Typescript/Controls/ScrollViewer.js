var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    (function (Controls) {
        var ScrollViewer = (function (_super) {
            __extends(ScrollViewer, _super);
            function ScrollViewer() {
                _super.apply(this, arguments);

            }
            ScrollViewer.prototype.InvalidateScrollInfo = function () {
                //TODO: Implement
                            };
            return ScrollViewer;
        })(Controls.ContentControl);
        Controls.ScrollViewer = ScrollViewer;        
        Nullstone.RegisterType(ScrollViewer, "ScrollViewer");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollViewer.js.map
