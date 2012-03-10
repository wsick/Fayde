/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region _PropertyPathWalker

function _PropertyPathWalker(path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    if (!Nullstone.IsReady)
        return;
    if (bindDirectlyToSource == null)
        bindDirectlyToSource = true;
    if (bindsToView == null)
        bindsToView = false;
    if (isDataContextBound == null)
        isDataContextBound = false;

    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();

    this._Init(path, bindDirectlyToSource, bindsToView, isDataContextBound);
}
Nullstone.Create(_PropertyPathWalker, "_PropertyPathWalker");

_PropertyPathWalker.prototype._Init = function (path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    this.SetPath(path);
    this.SetIsDataContextBound(isDataContextBound);

    var lastCVNode = null;

    if (!path || path === ".") {
        lastCVNode = new _CollectionViewNode(bindDirectlyToSource, bindsToView);
        this.SetNode(lastCVNode);
        this.SetFinalNode(lastCVNode);
    } else {
        var data = {
            typeName: undefined,
            propertyName: undefined,
            index: undefined
        };
        var type;
        var parser = new _PropertyPathParser(path);
        while ((type = parser.Step(data)) !== _PropertyNodeType.None) {
            var isViewProperty = false;
            var node = new _CollectionViewNode(bindDirectlyToSource, isViewProperty);
            lastCVNode = node;
            switch (type) {
                case _PropertyNodeType.AttachedProperty:
                case _PropertyNodeType.Property:
                    node.SetNext(new _StandardPropertyPathNode(data.typeName, data.propertyName));
                    break;
                case _PropertyNodeType.Indexed:
                    node.SetNext(new _IndexedPropertyPathNode(data.index));
                    break;
                default:
                    break;
            }

            if (this.GetFinalNode() != null)
                this.GetFinalNode().SetNext(node);
            else
                this.SetNode(node);
            this.SetFinalNode(node.GetNext());
        }
    }

    lastCVNode.SetBindToView(lastCVNode.GetBindToView() || bindsToView);
    this.GetFinalNode().IsBrokenChanged.Subscribe(function (s, a) {
        this.SetValueInternal(Nullstone.As(s, _PropertyPathNode).GetValue());
        this.IsBrokenChanged.Raise(this, new EventArgs());
    },
    this);
    this.GetFinalNode().ValueChanged.Subscribe(function (s, a) {
        this.SetValueInternal(Nullstone.As(s, _PropertyPathNode).GetValue());
        this.ValueChanged.Raise(this, new EventArgs());
    },
    this);
};
_PropertyPathWalker.prototype.GetValue = function (item) {
    this.Update(item);
    var o = this.GetFinalNode().GetValue();
    this.Update(null);
    return o;
};
_PropertyPathWalker.prototype.Update = function (source) {
    this.SetSource(source);
    this.GetNode().SetSource(source);
};

//#region PROPERTIES

_PropertyPathWalker.prototype.GetSource = function () {
    /// <returns type="RefObject" />
    return this._Source;
};
_PropertyPathWalker.prototype.SetSource = function (value) {
    /// <param name="value" type="RefObject"></param>
    this._Source = value;
};

_PropertyPathWalker.prototype.GetPath = function () {
    /// <returns type="String" />
    return this._Path;
};
_PropertyPathWalker.prototype.SetPath = function (value) {
    /// <param name="value" type="String"></param>
    this._Path = value;
};

_PropertyPathWalker.prototype.GetValueInternal = function () {
    ///<returns type="RefObject"></returns>
    return this._ValueInternal;
};
_PropertyPathWalker.prototype.SetValueInternal = function (value) {
    ///<param name="value" type="RefObject"></param>
    this._ValueInternal = value;
};

_PropertyPathWalker.prototype.GetIsDataContextBound = function () {
    /// <returns type="Boolean" />
    return this._IsDataContextBound;
};
_PropertyPathWalker.prototype.SetIsDataContextBound = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._IsDataContextBound = value;
};

_PropertyPathWalker.prototype.GetNode = function () {
    /// <returns type="_PropertyPathNode" />
    return this._Node;
};
_PropertyPathWalker.prototype.SetNode = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._Node = value;
};

_PropertyPathWalker.prototype.GetFinalNode = function () {
    /// <returns type="_PropertyPathNode" />
    return this._FinalNode;
};
_PropertyPathWalker.prototype.SetFinalNode = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._FinalNode = value;
};

_PropertyPathWalker.prototype.GetIsPathBroken = function () {
    /// <returns type="Boolean" />
    var path = this.GetPath();
    if (this.GetIsDataContextBound() && (path == null || path.length < 1))
        return false;

    var node = this.GetNode();
    while (node != null) {
        if (node.GetIsBroken())
            return true;
        node = node.GetNext();
    }
    return false;
};

//#endregion

//#endregion