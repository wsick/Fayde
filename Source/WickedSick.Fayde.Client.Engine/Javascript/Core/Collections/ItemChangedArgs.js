/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var ItemChangedArgs = Nullstone.Create("ItemChangedArgs", undefined, 4);

    ItemChangedArgs.Instance.Init = function (item, propd, oldValue, newValue) {
        this.Item = item;
        this.Property = propd;
        this.OldValue = oldValue;
        this.NewValue = newValue;
    };

    namespace.ItemChangedArgs = Nullstone.FinishCreate(ItemChangedArgs);
})(window);