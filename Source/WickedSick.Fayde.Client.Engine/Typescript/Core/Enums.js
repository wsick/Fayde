var Fayde;
(function (Fayde) {
    (function (Orientation) {
        Orientation._map = [];
        Orientation.Horizontal = 0;
        Orientation.Vertical = 1;
    })(Fayde.Orientation || (Fayde.Orientation = {}));
    var Orientation = Fayde.Orientation;
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
    (function (FontWeight) {
        FontWeight._map = [];
        FontWeight.Thin = 100;
        FontWeight.ExtraLight = 200;
        FontWeight.Light = 300;
        FontWeight.Normal = 400;
        FontWeight.Medium = 500;
        FontWeight.SemiBold = 600;
        FontWeight.Bold = 700;
        FontWeight.ExtraBold = 800;
        FontWeight.Black = 900;
        FontWeight.ExtraBlack = 950;
    })(Fayde.FontWeight || (Fayde.FontWeight = {}));
    var FontWeight = Fayde.FontWeight;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
