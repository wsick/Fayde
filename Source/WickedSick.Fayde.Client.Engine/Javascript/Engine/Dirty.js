/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>

var _Dirty = {
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

//#region _DirtyList
var _DirtyList = Nullstone.Create("_DirtyList", undefined, 1);

_DirtyList.Instance.Init = function (type) {
    this._DirtyNodes = new LinkedList();
    this._Type = type;
};

_DirtyList.Instance.AddDirtyNode = function (node) {
    DirtyDebug.Level++;
    this._DirtyNodes.Append(node);
    if (this._Type === "Down")
        DirtyDebug("AddDirtyNode(Down): [" + node.Element.__DebugToString() + "]" + node.Element.__DebugDownDirtyFlags());
    if (this._Type === "Up")
        DirtyDebug("AddDirtyNode(Up): [" + node.Element.__DebugToString() + "]" + node.Element.__DebugUpDirtyFlags());
    DirtyDebug(this.__DebugToString());
    DirtyDebug.Level--;
};
_DirtyList.Instance.RemoveDirtyNode = function (node) {
    if (!this._DirtyNodes)
        return;
    DirtyDebug.Level++;
    this._DirtyNodes.Remove(node);
    if (this._Type === "Down")
        DirtyDebug("RemoveDirtyNode(Down): [" + node.Element.__DebugToString() + "]" + node.Element.__DebugDownDirtyFlags());
    if (this._Type === "Up")
        DirtyDebug("RemoveDirtyNode(Up): [" + node.Element.__DebugToString() + "]" + node.Element.__DebugUpDirtyFlags());
    DirtyDebug("Remaining: " + this.__DebugToString());
    DirtyDebug.Level--;
};
_DirtyList.Instance.GetFirst = function () {
    return this._DirtyNodes.First();
};
_DirtyList.Instance.IsEmpty = function () {
    return this._DirtyNodes.IsEmpty();
};
_DirtyList.Instance.Clear = function () {
    this._DirtyNodes.Clear();
};

_DirtyList.Instance.__DebugToString = function () {
    var s = new String();
    var cur = this._DirtyNodes.First();
    while (cur != null) {
        s += "[" + cur.Element.__DebugToString() + "]";
        cur = cur.Next;
    }
    return s;
};

Nullstone.FinishCreate(_DirtyList);
//#endregion