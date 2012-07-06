/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

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
function _DirtyList(type) {
    this._DirtyNodes = [];
    this._Type = type;
}

_DirtyList.prototype.Add = function (node) {
    this._DirtyNodes.push(node);
    /*
    DirtyDebug.Level++;
    if (this._Type === "Down")
        DirtyDebug("Add(Down): [" + node.__DebugToString() + "]" + node.__DebugDownDirtyFlags());
    if (this._Type === "Up")
        DirtyDebug("Add(Up): [" + node.__DebugToString() + "]" + node.__DebugUpDirtyFlags());
    DirtyDebug(this.__DebugToString());
    DirtyDebug.Level--;
    */
};
_DirtyList.prototype.RemoveFirst = function () {
    var node = this._DirtyNodes.shift();
};
_DirtyList.prototype.Remove = function (node) {
    Array.removeNullstone(this._DirtyNodes, node);
    /*
    DirtyDebug.Level++;
    if (this._Type === "Down")
    DirtyDebug("Remove(Down): [" + node.__DebugToString() + "]" + node.__DebugDownDirtyFlags());
    if (this._Type === "Up")
    DirtyDebug("Remove(Up): [" + node.__DebugToString() + "]" + node.__DebugUpDirtyFlags());
    DirtyDebug("Remaining: " + this.__DebugToString());
    DirtyDebug.Level--;
    */
};
_DirtyList.prototype.GetFirst = function () {
    if (this._DirtyNodes.length > 0)
        return this._DirtyNodes[0];
    return undefined;
};
_DirtyList.prototype.IsEmpty = function () {
    return this._DirtyNodes.length < 1;
};
_DirtyList.prototype.Clear = function () {
    this._DirtyNodes = [];
};

_DirtyList.prototype.__DebugToString = function () {
    var s = new String();
    for (var i = 0; i < this._DirtyNodes.length; i++) {
        var cur = this._DirtyNodes[i];
        s += "[" + cur.__DebugToString() + "]";
    }
    return s;
};
//#endregion