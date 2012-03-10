/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region ItemChangedArgs

function ItemChangedArgs(item, propd, oldValue, newValue) {
    if (!Nullstone.IsReady)
        return;
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}
Nullstone.Create(ItemChangedArgs, "ItemChangedArgs");

//#endregion