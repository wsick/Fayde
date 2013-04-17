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
}