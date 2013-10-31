var Fayde;
(function (Fayde) {
    var VisualTreeHelper = (function () {
        function VisualTreeHelper() {
        }
        VisualTreeHelper.GetParent = function (d) {
            if (!(d instanceof Fayde.FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var parentNode = (d).XamlNode.VisualParentNode;
            if (parentNode)
                return parentNode.XObject;
        };
        VisualTreeHelper.GetParentOfType = function (d, type) {
            if (!(d instanceof Fayde.FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var curNode = (d).XamlNode;
            while ((curNode = curNode.VisualParentNode)) {
                if (curNode instanceof type)
                    return curNode.XObject;
            }
            return undefined;
        };
        VisualTreeHelper.GetRoot = function (d) {
            if (!(d instanceof Fayde.FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var rootNode = (d).XamlNode.GetVisualRoot();
            if (rootNode)
                return rootNode.XObject;
        };
        VisualTreeHelper.GetChild = function (d, childIndex) {
            if (!(d instanceof Fayde.FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

            var feNode = d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if (subtree instanceof Fayde.XamlObjectCollection)
                return (subtree).GetValueAt(childIndex);

            if ((subtree instanceof Fayde.UIElement) && childIndex === 0)
                return subtree;

            throw new IndexOutOfRangeException(childIndex);
        };
        VisualTreeHelper.GetChildrenCount = function (d) {
            if (!(d instanceof Fayde.FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

            var feNode = d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if (subtreeNode.XObject instanceof Fayde.XamlObjectCollection)
                return (subtree).Count;

            if (subtree instanceof Fayde.UIElement)
                return 1;

            return 0;
        };
        VisualTreeHelper.FindElementsInHostCoordinates = function (intersectingPoint, subtree) {
            return subtree.XamlNode.LayoutUpdater.FindElementsInHostCoordinates(intersectingPoint).map(function (uin) {
                return uin.XObject;
            });
        };

        VisualTreeHelper.__Debug = function (ui, func) {
            var uin;
            if (ui instanceof Fayde.UIElement) {
                uin = (ui).XamlNode;
            } else if (ui instanceof Fayde.UINode) {
                uin = ui;
            } else if (ui instanceof Fayde.LayoutUpdater) {
                uin = (ui).Node;
            }

            //Find top level
            var topNode;
            if (!uin) {
                var rv = Fayde.Application.Current.RootVisual;
                topNode = (rv) ? rv.XamlNode : null;
            } else {
                topNode = uin.GetVisualRoot();
            }
            if (!topNode)
                return "[No top node.]";

            if (!func)
                func = VisualTreeHelper.__DebugUIElement;
            return VisualTreeHelper.__DebugTree(topNode, uin, 1, func);
        };
        VisualTreeHelper.__DebugTree = function (curNode, matchNode, tabIndex, func) {
            var str = "";
            if (curNode === matchNode) {
                for (var i = 0; i < tabIndex; i++) {
                    str += ">>>>>>>>";
                }
            } else {
                for (var i = 0; i < tabIndex; i++) {
                    str += "\t";
                }
            }

            var cur = curNode.XObject;
            str += (cur).constructor._TypeName;
            var id = (cur)._ID;
            if (id)
                str += "[" + id + "]";
            var name = curNode.Name;
            str += " [";
            var ns = curNode.NameScope;
            if (!ns)
                str += "^";
else if (ns.IsRoot)
                str += "+";
else
                str += "-";
            str += name + "]";
            ;
            if (func)
                str += func(curNode, tabIndex);
            str += "\n";

            var enumerator = curNode.GetVisualTreeEnumerator();
            if (!enumerator)
                return str;

            var childNode;
            while (enumerator.MoveNext()) {
                childNode = enumerator.Current;
                str += VisualTreeHelper.__DebugTree(childNode, matchNode, tabIndex + 1, func);
            }

            return str;
        };
        VisualTreeHelper.__DebugUIElement = function (uin, tabIndex) {
            if (!uin)
                return "";
            var uie = uin.XObject;
            var str = "(";
            if (uie.Visibility === Fayde.Visibility.Visible)
                str += "Visible";
else
                str += "Collapsed";

            var lu = uin.LayoutUpdater;
            if (lu) {
                str += " ";
                var p = lu.VisualOffset;
                if (p)
                    str += p.toString();
                var s = size.fromRaw(lu.ActualWidth, lu.ActualHeight);
                str += " ";
                str += s.toString();
            }
            str += ")";

            var gridStr = VisualTreeHelper.__DebugGrid(uin, tabIndex);
            if (gridStr)
                str += "\n" + gridStr;
            return str;
        };
        VisualTreeHelper.__DebugGrid = function (uin, tabIndex) {
            var grid;
            if (uin instanceof Fayde.Controls.GridNode)
                grid = uin.XObject;
            if (!grid)
                return "";
            var rds = grid.RowDefinitions;
            var rcount = rds.Count;
            var cds = grid.ColumnDefinitions;
            var ccount = cds.Count;

            var tabs = "";
            for (var i = 0; i < tabIndex; i++) {
                tabs += "\t";
            }

            var enumerator;
            var str = "";
            if (rcount > 0) {
                str += tabs;
                str += "  Rows (" + rcount + "):\n";
                enumerator = rds.GetEnumerator();
                var rowdef;
                var i = 0;
                while (enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                    i++;
                }
            }
            var enumerator2;
            if (ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator2 = cds.GetEnumerator();
                var coldef;
                var i = 0;
                while (enumerator2.MoveNext()) {
                    coldef = enumerator2.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + coldef.ActualWidth + "\n";
                    i++;
                }
            }
            return str;
        };
        VisualTreeHelper.__DebugUIElementLayout = function (uin, tabIndex) {
            if (!uin)
                return "";
            return (uin.LayoutUpdater)._DebugLayout();
        };

        VisualTreeHelper.__DebugLayout = function (ui) {
            return VisualTreeHelper.__Debug(ui, VisualTreeHelper.__DebugUIElementLayout);
        };

        VisualTreeHelper.__GetById = function (id) {
            //Find top level
            var rv = Fayde.Application.Current.RootVisual;
            var topNode = (rv) ? rv.XamlNode : null;
            if (!topNode)
                return;

            var walker = Fayde.DeepTreeWalker(topNode);
            var curNode;
            while (curNode = walker.Step()) {
                if ((curNode.XObject)._ID === id)
                    return curNode.XObject;
            }
        };
        return VisualTreeHelper;
    })();
    Fayde.VisualTreeHelper = VisualTreeHelper;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=VisualTreeHelper.js.map
