/// <reference path="/Scripts/jquery-1.7.js"/>

var DebugLevel = {
    Info: 0,
    Debug: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4
};

//#region Console

Console.prototype = new Object;
Console.prototype.constructor = Console;
function Console(level) {
    this._Queue = new Array();
    this._Level = level;
}
Console.GetBaseClass = function () { return Object; };

Console.prototype.Init = function (selector) {
    this._TextBox = $(selector);
    if (this._TextBox)
        this._Flush();
};
Console.prototype._Flush = function () {
    var data;
    while (data = this._Dequeue()) {
        this.WriteLineInternal("[PRE] " + data.Message, data.Color);
    }
    this.ScrollToEnd();
}
Console.prototype._Dequeue = function () {
    if (this._Queue.length < 1)
        return null;
    var m = this._Queue[0];
    this._Queue.shift();
    return m;
};
Console.prototype._Enqueue = function (data) {
    this._Queue.push(data);
};
Console.prototype.WriteLine = function (message, color) {
    if (this.WriteLineInternal(message, color)) {
        this.ScrollToEnd();
    }
};
Console.prototype.WriteLineInternal = function (message, color) {
    if (!this._TextBox) {
        this._Enqueue({ Message: message, Color: color });
        return false;
    }

    this._TextBox.append("> ");
    if (color)
        this._TextBox.append("<span style=\"color: " + color + ";\">" + message + "</span>");
    else
        this._TextBox.append(message);
    this._TextBox.append("<br />");
    return true;
};
Console.prototype.ScrollToEnd = function () {
    var offset = this._TextBox.children().last().offset();
    if (!offset)
        return;
    var end = offset.top;
    this._TextBox[0].scrollTop = end;
};
var _Console = new Console(DebugLevel.Info);

//#endregion

//#region HUD

HUD.prototype = new Object;
HUD.prototype.constructor = HUD;
function HUD(jSelector) {
    Object.call(this);
    this._Selector = jSelector;
};
HUD.prototype.SetMessage = function (message) {
    $(this._Selector)[0].innerText = message;
};

var HUDs = new Array();

//#endregion

function AbstractMethod(method) {
    Warn("Abstract Method [" + method + "]");
}

function NotImplemented(method) {
    Warn("Not Implemented [" + method + "]");
}

function Info(message) {
    if (_Console._Level <= DebugLevel.Info)
        _Console.WriteLine("<i>INFO</i>: " + message);
}
function Debug(message) {
    if (_Console._Level <= DebugLevel.Debug)
        _Console.WriteLine("<i>DEBUG</i>: " + message);
}
function Warn(message) {
    if (_Console._Level <= DebugLevel.Warn)
        _Console.WriteLine("<i>WARN</i>: " + message, "#FF6A00");
}
function Error(error) {
    if (_Console._Level <= DebugLevel.Error)
        _Console.WriteLine("<b>ERROR</b>: " + error.toString(), "#0026FF");
}
function Fatal(error) {
    if (_Console._Level <= DebugLevel.Fatal)
        _Console.WriteLine("<b>FATAL</b>: " + error.toString(), "#FF0000");
    App.Instance._Stop();
}

function RegisterHUD(id, jSelector) {
    HUDs[id] = new HUD(jSelector);
};
function HUDUpdate(id, message) {
    var hud = HUDs[id];
    if (!hud)
        return;
    hud.SetMessage(message);
}

Function.prototype.InheritFrom = function (parentType) {
    this.prototype = new parentType;
    this.prototype.constructor = this;
    this.GetBaseClass = function () { return parentType; };
};
Function.prototype.DoesInheritFrom = function (type) {
    return (new this()) instanceof type;
};

//#region RefObject

function RefObject() {
    Object.call(this);
    var id;
    do {
        id = new Date().getTime();
    } while (id === RefObject._LastID);
    RefObject._LastID = this._ID = id;
}
RefObject.InheritFrom(Object);

RefObject.prototype.RefEquals = function (robj) {
    if (robj == null)
        return false;
    if (!(robj instanceof RefObject))
        return false;
    return this._ID === robj._ID;
};
RefObject.As = function (obj, type) {
    if (obj instanceof type)
        return obj;
    return null;
};

///#endregion

/// CODE
/// <reference path="Debug.js"/>

function Validators() {
}
Validators.StyleValidator = function (instance, propd, value, error) {
    NotImplemented("Validators.StyleValidator");
    return true;
};

/// <reference path="RefObject.js"/>

function BError() {
    RefObject.call(this);
    this._Number = 0;
    this.Code = 0;
    this.CharPosition = 0;
    this.LineNumber = 0;
    this.Message = "";
}
BError.InheritFrom(RefObject);

BError.prototype.SetErrored = function (number, message, code) {
    this._Number = number;
    this.Message = message;
    this.Code = code || 0;
};
BError.prototype.IsErrored = function () {
    return this._Number > 0;
};
BError.prototype.toString = function () {
    return "[" + this._Number + "] " + this.Message;
};
BError.UnauthorizedAccess = 1;
BError.Argument = 2;
BError.InvalidOperation = 3;
BError.Exception = 4;

/// <reference path="RefObject.js"/>

//#region DependencyProperty

function DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback) {
    RefObject.call(this);
    this.Name = name;
    this.GetTargetType = getTargetType;
    this.OwnerType = ownerType;
    this.DefaultValue = defaultValue;
    this._AutoCreator = autocreator;
    this._Coercer = coercer;
    this._AlwaysChange = alwaysChange;
    this._Validator = validator;
    this._IsCustom = isCustom;
    this._ChangedCallback = changedCallback;
}
DependencyProperty.InheritFrom(RefObject);

DependencyProperty.prototype.toString = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.OwnerType.toString());
    var ownerTypeName = (results && results.length > 1) ? results[1] : "";
    return ownerTypeName + "." + this.Name.toString();
};
DependencyProperty.prototype._HasDefaultValue = function () {
    return this.DefaultValue != null;
};
DependencyProperty.prototype._IsAutoCreated = function () {
    return this._AutoCreator != undefined && this._AutoCreator != null;
};
DependencyProperty.prototype._GetAutoCreatedValue = function (obj) {
    return this._AutoCreator.GetValue(this, obj);
};
DependencyProperty.prototype._HasCoercer = function () {
    return this._Coercer != null;
};
DependencyProperty.prototype._Coerce = function (instance, value, error) {
    if (!this._Coercer)
        return value;
    return this._Coercer.GetValue(instance, this, value, error);
};
DependencyProperty.prototype._Validate = function (instance, propd, value, error) {
    if (!this._Validator)
        return true;
    return this._Validator(instance, propd, value, error);
};

DependencyProperty.Register = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, true, changedCallback);
};
DependencyProperty.RegisterFull = function (name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback);
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}
DependencyProperty.RegisterAttached = function (name, getTargetType, ownerType, defaultValue) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue);
    propd._IsAttached = true;
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}
DependencyProperty.GetDependencyProperty = function (ownerType, name) {
    var reg = DependencyProperty._Registered;
    if (!reg)
        return null;
    var reg = reg[ownerType];
    var propd;
    if (reg)
        propd = reg[name];
    if (!propd && ownerType !== RefObject) {
        propd = DependencyProperty.GetDependencyProperty(ownerType.GetBaseClass(), name);
    }
    return propd;
};

//#endregion

//#region UnsetValue

function UnsetValue() {
    RefObject.call(this);
}
UnsetValue.InheritFrom(RefObject);

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="List.js"/>

function _DirtyList() {
    RefObject.call(this);
    this._DirtyNodes = new List();
}
_DirtyList.InheritFrom(RefObject);

_DirtyList.prototype.AddDirtyNode = function (node) {
    this._DirtyNodes.Append(node);
};
_DirtyList.prototype.RemoveDirtyNode = function (node) {
    if (!this._DirtyNodes)
        return;
    this._DirtyNodes.Remove(node);
};
_DirtyList.prototype.GetFirst = function () {
    return this._DirtyNodes.First();
};
_DirtyList.prototype.IsEmpty = function () {
    return this._DirtyNodes.IsEmpty();
};
_DirtyList.prototype.Clear = function () {
    this._DirtyNodes.Clear();
};

var _Dirty = {
    Transform: 1 << 0,
    LocalTransform: 1 << 1,
    LocalProjection: 1 << 2,
    Clip: 1 << 3,
    LocalClip: 1 << 4,
    RenderVisibility: 1 << 5,
    HitTestVisibility: 1 << 6,
    Measure: 1 << 7,
    Arrange: 1 << 8,
    ChildrenZIndices: 1 << 9,
    Bounds: 1 << 20,
    NewBounds: 1 << 21,
    Invalidate: 1 << 22,
    InUpDirtyList: 1 << 30,
    InUpDirtyList: 1 << 31
};
_Dirty.DownDirtyState =
    _Dirty.Transform |
    _Dirty.LocalTransform |
    _Dirty.LocalProjection |
    _Dirty.Clip |
    _Dirty.LocalClip |
    _Dirty.RenderVisibility |
    _Dirty.HitTestVisibility |
    _Dirty.ChildrenZIndices;
_Dirty.UpDirtyState = _Dirty.Bounds | _Dirty.Invalidate;
_Dirty.State = _Dirty.DownDirtyState | _Dirty.UpDirtyState;

/// <reference path="RefObject.js"/>

//#region EventArgs

function EventArgs() {
    RefObject.call(this);
}
EventArgs.InheritFrom(RefObject);

//#endregion

//#region MouseEventArgs

function MouseEventArgs(absolutePos) {
    EventArgs.call(this);
    this._AbsolutePosition = absolutePos;
}
MouseEventArgs.InheritFrom(EventArgs);

MouseEventArgs.prototype.GetPosition = function (/* UIElement */relativeTo) {
    if (relativeTo._IsAttached)
        "".toString(); //TODO: ProcessDirtyElements on surface
    var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
    relativeTo._TransformPoint(p);
    return p;
};

//#endregion

//#region MouseButtonEventArgs

function MouseButtonEventArgs(absolutePos) {
    MouseEventArgs.call(this, absolutePos);
}
MouseButtonEventArgs.InheritFrom(MouseEventArgs);

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="ContentControl.js"/>

var BindingMode = {
    TwoWay: 0,
    OneWay: 1,
    OneTime: 2,
    OneWayToSource: 3
};

//#region Expression

function Expression() {
    RefObject.call(this);
}
Expression.InheritFrom(RefObject);

Expression.prototype.GetValue = function (propd) {
    AbstractMethod("_Expression.GetValue");
};
Expression.prototype._OnAttached = function (element) {
    this._Attached = true;
};
Expression.prototype._OnDetached = function (element) {
    this._Attached = false;
};

//#endregion

//#region BindingExpressionBase

function BindingExpressionBase() {
    Expression.call(this);
}
BindingExpressionBase.InheritFrom(Expression);

//#endregion

//#region TemplateBindingExpression

function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
}
TemplateBindingExpression.InheritFrom(Expression);

TemplateBindingExpression.prototype.GetValue = function (propd) {
    var source = this.Target._TemplateOwner;
    var value = null;
    if (source != null)
        value = source.GetValue(this.SourceProperty);
    return value; //TODO: Send through IValueConverter
};
TemplateBindingExpression.prototype._OnAttached = function (element) {
    Expression.prototype._OnAttached.call(this, element);

    this.Target = element;
    if (this._Listener != null) {
        this._Listener.Detach();
        this._Listener = null;
    }

    var c;
    if (this.Target instanceof ContentControl)
        c = this.Target;

    if (this.TargetProperty === ContentControl.ContentProperty && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }

//    var source = this.Target._TemplateOwner;
//    if (source != null)
//        this._Listener = new WeakPropertyChangedListener(source, this.SourceProperty, this);
};
TemplateBindingExpression.prototype._OnDetached = function (element) {
    Expression.prototype._OnDetached.call(this, element);

    if (this._Listener == null)
        return;

    var c;
    if (this.Target instanceof ContentControl)
        c = this.Target;
    if (c != null)
        c._ContentSetsParent = this.SetsParent;

    this._Listener.Detach();
    this._Listener = null;
    this.Target = null;
};

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Collection.js"/>
/// <reference path="Expression.js"/>

//#region JsonParser

function JsonParser() {
    RefObject.call(this);
}
JsonParser.InheritFrom(RefObject);

JsonParser.prototype.CreateObject = function (json, namescope) {
    var dobj = new json.Type();
    dobj._TemplateOwner = this._TemplateBindingSource;
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);

    var propd;
    var propValue;
    if (json.Props) {
        for (var propName in json.Props) {
            propValue = json.Props[propName];
            if (propValue == undefined)
                continue;

            var propd = dobj.GetDependencyProperty(propName);
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, false);
        }
    }

    if (json.AttachedProps) {
        for (var i in json.AttachedProps) {
            var attachedDef = json.AttachedProps[i];
            //TODO: Namespace Prefixes?
            propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
            propValue = attachedDef.Value;
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, true);
        }
    }

    var contentPropd = this.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd instanceof DependencyProperty) {
        if (json.Children) {
            this.TrySetCollectionProperty(json.Children, dobj, contentPropd, namescope);
        } else if (json.Content) {
            dobj.SetValue(contentPropd, this.CreateObject(json.Content, namescope));
        }
    } else if (contentPropd instanceof String) {
        var setFunc = dobj["Set" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope));
        }
    }
    return dobj;
};

JsonParser.prototype.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached) {
    //If the object is not a RefObject, let's parse it
    if (!(propValue instanceof RefObject) && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }

    //Set property value
    if (propd) {
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;
        if (this.TrySetTemplateBindingProperty(dobj, propValue, propd))
            return;
        dobj.SetValue(propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propd.Name];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        //There is no fallback if we can't find attached property
        Warn("Could not find attached property: " + attachedDef.Prop);
    }
};
JsonParser.prototype.TrySetCollectionProperty = function (subJson, dobj, propd, namescope) {
    var targetType = propd.GetTargetType();
    if (!targetType.DoesInheritFrom(Collection))
        return false;
    if (!(subJson instanceof Array))
        return false;

    var coll;
    if (propd._IsAutoCreated()) {
        coll = dobj.GetValue(propd);
    } else {
        coll = new targetType();
        dobj.SetValue(propd, coll);
    }

    for (var i in subJson) {
        coll.Add(this.CreateObject(subJson[i], namescope));
    }

    return true;
};
JsonParser.prototype.TrySetTemplateBindingProperty = function (dobj, propValue, propd) {
    if (!(propValue instanceof TemplateBinding))
        return false;
    var sourcePropd = DependencyProperty.GetDependencyProperty(this._TemplateBindingSource.constructor, propValue.Path);
    propValue = new TemplateBindingExpression(sourcePropd, propd);
    dobj.SetValue(propd, propValue);
    return true;
};

JsonParser.prototype.GetAnnotationMember = function (type, member) {
    if (type === RefObject)
        return null;
    if (type.Annotations == null)
        return this.GetAnnotationMember(type.GetBaseClass(), member);
    var annotation = type.Annotations[member];
    if (annotation == null)
        return this.GetAnnotationMember(type.GetBaseClass(), member);
    return annotation;
};

JsonParser.CreateSetter = function (dobj, propName, value) {
    var setter = new Setter();
    var propd = dobj.GetDependencyProperty(propName);
    setter.SetProperty(propd);
    setter.SetValue_Prop(value);
    return setter;
};

//#endregion

//#region TemplateBinding

function TemplateBinding(path) {
    RefObject.call(this);
    this.Path = path;
}
TemplateBinding.InheritFrom(RefObject);

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Primitives.js"/>

//#region List

function List() {
    RefObject.call(this);
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
}
List.InheritFrom(RefObject);

List.prototype.First = function () {
    return this._Head;
};
List.prototype.Last = function () {
    return this._Tail;
};
List.prototype.IsEmpty = function () {
    return !this._Head;
};
List.prototype.Prepend = function (node) {
    node.Next = this._Head;
    node.Previous = null;
    if (this._Head)
        this._Head.Previous = node;
    else
        this._Tail = node;
    this._Head = node;
    this._Count++;
    return node;
};
List.prototype.Append = function (node) {
    node.Previous = this._Tail;
    node.Next = null;
    if (this._Tail)
        this._Tail.Next = node;
    else
        this._Head = node;
    this._Tail = node;
    this._Count++;
    return node;
};
List.prototype.Remove = function (node) {
    if (node.Previous)
        node.Previous.Next = node.Next;
    else
        this._Head = node.Next;

    if (node.Next)
        node.Next.Previous = node.Previous;
    else
        this._Tail = node.Previous;

    node.Previous = null;
    node.Next = null;

    this._Count--;
};
List.prototype.InsertBefore = function (node, before) {
    if (before == null) {
        this.Append(node);
        return;
    }

    node.Next = before;
    node.Previous = before.Previous;

    if (before.Previous)
        before.Previous.Next = node;
    else
        this._Head = node;

    before.Previous = node;
    this._Count++;
};
List.prototype.Clear = function () {
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
};

//#endregion

//#region Node

function Node() {
    RefObject.call(this);
    this.Previous = null;
    this.Next = null;
}
Node.InheritFrom(RefObject);

//#endregion

//#region UIElementNode

function UIElementNode(/* UIElement */element) {
    Node.call(this);
    this.UIElement = element;
}
UIElementNode.InheritFrom(Node);

//#endregion

//#region DirtyNode

function DirtyNode(/* UIElement */element) {
    Node.call(this);
    this.Element = element;
}
DirtyNode.InheritFrom(Node);

//#endregion

//#region Dictionary

function Dictionary() {
    RefObject.call(this);
    this._ht = new Array();
}
Dictionary.InheritFrom(RefObject);

Dictionary.prototype.TryGetValue = function (key, refParam) {
    refParam.Value = this._ht[key];
    return refParam.Value != null;
};
Dictionary.prototype.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.prototype.Remove = function (key) {
    delete this._ht[key];
};

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Debug.js"/>

//#region MulticastEvent

function MulticastEvent() {
    RefObject.call(this);
    this._Listeners = new Array();
}
MulticastEvent.InheritFrom(RefObject);

MulticastEvent.prototype.Subscribe = function (callback, closure) {
    this._Listeners.push({ Callback: callback, Closure: closure });
};
MulticastEvent.prototype.SubscribeSpecific = function (callback, closure, matchFunc, matchClosure) {
    this._Listeners.push({ Callback: callback, Closure: closure, MatchFunc: matchFunc, MatchClosure: matchClosure });
};
MulticastEvent.prototype.Unsubscribe = function (callback, closure, matchClosure) {
    for (var i in this._Listeners) {
        var listener = this._Listeners[i];
        if (listener.Callback === callback) {
            if (listener.MatchClosure && matchClosure && listener.MatchClosure != matchClosure)
                continue;
            this._Listeners.splice(i, 1);
            return;
        }
    }
};
MulticastEvent.prototype.Raise = function (sender, args) {
    var listeners = this._Listeners;
    for (var i in listeners) {
        var listener = listeners[i];
        if (listener.MatchFunc && !listener.MatchFunc.call(listener.MatchClosure, sender, args))
            continue;
        listener.Callback.call(listener.Closure, sender, args);
    }
};
MulticastEvent.prototype.RaiseAsync = function (sender, args) {
    var me = this;
    setTimeout(function () { me.Raise(sender, args); }, 1);
};

//#endregion

/// <reference path="RefObject.js"/>

var Visibility = {
    Visible: 0,
    Collapsed: 1
};

var HorizontalAlignment = {
    Left: 0,
    Center: 1,
    Right: 2,
    Stretch: 3
};

var VerticalAlignment = {
    Top: 0,
    Center: 1,
    Bottom: 2,
    Stretch: 3
};

var Orientation = {
    Vertical: "Vertical",
    Horizontal: "Horizontal"
};

var TextAlignment = {
    Left: 0,
    Center: 1,
    Right: 2
};

var TextTrimming = {
    None: 0
};

var TextWrapping = {
    NoWrap: 0,
    Wrap: 1,
    WrapWithOverflow: 2
};

var TextDecorations = {
    None: 0,
    Underline: 1
};

var FlowDirection = {
    LeftToRight: 0,
    RightToLeft: 1
};

var LineStackingStrategy = {
    MaxHeight: 0,
    BlockLineHeight: 1
};

var FontWeights = {
    Normal: "normal",
    Bold: "bold",
    Bolder: "bolder",
    Lighter: "lighter"
};

var FontStyles = {
    Normal: "normal",
    Italic: "italic",
    Oblique: "oblique"
};

var FontStretches = {
    UltraCondensed: "ultra-condensed",
    ExtraCondensed: "extra-condensed",
    Condensed: "condensed",
    SemiCondensed: "semi-condensed",
    Normal: "normal",
    SemiExpanded: "semi-expanded",
    Expanded: "expanded",
    ExtraExpanded: "extra-expanded",
    UltraExpanded: "ultra-expanded"
};

var ScrollBarVisibility = {
    Auto: 0,
    Disabled: 1,
    Hidden: 2,
    Visible: 3
};

var ClickMode = {
    Release: 0,
    Press: 1,
    Hover: 2
};

var CursorType = {
    Default: ""
    //TODO: Add cursor types
};

function IsOpacityInvisible(opacity) {
    return opacity <= 0.0;
}

//#region RefParam

function RefParam(v) {
    RefObject.call(this);
    this.Value = v;
}
RefParam.InheritFrom(RefObject);

//#endregion

//#region CornerRadius

function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
    RefObject.call(this);
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
}
CornerRadius.InheritFrom(RefObject);

CornerRadius.prototype.IsZero = function () {
    return this.TopLeft === 0
        && this.TopRight === 0
        && this.BottomRight === 0
        && this.BottomLeft === 0;
};

//#endregion

//#region Thickness

function Thickness(left, top, right, bottom) {
    RefObject.call(this);
    this.Left = left == null ? 0 : left;
    this.Top = top == null ? 0 : top;
    this.Right = right == null ? 0 : right;
    this.Bottom = bottom == null ? 0 : bottom;
}
Thickness.InheritFrom(RefObject);

Thickness.prototype.Plus = function (thickness2) {
    var t = new Thickness();
    t.Left = this.Left + thickness2.Left;
    t.Right = this.Right + thickness2.Right;
    t.Top = this.Top + thickness2.Top;
    t.Bottom = this.Bottom + thickness2.Bottom;
    return t;
};
Thickness.prototype.Half = function () {
    var t = new Thickness();
    t.Left = this.Left / 2;
    t.Top = this.Top / 2;
    t.Right = this.Right / 2;
    t.Bottom = this.Bottom / 2;
    return t;
};
Thickness.prototype.Negate = function () {
    var t = new Thickness();
    t.Left = -this.Left;
    t.Right = -this.Right;
    t.Top = -this.Top;
    t.Bottom = -this.Bottom;
    return t;
};
Thickness.prototype.IsEmpty = function () {
    return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
};

//#endregion

//#region Point

function Point(x, y) {
    RefObject.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
Point.InheritFrom(RefObject);

Point.prototype.Apply = function (matrix) {
    return matrix.Multiply(this);
};
Point.prototype.toString = function () {
    return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
};

//#endregion

//#region Size

function Size(width, height) {
    RefObject.call(this);
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
Size.InheritFrom(RefObject);

Size.prototype.GrowBy = function (width, height) {
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h += height;
    if (w != Number.POSITIVE_INFINITY)
        w += width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.prototype.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left + thickness.Right, thickness.Top + thickness.Bottom);
};
Size.prototype.Min = function (size2) {
    return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
};
Size.prototype.Max = function (size2) {
    return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
};
Size.prototype.Equals = function (size2) {
    return this.Width == size2.Width && this.Height == size2.Height;
};
Size.prototype.toString = function () {
    return "[Width = " + this.Width + "; Height = " + this.Height + "]";
};

//#endregion

//#region Rect

function Rect(x, y, width, height) {
    RefObject.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
Rect.InheritFrom(RefObject);

Rect.prototype.IsEmpty = function () {
    return this.Width <= 0.0 || this.Height <= 0.0;
};
Rect.prototype.GrowBy = function (left, top, right, bottom) {
    var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.prototype.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left, thickness.Top, thickness.Right, thickness.Bottom);
};
Rect.prototype.Union = function (rect2) {
    if (this.IsEmpty())
        return new Rect(rect2.X, rect2.Y, rect2.Width, rect2.Height);
    if (rect2.Width <= 0 || rect2.Height <= 0)
        return new Rect(this.X, this.Y, this.Width, this.Height);

    var result = new Rect(0, 0, 0, 0);
    result.X = Math.min(this.X, rect2.X);
    result.Y = Math.min(this.Y, rect2.Y);
    result.Width = Math.max(this.X + this.Width, rect2.X + rect2.Width) - result.X;
    result.Height = Math.max(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y;
    return result;
};
Rect.prototype.Intersection = function (rect2) {
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.max(this.X, rect2.X);
    result.Y = Math.max(this.Y, rect2.Y);
    result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
    result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
    return result;
};
Rect.prototype.RoundOut = function () {
    return new Rect(Math.floor(this.X), Math.floor(this.Y), Math.ceil(this.X + this.Width) - Math.floor(this.X), Math.ceil(this.Y + this.Height) - Math.floor(this.Y));
}
Rect.prototype.RoundIn = function () {
    return new Rect(Math.ceil(this.X), Math.ceil(this.Y), Math.floor(this.X + this.Width) - Math.ceil(this.X), Math.floor(this.Y + this.Height) - Math.ceil(this.Y));
}
Rect.Equals = function (rect1, rect2) {
    if (rect1 == null && rect2 == null)
        return true;
    if (rect1 == null || rect2 == null)
        return false;
    return rect1.X == rect2.X && rect1.Y == rect2.Y && rect1.Width == rect2.Width && rect1.Height == rect2.Height;
};

//#endregion

//#region Clip

function Clip(rect) {
    Rect.call(this);
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
}
Clip.InheritFrom(Rect);

//#endregion

//#region Color

function Color(r, g, b, a) {
    RefObject.call(this);
    this.R = r == null ? 255 : r;
    this.G = g == null ? 255 : g;
    this.B = b == null ? 255 : b;
    this.A = a == null ? 1.0 : a;
}
Color.InheritFrom(RefObject);

Color.__NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
Color.__AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;

Color.FromHex = function (hex) {
    var match;
    var r;
    var g;
    var b;
    var a;
    if ((match = Color.__AlphaRegex.exec(hex)) != null) {
        a = parseInt(match[1], 16) / 255.0;
        r = parseInt(match[2], 16);
        g = parseInt(match[3], 16);
        b = parseInt(match[4], 16);
    } else if ((match = Color.__NoAlphaRegex.exec(hex)) != null) {
        a = 1.0;
        r = parseInt(match[1], 16);
        g = parseInt(match[2], 16);
        b = parseInt(match[3], 16);
    }
    return new Color(r, g, b, a);
};

Color.prototype._Translate = function () {
    return this.toString();
};

Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};

//#endregion

//#region Matrix

function Matrix() {
    RefObject.call(this);
    this._Elements = Matrix.CreateIdentityArray();
}
Matrix.InheritFrom(RefObject);

Matrix.prototype.GetElements = function () {
    return this._Elements;
};
Matrix.prototype.SetElement = function (i, j, value) {
    this._Elements[i][j] = value;
};
Matrix.prototype.Apply = function (ctx) {
    var elements = this.GetElements();
    ctx.transform(elements[0][0], elements[1][0], elements[0][1], elements[1][1], elements[0][2], elements[1][2]);
};
Matrix.prototype.Multiply = function (val) {
    var arr1 = this.GetElements();
    if (val instanceof Point) {
        var result = new Point();
        val = [[val.X], [val.Y], [1]];
        for (var i = 0; i < 3; i++) {
            result.X += arr1[0][i] * val[i][0];
            result.Y += arr1[1][i] * val[i][0];
        }
        return result;
    }
    if (val instanceof Matrix) {
        var result = new Matrix();
        var arr2 = val.GetElements();
        for (var i = 0; i < arr1.length; i++) {
            result[i] = new Array();
            for (var j = 0; j < arr2.length; j++) {
                var temp = 0;
                for (var k = 0; k < arr2[j].length; k++) {
                    temp += arr1[i][k] * arr2[k][j];
                }
                result.SetElement(i, j, temp);
            }
        }
        return result;
    }
    NotImplemented("Matrix.Multiply");
};
Matrix.prototype.Copy = function () {
    var m = new Matrix();
    var els = this.GetElements();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            m.SetElement(i, j, els[i][j]);
        }
    }
    return m;
};
Matrix.prototype.toString = function () {
    var t = new String();
    t += "[\n";
    var arr = this.GetElements();
    for (var i = 0; i < arr.length; i++) {
        t += "[";
        for (var j = 0; j < arr[i].length; j++) {
            t += arr[i][j].toString();
            t += ",";
        }
        t = t.substr(0, t.length - 1)
        t += "],\n";
    }
    t = t.substr(0, t.length - 2);
    t += "\n]";
    return t;
};
Matrix.CreateIdentityArray = function () {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
};

//#endregion

//#region TranslationMatrix

function TranslationMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
TranslationMatrix.InheritFrom(Matrix);

TranslationMatrix.prototype.GetElements = function () {
    return [
        [1, 0, this.X],
        [0, 1, this.Y],
        [0, 0, 1]
    ];
};
TranslationMatrix.prototype.GetInverse = function () {
    return new TranslationMatrix(-this.X, -this.Y);
};
TranslationMatrix.prototype.Apply = function (ctx) {
    ctx.translate(this.X, this.Y);
};

//#endregion

//#region RotationMatrix

RotationMatrix.prototype = new Matrix;
RotationMatrix.prototype.constructor = RotationMatrix;
function RotationMatrix(angleRad) {
    Matrix.call(this);
    this.Angle = angleRad == null ? 0 : angleRad;
}
RotationMatrix.GetBaseClass = function () { return Matrix; };

RotationMatrix.prototype.GetElements = function () {
    return [
        [Math.cos(this.Angle), -1 * Math.sin(this.Angle), 0],
        [Math.sin(this.Angle), Math.cos(this.Angle), 0],
        [0, 0, 1]
    ];
};
RotationMatrix.prototype.GetInverse = function () {
    return new RotationMatrix(-this.Angle);
};
RotationMatrix.prototype.Apply = function (ctx) {
    ctx.rotate(this.Angle);
};

//#endregion

//#region ScalingMatrix

function ScalingMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 1 : x;
    this.Y = y == null ? 1 : y;
}
ScalingMatrix.InheritFrom(Matrix);

ScalingMatrix.prototype.GetElements = function () {
    return [
        [this.X, 0, 0],
        [0, this.Y, 0],
        [0, 0, 1]
    ];
};
ScalingMatrix.prototype.GetInverse = function () {
    return new ScalingMatrix(-this.X, -this.Y);
};
ScalingMatrix.prototype.Apply = function (ctx) {
    ctx.scale(this.X, this.Y);
};

//#endregion

//#region ShearingMatrix

function ShearingMatrix(shearX, shearY) {
    Matrix.call(this);
    this.ShearX = shearX == null ? 0 : shearX;
    this.ShearY = shearY == null ? 0 : shearY;
}
ShearingMatrix.InheritFrom(Matrix);

ShearingMatrix.prototype.GetElements = function () {
    return [
        [1, this.ShearX, 0],
        [this.ShearY, 1, 0],
        [0, 0, 1]
    ];
};
ShearingMatrix.prototype.GetInverse = function () {
    return new ShearingMatrix(-this.ShearX, -this.ShearY);
};
ShearingMatrix.prototype.Apply = function () {
    NotImplemented("ShearingMatrix.Apply");
};

//#endregion

//#region Font

function Font() {
    RefObject.call(this);
    this._Family = Font.DEFAULT_FAMILY;
    this._Stretch = Font.DEFAULT_STRETCH;
    this._Style = Font.DEFAULT_STYLE;
    this._Weight = Font.DEFAULT_WEIGHT;
    this._Size = Font.DEFAULT_SIZE;
}
Font.InheritFrom(RefObject);

Font.prototype.GetFamily = function () {
    return this._Family;
};
Font.prototype.SetFamily = function (value) {
    if (this._Family == value)
        return false;
    this._Family = value;
    return true;
};

Font.prototype.GetStretch = function () {
    return this._Stretch;
};
Font.prototype.SetStretch = function (value) {
    if (this._Stretch == value)
        return false;
    this._Stretch = value;
    return true;
};

Font.prototype.GetStyle = function () {
    return this._Style;
};
Font.prototype.SetStyle = function (value) {
    if (this._Style == value)
        return false;
    this._Style = value;
    return true;
};

Font.prototype.GetWeight = function () {
    return this._Weight;
};
Font.prototype.SetWeight = function (value) {
    if (this._Weight == value)
        return false;
    this._Weight = value;
    return true;
};

Font.prototype.GetSize = function () {
    return this._Size;
};
Font.prototype.SetSize = function (value) {
    if (this._Size == value)
        return false;
    this._Size = value;
    return true;
};

Font.prototype.GetActualHeight = function () {
    NotImplemented("Font.GetActualHeight");
};

Font.prototype._Descender = function () { return 0.0; }; //most likely removable
Font.prototype._Ascender = function () { return 0.0; }; //most likely removable
Font.prototype._Height = function () {
    return Surface.MeasureText("M", this).Height;
};

Font.prototype._Translate = function () {
    var s = "";
    var style = this.GetStyle();
    var weight = this.GetWeight();
    if (style && style !== FontStyles.Normal)
        s += style.toString() + " ";
    if (weight && weight !== FontWeights.Normal)
        s += weight.toString() + " ";
    s += this.GetSize() + " ";
    s += this.GetFamily() + " ";
    return s;
};

Font.DEFAULT_FAMILY = "Calibri";
Font.DEFAULT_STRETCH = FontStretches.Normal;
Font.DEFAULT_STYLE = FontStyles.Normal;
Font.DEFAULT_WEIGHT = FontWeights.Normal;
Font.DEFAULT_SIZE = "12px";

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyObject.js" />
/// <reference path="Collections.js" />
/// <reference path="FrameworkElement.js"/>
/// <reference path="Control.js"/>
/// <reference path="TextElement.js"/>
/// <reference path="TextBlock.js"/>
/// <reference path="BError.js"/>

function Control() { };
function TextBlock() { };
function TextElement() { };
function Run() { };
function Image() { };
function MediaElement() { };
function Popup() { };

var _PropertyPrecedence = {
    IsEnabled: 0,
    LocalValue: 1,
    DynamicValue: 2,

    LocalStyle: 3,
    ImplicitStyle: 4,

    Inherited: 5,
    InheritedDataContext: 6,
    DefaultValue: 7,
    AutoCreate: 8
};
_PropertyPrecedence.Highest = _PropertyPrecedence.IsEnabled;
_PropertyPrecedence.Lowest = _PropertyPrecedence.AutoCreate;
_PropertyPrecedence.Count = 9;

var _ProviderFlags = {
    RecomputesOnLowerPriorityChange: 1,
    RecomputesOnHigherPriorityChange: 2,
    RecomputesOnClear: 4,
    ProvidesLocalValue: 8
};

//#region _PropertyValueProvider

function _PropertyValueProvider(obj, propPrecedence, flags) {
    RefObject.call(this);
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
}
_PropertyValueProvider.InheritFrom(RefObject);

_PropertyValueProvider.prototype._HasFlag = function (flag) {
    return (this._Flags & flag) != 0;
};
_PropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.prototype.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(value, this._ht[value], data);
};
_PropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
};

//#endregion

//#region _InheritedIsEnabledPropertyValueProvider

function _InheritedIsEnabledPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._Source = null;
    this._CurrentValue = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
}
_InheritedIsEnabledPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedIsEnabledPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == Control.IsEnabledProperty)
        return this._CurrentValue;
    return null;
};
_InheritedIsEnabledPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (source) {
        while (source) {
            if (source instanceof Control)
                break;
            else if (source instanceof FrameworkElement)
                source = source._GetLogicalParent();
            else
                source = null;
        }
    }

    if (this._Source != source) {
        this._DetachListener(this._Source);
        this._Source = source;
        this._AttachListener(this._Source);
    }

    if (!source || this._Object.IsAttached())
        this.LocalValueChanged(null);
};
_InheritedIsEnabledPropertyValueProvider.prototype._AttachListener = function (obj) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this == args.Property; //Closure - Control.IsEnabledProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Control.IsEnabledProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Control.IsEnabledProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._IsEnabledChanged = function (sender, args) {
    this.LocalValueChanged(args.Property);
};
_InheritedIsEnabledPropertyValueProvider.prototype.LocalValueChanged = function (propd) {
    if (propd && propd != Control.IsEnabledProperty)
        return false;

    var localEnabled = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
    var parentEnabled = this._Source && this._Object.GetVisualParent() ? this._Source.GetValue(Control.IsEnabledProperty) : null;
    var newValue = localEnabled == true && (parentEnabled == null || parentEnabled == true);
    if (newValue != this._CurrentValue) {
        var oldValue = this._CurrentValue;
        this._CurrentValue = newValue;

        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
        return true;
    }
    return false;
};

//#endregion

//#region _LocalPropertyValueProvider

function _LocalPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_LocalPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalPropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalPropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion

//#region _StylePropertyValueProvider

function _StylePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._ht = new Array();
}
_StylePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_StylePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_StylePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, reason, error) {
    if ((reason & _ProviderFlags.RecomputesOnClear) == 0)
        return;

    var oldValue = undefined;
    var newValue = undefined;
    var propd = null;

    var walker = new _DeepStyleWalker(this._Style);
    var setter;
    while (setter = walker.Step()) {
        propd = setter.GetValue(Setter.PropertyProperty);
        if (propd != prop)
            continue;

        newValue = setter.GetValue(Setter.ConvertedValueProperty);
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_StylePropertyValueProvider.prototype._UpdateStyle = function (style, error) {
    var oldValue = undefined;
    var newValue = undefined;

    var oldWalker = new _DeepStyleWalker(this._Style);
    var newWalker = new _DeepStyleWalker(style);

    var oldSetter = oldWalker.Step();
    var newSetter = newWalker.Step();
    var oldProp;
    var newProp;

    while (oldSetter || newSetter) {
        if (oldSetter)
            oldProp = oldSetter.GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.GetValue(Setter.PropertyProperty);
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            //Property in old style, not in new style
            oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        } else if (oldProp == newProp) {
            //Property in both styles
            oldValue = oldSetter.GetValue(Setter.ConvertedValueProperty);
            newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            //Property in new style, not in old style
            oldValue = null;
            newValue = newSetter.GetValue(Setter.ConvertedValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }

    this._Style = style;
};

//#endregion

//#region _ImplicitStylePropertyValueProvider

var _StyleIndex = {
    VisualTree: 0,
    ApplicationResources: 1,
    GenericXaml: 2,
    Count: 3
};
var _StyleMask = {
    VisualTree: 1 << _StyleIndex.VisualTree,
    ApplicationResources: 1 << _StyleIndex.ApplicationResources,
    GenericXaml: 1 << _StyleIndex.GenericXaml
};
_StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
_StyleMask.None = 0;

function _ImplicitStylePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._Styles = null;
    this._StyleMask = _StyleMask.None;
    this._ht = new Array();
}
_ImplicitStylePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_ImplicitStylePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_ImplicitStylePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;

    if (!this._Styles)
        return;

    var oldValue = undefined;
    var newValue = null;
    var propd = null;

    var walker = new _DeepStyleWalker(this._Styles);
    var setter;
    while (setter = walker.Step()) {
        propd = setter.GetValue(Setter.PropertyProperty);
        if (propd != propd)
            continue;

        newValue = setter.GetValue(Setter.ValueProperty); //DIV: ConvertedValueProperty
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_ImplicitStylePropertyValueProvider.prototype._ApplyStyles = function (styleMask, styles, error) {
    var isChanged = !this._Styles || styleMask != this._StyleMask;
    if (!isChanged) {
        for (var i = 0; i < _StyleIndex.Count; i++) {
            if (styles[i] != this._Styles[i]) {
                isChanged = true;
                break;
            }
        }
    }
    if (!isChanged)
        return;

    var oldValue = undefined;
    var newValue = undefined;

    var oldWalker = new _DeepStyleWalker(this._Styles);
    var newWalker = new _DeepStyleWalker(styles);

    var oldSetter = oldWalker.Step();
    var newSetter = newWalker.Step();

    while (oldSetter || newSetter) {
        var oldProp;
        var newProp;
        if (oldSetter)
            oldProp = oldSetter.GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.GetValue(Setter.PropertyProperty);

        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            //Property in old style, not in new style
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        }
        else if (oldProp == newProp) {
            //Property in both styles
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = newSetter.GetValue(Setter.ValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            //Property in new style, not in old style
            oldValue = null;
            newValue = newSetter.GetValue(Setter.ValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }

    this._Styles = styles;
    this._StyleMask = styleMask;
};
_ImplicitStylePropertyValueProvider.prototype.SetStyles = function (styleMask, styles, error) {
    if (!styles)
        return;

    var newStyles = new Array();
    if (this._Styles) {
        newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
        newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
        newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
    }
    if (styleMask & _StyleMask.GenericXaml)
        newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
    if (styleMask & _StyleMask.ApplicationResources)
        newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
    if (styleMask & _StyleMask.VisualTree)
        newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];

    this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
};
_ImplicitStylePropertyValueProvider.prototype.ClearStyles = function (styleMask, error) {
    if (!this._Styles)
        return;

    var newStyles = $.clone(this._Styles); //WTF: Does $.clone fully work for us?
    if (styleMask & _StyleMask.GenericXaml)
        newStyles[_StyleIndex.GenericXaml] = null;
    if (styleMask & _StyleMask.ApplicationResources)
        newStyles[_StyleIndex.ApplicationResources] = null;
    if (styleMask & _StyleMask.VisualTree)
        newStyles[_StyleIndex.VisualTree] = null;

    this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
};

//#endregion

//#region _InheritedPropertyValueProvider

var _Inheritable = {
    Foreground: 1 << 0,
    FontFamily: 1 << 1,
    FontStretch: 1 << 2,
    FontStyle: 1 << 3,
    FontWeight: 1 << 4,
    FontSize: 1 << 5,
    Language: 1 << 6,
    FlowDirection: 1 << 7,
    UseLayoutRounding: 1 << 8,
    TextDecorations: 1 << 9,
    FontResource: 1 << 10
};
_Inheritable.All = 0x7ff;
_Inheritable.None = 0;

function _InheritedPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
    this._ht = new Array();
}
_InheritedPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (!_InheritedPropertyValueProvider.IsInherited(this._Object, propd))
        return undefined;

    var inheritable = _InheritedPropertyValueProvider.GetInheritable(this._Object, propd);
    var ancestor = this._GetPropertySource(inheritable);
    if (!ancestor)
        return undefined;

    var ancestorPropd = _InheritedPropertyValueProvider.GetProperty(inheritable, ancestor);
    if (!ancestorPropd)
        return undefined;
    var v = ancestor.GetValue(ancestorPropd);
    if (v)
        return v;
    return undefined;
};
_InheritedPropertyValueProvider.prototype.WalkSubtree = function (rootParent, element, context, props, adding) {
    if (element instanceof TextElement || element instanceof TextBlock) {
        var childProp;
        if (element instanceof TextBlock)
            childProp = TextBlock.InlinesProperty;
        else if (element instanceof Paragraph)
            childProp = Paragraph.InlinesProperty;
        else if (element instanceof Span)
            childProp = Span.InlinesProperty;
        else if (element instanceof Section)
            childProp = Section.BlocksProperty;

        if (childProp) {
            var col = element._GetValueNoAutoCreate(childProp);
            if (col) {
                var count = col.GetCount();
                for (var i = 0; i < count; i++) {
                    this.WalkTree(rootParent, col.GetValueAt(i), context, props, adding);
                }
            }
        }
    }
    if (element instanceof Popup) {
        var child = element.GetChild();
        if (child)
            this.WalkTree(rootParent, element, conte, props, adding);
    }
    if (element instanceof UIElement) {
        var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical, true);
        var child2;
        while (child2 = walker.Step()) {
            this.WalkTree(rootParent, child2, context, props, adding);
        }
    }
};
_InheritedPropertyValueProvider.prototype.WalkTree = function (rootParent, element, context, props, adding) {
    if (props == _Inheritable.None)
        return;

    if (adding) {
        this.MaybePropagateInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
        this.MaybePropagateInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
        this.MaybePropagateInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
        this.MaybePropagateInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
        this.MaybePropagateInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
        this.MaybePropagateInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
        this.MaybePropagateInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
        this.MaybePropagateInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
        this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
        this.MaybePropagateInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
        this.MaybePropagateInheritedValue(context.FontResourceSource, _Inheritable.FontResource, props, element);

        var eleContext = new _InheritedContext(element, context);

        props = eleContext.Compare(context, props);
        if (props == _Inheritable.None)
            return;

        this.WalkSubtree(rootParent, element, eleContext, props, adding);
    } else {
        var eleContext2 = new _InheritedContext(element, context);

        this.MaybeRemoveInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
        this.MaybeRemoveInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
        this.MaybeRemoveInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
        this.MaybeRemoveInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
        this.MaybeRemoveInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
        this.MaybeRemoveInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
        this.MaybeRemoveInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
        this.MaybeRemoveInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
        this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
        this.MaybeRemoveInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
        this.MaybeRemoveInheritedValue(context.FontResourceSource, _Inheritable.FontResource, props, element);

        props = eleContext2.Compare(context, props);
        if (props == _Inheritable.None)
            return;

        this.WalkSubtree(rootParent, element, context, props, adding);
    }
};
_InheritedPropertyValueProvider.prototype.MaybePropagateInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    var sourceProperty = _InheritedPropertyValueProvider.GetProperty(prop, source);
    var value = source.GetValue(sourceProperty);
    if (value)
        element._PropagateInheritedValue(prop, source, value);
};
_InheritedPropertyValueProvider.prototype.MaybeRemoveInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;

    if (source == element._GetInheritedValueSource(prop))
        element._PropagateInheritedValue(prop, null, null);
};
_InheritedPropertyValueProvider.prototype.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
    var baseContext = new _InheritedContext(
            this._GetPropertySource(_Inheritable.Foreground),
            this._GetPropertySource(_Inheritable.FontFamily),
            this._GetPropertySource(_Inheritable.FontStretch),
            this._GetPropertySource(_Inheritable.FontStyle),
            this._GetPropertySource(_Inheritable.FontWeight),
            this._GetPropertySource(_Inheritable.FontSize),
            this._GetPropertySource(_Inheritable.Language),
            this._GetPropertySource(_Inheritable.FlowDirection),
            this._GetPropertySource(_Inheritable.UseLayoutRounding),
            this._GetPropertySource(_Inheritable.TextDecorations),
            this._GetPropertySource(_Inheritable.FontResource));
    var objContext = new _InheritedContext(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, _Inheritable.All, true);
};
_InheritedPropertyValueProvider.prototype.PropagateInheritedProperty = function (propd, source, subtree) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(source, propd);
    var objContext = new _InheritedContext(this._Object, null);
    this.WalkSubtree(source, subtree, objContext, inheritable, true);
};
_InheritedPropertyValueProvider.prototype.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
    var baseContext = new _InheritedContext(
            this._GetPropertySource(_Inheritable.Foreground),
            this._GetPropertySource(_Inheritable.FontFamily),
            this._GetPropertySource(_Inheritable.FontStretch),
            this._GetPropertySource(_Inheritable.FontStyle),
            this._GetPropertySource(_Inheritable.FontWeight),
            this._GetPropertySource(_Inheritable.FontSize),
            this._GetPropertySource(_Inheritable.Language),
            this._GetPropertySource(_Inheritable.FlowDirection),
            this._GetPropertySource(_Inheritable.UseLayoutRounding),
            this._GetPropertySource(_Inheritable.TextDecorations),
            this._GetPropertySource(_Inheritable.FontResource));
    var objContext = new _InheritedContext(this._Object, baseContext);
    this.WalkTree(this._Object, subtree, objContext, _Inheritable.All, false);
};
_InheritedPropertyValueProvider.prototype._GetPropertySource = function (inheritableOrProp) {
    if (inheritableOrProp instanceof DependencyProperty)
        return this._ht[GetInheritableFromProperty(inheritableOrProp)];
    return this._ht[inheritableOrProp];
};
_InheritedPropertyValueProvider.prototype._SetPropertySource = function (inheritable, source) {
    if (source)
        this._ht[inheritable] = source;
    else
        delete this._ht[inheritable];
};

//#region STATIC

_InheritedPropertyValueProvider.IsInherited = function (obj, propd) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(obj, propd);
    return inheritable != _Inheritable.None;
};
_InheritedPropertyValueProvider.GetInheritable = function (obj, propd) {
    if (propd == Control.ForegroundProperty || propd == TextBlock.ForegroundProperty || propd == TextElement.ForegroundProperty)
        return _Inheritable.Foreground;
    if (propd == Control.FontFamilyProperty || propd == TextBlock.FontFamilyProperty || propd == TextElement.FontFamilyProperty)
        return _Inheritable.FontFamily;
    if (propd == Control.FontStretchProperty || propd == TextBlock.FontStretchProperty || propd == TextElement.FontStretchProperty)
        return _Inheritable.FontStretch;
    if (propd == Control.FontStyleProperty || propd == TextBlock.FontStyleProperty || propd == TextElement.FontStyleProperty)
        return _Inheritable.FontStyle;
    if (propd == Control.FontWeightProperty || propd == TextBlock.FontWeightProperty || propd == TextElement.FontWeightProperty)
        return _Inheritable.FontWeight;
    if (propd == Control.FontSizeProperty || propd == TextBlock.FontSizeProperty || propd == TextElement.FontSizeProperty)
        return _Inheritable.FontSize;
    if (propd == FrameworkElement.LanguageProperty || propd == TextElement.LanguageProperty)
        return _Inheritable.Language;
    if (propd == FrameworkElement.FlowDirectionProperty && !(obj instanceof Image) && !(obj instanceof MediaElement))
        return _Inheritable.FlowDirection;
    if (propd == Run.FlowDirectionProperty)
        return _Inheritable.FlowDirection;
    if (propd == UIElement.UseLayoutRoundingProperty)
        return _Inheritable.UseLayoutRounding;
    if (propd == TextElement.TextDecorationsProperty || propd == TextBlock.TextDecorationsProperty)
        return _Inheritable.TextDecorations;
    if (propd == TextElement.FontResourceProperty || propd == TextBlock.FontResourceProperty)
        return _Inheritable.FontResource;
    return _Inheritable.None;
};
_InheritedPropertyValueProvider.GetProperty = function (inheritable, ancestor) {
    switch (inheritable) {
        case _Inheritable.Foreground:
            if (ancestor instanceof Control)
                return Control.ForegroundProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.ForegroundProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.ForegroundProperty;
            break;
        case _Inheritable.FontFamily:
            if (ancestor instanceof Control)
                return Control.FontFamilyProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontFamilyProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontFamilyProperty;
            break;
        case _Inheritable.FontStretch:
            if (ancestor instanceof Control)
                return Control.FontStretchProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontStretchProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontStretchProperty;
            break;
        case _Inheritable.FontStyle:
            if (ancestor instanceof Control)
                return Control.FontStyleProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontStyleProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontStyleProperty;
            break;
        case _Inheritable.FontWeight:
            if (ancestor instanceof Control)
                return Control.FontWeightProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontWeightProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontWeightProperty;
            break;
        case _Inheritable.FontSize:
            if (ancestor instanceof Control)
                return Control.FontSizeProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontSizeProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.FontSizeProperty;
            break;
        case _Inheritable.Language:
            if (ancestor instanceof FrameworkElement)
                return FrameworkElement.LanguageProperty;
            else if (ancestor instanceof TextElement)
                return TextElement.LanguageProperty;
            break;
        case _Inheritable.FlowDirection:
            if (ancestor instanceof FrameworkElement) {
                if (ancestor instanceof Image || ancestor instanceof MediaElement)
                    return null;
                return FrameworkElement.FlowDirectionProperty;
            } else if (ancestor instanceof Run)
                return Run.FlowDirectionProperty;
            break;
        case _Inheritable.UseLayoutRounding:
            if (ancestor instanceof UIElement)
                return UIElement.UseLayoutRoundingProperty;
            break;
        case _Inheritable.TextDecorations:
            if (ancestor instanceof TextElement)
                return TextElement.TextDecorationsProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.TextDecorationsProperty;
            break;
        case _Inheritable.FontResource:
            if (ancestor instanceof TextElement)
                return TextElement.FontResourceProperty;
            else if (ancestor instanceof TextBlock)
                return TextBlock.FontResourceProperty;
            break;
    }
    return null;
};

//#endregion

//#endregion

//#region _InheritedContext

function _InheritedContext() {
    RefObject.call(this);
    if (arguments.length != 2) {
        this.ForegroundSource = arguments[0];
        this.FontFamilySource = arguments[1];
        this.FontStretchSource = arguments[2];
        this.FontStyleSource = arguments[3];
        this.FontWeightSource = arguments[4];
        this.FontSizeSource = arguments[5];
        this.LanguageSource = arguments[6];
        this.FlowDirectionSource = arguments[7];
        this.UseLayoutRoundingSource = arguments[8];
        this.TextDecorationsSource = arguments[9];
        this.FontResourceSource = arguments[10];
    } else {
        var obj = arguments[0];
        var parentContext = arguments[1];

        this.ForegroundSource = this.GetLocalSource(obj, _Inheritable.Foreground);
        if (!this.ForegroundSource && parentContext) this.ForegroundSource = parentContext.ForegroundSource;

        this.FontFamilySource = this.GetLocalSource(obj, _Inheritable.FontFamily);
        if (!this.FontFamilySource && parentContext) this.FontFamilySource = parentContext.FontFamilySource;

        this.FontStretchSource = this.GetLocalSource(obj, _Inheritable.FontStretch);
        if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

        this.FontStyleSource = this.GetLocalSource(obj, _Inheritable.FontStyle);
        if (!this.FontStretchSource && parentContext) this.FontStretchSource = parentContext.FontStretchSource;

        this.FontWeightSource = this.GetLocalSource(obj, _Inheritable.FontWeight);
        if (!this.FontWeightSource && parentContext) this.FontWeightSource = parentContext.FontWeightSource;

        this.FontSizeSource = this.GetLocalSource(obj, _Inheritable.FontSize);
        if (!this.FontSizeSource && parentContext) this.FontSizeSource = parentContext.FontSizeSource;

        this.LanguageSource = this.GetLocalSource(obj, _Inheritable.Language);
        if (!this.LanguageSource && parentContext) this.LanguageSource = parentContext.LanguageSource;

        this.FlowDirectionSource = this.GetLocalSource(obj, _Inheritable.FlowDirection);
        if (!this.FlowDirectionSource && parentContext) this.FlowDirectionSource = parentContext.FlowDirectionSource;

        this.UseLayoutRoundingSource = this.GetLocalSource(obj, _Inheritable.UseLayoutRounding);
        if (!this.UseLayoutRoundingSource && parentContext) this.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;

        this.TextDecorationsSource = this.GetLocalSource(obj, _Inheritable.TextDecorations);
        if (!this.TextDecorationsSource && parentContext) this.TextDecorationsSource = parentContext.TextDecorationsSource;

        this.FontResourceSource = this.GetLocalSource(obj, _Inheritable.FontResource);
        if (!this.FontResourceSource && parentContext) this.FontResourceSource = parentContext.FontResourceSource;
    }
}
_InheritedContext.InheritFrom(RefObject);

_InheritedContext.prototype.Compare = function (withContext, props) {
    var rv = _Inheritable.None;

    if (props & _Inheritable.Foreground && withContext.ForegroundSource == this.ForegroundSource)
        rv |= _Inheritable.Foreground;
    if (props & _Inheritable.FontFamily && withContext.FontFamilySource == this.FontFamilySource)
        rv |= _Inheritable.FontFamily;
    if (props & _Inheritable.FontStretch && withContext.FontStretchSource == this.FontStretchSource)
        rv |= _Inheritable.FontStretch;
    if (props & _Inheritable.FontStyle && withContext.FontStyleSource == this.FontStyleSource)
        rv |= _Inheritable.FontStyle;
    if (props & _Inheritable.FontWeight && withContext.FontWeightSource == this.FontWeightSource)
        rv |= _Inheritable.FontWeight;
    if (props & _Inheritable.FontSize && withContext.FontSizeSource == this.FontSizeSource)
        rv |= _Inheritable.FontSize;
    if (props & _Inheritable.Language && withContext.LanguageSource == this.LanguageSource)
        rv |= _Inheritable.Language;
    if (props & _Inheritable.FlowDirection && withContext.FlowDirectionSource == this.FlowDirectionSource)
        rv |= _Inheritable.FlowDirection;
    if (props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource == this.UseLayoutRoundingSource)
        rv |= _Inheritable.UseLayoutRounding;
    if (props & _Inheritable.TextDecorations && withContext.TextDecorationsSource == this.TextDecorationsSource)
        rv |= _Inheritable.TextDecorations;
    if (props & _Inheritable.FontResource && withContext.FontResourceSource == this.FontResourceSource)
        rv |= _Inheritable.FontResource;

    return rv;
};
_InheritedContext.prototype.GetLocalSource = function (obj, prop) {
    var source = null;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};

//#endregion

//#region _InheritedDataContextPropertyValueProvider

function _InheritedDataContextPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence);
    this._Source = null;
}
_InheritedDataContextPropertyValueProvider.InheritFrom(_PropertyValueProvider);

_InheritedDataContextPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (!this._Source || propd != FrameworkElement.DataContextProperty)
        return null;
    return this._Source.GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.prototype.SetDataSource = function (source) {
    if (this._Source == source)
        return;

    var oldValue = this._Source ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source ? source.GetValue(FrameworkElement.DataContextProperty) : null;

    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);

    if (oldValue != newValue) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.prototype._AttachListener = function (source) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this == args.Property; //Closure - FrameworkElement.DataContextProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, FrameworkElement.DataContextProperty);
        //TODO: Add Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, FrameworkElement.DataContextProperty);
        //TODO: Remove Handler - Destroyed Event
    }
};
_InheritedDataContextPropertyValueProvider.prototype._SourceDataContextChanged = function (sender, args) {
    var error = BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.prototype.EmitChanged = function () {
    if (this._Source) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};

//#endregion

//#region _DefaultValuePropertyProvider

function _DefaultValuePropertyProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
}
_DefaultValuePropertyProvider.InheritFrom(_PropertyValueProvider);

_DefaultValuePropertyProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

//#endregion

//#region _AutoCreatePropertyValueProvider

var _AutoCreators = {
    DefaultFontSize: { GetValue: function (propd, obj) { return 11; } },
    DefaultBlackBrush: { GetValue: function (propd, obj) { return "#000000"; } }
};

function _AutoCreatePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_AutoCreatePropertyValueProvider.InheritFrom(_PropertyValueProvider);

_AutoCreatePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    var value = this.ReadLocalValue(propd);
    if (value)
        return value;

    value = propd._IsAutoCreated() ? propd._GetAutoCreatedValue(this._Object) : null;
    if (!value)
        return null;

    this._ht[propd] = value;
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, null, value, false, true, false, error);
    return value;
};
_AutoCreatePropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;
    this.ClearValue(propd);
};
_AutoCreatePropertyValueProvider.prototype.ReadLocalValue = function (propd) {
    return this._ht[propd];
};
_AutoCreatePropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="Brush.js"/>
/// <reference path="Collection.js"/>
/// <reference path="LayoutInformation.js"/>
/// <reference path="Dirty.js"/>
/// <reference path="Debug.js"/>
/// <reference path="EventArgs.js"/>
/// <reference path="List.js"/>

//#region Surface

function Surface() {
    RefObject.call(this);
    this._InputList = new List();
    this._FocusChangedEvents = new List();
    this._FirstUserInitiatedEvent = false;
    this._UserInitiatedEvent = false;
    this._Cursor = CursorType.Default;
}
Surface.InheritFrom(RefObject);

Surface.prototype.Init = function (jCanvas) {
    Surface._TestCanvas = document.createElement('canvas');
    this._Layers = new Collection();
    this._DownDirty = new _DirtyList();
    this._UpDirty = new _DirtyList();

    this._jCanvas = jCanvas;
    this._Ctx = this._jCanvas[0].getContext('2d');
    this._CanvasOffset = this._jCanvas.offset();
    this.RegisterEvents();
};
Surface.prototype.GetCanvas = function () { return this._jCanvas[0]; };
Surface.prototype.GetExtents = function () {
    return new Size(this.GetWidth(), this.GetHeight());
};
Surface.prototype.GetWidth = function () {
    return this._jCanvas.width();
};
Surface.prototype.GetHeight = function () {
    return this._jCanvas.height();
};
Surface.prototype.Render = function (region) {
    var ctx = new _RenderContext(this);

    var layerCount = 0;
    if (this._Layers)
        layerCount = this._Layers.GetCount();

    ctx.Clear(region);
    for (var i = 0; i < layerCount; i++) {
        var layer = this._Layers.GetValueAt(i);
        layer._DoRender(ctx, region);
    }
};
Surface.prototype._Attach = function (/* UIElement */element) {
    if (this._TopLevel) {
        //TODO: Detach previous layer
    }

    if (!element) {
        this._Invalidate();
        return;
    }

    if (!(element instanceof UIElement)) {
        _Console.WriteLine("Unsupported top level element.");
        return;
    }

    if (NameScope.GetNameScope(element) == null) {
        NameScope.SetNameScope(element, new NameScope());
    }

    //TODO: Enable events

    this._TopLevel = element;

    //TODO: Subscribe Loaded event

    this._TopLevel.Loaded.Subscribe(this._HandleTopLevelLoaded, this);
    this._AttachLayer(this._TopLevel);
    var surface = this;
    var postAttach = function () {
        surface._TopLevel._SetIsAttached(true);
        surface._TopLevel._SetIsLoaded(true);
        //TODO: App Loaded event
    };
    setTimeout(postAttach, 1);
};
Surface.prototype._AttachLayer = function (/* UIElement */layer) {
    if (layer.RefEquals(this._TopLevel))
        this._Layers.Insert(0, layer);
    else
        this._Layers.Add(layer);

    layer._FullInvalidate(true);
    layer._InvalidateMeasure();
    layer._SetIsAttached(true);
    layer._SetIsLoaded(true);
    //TODO: App Loaded event
};
Surface.prototype._HandleTopLevelLoaded = function (sender, args) {
    var element = sender;
    this._TopLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded);
    if (element.RefEquals(this._TopLevel)) {
        //TODO: this.Resize.Raise(this, null);

        element._UpdateTotalRenderVisibility();
        element._UpdateTotalHitTestVisibility();
        element._FullInvalidate(true);

        element._InvalidateMeasure();
    }
};
Surface.prototype._IsTopLevel = function (/* UIElement */top) {
    if (!top || !this._Layers)
        return false;
    var ret = false; //TODO: full-screen message
    var count = this._Layers.GetCount();
    for (var i = 0; i < count && !ret; i++) {
        var layer = this._Layers.GetValueAt(i);
        ret = top.RefEquals(layer);
    }
    return ret;
};
Surface.prototype.ProcessDirtyElements = function () {
    var error = new BError();
    var dirty = this._UpdateLayout(error);
    if (error.IsErrored()) {
        Fatal(error);
    }
    return dirty;
};
Surface.prototype._Invalidate = function (rect) {
    if (!rect)
        rect = new Rect(0, 0, this.GetWidth(), this.GetHeight());
    var surface = this;
    setTimeout(function () { surface.Render(rect); }, 1);
};

Surface.prototype._UpdateLayout = function (error) {
    if (!this._Layers)
        return false;
    var pass = new LayoutPass();
    var dirty = true;
    pass._Updated = true;
    while (pass._Count < LayoutPass.MaxCount && pass._Updated) {
        pass._Updated = false;
        for (var i = 0; i < this._Layers.GetCount(); i++) {
            var layer = this._Layers.GetValueAt(i);
            var element = layer;
            if (!element._HasFlag(UIElementFlags.DirtyMeasureHint) && !element._HasFlag(UIElementFlags.DirtyArrangeHint))
                continue;

            var last = LayoutInformation.GetPreviousConstraint(element);
            var available = new Size(this.GetWidth(), this.GetHeight());
            if (element.IsContainer() && (!last || (!last.Equals(available)))) {
                element._InvalidateMeasure();
                LayoutInformation.SetPreviousConstraint(element, available);
            }

            element._UpdateLayer(pass, error);
        }

        //dirty = dirty || !this._DownDirty.IsEmpty() || !this._UpDirty.IsEmpty();
        this._ProcessDownDirtyElements();
        this._ProcessUpDirtyElements();

        if (pass._Updated/* && dirty*/) {
            //TODO: LayoutUpdated Event
        }
    }

    if (pass._Count >= LayoutPass.MaxCount) {
        if (error)
            error.SetErrored(BError.Exception, "UpdateLayout has entered infinite loop and has been aborted.");
    }

    return dirty;
};
//Down --> Transformation, Opacity
Surface.prototype._ProcessDownDirtyElements = function () {
    var visualParent;
    var node;
    while (node = this._DownDirty.GetFirst()) {
        var uie = node.Element;

        if (uie._DirtyFlags & _Dirty.RenderVisibility) {
            uie._DirtyFlags &= ~_Dirty.RenderVisibility;

            var ovisible = uie._GetRenderVisible();

            uie._UpdateBounds();

            visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._UpdateBounds();

            uie._ComputeTotalRenderVisibility();

            if (!uie._GetRenderVisible())
                uie._CacheInvalidateHint();

            if (ovisible != uie._GetRenderVisible())
                this._AddDirtyElement(uie, _Dirty.NewBounds);

            this._PropagateDirtyFlagToChildren(uie, _Dirty.NewBounds);
        }

        if (uie._DirtyFlags & _Dirty.HitTestVisibility) {
            uie._DirtyFlags &= ~_Dirty.HitTestVisibility;
            uie._ComputeTotalHitTestVisibility();
            this._PropagateDirtyFlagToChildren(uie, _Dirty.HitTestVisibility);
        }

        if (uie._DirtyFlags & _Dirty.LocalTransform) {
            uie._DirtyFlags &= ~_Dirty.LocalTransform;
            uie._DirtyFlags |= _Dirty.Transform;
            uie._ComputeLocalTransform();
        }
        if (uie._DirtyFlags & _Dirty.LocalProjection) {
            uie._DirtyFlags &= ~_Dirty.LocalProjection;
            uie._DirtyFlags |= _Dirty.Transform;
            uie._ComputeLocalProjection();
        }
        if (uie._DirtyFlags & _Dirty.Transform) {
            uie._DirtyFlags &= ~_Dirty.Transform;
            uie._ComputeTransform();
            visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._UpdateBounds();
            this._PropagateDirtyFlagToChildren(uie, _Dirty.Transform);
        }

        if (uie._DirtyFlags & _Dirty.LocalClip) {
            uie._DirtyFlags &= ~_Dirty.LocalClip;
            uie._DirtyFlags |= _Dirty.Clip;
        }
        if (uie._DirtyFlags & _Dirty.Clip) {
            uie._DirtyFlags &= ~_Dirty.Clip;
            this._PropagateDirtyFlagToChildren(uie, _Dirty.Clip);
        }

        if (uie._DirtyFlags & _Dirty.ChildrenZIndices) {
            uie._DirtyFlags &= ~_Dirty.ChildrenZIndices;
            if (~(uie instanceof Panel)) {
                //Warning: Only applicable to Panel subclasses
            } else {
                uie.GetChildren().ResortByZIndex();
            }
        }

        if (!(uie._DirtyFlags & _Dirty.DownDirtyState) && uie._DownDirtyNode) {
            this._DownDirty.RemoveDirtyNode(uie._DownDirtyNode);
            uie._DownDirtyNode = null;
        }
    }

    if (!this._DownDirty.IsEmpty()) {
        Warn("Finished DownDirty pass, not empty.");
    }
};
//Up --> Bounds, Invalidation
Surface.prototype._ProcessUpDirtyElements = function () {
    var visualParent;
    var node;
    while (node = this._UpDirty.GetFirst()) {
        var uie = node.Element;
        if (uie._DirtyFlags & _Dirty.Bounds) {
            uie._DirtyFlags &= ~_Dirty.Bounds;

            var oextents = uie._GetSubtreeExtents();
            var oglobalbounds = uie._GetGlobalBounds();
            var osubtreebounds = uie._GetSubtreeBounds();

            uie._ComputeBounds();

            if (!Rect.Equals(oglobalbounds, uie._GetGlobalBounds())) {
                visualParent = uie.GetVisualParent();
                if (visualParent) {
                    visualParent._UpdateBounds();
                    visualParent._Invalidate(osubtreebounds);
                    visualParent._Invalidate(uie._GetSubtreeBounds());
                }
            }

            if (!Rect.Equals(oextents, uie._GetSubtreeExtents())) {
                uie._Invalidate(uie._GetSubtreeBounds());
            }

            if (uie._ForceInvalidateOfNewBounds) {
                uie._ForceInvalidateOfNewBounds = false;
                uie._InvalidateSubtreePaint();
            }
        }

        if (uie._DirtyFlags & _Dirty.NewBounds) {
            visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._Invalidate(uie._GetSubtreeBounds());
            else if (this._IsTopLevel(uie))
                uie._InvalidateSubtreePaint();
            uie._DirtyFlags &= ~_Dirty.NewBounds;
        }

        if (uie._DirtyFlags & _Dirty.Invalidate) {
            uie._DirtyFlags &= ~_Dirty.Invalidate;
            var dirty = uie._DirtyRegion;
            visualParent = uie.GetVisualParent();
            if (visualParent) {
                visualParent._Invalidate(dirty);
            } else {
                if (uie._IsAttached) {
                    this._Invalidate(dirty);
                    /*
                    OPTIMIZATION NOT IMPLEMENTED
                    var count = dirty.GetRectangleCount();
                    for (var i = count - 1; i >= 0; i--) {
                    this._Invalidate(dirty.GetRectangle(i));
                    }
                    */
                }
            }
        }

        if (!(uie._DirtyFlags & _Dirty.UpDirtyState)) {
            this._UpDirty.RemoveDirtyNode(uie._UpDirtyNode);
            uie._UpDirtyNode = null;
        }
    }

    if (!this._UpDirty.IsEmpty()) {
        Warn("Finished UpDirty pass, not empty.");
    }
};
Surface.prototype._PropagateDirtyFlagToChildren = function (element, dirt) {
    var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical);
    var child;
    while (child = walker.Step()) {
        this._AddDirtyElement(child, dirt);
    }
};
Surface.prototype._AddDirtyElement = function (/* UIElement */element, dirt) {
    if (element.GetVisualParent() == null && !this._IsTopLevel(element))
        return;

    element._DirtyFlags |= dirt;

    if (dirt & _Dirty.DownDirtyState) {
        if (element._DownDirtyNode)
            return;
        element._DownDirtyNode = new DirtyNode(element);
        this._DownDirty.AddDirtyNode(element._DownDirtyNode);
    }
    if (dirt & _Dirty.UpDirtyState) {
        if (element._UpDirtyNode)
            return;
        element._UpDirtyNode = new DirtyNode(element);
        this._UpDirty.AddDirtyNode(element._UpDirtyNode);
    }
    //TODO: Alert redraw needed
};
Surface.prototype._RemoveDirtyElement = function (/* UIElement */element) {
    if (element._UpDirtyNode)
        this._UpDirty.RemoveDirtyNode(element._UpDirtyNode);
    if (element._DownDirtyNode)
        this._DownDirty.RemoveDirtyNode(element._DownDirtyNode);
    element._UpDirtyNode = null;
    element._DownDirtyNode = null;
};

Surface.prototype._SetUserInitiatedEvent = function (val) {
    this._EmitFocusChangeEvents();
    this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
    this._UserInitiatedEvent = val;
};
Surface.prototype._UpdateCursorFromInputList = function () {
    var newCursor = CursorType.Default;
    for (var node = this._InputList.First(); node; node = node.Next) {
        newCursor = node.UIElement.GetCursor();
        if (newCursor !== CursorType.Default)
            break;
    }
    this._SetCursor(newCursor);
};
Surface.prototype._SetCursor = function (cursor) {
    this._Cursor = cursor;
    this._jCanvas.css("cursor", cursor);
};

Surface.prototype.RegisterEvents = function () {
    var surface = this;
    var canvas = this.GetCanvas();

    canvas.addEventListener("mousedown", function (e) { surface._HandleButtonPress(event.button, surface._GetMousePosition(event)); });
    canvas.addEventListener("mouseup", function (e) { surface._HandleButtonRelease(event.button, surface._GetMousePosition(event)); });
    canvas.addEventListener("mouseout", function (e) { surface._HandleOut(surface._GetMousePosition(event)); });
    canvas.addEventListener("mousemove", function (e) { surface._HandleMove(surface._GetMousePosition(event)); });
    canvas.addEventListener("mousewheel", function (e) { surface._HandleWheel(surface._GetMousePosition(event)); });
};

//#region MOUSE

Surface.prototype._HandleButtonRelease = function (button, pos) {
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("up", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
    if (this._Captured)
        this._PerformReleaseCapture();
};
Surface.prototype._HandleButtonPress = function (button, pos) {
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("down", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleWheel = function (pos) {
    this._HandleMouseEvent("wheel", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleMove = function (pos) {
    this._HandleMouseEvent("move", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleOut = function (pos) {
    this._HandleMouseEvent("out", null, pos);
};
Surface.prototype._HandleMouseEvent = function (type, button, pos, emitLeave, emitEnter) {
    HUDUpdate("mouse", pos.toString());
    this._CurrentPos = pos;
    if (this._EmittingMouseEvent)
        return false;
    if (this._TopLevel == null)
        return false;

    this._EmittingMouseEvent = true;
    if (this._Captured) {
        this._EmitMouseList(type, button, pos, this._InputList);
    } else {
        this.ProcessDirtyElements();
        var ctx = new _RenderContext(this);
        var newInputList = new List();
        var layerCount = this._Layers.GetCount();
        for (var i = layerCount - 1; i >= 0 && newInputList.IsEmpty(); i--) {
            var layer = this._Layers.GetValueAt(i);
            layer._HitTestPoint(ctx, pos, newInputList);
        }

        var indices = {};
        this._FindFirstCommonElement(this._InputList, newInputList, indices);
        if (emitLeave === undefined || emitLeave === true)
            this._EmitMouseList("leave", button, pos, this._InputList, indices.Index1);
        if (emitEnter === undefined || emitEnter === true)
            this._EmitMouseList("enter", button, pos, newInputList, indices.Index2);
        if (type !== "noop")
            this._EmitMouseList(type, button, pos, newInputList);

        HUDUpdate("els", "Elements Found: " + newInputList._Count.toString());
        this._InputList = newInputList;
    }

    if (this._PendingCapture)
        this._PerformCapture(this._PendingCapture);
    if (this._PendingReleaseCapture || (this._Captured && !this._Captured.CanCaptureMouse()))
        this._PerformReleaseCapture();
    this._EmittingMouseEvent = false;
};

Surface.prototype._GetMousePosition = function (evt) {
    return new Point(
        evt.clientX - this._CanvasOffset.left,
        evt.clientY - this._CanvasOffset.top);
};
Surface.prototype._FindFirstCommonElement = function (list1, list2, outObj) {
    var ui1 = list1.Last();
    var i1 = list1._Count - 1;
    var ui2 = list2.Last();
    var i2 = list2._Count - 1;

    outObj.Index1 = -1;
    outObj.Index2 = -1;

    while (ui1 != null && ui2 != null) {
        if (ui1.UIElement.RefEquals(ui2.UIElement)) {
            outObj.Index1 = i1;
            outObj.Index2 = i2;
        } else {
            return;
        }
        ui1 = ui1.Previous;
        ui2 = ui2.Previous;
        i1--;
        i2--;
    }
};
Surface.prototype._EmitMouseList = function (type, button, pos, list, endIndex) {
    if (endIndex === 0)
        return;
    var i = 0;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitMouseEvent(type, button, pos);
    }
};

Surface.prototype.SetMouseCapture = function (/* UIElement */uie) {
    if (this._Captured || this._PendingCapture)
        return uie.RefEquals(this._Captured) || uie.RefEquals(this._PendingCapture);
    if (!this._EmittingMouseEvent)
        return false;
    this._PendingCapture = uie;
    return true;
};
Surface.prototype.ReleaseMouseCapture = function (/* UIElement */uie) {
    if (!uie.RefEquals(this._Captured) && !uie.RefEquals(this._PendingCapture))
        return;
    if (this._EmittingMouseEvent)
        this._PendingReleaseCapture = true;
    else
        this._PerformReleaseCapture();
};
Surface.prototype._PerformCapture = function (/* UIElement */uie) {
    this._Captured = uie;
    var newInputList = new List();
    while (uie != null) {
        newInputList.Append(new UIElementNode(uie));
        uie = uie.GetVisualParent();
    }
    this._InputList = newInputList;
    this._PendingCapture = null;
};
Surface.prototype._PerformReleaseCapture = function () {
    var oldCaptured = this._Captured;
    this._Captured = null;
    this._PendingReleaseCapture = false;
    oldCaptured._EmitLostMouseCapture(this._CurrentPos);
    //force "MouseEnter" on any new elements
    this._HandleMouseEvent("noop", null, this._CurrentPos, false, true);
};

//#endregion

//#region FOCUS

Surface.prototype._FocusElement = function (/* UIElement */uie) {
    if (uie.RefEquals(this._FocusedElement))
        return true;

    if (this._FocusedElement != null)
        this._FocusedChangedEvents.Append(new FocusChangedNode(Surface._ElementPathToRoot(this._FocusedElement), null));

    this._FocusedElement = uie;

    if (uie)
        this._FocusedChangedEvents.Append(new FocusChangedNode(null, Surface._ElementPathToRoot(uie)));

    if (this._FirstUserInitiatedEvent)
        this._EmitFocusChangeEventsAsync();

    return true;
};
Surface.prototype._EmitFocusChangeEventsAsync = function () {
    var surface = this;
    window.setTimeout(function () { surface._EmitFocusChangeEvents(); }, 1);
};
Surface.prototype._EmitFocusChangeEvents = function () {
    var node;
    while (node = this._FocusChangedEvents.First()) {
        this._FocusChangedEvents.Remove(node);
        this._EmitFocusList("lost", node.LostFocus);
        this._EmitFocusList("got", node.GotFocus);
    }
};
Surface.prototype._EmitFocusList = function (type, list) {
    if (list == null)
        return;
    for (var node = list.First(); node; node = node.Next) {
        node.UIElement._EmitFocusChange(type);
    }
};

//#endregion

Surface.MeasureText = function (text, font) {
    if (!Surface._TestCanvas)
        Surface._TestCanvas = document.createElement('canvas');
    var ctx = Surface._TestCanvas.getContext('2d');
    ctx.font = font._Translate();
    return new Size(ctx.measureText(text).width, Surface._MeasureHeight(text, font));
};
Surface._MeasureHeight = function (text, font) {
    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font._Translate() + ";");
    body.appendChild(dummy);
    var result = dummy.offsetHeight;
    body.removeChild(dummy);
    return result;
};
Surface.IsLeftButton = function (button) {
    return button === 1;
};
Surface.IsRightButton = function (button) {
    return button === 2;
};
Surface._ElementPathToRoot = function (source) {
    var list = new List();
    while (source) {
        list.Append(new UIElementNode(source));
        source = source.GetVisualParent();
    }
    return list;
};

//#endregion

//#region _RenderContext

function _RenderContext(surface) {
    RefObject.call(this);
    this._Surface = surface;
    this._Transforms = new Array();
}
_RenderContext.InheritFrom(RefObject);

_RenderContext.prototype.GetSurface = function () {
    return this._Surface;
};
_RenderContext.prototype.Clip = function (clip) {
    this._DrawClip(clip);
    this._Surface._Ctx.clip();
};
_RenderContext.prototype.IsPointInClipPath = function (clip, p) {
    this._Surface._Ctx.clear();
    this._DrawClip(clip);
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.prototype._DrawClip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
    } else if (clip instanceof Geometry) {
        clip.Draw(this._Surface._Ctx);
    }
};
_RenderContext.prototype.Transform = function (matrix) {
    matrix.Apply(this._Surface._Ctx);
    this._CurrentTransform = matrix.Multiply(this._CurrentTransform);
    this._InverseTransform = this._InverseTransform.Multiply(matrix.GetInverse());
};
_RenderContext.prototype.GetCurrentTransform = function () {
    return this._CurrentTransform;
};
_RenderContext.prototype.GetInverseTransform = function () {
    return this._InverseTransform;
};
_RenderContext.prototype.Save = function () {
    this._Surface._Ctx.save();
    this._Transforms.push({ Current: this._CurrentTransform, Inverse: this._InverseTransform });
    this._CurrentTransform = this._CurrentTransform == null ? new Matrix() : this._CurrentTransform.Copy();
    this._InverseTransform = this._InverseTransform == null ? new Matrix() : this._InverseTransform.Copy();
}
_RenderContext.prototype.Restore = function () {
    var temp = this._Transforms.pop();
    this._CurrentTransform = temp.Current;
    this._InverseTransform = temp.Inverse;
    this._Surface._Ctx.restore();
};
_RenderContext.prototype.Fill = function (region, brush) {
    if (region instanceof Rect) {
        this._Surface._Ctx.fillStyle = brush._Translate(this._Surface._Ctx, region);
        this._Surface._Ctx.fillRect(region.X, region.Y, region.Width, region.Height);
    }
};
_RenderContext.prototype.Clear = function (rect) {
    this._Surface._Ctx.clearRect(rect.X, rect.Y, rect.Width, rect.Height);
};
_RenderContext.prototype.CustomRender = function (painterFunc) {
    var args = toArray.call(arguments);
    args.shift(); //remove painterFunc
    args.unshift(this._Surface._Ctx); //prepend canvas context
    painterFunc.apply(this, args);
};
_RenderContext.prototype.SetGlobalAlpha = function (alpha) {
    this._Surface._Ctx.globalAlpha = alpha;
};
function toArray() {
    var arr = new Array();
    for (var i in this)
        arr.push(this[i]);
    return arr;
};

//#endregion

//#region FocusChangedNode

function FocusChangedNode(lostFocus, gotFocus) {
    Node.call(this);
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
}
FocusChangedNode.InheritFrom(Node);

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="List.js"/>
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="Debug.js"/>
/// <reference path="Surface.js"/>

//#region TextLayout

function TextLayout() {
    RefObject.call(this);
    this._SelectionStart = 0;
    this._SelectionLength = 0;
    
    this._Strategy = LineStackingStrategy.MaxHeight;
    this._Alignment = TextAlignment.Left;
    this._Trimming = TextTrimming.None;
    this._Wrapping = TextWrapping.NoWrap;

    this._AvailableWidth = Number.POSITIVE_INFINITY;
    this._MaxHeight = Number.POSITIVE_INFINITY;
    this._MaxWidth = Number.POSITIVE_INFINITY;
    this._BaseDescent = 0.0;
    this._BaseHeight = 0.0;
    this._ActualHeight = NaN;
    this._ActualWidth = NaN;
    this._LineHeight = NaN;
    this._Attributes = null;
    this._Lines = new Array();
    this._IsWrapped = true;
    this._Text = null;
    this._Length = 0;
    this._Count = 0;
}
TextLayout.InheritFrom(RefObject);

TextLayout.prototype.GetSelectionLength = function () {
    return this._SelectionLength;
};
TextLayout.prototype.GetSelectionStart = function () {
    return this._SelectionStart;
};
TextLayout.prototype.GetLineStackingStrategy = function () {
    return this._Strategy;
};
TextLayout.prototype.SetLineStackingStrategy = function (value) {
    if (this._Strategy == value)
        return false;
    this._Strategy = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextAttributes = function () {
    return this._Attributes;
};
TextLayout.prototype.SetTextAttributes = function (value) {
    if (this._Attributes) {
        this._Attributes._Clear(true);
    }
    this._Attributes = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextAlignment = function () {
    return this._Alignment;
};
TextLayout.prototype.SetTextAlignment = function (value) {
    if (this._Alignment == value)
        return false;
    this._Alignment = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextTrimming = function () {
    return this._Trimming;
};
TextLayout.prototype.SetTextTrimming = function (value) {
    if (this._Trimming == value)
        return false;
    this._Trimming = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextWrapping = function () {
    return this._Wrapping;
};
TextLayout.prototype.SetTextWrapping = function (value) {
    switch (value) {
        case TextWrapping.NoWrap:
        case TextWrapping.Wrap:
            break;
        default:
            value = TextWrapping.Wrap;
            break;
    }

    if (this._Wrapping == value)
        return false;
    this._Wrapping = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetLineHeight = function () {
    return this._LineHeight;
};
TextLayout.prototype.SetLineHeight = function (value) {
    if (this._LineHeight == value)
        return false;
    this._LineHeight = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetMaxHeight = function () {
    return this._MaxHeight;
};
TextLayout.prototype.SetMaxHeight = function (value) {
    if (this._MaxHeight == value)
        return false;
    this._MaxHeight  = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetMaxWidth = function () {
    return this._MaxWidth;
};
TextLayout.prototype.SetMaxWidth = function (value) {
    if (value == 0.0)
        value = Number.POSITIVE_INFINITY;
    if (this._MaxWidth == value)
        return false;
    if (!this._IsWrapped && (!isFinite(value) || value > this._ActualWidth)) {
        this._MaxWidth = value;
        return false;
    }
    this._MaxWidth = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetAvailableWidth = function () {
    return this._AvailableWidth;
};
TextLayout.prototype.SetAvailableWidth = function (value) {
    this._AvailableWidth = value;
    return false;
};
TextLayout.prototype.GetText = function () {
    return this._Text;
};
TextLayout.prototype.SetText = function (value, length) {
    if (value) {
        this._Text = value;
        this._Length = length == -1 ? value.length : length;
    } else {
        this._Text = null;
        this._Length = 0;
    }
    this._Count = -1;
    this._ResetState();
    return true;
};

TextLayout.prototype.GetBaselineOffset = function () {
    if (this._Lines.length === 0)
        return 0;
    var line = this._Lines[0];
    return line._Height + line._Descend;
};
TextLayout.prototype.OverrideLineHeight = function () {
    return this.GetLineStackingStrategy() === LineStackingStrategy.BlockLineHeight && this.GetLineHeight() !== 0;
};
TextLayout.prototype.GetLineHeightOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseHeight;
    return this.GetLineHeight();
};
TextLayout.prototype.GetDescendOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseDescent;

    if (this._BaseHeight == 0.0)
        return 0.0;

    return this.GetLineHeight() * (this._BaseDescent / this._BaseHeight);
}

TextLayout.prototype.GetLineFromY = function (offset, y) {
    NotImplemented("TextLayout.GetLineFromY");
};
TextLayout.prototype.GetLineFromIndex = function (index) {
    NotImplemented("TextLayout.GetLineFromIndex");
};
TextLayout.prototype.GetCursorFromXY = function (offset, x, y) {
    NotImplemented("TextLayout.GetCursorFromXY");
};
TextLayout.prototype.GetCursor = function (offset, pos) {
    var x0 = offset.X;
    var y0 = offset.Y;
    var height = 0.0;
    var y1 = 0.0;

    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];

        //adjust x0 for horizontal alignment
        x0 = offset.X + this._HorizontalAlignment(line._Advance);

        //set y1 to baseline
        y1 = y0 + line._Height + line._Descend;
        height = line._Height;

        if (pos >= cursor + line._Count) {
            if ((i + 1) === this._Lines.length) {
                if (TextLayout._IsLineBreak(this._Text.substr(line._Start + line._Length - 1, 2))) {
                    //cursor is lonely just below the last line
                    x0 = offset.X + this._HorizontalAlignment(0.0);
                    y0 += line._Height;
                } else {
                    //cursor is at the end of the last line
                    x0 += line._Advance;
                }
                break;
            }
            cursor += line._Count;
            y0 += line._Height;
            continue;
        }

        //cursor is on this line...
        for (var j = 0; j < line._Runs.length; j++) {
            var run = line._Runs[j];
            end = run._Start + run._Length;

            if (pos >= cursor + run._Count) {
                cursor += run._Count;
                x0 += run._Advance;
                continue;
            }

            //cursor is in this run
            var font = run._Attrs.GetFont();
            var remainingSize = Surface.MeasureText(this._Text.slice(run._Start, pos), font);
            x0 += remainingSize.Width;
            break;
        }
        break;
    }
    return new Rect(x0, y0, 1.0, height);
};
TextLayout.prototype._FindLineWithIndex = function (index) {
    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];
        if (index < cursor + line._Count)
            return line;
        cursor += line._Count;
    }
    return null;
};

TextLayout.prototype.Select = function (start, length) {
    NotImplemented("TextLayout.Select");
};

TextLayout.prototype._ClearLines = function () {
    this._Lines = new Array();
};
TextLayout.prototype._ResetState = function () {
    this._ActualHeight = NaN;
    this._ActualWidth = NaN;
};
TextLayout.prototype.GetRenderExtents = function () {
    this.Layout();
    return new Rect(this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
};
TextLayout.prototype.GetActualExtents = function () {
    return new Size(this._ActualWidth, this._ActualHeight);
};
TextLayout.prototype.Layout = function () {
    if (!isNaN(this._ActualWidth))
        return;

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._IsWrapped = false;
    this._ClearLines();
    this._Count = 0;

    if (this._Text == null || !TextLayout._ValidateAttrs(this._Attributes))
        return;

    var word = new _LayoutWord();
    if (this._Wrapping === TextWrapping.Wrap)
        word._BreakOps = new Array();
    else
        word._BreakOps = null;

    var layoutWordFunc = this._Wrapping === TextWrapping.NoWrap ? TextLayout._LayoutWordNoWrap : TextLayout._LayoutWordWrap;

    var line = new _TextLayoutLine(this, 0, 0);
    if (this.OverrideLineHeight()) {
        line._Descend = this.GetDescendOverride();
        line._Height = this.GetLineHeightOverride();
    }
    this._Lines.push(line);

    var index = 0;
    var attrs = this._Attributes.First();
    var nattrs;
    var end;
    var run;
    var font;
    do {
        nattrs = attrs.Next;
        end = nattrs ? nattrs._Start : this._Length;
        run = new _TextLayoutRun(line, attrs, index);
        line._Runs.push(run);

        word._Font = font = attrs.GetFont();

        if (end - index <= 0) {
            if (!this.OverrideLineHeight()) {
                line._Descend = Math.min(line._Descend, font._Descender());
                line._Height = Math.max(line._Height, font._Height());
            }
            this._ActualHeight += line._Height;
            break;
        }

        //layout until attrs change
        while (index < end) {
            var linebreak = false;
            var wrapped = false;

            //layout until end of line or max width reached
            while (index < end) {
                var lineBreakLength = TextLayout._IsLineBreak(this._Text.slice(index, end));
                if (lineBreakLength > 0) {
                    if (line._Length == 0 && !this.OverrideLineHeight()) {
                        line._Descend = font._Descender();
                        line._Height = font._Height();
                    }

                    line._Length += lineBreakLength; //bytes
                    run._Length += lineBreakLength; //bytes
                    line._Count += lineBreakLength; //chars
                    run._Count += lineBreakLength; //chars
                    index += lineBreakLength;
                    linebreak = true;
                    break;
                }

                word._LineAdvance = line._Advance;
                if (layoutWordFunc(word, this._Text.slice(index, end), font, this._MaxWidth)) {
                    this._IsWrapped = true;
                    wrapped = true;
                }

                if (word._Length > 0) {
                    //append the word to the run/line
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font._Height());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    line._Count += word._Count;
                    run._Count += word._Count;

                    index += word._Count;
                }

                if (wrapped)
                    break;

                word._LineAdvance = line._Advance;
                TextLayout._LayoutLwsp(word, this._Text.slice(index, end), font);

                if (word._Length > 0) {
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font._Height());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    line._Count += word._Count;
                    run._Count += word._Count;

                    index += word._Count;
                }
            }

            var atend = this._Text.slice(index, end).length < 1;
            if (linebreak || wrapped || atend) {
                this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                this._ActualHeight += line._Height;

                if (linebreak || wrapped) {
                    line = new _TextLayoutLine(this, index, index);
                    if (!this.OverrideLineHeight()) {
                        if (end - index < 1) {
                            line._Descend = font._Descender();
                            line._Height = font._Height();
                        }
                    } else {
                        line._Descend = this.GetDescendOverride();
                        line._Height = this.GetLineHeightOverride();
                    }

                    if (linebreak && (end - index < 1))
                        this._ActualHeight += line._Height;

                    this._Lines.push(line);
                }

                if (index < end) {
                    run = new _TextLayoutRun(line, attrs, index);
                    line._Runs.push(run);
                }
            }
        }

        attrs = nattrs;
    } while (end - index > 0);
    this._Count = index;
};
TextLayout.prototype._HorizontalAlignment = function (lineWidth) {
    var deltax = 0.0;
    var width;
    switch (this._Alignment) {
        case TextAlignment.Center:
            width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
            if (lineWidth < width)
                deltax = (width - lineWidth) / 2.0;
            break;
        case TextAlignment.Right:
            width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
            if (lineWidth < width)
                deltax = width - lineWidth;
            break;
    }
    return deltax;
};
TextLayout.prototype._Render = function (ctx, origin, offset) {
    var line;
    var x;
    var y = offset.Y;

    this.Layout();

    for (var i = 0; i < this._Lines.length; i++) {
        line = this._Lines[i];
        x = offset.X + this._HorizontalAlignment(line._Advance);
        line._Render(ctx, origin, x, y);
        y += line._Height;
    }
};

TextLayout._ValidateAttrs = function (/* List */attributes) {
    var attrs;
    if (!(attrs = attributes.First()) || attrs._Start != 0)
        return false;

    while (attrs != null) {
        if (!attrs.GetFont()) //WTF: This whole method may not be valid in our case
            return false;
        attrs = attrs.Next;
    }
    return true;
};
TextLayout._IsLineBreak = function (text) {
    var c0 = text.charAt(0);
    if (c0 === '\n')
        return 1;
    var c1 = text.charAt(1);
    if (c0 === '\r' && c1 === '\n')
        return 2;
    return 0;
};
TextLayout._GetWidthConstraint = function (availWidth, maxWidth, actualWidth) {
    if (!isFinite(availWidth)) {
        if (!isFinite(maxWidth))
            return actualWidth;
        else
            return Math.min(actualWidth, maxWidth);
    }
    return availWidth;
};
TextLayout._LayoutWordWrap = function (word, text, font, maxWidth) {
    NotImplemented("TextLayout._LayoutWordWrap");
};
TextLayout._LayoutWordNoWrap = function (word, text, font) {
    var advance = Surface.MeasureText(text, font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Count = text.length;
    word._Length = text.length;
    return false;
};
TextLayout._LayoutLwsp = function (word, text, font) {
    var advance = Surface.MeasureText(text, font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Count = text.length;
    word._Length = text.length;
};

//#endregion

//#region _TextLayoutLine

function _TextLayoutLine(layout, start, offset) {
    RefObject.call(this);
    this._Runs = new Array();
    this._Layout = layout;
    this._Start = start;
    this._Offset = offset;
    this._Advance = 0.0; //after layout, will contain horizontal distance this line advances
    this._Descend = 0.0;
    this._Height = 0.0;
    this._Width = 0.0;
    this._Length = 0;
    this._Count = 0;
}
_TextLayoutLine.InheritFrom(RefObject);

_TextLayoutLine.prototype._Render = function (ctx, origin, left, top) {
    var run;
    var x0 = left;
    //var y0 = top + this._Height + this._Descend; //not using this: we set html5 canvas to render top-left corner of text at x,y
    var y0 = top; 

    for (var i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        run._Render(ctx, origin, x0, y0);
        x0 += run._Advance;
    }
};

//#endregion

//#region _TextLayoutRun

function _TextLayoutRun(line, attrs, start) {
    RefObject.call(this);
    this._Clusters = new Array();
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0; //after layout, will contain horizontal distance this run advances
    this._Length = 0;
    this._Count = 0;
}
_TextLayoutRun.InheritFrom(RefObject);

_TextLayoutRun.prototype._GenerateCache = function () {
    var selectionLength = this._Line._Layout.GetSelectionLength();
    var selectionStart = this._Line._Layout.GetSelectionStart();
    var text = this._Line._Layout.GetText();
    var font = this._Attrs.GetFont();

    var len;
    var index = this._Start;
    //glyph before selection
    if (selectionLength == 0 || this._Start < selectionStart) {
        len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(this._Start, this._Length), font));
        index += len;
    }

    //glyph with selection
    var selectionEnd = this._Start + selectionStart + selectionLength;
    var runEnd = this.Start + this._Length;
    if (index < runEnd && index < selectionEnd) {
        len = Math.min(runEnd - index, selectionEnd - index);
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(index, len), font, true));
        index += len;
    }

    //glyph after selection
    if (index < runEnd) {
        len = runEnd - index;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(index, len), font));
        index += len;
    }
};
_TextLayoutRun.prototype._ClearCache = function () {
    this._Clusters = new Array();
};
_TextLayoutRun.prototype._Render = function (ctx, origin, x, y) {
    var x0 = x;
    if (this._Clusters.length == 0)
        this._GenerateCache();

    for (var i = 0; i < this._Clusters.length; i++) {
        var cluster = this._Clusters[i];
        ctx.Save();
        cluster._Render(ctx, origin, this._Attrs, x0, y);
        ctx.Restore();
        x0 += cluster._Advance;
    }
};

//#endregion

//#region _TextLayoutGlyphCluster

function _TextLayoutGlyphCluster(text, font, selected) {
    RefObject.call(this);
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
}
_TextLayoutGlyphCluster.InheritFrom(RefObject);

_TextLayoutGlyphCluster.prototype._Render = function (ctx, origin, attrs, x, y) {
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Transform(new TranslationMatrix(x, y - y0));

    var brush;
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font._Height());
        ctx.Fill(area, brush); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster.Painter, this._Text, attrs.GetForeground(), attrs.GetFont());
    if (attrs.IsUnderlined()) {
        //TODO: Underline
    }
};
_TextLayoutGlyphCluster.Painter = function (canvasCtx, text, foreground, font) {
    canvasCtx.fillStyle = foreground._Translate(canvasCtx);
    canvasCtx.font = font._Translate();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};

//#endregion

//#region _TextLayoutAttributes

function _TextLayoutAttributes(source, start) {
    Node.call(this);
    this._Source = source;
    this._Start = start == null ? 0 : start;
}
_TextLayoutAttributes.InheritFrom(Node);

_TextLayoutAttributes.prototype.GetBackground = function (selected) { return this._Source.GetBackground(selected); };
_TextLayoutAttributes.prototype.GetForeground = function (selected) { return this._Source.GetForeground(selected); };
_TextLayoutAttributes.prototype.GetFont = function () { return this._Source.GetFont(); };
_TextLayoutAttributes.prototype.GetDirection = function () { return this._Source.GetDirection(); };
_TextLayoutAttributes.prototype.IsUnderlined = function () { return this._Source.GetTextDecorations() & TextDecorations.Underline; };

//#endregion

//#region _LayoutWord

function _LayoutWord() {
    RefObject.call(this);
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._Count = 0;
    this._BreakOps = null;
    this._Font = new Font();
}
_LayoutWord.InheritFrom(RefObject);

//#endregion

/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="FrameworkElement.js"/>

//#region VisualTreeHelper

function VisualTreeHelper() {
    RefObject.call(this);
}
VisualTreeHelper.InheritFrom(RefObject);

VisualTreeHelper.GetChild = function (d, childIndex) {
    var fw = RefObject.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = RefObject.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetValueAt(childIndex);

    var item = RefObject.As(subtree, UIElement);
    if (item != null && childIndex === 0)
        return item;

    throw new ArgumentOutOfRangeException();
};

VisualTreeHelper.GetChildrenCount = function (d) {
    var fw = RefObject.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");

    var subtree = fw._GetSubtreeObject();
    var coll = RefObject.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetCount();

    var item = RefObject.As(subtree, UIElement);
    if (item != null)
        return 1;
    
    return 0;
};

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="DependencyProperty.js" />
/// <reference path="PropertyValueProviders.js" />
/// CODE
/// <reference path="../jquery-1.7.js" />
/// <reference path="BError.js" />
/// <reference path="MulticastEvent.js"/>
/// <reference path="Collections.js"/>
/// <reference path="List.js"/>

//#region DependencyObject

function DependencyObject() {
    RefObject.call(this);
    this._TypeName = this._GetTypeName();
    this._Initialize();
}
DependencyObject.InheritFrom(RefObject);

//#region DEPENDENCY PROPERTIES

DependencyObject.NameProperty = DependencyProperty.RegisterFull("Name", function () { return String; }, DependencyObject, "", null, null, false, DependencyObject._NameValidator);
DependencyObject.prototype.GetName = function () {
    return this.GetValue(DependencyObject.NameProperty);
};
DependencyObject.prototype.SetName = function (value) {
    this.SetValue(DependencyObject.NameProperty, value);
};

//#endregion

//#region INSTANCE METHODS

DependencyObject.prototype.FindName = function (name, templateItem) {
    if (templateItem === undefined)
        templateItem = Control.GetIsTemplateItem(this);

    var scope = NameScope.GetNameScope(this);
    if (scope && (templateItem === scope.GetIsLocked()))
        return scope.FindName(name);

    if (this._Parent)
        return this._Parent.FindName(name, templateItem);

    return undefined;
};
DependencyObject.prototype.FindNameScope = function (templateNamescope) {
    if (templateNamescope === undefined)
        templateNamescope = Control.GetIsTemplateItem(this);

    var scope = NameScope.GetNameScope(this);
    if (scope && (templateNamescope === scope.GetIsLocked()))
        return scope;

    if (this._Parent) {
        return this._Parent.FindNameScope(templateNamescope);
    }
    return undefined;
};
DependencyObject.prototype.SetNameOnScope = function (name, scope) {
    if (scope.FindName(name))
        return false;

    this.SetValue(DependencyObject.NameProperty, name);
    scope.RegisterName(name, this);
    return true;
};

DependencyObject.prototype.GetDependencyProperty = function (propName) {
    return DependencyProperty.GetDependencyProperty(this.constructor, propName);
};

DependencyObject.prototype._Initialize = function () {
    this._IsAttached = false;
    this._Providers = new Array();
    this._Providers[_PropertyPrecedence.LocalValue] = new _LocalPropertyValueProvider(this, _PropertyPrecedence.LocalValue);
    this._Providers[_PropertyPrecedence.DefaultValue] = new _DefaultValuePropertyProvider(this, _PropertyPrecedence.DefaultValue);
    this._Providers[_PropertyPrecedence.AutoCreate] = new _AutoCreatePropertyValueProvider(this, _PropertyPrecedence.AutoCreate);
    this._ProviderBitmasks = new Array();
    this._SecondaryParents = new Array();
    this.PropertyChanged = new MulticastEvent();
};
DependencyObject.prototype._GetTypeName = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

DependencyObject.prototype._GetTemplateOwner = function () {
    return this._TemplateOwner;
};
DependencyObject.prototype._SetTemplateOwner = function (value) {
    this._TemplateOwner = value;
};

DependencyObject.prototype._GetMentor = function () {
    return this._Mentor;
};
DependencyObject.prototype._SetMentor = function (value) {
    if (this._Mentor == value)
        return;
    var oldMentor = this._Mentor;
    this._Mentor = value;
    this._OnMentorChanged(oldMentor, value);
};
DependencyObject.prototype._OnMentorChanged = function (oldValue, newValue) {
    if (!(this instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateMentor, newValue);
        this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.LocalStyle])
            this._Providers[_PropertyPrecedence.LocalStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
        if (this._Providers[_PropertyPrecedence.ImplicitStyle])
            this._Providers[_PropertyPrecedence.ImplicitStyle].ForeachValue(DependencyObject._PropagateMentor, newValue);
    }
    if (this._MentorChangedCallback != null) {
        this._MentorChangedCallback(this, newValue);
    }
};

DependencyObject.prototype.SetValue = function (propd, value) {
    if (propd == null)
        throw new ArgumentException("No property specified.");
    if (propd.IsReadOnly) {
        throw new InvalidOperationException();
    }

    if (value instanceof UnsetValue) {
        this.ClearValue(propd);
        return;
    }

    var expression;
    if (value instanceof Expression)
        expression = value;
    var bindingExpression;
    if (value instanceof BindingExpressionBase)
        bindingExpression = value;

    if (bindingExpression != null) {
        var path = bindingExpression.Binding.Path.Path;
        if ((!path || path === ".") && bindingExpression.Binding.Mode === BindingMode.TwoWay)
            throw new ArgumentException("TwoWay bindings require a non-empty Path.");
        bindingExpression.Binding.Seal();
    }

    var existing = null;
    if (this._Expressions != null) {
        var refExisting = new RefParam();
        if (this._Expressions.TryGetValue(propd, refExisting))
            existing = refExisting.Value
    }

    var addingExpression = false;
    var updateTwoWay = false;
    if (expression != null) {
        if (!expression.RefEquals(existing)) {
            if (expression._Attached)
                throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");

            if (existing != null)
                this._RemoveExpression(propd);
            if (this._Expressions == null)
                this._Expressions = new Dictionary();
            this._Expressions.Add(propd, expression);
            expression._OnAttached(this);
        }
        addingExpression = true;
        value = expression.GetValue(propd);
    } else if (existing != null) {
        if (existing instanceof BindingExpressionBase) {
            if (existing.Binding.Mode === BindingMode.TwoWay) {
                updateTwoWay = !existing._Updating && !propd._IsCustom;
            } else if (!existing._Updating || existing.Binding.Mode === BindingMode.OneTime) {
                this._RemoveExpression(propd);
            }
        } else if (!existing._Updating) {
            this._RemoveExpression(propd);
        }
    }

    try {
        this._SetValue(propd, value);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    } catch (err) {
        if (!addingExpression)
            throw err;
        this._SetValue(propd, propd.DefaultValue);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    }
};
DependencyObject.prototype._SetValue = function (propd, value, error) {
    if (error == null)
        error = new BError();
    var hasCoercer = propd._HasCoercer();
    var coerced = value;
    if ((hasCoercer && !(coerced = propd._Coerce(this, coerced, error)))
            || !this._IsValueValid(propd, coerced, error)
            || !propd._Validate(this, coerced, error)) {
        if (error.IsErrored())
            throw new error.CreateException();
        return false;
    }
    var retVal = this._SetValueImpl(propd, coerced, error);
    if (error.IsErrored())
        throw new error.CreateException();
    return retVal;
};
DependencyObject.prototype._SetValueImpl = function (propd, value, error) {
    if (this._IsFrozen) {
        error.SetErrored(BError.UnauthorizedAccess, "Cannot set value for property " + propd.Name + " on frozen DependencyObject.");
        return false;
    }
    var currentValue;
    var equal = false;

    if ((currentValue = this._ReadLocalValue(propd)) == null)
        if (propd._IsAutoCreated())
            currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);

    if (currentValue != null && value != null)
        equal = !propd._AlwaysChange && currentValue == value;
    else
        equal = currentValue == null && value == null;

    if (!equal) {
        var newValue;
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated())
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);

        if (value != null && (!propd._IsAutoCreated() || !(value instanceof DependencyObject)))
            newValue = value;
        else
            newValue = null;

        if (newValue != null) {
            this._Providers[_PropertyPrecedence.LocalValue].SetValue(propd, newValue);
        }
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
    }

    return true;
};

DependencyObject.prototype.GetValue = function (propd, startingPrecedence, endingPrecedence) {
    if (startingPrecedence === undefined)
        startingPrecedence = _PropertyPrecedence.Highest;
    if (endingPrecedence === undefined)
        endingPrecedence = _PropertyPrecedence.Lowest;

    //Establish providers used
    var bitmask = this._ProviderBitmasks[propd] || 0;
    bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated())
        bitmask |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue())
        bitmask |= 1 << _PropertyPrecedence.DefaultValue;

    //Loop through providers and find the first provider that is on and contains the property value
    for (var i = startingPrecedence; i <= endingPrecedence; i++) {
        if (!(bitmask & (1 << i)))
            continue;
        var provider = this._Providers[i];
        if (!provider)
            continue;
        var val = provider.GetPropertyValue(propd);
        if (val === undefined)
            continue;
        return val;
    }
    return null;
};
DependencyObject.prototype.ClearValue = function (propd, notifyListeners, error) {
    if (notifyListeners == undefined)
        notifyListeners = true;
    if (error == undefined)
        error = new BError();

    //WTF: GetAnimationStorageFor

    var oldLocalValue;
    if ((oldLocalValue = this._ReadLocalValue(propd)) == null) {
        if (propd._IsAutoCreated())
            oldLocalValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    }

    if (oldLocalValue != null) {
        if (oldLocalValue instanceof DependencyObject) {
            if (oldLocalValue != null && !propd._IsCustom) {
                oldLocalValue._RemoveParent(this, null);

                //TODO: RemovePropertyChangeListener
                oldLocalValue._SetIsAttached(false);
                if (oldLocalValue instanceof Collection) {
                    //TODO: Changed Event - Remove Handler
                    //TODO: Item Changed Event - Remove Handler
                }
            }
        }
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated())
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);
    }

    for (var i = _PropertyPrecedence.LocalValue + 1; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider != null && provider._HasFlag(_ProviderFlags.RecomputesOnClear))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnClear, error);
    }

    if (oldLocalValue != null) {
        this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, null, notifyListeners, true, false, error);
    }
};
DependencyObject.prototype._ReadLocalValue = function (propd) {
    return this._Providers[_PropertyPrecedence.LocalValue].GetPropertyValue(propd);
};
DependencyObject.prototype._GetValueNoAutoCreate = function (propd) {
    var v = this.GetValue(propd, _PropertyPrecedence.LocalValue, _PropertyPrecedence.InheritedDataContext);
    if (v == null && propd._IsAutoCreated())
        v = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    return v;
};
DependencyObject.prototype._GetValueNoDefault = function (propd) {
    var value = null;
    for (var i = 0; i < _PropertyPrecedence.DefaultValue; i++) {
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        value = provider.GetPropertyValue(propd);
        if (value == undefined)
            continue;
        return value;
    }
    return null;
};
DependencyObject.prototype._PropertyHasValueNoAutoCreate = function (propd, obj) {
    var v = this._GetValueNoAutoCreate(propd);
    return v == null ? obj == null : v == obj;
};
DependencyObject.prototype._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
    var bitmask = this._ProviderBitmasks[propd] || 0;
    if (newProviderValue != null)
        bitmask |= 1 << providerPrecedence;
    else
        bitmask &= ~(1 << providerPrecedence);
    this._ProviderBitmasks[propd] = bitmask;

    var higher = 0;
    for (var i = providerPrecedence; i >= _PropertyPrecedence.LocalValue; i--) {
        higher |= 1 << i;
    }
    higher &= bitmask;
    higher |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated())
        higher |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue())
        higher |= 1 << _PropertyPrecedence.DefaultValue;

    for (var j = providerPrecedence; j >= _PropertyPrecedence.Highest; j--) {
        if (!(higher & (1 << j)))
            continue;
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        if (provider.GetPropertyValue(propd) != null) {
            this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);
            return;
        }
    }

    var oldValue = undefined;
    var newValue = undefined;

    if (oldProviderValue == null || newProviderValue == null) {
        var lowerPriorityValue = this.GetValue(propd, providerPrecedence + 1);
        if (newProviderValue == null) {
            oldValue = oldProviderValue;
            newValue = lowerPriorityValue;
        } else if (oldProviderValue == null) {
            oldValue = lowerPriorityValue;
            newValue = newProviderValue;
        }
    } else {
        oldValue = oldProviderValue;
        newValue = newProviderValue;
    }

    var equal = oldValue == null && newValue == null;
    if (oldValue != null && newValue != null) {
        equal = !propd._AlwaysChange && oldValue == newValue;
    }

    if (equal)
        return;

    if (providerPrecedence != _PropertyPrecedence.IsEnabled && this._Providers[_PropertyPrecedence.IsEnabled] && this._Providers[_PropertyPrecedence.IsEnabled].LocalValueChanged(propd))
        return;

    this._CallRecomputePropertyValueForProviders(propd, providerPrecedence, error);

    var oldDO = undefined;
    var newDO = undefined;

    var setsParent = setParent && !propd._IsCustom;

    if (oldValue != null && (oldValue instanceof DependencyObject))
        oldDO = oldValue;
    if (newValue != null && (newValue instanceof DependencyObject))
        newDO = newValue;

    if (oldDO != null) {
        if (setsParent) {
            oldDO._SetIsAttached(false);
            oldDO._RemoveParent(this, null);
            oldDO._RemoveTarget(this);
            oldDO.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            if (oldDO instanceof Collection) {
                oldDO.Changed.Unsubscribe(this._OnCollectionChanged, this);
                oldDO.ItemChanged.Unsubscribe(this._OnCollectionItemChanged, this);
            }
        } else {
            oldDO._SetMentor(null);
        }
    }

    if (newDO != null) {
        if (setsParent) {
            newDO._SetIsAttached(this._IsAttached);
            newDO._AddParent(this, mergeNamesOnSetParent, error);
            if (error.IsErrored())
                return;

            newDO._SetResourceBase(this._GetResourceBase());

            if (newDO instanceof Collection) {
                newDO.Changed.Subscribe(this._OnCollectionChanged, this);
                newDO.ItemChanged.Subscribe(this._OnCollectionItemChanged, this);
            }

            newDO.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);
            newDO._AddTarget(this);
        } else {
            var cur = this;
            while (cur && !(cur instanceof FrameworkElement))
                cur = cur._GetMentor();
            newDO._SetMentor(cur);
        }
    }

    //Construct property changed event args and raise
    if (notifyListeners) {
        var args = {
            Property: propd,
            OldValue: oldValue,
            NewValue: newValue
        };
        this._OnPropertyChanged(args, error);

        if (propd != null && propd._ChangedCallback != null)
            propd._ChangedCallback(this, args, error);

        var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
        if (inheritedProvider != null) {
            if (providerPrecedence == _PropertyPrecedence.Inherited) {
            } else {
                if (_InheritedPropertyValueProvider.IsInherited(this, propd)
                         && this._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited) {
                    inheritedProvider.PropagateInheritedProperty(propd, this, this);
                }
            }
        }
    }

    //if ([this property has an active animation])
    //Needs clock tick..
};
DependencyObject.prototype._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
    for (var i = 0; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        if (i == providerPrecedence)
            continue;

        if (i < providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnLowerPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnLowerPriorityChange, error);
        else if (i > providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnHigherPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnHigherPriorityChange, error);
    }
};
DependencyObject.prototype._PropagateInheritedValue = function (inheritable, source, newValue) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return true;

    inheritedProvider._SetPropertySource(inheritable, source);
    var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
    if (!propd)
        return false;

    var error = new BError();
    this._ProviderValueChanged(_PropertyPrecedence.Inherited, propd, null, newValue, true, false, false, error);
    return this._GetPropertyValueProvider(propd) == _PropertyPrecedence.Inherited;
};
DependencyObject.prototype._GetInheritedValueSource = function (inheritable) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return null;
    return inheritedProvider._GetPropertySource(inheritable);
};
DependencyObject.prototype._SetInheritedValueSource = function (inheritable, source) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return;

    if (!source) {
        var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
        if (propd)
            return;
        var bitmask = this._ProviderBitmasks[propd];
        bitmask &= ~(1 << _PropertyPrecedence.Inherited);
        this._ProviderBitmasks[propd] = bitmask;
    }
    inheritedProvider._SetPropertySource(inheritable, source);
};
DependencyObject.prototype._GetPropertyValueProvider = function (propd) {
    var bitmask = this._ProviderBitmasks[propd];
    for (var i = 0; i < _PropertyPrecedence.Lowest; i++) {
        var p = 1 << i;
        if ((bitmask & p) == p)
            return i;
        if (i == _PropertyPrecedence.DefaultValue && propd._HasDefaultValue())
            return i;
        if (i == _PropertyPrecedence.AutoCreate && propd._IsAutoCreated())
            return i;
    }
    return -1;
};
DependencyObject.prototype._IsValueValid = function (propd, coerced, error) {
    //TODO: Handle type problems
    return true;
};
DependencyObject.prototype._RemoveExpression = function (propd) {
    var ref = new RefParam();
    if (this._Expressions != null && this._Expressions.TryGetValue(propd, ref)) {
        this._Expressions.Remove(propd);
        ref.Value._OnDetached(this);
    }
};

DependencyObject.prototype._AddTarget = function (obj) {
};
DependencyObject.prototype._RemoveTarget = function (obj) {
};

DependencyObject.prototype._GetParent = function () {
    return this._Parent;
};
DependencyObject.prototype._PermitsMultipleParents = function () {
    return true;
};
DependencyObject.prototype._AddParent = function (parent, mergeNamesFromSubtree, error) {
    if (false/* TODO: IsShuttingDown */) {
        this._Parent = null;
        return;
    }

    var current = parent;
    while (current) {
        if (current == this) {
            //Warn: cycle found
            return;
        }
        current = current._GetParent();
    }

    if (this._Parent != null && !this._PermitsMultipleParents()) {
        if (parent instanceof DependencyObjectCollection && (!parent._GetIsSecondaryParent() || this._HasSecondaryParents())) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return;
        }
    }

    if (this._Parent != null || this._HasSecondaryParents()) {
        this._AddSecondaryParent(parent);
        if (this._Parent != null && !(this._Parent instanceof ResourceDictionary))
            this._SetMentor(null);
        if (this._SecondaryParents.length > 1 || !(parent instanceof DependencyObjectCollection) || !parent._GetIsSecondaryParent())
            return;
    }

    var thisScope = NameScope.GetNameScope(this);
    var parentScope = parent.FindNameScope();
    if (thisScope) {
        if (thisScope._GetTemporary()) {
            if (parentScope) {
                parentScope._MergeTemporaryScope(thisScope, error);
                this.ClearValue(NameScope.NameScopeProperty, false);
            }
        } else {
            if (true /* TODO: this._IsHydratedFromXaml()*/) {
                var name = this.GetName();
                if (parentScope && name && name.length > 0) {
                    var existingObj = parentScope.FindName(name);
                    if (existingObj !== this) {
                        if (existingObj) {
                            error.SetErrored(BError.Argument, "Name is already registered in new parent namescope.");
                            return;
                        }
                        parentScope.RegisterName(name, this);
                    }
                }
            }
        }
    } else {
        if (parentScope && mergeNamesFromSubtree) {
            var tempScope = new NameScope();
            tempScope._SetTemporary(true);

            this._RegisterAllNamesRootedAt(tempScope, error);

            if (error.IsErrored())
                return;

            parentScope._MergeTemporaryScope(tempScope, error);
        }
    }

    if (error == null || !error.IsErrored()) {
        this._Parent = parent;
        var d = parent;
        while (d != null && !(d instanceof FrameworkElement)) {
            d = d._GetMentor();
        }
        this._SetMentor(d);
    }
};
DependencyObject.prototype._RemoveParent = function (parent, error) {
    if (this._RemoveSecondaryParent(parent)) {
        if (this._HasSecondaryParents() || !(parent instanceof DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
            return;
    } else {
        //WTF: Hack?
        if (this._Parent != parent)
            return;
    }

    if (false/* TODO:IsShuttingDown */) {
        this._Parent = null;
        return;
    }

    if (!this._HasSecondaryParents()) {
        var parentScope = parent.FindNameScope();
        if (parentScope)
            this._UnregisterAllNamesRootedAt(parentScope);
        this._SetMentor(null);
    }

    if (error == null || !error.IsErrored()) {
        if (this._Parent == parent)
            this._Parent = null;
    }
};
DependencyObject.prototype._AddSecondaryParent = function (obj) {
    //TODO: Subscribe to obj.Destroyed --> When destroyed, RemoveSecondaryParent(obj)
    this._SecondaryParents.push(obj);
};
DependencyObject.prototype._RemoveSecondaryParent = function (obj) {
    var index = -1;
    for (var i = 0; i < this._SecondaryParents.length; i++) {
        if (this._SecondaryParents[i] == obj) {
            index = i;
            break;
        }
    }
    if (index < 0)
        return false;
    this._SecondaryParents.splice(index, 1);
    //TODO: Unsubscribe to obj.Destroyed
    return true;
};
DependencyObject.prototype._GetSecondaryParents = function () {
    return this._SecondaryParents;
};
DependencyObject.prototype._HasSecondaryParents = function () {
    return this._SecondaryParents.length > 0;
};

DependencyObject.prototype._GetResourceBase = function () {
    var rb = this._ResourceBase;
    if (rb)
        rb = rb.replace(/^\s+/, ''); //trim if not null
    if (rb != null && rb.length > 0)
        return this._ResourceBase;
    if (this._Parent != null)
        return this._Parent._GetResourceBase();
    return this._ResourceBase;
};
DependencyObject.prototype._SetResourceBase = function (value) {
    this._ResourceBase = value;
};

DependencyObject.prototype._SetIsAttached = function (value) {
    if (this._IsAttached == value)
        return;
    this._IsAttached = value;
    this._OnIsAttachedChanged(value);
};
DependencyObject.prototype._OnIsAttachedChanged = function (value) {
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateIsAttached, value);
    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateIsAttached, value);
};

DependencyObject.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property === DependencyObject.NameProperty) {
        var scope = this.FindNameScope();
        if (scope && args.NewValue) {
            if (args.OldValue)
                scope.UnregisterName(args.OldValue);
            scope.RegisterName(args.NewValue, this);
            if (/* TODO: this.IsHydratedFromXaml() && */this._Parent) {
                scope = this._Parent.FindNameScope();
                if (scope) {
                    if (args.OldValue)
                        scope.UnregisterName(args.OldValue);
                    scope.RegisterName(args.NewValue, this);
                }
            }
        }
    }
    this.PropertyChanged.Raise(this, args);
};
DependencyObject.prototype._OnSubPropertyChanged = function (sender, args) { };

DependencyObject.prototype._OnCollectionChanged = function (sender, args) {
};
DependencyObject.prototype._OnCollectionItemChanged = function (sender, args) {
};

DependencyObject.prototype._RegisterAllNamesRootedAt = function (namescope, error) {
    if (error.IsErrored())
        return;
    if (this._RegisteringNames)
        return;
    if (this._PermitsMultipleParents() && this._HasSecondaryParents())
        return;

    this._RegisteringNames = true;

    var mergeNamescope = false;
    var registerName = false;
    var recurse = false;

    var thisNs = NameScope.GetNameScope(this);

    this._RegisteringNames = false;
};
DependencyObject.prototype._UnregisterAllNamesRootedAt = function (fromNs) {
    if (this._RegisteringNames)
        return;
    if (this._PermitsMultipleParents() && this._HasSecondaryParents())
        return;
    this._RegisteringNames = true;

    var thisNs = NameScope.GetNameScope(this);
    if (/* TODO: this._IsHydratedFromXaml() || */thisNs == null || thisNs._GetTemporary()) {
        var name = this.GetName();
        if (name && name.length > 0)
            fromNs.UnregisterName(name);
    }

    if (thisNs && !thisNs._GetTemporary()) {
        this._RegisteringNames = false;
        return;
    }

    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._UnregisterDONames, fromNs);
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._UnregisterDONames, fromNs);

    this._RegisteringNames = false;
}

DependencyObject._UnregisterDONames = function (propd, value, fromNs) {
    if (!propd._IsCustom && value != null && value instanceof DependencyObject) {
        value._UnregisterAllNamesRootedAt(fromNs);
    }
};
DependencyObject._PropagateIsAttached = function (propd, value, newIsAttached) {
    if (propd._IsCustom)
        return;

    if (value != null && value instanceof DependencyObject) {
        value._SetIsAttached(newIsAttached);
    }
};
DependencyObject._PropagateMentor = function (propd, value, newMentor) {
    if (value != null && value instanceof DependencyObject) {
        value._SetMentor(newMentor);
    }
};

//#endregion

//#endregion

//#region NameScope

function NameScope() {
    DependencyObject.call(this);
    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
}
NameScope.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", function () { return NameScope; }, NameScope);
NameScope.GetNameScope = function (d) {
    return d.GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    d.SetValue(NameScope.NameScopeProperty, value);
};

//#endregion

NameScope.prototype.GetIsLocked = function () {
    return this._IsLocked;
};
NameScope.prototype.Lock = function () {
    this._IsLocked = true;
};

NameScope.prototype.RegisterName = function (name, obj) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        this._Names = new Array();

    var existingObj = this._Names[name];
    if (existingObj == obj)
        return;

    if (existingObj) {
        //TODO: Remove Handler - Destroyed Event (existingObj)
    }

    //TODO: Add Handler - Destroyed Event (obj)
    this._Names[name] = obj;
};
NameScope.prototype.UnregisterName = function (name) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        return;

    var objd = this._Names[name];
    if (objd instanceof DependencyObject) {
        //TODO: Remove handler - Destroyed Event
        delete this._Names[name];
    }
};
NameScope.prototype.FindName = function (name) {
    if (!this._Names)
        return undefined;
    if (name == null) {
        Warn("(null) name specified in NameScope.FindName.");
        return undefined;
    }
    return this._Names[name];
};

NameScope.prototype._MergeTemporaryScope = function (temp, error) {
    if (!temp || !temp._Names)
        return;

    for (var name in temp._Names) {
        var value = temp._Names[name];
        var o = this.FindName(name);
        if (o && o !== value) {
            error.SetErrored(BError.Argument, "The name already exists in the tree.");
            return;
        }
    }

    for (var name in temp._Names) {
        this.RegisterName(name, temp._Names[name]);
    }
};
NameScope.prototype._GetTemporary = function () {
    return this._Temporary;
};
NameScope.prototype._SetTemporary = function (value) {
    this._Temporary = value;
};

//#endregion

/// <reference path="DependencyObject.js"/>

//#region Geometry

function Geometry() {
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Geometry.InheritFrom(DependencyObject);

Geometry.prototype.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();

    //TODO: Path build

    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;

    //TODO: Transform

    return bounds;
};
Geometry.prototype.ComputePathBounds = function () {
};

//#endregion

//#region RectangleGeometry

function RectangleGeometry() {
}
RectangleGeometry.InheritFrom(Geometry);

//#region DEPENDENCY PROPERTIES

RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry);
RectangleGeometry.prototype.GetRect = function () {
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.prototype.SetRect = function (value) {
    this.SetValue(RectangleGeometry.RectProperty, value);
};

//#endregion

RectangleGeometry.prototype.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};

RectangleGeometry.prototype.Draw = function (canvasCtx) {
    var rect = this.GetRect();
    canvasCtx.beginPath();
    canvasCtx.rect(rect.X, rect.Y, rect.Width, rect.Height);
};

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="Primitives.js"/>
/// CODE
/// <reference path="Geometry.js"/>
/// <reference path="UIElement.js"/>
/// <reference path="DependencyProperty.js"/>

//#region LayoutInformation

function LayoutInformation() {
    RefObject.call(this);
}
LayoutInformation.InheritFrom(RefObject);

//#region DEPENDENCY PROPERTIES

LayoutInformation.LayoutClipProperty = DependencyProperty.RegisterAttached("LayoutClip", function () { return Geometry; }, LayoutInformation);
LayoutInformation.GetLayoutClip = function (d) {
    return d.GetValue(LayoutInformation.LayoutClipProperty);
};
LayoutInformation.SetLayoutClip = function (d, value) {
    d.SetValue(LayoutInformation.LayoutClipProperty, value);
};

LayoutInformation.LayoutExceptionElementProperty = DependencyProperty.RegisterAttached("LayoutExceptionElement", function () { return UIElement; }, LayoutInformation);
LayoutInformation.GetLayoutExceptionElement = function (d) {
    return d.GetValue(LayoutInformation.LayoutExceptionElementProperty);
};
LayoutInformation.SetLayoutExceptionElement = function (d, value) {
    d.SetValue(LayoutInformation.LayoutExceptionElementProperty, value);
};

LayoutInformation.LayoutSlotProperty = DependencyProperty.RegisterAttached("LayoutSlot", function () { return Rect; }, LayoutInformation, new Rect());
LayoutInformation.GetLayoutSlot = function (d) {
    return d.GetValue(LayoutInformation.LayoutSlotProperty);
};
LayoutInformation.SetLayoutSlot = function (d, value) {
    d.SetValue(LayoutInformation.LayoutSlotProperty, value);
};

LayoutInformation.PreviousConstraintProperty = DependencyProperty.RegisterAttached("PreviousConstraint", function () { return Size; }, LayoutInformation);
LayoutInformation.GetPreviousConstraint = function (d) {
    return d.GetValue(LayoutInformation.PreviousConstraintProperty);
};
LayoutInformation.SetPreviousConstraint = function (d, value) {
    d.SetValue(LayoutInformation.PreviousConstraintProperty, value);
};

LayoutInformation.FinalRectProperty = DependencyProperty.RegisterAttached("FinalRect", function () { return Rect; }, LayoutInformation);
LayoutInformation.GetFinalRect = function (d) {
    return d.GetValue(LayoutInformation.FinalRectProperty);
};
LayoutInformation.SetFinalRect = function (d, value) {
    d.SetValue(LayoutInformation.FinalRectProperty, value);
};

LayoutInformation.LastRenderSizeProperty = DependencyProperty.RegisterAttached("LastRenderSize", function () { return Size; }, LayoutInformation);
LayoutInformation.GetLastRenderSize = function (d) {
    return d.GetValue(LayoutInformation.LastRenderSizeProperty);
};
LayoutInformation.SetLastRenderSize = function (d, value) {
    d.SetValue(LayoutInformation.LastRenderSizeProperty, value);
};

LayoutInformation.VisualOffsetProperty = DependencyProperty.RegisterAttached("VisualOffset", function () { return Point; }, LayoutInformation);
LayoutInformation.GetVisualOffset = function (d) {
    return d.GetValue(LayoutInformation.VisualOffsetProperty);
};
LayoutInformation.SetVisualOffset = function (d, value) {
    d.SetValue(LayoutInformation.VisualOffsetProperty, value);
};

//#endregion

//#endregion

//#region LayoutPass

function LayoutPass() {
    RefObject.call(this);
    this._MeasureList = new List();
    this._ArrangeList = new List();
    this._SizeList = new List();
    this._Count = 0;
    this._Updated = false;
}
LayoutPass.InheritFrom(RefObject);

LayoutPass.MaxCount = 250;

//#endregion

/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="JsonParser.js"/>

//#region FrameworkTemplate

function FrameworkTemplate() {
    DependencyObject.call(this);
}
FrameworkTemplate.InheritFrom(DependencyObject);

FrameworkTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};
//#endregion

//#region ControlTemplate

function ControlTemplate(targetType, json) {
    FrameworkTemplate.call(this);
    this.SetTargetType(targetType);
    this._TempJson = json;
}
ControlTemplate.InheritFrom(FrameworkTemplate);

//#region DEPENDENCY PROPERTIES

ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);
ControlTemplate.prototype.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.prototype.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};

//#endregion

ControlTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
    if (this._TempJson) {
        var namescope = new NameScope();
        var parser = new JsonParser();
        parser._TemplateBindingSource = templateBindingSource;
        var root = parser.CreateObject(this._TempJson, namescope);
        NameScope.SetNameScope(root, namescope);
        return root;
    }
    FrameworkTemplate.prototype._GetVisualTreeWithError.call(this, templateBindingSource, error);
};

//#endregion

//#region DataTemplate

function DataTemplate() {
    FrameworkTemplate.call(this);
}
DataTemplate.InheritFrom(FrameworkTemplate);

DataTemplate.CreateTemplateFromJson = function (json) {
    var template = new DataTemplate();
    var namescope = new NameScope();
    var parser = new JsonParser();
    var root = parser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};

//#endregion

/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="PropertyValueProviders.js"/>

//#region TextElement

function TextElement() {
    DependencyObject.call(this);

    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    this._Font = new Font();
    this._UpdateFont(true);
}
TextElement.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

TextElement.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextElement, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextElement.prototype.GetForeground = function () {
    return this.GetValue(TextElement.ForegroundProperty);
};
TextElement.prototype.SetForeground = function (value) {
    this.SetValue(TextElement.ForegroundProperty, value);
};

TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY);
TextElement.prototype.GetFontFamily = function () {
    return this.GetValue(TextElement.FontFamilyProperty);
};
TextElement.prototype.SetFontFamily = function (value) {
    this.SetValue(TextElement.FontFamilyProperty, value);
};

TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH);
TextElement.prototype.GetFontStretch = function () {
    return this.GetValue(TextElement.FontStretchProperty);
};
TextElement.prototype.SetFontStretch = function (value) {
    this.SetValue(TextElement.FontStretchProperty, value);
};

TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE);
TextElement.prototype.GetFontStyle = function () {
    return this.GetValue(TextElement.FontStyleProperty);
};
TextElement.prototype.SetFontStyle = function (value) {
    this.SetValue(TextElement.FontStyleProperty, value);
};

TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextElement, Font.DEFAULT_WEIGHT);
TextElement.prototype.GetFontWeight = function () {
    return this.GetValue(TextElement.FontWeightProperty);
};
TextElement.prototype.SetFontWeight = function (value) {
    this.SetValue(TextElement.FontWeightProperty, value);
};

TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextElement, Font.DEFAULT_SIZE);
TextElement.prototype.GetFontSize = function () {
    return this.GetValue(TextElement.FontSizeProperty);
};
TextElement.prototype.SetFontSize = function (value) {
    this.SetValue(TextElement.FontSizeProperty, value);
};

TextElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, TextElement);
TextElement.prototype.GetLanguage = function () {
    return this.GetValue(TextElement.LanguageProperty);
};
TextElement.prototype.SetLanguage = function (value) {
    this.SetValue(TextElement.LanguageProperty, value);
};

TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return Number; }, TextElement, TextDecorations.None);
TextElement.prototype.GetTextDecorations = function () {
    return this.GetValue(TextElement.TextDecorationsProperty);
};
TextElement.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextElement.TextDecorationsProperty, value);
};

TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextElement);
TextElement.prototype.GetFontResource = function () {
    return this.GetValue(TextElement.FontResourceProperty);
};
TextElement.prototype.SetFontResource = function (value) {
    this.SetValue(TextElement.FontResourceProperty, value);
};

//#endregion

//#region TextAttributes Methods

TextElement.prototype.GetBackground = function (selected) { return null; }
//TextElement.prototype.GetForeground (DP)
TextElement.prototype.GetFont = function () { return this._Font; };
TextElement.prototype.GetDirection = function () { return FlowDirection.LeftToRight; };
//TextElement.prototype.GetTextDecorations (DP)

//#endregion

TextElement.prototype._SerializeText = function (str) { return str; };
TextElement.prototype._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    return changed || force;
};
TextElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextElement) {
        DependencyObject.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == TextElement.FontFamilyProperty
        || args.Property == TextElement.FontSizeProperty
        || args.Property == TextElement.FontStretchProperty
        || args.Property == TextElement.FontStyleProperty
        || args.Property == TextElement.FontWeightProperty) {
        this._UpdateFont(false);
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region Inline

function Inline() {
    TextElement.call(this);
    this._Autogen = false;
}
Inline.InheritFrom(TextElement);

Inline.prototype.Equals = function (inline) {
    if (this.GetFontFamily() != inline.GetFontFamily())
        return false;
    if (this.GetFontSize() != inline.GetFontSize())
        return false;
    if (this.GetFontStyle() != inline.GetFontStyle())
        return false;
    if (this.GetFontWeight() != inline.GetFontWeight())
        return false;
    if (this.GetFontStretch() != inline.GetFontStretch())
        return false;
    if (this.GetTextDecorations() != inline.GetTextDecorations())
        return false;
    if (this.GetForeground() != inline.GetForeground()) //TODO: Equals?
        return false;
    return true;
};

Inline.prototype._GetAutogenerated = function () {
    return this._Autogen;
};
Inline.prototype._SetAutogenerated = function (value) {
    this._Autogen = value;
};

//#endregion

//#region Run

function Run() {
    Inline.call(this);
}
Run.InheritFrom(Inline);

//#region DEPENDENCY PROPERTIES

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, Run, FlowDirection.LeftToRight);
Run.prototype.GetFlowDirection = function () {
    return this.GetValue(Run.FlowDirectionProperty);
};
Run.prototype.SetFlowDirection = function (value) {
    this.SetValue(Run.FlowDirectionProperty, value);
};

Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);
Run.prototype.GetText = function () {
    return this.GetValue(Run.TextProperty);
};
Run.prototype.SetText = function (value) {
    this.SetValue(Run.TextProperty, value);
};

//#endregion

Run.prototype._SerializeText = function (str) {
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};

//#endregion

//#region Span

function Span() {
    Inline.call(this);
}
Span.InheritFrom(Inline);

//#region DEPENDENCY PROPERTIES

Span._CreateInlineCollection = function (obj) {
    var inlines = new InlineCollection();
    if (obj instanceof Hyperlink)
        inlines._SetIsForHyperlink();
    return inlines;
};
Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, null, { GetValue: function (obj) { return Span._CreateInlineCollection(obj); } });
Span.prototype.GetInlines = function () {
    return this.GetValue(Span.InlinesProperty);
};

//#endregion

Span.prototype._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
Span.prototype._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
        if (args.Action === CollectionChangedArgs.Action.Add)
            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
        this._NotifyLayoutContainerOnCollectionChanged(sender, args);
    } else {
        Inline.prototype._OnCollectionChanged.call(this, sender, args);
    }
};

//#endregion

//#region LineBreak

function LineBreak() {
    Inline.call(this);
}
LineBreak.InheritFrom(Inline);

//#endregion

//#region Hyperlink

function Hyperlink() {
    Span.call(this);
}
Hyperlink.InheritFrom(Span);

//#endregion

//#region Block

function Block() {
    TextElement.call(this);
}
Block.InheritFrom(TextElement);

//#region DEPENDENCY PROPERTIES

Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.prototype.GetInlines = function () {
    return this.GetValue(Block.InlinesProperty);
};
Block.prototype.SetInlines = function (value) {
    this.SetValue(Block.InlinesProperty, value);
};

//#endregion

//#endregion

//#region Paragraph

function Paragraph() {
    Block.call(this);
}
Paragraph.InheritFrom(Block);

//#endregion

//#region Section

function Section() {
    TextElement.call(this);
}
Section.InheritFrom(TextElement);

//#region DEPENDENCY PROPERTIES

Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return Object; }, Section);
Section.prototype.GetBlocks = function () {
    return this.GetValue(Section.BlocksProperty);
};
Section.prototype.SetBlocks = function (value) {
    this.SetValue(Section.BlocksProperty, value);
};

//#endregion

//#endregion

/// <reference path="DependencyObject.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyProperty.js" />
/// <reference path="Canvas.js" />
/// <reference path="Dirty.js"/>
/// <reference path="App.js"/>
/// <reference path="Collections.js"/>
/// <reference path="Geometry.js"/>
/// <reference path="Brushes.js"/>

var UIElementFlags = {
    None: 0,

    RenderVisible: 0x02,
    HitTestVisible: 0x04,
    TotalRenderVisible: 0x08,
    TotalHitTestVisible: 0x10,

    DirtyArrangeHint: 0x800,
    DirtyMeasureHint: 0x1000,
    DirtySizeHint: 0x2000
};

//#region UIElement

function UIElement() {
    DependencyObject.call(this);

    this.Loaded = new MulticastEvent();
    this.Invalidated = new MulticastEvent();

    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);

    this._Flags = UIElementFlags.RenderVisible | UIElementFlags.HitTestVisible;

    this._HiddenDesire = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._Bounds = new Rect();
    this._GlobalBounds = new Rect();
    this._SurfaceBounds = new Rect();

    this._DirtyFlags = _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    this._UpDirtyNode = this._DownDirtyNode = null;
    this._ForceInvalidateOfNewBounds = false;
    this._DirtyRegion = new Rect();
    this._DesiredSize = new Size();
    this._RenderSize = new Size();

    this._ComputeLocalTransform();
    this._ComputeLocalProjection();
    this._ComputeTotalRenderVisibility();
    this._ComputeTotalHitTestVisibility();

    this.MouseMove = new MulticastEvent();
    this.MouseMove.Subscribe(this.OnMouseMove, this);
    
    this.MouseLeftButtonDown = new MulticastEvent();
    this.MouseLeftButtonDown.Subscribe(this.OnMouseLeftButtonDown, this);

    this.MouseLeftButtonUp = new MulticastEvent();
    this.MouseLeftButtonUp.Subscribe(this.OnMouseLeftButtonUp, this);

    this.MouseRightButtonDown = new MulticastEvent();
    this.MouseRightButtonDown.Subscribe(this.OnMouseRightButtonDown, this);

    this.MouseRightButtonUp = new MulticastEvent();
    this.MouseRightButtonUp.Subscribe(this.OnMouseRightButtonUp, this);

    this.MouseEnter = new MulticastEvent();
    this.MouseEnter.Subscribe(this.OnMouseEnter, this);

    this.MouseLeave = new MulticastEvent();
    this.MouseLeave.Subscribe(this.OnMouseLeave, this);

    this.LostMouseCapture = new MulticastEvent();

    this.GotFocus = new MulticastEvent();
    this.GotFocus.Subscribe(this.OnGotFocus, this);

    this.LostFocus = new MulticastEvent();
    this.LostFocus.Subscribe(this.OnLostFocus, this);
}
UIElement.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

UIElement.ClipProperty = DependencyProperty.Register("Clip", function () { return Geometry; }, UIElement);
UIElement.prototype.GetClip = function () {
    return this.GetValue(UIElement.ClipProperty);
};
UIElement.prototype.SetClip = function (value) {
    this.SetValue(UIElement.ClipProperty, value);
};

//UIElement.CacheModeProperty;
//UIElement.EffectProperty;
//UIElement.ProjectionProperty;

UIElement.IsHitTestVisibleProperty = DependencyProperty.Register("IsHitTestVisible", function () { return Boolean; }, UIElement);
UIElement.prototype.GetIsHitTestVisible = function () {
    return this.GetValue(UIElement.IsHitTestVisibleProperty);
};
UIElement.prototype.SetIsHitTestVisible = function (value) {
    this.SetValue(UIElement.IsHitTestVisibleProperty, value);
};

UIElement.OpacityMaskProperty = DependencyProperty.Register("OpacityMask", function () { return Brush; }, UIElement);
UIElement.prototype.GetOpacityMask = function () {
    return this.GetValue(UIElement.OpacityMaskProperty);
};
UIElement.prototype.SetOpacityMask = function (value) {
    this.SetValue(UIElement.OpacityMaskProperty, value);
};

UIElement.OpacityProperty = DependencyProperty.Register("Opacity", function () { return Number; }, UIElement, 1.0);
UIElement.prototype.GetOpacity = function () {
    return this.GetValue(UIElement.OpacityProperty);
};
UIElement.prototype.SetOpacity = function (value) {
    this.SetValue(UIElement.OpacityProperty, value);
};

//UIElement.RenderTransformOriginProperty;
//UIElement.AllowDropProperty;

UIElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () { return Number; }, UIElement, CursorType.Default, null); //, UIElement._CoerceCursor);
UIElement.prototype.GetCursor = function () {
    return this.GetValue(UIElement.CursorProperty);
};
UIElement.prototype.SetCursor = function (value) {
    this.SetValue(UIElement.CursorProperty, value);
};

UIElement.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, UIElement, null, { GetValue: function () { return new ResourceDictionary(); } });
UIElement.prototype.GetResources = function () {
    return this.GetValue(UIElement.ResourcesProperty);
};

UIElement.TriggersProperty = DependencyProperty.RegisterFull("Triggers", function () { return Object; }, UIElement/*, null, { GetValue: function () { } }*/);
UIElement.prototype.GetTriggers = function () {
    return this.GetValue(UIElement.TriggersProperty);
};

UIElement.UseLayoutRoundingProperty = DependencyProperty.Register("UseLayoutRounding", function () { return Boolean; }, UIElement);
UIElement.prototype.GetUseLayoutRounding = function () {
    return this.GetValue(UIElement.UseLayoutRoundingProperty);
};
UIElement.prototype.SetUseLayoutRounding = function (value) {
    this.SetValue(UIElement.UseLayoutRoundingProperty, value);
};

UIElement.VisibilityProperty = DependencyProperty.Register("Visibility", function () { return Number; }, UIElement, Visibility.Visible);
UIElement.prototype.GetVisibility = function () {
    return this.GetValue(UIElement.VisibilityProperty);
};
UIElement.prototype.SetVisibility = function (value) {
    this.SetValue(UIElement.VisibilityProperty, value);
};

UIElement.TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
UIElement.prototype.GetTag = function () {
    return this.GetValue(UIElement.TagProperty);
};
UIElement.prototype.SetTag = function (value) {
    this.SetValue(UIElement.TagProperty, value);
};

//#endregion

//#region INSTANCE METHODS

UIElement.prototype.SetVisualParent = function (/* UIElement */value) {
    this._VisualParent = value;
};
UIElement.prototype.GetVisualParent = function () {
    return this._VisualParent; //UIElement
};
UIElement.prototype.IsLayoutContainer = function () { return false; };
UIElement.prototype.IsContainer = function () { return this.IsLayoutContainer(); };
UIElement.prototype._CacheInvalidateHint = function () {
};

UIElement.prototype._FullInvalidate = function (renderTransform) {
    this._Invalidate();
    if (renderTransform) {
        this._UpdateTransform();
        this._UpdateProjection();
    }
    this._UpdateBounds(true);
};
UIElement.prototype._Invalidate = function (rect) {
    if (!rect)
        rect = this._SurfaceBounds;
    if (!this._GetRenderVisible() || IsOpacityInvisible(this._TotalOpacity))
        return;

    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
        //WTF: Invalidate bitmap cache
        //TODO: Render Intermediate not implemented
        this._DirtyRegion = this._DirtyRegion.Union(rect);
        //TODO: Alert needs redraw
        this._OnInvalidated();
    }
};
UIElement.prototype._InvalidateMeasure = function () {
    this._DirtyFlags |= _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    //TODO: Alert redraw necessary
};
UIElement.prototype._InvalidateArrange = function () {
    this._DirtyFlags |= _Dirty.Arrange;
    this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
    //TODO: Alert redraw necessary
};
UIElement.prototype._InvalidateVisibility = function () {
    this._UpdateTotalRenderVisibility();
    this._InvalidateParent(this._GetSubtreeBounds());
};
UIElement.prototype._InvalidateSubtreePaint = function () {
    this._Invalidate(this._GetSubtreeBounds());
};
UIElement.prototype._InvalidateParent = function (r) {
    var visualParent = this.GetVisualParent();
    if (visualParent)
        visualParent._Invalidate(r);
    else if (this._IsAttached)
        App.Instance.MainSurface._Invalidate(r);
};

UIElement.prototype._UpdateBounds = function (forceRedraw) {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Bounds);
    this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
};
UIElement.prototype._UpdateTransform = function () {
    //NotImplemented("UIElement._UpdateTransform()");
};
UIElement.prototype._UpdateProjection = function () {
    //NotImplemented("UIElement._UpdateProjection()");
};
UIElement.prototype._ComputeBounds = function () {
    AbstractMethod("UIElement._ComputeBounds()");
};
UIElement.prototype._ComputeGlobalBounds = function () {
    this._GlobalBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._LocalProjection);
};
UIElement.prototype._ComputeSurfaceBounds = function () {
    this._SurfaceBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteProjection);
};
UIElement.prototype._ComputeLocalTransform = function () {
    //NotImplemented("UIElement._ComputeLocalTransform");
};
UIElement.prototype._ComputeLocalProjection = function () {
    //NotImplemented("UIElement._ComputeLocalProjection");
};

UIElement.prototype._ComputeTotalRenderVisibility = function () {
    if (this._GetActualTotalRenderVisibility())
        this._Flags |= UIElementFlags.TotalRenderVisible;
    else
        this._Flags &= ~UIElementFlags.TotalRenderVisible;
};
UIElement.prototype._UpdateTotalRenderVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.RenderVisibility);
};
UIElement.prototype._GetActualTotalRenderVisibility = function () {
    var visible = (this._Flags & UIElementFlags.RenderVisible) != 0;
    var parentVisible = true;
    this._TotalOpacity = this.GetOpacity();

    var visualParent = this.GetVisualParent();
    if (visualParent) {
        visualParent._ComputeTotalRenderVisibility();
        parentVisible = visible && visualParent._GetRenderVisible();
        this._TotalOpacity *= visualParent._TotalOpacity;
    }
    visible = visible && parentVisible;
    return visible;
};
UIElement.prototype._GetRenderVisible = function () {
    return (this._Flags & UIElementFlags.TotalRenderVisible) != 0;
};

UIElement.prototype._ComputeTotalHitTestVisibility = function () {
    if (this._GetActualTotalHitTestVisibility())
        this._Flags |= UIElementFlags.TotalHitTestVisible;
    else
        this._Flags &= ~UIElementFlags.TotalHitTestVisible;
};
UIElement.prototype._UpdateTotalHitTestVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.HitTestVisibility);
};
UIElement.prototype._GetActualTotalHitTestVisibility = function () {
    var visible = (this._Flags & UIElementFlags.HitTestVisible) != 0;
    var visualParent;
    if (visible && (visualParent = this.GetVisualParent())) {
        visualParent._ComputeTotalRenderVisibility();
        visible = visible && visualParent._GetIsHitTestVisible();
    }
    return visible;
};
UIElement.prototype._GetIsHitTestVisible = function () {
    return (this._Flags & UIElementFlags.TotalHitTestVisible) != 0;
};

UIElement.prototype._HitTestPoint = function (ctx, p, uielist) {
    uielist.Prepend(new UIElementNode(this));
};
UIElement.prototype._InsideObject = function (ctx, x, y) {
    return this._InsideClip(ctx, x, y);
};
UIElement.prototype._InsideClip = function (ctx, x, y) {
    var clip = this.GetClip();
    if (!clip)
        return true;

    var np = new Point(x, y);
    this._TransformPoint(np);

    if (!clip.GetBounds().PointInside(np))
        return false;

    return ctx.IsPointInClipPath(clip, np);
};
UIElement.prototype._CanFindElement = function () {
    return false;
};
UIElement.prototype._TransformPoint = function (p) {
    var inverse;
    if (!this._CachedTransform || !(inverse = this._CachedTransform.Inverse))
        return;
    var np = inverse.Multiply(p);
    p.X = np.X;
    p.Y = np.Y;
};

UIElement.prototype._GetGlobalBounds = function () {
    return this._GlobalBounds;
};
UIElement.prototype._GetSubtreeObject = function () {
    return this._SubtreeObject;
};
UIElement.prototype._SetSubtreeObject = function (value) {
    this._SubtreeObject = value;
};
UIElement.prototype._GetSubtreeExtents = function () {
    AbstractMethod("UIElement._GetSubtreeExtents()");
};
UIElement.prototype._GetSubtreeBounds = function () {
    return this._SurfaceBounds;
};
UIElement.prototype._SetRenderSize = function (value) {
    this._RenderSize = value;
};
UIElement.prototype._GetRenderSize = function () {
    return this._RenderSize;
};
UIElement.prototype._GetOriginPoint = function () {
    return new Point(0.0, 0.0);
};

UIElement.prototype._DoMeasureWithError = function (error) {
    var last = LayoutInformation.GetPreviousConstraint(this);
    var parent = this.GetVisualParent();
    var infinite = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (!this._IsAttached && !last && !parent && this.IsLayoutContainer()) {
        last = infinite;
    }

    if (last) {
        var previousDesired = this._DesiredSize;
        this._MeasureWithError(last, error);
        if (previousDesired.Equals(this._DesiredSize))
            return;
    }

    if (parent)
        parent._InvalidateMeasure();

    this._DirtyFlags &= ~_Dirty.Measure;
};
UIElement.prototype.Measure = function (availableSize) {
    var error = new BError();
    this._MeasureWithError(availableSize, error);
};
UIElement.prototype._MeasureWithError = function (availableSize, error) { };
UIElement.prototype._DoArrangeWithError = function (error) {
    var last = this._ReadLocalValue(LayoutInformation.LayoutSlotProperty);
    var parent = this.GetVisualParent();

    if (!parent) {
        var desired = new Size();
        var surface = App.Instance.MainSurface;

        if (this.IsLayoutContainer()) {
            desired = this._DesiredSize;
            if (this._IsAttached && surface._IsTopLevel(this) && !this._GetParent()) {
                var measure = LayoutInformation.GetPreviousConstraint(this);
                if (measure)
                    desired = desired.Max(measure);
                else
                    desired = new Size(surface.GetWidth(), surface.GetHeight());
            }
        } else {
            desired = new Size(this.GetActualWidth(), this.GetActualHeight());
        }

        viewport = new Rect(Canvas.GetLeft(this), Canvas.GetTop(this), desired.Width, desired.Height)

        last = viewport;
    }

    if (last) {
        this._ArrangeWithError(last, error);
    } else {
        if (parent)
            parent._InvalidateArrange();
    }
};
UIElement.prototype.Arrange = function (finalRect) {
    var error = new BError();
    this._ArrangeWithError(finalRect, error);
};
UIElement.prototype._ArrangeWithError = function (finalRect, error) { };

UIElement.prototype._ShiftPosition = function (point) {
    this._Bounds.X = point.X;
    this._Bounds.Y = point.Y;
};
UIElement.prototype._DoRender = function (ctx, parentRegion) {
    var region = this._GetSubtreeExtents();
    if (!region) {
        Warn("Render Extents are empty. [" + this._TypeName + "]");
        return;
    }
    //region = region.Transform(this._RenderTransform);
    region = region.RoundOut();
    region = region.Intersection(parentRegion);
    if (!this._GetRenderVisible() || IsOpacityInvisible(this._TotalOpacity) || region.IsEmpty()) {
        Info("Nothing to render. [" + this._TypeName + "]");
        return;
    }

    //TODO: render to intermediate not implemented
    var visualOffset = LayoutInformation.GetVisualOffset(this);
    ctx.Save();
    ctx.Transform(new TranslationMatrix(visualOffset.X, visualOffset.Y));
    this._CachedTransform = { Normal: ctx.GetCurrentTransform(), Inverse: ctx.GetInverseTransform() };
    ctx.SetGlobalAlpha(this._TotalOpacity);
    this._Render(ctx, region);
    this._PostRender(ctx, region);
    ctx.Restore();
};
UIElement.prototype._Render = function (ctx, region) { };
UIElement.prototype._PostRender = function (ctx, region) {
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZForward);
    var child;
    while (child = walker.Step()) {
        child._DoRender(ctx, region);
    }
};
UIElement.prototype._IntersectBoundsWithClipPath = function (unclipped, transform) {
    var clip = this.GetClip();
    var layoutClip = transform ? null : LayoutInformation.GetLayoutClip(this);
    var box;

    if (!clip && !layoutClip)
        return unclipped;
    if (clip)
        box = clip.GetBounds();
    else
        box = layoutClip.GetBounds();

    if (layoutClip)
        box = box.Intersection(layoutClip.GetBounds());

    if (!this._GetRenderVisible())
        box = new Rect(0, 0, 0, 0);

    //if (transform)
    //    box = box.Transform(this._AbsoluteTransform);

    return box.Intersection(unclipped);
};
UIElement.prototype._ElementRemoved = function (item) {
    this._Invalidate(item._GetSubtreeBounds());
    item.SetVisualParent(null);
    item._SetIsLoaded(false);
    item._SetIsAttached(false);
    item._SetMentor(null);

    var emptySlot = new Rect();
    LayoutInformation.SetLayoutSlot(item, emptySlot);
    item.ClearValue(LayoutInformation.LayoutClipProperty);

    this._InvalidateMeasure();

    this._Providers[_PropertyPrecedence.Inherited].ClearInheritedPropertiesOnRemovingFromTree(item);
}
UIElement.prototype._ElementAdded = function (item) {
    item.SetVisualParent(this);
    item._UpdateTotalRenderVisibility();
    item._UpdateTotalHitTestVisibility();
    item._Invalidate();

    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(item);
    item._SetIsAttached(this._IsAttached);
    item._SetIsLoaded(this._IsLoaded);
    var o = this;
    while (o != null && !(o instanceof FrameworkElement))
        o = o._GetMentor();
    item._SetMentor(o);

    this._UpdateBounds(true);

    this._InvalidateMeasure();
    this.ClearValue(LayoutInformation.LayoutClipProperty);
    this.ClearValue(LayoutInformation.PreviousConstraintProperty);
    item._SetRenderSize(new Size(0, 0));
    item._UpdateTransform();
    item._UpdateProjection();
    item._InvalidateMeasure();
    item._InvalidateArrange();
    if (item._HasFlag(UIElementFlags.DirtySizeHint) || item._ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
        item._PropagateFlagUp(UIElementFlags.DirtySizeHint);
}
UIElement.prototype._UpdateLayer = function (pass, error) {
};

UIElement.prototype._SetIsLoaded = function (value) {
    if (this._IsLoaded != value) {
        this._IsLoaded = value;
        this._OnIsLoadedChanged(value);
    }
};
UIElement.prototype._OnIsLoadedChanged = function (loaded) {
    if (!this._IsLoaded) {
        //TODO: Unloaded Event
        //TODO: SetIsLoaded for all FrameworkElements in GetResources()
    }

    var walker = new _VisualTreeWalker(this);
    var element;
    while (element = walker.Step()) {
        element._SetIsLoaded(loaded);
    }

    if (this._IsLoaded) {
        //TODO: SetIsLoaded for all FrameworkElements in GetResources()
        this.Loaded.Raise(this, null);
    }
};
UIElement.prototype._OnIsAttachedChanged = function (value) {
    if (this._SubtreeObject)
        this._SubtreeObject._SetIsAttached(value);

    //HACK:
    this._InvalidateVisibility();
    DependencyObject.prototype._OnIsAttachedChanged.call(this, value);

    if (!value) {
        this._CacheInvalidateHint();

        var surface = App.Instance.MainSurface;
        if (surface) {
            surface._RemoveDirtyElement(this);
            //TODO: Focus Element
            //if (surface.GetFocusedElement() === this)
            //    surface.FocusElement(null);
        }
    }
};
UIElement.prototype._OnInvalidated = function () {
    this.Invalidated.Raise(this, null);
};

UIElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== UIElement) {
        DependencyObject.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property === UIElement.OpacityProperty) {
        this._InvalidateVisibility();
    } else if (args.Property === UIElement.VisibilityProperty) {
        if (args.NewValue === Visibility.Visible)
            this._Flags |= UIElementFlags.RenderVisible;
        else
            this._Flags &= ~UIElementFlags.RenderVisible;
        this._InvalidateVisibility();
        this._InvalidateMeasure();
        var parent = this.GetVisualParent();
        if (parent)
            parent._InvalidateMeasure();
        //TODO: change focus
    }
    //TODO: Check invalidation of some properties
    this.PropertyChanged.Raise(this, args);
};

UIElement.prototype._HasFlag = function (flag) { return (this._Flags & flag) == flag; };
UIElement.prototype._ClearFlag = function (flag) { this._Flags &= ~flag; };
UIElement.prototype._SetFlag = function (flag) { this._Flags |= flag; };
UIElement.prototype._PropagateFlagUp = function (flag) {
    this._SetFlag(flag);
    var el = this.GetVisualParent();
    while (el && !el._HasFlag(flag)) {
        el._SetFlag(flag);
        el = el.GetVisualParent();
    }
};

UIElement.prototype.__DebugDirtyFlags = function () {
    var t = new String();
    if (this._DirtyFlags & _Dirty.Measure)
        t = t.concat("[Measure]");
    if (this._DirtyFlags & _Dirty.Arrange)
        t = t.concat("[Arrange]");
    if (this._DirtyFlags & _Dirty.Bounds)
        t = t.concat("[Bounds]");
    if (this._DirtyFlags & _Dirty.ChildrenZIndices)
        t = t.concat("[ChildrenZIndices]");
    if (this._DirtyFlags & _Dirty.Clip)
        t = t.concat("[Clip]");
    if (this._DirtyFlags & _Dirty.Invalidate)
        t = t.concat("[Invalidate]");
    return t;
};

//#endregion

//#region MOUSE

UIElement.prototype.CanCaptureMouse = function () { return true; };
UIElement.prototype.CaptureMouse = function () {
    if (!this._IsAttached)
        return false;
    return App.Instance.MainSurface.SetMouseCapture(this);
};
UIElement.prototype.ReleaseMouseCapture = function () {
    if (!this._IsAttached)
        return;
    App.Instance.MainSurface.ReleaseMouseCapture(this);
};

UIElement.prototype._EmitMouseEvent = function (type, button, absolutePos) {
    var func;
    if (type === "up") {
        if (Surface.IsLeftButton(button))
            func = this._EmitMouseLeftButtonUp;
        else if (Surface.IsRightButton(button))
            func = this._EmitMouseRightButtonUp;
    } else if (type === "down") {
        if (Surface.IsLeftButton(button))
            func = this._EmitMouseLeftButtonDown;
        else if (Surface.IsRightButton(button))
            func = this._EmitMouseRightButtonDown;
    } else if (type === "leave") {
        func = this._EmitMouseLeave;
    } else if (type === "enter") {
        func = this._EmitMouseEnter;
    }
    if (func)
        func.call(this, absolutePos);
};

UIElement.prototype._EmitMouseMoveEvent = function (absolutePos) {
    this.MouseMove.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.prototype.OnMouseMove = function (sender, args) { };

UIElement.prototype._EmitMouseLeftButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonDown " + absolutePos.toString());
    this.MouseLeftButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.prototype.OnMouseLeftButtonDown = function (sender, args) { };

UIElement.prototype._EmitMouseLeftButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonUp " + absolutePos.toString());
    this.MouseLeftButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.prototype.OnMouseLeftButtonUp = function (sender, args) { };

UIElement.prototype._EmitMouseRightButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonDown " + absolutePos.toString());
    this.MouseRightButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.prototype.OnMouseRightButtonDown = function (sender, args) { };

UIElement.prototype._EmitMouseRightButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonUp " + absolutePos.toString());
    this.MouseRightButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.prototype.OnMouseRightButtonUp = function (sender, args) { };

UIElement.prototype._EmitMouseEnter = function (absolutePos) {
    this.MouseEnter.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.prototype.OnMouseEnter = function (sender, args) { };

UIElement.prototype._EmitMouseLeave = function (absolutePos) {
    this.MouseLeave.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.prototype.OnMouseLeave = function (sender, args) { };

UIElement.prototype._EmitLostMouseCapture = function (absolutePos) {
    this.LostMouseCapture.Raise(this, new MouseEventArgs(absolutePos));
};

//#endregion

//#region FOCUS

UIElement.prototype.Focus = function (recurse) {
    return false;
};

UIElement.prototype._EmitFocusChange = function (type) {
    if (type === "got")
        node.UIElement._EmitGotFocus();
    else if (type === "lost")
        node.UIElement._EmitLostFocus();
};

UIElement.prototype._EmitGotFocus = function () {
    this.GotFocus.Raise(this, new EventArgs());
};
UIElement.prototype.OnGotFocus = function (sender, args) { };

UIElement.prototype._EmitLostFocus = function () {
    this.LostFocus.Raise(this, new EventArgs());
};
UIElement.prototype.OnLostFocus = function (sender, args) { };

//#endregion

UIElement.ZIndexComparer = function (uie1, uie2) {
    var zi1 = Canvas.GetZIndex(uie1);
    var zi2 = Canvas.GetZIndex(uie2);
    if (zi1 == zi2) {
        var z1 = Canvas.GetZ(uie1);
        var z2 = Canvas.GetZ(uie2);
        if (isNaN(z1) || isNaN(z2))
            return 0;
        return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
    }
    return zi1 - zi2;
};

//#endregion

/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="Surface.js"/>
/// <reference path="Collections.js"/>

//#region App

function App() {
    DependencyObject.call(this);
    this.MainSurface = new Surface();
}
App.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, null, { GetValue: function () { return new ResourceDictionary(); } });
App.prototype.GetResources = function () {
    return this.GetValue(App.ResourcesProperty);
};
App.prototype.SetResources = function (value) {
    this.SetValue(App.ResourcesProperty, value);
};

//#endregion

App.prototype.Load = function (/* UIElement */element, containerId, width, height) {
    this.MainSurface.Init(containerId, width, height);
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.prototype.Start = function () {
    var fps = 30.0;
    var app = this;
    this._TickID = setInterval(function () { app._Tick(); }, (1.0 / fps) * 1000.0);
};
App.prototype._Tick = function () {
    if (this._IsRunning)
        return;
    this._IsRunning = true;
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
    try {
        this.MainSurface.ProcessDirtyElements(region);
    } catch (err) {
        Fatal("An error occurred processing dirty elements: " + err.toString());
    }
    this._IsRunning = false;
};
App.prototype._Stop = function () {
    clearInterval(this._TickID);
};
App.prototype._GetImplicitStyles = function (fe, styleMask) {
    var genericXamlStyle = undefined;
    var appResourcesStyle = undefined;
    var visualTreeStyle = undefined;
    if ((styleMask & _StyleMask.GenericXaml) != 0) {
        if (fe instanceof Control) {
            genericXamlStyle = fe.GetDefaultStyle();
            if (!genericXamlStyle) {
                var styleKey = fe.GetDefaultStyleKey();
                if (styleKey != null)
                    genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
            }
        }
    }
    if ((styleMask & _StyleMask.ApplicationResources) != 0) {
        //appResourcesStyle = this.Resources.Get(fe.constructor);
        //if (appResourcesStyle == null)
        appResourcesStyle = this.GetResources().Get(fe._TypeName);
    }
    if ((styleMask & _StyleMask.VisualTree) != 0) {
        var isControl = fe instanceof Control;
        var el = fe;
        while (el != null) {
            if (el._TemplateOwner != null && fe._TemplateOwner == null) {
                el = el._TemplateOwner;
                continue;
            }
            if (!isControl && el == fe._TemplateOwner)
                break;

            //visualTreeStyle = el.Resources.Get(fe.constructor);
            //if (visualTreeStyle != null)
            //break;
            visualTreeStyle = el.GetResources().Get(fe._TypeName);
            if (visualTreeStyle != null)
                break;

            el = el.GetVisualParent();
        }
    }

    var styles = new Array();
    styles[_StyleIndex.GenericXaml] = genericXamlStyle;
    styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
    styles[_StyleIndex.VisualTree] = visualTreeStyle;
    return styles;
};
App.prototype._GetGenericXamlStyleFor = function (type) {
    NotImplemented("App._GetGenericXamlStyleFor");
};
App.Instance = new App();

//#endregion

/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="Collections.js"/>
/// <reference path="Primitives.js"/>

//#region Brush

function Brush() {
    DependencyObject.call(this);
};
Brush.InheritFrom(DependencyObject);

Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

//#endregion

//#region SolidColorBrush

function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.InheritFrom(Brush);

SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

//#endregion

//#region GradientBrush

function GradientBrush() {
    Brush.call(this);
}
GradientBrush.InheritFrom(Brush);

//#region DEPENDENCY PROPERTIES

GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.prototype.GetGradientStops = function () {
    return this.GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.prototype.SetGradientStops = function (value) {
    this.SetValue(GradientBrush.GradientStopsProperty, value);
};

//#endregion

//#endregion

//#region LinearGradientBrush

function LinearGradientBrush() {
    GradientBrush.call(this);
}
LinearGradientBrush.InheritFrom(GradientBrush);

//#region DEPENDENCY PROPERTIES

LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.prototype.GetStartPoint = function () {
    return this.GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.prototype.SetStartPoint = function (value) {
    this.SetValue(LinearGradientBrush.StartPointProperty, value);
};

LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));
LinearGradientBrush.prototype.GetEndPoint = function () {
    return this.GetValue(LinearGradientBrush.EndPointProperty);
};
LinearGradientBrush.prototype.SetEndPoint = function (value) {
    this.SetValue(LinearGradientBrush.EndPointProperty, value);
};

//#endregion

LinearGradientBrush.prototype._Translate = function (ctx, bounds) {
    var transform = new Matrix();
    var start = this.GetStartPoint().Apply(transform);
    var end = this.GetEndPoint().Apply(transform);
    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GetGradientStops();
    for (var i = 0; i < stops.GetCount(); i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.GetOffset(), stop.GetColor()._Translate());
    }
    return grd;
};

//#endregion

//#region RadialGradientBrush

function RadialGradientBrush() {
    GradientBrush.call(this);
}
RadialGradientBrush.InheritFrom(GradientBrush);

//#region DEPENDENCY PROPERTIES

RadialGradientBrush.CenterProperty = DependencyProperty.RegisterFull("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetCenter = function () {
    return this.GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.prototype.SetCenter = function (value) {
    this.SetValue(RadialGradientBrush.CenterProperty, value);
};

RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterFull("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetGradientOrigin = function () {
    return this.GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.prototype.SetGradientoOrigin = function (value) {
    this.SetValue(RadialGradientBrush.GradientOriginProperty, value);
};

RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterFull("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusX = function () {
    return this.GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.prototype.SetRadiusX = function (value) {
    this.SetValue(RadialGradientBrush.RadiusXProperty, value);
};

RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterFull("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusY = function () {
    return this.GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.prototype.SetRadiusY = function (value) {
    this.SetValue(RadialGradientBrush.RadiusYProperty, value);
};

//#endregion

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="DependencyObject.js" />
/// CODE
/// <reference path="List.js"/>
/// <reference path="UIElement.js" />

//#region Collection

function Collection() {
    DependencyObject.call(this);
    this._ht = new Array();
    this.Changed = new MulticastEvent();
    this.ItemChanged = new MulticastEvent();
}
Collection.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

Collection.CountProperty = DependencyProperty.RegisterFull("Count", function () { return Number; }, Collection, 0);
Collection.prototype.GetCount = function () {
    return this._ht.length;
};

//#endregion

Collection.prototype.GetValueAt = function (index) {
    return this._ht[index];
};
Collection.prototype.Add = function (value) {
    var rv = this.Insert(this._ht.length, value);
    return rv ? this._ht.length - 1 : -1;
};
Collection.prototype.Insert = function (index, value) {
    if (!this.CanAdd(value))
        return false;
    if (index < 0)
        return false;
    var count = this.GetCount();
    if (index > count)
        index = count;

    var error = new BError();
    if (this.AddedToCollection(value, error)) {
        this._ht.splice(index, 0, value);
        this._RaiseChanged(CollectionChangedArgs.Action.Add, null, value, index);
        return true;
    }
    return false;
};
Collection.prototype.Remove = function (value) {
    var index = this.IndexOf(value);
    if (index == -1)
        return false;
    return this.RemoveAt(index);
};
Collection.prototype.RemoveAt = function (index) {
    if (index < 0 || index >= this._ht.length)
        return false;
    var value = this._ht[index];
    this._ht.splice(index, 1);
    this.RemovedFromCollection(value, true);
    this._RaiseChanged(CollectionChangedArgs.Action.Remove, value, null, index);
    return true;
};
Collection.prototype.Clear = function () {
    this._RaiseChanged(CollectionChangedArgs.Action.Clearing, null, null, -1);
    var old = this._ht;
    this._ht = new Array();
    for (var i = 0; i < old.length; i++) {
        this.RemovedFromCollection(old[i], true);
    }
    this._RaiseChanged(CollectionChangedArgs.Action.Cleared, null, null, -1);
    return true;
};
Collection.prototype.IndexOf = function (value) {
    for (var i = 0; i < this.GetCount(); i++) {
        if (value == this._ht[i])
            return i;
    }
    return -1;
};
Collection.prototype.Contains = function (value) {
    return this.IndexOf(value) > -1;
};
Collection.prototype.CanAdd = function (value) { return true; };
Collection.prototype.AddedToCollection = function (value, error) { return true; };
Collection.prototype.RemovedFromCollection = function (value, isValueSafe) { };
Collection.prototype.GetIterator = function () {
    return new CollectionIterator(this);
};

Collection.prototype._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
    this.ItemChanged.Raise(this, new ItemChangedArgs(obj, propd, oldValue, newValue));
};
Collection.prototype._RaiseChanged = function (action, oldValue, newValue, index) {
    this.Changed.Raise(this, new CollectionChangedArgs(action, oldValue, newValue, index));
};

//#endregion

//#region CollectionIterator

function CollectionIterator(collection) {
    RefObject.call(this);
    this._Collection = collection;
    this._Index = -1;
}
CollectionIterator.InheritFrom(RefObject);

CollectionIterator.prototype.Next = function (error) {
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

//#region ItemChangedArgs

function ItemChangedArgs(item, propd, oldValue, newValue) {
    RefObject.call(this);
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}
ItemChangedArgs.InheritFrom(RefObject);

//#endregion

//#region CollectionChangedArgs

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};
function CollectionChangedArgs(action, oldValue, newValue, index) {
    RefObject.call(this);
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}
CollectionChangedArgs.InheritFrom(RefObject);

//#endregion

//#region DependencyObjectCollection

function DependencyObjectCollection(setsParent) {
    Collection.call(this);
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
}
DependencyObjectCollection.InheritFrom(Collection);

DependencyObjectCollection.prototype.IsElementType = function (value) {
    return value instanceof DependencyObject;
};

DependencyObjectCollection.prototype._GetIsSecondaryParent = function () {
    return this._IsSecondaryParent;
};
DependencyObjectCollection.prototype._SetIsSecondaryParent = function (value) {
    this._IsSecondaryParent = value;
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
        var existingParent = value._GetParent();
        value._AddParent(this, true, error);
        if (!error.IsErrored() && !existingParent && this._GetIsSecondaryParent())
            value._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
    } else {
        value._SetMentor(this._GetMentor());
    }

    value.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);

    var rv = Collection.prototype.AddedToCollection.call(this, value, error);
    value._IsAttached = rv && this._IsAttached;
    if (!rv) {
        if (this._SetsParent) {
            value._RemoveParent(this, error);
            value._SetMentor(this._GetMentor());
        } else {
            value._SetMentor(null);
        }
    }
    return rv;
};
DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            value.Unsubscribe(this._OnSubPropertyChanged, this);
            if (this._GetIsSecondaryParent())
                value._RemoveSecondaryParent(this);

            if (this._SetsParent && value._GetParent().RefEquals(this))
                value._RemoveParent(this, null);
            value._SetIsAttached(false);
        }
    }
};
DependencyObjectCollection.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);
    for (var i = 0; i < this.GetCount(); i++) {
        var val = this.GetValueAt(i);
        if (val instanceof DependencyObject)
            val._SetIsAttached(value);
    }
};
DependencyObjectCollection.prototype._OnSubPropertyChanged = function (sender, args) {
    this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
};

//#endregion

//#region UIElementCollection

function UIElementCollection() {
    DependencyObjectCollection.call(this);
    this._ZSorted = new Array();
}
UIElementCollection.InheritFrom(DependencyObjectCollection);

UIElementCollection.prototype.GetValueAtZIndex = function (index) {
    return this._ZSorted[index];
};
UIElementCollection.prototype.GetZSortedCount = function () {
    return this._ZSorted.length;
};
UIElementCollection.prototype.ResortByZIndex = function () {
    var count = this.GetCount();
    this._ZSorted = new Array(count);
    if (count < 1)
        return;

    for (var i = 0; i < count; i++) {
        this._ZSorted[i] = this._ht[i];
    }

    if (count > 1) {
        this._ZSorted.sort(UIElement.ZIndexComparer);
    }
};
UIElementCollection.prototype.IsElementType = function (value) {
    return value instanceof UIElement;
};

//#endregion

//#region InlineCollection

function InlineCollection() {
    DependencyObjectCollection.call(this);
}
InlineCollection.InheritFrom(DependencyObjectCollection);

InlineCollection.prototype.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
InlineCollection.prototype.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.prototype.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.prototype._SetIsForHyperlink = function () { this._ForHyperlink = true; };

//#endregion

//#region ResourceDictionary

function ResourceDictionary() {
    Collection.call(this);
    this._KeyIndex = new Array();
}
ResourceDictionary.InheritFrom(Collection);

//#region DEPENDENCY PROPERTIES

ResourceDictionary.MergedDictionariesProperty = DependencyProperty.RegisterFull("MergedDictionaries", function () { return ResourceDictionaryCollection; }, ResourceDictionary, null, { GetValue: function () { return new ResourceDictionaryCollection(); } });
ResourceDictionary.prototype.GetMergedDictionaries = function () {
    return this.GetValue(ResourceDictionary.MergedDictionariesProperty);
};

//#endregion

ResourceDictionary.prototype.ContainsKey = function (key) {
    return this._KeyIndex[key] != undefined;
};
ResourceDictionary.prototype._GetIndexFromKey = function (key) {
    return this.KeyIndex[key];
};
ResourceDictionary.prototype.Get = function (key) {
    if (this.ContainsKey(key))
        return this.GetValueAt(this._GetIndexFromKey(key));
    return this._GetFromMergedDictionaries(key);
};
ResourceDictionary.prototype._GetFromMergedDictionaries = function (key) {
    var merged = this.GetMergedDictionaries();

    if (!merged)
        return undefined;

    for (var i = 0; i < merged.GetCount(); i++) {
        var dict = merged.GetValueAt(i);
        var value = dict.Get(key);
        if (value != undefined)
            return value;
    }
    return undefined;
};
ResourceDictionary.prototype.Set = function (key, value) {
    var oldValue;
    if (this.ContainsKey(key)) {
        oldValue = this.Get(key);
        this.Remove(oldValue);
    }
    var index = this.Add(value);
    this._KeyIndex[key] = index;
    this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
    return true;
};

ResourceDictionary.prototype.AddedToCollection = function (value, error) {
    NotImplemented("ResourceDictionary.AddedToCollection");
};
ResourceDictionary.prototype.RemovedFromCollection = function (value, isValueSafe) {
    NotImplemented("ResourceDictionary.RemovedFromCollection");
};

ResourceDictionary.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);

    for (var i = 0; i < this._ht.length; i++) {
        var obj = this._ht[i];
        if (obj instanceof DependencyObject)
            obj._SetIsAttached(value);
    }
};

//#endregion

//#region ResourceDictionaryCollection

function ResourceDictionaryCollection() {
    DependencyObjectCollection.call(this);
}
ResourceDictionaryCollection.InheritFrom(DependencyObjectCollection);

ResourceDictionaryCollection.prototype.AddedToCollection = function (value, error) {
    if (!DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error))
        return false;
    var parent = this._GetParent();
    if (!parent)
        return true;

    return this._WalkSubtreeLookingForCycle(value, parent, error);
};
ResourceDictionaryCollection.prototype.IsElementType = function (value) {
    return value instanceof ResourceDictionary;
};
ResourceDictionaryCollection.prototype._WalkSubtreeLookingForCycle = function (subtreeRoot, firstAncestor, error) {
    var source = subtreeRoot._GetInternalSource();

    var p = firstAncestor;
    while (p) {
        if (p instanceof ResourceDictionary) {
            var cycleFound = false;
            var rdSource = p._GetInternalSource();
            if (p == subtreeRoot)
                cycleFound = true;
            else if (source && rdSource && !source.localeCompare(rdSource))
                cycleFound = true;

            if (cycleFound) {
                error.SetErrored(BError.InvalidOperation, "Cycle found in resource dictionaries.");
                return false;
            }
        }
        p = p._GetParent();
    }

    var children = subtreeRoot._GetMergedDictionaries();
    for (var i = 0; i < children.GetCount(); i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }

    return true;
};

//#endregion

//#region GradientStop

function GradientStop() {
    DependencyObject.call(this);
}
GradientStop.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.prototype.GetColor = function () {
    return this.GetValue(GradientStop.ColorProperty);
};
GradientStop.prototype.SetColor = function (value) {
    this.SetValue(GradientStop.ColorProperty, value);
};

GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);
GradientStop.prototype.GetOffset = function () {
    return this.GetValue(GradientStop.OffsetProperty);
};
GradientStop.prototype.SetOffset = function (value) {
    this.SetValue(GradientStop.OffsetProperty, value);
};

//#endregion

//#endregion

//#region GradientStopCollection

function GradientStopCollection() {
    DependencyObjectCollection.call(this);
}
GradientStopCollection.InheritFrom(DependencyObjectCollection);

GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

//#endregion

var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};

//#region _VisualTreeWalker

function _VisualTreeWalker(/* UIElement */obj, /* _VisualTreeWalkerDirection */direction) {
    RefObject.call(this);
    this._Offset = 0;
    this._Collection = null;
    this._Content = obj._GetSubtreeObject();
    if (direction)
        this._Direction = direction;
    else
        this._Direction = _VisualTreeWalkerDirection.Logical;
    if (this._Content) {
        if (this._Content instanceof Collection) {
            this._Collection = this._Content;
            if (this._Content instanceof UIElementCollection)
                this._Direction = _VisualTreeWalkerDirection.Logical;
        }
    }
}
_VisualTreeWalker.InheritFrom(RefObject);

_VisualTreeWalker.prototype.Step = function () {
    var result = null;
    if (this._Collection) {
        var count = this.GetCount();
        if (count < 0 || this._Offset >= count)
            return null;
        if (count == 1 && this._Offset == 0) {
            this._Offset++;
            return this._Collection.GetValueAt(0);
        }

        if (this._Direction == _VisualTreeWalkerDirection.ZForward || this._Direction == _VisualTreeWalkerDirection.ZReverse) {
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

//#endregion

//#region _DeepTreeWalker

function _DeepTreeWalker(/* UIElement */top, /* _VisualTreeWalkerDirection */direction) {
    RefObject.call(this);
    this._WalkList = new List();
    this._WalkList.Append(new UIElementNode(top));
    this._Last = null;
    this._Direction = _VisualTreeWalkerDirection.Logical;
    if (direction)
        this._Direction = direction;
}
_DeepTreeWalker.InheritFrom(RefObject);

_DeepTreeWalker.prototype.Step = function () {
    if (this._Last) {
        var walker = new _VisualTreeWalker(this._Last, this._Direction);
        var prepend = this._WalkList.First();
        var child;
        while (child = walker.Step()) {
            this._WalkList.InsertBefore(new UIElementNode(child), prepend);
        }
    }

    var next = this._WalkList.First();
    if (!next) {
        this._Last = null;
        return null;
    }

    var current = next.UIElement;
    this._WalkList.Remove(next);
    this._Last = current;

    return current;
};
_DeepTreeWalker.prototype.SkipBranch = function () {
    this._Last = null;
};

//#endregion

/// <reference path="UIElement.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// CODE
/// <reference path="BError.js"/>
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="List.js"/>
/// <reference path="Geometry.js"/>
/// <reference path="Validators.js"/>
/// <reference path="Style.js"/>

//#region FrameworkElement

function FrameworkElement() {
    UIElement.call(this);
    
    this.TemplatedApplied = new MulticastEvent();

    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();

    this._Providers[_PropertyPrecedence.LocalStyle] = new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle);
    this._Providers[_PropertyPrecedence.ImplicitStyle] = new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle);
    this._Providers[_PropertyPrecedence.DynamicValue] = new _FrameworkElementProvider(this, _PropertyPrecedence.DynamicValue);
    this._Providers[_PropertyPrecedence.InheritedDataContext] = new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext);
}
FrameworkElement.InheritFrom(UIElement);

//#region DEPENDENCY PROPERTIES

FrameworkElement.HeightProperty = DependencyProperty.Register("Height", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.prototype.GetHeight = function () {
    return this.GetValue(FrameworkElement.HeightProperty);
};
FrameworkElement.prototype.SetHeight = function (value) {
    this.SetValue(FrameworkElement.HeightProperty, value);
};

FrameworkElement.WidthProperty = DependencyProperty.Register("Width", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.prototype.GetWidth = function () {
    return this.GetValue(FrameworkElement.WidthProperty);
};
FrameworkElement.prototype.SetWidth = function (value) {
    this.SetValue(FrameworkElement.WidthProperty, value);
};

FrameworkElement.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, FrameworkElement);
FrameworkElement.prototype.GetActualHeight = function () {
    return this.GetValue(FrameworkElement.ActualHeightProperty);
};

FrameworkElement.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, FrameworkElement);
FrameworkElement.prototype.GetActualWidth = function () {
    return this.GetValue(FrameworkElement.ActualWidthProperty);
};

FrameworkElement.DataContextProperty = DependencyProperty.Register("DataContext", function () { return Object; }, FrameworkElement);
FrameworkElement.prototype.GetDataContext = function () {
    return this.GetValue(FrameworkElement.DataContextProperty);
};
FrameworkElement.prototype.SetDataContext = function (value) {
    this.SetValue(FrameworkElement.DataContextProperty, value);
};

FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", function () { return Number; }, FrameworkElement, HorizontalAlignment.Stretch);
FrameworkElement.prototype.GetHorizontalAlignment = function () {
    return this.GetValue(FrameworkElement.HorizontalAlignmentProperty);
};
FrameworkElement.prototype.SetHorizontalAlignment = function (value) {
    this.SetValue(FrameworkElement.HorizontalAlignmentProperty, value);
};

FrameworkElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, FrameworkElement);
FrameworkElement.prototype.GetLanguage = function () {
    return this.GetValue(FrameworkElement.LanguageProperty);
};
FrameworkElement.prototype.SetLanguage = function (value) {
    this.SetValue(FrameworkElement.LanguageProperty, value);
};

FrameworkElement.MarginProperty = DependencyProperty.Register("Margin", function () { return Thickness; }, FrameworkElement, new Thickness());
FrameworkElement.prototype.GetMargin = function () {
    return this.GetValue(FrameworkElement.MarginProperty);
};
FrameworkElement.prototype.SetMargin = function (value) {
    this.SetValue(FrameworkElement.MarginProperty, value);
};

FrameworkElement.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.prototype.GetMaxHeight = function () {
    return this.GetValue(FrameworkElement.MaxHeightProperty);
};
FrameworkElement.prototype.SetMaxHeight = function (value) {
    this.SetValue(FrameworkElement.MaxHeightProperty, value);
};

FrameworkElement.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.prototype.GetMaxWidth = function () {
    return this.GetValue(FrameworkElement.MaxWidthProperty);
};
FrameworkElement.prototype.SetMaxWidth = function (value) {
    this.SetValue(FrameworkElement.MaxWidthProperty, value);
};

FrameworkElement.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.prototype.GetMinHeight = function () {
    return this.GetValue(FrameworkElement.MinHeightProperty);
};
FrameworkElement.prototype.SetMinHeight = function (value) {
    this.SetValue(FrameworkElement.MinHeightProperty, value);
};

FrameworkElement.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.prototype.GetMinWidth = function () {
    return this.GetValue(FrameworkElement.MinWidthProperty);
};
FrameworkElement.prototype.SetMinWidth = function (value) {
    this.SetValue(FrameworkElement.MinWidthProperty, value);
};

FrameworkElement.VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", function () { return Number; }, FrameworkElement, VerticalAlignment.Stretch);
FrameworkElement.prototype.GetVerticalAlignment = function () {
    return this.GetValue(FrameworkElement.VerticalAlignmentProperty);
};
FrameworkElement.prototype.SetVerticalAlignment = function (value) {
    this.SetValue(FrameworkElement.VerticalAlignmentProperty, value);
};

FrameworkElement.StyleProperty = DependencyProperty.Register("Style", function () { return Style; }, FrameworkElement);
FrameworkElement.prototype.GetStyle = function () {
    return this.GetValue(FrameworkElement.StyleProperty);
};
FrameworkElement.prototype.SetStyle = function (value) {
    this.SetValue(FrameworkElement.StyleProperty, value);
};

FrameworkElement.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, FrameworkElement);
FrameworkElement.prototype.GetFlowDirection = function () {
    return this.GetValue(FrameworkElement.FlowDirectionProperty);
};
FrameworkElement.prototype.SetFlowDirection = function (value) {
    this.SetValue(FrameworkElement.FlowDirectionProperty, value);
};

//#endregion

//#region INSTANCE METHODS

FrameworkElement.prototype._ApplySizeConstraints = function (size) {
    var specified = new Size(this.GetWidth(), this.GetHeight());
    var constrained = new Size(this.GetMinWidth(), this.GetMinHeight());

    constrained = constrained.Max(size);

    if (!isNaN(specified.Width))
        constrained.Width = specified.Width;

    if (!isNaN(specified.Height))
        constrained.Height = specified.Height;

    constrained = constrained.Min(new Size(this.GetMaxWidth(), this.GetMaxHeight()));
    constrained = constrained.Max(new Size(this.GetMinWidth(), this.GetMinHeight()));

    if (this.GetUseLayoutRounding()) {
        constrained.Width = Math.round(constrained.Width);
        constrained.Height = Math.round(constrained.Height);
    }

    return constrained;
};
FrameworkElement.prototype._GetSubtreeExtents = function () {
    if (this._GetSubtreeObject())
        return this._ExtentsWithChildren;
    return this._Extents;
};

FrameworkElement.prototype._ComputeActualSize = function () {
    var parent = this.GetVisualParent();
    if (this.GetVisibility() != Visibility.Visible)
        return new Size(0.0, 0.0);

    if ((parent && !(parent instanceof Canvas)) || this.IsLayoutContainer())
        return this._GetRenderSize();

    var actual = new Size(0, 0);
    actual = this._ApplySizeConstraints(actual);
    return actual;
};
FrameworkElement.prototype._ComputeBounds = function () {
    var size = new Size(this.GetActualWidth(), this.GetActualHeight());
    size = this._ApplySizeConstraints(size);

    this._Extents = new Rect(0, 0, size.Width, size.Height);
    this._ExtentsWithChildren = this._Extents;

    var walker = new _VisualTreeWalker(this);
    var item;
    while (item = walker.Step()) {
        if (item._GetRenderVisible())
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
FrameworkElement.prototype._ComputeGlobalBounds = function () {
    UIElement.prototype._ComputeGlobalBounds.call(this);
    this._GlobalBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._LocalProjection);
};
FrameworkElement.prototype._ComputeSurfaceBounds = function () {
    UIElement.prototype._ComputeSurfaceBounds.call(this);
    this._SurfaceBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteProjection);
};

FrameworkElement.prototype._GetGlobalBounds = function () {
    if (this._GetSubtreeObject())
        return this._GlobalBoundsWithChildren;
    return this._GlobalBounds;
};
FrameworkElement.prototype._GetSubtreeBounds = function () {
    if (this._GetSubtreeObject())
        return this._SurfaceBoundsWithChildren;
    return this._SurfaceBounds;
};

FrameworkElement.prototype._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;

    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        //LayoutInformation.SetLayoutExceptionElement(this);
        return;
    }

    var last = LayoutInformation.GetPreviousConstraint(this);
    var shouldMeasure = (this._DirtyFlags & _Dirty.Measure) > 0;
    shouldMeasure = shouldMeasure || (!last || last.Width != availableSize.Width || last.Height != availableSize.Height);

    if (this.GetVisibility() != Visibility.Visible) {
        LayoutInformation.SetPreviousConstraint(this, availableSize);
        this._DesiredSize = new Size(0, 0);
        return;
    }

    this._ApplyTemplateWithError(error);

    var parent = this.GetVisualParent();

    if (!shouldMeasure)
        return;

    LayoutInformation.SetPreviousConstraint(this, availableSize);

    this._InvalidateArrange();
    this._UpdateBounds();

    var margin = this.GetMargin();
    var size = availableSize.GrowByThickness(margin.Negate());

    size = this._ApplySizeConstraints(size);

    if (this.MeasureOverride)
        size = this.MeasureOverride(size);
    else
        size = this._MeasureOverrideWithError(size, error);

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Measure;
    this._HiddenDesire = size;

    if (!parent || !parent.IsCanvas) {
        if (this instanceof Canvas || !this.IsLayoutContainer()) {
            this._DesiredSize = new Size(0, 0);
            return;
        }
    }

    size = this._ApplySizeConstraints(size);

    size = size.GrowByThickness(margin);
    size = size.Min(availableSize);

    if (this.GetUseLayoutRounding()) {
        size.Width = Math.round(size.Width);
        size.Height = Math.round(size.Height);
    }

    this._DesiredSize = size;
};
FrameworkElement.prototype._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);
    availableSize = availableSize.Max(desired);

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize, error);
        desired = child._DesiredSize;
    }

    return desired.Min(availableSize);
};
FrameworkElement.prototype._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;

    var slot = this._ReadLocalValue(LayoutInformation.LayoutSlotProperty);

    var shouldArrange = (this._DirtyFlags & _Dirty.Arrange) > 0;

    if (this.GetUseLayoutRounding()) {
        finalRect = new Rect(Math.round(finalRect.X), Math.round(finalRect.Y), Math.round(finalRect.Width), Math.round(finalRect.Height));
    }

    shouldArrange = shouldArrange || (slot != null ? !Rect.Equals(slot, finalRect) : true);

    if (finalRect.Width < 0 || finalRect.Height < 0
            || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
            || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
        var desired = this._DesiredSize;
        Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
        return;
    }

    var parent = this.GetVisualParent();

    if (this.GetVisibility() != Visibility.Visible) {
        LayoutInformation.SetLayoutSlot(this, finalRect);
        return;
    }

    if (!shouldArrange)
        return;

    var measure = LayoutInformation.GetPreviousConstraint(this);
    if (this.IsContainer() && measure == null)
        this._MeasureWithError(new Size(finalRect.Width, finalRect.Height), error);
    measure = LayoutInformation.GetPreviousConstraint(this);

    this.ClearValue(LayoutInformation.LayoutClipProperty);

    var margin = this.GetMargin();
    var childRect = finalRect.GrowByThickness(margin.Negate());

    this._UpdateTransform();
    this._UpdateProjection();
    this._UpdateBounds();

    var offer = this._HiddenDesire;

    var stretched = this._ApplySizeConstraints(new Size(childRect.Width, childRect.Height));
    var framework = this._ApplySizeConstraints(new Size());

    var horiz = this.GetHorizontalAlignment();
    var vert = this.GetVerticalAlignment();

    if (horiz == HorizontalAlignment.Stretch)
        framework.Width = Math.max(framework.Width, stretched.Width);

    if (vert == VerticalAlignment.Stretch)
        framework.Height = Math.max(framework.Height, stretched.Height);

    offer = offer.Max(framework);

    LayoutInformation.SetLayoutSlot(this, finalRect);

    if (this.ArrangeOverride)
        response = this.ArrangeOverride(offer);
    else
        response = this._ArrangeOverrideWithError(offer, error);

    if (horiz == HorizontalAlignment.Stretch)
        response.Width = Math.max(response.Width, framework.Width);

    if (vert == VerticalAlignment.Stretch)
        response.Height = Math.max(response.Height, framework.Height);

    /*
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    FLOW DIRECTION NOT IMPLEMENTED YET

    var flipHoriz = false;
    if (parent)
    flipHoriz = parent.GetFlowDirection() != this.GetFlowDirection();
    else if (this.GetParent() && this.GetParent()._IsPopup())
    flipHoriz = this.GetParent().GetFlowDirection() != this.GetFlowDirection();
    else
    flipHoriz = this.GetFlowDirection() == FlowDirection.RightToLeft;

    var layoutXform = Matrix.BuildIdentity();
    layoutXform = layoutXform.Translate(childRect.X, childRect.Y);
    if (flipHoriz)  {
    layoutXform = layoutXform.Translate(offer.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Arrange;
    var visualOffset = new Point(childRect.X, childRect.Y);
    LayoutInformation.SetVisualOffset(this, visualOffset);

    var oldSize = this._RenderSize;

    if (this.GetUseLayoutRounding()) {
        response.Width = Math.round(response.Width);
        response.Height = Math.round(response.Height);
    }

    this._SetRenderSize(response);
    var constrainedResponse = response.Min(this._ApplySizeConstraints(response));

    if (parent == null || parent instanceof Canvas) {
        if (!this.IsLayoutContainer()) {
            this._SetRenderSize(new Size(0, 0));
            return;
        }
    }

    var surface = App.Instance.MainSurface;
    var isTopLevel = this._IsAttached && surface._IsTopLevel(this);
    if (!isTopLevel) {
        switch (horiz) {
            case HorizontalAlignment.Left:
                break;
            case HorizontalAlignment.Right:
                visualOffset.X += childRect.Width - constrainedResponse.Width;
                break;
            case HorizontalAlignment.Center:
                visualOffset.X += (childRect.Width - constrainedResponse.Width) * 0.5;
                break;
            default:
                visualOffset.X += Math.max((childRect.Width - constrainedResponse.Width) * 0.5, 0);
                break;
        }

        switch (vert) {
            case VerticalAlignment.Top:
                break;
            case VerticalAlignment.Bottom:
                visualOffset.Y += childRect.Height - constrainedResponse.Height;
                break;
            case VerticalAlignment.Center:
                visualOffset.Y += (childRect.Height - constrainedResponse.Height) * 0.5;
                break;
            default:
                visualOffset.Y += Math.max((childRect.Height - constrainedResponse.Height) * 0.5, 0);
                break;
        }
    }

    if (this.GetUseLayoutRounding()) {
        visualOffset.X = Math.round(visualOffset.X);
        visualOffset.Y = Math.round(visualOffset.Y);
    }

    /* 
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    layoutXform = new Matrix();
    layoutXform = layoutXform.Translate(visualOffset.X, visualOffset.Y);
    if (flipHoriz) {
    layoutXform = layoutXform.Translate(response.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    LayoutInformation.SetVisualOffset(this, visualOffset);

    var element = new Rect(0, 0, response.Width, response.Height);
    var layoutClip = childRect;
    layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
    layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
    if (this.GetUseLayoutRounding()) {
        layoutClip.X = Math.round(layoutClip.X);
        layoutClip.Y = Math.round(layoutClip.Y);
    }

    if (((!isTopLevel && !Rect.Equals(element, element.Intersection(layoutClip))) || !Rect.Equals(constrainedResponse, response)) && !(this instanceof Canvas) && ((parent && !(parent instanceof Canvas)) || this.IsContainer())) {
        var frameworkClip = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
        layoutClip = layoutClip.Intersection(new Rect(0, 0, frameworkClip.Width, frameworkClip.Height));
        var rectangle = new RectangleGeometry();
        rectangle.SetRect(layoutClip);
        LayoutInformation.SetLayoutClip(this, rectangle);
    }

    if (!Rect.Equals(oldSize, response)) {
        if (!LayoutInformation.GetLastRenderSize(this)) {
            LayoutInformation.SetLastRenderSize(this, oldSize);
            this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
    }
};
FrameworkElement.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        child._ArrangeWithError(childRect, error);
        arranged = arranged.Max(finalSize);
    }

    return arranged;
};

FrameworkElement.prototype._HitTestPoint = function (ctx, p, uielist) {
    if (!this._GetRenderVisible())
        return;
    if (!this._GetIsHitTestVisible())
        return;

    if (!this._InsideClip(ctx, p.X, p.Y))
        return;

    var node = uielist.Prepend(new UIElementNode(this));
    var hit = false;
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZReverse, false);
    var child;
    while (child = walker.Step()) {
        child._HitTestPoint(ctx, p, uielist);
        if (!node.RefEquals(uielist.First())) {
            hit = true;
            break;
        }
    }

    if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, p.X, p.Y)))
        uielist.Remove(node);
};
FrameworkElement.prototype._InsideObject = function (ctx, x, y) {
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    var np = new Point(x, y);
    this._TransformPoint(np);
    if (np.X < 0 || np.Y < 0 || np.X > framework.Width || np.Y > framework.Height)
        return false;

    if (!this._InsideLayoutClip(x, y))
        return false;

    return UIElement.prototype._InsideObject.call(this, ctx, x, y);
};

FrameworkElement.prototype._InsideLayoutClip = function (x, y) {
    //NotImplemented("FrameworkElement._InsideLayoutClip(x, y)");
    return true;
};
FrameworkElement.prototype._HasLayoutClip = function () {
    var element = this;
    while (element) {
        if (LayoutInformation.GetLayoutClip(element))
            return true;
        if (element instanceof Canvas || element instanceof UserControl)
            break;
        element = element.GetVisualParent();
    }
    return false;
};
FrameworkElement.prototype._RenderLayoutClip = function (ctx) {
    var element = this;
    var inverse = new TranslationMatrix(0, 0);

    while (element) {
        var geom = LayoutInformation.GetLayoutClip(element);
        if (geom)
            ctx.Clip(geom);

        if (element instanceof Canvas || element instanceof UserControl)
            break;
        var visualOffset = LayoutInformation.GetVisualOffset(element);
        if (visualOffset) {
            ctx.Transform(new TranslationMatrix(-visualOffset.X, -visualOffset.Y));
            inverse.X += visualOffset.X;
            inverse.Y += visualOffset.Y;
        }

        element = element.GetVisualParent();
    }
    ctx.Transform(inverse);
};

FrameworkElement.prototype._ElementRemoved = function (value) {
    UIElement.prototype._ElementRemoved.call(this, value);
    if (this._GetSubtreeObject() == value)
        this._SetSubtreeObject(null);
};
FrameworkElement.prototype._UpdateLayer = function (pass, error) {
    var element = this;
    var parent;
    while (parent = element.GetVisualParent())
        element = parent;

    while (pass._Count < LayoutPass.MaxCount) {
        var node;
        while (node = pass._ArrangeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
            pass._ArrangeList.Remove(node);
            Info("PropagateFlagUp DirtyArrangeHint");
        }
        while (node = pass._SizeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            pass._SizeList.Remove(node);
            Info("PropagateFlagUp DirtySizeHint");
        }
        pass._Count = pass._Count + 1;

        var flag = UIElementFlags.None;
        if (element.GetVisibility() == Visibility.Visible) {
            if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                flag = UIElementFlags.DirtyMeasureHint;
            else if (element._HasFlag(UIElementFlags.DirtyArrangeHint))
                flag = UIElementFlags.DirtyArrangeHint;
            else if (element._HasFlag(UIElementFlags.DirtySizeHint))
                flag = UIElementFlags.DirtySizeHint;
        }

        if (flag != UIElementFlags.None) {
            var measureWalker = new _DeepTreeWalker(element);
            var child;
            while (child = measureWalker.Step()) {
                if (child.GetVisibility() != Visibility.Visible || !child._HasFlag(flag)) {
                    measureWalker.SkipBranch();
                    continue;
                }
                child._ClearFlag(flag);
                switch (flag) {
                    case UIElementFlags.DirtyMeasureHint:
                        if (child._DirtyFlags & _Dirty.Measure)
                            pass._MeasureList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtyArrangeHint:
                        if (child._DirtyFlags & _Dirty.Arrange)
                            pass._ArrangeList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtySizeHint:
                        if (child._ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
                            pass._SizeList.Append(new UIElementNode(child));
                        break;
                    default:
                        break;
                }
            }
        }

        if (flag == UIElementFlags.DirtyMeasureHint) {
            Info("Starting _MeasureList Update: " + pass._MeasureList._Count);
            while (node = pass._MeasureList.First()) {
                pass._MeasureList.Remove(node);
                node.UIElement._DoMeasureWithError(error);
                pass._Updated = true;
            }
        } else if (flag == UIElementFlags.DirtyArrangeHint) {
            Info("Starting _ArrangeList Update: " + pass._ArrangeList._Count);
            while (node = pass._ArrangeList.First()) {
                pass._ArrangeList.Remove(node);
                node.UIElement._DoArrangeWithError(error);
                pass._Updated = true;
                if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                    break;
            }
        } else if (flag == UIElementFlags.DirtySizeHint) {
            while (node = pass._SizeList.First()) {
                pass._SizeList.Remove(node);
                var fe = node.UIElement;
                pass._Updated = true;
                var last = LayoutInformation.GetLastRenderSize(fe);
                if (last) {
                    fe.ClearValue(LayoutInformation.LastRenderSizeProperty, false);
                    //TODO: SizeChanged Event 
                }
            }
            Info("Completed _SizeList Update");
        } else {
            break;
        }
    }
};

FrameworkElement.prototype._SetImplicitStyles = function (styleMask, styles) {
    var app = App.Instance;
    if (!app)
        return;

    if (styles == null)
        styles = app._GetImplicitStyles(this, styleMask);

    var error = new BError();

    if (styles) {
        for (var i = 0; i < _StyleIndex.Count; i++) {
            var style = styles[i];
            if (!style)
                continue;
            if (!Validators.StyleValidator(this, FrameworkElement.StyleProperty, style, error)) {
                Warn("Style validation failed.");
                return;
            }
        }
    }

    this._Providers[_PropertyPrecedence.ImplicitStyle].SetStyles(styleMask, styles, error);
};
FrameworkElement.prototype._ClearImplicitStyles = function (styleMask) {
    var error = new BError();
    this._Providers[_PropertyPrecedence.ImplicitStyle].ClearStyles(styleMask, error);
};

FrameworkElement.prototype.OnApplyTemplate = function () {
    this.TemplatedApplied.Raise(this, null);
};
FrameworkElement.prototype._ApplyTemplateWithError = function (error) {
    if (this._GetSubtreeObject())
        return false;

    var result = this._DoApplyTemplateWithError(error);
    if (result)
        this.OnApplyTemplate();
    return result;
};
FrameworkElement.prototype._DoApplyTemplateWithError = function (error) {
    var d = this._GetDefaultTemplate();
    if (d) {
        d._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        this._SetSubtreeObject(d);
        this._ElementAdded(d);
    }
    return d != null;
};
FrameworkElement.prototype._GetDefaultTemplate = function () {
    if (this._GetDefaultTemplateCallback)
        return this._GetDefaultTemplateCallback(this);
    return null;
};

FrameworkElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        UIElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == FrameworkElement.WidthProperty
        || args.Property == FrameworkElement.MaxWidthProperty
        || args.Property == FrameworkElement.MinWidthProperty
        || args.Property == FrameworkElement.HeightProperty
        || args.Property == FrameworkElement.MaxHeightProperty
        || args.Property == FrameworkElement.MinHeightProperty
        || args.Property == FrameworkElement.MarginProperty
        || args.Property == FrameworkElement.FlowDirectionProperty) {
        //var p = this._GetRenderTransformOrigin();
        //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
        this._FullInvalidate(false);

        var visualParent = this.GetVisualParent();
        if (visualParent)
            visualParent._InvalidateMeasure();

        this._InvalidateMeasure();
        this._InvalidateArrange();
        this._UpdateBounds();
    } else if (args.Property == FrameworkElement.StyleProperty) {
        var newStyle = args.NewValue;
        if (!error.IsErrored())
            this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
        if (error.IsErrored())
            return;
    } else if (args.Property == FrameworkElement.HorizontalAlignmentProperty
        || args.Property == FrameworkElement.VerticalAlignmentProperty) {
        this._InvalidateArrange();
        this._FullInvalidate(true);
    }
    this.PropertyChanged.Raise(this, args);
};

FrameworkElement.prototype._OnIsLoadedChanged = function (loaded) {
    if (loaded)
        this._SetImplicitStyles(_StyleMask.All);
    else
        this._ClearImplicitStyles(_StyleMask.VisualTree);

    UIElement.prototype._OnIsLoadedChanged.call(this, loaded);

    if (this._Providers[_PropertyPrecedence.InheritedDataContext])
        this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
};

FrameworkElement.prototype.SetVisualParent = function (/* UIElement */value) {
    UIElement.prototype.SetVisualParent.call(this, value);

    if (!this._LogicalParent && (this._VisualParent == null || this._VisualParent instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(this._VisualParent);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};
FrameworkElement.prototype._SetLogicalParent = function (value, error) {
    if (this._LogicalParent == value)
        return;

    if (false/* TODO: IsShuttingDown */) {
        this._LogicalParent = null;
        return;
    }

    if (value && this._LogicalParent && this._LogicalParent != value) {
        error.SetErrored(BError.InvalidOperation, "Element is a child of another element");
        return;
    }

    var oldParent = this._LogicalParent;
    this._LogicalParent = value;
    this._OnLogicalParentChanged(oldParent, value);
};
FrameworkElement.prototype._GetLogicalParent = function () {
    return this._LogicalParent;
};
FrameworkElement.prototype._OnLogicalParentChanged = function (oldParent, newParent) {
    if (false/* TODO: this._IsDisposing() */) {
    } else {
        var visualParent;
        if (newParent && newParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(newParent);
        else if ((visualParent = this.GetVisualParent()) && visualParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(visualParent);
        else
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(null);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};

//#endregion

//#endregion

//#region _FrameworkElementProvider

function _FrameworkElementProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
    this._ActualHeight = null;
    this._ActualWidth = null;
    this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
_FrameworkElementProvider.InheritFrom(_PropertyValueProvider);

_FrameworkElementProvider.prototype.GetPropertyValue = function (propd) {
    if (propd != FrameworkElement.ActualHeightProperty && propd != FrameworkElement.ActualWidthProperty)
        return undefined;

    var actual = this._Object._ComputeActualSize();
    if (!this._Last.Equals(actual)) {
        this._Last = actual;
        this._ActualHeight = actual.Height;
        this._ActualWidth = actual.Width;
    }

    if (propd == FrameworkElement.ActualHeightProperty) {
        return this._ActualHeight;
    } else {
        return this._ActualWidth;
    }
};

//#endregion

/// <reference path="FrameworkElement.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="LayoutInformation.js"/>
/// <reference path="Brushes.js"/>

//#region Panel

function Panel() {
    FrameworkElement.call(this);
}
Panel.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

Panel.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Panel);
Panel.prototype.GetBackground = function () {
    return this.GetValue(Panel.BackgroundProperty);
};
Panel.prototype.SetBackground = function (value) {
    this.SetValue(Panel.BackgroundProperty, value);
};

Panel._CreateChildren = {
    GetValue: function (propd, obj) {
        var col = new UIElementCollection();
        col._SetIsSecondaryParent(true);
        if (obj)
            obj._SetSubtreeObject(col);
        return col;
    }
};
Panel.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return UIElementCollection; }, Panel, null, Panel._CreateChildren);
Panel.prototype.GetChildren = function () {
    return this.GetValue(Panel.ChildrenProperty);
};
Panel.prototype.SetChildren = function (value) {
    this.SetValue(Panel.ChildrenProperty, value);
};

Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", function () { return Boolean; }, Panel, false);
Panel.prototype.GetIsItemsHost = function () {
    return this.GetValue(Panel.IsItemsHostProperty);
};
Panel.prototype.SetIsItemsHost = function (value) {
    this.SetValue(Panel.IsItemsHostProperty, value);
};

//#endregion

//#region INSTANCE METHODS

Panel.prototype.IsLayoutContainer = function () { return true; };
Panel.prototype.IsContainer = function () { return true; };
Panel.prototype._ComputeBounds = function () {
    this._Extents = this._ExtentsWithChildren = this._Bounds = this._BoundsWithChildren = new Rect();

    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.Logical);
    var item;
    while (item = walker.Step()) {
        if (!item._GetRenderVisible())
            continue;
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    if (this.GetBackground()) {
        this._Extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);
    this._BoundsWithChildren = this._IntersectBoundsWithClipPath(this._ExtentsWithChildren/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Panel.prototype._GetCoverageBounds = function () {
    var background = this.GetBackground();
    if (background && background.IsOpaque())
        return this._Bounds;
    return new Rect();
};
Panel.prototype._ShiftPosition = function (point) {
    var dx = point.X - this._Bounds.X;
    var dy = point.Y - this._Bounds.Y;

    FrameworkElement.prototype._ShiftPosition.call(this, point);

    this._BoundsWithChildren.X += dx;
    this._BoundsWithChildren.Y += dy;
};
Panel.prototype._EmptyBackground = function () {
    return this.GetBackground() == null;
};
Panel.prototype._MeasureOverrideWithError = function (availableSize, error) {
    Info("Panel._MeasureOverrideWithError [" + this._TypeName + "]");
    var result = new Size(0, 0);
    return result;
};
Panel.prototype._Render = function (ctx, region) {
    var background = this.GetBackground();
    if (!background)
        return;
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    framework = this._ApplySizeConstraints(framework);
    if (framework.Width <= 0 || framework.Height <= 0)
        return;
    var area = new Rect(0, 0, framework.Width, framework.Height);

    if (!this._HasLayoutClip() && false/* TODO: IsIntegerTranslation */) {
        //TODO:
    } else {
        ctx.Save();
        this._RenderLayoutClip(ctx);
        ctx.Fill(area, background);
        ctx.Restore();
    }
};

Panel.prototype._CanFindElement = function () { return this.GetBackground() != null; }
Panel.prototype._InsideObject = function (ctx, x, y) {
    if (this.GetBackground())
        return FrameworkElement.prototype._InsideObject.call(this, ctx, x, y);
    return false;
};

Panel.prototype._ElementAdded = function (item) {
    FrameworkElement.prototype._ElementAdded.call(this, item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.prototype._ElementRemoved = function (item) {
    FrameworkElement.prototype._ElementRemoved.call(this, item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

Panel.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Panel) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property == Panel.BackgroundProperty) {
        this._UpdateBounds();
        this._Invalidate();
    } else if (args.Property == Panel.ChildrenProperty) {
        var collection;
        var count;
        var i;
        this._SetSubtreeObject(args.NewValue ? args.NewValue : null);
        if (args.OldValue) {
            collection = args.OldValue;
            count = collection.GetCount();
            for (i = 0; i < count; i++) {
                this._ElementRemoved(collection.GetValueAt(i));
            }
        }
        if (args.NewValue) {
            collection = args.NewValue;
            count = collection.GetCount();
            for (i = 0; i < count; i++) {
                this._ElementAdded(collection.GetValueAt(i));
            }
        }
        this._UpdateBounds();
    }
    this.PropertyChanged.Raise(this, args);
};
Panel.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property && args.Property == Panel.BackgroundProperty) {
        this._Invalidate();
    } else {
        FrameworkElement.prototype._OnSubPropertyChanged.call(this, sender, args);
    }
};
Panel.prototype._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        var error = new BError();
        switch (args.Action) {
            case CollectionChangedArgs.Action.Replace:
                if (args.OldValue instanceof FrameworkElement)
                    args.OldValue._SetLogicalParent(null, error);
                this._ElementRemoved(args.OldValue);
                //NOTE: falls into add on purpose
            case CollectionChangedArgs.Action.Add:
                if (args.NewValue instanceof FrameworkElement)
                    args.NewValue._SetLogicalParent(this, error);
                this._ElementAdded(args.NewValue);
                break;
            case CollectionChangedArgs.Action.Remove:
                if (args.OldValue instanceof FrameworkElement)
                    args.OldValue._SetLogicalParent(null, error);
                this._ElementRemoved(args.OldValue);
                break;
            case CollectionChangedArgs.Action.Clearing:
                break;
            case CollectionChangedArgs.Action.Cleared:
                break;
        }
    } else {
        FrameworkElement.prototype._OnCollectionChanged.call(this, sender, args);
    }
};
Panel.prototype._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property == Canvas.ZIndexProperty || args.Property == Canvas.ZProperty) {
            args.Item._Invalidate();
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
            return;
        }
    }
    FrameworkElement.prototype._OnCollectionItemChanged.call(this, sender, args);
};
Panel.prototype._OnIsAttachedChanged = function (value) {
    FrameworkElement.prototype._OnIsAttachedChanged.call(this, value);
    if (value) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

//#endregion

//#region ANNOTATIONS

Panel.Annotations = {
    ContentProperty: Panel.ChildrenProperty
};

//#endregion

//#endregion

/// <reference path="Panel.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />

//#region StackPanel

function StackPanel() {
    Panel.call(this);
}
StackPanel.InheritFrom(Panel);

//#region DEPENDENCY PROPERTIES

StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return Number; }, StackPanel, Orientation.Vertical);
StackPanel.prototype.GetOrientation = function () {
    return this.GetValue(StackPanel.OrientationProperty);
};
StackPanel.prototype.SetOrientation = function (value) {
    this.SetValue(StackPanel.OrientationProperty, value);
};
StackPanel._OrientationChanged = function (d, args) {
    if (!d)
        return;
    d._InvalidateMeasure();
    d._InvalidateArrange();
};

//#endregion

//#region INSTANCE METHODS

StackPanel.prototype.MeasureOverride = function (constraint) {
    Info("StackPanel.MeasureOverride [" + this._TypeName + "]");
    var childAvailable = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    var measured = new Size(0, 0);

    if (this.GetOrientation() == Orientation.Vertical) {
        childAvailable.Width = constraint.Width;
        if (!isNaN(this.GetWidth()))
            childAvailable.Width = this.GetWidth();
        childAvailable.Width = Math.min(childAvailable.Width, this.GetMaxWidth());
        childAvailable.Width = Math.max(childAvailable.Width, this.GetMinWidth());
    } else {
        childAvailable.Height = constraint.Height;
        if (!isNaN(this.GetHeight()))
            childAvailable.Height = this.GetHeight();
        childAvailable.Height = Math.min(childAvailable.Height, this.GetMaxHeight());
        childAvailable.Height = Math.max(childAvailable.Height, this.GetMinHeight());
    }

    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        var child = children.GetValueAt(i);
        child.Measure(childAvailable);
        var size = child._DesiredSize;

        if (this.GetOrientation() == Orientation.Vertical) {
            measured.Height += size.Height;
            measured.Width = Math.max(measured.Width, size.Width);
        } else {
            measured.Width += size.Width;
            measured.Height = Math.max(measured.Height, size.Height);
        }
    }

    return measured;
};
StackPanel.prototype.ArrangeOverride = function (arrangeSize) {
    Info("StackPanel.ArrangeOverride [" + this._TypeName + "]");
    var arranged = arrangeSize;

    if (this.GetOrientation() == Orientation.Vertical)
        arranged.Height = 0;
    else
        arranged.Width = 0;

    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        var child = children.GetValueAt(i);
        var size = child._DesiredSize;
        var childFinal;
        if (this.GetOrientation() == Orientation.Vertical) {
            size.Width = arrangeSize.Width;

            childFinal = new Rect(0, arranged.Height, size.Width, size.Height);

            if (childFinal.IsEmpty())
                child.Arrange(new Rect());
            else
                child.Arrange(childFinal);

            arranged.Width = Math.max(arranged.Width, size.Width);
            arranged.Height += size.Height;
        } else {
            size.Height = arrangeSize.Height;

            childFinal = new Rect(arranged.Width, 0, size.Width, size.Height);
            if (childFinal.IsEmpty())
                child.Arrange(new Rect());
            else
                child.Arrange(childFinal);

            arranged.Width += size.Width;
            arranged.Height = Math.max(arranged.Height, size.Height);
        }
    }

    if (this.GetOrientation() == Orientation.Vertical)
        arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
    else
        arranged.Width = Math.max(arranged.Width, arrangeSize.Width);

    return arranged;

};

//#endregion

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="DependencyObject.js" />
/// <reference path="Collections.js"/>
/// CODE
/// <reference path="App.js"/>
/// <reference path="JsonParser.js"/>

//#region SetterBase

function SetterBase() {
    DependencyObject.call(this);
    this._IsAttached = false;
}
SetterBase.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);
SetterBase.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBase.IsSealedProperty);
};

//#endregion

SetterBase.prototype.GetAttached = function () {
    return this._Attached;
};
SetterBase.prototype.SetAttached = function (value) {
    this._Attached = value;
};
SetterBase.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetValue(SetterBase.IsSealedProperty, true);
};

//#endregion

//#region SetterBaseCollection

function SetterBaseCollection() {
    DependencyObjectCollection.call(this);
}
SetterBaseCollection.InheritFrom(DependencyObjectCollection);

//#region DEPENDENCY PROPERTIES

SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);
SetterBaseCollection.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.prototype.SetIsSealed = function (value) {
    this.SetValue(SetterBaseCollection.IsSealedProperty, value);
};

//#endregion

SetterBaseCollection.prototype._Seal = function () {
    this.SetIsSealed(true);

    var error = new BError();
    var iterator = this.GetIterator();
    var setter;
    while (iterator.Next(error) && (setter = iterator.GetCurrent(error))) {
        setter._Seal();
    }
};

SetterBaseCollection.prototype.AddedToCollection = function (value, error) {
    if (!value || !this._ValidateSetter(value, error))
        return false;
    if (value instanceof SetterBase) {
        value.SetAttached(true);
        value._Seal();
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
SetterBaseCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value.SetAttached(false);
    }
    DependencyObjectCollection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
};

SetterBaseCollection.prototype.IsElementType = function (value) {
    return value instanceof SetterBase;
};

SetterBaseCollection.prototype._ValidateSetter = function (value, error) {
    NotImplemented("SetterBaseCollection._ValidateSetter");
    return true;
};

//#endregion

//#region Setter

function Setter() {
    SetterBase.call(this);
}
Setter.InheritFrom(SetterBase);

//#region DEPENDENCY PROPERTIES

Setter.PropertyProperty = DependencyProperty.Register("Property", function () { return DependencyProperty; }, Setter);
Setter.prototype.GetProperty = function () {
    return this.GetValue(Setter.PropertyProperty);
};
Setter.prototype.SetProperty = function (value) {
    this.SetValue(Setter.PropertyProperty, value);
};

Setter.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, Setter);
Setter.prototype.GetValue_Prop = function () {
    return this.GetValue(Setter.ValueProperty);
};
Setter.prototype.SetValue_Prop = function (value) {
    this.SetValue(Setter.ValueProperty, value);
};

Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, Setter);

//#endregion

//#endregion

//#region Style

function Style() {
    DependencyObject.call(this);
}
Style.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

Style.SettersProperty = DependencyProperty.RegisterFull("Setters", function () { return SetterBaseCollection; }, Style, null, { GetValue: function () { return new SetterBaseCollection(); } });
Style.prototype.GetSetters = function () {
    return this.GetValue(Style.SettersProperty);
};

Style.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, Style);
Style.prototype.GetIsSealed = function () {
    return this.GetValue(Style.IsSealedProperty);
};

Style.BasedOnProperty = DependencyProperty.Register("BasedOn", function () { return Function; }, Style);
Style.prototype.GetBasedOn = function () {
    return this.GetValue(Style.BasedOnProperty);
};
Style.prototype.SetBasedOn = function (value) {
    this.SetValue(Style.BasedOnProperty, value);
};

Style.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, Style);
Style.prototype.GetTargetType = function () {
    return this.GetValue(Style.TargetTypeProperty);
};
Style.prototype.SetTargetType = function (value) {
    this.SetValue(Style.TargetTypeProperty, value);
};

//#endregion

//#region ANNOTATIONS

Style.Annotations = {
    ContentProperty: Style.SettersProperty
};

//#endregion

Style.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;

    var app = App.Instance;
    if (!app)
        return;

    app.ConvertSetterValues(this);
    this.SetValue(Style.IsSealedProperty, true);
    var setters = this.GetSetters();
    for (var i = 0; i < setters.length; i++) {
        setters[i]._Seal();
    }

    var base = this.GetBasedOn();
    if (base)
        base._Seal();
};

Style.prototype._AddSetter = function (dobj, propName, value) {
    this.GetSetters().Add(JsonParser.CreateSetter(dobj, propName, value));
};
Style.prototype._AddSetterJson = function (dobj, propName, json) {
    var parser = new JsonParser();
    this._AddSetter(dobj, propName, parser.CreateObject(json, new NameScope()));
};
Style.prototype._AddSetterControlTemplate = function (dobj, propName, templateJson) {
    this._AddSetter(dobj, propName, new ControlTemplate(dobj.constructor, templateJson));
};

//#endregion

//#region _DeepStyleWalker

function _DeepStyleWalker(styles) {
    RefObject.call(this);
    this._Setters = new Array();
    this._Offset = 0;

    if (styles instanceof Style)
        this._InitializeStyle(styles);
    else if (styles instanceof Array)
        this._InitializeStyles(styles);
}
_DeepStyleWalker.InheritFrom(RefObject);

_DeepStyleWalker.prototype.Step = function () {
    if (this._Offset < this._Setters.length) {
        var s = this._Setters[this._Offset];
        this._Offset++;
        return s;
    }
    return undefined;
};
_DeepStyleWalker.prototype._InitializeStyle = function (style) {
    var dps = new Array();
    var cur = style;
    while (cur) {
        var setters = cur.GetSetters();
        for (var i = setters.length; i >= 0; i--) {
            var setter = setters[i];
            var propd = setter.GetProperty();
            if (!dps[propd]) {
                dps[propd] = true;
                this._Setters.push(setter);
            }
        }
        cur = cur.GetBasedOn();
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};
_DeepStyleWalker.prototype._InitializeStyles = function (styles) {
    if (!styles)
        return;

    var dps = new Array();
    var stylesSeen = new Array();
    for (var i = 0; i < _StyleIndex.Count; i++) {
        var style = styles[i];
        while (style != null) {
            if (stylesSeen[style]) //FIX: NOT GONNA WORK
                continue;

            var setters = style.GetSetters();
            var count = setters ? setters.GetCount() : 0;
            for (var j = count - 1; j >= 0; j--) {
                var setter = setters.GetValueAt(j);
                if (!setter || !(setter instanceof Setter))
                    continue;

                var dpVal = setter.GetValue(Setter.PropertyProperty);
                if (!dpVal)
                    continue;

                if (!dps[dpVal]) {
                    dps[dpVal] = setter;
                    this._Setters.push(setter);
                }
            }

            stylesSeen[style] = true;
            style = style.GetBasedOn();
        }
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};

_DeepStyleWalker.SetterSort = function (a, b) {
    var as = a.toString();
    var bs = a.toString();
    return (as == bs) ? 0 : ((as > bs) ? 1 : -1);
};

//#endregion

/// <reference path="FrameworkElement.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="TextLayout.js"/>
/// <reference path="Collections.js"/>

//#region TextBlock

function TextBlock() {
    FrameworkElement.call(this);

    this._Layout = new TextLayout();

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._SetsValue = true;
    this._WasSet = true;
    this._Dirty = true;

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._Font = new Font();
}
TextBlock.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

TextBlock.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, TextBlock, new Thickness());
TextBlock.prototype.GetPadding = function () {
    return this.GetValue(TextBlock.PaddingProperty);
};
TextBlock.prototype.SetPadding = function (value) {
    this.SetValue(TextBlock.PaddingProperty, value);
};

TextBlock.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextBlock, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextBlock.prototype.GetForeground = function () {
    return this.GetValue(TextBlock.ForegroundProperty);
};
TextBlock.prototype.SetForeground = function (value) {
    this.SetValue(TextBlock.ForegroundProperty, value);
};

TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextBlock, Font.DEFAULT_FAMILY);
TextBlock.prototype.GetFontFamily = function () {
    return this.GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.prototype.SetFontFamily = function (value) {
    this.SetValue(TextBlock.FontFamilyProperty, value);
};

TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextBlock, Font.DEFAULT_STRETCH);
TextBlock.prototype.GetFontStretch = function () {
    return this.GetValue(TextBlock.FontStretchProperty);
};
TextBlock.prototype.SetFontStretch = function (value) {
    this.SetValue(TextBlock.FontStretchProperty, value);
};

TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextBlock, Font.DEFAULT_STYLE);
TextBlock.prototype.GetFontStyle = function () {
    return this.GetValue(TextBlock.FontStyleProperty);
};
TextBlock.prototype.SetFontStyle = function (value) {
    this.SetValue(TextBlock.FontStyleProperty, value);
};

TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextBlock, Font.DEFAULT_WEIGHT);
TextBlock.prototype.GetFontWeight = function () {
    return this.GetValue(TextBlock.FontWeightProperty);
};
TextBlock.prototype.SetFontWeight = function (value) {
    this.SetValue(TextBlock.FontWeightProperty, value);
};

TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextBlock, Font.DEFAULT_SIZE);
TextBlock.prototype.GetFontSize = function () {
    return this.GetValue(TextBlock.FontSizeProperty);
};
TextBlock.prototype.SetFontSize = function (value) {
    this.SetValue(TextBlock.FontSizeProperty, value);
};

TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return Number; }, TextBlock, TextDecorations.None);
TextBlock.prototype.GetTextDecorations = function () {
    return this.GetValue(TextBlock.TextDecorationsProperty);
};
TextBlock.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextBlock.TextDecorationsProperty, value);
};

TextBlock.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextBlock);
TextBlock.prototype.GetFontResource = function () {
    return this.GetValue(TextBlock.FontResourceProperty);
};
TextBlock.prototype.SetFontResource = function (value) {
    this.SetValue(TextBlock.FontResourceProperty, value);
};

TextBlock.FontSourceProperty = DependencyProperty.Register("FontSource", function () { return Object; }, TextBlock);
TextBlock.prototype.GetFontSource = function () {
    return this.GetValue(TextBlock.FontSourceProperty);
};
TextBlock.prototype.SetFontSource = function (value) {
    this.SetValue(TextBlock.FontSourceProperty, value);
};

TextBlock.TextProperty = DependencyProperty.Register("Text", function () { return String; }, TextBlock, "");
TextBlock.prototype.GetText = function () {
    return this.GetValue(TextBlock.TextProperty);
};
TextBlock.prototype.SetText = function (value) {
    this.SetValue(TextBlock.TextProperty, value);
};

TextBlock.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, TextBlock, null, { GetValue: function () { return new InlineCollection(); } });
TextBlock.prototype.GetInlines = function () {
    return this.GetValue(TextBlock.InlinesProperty);
};

TextBlock.LineStackingStrategyProperty = DependencyProperty.Register("LineStackingStrategy", function () { return Number; }, TextBlock);
TextBlock.prototype.GetLineStackingStrategy = function () {
    return this.GetValue(TextBlock.LineStackingStrategyProperty);
};
TextBlock.prototype.SetLineStackingStrategy = function (value) {
    this.SetValue(TextBlock.LineStackingStrategyProperty, value);
};

TextBlock.LineHeightProperty = DependencyProperty.Register("LineHeight", function () { return Number; }, TextBlock, 0.0);
TextBlock.prototype.GetLineHeight = function () {
    return this.GetValue(TextBlock.LineHeightProperty);
};
TextBlock.prototype.SetLineHeight = function (value) {
    this.SetValue(TextBlock.LineHeightProperty, value);
};

TextBlock.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () { return Number; }, TextBlock, TextAlignment.Left);
TextBlock.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBlock.TextAlignmentProperty);
};
TextBlock.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBlock.TextAlignmentProperty, value);
};

TextBlock.TextTrimmingProperty = DependencyProperty.Register("TextTrimming", function () { return Number; }, TextBlock, TextTrimming.None);
TextBlock.prototype.GetTextTrimming = function () {
    return this.GetValue(TextBlock.TextTrimmingProperty);
};
TextBlock.prototype.SetTextTrimming = function (value) {
    this.SetValue(TextBlock.TextTrimmingProperty, value);
};

TextBlock.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () { return Number; }, TextBlock, TextWrapping.NoWrap);
TextBlock.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBlock.TextWrappingProperty);
};
TextBlock.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBlock.TextWrappingProperty, value);
};

//#endregion

//#region INSTANCE METHODS

TextBlock.prototype._ComputeBounds = function () {
    this._Extents = this._Layout.GetRenderExtents();
    var padding = this.GetPadding();

    this._Extents.X += padding.Left;
    this._Extents.Y += padding.Top;

    this._ExtentsWithChildren = this._Extents;

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowBy(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);
    this._BoundsWithChildren = this._Bounds;

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
TextBlock.prototype._ComputeActualSize = function () {
    var padding = this.GetPadding();
    var constraint = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    var result = new Size(0.0, 0.0);

    if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty) != null || LayoutInformation.GetPreviousConstraint(this) != null) {
        this._Layout.Layout();
        var actuals = this._Layout.GetActualExtents();
        this._ActualWidth = actuals.Width;
        this._ActualHeight = actuals.Height;
    } else {
        constraint = constraint.GrowByThickness(padding.Negate());
        this.Layout(constraint);
    }
    result = new Size(this._ActualWidth, this._ActualHeight);
    result = result.GrowByThickness(padding);
    return result;
};
TextBlock.prototype._MeasureOverrideWithError = function (availableSize, error) {
    var padding = this.GetPadding();
    var constraint = availableSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    desired = new Size(this._ActualWidth, this._ActualHeight).GrowByThickness(padding);
    return desired;
};
TextBlock.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var padding = this.GetPadding();
    var constraint = finalSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    var arranged = new Size(this._ActualWidth, this._ActualHeight);
    arranged = arranged.Max(constraint);
    this._Layout.SetAvailableWidth(constraint.Width);
    arranged = arranged.GrowByThickness(padding);
    return finalSize;
};

TextBlock.prototype._Render = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    var padding = this.GetPadding();
    var offset = new Point(padding.Left, padding.Top);
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
        NotImplemented("TextBlock._Render: Right to left");
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), offset);
    ctx.Restore();
};

TextBlock.prototype.Layout = function (/* Size */constraint) {
    if (this._WasSet && this._GetValueNoDefault(TextBlock.TextProperty) == null) {
        this._ActualHeight = this._Font.GetActualHeight();
        this._ActualWidth = 0.0;
    } else if (!this._WasSet) {
        this._ActualHeight = 0.0;
        this._ActualWidth = 0.0;
    } else {
        this._Layout.SetMaxWidth(constraint.Width);
        this._Layout.Layout();
        var actuals = this._Layout.GetActualExtents();
        this._ActualWidth = actuals.Width;
        this._ActualHeight = actuals.Height;
    }
    this._Dirty = false;
};
TextBlock.prototype._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    changed = changed || force;
    return changed;
};
TextBlock.prototype._UpdateFonts = function (force) {
    if (!this._UpdateFont(force))
        return false;
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Dirty = true;
    return true;
};
TextBlock.prototype._UpdateLayoutAttributes = function () {
    var inlines = this.GetInlines();

    this._InvalidateMeasure();
    this._InvalidateArrange();

    this._UpdateFont(false);

    var length = 0;
    var runs = new List();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
    }
    if (count > 0)
        this._WasSet = true;
    this._Layout.SetText(this.GetText(), length);
    this._Layout.SetTextAttributes(runs);
};
TextBlock.prototype._UpdateLayoutAttributesForInline = function (item, length, runs) {
    if (item instanceof Run) {
        var text = item.GetText();
        if (text && text.length) {
            runs.Append(new _TextLayoutAttributes(item, length));
            length += text.length;
        }
    } else if (item instanceof LineBreak) {
        runs.Append(new _TextLayoutAttributes(item, length));
        length += 1; //line break length
    } else if (item instanceof Span) {
        var inlines = item.GetInlines();
        var count = inlines.GetCount();
        for (var i = 0; i < count; i++) {
            length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
        }
    }
    return length;
};
TextBlock.prototype._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
TextBlock.prototype._GetTextInternal = function (inlines) {
    if (!inlines)
        return "";
    var block = "";
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        block = block.concat(inlines.GetValueAt(i)._SerializeText());
    }
    return block;
};
TextBlock.prototype._SetTextInternal = function (text) {
    this._SetsValue = false;

    var value;
    var inlines = this.GetValue(TextBlock.InlinesProperty);
    if (text) {
        var count = inlines.GetCount();
        var run = null;
        if (count > 0 && (value = inlines.GetValueAt(0)) && value instanceof Run) {
            run = value;
            if (run._GetAutogenerated()) {
                while (count > 1) {
                    inlines.RemoveAt(count - 1);
                    count--;
                }
            } else {
                run = null;
            }
        }
        if (run == null) {
            inlines.Clear();
            run = new Run();
            run._SetAutogenerated(true);
            inlines.Add(run);
        }
        run.SetText(text);
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(run);
    } else {
        inlines.Clear();
        this.SetText("");
    }

    this._SetsValue = true;
};

TextBlock.prototype._CanFindElement = function () {
    return true;
};

TextBlock.prototype._OnPropertyChanged = function (args, error) {
    var invalidate = true;
    if (args.Property.OwnerType !== TextBlock) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        if (args.Property != FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFonts(false))
            return;
    }

    if (args.Property == TextBlock.FontFamilyProperty
        || args.Property == TextBlock.FontSizeProperty
        || args.Property == TextBlock.FontStretchProperty
        || args.Property == TextBlock.FontStyleProperty
        || args.Property == TextBlock.FontWeightProperty) {
        this._UpdateFonts(false);
    } else if (args.Property == TextBlock.TextProperty) {
        if (this._SetsValue) {
            this._SetTextInternal(args.NewValue)

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property == TextBlock.InlinesProperty) {
        if (this._SetsValue) {
            this._SetsValue = false;
            this.SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property == TextBlock.LineStackingStrategyProperty) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property == TextBlock.LineHeightProperty) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
    } else if (args.Property == TextBlock.TextDecorationsProperty) {
        this._Dirty = true;
    } else if (args.Property == TextBlock.TextAlignmentProperty) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
    } else if (args.Property == TextBlock.TextTrimmingProperty) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property == TextBlock.TextWrappingProperty) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
    } else if (args.Property == TextBlock.PaddingProperty) {
        this._Dirty = true;
    } else if (args.Property == TextBlock.FontSourceProperty) {
    }

    if (invalidate) {
        if (this._Dirty) {
            this._InvalidateMeasure();
            this._InvalidateArrange();
            this._UpdateBounds(true);
        }
        this._Invalidate();
    }
    this.PropertyChanged.Raise(this, args);
};
TextBlock.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property != null && args.Property == TextBlock.ForegroundProperty) {
        this._Invalidate();
    } else {
        FrameworkElement.prototype._OnSubPropertyChanged.call(this, sender, args);
    }
};
TextBlock.prototype._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(TextBlock.InlinesProperty, sender)) {
        FrameworkElement.prototype._OnCollectionChanged.call(this, sender, args);
        return;
    }

    var inlines = this.GetInlines();
    if (args.Action == CollectionChangedArgs.Action.Clearing)
        return;

    if (!this._SetsValue)
        return;

    if (args.Action == CollectionChangedArgs.Add)
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);

    this._SetsValue = false;
    this.SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
    this._SetsValue = true;

    this._UpdateLayoutAttributes();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Invalidate();
};

//#endregion

//#region ANNOTATIONS

TextBlock.Annotations = {
    ContentProperty: TextBlock.InlinesProperty
};

//#endregion

//#endregion

//#region _TextBlockDynamicPropertyValueProvider

function _TextBlockDynamicPropertyValueProvider(obj, propPrecedence) {
    _FrameworkElementProvider.call(this, obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
}
_TextBlockDynamicPropertyValueProvider.InheritFrom(_FrameworkElementProvider);

_TextBlockDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return _FrameworkElementProvider.prototype.GetPropertyValue.call(this, propd);
};

//#endregion

/// <reference path="DependencyObject.js"/>
/// <reference path="Collections.js"/>
/// CODE

//#region VisualState

function VisualState() {
    DependencyObject.call(this);
}
VisualState.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.prototype.GetStoryboard = function () {
    return this.GetValue(VisualState.StoryboardProperty);
};
VisualState.prototype.SetStoryboard = function (value) {
    this.SetValue(VisualState.StoryboardProperty, value);
};

//#endregion

//#region ANNOTATIONS

VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};

//#endregion

//#endregion

//#region VisualStateCollection

function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.InheritFrom(DependencyObjectCollection);

VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

//#endregion

//#region VisualStateGroup

function VisualStateGroup() {
    DependencyObject.call(this);
    this._States = new VisualStateCollection();
}
VisualStateGroup.InheritFrom(DependencyObject);

VisualStateGroup.prototype.GetStates = function () {
    return this._States;
};

VisualStateGroup.prototype._GetState = function (stateName) {
    var states = this.GetStates();
    for (var i = 0; i < states.GetCount(); i++) {
        var state = states.GetValueAt(i);
        if (state.Name === stateName)
            return state;
    }
    return null;
};

//#region ANNOTATIONS

VisualStateGroup.Annotations = {
    ContentProperty: "States"
};

//#endregion

//#endregion

//#region VisualStateGroupCollection

function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.InheritFrom(DependencyObjectCollection);

VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

//#endregion

//#region VisualStateManager

function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};

//#endregion

VisualStateManager.GoToState = function (uie, state, useTransitions) {
    NotImplemented("VisualStateManager.GoToState");
};

//#endregion

/// <reference path="FrameworkElement.js"/>
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="Surface.js"/>
/// <reference path="Brushes.js"/>

//#region Border

function Border() {
    FrameworkElement.call(this);
}
Border.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

Border.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Border);
Border.prototype.GetBackground = function () {
    return this.GetValue(Border.BackgroundProperty);
};
Border.prototype.SetBackground = function (value) {
    this.SetValue(Border.BackgroundProperty, value);
};

Border.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Border);
Border.prototype.GetBorderBrush = function () {
    return this.GetValue(Border.BorderBrushProperty);
};
Border.prototype.SetBorderBrush = function (value) {
    this.SetValue(Border.BorderBrushProperty, value);
};

Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.prototype.GetBorderThickness = function () {
    return this.GetValue(Border.BorderThicknessProperty);
};
Border.prototype.SetBorderThickness = function (value) {
    this.SetValue(Border.BorderThicknessProperty, value);
};

Border.ChildProperty = DependencyProperty.Register("Child", function () { return UIElement; }, Border);
Border.prototype.GetChild = function () {
    return this.GetValue(Border.ChildProperty);
};
Border.prototype.SetChild = function (value) {
    this.SetValue(Border.ChildProperty, value);
};

Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () { return CornerRadius; }, Border, new CornerRadius(0), null, null, null, Border._CornerRadiusValidator);
Border.prototype.GetCornerRadius = function () {
    return this.GetValue(Border.CornerRadiusProperty);
};
Border.prototype.SetCornerRadius = function (value) {
    this.SetValue(Border.CornerRadiusProperty, value);
};

Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.prototype.GetPadding = function () {
    return this.GetValue(Border.PaddingProperty);
};
Border.prototype.SetPadding = function (value) {
    this.SetValue(Border.PaddingProperty, value);
};

//#endregion

//#region INSTANCE METHODS

Border.prototype.IsLayoutContainer = function () { return true; };
Border.prototype._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);
    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize.GrowByThickness(border.Negate()), error);
        desired = child._DesiredSize;
    }
    desired = desired.GrowByThickness(border);
    desired = desired.Min(availableSize);
    return desired;
};
Border.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var border = this.GetPadding().Plus(this.GetBorderThickness());
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        childRect = childRect.GrowByThickness(border.Negate());
        child._ArrangeWithError(childRect, error);
        arranged = new Size(childRect.Width, childRect.Height).GrowBy(border);
        arranged = arranged.Max(finalSize);
    }
    return finalSize;
};
Border.prototype._Render = function (ctx, region) {
    var borderBrush = this.GetBorderBrush();
    var paintBorder = this._Extents;

    if (!this.GetBackground() && !borderBrush)
        return;
    if (paintBorder.IsEmpty())
        return;

    //BorderBrush or CornerRadius?
    if (borderBrush || !this.GetCornerRadius().IsZero()) {
        ctx.Save();
        this._RenderImpl(ctx, region);
        ctx.Restore();
        return;
    }

    //If we got this far, all we have left to paint is the background
    if (!this._HasLayoutClip() && false /* TODO: IsIntegerTranslation  */) {
        //TODO:
        //var paintBackground = paintBorder.GrowByThickness(this.GetBorderThickness().Negate());

    } else {
        ctx.Save();
        this._RenderImpl(ctx, region);
        ctx.Restore();
    }
};
Border.prototype._RenderImpl = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    ctx.CustomRender(Border._Painter, this.GetBackground(), this.GetBorderBrush(), this._Extents, this.GetBorderThickness(), this.GetCornerRadius());
    ctx.Restore();
};

Border.prototype._CanFindElement = function () {
    return this.GetBackground() != null || this.GetBorderBrush() != null;
};

Border.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Border) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property == Border.ChildProperty) {
        if (args.OldValue && args.OldValue instanceof UIElement) {
            this._ElementRemoved(args.OldValue);
            this._SetSubtreeObject(null);
            if (args.OldValue instanceof FrameworkElement) {
                args.OldValue._SetLogicalParent(null, error);
                if (error.IsErrored())
                    return;
            }
        }
        if (args.NewValue && args.NewValue instanceof UIElement) {
            this._SetSubtreeObject(args.NewValue);
            this._ElementAdded(args.NewValue);
            if (args.NewValue instanceof FrameworkElement) {
                var logicalParent = args.NewValue._GetLogicalParent();
                if (logicalParent && logicalParent !== this) {
                    error.SetErrored(BError.Argument, "Content is already a child of another element.");
                    return;
                }
                args.NewValue._SetLogicalParent(this, error);
                if (error.IsErrored())
                    return;
            }
        }
        this._UpdateBounds();
        this._InvalidateMeasure();
    } else if (args.Property == Border.PaddingProperty || args.Property == Border.BorderThicknessProperty) {
        this._InvalidateMeasure();
    } else if (args.Property == Border.BackgroundProperty) {
        this._Invalidate();
    } else if (args.Property == Border.BorderBrushProperty) {
        this._Invalidate();
    }

    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region ANNOTATIONS

Border.Annotations = {
    ContentProperty: Border.ChildProperty
};

//#endregion

Border._Painter = function (canvasCtx, backgroundBrush, borderBrush, boundingRect, thickness, cornerRadius, pathOnly) {
    var pathRect = boundingRect.GrowByThickness(thickness.Half().Negate());

    canvasCtx.beginPath();
    if (cornerRadius.IsZero()) {
        canvasCtx.rect(pathRect.X, pathRect.Y, pathRect.Width, pathRect.Height);
    } else {
        var left = pathRect.X;
        var top = pathRect.Y;
        var right = pathRect.X + pathRect.Width;
        var bottom = pathRect.Y + pathRect.Height;

        canvasCtx.moveTo(left + cornerRadius.TopLeft, top);
        //top edge
        canvasCtx.lineTo(right - cornerRadius.TopRight, top);
        //top right arc
        if (cornerRadius.TopRight > 0)
            canvasCtx.quadraticCurveTo(right, top, right, top + cornerRadius.TopRight);
        //right edge
        canvasCtx.lineTo(right, bottom - cornerRadius.BottomRight);
        //bottom right arc
        if (cornerRadius.BottomRight > 0)
            canvasCtx.quadraticCurveTo(right, bottom, right - cornerRadius.BottomRight, bottom);
        //bottom edge
        canvasCtx.lineTo(left + cornerRadius.BottomLeft, bottom);
        //bottom left arc
        if (cornerRadius.BottomLeft > 0)
            canvasCtx.quadraticCurveTo(left, bottom, left, bottom - cornerRadius.BottomLeft);
        //left edge
        canvasCtx.lineTo(left, top + cornerRadius.TopLeft);
        //top left arc
        if (cornerRadius.TopLeft > 0)
            canvasCtx.quadraticCurveTo(left, top, left + cornerRadius.TopLeft, top);
    }
    if (backgroundBrush) {
        canvasCtx.fillStyle = backgroundBrush._Translate(canvasCtx, pathRect);
        canvasCtx.fill();
    }
    if (borderBrush && !thickness.IsEmpty()) {
        canvasCtx.lineWidth = thickness;
        canvasCtx.strokeStyle = borderBrush._Translate(canvasCtx);
        canvasCtx.stroke();
    }
    canvasCtx.closePath();
};
Border._ThicknessValidator = function () {
};

//#endregion

/// <reference path="Panel.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />

//#region Canvas

function Canvas() {
    Panel.call(this);
}
Canvas.InheritFrom(Panel);

//#region DEPENDENCY PROPERTIES

Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", function () { return Number; }, Canvas, 0.0);
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};
Canvas.SetLeft = function (d, value) {
    d.SetValue(Canvas.LeftProperty, value);
};

Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", function () { return Number; }, Canvas, 0.0);
Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.SetTop = function (d, value) {
    d.SetValue(Canvas.TopProperty, value);
};

Canvas.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () { return Number; }, Canvas, 0);
Canvas.GetZIndex = function (d) {
    return d.GetValue(Canvas.ZIndexProperty);
};
Canvas.SetZIndex = function (d, value) {
    d.SetValue(Canvas.ZIndexProperty, value);
};

Canvas.ZProperty = DependencyProperty.RegisterAttached("Z", function () { return Number; }, Canvas, NaN);
Canvas.GetZ = function (d) {
    return d.GetValue(Canvas.ZProperty);
};
Canvas.SetZ = function (d, value) {
    d.SetValue(Canvas.ZProperty, value);
};

//#endregion

//#endregion

/// <reference path="FrameworkElement.js"/>
/// CODE
/// <reference path="ContentControl.js"/>
/// <reference path="Templates.js"/>

//#region ContentPresenter

function ContentPresenter() {
    FrameworkElement.call(this);
}
ContentPresenter.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, ContentPresenter);
ContentPresenter.prototype.GetContent = function () {
    return this.GetValue(ContentPresenter.ContentProperty);
};
ContentPresenter.prototype.SetContent = function (value) {
    this.SetValue(ContentPresenter.ContentProperty, value);
};

ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentPresenter);
ContentPresenter.prototype.GetContentTemplate = function () {
    return this.GetValue(ContentPresenter.ContentTemplateProperty);
};
ContentPresenter.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentPresenter.ContentTemplateProperty, value);
};

//#endregion

//#region INSTANCE METHODS

ContentPresenter.prototype._GetDefaultTemplate = function () {
    var templateOwner = this._GetTemplateOwner();
    if (templateOwner) {
        if (this._ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
            this.SetValue(ContentPresenter.ContentProperty, 
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this._ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
            this.SetValue(ContentPresenter.ContentTemplateProperty, 
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
        }
    }

    var template = this.GetContentTemplate();
    if (template != null) {
        this._ContentRoot = RefObject.As(template.GetVisualTree(this), UIElement);
    } else {
        var content = this.GetContent();
        this._ContentRoot = RefObject.As(content, UIElement);
        if (!this._ContentRoot == null && content != null)
            this._ContentRoot = this._GetFallbackRoot();
    }
    return this._ContentRoot;
};
ContentPresenter.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentPresenter) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property === ContentPresenter.ContentProperty) {
        if ((args.NewValue && args.NewValue instanceof UIElement)
            || (args.OldValue && args.OldValue instanceof UIElement)) {
            this._ClearRoot();
        }
        if (args.NewValue && !(args.NewValue instanceof UIElement))
            this.SetValue(FrameworkElement.DataContextProperty, args.NewValue);
        else
            this.ClearValue(FrameworkElement.DataContextProperty);
        this._InvalidateMeasure();
    } else if (args.Property === ContentPresenter.ContentTemplateProperty) {
        this._ClearRoot();
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};
ContentPresenter.prototype._ClearRoot = function () {
    //TODO: Raise ContentPresenter.ClearRootEvent
};
ContentPresenter.prototype._GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region ANNOTATIONS

ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};

//#endregion

//#endregion

/// <reference path="FrameworkElement.js" />
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// <reference path="Templates.js"/>

//#region Control

function Control() {
    FrameworkElement.call(this);

    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
}
Control.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

Control.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Control);
Control.prototype.GetBackground = function () {
    return this.GetValue(Control.BackgroundProperty);
};
Control.prototype.SetBackground = function (value) {
    this.SetValue(Control.BackgroundProperty, value);
};

Control.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Control);
Control.prototype.GetBorderBrush = function () {
    return this.GetValue(Control.BorderBrushProperty);
};
Control.prototype.SetBorderBrush = function (value) {
    this.SetValue(Control.BorderBrushProperty, value);
};

Control.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, Control, new Thickness());
Control.prototype.GetBorderThickness = function () {
    return this.GetValue(Control.BorderThicknessProperty);
};
Control.prototype.SetBorderThickness = function (value) {
    this.SetValue(Control.BorderThicknessProperty, value);
};

Control.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, Control, Font.DEFAULT_FAMILY);
Control.prototype.GetFontFamily = function () {
    return this.GetValue(Control.FontFamilyProperty);
};
Control.prototype.SetFontFamily = function (value) {
    this.SetValue(Control.FontFamilyProperty, value);
};

Control.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, Control, Font.DEFAULT_SIZE);
Control.prototype.GetFontSize = function () {
    return this.GetValue(Control.FontSizeProperty);
};
Control.prototype.SetFontSize = function (value) {
    this.SetValue(Control.FontSizeProperty, value);
};

Control.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, Control, Font.DEFAULT_STRETCH);
Control.prototype.GetFontStretch = function () {
    return this.GetValue(Control.FontStretchProperty);
};
Control.prototype.SetFontStretch = function (value) {
    this.SetValue(Control.FontStretchProperty, value);
};

Control.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, Control, Font.DEFAULT_STYLE);
Control.prototype.GetFontStyle = function () {
    return this.GetValue(Control.FontStyleProperty);
};
Control.prototype.SetFontStyle = function (value) {
    this.SetValue(Control.FontStyleProperty, value);
};

Control.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, Control, Font.DEFAULT_WEIGHT);
Control.prototype.GetFontWeight = function () {
    return this.GetValue(Control.FontWeightProperty);
};
Control.prototype.SetFontWeight = function (value) {
    this.SetValue(Control.FontWeightProperty, value);
};

Control.ForegroundProperty = DependencyProperty.Register("Foreground", function () { return Brush; }, Control);
Control.prototype.GetForeground = function () {
    return this.GetValue(Control.ForegroundProperty);
};
Control.prototype.SetForeground = function (value) {
    this.SetValue(Control.ForegroundProperty, value);
};

Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", function () { return Number; }, Control, HorizontalAlignment.Center);
Control.prototype.GetHorizontalContentAlignment = function () {
    return this.GetValue(Control.HorizontalContentAlignmentProperty);
};
Control.prototype.SetHorizontalContentAlignment = function (value) {
    this.SetValue(Control.HorizontalContentAlignmentProperty, value);
};

Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", function () { return Boolean; }, Control, true, function (d, args, error) { d.OnIsEnabledChanged(args); });
Control.prototype.GetIsEnabled = function () {
    return this.GetValue(Control.IsEnabledProperty);
};
Control.prototype.SetIsEnabled = function (value) {
    this.SetValue(Control.IsEnabledProperty, value);
};

Control.IsTabStopProperty = DependencyProperty.Register("IsTabStop", function () { return Boolean; }, Control, true);
Control.prototype.GetIsTabStop = function () {
    return this.GetValue(Control.IsTabStopProperty);
};
Control.prototype.SetIsTabStop = function (value) {
    this.SetValue(Control.IsTabStopProperty, value);
};

Control.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, Control, new Thickness());
Control.prototype.GetPadding = function () {
    return this.GetValue(Control.PaddingProperty);
};
Control.prototype.SetPadding = function (value) {
    this.SetValue(Control.PaddingProperty, value);
};

Control.TabIndexProperty = DependencyProperty.Register("TabIndex", function () { return Number; }, Control, Number.MAX_VALUE);
Control.prototype.GetTabIndex = function () {
    return this.GetValue(Control.TabIndexProperty);
};
Control.prototype.SetTabIndex = function (value) {
    this.SetValue(Control.TabIndexProperty, value);
};

Control.TabNavigationProperty = DependencyProperty.Register("TabNavigation", function () { return Number; }, Control);
Control.prototype.GetTabNavigation = function () {
    return this.GetValue(Control.TabNavigationProperty);
};
Control.prototype.SetTabNavigation = function (value) {
    this.SetValue(Control.TabNavigationProperty, value);
};

Control.TemplateProperty = DependencyProperty.Register("Template", function () { return ControlTemplate; }, Control);
Control.prototype.GetTemplate = function () {
    return this.GetValue(Control.TemplateProperty);
};
Control.prototype.SetTemplate = function (value) {
    this.SetValue(Control.TemplateProperty, value);
};

Control.VerticalContentAlignmentProperty = DependencyProperty.Register("VerticalContentAlignment", function () { return Number; }, Control, VerticalAlignment.Center);
Control.prototype.GetVerticalContentAlignment = function () {
    return this.GetValue(Control.VerticalContentAlignmentProperty);
};
Control.prototype.SetVerticalContentAlignment = function (value) {
    this.SetValue(Control.VerticalContentAlignmentProperty, value);
};

Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () { return Function; }, Control);
Control.prototype.GetDefaultStyleKey = function () {
    return this.GetValue(Control.DefaultStyleKeyProperty);
};
Control.prototype.SetDefaultStyleKey = function (value) {
    this.SetValue(Control.DefaultStyleKeyProperty, value);
};

Control.IsTemplateItemProperty = DependencyProperty.RegisterAttached("IsTemplateItem", function () { return Boolean; }, Control, false);
Control.GetIsTemplateItem = function (d) {
    return d.GetValue(Control.IsTemplateItemProperty);
};
Control.SetIsTemplateItem = function (d, value) {
    d.SetValue(Control.IsTemplateItemProperty, value);
};

//#endregion

//#region INSTANCE METHODS

Control.prototype.GetDefaultStyle = function () {
    return null;
};
Control.prototype.GetTemplateChild = function (name) {
    if (this._TemplateRoot)
        return this._TemplateRoot.FindName(name);
    return null;
};
Control.prototype.SetVisualParent = function (visualParent) {
    if (this.GetVisualParent() != visualParent) {
        FrameworkElement.prototype.SetVisualParent.call(this, visualParent);
        this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
    }
};

Control.prototype._ElementAdded = function (item) {
    var error;
    item._AddParent(this, error);
    this._SetSubtreeObject(item);
    FrameworkElement.prototype._ElementAdded.call(this, item);
};
Control.prototype._ElementRemoved = function (item) {
    var error;
    if (this._TemplateRoot) {
        this._TemplateRoot._RemoveParent(this, error);
        this._TemplateRoot = null;
    }
    item._RemoveParent(this, error);
    FrameworkElement.prototype._ElementRemoved.call(this, item);
};

Control.prototype.CanCaptureMouse = function () {
    return this.GetIsEnabled();
};

Control.prototype._CanFindElement = function () {
    return this.GetIsEnabled();
};
Control.prototype._InsideObject = function (x, y) {
    return false;
};
Control.prototype._HitTestPoint = function (ctx, p, uielist) {
    if (this.GetIsEnabled())
        FrameworkElement.prototype._HitTestPoint.call(this, ctx, p, uielist);
};

Control.prototype._UpdateIsEnabledSource = function (control) {
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(control);
};

Control.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Control) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == Control.TemplateProperty) {
    } else if (args.Property == Control.PaddingProperty
        || args.Property == Control.BorderThicknessProperty) {
        this._InvalidateMeasure();
    } else if (args.Property == Control.IsEnabledProperty) {
        if (!args.NewValue) {
            //TODO: Remove element from focus
            //TODO: Release Mouse Capture
        }
        //TODO: IsEnabledChanged Event
    } else if (args.Property == Control.HorizontalContentAlignmentProperty
        || args.Property == Control.VerticalContentAlignmentProperty) {
        this._InvalidateArrange();
    }
    this.PropertyChanged.Raise(this, args);
};
Control.prototype._OnLogicalParentChanged = function (oldParent, newParent) {
    FrameworkElement.prototype._OnLogicalParentChanged.call(this, oldParent, newParent);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(newParent);
};
Control.prototype._OnIsAttachedChanged = function (value) {
    FrameworkElement.prototype._OnIsAttachedChanged.call(this, value);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
};

Control.prototype._DoApplyTemplateWithError = function (error) {
    var t = this.GetTemplate();
    if (!t)
        return FrameworkElement.prototype._DoApplyTemplateWithError.call(this, error);

    var root = t._GetVisualTreeWithError(this, error);
    if (root && !(root instanceof UIElement)) {
        Warn("Root element in template was not a UIElement.");
        root = null;
    }

    if (!root)
        return FrameworkElement.prototype._DoApplyTemplateWithError.call(this, error);

    if (this._TemplateRoot != root && this._TemplateRoot != null) {
        this._TemplateRoot._RemoveParent(this, null);
        this._TemplateRoot = null;
    }

    this._TemplateRoot = root;

    this._ElementAdded(this._TemplateRoot);

    if (this._IsLoaded) {
        //Deployment Loaded Event (Async)
    }

    return true;
};

//#endregion

//#region FOCUS

Control.prototype.Focus = function (recurse) {
    recurse = recurse === undefined || recurse === true;
    if (!this._IsAttached)
        return false;

    var surface = App.Instance.MainSurface;
    var walker = new _DeepTreeWalker(this);
    var uie;
    while (uie = walker.Step()) {
        if (uie.GetVisibility() !== Visibility.Visible) {
            walker.SkipBranch();
            continue;
        }

        var c;
        if (uie instanceof Control)
            c = uie;
        if (c == null)
            continue;

        if (!c.GetIsEnabled()) {
            if (!recurse)
                return false;
            walker.SkipBranch();
            continue;
        }

        var loaded = false;
        for (var check = this; !loaded && check != null; check = check.GetVisualParent())
            loaded = loaded || check._IsLoaded;

        if (loaded && c._GetRenderVisible() && c.GetIsTabStop())
            return surface._FocusElement(c);

        if (!recurse)
            return false;
    }
    return false;
};

//#endregion

Control.prototype.OnIsEnabledChanged = function (args) {
}

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="Panel.js"/>
/// <reference path="DependencyObjectCollection.js"/>
/// <reference path="List.js"/>

var GridUnitType = {
    Auto: 0,
    Pixel: 1,
    Star: 2
};

//#region Grid

function Grid() {
    Panel.call(this);
    this._RowMatrix = null;
    this._ColMatrix = null;
}
Grid.InheritFrom(Panel);

//#region ATTACHED DEPENDENCY PROPERTIES

Grid.ColumnProperty = DependencyProperty.RegisterAttached("Column", function () { return Number; }, Grid, 0);
Grid.GetColumn = function (d) {
    return d.GetValue(Grid.ColumnProperty);
};
Grid.SetColumn = function (d, value) {
    d.SetValue(Grid.ColumnProperty, value);
};

Grid.ColumnSpanProperty = DependencyProperty.RegisterAttached("ColumnSpan", function () { return Number; }, Grid, 1);
Grid.GetColumnSpan = function (d) {
    return d.GetValue(Grid.ColumnSpanProperty);
};
Grid.SetColumnSpan = function (d, value) {
    d.SetValue(Grid.ColumnSpanProperty, value);
};

Grid.RowProperty = DependencyProperty.RegisterAttached("Row", function () { return Number; }, Grid, 0);
Grid.GetRow = function (d) {
    return d.GetValue(Grid.RowProperty);
};
Grid.SetRow = function (d, value) {
    d.SetValue(Grid.RowProperty, value);
};

Grid.RowSpanProperty = DependencyProperty.RegisterAttached("RowSpan", function () { return Number; }, Grid, 1);
Grid.GetRowSpan = function (d) {
    return d.GetValue(Grid.RowSpanProperty);
};
Grid.SetRowSpan = function (d, value) {
    d.SetValue(Grid.RowSpanProperty, value);
};

//#endregion

//#region DEPENDENCY PROPERTIES

Grid.ShowGridLinesProperty = DependencyProperty.Register("ShowGridLines", function () { return Boolean; }, Grid, false);
Grid.prototype.GetShowGridLines = function () {
    return this.GetValue(Grid.ShowGridLinesProperty);
};
Grid.prototype.SetShowGridLines = function (value) {
    this.SetValue(Grid.ShowGridLinesProperty, value);
};

Grid.ColumnDefinitionsProperty = DependencyProperty.RegisterFull("ColumnDefinitions", function () { return ColumnDefinitionCollection; }, Grid, null, { GetValue: function () { return new ColumnDefinitionCollection(); } });
Grid.prototype.GetColumnDefinitions = function () {
    return this.GetValue(Grid.ColumnDefinitionsProperty);
};

Grid.RowDefinitionsProperty = DependencyProperty.RegisterFull("RowDefinitions", function () { return RowDefinitionCollection; }, Grid, null, { GetValue: function () { return new RowDefinitionCollection(); } });
Grid.prototype.GetRowDefinitions = function () {
    return this.GetValue(Grid.RowDefinitionsProperty);
};

//#endregion

//#region INSTANCE METHODS

Grid.prototype._MeasureOverrideWithError = function (availableSize, error) {
    Info("Grid._MeasureOverrideWithError [" + this._TypeName + "]");
    var totalSize = availableSize;
    var cols = this._GetColumnDefinitionsNoAutoCreate();
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var colCount = cols ? cols.GetCount() : 0;
    var rowCount = rows ? rows.GetCount() : 0;
    var totalStars = new Size(0, 0);
    var emptyRows = rowCount == 0;
    var emptyCols = colCount == 0;
    var hasChildren = this.GetChildren().GetCount() > 0;

    if (emptyRows) rowCount = 1;
    if (emptyCols) colCount = 1;

    this._CreateMatrices(rowCount, colCount);

    var i;
    var cell;
    if (emptyRows) {
        cell = new _Segment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
        cell._Stars = 1.0;
        this._RowMatrix[0][0] = cell;
        totalStars.Height += 1.0;
    } else {
        for (i = 0; i < rowCount; i++) {
            var rowdef = rows.GetValueAt(i);
            var height = rowdef.GetHeight();

            rowdef.SetActualHeight(Number.POSITIVE_INFINITY);
            cell = new _Segment(0.0, rowdef.GetMinHeight(), rowdef.GetMaxHeight(), height.Type);

            if (height.Type == GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(height.Value);
                rowdef.SetActualHeight(cell._SetDesiredToOffered());
            } else if (height.Type == GridUnitType.Star) {
                cell._Stars = height.Value;
                totalStars.Height += height.Value;
            } else if (height.Type == GridUnitType.Auto) {
                cell._OfferedSize = cell._Clamp(0);
                cell._SetDesiredToOffered();
            }

            this._RowMatrix[i][i] = cell;
        }
    }

    if (emptyCols) {
        cell = new _Segment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
        cell._Stars = 1.0;
        this._ColMatrix[0][0] = cell;
        totalStars.Width += 1.0;
    } else {
        for (i = 0; i < colCount; i++) {
            var coldef = cols.GetValueAt(i);
            var width = coldef.GetWidth();

            coldef.SetActualWidth(Number.POSITIVE_INFINITY);
            cell = new _Segment(0.0, coldef.GetMinWidth(), coldef.GetMaxWidth(), width.Type);

            if (width.Type == GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(width.Value);
                coldef.SetActualWidth(cell._SetDesiredToOffered());
            } else if (width.Type == GridUnitType.Star) {
                cell._Stars = width.Value;
                totalStars.Width += width.Value;
            } else if (width.Type == GridUnitType.Auto) {
                cell._OfferedSize = cell._Clamp(0);
                cell._SetDesiredToOffered();
            }

            this._ColMatrix[i][i] = cell;
        }
    }

    var sizes = new List();
    var separator = new _GridNode(null, 0, 0, 0);
    sizes.Append(separator);

    var c;
    var r;
    var node;
    var gridWalker = new _GridWalker(this, this._RowMatrix, this._RowMatrixDim, this._ColMatrix, this._ColMatrixDim);
    for (i = 0; i < 6; i++) {
        var autoAuto = i == 0;
        var starAuto = i == 1;
        var autoStar = i == 2;
        var starAutoAgain = i == 3;
        var nonStar = i == 4;
        var remainingStar = i == 5;

        if (hasChildren) {
            this._ExpandStarCols(totalSize);
            this._ExpandStarRows(totalSize);
        }

        var walker = new _VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childSize = new Size(0, 0);
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;

            var col = Math.min(Grid.GetColumn(child), colCount - 1);
            var row = Math.min(Grid.GetRow(child), rowCount - 1);
            var colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
            var rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

            for (r = 0; r < row + rowspan; r++) {
                starRow = starRow || (this._RowMatrix[r][r]._Type == GridUnitType.Star);
                autoRow = autoRow || (this._RowMatrix[r][r]._Type == GridUnitType.Auto);
            }
            for (c = 0; c < col + colspan; c++) {
                starCol = starCol || (this._ColMatrix[c][c]._Type == GridUnitType.Star);
                autoCol = autoCol || (this._ColMatrix[c][c]._Type == GridUnitType.Auto);
            }

            if (autoRow && autoCol && !starRow && !starCol) {
                if (!autoAuto)
                    continue;
                childSize.Width = Number.POSITIVE_INFINITY;
                childSize.Height = Number.POSITIVE_INFINITY;
            } else if (starRow && autoCol && !starCol) {
                if (!(starAuto || starAutoAgain))
                    continue;
                if (starAuto && gridWalker._HasAutoStar)
                    childSize.Height = Number.POSITIVE_INFINITY;
                childSize.Width = Number.POSITIVE_INFINITY;
            } else if (autoRow && starCol && !starRow) {
                if (!autoStar)
                    continue;
                childSize.Height = Number.POSITIVE_INFINITY;
            } else if ((autoRow || autoCol) && !(starRow || starCol)) {
                if (!nonStar)
                    continue;
                if (autoRow)
                    childSize.Height = Number.POSITIVE_INFINITY;
                if (autoCol)
                    childSize.Width = Number.POSITIVE_INFINITY;
            } else if (!(starRow || starCol)) {
                if (!nonStar)
                    continue;
            } else {
                if (!remainingStar)
                    continue;
            }

            for (r = row; r < row + rowspan; r++) {
                childSize.Height += this._RowMatrix[r][r]._OfferedSize;
            }
            for (c = col; c < col + colspan; c++) {
                childSize.Width += this._ColMatrix[c][c]._OfferedSize;
            }

            child._MeasureWithError(childSize, error);
            var desired = child._DesiredSize;

            if (!starAuto) {
                node = new _GridNode(this._RowMatrix, row + rowspan - 1, row, desired.Height);
                sizes.InsertBefore(node, node._Row == node._Col ? separator.Next : separator);
            }
            node = new _GridNode(this._ColMatrix, col + colspan - 1, col, desired.Width);
            sizes.InsertBefore(node, node._Row == node._Col ? separator.Next : separator);
        }

        sizes.Remove(separator);

        while (node = sizes.Last()) {
            node._Cell._DesiredSize = Math.max(node._Cell._DesiredSize, node._Size);
            this._AllocateDesiredSize(rowCount, colCount);
            sizes.Remove(node);
        }
        sizes.Append(separator);
    }

    this._SaveMeasureResults();

    sizes.Remove(separator);

    var gridSize = new Size(0, 0);
    for (c = 0; c < colCount; c++) {
        gridSize.Width += this._ColMatrix[c][c]._DesiredSize;
    }
    for (r = 0; r < rowCount; r++) {
        gridSize.Height += this._RowMatrix[r][r]._DesiredSize;
    }
    return gridSize;
};
Grid.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    Info("Grid._ArrangeOverrideWithError [" + this._TypeName + "]");
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var rows = this._GetRowDefinitionsNoAutoCreate();

    var colCount = columns ? columns.GetCount() : 0;
    var rowCount = rows ? rows.GetCount() : 0;

    this._RestoreMeasureResults();

    var c;
    var r;

    var totalConsumed = new Size(0, 0);
    for (c = 0; c < this._ColMatrixDim; c++) {
        totalConsumed.Width += this._ColMatrix[c][c]._SetOfferedToDesired();
    }
    for (r = 0; r < this._RowMatrixDim; r++) {
        totalConsumed.Height += this._RowMatrix[r][r]._SetOfferedToDesired();
    }

    if (totalConsumed.Width != finalSize.Width)
        this._ExpandStarCols(finalSize);
    if (totalConsumed.Height != finalSize.Height)
        this._ExpandStarRows(finalSize);

    for (c = 0; c < colCount; c++) {
        columns.GetValueAt(c).SetActualWidth(this._ColMatrix[c][c]._OfferedSize);
    }
    for (r = 0; r < rowCount; r++) {
        rows.GetValueAt(r).SetActualHeight(this._RowMatrix[r][r]._OfferedSize);
    }

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var col = Math.min(Grid.GetColumn(child), this._ColMatrixDim - 1);
        var row = Math.min(Grid.GetRow(child), this._RowMatrixDim - 1);
        var colspan = Math.min(Grid.GetColumnSpan(child), this._ColMatrixDim - col);
        var rowspan = Math.min(Grid.GetRowSpan(child), this._RowMatrixDim - row);

        var childFinal = new Rect(0, 0, 0, 0);
        for (c = 0; c < col; c++) {
            childFinal.X += this._ColMatrix[c][c]._OfferedSize;
        }
        for (c = col; c < col + colspan; c++) {
            childFinal.Width += this._ColMatrix[c][c]._OfferedSize;
        }

        for (r = 0; r < row; r++) {
            childFinal.Y += this._RowMatrix[r][r]._OfferedSize;
        }
        for (r = row; r < row + rowspan; r++) {
            childFinal.Height += this._RowMatrix[r][r]._OfferedSize;
        }
        child._ArrangeWithError(childFinal, error);
    }

    return finalSize;
};

Grid.prototype._ExpandStarRows = function (availableSize) {
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var rowsCount = rows ? rows.GetCount() : 0;

    for (var i = 0; i < this._RowMatrixDim; i++) {
        if (this._RowMatrix[i][i]._Type == GridUnitType.Star)
            this._RowMatrix[i][i]._OfferedSize = 0;
        else
            availableSize.Height = Math.max(availableSize.Height - this._RowMatrix[i][i]._OfferedSize, 0);
    }
    availableSize.Height = this._AssignSize(this._RowMatrix, 0, this._RowMatrixDim - 1, availableSize.Height, GridUnitType.Star, false);
    if (rowsCount > 0) {
        for (var j = 0; j < this._RowMatrixDim; j++) {
            if (this._RowMatrix[j][j]._Type == GridUnitType.Star)
                rows.GetValueAt(j).SetActualHeight(this._RowMatrix[j][j]._OfferedSize);
        }
    }
};
Grid.prototype._ExpandStarCols = function (availableSize) {
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var columnsCount = columns ? columns.GetCount() : 0;

    for (var i = 0; i < this._ColMatrixDim; i++) {
        if (this._ColMatrix[i][i]._Type == GridUnitType.Star)
            this._ColMatrix[i][i]._OfferedSize = 0;
        else
            availableSize.Width = Math.max(availableSize.Width - this._ColMatrix[i][i]._OfferedSize, 0);
    }
    availableSize.Width = this._AssignSize(this._ColMatrix, 0, this._ColMatrixDim - 1, availableSize.Width, GridUnitType.Star, false);
    if (columnsCount > 0) {
        for (var j = 0; j < this._ColMatrixDim; j++) {
            if (this._ColMatrix[j][j]._Type == GridUnitType.Star) {
                columns.GetValueAt(j).SetActualWidth(this._ColMatrix[j][j]._OfferedSize);
            }
        }
    }
};
Grid.prototype._AllocateDesiredSize = function (rowCount, colCount) {
    for (var i = 0; i < 2; i++) {
        var matrix = i == 0 ? this._RowMatrix : this._ColMatrix;
        var count = i == 0 ? rowCount : colCount;

        for (var row = count - 1; row >= 0; row--) {
            for (var col = row; col >= 0; col--) {
                var spansStar = false;
                for (var j = row; j >= col; j--) {
                    spansStar = spansStar || (matrix[j][j]._Type == GridUnitType.Star);
                }
                var current = matrix[row][col]._DesiredSize;
                var totalAllocated = 0;
                for (var a = row; a >= col; a--) {
                    totalAllocated += matrix[a][a]._DesiredSize;
                }
                if (totalAllocated < current) {
                    var additional = current - totalAllocated;
                    if (spansStar) {
                        additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Star, true);
                    } else {
                        additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Pixel, true);
                        additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Auto, true);
                    }
                }
            }
        }
    }
    for (var r = 0; r < this._RowMatrixDim; r++) {
        this._RowMatrix[r][r]._OfferedSize = this._RowMatrix[r][r]._DesiredSize;
    }
    for (var c = 0; c < this._ColMatrixDim; c++) {
        this._ColMatrix[c][c]._OfferedSize = this._ColMatrix[c][c]._DesiredSize;
    }
};
Grid.prototype._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
    var count = 0;
    var assigned;
    var segmentSize;
    var i;
    var cur;
    for (i = start; i <= end; i++) {
        cur = matrix[i][i];
        segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
        if (segmentSize < matrix[i][i]._Max)
            count += (unitType == GridUnitType.Star) ? cur._Stars : 1;
    }
    do {
        assigned = false;
        var contribution = size / count;
        for (i = start; i <= end; i++) {
            cur = matrix[i][i];
            segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
            if (!(matrix[i][i]._Type == unitType && segmentSize < cur._Max))
                continue;
            var newSize = segmentSize;
            newSize += contribution * (unitType == GridUnitType.Star ? cur._Stars : 1);
            newSize = Math.min(newSize, cur._Max);
            assigned = assigned || (newSize > segmentSize);
            size -= newSize - segmentSize;
            if (desiredSize)
                cur._DesiredSize = newSize;
            else
                cur._OfferedSize = newSize;
        }
    } while (assigned);
    return size;
};

Grid.prototype._CreateMatrices = function (rowCount, colCount) {
    if (this._RowMatrix == null || this._ColMatrix == null || this._RowMatrixDim != rowCount || this._ColMatrixDim != colCount) {
        this._DestroyMatrices();

        this._RowMatrixDim = rowCount;
        this._RowMatrix = new Array();
        for (var i = 0; i < rowCount; i++) {
            this._RowMatrix.push(new Array());
        }

        this._ColMatrixDim = colCount;
        this._ColMatrix = new Array();
        for (var j = 0; j < colCount; j++) {
            this._ColMatrix.push(new Array());
        }
    }

    for (var r = 0; r < rowCount; r++) {
        for (var rr = 0; rr <= r; rr++) {
            this._RowMatrix[r].push(new _Segment());
        }
    }

    for (var c = 0; c < colCount; c++) {
        for (var cc = 0; cc <= c; cc++) {
            this._ColMatrix[c].push(new _Segment());
        }
    }
};
Grid.prototype._DestroyMatrices = function () {
    this._RowMatrix = null;
    this._ColMatrix = null;
};
Grid.prototype._SaveMeasureResults = function () {
    var i;
    var j;
    for (i = 0; i < this._RowMatrixDim; i++) {
        for (j = 0; j <= i; j++) {
            this._RowMatrix[i][j]._OriginalSize = this._RowMatrix[i][j]._OfferedSize;
        }
    }

    for (i = 0; i < this._ColMatrixDim; i++) {
        for (j = 0; j <= i; j++) {
            this._ColMatrix[i][j]._OriginalSize = this._ColMatrix[i][j]._OfferedSize;
        }
    }
};
Grid.prototype._RestoreMeasureResults = function () {
    var i;
    var j;
    for (i = 0; i < this._RowMatrixDim; i++) {
        for (j = 0; j <= i; j++) {
            this._RowMatrix[i][j]._OfferedSize = this._RowMatrix[i][j]._OriginalSize;
        }
    }

    for (i = 0; i < this._ColMatrixDim; i++) {
        for (j = 0; j <= i; j++) {
            this._ColMatrix[i][j]._OfferedSize = this._ColMatrix[i][j]._OriginalSize;
        }
    }
};

Grid.prototype._ComputeBounds = function () {
    Panel.prototype._ComputeBounds.call(this);

    if (this.GetShowGridLines()) {
        this._Extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
        this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/* .GrowByThickness(this._EffectPadding) */, false); //.Transform(this._AbsoluteTransform);
        this._BoundsWithChildren = this._BoundsWithChildren.Union(this._Bounds);

        this._ComputeGlobalBounds();
        this._ComputeSurfaceBounds();
    }
};

Grid.prototype._GetRowDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.RowDefinitionsProperty);
    return value == undefined ? null : value;
}
Grid.prototype._GetColumnDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.ColumnDefinitionsProperty);
    return value == undefined ? null : value;
}

Grid.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Grid) {
        Panel.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == Grid.ShowGridLinesProperty) {
        this._Invalidate();
    }
    this._InvalidateMeasure();
    this.PropertyChange.Raise(this, args);
};
Grid.prototype._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Grid.ColumnDefinitionsProperty, sender)
        || this._PropertyHasValueNoAutoCreate(Grid.RowDefinitionsProperty, sender)) {
        this._InvalidateMeasure();
    } else {
        Panel.prototype._OnCollectionChanged.call(this, sender, args);
    }
};
Grid.prototype._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property == Grid.ColumnProperty
            || args.Property == Grid.RowProperty
            || args.Property == Grid.ColumnSpanProperty
            || args.Property == Grid.RowSpanProperty) {
            this._InvalidateMeasure();
            args.Item._InvalidateMeasure();
            return;
        }
    } else if (sender == this._GetColumnDefinitionsNoAutoCreate()
        || sender == this._GetRowDefinitionsNoAutoCreate()) {
        if (args.Property != ColumnDefinition.ActualWidthProperty
            && args.Property != RowDefinition.ActualHeightProperty) {
            this._InvalidateMeasure();
        }
        return;
    }
    Panel.prototype._OnCollectionChanged.call(this, sender, args);
};

//#endregion

//#endregion

//#region GridLength

function GridLength(value, type) {
    RefObject.call(this);
    this.Value = value == null ? 0 : value;
    this.Type = type == null ? GridUnitType.Auto : type;
}
GridLength.InheritFrom(RefObject);

GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};

//#endregion

//#region RowDefinition

function RowDefinition() {
    DependencyObject.call(this);
}
RowDefinition.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

RowDefinition.HeightProperty = DependencyProperty.Register("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.prototype.GetHeight = function () {
    return this.GetValue(RowDefinition.HeightProperty);
};
RowDefinition.prototype.SetHeight = function (value) {
    this.SetValue(RowDefinition.HeightProperty, value);
};

RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.prototype.GetMaxHeight = function () {
    return this.GetValue(RowDefinition.MaxHeightProperty);
};
RowDefinition.prototype.SetMaxHeight = function (value) {
    this.SetValue(RowDefinition.MaxHeightProperty, value);
};

RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.prototype.GetMinHeight = function () {
    return this.GetValue(RowDefinition.MinHeightProperty);
};
RowDefinition.prototype.SetMinHeight = function (value) {
    this.SetValue(RowDefinition.MinHeightProperty, value);
};

RowDefinition.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.prototype.GetActualHeight = function () {
    return this.GetValue(RowDefinition.ActualHeightProperty);
};
RowDefinition.prototype.SetActualHeight = function (value) {
    this.SetValue(RowDefinition.ActualHeightProperty, value);
};

//#endregion

//#endregion

//#region RowDefinitionCollection

function RowDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
RowDefinitionCollection.InheritFrom(DependencyObjectCollection);

RowDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};

//#endregion

//#region ColumnDefinition

function ColumnDefinition() {
    DependencyObject.call(this);
}
ColumnDefinition.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.prototype.GetWidth = function () {
    return this.GetValue(ColumnDefinition.WidthProperty);
};
ColumnDefinition.prototype.SetWidth = function (value) {
    this.SetValue(ColumnDefinition.WidthProperty, value);
};

ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.prototype.GetMaxWidth = function () {
    return this.GetValue(ColumnDefinition.MaxWidthProperty);
};
ColumnDefinition.prototype.SetMaxWidth = function (value) {
    this.SetValue(ColumnDefinition.MaxWidthProperty, value);
};

ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetMinWidth = function () {
    return this.GetValue(ColumnDefinition.MinWidthProperty);
};
ColumnDefinition.prototype.SetMinWidth = function (value) {
    this.SetValue(ColumnDefinition.MinWidthProperty, value);
};

ColumnDefinition.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetActualWidth = function () {
    return this.GetValue(ColumnDefinition.ActualWidthProperty);
};
ColumnDefinition.prototype.SetActualWidth = function (value) {
    this.SetValue(ColumnDefinition.ActualWidthProperty, value);
};

//#endregion

//#endregion

//#region ColumnDefinitionCollection

function ColumnDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
ColumnDefinitionCollection.InheritFrom(DependencyObjectCollection);

ColumnDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};

//#endregion

//#region _Segment

function _Segment(offered, min, max, unitType) {
    RefObject.call(this);
    this._DesiredSize = offered == null ? 0 : offered;
    this._Min = min == null ? 0.0 : min;
    this._Max = max == null ? Number.POSITIVE_INFINITY : max;
    this._Stars = 0;
    this._Type = unitType == null ? GridUnitType.Pixel : unitType;

    this._OfferedSize = this._Clamp(offered);
    this._OriginalSize = this._OfferedSize;
}
_Segment.InheritFrom(RefObject);

_Segment.prototype._SetOfferedToDesired = function () {
    this._OfferedSize = this._DesiredSize;
    return this._OfferedSize;
};
_Segment.prototype._SetDesiredToOffered = function () {
    this._DesiredSize = this._OfferedSize;
    return this._DesiredSize;
};
_Segment.prototype._Clamp = function (value) {
    if (value < this._Min)
        return this._Min;
    if (value > this._Max)
        return this._Max;
    return value;
}

//#endregion

//#region _GridNode

function _GridNode(matrix, row, col, size) {
    Node.call(this);
    this._Matrix = matrix;
    this._Row = row;
    this._Col = col;
    this._Size = size;
    this._Cell = this._Matrix == null ? null : this._Matrix[row][col];
}
_GridNode.InheritFrom(Node);

//#endregion

//#region _GridWalker

function _GridWalker(grid, rowMatrix, rowCount, colMatrix, colCount) {
    RefObject.call(this);
    this._HasAutoAuto = false;
    this._HasStarAuto = false;
    this._HasAutoStar = false;

    var walker = new _VisualTreeWalker(grid, _VisualTreeWalkerDirection.Logical);
    var child;
    while (child = walker.Step()) {
        var starCol = false;
        var starRow = false;
        var autoCol = false;
        var autoRow = false;

        var col = Math.min(Grid.GetColumn(child), colCount - 1);
        var row = Math.min(Grid.GetRow(child), rowCount - 1);
        var colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
        var rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

        for (var r = row; r < row + rowspan; r++) {
            starRow = starRow || (rowMatrix[r][r].Type == GridUnitType.Star);
            autoRow = autoRow || (rowMatrix[r][r].Type == GridUnitType.Auto);
        }
        for (var c = col; c < col + colspan; c++) {
            starCol = starCol || (colMatrix[c][c].Type == GridUnitType.Star);
            starRow = starRow || (colMatrix[c][c].Type == GridUnitType.Auto);
        }

        this._HasAutoAuto = this._HasAutoAuto || (autoRow && autoCol && !starRow && !starCol);
        this._HasStarAuto = this._HasStarAuto || (starRow && autoCol);
        this._HasAutoStar = this._HasAutoStar || (autoRow && starCol);
    }
}
_GridWalker.InheritFrom(RefObject);

//#endregion

/// <reference path="Control.js"/>

var ItemCollection = {};//TODO: Implement

//#region ItemsControl

function ItemsControl() {
    Control.call(this);
}
ItemsControl.InheritFrom(Control);

//#region DEPENDENCY PROPERTIES

ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl);
ItemsControl.prototype.GetItems = function () {
    return this.GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.prototype.SetItems = function (value) {
    this.SetValue(ItemsControl.ItemsProperty, value);
};

//#endregion

//#region ANNOTATIONS

ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};

//#endregion

//#endregion

/// <reference path="RefObject.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// <reference path="Control.js"/>
/// <reference path="FrameworkElement.js"/>
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="List.js"/>
/// <reference path="Style.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="Border.js"/>
/// <reference path="Templates.js"/>

//#region _TextBoxBaseDynamicPropertyValueProvider

function _TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    _FrameworkElementProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
}
_TextBoxBaseDynamicPropertyValueProvider.InheritFrom(_FrameworkElementProvider);

_TextBoxBaseDynamicPropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;

    _FrameworkElementProvider.prototype.RecomputePropertyValue.call(this, propd, providerFlags, error);
};
_TextBoxBaseDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    var v;
    if (propd == this._BackgroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionBackground;
    } else if (propd == this._ForegroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionForeground;
    } else if (propd == this._BaselineOffsetPropd) {
        var _TextBoxView = this._Object._View;
        this._BaselineOffset = _TextBoxView == null ? 0 : _TextBoxView.GetBaselineOffset();
        v = this._BaselineOffset;
    }
    if (v != undefined)
        return v;
    return _FrameworkElementProvider.prototype.GetPropertyValue.call(this, propd);
};

_TextBoxBaseDynamicPropertyValueProvider.prototype._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(new Color(68, 68, 68));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(new Color(255, 255, 255));
};

//#endregion

//#region _TextBoxDynamicPropertyValueProvider

function _TextBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence, 
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
}
_TextBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

//#endregion

//#region _PasswordBoxDynamicPropertyValueProvider

function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence, 
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}
_PasswordBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

//#endregion

//#region _TextBoxView

function _TextBoxView() {
    FrameworkElement.call(this);

    this._Cursor = new Rect();
    this._Layout = new TextLayout();
    this._SelectionChanged = false;
    this._HadSelectedText = false;
    this._CursorVisible = false;
    this._EnableCursor = true;
    this._BlinkTimeout = 0;
    this._TextBox = null;
    this._Dirty = false;
}
_TextBoxView.InheritFrom(FrameworkElement);

_TextBoxView.prototype.SetTextBox = function (/* TextBoxBase */value) {
    if (this._TextBox == value)
        return;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Unsubscribe(this._OnModelChanged, this);
    }

    this._TextBox = value;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Subscribe(this._OnModelChanged, this);

        this._Layout.SetTextAttributes(new List());
        var attrs = new _TextLayoutAttributes(this._TextBox, 0);
        this._Layout.GetTextAttributes().Append(attrs);

        this._Layout.SetTextAlignment(this._TextBox.GetTextAlignment());
        this._Layout.SetTextWrapping(this._TextBox.GetTextWrapping());
        this._HadSelectedText = this._TextBox.HasSelectedText();
        this._SelectionChanged = true;
        this._UpdateText();

    } else {
        this._Layout.SetTextAttributes(null);
        this._Layout.SetText(null, -1);
    }

    this._UpdateBounds(true);
    this._InvalidateMeasure();
    this._Invalidate();
    this._Dirty = true;
};
_TextBoxView.prototype.SetEnableCursor = function (value) {
    if (this._EnableCursor == value)
        return;
    this._EnableCursor = value;
    if (value)
        this._ResetCursorBlink(false);
    else
        this._EndCursorBlink();
};

_TextBoxView.prototype._Blink = function () {
    var multiplier;
    if (this._CursorVisible) {
        multiplier = _TextBoxView.CURSOR_BLINK_OFF_MULTIPLIER;
        this._HideCursor();
    } else {
        multiplier = _TextBoxView.CURSOR_BLINK_ON_MULTIPLIER;
        this._ShowCursor();
    }
    this._ConnectBlinkTimeout(multiplier);
    return false;
};
_TextBoxView.prototype._ConnectBlinkTimeout = function (multiplier) {
    if (!this._IsAttached)
        return;
    var func = NotImplemented;
    var timeout = this._GetCursorBlinkTimeout() * multiplier / _TextBoxView.CURSOR_BLINK_DIVIDER;
    this._BlinkTimeout = setTimeout(func, timeout);
};
_TextBoxView.prototype._DisconnectBlinkTimeout = function () {
    if (this._BlinkTimeout != 0) {
        if (!this._IsAttached)
            return;
        clearTimeout(this._BlinkTimeout);
        this._BlinkTimeout = 0;
    }
};
_TextBoxView.prototype._GetCursorBlinkTimeout = function () {
    return _TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT;
};
_TextBoxView.prototype._ResetCursorBlink = function (delay) {
    if (this._TextBox.IsFocused() && !this._TextBox.HasSelectedText()) {
        if (this._EnableCursor) {
            if (this._Delay)
                this._DelayCursorBlink();
            else
                this._BeginCursorBlink();
        } else {
            this._UpdateCursor(false);
        }
    } else {
        this._EndCursorBlink();
    }
};
_TextBoxView.prototype._DelayCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER);
    this._UpdateCursor(true);
    this._ShowCursor();
};
_TextBoxView.prototype._BeginCursorBlink = function () {
    if (this._BlinkTimeout == 0) {
        this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER);
        this._UpdateCursor(true);
        this._ShowCursor();
    }
};
_TextBoxView.prototype._EndCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    if (this._CursorVisible)
        this._HideCursor();
};
_TextBoxView.prototype._InvalidateCursor = function () {
    this._Invalidate(this._Cursor/*.Transform(this._AbsoluteTransform)*/);
};
_TextBoxView.prototype._ShowCursor = function () {
    this._CursorVisible = true;
    this._InvalidateCursor();
};
_TextBoxView.prototype._HideCursor = function () {
    this._CursorVisible = false;
    this._InvalidateCursor();
};
_TextBoxView.prototype._UpdateCursor = function (invalidate) {
    var cur = this._TextBox.GetCursor();
    var current = this._Cursor;
    var rect;

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();

    this._Cursor = this._Layout.GetCursor(new Point(), cur);
    rect = this._Cursor; //.Transform(this._AbsoluteTransform);

    //TODO: this._TextBox._ImCtx.SetCursorLocation(rect);

    //TODO: if (this._Cursor != current)
        //TODO: this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
};
_TextBoxView.prototype._UpdateText = function () {
    var text = this._TextBox.GetDisplayText();
    this._Layout.SetText(text ? text : "", -1);
};

_TextBoxView.prototype._ComputeActualSize = function () {
    if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty))
        return FrameworkElement.prototype._ComputeActualSize.call(this);

    this.Layout(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    return this._Layout.GetActualExtents();
};
_TextBoxView.prototype._MeasureOverrideWithError = function (availableSize, error) {
    this.Layout(availableSize);
    var desired = this._Layout.GetActualExtents();
    if (!isFinite(availableSize.Width))
        desired.Width = Math.max(desired.Width, 11);
    return desired.Min(availableSize);
};
_TextBoxView.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    this.Layout(finalSize);
    var arranged = this._Layout.GetActualExtents();
    arranged = arranged.Max(finalSize);
    return arranged;
};
_TextBoxView.prototype.Layout = function (constraint) {
    this._Layout.SetMaxWidth(constraint.Width);
    this._Layout.Layout();
    this._Dirty = false;
};

_TextBoxView.prototype.GetBaselineOffset = function () {
    //TODO: GetTransformToUIElementWithError
    return this._Layout.GetBaselineOffset();
};
_TextBoxView.prototype.GetLineFromY = function (y) {
    return this._Layout.GetLineFromY(new Point(), y);
};
_TextBoxView.prototype.GetLineFromIndex = function (index) {
    return this._Layout.GetLineFromIndex(index);
};
_TextBoxView.prototype.GetCursorFromXY = function (x, y) {
    return this._Layout.GetCursorFromXY(new Point(), x, y);
};

_TextBoxView.prototype._Render = function (ctx, region) {
    var renderSize = this._RenderSize;
    this._TextBox._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();

    this._UpdateCursor(false);

    if (this._SelectionChanged) {
        this._Layout.Select(this._TextBox.GetSelectionStart(), this._TextBox.GetSelectionLength());
        this._SelectionChanged = false;
    }
    ctx.Save();
    this._RenderLayoutClip(ctx);
    this._Layout.SetAvailableWidth(renderSize.Width);
    this._RenderImpl(ctx, region);
    ctx.Restore();
};
_TextBoxView.prototype._RenderImpl = function (ctx, region) {
    ctx.Save();
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
        //TODO: Invert
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), new Point());
    if (this._CursorVisible) {
        var caretBrush = this._TextBox.GetCaretBrush();
        if (!caretBrush)
            caretBrush = new SolidColorBrush(new Color(0, 0, 0));
        //TODO: Draw cursor
    }
    ctx.Restore();
};

_TextBoxView.prototype.OnLostFocus = function () {
    this._EndCursorBlink();
};
_TextBoxView.prototype.OnGotFocus = function () {
    this._ResetCursorBlink(false);
};
_TextBoxView.prototype.OnMouseLeftButtonDown = function (args) {
    this._TextBox.OnMouseLeftButtonDown(args);
};
_TextBoxView.prototype.OnMouseLeftButtonUp = function (args) {
    this._TextBox.OnMouseLeftButtonUp(args);
};

_TextBoxView.prototype._OnModelChanged = function (sender, args) {
    switch (args.Changed) {
        case _TextBoxModelChanged.TextAlignment:
            if (this._Layout.SetTextAlignment(args.NewValue))
                this._Dirty = true;
            break;
        case _TextBoxModelChanged.TextWrapping:
            if (this._Layout.SetTextWrapping(args.NewValue))
                this._Dirty = true;
            break;
        case _TextBoxModelChanged.Selection:
            if (this._HadSelectedText || this._TextBox.HasSelectedText()) {
                this._HadSelectedText = this._TextBox.HasSelectedText();
                this._SelectionChanged = true;
                this._ResetCursorBlink(false);
            } else {
                this._ResetCursorBlink(true);
                return;
            }
            break;
        case _TextBoxModelChanged.Brush:
            break;
        case _TextBoxModelChanged.Font:
            this._Layout._ResetState();
            this._Dirty = true;
            break;
        case _TextBoxModelChanged.Text:
            this._UpdateText();
            this._Dirty = true;
            break;
        default:
            return;
    }
    if (this._Dirty) {
        this._InvalidateMeasure();
        this._UpdateBounds(true);
    }
    this._Invalidate();
};

_TextBoxView.CURSOR_BLINK_DIVIDER = 3;
_TextBoxView.CURSOR_BLINK_OFF_MULTIPLIER = 2;
_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER = 3;
_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER = 4;
_TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT = 900;

//#endregion

var _TextBoxModelChanged = {
    Nothing: 0,
    TextAlignment: 1,
    TextWrapping: 2,
    Selection: 3,
    Brush: 4,
    Font: 5,
    Text: 6
};
var _TextBoxEmitChanged = {
    NOTHING: 0,
    SELECTION: 1 << 0,
    TEXT: 1 << 1
};

//#region _TextBoxModelChangedEventArgs

function _TextBoxModelChangedEventArgs(changed, propArgs) {
    RefObject.call(this);
    this.Changed = changed;
    this.PropArgs = propArgs;
}
_TextBoxModelChangedEventArgs.InheritFrom(RefObject);

//#endregion

//#region TextBoxBase

function TextBoxBase() {
    Control.call(this);
    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._Buffer = new String();

    this._Font = new Font();

    this.ModelChanged = new MulticastEvent();

    this._Batch = 0;
}
TextBoxBase.InheritFrom(Control);

TextBoxBase.prototype.HasSelectedText = function () {
    return this._SelectionCursor !== this._SelectionAnchor;
};
TextBoxBase.prototype.GetFont = function () {
    return this._Font;
};
TextBoxBase.prototype.GetTextDecorations = function () {
    return TextDecorations.None;
};
TextBoxBase.prototype.GetCursor = function () {
    return this._SelectionCursor;
};
TextBoxBase.prototype.GetSelectionStart = function () {
    AbstractMethod("TextBoxBase.GetSelectionStart");
};
TextBoxBase.prototype.SetSelectionStart = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionStart");
};
TextBoxBase.prototype.GetSelectionLength = function () {
    AbstractMethod("TextBoxBase.GetSelectionLength");
};
TextBoxBase.prototype.SetSelectionLength = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionLength");
};

TextBoxBase.prototype.OnApplyTemplate = function () {
    var contentElement = this.GetTemplateChild("ContentElement");

    if (contentElement == null) {
        Warn("No ContentElement found");
        Control.prototype.OnApplyTemplate.call(this);
        return;
    }

    if (this._View != null) {
        this._View.SetTextBox(null);
    }

    this._View = new _TextBoxView();
    this._View.SetEnableCursor(!this._IsReadOnly);
    this._View.SetTextBox(this);

    if (contentElement instanceof ContentPresenter) {
        contentElement.SetContent(this._View);
    } else if (contentElement instanceof ContentControl) {
        contentElement.SetContent(this._View);
    } else if (contentElement instanceof Border) {
        contentElement.SetChild(this._View);
    } else if (contentElement instanceof Panel) {
        contentElement.GetChildren().Add(this._View);
    } else {
        Warn("Can't handle ContentElement.");
        this._View.SetTextBox(null);
        this._View = null;
    }
    Control.prototype.OnApplyTemplate.call(this);
};

TextBoxBase.prototype._OnPropertyChanged = function (args, error) {
    var changed = _TextBoxModelChanged.Nothing;
    if (args.Property === Control.FontFamilyProperty) {
        this._Font.SetFamily(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontSizeProperty) {
        this._Font.SetSize(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStretchProperty) {
        this._Font.SetStretch(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStyleProperty) {
        this._Font.SetStyle(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontWeightProperty) {
        this._Font.SetWeight(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    }

    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    if (args.Property.OwnerType !== TextBoxBase) {
        Control.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property === Control.BackgroundProperty
        || args.Property === Control.ForegroundProperty) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush, args));
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBoxBase)
        Control.prototype._OnSubPropertyChanged.call(this, sender, args);
};

TextBoxBase.prototype._BatchPush = function () {
    this._Batch++;
};
TextBoxBase.prototype._BatchPop = function () {
    if (this._Batch == 0) {
        Warn("TextBoxBase._Batch underflow");
        return;
    }
    this._Batch--;
};
TextBoxBase.prototype._SyncAndEmit = function (syncText) {
    if (syncText == undefined)
        syncText = true;

    if (this._Batch != 0 || this._Emit == _TextBoxEmitChanged.NOTHING)
        return;

    if (syncText && (this._Emit & _TextBoxEmitChanged.TEXT))
        this._SyncText();

    if (this._Emit & _TextBoxEmitChanged.SELECTION)
        this._SyncSelectedText();

    if (this._IsLoaded) {
        this._Emit &= this._EventsMask;
        if (this._Emit & _TextBoxEmitChanged.TEXT)
            this._EmitTextChanged();
        if (this._Emit & _TextBoxEmitChanged.SELECTION)
            this._EmitSelectionChanged();
    }

    this._Emit = _TextBoxEmitChanged.NOTHING;
};
TextBoxBase.prototype._SyncText = function () {
    AbstractMethod("TextBoxBase._SyncText");
};
TextBoxBase.prototype._SyncSelectedText = function () {
    AbstractMethod("TextBoxBase._SyncSelectedText");
};
TextBoxBase.prototype.ClearSelection = function (start) {
    this._BatchPush();
    this.SetSelectionStart(start);
    this.SetSelectionLength(0);
    this._BatchPop();
};

TextBoxBase.prototype._EmitTextChanged = function () { };
TextBoxBase.prototype._EmitSelectionChanged = function () { };

//#endregion

//#region TextBox

function TextBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;

    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
}
TextBox.InheritFrom(TextBoxBase);

//#region DEPENDENCY PROPERTIES

TextBox.SelectionForegroundProperty = DependencyProperty.Register("SelectionForeground", function () { return Brush; }, TextBox);
TextBox.prototype.GetSelectionForeground = function () {
    return this.GetValue(TextBox.SelectionForegroundProperty);
};
TextBox.prototype.SetSelectionForeground = function (value) {
    this.SetValue(TextBox.SelectionForegroundProperty, value);
};

TextBox.SelectionBackgroundProperty = DependencyProperty.Register("SelectionBackground", function () { return Brush; }, TextBox);
TextBox.prototype.GetSelectionBackground = function () {
    return this.GetValue(TextBox.SelectionBackgroundProperty);
};
TextBox.prototype.SetSelectionBackground = function (value) {
    this.SetValue(TextBox.SelectionBackgroundProperty, value);
};

TextBox.BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", function () { return Number; }, TextBox);
TextBox.prototype.GetBaselineOffset = function () {
    return this.GetValue(TextBox.BaselineOffsetProperty);
};
TextBox.prototype.SetBaselineOffset = function (value) {
    this.SetValue(TextBox.BaselineOffsetProperty, value);
};

TextBox.SelectedTextProperty = DependencyProperty.Register("SelectedText", function () { return String; }, TextBox, "");
TextBox.prototype.GetSelectedText = function () {
    return this.GetValue(TextBox.SelectedTextProperty);
};
TextBox.prototype.SetSelectedText = function (value) {
    this.SetValue(TextBox.SelectedTextProperty, value);
};

TextBox.SelectionLengthProperty = DependencyProperty.Register("SelectionLength", function () { return Number; }, TextBox, 0);
TextBox.prototype.GetSelectionLength = function () {
    return this.GetValue(TextBox.SelectionLengthProperty);
};
TextBox.prototype.SetSelectionLength = function (value) {
    this.SetValue(TextBox.SelectionLengthProperty, value);
};

TextBox.SelectionStartProperty = DependencyProperty.Register("SelectionStart", function () { return Number; }, TextBox, 0);
TextBox.prototype.GetSelectionStart = function () {
    return this.GetValue(TextBox.SelectionStartProperty);
};
TextBox.prototype.SetSelectionStart = function (value) {
    this.SetValue(TextBox.SelectionStartProperty, value);
};

TextBox.TextProperty = DependencyProperty.Register("Text", function () { return String; }, TextBox);
TextBox.prototype.GetText = function () {
    return this.GetValue(TextBox.TextProperty);
};
TextBox.prototype.SetText = function (value) {
    this.SetValue(TextBox.TextProperty, value);
};

TextBox.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () { return Number; }, TextBox, TextAlignment.Left);
TextBox.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBox.TextAlignmentProperty);
};
TextBox.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBox.TextAlignmentProperty, value);
};

TextBox.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () { return Number; }, TextBox, TextWrapping.NoWrap);
TextBox.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBox.TextWrappingProperty);
};
TextBox.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBox.TextWrappingProperty, value);
};

TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
TextBox.prototype.GetHorizontalScrollBarVisibility = function () {
    return this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.prototype.SetHorizontalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};

TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
TextBox.prototype.GetVerticalScrollBarVisibility = function () {
    return this.GetValue(TextBox.VerticalScrollBarVisibilityProperty);
};
TextBox.prototype.SetVerticalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.VerticalScrollBarVisibilityProperty, value);
};

//#endregion

//#region INSTANCE METHODS

TextBox.prototype.OnApplyTemplate = function () {
    TextBoxBase.prototype.OnApplyTemplate.call(this);

    if (!this._ContentElement)
        return;
    var prop;
    if ((prop = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
        this._ContentElement.SetValue(prop, this.GetValue(TextBox.VerticalScrollBarVisibilityProperty));

    if ((prop = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
        if (this.GetTextWrapping() === TextWrapping.Wrap)
            this._ContentElement.SetValue(prop, ScrollBarVisibility.Disabled);
        else
            this._ContentElement.SetValue(prop, this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
    }
};

TextBox.prototype.GetDisplayText = function () {
    return this.GetText();
};

TextBox.prototype._SyncSelectedText = function () {
    if (this._SelectionCursor != this._SelectionAnchor) {
        var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        var end = Math.max(this._SelectionAnchor, this._SelectionCursor);
        var text = this._Buffer.slice(start, end);

        this._SetValue = false;
        this.SetSelectedText(TextBox.SelectedTextProperty, text);
        this._SetValue = true;
    } else {
        this._SetValue = false;
        this.SetSelectedText("");
        this._SetValue = true;
    }
};
TextBox.prototype._SyncText = function () {
    this._SetValue = false;
    this.SetValue(TextBox.TextProperty, this._Buffer);
    this._SetValue = true;
};

TextBox.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextBox) {
        TextBoxBase.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    var changed = _TextBoxModelChanged.Nothing;
    var propd;
    var start;
    var length;
    var textLen;
    /*if (args.Property === TextBox.AcceptsReturnProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.CaretBrushProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.FontSourceProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.IsReadOnlyProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.MaxLengthProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else */
    if (args.Property === TextBox.SelectedTextProperty) {
        if (this._SetValue) {
            length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            start = Math.min(this._SelectionAnchor, this._SelectionCursor);

            //TODO: Create undo
            //TODO: Clear redos
            this.ClearSelection(start + textLen);
            //TODO: ResetIMContext();
            this._SyncAndEmit();
            NotImplemented("TextBox._OnPropertyChanged");
        }
    } else if (args.Property === TextBox.SelectionStartProperty) {
        length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        start = args.NewValue;
        if (start > this._Buffer.length) {
            this.SetSelectionStart(this._Buffer.length);
            return;
        }

        if (start + length > this._Buffer.length) {
            this._BatchPush();
            length = this._Buffer.length - start;
            this.SetSelectionLength(length);
            this._BatchPop();
        }

        if (this._SelectionAnchor != start) {
            changed = _TextBoxModelChanged.Selection;
            this._HaveOffset = false;
        }

        this._SelectionCursor = start + length;
        this._SelectionAnchor = start;

        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._SyncAndEmit();
    } else if (args.Property === TextBox.SelectionLengthProperty) {
        start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        length = args.NewValue;
        if (start + length > this._Buffer.length) {
            length = this._Buffer.length - start;
            this.SetSelectionLength(length);
            return;
        }
        if (this._SelectionCursor != (start + length)) {
            changed = _TextBoxModelChanged.Selection;
            this._HaveOffset = false;
        }

        this._SelectionCursor = start + length;
        this._SelectionAnchor = start;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._SyncAndEmit();
    } else if (args.Property === TextBox.SelectionBackgroundProperty) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property === TextBox.SelectionForegroundProperty) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property === TextBox.TextProperty) {
        if (this._SetValue) {
            //TODO: Build undo action
            //TODO: Clear redo stack

            this._Emit |= _TextBoxEmitChanged.TEXT;
            this.ClearSelection(0);
            //TODO: ResetIMContext();
            this._SyncAndEmit(false);
            NotImplemented("TextBox._OnPropertyChanged");
        }
        changed = _TextBoxModelChanged.Text;
    } else if (args.Property === TextBox.TextAlignmentProperty) {
        changed = _TextBoxModelChanged.TextAlignment;
    } else if (args.Property === TextBox.TextWrappingProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (args.NewValue === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
            }
        }
        changed = _TextBoxModelChanged.TextWrapping
    } else if (args.Property === TextBox.HorizontalScrollBarVisibilityProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (this.GetTextWrapping() === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, args.NewValue);
            }
        }
    } else if (args.Property === TextBox.VerticalScrollBarVisibilityProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
                this._ContentElement.SetValue(propd, args.NewValue);
        }
    }

    this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    this.PropertyChanged.Raise(this, args);
};
TextBox.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property && (args.Property === TextBox.SelectionBackgroundProperty
        || args.Property === TextBox.SelectionForegroundProperty)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush));
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBox)
        TextBoxBase.prototype._OnSubPropertyChanged.call(this, sender, args);
};

TextBox.prototype._EmitTextChanged = function () {
    this.SelectionChanged.RaiseAsync(this, {});
};
TextBox.prototype._EmitSelectionChanged = function () {
    this.TextChanged.RaiseAsync(this, {});
};

//#endregion

//#region DEFAULT STYLE

TextBox.prototype.GetDefaultStyle = function () {
    var style = new Style();

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BorderThicknessProperty);
        setter.SetValue_Prop(new Thickness(1, 1, 1, 1));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BackgroundProperty);
        setter.SetValue_Prop(new SolidColorBrush(new Color(255, 255, 255, 1.0)));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.ForegroundProperty);
        setter.SetValue_Prop(new SolidColorBrush(new Color(0, 0, 0, 1.0)));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.PaddingProperty);
        setter.SetValue_Prop(new Thickness(2, 2, 2, 2));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BorderBrushProperty);
        setter.SetValue_Prop((function () {
            var brush = new LinearGradientBrush();
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(163, 174, 185));
                stop.SetOffset(0.0);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(131, 153, 169));
                stop.SetOffset(0.375);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(113, 133, 151));
                stop.SetOffset(0.375);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(97, 117, 132));
                stop.SetOffset(1.0);
                return stop;
            })());
            return brush;
        })());
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.TemplateProperty);
        setter.SetValue_Prop((function () {
            return new ControlTemplate(TextBox, {
                Type: Grid,
                Name: "RootElement",
                Children: [
                    {
                        Type: Border,
                        Name: "Border",
                        Props: {
                            CornerRadius: new CornerRadius(1, 1, 1, 1),
                            Opacity: 1.0,
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Background: new TemplateBinding("Background"),
                            BorderBrush: new TemplateBinding("BorderBrush")
                        },
                        Content: {
                            Type: Grid,
                            Children: [
                                {
                                    Type: Border,
                                    Name: "ReadOnlyVisualElement",
                                    Props: {
                                        Opacity: 0.0,
                                        Background: new SolidColorBrush(Color.FromHex("#5EC9C9C9"))
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        BorderBrush: new SolidColorBrush(Color.FromHex("#00000000"))
                                    },
                                    Content: {
                                        Type: Border,
                                        Name: "ContentElement",
                                        Props: {
                                            Padding: new TemplateBinding("Padding"),
                                            //IsTabStop: false,
                                            BorderThickness: new Thickness(0, 0, 0, 0)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        Type: Border,
                        Name: "DisabledVisualElement",
                        Props: {
                            Background: new SolidColorBrush(Color.FromHex("#A5F7F7F7")),
                            BorderBrush: new SolidColorBrush(Color.FromHex("#A5F7F7F7")),
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Opacity: 0.0,
                            IsHitTestVisible: false
                        }
                    },
                    {
                        Type: Border,
                        Name: "FocusVisualElement",
                        Props: {
                            BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Margin: new Thickness(1, 1, 1, 1),
                            Opacity: 0.0,
                            IsHitTestVisible: false
                        }
                    }
                ]
            });
        })());
        return setter;
    })());

    return style;
};

//#endregion

//#endregion

//#region PasswordBox

function PasswordBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
}
PasswordBox.InheritFrom(TextBoxBase);

//#endregion

/// <reference path="Control.js"/>
/// CODE

//#region UserControl

function UserControl() {
    Control.call(this);
}
UserControl.InheritFrom(Control);

//#region DEPENDENCY PROPERTIES

UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, UserControl);
UserControl.prototype.GetContent = function () {
    return this.GetValue(UserControl.ContentProperty);
};
UserControl.prototype.SetContent = function (value) {
    this.SetValue(UserControl.ContentProperty, value);
};

//#endregion

//#region INSTANCE METHODS

UserControl.prototype.IsLayoutContainer = function () { return true; };

UserControl.prototype._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);

    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize.GrowByThickness(border.Negate()), error);
        desired = child._DesiredSize;
    }

    desired = desired.GrowByThickness(border);

    return desired;
};
UserControl.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        childRect = childRect.GrowByThickness(border.Negate());
        child._ArrangeWithError(childRect, error);
        arranged = new Size(childRect.Width, childRect.Height).GrowByThickness(border);
    }
    return arranged;
};

UserControl.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType != UserControl) {
        Control.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == UserControl.ContentProperty) {
        if (args.OldValue && args.OldValue instanceof UIElement) {
            if (args.OldValue instanceof FrameworkElement) {
                args.OldValue._SetLogicalParent(null, error);
                if (error.IsErrored())
                    return;
            }
            this._ElementRemoved(args.OldValue);
        }
        if (args.NewValue && args.NewValue instanceof UIElement) {
            if (args.NewValue instanceof FrameworkElement) {
                args.NewValue._SetLogicalParent(this, error);
                if (error.IsErrored())
                    return;
            }
            this._ElementAdded(args.NewValue);
        }
        this._UpdateBounds();
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region ANNOTATIONS

UserControl.Annotations = {
    ContentProperty: UserControl.ContentProperty
};

//#endregion

//#endregion

/// <reference path="Control.js"/>
/// CODE
/// <reference path="Templates.js"/>
/// <reference path="Grid.js"/>

//#region ContentControl

function ContentControl() {
    Control.call(this);
}
ContentControl.InheritFrom(Control);

ContentControl._FallbackTemplate = (function () {
    //TODO: Create fallback template
    // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
    new ControlTemplate(ContentControl, {
        Type: Grid,
        Children: [
            {
                Type: TextBlock
                //TODO: , Text: new Binding()
            }
        ]
    });
    NotImplemented("ContentControl._FallbackTemplate");
    return new ControlTemplate();
})();

//#region DEPENDENCY PROPERTIES

ContentControl.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, ContentControl);
ContentControl.prototype.GetContent = function () {
    return this.GetValue(ContentControl.ContentProperty);
};
ContentControl.prototype.SetContent = function (value) {
    this.SetValue(ContentControl.ContentProperty, value);
};

ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentControl);
ContentControl.prototype.GetContentTemplate = function () {
    return this.GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region INSTANCE METHODS

ContentControl.prototype._GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentControl.prototype._GetDefaultTemplate = function () {
    return this._FallbackRoot;
};

//#endregion

//#region ANNOTATIONS

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

//#endregion

/// <reference path="ContentControl.js"/>

//#region ButtonBase

ButtonBase.prototype = new ContentControl;
ButtonBase.prototype.constructor = ButtonBase;
function ButtonBase() {
    ContentControl.call(this);

    this._IsMouseCaptured = false;
    this._IsMouseLeftButtonDown = false;
    this._IsSpaceKeyDown = false;
    this._MousePosition = new Point();

    this.Click = new MulticastEvent();

    this.Loaded.Subscribe(function () { this._IsLoaded = true; this.UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}
ButtonBase.GetBaseClass = function () { return ContentControl; };

//#region DEPENDENCY PROPERTIES

ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return Number; }, ButtonBase, ClickMode.Release);
ButtonBase.prototype.GetClickMode = function () {
    return this.GetValue(ButtonBase.ClickModeProperty);
};
ButtonBase.prototype.SetClickMode = function (value) {
    this.SetValue(ButtonBase.ClickModeProperty, value);
};

ButtonBase.IsPressedProperty = DependencyProperty.Register("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.prototype.GetIsPressed = function () {
	return this.GetValue(ButtonBase.IsPressedProperty);
};
ButtonBase.prototype.SetIsPressed = function (value) {
	this.SetValue(ButtonBase.IsPressedProperty, value);
};

ButtonBase.IsFocusedProperty = DependencyProperty.Register("IsFocused", function () { return Boolean; }, ButtonBase, false);
ButtonBase.prototype.GetIsFocused = function () {
    return this.GetValue(ButtonBase.IsFocusedProperty);
};
ButtonBase.prototype.SetIsFocused = function (value) {
    this.SetValue(ButtonBase.IsFocusedProperty, value);
};

ButtonBase.IsMouseOverProperty = DependencyProperty.Register("IsMouseOver", function () { return Boolean; }, ButtonBase, false);
ButtonBase.prototype.GetIsMouseOver = function () {
    return this.GetValue(ButtonBase.IsMouseOverProperty);
};
ButtonBase.prototype.SetIsMouseOver = function (value) {
    this.SetValue(ButtonBase.IsMouseOverProperty, value);
};

//#endregion

ButtonBase.prototype.OnIsEnabledChanged = function (e) {
    ContentControl.prototype.OnIsEnabledChanged.call(this, e);
    var isEnabled = e.NewValue;
    this._SuspendStateChanges = true;
    try {
        if (!isEnabled) {
            this.SetIsFocused(false);
            this.SetIsPressed(false);
            this._IsMouseCaptured = false;
            this._IsSpaceKeyDown = false;
            this._IsMouseLeftButtonDown = false;
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.prototype.OnIsPressedChanged = function (e) {
    this.UpdateVisualState();
};
ButtonBase.prototype._IsValidMousePosition = function () {
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
};

ButtonBase.prototype.UpdateVisualState = function (useTransitions) {
    if (this._SuspendStateChanges)
        return;
    this.ChangeVisualState(useTransitions === undefined ? true : useTransitions);
};
ButtonBase.prototype.ChangeVisualState = function (useTransitions) {
    //Nothing to do in ButtonBase
};
ButtonBase.prototype._GoToState = function (useTransitions, stateName) {
    return VisualStateManager.GoToState(this, stateName, useTransitions);
};

//#region MOUSE

ButtonBase.prototype.OnMouseEnter = function (sender, args) {
    ContentControl.prototype.OnMouseEnter.call(this, sender, args);

    this.SetIsMouseOver(true);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled()) {
            this.SetIsPressed(true);
            this._EmitClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.prototype.OnMouseLeave = function (sender, args) {
    ContentControl.prototype.OnMouseLeave.call(this, sender, args);

    this.SetIsMouseOver(false);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled())
            this.SetIsPressed(false);
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.prototype.OnMouseMove = function (sender, args) {
    ContentControl.prototype.OnMouseMove.call(this, sender, args);

    this._MousePosition = args.GetPosition(this);

    if (this._IsMouseLeftButtonDown && this.GetIsEnabled() && this.GetClickMode() !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.SetIsPressed(this._IsValidMousePosition());
    }
};
ButtonBase.prototype.OnMouseLeftButtonDown = function (sender, args) {
    ContentControl.prototype.OnMouseLeftButtonDown.call(this, sender, args);

    this._IsMouseLeftButtonDown = true;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    this._SuspendStateChanges = true;
    try {
        this.Focus();
        this._CaptureMouseInternal();
        if (this._IsMouseCaptured)
            this.SetIsPressed(true);
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }

    if (clickMode === ClickMode.Press)
        this._EmitClick();
};
ButtonBase.prototype.OnMouseLeftButtonUp = function (sender, args) {
    ContentControl.prototype.OnMouseLeftButtonUp.call(this, sender, args);

    this._IsMouseLeftButtonDown = false;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    if (!this._IsSpaceKeyDown && this.GetIsPressed() && clickMode === ClickMode.Release)
        this._EmitClick();

    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.SetIsPressed(false);
    }
};
ButtonBase.prototype.OnGotFocus = function (sender, args) {
    ContentControl.prototype.OnGotFocus.call(this, sender, args);

    this.SetIsFocused(true);
    this.UpdateVisualState();
};
ButtonBase.prototype.OnLostFocus = function (sender, args) {
    ContentControl.prototype.OnLostFocus.call(this, sender, args);

    this.SetIsFocused(false);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() !== ClickMode.Hover) {
            this.SetIsPressed(false);
            this._ReleaseMouseCaptureInternal();
            this._IsSpaceKeyDown = false;
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};

ButtonBase.prototype._CaptureMouseInternal = function () {
    if (!this._IsMouseCaptured)
        this._IsMouseCaptured = this.CaptureMouse();
};
ButtonBase.prototype._ReleaseMouseCaptureInternal = function () {
    this.ReleaseMouseCapture();
    this._IsMouseCaptured = false;
};

ButtonBase.prototype._EmitClick = function () {
    //TODO: Execute Command
    this.Click.Raise(this, null);
};

//#endregion

ButtonBase._GetVisualRoot = function (d) {
    var parent = d;
    while (parent != null) {
        d = parent;
        parent = VisualTreeHelper.GetParent(parent);
    }
    return d;
};

//#endregion

/// <reference path="ButtonBase.js"/>
/// CODE
/// <reference path="Style.js"/>
/// <reference path="JsonParser.js"/>
/// <reference path="Brushes.js"/>
/// <reference path="Primitives.js"/>

//#region Button

function Button() {
    ButtonBase.call(this);
    this._ElementRoot = null;
    this._ElementFocusVisual = null;
    this._StateNormal = null;
    this.SetIsTabStop(false);
}
Button.InheritFrom(ButtonBase);

Button.StateDisabled = "";
Button.StatePressed = "";
Button.StateMouseOver = "";
Button.StateNormal = "";
Button.StateFocused = "";
Button.StateUnfocused = "";

Button.prototype.OnApplyTemplate = function () {
    ButtonBase.prototype.OnApplyTemplate.call(this);

    this.UpdateVisualState(false);
};
Button.prototype.ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, Button.StateDisabled);
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, Button.StatePressed);
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, Button.StateMouseOver);
    } else {
        this._GoToState(useTransitions, Button.StateNormal);
    }

    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, Button.StateFocused);
    } else {
        this._GoToState(useTransitions, Button.StateUnfocused);
    }
};
Button.prototype.OnIsEnabledChanged = function (e) {
    ButtonBase.prototype.OnIsEnabledChanged.call(this, e);
    this.SetIsTabStop(e.NewValue);
};

//#region DEFAULT STYLE

Button.prototype.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: Button
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
                    Value: new SolidColorBrush(Color.FromHex("#FF1F3B53"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
                    Value: new SolidColorBrush(Color.FromHex("#FF000000"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
                    Value: new Thickness(3, 3, 3, 3)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "BorderThickness"),
                    Value: new Thickness(1, 1, 1, 1)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
                    Value: {
                        Type: LinearGradientBrush,
                        Props: {
                            StartPoint: new Point(0.5, 1),
                            EndPoint: new Point(0.5, 1),
                            GradientStops: [
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FFA3AEB9"),
                                        Offset: 0.0
                                    }
                                },
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF8399A9"),
                                        Offset: 0.375
                                    }
                                },
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF718597"),
                                        Offset: 0.375
                                    }
                                },
                                {   
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF617584"),
                                        Offset: 1.0
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Template"),
                    Value: new ControlTemplate(Button, {
                        Type: Grid,
                        Children: [
                            {
                                Type: Border,
                                Name: "Background",
                                Props: {
                                    CornerRadius: new CornerRadius(3, 3, 3, 3),
                                    Background: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                    BorderThickness: new TemplateBinding("BorderThickness"),
                                    BorderBrush: new TemplateBinding("BorderBrush")
                                },
                                Content: {
                                    Type: Grid,
                                    Props: {
                                        Background: new TemplateBinding("Background"),
                                        Margin: new Thickness(1, 1, 1, 1)
                                    },
                                    Children: [
                                        {
                                            Type: Border,
                                            Name: "BackgroundAnimation",
                                            Props: {
                                                Opacity: 0.0,
                                                Background: new SolidColorBrush(Color.FromHex("#FF448DCA"))
                                            }
                                        },
                                        {
                                            Type: Border,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Background: {
                                                    Type: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0.0),
                                                        EndPoint: new Point(0.7, 1.0),
                                                        GradientStops: [
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF"),
                                                                    Offset: 0.0
                                                                }
                                                            },
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#F9FFFFFF"),
                                                                    Offset: 0.375
                                                                }
                                                            },
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#E5FFFFFF"),
                                                                    Offset: 0.625
                                                                }
                                                            },
                                                            {   
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#C6FFFFFF"),
                                                                    Offset: 1.0
                                                                }
                                                            }
                                                        ]
                                                    },
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                Type: ContentPresenter,
                                Name: "contentPresenter",
                                Props: {
                                    Content: new TemplateBinding("Content"),
                                    ContentTemplate: new TemplateBinding("ContentTemplate"),
                                    VerticalAlignment: new TemplateBinding("VerticalContentAlignment"),
                                    HorizontalAlignment: new TemplateBinding("HorizontalContentAlignment"),
                                    Margin: new TemplateBinding("Padding")
                                }
                            },
                            {
                                Type: Border,
                                Name: "DisabledVisualElement",
                                Props: {
                                    Background: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                    Opacity: 0.0,
                                    CornerRadius: new CornerRadius(3, 3, 3, 3),
                                    IsHitTestVisible: false
                                }
                            },
                            {
                                Type: Border,
                                Name: "FocusVisualElement",
                                Props: {
                                    Margin: new Thickness(1, 1, 1, 1),
                                    BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                    BorderThickness: new Thickness(1, 1, 1, 1),
                                    Opacity: 0.0,
                                    CornerRadius: new CornerRadius(2, 2, 2, 2),
                                    IsHitTestVisible: false
                                }
                            }
                        ]
                    })
                }
            }
        ]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

//#endregion

//#endregion

