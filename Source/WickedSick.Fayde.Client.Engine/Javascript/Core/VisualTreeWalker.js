/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="Collections/Collection.js"/>
/// <reference path="Collections/UIElementCollection.js"/>

(function (namespace) {
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
                if (!(this._Content instanceof UIElementCollection))
                    this._Direction = _VisualTreeWalkerDirection.Logical;
            }
        }
    }

    _VisualTreeWalker.prototype.Step = function () {
        var result;
        if (this._Collection) {
            var count = this.GetCount();
            if (count < 0 || this._Offset >= count)
                return null;
            if (count == 1 && this._Offset == 0) {
                this._Offset++;
                return this._Collection.GetValueAt(0);
            }

            if (this._Direction === _VisualTreeWalkerDirection.ZForward || this._Direction === _VisualTreeWalkerDirection.ZReverse) {
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
        return result;
    };
    _VisualTreeWalker.prototype.GetCount = function () {
        if (!this._Content)
            return 0;
        if (!this._Collection)
            return 1;
        return this._Collection.GetCount();
    };
    
    namespace._VisualTreeWalker = _VisualTreeWalker;
})(window);