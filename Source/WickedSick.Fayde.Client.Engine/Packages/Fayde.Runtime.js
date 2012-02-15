Function.prototype.InheritFrom = function (parentType) {
    this.prototype = new parentType;
    this.prototype.constructor = this;
    this.GetBaseClass = function () { return parentType; };
    return this;
};
Function.prototype.DoesInheritFrom = function (type) {
    return (new this()) instanceof type;
};
Function.prototype.Implement = function (interface) {
    var interfaceName = (new interface())._TypeName;
    for (var i in interface.prototype) {
        if (!this.prototype[i])
            this.prototype[i] = new Function("throw new NotImplementedException();");
    }
    if (this._Interfaces == null)
        this._Interfaces = new Array();
    this._Interfaces[interfaceName] = true;
    return this;
};
Function.prototype.DoesImplement = function (interface) {
    if (!this._Interfaces)
        return false;
    var interfaceName = (new interface())._TypeName;
    return this._Interfaces[interfaceName] === true;
};
Function.prototype.GetName = function () {
    if (this.___FunctionName___ != null)
        return this.___FunctionName___;
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.toString());
    var name = (results && results.length > 1) ? results[1] : "";
    this.___FunctionName___ = name;
    return name;
};
String.prototype.indexOfAny = function (carr, start) {
    if (!(carr instanceof Array))
        return -1;
    if (start == null)
        start = 0;
    for (var cur = start; cur < this.length; cur++) {
        var c = this.charAt(c);
        for (var i = 0; i < carr.length; i++) {
            if (c === carr[i])
                return cur;
        }
    }
    return -1;
};

function RefObject() {
    Object.call(this);
    RefObject._LastID = this._ID = RefObject._LastID + 1;
    this._TypeName = RefObject.GetTypeName.call(this);
}
RefObject.InheritFrom(Object);
RefObject._LastID = 0;
RefObject.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    if (obj.constructor.DoesImplement(type))
        return obj;
    return null;
};
RefObject.GetTypeName = function () {
    try {
        return this.constructor.GetName();
    } catch (err) {
        err.toString();
    }
};
RefObject.RefEquals = function (robj1, robj2) {
    if (robj1 == null && robj2 == null)
        return true;
    if (robj1 instanceof RefObject && robj2 instanceof RefObject)
        return robj1._ID === robj2._ID;
    return false;
};
RefObject.Equals = function (val1, val2) {
    if (val1 == null && val2 == null)
        return true;
    if (val1 instanceof RefObject && val2 instanceof RefObject)
        return RefObject.RefEquals(val1, val2);
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};

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

function Dictionary() {
    RefObject.call(this);
    this._ht = new Array();
}
Dictionary.InheritFrom(RefObject);
Dictionary.prototype.TryGetValue = function (key, data) {
    data.Value = this._ht[key];
    return data.Value != null;
};
Dictionary.prototype.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.prototype.Remove = function (key) {
    delete this._ht[key];
};

function EventArgs() {
    RefObject.call(this);
}
EventArgs.InheritFrom(RefObject);
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
function MouseButtonEventArgs(absolutePos) {
    MouseEventArgs.call(this, absolutePos);
}
MouseButtonEventArgs.InheritFrom(MouseEventArgs);

function LinkedList() {
    RefObject.call(this);
}
LinkedList.InheritFrom(RefObject);
LinkedList.prototype.First = function () {
    return this._Head;
};
LinkedList.prototype.Last = function () {
    return this._Tail;
};
LinkedList.prototype.IsEmpty = function () {
    return !this._Head;
};
LinkedList.prototype.Prepend = function (node) {
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
LinkedList.prototype.Append = function (node) {
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
LinkedList.prototype.Remove = function (node) {
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
LinkedList.prototype.InsertBefore = function (node, before) {
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
LinkedList.prototype.Clear = function () {
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
};

function LinkedListNode() {
    RefObject.call(this);
    this.Previous = null;
    this.Next = null;
}
LinkedListNode.InheritFrom(RefObject);

function MulticastEvent() {
    RefObject.call(this);
    this._Listeners = new Array();
}
MulticastEvent.InheritFrom(RefObject);
MulticastEvent.prototype.Subscribe = function (callback, closure) {
    if (!(callback instanceof Function))
        throw new InvalidOperationException("Callback must be a function!");
    this._Listeners.push({ Callback: callback, Closure: closure });
};
MulticastEvent.prototype.SubscribeSpecific = function (callback, closure, matchFunc, matchClosure) {
    this._Listeners.push({ Callback: callback, Closure: closure, MatchFunc: matchFunc, MatchClosure: matchClosure });
};
MulticastEvent.prototype.Unsubscribe = function (callback, closure, matchClosure) {
    for (var i in this._Listeners) {
        var listener = this._Listeners[i];
        if (listener.Callback === callback) {
            if (listener.Closure && closure && !RefObject.RefEquals(listener.Closure, closure))
                continue;
            if (listener.MatchClosure && matchClosure && !RefObject.RefEquals(listener.MatchClosure, matchClosure))
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

function PropertyInfo() {
    RefObject.call(this);
}
PropertyInfo.InheritFrom(RefObject);
PropertyInfo.Find = function (typeOrObj, name) {
    var isType = typeOrObj instanceof Function;
    var type = isType ? typeOrObj : typeOrObj.constructor;
    var setFunc;
    var getFunc;
    for (var i in type.prototype) {
        if (i.toString() === ("Set" + name))
            setFunc = type.prototype[i];
        if (i.toString() === ("Get" + name))
            getFunc = type.prototype[i];
        if (getFunc && setFunc) {
            var pi = new PropertyInfo();
            pi.Type = type;
            pi.SetFunc = setFunc;
            pi.GetFunc = getFunc;
            return pi;
        }
    }
};
PropertyInfo.prototype.GetValue = function (ro) {
    if (!this.GetFunc)
        return undefined;
    return this.GetFunc.call(ro);
};
PropertyInfo.prototype.SetValue = function (ro, value) {
    if (this.SetFunc)
        this.SetFunc.call(ro, value);
};

