/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="ICollectionView.js"/>

//#region CollectionViewSource
var CollectionViewSource = Nullstone.Create("CollectionViewSource", DependencyObject);

//#region Dependency Properties

CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, CollectionViewSource);
CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);

Nullstone.AutoProperties(CollectionViewSource, [
    CollectionViewSource.SourceProperty,
    CollectionViewSource.ViewProperty
]);

//#endregion

Nullstone.FinishCreate(CollectionViewSource);
//#endregion