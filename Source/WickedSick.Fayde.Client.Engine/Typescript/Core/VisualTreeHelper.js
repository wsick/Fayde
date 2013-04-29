/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Controls/Grid.ts" />
var Fayde;
(function (Fayde) {
    var VisualTreeHelper = (function () {
        function VisualTreeHelper() { }
        VisualTreeHelper.GetParent = function GetParent(d) {
            if(!(d instanceof Fayde.FrameworkElement)) {
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            }
            var parentNode = (d).XamlNode.VisualParentNode;
            if(parentNode) {
                return parentNode.XObject;
            }
        };
        VisualTreeHelper.GetRoot = function GetRoot(d) {
            if(!(d instanceof Fayde.FrameworkElement)) {
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            }
            var rootNode = (d).XamlNode.GetVisualRoot();
            if(rootNode) {
                return rootNode.XObject;
            }
        };
        VisualTreeHelper.__Debug = function __Debug(ui, func) {
            var uin;
            if(ui instanceof Fayde.UIElement) {
                uin = (ui).XamlNode;
            } else if(ui instanceof Fayde.UINode) {
                uin = ui;
            } else if(ui) {
                return "[Object is not a UIElement.]";
            }
            //Find top level
            var topNode;
            if(!uin) {
                var rv = App.Instance.RootVisual;
                topNode = (rv) ? rv.XamlNode : null;
            } else {
                topNode = uin.GetVisualRoot();
            }
            if(!topNode) {
                return "[No top node.]";
            }
            if(!func) {
                func = VisualTreeHelper.__DebugUIElement;
            }
            return VisualTreeHelper.__DebugTree(topNode, uin, 1, func);
        };
        VisualTreeHelper.__DebugTree = function __DebugTree(curNode, matchNode, tabIndex, func) {
            var str = "";
            if(curNode === matchNode) {
                for(var i = 0; i < tabIndex; i++) {
                    str += ">>>>>>>>";
                }
            } else {
                for(var i = 0; i < tabIndex; i++) {
                    str += "\t";
                }
            }
            var cur = curNode.XObject;
            str += (cur).constructor._TypeName;
            var name = curNode.Name;
            if(name) {
                str += " [" + name + "]";
            }
            if(func) {
                str += func(curNode, tabIndex);
            }
            str += "\n";
            var enumerator = curNode.GetVisualTreeEnumerator();
            if(!enumerator) {
                return str;
            }
            var childNode;
            while(enumerator.MoveNext()) {
                childNode = enumerator.Current;
                str += VisualTreeHelper.__DebugTree(childNode, matchNode, tabIndex + 1, func);
            }
            return str;
        };
        VisualTreeHelper.__DebugUIElement = function __DebugUIElement(uin, tabIndex) {
            if(!uin) {
                return "";
            }
            var uie = uin.XObject;
            var str = "(";
            if(uie.Visibility === Fayde.Visibility.Visible) {
                str += "Visible";
            } else {
                str += "Collapsed";
            }
            var lu = uin.LayoutUpdater;
            if(lu) {
                str += " ";
                var p = lu.VisualOffset;
                if(p) {
                    str += p.toString();
                }
                var s = size.fromRaw(lu.ActualWidth, lu.ActualHeight);
                str += " ";
                str += s.toString();
            }
            str += ")";
            var gridStr = VisualTreeHelper.__DebugGrid(uin, tabIndex);
            if(gridStr) {
                str += "\n" + gridStr;
            }
            return str;
        };
        VisualTreeHelper.__DebugGrid = function __DebugGrid(uin, tabIndex) {
            var grid;
            if(uin instanceof Fayde.Controls.GridNode) {
                grid = uin.XObject;
            }
            if(!grid) {
                return "";
            }
            var rds = grid.RowDefinitions;
            var rcount = rds.Count;
            var cds = grid.ColumnDefinitions;
            var ccount = cds.Count;
            var tabs = "";
            for(var i = 0; i < tabIndex; i++) {
                tabs += "\t";
            }
            var enumerator;
            var str = "";
            if(rcount > 0) {
                str += tabs;
                str += "  Rows (" + rcount + "):\n";
                enumerator = rds.GetEnumerator();
                var rowdef;
                while(enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                }
            }
            if(ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator = cds.GetEnumerator();
                var coldef;
                while(enumerator.MoveNext()) {
                    coldef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + coldef.ActualWidth + "\n";
                }
            }
            return str;
        };
        return VisualTreeHelper;
    })();
    Fayde.VisualTreeHelper = VisualTreeHelper;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualTreeHelper.js.map
