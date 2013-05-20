var _Dirty;
(function (_Dirty) {
    _Dirty._map = [];
    _Dirty.Transform = 1 << 0;
    _Dirty.LocalTransform = 1 << 1;
    _Dirty.LocalProjection = 1 << 2;
    _Dirty.Clip = 1 << 3;
    _Dirty.LocalClip = 1 << 4;
    _Dirty.LayoutClip = 1 << 5;
    _Dirty.RenderVisibility = 1 << 6;
    _Dirty.HitTestVisibility = 1 << 7;
    _Dirty.Measure = 1 << 8;
    _Dirty.Arrange = 1 << 9;
    _Dirty.ChildrenZIndices = 1 << 10;
    _Dirty.Bounds = 1 << 20;
    _Dirty.NewBounds = 1 << 21;
    _Dirty.Invalidate = 1 << 22;
    _Dirty.InUpDirtyList = 1 << 30;
    _Dirty.InDownDirtyList = 1 << 31;
    _Dirty.DownDirtyState = _Dirty.Transform | _Dirty.LocalTransform | _Dirty.LocalProjection | _Dirty.Clip | _Dirty.LocalClip | _Dirty.LayoutClip | _Dirty.RenderVisibility | _Dirty.HitTestVisibility | _Dirty.ChildrenZIndices;
    _Dirty.UpDirtyState = _Dirty.Bounds | _Dirty.Invalidate;
})(_Dirty || (_Dirty = {}));
//@ sourceMappingURL=Dirty.js.map
