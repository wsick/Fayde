/// <reference path="List.js"/>

var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};

_VisualTreeWalker.prototype = new Object;
_VisualTreeWalker.prototype.constructor = _VisualTreeWalker;
function _VisualTreeWalker(/* UIElement */obj, /* _VisualTreeWalkerDirection */direction) {
    this._Offset = 0;
    this._Collection = null;
    this._Content = obj._GetSubtreeObject();
    if (direction)
        this._Direction = direction;
    else
        this._Direction = _VisualTreeWalkerDirection.Logical;
    if (this._Content) {
        if (this._Content instanceof Collection) {
            this._Collection = this._Content;
            if (this._Content instanceof UIElementCollection)
                this._Direction = _VisualTreeWalkerDirection.Logical;
        }
    }
}
_VisualTreeWalker.prototype.Step = function () {
    var result = null;
    if (this._Collection) {
        var count = this.GetCount();
        if (count < 0 || this._Offset >= count)
            return null;
        if (count == 1 && index == 0) {
            this._Offset++;
            return this._Collection.GetValueAt(0);
        }

        if (this._Direction == _VisualTreeWalkerDirection.ZForward || this._Direction == _VisualTreeWalkerDirection.ZReverse) {
            if (this._Collection.GetZSortedCount() != count) {
                this._Collection.ResortByZIndex();
            }
        }

        switch (this._Direction) {
            case _VisualTreeWalkerDirection.ZForward:
                result = this._Collection.GetValueAtZIndex(this._Offset);
                break;
            case _VisualTreeWalkerDirection.ZReverse:
                result = this._Collection.GetValueAtZIndex(count - (this._Offset + 1));
                break;
            case _VisualTreeWalkerDirection.Logical:
                result = this._Collection.GetValueAt(this._Offset);
                break;
            case _VisualTreeWalkerDirection.LogicalReverse:
                result = this._Collection.GetValueAt(count - (this._Offset + 1));
                break;
        }
        this._Offset++;
    } else {
        if (this._Offset == 0) {
            this._Offset++;
            result = this._Content;
        }
    }
};
_VisualTreeWalker.prototype.GetCount = function () {
    if (!this._Content)
        return 0;
    if (!this._Collection)
        return 1;
    return this._Collection.GetCount();
};

_DeepTreeWalker.prototype = new Object;
_DeepTreeWalker.prototype.constructor = _DeepTreeWalker;
_DeepTreeWalker.prototype._WalkList = new List();
_DeepTreeWalker.prototype._Last = null;
_DeepTreeWalker.prototype._Direction = _VisualTreeWalkerDirection.Logical;
function _DeepTreeWalker(/* UIElement */top, /* _VisualTreeWalkerDirection */direction) {
    this._WalkList.Append(new UIElementNode(top));
    if (direction)
        this._Direction = direction;
}
_DeepTreeWalker.prototype.Step = function () {
    if (this._Last) {
        var walker = new _VisualTreeWalker(this._Last, this._Direction);
        var prepend = this._WalkList.First();
        var child;
        while (child = walker.Step()) {
            this._WalkList.InsertBefore(new UIElementNode(child), prepend);
        }
    }

    var next = this._WalkList.First();
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