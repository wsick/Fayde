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
        static GetParentOfType<T extends DependencyObject>(d: DependencyObject, type: any): T {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var curNode = (<UIElement>d).XamlNode;
            while ((curNode = curNode.VisualParentNode)) {
                if (curNode instanceof type)
                    return curNode.XObject;
            }
            return undefined;
        }
        static GetRoot(d: DependencyObject): DependencyObject {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            var rootNode = (<UIElement>d).XamlNode.GetVisualRoot();
            if (rootNode)
                return rootNode.XObject;
        }
        static GetChild(d: DependencyObject, childIndex: number): DependencyObject {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            
            var feNode = <FENode>d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if (subtree instanceof XamlObjectCollection)
                return <DependencyObject>(<XamlObjectCollection<DependencyObject>>subtree).GetValueAt(childIndex);

            if ((subtree instanceof UIElement) && childIndex === 0)
                return <UIElement>subtree;

            throw new IndexOutOfRangeException(childIndex);
        }
        static GetChildrenCount(d: DependencyObject): number {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            
            var feNode = <FENode>d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if (subtreeNode.XObject instanceof XamlObjectCollection)
                return (<XamlObjectCollection>subtree).Count;

            if (subtree instanceof UIElement)
                return 1;

            return 0;
        }
        static FindElementsInHostCoordinates(intersectingPoint: Point, subtree: UIElement): UIElement[] {
            return subtree.XamlNode.LayoutUpdater.FindElementsInHostCoordinates(intersectingPoint)
                .map(function (uin) { return uin.XObject; });
        }

        static __Debug(ui: any, func?: (uin: UINode, tabIndex: number) => string): string {
            var uin: UINode;
            if (ui instanceof UIElement) {
                uin = (<UIElement>ui).XamlNode;
            } else if (ui instanceof UINode) {
                uin = <UINode>ui;
            } else if (ui instanceof LayoutUpdater) {
                uin = (<LayoutUpdater>ui).Node;
            }
            
            //Find top level
            var topNode: UINode;
            if (!uin) {
                var rv = Application.Current.RootVisual;
                topNode = (rv) ? rv.XamlNode : null;
            } else {
                topNode = uin.GetVisualRoot();
            }
            if (!topNode)
                return "[No top node.]";

            if (!func)
                func = VisualTreeHelper.__DebugUIElement;
            return VisualTreeHelper.__DebugTree(topNode, uin, 1, func);
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
            var id = (<any>cur)._ID;
            if (id) str += "[" + id + "]";
            var name = curNode.Name;
            str += " [";
            var ns = curNode.NameScope;
            if (!ns)
                str += "^";
            else if (ns.IsRoot)
                str += "+";
            else
                str += "-";
            str += name + "]";;
            if (func)
                str += func(curNode, tabIndex);
            str += "\n";

            var enumerator = curNode.GetVisualTreeEnumerator();
            if (!enumerator) 
                return str;

            var childNode: UINode;
            while (enumerator.MoveNext()) {
                childNode = enumerator.Current;
                str += VisualTreeHelper.__DebugTree(childNode, matchNode, tabIndex + 1, func);
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

            var gridStr = VisualTreeHelper.__DebugGrid(uin, tabIndex);
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

            var enumerator: IEnumerator<Controls.RowDefinition>;
            var str = "";
            if (rcount > 0) {
                str += tabs;
                str += "  Rows (" + rcount + "):\n";
                enumerator = rds.GetEnumerator();
                var rowdef: Controls.RowDefinition;
                var i = 0;
                while (enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                    i++;
                }
            }
            var enumerator2: IEnumerator<Controls.ColumnDefinition>;
            if (ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator2 = cds.GetEnumerator();
                var coldef: Controls.ColumnDefinition;
                var i = 0;
                while (enumerator2.MoveNext()) {
                    coldef = enumerator2.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + coldef.ActualWidth + "\n";
                    i++;
                }
            }
            return str;
        }
        private static __DebugUIElementLayout(uin: UINode, tabIndex: number): string {
            if (!uin)
                return "";
            return (<any>uin.LayoutUpdater)._DebugLayout();
        }

        static __DebugLayout(ui: any): string {
            return VisualTreeHelper.__Debug(ui, VisualTreeHelper.__DebugUIElementLayout);
        }

        private static __GetById(id: number): UIElement {
            //Find top level
            var rv = Application.Current.RootVisual;
            var topNode = (rv) ? rv.XamlNode : null;
            if (!topNode)
                return;

            var walker = DeepTreeWalker(topNode);
            var curNode: UINode;
            while (curNode = walker.Step()) {
                if ((<any>curNode.XObject)._ID === id)
                    return curNode.XObject;
            }
        }
    }
}