/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="ICollectionView.js"/>

(function (namespace) {
    var CollectionViewSource = Nullstone.Create("CollectionViewSource", Fayde.DependencyObject);

    //#region Properties

    CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, CollectionViewSource);
    CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return namespace.ICollectionView; }, CollectionViewSource);

    Nullstone.AutoProperties(CollectionViewSource, [
        CollectionViewSource.SourceProperty,
        CollectionViewSource.ViewProperty
    ]);

    //#endregion

    namespace.CollectionViewSource = Nullstone.FinishCreate(CollectionViewSource);
})(Nullstone.Namespace("Fayde.Data"));