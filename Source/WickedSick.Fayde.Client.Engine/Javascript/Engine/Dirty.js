/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>

function _DirtyList() {
    RefObject.call(this);
    this._DirtyNodes = new LinkedList();
}
_DirtyList.InheritFrom(RefObject);

_DirtyList.prototype.AddDirtyNode = function (node) {
    this._DirtyNodes.Append(node);
};
_DirtyList.prototype.RemoveDirtyNode = function (node) {
    if (!this._DirtyNodes)
        return;
    this._DirtyNodes.Remove(node);
};
_DirtyList.prototype.GetFirst = function () {
    return this._DirtyNodes.First();
};
_DirtyList.prototype.IsEmpty = function () {
    return this._DirtyNodes.IsEmpty();
};
_DirtyList.prototype.Clear = function () {
    this._DirtyNodes.Clear();
};

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
    InUpDirtyList: 1 << 31
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