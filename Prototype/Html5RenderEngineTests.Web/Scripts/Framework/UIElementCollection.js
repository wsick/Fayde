/// <reference path="DependencyObjectCollection.js" />
/// <reference path="UIElement.js" />

UIElementCollection.prototype = new DependencyObjectCollection();
UIElementCollection.prototype.constructor = UIElementCollection;
function UIElementCollection() {
    UIElementCollection.call(this);
    this._ZSorted = new Array();
}
UIElementCollection.prototype.GetValueAtZIndex = function (index) {
    return this._ZSorted[index];
};
UIElementCollection.prototype.GetZSortedCount = function () {
    return this._ZSorted.length;
};
UIElementCollection.prototype.ResortByZIndex = function () {
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