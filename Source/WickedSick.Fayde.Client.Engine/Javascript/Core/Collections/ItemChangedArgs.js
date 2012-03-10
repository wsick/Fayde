/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region ItemChangedArgs
var ItemChangedArgs = Nullstone.Create("ItemChangedArgs", null, 4);

ItemChangedArgs.Instance.Init = function (item, propd, oldValue, newValue) {
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
};

Nullstone.FinishCreate(ItemChangedArgs);
//#endregion