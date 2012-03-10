/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="ICollectionView.js"/>

//#region CollectionViewSource

function CollectionViewSource() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(CollectionViewSource, "CollectionViewSource", DependencyObject);

//#region DEPENDENCY PROPERTIES

CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return RefObject; }, CollectionViewSource);
CollectionViewSource.prototype.GetSource = function () {
    ///<returns type="RefObject"></returns>
    return this.GetValue(CollectionViewSource.SourceProperty);
};
CollectionViewSource.prototype.SetSource = function (value) {
    ///<param name="value" type="RefObject"></param>
    this.SetValue(CollectionViewSource.SourceProperty, value);
};

CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);
CollectionViewSource.prototype.GetView = function () {
    ///<returns type="ICollectionView"></returns>
    return this.GetValue(CollectionViewSource.ViewProperty);
};
CollectionViewSource.prototype.SetView = function (value) {
    ///<param name="value" type="ICollectionView"></param>
    this.SetValue(CollectionViewSource.ViewProperty, value);
};

//#endregion

//#endregion
