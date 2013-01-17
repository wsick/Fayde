/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

(function (namespace) {
    var ICollectionView = Nullstone.Create("ICollectionView");

    ICollectionView.Instance.Init = function () {
        this.CurrentChanged = new MulticastEvent();
    };

    namespace.ICollectionView = Nullstone.FinishCreate(ICollectionView);
})(window);