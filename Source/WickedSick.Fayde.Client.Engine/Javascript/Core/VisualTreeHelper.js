/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="FrameworkElement.js"/>

(function (namespace) {
    var VisualTreeHelper = {};
    VisualTreeHelper.GetChild = function (d, childIndex) {
        if (!(d instanceof FrameworkElement))
            throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

        var subtree = d._SubtreeObject;
        if (subtree instanceof Fayde.UIElementCollection)
            return subtree.GetValueAt(childIndex);

        if ((subtree instanceof Fayde.UIElement) && childIndex === 0)
            return subtree;

        throw new ArgumentOutOfRangeException();
    };
    VisualTreeHelper.GetChildrenCount = function (d) {
        if (!(d instanceof FrameworkElement))
            throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

        var subtree = d._SubtreeObject;
        if (subtree instanceof Fayde.UIElementCollection)
            return subtree.GetCount();

        if (subtree instanceof Fayde.UIElement)
            return 1;

        return 0;
    };
    VisualTreeHelper.GetParent = function (d) {
        if (!(d instanceof FrameworkElement))
            throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
        return Nullstone.As(d.GetVisualParent(), Fayde.DependencyObject);
    };
    VisualTreeHelper.GetRoot = function (d) {
        var root = d;
        while (d != null) {
            root = d;
            d = VisualTreeHelper.GetParent(d);
        }
        return root;
    };

    VisualTreeHelper.__Debug = function (uie, func) {
        /// <param name="uie" type="UIElement"></param>

        //Find top level
        var topLevel = uie;
        if (topLevel) {
            while (true) {
                var temp = VisualTreeHelper.GetParent(topLevel);
                if (!temp)
                    break;
                topLevel = temp;
            }
        } else {
            topLevel = App.Instance.MainSurface._TopLevel;
        }
        if (!func)
            func = VisualTreeHelper.__DebugUIElement;
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
        var name = uie.Name;
        if (name)
            str += " [" + name + "]";
        if (func)
            str += func(uie, tabIndex);
        str += "\n";

        var count = VisualTreeHelper.GetChildrenCount(uie);
        var child;
        for (var i = 0; i < count; i++) {
            child = VisualTreeHelper.GetChild(uie, i);
            str += VisualTreeHelper.__DebugTree(child, uie2, tabIndex + 1, func);
        }
        return str;
    };
    VisualTreeHelper.__DebugUIElement = function (uie, tabIndex) {
        if (!uie)
            return "";
        /// <param name="uie" type="UIElement"></param>
        var str = "(";
        if (uie.Visibility === Fayde.Visibility.Visible)
            str += "Visible";
        else
            str += "Collapsed";

        str += " ";
        var p = Fayde.LayoutInformation.GetVisualOffset(uie);
        if (p)
            str += p.toString();
        var size = new Size(uie.ActualWidth, uie.ActualHeight);
        str += " ";
        str += size.toString();
        str += ")";
        var gridStr = VisualTreeHelper.__DebugGrid(uie, tabIndex);
        if (gridStr)
            str += "\n" + gridStr;
        return str;
    };
    VisualTreeHelper.__DebugGrid = function (uie, tabIndex) {
        var grid = Nullstone.As(uie, Fayde.Controls.Grid);
        if (!grid)
            return "";
        var rds = grid.RowDefinitions;
        var rcount = rds.GetCount();
        var cds = grid.ColumnDefinitions;
        var ccount = cds.GetCount();

        var tabs = "";
        for (var i = 0; i < tabIndex; i++) {
            tabs += "\t";
        }

        var str = "";
        if (rcount > 0) {
            str += tabs;
            str += "  Rows (" + rcount + "):\n";
            for (var i = 0; i < rcount; i++) {
                str += tabs;
                str += "\t[" + i + "] -> " + rds.GetValueAt(i).ActualHeight + "\n";
            }
        }
        if (ccount > 0) {
            str += tabs;
            str += "  Columns (" + ccount + "):\n";
            for (var i = 0; i < ccount; i++) {
                str += tabs;
                str += "\t[" + i + "] -> " + cds.GetValueAt(i).ActualWidth + "\n";
            }
        }
        return str;
    };

    namespace.VisualTreeHelper = VisualTreeHelper;
})(Nullstone.Namespace("Fayde"));