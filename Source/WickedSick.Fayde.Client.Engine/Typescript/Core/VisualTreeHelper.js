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
        VisualTreeHelper.GetChild = function GetChild(d, childIndex) {
            if(!(d instanceof Fayde.FrameworkElement)) {
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            }
            var feNode = d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if(subtree instanceof Fayde.XamlObjectCollection) {
                return (subtree).GetValueAt(childIndex);
            }
            if((subtree instanceof Fayde.UIElement) && childIndex === 0) {
                return subtree;
            }
            throw new IndexOutOfRangeException(childIndex);
        };
        VisualTreeHelper.GetChildrenCount = function GetChildrenCount(d) {
            if(!(d instanceof Fayde.FrameworkElement)) {
                throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
            }
            var feNode = d.XamlNode;
            var subtreeNode = feNode.SubtreeNode;
            var subtree = subtreeNode.XObject;
            if(subtreeNode.XObject instanceof Fayde.XamlObjectCollection) {
                return (subtree).Count;
            }
            if(subtree instanceof Fayde.UIElement) {
                return 1;
            }
            return 0;
        };
        VisualTreeHelper.FindElementsInHostCoordinates = function FindElementsInHostCoordinates(intersectingPoint, subtree) {
            return subtree.XamlNode.LayoutUpdater.FindElementsInHostCoordinates(intersectingPoint).map(function (uin) {
                return uin.XObject;
            });
        };
        VisualTreeHelper.__Debug = function __Debug(ui, func) {
            var uin;
            if(ui instanceof Fayde.UIElement) {
                uin = (ui).XamlNode;
            } else if(ui instanceof Fayde.UINode) {
                uin = ui;
            } else if(ui instanceof Fayde.LayoutUpdater) {
                uin = (ui).Node;
            }
            //Find top level
            var topNode;
            if(!uin) {
                var rv = App.Current.RootVisual;
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
            var id = (cur)._ID;
            if(id) {
                str += "[" + id + "]";
            }
            var name = curNode.Name;
            str += " [";
            var ns = curNode.NameScope;
            if(!ns) {
                str += "^";
            } else if(ns.IsRoot) {
                str += "+";
            } else {
                str += "-";
            }
            str += name + "]";
            ;
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
                var i = 0;
                while(enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + rowdef.ActualHeight + "\n";
                    i++;
                }
            }
            if(ccount > 0) {
                str += tabs;
                str += "  Columns (" + ccount + "):\n";
                enumerator = cds.GetEnumerator();
                var coldef;
                var i = 0;
                while(enumerator.MoveNext()) {
                    coldef = enumerator.Current;
                    str += tabs;
                    str += "\t[" + i + "] -> " + coldef.ActualWidth + "\n";
                    i++;
                }
            }
            return str;
        };
        VisualTreeHelper.__DebugUIElementLayout = function __DebugUIElementLayout(uin, tabIndex) {
            if(!uin) {
                return "";
            }
            var lu = uin.LayoutUpdater;
            var str = VisualTreeHelper._SerializeDirt(lu.DirtyFlags);
            str += VisualTreeHelper._SerializeFlags(lu.Flags);
            str += " (";
            str += lu.HiddenDesire.toString();
            str += " ";
            str += lu.RenderSize.toString();
            str += ")";
            return str;
        };
        VisualTreeHelper.__DebugLayout = function __DebugLayout(ui) {
            return VisualTreeHelper.__Debug(ui, VisualTreeHelper.__DebugUIElementLayout);
        };
        VisualTreeHelper._SerializeDirt = function _SerializeDirt(dirt) {
            var curdirt = dirt;
            var down = "";
            if(curdirt & _Dirty.ChildrenZIndices) {
                curdirt &= ~_Dirty.ChildrenZIndices;
                down += "ZI+";
            }
            if(curdirt & _Dirty.Arrange) {
                curdirt &= ~_Dirty.Arrange;
                down += "A+";
            }
            if(curdirt & _Dirty.Measure) {
                curdirt &= ~_Dirty.Measure;
                down += "M+";
            }
            if(curdirt & _Dirty.HitTestVisibility) {
                curdirt &= ~_Dirty.HitTestVisibility;
                down += "HTV+";
            }
            if(curdirt & _Dirty.RenderVisibility) {
                curdirt &= ~_Dirty.RenderVisibility;
                down += "RV+";
            }
            if(curdirt & _Dirty.LocalClip) {
                curdirt &= ~_Dirty.LocalClip;
                down += "LC+";
            }
            if(curdirt & _Dirty.Clip) {
                curdirt &= ~_Dirty.Clip;
                down += "C+";
            }
            if(curdirt & _Dirty.LocalProjection) {
                curdirt &= ~_Dirty.LocalProjection;
                down += "LP+";
            }
            if(curdirt & _Dirty.LocalTransform) {
                curdirt &= ~_Dirty.LocalTransform;
                down += "LT+";
            }
            if(curdirt & _Dirty.Transform) {
                curdirt &= ~_Dirty.Transform;
                down += "T+";
            }
            if(down) {
                down = down.substr(0, down.length - 1);
            }
            var up = "";
            if(curdirt & _Dirty.Invalidate) {
                curdirt &= ~_Dirty.Invalidate;
                up += "I+";
            }
            if(curdirt & _Dirty.Bounds) {
                curdirt &= ~_Dirty.Bounds;
                up += "B+";
            }
            if(up) {
                up = up.substr(0, up.length - 1);
            }
            return "[" + down + ":" + up + "]";
        };
        VisualTreeHelper._SerializeFlags = function _SerializeFlags(flags) {
            var str = "";
            if(flags & Fayde.UIElementFlags.DirtySizeHint) {
                flags &= ~Fayde.UIElementFlags.DirtySizeHint;
                str += "S+";
            }
            if(flags & Fayde.UIElementFlags.DirtyMeasureHint) {
                flags &= ~Fayde.UIElementFlags.DirtyMeasureHint;
                str += "M+";
            }
            if(flags & Fayde.UIElementFlags.DirtyArrangeHint) {
                flags &= ~Fayde.UIElementFlags.DirtyArrangeHint;
                str += "A+";
            }
            if(flags & Fayde.UIElementFlags.TotalHitTestVisible) {
                flags &= ~Fayde.UIElementFlags.TotalHitTestVisible;
                str += "THT+";
            }
            if(flags & Fayde.UIElementFlags.TotalRenderVisible) {
                flags &= ~Fayde.UIElementFlags.TotalRenderVisible;
                str += "TRV+";
            }
            if(flags & Fayde.UIElementFlags.HitTestVisible) {
                flags &= ~Fayde.UIElementFlags.HitTestVisible;
                str += "HT+";
            }
            if(flags & Fayde.UIElementFlags.RenderVisible) {
                flags &= ~Fayde.UIElementFlags.RenderVisible;
                str += "RV+";
            }
            if(str) {
                str = str.substring(0, str.length - 1);
            }
            return "[" + str + "]";
        };
        VisualTreeHelper.__GetById = function __GetById(id) {
            //Find top level
            var rv = App.Current.RootVisual;
            var topNode = (rv) ? rv.XamlNode : null;
            if(!topNode) {
                return;
            }
            var walker = Fayde.DeepTreeWalker(topNode);
            var curNode;
            while(curNode = walker.Step()) {
                if((curNode.XObject)._ID === id) {
                    return curNode.XObject;
                }
            }
        };
        return VisualTreeHelper;
    })();
    Fayde.VisualTreeHelper = VisualTreeHelper;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualTreeHelper.js.map
