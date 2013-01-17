/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../../Runtime/MulticastEvent.js"/>

(function (namespace) {
    var IListenCollectionChanged = Nullstone.Create("IListenCollectionChanged");

    IListenCollectionChanged.Instance.Init = function () {
        this.CollectionChanged = new MulticastEvent();
    };

    namespace.IListenCollectionChanged = Nullstone.FinishCreate(IListenCollectionChanged);
})(window);