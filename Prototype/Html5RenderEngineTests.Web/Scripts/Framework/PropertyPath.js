/// <reference path="RefObject.js"/>
/// <reference path="NotifyProperty.js"/>
/// CODE
/// <reference path="EventArgs.js"/>
/// <reference path="DependencyObject.js"/>

var _PropertyNodeType = {
    AttachedProperty: 0,
    Property: 1,
    Indexed: 2,
    None: 3
};

//#region _PropertyPath

function _PropertyPath() {
    RefObject.call(this);
}
_PropertyPath.InheritFrom(RefObject);

_PropertyPath.prototype.HasDependencyProperty = function () {
    return this._Propd != null;
};

//#region PROPERTIES

_PropertyPath.prototype.GetDP = function () {
    return this._Propd;
};
_PropertyPath.prototype.GetPath = function () {
    return this._Propd == null ? this._Path : "(0)";
};
_PropertyPath.prototype.GetExpandedPath = function () {
    return this._Propd == null ? this._ExpandedPath : "(0)";
};
_PropertyPath.prototype.GetParsePath = function () {
    if (this._Propd != null)
        return "(0)";
    if (this._ExpandedPath != null)
        return this._ExpandedPath;
    return this._Path;
};

//#endregion

//#endregion

//#region _PropertyPathWalker

function _PropertyPathWalker(path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    RefObject.call(this);
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
_PropertyPathWalker.InheritFrom(RefObject);

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
    this.GetFinalNode().IsBrokenChanged.Subscribe(this, function (s, a) {
        this.SetValue(RefObject.As(s, _PropertyPathNode).GetValue());
        this.IsBrokenChanged.Raise(this, new EventArgs());
    });
    this.GetFinalNode().ValueChanged.Subscribe(this, function (s, a) {
        this.SetValue(RefObject.As(s, _PropertyPathNode).GetValue());
        this.ValueChanged.Raise(this, new EventArgs());
    });
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
    return this._Source;
};
_PropertyPathWalker.prototype.SetSource = function (/* Object */value) {
    this._Source = value;
};

_PropertyPathWalker.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathWalker.prototype.SetPath = function (/* String */value) {
    this._Path = value;
};

_PropertyPathWalker.prototype.GetValue = function () {
    return this._Value;
};
_PropertyPathWalker.prototype.SetValue = function (/* Object */value) {
    this._Value = value;
};

_PropertyPathWalker.prototype.GetIsDataContextBound = function () {
    return this._IsDataContextBound;
};
_PropertyPathWalker.prototype.SetIsDataContextBound = function (/* Boolean */value) {
    this._IsDataContextBound = value;
};

_PropertyPathWalker.prototype.GetNode = function () {
    return this._Node;
};
_PropertyPathWalker.prototype.SetNode = function (/* IPropertyPathNode */value) {
    this._Node = value;
};

_PropertyPathWalker.prototype.GetFinalNode = function () {
    return this._FinalNode;
};
_PropertyPathWalker.prototype.SetFinalNode = function (/* IPropertyPathNode */value) {
    this._FinalNode = value;
};

_PropertyPathWalker.prototype.GetIsPathBroken = function () {
    var path = this._GetPath();
    if (this._GetIsDataContextBound() && (path == null || path.length < 1))
        return false;

    var node = this._GetNode();
    while (node != null) {
        if (node.GetIsBroken())
            return true;
        node = node.GetNext();
    }
    return false;
};

//#endregion

//#endregion

//#region _PropertyPathNode

function _PropertyPathNode() {
    RefObject.call(this);
    this.SetIsBroken(true);
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
}
_PropertyPathNode.InheritFrom(RefObject);

_PropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
};
_PropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
};

_PropertyPathNode.prototype.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode._UpdateValue");
};
_PropertyPathNode.prototype.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.prototype.SetSource = function (/* RefObject */value) {
    if (value == null || !RefObject.RefEquals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }

        this._Source = value;
        if (this._Source && this._Source.DoesImplement(INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.SetListener(listener);
        }

        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this._Value);
    }
};

_PropertyPathNode.prototype._UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this.GetIsBroken() !== isBroken;
    var emitValueChanged = !RefObject.Equals(this.GetValue(), newValue);

    this.SetIsBroken(isBroken);
    this._Value = newValue;

    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.prototype._CheckIsBroken = function () {
    return this.GetSource() == null || (this.GetPropertyInfo() == null && this.GetDependencyProperty() == null);
};

//#region PROPERTIES

_PropertyPathNode.prototype.GetIsBroken = function () {
    return this._IsBroken;
};
_PropertyPathNode.prototype.SetIsBroken = function (/* Boolean */value) {
    this._IsBroken = value;
};

_PropertyPathNode.prototype.GetDependencyProperty = function () {
    return this._DependencyProperty;
};
_PropertyPathNode.prototype.SetDependencyProperty = function (/* DependencyProperty */value) {
    this._DependencyProperty = value;
};

_PropertyPathNode.prototype.GetNext = function () {
    return this._Next;
};
_PropertyPathNode.prototype.SetNext = function (/* _PropertyPathNode */value) {
    this._Next = value;
};

_PropertyPathNode.prototype.GetPropertyInfo = function () {
    return this._PropertyInfo;
};
_PropertyPathNode.prototype.SetPropertyInfo = function (/* PropertyInfo */value) {
    this._PropertyInfo = value;
};

_PropertyPathNode.prototype.GetListener = function () {
    return this._Listener;
};
_PropertyPathNode.prototype.SetListener = function (/* NPCListener */value) {
    this._Listener = value;
};

_PropertyPathNode.prototype.GetSource = function () {
    return this._Source;
};

_PropertyPathNode.prototype.GetValue = function () {
    return this._Value;
};

_PropertyPathNode.prototype.GetValueType = function () {
    return this._ValueType;
};
_PropertyPathNode.prototype.SetValueType = function (value) {
    this._ValueType = value;
};

//#endregion

//#endregion

//#region _StandardPropertyPathNode

function _StandardPropertyPathNode(typeName, propertyName) {
    _PropertyPathNode.call(this);
    this._STypeName = typeName;
    this._PropertyName = propertyName;
}
_StandardPropertyPathNode.InheritFrom(_PropertyPathNode);

_StandardPropertyPathNode.prototype.SetValue = function (value) {
    if (this.GetDependencyProperty() != null)
        this.GetSource().SetValue(this.GetDependencyProperty(), value);
    else if (this.GetPropertyInfo() != null)
        this.GetPropertyInfo().SetValue(this.GetSource(), value, null);
};
_StandardPropertyPathNode.prototype.UpdateValue = function () {
    if (this.GetDependencyProperty() != null) {
        this.SetValueType(this.GetDependencyProperty().GetTargetType());
        this._UpdateValueAndIsBroken(this.GetSource().GetValue(this.GetDependencyProperty()), this._CheckIsBroken());
    } else if (this.GetPropertyInfo() != null) {
        //TODO: this.SetValueType(PropertyInfo.PropertyType);
        this.SetValueType(null);
        try {
            this._UpdateValueAndIsBroken(this.GetPropertyInfo().GetValue(this.GetSource(), null), this._CheckIsBroken());
        } catch (err) {
            this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
        }
    } else {
        this.SetValueType(null);
        this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
    }
};

_StandardPropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
    _PropertyPathNode.prototype.OnSourceChanged.call(this, oldSource, newSource);

    var oldDO = RefObject.As(oldSource, DependencyObject);
    var newDO = RefObject.As(newSource, DependencyObject);
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        this.SetListener(listener);
    }

    this.SetDependencyProperty(null);
    this.SetPropertyInfo(null);
    if (this.GetSource() == null)
        return;

    if (newDO != null) {
        propd = DependencyProperty.GetDependencyProperty(this.GetSource().constructor, this.GetPropertyName());
        if (propd != null) {
            this.SetDependencyProperty(propd);
            listener = new PropertyChangedListener(newDO, propd, this, this.OnPropertyChanged);
            this.SetListener(listener);
        }
    }

    if (this.GetDependencyProperty() == null || !this.GetDependencyProperty()._IsAttached) {
        this.SetPropertyInfo(PropertyInfo.Find(this.GetSource(), this.GetPropertyName()));
    }
};
_StandardPropertyPathNode.prototype.OnPropertyChanged = function (s, e) {
    try {
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this.GetValue());
    } catch (err) {
        //Ignore
    }
};
_StandardPropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
    if (e.PropertyName === this.GetPropertyName() && this.GetPropertyInfo() != null) {
        this.UpdateValue();
        var next = this.GetNext();
        if (next != null)
            next.SetSource(this.GetValue());
    }
};

//#region PROPERTIES

_StandardPropertyPathNode.prototype.GetTypeName = function () {
    return this._STypeName;
};

_StandardPropertyPathNode.prototype.GetPropertyName = function () {
    return this._PropertyName;
};

//#endregion

//#endregion

//#region _IndexedPropertyPathNode

function _IndexedPropertyPathNode(index) {
    _PropertyPathNode.call(this);
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
}
_IndexedPropertyPathNode.InheritFrom(_PropertyPathNode);

_IndexedPropertyPathNode.prototype._CheckIsBroken = function () {
    return this._isBroken || _PropertyPathNode.prototype._CheckIsBroken.call(this);
};
_IndexedPropertyPathNode.prototype.UpdateValue = function () {
    NotImplemented("_IndexedPropertyPathNode.UpdateValue");
};

_IndexedPropertyPathNode.prototype.GetIndex = function () {
    return this._Index;
};
_IndexedPropertyPathNode.prototype.SetIndex = function (value) {
    this._Index = value;
};

//#endregion

//#region _CollectionViewNode

function _CollectionViewNode(bindsDirectlyToSource, bindToView) {
    _PropertyPathNode.call(this);
    this.SetBindsDirectlyToSource(bindsDirectlyToSource === true);
    this.SetBindToView(bindToView === true);
}
_CollectionViewNode.InheritFrom(_PropertyPathNode);

//#region PROPERTIES

_CollectionViewNode.prototype.GetBindsDirectlyToSource = function () {
    return this._BindsDirectlyToSource;
};
_CollectionViewNode.prototype.SetBindsDirectlyToSource = function (/* Boolean */value) {
    this._BindsDirectlyToSource = value;
};

_CollectionViewNode.prototype.GetBindToView = function () {
    return this._BindToView;
};
_CollectionViewNode.prototype.SetBindToView = function (/* Boolean */value) {
    this._BindToView = value;
};

_CollectionViewNode.prototype.GetViewChangedHandler = function () {
    return this._ViewChangedHandler;
};
_CollectionViewNode.prototype.SetViewChangedHandler = function (/* Function */value) {
    this._ViewChangedHandler = value;
};

//#endregion

//#endregion

//#region _PropertyPathParser

function _PropertyPathParser(path) {
    RefObject.call(this);
    this.SetPath(path);
}
_PropertyPathParser.InheritFrom(RefObject);

_PropertyPathParser.prototype.Step = function (data) {
    var type = _PropertyNodeType.None;
    if (this.GetPath().length === 0) {
        data.typeName = null;
        data.propertyName = null;
        data.index = null;
        return type;
    }

    var end;
    if (this.GetPath().charAt(0) === '(') {
        type = _PropertyNodeType.AttachedProperty;
        end = this.GetPath().indexOf(')');
        if (end === -1)
            throw new ArgumentException("Invalid property path. Attached property is missing the closing bracket");

        var splitIndex;
        var tickOpen = this.GetPath().indexOf('\'');
        var tickClose = 0;
        var typeOpen;
        var typeClose;
        var propOpen;
        var propClose;

        typeOpen = this.GetPath().indexOf('\'');
        if (typeOpen > 0) {
            typeOpen++;

            typeClose = this.GetPath().indexOf('\'', typeOpen + 1);
            if (typeClose < 0)
                throw new Exception("Invalid property path, Unclosed type name '" + this.GetPath() + "'.");

            propOpen = this.GetPath().indexOf('.', typeClose);
            if (propOpen < 0)
                throw new Exception("Invalid properth path, No property indexer found '" + this.GetPath() + "'.");

            propOpen++;
        } else {
            typeOpen = 1;
            typeClose = this.GetPath().indexOf('.', typeOpen);
            if (typeClose < 0)
                throw new Exception("Invalid property path, No property indexer found on '" + this.GetPath() + "'.");
            propOpen = typeClose + 1;
        }

        propClose = end;

        data.typeName = this.GetPath().slice(typeOpen, typeClose);
        data.propertyName = this.GetPath().slice(propOpen, propClose);

        data.index = null;
        if (this.GetPath().length > (end + 1) && this.GetPath().charAt(end + 1) === '.')
            end++;
        this.SetPath(this.GetPath().substr(end + 1));
    } else if (this.GetPath().charAt(0) === '[') {
        type = _PropertyNodeType.Indexed;
        end = this.GetPath().indexOf(']');

        data.typeName = null;
        data.propertyName = null;
        data.index = this.GetPath().substr(1, end - 1);
        this.SetPath(this.GetPath().substr(end + 1));
        if (this.GetPath().charAt(0) === '.')
            this.SetPath(this.GetPath().substr(1));
    } else {
        type = _PropertyNodeType.Property;
        end = this.GetPath().indexOfAny(['.', '[']);

        if (end === -1) {
            data.propertyName = this.GetPath();
            this.SetPath("");
        } else {
            data.propertyName = this.GetPath().substr(0, end);
            if (this.GetPath().charAt(end) === '.')
                this.SetPath(this.GetPath().substr(end + 1));
            else
                this.SetPath(this.GetPath().substr(end));
        }

        data.typeName = null;
        data.index = null;
    }

    return type;
};

//#region PROPERTIES

_PropertyPathParser.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathParser.prototype.SetPath = function (/* String */value) {
    this._Path = value;
};

//#endregion

//#endregion