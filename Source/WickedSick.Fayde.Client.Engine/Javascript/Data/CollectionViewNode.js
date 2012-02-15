/// <reference path="PropertyPathNode.js"/>
/// CODE
/// <reference path="CurrentChangedListener.js"/>

//#region _CollectionViewNode

function _CollectionViewNode(bindsDirectlyToSource, bindToView, viewChanged) {
    _PropertyPathNode.call(this);
    this.SetBindsDirectlyToSource(bindsDirectlyToSource === true);
    this.SetBindToView(bindToView === true);
    this.SetViewChangedHandler(this.ViewChanged);
}
_CollectionViewNode.InheritFrom(_PropertyPathNode);

_CollectionViewNode.prototype.OnSourceChanged = function (oldSource, newSource) {
    _PropertyPathNode.prototype.OnSourceChanged.call(this, oldSource, newSource);
    this.DisconnectViewHandlers();
    this.ConnectViewHandlers(RefObject.As(newSource, CollectionViewSource), RefObject.As(newSource, ICollectionView));
};
_CollectionViewNode.prototype.ViewChanged = function (sender, e) {
    this.DisconnectViewHandlers(true);
    this.ConnectViewHandlers(null, e.NewValue);
    this.ViewCurrentChanged(this, new EventArgs());
};
_CollectionViewNode.prototype.ViewCurrentChanged = function (sender, e) {
    this.UpdateValue();
    if (this.GetNext() != null)
        this.GetNext().SetSource(this.GetValue());
};
_CollectionViewNode.prototype.SetValue = function () {
    throw new NotImplementedException();
};
_CollectionViewNode.prototype.UpdateValue = function () {
    if (this.GetBindsDirectlyToSource()) {
        this.SetValueType(this.GetSource() == null ? null : this.GetSource().constructor);
        this._UpdateValueAndIsBroken(this.GetSource(), this._CheckIsBroken());
    } else {
        var usableSource = this.GetSource();
        var view = null;
        if (this.GetSource() instanceof CollectionViewSource) {
            usableSource = null;
            view = this.GetSource().GetView();
        } else if (this.GetSource().DoesImplement(ICollectionView)) {
            view = this.GetSource();
        }

        if (view == null) {
            this.SetValueType(usableSource == null ? null : usableSource.constructor);
            this._UpdateValueAndIsBroken(usableSource, this._CheckIsBroken());
        } else {
            if (this.GetBindToView()) {
                this.SetValueType(view.constructor);
                this._UpdateValueAndIsBroken(view, this._CheckIsBroken());
            } else {
                this.SetValueType(view.GetCurrentItem() == null ? null : view.GetCurrentItem().constructor);
                this._UpdateValueAndIsBroken(view.GetCurrentItem(), this._CheckIsBroken());
            }
        }
    }
};
_CollectionViewNode.prototype._CheckIsBroken = function () {
    return this.GetSource() == null;
};

_CollectionViewNode.prototype.ConnectViewHandlers = function (source, view) {
    /// <param name="source" type="CollectionViewSource"></param>
    /// <param name="view" type="ICollectionView"></param>
    if (source != null) {
        this._ViewPropertyListener = new PropertyChangedListener(source, source.constructor.ViewProperty, this, this.ViewChanged);
        view = source.GetView();
    }
    if (view != null)
        this._ViewListener = new CurrentChangedListener(view, this, this.ViewCurrentChanged);

};
_CollectionViewNode.prototype.DisconnectViewHandlers = function (onlyView) {
    /// <param name="onlyView" type="Boolean"></param>
    if (onlyView == null)
        onlyView = false;
    if (this._ViewPropertyListener != null && !onlyView) {
        this._ViewPropertyListener.Detach();
        this._ViewPropertyListener = null;
    }
    if (this._ViewListener != null) {
        this._ViewListener.Detach();
        this._ViewListener = null;
    }
};

//#region PROPERTIES

_CollectionViewNode.prototype.GetBindsDirectlyToSource = function () {
    /// <returns type="Boolean" />
    return this._BindsDirectlyToSource;
};
_CollectionViewNode.prototype.SetBindsDirectlyToSource = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._BindsDirectlyToSource = value;
};

_CollectionViewNode.prototype.GetBindToView = function () {
    /// <returns type="Boolean" />
    return this._BindToView;
};
_CollectionViewNode.prototype.SetBindToView = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._BindToView = value;
};

_CollectionViewNode.prototype.GetViewChangedHandler = function () {
    /// <returns type="Function" />
    return this._ViewChangedHandler;
};
_CollectionViewNode.prototype.SetViewChangedHandler = function (value) {
    /// <param name="value" type="Function"></param>
    this._ViewChangedHandler = value;
};

//#endregion

//#endregion