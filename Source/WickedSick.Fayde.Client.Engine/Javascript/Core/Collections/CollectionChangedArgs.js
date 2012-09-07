/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region CollectionChangedArgs
var CollectionChangedArgs = Nullstone.Create("CollectionChangedArgs", undefined, 4);

CollectionChangedArgs.Instance.Init = function (action, oldValue, newValue, index) {
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
};

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};

Nullstone.FinishCreate(CollectionChangedArgs);
//#endregion