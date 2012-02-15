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