/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="Style.ts" />
/// <reference path="../Controls/Control.ts" />
var Fayde;
(function (Fayde) {
    function setterSort(setter1, setter2) {
        var a = setter1.Property;
        var b = setter2.Property;
        return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
    }
    function mergeSetters(arr, dps, style) {
        var enumerator = style.Setters.GetEnumerator(true);
        var setter;
        while(enumerator.MoveNext()) {
            setter = enumerator.Current;
            if(!(setter instanceof Fayde.Setter)) {
                continue;
            }
            var propd = setter.Property;
            if(!propd) {
                continue;
            }
            if(dps[propd._ID]) {
                continue;
            }
            dps[propd._ID] = setter;
            arr.push(setter);
        }
    }
    function SingleStyleWalker(style) {
        var dps = [];
        var flattenedSetters = [];
        var cur = style;
        while(cur) {
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
    Fayde.SingleStyleWalker = SingleStyleWalker;
    function MultipleStylesWalker(styles) {
        var flattenedSetters = [];
        if(styles) {
            var dps = [];
            var stylesSeen = [];
            var len = styles.length;
            for(var i = 0; i < len; i++) {
                var style = styles[i];
                while(style) {
                    if(stylesSeen.indexOf(style) > -1) {
                        continue;
                    }
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
    Fayde.MultipleStylesWalker = MultipleStylesWalker;
    function DeepTreeWalker(topNode, direction) {
        var last = undefined;
        var dir = Fayde.VisualTreeDirection.Logical;
        var walkList = [
            topNode
        ];
        if(direction) {
            dir = direction;
        }
        return {
            Step: function () {
                if(last) {
                    var enumerator = last.GetVisualTreeEnumerator(dir);
                    var insertIndex = 0;
                    while(enumerator.MoveNext()) {
                        walkList.splice(insertIndex, 0, enumerator.Current);
                        insertIndex++;
                    }
                }
                var next = walkList[0];
                if(!next) {
                    last = undefined;
                    return;
                }
                var curNode;
                return curNode;
            },
            SkipBranch: function () {
                last = undefined;
            }
        };
    }
    Fayde.DeepTreeWalker = DeepTreeWalker;
    function compare(left, right) {
        if(!left) {
            return !right ? 0 : -1;
        }
        if(!right) {
            return 1;
        }
        var v1 = left.XObject.TabIndex;
        var v2 = right.XObject.TabIndex;
        if(v1 == null) {
            return v2 != null ? -1 : 0;
        } else if(v2 == null) {
            return 1;
        }
        if(v1 > v2) {
            return 1;
        }
        return v1 === v2 ? 0 : -1;
    }
    function getParentNavigationMode(uin) {
        while(uin) {
            if(uin instanceof Fayde.Controls.ControlNode) {
                return (uin).XObject.TabNavigation;
            }
            return Fayde.Input.KeyboardNavigationMode.Local;
        }
        return Fayde.Input.KeyboardNavigationMode.Local;
    }
    function getActiveNavigationMode(uin) {
        while(uin) {
            if(uin instanceof Fayde.Controls.ControlNode) {
                return (uin).XObject.TabNavigation;
            }
            uin = uin.VisualParentNode;
        }
        return Fayde.Input.KeyboardNavigationMode.Local;
    }
    function walkChildren(root, cur, forwards) {
        var walker = new TabNavigationWalker(root, cur, forwards);
        return walker.FocusChild();
    }
    var TabNavigationWalker = (function () {
        function TabNavigationWalker(root, cur, forwards) {
            this._Root = root;
            this._Current = cur;
            this._Forwards = forwards;
            this._TabSorted = [];
        }
        TabNavigationWalker.prototype.FocusChild = function () {
            var childNode;
            var childIsControl;
            var curIndex = -1;
            var childWalker = DeepTreeWalker(this._Root);
            while(childNode = childWalker.Step()) {
                if(childNode === this._Root || !(childNode instanceof Fayde.Controls.ControlNode)) {
                    continue;
                }
                this._TabSorted.push(childNode);
                childWalker.SkipBranch();
            }
            if(this._TabSorted.length > 1) {
                this._TabSorted.sort(compare);
                if(!this._Forwards) {
                    this._TabSorted = this._TabSorted.reverse();
                }
            }
            var len = this._TabSorted.length;
            for(var i = 0; i < len; i++) {
                if(this._TabSorted[i] === this._Current) {
                    curIndex = i;
                }
            }
            if(curIndex !== -1 && getActiveNavigationMode(this._Root) === Fayde.Input.KeyboardNavigationMode.Once) {
                if(!this._Forwards && this._Root instanceof Fayde.Controls.ControlNode) {
                    return (this._Root).TabTo();
                }
                return false;
            }
            var len = this._TabSorted.length;
            if(len > 0) {
                for(var j = 0; j < len; j++) {
                    if((j + curIndex + 1) === len && getActiveNavigationMode(this._Root) !== Fayde.Input.KeyboardNavigationMode.Cycle) {
                        break;
                    }
                    childNode = this._TabSorted[(j + curIndex + 1) % len];
                    childIsControl = childNode instanceof Fayde.Controls.ControlNode;
                    if(childIsControl && !(childNode).XObject.IsEnabled) {
                        continue;
                    }
                    if(!this._Forwards && walkChildren(childNode)) {
                        return true;
                    }
                    if(childIsControl && (childNode).TabTo()) {
                        return true;
                    }
                    if(this._Forwards && walkChildren(childNode)) {
                        return true;
                    }
                }
            }
            if(curIndex !== -1 && !this._Forwards) {
                if(this._Root instanceof Fayde.Controls.ControlNode) {
                    return (this._Root).TabTo();
                }
            }
            return false;
        };
        TabNavigationWalker.Focus = function Focus(uin, forwards) {
            var focused = false;
            var cur = uin;
            var root = uin;
            if((root.VisualParentNode && getParentNavigationMode(root.VisualParentNode) === Fayde.Input.KeyboardNavigationMode.Once) || (!forwards && root && root.VisualParentNode)) {
                while(root = root.VisualParentNode) {
                    if(root instanceof Fayde.Controls.ControlNode || !root.VisualParentNode) {
                        break;
                    }
                }
            }
            do {
                focused = focused || walkChildren(root, cur, forwards);
                if(!focused && getActiveNavigationMode(root) === Fayde.Input.KeyboardNavigationMode.Cycle) {
                    return true;
                }
                cur = root;
                root = root.VisualParentNode;
                while(root && !(root instanceof Fayde.Controls.ControlNode) && root.VisualParentNode) {
                    root = root.VisualParentNode;
                }
            }while(!focused && root);
            if(!focused) {
                focused = focused || walkChildren(cur, null, forwards);
            }
            return focused;
        };
        return TabNavigationWalker;
    })();
    Fayde.TabNavigationWalker = TabNavigationWalker;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Walkers.js.map
