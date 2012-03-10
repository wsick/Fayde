/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="DependencyObjectCollection.js"/>
/// CODE

//#region UIElementCollection
var UIElementCollection = Nullstone.Create("UIElementCollection", DependencyObjectCollection);

UIElementCollection.Instance.Init = function () {
    this.Init$super();
    this._ZSorted = new Array();
};

UIElementCollection.Instance.GetValueAtZIndex = function (index) {
    return this._ZSorted[index];
};
UIElementCollection.Instance.GetZSortedCount = function () {
    return this._ZSorted.length;
};
UIElementCollection.Instance.ResortByZIndex = function () {
    var count = this.GetCount();
    this._ZSorted = new Array(count);
    if (count < 1)
        return;

    for (var i = 0; i < count; i++) {
        this._ZSorted[i] = this._ht[i];
    }

    if (count > 1) {
        this._ZSorted.sort(UIElement.ZIndexComparer);
    }
};
UIElementCollection.Instance.IsElementType = function (value) {
    return value instanceof UIElement;
};

Nullstone.FinishCreate(UIElementCollection);
//#endregion