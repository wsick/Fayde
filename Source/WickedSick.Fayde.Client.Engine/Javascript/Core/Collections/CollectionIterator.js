/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Collection.js"/>

//#region CollectionIterator

function CollectionIterator(collection) {
    if (!Nullstone.IsReady)
        return;
    this._Collection = collection;
    this._Index = -1;
}
Nullstone.Create(CollectionIterator, "CollectionIterator");

CollectionIterator.prototype.Next = function (error) {
    /// <param name="error" type="BError"></param>
    /// <returns type="Boolean" />
    this._Index++;
    return this._Index < this._Collection.GetCount();
};
CollectionIterator.prototype.Reset = function () {
    this._Index = -1;
};
CollectionIterator.prototype.GetCurrent = function (error) {
    if (this._Index < 0 || this._Index >= this._Collection.GetCount()) {
        error.SetErrored(BError.InvalidOperation, "Index out of bounds.");
        return null;
    }
    return this._Collection.GetValueAt(this._Index);
};

//#endregion