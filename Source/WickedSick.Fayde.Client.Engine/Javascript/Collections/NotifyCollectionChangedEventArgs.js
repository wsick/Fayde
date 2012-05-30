/// <reference path="../Runtime/EventArgs.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region NotifyCollectionChangedEventArgs
var NotifyCollectionChangedEventArgs = Nullstone.Create("NotifyCollectionChangedEventArgs", EventArgs);

NotifyCollectionChangedEventArgs.Instance.Init = function (args) {
    if (args.length === 1) {
        if (args[0] !== NotifyCollectionChangedAction.Reset)
            throw new NotSupportedException();
        this._Action = args[0];
        this._OldStartingIndex = -1;
        this._NewStartingIndex = -1;
    } else if (args.length === 3) {
        switch (args[0]) {
            case NotifyCollectionChangedAction.Add:
                this._NewItems = [];
                this._NewItems.push(args[1]);
                this._NewStartingIndex = args[2];
                this._OldStartingIndex = -1;
                break;
            case NotifyCollectionChangedAction.Remove:
                this._OldItems = [];
                this._OldItems.push(args[1]);
                this._OldStartingIndex = args[2];
                this._NewStartingIndex = -1;
                break;
            default:
                throw new NotSupportedException();
        }
        this._Action = args[0];
    } else if (args.length === 4) {
        if (args[0] !== NotifyCollectionChangedAction.Replace)
            throw new NotSupportedException();

        this._Action = args[0];

        this._NewItems = [];
        this._NewItems.push(args[1]);

        this._OldItems = [];
        this._OldItems.push(args[2]);

        this._NewStartingIndex = args[3];
        this._OldStartingIndex = -1;
    }
};

NotifyCollectionChangedEventArgs.Instance.GetAction = function () {
    return this._Action;
};
NotifyCollectionChangedEventArgs.Instance.GetNewItems = function () {
    return this._NewItems;
};
NotifyCollectionChangedEventArgs.Instance.GetOldItems = function () {
    return this._OldItems;
};
NotifyCollectionChangedEventArgs.Instance.GetOldStartingIndex = function () {
    return this._OldStartingIndex;
};
NotifyCollectionChangedEventArgs.Instance.GetNewStartingIndex = function () {
    return this._NewStartingIndex;
};

Nullstone.FinishCreate(NotifyCollectionChangedEventArgs);
//#endregion