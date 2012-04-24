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

VisualTreeHelper.__Debug = function (uie, func) {
    /// <param name="uie" type="UIElement"></param>

    //Find top level
    var topLevel = uie;
    while (true) {
        var temp = VisualTreeHelper.GetParent(topLevel);
        if (temp == null)
            break;
        topLevel = temp;
    }

    return VisualTreeHelper.__DebugTree(topLevel, uie, 0, func);
};
VisualTreeHelper.__DebugTree = function (uie, uie2, tabIndex, func) {
    /// <param name="uie" type="UIElement"></param>
    /// <param name="uie2" type="UIElement"></param>
    var str = "";
    for (var i = 0; i < tabIndex; i++) {
        str += "\t";
    }
    if (Nullstone.RefEquals(uie, uie2))
        str += "> ";
    str += uie.constructor._TypeName;
    var name = uie.GetName();
    if (name)
        str += " [" + name + "]";
    if (func)
        str += func(uie);
    str += "\n";

    var count = VisualTreeHelper.GetChildrenCount(uie);
    var child;
    for (var i = 0; i < count; i++) {
        child = VisualTreeHelper.GetChild(uie, i);
        str += VisualTreeHelper.__DebugTree(child, uie2, tabIndex + 1, func);
    }
    return str;
};

//#endregion