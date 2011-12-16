/// <reference path="Collection.js" />

DependencyObjectCollection.prototype = new Collection();
DependencyObjectCollection.prototype.constructor = DependencyObjectCollection;
function DependencyObjectCollection(setsParent) {
    Collection.call(this);
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
}
DependencyObjectCollection.prototype.IsElementType = function (value) {
    return value instanceof DependencyObject;
};
DependencyObjectCollection.prototype._OnMentorChanged = function (oldValue, newValue) {
    DependencyObject.prototype._OnMentorChanged.call(this, oldValue, newValue);
    for (var i = 0; i < this._ht.length; i++) {
        if (this._ht[i] instanceof DependencyObject)
            this._ht[i]._SetMentor(newValue);
    }
};
DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
    if (this._SetsParent) {
        var existingParent = value.GetParent();
        value._AddParent(this, true, error);
        if (!error.IsErrored() && !existingParent && this._IsSecondaryParent)
            value._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
    } else {
        value._SetMentor(this._Mentor);
    }

    value.AddPropertyChangeListener(this);

    var rv = Collection.prototype.AddedToCollection(value, error);
    value._IsAttached = rv && this._IsAttached;
    if (!rv) {
        if (this._SetsParent) {
            value._RemoveParent(this, error);
            value._SetMentor(this._Mentor);
        } else {
            value._SetMentor(null);
        }
    }
    return rv;
};
DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            value.RemovePropertyChangeListener(this);
            if (this._IsSecondaryParent)
                value._RemoveSecondaryParent(this);

            if (this._SetsParent && value.GetParent() == this)
                value._RemoveParent(this, null);
            value._IsAttached = false;
        }
    }
};