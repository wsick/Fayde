(function (namespace) {
    namespace.Visibility = {
        Visible: 0,
        Collapsed: 1
    };

    namespace.HorizontalAlignment = {
        Left: 0,
        Center: 1,
        Right: 2,
        Stretch: 3
    };

    namespace.VerticalAlignment = {
        Top: 0,
        Center: 1,
        Bottom: 2,
        Stretch: 3
    };

    namespace.Orientation = {
        Vertical: "Vertical",
        Horizontal: "Horizontal"
    };

    namespace.TextAlignment = {
        Left: 0,
        Center: 1,
        Right: 2
    };

    namespace.TextTrimming = {
        None: 0
    };

    namespace.TextWrapping = {
        NoWrap: 0,
        Wrap: 1,
        WrapWithOverflow: 2
    };

    //FLAGS
    namespace.TextDecorations = {
        None: 0,
        Underline: 1
    };

    namespace.FlowDirection = {
        LeftToRight: 0,
        RightToLeft: 1
    };

    namespace.LineStackingStrategy = {
        MaxHeight: 0,
        BlockLineHeight: 1
    };

    namespace.FontWeight = {
        Thin: 100,
        ExtraLight: 200,
        Light: 300,
        Normal: 400,
        Medium: 500,
        SemiBold: 600,
        Bold: 700,
        ExtraBold: 800,
        Black: 900,
        ExtraBlack: 950
    };

    namespace.FontStyle = {
        Normal: "normal",
        Italic: "italic",
        Oblique: "oblique"
    };

    namespace.FontStretch = {
        UltraCondensed: "ultra-condensed",
        ExtraCondensed: "extra-condensed",
        Condensed: "condensed",
        SemiCondensed: "semi-condensed",
        Normal: "normal",
        SemiExpanded: "semi-expanded",
        Expanded: "expanded",
        ExtraExpanded: "extra-expanded",
        UltraExpanded: "ultra-expanded"
    };

    namespace.ClickMode = {
        Release: 0,
        Press: 1,
        Hover: 2
    };

    namespace.CursorType = {
        Default: "",
        Hand: "pointer",
        IBeam: "text",
        Wait: "wait",
        SizeNESW: "ne-resize",
        SizeNWSE: "nw-resize",
        SizeNS: "n-resize",
        SizeWE: "w-resize"
        //TODO: Add cursor types
    };

    namespace.DurationType = {
        Automatic: 0,
        Forever: 1,
        TimeSpan: 2
    };

    namespace.RectOverlap = {
        Out: 0,
        In: 1,
        Part: 2
    };

    namespace.MatrixTypes = {
        Identity: 0,
        Unknown: 1,
        Translate: 2,
        Scale: 4,
        Rotate: 8,
        Shear: 16
    };
})(window);