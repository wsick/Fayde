/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Collection.js"/>

(function (namespace) {
    var CollectionIterator = Nullstone.Create("CollectionIterator", undefined, 1);

    CollectionIterator.Instance.Init = function (collection) {
        this._Collection = collection;
        this._Index = -1;
    };

    CollectionIterator.Instance.Next = function (error) {
        /// <param name="error" type="BError"></param>
        /// <returns type="Boolean" />
        this._Index++;
        return this._Index < this._Collection.GetCount();
    };
    CollectionIterator.Instance.Reset = function () {
        this._Index = -1;
    };
    CollectionIterator.Instance.GetCurrent = function (error) {
        if (this._Index < 0 || this._Index >= this._Collection.GetCount()) {
            error.SetErrored(BError.InvalidOperation, "Index out of bounds.");
            return undefined;
        }
        return this._Collection.GetValueAt(this._Index);
    };

    namespace.CollectionIterator = Nullstone.FinishCreate(CollectionIterator);
})(window);