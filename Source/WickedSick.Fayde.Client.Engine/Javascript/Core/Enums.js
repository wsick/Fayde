var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};

var UIElementFlags = {
    None: 0,

    RenderVisible: 0x02,
    HitTestVisible: 0x04,
    TotalRenderVisible: 0x08,
    TotalHitTestVisible: 0x10,

    DirtyArrangeHint: 0x800,
    DirtyMeasureHint: 0x1000,
    DirtySizeHint: 0x2000,

    RenderProjection: 0x4000
};

// http://msdn.microsoft.com/en-us/library/system.windows.input.keyboardnavigationmode.aspx
var KeyboardNavigationMode = {
    Continue: 0,
    Once: 1,
    Cycle: 2,
    None: 3,
    Contained: 4,
    Local: 5
};