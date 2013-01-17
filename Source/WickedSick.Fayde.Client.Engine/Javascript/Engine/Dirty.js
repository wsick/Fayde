/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Runtime/LinkedList.js"/>
/// CODE
/// <reference path="../Core/Enums.js"/>

(function (namespace) {
    namespace._Dirty = {
        Transform: 1 << 0,
        LocalTransform: 1 << 1,
        LocalProjection: 1 << 2,
        Clip: 1 << 3,
        LocalClip: 1 << 4,
        RenderVisibility: 1 << 5,
        HitTestVisibility: 1 << 6,
        Measure: 1 << 7,
        Arrange: 1 << 8,
        ChildrenZIndices: 1 << 9,
        Bounds: 1 << 20,
        NewBounds: 1 << 21,
        Invalidate: 1 << 22,
        InUpDirtyList: 1 << 30,
        InDownDirtyList: 1 << 31
    };
    _Dirty.DownDirtyState =
        _Dirty.Transform |
        _Dirty.LocalTransform |
        _Dirty.LocalProjection |
        _Dirty.Clip |
        _Dirty.LocalClip |
        _Dirty.RenderVisibility |
        _Dirty.HitTestVisibility |
        _Dirty.ChildrenZIndices;
    _Dirty.UpDirtyState = _Dirty.Bounds | _Dirty.Invalidate;
    _Dirty.State = _Dirty.DownDirtyState | _Dirty.UpDirtyState;

    _Dirty.__DebugToString = function (dirty) {
        switch (dirty) {
            case _Dirty.Measure:
                return "[Measure]";
            case _Dirty.Arrange:
                return "[Arrange]";
            case _Dirty.Bounds:
                return "[Bounds]";
            case _Dirty.NewBounds:
                return "[NewBounds]";
            case _Dirty.ChildrenZIndices:
                return "[ChildrenZIndices]";
            case _Dirty.Clip:
                return "[Clip]";
            case _Dirty.Invalidate:
                return "[Invalidate]";
            case _Dirty.Transform:
                return "[Transform]";
            case _Dirty.LocalTransform:
                return "[LocalTransform]";
            case _Dirty.LocalProjection:
                return "[LocalProjection]";
            case _Dirty.RenderVisibility:
                return "[RenderVisibility]";
            case _Dirty.HitTestVisibility:
                return "[HitTestVisibility]";
        }
        return dirty;
    };


    var _DirtyList = Nullstone.Create("_DirtyList", LinkedList, 1);

    _DirtyList.Instance.Init = function (type) {
        this.Init$LinkedList();
        this._Type = type;
    };

    _DirtyList.Instance.__DebugToString = function () {
        var s = "";
        var node = this.Head;
        while (node) {
            s += "[" + node.UIElement.__DebugToString() + "]";
            node = node.Next;
        }
        return s;
    };

    namespace._DirtyList = Nullstone.FinishCreate(_DirtyList);
})(window);