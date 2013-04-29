/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Controls/Grid.ts" />

module Fayde {
    export class VisualTreeHelper {
        static GetParent(d: DependencyObject): DependencyObject {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var parentNode = (<UIElement>d).XamlNode.VisualParentNode;
            if (parentNode)
                return parentNode.XObject;
        }
        static GetRoot(d: DependencyObject): DependencyObject {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var rootNode = (<UIElement>d).XamlNode.GetVisualRoot();
            if (rootNode)
                return rootNode.XObject;
        }

        static __Debug(ui, func?: (uin: UINode, tabIndex: number) => string): string {
            var uin: UINode;
            if (ui instanceof UIElement) {
                uin = (<UIElement>ui).XamlNode;
            } else if (ui instanceof UINode) {
                uin = <UINode>ui;
            } else if (ui) {
                return "[Object is not a UIElement.]";
            }
            
            //Find top level
            var topNode: UINode;
            if (!uin) {
                var rv = App.Instance.RootVisual;
                topNode = (rv) ? rv.XamlNode : null;
            } else {
                topNode = uin.GetVisualRoot();
            }
            if (!topNode)
                return "[No top node.]";

            if (!func)
                func = __DebugUIElement;
            return __DebugTree(topNode, uin, 1, func);
        }
        private static __DebugTree(curNode: UINode, matchNode: UINode, tabIndex: number, func: (uin: UINode, tabIndex: number) => string) {
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
            str += (<any>cur).constructor._TypeName;
            var name = curNode.Name;
            if (name)
                str += " [" + name + "]";
            if (func)
                str += func(curNode, tabIndex);
            str += "\n";

            var enumerator = curNode.GetVisualTreeEnumerator();
            if (!enumerator) 
                return str;

            var childNode: UINode;
            while (enumerator.MoveNext()) {
                childNode = enumerator.Current;
                str += __DebugTree(childNode, matchNode, tabIndex + 1, func);
            }

            return str;
        }
        private static __DebugUIElement(uin: UINode, tabIndex: number): string {
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

            var gridStr = __DebugGrid(uin, tabIndex);
            if (gridStr)
                str += "\n" + gridStr;
            return str;
        }
        private static __DebugGrid(uin: UINode, tabIndex: number): string {
            var grid: Controls.Grid;
            if (uin instanceof Controls.GridNode)
                grid = <Controls.Grid>uin.XObject;
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

            var enumerator: IEnumerator;
            var str = "";
            if (rcount > 0) {
                str += tabs;
                str += "  Rows (" + rcount + "):\n";
                enumerator = rds.GetEnumerator();
                var rowdef: Controls.RowDefinition;
                while (enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                }
            }
            if (ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator = cds.GetEnumerator();
                var coldef: Controls.ColumnDefinition;
                while (enumerator.MoveNext()) {
                    coldef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + coldef.ActualWidth + "\n";
                }
            }
            return str;
        }
    }
}