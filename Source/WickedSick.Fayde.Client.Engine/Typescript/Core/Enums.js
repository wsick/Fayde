var Fayde;
(function (Fayde) {
    (function (Visibility) {
        Visibility._map = [];
        Visibility.Visible = 0;
        Visibility.Collapsed = 1;
    })(Fayde.Visibility || (Fayde.Visibility = {}));
    var Visibility = Fayde.Visibility;
    Fayde.CursorType = {
        Default: "",
        Hand: "pointer",
        IBeam: "text",
        Wait: "wait",
        SizeNESW: "ne-resize",
        SizeNWSE: "nw-resize",
        SizeNS: "n-resize",
        SizeWE: "w-resize"
    };
    //TODO: Add cursor types
    (function (HorizontalAlignment) {
        HorizontalAlignment._map = [];
        HorizontalAlignment.Left = 0;
        HorizontalAlignment.Center = 1;
        HorizontalAlignment.Right = 2;
        HorizontalAlignment.Stretch = 3;
    })(Fayde.HorizontalAlignment || (Fayde.HorizontalAlignment = {}));
    var HorizontalAlignment = Fayde.HorizontalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment._map = [];
        VerticalAlignment.Top = 0;
        VerticalAlignment.Center = 1;
        VerticalAlignment.Bottom = 2;
        VerticalAlignment.Stretch = 3;
    })(Fayde.VerticalAlignment || (Fayde.VerticalAlignment = {}));
    var VerticalAlignment = Fayde.VerticalAlignment;
    (function (FlowDirection) {
        FlowDirection._map = [];
        FlowDirection.LeftToRight = 0;
        FlowDirection.RightToLeft = 1;
    })(Fayde.FlowDirection || (Fayde.FlowDirection = {}));
    var FlowDirection = Fayde.FlowDirection;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
