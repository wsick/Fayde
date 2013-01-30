/// <reference path="../Core/Collections/Collection.js" />
/// CODE
/// <reference path="INotifyCollectionChanged.js"/>
/// <reference path="NotifyCollectionChangedEventArgs.js"/>

(function (Collections) {
    var ObservableCollection = Nullstone.Create("ObservableCollection", Collection, 0, [Collections.INotifyCollectionChanged]);

    ObservableCollection.Instance.Init = function () {
        this.Init$Collection();
        this.CollectionChanged = new MulticastEvent();
    };

    ObservableCollection.Instance._RaiseChanged = function (action, oldValue, newValue, index) {
        this._RaiseChanged$Collection(action, oldValue, newValue, index);

        var argsClass = Collections.NotifyCollectionChangedEventArgs;
        var args;
        if (action === CollectionChangedArgs.Action.Reset)
            args = argsClass.Reset();
        else if (action === CollectionChangedArgs.Action.Replace)
            args = argsClass.Replace(newValue, oldValue, index);
        else if (action === CollectionChangedArgs.Action.Add)
            args = argsClass.Add(newValue, index);
        else if (action === CollectionChangedArgs.Action.Remove)
            args = argsClass.Remove(oldValue, index);
        this.CollectionChanged.Raise(this, args);
    };

    Collections.ObservableCollection = Nullstone.FinishCreate(ObservableCollection);
})(Nullstone.Namespace("Fayde.Collections"));