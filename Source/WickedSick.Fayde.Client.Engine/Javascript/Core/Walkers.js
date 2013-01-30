/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="Collections/Collection.js"/>
/// <reference path="Collections/UIElementCollection.js"/>
/// <reference path="Style.js"/>
/// <reference path="Setter.js"/>

(function (Fayde) {
    var _VisualTreeWalkerDirection = {
        Logical: 0,
        LogicalReverse: 1,
        ZForward: 2,
        ZReverse: 3
    };

    //#region VisualTreeWalker

    function _VisualTreeWalker(obj, direction) {
        /// <param name="obj" type="UIElement"></param>
        /// <param name="direction" type="Number">_VisualTreeWalkerDirection</param>
        if (!obj)
            return;
        this._Offset = 0;
        this._Collection = null;
        this._Content = obj._SubtreeObject;
        if (direction)
            this._Direction = direction;
        else
            this._Direction = _VisualTreeWalkerDirection.Logical;
        if (this._Content) {
            if (this._Content instanceof Collection) {
                this._Collection = this._Content;
                if (!(this._Content instanceof Fayde.UIElementCollection))
                    this._Direction = _VisualTreeWalkerDirection.Logical;
            }
        }
    }
    _VisualTreeWalker.prototype.Step = function () {
        var result;
        var coll = this._Collection;
        if (coll) {
            var dir = this._Direction;
            var count = this.GetCount();
            if (count < 0 || this._Offset >= count)
                return null;
            if (count === 1 && this._Offset === 0) {
                this._Offset++;
                return coll.GetValueAt(0);
            }

            if (dir === _VisualTreeWalkerDirection.ZForward || dir === _VisualTreeWalkerDirection.ZReverse) {
                if (coll.GetZSortedCount() !== count) {
                    coll.ResortByZIndex();
                }
            }

            switch (dir) {
                case _VisualTreeWalkerDirection.ZForward:
                    result = coll.GetValueAtZIndex(this._Offset);
                    break;
                case _VisualTreeWalkerDirection.ZReverse:
                    result = coll.GetValueAtZIndex(count - (this._Offset + 1));
                    break;
                case _VisualTreeWalkerDirection.Logical:
                    result = coll.GetValueAt(this._Offset);
                    break;
                case _VisualTreeWalkerDirection.LogicalReverse:
                    result = coll.GetValueAt(count - (this._Offset + 1));
                    break;
            }
            this._Offset++;
        } else {
            if (this._Offset == 0) {
                this._Offset++;
                result = this._Content;
            }
        }
        return result;
    };
    _VisualTreeWalker.prototype.GetCount = function () {
        if (!this._Content)
            return 0;
        if (!this._Collection)
            return 1;
        return this._Collection.GetCount();
    };
    _VisualTreeWalker.Logical = function (obj) { return new _VisualTreeWalker(obj, _VisualTreeWalkerDirection.Logical); };
    _VisualTreeWalker.LogicalReverse = function (obj) { return new _VisualTreeWalker(obj, _VisualTreeWalkerDirection.LogicalReverse); };
    _VisualTreeWalker.ZForward = function (obj) { return new _VisualTreeWalker(obj, _VisualTreeWalkerDirection.ZForward); };
    _VisualTreeWalker.ZReverse = function (obj) { return new _VisualTreeWalker(obj, _VisualTreeWalkerDirection.ZReverse); };
    Fayde._VisualTreeWalker = _VisualTreeWalker;

    //#endregion

    //#region DeepTreeWalker

    function _DeepTreeWalker(top, direction) {
        /// <param name="top" type="UIElement"></param>
        /// <param name="direction" type="Number">_VisualTreeWalkerDirection</param>
        if (!top)
            return;
        this._WalkList = new LinkedList();
        this._WalkList.Append(new Fayde.UIElementNode(top));
        this._Last = null;
        this._Direction = _VisualTreeWalkerDirection.Logical;
        if (direction)
            this._Direction = direction;
    }
    _DeepTreeWalker.prototype.Step = function () {
        if (this._Last) {
            var walker = new _VisualTreeWalker(this._Last, this._Direction);
            var prepend = this._WalkList.Head;
            var child;
            while (child = walker.Step()) {
                this._WalkList.InsertBefore(new Fayde.UIElementNode(child), prepend);
            }
        }

        var next = this._WalkList.Head;
        if (!next) {
            this._Last = null;
            return null;
        }

        var current = next.UIElement;
        this._WalkList.Remove(next);
        this._Last = current;

        return current;
    };
    _DeepTreeWalker.prototype.SkipBranch = function () {
        this._Last = null;
    };
    _DeepTreeWalker.Logical = function (obj) { return new _DeepTreeWalker(top, _VisualTreeWalkerDirection.Logical); };
    _DeepTreeWalker.LogicalReverse = function (obj) { return new _DeepTreeWalker(top, _VisualTreeWalkerDirection.LogicalReverse); };
    _DeepTreeWalker.ZForward = function (obj) { return new _DeepTreeWalker(top, _VisualTreeWalkerDirection.ZForward); };
    _DeepTreeWalker.ZReverse = function (obj) { return new _DeepTreeWalker(top, _VisualTreeWalkerDirection.ZReverse); };
    Fayde._DeepTreeWalker = _DeepTreeWalker;

    //#endregion

    //#region DeepStyleWalker

    function setterSort (setter1, setter2) {
        /// <param name="setter1" type="Setter"></param>
        /// <param name="setter2" type="Setter"></param>
        var a = setter1._GetValue(Fayde.Setter.PropertyProperty);
        var b = setter2._GetValue(Fayde.Setter.PropertyProperty);
        return (a === b) ? 0 : ((a > b) ? 1 : -1);
    }

    function _DeepStyleWalker(styles) {
        this._Setters = [];
        this._Offset = 0;

        if (styles instanceof Fayde.Style)
            this._InitializeStyle(styles);
        else if (styles instanceof Array)
            this._InitializeStyles(styles);
    }
    _DeepStyleWalker.prototype.Step = function () {
        /// <returns type="Setter" />
        if (this._Offset < this._Setters.length) {
            var s = this._Setters[this._Offset];
            this._Offset++;
            return s;
        }
        return undefined;
    };
    _DeepStyleWalker.prototype._InitializeStyle = function (style) {
        var dps = [];
        var cur = style;
        while (cur) {
            var setters = cur.Setters;
            var count = setters.GetCount();
            for (var i = count - 1; i >= 0; i--) {
                var setter = Nullstone.As(setters.GetValueAt(i), Fayde.Setter);
                if (!setter)
                    continue;
                var propd = setter._GetValue(Fayde.Setter.PropertyProperty);
                if (!propd)
                    continue;
                if (dps[propd])
                    continue;
                dps[propd] = setter;
                this._Setters.push(setter);
            }
            cur = cur.BasedOn;
        }
        this._Setters.sort(setterSort);
    };
    _DeepStyleWalker.prototype._InitializeStyles = function (styles) {
        if (!styles)
            return;

        var dps = [];
        var stylesSeen = [];
        for (var i = 0; i < _StyleIndex.Count; i++) {
            var style = styles[i];
            while (style) {
                if (stylesSeen[style._ID])
                    continue;

                var setters = style.Setters;
                var count = setters ? setters.GetCount() : 0;
                for (var j = count - 1; j >= 0; j--) {
                    var setter = Nullstone.As(setters.GetValueAt(j), Fayde.Setter);
                    if (!setter)
                        continue;
                    var propd = setter._GetValue(Fayde.Setter.PropertyProperty);
                    if (!propd)
                        continue;
                    if (dps[propd])
                        continue;
                    dps[propd] = setter;
                    this._Setters.push(setter);
                }

                stylesSeen[style._ID] = true;
                style = style.BasedOn;
            }
        }
        this._Setters.sort(setterSort);
    };
    Fayde._DeepStyleWalker = _DeepStyleWalker;

    //#endregion

    //#region TabNavigationWalker

    function compare(left, right) {
        /// <param name="left" type="Control"></param>
        /// <param name="right" type="Control"></param>
        if (!left)
            return !right ? 0 : -1;
        if (!right)
            return 1;

        var v1 = left.TabIndex;
        var v2 = right.TabIndex;

        if (v1 == null) {
            return v2 != null ? -1 : 0;
        } else if (v2 == null) {
            return 1;
        }
        if (v1 > v2)
            return 1;
        return v1 === v2 ? 0 : -1;
    }
    function getParentNavigationMode(uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="KeyboardNavigationMode" />
        while (uie) {
            if (uie instanceof Fayde.Controls.Control)
                return uie.TabNavigation;
            return Fayde.Input.KeyboardNavigationMode.Local;
        }
        return Fayde.Input.KeyboardNavigationMode.Local;
    }
    function getActiveNavigationMode(uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="KeyboardNavigationMode" />
        while (uie) {
            if (uie instanceof Fayde.Controls.Control)
                return uie.TabNavigation;
            uie = uie.GetVisualParent();
        }
        return Fayde.Input.KeyboardNavigationMode.Local;
    }
    function walkChildren (root, cur, forwards) {
        var walker = new TabNavigationWalker(root, cur, forwards);
        return walker.FocusChild();
    }

    function TabNavigationWalker(root, cur, forwards) {
        this._Root = root;
        this._Current = cur;
        this._Forwards = forwards;
        this._TabSorted = [];
    }
    TabNavigationWalker.prototype.FocusChild = function () {
        var child;
        var childIsControl;
        var curIndex = -1;

        var childWalker = new Fayde._DeepTreeWalker(this._Root);
        while (child = childWalker.Step()) {
            if (Nullstone.RefEquals(child, this._Root) || !(child instanceof Fayde.Controls.Control))
                continue;
            this._TabSorted.push(child);
            childWalker.SkipBranch();
        }

        if (this._TabSorted.length > 1) {
            this._TabSorted.sort(compare);
            if (!this._Forwards)
                this._TabSorted = this._TabSorted.reverse();
        }

        for (var i = 0; i < this._TabSorted.length; i++) {
            if (Nullstone.RefEquals(this._TabSorted[i], this._Current))
                curIndex = i;
        }

        if (curIndex !== -1 && getActiveNavigationMode(this._Root) === Fayde.Input.KeyboardNavigationMode.Once) {
            if (!this._Forwards && this._Root instanceof Fayde.Controls.Control)
                return this.TabTo(this._Root);
            return false;
        }

        var len = this._TabSorted.length;
        if (len > 0) {
            for (var j = 0; j < len; j++) {
                if ((j + curIndex + 1) === len && getActiveNavigationMode(this._Root) !== Fayde.Input.KeyboardNavigationMode.Cycle)
                    break;
                child = this._TabSorted[(j + curIndex + 1) % len];
                childIsControl = child instanceof Fayde.Controls.Control;

                if (childIsControl && !child.IsEnabled)
                    continue;

                if (!this._Forwards && walkChildren(child))
                    return true;

                if (childIsControl && this.TabTo(child))
                    return true;

                if (this._Forwards && walkChildren(child))
                    return true;
            }
        }

        if (curIndex !== -1 && !this._Forwards) {
            if (this._Root instanceof Fayde.Controls.Control)
                return this.TabTo(this._Root);
        }

        return false;
    };
    TabNavigationWalker.prototype.TabTo = function (control) {
        /// <param name="control" type="Control"></param>
        return control.IsEnabled && control.IsTabStop && control.Focus(false);
    };
    TabNavigationWalker.Focus = function (uie, forwards) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="forwards" type="Boolean"></param>
        /// <returns type="Boolean" />
        var focused = false;
        var cur = uie;
        var root = uie;

        if ((root.GetVisualParent() && getParentNavigationMode(root.GetVisualParent()) === Fayde.Input.KeyboardNavigationMode.Once)
            || (!forwards && root && root.GetVisualParent())) {
            while (root = root.GetVisualParent())
                if (root instanceof Fayde.Controls.Control || !root.GetVisualParent())
                    break;
        }

        do {
            focused |= walkChildren(root, cur, forwards);

            if (!focused && getActiveNavigationMode(root) === Fayde.Input.KeyboardNavigationMode.Cycle)
                return true;

            cur = root;
            root = root.GetVisualParent();
            while (root && !(root instanceof Fayde.Controls.Control) && root.GetVisualParent())
                root = root.GetVisualParent();
        } while (!focused && root);

        if (!focused)
            focused |= walkChildren(cur, null, forwards);
        return focused;
    };
    Fayde.TabNavigationWalker = TabNavigationWalker;

    //#endregion

})(Nullstone.Namespace("Fayde"));