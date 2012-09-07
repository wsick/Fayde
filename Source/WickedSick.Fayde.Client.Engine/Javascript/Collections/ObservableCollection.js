/// <reference path="../Core/Collections/Collection.js" />
/// CODE
/// <reference path="INotifyCollectionChanged.js"/>
/// <reference path="NotifyCollectionChangedEventArgs.js"/>

//#region ObservableCollection
var ObservableCollection = Nullstone.Create("ObservableCollection", Collection, 0, [INotifyCollectionChanged]);

ObservableCollection.Instance.Init = function () {
    this.Init$Collection();
    this.CollectionChanged = new MulticastEvent();
};

ObservableCollection.Instance._RaiseChanged = function (action, oldValue, newValue, index) {
    this._RaiseChanged$Collection(action, oldValue, newValue, index);
    
    if (action === CollectionChangedArgs.Action.Reset)
        this.CollectionChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
    else if (action === CollectionChangedArgs.Action.Replace)
        this.CollectionChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Replace, newValue, oldValue, index));
    else if (action === CollectionChangedArgs.Action.Add)
        this.CollectionChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add, newValue, index));
    else if (action === CollectionChangedArgs.Action.Remove)
        this.CollectionChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Remove, oldValue, index));
};

Nullstone.FinishCreate(ObservableCollection);
//#endregion