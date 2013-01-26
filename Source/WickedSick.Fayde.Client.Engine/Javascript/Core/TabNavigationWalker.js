/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="UIElement.js"/>
/// <reference path="DeepTreeWalker.js"/>

(function (namespace) {
    var TabNavigationWalker = Nullstone.Create("TabNavigationWalker", undefined, 3);

    TabNavigationWalker.Instance.Init = function (root, cur, forwards) {
        this._Root = root;
        this._Current = cur;
        this._Forwards = forwards;
        this._TabSorted = [];
    };

    TabNavigationWalker.Instance.FocusChild = function () {
        var child;
        var childIsControl;
        var curIndex = -1;

        var childWalker = new _DeepTreeWalker(this._Root);
        while (child = childWalker.Step()) {
            if (Nullstone.RefEquals(child, this._Root) || !(child instanceof Fayde.Controls.Control))
                continue;
            this._TabSorted.push(child);
            childWalker.SkipBranch();
        }

        if (this._TabSorted.length > 1) {
            this._TabSorted.sort(TabNavigationWalker.Compare);
            if (!this._Forwards)
                this._TabSorted = this._TabSorted.reverse();
        }

        for (var i = 0; i < this._TabSorted.length; i++) {
            if (Nullstone.RefEquals(this._TabSorted[i], this._Current))
                curIndex = i;
        }

        if (curIndex !== -1 && TabNavigationWalker.GetActiveNavigationMode(this._Root) === KeyboardNavigationMode.Once) {
            if (!this._Forwards && this._Root instanceof Fayde.Controls.Control)
                return this.TabTo(this._Root);
            return false;
        }

        var len = this._TabSorted.length;
        if (len > 0) {
            for (var j = 0; j < len; j++) {
                if ((j + curIndex + 1) === len && TabNavigationWalker.GetActiveNavigationMode(this._Root) !== KeyboardNavigationMode.Cycle)
                    break;
                child = this._TabSorted[(j + curIndex + 1) % len];
                childIsControl = child instanceof Fayde.Controls.Control;

                if (childIsControl && !child.IsEnabled)
                    continue;

                if (!this._Forwards && TabNavigationWalker.WalkChildren(child))
                    return true;

                if (childIsControl && this.TabTo(child))
                    return true;

                if (this._Forwards && TabNavigationWalker.WalkChildren(child))
                    return true;
            }
        }

        if (curIndex !== -1 && !this._Forwards) {
            if (this._Root instanceof Fayde.Controls.Control)
                return this.TabTo(this._Root);
        }

        return false;
    };
    TabNavigationWalker.Instance.TabTo = function (control) {
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

        if ((root.GetVisualParent() && TabNavigationWalker.GetParentNavigationMode(root.GetVisualParent()) === KeyboardNavigationMode.Once)
            || (!forwards && root && root.GetVisualParent())) {
            while (root = root.GetVisualParent())
                if (root instanceof Fayde.Controls.Control || !root.GetVisualParent())
                    break;
        }

        do {
            focused |= TabNavigationWalker.WalkChildren(root, cur, forwards);

            if (!focused && TabNavigationWalker.GetActiveNavigationMode(root) === KeyboardNavigationMode.Cycle)
                return true;

            cur = root;
            root = root.GetVisualParent();
            while (root && !(root instanceof Fayde.Controls.Control) && root.GetVisualParent())
                root = root.GetVisualParent();
        } while (!focused && root);

        if (!focused)
            focused |= TabNavigationWalker.WalkChildren(cur, null, forwards);
        return focused;
    };

    TabNavigationWalker.GetParentNavigationMode = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="KeyboardNavigationMode" />
        while (uie) {
            if (uie instanceof Fayde.Controls.Control)
                return uie.TabNavigation;
            return KeyboardNavigationMode.Local;
        }
        return KeyboardNavigationMode.Local;
    };
    TabNavigationWalker.GetActiveNavigationMode = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="KeyboardNavigationMode" />
        while (uie) {
            if (uie instanceof Fayde.Controls.Control)
                return uie.TabNavigation;
            uie = uie.GetVisualParent();
        }
        return KeyboardNavigationMode.Local;
    };

    TabNavigationWalker.WalkChildren = function (root, cur, forwards) {
        var walker = new TabNavigationWalker(root, cur, forwards);
        return walker.FocusChild();
    };

    TabNavigationWalker.Compare = function (left, right) {
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
    };

    namespace.TabNavigationWalker = Nullstone.FinishCreate(TabNavigationWalker);
})(window);