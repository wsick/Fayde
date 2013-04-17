/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="Style.ts" />
/// <reference path="../Controls/Control.ts" />

module Fayde {
    export interface IWalker {
        Step(): any;
    }
    export interface IStyleWalker extends IWalker {
        Step(): Setter;
    }
    export interface IDeepTreeWalker extends IWalker {
        Step(): UINode;
        SkipBranch();
    }
    export interface ITabNavigationWalker {
        FocusChild(): bool;
    }

    function setterSort(setter1: Setter, setter2: Setter) {
        var a = setter1.Property;
        var b = setter2.Property;
        return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
    }
    function mergeSetters(arr: any[], dps: any[], style: Style) {
        var enumerator = style.Setters.GetEnumerator(true);
        var setter: Setter;
        while (enumerator.MoveNext()) {
            setter = <Setter>enumerator.Current;
            if (!(setter instanceof Fayde.Setter))
                continue;
            var propd = setter.Property;
            if (!propd)
                continue;
            if (dps[propd._ID])
                continue;
            dps[propd._ID] = setter;
            arr.push(setter);
        }
    }
    export function SingleStyleWalker(style: Style): IStyleWalker {
        var dps = [];
        var flattenedSetters = [];
        var cur = style;
        while (cur) {
            mergeSetters(flattenedSetters, dps, cur);
            cur = cur.BasedOn;
        }
        flattenedSetters.sort(setterSort);

        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    export function MultipleStylesWalker(styles: Style[]): IStyleWalker {
        var flattenedSetters = [];
        if (styles) {
            var dps = [];
            var stylesSeen = [];
            var len = styles.length;
            for (var i = 0; i < len; i++) {
                var style = styles[i];
                while (style) {
                    if (stylesSeen.indexOf(style) > -1)
                        continue;
                    mergeSetters(flattenedSetters, dps, style);
                    stylesSeen.push(style);
                    style = style.BasedOn;
                }
            }
            flattenedSetters.sort(setterSort);
        }

        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }

    export function DeepTreeWalker(top: UIElement, direction?: VisualTreeDirection): IDeepTreeWalker {
        var last: UINode = undefined;
        var dir = VisualTreeDirection.Logical;
        var walkList: UINode[] = [top.XamlNode];
        if (direction)
            dir = direction;

        return {
            Step: function () {
                if (last) {
                    var enumerator = last.GetVisualTreeEnumerator(dir);
                    var insertIndex = 0;
                    while (enumerator.MoveNext()) {
                        walkList.splice(insertIndex, 0, enumerator.Current);
                        insertIndex++;
                    }
                }

                var next = walkList[0];
                if (!next) {
                    last = undefined;
                    return;
                }

                var curNode: UINode;
                return curNode;
            },
            SkipBranch: function () {
                last = undefined;
            }
        };
    }
    
    function compare(left: Controls.ControlNode, right: Controls.ControlNode) {
        if (!left)
            return !right ? 0 : -1;
        if (!right)
            return 1;

        var v1 = left.XObject.TabIndex;
        var v2 = right.XObject.TabIndex;

        if (v1 == null) {
            return v2 != null ? -1 : 0;
        } else if (v2 == null) {
            return 1;
        }
        if (v1 > v2)
            return 1;
        return v1 === v2 ? 0 : -1;
    }
    function getParentNavigationMode(uin: UINode): Input.KeyboardNavigationMode {
        while (uin) {
            if (uin instanceof Controls.ControlNode)
                return (<Controls.ControlNode>uin).XObject.TabNavigation;
            return Input.KeyboardNavigationMode.Local;
        }
        return Input.KeyboardNavigationMode.Local;
    }
    function getActiveNavigationMode(uin: UINode): Input.KeyboardNavigationMode {
        while (uin) {
            if (uin instanceof Controls.ControlNode)
                return (<Controls.ControlNode>uin).XObject.TabNavigation;
            uin = uin.VisualParentNode;
        }
        return Input.KeyboardNavigationMode.Local;
    }
    function walkChildren(root: UINode, cur?: UINode, forwards?: bool) {
        var walker = new TabNavigationWalker(root, cur, forwards);
        return walker.FocusChild();
    }
    export class TabNavigationWalker implements ITabNavigationWalker {
        private _Root: UINode;
        private _Current: UINode;
        private _Forwards: bool;
        private _TabSorted: UINode[];

        constructor(root: UINode, cur: UINode, forwards: bool) {
            this._Root = root;
            this._Current = cur;
            this._Forwards = forwards;
            this._TabSorted = [];
        }
        
        FocusChild(): bool {
            var childNode: UINode;
            var childIsControl;
            var curIndex = -1;

            var childWalker = DeepTreeWalker(this._Root.XObject);
            while (childNode = childWalker.Step()) {
                if (childNode === this._Root || !(childNode instanceof Controls.ControlNode))
                    continue;
                this._TabSorted.push(childNode);
                childWalker.SkipBranch();
            }

            if (this._TabSorted.length > 1) {
                this._TabSorted.sort(compare);
                if (!this._Forwards)
                    this._TabSorted = this._TabSorted.reverse();
            }

            var len = this._TabSorted.length;
            for (var i = 0; i < len; i++) {
                if (this._TabSorted[i] === this._Current)
                    curIndex = i;
            }

            if (curIndex !== -1 && getActiveNavigationMode(this._Root) === Input.KeyboardNavigationMode.Once) {
                if (!this._Forwards && this._Root instanceof Controls.ControlNode)
                    return (<Controls.ControlNode>this._Root).TabTo();
                return false;
            }

            var len = this._TabSorted.length;
            if (len > 0) {
                for (var j = 0; j < len; j++) {
                    if ((j + curIndex + 1) === len && getActiveNavigationMode(this._Root) !== Input.KeyboardNavigationMode.Cycle)
                        break;
                    childNode = this._TabSorted[(j + curIndex + 1) % len];
                    childIsControl = childNode instanceof Controls.ControlNode;

                    if (childIsControl && !(<Controls.ControlNode>childNode).XObject.IsEnabled)
                        continue;

                    if (!this._Forwards && walkChildren(childNode))
                        return true;

                    if (childIsControl && (<Controls.ControlNode>childNode).TabTo())
                        return true;

                    if (this._Forwards && walkChildren(childNode))
                        return true;
                }
            }

            if (curIndex !== -1 && !this._Forwards) {
                if (this._Root instanceof Controls.ControlNode)
                    return (<Controls.ControlNode>this._Root).TabTo();
            }

            return false;
        }

        static Focus(uin: UINode, forwards?: bool): bool {
            var focused = false;
            var cur = uin;
            var root = uin;

            if ((root.VisualParentNode && getParentNavigationMode(root.VisualParentNode) === Input.KeyboardNavigationMode.Once)
                || (!forwards && root && root.VisualParentNode)) {
                while (root = root.VisualParentNode)
                    if (root.XObject instanceof Fayde.Controls.Control || !root.VisualParentNode)
                        break;
            }

            do {
                focused = focused || walkChildren(root, cur, forwards);

                if (!focused && getActiveNavigationMode(root) === Fayde.Input.KeyboardNavigationMode.Cycle)
                    return true;

                cur = root;
                root = root.VisualParentNode;
                while (root && !(root.XObject instanceof Fayde.Controls.Control) && root.VisualParentNode)
                    root = root.VisualParentNode
            } while (!focused && root);

            if (!focused)
                focused = focused || walkChildren(cur, null, forwards);
            return focused;
        }
    }
}