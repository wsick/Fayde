/// CODE

//#region CollectionChangedArgs

function CollectionChangedArgs(action, oldValue, newValue, index) {
    RefObject.call(this);
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}
CollectionChangedArgs.InheritFrom(RefObject);

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};

//#endregion