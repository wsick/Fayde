var PathEntryType = {
    Move: 0,
    Line: 1,
    Rect: 2,
    Quadratic: 3,
    Bezier: 4,
    EllipticalArc: 5,
    Arc: 6,
    ArcTo: 7,
    Close: 8
};

var ShapeFlags = {
    Empty: 1,
    Normal: 2,
    Degenerate: 4,
    Radii: 8
};