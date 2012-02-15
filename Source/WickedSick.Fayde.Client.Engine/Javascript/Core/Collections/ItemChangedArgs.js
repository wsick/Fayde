/// CODE

//#region ItemChangedArgs

function ItemChangedArgs(item, propd, oldValue, newValue) {
    RefObject.call(this);
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}
ItemChangedArgs.InheritFrom(RefObject);

//#endregion