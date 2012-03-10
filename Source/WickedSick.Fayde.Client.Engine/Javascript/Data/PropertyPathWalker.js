/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region _PropertyPathWalker
var _PropertyPathWalker = Nullstone.Create("_PropertyPathWalker", null, 4);

_PropertyPathWalker.Instance.Init = function (path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    if (bindDirectlyToSource == null)
        bindDirectlyToSource = true;
    if (bindsToView == null)
        bindsToView = false;
    if (isDataContextBound == null)
        isDataContextBound = false;

    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();

    //begin

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

_PropertyPathWalker.Instance.GetValue = function (item) {
    this.Update(item);
    var o = this.GetFinalNode().GetValue();
    this.Update(null);
    return o;
};
_PropertyPathWalker.Instance.Update = function (source) {
    this.SetSource(source);
    this.GetNode().SetSource(source);
};

//#region PROPERTIES

_PropertyPathWalker.Instance.GetSource = function () {
    return this._Source;
};
_PropertyPathWalker.Instance.SetSource = function (value) {
    this._Source = value;
};

_PropertyPathWalker.Instance.GetPath = function () {
    /// <returns type="String" />
    return this._Path;
};
_PropertyPathWalker.Instance.SetPath = function (value) {
    /// <param name="value" type="String"></param>
    this._Path = value;
};

_PropertyPathWalker.Instance.GetValueInternal = function () {
    return this._ValueInternal;
};
_PropertyPathWalker.Instance.SetValueInternal = function (value) {
    this._ValueInternal = value;
};

_PropertyPathWalker.Instance.GetIsDataContextBound = function () {
    /// <returns type="Boolean" />
    return this._IsDataContextBound;
};
_PropertyPathWalker.Instance.SetIsDataContextBound = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._IsDataContextBound = value;
};

_PropertyPathWalker.Instance.GetNode = function () {
    /// <returns type="_PropertyPathNode" />
    return this._Node;
};
_PropertyPathWalker.Instance.SetNode = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._Node = value;
};

_PropertyPathWalker.Instance.GetFinalNode = function () {
    /// <returns type="_PropertyPathNode" />
    return this._FinalNode;
};
_PropertyPathWalker.Instance.SetFinalNode = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._FinalNode = value;
};

_PropertyPathWalker.Instance.GetIsPathBroken = function () {
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

Nullstone.FinishCreate(_PropertyPathWalker);
//#endregion