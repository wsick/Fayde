/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="ICollectionView.js"/>

//#region CollectionViewSource
var CollectionViewSource = Nullstone.Create("CollectionViewSource", DependencyObject);

//#region DEPENDENCY PROPERTIES

CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, CollectionViewSource);
CollectionViewSource.Instance.GetSource = function () {
    ///<returns type="Object"></returns>
    return this.$GetValue(CollectionViewSource.SourceProperty);
};
CollectionViewSource.Instance.SetSource = function (value) {
    ///<param name="value" type="Object"></param>
    this.$SetValue(CollectionViewSource.SourceProperty, value);
};

CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);
CollectionViewSource.Instance.GetView = function () {
    ///<returns type="ICollectionView"></returns>
    return this.$GetValue(CollectionViewSource.ViewProperty);
};
CollectionViewSource.Instance.SetView = function (value) {
    ///<param name="value" type="ICollectionView"></param>
    this.$SetValue(CollectionViewSource.ViewProperty, value);
};

//#endregion

Nullstone.FinishCreate(CollectionViewSource);
//#endregion