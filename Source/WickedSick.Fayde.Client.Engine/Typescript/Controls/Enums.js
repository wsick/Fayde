var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (TextWrapping) {
            TextWrapping._map = [];
            TextWrapping.NoWrap = 0;
            TextWrapping.Wrap = 1;
            TextWrapping.WrapWithOverflow = 2;
        })(Controls.TextWrapping || (Controls.TextWrapping = {}));
        var TextWrapping = Controls.TextWrapping;
        (function (ScrollBarVisibility) {
            ScrollBarVisibility._map = [];
            ScrollBarVisibility.Disabled = 0;
            ScrollBarVisibility.Auto = 1;
            ScrollBarVisibility.Hidden = 2;
            ScrollBarVisibility.Visible = 3;
        })(Controls.ScrollBarVisibility || (Controls.ScrollBarVisibility = {}));
        var ScrollBarVisibility = Controls.ScrollBarVisibility;
        (function (TextTrimming) {
            TextTrimming._map = [];
            TextTrimming.None = 0;
        })(Controls.TextTrimming || (Controls.TextTrimming = {}));
        var TextTrimming = Controls.TextTrimming;
        (function (ClickMode) {
            ClickMode._map = [];
            ClickMode.Release = 0;
            ClickMode.Press = 1;
            ClickMode.Hover = 2;
        })(Controls.ClickMode || (Controls.ClickMode = {}));
        var ClickMode = Controls.ClickMode;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
