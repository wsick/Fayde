var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Controls) {
        var ScrollViewer = (function (_super) {
            __extends(ScrollViewer, _super);
            function ScrollViewer() {
                _super.apply(this, arguments);

            }
            Object.defineProperty(ScrollViewer.prototype, "ScrollInfo", {
                get: function () {
                    return this._ScrollInfo;
                },
                set: function (value) {
                    this._ScrollInfo = value;
                    if(value) {
                        value.CanHorizontallyScroll = this.HorizontalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                        value.CanVerticallyScroll = this.VerticalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                    }
                },
                enumerable: true,
                configurable: true
            });
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
