module Fayde {
    export enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
    export var CursorType = {
        Default: "",
        Hand: "pointer",
        IBeam: "text",
        Wait: "wait",
        SizeNESW: "ne-resize",
        SizeNWSE: "nw-resize",
        SizeNS: "n-resize",
        SizeWE: "w-resize"
        //TODO: Add cursor types
    }
    export enum HorizontalAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Stretch = 3,
    }
    export enum VerticalAlignment {
        Top = 0,
        Center = 1,
        Bottom = 2,
        Stretch = 3,
    }
    export enum FlowDirection {
        LeftToRight = 0,
        RightToLeft = 1,
    }
}