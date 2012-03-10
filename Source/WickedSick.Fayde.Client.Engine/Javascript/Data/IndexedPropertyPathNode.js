/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

//#region _IndexedPropertyPathNode
var _IndexedPropertyPathNode = Nullstone.Create("_IndexedPropertyPathNode", _PropertyPathNode, 1);

_IndexedPropertyPathNode.Instance.Init = function (index) {
    this.Init$super();
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
};

_IndexedPropertyPathNode.Instance._CheckIsBroken = function () {
    return this._isBroken || this._CheckIsBroken$super();
};
_IndexedPropertyPathNode.Instance.UpdateValue = function () {
    NotImplemented("_IndexedPropertyPathNode.UpdateValue");
};

_IndexedPropertyPathNode.Instance.GetIndex = function () {
    return this._Index;
};
_IndexedPropertyPathNode.Instance.SetIndex = function (value) {
    this._Index = value;
};

Nullstone.FinishCreate(_IndexedPropertyPathNode);
//#endregion