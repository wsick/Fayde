var PathEntryType = {
    Move: 0,
    Line: 1,
    Rect: 2,
    Quadratic: 3,
    Bezier: 4,
    Arc: 5,
    ArcTo: 6,
    Close: 7
};

var ShapeFlags = {
    Empty: 1,
    Normal: 2,
    Degenerate: 4,
    Radii: 8
};