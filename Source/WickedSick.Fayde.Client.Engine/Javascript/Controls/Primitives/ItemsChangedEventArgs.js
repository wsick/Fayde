/// <reference path="Nullstone.js"/>
/// CODE

//#region ItemsChangedEventArgs
var ItemsChangedEventArgs = Nullstone.Create("ItemsChangedEventArgs", undefined, 5);

ItemsChangedEventArgs.Instance.Init = function (action, itemCount, itemUICount, oldPosition, position) {
    this.Action = action;
    this.ItemCount = itemCount;
    this.ItemUICount = itemUICount;
    this.OldPosition = oldPosition;
    this.Position = position;
};

Nullstone.FinishCreate(ItemsChangedEventArgs);
//#endregion