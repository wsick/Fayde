/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var INotifyCollectionChanged = Nullstone.Create("INotifyCollectionChanged");

    INotifyCollectionChanged.Instance.Init = function () {
        this.CollectionChanged = new MulticastEvent();
    };

    namespace.INotifyCollectionChanged = Nullstone.FinishCreate(INotifyCollectionChanged);
})(window);