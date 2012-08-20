var GridUnitType = {
    Auto: 0,
    Pixel: 1,
    Star: 2
};

var _TextBoxModelChanged = {
    Nothing: 0,
    TextAlignment: 1,
    TextWrapping: 2,
    Selection: 3,
    Brush: 4,
    Font: 5,
    Text: 6
};
var _TextBoxEmitChanged = {
    NOTHING: 0,
    SELECTION: 1 << 0,
    TEXT: 1 << 1
};

var Keys = {
    Backspace: 8,
    Enter: 13,

    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    Home: 36,
    End: 35,
    
    PageUp: 33,
    PageDown: 34,

    Insert: 45,
    Delete: 46,

    Esc: 27,

    Shift: 16,
    Ctrl: 17,
    Alt: 18,

    Space: 32
};

var Stretch = {
    Fill: 0,
    None: 1,
    Uniform: 2,
    UniformToFill: 3
};

var ScrollBarVisibility = {
    Disabled: 0,
    Auto: 1,
    Hidden: 2,
    Visible: 3
};

var PlacementMode = {
    Bottom: 0,
    Right: 1,
    Mouse: 2,
    Left: 3,
    Top: 4
};