/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region CollectionChangedArgs

function CollectionChangedArgs(action, oldValue, newValue, index) {
    if (!Nullstone.IsReady)
        return;
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}
Nullstone.Create(CollectionChangedArgs, "CollectionChangedArgs");

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};

//#endregion