enum _Dirty {
    Transform = 1 << 0,
    LocalTransform = 1 << 1,
    LocalProjection = 1 << 2,
    Clip = 1 << 3,
    LocalClip = 1 << 4,
    LayoutClip = 1 << 5,
    RenderVisibility = 1 << 6,
    HitTestVisibility = 1 << 7,
    Measure = 1 << 8,
    Arrange = 1 << 9,
    ChildrenZIndices = 1 << 10,
    Bounds = 1 << 20,
    NewBounds = 1 << 21,
    Invalidate = 1 << 22,
    InUpDirtyList = 1 << 30,
    InDownDirtyList = 1 << 31,

    DownDirtyState = Transform | LocalTransform | LocalProjection
        | Clip | LocalClip | LayoutClip | RenderVisibility | HitTestVisibility | ChildrenZIndices,
    UpDirtyState = Bounds | Invalidate,
}