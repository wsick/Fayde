/// <reference path="../DependencyObject.js"/>
/// CODE
/// <reference path="Collection.js"/>
/// <reference path="../../Collections/NotifyCollectionChangedEventArgs.js"/>

//#region PresentationFrameworkCollection
var PresentationFrameworkCollection = Nullstone.Create("PresentationFrameworkCollection", DependencyObject);

PresentationFrameworkCollection.Instance.Init = function () {
    this.Init$DependencyObject();
    this._Backing = new Collection();
    this.ItemsChanged = new MulticastEvent();
    this.Clearing = new MulticastEvent();
};

//#region Properties

Nullstone.Property(PresentationFrameworkCollection, "IsReadOnly", {
    get: function () {
        return this._IsReadOnlyImpl();
    }
});

//#endregion

PresentationFrameworkCollection.Instance.GetCount = function () {
    return this._Backing.GetCount();
};

PresentationFrameworkCollection.Instance.GetValueAt = function (index) {
    return this._Backing.GetValueAt(index);
};
PresentationFrameworkCollection.Instance.SetValueAt = function (index, value) {
    var old = this.GetValueAt(index);
    this._Backing.SetValueAt(index, value);
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Replace, value, old, index));
};

PresentationFrameworkCollection.Instance.Contains = function (value) {
    return this._Backing.IndexOf(value) !== -1;
};
PresentationFrameworkCollection.Instance.IndexOf = function (value) {
    return this._IndexOfImpl(value);
};
PresentationFrameworkCollection.Instance._IndexOfImpl = function (value) {
    if (value == null)
        return -1;
    return this._Backing.IndexOf(value);
};

PresentationFrameworkCollection.Instance.Clear = function () {
    this._CheckReadOnly();
    this._ClearImpl();
};
PresentationFrameworkCollection.Instance._ClearImpl = function () {
    this.Clearing.Raise(this, new EventArgs());
    this._Backing.Clear();
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
};

PresentationFrameworkCollection.Instance.Add = function (value) {
    this._CheckReadOnly();
    this._AddImpl(value);
};
PresentationFrameworkCollection.Instance._AddImpl = function (value) {
    this._CheckNull(NotifyCollectionChangedAction.Add, value);

    var index = this._Backing.Add(value);
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add, value, index));
};

PresentationFrameworkCollection.Instance.Insert = function (index, value) {
    this._CheckReadOnly();
    this._InsertImpl(index, value);
};
PresentationFrameworkCollection.Instance._InsertImpl = function (index, value) {
    this._CheckNull(NotifyCollectionChangedAction.Add, value);
    if (index < 0)
        throw new ArgumentOutOfRangeException();

    var index = this._Backing.Insert(index, value);
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add, value, index));
};

PresentationFrameworkCollection.Instance.Remove = function (value) {
    this._CheckReadOnly();
    return this._RemoveImpl(value);
};
PresentationFrameworkCollection.Instance._RemoveImpl = function (value) {
    if (this._CheckNull(NotifyCollectionChangedAction.Remove, value))
        return false;

    var index = this.IndexOf(value);
    if (index === -1)
        return false;

    this._Backing.RemoveAt(index);
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(value, index));
    return true;
};

PresentationFrameworkCollection.Instance.RemoveAt = function (index) {
    this._CheckReadOnly();
    this._RemoveAtImpl(index);
};
PresentationFrameworkCollection.Instance._RemoveAtImpl = function (index) {
    var value = this.GetValueAt(index);
    this._Backing.RemoveAt(index);
    this.ItemsChanged.Raise(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Remove, value, index));
};

PresentationFrameworkCollection.Instance._IsReadOnlyImpl = function () {
    return false;
};

PresentationFrameworkCollection.Instance.ToArray = function () {
    return this._Backing.ToArray();
};


PresentationFrameworkCollection.Instance._CheckNull = function (action, value) {
    if (value != null)
        return false;
    if (action === NotifyCollectionChangedAction.Add)
        throw new ArgumentNullException();
};
PresentationFrameworkCollection.Instance._CheckReadOnly = function () {
    if (this.$GetIsReadOnly())
        throw new InvalidOperationException("The collection is readonly.");
};

Nullstone.FinishCreate(PresentationFrameworkCollection);
//#endregion