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
        (function (PlacementMode) {
            PlacementMode._map = [];
            PlacementMode.Bottom = 0;
            PlacementMode.Right = 1;
            PlacementMode.Mouse = 2;
            PlacementMode.Left = 3;
            PlacementMode.Top = 4;
        })(Controls.PlacementMode || (Controls.PlacementMode = {}));
        var PlacementMode = Controls.PlacementMode;
        (function (SelectionMode) {
            SelectionMode._map = [];
            SelectionMode.Single = 0;
            SelectionMode.Multiple = 1;
            SelectionMode.Extended = 2;
        })(Controls.SelectionMode || (Controls.SelectionMode = {}));
        var SelectionMode = Controls.SelectionMode;
        (function (MediaElementState) {
            MediaElementState._map = [];
            MediaElementState.Closed = 0;
            MediaElementState.Opening = 1;
            //Individualizing = 2,
            //AcquiringLicense = 3,
            MediaElementState.Buffering = 4;
            MediaElementState.Playing = 5;
            MediaElementState.Paused = 6;
            MediaElementState.Stopped = 7;
        })(Controls.MediaElementState || (Controls.MediaElementState = {}));
        var MediaElementState = Controls.MediaElementState;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
