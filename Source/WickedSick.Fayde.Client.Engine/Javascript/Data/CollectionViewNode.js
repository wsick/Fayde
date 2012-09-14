/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE
/// <reference path="CurrentChangedListener.js"/>

//#region _CollectionViewNode
var _CollectionViewNode = Nullstone.Create("_CollectionViewNode", _PropertyPathNode, 3);

_CollectionViewNode.Instance.Init = function (bindsDirectlyToSource, bindToView, viewChanged) {
    this.Init$_PropertyPathNode();
    this.BindsDirectlyToSource = bindsDirectlyToSource === true;
    this.BindToView = bindToView === true;
    this.ViewChangedHandler = this.ViewChanged;
};

//#region Properties

Nullstone.AutoProperties(_CollectionViewNode, [
    "BindsDirectlyToSource",
    "BindToView"
]);

//#endregion

_CollectionViewNode.Instance.OnSourceChanged = function (oldSource, newSource) {
    this.OnSourceChanged$_PropertyPathNode(oldSource, newSource);
    this.DisconnectViewHandlers();
    this.ConnectViewHandlers(Nullstone.As(newSource, CollectionViewSource), Nullstone.As(newSource, ICollectionView));
};
_CollectionViewNode.Instance.ViewChanged = function (sender, e) {
    this.DisconnectViewHandlers(true);
    this.ConnectViewHandlers(null, e.NewValue);
    this.ViewCurrentChanged(this, new EventArgs());
};
_CollectionViewNode.Instance.ViewCurrentChanged = function (sender, e) {
    this.UpdateValue();
    if (this.Next)
        this.Next.SetSource(this.Value);
};
_CollectionViewNode.Instance.SetValue = function () {
    throw new NotImplementedException();
};
_CollectionViewNode.Instance.UpdateValue = function () {
    if (this.BindsDirectlyToSource) {
        this.ValueType = this.Source == null ? null : this.Source.constructor;
        this.UpdateValueAndIsBroken(this.Source, this._CheckIsBroken());
    } else {
        var usableSource = this.Source;
        var view;
        if (this.Source instanceof CollectionViewSource) {
            usableSource = null;
            view = this.Source.View;
        } else if (this.Source.DoesImplement(ICollectionView)) {
            view = this.Source;
        }

        if (!view) {
            this.ValueType = usableSource == null ? null : usableSource.constructor;
            this.UpdateValueAndIsBroken(usableSource, this._CheckIsBroken());
        } else {
            if (this.BindToView) {
                this.ValueType = view.constructor;
                this.UpdateValueAndIsBroken(view, this._CheckIsBroken());
            } else {
                this.ValueType = view.GetCurrentItem() == null ? null : view.GetCurrentItem().constructor;
                this.UpdateValueAndIsBroken(view.GetCurrentItem(), this._CheckIsBroken());
            }
        }
    }
};
_CollectionViewNode.Instance._CheckIsBroken = function () {
    return this.Source == null;
};

_CollectionViewNode.Instance.ConnectViewHandlers = function (source, view) {
    /// <param name="source" type="CollectionViewSource"></param>
    /// <param name="view" type="ICollectionView"></param>
    if (source) {
        this._ViewPropertyListener = new PropertyChangedListener(source, CollectionViewSource.ViewProperty, this, this.ViewChanged);
        view = source.View;
    }
    if (view)
        this._ViewListener = new CurrentChangedListener(view, this, this.ViewCurrentChanged);

};
_CollectionViewNode.Instance.DisconnectViewHandlers = function (onlyView) {
    /// <param name="onlyView" type="Boolean"></param>
    if (!onlyView)
        onlyView = false;
    if (this._ViewPropertyListener && !onlyView) {
        this._ViewPropertyListener.Detach();
        this._ViewPropertyListener = null;
    }
    if (this._ViewListener) {
        this._ViewListener.Detach();
        this._ViewListener = null;
    }
};

Nullstone.FinishCreate(_CollectionViewNode);
//#endregion