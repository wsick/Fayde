/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

//#region _IndexedPropertyPathNode

function _IndexedPropertyPathNode(index) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
}
Nullstone.Extend(_IndexedPropertyPathNode, "_IndexedPropertyPathNode", _PropertyPathNode);

_IndexedPropertyPathNode.prototype._CheckIsBroken = function () {
    return this._isBroken || this._CheckIsBroken$super();
};
_IndexedPropertyPathNode.prototype.UpdateValue = function () {
    NotImplemented("_IndexedPropertyPathNode.UpdateValue");
};

_IndexedPropertyPathNode.prototype.GetIndex = function () {
    return this._Index;
};
_IndexedPropertyPathNode.prototype.SetIndex = function (value) {
    this._Index = value;
};

//#endregion
