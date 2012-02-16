/// <reference path="../Runtime/RefObject.js" />
/// CODE
/// <reference path="FrameworkElement.js"/>

//#region VisualTreeHelper

function VisualTreeHelper() {
    RefObject.call(this);
}
VisualTreeHelper.InheritFrom(RefObject);

VisualTreeHelper.GetChild = function (d, childIndex) {
    var fw = RefObject.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = RefObject.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetValueAt(childIndex);

    var item = RefObject.As(subtree, UIElement);
    if (item != null && childIndex === 0)
        return item;

    throw new ArgumentOutOfRangeException();
};
VisualTreeHelper.GetChildrenCount = function (d) {
    var fw = RefObject.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = RefObject.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetCount();

    var item = RefObject.As(subtree, UIElement);
    if (item != null)
        return 1;
    
    return 0;
};

//#endregion
