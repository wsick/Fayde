/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (Collections) {
    var INotifyCollectionChanged = Nullstone.Create("INotifyCollectionChanged");

    INotifyCollectionChanged.Instance.Init = function () {
        this.CollectionChanged = new MulticastEvent();
    };

    Collections.INotifyCollectionChanged = Nullstone.FinishCreate(INotifyCollectionChanged);
})(Nullstone.Namespace("Fayde.Collections"));