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
        static GetChild(d: DependencyObject, childIndex: number): DependencyObject {
            if (!(d instanceof FrameworkElement))
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            
            var feNode = <FENode>d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if (subtree instanceof XamlObjectCollection)
                return <DependencyObject>(<XamlObjectCollection>subtree).GetValueAt(childIndex);

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
            var uies: UIElement[] = [];
            var enumerator = ArrayEx.GetEnumerator(subtree.XamlNode.FindElementsInHostCoordinates(intersectingPoint));
            while (enumerator.MoveNext()) {
                uies.push((<UINode>enumerator.Current).XObject);
            }
            return uies;
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
                var rv = App.Current.RootVisual;
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
                var i = 0;
                while (enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                    i++;
                }
            }
            if (ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator = cds.GetEnumerator();
                var coldef: Controls.ColumnDefinition;
                var i = 0;
                while (enumerator.MoveNext()) {
                    coldef = enumerator.Current;
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
            var lu = uin.LayoutUpdater;
            var str = _SerializeDirt(lu.DirtyFlags);
            str += _SerializeFlags(lu.Flags);
            return str;
        }

        static __DebugLayout(ui: any): string {
            return __Debug(ui, __DebugUIElementLayout);
        }

        private static _SerializeDirt(dirt: _Dirty): string {
            var curdirt = dirt;
            
            var down = "";
            if (curdirt & _Dirty.ChildrenZIndices) {
                curdirt &= ~_Dirty.ChildrenZIndices;
                down += "ZI+";
            }
            if (curdirt & _Dirty.Arrange) {
                curdirt &= ~_Dirty.Arrange;
                down += "A+";
            }
            if (curdirt & _Dirty.Measure) {
                curdirt &= ~_Dirty.Measure;
                down += "M+";
            }
            if (curdirt & _Dirty.HitTestVisibility) {
                curdirt &= ~_Dirty.HitTestVisibility;
                down += "HTV+";
            }
            if (curdirt & _Dirty.RenderVisibility) {
                curdirt &= ~_Dirty.RenderVisibility;
                down += "RV+";
            }
            if (curdirt & _Dirty.LocalClip) {
                curdirt &= ~_Dirty.LocalClip;
                down += "LC+";
            }
            if (curdirt & _Dirty.Clip) {
                curdirt &= ~_Dirty.Clip;
                down += "C+";
            }
            if (curdirt & _Dirty.LocalProjection) {
                curdirt &= ~_Dirty.LocalProjection;
                down += "LP+";
            }
            if (curdirt & _Dirty.LocalTransform) {
                curdirt &= ~_Dirty.LocalTransform;
                down += "LT+";
            }
            if (curdirt & _Dirty.Transform) {
                curdirt &= ~_Dirty.Transform;
                down += "T+";
            }
            if (down)
                down = down.substr(0, down.length - 1);
            
            var up = "";
            if (curdirt & _Dirty.Invalidate) {
                curdirt &= ~_Dirty.Invalidate;
                up += "I+";
            }
            if (curdirt & _Dirty.Bounds) {
                curdirt &= ~_Dirty.Bounds;
                up += "B+";
            }
            if (up)
                up = up.substr(0, up.length - 1);

            return "[" + down + ":" + up + "]";
        }
        private static _SerializeFlags(flags: UIElementFlags): string {
            var str = "";
            if (flags & UIElementFlags.RenderProjection) {
                flags &= ~UIElementFlags.RenderProjection;
                str += "RP+";
            }
            if (flags & UIElementFlags.DirtySizeHint) {
                flags &= ~UIElementFlags.DirtySizeHint;
                str += "S+";
            }
            if (flags & UIElementFlags.DirtyMeasureHint) {
                flags &= ~UIElementFlags.DirtyMeasureHint;
                str += "M+";
            }
            if (flags & UIElementFlags.DirtyArrangeHint) {
                flags &= ~UIElementFlags.DirtyArrangeHint;
                str += "A+";
            }
            if (flags & UIElementFlags.TotalHitTestVisible) {
                flags &= ~UIElementFlags.TotalHitTestVisible;
                str += "THT+";
            }
            if (flags & UIElementFlags.TotalRenderVisible) {
                flags &= ~UIElementFlags.TotalRenderVisible;
                str += "TRV+";
            }
            if (flags & UIElementFlags.HitTestVisible) {
                flags &= ~UIElementFlags.HitTestVisible;
                str += "HT+";
            }
            if (flags & UIElementFlags.RenderVisible) {
                flags &= ~UIElementFlags.RenderVisible;
                str += "RV+";
            }

            if (str)
                str = str.substring(0, str.length - 1);

            return "[" + str + "]";
        }

        private static __GetById(id: number): UIElement {
            //Find top level
            var rv = App.Current.RootVisual;
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