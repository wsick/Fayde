/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/Collection.js" />

//#region ObservableCollection
var ObservableCollection = Nullstone.Create("ObservableCollection", Collection);

ObservableCollection.Instance.Init = function () {
    this.Init$Collection();
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(ObservableCollection);
//#endregion