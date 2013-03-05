(function (namespace) {
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
    namespace.MatrixTypes = {
        Identity: 0,
        Unknown: 1,
        Translate: 2,
        Scale: 4,
        Rotate: 8,
        Shear: 16
    };
    namespace.HorizontalLayoutType = {
        Stretch: 0,
        Shrink: 1
    };
    namespace.VerticalLayoutType = {
        Stretch: 0,
        Shrink: 1
    };
})(window);