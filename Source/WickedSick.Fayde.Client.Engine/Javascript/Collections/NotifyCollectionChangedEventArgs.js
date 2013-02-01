/// <reference path="../Runtime/EventArgs.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (Collections) {
    var NotifyCollectionChangedAction = {
        Add: 1,
        Remove: 2,
        Replace: 3,
        Reset: 4
    };
    Collections.NotifyCollectionChangedAction = NotifyCollectionChangedAction;

    //#region NotifyCollectionChangedEventArgs

    var NotifyCollectionChangedEventArgs = Nullstone.Create("NotifyCollectionChangedEventArgs", EventArgs);

    NotifyCollectionChangedEventArgs.Reset = function () {
        var args = new NotifyCollectionChangedEventArgs();
        args._Action = NotifyCollectionChangedAction.Reset;
        args._OldStartingIndex = -1;
        args._NewStartingIndex = -1;
        return args;
    };
    NotifyCollectionChangedEventArgs.Replace = function (newValue, oldValue, index) {
        var args = new NotifyCollectionChangedEventArgs();
        args._Action = NotifyCollectionChangedAction.Replace;
        args._NewItems = [];
        args._NewItems.push(newValue);
        args._OldItems = [];
        args._OldItems.push(oldValue);
        args._NewStartingIndex = index;
        args._OldStartingIndex = -1;
        return args;
    };
    NotifyCollectionChangedEventArgs.Add = function (newValue, index) {
        var args = new NotifyCollectionChangedEventArgs();
        args._Action = NotifyCollectionChangedAction.Add;
        args._NewItems = [];
        args._NewItems.push(newValue);
        args._NewStartingIndex = index;
        args._OldStartingIndex = -1;
        return args;
    };
    NotifyCollectionChangedEventArgs.Remove = function (oldValue, index) {
        var args = new NotifyCollectionChangedEventArgs();
        args._Action = NotifyCollectionChangedAction.Remove;
        args._OldItems = [];
        args._OldItems.push(oldValue);
        args._OldStartingIndex = index;
        args._NewStartingIndex = -1;
        return args;
    };

    Nullstone.Property(NotifyCollectionChangedEventArgs, "Action", {
        get: function () { return this._Action; }
    });
    Nullstone.Property(NotifyCollectionChangedEventArgs, "NewItems", {
        get: function () { return this._NewItems; }
    });
    Nullstone.Property(NotifyCollectionChangedEventArgs, "OldItems", {
        get: function () { return this._OldItems; }
    });
    Nullstone.Property(NotifyCollectionChangedEventArgs, "OldStartingIndex", {
        get: function () { return this._OldStartingIndex; }
    });
    Nullstone.Property(NotifyCollectionChangedEventArgs, "NewStartingIndex", {
        get: function () { return this._NewStartingIndex; }
    });

    Collections.NotifyCollectionChangedEventArgs = Nullstone.FinishCreate(NotifyCollectionChangedEventArgs);

    //#endregion
})(Nullstone.Namespace("Fayde.Collections"));