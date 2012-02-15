/// <reference path="PropertyPathNode.js"/>
/// CODE

//#region _IndexedPropertyPathNode

function _IndexedPropertyPathNode(index) {
    _PropertyPathNode.call(this);
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
}
_IndexedPropertyPathNode.InheritFrom(_PropertyPathNode);

_IndexedPropertyPathNode.prototype._CheckIsBroken = function () {
    return this._isBroken || _PropertyPathNode.prototype._CheckIsBroken.call(this);
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