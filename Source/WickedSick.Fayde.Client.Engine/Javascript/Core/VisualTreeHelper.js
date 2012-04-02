/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="FrameworkElement.js"/>

//#region VisualTreeHelper

var VisualTreeHelper = {};
VisualTreeHelper.GetChild = function (d, childIndex) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = Nullstone.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetValueAt(childIndex);

    var item = Nullstone.As(subtree, UIElement);
    if (item != null && childIndex === 0)
        return item;

    throw new ArgumentOutOfRangeException();
};
VisualTreeHelper.GetChildrenCount = function (d) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = Nullstone.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetCount();

    var item = Nullstone.As(subtree, UIElement);
    if (item != null)
        return 1;

    return 0;
};
VisualTreeHelper.GetParent = function (d) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
    return Nullstone.As(fw.GetVisualParent(), DependencyObject);
};

//#endregion