var GridUnitType = {
    Auto: 0,
    Pixel: 1,
    Star: 2
};
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
var Keys = {
    Backspace: 8,
    Enter: 13,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Home: 36,
    End: 35,
    PageUp: 33,
    PageDown: 34,
    Insert: 45,
    Delete: 46,
    Esc: 27,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Space: 32
};
var Stretch = {
    Fill: 0,
    None: 1,
    Uniform: 2,
    UniformToFill: 3
};
var ScrollBarVisibility = {
    Disabled: 0,
    Auto: 1,
    Hidden: 2,
    Visible: 3
};

var ScrollEventType = {
	SmallDecrement: 0,
	SmallIncrement: 1,
	LargeDecrement: 2,
	LargeIncrement: 3,
	ThumbPosition: 4,
	ThumbTrack: 5,
	First: 6,
	Last: 7,
	EndScroll: 8
};


var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};
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

var RelativeSourceMode = {
    TemplatedParent: 1,
    Self: 2
};
var BindingMode = {
    TwoWay: 0,
    OneWay: 1,
    OneTime: 2,
    OneWayToSource: 3
};
var UpdateSourceTrigger = {
    Default: 0,
    Explicit: 3
};
var _PropertyNodeType = {
    AttachedProperty: 0,
    Property: 1,
    Indexed: 2,
    None: 3
};

var DebugLevel = {
    Info: 0,
    Debug: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4
};
function Console(level) {
    this._Queue = [];
    this._Level = level;
}
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
HUD.prototype = new Object;
HUD.prototype.constructor = HUD;
function HUD(jSelector) {
    this._Selector = jSelector;
};
HUD.prototype.SetMessage = function (message) {
    $(this._Selector)[0].innerText = message;
};
var HUDs = [];
function AbstractMethod(method) {
    Warn("Abstract Method [" + method + "]");
}
function NotImplemented(method) {
    Warn("Not Implemented [" + method + "]");
}
function Info(message) {
    if (_Console._Level <= DebugLevel.Info) {
        if (console.info)
            console.info(message);
        else
            _Console.WriteLine("<i>INFO</i>: " + message);
    }
}
function Debug(message) {
    if (_Console._Level <= DebugLevel.Debug) {
        if (console.log)
            console.log(message);
        else
            _Console.WriteLine("<i>DEBUG</i>: " + message);
    }
}
function Warn(message) {
    if (_Console._Level <= DebugLevel.Warn) {
        if (console.warn)
            console.warn(message);
        else
            _Console.WriteLine("<i>WARN</i>: " + message, "#FF6A00");
    }
}
function Error(error) {
    if (_Console._Level <= DebugLevel.Error) {
        if (console.error)
            console.error(error.toString());
        else
            _Console.WriteLine("<b>ERROR</b>: " + error.toString(), "#0026FF");
    }
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

var FocusManager = {};
FocusManager.GetFocusedElement = function () {
    return App.Instance.MainSurface._FocusedElement;
};

var AlignmentX = {
    Left: 0,
    Center: 1,
    Right: 2
};
var AlignmentY = {
    Top: 0,
    Center: 1,
    Bottom: 2
};
var Stretch = {
    None: 0,
    Fill: 1,
    Uniform: 2,
    UniformToFill: 3
};
var BrushMappingMode = {
    Absolute: 0,
    RelativeToBoundingBox: 1
};
var PenLineCap = {
    Flat: 0,
    Square: 1,
    Round: 2,
    Triangle: 3
};
var PenLineJoin = {
    Miter: 0,
    Bevel: 1,
    Round: 2
};
var SweepDirection = {
    Counterclockwise: 0,
    Clockwise: 1
};
var FillRule = {
    EvenOdd: 0,
    Nonzero: 1
};

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
	Disabled: 0,
	Auto: 1,
	Hidden: 2,
	Visible: 3
};
var ClickMode = {
    Release: 0,
    Press: 1,
    Hover: 2
};
var CursorType = {
    Default: "",
    Hand: "pointer",
    IBeam: "text",
    Wait: "wait",
    SizeNESW: "ne-resize",
    SizeNWSE: "nw-resize",
    SizeNS: "n-resize",
    SizeWE: "w-resize"
};
var DurationType = {
    Automatic: 0,
    Forever: 1,
    TimeSpan: 2
};
var RectOverlap = {
    Out: 0,
    In: 1,
    Part: 2
};
var MatrixTypes = {
    Identity: 0,
    Unknown: 1,
    Translate: 2,
    Scale: 4,
    Rotate: 8,
    Shear: 16
};

function Enum(object) {
    this.Object = object;
}

Object.Clone = function (o) {
    return eval(uneval(o));
};
/*
Function.prototype.Implement = function (interface) {
    var interfaceName = (new interface())._TypeName;
    for (var i in interface.prototype) {
        if (!this.prototype[i])
            this.prototype[i] = new Function("throw new NotImplementedException();");
    }
    if (this._Interfaces == null)
        this._Interfaces = [];
    this._Interfaces[interfaceName] = true;
    return this;
};
Function.prototype.DoesImplement = function (interface) {
    if (!this._Interfaces)
        return false;
    var interfaceName = (new interface())._TypeName;
    return this._Interfaces[interfaceName] === true;
};
*/
Function.prototype.Clone = function () {
    return eval(uneval(this));
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
Array.indexOfNullstone = function (arr, ns) {
    for (var i = 0; i < arr.length; i++) {
        if (Nullstone.RefEquals(arr[i], ns))
            return i;
    }
    return -1;
};
Array.containsNullstone = function (arr, ns) {
    return Array.indexOfNullstone(arr, ns) > -1;
};
Array.addDistinctNullstone = function (arr, ns) {
    if (Array.containsNullstone(arr, ns))
        return false;
    arr.push(ns);
    return true;
};
Array.removeNullstone = function (arr, ns) {
    var index = Array.indexOfNullstone(arr, ns);
    if (index > -1)
        arr.splice(index, 1);
};
Number.isNumber = function (o) {
    return typeof o == "number";
};
String.isString = function (o) {
    return typeof o == "string";
};
String.contains = function (str, match) {
    if (!str)
        return false;
    if (!match)
        return false;
    var j = 0;
    for (var i = 0; i < str.length && j < match.length; i++) {
        if (str.charAt(i) === match.charAt(j))
            j++;
        else
            j = 0;
    }
    return j >= match.length;
};
String.format = function (culture, format, str) {
    return str;
};
window.onerror = function (msg, url, line) {
    alert("Error (" + url + ") @ " + line + "\n" + msg);
};
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 200);
        };
    })();

var DoubleUtil = {};
DoubleUtil.AreClose = function (val1, val2) {
    if (val1 === val2)
        return true;
    var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516E-16;
    var num2 = val1 - val2;
    return -num1 < num2 && num1 > num2;
};
DoubleUtil.LessThan = function (val1, val2) {
    if (val1 >= val2)
        return false;
    return !DoubleUtil.AreClose(val1, val2);
};
DoubleUtil.GreaterThan = function (val1, val2) {
    if (val1 <= val2)
        return false;
    return !DoubleUtil.AreClose(val1, val2);
};
DoubleUtil.IsZero = function (val) {
    return Math.abs(val) < 1.11022302462516E-15;
};
var PointUtil = {};
PointUtil.AreClose = function (p1, p2) {
    if (!DoubleUtil.AreClose(p1.X, p2.X))
        return false;
    return DoubleUtil.AreClose(p1.Y, p2.Y);
};

var PathEntryType = {
    Move: 0,
    Line: 1,
    Rect: 2,
    Quadratic: 3,
    Bezier: 4,
    Arc: 5,
    ArcTo: 6,
    Close: 7
};
var ShapeFlags = {
    Empty: 1,
    Normal: 2,
    Degenerate: 4,
    Radii: 8
};

var _BreakType = {
    Unknown: 0,
    Space: 1,
    OpenPunctuation: 2,
    ClosePunctuation: 3,
    InFixSeparator: 4,
    Numeric: 5,
    Alphabetic: 6,
    WordJoiner: 7,
    ZeroWidthSpace: 8,
    BeforeAndAfter: 9,
    NonBreakingGlue: 10,
    Inseparable: 11,
    Before: 12,
    Ideographic: 13,
    CombiningMark: 14,
    Contingent: 15,
    Ambiguous: 16,
    Quotation: 17,
    Prefix: 18
};
var _LayoutWordType = {
    Unknown: 0,
    Numeric: 1,
    Alphabetic: 2,
    Ideographic: 3,
    Inseparable: 4
};
var _CharType = {
};

var Nullstone = {};
Nullstone._LastID = 0;
Nullstone._LastTypeID = 1;
Nullstone.Create = function (typeName, parent, argCount, interfaces) {
    var s;
    if (argCount) {
        s = "";
        for (var i = 0; i < argCount; i++) {
            if (s)
                s += ", arguments[" + i + "]";
            else
                s += "arguments[" + i + "]";
        }
    }
    else
        s = "arguments";
    var code = "if (!Nullstone.IsReady) return;" +
        "Nullstone._LastID = this._ID = Nullstone._LastID + 1;" +
        "if (this.Init) this.Init(" + s + ");"
    var f = new Function(code);
    f._IsNullstone = true;
    f._TypeName = typeName;
    Nullstone._LastTypeID = f._TypeID = Nullstone._LastTypeID + 1;
    f._BaseClass = parent;
    if (!parent) parent = Object;
    Nullstone.IsReady = false;
    f.prototype = new parent;
    f.prototype.constructor = f;
    Nullstone.IsReady = true;
    f.Instance = {};
    f.Interfaces = interfaces;
    return f;
}
Nullstone.FinishCreate = function (f) {
    if (f.Interfaces) {
        for (var i = 0; i < f.Interfaces.length; i++) {
            var it = f.Interfaces[i].Instance;
            for (var m in it) {
                if (!(m in f.prototype))
                    throw new NotImplementedException(f, it, m);
            }
        }
    }
    for (var k in f.Instance) {
        if ((k in f.prototype) && f._BaseClass != null) {
            f.prototype[k + '$' + f._BaseClass._TypeName] = f.prototype[k];
        }
        f.prototype[k] = f.Instance[k];
    }
    delete f['Instance'];
};
Nullstone.RefEquals = function (obj1, obj2) {
    if (obj1 == null && obj2 == null)
        return true;
    if (obj1 == null || obj2 == null)
        return false;
    if (obj1.constructor._IsNullstone && obj2.constructor._IsNullstone)
        return obj1._ID === obj2._ID;
    return false;
};
Nullstone.Equals = function (val1, val2) {
    if (val1 == null && val2 == null)
        return true;
    if (val1 == null || val2 == null)
        return false;
    if (val1.constructor._IsNullstone && val2.constructor._IsNullstone)
        return val1._ID === val2._ID;
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};
Nullstone.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    if (Nullstone.DoesImplement(obj, type))
        return obj;
    return null;
};
Nullstone.DoesInheritFrom = function (t, type) {
    var temp = t;
    while (temp != null && temp._TypeName !== type._TypeName) {
        temp = temp._BaseClass;
    }
    return temp != null;
};
Nullstone.DoesImplement = function (obj, interfaceType) {
    if (!obj.constructor._IsNullstone)
        return false;
    if (!obj.constructor.Interfaces)
        return false;
    return interfaceType in obj.constructor.Interfaces;
};

var PropertyInfo = Nullstone.Create("PropertyInfo");
PropertyInfo.Find = function (typeOrObj, name) {
    var isType = typeOrObj instanceof Function;
    var type = isType ? typeOrObj : typeOrObj.constructor;
    var setFunc;
    var getFunc;
    for (var i in type.Instance) {
        if (i.toString() === ("Set" + name))
            setFunc = type.Instance[i];
        if (i.toString() === ("Get" + name))
            getFunc = type.Instance[i];
        if (getFunc && setFunc) {
            var pi = new PropertyInfo();
            pi.Type = type;
            pi.SetFunc = setFunc;
            pi.GetFunc = getFunc;
            return pi;
        }
    }
};
PropertyInfo.Instance.GetValue = function (ro) {
    if (!this.GetFunc)
        return undefined;
    return this.GetFunc.call(ro);
};
PropertyInfo.Instance.SetValue = function (ro, value) {
    if (this.SetFunc)
        this.SetFunc.call(ro, value);
};
Nullstone.FinishCreate(PropertyInfo);

var RoutedEvent = Nullstone.Create("RoutedEvent");
RoutedEvent.Instance.Init = function () {
    this._Listeners = [];
};
RoutedEvent.Instance.Subscribe = function (pre, on, post, closure) {
    this._Listeners.push({
        PreCallback: pre,
        Callback: on,
        PostCallback: post,
        Closure: closure
    });
};
RoutedEvent.Instance.Raise = function () {
};
Nullstone.FinishCreate(RoutedEvent);

var Timer = Nullstone.Create("Timer");
Timer.Instance.Init = function () {
    this.Tick = new MulticastEvent();
    this.SetInterval(0);
};
Timer.Instance.GetInterval = function () {
    return this._Interval;
};
Timer.Instance.SetInterval = function (value) {
    var isChanged = this._Interval !== value;
    this._Interval = value;
    if (isChanged && this.IsEnabled) {
        this.Stop();
        this.Start();
    }
};
Timer.Instance.Start = function () {
    if (this.IsEnabled)
        return;
    this.IsEnabled = true;
    var timer = this;
    this._IntervalID = setInterval(function () { timer.Tick.Raise(this, new EventArgs()); }, this.GetInterval().GetJsDelay());
};
Timer.Instance.Stop = function () {
    if (!this.IsEnabled)
        return;
    this.IsEnabled = false;
    clearInterval(this._IntervalID);
};
Nullstone.FinishCreate(Timer);

var RawPath = Nullstone.Create("RawPath");
RawPath.Instance.Init = function () {
    this._Path = [];
};
RawPath.Instance.Move = function (x, y) {
    this._Path.push({
        type: PathEntryType.Move,
        x: x,
        y: y
    });
};
RawPath.Instance.Line = function (x, y) {
    this._Path.push({
        type: PathEntryType.Line,
        x: x,
        y: y
    });
};
RawPath.Instance.Rect = function (x, y, width, height) {
    this._Path.push({
        type: PathEntryType.Rect,
        x: x,
        y: y,
        width: width,
        height: height
    });
};
RawPath.Instance.RoundedRect = function (left, top, width, height, radiusX, radiusY) {
    if (radiusX === 0.0 && radiusY === 0.0) {
        this.Rect(left, top, width, height);
        return;
    }
    var right = left + width;
    var bottom = top + height;
    this.Move(left + radiusX, top);
    this.Line(right - radiusX, top);
    this.Quadratic(right, top, right, top + radiusY);
    this.Line(right, bottom - radiusY);
    this.Quadratic(right, bottom, right - radiusX, bottom);
    this.Line(left + radiusX, bottom);
    this.Quadratic(left, bottom, left, bottom - radiusY);
    this.Line(left, top + radiusY);
    this.Quadratic(left, top, left + radiusX, top);
};
RawPath.Instance.Quadratic = function (cpx, cpy, x, y) {
    this._Path.push({
        type: PathEntryType.Quadratic,
        cpx: cpx,
        cpy: cpy,
        x: x,
        y: y
    });
};
RawPath.Instance.Bezier = function (cp1x, cp1y, cp2x, cp2y, x, y) {
    this._Path.push({
        type: PathEntryType.Bezier,
        cp1x: cp1x,
        cp1y: cp1y,
        cp2x: cp2x,
        cp2y: cp2y,
        x: x,
        y: y
    });
};
RawPath.Instance.Ellipse = function (x, y, width, height) {
    var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
    var ox = width / 2 * kappa;
    var oy = height / 2 * kappa;
    var right = x + width;
    var bottom = y + height;
    var centerX = x + width / 2;
    var centerY = y + height / 2;
    this.Move(x, centerY);
    this.Bezier(x, centerY - oy, centerX - ox, y, centerX, y);
    this.Bezier(centerX + ox, y, right, centerY - oy, right, centerY);
    this.Bezier(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
    this.Bezier(centerX - ox, bottom, x, centerY + oy, x, centerY);
};
RawPath.Instance.EllipticalArc = function (width, height, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey) {
    NotImplemented("EllipticalArc");
};
RawPath.Instance.Arc = function (x, y, r, sAngle, eAngle, aClockwise) {
    this._Path.push({
        type: PathEntryType.Arc,
        x: x,
        y: y,
        r: r,
        sAngle: sAngle,
        eAngle: eAngle,
        aClockwise: aClockwise
    });
};
RawPath.Instance.ArcTo = function (cpx, cpy, x, y, radius) {
    this._Path.push({
        type: PathEntryType.ArcTo,
        cpx: cpx,
        cpy: cpy,
        x: x,
        y: y,
        r: radius
    });
};
RawPath.Instance.Close = function () {
    this._Path.push({
        type: PathEntryType.Close
    });
};
RawPath.Instance.Draw = function (ctx) {
    var canvasCtx = ctx.GetCanvasContext();
    canvasCtx.beginPath();
    var backing = this._Path;
    for (var i = 0; i < backing.length; i++) {
        var p = backing[i];
        switch (p.type) {
            case PathEntryType.Move:
                canvasCtx.moveTo(p.x, p.y);
                break;
            case PathEntryType.Line:
                canvasCtx.lineTo(p.x, p.y);
                break;
            case PathEntryType.Rect:
                canvasCtx.rect(p.x, p.y, p.width, p.height);
                break;
            case PathEntryType.Quadratic:
                canvasCtx.quadraticCurveTo(p.cpx, p.cpy, p.x, p.y);
                break;
            case PathEntryType.Bezier:
                canvasCtx.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
                break;
            case PathEntryType.Arc:
                canvasCtx.arc(p.x, p.y, p.r, p.sAngle, p.eAngle, p.aClockwise);
                break;
            case PathEntryType.ArcTo:
                canvasCtx.arcTo(p.cpx, p.cpy, p.x, p.y, p.r);
                break;
            case PathEntryType.Close:
                canvasCtx.closePath();
                break;
        }
    }
};
RawPath.Instance.CalculateBounds = function (thickness) {
    var backing = this._Path;
    var startX, startY;
    var xMin = xMax = yMin = yMax = null;
    var xRange, yRange;
    for (var i = 0; i < backing.length; i++) {
        var p = backing[i];
        switch (p.type) {
            case PathEntryType.Move:
                if (xMin == null && yMin == null) {
                    xMin = xMax = p.x;
                    yMin = yMax = p.y;
                } else {
                    xMin = Math.min(p.x, xMin);
                    yMin = Math.min(p.y, yMin);
                    xMax = Math.max(p.x, xMax);
                    yMax = Math.max(p.y, yMax);
                }
                startX = p.x;
                startY = p.y;
                break;
            case PathEntryType.Line:
                xMin = Math.min(p.x, xMin);
                yMin = Math.min(p.y, yMin);
                xMax = Math.max(p.x, xMax);
                yMax = Math.max(p.y, yMax);
                startX = p.x;
                startY = p.y;
                break;
            case PathEntryType.Rect: //does not use current x,y
                xMin = Math.min(p.x, xMin);
                yMin = Math.min(p.y, yMin);
                xMax = Math.max(p.x + p.width, xMax);
                yMax = Math.max(p.y + p.height, yMax);
                break;
            case PathEntryType.Quadratic:
                xRange = RawPath._CalculateQuadraticBezierRange(startX, p.cpx, p.x);
                xMin = Math.min(xMin, xRange.min);
                xMax = Math.max(xMax, xRange.max);
                yRange = RawPath._CalculateQuadraticBezierRange(startY, p.cpy, p.y);
                yMin = Math.min(yMin, yRange.min);
                yMax = Math.max(yMax, yRange.max);
                startX = p.x;
                startY = p.y;
                break;
            case PathEntryType.Bezier:
                xRange = RawPath._CalculateCubicBezierRange(startX, p.cp1x, p.cp2x, p.x);
                xMin = Math.min(xMin, xRange.min);
                xMax = Math.max(xMax, xRange.max);
                yRange = RawPath._CalculateCubicBezierRange(startY, p.cp1y, p.cp2y, p.y);
                yMin = Math.min(yMin, yRange.min);
                yMax = Math.max(yMax, yRange.max);
                startX = p.x;
                startY = p.y;
                break;
            case PathEntryType.Arc: //does not use current x,y
                if (p.sAngle !== p.eAngle) {
                    var r = RawPath._CalculateArcRange(p.x, p.y, p.r, p.sAngle, p.eAngle, p.aClockwise);
                    xMin = Math.min(xMin, r.xMin);
                    xMax = Math.max(xMax, r.xMax);
                    yMin = Math.min(yMin, r.yMin);
                    yMax = Math.max(yMax, r.yMax);
                }
                break;
            case PathEntryType.ArcTo:
                var r = RawPath._CalculateArcToRange(startX, startY, p.cpx, p.cpy, p.x, p.y, p.r);
                xMin = Math.min(xMin, r.xMin);
                xMax = Math.max(xMax, r.xMax);
                yMin = Math.min(yMin, r.yMin);
                yMax = Math.max(yMax, r.yMax);
                startX = p.x;
                startY = p.y;
                break;
        }
    }
    return new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
};
RawPath._CalculateQuadraticBezierRange = function (a, b, c) {
    var min = Math.min(a, c);
    var max = Math.max(a, c);
    if (min <= b && b <= max) {
        return {
            min: min,
            max: max
        };
    }
    var t = (a - b) / (a - 2 * b + c);
    var xt = (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
    if (min > b) {
        min = Math.min(min, xt);
    } else {
        max = Math.max(max, xt);
    }
    return {
        min: min,
        max: max
    };
};
RawPath._CalculateCubicBezierRange = function (a, b, c, d) {
    var min = Math.min(a, d);
    var max = Math.max(a, d);
    if ((min <= b && b <= max) && (min <= c && c <= max)) {
        return {
            min: min,
            max: max
        };
    }
    var u = 2 * a - 4 * b + 2 * c;
    var v = b - a;
    var w = -a + 3 * b + d - 3 * c;
    var rt = Math.sqrt(u * u - 4 * v * w);
    if (!isNaN(rt)) {
        var t;
        t = (-u + rt) / (2 * w);
        if (t >= 0 && t <= 1) {
            var ot = 1 - t;
            var xt = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
            min = Math.min(min, xt);
            max = Math.max(max, xt);
        }
        t = (-u - rt) / (2 * w);
        if (t >= 0 && t <= 1) {
            var ot = 1 - t;
            var xt = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
            min = Math.min(min, xt);
            max = Math.max(max, xt);
        }
    }
    return {
        min: min,
        max: max
    };
};
RawPath._CalculateArcRange = function (cx, cy, r, sa, ea, cc) {
    var sx = cx + (r * Math.cos(sa));
    var sy = cy + (r * Math.sin(sa));
    var ex = cx + (r * Math.cos(ea));
    var ey = cy + (r * Math.sin(ea));
    return RawPath._CalculateArcPointsRange(cx, cy, sx, sy, ex, ey, r, cc);
};
RawPath._CalculateArcToRange = function (sx, sy, cpx, cpy, ex, ey, r) {
    NotImplemented("RawPath._CalculateArcToRange");
    return {
        xMin: sx,
        xMax: sx,
        yMin: sy,
        yMax: sy
    };
    var v1x = cpx - sx;
    var v1y = cpy - sy;
    var v2x = ex - cpx;
    var v2y = ey - cpy;
    var theta_outer1 = Math.atan2(Math.abs(v1y), Math.abs(v1x));
    var theta_outer2 = Math.atan2(Math.abs(v2y), Math.abs(v2x));
    var inner_theta = Math.PI - theta_outer1 - theta_outer2;
    var h = r / Math.sin(inner_theta / 2);
    var cx = cpx + h * Math.cos(inner_theta / 2 + theta_outer2);
    var cy = cpy + h * Math.sin(inner_theta / 2 + theta_outer2);
    var a = r / Math.tan(inner_theta / 2);
    var sx = cpx + a * Math.cos(theta_outer2 + inner_theta);
    var sy = cpy + a * Math.sin(theta_outer2 + inner_theta);
    var ex = cpx + a * Math.cos(theta_outer2);
    var ey = cpy + a * Math.sin(theta_outer2);
    var cc = true;
    var r = RawPath._CalculateArcPointsRange(cx, cy, sx, sy, ex, ey, r, cc);
    return {
        xMin: Math.min(sx, r.xMin),
        xMax: Math.max(sx, r.xMax),
        yMin: Math.min(sy, r.yMin),
        yMax: Math.max(sy, r.yMax)
    };
};
RawPath._CalculateArcPointsRange = function (cx, cy, sx, sy, ex, ey, r, cc) {
    var xMin = Math.min(sx, ex);
    var xMax = Math.max(sx, ex);
    var yMin = Math.min(sy, ey);
    var yMax = Math.max(sy, ey);
    var xLeft = cx - r;
    if (RawPath._ArcContainsPoint(sx, sy, ex, ey, xLeft, cy, cc)) {
        xMin = Math.min(xMin, xLeft);
    }
    var xRight = cx + r;
    if (RawPath._ArcContainsPoint(sx, sy, ex, ey, xRight, cy, cc)) {
        xMax = Math.max(xMax, xRight);
    }
    var yTop = cy - r;
    if (RawPath._ArcContainsPoint(sx, sy, ex, ey, cx, yTop, cc)) {
        yMin = Math.min(yMin, yTop);
    }
    var yBottom = cy + r;
    if (RawPath._ArcContainsPoint(sx, sy, ex, ey, cx, yBottom, cc)) {
        yMax = Math.max(yMax, yBottom);
    }
    return {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax
    };
};
RawPath._ArcContainsPoint = function (sx, sy, ex, ey, cpx, cpy, cc) {
    var n = (ex - sx) * (cpy - sy) - (cpx - sx) * (ey - sy);
    if (n === 0)
        return true;
    if (n > 0 && cc)
        return true;
    if (n < 0 && !cc)
        return true;
    return false;
};
RawPath.Merge = function (path1, path2) {
    NotImplemented("RawPath.Merge");
};
Nullstone.FinishCreate(RawPath);

var _LayoutWord = Nullstone.Create("_LayoutWord");
_LayoutWord.Instance.Init = function () {
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._BreakOps = null;
    this._Font = new Font();
};
Nullstone.FinishCreate(_LayoutWord);

var _TextBuffer = Nullstone.Create("_TextBuffer", Object);
_TextBuffer.Instance.Init = function () {
    this._Text = null;
};
_TextBuffer.Instance.GetLength = function () {
    if (this._Text == null)
        return 0;
    return this._Text.length;
};
_TextBuffer.Instance.Reset = function () {
    this._Text = null;
};
_TextBuffer.Instance.Prepend = function (str) {
    if (!this._Text)
        this._Text = str;
    else
        this._Text = str + this._Text;
};
_TextBuffer.Instance.Append = function (str) {
    if (!this._Text)
        this._Text = str;
    else
        this._Text += str;
};
_TextBuffer.Instance.Cut = function (start, len) {
    if (!this._Text) {
        this._Text = null;
        return;
    }
    this._Text = this._Text.slice(0, start) + this._Text.slice(start + len);
};
_TextBuffer.Instance.Insert = function (index, str) {
    if (!this._Text)
        this._Text = str;
    else
        this._Text = [this._Text.slice(0, index), str, this._Text.slice(index)].join('');
};
_TextBuffer.Instance.Replace = function (start, len, str) {
    if (!this._Text) {
        this._Text = str;
        return;
    }
    this._Text = [this._Text.slice(0, start), str, this._Text.slice(start + len)].join('');
};
Nullstone.FinishCreate(_TextBuffer);

var TextLayout = Nullstone.Create("TextLayout");
TextLayout.Instance.Init = function () {
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
    this._Lines = [];
    this._IsWrapped = true;
    this._Text = null;
    this._Length = 0;
};
TextLayout.Instance.GetSelectionLength = function () {
    return this._SelectionLength;
};
TextLayout.Instance.GetSelectionStart = function () {
    return this._SelectionStart;
};
TextLayout.Instance.GetLineStackingStrategy = function () {
    return this._Strategy;
};
TextLayout.Instance.SetLineStackingStrategy = function (value) {
    if (this._Strategy == value)
        return false;
    this._Strategy = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetTextAttributes = function () {
    return this._Attributes;
};
TextLayout.Instance.SetTextAttributes = function (value) {
    if (this._Attributes) {
        this._Attributes._Clear(true);
    }
    this._Attributes = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetTextAlignment = function () {
    return this._Alignment;
};
TextLayout.Instance.SetTextAlignment = function (value) {
    if (this._Alignment == value)
        return false;
    this._Alignment = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetTextTrimming = function () {
    return this._Trimming;
};
TextLayout.Instance.SetTextTrimming = function (value) {
    if (this._Trimming == value)
        return false;
    this._Trimming = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetTextWrapping = function () {
    return this._Wrapping;
};
TextLayout.Instance.SetTextWrapping = function (value) {
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
TextLayout.Instance.GetLineHeight = function () {
    return this._LineHeight;
};
TextLayout.Instance.SetLineHeight = function (value) {
    if (this._LineHeight == value)
        return false;
    this._LineHeight = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetMaxHeight = function () {
    return this._MaxHeight;
};
TextLayout.Instance.SetMaxHeight = function (value) {
    if (this._MaxHeight == value)
        return false;
    this._MaxHeight = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetMaxWidth = function () {
    return this._MaxWidth;
};
TextLayout.Instance.SetMaxWidth = function (value) {
    if (value === 0.0)
        value = Number.POSITIVE_INFINITY;
    if (this._MaxWidth === value)
        return false;
    if (!this._IsWrapped && (!isFinite(value) || value > this._ActualWidth)) {
        this._MaxWidth = value;
        return false;
    }
    this._MaxWidth = value;
    this._ResetState();
    return true;
};
TextLayout.Instance.GetAvailableWidth = function () {
    return this._AvailableWidth;
};
TextLayout.Instance.SetAvailableWidth = function (value) {
    this._AvailableWidth = value;
    return false;
};
TextLayout.Instance.GetText = function () {
    return this._Text;
};
TextLayout.Instance.SetText = function (value, length) {
    if (value) {
        this._Text = value;
        this._Length = length == -1 ? value.length : length;
    } else {
        this._Text = null;
        this._Length = 0;
    }
    this._ResetState();
    return true;
};
TextLayout.Instance.GetBaselineOffset = function () {
    if (this._Lines.length === 0)
        return 0;
    var line = this._Lines[0];
    return line._Height + line._Descend;
};
TextLayout.Instance.OverrideLineHeight = function () {
    return this.GetLineStackingStrategy() === LineStackingStrategy.BlockLineHeight && this.GetLineHeight() !== 0;
};
TextLayout.Instance.GetLineHeightOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseHeight;
    return this.GetLineHeight();
};
TextLayout.Instance.GetDescendOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseDescent;
    if (this._BaseHeight == 0.0)
        return 0.0;
    return this.GetLineHeight() * (this._BaseDescent / this._BaseHeight);
}
TextLayout.Instance.GetLineFromY = function (offset, y, refIndex) {
    var line = null;
    var y0 = offset.Y;
    var y1;
    for (var i = 0; i < this._Lines.length; i++) {
        line = this._Lines[i];
        y1 = y0 + line._Height; //set y1 to top of next line
        if (y < y1) {
            if (refIndex)
                refIndex.Value = i;
            return line;
        }
        y0 = y1;
    }
    return null;
};
TextLayout.Instance.GetLineFromIndex = function (index) {
    if (index >= this._Lines.length || index < 0)
        return null;
    return this._Lines[index];
};
TextLayout.Instance.GetCursorFromXY = function (offset, x, y) {
    var line;
    if (y < offset.Y) {
        line = this._Lines[0];
    } else if (!(line = this.GetLineFromY(offset, y))) {
        line = this._Lines[this._Lines.length - 1];
    }
    return line.GetCursorFromX(offset, x);
};
TextLayout.Instance.GetSelectionCursor = function (offset, pos) {
    var x0 = offset.X;
    var y0 = offset.Y;
    var height = 0.0;
    var y1 = 0.0;
    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];
        x0 = offset.X + this._HorizontalAlignment(line._Advance);
        y1 = y0 + line._Height + line._Descend;
        height = line._Height;
        if (pos >= cursor + line._Length) {
            if ((i + 1) === this._Lines.length) {
                if (TextLayout._IsLineBreak(this._Text.substr(line._Start + line._Length - 1, 2))) {
                    x0 = offset.X + this._HorizontalAlignment(0.0);
                    y0 += line._Height;
                } else {
                    x0 += line._Advance;
                }
                break;
            }
            cursor += line._Length;
            y0 += line._Height;
            continue;
        }
        for (var j = 0; j < line._Runs.length; j++) {
            var run = line._Runs[j];
            end = run._Start + run._Length;
            if (pos >= cursor + run._Length) {
                cursor += run._Length;
                x0 += run._Advance;
                continue;
            }
            if (run._Start === pos)
                break;
            var font = run._Attrs.GetFont();
            x0 += Surface._MeasureWidth(this._Text.slice(run._Start, pos), font);
            break;
        }
        break;
    }
    return new Rect(x0, y0, 1.0, height);
};
TextLayout.Instance._FindLineWithIndex = function (index) {
    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];
        if (index < cursor + line._Length)
            return line;
        cursor += line._Length;
    }
    return null;
};
TextLayout.Instance.Select = function (start, length) {
    if (!this._Text) {
        this._SelectionLength = 0;
        this._SelectionStart = 0;
        return;
    }
    var newSelectionStart;
    var newSelectionLength;
    var index;
    var end;
    if (!false) {
        newSelectionStart = index = start;
        end = index + length;
        newSelectionLength = length;
    } else {
        newSelectionLength = length;
        newSelectionStart = start;
    }
    if (this._SelectionStart === newSelectionStart && this._SelectionLength === newSelectionLength)
        return;
    if (this._SelectionLength > 0 || newSelectionLength > 0)
        this._ClearCache();
    this._SelectionLength = newSelectionLength;
    this._SelectionStart = newSelectionStart;
};
TextLayout.Instance._ClearCache = function () {
    var line;
    for (var i = 0; i < this._Lines.length; i++) {
        line = this._Lines[i];
        for (var j = 0; j < line._Runs.length; j++) {
            line._Runs[i]._ClearCache();
        }
    }
};
TextLayout.Instance._ClearLines = function () {
    this._Lines = [];
};
TextLayout.Instance._ResetState = function () {
    this._ActualHeight = NaN;
    this._ActualWidth = NaN;
};
TextLayout.Instance.GetRenderExtents = function () {
    this.Layout();
    return new Rect(this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
};
TextLayout.Instance.GetActualExtents = function () {
    return new Size(this._ActualWidth, this._ActualHeight);
};
TextLayout.Instance.Layout = function () {
    if (!isNaN(this._ActualWidth))
        return;
    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._IsWrapped = false;
    this._ClearLines();
    if (this._Text == null || !TextLayout._ValidateAttrs(this._Attributes))
        return;
    var word = new _LayoutWord();
    if (this._Wrapping === TextWrapping.Wrap)
        word._BreakOps = [];
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
                line._Height = Math.max(line._Height, font.GetActualHeight());
            }
            this._ActualHeight += line._Height;
            break;
        }
        while (index < end) {
            var linebreak = false;
            var wrapped = false;
            while (index < end) {
                var lineBreakLength = TextLayout._IsLineBreak(this._Text.slice(index, end));
                if (lineBreakLength > 0) {
                    if (line._Length == 0 && !this.OverrideLineHeight()) {
                        line._Descend = font._Descender();
                        line._Height = font.GetActualHeight();
                    }
                    line._Length += lineBreakLength;
                    run._Length += lineBreakLength;
                    index += lineBreakLength;
                    linebreak = true;
                    break;
                }
                word._LineAdvance = line._Advance;
                if (layoutWordFunc(word, this._Text.slice(index, end), this.GetMaxWidth())) {
                    this._IsWrapped = true;
                    wrapped = true;
                }
                if (word._Length > 0) {
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font.GetActualHeight());
                    }
                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    index += word._Length;
                }
                if (wrapped)
                    break;
                word._LineAdvance = line._Advance;
                TextLayout._LayoutLwsp(word, this._Text.slice(index, end), font);
                if (word._Length > 0) {
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font.GetActualHeight());
                    }
                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    index += word._Length;
                }
            }
            var atend = index >= end;
            if (linebreak || wrapped || atend) {
                this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                this._ActualHeight += line._Height;
                if (linebreak || wrapped) {
                    line = new _TextLayoutLine(this, index, index);
                    if (!this.OverrideLineHeight()) {
                        if (end - index < 1) {
                            line._Descend = font._Descender();
                            line._Height = font.GetActualHeight();
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
};
TextLayout.Instance._HorizontalAlignment = function (lineWidth) {
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
TextLayout.Instance._Render = function (ctx, origin, offset) {
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
TextLayout.Instance.__Debug = function () {
    var allText = this.GetText();
    var t = "";
    t += "Lines: " + this._Lines.length.toString() + "\n";
    for (var i = 0; i < this._Lines.length; i++) {
        t += "\tLine " + i.toString() + ":\n";
        t += this._Lines[i].__Debug(allText);
    }
    return t;
};
TextLayout._ValidateAttrs = function (attributes) {
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
TextLayout._LayoutWordWrap = function (word, text, maxWidth) {
    word._Length = 0;
    word._Advance = 0.0;
    var measuredIndex = 0;
    var measuredText = "";
    while (true) {
        var index = text.indexOf(" ", measuredIndex);
        if (index === -1)
            break;
        index += 1; //include " "
        var tempText = text.slice(measuredIndex, index);
        var advance = Surface._MeasureWidth(tempText, word._Font);
        if (isFinite(maxWidth) && (word._LineAdvance + advance) > maxWidth) {
            return true;
        }
        measuredIndex = index;
        measuredText = tempText;
        word._Advance += advance;
        word._LineAdvance += advance;
        word._Length += measuredText.length;
    }
    word._Length = text.length;
    return false;
};
TextLayout._LayoutWordWrapMoon = function (word, text, maxWidth) {
    return false;
    var lineStart = word._LineAdvance == 0.0;
    if (!word._BreakOps)
        word._BreakOps = [];
    word._BreakOps.splice(0, word._BreakOps.length);
    word._Type = _LayoutWordType.Unknown;
    word._Advance = 0.0;
    var op = new _WordBreakOp();
    var ctype;
    var btype = _BreakType.Unknown;
    var fixed = false;
    var newGlyph = false;
    var glyphs = 0;
    var wrap = false;
    var index = 0;
    var end = text.length;
    var start;
    var c;
    while (index < end) {
        start = index;
        c = text.charAt(index);
        index++;
        if (TextLayout._IsLineBreak(text)) {
            index = start;
            break;
        }
        if (btype === _BreakType.ClosePunctuation) {
            btype = TextLayout._GetBreakType(c);
            if (btype !== _BreakType.InFixSeparator) {
                index = start;
                break;
            }
        } else if (btype === _BreakType.InFixSeparator) {
            btype = TextLayout._GetBreakType(c);
            if (word._Type === _LayoutWordType.Numeric) {
                if (btype !== _BreakType.Numeric) {
                    index = start;
                    break;
                }
            } else if (word._Type === _LayoutWordType.Unknown) {
                if (btype !== _BreakType.Alphabetic && btype !== _BreakType.Numeric) {
                    index = start;
                    break;
                }
                fixed = true;
            }
        } else if (btype === _BreakType.WordJoiner) {
            btype = TextLayout._GetBreakType(c);
            fixed = true;
        } else {
            btype = TextLayout._GetBreakType(c);
        }
        if (TextLayout._BreakSpace(c, btype)) {
            index = start;
            break;
        }
        ctype = TextLayout._GetCharType(c);
        if (word._Type === _LayoutWordType.Unknown) {
            word._Type = TextLayout._GetWordType(ctype, btype);
        } else if (btype === _BreakType.OpenPunctuation) {
            index = start;
            break;
        } else if (TextLayout._WordTypeChanged(word._Type, c, ctype, btype)) {
            index = start;
            break;
        }
        var newGlyph = true;
        glyphs++;
        var advance = Surface.MeasureText(c, word._Font).Width;
        word._LineAdvance += advance;
        word._Advance += advance;
        if (newGlyph) {
            op.advance = word._Advance;
            op.index = index;
            op.btype = btype;
            op.c = c;
        }
        word._BreakOps.push(op);
        op = op.Copy();
        if (Number.isFinite(maxWidth) && word._LineAdvance > maxWidth) {
            wrap = true;
            break;
        }
    }
    if (!wrap) {
        word._Length = index;
        return false;
    }
    if (index === end)
        btype = _BreakType.Space;
    while (index < end) {
        start = index;
        c = text.charAt(index);
        index++;
        if (TextLayout._IsLineBreak(text)) {
            btype = _BreakType.Space;
            index = start;
            break;
        }
        btype = TextLayout._GetBreakType(c);
        if (TextLayout._BreakSpace(c, btype)) {
            index = start;
            break;
        }
        var advance = Surface.MeasureText(c, word._Font).Width;
        word._LineAdvance += advance;
        word._Advance += advance;
        word._BreakOps.pop();
        op.advance += advance;
        op.index = index;
        op.count++;
        word._BreakOps.push(op);
        op = op.Copy();
    }
    if (lineStart && glyphs === 1) {
        word._Length = index;
        return true;
    }
    var data = {
        index: index,
        lineStart: lineStart,
        fixed: fixed,
        btype: btype,
        force: false
    };
    while (true) {
        for (var i = word._BreakOps.Length; i > 0; i--) {
            data.op = word._BreakOps[i - 1];
            data.i = i;
            if (TextLayout._LayoutWordWrapSearch(word, data) == true)
                return true;
            btype = data.op._Btype;
            c = data.op._C;
            i = data.i;
            index = data.index;
        }
        if (lineStart && !data.force) {
            data.force = true;
            continue;
        }
        break;
    }
    word._Advance = 0.0;
    word._Length = 0;
    return true;
};
TextLayout._LayoutWordWrapSearch = function (word, data) {
    switch (data.op.btype) {
        case _BreakType.BeforeAndAfter:
            if (i > 1 && i === word._BreakOps.length) {
                data.op = word._BreakOps[data.i - 2];
                data.op.SetWordBasics(word);
                return true;
            } else if (i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
        case _BreakType.NonBreakingGlue:
        case _BreakType.WordJoiner:
            if (data.force && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1) {
                data.op = this._BreakOps[data.i - 2];
                data.i--;
            }
            break;
        case _BreakType.Inseparable:
            if (data.lineStart && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Before:
            if (data.i > 1) {
                data.op = word._BreakOps[data.i - 2];
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.ClosePunctuation:
            if (data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.InFixSeparator)) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1 && !data.force) {
                data.op = word._BreakOps[data.i - 2];
                i--;
            }
            break;
        case _BreakType.InFixSeparator:
            if (data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.Numeric)) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1 && !data.force) {
                data.op = word._BreakOps[data.i - 2];
                if (data.op._Btype === _BreakType.InFixSeparator ||
                    data.op._Btype === _BreakType.ClosePunctuation) {
                    data.op = word._BreakOps[data.i - 1];
                } else {
                    i--;
                }
            }
            break;
        case _BreakType.Alphabetic:
            if ((data.lineStart || data.fixed || data.force) && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Ideographic:
            if (data.i < word._BreakOps.length && data.btype !== _BreakType.NonStarter) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Numeric:
            if (data.lineStart && data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.InFixSeparator)) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.OpenPunctuation:
        case _BreakType.CombiningMark:
        case _BreakType.Contingent:
        case _BreakType.Ambiguous:
        case _BreakType.Quotation:
        case _BreakType.Prefix:
            if (data.force && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        default:
            if (data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
    }
    return false;
};
TextLayout._LayoutWordNoWrap = function (word, text) {
    var advance = Surface.MeasureText(text, word._Font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Length = text.length;
    return false;
};
TextLayout._LayoutLwsp = function (word, text, font) {
    var advance = Surface.MeasureText(text, font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Length = text.length;
};
TextLayout._GetBreakType = function (c) {
    NotImplemented("TextLayout._GetBreakType");
};
TextLayout._GetCharType = function (c) {
    NotImplemented("TextLayout._GetCharType");
};
TextLayout._GetWordType = function (ctype, btype) {
    NotImplemented("TextLayout._GetWordType");
};
TextLayout._BreakSpace = function (c, btype) {
    NotImplemented("TextLayout._BreakSpace");
};
TextLayout._UpdateSelection = function (lines, pre, post) {
};
Nullstone.FinishCreate(TextLayout);

var _TextLayoutGlyphCluster = Nullstone.Create("_TextLayoutGlyphCluster", null, 3);
_TextLayoutGlyphCluster.Instance.Init = function (text, font, selected) {
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
};
_TextLayoutGlyphCluster.Instance._Render = function (ctx, origin, attrs, x, y) {
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Transform(Matrix.CreateTranslate(x, y - y0));
    var brush;
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font.GetActualHeight());
        ctx.FillRect(brush, area); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster._Painter, this._Text, brush, attrs.GetFont());
    if (attrs.IsUnderlined()) {
    }
};
_TextLayoutGlyphCluster._Painter = function (args) {
    var canvasCtx = args[0];
    var text = args[1];
    var foreground = args[2];
    var font = args[3];
    foreground.SetupBrush(canvasCtx);
    canvasCtx.fillStyle = foreground.ToHtml5Object();
    canvasCtx.font = font.ToHtml5Object();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};
Nullstone.FinishCreate(_TextLayoutGlyphCluster);

var _TextLayoutLine = Nullstone.Create("_TextLayoutLine", null, 3);
_TextLayoutLine.Instance.Init = function (layout, start, offset) {
    this._Runs = [];
    this._Layout = layout;
    this._Start = start;
    this._Offset = offset;
    this._Advance = 0.0; //after layout, will contain horizontal distance this line advances
    this._Descend = 0.0;
    this._Height = 0.0;
    this._Width = 0.0;
    this._Length = 0;
};
_TextLayoutLine.Instance.GetCursorFromX = function (offset, x) {
    var run = null;
    var x0 = offset.X + this._Layout._HorizontalAlignment(this._Advance);
    var cursor = this._Offset;
    var text = this._Layout.GetText();
    var index = this._Start;
    var end;
    var c;
    var i;
    for (i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        if (x < (x0 + run._Advance))
            break; // x is somewhere inside this run
        cursor += run._Length;
        index += run._Length;
        x0 += run._Advance;
        run = null;
    }
    if (run != null) {
        index = run._Start;
        end = run._Start + run._Length;
        var font = run._Attrs.GetFont();
        var m;
        var ch;
        while (index < end) {
            ch = index;
            cursor++;
            c = text.charAt(index);
            index++;
            if (c === '\t')
                c = ' ';
            m = Surface._MeasureWidth(c, font);
            if (x <= x0 + (m / 2.0)) {
                index = ch;
                cursor--;
                break;
            }
            x0 += m;
        }
    } else if (i > 0) {
        run = this._Runs[i - 1];
        end = run._Start + run._Length;
        index = run._Start;
        c = end - 1 < 0 ? null : text.charAt(end - 1);
        if (c == '\n') {
            cursor--;
            end--;
            c = end - 1 < 0 ? null : text.charAt(end - 1);
            if (c == '\r') {
                cursor--;
                end--;
            }
        }
    }
    return cursor;
};
_TextLayoutLine.Instance._Render = function (ctx, origin, left, top) {
    var run;
    var x0 = left;
    var y0 = top;
    for (var i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        run._Render(ctx, origin, x0, y0);
        x0 += run._Advance;
    }
};
_TextLayoutLine.Instance.__Debug = function (allText) {
    var t = "";
    t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
    for (var i = 0; i < this._Runs.length; i++) {
        t += "\t\t\tRun " + i.toString() + ": ";
        t += this._Runs[i].__Debug(allText);
        t += "\n";
    }
    return t;
};
Nullstone.FinishCreate(_TextLayoutLine);

var _TextLayoutRun = Nullstone.Create("_TextLayoutRun", null, 3);
_TextLayoutRun.Instance.Init = function (line, attrs, start) {
    this._Clusters = [];
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0; //after layout, will contain horizontal distance this run advances
    this._Length = 0;
};
_TextLayoutRun.Instance._GenerateCache = function () {
    var selectionLength = this._Line._Layout.GetSelectionLength();
    var selectionStart = this._Line._Layout.GetSelectionStart();
    var text = this._Line._Layout.GetText();
    var font = this._Attrs.GetFont();
    var len;
    var index = this._Start;
    var cluster1;
    var cluster2;
    if (selectionLength === 0 || this._Start < selectionStart) {
        len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
        cluster1 = new _TextLayoutGlyphCluster(text.substr(this._Start, len), font);
        this._Clusters.push(cluster1);
        index += len;
    }
    var selectionEnd = selectionStart + selectionLength;
    var runEnd = this._Start + this._Length;
    if (index < runEnd && index < selectionEnd) {
        len = Math.min(runEnd - index, selectionEnd - index);
        cluster2 = new _TextLayoutGlyphCluster(text.substr(index, len), font, true);
        this._Clusters.push(cluster2);
        index += len;
    }
    var cluster3;
    if (index < runEnd) {
        len = runEnd - index;
        cluster3 = new _TextLayoutGlyphCluster(text.substr(index, len), font);
        this._Clusters.push(cluster3);
        index += len;
    }
};
_TextLayoutRun.Instance._ClearCache = function () {
    this._Clusters = [];
};
_TextLayoutRun.Instance._Render = function (ctx, origin, x, y) {
    var x0 = x;
    if (this._Clusters.length === 0)
        this._GenerateCache();
    for (var i = 0; i < this._Clusters.length; i++) {
        var cluster = this._Clusters[i];
        ctx.Save();
        cluster._Render(ctx, origin, this._Attrs, x0, y);
        ctx.Restore();
        x0 += cluster._Advance;
    }
};
_TextLayoutRun.Instance.__Debug = function (allText) {
    return allText.substr(this._Start, this._Length);
};
Nullstone.FinishCreate(_TextLayoutRun);

var _WordBreakOp = Nullstone.Create("_WordBreakOp");
_WordBreakOp.Instance.Init = function () {
    this._Advance = 0.0;
    this._Index = 0;
    this._Btype = 0;
    this._C = '';
};
_WordBreakOp.Instance.Copy = function () {
    var newOp = new _WordBreakOp();
    newOp._Advance = this._Advance;
    newOp._Btype = this._Btype;
    newOp._C = this._C;
    newOp._Index = this._Index;
};
_WordBreakOp.Instance.SetWordBasics = function (word) {
    word._Length = this._Index;
    word._Advance = this._Advance;
};
Nullstone.FinishCreate(_WordBreakOp);

var _TextBoxUndoStack = Nullstone.Create("_TextBoxUndoStack", null, 1);
_TextBoxUndoStack.Instance.Init = function (maxCount) {
    this._MaxCount = maxCount;
    this._ht = [];
};
_TextBoxUndoStack.Instance.IsEmpty = function () {
    return this._ht.length === 0;
};
_TextBoxUndoStack.Instance.Clear = function () {
    this._ht = [];
};
_TextBoxUndoStack.Instance.Push = function (action) {
    this._ht.push(action);
    if (this._ht.length > this._MaxCount)
        this._ht.shift();
};
_TextBoxUndoStack.Instance.Peek = function () {
    if (this._ht.length === 0)
        return null;
    return this._ht[this._ht.length - 1];
};
_TextBoxUndoStack.Instance.Pop = function () {
    if (this._ht.length === 0)
        return null;
    return this._ht.pop();
};
Nullstone.FinishCreate(_TextBoxUndoStack);

var GridLength = Nullstone.Create("GridLength", null, 2);
GridLength.Instance.Init = function (value, unitType) {
    this.Value = value == null ? 0 : value;
    this.Type = unitType == null ? GridUnitType.Auto : unitType;
};
GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};
Nullstone.FinishCreate(GridLength);

var _TextBoxModelChangedEventArgs = Nullstone.Create("_TextBoxModelChangedEventArgs", null, 2);
_TextBoxModelChangedEventArgs.Instance.Init = function (changed, propArgs) {
    this.Changed = changed;
    this.PropArgs = propArgs;
};
Nullstone.FinishCreate(_TextBoxModelChangedEventArgs);

var IScrollInfo = Nullstone.Create("IScrollInfo");
IScrollInfo.Instance.GetCanHorizontallyScroll = function () { };
IScrollInfo.Instance.SetCanHorizontallyScroll = function () { };
IScrollInfo.Instance.GetCanVerticallyScroll = function () { };
IScrollInfo.Instance.SetCanVerticallyScroll = function () { };
IScrollInfo.Instance.GetExtentWidth = function () { };
IScrollInfo.Instance.GetExtentHeight = function () { };
IScrollInfo.Instance.GetViewportWidth = function () { };
IScrollInfo.Instance.GetViewportHeight = function () { };
IScrollInfo.Instance.GetHorizontalOffset = function () { };
IScrollInfo.Instance.SetHorizontalOffset = function (value) { };
IScrollInfo.Instance.GetVerticalOffset = function () { };
IScrollInfo.Instance.SetVerticalOffset = function (value) { };
IScrollInfo.Instance.GetScrollOwner = function () { };
IScrollInfo.Instance.SetScrollOwner = function (value) { };
IScrollInfo.Instance.LineUp = function () { };
IScrollInfo.Instance.LineDown = function () { };
IScrollInfo.Instance.LineLeft = function () { };
IScrollInfo.Instance.LineRight = function () { };
IScrollInfo.Instance.MouseWheelUp = function () { };
IScrollInfo.Instance.MouseWheelDown = function () { };
IScrollInfo.Instance.MouseWheelLeft = function () { };
IScrollInfo.Instance.MouseWheelRight = function () { };
IScrollInfo.Instance.PageUp = function () { };
IScrollInfo.Instance.PageDown = function () { };
IScrollInfo.Instance.PageLeft = function () { };
IScrollInfo.Instance.PageRight = function () { };
Nullstone.FinishCreate(IScrollInfo);

var ScrollData = Nullstone.Create("ScrollData");
ScrollData.Instance.Init = function () {
    this._ClearLayout();
};
ScrollData.Instance._ClearLayout = function () {
    this.CanHorizontallyScroll = false;
    this.CanVerticallyScroll = false;
    this.ScrollOwner = null;
    this.Offset = new Point();
    this.CachedOffset = new Point();
    this.Viewport = new Size();
    this.Extent = new Size();
    this.MaxDesiredSize = new Size();
};
Nullstone.FinishCreate(ScrollData);

var BindingOperations = {
    SetBinding: function (target, dp, binding) {
        if (target == null)
            throw new ArgumentNullException("target");
        if (dp == null)
            throw new ArgumentNullException("dp");
        if (binding == null)
            throw new ArgumentNullException("binding");
        var e = new BindingExpression(binding, target, dp);
        target.$SetValue(dp, e);
        return e;
    }
};

var Fayde = {
    TypeConverters: {
        Thickness: function (str) {
            if (!str)
                return new Thickness();
            var tokens = str.split(",");
            var left, top, right, bottom;
            if (tokens.length === 1) {
                left = top = right = bottom = parseFloat(tokens[0]);
            } else if (tokens.length === 2) {
                left = right = parseFloat(tokens[0]);
                top = bottom = parseFloat(tokens[1]);
            } else if (tokens.length === 4) {
                left = parseFloat(tokens[0]);
                top = parseFloat(tokens[1]);
                right = parseFloat(tokens[2]);
                bottom = parseFloat(tokens[3]);
            } else {
                throw new ParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        },
        CornerRadius: function (str) {
            if (!str)
                return new Thickness();
            var tokens = str.split(",");
            var topLeft, topRight, bottomRight, bottomLeft;
            if (tokens.length === 1) {
                topLeft = topRight = bottomRight = bottomLeft = parseFloat(tokens[0]);
            } else if (tokens.length === 4) {
                topLeft = parseFloat(tokens[0]);
                topRight = parseFloat(tokens[1]);
                bottomLeft = parseFloat(tokens[2]);
                bottomRight = parseFloat(tokens[3]);
            } else {
                throw new ParseException("Cannot parse CornerRadius value '" + str + "'");
            }
        },
        Brush: function (str) {
            return new SolidColorBrush(Fayde.TypeConverters.Color(str));
        },
        Color: function (str) {
            if (!str)
                return new Color(0, 0, 0, 1.0);
            if (str.substr(0, 1) !== "#")
                throw new NotSupportedException("Known Colors are not supported.");
            return Color.FromHex(str);
        }
    },
    TypeConverter: {
        ConvertObject: function (propd, val, objectType, doStringConversion) {
            if (val == null)
                return val;
            var targetType = propd.GetTargetType();
            if (typeof targetType === "function" && targetType._IsNullstone) {
                if (val instanceof targetType)
                    return val;
                var converter = Fayde.TypeConverters[targetType._TypeName];
                if (converter != null)
                    return converter(val);
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    var ret = targetType.Object[val];
                    if (ret)
                        return ret;
                    return val;
                }
            } else if (typeof targetType === "number") {
                if (typeof val === "number")
                    return val;
                return parseFloat(val);
            }
            if (typeof targetType === "string")
                return doStringConversion ? val.toString() : "";
            var tc;
            if (propd._IsAttached) {
            } else {
            }
            return val;
        },
        GeometryFromString: function (val) {
            return Fayde._MediaParser.ParseGeometry(val);
        },
        PointCollectionFromString: function (val) {
            return Fayde._MediaParser.ParsePointCollection(val);
        }
    }
};

var _DeepStyleWalker = Nullstone.Create("_DeepStyleWalker", null, 1);
_DeepStyleWalker.Instance.Init = function (styles) {
    this._Setters = [];
    this._Offset = 0;
    if (styles instanceof Style)
        this._InitializeStyle(styles);
    else if (styles instanceof Array)
        this._InitializeStyles(styles);
};
_DeepStyleWalker.Instance.Step = function () {
    if (this._Offset < this._Setters.length) {
        var s = this._Setters[this._Offset];
        this._Offset++;
        return s;
    }
    return undefined;
};
_DeepStyleWalker.Instance._InitializeStyle = function (style) {
    var dps = [];
    var cur = style;
    while (cur) {
        var setters = cur.GetSetters();
        for (var i = setters.GetCount() - 1; i >= 0; i--) {
            var setter = setters.GetValueAt(i);
            var propd = setter.$GetValue(Setter.PropertyProperty);
            if (!dps[propd]) {
                dps[propd] = true;
                this._Setters.push(setter);
            }
        }
        cur = cur.GetBasedOn();
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};
_DeepStyleWalker.Instance._InitializeStyles = function (styles) {
    if (!styles)
        return;
    var dps = [];
    var stylesSeen = [];
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
                var dpVal = setter.$GetValue(Setter.PropertyProperty);
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
_DeepStyleWalker.SetterSort = function (setter1, setter2) {
    var a = setter1.$GetValue(Setter.PropertyProperty);
    var b = setter2.$GetValue(Setter.PropertyProperty);
    return (a === b) ? 0 : ((a > b) ? 1 : -1);
};
Nullstone.FinishCreate(_DeepStyleWalker);

var _DeepTreeWalker = Nullstone.Create("_DeepTreeWalker", null, 2);
_DeepTreeWalker.Instance.Init = function (top, direction) {
    if (!top)
        return;
    this._WalkList = new LinkedList();
    this._WalkList.Append(new UIElementNode(top));
    this._Last = null;
    this._Direction = _VisualTreeWalkerDirection.Logical;
    if (direction)
        this._Direction = direction;
};
_DeepTreeWalker.Instance.Step = function () {
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
_DeepTreeWalker.Instance.SkipBranch = function () {
    this._Last = null;
};
Nullstone.FinishCreate(_DeepTreeWalker);

var DependencyProperty = Nullstone.Create("DependencyProperty", null, 10);
DependencyProperty._LastID = 0;
DependencyProperty.Instance.Init = function (name, getTargetType, ownerType, defaultValue, autoCreator, coercer, alwaysChange, validator, isCustom, changedCallback, isReadOnly, isAttached) {
    this.Name = name;
    this.GetTargetType = getTargetType;
    this.OwnerType = ownerType;
    this.DefaultValue = defaultValue;
    this._HasDefaultValue = defaultValue != null;
    this._AutoCreator = autoCreator;
    this._IsAutoCreated = autoCreator != null;
    this._Coercer = coercer;
    this._AlwaysChange = alwaysChange;
    this._Validator = validator;
    this._IsCustom = isCustom;
    this._ChangedCallback = changedCallback;
    this._IsReadOnly = isReadOnly === true;
    this._IsAttached = isAttached;
    DependencyProperty._LastID = this._ID = DependencyProperty._LastID + 1;
};
DependencyProperty.Instance.toString = function () {
    return this._ID;
};
DependencyProperty.Instance.GetDefaultValue = function (obj) {
    if (this._HasDefaultValue)
        return this.DefaultValue;
    return this._GetAutoCreatedValue(obj);
};
DependencyProperty.Instance._GetAutoCreatedValue = function (obj) {
    return this._AutoCreator.GetValue(this, obj);
};
DependencyProperty.Instance._HasCoercer = function () {
    return this._Coercer != null;
};
DependencyProperty.Instance._Coerce = function (instance, value, error) {
    if (!this._Coercer)
        return value;
    return this._Coercer.GetValue(instance, this, value, error);
};
DependencyProperty.Instance._Validate = function (instance, propd, value, error) {
    if (!this._Validator)
        return true;
    return this._Validator(instance, propd, value, error);
};
DependencyProperty.Register = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, true, changedCallback);
};
DependencyProperty.RegisterReadOnly = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, true, changedCallback, true);
};
DependencyProperty.RegisterAttached = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, true, changedCallback, false, true);
}
DependencyProperty.RegisterCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, false, changedCallback);
};
DependencyProperty.RegisterReadOnlyCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, false, changedCallback, true);
};
DependencyProperty.RegisterAttachedCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, false, changedCallback, false, true);
}
DependencyProperty.RegisterFull = function (name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback, isReadOnly, isAttached) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = [];
    if (!DependencyProperty._Registered[ownerType._TypeName])
        DependencyProperty._Registered[ownerType._TypeName] = [];
    var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback, isReadOnly, isAttached);
    DependencyProperty._Registered[ownerType._TypeName][name] = propd;
    return propd;
}
DependencyProperty.GetDependencyProperty = function (ownerType, name) {
    var reg = DependencyProperty._Registered;
    if (!reg)
        return null;
    if (ownerType == null)
        return null;
    var reg = reg[ownerType._TypeName];
    var propd;
    if (reg)
        propd = reg[name];
    if (!propd && ownerType != null && ownerType._IsNullstone) {
        propd = DependencyProperty.GetDependencyProperty(ownerType._BaseClass, name);
    }
    return propd;
};
DependencyProperty.ResolvePropertyPath = function (refobj, propertyPath, promotedValues) {
    if (propertyPath.HasDependencyProperty())
        return propertyPath.GetDependencyProperty();
    var path = propertyPath.GetPath();
    if (propertyPath.GetExpandedPath() != null)
        path = propertyPath.GetExpandedPath();
    var data = {
        index: 0,
        end: path.length,
        path: path,
        parenOpen: false,
        tickOpen: false,
        start: path,
        prop: path,
        res: null,
        cloned: false,
        expressionFound: false,
        lu: refobj.Value,
        collection: null,
        promotedValues: promotedValues
    };
    var success;
    while (data.index < data.end) {
        success = true;
        var c = data.path.charAt(data.index);
        data.index++;
        if (c === '(') {
            data.parenOpen = true;
        } else if (c === ')') {
            data.parenOpen = false;
        } else if (c === '\'') {//Ticks only legal in expanded path
            if (propertyPath.GetExpandedPath() == null)
                Warn("The ' character is not legal in property paths.");
            else
                data.tickOpen = !data.tickOpen;
        } else if (c === '.') {
            success = DependencyProperty._HandlePeriod(data);
        } else if (c === '[') {
            success = DependencyProperty._HandleLeftBracket(data);
        } else {
            success = DependencyProperty._HandleDefault(data);
        }
        if (!success) {
            refobj.Value = null;
            return null;
        }
    }
    refobj.Value = data.lu;
    return data.res;
};
DependencyProperty._HandlePeriod = function (data) {
    if (data.tickOpen)
        return true;
    if (data.res != null) {
        var value = null;
        var newLu = null;
        if ((value = data.lu.$GetValue(data.res)) == null)
            return false;
        if ((newLu = Nullstone.As(value, DependencyObject)) == null)
            return false;
        if (data.promotedValues != null && !cloned && data.promotedValues[value._ID] == null && !(value instanceof UIElement)) {
            var clonedValue = Object.Clone(value);
            var clonedDo = Nullstone.As(clonedValue, DependencyObject);
            if (clonedDo != null) {
                newLu = clonedDo;
                data.lu.$SetValue(data.res, clonedValue);
                clonedValue = data.lu.$GetValue(data.res);
                data.promotedValues[clonedValue._ID] = clonedValue;
            }
        }
        data.lu = newLu;
    }
    data.expressionFound = false;
    data.prop = data.path.substr(data.index);
    return true;
};
DependencyProperty._HandleLeftBracket = function (data) {
    if (data.index >= data.end)
        return;
    var hasLeadingZeroes = false;
    while (data.path.charAt(data.index) === '0') {
        hasLeadingZeroes = true;
        data.index++;
    }
    data.i = parseInt(data.path.substr(data.index), 10);
    if (!isNaN(data.i))
        data.index += data.i.toString().length;
    if (isNaN(data.i) && hasLeadingZeroes)
        data.i = 0;
    if (data.path.charAt(data.index) !== ']' || data.path.charAt(data.index + 1) !== '.')
        return true;
    data.prop = data.path = data.path.substr(data.index + 2);
    data.index = 0;
    data.end = data.path.length;
    var value = null;
    if (data.expressionFound) {
        data.expressionFound = false;
        if ((value = data.lu.$GetValue(data.res)) == null)
            return false;
    }
    if ((data.collection = Nullstone.As(value, Collection)) == null)
        return false;
    if ((value = data.collection.GetValueAt(data.i)) == null)
        return false;
    if ((data.lu = Nullstone.As(value, DependencyObject)) == null)
        return false;
    return true;
};
DependencyProperty._HandleDefault = function (data) {
    var explicitType = false;
    data.expressionFound = true;
    var start = data.index - 1;
    var c;
    while (data.index < data.end) {
        c = data.path.charAt(data.index);
        if (!((c !== '.' || data.tickOpen) && (!data.parenOpen || c !== ')') && c !== '['))
            break;
        data.index++;
        if (c === '\'') {
            data.tickOpen = !data.tickOpen;
            if (!data.tickOpen)
                break;
        }
    }
    if (data.index === data.end)
        return false;
    c = data.path.charAt(data.index);
    if (c === '.') {
        if ((data.index - start) === 11 && data.path.substr(start, 11).toLowerCase() === "textelement") { //bug workaround from Blend
            data.type = TextBlock;
            data.explicitType = true;
        } else {
            var s = data.index;
            if (data.path.charAt(data.index - 1) === '\'' && !data.tickOpen) {
                s = data.index - 1;
            }
            var name = data.path.slice(start, s);
            data.type = DependencyProperty._LookupType(name);
            data.explicitType = true;
            if (data.type == null)
                data.type = data.lu.constructor;
        }
        data.index++;
        start = data.index;
        while (data.index < data.end) {
            c = data.path.charAt(data.index);
            if (!((!data.parenOpen || c !== ')') && (c !== '.' || data.tickOpen)))
                break;
            data.index++;
            if (c === '\'') {
                data.tickOpen = !data.tickOpen;
                if (!data.tickOpen)
                    break;
            }
        }
        if (data.index === start)
            return false;
    } else {
        data.type = data.lu.constructor;
        data.explicitType = false;
    }
    c = data.path.charAt(data.index);
    if ((c !== ')' && data.parenOpen) || data.type == null)
        return false;
    name = data.path.slice(start, data.index);
    if ((data.res = DependencyProperty.GetDependencyProperty(data.type, name)) == null && data.lu)
        data.res = DependencyProperty.GetDependencyProperty(data.lu.constructor, name);
    if (data.res == null)
        return false;
    if (!data.res._IsAttached && !(data.lu instanceof data.type)) {
        if ((data.res = DependencyProperty.GetDependencyProperty(data.lu.constructor, name)) == null)
            return false;
    }
    if (data.res._IsAttached && data.explicitType && !data.parenOpen)
        return false;
    return true;
};
DependencyProperty._LookupType = function (name) {
    return eval(name);
};
Nullstone.FinishCreate(DependencyProperty);

var Expression = Nullstone.Create("Expression");
Expression.Instance.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.Instance._OnAttached = function (element) {
    this.SetAttached(true);
};
Expression.Instance._OnDetached = function (element) {
    this.SetAttached(false);
};
Expression.Instance.GetAttached = function () {
    return this._Attached;
};
Expression.Instance.SetAttached = function (value) {
    this._Attached = value;
};
Expression.Instance.GetUpdating = function () {
    return this._Updating;
};
Expression.Instance.SetUpdating = function (value) {
    this._Updating = value;
};
Nullstone.FinishCreate(Expression);

var StaticResourceExpression = Nullstone.Create("StaticResourceExpression", Expression, 5);
StaticResourceExpression.Instance.Init = function (key, target, propd, propName, templateBindingSource) {
    this.Key = key;
    this.Target = target;
    this.Property = propd;
    this.PropertyName = propName;
};
StaticResourceExpression.Instance.GetValue = function () {
    var o;
    var key = this.Key;
    var cur = this.Target;
    while (cur != null) {
        var fe = Nullstone.As(cur, FrameworkElement);
        if (fe != null) {
            o = fe.GetResources().Get(key);
            if (o != null)
                return o;
        }
        var rd = Nullstone.As(cur, ResourceDictionary);
        if (rd != null) {
            o = rd.Get(key);
            if (o != null)
                return o;
        }
        cur = cur._Parent;
    }
    return App.Instance.GetResources().Get(key);
};
StaticResourceExpression.Instance.Resolve = function (parser) {
    var isAttached = false;
    var ownerType = null;
    var prop = this.Property;
    if (prop != null) {
        isAttached = prop._IsAttached;
        ownerType = prop.OwnerType;
    }
    var value = this.GetValue();
    parser.TrySetPropertyValue(this.Target, prop, value, null, isAttached, ownerType, this.PropertyName);
};
Nullstone.FinishCreate(StaticResourceExpression);

var SubPropertyListener = Nullstone.Create("SubPropertyListener", null, 2);
SubPropertyListener.Instance.Init = function (dobj, propd) {
    this._Dobj = dobj;
    this._Propd = propd;
};
SubPropertyListener.Instance.OnSubPropertyChanged = function (sender, args) {
    this._Dobj._OnSubPropertyChanged(this._Propd, sender, args);
};
Nullstone.FinishCreate(SubPropertyListener);

var TemplateBindingExpression = Nullstone.Create("TemplateBindingExpression", Expression, 2);
TemplateBindingExpression.Instance.Init = function (sourcePropd, targetPropd) {
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
};
TemplateBindingExpression.Instance.GetValue = function (propd) {
    var source = this.Target.GetTemplateOwner();
    var value = null;
    if (source != null)
        value = source.$GetValue(this.SourceProperty);
    return value; //TODO: Send through TypeConverter
};
TemplateBindingExpression.Instance._OnAttached = function (element) {
    this._OnAttached$Expression(element);
    this.Target = element;
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        listener = null;
        this.SetListener(listener);
    }
    var c = Nullstone.As(this.Target, ContentControl);
    if (this.TargetProperty._ID === ContentControl.ContentProperty._ID && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }
    var source = this.Target.GetTemplateOwner();
    if (source != null) {
        listener = new PropertyChangedListener(source, this.SourceProperty, this, this.OnPropertyChanged);
        this.SetListener(listener);
    }
};
TemplateBindingExpression.Instance._OnDetached = function (element) {
    this._OnDetached$Expression(element);
    var listener = this.GetListener();
    if (listener == null)
        return;
    var c = Nullstone.As(this.Target, ContentControl);
    if (c != null)
        c._ContentSetsParent = this.SetsParent;
    listener.Detach();
    listener = null;
    this.SetListener(listener);
    this.Target = null;
};
TemplateBindingExpression.Instance.OnPropertyChanged = function (sender, args) {
    try {
        this.SetUpdating(true);
        try {
            this.Target.$SetValue(this.TargetProperty, this.GetValue(null));
        } catch (err2) {
            this.Target.$SetValue(this.TargetProperty, this.TargetProperty.GetDefaultValue(this.Target));
        }
    } catch (err) {
    } finally {
        this.SetUpdating(false);
    }
};
TemplateBindingExpression.Instance.GetListener = function () {
    return this._Listener;
};
TemplateBindingExpression.Instance.SetListener = function (value) {
    this._Listener = value;
};
Nullstone.FinishCreate(TemplateBindingExpression);

var UnsetValue = Nullstone.Create("UnsetValue");
Nullstone.FinishCreate(UnsetValue);

var Validators = {};
Validators.StyleValidator = function (instance, propd, value, error) {
    var parentType = instance.constructor;
    var errorMessage = null;
    if (value != null) {
        var root = null;
        var style = Nullstone.As(value, Style);
        if (style.GetIsSealed()) {
            if (Nullstone.DoesInheritFrom(parentType, style.GetTargetType())) {
                error.SetErrored(BError.XamlParseException, "Style.TargetType (" + style.GetTargetType()._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                return false;
            }
            return true;
        }
        var cycles = [];
        root = style;
        while (root != null) {
            if (cycles[root._ID]) {
                error.SetErrored(BError.InvalidOperation, "Circular reference in Style.BasedOn");
                return false;
            }
            cycles[root._ID] = true;
            root = root.GetBasedOn();
        }
        cycles = null;
        root = style;
        while (root != null) {
            var targetType = root.GetTargetType();
            if (Nullstone.RefEquals(root, style)) {
                if (targetType == null) {
                    error.SetErrored(BError.InvalidOperation, "TargetType cannot be null");
                    return false;
                } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                    error.SetErrored(BError.XamlParseException, "Style.TargetType (" + targetType._TypeName + ") is not a subclass of (" + parentType._TypeName + ")");
                    return false;
                }
            } else if (targetType == null || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                error.SetErrored(BError.InvalidOperation, "Style.TargetType (" + (targetType ? targetType._TypeName : "<Not Specified>") + ") is not a subclass of (" + parentType._TypeName + ")");
                return false;
            }
            parentType = targetType;
            root = root.GetBasedOn();
        }
        style._Seal();
    }
    return true;
};

var VisualTreeHelper = {};
VisualTreeHelper.GetChild = function (d, childIndex) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
    var subtree = fw._GetSubtreeObject();
    var coll = Nullstone.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetValueAt(childIndex);
    var item = Nullstone.As(subtree, UIElement);
    if (item != null && childIndex === 0)
        return item;
    throw new ArgumentOutOfRangeException();
};
VisualTreeHelper.GetChildrenCount = function (d) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
    var subtree = fw._GetSubtreeObject();
    var coll = Nullstone.As(subtree, UIElementCollection);
    if (coll != null)
        return coll.GetCount();
    var item = Nullstone.As(subtree, UIElement);
    if (item != null)
        return 1;
    return 0;
};
VisualTreeHelper.GetParent = function (d) {
    var fw = Nullstone.As(d, FrameworkElement);
    if (fw == null)
        throw new InvalidOperationException("Reference is not a valid visual DependencyObject");
    return Nullstone.As(fw.GetVisualParent(), DependencyObject);
};
VisualTreeHelper.__Debug = function (uie, func) {
    var topLevel = uie;
    if (topLevel != null) {
        while (true) {
            var temp = VisualTreeHelper.GetParent(topLevel);
            if (temp == null)
                break;
            topLevel = temp;
        }
    } else {
        topLevel = App.Instance.MainSurface._TopLevel;
    }
    if (!func)
        func = VisualTreeHelper.__DebugUIElement;
    return VisualTreeHelper.__DebugTree(topLevel, uie, 0, func);
};
VisualTreeHelper.__DebugTree = function (uie, uie2, tabIndex, func) {
    var str = "";
    for (var i = 0; i < tabIndex; i++) {
        str += "\t";
    }
    if (Nullstone.RefEquals(uie, uie2))
        str += "> ";
    str += uie.constructor._TypeName;
    var name = uie.GetName();
    if (name)
        str += " [" + name + "]";
    if (func)
        str += func(uie, tabIndex);
    str += "\n";
    var count = VisualTreeHelper.GetChildrenCount(uie);
    var child;
    for (var i = 0; i < count; i++) {
        child = VisualTreeHelper.GetChild(uie, i);
        str += VisualTreeHelper.__DebugTree(child, uie2, tabIndex + 1, func);
    }
    return str;
};
VisualTreeHelper.__DebugUIElement = function (uie, tabIndex) {
    if (!uie)
        return "";
    var str = "(";
    if (uie.GetVisibility() === Visibility.Visible)
        str += "Visible";
    else
        str += "Collapsed";
    str += " ";
    var p = LayoutInformation.GetVisualOffset(uie);
    if (p)
        str += p.toString();
    var size = new Size(uie.GetActualWidth(), uie.GetActualHeight());
    str += " ";
    str += size.toString();
    str += ")";
    var gridStr = VisualTreeHelper.__DebugGrid(uie, tabIndex);
    if (gridStr)
        str += "\n" + gridStr;
    return str;
};
VisualTreeHelper.__DebugGrid = function (uie, tabIndex) {
    var grid = Nullstone.As(uie, Grid);
    if (grid == null)
        return "";
    var rds = grid.GetRowDefinitions();
    var rcount = rds.GetCount();
    var cds = grid.GetColumnDefinitions();
    var ccount = cds.GetCount();
    var tabs = "";
    for (var i = 0; i < tabIndex; i++) {
        tabs += "\t";
    }
    var str = "";
    if (rcount > 0) {
        str += tabs;
        str += "  Rows (" + rcount + "):\n";
        for (var i = 0; i < rcount; i++) {
            str += tabs;
            str += "\t[" + i + "] -> " + rds.GetValueAt(i).GetActualHeight() + "\n";
        }
    }
    if (ccount > 0) {
        str += tabs;
        str += "  Columns (" + ccount + "):\n";
        for (var i = 0; i < ccount; i++) {
            str += tabs;
            str += "\t[" + i + "] -> " + cds.GetValueAt(i).GetActualWidth() + "\n";
        }
    }
    return str;
};

var _VisualTreeWalker = Nullstone.Create("_VisualTreeWalker", null, 2);
_VisualTreeWalker.Instance.Init = function (obj, direction) {
    if (obj == null)
        return;
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
            if (!(this._Content instanceof UIElementCollection))
                this._Direction = _VisualTreeWalkerDirection.Logical;
        }
    }
};
_VisualTreeWalker.Instance.Step = function () {
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
_VisualTreeWalker.Instance.GetCount = function () {
    if (!this._Content)
        return 0;
    if (!this._Collection)
        return 1;
    return this._Collection.GetCount();
};
Nullstone.FinishCreate(_VisualTreeWalker);

var CollectionChangedArgs = Nullstone.Create("CollectionChangedArgs", null, 4);
CollectionChangedArgs.Instance.Init = function (action, oldValue, newValue, index) {
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
};
CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};
Nullstone.FinishCreate(CollectionChangedArgs);

var CollectionIterator = Nullstone.Create("CollectionIterator", null, 1);
CollectionIterator.Instance.Init = function (collection) {
    this._Collection = collection;
    this._Index = -1;
};
CollectionIterator.Instance.Next = function (error) {
    this._Index++;
    return this._Index < this._Collection.GetCount();
};
CollectionIterator.Instance.Reset = function () {
    this._Index = -1;
};
CollectionIterator.Instance.GetCurrent = function (error) {
    if (this._Index < 0 || this._Index >= this._Collection.GetCount()) {
        error.SetErrored(BError.InvalidOperation, "Index out of bounds.");
        return null;
    }
    return this._Collection.GetValueAt(this._Index);
};
Nullstone.FinishCreate(CollectionIterator);

var ItemChangedArgs = Nullstone.Create("ItemChangedArgs", null, 4);
ItemChangedArgs.Instance.Init = function (item, propd, oldValue, newValue) {
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
};
Nullstone.FinishCreate(ItemChangedArgs);

var _InheritedContext = Nullstone.Create("_InheritedContext", null);
_InheritedContext.Instance.Init = function (args) {
    if (args.length > 2) {
        this._InitFull(args);
    } else if (args.length == 2) {
        this._InitFromObj(args[0], args[1]);
    }
};
_InheritedContext.Instance._InitFull = function (args) {
    this.ForegroundSource = args[0];
    this.FontFamilySource = args[1];
    this.FontStretchSource = args[2];
    this.FontStyleSource = args[3];
    this.FontWeightSource = args[4];
    this.FontSizeSource = args[5];
    this.LanguageSource = args[6];
    this.FlowDirectionSource = args[7];
    this.UseLayoutRoundingSource = args[8];
    this.TextDecorationsSource = args[9];
    this.FontResourceSource = args[10];
};
_InheritedContext.Instance._InitFromObj = function (obj, parentContext) {
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
};
_InheritedContext.Instance.Compare = function (withContext, props) {
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
_InheritedContext.Instance.GetLocalSource = function (obj, prop) {
    var source = null;
    var propd = _InheritedPropertyValueProvider.GetProperty(prop, obj);
    if (propd && obj._GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited)
        source = obj;
    return source;
};
Nullstone.FinishCreate(_InheritedContext);

var _PropertyValueProvider = Nullstone.Create("_PropertyValueProvider", null, 3);
_PropertyValueProvider.Instance.Init = function (obj, propPrecedence, flags) {
    this._Object = obj;
    this._PropertyPrecedence = propPrecedence;
    this._Flags = flags;
};
_PropertyValueProvider.Instance._HasFlag = function (flag) {
    return (this._Flags & flag) != 0;
};
_PropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    AbstractMethod("_PropertyValueProvider.GetPropertyValue(propd)");
};
_PropertyValueProvider.Instance.ForeachValue = function (func, data) {
    if (!func)
        return;
    for (var value in this._ht)
        func(value, this._ht[value], data);
};
_PropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
};
Nullstone.FinishCreate(_PropertyValueProvider);

var _StylePropertyValueProvider = Nullstone.Create("_StylePropertyValueProvider", _PropertyValueProvider, 2);
_StylePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._ht = [];
};
_StylePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_StylePropertyValueProvider.Instance.RecomputePropertyValue = function (propd, reason, error) {
    if ((reason & _ProviderFlags.RecomputesOnClear) == 0)
        return;
    var oldValue = undefined;
    var newValue = undefined;
    var walkPropd = null;
    var walker = new _DeepStyleWalker(this._Style);
    var setter;
    while (setter = walker.Step()) {
        walkPropd = setter.$GetValue(Setter.PropertyProperty);
        if (walkPropd != propd)
            continue;
        newValue = setter.$GetValue(Setter.ConvertedValueProperty);
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_StylePropertyValueProvider.Instance._UpdateStyle = function (style, error) {
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
            oldProp = oldSetter.$GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.$GetValue(Setter.PropertyProperty);
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            oldValue = oldSetter.$GetValue(Setter.ConvertedValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        } else if (oldProp === newProp) {
            oldValue = oldSetter.$GetValue(Setter.ConvertedValueProperty);
            newValue = newSetter.$GetValue(Setter.ConvertedValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            oldValue = null;
            newValue = newSetter.$GetValue(Setter.ConvertedValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }
    this._Style = style;
};
Nullstone.FinishCreate(_StylePropertyValueProvider);

var BindingBase = Nullstone.Create("BindingBase");
BindingBase.Instance.CheckSealed = function () {
    if (this.GetSealed())
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.Instance.Seal = function () {
    this.SetSealed(true);
};
BindingBase.Instance.GetFallbackValue = function () {
    return this._FallbackValue;
};
BindingBase.Instance.SetFallbackValue = function (value) {
    this.CheckSealed();
    this._FallbackValue = value;
};
BindingBase.Instance.GetSealed = function () {
    return this._Sealed;
};
BindingBase.Instance.SetSealed = function (value) {
    this._Sealed = value;
};
BindingBase.Instance.GetStringFormat = function () {
    return this._StringFormat;
};
BindingBase.Instance.SetStringFormat = function (value) {
    this.CheckSealed();
    this._StringFormat = value;
};
BindingBase.Instance.GetTargetNullValue = function () {
    return this._TargetNullValue;
};
BindingBase.Instance.SetTargetNullValue = function (value) {
    this.CheckSealed();
    this._TargetNullValue = value;
};
Nullstone.FinishCreate(BindingBase);

var BindingExpressionBase = Nullstone.Create("BindingExpressionBase", Expression, 3);
BindingExpressionBase.Instance.Init = function (binding, target, propd) {
    if (!binding)
        return;
    this._Cached = false;
    this._CachedValue = null;
    this._Binding = binding;
    this.SetTarget(target);
    this.SetProperty(propd);
    var bindsToView = propd === FrameworkElement.DataContextProperty; //TODO: || propd.GetTargetType() === IEnumerable || propd.GetTargetType() === ICollectionView
    this.SetPropertyPathWalker(new _PropertyPathWalker(binding.GetPath().GetParsePath(), binding.GetBindsDirectlyToSource(), bindsToView, this.GetIsBoundToAnyDataContext()));
    if (binding.GetMode() !== BindingMode.OneTime) {
        var walker = this.GetPropertyPathWalker();
        walker.IsBrokenChanged.Subscribe(this._PropertyPathValueChanged, this);
        walker.ValueChanged.Subscribe(this._PropertyPathValueChanged, this);
    }
};
BindingExpressionBase.Instance.GetValue = function (propd) {
    if (this._Cached)
        return this._CachedValue;
    this._Cached = true;
    if (this.GetPropertyPathWalker().GetIsPathBroken()) {
        this._CachedValue = null;
    } else {
        this._CachedValue = this.GetPropertyPathWalker().GetValueInternal();
    }
    try {
        this._CachedValue = this._ConvertToType(propd, this._CachedValue);
    } catch (err) {
        this._CachedValue = propd.GetDefaultValue(this.GetTarget());
    }
    return this._CachedValue;
};
BindingExpressionBase.Instance._OnAttached = function (element) {
    if (this.GetAttached())
        return;
    this._OnAttached$Expression(element);
    this._CalculateDataSource();
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Subscribe(this._TextBoxLostFocus, this);
    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.GetBinding().GetMode() === BindingMode.TwoWay && this.GetProperty()._IsCustom) {
        var updateDataSourceCallback = function () {
            try {
                if (!this.GetUpdating())
                    this._TryUpdateSourceObject(this.GetTarget().$GetValue(this.GetProperty()));
            } catch (err) {
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.GetTarget(), this.GetProperty(), this, updateDataSourceCallback);
    }
};
BindingExpressionBase.Instance._OnDetached = function (element) {
    if (!this.GetAttached())
        return;
    this._OnDetached$Expression(element);
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Unsubscribe(this._TextBoxLostFocus, this);
    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.GetIsMentorDataContextBound()) {
        targetFE.MentorChanged.Unsubscribe(this._MentorChanged, this);
        this.SetDataContextSource(null);
    } else if (this.GetIsParentDataContextBound()) {
        targetFE.VisualParentChanged.Subscribe(this._ParentChanged, this);
        this.SetDataContextSource(null);
    } else if (this.GetIsSelfDataContextBound()) {
        this.SetDataContextSource(null);
    }
    if (targetFE == null)
        targetFE = this.GetTarget().GetMentor();
    if (targetFE != null && this.GetCurrentError() != null) {
        this.SetCurrentError(null);
    }
    if (this._PropertyListener != null) {
        this._PropertyListener.Detach();
        this._PropertyListener = null;
    }
    this.GetPropertyPathWalker().Update(null);
};
BindingExpressionBase.Instance._TextBoxLostFocus = function () {
    this._UpdateSourceObject();
};
BindingExpressionBase.Instance._TryUpdateSourceObject = function (value) {
    if (!this.GetUpdating() && this.GetBinding().GetUpdateSourceTrigger() === UpdateSourceTrigger.Default) {
        this._UpdateSourceObject(value, false);
    }
};
BindingExpressionBase.Instance._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = GetTarget().$GetValue(GetProperty());
    if (force === undefined)
        force = false;
    if (this.GetBinding().Mode !== BindingMode.TwoWay)
        return;
    var dataError = null;
    var exception = null;
    var oldUpdating = this.GetUpdating();
    var node = this.GetPropertyPathWalker().GetFinalNode();
    try {
        if (this.GetPropertyPathWalker().GetFinalNode().GetIsPathBroken())
            return;
        if (this.GetBinding().GetTargetNullValue() != null) {
            try {
                if (Nullstone.RefEquals(this.GetBinding().GetTargetNullValue(), value))
                    value = null;
            } catch (err) {
            }
        }
        var converter = this.GetBinding().GetConverter();
        if (converter != null) {
            value = converter.ConvertBack(value, node.GetValueType(), this.GetBinding().GetConverterParameter(), /* TODO: Culture */null);
        }
        if (value instanceof String) {
        }
        try {
            if (value != null)
                value = this._ConvertFromTargetToSource(value);
        } catch (err) {
            return;
        }
        if (this._CachedValue == null && value == null)
            return;
        this.SetUpdating(true);
        node.SetValue(value);
        this._CachedValue = value;
    } catch (err) {
        if (this.GetBinding().GetValidatesOnExceptions()) {
            if (err instanceof TargetInvocationException)
                exception = err.InnerException;
            exception = err;
        }
    } finally {
        this.SetUpdating(oldUpdating);
    }
    this._MaybeEmitError(dataError, exception);
};
BindingExpressionBase.Instance._MaybeEmitError = function (message, exception) {
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (fe == null)
        fe = this.GetTarget().GetMentor();
    if (fe == null)
        return;
    if (String.isString(message) && message === "")
        message = null;
    var oldError = this.GetCurrentError();
    if (message != null)
        this.SetCurrentError(new ValidationError(message, null));
    else if (exception != null)
        this.SetCurrentError(new ValidationError(null, exception));
    else
        this.SetCurrentError(null);
    if (oldError != null && this.GetCurrentError() != null) {
        Validation.AddError(fe, this.GetCurrentError());
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError()) {
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
        }
    } else if (oldError != null) {
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
    } else if (this.GetCurrentError() != null) {
        Validation.AddError(fe, this.GetCurrentError());
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
    }
};
BindingExpressionBase.Instance._ConvertFromTargetToSource = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromTargetToSource");
    return value;
};
BindingExpressionBase.Instance._ConvertFromSourceToTarget = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromSourceToTarget");
    return value;
};
BindingExpressionBase.Instance._ConvertToType = function (propd, value) {
    try {
        if (!this.GetPropertyPathWalker().GetIsPathBroken() && this.GetBinding().GetConverter() != null) {
            value = this.GetBinding().GetConverter().Convert(value, this.GetProperty().GetTargetType(), this.GetBinding().GetConverterParameter(), {});
        }
        if (value === DependencyProperty.UnsetValue || this.GetPropertyPathWalker().GetIsPathBroken()) {
            value = this.GetBinding().GetFallbackValue();
            if (value == null)
                value = propd.GetDefaultValue(this.GetTarget());
        } else if (value == null) {
            value = this.GetBinding().GetTargetNullValue();
            if (value == null && this.GetIsBoundToAnyDataContext() && !this.GetBinding().GetPath().GetPath())
                value = propd.GetDefaultValue(this.GetTarget());
        } else {
            var format = this.GetBinding().GetStringFormat();
            if (format) {
                if (!String.contains(format, "{0"))
                    format = "{0:" + format + "}";
                value = String.format({}, format, value);
            }
        }
    } catch (err) {
        return Fayde.TypeConverter.ConvertObject(propd, this.GetBinding().GetFallbackValue(), this.GetTarget().constructor, true);
    }
    return value;
};
BindingExpressionBase.Instance._AttachToNotifyError = function (element) {
    NotImplemented("BindingExpressionBase._AttachToNotifyError");
};
BindingExpressionBase.Instance._NotifyErrorsChanged = function (o, e) {
    NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
};
BindingExpressionBase.Instance._CalculateDataSource = function () {
    var source = null;
    if (this.GetBinding().GetSource() != null) {
        this.GetPropertyPathWalker().Update(this.GetBinding().GetSource());
    } else if (this.GetBinding().GetElementName() != null) {
        source = this._FindSourceByElementName();
        var feTarget = Nullstone.As(this.GetTarget(), FrameworkElement);
        if (feTarget == null)
            feTarget = this.GetTarget().GetMentor();
        if (feTarget == null) {
            this.GetTarget().MentorChanged.Subscribe(this._InvalidateAfterMentorChanged, this);
        } else {
            feTarget.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
        }
        this.GetPropertyPathWalker().Update(source);
    } else if (this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.Self) {
        this.GetPropertyPathWalker().Update(this.GetTarget());
    } else {
        var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
        if (fe != null && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty)) {
            fe.VisualParentChanged.Subscribe(this._ParentChanged, this);
            fe = fe.GetVisualParent();
            this.SetDataContextSource(fe);
        } else {
            if (fe == null) {
                this.GetTarget().MentorChanged.Subscribe(this._MentorChanged, this);
                fe = this.GetTarget().GetMentor();
            }
            if (fe != null && this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
                this.GetPropertyPathWalker().Update(fe.GetTemplateOwner());
            } else {
                this.SetDataContextSource(fe);
            }
        }
    }
};
BindingExpressionBase.Instance.SetDataContextSource = function (value) {
    if (this._DataContextSource != null && this._DataContextPropertyListener != null) {
        this._DataContextPropertyListener.Detach();
        this._DataContextPropertyListener = null;
    }
    this._DataContextSource = value;
    if (this._DataContextSource != null) {
        this._DataContextPropertyListener = new PropertyChangedListener(this._DataContextSource, FrameworkElement.DataContextProperty, this, this._DataContextChanged);
    }
    if (this._DataContextSource != null || this.GetIsMentorDataContextBound())
        this.GetPropertyPathWalker().Update(this._DataContextSource == null ? null : this._DataContextSource.GetDataContext());
};
BindingExpressionBase.Instance._InvalidateAfterMentorChanged = function (sender, e) {
    this.GetTarget().MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
    var source = this._FindSourceByElementName();
    if (source == null) {
        this.GetTarget().GetMentor().Loaded.Subscribe(this._HandleFeTargetLoaded, this);
    } else {
        this.GetPropertyPathWalker().Update(source);
    }
    this._Invalidate();
    this.GetTarget().$SetValue(this.GetProperty(), this);
};
BindingExpressionBase.Instance._HandleFeTargetLoaded = function (sender, e) {
    var fe = sender;
    fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);
    var source = this._FindSourceByElementName();
    if (source != null)
        this.GetPropertyPathWalker().Update(source);
    this._Invalidate();
    this.GetTarget().$SetValue(this.GetProperty(), this);
};
BindingExpressionBase.Instance._FindSourceByElementName = function () {
    var source = null;
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (!fe)
        fe = this.GetTarget().GetMentor();
    while (fe != null && source == null) {
        source = fe.FindName(this.GetBinding().GetElementName());
        if (source == null && fe.GetTemplateOwner() != null)
            fe = fe.GetTemplateOwner();
        else if (fe.GetMentor() != null && ItemsControl.GetItemsOwner(fe.GetMentor()) != null)
            fe = fe.GetMentor();
        else
            fe = null;
    }
    return source;
};
BindingExpressionBase.Instance._Invalidate = function () {
    this._Cached = false;
    this._CachedValue = null;
};
BindingExpressionBase.Instance._MentorChanged = function (sender, e) {
    try {
        var mentor = this.GetTarget().GetMentor();
        if (this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
            if (mentor == null)
                this.GetPropertyPathWalker().Update(null);
            else
                this.GetPropertyPathWalker().Update(menotr.GetTemplateOwner());
            this.Refresh();
        } else {
            this.SetDataContextSource(mentor);
        }
    } catch (err) {
    }
};
BindingExpressionBase.Instance._ParentChanged = function (sender, e) {
    try {
        var targetFE = this.GetTarget();
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
    }
};
BindingExpressionBase.Instance._DataContextChanged = function (sender, e) {
    try {
        var fe = sender;
        this.GetPropertyPathWalker().Update(fe.GetDataContext());
        if (this.GetBinding().GetMode() === BindingMode.OneTime)
            this.Refresh();
    } catch (err) {
        Warn(err.message);
    }
};
BindingExpressionBase.Instance._PropertyPathValueChanged = function () {
    this.Refresh();
};
BindingExpressionBase.Instance.Refresh = function () {
    var dataError = null;
    var exception = null;
    if (!this.GetAttached())
        return;
    var oldUpdating = this.GetUpdating();
    try {
        this.SetUpdating(true);
        this._Invalidate();
        this.GetTarget().$SetValue(this.GetProperty(), this);
    } catch (err) {
        if (this.GetBinding().GetValidatesOnExceptions()) {
            exception = err;
            if (exception instanceof TargetInvocationException)
                exception = exception.InnerException;
        }
    } finally {
        this.SetUpdating(oldUpdating);
    }
    this._MaybeEmitError(dataError, exception);
};
BindingExpressionBase.Instance.GetBinding = function () {
    return this._Binding;
};
BindingExpressionBase.Instance.GetCurrentError = function () {
    return this._CurrentError;
};
BindingExpressionBase.Instance.SetCurrentError = function (/* ValidationError */value) {
    this._CurrentError = value;
};
BindingExpressionBase.Instance.GetCurrentNotifyError = function () {
    return this._CurrentNotifyError;
};
BindingExpressionBase.Instance.SetCurrentNotifyError = function (/* INotifyDataErrorInfo */value) {
    this._CurrentNotifyError = value;
};
BindingExpressionBase.Instance.GetDataContextSource = function () {
    return this._DataContextSource;
};
BindingExpressionBase.Instance.GetDataSource = function () {
    return this.GetPropertyPathWalker().GetSource();
};
BindingExpressionBase.Instance.GetIsBoundToAnyDataContext = function () {
    return !this.GetBinding().GetElementName() && this.GetBinding().GetSource() == null;
};
BindingExpressionBase.Instance.GetIsSelfDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && this.GetProperty() !== FrameworkElement.DataContextProperty;
};
BindingExpressionBase.Instance.GetIsParentDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty);
};
BindingExpressionBase.Instance.GetIsMentorDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && !(this.GetTarget() instanceof FrameworkElement);
};
BindingExpressionBase.Instance.GetTarget = function () {
    return this._Target;
};
BindingExpressionBase.Instance.SetTarget = function (value) {
    this._Target = value;
};
BindingExpressionBase.Instance.GetProperty = function () {
    return this._Property;
};
BindingExpressionBase.Instance.SetProperty = function (value) {
    this._Property = value;
};
BindingExpressionBase.Instance.GetPropertyPathWalker = function () {
    return this._PropertyPathWalker;
};
BindingExpressionBase.Instance.SetPropertyPathWalker = function (value) {
    this._PropertyPathWalker = value;
};
BindingExpressionBase.Instance.GetIsTwoWayTextBoxText = function () {
    return this.GetTarget() instanceof TextBox && this.GetProperty() === TextBox.TextProperty && this.GetBinding().GetMode() === BindingMode.TwoWay;
};
Nullstone.FinishCreate(BindingExpressionBase);

var CurrentChangedListener = Nullstone.Create("CurrentChangedListener", null, 3);
CurrentChangedListener.Instance.Init = function (source, closure, func) {
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    this._Source.CurrentChanged.Subscribe(this, this.OnCurrentChangedInternal);
};
CurrentChangedListener.Instance.Detach = function () {
    if (this._Source != null) {
        this._Source.CurrentChanged.Unsubscribe(this, this.OnCurrentChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
CurrentChangedListener.Instance.OnCurrentChangedInternal = function (s, e) {
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};
Nullstone.FinishCreate(CurrentChangedListener);

var NPCListener = Nullstone.Create("NPCListener", null, 3);
NPCListener.Instance.Init = function (source, closure, func) {
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    if (this._Source)
        this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
};
NPCListener.Instance.Detach = function () {
    this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
};
Nullstone.FinishCreate(NPCListener);

var PropertyChangedListener = Nullstone.Create("PropertyChangedListener", null, 4);
PropertyChangedListener.Instance.Init = function (source, propd, closure, func) {
    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
};
PropertyChangedListener.Instance.Detach = function () {
    if (this._Source != null) {
        this._Source.PropertyChanged.Unsubscribe(this, this.OnPropertyChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
PropertyChangedListener.Instance.OnPropertyChangedInternal = function (s, e) {
    if (e.Property !== this._Property)
        return;
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};
Nullstone.FinishCreate(PropertyChangedListener);

var _PropertyPath = Nullstone.Create("_PropertyPath", null, 2);
_PropertyPath.Instance.Init = function (path, expandedPath) {
    this._Path = path;
    this._ExpandedPath = expandedPath;
};
_PropertyPath.CreateFromParameter = function (parameter) {
    var p = new _PropertyPath();
    p._Propd = Nullstone.As(parameter, DependencyProperty);
    p._Path = null;
    if (parameter instanceof String)
        p._Path = parameter;
    return p;
};
_PropertyPath.Instance.HasDependencyProperty = function () {
    return this._Propd != null;
};
_PropertyPath.Instance.TryResolveDependencyProperty = function (dobj) {
    if (this.HasDependencyProperty())
        return;
    if (dobj == null)
        return;
    this._Propd = dobj.GetDependencyProperty(this.GetPath());
};
_PropertyPath.Instance.GetDependencyProperty = function () {
    return this._Propd;
};
_PropertyPath.Instance.GetPath = function () {
    return this._Propd == null ? this._Path : "(0)";
};
_PropertyPath.Instance.GetExpandedPath = function () {
    return this._Propd == null ? this._ExpandedPath : "(0)";
};
_PropertyPath.Instance.GetParsePath = function () {
    if (this._Propd != null)
        return "(0)";
    if (this._ExpandedPath != null)
        return this._ExpandedPath;
    return this._Path;
};
Nullstone.FinishCreate(_PropertyPath);

var _PropertyPathParser = Nullstone.Create("_PropertyPathParser", null, 1);
_PropertyPathParser.Instance.Init = function (path) {
    this.SetPath(path);
};
_PropertyPathParser.Instance.Step = function (data) {
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
_PropertyPathParser.Instance.GetPath = function () {
    return this._Path;
};
_PropertyPathParser.Instance.SetPath = function (value) {
    this._Path = value;
};
Nullstone.FinishCreate(_PropertyPathParser);

var RelativeSource = Nullstone.Create("RelativeSource", null, 1);
RelativeSource.Instance.Init = function (mode) {
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
};
RelativeSource.Instance.GetMode = function () {
    return this._Mode;
};
RelativeSource.Instance.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};
Nullstone.FinishCreate(RelativeSource);

var Clock = Nullstone.Create("Clock");
Clock.Instance.Init = function () {
    this._Timers = [];
};
Clock.Instance.RegisterTimer = function (timer) {
    if (!Array.addDistinctNullstone(this._Timers, timer))
        return;
    if (this._Timers.length === 1)
        this.RequestAnimationTick();
};
Clock.Instance.UnregisterTimer = function (timer) {
    Array.removeNullstone(this._Timers, timer);
};
Clock.Instance.DoTick = function () {
    var nowTime = new Date().getTime();
    if (!this._RunTimers(this._LastTime, nowTime)) {
        return;
    }
    this._LastTime = nowTime;
    this.RequestAnimationTick();
};
Clock.Instance._RunTimers = function (lastTime, nowTime) {
    if (this._Timers.length === 0)
        return false;
    for (var i = 0; i < this._Timers.length; i++) {
        var timer = this._Timers[i];
        timer._Tick(this._LastTime, nowTime);
    }
    return true;
};
Clock.Instance.RequestAnimationTick = function () {
    var clock = this;
    window.requestAnimFrame(function () { clock.DoTick(); });
};
Nullstone.FinishCreate(Clock);

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
var _DirtyList = Nullstone.Create("_DirtyList");
_DirtyList.Instance.Init = function () {
    this._DirtyNodes = new LinkedList();
};
_DirtyList.Instance.AddDirtyNode = function (node) {
    this._DirtyNodes.Append(node);
};
_DirtyList.Instance.RemoveDirtyNode = function (node) {
    if (!this._DirtyNodes)
        return;
    this._DirtyNodes.Remove(node);
};
_DirtyList.Instance.GetFirst = function () {
    return this._DirtyNodes.First();
};
_DirtyList.Instance.IsEmpty = function () {
    return this._DirtyNodes.IsEmpty();
};
_DirtyList.Instance.Clear = function () {
    this._DirtyNodes.Clear();
};
Nullstone.FinishCreate(_DirtyList);

var _RenderContext = Nullstone.Create("_RenderContext", null, 1);
_RenderContext.Instance.Init = function (surface) {
    this._Surface = surface;
    this._Transforms = [];
};
_RenderContext.Instance.GetSurface = function () {
    return this._Surface;
};
_RenderContext.Instance.GetCanvasContext = function () {
    return this._Surface._Ctx;
};
_RenderContext.Instance.Clip = function (clip) {
    this._DrawClip(clip);
    this._Surface._Ctx.clip();
};
_RenderContext.Instance.IsPointInPath = function (p) {
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.Instance.IsPointInClipPath = function (clip, p) {
    this._DrawClip(clip);
    return this._Surface._Ctx.isPointInPath(p.X, p.Y);
};
_RenderContext.Instance._DrawClip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
    } else if (clip instanceof Geometry) {
        clip.Draw(this);
    }
};
_RenderContext.Instance.Transform = function (matrix) {
    if (matrix instanceof Transform) {
        matrix = matrix.GetMatrix();
    }
    this._CurrentTransform = matrix.MultiplyMatrix(this._CurrentTransform);
    this._InverseTransform = this._InverseTransform.MultiplyMatrix(matrix.GetInverse());
    var els = this._CurrentTransform._Elements;
    this._Surface._Ctx.setTransform(els[0], els[1], els[3], els[4], els[2], els[5]);
};
_RenderContext.Instance.PreTransform = function (matrix) {
    if (matrix instanceof Transform) {
        matrix = matrix.GetMatrix();
    }
    this._CurrentTransform = this._CurrentTransform.MultiplyMatrix(matrix);
    this._InverseTransform = matrix.GetInverse().MultiplyMatrix(this._InverseTransform);
    var els = this._CurrentTransform._Elements;
    this._Surface._Ctx.setTransform(els[0], els[1], els[3], els[4], els[2], els[5]);
};
_RenderContext.Instance.GetCurrentTransform = function () {
    return this._CurrentTransform;
};
_RenderContext.Instance.GetInverseTransform = function () {
    return this._InverseTransform;
};
_RenderContext.Instance.Save = function () {
    this._Surface._Ctx.save();
    this._Transforms.push({ Current: this._CurrentTransform, Inverse: this._InverseTransform });
    this._CurrentTransform = this._CurrentTransform == null ? new Matrix() : this._CurrentTransform.Copy();
    this._InverseTransform = this._InverseTransform == null ? new Matrix() : this._InverseTransform.Copy();
};
_RenderContext.Instance.Restore = function () {
    var temp = this._Transforms.pop();
    this._CurrentTransform = temp.Current;
    this._InverseTransform = temp.Inverse;
    this._Surface._Ctx.restore();
};
_RenderContext.Instance.Fill = function (brush, region) {
    brush.SetupBrush(this._Surface._Ctx, region);
    this._Surface._Ctx.fillStyle = brush.ToHtml5Object();
    this._Surface._Ctx.fill();
};
_RenderContext.Instance.FillRect = function (brush, rect) {
    brush.SetupBrush(this._Surface._Ctx, rect);
    this._Surface._Ctx.fillStyle = brush.ToHtml5Object();
    this._Surface._Ctx.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
};
_RenderContext.Instance.Stroke = function (stroke, thickness, region) {
    stroke.SetupBrush(this._Surface._Ctx, region);
    this._Surface._Ctx.strokeStyle = stroke.ToHtml5Object();
    this._Surface._Ctx.lineWidth = thickness;
    this._Surface._Ctx.stroke();
};
_RenderContext.Instance.Clear = function (rect) {
    this._Surface._Ctx.clearRect(rect.X, rect.Y, rect.Width, rect.Height);
};
_RenderContext.Instance.CustomRender = function (painterFunc) {
    var args = _RenderContext.ToArray(arguments);
    args.shift(); //remove painterFunc
    args.unshift(this._Surface._Ctx); //prepend canvas context
    painterFunc(args);
};
_RenderContext.Instance.SetGlobalAlpha = function (alpha) {
    this._Surface._Ctx.globalAlpha = alpha;
};
_RenderContext.ToArray = function (args) {
    var arr = [];
    for (var i in args)
        arr.push(args[i]);
    return arr;
};
Nullstone.FinishCreate(_RenderContext);

var JsonParser = Nullstone.Create("JsonParser");
JsonParser.Instance.Init = function () {
    this.$SRExpressions = [];
};
JsonParser.Instance.CreateObject = function (json, namescope, ignoreResolve) {
    if (json.Type === ControlTemplate) {
        return new json.Type(json.Props.TargetType, json.Content);
    }
    var dobj = new json.Type();
    dobj.SetTemplateOwner(this._TemplateBindingSource);
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);
    var propd;
    var propValue;
    if (json.Props) {
        for (var propName in json.Props) {
            propValue = json.Props[propName];
            if (propValue == undefined)
                continue;
            propd = dobj.GetDependencyProperty(propName);
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, false, dobj.constructor, propName);
        }
    }
    if (json.AttachedProps) {
        if (!(json.AttachedProps instanceof Array))
            throw new Error("json.AttachedProps is not an array");
        for (var i in json.AttachedProps) {
            var attachedDef = json.AttachedProps[i];
            propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
            propValue = attachedDef.Value;
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, true, attachedDef.Owner, attachedDef.Prop);
        }
    }
    var contentPropd = this.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd instanceof DependencyProperty) {
        if (json.Children) {
            this.TrySetCollectionProperty(json.Children, dobj, contentPropd, namescope);
        } else if (json.Content) {
            var content = json.Content;
            if (content instanceof Markup)
                content = content.Transmute(dobj, contentPropd, "Content", this._TemplateBindingSource);
            else
                content = this.CreateObject(json.Content, namescope, true);
            dobj.$SetValue(contentPropd, content);
        }
    } else if (contentPropd != null && contentPropd.constructor === String) {
        var setFunc = dobj["Set" + contentPropd];
        var getFunc = dobj["Get" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope, true));
        } else if (getFunc) {
            var coll = getFunc.call(dobj);
            for (var j in json.Children) {
                var fobj = this.CreateObject(json.Children[j], namescope, true);
                if (fobj instanceof DependencyObject)
                    fobj._AddParent(coll, true);
                coll.Add(fobj);
            }
        }
    }
    if (!ignoreResolve) {
        this.ResolveStaticResourceExpressions();
    }
    return dobj;
};
JsonParser.Instance.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached, ownerType, propName) {
    if (!propValue.constructor._IsNullstone && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }
    if (propValue instanceof Markup)
        propValue = propValue.Transmute(dobj, propd, propName, this._TemplateBindingSource);
    if (propValue instanceof StaticResourceExpression) {
        this.$SRExpressions.push(propValue);
        return;
    }
    if (propd) {
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;
        if (!(propValue instanceof Expression)) {
            var targetType = propd.GetTargetType();
            if (targetType._IsNullstone && !(propValue instanceof targetType)) {
                var setFunc = dobj["Set" + propName];
                if (setFunc && setFunc.Converter && setFunc.Converter instanceof Function)
                    propValue = setFunc.Converter(propValue);
            }
        }
        dobj.$SetValue(propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propName];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        Warn("Could not find attached property: " + ownerType._TypeName + "." + propName);
    }
};
JsonParser.Instance.TrySetCollectionProperty = function (subJson, dobj, propd, namescope) {
    var targetType = propd.GetTargetType();
    if (!Nullstone.DoesInheritFrom(targetType, Collection))
        return false;
    if (!(subJson instanceof Array))
        return false;
    var coll;
    if (propd._IsAutoCreated) {
        coll = dobj.$GetValue(propd);
    } else {
        coll = new targetType();
        if (coll instanceof DependencyObject)
            coll._AddParent(dobj, true);
        dobj.$SetValue(propd, coll);
    }
    var rd = Nullstone.As(coll, ResourceDictionary);
    for (var i in subJson) {
        var fobj = this.CreateObject(subJson[i], namescope, true);
        if (fobj instanceof DependencyObject)
            fobj._AddParent(coll, true);
        if (rd == null) {
            coll.Add(fobj);
        } else {
            var key = subJson[i].Key;
            if (key)
                rd.Set(key, fobj);
        }
    }
    return true;
};
JsonParser.Instance.ResolveStaticResourceExpressions = function () {
    var srs = this.$SRExpressions;
    if (srs == null)
        return;
    if (srs.length > 0) {
        for (var i = 0; i < srs.length; i++) {
            srs[i].Resolve(this);
        }
    }
    this.$SRExpressions = [];
};
JsonParser.Instance.GetAnnotationMember = function (type, member) {
    if (type == null || !type._IsNullstone)
        return null;
    if (type.Annotations == null)
        return this.GetAnnotationMember(type._BaseClass, member);
    var annotation = type.Annotations[member];
    if (annotation == null)
        return this.GetAnnotationMember(type._BaseClass, member);
    return annotation;
};
JsonParser.CreateSetter = function (dobj, propName, value) {
    var setter = new Setter();
    var propd = dobj.GetDependencyProperty(propName);
    setter.SetProperty(propd);
    setter.SetValue_Prop(value);
    return setter;
};
Nullstone.FinishCreate(JsonParser);

var Markup = Nullstone.Create("Markup");
Markup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    AbstractMethod("Markup.Transmute");
};
Nullstone.FinishCreate(Markup);

var StaticResourceMarkup = Nullstone.Create("StaticResourceMarkup", Markup, 1);
StaticResourceMarkup.Instance.Init = function (key) {
    this.Key = key;
};
StaticResourceMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    return new StaticResourceExpression(this.Key, target, propd, propName, templateBindingSource);
};
Nullstone.FinishCreate(StaticResourceMarkup);

var TemplateBindingMarkup = Nullstone.Create("TemplateBindingMarkup", Markup, 1);
TemplateBindingMarkup.Instance.Init = function (path) {
    this.Path = path;
};
TemplateBindingMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};
Nullstone.FinishCreate(TemplateBindingMarkup);

Fayde._MediaParser = function (str) {
    this.str = str;
    this.len = str.length;
    this.index = 0;
};
Fayde._MediaParser.ParseGeometry = function (str) {
    return (new Fayde._MediaParser(str)).ParseGeometryImpl();
};
Fayde._MediaParser.ParsePointCollection = function (str) {
    return (new Fayde._MediaParser(str)).ParsePointCollectionImpl();
};
Fayde._MediaParser.prototype.ParseGeometryImpl = function () {
    var cp = new Point();
    var cp1, cp2, cp3;
    var start = new Point();
    var fillRule = FillRule.EvenOdd;
    var cbz = false; // last figure is a cubic bezier curve
    var qbz = false; // last figure is a quadratic bezier curve
    var cbzp = new Point(); // points needed to create "smooth" beziers
    var qbzp = new Point(); // points needed to create "smooth" beziers
    var path = new RawPath();
    while (this.index < this.len) {
        var c;
        while (this.index < this.len && (c = this.str.charAt(this.index)) === ' ') {
            this.index++;
        }
        this.index++
        var relative = false;
        switch (c) {
            case 'f':
            case 'F':
                c = this.str.charAt(this.index);
                if (c === '0')
                    fillRule = FillRule.EvenOdd;
                else if (c === '1')
                    fillRule = FillRule.Nonzero;
                else
                    return null;
                this.index++
                c = this.str.charAt(this.index);
                break;
            case 'm':
                relative = true;
            case 'M':
                cp1 = this.ParsePoint(this);
                if (cp1 == null)
                    break;
                if (relative) {
                    cp1.X += cp.X;
                    cp1.Y += cp.Y;
                }
                path.Move(cp1.X, cp1.Y);
                start.X = cp.X = cp1.X;
                start.Y = cp.Y = cp1.Y;
                this.Advance();
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    path.Line(cp1.X, cp1.Y);
                }
                cp.X = cp1.X;
                cp.Y = cp1.Y;
                cbz = qbz = false;
                break;
            case 'l':
                relative = true;
            case 'L':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    path.Line(cp1.X, cp1.Y);
                    cp.X = cp1.X;
                    cp.Y = cp1.Y;
                    this.Advance();
                }
                cbz = qbz = false;
                break;
            case 'h':
                relative = true;
            case 'H':
                var x = this.ParseDouble();
                if (x == null)
                    break;
                if (relative)
                    x += cp.X;
                cp = new Point(x, cp.Y);
                path.Line(cp.X, cp.Y);
                cbz = qbz = false;
                break;
            case 'v':
                relative = true;
            case 'V':
                var y = this.ParseDouble();
                if (y == null)
                    break;
                if (relative)
                    y += cp.Y;
                cp = new Point(cp.X, y);
                path.Line(cp.X, cp.Y);
                cbz = qbz = false;
                break;
            case 'c':
                relative = true;
            case 'C':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp3 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp3.X += cp.X;
                        cp3.Y += cp.Y;
                    }
                    this.Advance();
                    path.Bezier(cp1.X, cp1.Y, cp2.X, cp2.Y, cp3.X, cp3.Y);
                    cp1.X = cp3.X;
                    cp1.Y = cp3.Y;
                }
                cp.X = cp3.X;
                cp.Y = cp3.Y;
                cbz = true;
                cbzp.X = cp2.X;
                cbzp.Y = cp2.Y;
                qbz = false;
                break;
            case 's':
                relative = true;
            case 'S':
                while (this.MorePointsAvailable()) {
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp3 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp3.X += cp.X;
                        cp3.Y += cp.Y;
                    }
                    if (cbz) {
                        cp1.X = 2 * cp.X - cbzp.X;
                        cp1.Y = 2 * cp.Y - cbzp.Y;
                    } else
                        cp1 = cp;
                    path.Bezier(cp1.X, cp1.Y, cp2.X, cp2.Y, cp3.X, cp3.Y);
                    cbz = true;
                    cbzp.X = cp2.X;
                    cbzp.Y = cp2.Y;
                    cp.X = cp3.X;
                    cp.Y = cp3.Y;
                    this.Advance();
                }
                qbz = false;
                break;
            case 'q':
                relative = true;
            case 'Q':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();
                    path.Quadratic(cp1.X, cp1.Y, cp2.X, cp2.Y);
                    cp.X = cp2.X;
                    cp.Y = cp2.Y;
                }
                qbz = true;
                qbzp.X = cp1.X;
                qbzp.Y = cp1.Y;
                cbz = false;
                break;
            case 't':
                relative = true;
            case 'T':
                while (this.MorePointsAvailable()) {
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    if (qbz) {
                        cp1.X = 2 * cp.X - qbzp.X;
                        cp1.Y = 2 * cp.Y - qbzp.Y;
                    } else
                        cp1 = cp;
                    path.Quadratic(cp1.X, cp1.Y, cp2.X, cp2.Y);
                    qbz = true;
                    qbzp.X = cp1.X;
                    qbzp.Y = cp1.Y;
                    cp.X = cp2.X;
                    cp.Y = cp2.Y;
                    this.Advance();
                }
                cbz = false;
                break;
            case 'a':
                relative = true;
            case 'A':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    var angle = this.ParseDouble();
                    var is_large = this.ParseDouble() !== 0;
                    var sweep = this.ParseDouble() !== 0;
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    path.EllipticalArc(cp1.X, cp1.Y, angle, is_large, sweep, cp2.X, cp2.Y);
                    cp.X = cp2.X;
                    cp.Y = cp2.Y;
                    this.Advance();
                }
                cbz = qbz = false;
                break;
            case 'z':
            case 'Z':
                path.Line(start.X, start.Y);
                path.Close();
                path.Move(start.X, start.Y);
                cp.X = start.X;
                cp.Y = start.Y;
                cbz = qbz = false;
                break;
            default:
                break;
        }
    }
    var pg = new PathGeometry();
    pg.$Path = path;
    pg.SetFillRule(fillRule);
    return pg;
};
Fayde._MediaParser.prototype.ParsePointCollectionImpl = function () {
    var p;
    var points = new PointCollection();
    while (this.MorePointsAvailable() && (p = this.ParsePoint()) != null) {
        points.Add(p);
    }
    return points;
};
Fayde._MediaParser.prototype.ParsePoint = function () {
    var x = this.ParseDouble();
    if (x == null)
        return null;
    var c;
    while (this.index < this.len && ((c = this.str.charAt(this.index)) === ' ' || c === ',')) {
        this.index++;
    }
    if (this.index >= this.len)
        return null;
    var y = this.ParseDouble();
    if (y == null)
        return null;
    return new Point(x, y);
};
Fayde._MediaParser.prototype.ParseDouble = function () {
    this.Advance();
    var isNegative = false;
    if (this.Match('-')) {
        isNegative = true;
        this.index++;
    } else if (this.Match('+')) {
        this.index++;
    }
    if (this.Match('Infinity')) {
        this.index += 8;
        return isNegative ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (this.Match('NaN'))
        return NaN;
    var temp = '';
    while (this.index < this.len) {
        var code = this.str.charCodeAt(this.index);
        var c = String.fromCharCode(code);
        if (code >= 48 && code <= 57)
            temp += c;
        else if (code === 46)
            temp += c;
        else if (c === 'E' || c === 'e')
            temp += c;
        else
            break;
        this.index++;
    }
    if (temp.length === 0)
        return null;
    var f = parseFloat(temp);
    return isNegative ? -f : f;
};
Fayde._MediaParser.prototype.Match = function (matchStr) {
    var c1;
    var c2;
    for (var i = 0; i < matchStr.length && (this.index + i) < this.len; i++) {
        c1 = matchStr.charAt(i);
        c2 = this.str.charAt(this.index + i);
        if (c1 !== c2)
            return false;
    }
    return true;
};
Fayde._MediaParser.prototype.Advance = function () {
    var code;
    while (this.index < this.len) {
        code = this.str.charCodeAt(this.index);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57))
            break;
        c = String.fromCharCode(code);
        if (c === '.')
            break;
        if (c === '-')
            break;
        if (c === '+')
            break;
        this.index++;
    }
};
Fayde._MediaParser.prototype.MorePointsAvailable = function () {
    var c;
    while (this.index < this.len && ((c = this.str.charAt(this.index)) === ',' || c === ' ')) {
        this.index++;
    }
    if (this.index >= this.len)
        return false;
    if (c === '.' || c === '-' || c === '+')
        return true;
    var code = this.str.charCodeAt(this.index);
    return code >= 48 && code <= 57;
};

var AnimationStorage = Nullstone.Create("AnimationStorage", null, 3);
AnimationStorage.Instance.Init = function (timeline, targetobj, targetprop) {
    this._Timeline = timeline;
    this._TargetObj = targetobj;
    this._TargetProp = targetprop;
    var prevStorage = targetobj._AttachAnimationStorage(targetprop, this);
    this._BaseValue = this._TargetObj.$GetValue(this._TargetProp);
    if (this._BaseValue === undefined) {
        var targetType = this._TargetProp.GetTargetType();
        if (targetType === Number)
            this._BaseValue = 0;
        else if (targetType === String)
            this._BaseValue = "";
        else
            this._BaseValue = new targetType();
    }
    if (prevStorage != null)
        this.SetStopValue(prevStorage.GetStopValue());
    else
        this.SetStopValue(targetobj.ReadLocalValue(targetprop));
};
AnimationStorage.Instance.GetStopValue = function () {
    return this._StopValue;
};
AnimationStorage.Instance.SetStopValue = function (value) {
    this._StopValue = value;
};
AnimationStorage.Instance.Enable = function () {
    this._Disabled = false;
    this.ApplyCurrentValue();
};
AnimationStorage.Instance.Disable = function () {
    this._Disabled = true;
};
AnimationStorage.Instance.Stop = function () {
    this.DetachFromObject();
    this.ResetPropertyValue();
};
AnimationStorage.Instance.DetachFromObject = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj._DetachAnimationStorage(this._TargetProp, this);
};
AnimationStorage.Instance.ResetPropertyValue = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj.$SetValue(this._TargetProp, this.GetStopValue());
};
AnimationStorage.Instance.UpdateCurrentValueAndApply = function (progress) {
    if (this._Disabled)
        return;
    if (this._TargetObj == null)
        return;
    this._CurrentValue = this._Timeline._GetCurrentValue(this._BaseValue, this._StopValue !== undefined ? this._StopValue : this._BaseValue, progress);
    this.ApplyCurrentValue();
};
AnimationStorage.Instance.ApplyCurrentValue = function () {
    if (this._CurrentValue == null)
        return;
    this._TargetObj.$SetValue(this._TargetProp, this._CurrentValue);
};
Nullstone.FinishCreate(AnimationStorage);

var VisualStateChangedEventArgs = Nullstone.Create("VisualStateChangedEventArgs");
Nullstone.FinishCreate(VisualStateChangedEventArgs);

var Color = Nullstone.Create("Color", null, 4);
Color.Instance.Init = function (r, g, b, a) {
    this.R = r == null ? 255 : r;
    this.G = g == null ? 255 : g;
    this.B = b == null ? 255 : b;
    this.A = a == null ? 1.0 : a;
};
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
Color.Instance.Add = function (color2) {
    return new Color(this.R + color2.R, this.G + color2.G, this.B + color2.B, this.A + color2.A);
};
Color.Instance.Subtract = function (color2) {
    return new Color(this.R - color2.R, this.G - color2.G, this.B - color2.B, this.A - color2.A);
};
Color.Instance.Multiply = function (factor) {
    return new Color(this.R * factor, this.G * factor, this.B * factor, this.A * factor);
};
Color.Instance.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};
Nullstone.FinishCreate(Color);

var CornerRadius = Nullstone.Create("CornerRadius", null, 4);
CornerRadius.Instance.Init = function (topLeft, topRight, bottomRight, bottomLeft) {
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
};
CornerRadius.Instance.IsZero = function () {
    return this.TopLeft === 0
        && this.TopRight === 0
        && this.BottomRight === 0
        && this.BottomLeft === 0;
};
Nullstone.FinishCreate(CornerRadius);

var Duration = Nullstone.Create("Duration", null, 1);
Duration.Instance.Init = function (value) {
    if (typeof value == "number") {
        this._Type = DurationType.TimeSpan;
        this._TimeSpan = new TimeSpan(value);
    } else if (value instanceof TimeSpan) {
        this._Type = DurationType.TimeSpan;
        this._TimeSpan = value;
    } else if (typeof value == "string") {
        if (value === "Automatic")
            this._Type = DurationType.Automatic;
        if (value === "Forever")
            this._Type = DurationType.Forever;
    }
};
Duration.CreateAutomatic = function () {
    var d = new Duration();
    d._Type = DurationType.Automatic;
    return d;
};
Duration.CreateForever = function () {
    var d = new Duration();
    d._Type = DurationType.Forever;
    return d;
};
Duration.CreateTimeSpan = function (timespan) {
    var d = new Duration();
    d._Type = DurationType.TimeSpan;
    d._TimeSpan = timespan;
    return d;
};
Duration.Instance.GetType = function () {
    return this._Type;
};
Duration.Instance.GetTimeSpan = function () {
    if (this.HasTimeSpan())
        return this._TimeSpan;
    throw new InvalidOperationException();
};
Duration.Instance.HasTimeSpan = function () {
    return this.GetType() === DurationType.TimeSpan;
};
Nullstone.FinishCreate(Duration);

var Font = Nullstone.Create("Font");
Font.Instance.Init = function () {
    this._Family = Font.DEFAULT_FAMILY;
    this._Stretch = Font.DEFAULT_STRETCH;
    this._Style = Font.DEFAULT_STYLE;
    this._Weight = Font.DEFAULT_WEIGHT;
    this._Size = Font.DEFAULT_SIZE;
};
Font.Instance.GetFamily = function () {
    return this._Family;
};
Font.Instance.SetFamily = function (value) {
    if (this._Family == value)
        return false;
    this._Family = value;
    this._PurgeCache();
    return true;
};
Font.Instance.GetStretch = function () {
    return this._Stretch;
};
Font.Instance.SetStretch = function (value) {
    if (this._Stretch == value)
        return false;
    this._Stretch = value;
    this._PurgeCache();
    return true;
};
Font.Instance.GetStyle = function () {
    return this._Style;
};
Font.Instance.SetStyle = function (value) {
    if (this._Style == value)
        return false;
    this._Style = value;
    this._PurgeCache();
    return true;
};
Font.Instance.GetWeight = function () {
    return this._Weight;
};
Font.Instance.SetWeight = function (value) {
    if (this._Weight == value)
        return false;
    this._Weight = value;
    this._PurgeCache();
    return true;
};
Font.Instance.GetSize = function () {
    return this._Size;
};
Font.Instance.SetSize = function (value) {
    if (this._Size == value)
        return false;
    this._Size = value;
    this._PurgeCache();
    return true;
};
Font.Instance.GetActualHeight = function () {
    return Surface._MeasureHeight(this);
};
Font.Instance._Descender = function () { return 0.0; }; //most likely removable
Font.Instance._Ascender = function () { return 0.0; }; //most likely removable
Font.Instance._PurgeCache = function () {
    this._CachedHeight = undefined;
    this._CachedTranslation = undefined;
};
Font.Instance.ToHtml5Object = function () {
    if (!this._CachedTranslation)
        this._CachedTranslation = this._BuildTranslation();
    return this._CachedTranslation;
};
Font.Instance._BuildTranslation = function () {
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
Font.DEFAULT_FAMILY = "Verdana";
Font.DEFAULT_STRETCH = FontStretches.Normal;
Font.DEFAULT_STYLE = FontStyles.Normal;
Font.DEFAULT_WEIGHT = FontWeights.Normal;
Font.DEFAULT_SIZE = "11px";
Nullstone.FinishCreate(Font);

var KeyTime = Nullstone.Create("KeyTime");
KeyTime.CreateUniform = function () {
    var kt = new KeyTime();
    kt._IsUniform = true;
    return kt;
};
KeyTime.Instance.IsPaced = function () {
    return this._IsPaced == true;
};
KeyTime.Instance.IsUniform = function () {
    return this._IsUniform == true;
};
Nullstone.FinishCreate(KeyTime);

var Matrix = Nullstone.Create("Matrix", null, 2);
Matrix.Instance.Init = function (els, inverse) {
    if (els === undefined) {
        this._Elements = [1, 0, 0, 0, 1, 0];
        this._Type = MatrixTypes.Identity;
        return;
    }
    this._Elements = els;
    this._Inverse = inverse;
    this._DeriveType();
};
Matrix.prototype.GetM11 = function () {
    if (this._Type === MatrixTypes.Identity)
        return 1;
    return this._Elements[0];
};
Matrix.prototype.SetM11 = function (value) {
    if (this._Elements[0] !== value) {
        this._Elements[0] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.prototype.GetM12 = function () {
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[1];
};
Matrix.prototype.SetM12 = function (value) {
    if (this._Elements[1] !== value) {
        this._Elements[1] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.prototype.GetM21 = function () {
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[3];
};
Matrix.prototype.SetM21 = function (value) {
    if (this._Elements[3] !== value) {
        this._Elements[3] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.prototype.GetM22 = function () {
    if (this._Type === MatrixTypes.Identity)
        return 1;
    return this._Elements[4];
};
Matrix.prototype.SetM22 = function (value) {
    if (this._Elements[4] !== value) {
        this._Elements[4] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.prototype.GetOffsetX = function () {
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[2];
};
Matrix.prototype.SetOffsetX = function (value) {
    if (this._Elements[2] !== value) {
        this._Elements[2] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.prototype.GetOffsetY = function () {
    if (this._Type === MatrixTypes.Identity)
        return 0;
    return this._Elements[5];
};
Matrix.prototype.SetOffsetY = function (value) {
    if (this._Elements[5] !== value) {
        this._Elements[5] = value;
        this._DeriveType();
        this._OnChanged();
    }
};
Matrix.Instance.GetInverse = function () {
    if (this._Type === MatrixTypes.Identity)
        return new Matrix();
    if (!this._Inverse)
        this._Inverse = Matrix.BuildInverse(this._Elements);
    if (this._Inverse == null)
        return null;
    return new Matrix(this._Inverse, this._Elements);
};
Matrix.Instance.Apply = function (ctx) {
    if (this._Type === MatrixTypes.Identity)
        return;
    var els = this._Elements;
    switch (this._Type) {
        case MatrixTypes.Translate:
            ctx.translate(els[2], els[5]);
            break;
        case MatrixTypes.Scale:
            ctx.scale(els[0], els[4]);
            break;
        case MatrixTypes.Rotate:
            ctx.rotate(this._Angle);
            break;
        default:
            ctx.transform(els[0], els[3], els[1], els[4], els[2], els[5]);
            break;
    }
};
Matrix.Instance.MultiplyMatrix = function (val) {
    if (this._Type === MatrixTypes.Identity) {
        if (val._Type === MatrixTypes.Identity)
            return new Matrix();
        return new Matrix(val._Elements.slice(0));
    }
    if (val._Type === MatrixTypes.Identity)
        return new Matrix(this._Elements.slice(0));
    var e1 = this._Elements;
    var e2 = val._Elements;
    var e3 = [];
    e3[0] = e1[0] * e2[0] + e1[1] * e2[3];
    e3[3] = e1[3] * e2[0] + e1[4] * e2[3]
    e3[1] = e1[0] * e2[1] + e1[1] * e2[4];
    e3[4] = e1[3] * e2[1] + e1[4] * e2[4]
    e3[2] = e1[0] * e2[2] + e1[1] * e2[5] + e1[2];
    e3[5] = e1[3] * e2[2] + e1[4] * e2[5] + e1[5];
    return new Matrix(e3);
};
Matrix.Instance.MultiplyPoint = function (val) {
    var e = this._Elements;
    return new Point(
        e[0] * val.X + e[1] * val.Y + e[2],
        e[3] * val.X + e[4] * val.Y + e[5]
    );
};
Matrix.Instance.Copy = function () {
    return new Matrix(this._Elements.slice(0));
};
Matrix.Instance.toString = function () {
    var arr = this._Elements;
    var t = "";
    t += arr[0];
    t += ",";
    t += arr[1];
    t += ",";
    t += arr[2];
    t += "\n";
    t += arr[3];
    t += ",";
    t += arr[4];
    t += ",";
    t += arr[5];
    t += "\n";
    t += "0,0,1";
    return t;
};
Matrix.Instance._DeriveType = function () {
    this._Angle = undefined;
    var els = this._Elements;
    this._Type = MatrixTypes.Unknown;
    if (els[1] === 0 && els[3] === 0) {
        if (els[0] === 1 && els[4] === 1) {
            if (els[2] === 0 && els[5] === 0)
                this._Type = MatrixTypes.Identity;
            else
                this._Type = MatrixTypes.Translate;
        } else {
            this._Type = MatrixTypes.Scale;
        }
    } else {
        if (els[0] === 1 && els[2] === 0 && els[4] === 1 && els[5] === 0)
            this._Type = MatrixTypes.Shear;
    }
};
Matrix.Instance._OnChanged = function () {
    if (this._ChangedCallback)
        this._ChangedCallback();
};
Matrix.Translate = function (matrix, x, y) {
    if (x === 0 && y === 0)
        return matrix;
    var els = matrix._Elements;
    els[2] += x;
    els[5] += y;
    matrix._Inverse = undefined;
    matrix._DeriveType();
    return matrix;
};
Matrix.Scale = function (matrix, scaleX, scaleY, centerX, centerY) {
    if (scaleX === 1 && scaleY === 1)
        return matrix;
    var m1 = matrix;
    var translationExists = !((centerX == null || centerX === 0) && (centerY == null || centerY === 0));
    var els = m1._Elements;
    if (translationExists)
        m1 = Matrix.Translate(m1, -centerX, -centerY);
    els[0] *= scaleX;
    els[1] *= scaleX;
    els[2] *= scaleX;
    els[3] *= scaleY;
    els[4] *= scaleY;
    els[5] *= scaleY;
    if (translationExists)
        m1 = Matrix.Translate(m1, centerX, centerY);
    m1._Inverse = undefined;
    m1._DeriveType();
    return m1;
};
Matrix.BuildInverse = function (arr) {
    var det = Matrix.GetDeterminant(arr);
    if (det === 0)
        return null;
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    var d = arr[3];
    var e = arr[4];
    var f = arr[5];
    return [
        e / det, -b / det, (b * f - c * e) / det,
        -d / det, a / det, (c * d - a * f) / det
    ];
};
Matrix.GetDeterminant = function (arr) {
    return (arr[0] * arr[4]) - (arr[1] * arr[3]);
};
Matrix.CreateTranslate = function (x, y) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    return new Matrix([1, 0, x, 0, 1, y], [1, 0, -x, 0, 1, -y]);
};
Matrix.CreateScale = function (x, y) {
    if (x == null) x = 1;
    if (y == null) y = 1;
    var ix = x === 0 ? 0 : 1 / x;
    var iy = y === 0 ? 0 : 1 / y;
    return new Matrix([x, 0, 0, 0, y, 0], [ix, 0, 0, 0, iy, 0]);
};
Matrix.CreateRotate = function (angleRad) {
    if (angleRad == null)
        return new Matrix();
    var c = Math.cos(angleRad);
    var s = Math.sin(angleRad);
    var mt = new Matrix([c, -s, 0, s, c, 0]);
    mt._Angle = angleRad;
    return mt;
};
Matrix.CreateShear = function (x, y) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    return new Matrix([1, x, 0, y, 1, 0], [1, -x, 0, -y, 1, 0]);
};
Nullstone.FinishCreate(Matrix);

var Point = Nullstone.Create("Point", null, 2);
Point.Instance.Init = function (x, y) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
};
Point.Instance.Apply = function (matrix) {
    return matrix.MultiplyPoint(this);
};
Point.Instance.toString = function () {
    return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
};
Point.Equals = function (p1, p2) {
    if (p1 == null && p2 == null)
        return true;
    if (p1 == null || p2 == null)
        return false;
    return p1.X === p2.X && p1.Y === p2.Y;
};
Nullstone.FinishCreate(Point);

var Rect = Nullstone.Create("Rect", null, 4);
Rect.Instance.Init = function (x, y, width, height) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
};
Rect.Instance.GetRight = function () {
    return this.X + this.Width;
};
Rect.Instance.GetBottom = function () {
    return this.Y + this.Height;
};
Rect.Instance.IsEmpty = function () {
    return this.Width <= 0.0 || this.Height <= 0.0;
};
Rect.Instance.GrowBy = function (left, top, right, bottom) {
    var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.Instance.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left, thickness.Top, thickness.Right, thickness.Bottom);
};
Rect.Instance.Union = function (rect2, logical) {
    if (this.IsEmpty())
        return new Rect(rect2.X, rect2.Y, rect2.Width, rect2.Height);
    if (logical) {
        if (rect2.Width <= 0 && rect2.Height <= 0)
            return new Rect(this.X, this.Y, this.Width, this.Height);
    } else {
        if (rect2.Width <= 0 || rect2.Height <= 0)
            return new Rect(this.X, this.Y, this.Width, this.Height);
    }
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.min(this.X, rect2.X);
    result.Y = Math.min(this.Y, rect2.Y);
    result.Width = Math.max(this.X + this.Width, rect2.X + rect2.Width) - result.X;
    result.Height = Math.max(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y;
    return result;
};
Rect.Instance.Intersection = function (rect2) {
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.max(this.X, rect2.X);
    result.Y = Math.max(this.Y, rect2.Y);
    result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
    result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
    return result;
};
Rect.Instance.RoundOut = function () {
    return new Rect(Math.floor(this.X), Math.floor(this.Y), Math.ceil(this.X + this.Width) - Math.floor(this.X), Math.ceil(this.Y + this.Height) - Math.floor(this.Y));
}
Rect.Instance.RoundIn = function () {
    return new Rect(Math.ceil(this.X), Math.ceil(this.Y), Math.floor(this.X + this.Width) - Math.ceil(this.X), Math.floor(this.Y + this.Height) - Math.ceil(this.Y));
}
Rect.Instance.Transform = function (matrix) {
    var topLeft = new Point(this.X, this.Y);
    var bottomRight = new Point(this.X + this.Width, this.Y + this.Height);
    topLeft = matrix.MultiplyPoint(topLeft);
    bottomRight = matrix.MultiplyPoint(bottomRight);
    return new Rect(Math.min(topLeft.X, bottomRight.X),
        Math.min(topLeft.Y, bottomRight.Y),
        Math.abs(bottomRight.X - topLeft.X),
        Math.abs(bottomRight.Y - topLeft.Y));
};
Rect.Instance.RectIn = function (rect2) {
    var inter = this.Intersection(rect2);
    if (inter.IsEmpty())
        return RectOverlap.Out;
    if (Rect.Equals(rect2, inter))
        return RectOverlap.In;
    return RectOverlap.Part;
};
Rect.Instance.ContainsPoint = function (p) {
    return this.X <= p.X
        && this.Y <= p.Y
        && (this.X + this.Width) >= p.X
        && (this.Y + this.Height) >= p.Y;
};
Rect.Instance.ContainsPointXY = function (x, y) {
    return this.X <= x
        && this.Y <= y
        && (this.X + this.Width) >= x
        && (this.Y + this.Height) >= y;
};
Rect.Instance.toString = function () {
    return "[X = " + this.X + + "; Y = " + this.Y + "; Width = " + this.Width + "; Height = " + this.Height + "]";
};
Rect.Equals = function (rect1, rect2) {
    if (rect1 == null && rect2 == null)
        return true;
    if (rect1 == null || rect2 == null)
        return false;
    return rect1.X == rect2.X && rect1.Y == rect2.Y && rect1.Width == rect2.Width && rect1.Height == rect2.Height;
};
Nullstone.FinishCreate(Rect);

var Size = Nullstone.Create("Size", null, 2);
Size.Instance.Init = function (width, height) {
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
};
Size.Instance.GrowBy = function (width, height) {
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h += height;
    if (w != Number.POSITIVE_INFINITY)
        w += width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.Instance.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left + thickness.Right, thickness.Top + thickness.Bottom);
};
Size.Instance.Min = function (size2) {
    return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
};
Size.Instance.Max = function (size2) {
    return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
};
Size.Instance.Equals = function (size2) {
    return this.Width === size2.Width && this.Height === size2.Height;
};
Size.Instance.toString = function () {
    return "[Width = " + this.Width + "; Height = " + this.Height + "]";
};
Size.Instance.Copy = function () {
    return new Size(this.Width, this.Height);
};
Size.Equals = function (size1, size2) {
    if (size1 == null && size2 == null)
        return true;
    if (size1 == null && size2 == null)
        return false;
    return size1.Width === size2.Width && size1.Height === size2.Height;
};
Nullstone.FinishCreate(Size);

var Thickness = Nullstone.Create("Thickness", null, 4);
Thickness.Instance.Init = function (left, top, right, bottom) {
    this.Left = left == null ? 0 : left;
    this.Top = top == null ? 0 : top;
    this.Right = right == null ? 0 : right;
    this.Bottom = bottom == null ? 0 : bottom;
};
Thickness.Instance.Plus = function (thickness2) {
    var t = new Thickness();
    t.Left = this.Left + thickness2.Left;
    t.Right = this.Right + thickness2.Right;
    t.Top = this.Top + thickness2.Top;
    t.Bottom = this.Bottom + thickness2.Bottom;
    return t;
};
Thickness.Instance.Half = function () {
    var t = new Thickness();
    t.Left = this.Left / 2;
    t.Top = this.Top / 2;
    t.Right = this.Right / 2;
    t.Bottom = this.Bottom / 2;
    return t;
};
Thickness.Instance.Negate = function () {
    var t = new Thickness();
    t.Left = -this.Left;
    t.Right = -this.Right;
    t.Top = -this.Top;
    t.Bottom = -this.Bottom;
    return t;
};
Thickness.Instance.IsEmpty = function () {
    return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
};
Nullstone.FinishCreate(Thickness);

var TimeSpan = Nullstone.Create("TimeSpan");
TimeSpan.Instance.Init = function (args) {
    if (args.length === 0) {
        this._Ticks = 0;
        return;
    }
    if (args.length === 1) { //ticks
        this._Ticks = args[0];
        return;
    }
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    if (args.length === 3) { //hours, minutes, seconds
        hours = args[0];
        minutes = args[1];
        seconds = args[2];
    } else if (args.length === 4) { //days, hours, minutes, seconds
        days = args[0];
        hours = args[1];
        minutes = args[2];
        seconds = args[3];
    } else if (args.length === 5) { //days, hours, minutes, seconds, milliseconds
        days = args[0];
        hours = args[1];
        minutes = args[2];
        seconds = args[3];
        milliseconds = args[4];
    }
    this._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute)
        + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
};
TimeSpan.Instance.GetDays = function () {
    return Math.floor(this._Ticks / TimeSpan._TicksPerDay);
};
TimeSpan.Instance.GetHours = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    return Math.floor(remTicks / TimeSpan._TicksPerHour);
};
TimeSpan.Instance.GetMinutes = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    return Math.floor(remTicks / TimeSpan._TicksPerMinute);
};
TimeSpan.Instance.GetSeconds = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    return Math.floor(remTicks / TimeSpan._TicksPerSecond);
};
TimeSpan.Instance.GetMilliseconds = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    remTicks = remTicks % TimeSpan._TicksPerSecond;
    return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
};
TimeSpan.Instance.GetTicks = function () {
    return this._Ticks;
};
TimeSpan.Instance.GetTotalDays = function () {
    return this._Ticks / TimeSpan._TicksPerDay;
};
TimeSpan.Instance.GetTotalHours = function () {
    return this._Ticks / TimeSpan._TicksPerHour;
};
TimeSpan.Instance.GetTotalMinutes = function () {
    return this._Ticks / TimeSpan._TicksPerMinute;
};
TimeSpan.Instance.GetTotalSeconds = function () {
    return this._Ticks / TimeSpan._TicksPerSecond;
};
TimeSpan.Instance.GetTotalMilliseconds = function () {
    return this._Ticks / TimeSpan._TicksPerMillisecond;
};
TimeSpan.Instance.AddTicks = function (ticks) {
    if (ticks == null)
        return;
    if (isNaN(ticks))
        return;
    this._Ticks += ticks;
};
TimeSpan.Instance.AddMilliseconds = function (milliseconds) {
    this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
};
TimeSpan.Instance.Add = function (ts2) {
    return new TimeSpan(this._Ticks + ts2._Ticks);
};
TimeSpan.Instance.Subtract = function (ts2) {
    return new TimeSpan(this._Ticks - ts2._Ticks);
};
TimeSpan.Instance.Multiply = function (v) {
    if (v instanceof TimeSpan) {
    } else if (typeof v == "number") {
        return new TimeSpan(Math.round(this._Ticks * v));
    }
}
TimeSpan.Instance.Divide = function (ts2) {
    return new TimeSpan(this._Ticks / ts2._Ticks);
};
TimeSpan.Instance.CompareTo = function (ts2) {
    if (this._Ticks === ts2)
        return 0;
    return (this._Ticks > ts2) ? 1 : -1;
};
TimeSpan.Instance.IsZero = function () {
    return this._Ticks === 0;
};
TimeSpan.Instance.GetJsDelay = function () {
    return this._Ticks * TimeSpan._TicksPerMillisecond;
};
TimeSpan._TicksPerMillisecond = 1;
TimeSpan._TicksPerSecond = 1000;
TimeSpan._TicksPerMinute = TimeSpan._TicksPerSecond * 60;
TimeSpan._TicksPerHour = TimeSpan._TicksPerMinute * 60;
TimeSpan._TicksPerDay = TimeSpan._TicksPerHour * 24;
Nullstone.FinishCreate(TimeSpan);

var Uri = Nullstone.Create("Uri", null, 1);
Uri.Instance.Init = function (os) {
    this._OriginalString = os;
};
Uri.Instance.GetFragment = function () {
};
Uri.Instance.toString = function () {
    return this._OriginalString;
};
Uri.IsNullOrEmpty = function (uri) {
    if (uri == null)
        return true;
    if (uri._OriginalString)
        return false;
    return true;
};
Nullstone.FinishCreate(Uri);

var BError = Nullstone.Create("BError");
BError.Instance.Init = function () {
    this._Number = 0;
    this.Code = 0;
    this.CharPosition = 0;
    this.LineNumber = 0;
    this.Message = "";
};
BError.Instance.SetErrored = function (number, message, code) {
    this._Number = number;
    this.Message = message;
    this.Code = code || 0;
};
BError.Instance.IsErrored = function () {
    return this._Number > 0;
};
BError.Instance.toString = function () {
    return "[" + this._Number + "] " + this.Message;
};
BError.Instance.CreateException = function () {
    switch (this._Number) {
        case BError.Argument:
            return new ArgumentException(this.Message, this.CharPosition, this.LineNumber);
        case BError.InvalidOperation:
            return new InvalidOperationException(this.Message, this.CharPosition, this.LineNumber);
        case BError.XamlParseException:
            return new XamlParseException(this.Message, this.CharPosition, this.LineNumber);
        default:
            return new Exception(this.Message, this.CharPosition, this.LineNumber);
    }
};
BError.UnauthorizedAccess = 1;
BError.Argument = 2;
BError.InvalidOperation = 3;
BError.Exception = 4;
BError.XamlParseException = 5;
Nullstone.FinishCreate(BError);

var Closure = Nullstone.Create("Closure");
Nullstone.FinishCreate(Closure);

var Dictionary = Nullstone.Create("Dictionary");
Dictionary.Instance.Init = function () {
    this._ht = [];
};
Dictionary.Instance.TryGetValue = function (key, data) {
    data.Value = this._ht[key];
    return data.Value != null;
};
Dictionary.Instance.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.Instance.Remove = function (key) {
    delete this._ht[key];
};
Nullstone.FinishCreate(Dictionary);

var EventArgs = Nullstone.Create("EventArgs");
Nullstone.FinishCreate(EventArgs);
var MouseEventArgs = Nullstone.Create("MouseEventArgs", EventArgs, 1);
MouseEventArgs.Instance.Init = function (absolutePos) {
    this._AbsolutePosition = absolutePos;
};
MouseEventArgs.Instance.GetPosition = function (relativeTo) {
    var p = new Point(this._AbsolutePosition.X, this._AbsolutePosition.Y);
    if (relativeTo == null)
        return p;
    if (!(relativeTo instanceof UIElement))
        throw new ArgumentException("Specified relative object must be a UIElement.");
    if (relativeTo._IsAttached)
        "".toString(); //TODO: ProcessDirtyElements on surface
    relativeTo._TransformPoint(p);
    return p;
};
Nullstone.FinishCreate(MouseEventArgs);
var MouseButtonEventArgs = Nullstone.Create("MouseButtonEventArgs", MouseEventArgs, 1);
MouseButtonEventArgs.Instance.Init = function (absolutePos) {
    this.Init$MouseEventArgs(absolutePos);
};
Nullstone.FinishCreate(MouseButtonEventArgs);
var KeyEventArgs = Nullstone.Create("KeyEventArgs", EventArgs, 2);
KeyEventArgs.Instance.Init = function (modifiers, keyCode) {
    this.Modifiers = modifiers;
    this.KeyCode = keyCode;
};
Nullstone.FinishCreate(KeyEventArgs);

var Exception = Nullstone.Create("Exception");
Nullstone.FinishCreate(Exception);

var InvalidOperationException = Nullstone.Create("InvalidOperationException", Exception, 1);
InvalidOperationException.Instance.Init = function (message) {
    this.Message = message;
};
Nullstone.FinishCreate(InvalidOperationException);

var LinkedList = Nullstone.Create("LinkedList");
LinkedList.Instance.Init = function () {
    this.Clear();
};
LinkedList.Instance.First = function () {
    return this._Head;
};
LinkedList.Instance.Last = function () {
    return this._Tail;
};
LinkedList.Instance.IsEmpty = function () {
    return !this._Head;
};
LinkedList.Instance.Prepend = function (node) {
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
LinkedList.Instance.Append = function (node) {
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
LinkedList.Instance.Remove = function (node) {
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
LinkedList.Instance.InsertBefore = function (node, before) {
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
LinkedList.Instance.Clear = function () {
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
};
Nullstone.FinishCreate(LinkedList);

var LinkedListNode = Nullstone.Create("LinkedListNode");
LinkedListNode.Instance.Init = function () {
    this.Previous = null;
    this.Next = null;
};
Nullstone.FinishCreate(LinkedListNode);

var MulticastEvent = Nullstone.Create("MulticastEvent");
MulticastEvent.Instance.Init = function () {
    this._Listeners = [];
};
MulticastEvent.Instance.Subscribe = function (callback, closure) {
    if (!(callback instanceof Function))
        throw new InvalidOperationException("Callback must be a function!");
    this._Listeners.push({ Callback: callback, Closure: closure });
};
MulticastEvent.Instance.SubscribeSpecific = function (callback, closure, matchFunc, matchClosure) {
    this._Listeners.push({ Callback: callback, Closure: closure, MatchFunc: matchFunc, MatchClosure: matchClosure });
};
MulticastEvent.Instance.Unsubscribe = function (callback, closure, matchClosure) {
    for (var i in this._Listeners) {
        var listener = this._Listeners[i];
        if (listener.Callback === callback) {
            if (listener.Closure && closure && !Nullstone.RefEquals(listener.Closure, closure))
                continue;
            if (listener.MatchClosure && matchClosure && !Nullstone.RefEquals(listener.MatchClosure, matchClosure))
                continue;
            this._Listeners.splice(i, 1);
            return;
        }
    }
};
MulticastEvent.Instance.Raise = function (sender, args) {
    var listeners = this._Listeners;
    for (var i in listeners) {
        var listener = listeners[i];
        if (listener.MatchFunc && !listener.MatchFunc.call(listener.MatchClosure, sender, args))
            continue;
        listener.Callback.call(listener.Closure, sender, args);
    }
};
MulticastEvent.Instance.RaiseAsync = function (sender, args) {
    var me = this;
    setTimeout(function () { me.Raise(sender, args); }, 1);
};
Nullstone.FinishCreate(MulticastEvent);

var NotImplementedException = Nullstone.Create("NotImplementedException", Exception, 2);
NotImplementedException.Instance.Init = function (type, parentType, methodName) {
    this.Type = type;
    this.ParentType = parentType;
    this.MethodName = methodName;
};
NotImplementedException.Instance.toString = function () {
    if (this.MethodName)
        return this.Type._TypeName + " does not implement " + this.ParentType._TypeName + "." + this.MethodName;
    return this.Type._TypeName + " does not implement " + this.ParentType._TypeName;
};
Nullstone.FinishCreate(NotImplementedException);

var NotSupportedException = Nullstone.Create("NotSupportedException", Exception, 1);
NotSupportedException.Instance.Init = function (message) {
    this.Message = message;
};
Nullstone.FinishCreate(NotSupportedException);

var RoutedEventArgs = Nullstone.Create("RoutedEventArgs", EventArgs);
RoutedEventArgs.Instance.Init = function () {
    this.Handled = false;
};
Nullstone.FinishCreate(RoutedEventArgs);

var RoutedPropertyChangedEventArgs = Nullstone.Create("RoutedPropertyChangedEventArgs", RoutedEventArgs, 2);
RoutedPropertyChangedEventArgs.Instance.Init = function (oldValue, newValue) {
    this.Init$RoutedEventArgs();
    this.OldValue = oldValue;
    this.NewValue = newValue;
};
Nullstone.FinishCreate(RoutedPropertyChangedEventArgs);

var XamlParseException = Nullstone.Create("XamlParseException", Exception, 1);
XamlParseException.Instance.Init = function (message) {
    this.Message = message;
};
XamlParseException.Instance.toString = function () {
    return "Xaml Parse Exception: " + this.Message;
};
Nullstone.FinishCreate(XamlParseException);

var _TextLayoutAttributes = Nullstone.Create("_TextLayoutAttributes", null, 2);
_TextLayoutAttributes.Instance.Init = function (source, start) {
    this._Source = source;
    this._Start = start == null ? 0 : start;
};
_TextLayoutAttributes.Instance.GetBackground = function (selected) {
    if (selected)
        return this._Source.GetSelectionBackground();
    return null;
};
_TextLayoutAttributes.Instance.GetForeground = function (selected) {
    if (selected)
        return this._Source.GetSelectionForeground();
    return this._Source.GetForeground(selected);
};
_TextLayoutAttributes.Instance.GetFont = function () { return this._Source.GetFont(); };
_TextLayoutAttributes.Instance.GetDirection = function () { return this._Source.GetDirection(); };
_TextLayoutAttributes.Instance.IsUnderlined = function () { return this._Source.GetTextDecorations() & TextDecorations.Underline; };
Nullstone.FinishCreate(_TextLayoutAttributes);

var _TextBoxUndoAction = Nullstone.Create("_TextBoxUndoAction", LinkedListNode);
Nullstone.FinishCreate(_TextBoxUndoAction);

var _TextBoxUndoActionDelete = Nullstone.Create("_TextBoxUndoActionDelete", _TextBoxUndoAction, 5);
_TextBoxUndoActionDelete.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length) {
    this._SelectionAnchor = selectionAnchor;
    this._SelectionCursor = selectionCursor;
    this._Start = start;
    this._Length = length;
    this._Text = buffer._Text.substr(start, length);
};
Nullstone.FinishCreate(_TextBoxUndoActionDelete);

var _TextBoxUndoActionInsert = Nullstone.Create("_TextBoxUndoActionInsert", _TextBoxUndoAction, 5);
_TextBoxUndoActionInsert.Instance.Init = function (selectionAnchor, selectionCursor, start, inserted, isAtomic) {
    this._SelectionAnchor = selectionAnchor;
    this._SelectionCursor = selectionCursor;
    this._Start = start;
    this._Length = inserted.length;
    this._Buffer = new _TextBuffer(inserted);
    this._Growable = isAtomic !== true;
};
_TextBoxUndoActionInsert.Instance.Insert = function (start, text) {
    if (!this._Growable || start !== (this._Start + this._Length))
        return false;
    this._Buffer.Append(text);
    this._Length += text.length;
    return true;
};
Nullstone.FinishCreate(_TextBoxUndoActionInsert);

var _TextBoxUndoActionReplace = Nullstone.Create("_TextBoxUndoActionReplace", _TextBoxUndoAction, 6);
_TextBoxUndoActionReplace.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length, inserted) {
    this._SelectionAnchor = selectionAnchor;
    this._SelectionCursor = selectionCursor;
    this._Start = start;
    this._Length = length;
    this._Deleted = buffer._Text.substr(start, length);
    this._Inserted = inserted;
};
Nullstone.FinishCreate(_TextBoxUndoActionReplace);

var DragCompletedEventArgs = Nullstone.Create("DragCompletedEventArgs", RoutedEventArgs, 3);
DragCompletedEventArgs.Instance.Init = function (horizontal, vertical, canceled) {
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
    this.Canceled = canceled;
};
Nullstone.FinishCreate(DragCompletedEventArgs);

var DragDeltaEventArgs = Nullstone.Create("DragDeltaEventArgs", RoutedEventArgs, 2);
DragDeltaEventArgs.Instance.Init = function (horizontal, vertical) {
    this.HorizontalChange = horizontal;
    this.VerticalChange = vertical;
};
Nullstone.FinishCreate(DragDeltaEventArgs);

var DragStartedEventArgs = Nullstone.Create("DragStartedEventArgs", RoutedEventArgs, 2);
DragStartedEventArgs.Instance.Init = function (horizontal, vertical) {
    this.HorizontalOffset = horizontal;
    this.VerticalOffset = vertical;
};
Nullstone.FinishCreate(DragStartedEventArgs);

var ScrollEventArgs = Nullstone.Create("ScrollEventArgs", EventArgs, 2);
ScrollEventArgs.Instance.Init = function (scrollEventType, value) {
    this.ScrollEventType = scrollEventType;
    this.Value = value;
};
Nullstone.FinishCreate(ScrollEventArgs);

var FrameworkElementPropertyValueProvider = Nullstone.Create("FrameworkElementPropertyValueProvider", _PropertyValueProvider, 2);
FrameworkElementPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, 0);
    this._ActualHeight = null;
    this._ActualWidth = null;
    this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};
FrameworkElementPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (propd._ID !== FrameworkElement.ActualHeightProperty._ID && propd._ID !== FrameworkElement.ActualWidthProperty._ID)
        return undefined;
    var actual = this._Object._ComputeActualSize();
    if (!Size.Equals(this._Last, actual)) {
        this._Last = actual;
        this._ActualHeight = actual.Height;
        this._ActualWidth = actual.Width;
    }
    if (propd === FrameworkElement.ActualHeightProperty) {
        return this._ActualHeight;
    } else {
        return this._ActualWidth;
    }
};
Nullstone.FinishCreate(FrameworkElementPropertyValueProvider);

var LayoutInformation = Nullstone.Create("LayoutInformation");
LayoutInformation.LayoutClipProperty = DependencyProperty.RegisterAttached("LayoutClip", function () { return Geometry; }, LayoutInformation);
LayoutInformation.GetLayoutClip = function (d) {
    return d.$GetValue(LayoutInformation.LayoutClipProperty);
};
LayoutInformation.SetLayoutClip = function (d, value) {
    d.$SetValue(LayoutInformation.LayoutClipProperty, value);
};
LayoutInformation.LayoutExceptionElementProperty = DependencyProperty.RegisterAttached("LayoutExceptionElement", function () { return UIElement; }, LayoutInformation);
LayoutInformation.GetLayoutExceptionElement = function (d) {
    return d.$GetValue(LayoutInformation.LayoutExceptionElementProperty);
};
LayoutInformation.SetLayoutExceptionElement = function (d, value) {
    d.$SetValue(LayoutInformation.LayoutExceptionElementProperty, value);
};
LayoutInformation.LayoutSlotProperty = DependencyProperty.RegisterAttached("LayoutSlot", function () { return Rect; }, LayoutInformation, new Rect());
LayoutInformation.GetLayoutSlot = function (d) {
    return d.$GetValue(LayoutInformation.LayoutSlotProperty);
};
LayoutInformation.SetLayoutSlot = function (d, value) {
    d.$SetValue(LayoutInformation.LayoutSlotProperty, value);
};
LayoutInformation.PreviousConstraintProperty = DependencyProperty.RegisterAttached("PreviousConstraint", function () { return Size; }, LayoutInformation);
LayoutInformation.GetPreviousConstraint = function (d) {
    return d.$GetValue(LayoutInformation.PreviousConstraintProperty);
};
LayoutInformation.SetPreviousConstraint = function (d, value) {
    d.$SetValue(LayoutInformation.PreviousConstraintProperty, value);
};
LayoutInformation.FinalRectProperty = DependencyProperty.RegisterAttached("FinalRect", function () { return Rect; }, LayoutInformation);
LayoutInformation.GetFinalRect = function (d) {
    return d.$GetValue(LayoutInformation.FinalRectProperty);
};
LayoutInformation.SetFinalRect = function (d, value) {
    d.$SetValue(LayoutInformation.FinalRectProperty, value);
};
LayoutInformation.LastRenderSizeProperty = DependencyProperty.RegisterAttached("LastRenderSize", function () { return Size; }, LayoutInformation);
LayoutInformation.GetLastRenderSize = function (d) {
    return d.$GetValue(LayoutInformation.LastRenderSizeProperty);
};
LayoutInformation.SetLastRenderSize = function (d, value) {
    d.$SetValue(LayoutInformation.LastRenderSizeProperty, value);
};
LayoutInformation.VisualOffsetProperty = DependencyProperty.RegisterAttached("VisualOffset", function () { return Point; }, LayoutInformation);
LayoutInformation.GetVisualOffset = function (d) {
    return d.$GetValue(LayoutInformation.VisualOffsetProperty);
};
LayoutInformation.SetVisualOffset = function (d, value) {
    d.$SetValue(LayoutInformation.VisualOffsetProperty, value);
};
Nullstone.FinishCreate(LayoutInformation);

var LayoutPass = Nullstone.Create("LayoutPass");
LayoutPass.Instance.Init = function () {
    this._MeasureList = new LinkedList();
    this._ArrangeList = new LinkedList();
    this._SizeList = new LinkedList();
    this._Count = 0;
    this._Updated = false;
};
LayoutPass.MaxCount = 250;
Nullstone.FinishCreate(LayoutPass);

var RequestBringIntoViewEventArgs = Nullstone.Create("RequestBringIntoViewEventArgs", RoutedEventArgs, 2);
RequestBringIntoViewEventArgs.Instance.Init = function (targetObject, targetRect) {
    this.TargetObject = targetObject;
    this.TargetRect = targetRect;
};
Nullstone.FinishCreate(RequestBringIntoViewEventArgs);

var SizeChangedEventArgs = Nullstone.Create("SizeChangedEventArgs", RoutedEventArgs, 2);
SizeChangedEventArgs.Instance.Init = function (prevSize, newSize) {
    this.PreviousSize = prevSize.Copy();
    this.NewSize = newSize.Copy();
};
Nullstone.FinishCreate(SizeChangedEventArgs);

var UIElementNode = Nullstone.Create("UIElementNode", LinkedListNode, 1);
UIElementNode.Instance.Init = function (element) {
    this.UIElement = element;
};
Nullstone.FinishCreate(UIElementNode);

var _AutoCreatePropertyValueProvider = Nullstone.Create("_AutoCreatePropertyValueProvider", _PropertyValueProvider, 2);
_AutoCreatePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = [];
}
_AutoCreatePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    var value = this.ReadLocalValue(propd);
    if (value !== undefined)
        return value;
    value = propd._IsAutoCreated ? propd._GetAutoCreatedValue(this._Object) : null;
    if (value == null)
        return null;
    this._ht[propd] = value;
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, null, value, false, true, false, error);
    return value;
};
_AutoCreatePropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
    if ((providerFlags & _ProviderFlags.RecomputesOnClear) == 0)
        return;
    this.ClearValue(propd);
};
_AutoCreatePropertyValueProvider.Instance.ReadLocalValue = function (propd) {
    return this._ht[propd];
};
_AutoCreatePropertyValueProvider.Instance.ClearValue = function (propd) {
    delete this._ht[propd];
};
Nullstone.FinishCreate(_AutoCreatePropertyValueProvider);

var _DefaultValuePropertyValueProvider = Nullstone.Create("_DefaultValuePropertyValueProvider", _PropertyValueProvider, 2);
_DefaultValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, 0);
}
_DefaultValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};
Nullstone.FinishCreate(_DefaultValuePropertyValueProvider);

var _ImplicitStylePropertyValueProvider = Nullstone.Create("_ImplicitStylePropertyValueProvider", _PropertyValueProvider, 2);
_ImplicitStylePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.RecomputesOnClear);
    this._Styles = null;
    this._StyleMask = _StyleMask.None;
    this._ht = [];
}
_ImplicitStylePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_ImplicitStylePropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
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
        propd = setter.$GetValue(Setter.PropertyProperty);
        if (propd != propd)
            continue;
        newValue = setter.$GetValue(Setter.ConvertedValueProperty);
        oldValue = this._ht[propd];
        this._ht[propd] = newValue;
        this._Object._ProviderValueChanged(this._PropertyPrecedence, propd, oldValue, newValue, true, true, true, error);
        if (error.IsErrored())
            return;
    }
};
_ImplicitStylePropertyValueProvider.Instance._ApplyStyles = function (styleMask, styles, error) {
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
            oldProp = oldSetter.$GetValue(Setter.PropertyProperty);
        if (newSetter)
            newProp = newSetter.$GetValue(Setter.PropertyProperty);
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            oldValue = oldSetter.$GetValue(Setter.ConvertedValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        }
        else if (oldProp == newProp) {
            oldValue = oldSetter.$GetValue(Setter.ConvertedValueProperty);
            newValue = newSetter.$GetValue(Setter.ConvertedValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            oldValue = null;
            newValue = newSetter.$GetValue(Setter.ConvertedValueProperty);
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }
    this._Styles = styles;
    this._StyleMask = styleMask;
};
_ImplicitStylePropertyValueProvider.Instance.SetStyles = function (styleMask, styles, error) {
    if (!styles)
        return;
    var newStyles = [];
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
_ImplicitStylePropertyValueProvider.Instance.ClearStyles = function (styleMask, error) {
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
Nullstone.FinishCreate(_ImplicitStylePropertyValueProvider);

var _InheritedDataContextPropertyValueProvider = Nullstone.Create("_InheritedDataContextPropertyValueProvider", _PropertyValueProvider, 2);
_InheritedDataContextPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence);
    this._Source = null;
};
_InheritedDataContextPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!this._Source || propd !== FrameworkElement.DataContextProperty)
        return null;
    return this._Source.$GetValue(propd);
};
_InheritedDataContextPropertyValueProvider.Instance.SetDataSource = function (source) {
    if (Nullstone.RefEquals(this._Source, source))
        return;
    var oldValue = this._Source != null ? this._Source.$GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source != null ? source.$GetValue(FrameworkElement.DataContextProperty) : null;
    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);
    if (!Nullstone.Equals(oldValue, newValue)) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.Instance._AttachListener = function (source) {
    if (source != null) {
        this._DataContextListener = new PropertyChangedListener(source, FrameworkElement.DataContextProperty, this, this._SourceDataContextChanged);
    }
};
_InheritedDataContextPropertyValueProvider.Instance._DetachListener = function (source) {
    if (this._DataContextListener != null) {
        this._DataContextListener.Detach();
        this._DataContextListener = null;
    }
    if (source != null) {
    }
};
_InheritedDataContextPropertyValueProvider.Instance._SourceDataContextChanged = function (sender, args) {
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.Instance.EmitChanged = function () {
    if (this._Source != null) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.$GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};
Nullstone.FinishCreate(_InheritedDataContextPropertyValueProvider);

var _InheritedIsEnabledPropertyValueProvider = Nullstone.Create("_InheritedIsEnabledPropertyValueProvider", _PropertyValueProvider, 2);
_InheritedIsEnabledPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._Source = null;
    this._CurrentValue = this._Object.$GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
};
_InheritedIsEnabledPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (propd === Control.IsEnabledProperty)
        return this._CurrentValue;
    return null;
};
_InheritedIsEnabledPropertyValueProvider.Instance.SetDataSource = function (source) {
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
_InheritedIsEnabledPropertyValueProvider.Instance._AttachListener = function (obj) {
    if (source) {
        var matchFunc = function (sender, args) {
            return this === args.Property; //Closure - Control.IsEnabledProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Control.IsEnabledProperty);
    }
};
_InheritedIsEnabledPropertyValueProvider.Instance._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Control.IsEnabledProperty);
    }
};
_InheritedIsEnabledPropertyValueProvider.Instance._IsEnabledChanged = function (sender, args) {
    this.LocalValueChanged(args.Property);
};
_InheritedIsEnabledPropertyValueProvider.Instance.LocalValueChanged = function (propd) {
    if (propd && propd !== Control.IsEnabledProperty)
        return false;
    var localEnabled = this._Object.$GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
    var parentEnabled = this._Source && this._Object.GetVisualParent() ? this._Source.$GetValue(Control.IsEnabledProperty) : null;
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
Nullstone.FinishCreate(_InheritedIsEnabledPropertyValueProvider);

var _InheritedPropertyValueProvider = Nullstone.Create("_InheritedPropertyValueProvider", _PropertyValueProvider, 2);
_InheritedPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, 0);
    this._ht = [];
};
_InheritedPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (!_InheritedPropertyValueProvider.IsInherited(this._Object, propd))
        return undefined;
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(this._Object, propd);
    var ancestor = this._GetPropertySource(inheritable);
    if (!ancestor)
        return undefined;
    var ancestorPropd = _InheritedPropertyValueProvider.GetProperty(inheritable, ancestor);
    if (!ancestorPropd)
        return undefined;
    var v = ancestor.$GetValue(ancestorPropd);
    if (v)
        return v;
    return undefined;
};
_InheritedPropertyValueProvider.Instance.WalkSubtree = function (rootParent, element, context, props, adding) {
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
_InheritedPropertyValueProvider.Instance.WalkTree = function (rootParent, element, context, props, adding) {
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
_InheritedPropertyValueProvider.Instance.MaybePropagateInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;
    var sourceProperty = _InheritedPropertyValueProvider.GetProperty(prop, source);
    var value = source.$GetValue(sourceProperty);
    if (value)
        element._PropagateInheritedValue(prop, source, value);
};
_InheritedPropertyValueProvider.Instance.MaybeRemoveInheritedValue = function (source, prop, props, element) {
    if (!source) return;
    if ((props & prop) == 0) return;
    if (source == element._GetInheritedValueSource(prop))
        element._PropagateInheritedValue(prop, null, null);
};
_InheritedPropertyValueProvider.Instance.PropagateInheritedPropertiesOnAddingToTree = function (subtree) {
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
_InheritedPropertyValueProvider.Instance.PropagateInheritedProperty = function (propd, source, subtree) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(source, propd);
    var objContext = new _InheritedContext(this._Object, null);
    this.WalkSubtree(source, subtree, objContext, inheritable, true);
};
_InheritedPropertyValueProvider.Instance.ClearInheritedPropertiesOnRemovingFromTree = function (subtree) {
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
_InheritedPropertyValueProvider.Instance._GetPropertySource = function (inheritableOrProp) {
    if (inheritableOrProp instanceof DependencyProperty)
        return this._ht[GetInheritableFromProperty(inheritableOrProp)];
    return this._ht[inheritableOrProp];
};
_InheritedPropertyValueProvider.Instance._SetPropertySource = function (inheritable, source) {
    if (source)
        this._ht[inheritable] = source;
    else
        delete this._ht[inheritable];
};
_InheritedPropertyValueProvider.IsInherited = function (obj, propd) {
    var inheritable = _InheritedPropertyValueProvider.GetInheritable(obj, propd);
    return inheritable != _Inheritable.None;
};
_InheritedPropertyValueProvider.GetInheritable = function (obj, propd) {
    var inh = propd._CachedInheritable;
    if (inh == null) {
        inh = _InheritedPropertyValueProvider._DeriveInheritable(obj, propd);
        if (propd._ID !== FrameworkElement.FlowDirectionProperty._ID)
            propd._CachedInheritable = inh;
    }
    return inh;
};
_InheritedPropertyValueProvider._DeriveInheritable = function (obj, propd) {
    if (propd.OwnerType._TypeID === Control._TypeID) {
        switch (propd._ID) {
            case Control.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case Control.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case Control.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case Control.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case Control.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case Control.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            default:
                return _Inheritable.None;
        }
    }
    if (propd.OwnerType._TypeID === TextBlock._TypeID) {
        switch (propd._ID) {
            case TextBlock.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case TextBlock.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case TextBlock.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case TextBlock.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case TextBlock.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case TextBlock.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            case TextBlock.TextDecorationsProperty._ID:
                return _Inheritable.TextDecorations;
            case TextBlock.FontResourceProperty._ID:
                return _Inheritable.FontResource;
            default:
                return _Inheritable.None;
        }
    }
    if (propd.OwnerType._TypeID === TextElement._TypeID) {
        switch (propd._ID) {
            case TextElement.ForegroundProperty._ID:
                return _Inheritable.Foreground;
            case TextElement.FontFamilyProperty._ID:
                return _Inheritable.FontFamily;
            case TextElement.FontStretchProperty._ID:
                return _Inheritable.FontStretch;
            case TextElement.FontStyleProperty._ID:
                return _Inheritable.FontStyle;
            case TextElement.FontWeightProperty._ID:
                return _Inheritable.FontWeight;
            case TextElement.FontSizeProperty._ID:
                return _Inheritable.FontSize;
            case TextElement.LanguageProperty._ID:
                return _Inheritable.Language;
            case TextElement.TextDecorationsProperty._ID:
                return _Inheritable.TextDecorations;
            case TextElement.FontResourceProperty._ID:
                return _Inheritable.FontResource;
            default:
                return _Inheritable.None;
        }
    }
    switch (propd._ID) {
        case FrameworkElement.LanguageProperty._ID:
            return _Inheritable.Language;
        case FrameworkElement.FlowDirectionProperty._ID:
            if (!(obj instanceof Image) && !(obj instanceof MediaElement))
                return _Inheritable.FlowDirection;
        case Run.FlowDirectionProperty._ID:
            return _Inheritable.FlowDirection;
        case UIElement.UseLayoutRoundingProperty._ID:
            return _Inheritable.UseLayoutRounding;
    }
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
Nullstone.FinishCreate(_InheritedPropertyValueProvider);

var _LocalValuePropertyValueProvider = Nullstone.Create("_LocalValuePropertyValueProvider", _PropertyValueProvider, 2);
_LocalValuePropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_PropertyValueProvider(obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = [];
};
_LocalValuePropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalValuePropertyValueProvider.Instance.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalValuePropertyValueProvider.Instance.ClearValue = function (propd) {
    delete this._ht[propd];
};
Nullstone.FinishCreate(_LocalValuePropertyValueProvider);

var Binding = Nullstone.Create("Binding", BindingBase, 1);
Binding.Instance.Init = function (path) {
    if (!path)
        path = "";
    this.SetMode(BindingMode.OneWay);
    this.SetPath(new _PropertyPath(path));
    this.SetValidatesOnNotifyDataErrors(true);
    this.SetUpdateSourceTrigger(UpdateSourceTrigger.Default);
};
Binding.Instance.GetBindsDirectlyToSource = function () { return this._BindsDirectlyToSource; };
Binding.Instance.SetBindsDirectlyToSource = function (/* Boolean */value) { this.CheckSealed(); this._BindsDirectlyToSource = value; };
Binding.Instance.GetConverter = function () { return this._Converter; };
Binding.Instance.SetConverter = function (/* IValueConverter */value) { this.CheckSealed(); this._Converter = value; };
Binding.Instance.GetConverterCulture = function () { return this._ConverterCulture; };
Binding.Instance.SetConverterCulture = function (/* Culture */value) { this.CheckSealed(); this._ConverterCulture = value; };
Binding.Instance.GetConverterParameter = function () { return this._ConverterParameter; };
Binding.Instance.SetConverterParameter = function (/* Object */value) { this.CheckSealed(); this._ConverterParameter = value; };
Binding.Instance.GetElementName = function () { return this._ElementName; };
Binding.Instance.SetElementName = function (/* String */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("ElementName cannot be set if either RelativeSource or Source is set");
    this._ElementName = value;
};
Binding.Instance.GetMode = function () { return this._Mode; };
Binding.Instance.SetMode = function (/* Number */value) { this.CheckSealed(); this._Mode = value; };
Binding.Instance.GetNotifyOnValidationError = function () { return this._NotifyOnValidationError; };
Binding.Instance.SetNotifyOnValidationError = function (/* Boolean */value) { this.CheckSealed(); this._NotifyOnValidationError = value; };
Binding.Instance.GetRelativeSource = function () {
    return this._RelativeSource;
};
Binding.Instance.SetRelativeSource = function (/* RelativeSource */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetElementName() != null)
        throw new InvalidOperationException("RelativeSource cannot be set if either ElementName or Source is set");
    this._RelativeSource = value;
};
Binding.Instance.GetPath = function () {
    return this._Path;
};
Binding.Instance.SetPath = function (value) {
    this.CheckSealed();
    if (value.HasDependencyProperty())
        throw new ArgumentException("PropertyPaths which are instantiated with a DependencyProperty are not supported");
    this._Path = value;
};
Binding.Instance.GetSource = function () { return this._Source; };
Binding.Instance.SetSource = function (/* Object */value) {
    this.CheckSealed();
    if (this.GetElementName() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("Source cannot be set if either ElementName or RelativeSource is set");
    this._Source = value;
};
Binding.Instance.GetUpdateSourceTrigger = function () { return this._UpdateSourceTrigger; };
Binding.Instance.SetUpdateSourceTrigger = function (/* Number */value) { this.CheckSealed(); this._UpdateSourceTrigger = value; };
Binding.Instance.GetValidatesOnExceptions = function () { return this._ValidatesOnExceptions; };
Binding.Instance.SetValidatesOnExceptions = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnExceptions = value; };
Binding.Instance.GetValidatesOnDataErrors = function () { return this._ValidatesOnDataErrors; };
Binding.Instance.SetValidatesOnDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnDataErrors = value; };
Binding.Instance.GetValidatesOnNotifyDataErrors = function () { return this._ValidatesOnNotifyDataErrors; };
Binding.Instance.SetValidatesOnNotifyDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnNotifyDataErrors = value; };
Nullstone.FinishCreate(Binding);

var BindingExpression = Nullstone.Create("BindingExpression", BindingExpressionBase, 3);
BindingExpression.Instance.Init = function (binding, target, propd) {
    this.Init$BindingExpressionBase(binding, target, propd);
};
BindingExpression.Instance.GetParentBinding = function () {
    return this.GetBinding();
};
BindingExpression.Instance.GetDataItem = function () {
    return this.GetDataSource();
};
BindingExpression.Instance.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};
Nullstone.FinishCreate(BindingExpression);

var ICollectionView = Nullstone.Create("ICollectionView");
ICollectionView.Instance.Init = function () {
    this.CurrentChanged = new MulticastEvent();
};
Nullstone.FinishCreate(ICollectionView);

var INotifyPropertyChanged = Nullstone.Create("INotifyPropertyChanged", null);
INotifyPropertyChanged.Instance.Init = function () {
    this.PropertyChanged = new MulticastEvent();
};
INotifyPropertyChanged.Instance.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};
Nullstone.FinishCreate(INotifyPropertyChanged);

var PropertyChangedEventArgs = Nullstone.Create("PropertyChangedEventArgs", EventArgs);
PropertyChangedEventArgs.Instance.GetPropertyName = function () {
    return this._PropertyName;
};
PropertyChangedEventArgs.Instance.SetPropertyName = function (value) {
    this._PropertyName = value;
};
Nullstone.FinishCreate(PropertyChangedEventArgs);

var _PropertyPathNode = Nullstone.Create("_PropertyPathNode");
_PropertyPathNode.Instance.Init = function () {
    this.SetIsBroken(true);
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
};
_PropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
};
_PropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
};
_PropertyPathNode.Instance.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.Instance.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.Instance.SetSource = function (value) {
    if (value == null || !Nullstone.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }
        this._Source = value;
        if (this._Source != null && Nullstone.DoesImplement(this._Source, INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.SetListener(listener);
        }
        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this._Value);
    }
};
_PropertyPathNode.Instance._UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this.GetIsBroken() !== isBroken;
    var emitValueChanged = !Nullstone.Equals(this.GetValue(), newValue);
    this.SetIsBroken(isBroken);
    this._Value = newValue;
    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.Instance._CheckIsBroken = function () {
    return this.GetSource() == null || (this.GetPropertyInfo() == null && this.GetDependencyProperty() == null);
};
_PropertyPathNode.Instance.GetIsBroken = function () {
    return this._IsBroken;
};
_PropertyPathNode.Instance.SetIsBroken = function (value) {
    this._IsBroken = value;
};
_PropertyPathNode.Instance.GetDependencyProperty = function () {
    return this._DependencyProperty;
};
_PropertyPathNode.Instance.SetDependencyProperty = function (value) {
    this._DependencyProperty = value;
};
_PropertyPathNode.Instance.GetNext = function () {
    return this._Next;
};
_PropertyPathNode.Instance.SetNext = function (value) {
    this._Next = value;
};
_PropertyPathNode.Instance.GetPropertyInfo = function () {
    return this._PropertyInfo;
};
_PropertyPathNode.Instance.SetPropertyInfo = function (value) {
    this._PropertyInfo = value;
};
_PropertyPathNode.Instance.GetListener = function () {
    return this._Listener;
};
_PropertyPathNode.Instance.SetListener = function (value) {
    this._Listener = value;
};
_PropertyPathNode.Instance.GetSource = function () {
    return this._Source;
};
_PropertyPathNode.Instance.GetValue = function () {
    return this._Value;
};
_PropertyPathNode.Instance.GetValueType = function () {
    return this._ValueType;
};
_PropertyPathNode.Instance.SetValueType = function (value) {
    this._ValueType = value;
};
Nullstone.FinishCreate(_PropertyPathNode);

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
_PropertyPathWalker.Instance.GetSource = function () {
    return this._Source;
};
_PropertyPathWalker.Instance.SetSource = function (value) {
    this._Source = value;
};
_PropertyPathWalker.Instance.GetPath = function () {
    return this._Path;
};
_PropertyPathWalker.Instance.SetPath = function (value) {
    this._Path = value;
};
_PropertyPathWalker.Instance.GetValueInternal = function () {
    return this._ValueInternal;
};
_PropertyPathWalker.Instance.SetValueInternal = function (value) {
    this._ValueInternal = value;
};
_PropertyPathWalker.Instance.GetIsDataContextBound = function () {
    return this._IsDataContextBound;
};
_PropertyPathWalker.Instance.SetIsDataContextBound = function (value) {
    this._IsDataContextBound = value;
};
_PropertyPathWalker.Instance.GetNode = function () {
    return this._Node;
};
_PropertyPathWalker.Instance.SetNode = function (value) {
    this._Node = value;
};
_PropertyPathWalker.Instance.GetFinalNode = function () {
    return this._FinalNode;
};
_PropertyPathWalker.Instance.SetFinalNode = function (value) {
    this._FinalNode = value;
};
_PropertyPathWalker.Instance.GetIsPathBroken = function () {
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
Nullstone.FinishCreate(_PropertyPathWalker);

var _StandardPropertyPathNode = Nullstone.Create("_StandardPropertyPathNode", _PropertyPathNode, 2);
_StandardPropertyPathNode.Instance.Init = function (typeName, propertyName) {
    this.Init$_PropertyPathNode();
    this._STypeName = typeName;
    this._PropertyName = propertyName;
};
_StandardPropertyPathNode.Instance.SetValue = function (value) {
    if (this.GetDependencyProperty() != null)
        this.GetSource().$SetValue(this.GetDependencyProperty(), value);
    else if (this.GetPropertyInfo() != null)
        this.GetPropertyInfo().SetValue(this.GetSource(), value, null);
};
_StandardPropertyPathNode.Instance.UpdateValue = function () {
    if (this.GetDependencyProperty() != null) {
        this.SetValueType(this.GetDependencyProperty().GetTargetType());
        this._UpdateValueAndIsBroken(this.GetSource().$GetValue(this.GetDependencyProperty()), this._CheckIsBroken());
    } else if (this.GetPropertyInfo() != null) {
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
_StandardPropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
    this.OnSourceChanged$_PropertyPathNode(oldSource, newSource);
    var oldDO = Nullstone.As(oldSource, DependencyObject);
    var newDO = Nullstone.As(newSource, DependencyObject);
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
_StandardPropertyPathNode.Instance.OnPropertyChanged = function (s, e) {
    try {
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this.GetValue());
    } catch (err) {
    }
};
_StandardPropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
    if (e.PropertyName === this.GetPropertyName() && this.GetPropertyInfo() != null) {
        this.UpdateValue();
        var next = this.GetNext();
        if (next != null)
            next.SetSource(this.GetValue());
    }
};
_StandardPropertyPathNode.Instance.GetTypeName = function () {
    return this._STypeName;
};
_StandardPropertyPathNode.Instance.GetPropertyName = function () {
    return this._PropertyName;
};
Nullstone.FinishCreate(_StandardPropertyPathNode);

var DirtyNode = Nullstone.Create("DirtyNode", LinkedListNode, 1);
DirtyNode.Instance.Init = function (element) {
    this.Init$LinkedListNode();
    this.Element = element;
};
Nullstone.FinishCreate(DirtyNode);

var FocusChangedNode = Nullstone.Create("FocusChangedNode", LinkedListNode, 2);
FocusChangedNode.Instance.Init = function (lostFocus, gotFocus) {
    this.Init$LinkedListNode();
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
};
Nullstone.FinishCreate(FocusChangedNode);

var Surface = Nullstone.Create("Surface", null, 1);
Surface.Instance.Init = function (app) {
    this._App = app;
    this._Clock = new Clock();
    this._InputList = new LinkedList();
    this._FocusChangedEvents = new LinkedList();
    this._FirstUserInitiatedEvent = false;
    this._UserInitiatedEvent = false;
    this._Cursor = CursorType.Default;
};
Surface.Instance.Register = function (jCanvas) {
    Surface._TestCanvas = document.createElement('canvas');
    this._Layers = new Collection();
    this._DownDirty = new _DirtyList();
    this._UpDirty = new _DirtyList();
    this._jCanvas = jCanvas;
    this._Ctx = this._jCanvas[0].getContext('2d');
    this._CanvasOffset = this._jCanvas.offset();
    this.RegisterEvents();
};
Surface.Instance.RegisterEvents = function () {
    var surface = this;
    var canvas = this.GetCanvas();
    canvas.addEventListener("mousedown", function (e) { surface._HandleButtonPress(window.event ? window.event : e); });
    canvas.addEventListener("mouseup", function (e) { surface._HandleButtonRelease(window.event ? window.event : e); });
    canvas.addEventListener("mouseout", function (e) { surface._HandleOut(window.event ? window.event : e); });
    canvas.addEventListener("mousemove", function (e) { surface._HandleMove(window.event ? window.event : e); });
    document.onkeypress = function (e) { surface._HandleKeyPress(window.event ? window.event : e); };
    document.onkeydown = function (e) {
        e = window.event ? window.event : e;
        if (e.keyCode === 8 || e.keyCode === 46) {
            surface._HandleKeyPress(e);
            return false;
        }
    };
};
Surface.Instance._Attach = function (element) {
    if (this._TopLevel) {
        this._DetachLayer(this._TopLevel);
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
    this._TopLevel = element;
    this._TopLevel.Loaded.Subscribe(this._HandleTopLevelLoaded, this);
    this._AttachLayer(this._TopLevel);
    var surface = this;
    var postAttach = function () {
        surface._TopLevel._SetIsAttached(true);
        surface._TopLevel._SetIsLoaded(true);
        surface._App.OnLoaded();
    };
    setTimeout(postAttach, 1);
};
Surface.Instance._AttachLayer = function (layer) {
    if (Nullstone.RefEquals(layer, this._TopLevel))
        this._Layers.Insert(0, layer);
    else
        this._Layers.Add(layer);
    layer._FullInvalidate(true);
    layer._InvalidateMeasure();
    layer._SetIsAttached(true);
    layer._SetIsLoaded(true);
};
Surface.Instance._DetachLayer = function (layer) {
};
Surface.Instance.GetCanvas = function () { return this._jCanvas[0]; };
Surface.Instance.GetExtents = function () {
    return new Size(this.GetWidth(), this.GetHeight());
};
Surface.Instance.GetWidth = function () {
    return this._jCanvas.width();
};
Surface.Instance.GetHeight = function () {
    return this._jCanvas.height();
};
Surface.Instance._Invalidate = function (rect) {
    if (!rect)
        rect = new Rect(0, 0, this.GetWidth(), this.GetHeight());
    if (!this._InvalidatedRect)
        this._InvalidatedRect = rect;
    else
        this._InvalidatedRect = this._InvalidatedRect.Union(rect);
    this._QueueRender();
};
Surface.Instance._QueueRender = function () {
    if (this._IsRenderQueued)
        return;
    var surface = this;
    this._IsRenderQueued = true;
    setTimeout(function () {
        surface._IsRenderQueued = false;
        var rect2 = surface._InvalidatedRect;
        surface._InvalidatedRect = null;
        surface.Render(rect2);
    }, 1);
};
Surface.Instance.Render = function (region) {
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
Surface.Instance._HandleTopLevelLoaded = function (sender, args) {
    var element = sender;
    this._TopLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded, this);
    if (Nullstone.RefEquals(element, this._TopLevel)) {
        element._UpdateTotalRenderVisibility();
        element._UpdateTotalHitTestVisibility();
        element._FullInvalidate(true);
        element._InvalidateMeasure();
    }
};
Surface.Instance.ProcessDirtyElements = function () {
    var error = new BError();
    var dirty = this._UpdateLayout(error);
    if (error.IsErrored()) {
        throw error.CreateException();
    }
    return dirty;
};
Surface.Instance._UpdateLayout = function (error) {
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
        this._ProcessDownDirtyElements();
        this._ProcessUpDirtyElements();
        if (pass._Updated/* && dirty*/) {
        }
    }
    if (pass._Count >= LayoutPass.MaxCount) {
        if (error)
            error.SetErrored(BError.Exception, "UpdateLayout has entered infinite loop and has been aborted.");
    }
    return dirty;
};
Surface.Instance._ProcessDownDirtyElements = function () {
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
Surface.Instance._ProcessUpDirtyElements = function () {
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
Surface.Instance._PropagateDirtyFlagToChildren = function (element, dirt) {
    var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical);
    var child;
    while (child = walker.Step()) {
        this._AddDirtyElement(child, dirt);
    }
};
Surface.Instance._AddDirtyElement = function (element, dirt) {
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
    this._Invalidate();
};
Surface.Instance._RemoveDirtyElement = function (element) {
    if (element._UpDirtyNode)
        this._UpDirty.RemoveDirtyNode(element._UpDirtyNode);
    if (element._DownDirtyNode)
        this._DownDirty.RemoveDirtyNode(element._DownDirtyNode);
    element._UpDirtyNode = null;
    element._DownDirtyNode = null;
};
Surface.Instance._IsTopLevel = function (top) {
    if (!top || !this._Layers)
        return false;
    var ret = false; //TODO: full-screen message
    var count = this._Layers.GetCount();
    for (var i = 0; i < count && !ret; i++) {
        var layer = this._Layers.GetValueAt(i);
        ret = Nullstone.RefEquals(top, layer);
    }
    return ret;
};
Surface.Instance._UpdateCursorFromInputList = function () {
    var newCursor = CursorType.Default;
    for (var node = this._InputList.First(); node; node = node.Next) {
        newCursor = node.UIElement.GetCursor();
        if (newCursor !== CursorType.Default)
            break;
    }
    this._SetCursor(newCursor);
};
Surface.Instance._SetCursor = function (cursor) {
    this._Cursor = cursor;
    this._jCanvas.css("cursor", cursor);
};
Surface.Instance._HandleButtonRelease = function (evt) {
    var button = evt.which ? evt.which : evt.button;
    var pos = this._GetMousePosition(evt);
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("up", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
    if (this._Captured)
        this._PerformReleaseCapture();
};
Surface.Instance._HandleButtonPress = function (evt) {
    var button = evt.which ? evt.which : evt.button;
    var pos = this._GetMousePosition(evt);
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("down", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleWheel = function (pos) {
    this._HandleMouseEvent("wheel", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleMove = function (evt) {
    var pos = this._GetMousePosition(event);
    this._HandleMouseEvent("move", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleOut = function (evt) {
    var pos = this._GetMousePosition(event);
    this._HandleMouseEvent("out", null, pos);
};
Surface.Instance._HandleMouseEvent = function (type, button, pos, emitLeave, emitEnter) {
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
        var newInputList = new LinkedList();
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
Surface.Instance._GetMousePosition = function (evt) {
    return new Point(
        evt.clientX - this._CanvasOffset.left,
        evt.clientY - this._CanvasOffset.top);
};
Surface.Instance._FindFirstCommonElement = function (list1, list2, outObj) {
    var ui1 = list1.Last();
    var i1 = list1._Count - 1;
    var ui2 = list2.Last();
    var i2 = list2._Count - 1;
    outObj.Index1 = -1;
    outObj.Index2 = -1;
    while (ui1 != null && ui2 != null) {
        if (Nullstone.RefEquals(ui1.UIElement, ui2.UIElement)) {
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
Surface.Instance._EmitMouseList = function (type, button, pos, list, endIndex) {
    if (endIndex === 0)
        return;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    var i = 0;
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitMouseEvent(type, button, pos);
    }
};
Surface.Instance.SetMouseCapture = function (uie) {
    if (this._Captured || this._PendingCapture)
        return Nullstone.RefEquals(uie, this._Captured) || Nullstone.RefEquals(uie, this._PendingCapture);
    if (!this._EmittingMouseEvent)
        return false;
    this._PendingCapture = uie;
    return true;
};
Surface.Instance.ReleaseMouseCapture = function (uie) {
    if (!Nullstone.RefEquals(uie, this._Captured) && !Nullstone.RefEquals(uie, this._PendingCapture))
        return;
    if (this._EmittingMouseEvent)
        this._PendingReleaseCapture = true;
    else
        this._PerformReleaseCapture();
};
Surface.Instance._PerformCapture = function (uie) {
    this._Captured = uie;
    var newInputList = new LinkedList();
    while (uie != null) {
        newInputList.Append(new UIElementNode(uie));
        uie = uie.GetVisualParent();
    }
    this._InputList = newInputList;
    this._PendingCapture = null;
};
Surface.Instance._PerformReleaseCapture = function () {
    var oldCaptured = this._Captured;
    this._Captured = null;
    this._PendingReleaseCapture = false;
    oldCaptured._EmitLostMouseCapture(this._CurrentPos);
    this._HandleMouseEvent("noop", null, this._CurrentPos, false, true);
};
Surface.Instance._HandleKeyPress = function (eve) {
    this._SetUserInitiatedEvent(true);
    var handled = false;
    if (this._FocusedElement != null) {
        var focusToRoot = Surface._ElementPathToRoot(this._FocusedElement);
        var modifiers = {
            Shift: eve.shiftKey,
            Ctrl: eve.ctrlKey,
            Alt: eve.altKey
        };
        handled = this._EmitKeyDown(focusToRoot, modifiers, eve.keyCode);
    }
    if (!handled && eve.keyCode === 9) { //Tab
        if (this._FocusedElement != null)
            TabNavigationWalker.Focus(this._FocusedElement, eve.shiftKey);
        else
            this._EnsureElementFocused();
    }
    this._SetUserInitiatedEvent(false);
    return handled;
};
Surface.Instance._EmitKeyDown = function (list, modifiers, keyCode, endIndex) {
    if (endIndex === 0)
        return;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    var i = 0;
    var args = new KeyEventArgs(modifiers, keyCode);
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitKeyDown(args);
    }
};
Surface.Instance._FocusElement = function (uie) {
    if (Nullstone.RefEquals(uie, this._FocusedElement))
        return true;
    if (this._FocusedElement != null)
        this._FocusChangedEvents.Append(new FocusChangedNode(Surface._ElementPathToRoot(this._FocusedElement), null));
    this._FocusedElement = uie;
    if (uie)
        this._FocusChangedEvents.Append(new FocusChangedNode(null, Surface._ElementPathToRoot(uie)));
    if (this._FirstUserInitiatedEvent)
        this._EmitFocusChangeEventsAsync();
    return true;
};
Surface.Instance._RemoveFocus = function (uie) {
    if (Nullstone.RefEquals(this._FocusedElement, uie))
        this._FocusElement(null);
};
Surface.Instance._EnsureElementFocused = function () {
};
Surface.Instance._EmitFocusChangeEventsAsync = function () {
    var surface = this;
    window.setTimeout(function () { surface._EmitFocusChangeEvents(); }, 1);
};
Surface.Instance._EmitFocusChangeEvents = function () {
    var node;
    while (node = this._FocusChangedEvents.First()) {
        this._FocusChangedEvents.Remove(node);
        this._EmitFocusList("lost", node.LostFocus);
        this._EmitFocusList("got", node.GotFocus);
    }
};
Surface.Instance._EmitFocusList = function (type, list) {
    if (list == null)
        return;
    for (var node = list.First(); node; node = node.Next) {
        node.UIElement._EmitFocusChange(type);
    }
};
Surface.Instance._SetUserInitiatedEvent = function (val) {
    this._EmitFocusChangeEvents();
    this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
    this._UserInitiatedEvent = val;
};
Surface.MeasureText = function (text, font) {
    return new Size(Surface._MeasureWidth(text, font), Surface._MeasureHeight(font));
};
Surface._MeasureWidth = function (text, font) {
    var test = Surface._EnsureTestCanvas();
    test.Context.font = font.ToHtml5Object();
    return test.Context.measureText(text).width;
};
Surface._MeasureHeight = function (font) {
    if (font._CachedHeight)
        return font._CachedHeight;
    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font.ToHtml5Object() + ";");
    body.appendChild(dummy);
    var result = dummy.offsetHeight;
    body.removeChild(dummy);
    font._CachedHeight = result;
    return result;
};
Surface.IsLeftButton = function (button) {
    return button === 1;
};
Surface.IsRightButton = function (button) {
    return button === 2;
};
Surface._ElementPathToRoot = function (source) {
    var list = new LinkedList();
    while (source) {
        list.Append(new UIElementNode(source));
        source = source.GetVisualParent();
    }
    return list;
};
Surface._EnsureTestCanvas = function () {
    var canvas = Surface._TestCanvas;
    var ctx = Surface._TestCanvasContext;
    if (!ctx) {
        if (!canvas)
            canvas = Surface._TestCanvas = document.createElement('canvas');
        ctx = Surface._TestCanvasContext = canvas.getContext('2d');
    }
    return {
        Canvas: canvas,
        Context: ctx
    };
};
Nullstone.FinishCreate(Surface);

var BindingMarkup = Nullstone.Create("BindingMarkup", Markup, 1);
BindingMarkup.Instance.Init = function (data) {
    if (!data)
        data = {};
    this._Data = data;
};
BindingMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    return new BindingExpression(this._BuildBinding(), target, propd);
};
BindingMarkup.Instance._BuildBinding = function () {
    var b = new Binding(this._Data.Path);
    if (this._Data.FallbackValue !== undefined)
        b.SetFallbackValue(this._Data.FallbackValue);
    if (this._Data.Mode !== undefined)
        b.SetMode(this._Data.Mode);
    return b;
};
Nullstone.FinishCreate(BindingMarkup);

var Clip = Nullstone.Create("Clip", null, 1);
Clip.Instance.Init = function (rect) {
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
};
Nullstone.FinishCreate(Clip);

var _TextBlockDynamicPropertyValueProvider = Nullstone.Create("_TextBlockDynamicPropertyValueProvider", FrameworkElementPropertyValueProvider, 2);
_TextBlockDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$FrameworkElementPropertyValueProvider(obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
};
_TextBlockDynamicPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return this.GetPropertyValue$FrameworkElementPropertyValueProvider(propd);
};
Nullstone.FinishCreate(_TextBlockDynamicPropertyValueProvider);

var _TextBoxBaseDynamicPropertyValueProvider = Nullstone.Create("_TextBoxBaseDynamicPropertyValueProvider", FrameworkElementPropertyValueProvider, 5);
_TextBoxBaseDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    this.Init$FrameworkElementPropertyValueProvider(obj, propPrecedence, 
        _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
};
_TextBoxBaseDynamicPropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;
    this.RecomputePropertyValue$FrameworkElementPropertyValueProvider(propd, providerFlags, error);
};
_TextBoxBaseDynamicPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    var v;
    if (propd == this._BackgroundPropd) {
        v = this._Object.$GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionBackground;
    } else if (propd == this._ForegroundPropd) {
        v = this._Object.$GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionForeground;
    } else if (propd == this._BaselineOffsetPropd) {
        var _TextBoxView = this._Object._View;
        this._BaselineOffset = _TextBoxView == null ? 0 : _TextBoxView.GetBaselineOffset();
        v = this._BaselineOffset;
    }
    if (v != undefined)
        return v;
    return this.GetPropertyValue$FrameworkElementPropertyValueProvider(propd);
};
_TextBoxBaseDynamicPropertyValueProvider.Instance._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(Color.FromHex("#FF444444"));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(Color.FromHex("#FFFFFFFF"));
};
Nullstone.FinishCreate(_TextBoxBaseDynamicPropertyValueProvider);

var _TextBoxDynamicPropertyValueProvider = Nullstone.Create("_TextBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider, 2);
_TextBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, 
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
};
Nullstone.FinishCreate(_TextBoxDynamicPropertyValueProvider);

var DependencyObject = Nullstone.Create("DependencyObject");
DependencyObject.Instance.Init = function () {
    this._IsAttached = false;
    this._Providers = [];
    this._Providers[_PropertyPrecedence.LocalValue] = new _LocalValuePropertyValueProvider(this, _PropertyPrecedence.LocalValue);
    this._Providers[_PropertyPrecedence.DefaultValue] = new _DefaultValuePropertyValueProvider(this, _PropertyPrecedence.DefaultValue);
    this._Providers[_PropertyPrecedence.AutoCreate] = new _AutoCreatePropertyValueProvider(this, _PropertyPrecedence.AutoCreate);
    this._ProviderBitmasks = [];
    this._SecondaryParents = [];
    this.PropertyChanged = new MulticastEvent();
    this._SubPropertyListeners = [];
};
DependencyObject.NameProperty = DependencyProperty.RegisterFull("Name", function () { return String; }, DependencyObject, "", null, null, false, DependencyObject._NameValidator);
DependencyObject.Instance.GetName = function () {
    return this.$GetValue(DependencyObject.NameProperty);
};
DependencyObject.Instance.SetName = function (value) {
    this.$SetValue(DependencyObject.NameProperty, value);
};
DependencyObject.Instance.GetTemplateOwner = function () {
    return this._TemplateOwner;
};
DependencyObject.Instance.SetTemplateOwner = function (value) {
    this._TemplateOwner = value;
};
DependencyObject.Instance.GetMentor = function () {
    return this._Mentor;
};
DependencyObject.Instance.SetMentor = function (value) {
    if (this._Mentor == value)
        return;
    var oldMentor = this._Mentor;
    this._Mentor = value;
    this._OnMentorChanged(oldMentor, value);
};
DependencyObject.Instance._OnMentorChanged = function (oldValue, newValue) {
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
DependencyObject.Instance.GetDependencyProperty = function (propName) {
    return DependencyProperty.GetDependencyProperty(this.constructor, propName);
};
DependencyObject.Instance.$SetValue = function (propd, value) {
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
        var path = bindingExpression.GetBinding().GetPath().GetPath();
        if ((!path || path === ".") && bindingExpression.GetBinding().GetMode() === BindingMode.TwoWay)
            throw new ArgumentException("TwoWay bindings require a non-empty Path.");
        bindingExpression.GetBinding().Seal();
    }
    var existing = null;
    if (this._Expressions != null) {
        var data = {};
        if (this._Expressions.TryGetValue(propd, data))
            existing = data.Value
    }
    var addingExpression = false;
    var updateTwoWay = false;
    if (expression != null) {
        if (!Nullstone.RefEquals(expression, existing)) {
            if (expression.GetAttached())
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
            if (existing.GetBinding().GetMode() === BindingMode.TwoWay) {
                updateTwoWay = !existing.GetUpdating() && !propd._IsCustom;
            } else if (!existing.GetUpdating() || existing.GetBinding().GetMode() === BindingMode.OneTime) {
                this._RemoveExpression(propd);
            }
        } else if (!existing.GetUpdating()) {
            this._RemoveExpression(propd);
        }
    }
    try {
        this._SetValueInternal(propd, value);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    } catch (err) {
        if (!addingExpression)
            throw err;
        this._SetValueInternal(propd, propd.DefaultValue);
        if (updateTwoWay)
            existing._TryUpdateSourceObject(value);
    }
};
DependencyObject.Instance._SetValueInternal = function (propd, value, error) {
    if (error == null)
        error = new BError();
    var hasCoercer = propd._HasCoercer();
    var coerced = value;
    if ((hasCoercer && !(coerced = propd._Coerce(this, coerced, error)))
            || !this._IsValueValid(propd, coerced, error)
            || !propd._Validate(this, propd, coerced, error)) {
        if (error.IsErrored())
            throw new error.CreateException();
        return false;
    }
    var retVal = this._SetValueImpl(propd, coerced, error);
    if (error.IsErrored())
        throw new error.CreateException();
    return retVal;
};
DependencyObject.Instance._SetValueImpl = function (propd, value, error) {
    if (this._IsFrozen) {
        error.SetErrored(BError.UnauthorizedAccess, "Cannot set value for property " + propd.Name + " on frozen DependencyObject.");
        return false;
    }
    var currentValue;
    var equal = false;
    if ((currentValue = this.ReadLocalValue(propd)) == null)
        if (propd._IsAutoCreated)
            currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    if (currentValue != null && value != null)
        equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
    else
        equal = currentValue == null && value == null;
    if (!equal) {
        var newValue;
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated)
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);
        if (value != null && (!propd._IsAutoCreated || !(value instanceof DependencyObject) || Nullstone.As(value, DependencyObject) != null))
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
DependencyObject.Instance.$GetValue = function (propd, startingPrecedence, endingPrecedence) {
    if (startingPrecedence === undefined)
        startingPrecedence = _PropertyPrecedence.Highest;
    if (endingPrecedence === undefined)
        endingPrecedence = _PropertyPrecedence.Lowest;
    var bitmask = this._ProviderBitmasks[propd._ID] || 0;
    bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated)
        bitmask |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue)
        bitmask |= 1 << _PropertyPrecedence.DefaultValue;
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
DependencyObject.Instance.ClearValue = function (propd, notifyListeners, error) {
    if (notifyListeners == undefined)
        notifyListeners = true;
    if (error == undefined)
        error = new BError();
    if (this._GetAnimationStorageFor(propd) != null) {
        return;
    }
    var oldLocalValue;
    if ((oldLocalValue = this.ReadLocalValue(propd)) == null) {
        if (propd._IsAutoCreated)
            oldLocalValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    }
    if (oldLocalValue != null) {
        if (oldLocalValue instanceof DependencyObject) {
            if (oldLocalValue != null && !propd._IsCustom) {
                oldLocalValue._RemoveParent(this, null);
                oldLocalValue._SetIsAttached(false);
                if (oldLocalValue instanceof Collection) {
                }
            }
        }
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated)
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
DependencyObject.Instance.ReadLocalValue = function (propd) {
    var val = this._Providers[_PropertyPrecedence.LocalValue].GetPropertyValue(propd);
    if (val === undefined)
        val = new UnsetValue();
    return val;
};
DependencyObject.Instance._GetValueNoAutoCreate = function (propd) {
    var v = this.$GetValue(propd, _PropertyPrecedence.LocalValue, _PropertyPrecedence.InheritedDataContext);
    if (v == null && propd._IsAutoCreated)
        v = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    return v;
};
DependencyObject.Instance._GetValueNoDefault = function (propd) {
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
DependencyObject.Instance._PropertyHasValueNoAutoCreate = function (propd, obj) {
    var v = this._GetValueNoAutoCreate(propd);
    return v == null ? obj == null : v == obj;
};
DependencyObject.Instance._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
    var bitmask = this._ProviderBitmasks[propd._ID] || 0;
    if (newProviderValue != null)
        bitmask |= 1 << providerPrecedence;
    else
        bitmask &= ~(1 << providerPrecedence);
    this._ProviderBitmasks[propd._ID] = bitmask;
    var higher = 0;
    for (var i = providerPrecedence; i >= _PropertyPrecedence.LocalValue; i--) {
        higher |= 1 << i;
    }
    higher &= bitmask;
    higher |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated)
        higher |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue)
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
        var lowerPriorityValue = this.$GetValue(propd, providerPrecedence + 1);
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
        equal = !propd._AlwaysChange && Nullstone.Equals(oldValue, newValue);
    }
    if (equal)
        return;
    if (providerPrecedence !== _PropertyPrecedence.IsEnabled && this._Providers[_PropertyPrecedence.IsEnabled] && this._Providers[_PropertyPrecedence.IsEnabled].LocalValueChanged(propd))
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
            oldDO.RemovePropertyChangedListener(this, propd);
            if (oldDO instanceof Collection) {
                oldDO.Changed.Unsubscribe(this._OnCollectionChangedEH, this);
                oldDO.ItemChanged.Unsubscribe(this._OnCollectionItemChangedEH, this);
            }
        } else {
            oldDO.SetMentor(null);
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
                newDO.Changed.Subscribe(this._OnCollectionChangedEH, this);
                newDO.ItemChanged.Subscribe(this._OnCollectionItemChangedEH, this);
            }
            newDO.AddPropertyChangedListener(this, propd);
            newDO._AddTarget(this);
        } else {
            var cur = this;
            while (cur && !(cur instanceof FrameworkElement))
                cur = cur.GetMentor();
            newDO.SetMentor(cur);
        }
    }
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
};
DependencyObject.Instance._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence, error) {
    for (var i = 0; i < _PropertyPrecedence.Count; i++) {
        var provider = this._Providers[i];
        if (provider == null)
            continue;
        if (i === providerPrecedence)
            continue;
        if (i < providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnLowerPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnLowerPriorityChange, error);
        else if (i > providerPrecedence && provider._HasFlag(_ProviderFlags.RecomputesOnHigherPriorityChange))
            provider.RecomputePropertyValue(propd, _ProviderFlags.RecomputesOnHigherPriorityChange, error);
    }
};
DependencyObject.Instance._PropagateInheritedValue = function (inheritable, source, newValue) {
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
DependencyObject.Instance._GetInheritedValueSource = function (inheritable) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return null;
    return inheritedProvider._GetPropertySource(inheritable);
};
DependencyObject.Instance._SetInheritedValueSource = function (inheritable, source) {
    var inheritedProvider = this._Providers[_PropertyPrecedence.Inherited];
    if (inheritedProvider == null)
        return;
    if (!source) {
        var propd = _InheritedPropertyValueProvider.GetProperty(inheritable, this);
        if (propd)
            return;
        var bitmask = this._ProviderBitmasks[propd._ID];
        bitmask &= ~(1 << _PropertyPrecedence.Inherited);
        this._ProviderBitmasks[propd._ID] = bitmask;
    }
    inheritedProvider._SetPropertySource(inheritable, source);
};
DependencyObject.Instance._GetPropertyValueProvider = function (propd) {
    var bitmask = this._ProviderBitmasks[propd._ID];
    for (var i = 0; i < _PropertyPrecedence.Lowest; i++) {
        var p = 1 << i;
        if ((bitmask & p) == p)
            return i;
        if (i == _PropertyPrecedence.DefaultValue && propd._HasDefaultValue)
            return i;
        if (i == _PropertyPrecedence.AutoCreate && propd._IsAutoCreated)
            return i;
    }
    return -1;
};
DependencyObject.Instance._IsValueValid = function (propd, coerced, error) {
    return true;
};
DependencyObject.Instance._RemoveExpression = function (propd) {
    var data = {};
    if (this._Expressions != null && this._Expressions.TryGetValue(propd, data)) {
        this._Expressions.Remove(propd);
        data.Value._OnDetached(this);
    }
};
DependencyObject.Instance._AddTarget = function (obj) {
};
DependencyObject.Instance._RemoveTarget = function (obj) {
};
DependencyObject.Instance._GetResourceBase = function () {
    var rb = this._ResourceBase;
    if (rb)
        rb = rb.replace(/^\s+/, ''); //trim if not null
    if (rb != null && rb.length > 0)
        return this._ResourceBase;
    if (this._Parent != null)
        return this._Parent._GetResourceBase();
    return this._ResourceBase;
};
DependencyObject.Instance._SetResourceBase = function (value) {
    this._ResourceBase = value;
};
DependencyObject.Instance._SetIsAttached = function (value) {
    if (this._IsAttached == value)
        return;
    this._IsAttached = value;
    this._OnIsAttachedChanged(value);
};
DependencyObject.Instance._OnIsAttachedChanged = function (value) {
    this._Providers[_PropertyPrecedence.LocalValue].ForeachValue(DependencyObject._PropagateIsAttached, value);
    this._Providers[_PropertyPrecedence.AutoCreate].ForeachValue(DependencyObject._PropagateIsAttached, value);
};
DependencyObject.Instance._OnPropertyChanged = function (args, error) {
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
DependencyObject.Instance.AddPropertyChangedListener = function (ldo, propd) {
    var listener = new SubPropertyListener(ldo, propd);
    this._SubPropertyListeners.push(listener);
    this.PropertyChanged.Subscribe(listener.OnSubPropertyChanged, listener);
};
DependencyObject.Instance.RemovePropertyChangedListener = function (ldo, propd) {
    for (var i = 0; i < this._SubPropertyListeners.length; i++) {
        var listener = this._SubPropertyListeners[i];
        if (!Nullstone.Equals(listener._Dobj, ldo))
            continue;
        if (propd != null && listener._Propd._ID !== propd._ID)
            continue;
        this.PropertyChanged.Unsubscribe(listener.OnSubPropertyChanged, listener);
        this._SubPropertyListeners.slice(i, 1);
        break;
    }
};
DependencyObject.Instance._OnSubPropertyChanged = function (propd, sender, args) { };
DependencyObject.Instance._OnCollectionChangedEH = function (sender, args) {
    this._OnCollectionChanged(sender, args);
};
DependencyObject.Instance._OnCollectionChanged = function (sender, args) { };
DependencyObject.Instance._OnCollectionItemChangedEH = function (sender, args) {
    this._OnCollectionItemChanged(sender, args);
};
DependencyObject.Instance._OnCollectionItemChanged = function (sender, args) { };
DependencyObject._PropagateIsAttached = function (propd, value, newIsAttached) {
    if (propd._IsCustom)
        return;
    if (value != null && value instanceof DependencyObject) {
        value._SetIsAttached(newIsAttached);
    }
};
DependencyObject._PropagateMentor = function (propd, value, newMentor) {
    if (value != null && value instanceof DependencyObject) {
        value.SetMentor(newMentor);
    }
};
DependencyObject.Instance.FindName = function (name, isTemplateItem) {
    if (isTemplateItem === undefined)
        isTemplateItem = Control.GetIsTemplateItem(this);
    var scope = NameScope.GetNameScope(this);
    if (scope && (isTemplateItem === scope.GetIsLocked()))
        return scope.FindName(name);
    if (this._Parent)
        return this._Parent.FindName(name, isTemplateItem);
    return undefined;
};
DependencyObject.Instance.FindNameScope = function (templateNamescope) {
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
DependencyObject.Instance.SetNameOnScope = function (name, scope) {
    if (scope.FindName(name))
        return false;
    this.$SetValue(DependencyObject.NameProperty, name);
    scope.RegisterName(name, this);
    return true;
};
DependencyObject.Instance._RegisterAllNamesRootedAt = function (namescope, error) {
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
DependencyObject.Instance._UnregisterAllNamesRootedAt = function (fromNs) {
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
DependencyObject.Instance._GetParent = function () {
    return this._Parent;
};
DependencyObject.Instance._PermitsMultipleParents = function () {
    return true;
};
DependencyObject.Instance._AddParent = function (parent, mergeNamesFromSubtree, error) {
    if (false/* TODO: IsShuttingDown */) {
        this._Parent = null;
        return;
    }
    var current = parent;
    while (current != null) {
        if (Nullstone.RefEquals(current, this)) {
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
            this.SetMentor(null);
        if (this._SecondaryParents.length > 1 || !(parent instanceof DependencyObjectCollection) || !parent._GetIsSecondaryParent())
            return;
    }
    var thisScope = NameScope.GetNameScope(this);
    var parentScope = parent.FindNameScope();
    if (thisScope) {
        if (thisScope._GetTemporary()) {
            if (parentScope != null) {
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
        if (parentScope != null && mergeNamesFromSubtree) {
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
            d = d.GetMentor();
        }
        this.SetMentor(d);
    }
};
DependencyObject.Instance._RemoveParent = function (parent, error) {
    if (this._RemoveSecondaryParent(parent)) {
        if (this._HasSecondaryParents() || !(parent instanceof DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
            return;
    } else {
        if (!Nullstone.RefEquals(this._Parent, parent))
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
        this.SetMentor(null);
    }
    if (error == null || !error.IsErrored()) {
        if (Nullstone.RefEquals(this._Parent, parent))
            this._Parent = null;
    }
};
DependencyObject.Instance._AddSecondaryParent = function (obj) {
    this._SecondaryParents.push(obj);
};
DependencyObject.Instance._RemoveSecondaryParent = function (obj) {
    var index = -1;
    for (var i = 0; i < this._SecondaryParents.length; i++) {
        if (Nullstone.RefEquals(this._SecondaryParents[i], obj)) {
            index = i;
            break;
        }
    }
    if (index < 0)
        return false;
    this._SecondaryParents.splice(index, 1);
    return true;
};
DependencyObject.Instance._GetSecondaryParents = function () {
    return this._SecondaryParents;
};
DependencyObject.Instance._HasSecondaryParents = function () {
    return this._SecondaryParents.length > 0;
};
DependencyObject.Instance._GetAnimationStorageFor = function (propd) {
    if (this._StorageRepo == null)
        return null;
    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return null;
    return list.Last().Storage;
};
DependencyObject.Instance._AttachAnimationStorage = function (propd, storage) {
    var attachedStorage = null;
    if (this._StorageRepo == null)
        this._StorageRepo = [];
    var list = this._StorageRepo[propd];
    if (list == null) {
        list = new LinkedList();
        this._StorageRepo[propd] = list;
    } else if (!list.IsEmpty()) {
        attachedStorage = list.Last().Storage;
        attachedStorage.Disable();
    }
    var node = new LinkedListNode();
    node.Storage = storage;
    list.Append(node);
    return attachedStorage;
};
DependencyObject.Instance._DetachAnimationStorage = function (propd, storage) {
    if (this._StorageRepo == null)
        return;
    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return;
    var last = list.Last();
    if (Nullstone.RefEquals(last.Storage, storage)) {
        list.Remove(last);
        if (!list.IsEmpty())
            list.Last().Storage.Enable();
    } else {
        var node = list.First();
        while (node) {
            if (Nullstone.RefEquals(node.Storage, storage)) {
                var remove = node;
                node = node.Next;
                node.Storage.SetStopValue(storage.GetStopValue());
                list.Remove(remove);
                break;
            }
            node = node.Next;
        }
    }
};
Nullstone.FinishCreate(DependencyObject);

var FrameworkTemplate = Nullstone.Create("FrameworkTemplate", DependencyObject);
FrameworkTemplate.Instance.GetVisualTree = function (bindingSource) {
    var error = new BError();
    return this._GetVisualTreeWithError(bindingSource, error);
};
FrameworkTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};
Nullstone.FinishCreate(FrameworkTemplate);

var NameScope = Nullstone.Create("NameScope", DependencyObject);
NameScope.Instance.Init = function () {
    this.Init$DependencyObject();
    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
};
NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", function () { return NameScope; }, NameScope);
NameScope.GetNameScope = function (d) {
    return d.$GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    d.$SetValue(NameScope.NameScopeProperty, value);
};
NameScope.Instance.GetIsLocked = function () {
    return this._IsLocked;
};
NameScope.Instance.Lock = function () {
    this._IsLocked = true;
};
NameScope.Instance.RegisterName = function (name, obj) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        this._Names = [];
    var existingObj = this._Names[name];
    if (existingObj == obj)
        return;
    if (existingObj) {
    }
    this._Names[name] = obj;
};
NameScope.Instance.UnregisterName = function (name) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        return;
    var objd = this._Names[name];
    if (objd instanceof DependencyObject) {
        delete this._Names[name];
    }
};
NameScope.Instance.FindName = function (name) {
    if (!this._Names)
        return undefined;
    if (name == null) {
        Warn("(null) name specified in NameScope.FindName.");
        return undefined;
    }
    return this._Names[name];
};
NameScope.Instance._MergeTemporaryScope = function (temp, error) {
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
NameScope.Instance._GetTemporary = function () {
    return this._Temporary;
};
NameScope.Instance._SetTemporary = function (value) {
    this._Temporary = value;
};
Nullstone.FinishCreate(NameScope);

var SetterBase = Nullstone.Create("SetterBase", DependencyObject);
SetterBase.Instance.Init = function () {
    this.Init$DependencyObject();
    this.SetAttached(false);
};
SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);
SetterBase.Instance.GetIsSealed = function () {
    return this.$GetValue(SetterBase.IsSealedProperty);
};
SetterBase.Instance.GetAttached = function () {
    return this._Attached;
};
SetterBase.Instance.SetAttached = function (value) {
    this._Attached = value;
};
SetterBase.Instance._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.$SetValue(SetterBase.IsSealedProperty, true);
};
Nullstone.FinishCreate(SetterBase);

var Style = Nullstone.Create("Style", DependencyObject);
Style.SettersProperty = DependencyProperty.RegisterFull("Setters", function () { return SetterBaseCollection; }, Style, null, { GetValue: function () { return new SetterBaseCollection(); } });
Style.Instance.GetSetters = function () {
    return this.$GetValue(Style.SettersProperty);
};
Style.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, Style);
Style.Instance.GetIsSealed = function () {
    return this.$GetValue(Style.IsSealedProperty);
};
Style.BasedOnProperty = DependencyProperty.Register("BasedOn", function () { return Function; }, Style);
Style.Instance.GetBasedOn = function () {
    return this.$GetValue(Style.BasedOnProperty);
};
Style.Instance.SetBasedOn = function (value) {
    this.$SetValue(Style.BasedOnProperty, value);
};
Style.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, Style);
Style.Instance.GetTargetType = function () {
    return this.$GetValue(Style.TargetTypeProperty);
};
Style.Instance.SetTargetType = function (value) {
    this.$SetValue(Style.TargetTypeProperty, value);
};
Style.Annotations = {
    ContentProperty: Style.SettersProperty
};
Style.Instance._Seal = function () {
    if (this.GetIsSealed())
        return;
    this._ConvertSetterValues();
    this.$SetValue(Style.IsSealedProperty, true);
    this.GetSetters()._Seal();
    var base = this.GetBasedOn();
    if (base != null)
        base._Seal();
};
Style.Instance._ConvertSetterValues = function () {
    var setters = this.GetSetters();
    for (var i = 0; i < setters.GetCount(); i++) {
        this._ConvertSetterValue(setters.GetValueAt(i));
    }
};
Style.Instance._ConvertSetterValue = function (setter) {
    var propd = setter.$GetValue(Setter.PropertyProperty);
    var val = setter.$GetValue(Setter.ValueProperty);
    if (typeof propd.GetTargetType() === "string") {
        if (typeof val !== "string")
            throw new XamlParseException("Setter value does not match property type.");
    }
    try {
        setter.$SetValue(Setter.ConvertedValueProperty, Fayde.TypeConverter.ConvertObject(propd, val, this.GetTargetType(), true));
    } catch (err) {
        throw new XamlParseException(err.message);
    }
};
Style.Instance._AddSetter = function (dobj, propName, value) {
    this.GetSetters().Add(JsonParser.CreateSetter(dobj, propName, value));
};
Style.Instance._AddSetterJson = function (dobj, propName, json) {
    var parser = new JsonParser();
    this._AddSetter(dobj, propName, parser.CreateObject(json, new NameScope()));
};
Style.Instance._AddSetterControlTemplate = function (dobj, propName, templateJson) {
    this._AddSetter(dobj, propName, new ControlTemplate(dobj.constructor, templateJson));
};
Nullstone.FinishCreate(Style);

var UIElement = Nullstone.Create("UIElement", DependencyObject);
UIElement.Instance.Init = function () {
    this.Init$DependencyObject();
    this.Unloaded = new MulticastEvent();
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
    this.LostMouseCapture.Subscribe(this.OnLostMouseCapture, this);
    this.GotFocus = new MulticastEvent();
    this.GotFocus.Subscribe(this.OnGotFocus, this);
    this.LostFocus = new MulticastEvent();
    this.LostFocus.Subscribe(this.OnLostFocus, this);
    this.KeyDown = new MulticastEvent();
    this.KeyDown.Subscribe(this.OnKeyDown, this);
    this.KeyUp = new MulticastEvent();
    this.KeyUp.Subscribe(this.OnKeyUp, this);
    this.RequestBringIntoView = new MulticastEvent();
};
UIElement.ClipProperty = DependencyProperty.Register("Clip", function () { return Geometry; }, UIElement);
UIElement.Instance.GetClip = function () {
    return this.$GetValue(UIElement.ClipProperty);
};
UIElement.Instance.SetClip = function (value) {
    this.$SetValue(UIElement.ClipProperty, value);
};
UIElement.IsHitTestVisibleProperty = DependencyProperty.Register("IsHitTestVisible", function () { return Boolean; }, UIElement, true);
UIElement.Instance.GetIsHitTestVisible = function () {
    return this.$GetValue(UIElement.IsHitTestVisibleProperty);
};
UIElement.Instance.SetIsHitTestVisible = function (value) {
    this.$SetValue(UIElement.IsHitTestVisibleProperty, value);
};
UIElement.OpacityMaskProperty = DependencyProperty.Register("OpacityMask", function () { return Brush; }, UIElement);
UIElement.Instance.GetOpacityMask = function () {
    return this.$GetValue(UIElement.OpacityMaskProperty);
};
UIElement.Instance.SetOpacityMask = function (value) {
    this.$SetValue(UIElement.OpacityMaskProperty, value);
};
UIElement.OpacityProperty = DependencyProperty.Register("Opacity", function () { return Number; }, UIElement, 1.0);
UIElement.Instance.GetOpacity = function () {
    return this.$GetValue(UIElement.OpacityProperty);
};
UIElement.Instance.SetOpacity = function (value) {
    this.$SetValue(UIElement.OpacityProperty, value);
};
UIElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () { return new Enum(CursorType); }, UIElement, CursorType.Default, null); //, UIElement._CoerceCursor);
UIElement.Instance.GetCursor = function () {
    return this.$GetValue(UIElement.CursorProperty);
};
UIElement.Instance.SetCursor = function (value) {
    this.$SetValue(UIElement.CursorProperty, value);
};
UIElement.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, UIElement, null, { GetValue: function () { return new ResourceDictionary(); } });
UIElement.Instance.GetResources = function () {
    return this.$GetValue(UIElement.ResourcesProperty);
};
UIElement.TriggersProperty = DependencyProperty.RegisterFull("Triggers", function () { return Object; }, UIElement/*, null, { GetValue: function () { } }*/);
UIElement.Instance.GetTriggers = function () {
    return this.$GetValue(UIElement.TriggersProperty);
};
UIElement.UseLayoutRoundingProperty = DependencyProperty.Register("UseLayoutRounding", function () { return Boolean; }, UIElement);
UIElement.Instance.GetUseLayoutRounding = function () {
    return this.$GetValue(UIElement.UseLayoutRoundingProperty);
};
UIElement.Instance.SetUseLayoutRounding = function (value) {
    this.$SetValue(UIElement.UseLayoutRoundingProperty, value);
};
UIElement.VisibilityProperty = DependencyProperty.Register("Visibility", function () { return new Enum(Visibility); }, UIElement, Visibility.Visible);
UIElement.Instance.GetVisibility = function () {
    return this.$GetValue(UIElement.VisibilityProperty);
};
UIElement.Instance.SetVisibility = function (value) {
    this.$SetValue(UIElement.VisibilityProperty, value);
};
UIElement.TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
UIElement.Instance.GetTag = function () {
    return this.$GetValue(UIElement.TagProperty);
};
UIElement.Instance.SetTag = function (value) {
    this.$SetValue(UIElement.TagProperty, value);
};
UIElement.Instance.BringIntoView = function (rect) {
    if (rect == null) rect = new Rect();
    var args = new RequestBringIntoViewEventArgs(this, rect);
    var cur = this;
    while (cur != null && !args.Handled) {
        cur.RequestBringIntoView.Raise(this, args);
        cur = VisualTreeHelper.GetParent(cur);
    }
};
UIElement.Instance.SetVisualParent = function (value) {
    this._VisualParent = value;
};
UIElement.Instance.GetVisualParent = function () {
    return this._VisualParent;
};
UIElement.Instance.IsLayoutContainer = function () { return false; };
UIElement.Instance.IsContainer = function () { return this.IsLayoutContainer(); };
UIElement.Instance.IsAncestorOf = function (el) {
    var parent = el;
    while (parent != null && !Nullstone.RefEquals(parent, this))
        parent = VisualTreeHelper.GetParent(parent);
    return Nullstone.RefEquals(parent, this);
};
UIElement.Instance.TransformToVisual = function (uie) {
    var visual = this;
    var ok = false;
    var surface = App.Instance.MainSurface;
    if (this._IsAttached) {
        while (visual != null) {
            if (surface._IsTopLevel(visual))
                ok = true;
            visual = visual.GetVisualParent();
        }
    }
    if (!ok || (uie != null && !uie._IsAttached)) {
        throw new ArgumentException("UIElement not attached.");
        return null;
    }
    if (uie != null && !surface._IsTopLevel(uie)) {
        ok = false;
        visual = uie.GetVisualParent();
        if (visual != null && uie._IsAttached) {
            while (visual != null) {
                if (surface._IsTopLevel(visual))
                    ok = true;
                visual = visual.GetVisualParent();
            }
        }
        if (!ok) {
            throw new ArgumentException("UIElement not attached.");
            return null;
        }
    }
    var result;
    var thisProjection;
    if (!this._CachedTransform || !(thisProjection = this._CachedTransform.Normal))
        throw new Exception("Cannot find transform.");
    if (uie != null) {
        var inverse;
        if (!uie._CachedTransform || !(inverse = uie._CachedTransform.Inverse))
            throw new Exception("Cannot find transform.");
        result = inverse.MultiplyMatrix(thisProjection);
    } else {
        result = thisProjection.Copy();
    }
    var mt = new MatrixTransform();
    mt.SetMatrix(result);
    return mt;
};
UIElement.Instance._CacheInvalidateHint = function () {
};
UIElement.Instance._FullInvalidate = function (renderTransform) {
    this._Invalidate();
    if (renderTransform) {
        this._UpdateTransform();
        this._UpdateProjection();
    }
    this._UpdateBounds(true);
};
UIElement.Instance._Invalidate = function (rect) {
    if (!rect)
        rect = this._SurfaceBounds;
    if (!this._GetRenderVisible() || UIElement._IsOpacityInvisible(this._TotalOpacity))
        return;
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
        this._DirtyRegion = this._DirtyRegion.Union(rect);
        this._OnInvalidated();
    }
};
UIElement.Instance._InvalidateMeasure = function () {
    this._DirtyFlags |= _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
};
UIElement.Instance._InvalidateArrange = function () {
    this._DirtyFlags |= _Dirty.Arrange;
    this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
};
UIElement.Instance._InvalidateVisibility = function () {
    this._UpdateTotalRenderVisibility();
    this._InvalidateParent(this._GetSubtreeBounds());
};
UIElement.Instance._InvalidateSubtreePaint = function () {
    this._Invalidate(this._GetSubtreeBounds());
};
UIElement.Instance._InvalidateParent = function (r) {
    var visualParent = this.GetVisualParent();
    if (visualParent)
        visualParent._Invalidate(r);
    else if (this._IsAttached)
        App.Instance.MainSurface._Invalidate(r);
};
UIElement.Instance._UpdateBounds = function (forceRedraw) {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Bounds);
    this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
};
UIElement.Instance._UpdateTransform = function () {
};
UIElement.Instance._UpdateProjection = function () {
};
UIElement.Instance._ComputeBounds = function () {
    AbstractMethod("UIElement._ComputeBounds()");
};
UIElement.Instance._ComputeGlobalBounds = function () {
    this._GlobalBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._LocalProjection);
};
UIElement.Instance._ComputeSurfaceBounds = function () {
    this._SurfaceBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteProjection);
};
UIElement.Instance._ComputeLocalTransform = function () {
};
UIElement.Instance._ComputeLocalProjection = function () {
};
UIElement.Instance._IntersectBoundsWithClipPath = function (unclipped, transform) {
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
    return box.Intersection(unclipped);
};
UIElement.Instance._ComputeTotalRenderVisibility = function () {
    if (this._GetActualTotalRenderVisibility())
        this._Flags |= UIElementFlags.TotalRenderVisible;
    else
        this._Flags &= ~UIElementFlags.TotalRenderVisible;
};
UIElement.Instance._UpdateTotalRenderVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.RenderVisibility);
};
UIElement.Instance._GetActualTotalRenderVisibility = function () {
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
UIElement.Instance._GetRenderVisible = function () {
    return (this._Flags & UIElementFlags.TotalRenderVisible) != 0;
};
UIElement.Instance._ComputeTotalHitTestVisibility = function () {
    if (this._GetActualTotalHitTestVisibility())
        this._Flags |= UIElementFlags.TotalHitTestVisible;
    else
        this._Flags &= ~UIElementFlags.TotalHitTestVisible;
};
UIElement.Instance._UpdateTotalHitTestVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.HitTestVisibility);
};
UIElement.Instance._GetActualTotalHitTestVisibility = function () {
    var visible = (this._Flags & UIElementFlags.HitTestVisible) != 0;
    var visualParent;
    if (visible && (visualParent = this.GetVisualParent())) {
        visualParent._ComputeTotalRenderVisibility();
        visible = visible && visualParent._GetIsHitTestVisible();
    }
    return visible;
};
UIElement.Instance._GetIsHitTestVisible = function () {
    return (this._Flags & UIElementFlags.TotalHitTestVisible) != 0;
};
UIElement.Instance._HitTestPoint = function (ctx, p, uielist) {
    uielist.Prepend(new UIElementNode(this));
};
UIElement.Instance._InsideObject = function (ctx, x, y) {
    return this._InsideClip(ctx, x, y);
};
UIElement.Instance._InsideClip = function (ctx, x, y) {
    var clip = this.GetClip();
    if (!clip)
        return true;
    var np = new Point(x, y);
    this._TransformPoint(np);
    if (!clip.GetBounds().ContainsPoint(np))
        return false;
    return ctx.IsPointInClipPath(clip, np);
};
UIElement.Instance._TransformPoint = function (p) {
    var transform = this._CachedTransform;
    if (!transform)
        transform = this._GetCachedTransform();
    var inverse;
    if (!(inverse = transform.Inverse)) {
        Warn("Could not get inverse of cached transform for UIElement.");
        return;
    }
    var np = inverse.MultiplyPoint(p);
    p.X = np.X;
    p.Y = np.Y;
};
UIElement.Instance._CanFindElement = function () {
    return false;
};
UIElement.Instance._CreateOriginTransform = function () {
    var visualOffset = LayoutInformation.GetVisualOffset(this);
    return Matrix.CreateTranslate(visualOffset.X, visualOffset.Y);
};
UIElement.Instance._GetCachedTransform = function () {
    if (this._CachedTransform == null) {
        var transform = this._CreateOriginTransform();
        var ancestor = { Normal: new Matrix(), Inverse: new Matrix() };
        var parent = this.GetVisualParent();
        if (parent)
            ancestor = parent._GetCachedTransform();
        this._CachedTransform = {
            Normal: transform.MultiplyMatrix(ancestor.Normal),
            Inverse: ancestor.Inverse.MultiplyMatrix(transform.GetInverse())
        };
    }
    return this._CachedTransform;
};
UIElement.Instance._GetGlobalBounds = function () {
    return this._GlobalBounds;
};
UIElement.Instance._GetCoverageBounds = function () {
    return new Rect();
};
UIElement.Instance._GetSubtreeObject = function () {
    return this._SubtreeObject;
};
UIElement.Instance._SetSubtreeObject = function (value) {
    this._SubtreeObject = value;
};
UIElement.Instance._GetSubtreeExtents = function () {
    AbstractMethod("UIElement._GetSubtreeExtents()");
};
UIElement.Instance._GetSubtreeBounds = function () {
    return this._SurfaceBounds;
};
UIElement.Instance._SetRenderSize = function (value) {
    this._RenderSize = value;
};
UIElement.Instance._GetRenderSize = function () {
    return this._RenderSize;
};
UIElement.Instance._GetOriginPoint = function () {
    return new Point(0.0, 0.0);
};
UIElement.Instance._DoMeasureWithError = function (error) {
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
UIElement.Instance.Measure = function (availableSize) {
    var error = new BError();
    this._MeasureWithError(availableSize, error);
};
UIElement.Instance._MeasureWithError = function (availableSize, error) { };
UIElement.Instance._DoArrangeWithError = function (error) {
    var last = this.ReadLocalValue(LayoutInformation.LayoutSlotProperty);
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
UIElement.Instance.Arrange = function (finalRect) {
    var error = new BError();
    this._ArrangeWithError(finalRect, error);
};
UIElement.Instance._ArrangeWithError = function (finalRect, error) { };
UIElement.Instance._ShiftPosition = function (point) {
    this._Bounds.X = point.X;
    this._Bounds.Y = point.Y;
};
UIElement.Instance._DoRender = function (ctx, parentRegion) {
    var region = this._GetSubtreeExtents();
    if (!region) {
        Warn("Render Extents are empty. [" + this.constructor._TypeName + "]");
        return;
    }
    region = region.RoundOut();
    region = region.Intersection(parentRegion);
    if (UIElement._IsOpacityInvisible(this._TotalOpacity)) {
        return;
    }
    if (!this._GetRenderVisible()) {
        return;
    }
    if (region.IsEmpty()) {
        return;
    }
    ctx.Save();
    var transform = this._CreateOriginTransform();
    if (transform._Type !== MatrixTypes.Identity)
        ctx.Transform(transform);
    this._CachedTransform = { Normal: ctx.GetCurrentTransform(), Inverse: ctx.GetInverseTransform() };
    ctx.SetGlobalAlpha(this._TotalOpacity);
    this._Render(ctx, region);
    this._PostRender(ctx, region);
    ctx.Restore();
};
UIElement.Instance._Render = function (ctx, region) { };
UIElement.Instance._PostRender = function (ctx, region) {
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZForward);
    var child;
    while (child = walker.Step()) {
        child._DoRender(ctx, region);
    }
};
UIElement.Instance._SetIsLoaded = function (value) {
    if (this._IsLoaded != value) {
        this._IsLoaded = value;
        this._OnIsLoadedChanged(value);
    }
};
UIElement.Instance._OnIsLoadedChanged = function (loaded) {
    var iter;
    var v;
    if (!this._IsLoaded) {
        this.Unloaded.Raise(this, new EventArgs());
        iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            v = iter.GetCurrent();
            v = Nullstone.As(v, FrameworkElement);
            if (v != null)
                v._SetIsLoaded(loaded);
        }
    }
    var walker = new _VisualTreeWalker(this);
    var element;
    while (element = walker.Step()) {
        element._SetIsLoaded(loaded);
    }
    if (this._IsLoaded) {
        iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            v = iter.GetCurrent();
            v = Nullstone.As(v, FrameworkElement);
            if (v != null)
                v._SetIsLoaded(loaded);
        }
        this.Loaded.RaiseAsync(this, new EventArgs());
    }
};
UIElement.Instance._OnIsAttachedChanged = function (value) {
    if (this._SubtreeObject)
        this._SubtreeObject._SetIsAttached(value);
    this._InvalidateVisibility(); //HACK
    this._OnIsAttachedChanged$DependencyObject(value);
    if (!value) {
        this._CacheInvalidateHint();
        var surface = App.Instance.MainSurface;
        if (surface) {
            surface._RemoveDirtyElement(this);
            if (surface._FocusedElement === this)
                surface._FocusElement(null);
        }
    }
};
UIElement.Instance._OnInvalidated = function () {
    this.Invalidated.Raise(this, null);
};
UIElement.Instance._ElementRemoved = function (item) {
    this._Invalidate(item._GetSubtreeBounds());
    item.SetVisualParent(null);
    item._SetIsLoaded(false);
    item._SetIsAttached(false);
    item.SetMentor(null);
    var emptySlot = new Rect();
    LayoutInformation.SetLayoutSlot(item, emptySlot);
    item.ClearValue(LayoutInformation.LayoutClipProperty);
    this._InvalidateMeasure();
    this._Providers[_PropertyPrecedence.Inherited].ClearInheritedPropertiesOnRemovingFromTree(item);
}
UIElement.Instance._ElementAdded = function (item) {
    item.SetVisualParent(this);
    item._UpdateTotalRenderVisibility();
    item._UpdateTotalHitTestVisibility();
    item._Invalidate();
    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(item);
    item._SetIsAttached(this._IsAttached);
    item._SetIsLoaded(this._IsLoaded);
    var o = this;
    while (o != null && !(o instanceof FrameworkElement))
        o = o.GetMentor();
    item.SetMentor(o);
    this._UpdateBounds(true);
    this._InvalidateMeasure();
    this.ClearValue(LayoutInformation.LayoutClipProperty);
    this.ClearValue(LayoutInformation.PreviousConstraintProperty);
    item._SetRenderSize(new Size(0, 0));
    item._UpdateTransform();
    item._UpdateProjection();
    item._InvalidateMeasure();
    item._InvalidateArrange();
    if (item._HasFlag(UIElementFlags.DirtySizeHint) || item.ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
        item._PropagateFlagUp(UIElementFlags.DirtySizeHint);
}
UIElement.Instance._UpdateLayer = function (pass, error) {
};
UIElement.Instance._HasFlag = function (flag) { return (this._Flags & flag) == flag; };
UIElement.Instance._ClearFlag = function (flag) { this._Flags &= ~flag; };
UIElement.Instance._SetFlag = function (flag) { this._Flags |= flag; };
UIElement.Instance._PropagateFlagUp = function (flag) {
    this._SetFlag(flag);
    var el = this.GetVisualParent();
    while (el && !el._HasFlag(flag)) {
        el._SetFlag(flag);
        el = el.GetVisualParent();
    }
};
UIElement.Instance.__DebugDirtyFlags = function () {
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
UIElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== UIElement) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    if (args.Property._ID === UIElement.OpacityProperty._ID) {
        this._InvalidateVisibility();
    } else if (args.Property._ID === UIElement.VisibilityProperty._ID) {
        if (args.NewValue === Visibility.Visible)
            this._Flags |= UIElementFlags.RenderVisible;
        else
            this._Flags &= ~UIElementFlags.RenderVisible;
        this._InvalidateVisibility();
        this._InvalidateMeasure();
        var parent = this.GetVisualParent();
        if (parent != null)
            parent._InvalidateMeasure();
        App.Instance.MainSurface._RemoveFocus(this);
    } else if (args.Property._ID === UIElement.IsHitTestVisibleProperty._ID) {
        if (args.NewValue === true) {
            this._Flags |= UIElementFlags.HitTestVisible;
        } else {
            this._Flags &= ~UIElementFlags.HitTestVisible;
        }
        this._UpdateTotalHitTestVisibility();
    }
    this.PropertyChanged.Raise(this, args);
};
UIElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
};
UIElement.Instance.CanCaptureMouse = function () { return true; };
UIElement.Instance.CaptureMouse = function () {
    if (!this._IsAttached)
        return false;
    return App.Instance.MainSurface.SetMouseCapture(this);
};
UIElement.Instance.ReleaseMouseCapture = function () {
    if (!this._IsAttached)
        return;
    App.Instance.MainSurface.ReleaseMouseCapture(this);
};
UIElement.Instance._EmitMouseEvent = function (type, button, absolutePos) {
    if (type === "up") {
        if (Surface.IsLeftButton(button))
            this._EmitMouseLeftButtonUp(absolutePos);
        else if (Surface.IsRightButton(button))
            this._EmitMouseRightButtonUp(absolutePos);
    } else if (type === "down") {
        if (Surface.IsLeftButton(button))
            this._EmitMouseLeftButtonDown(absolutePos);
        else if (Surface.IsRightButton(button))
            this._EmitMouseRightButtonDown(absolutePos);
    } else if (type === "leave") {
        this._EmitMouseLeave(absolutePos);
    } else if (type === "enter") {
        this._EmitMouseEnter(absolutePos);
    } else if (type === "move") {
        this._EmitMouseMoveEvent(absolutePos);
    }
};
UIElement.Instance._EmitMouseMoveEvent = function (absolutePos) {
    this.MouseMove.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseMove = function (sender, args) { };
UIElement.Instance._EmitMouseLeftButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonDown " + absolutePos.toString());
    this.MouseLeftButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeftButtonDown = function (sender, args) { };
UIElement.Instance._EmitMouseLeftButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonUp " + absolutePos.toString());
    this.MouseLeftButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeftButtonUp = function (sender, args) { };
UIElement.Instance._EmitMouseRightButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonDown " + absolutePos.toString());
    this.MouseRightButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseRightButtonDown = function (sender, args) { };
UIElement.Instance._EmitMouseRightButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonUp " + absolutePos.toString());
    this.MouseRightButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseRightButtonUp = function (sender, args) { };
UIElement.Instance._EmitMouseEnter = function (absolutePos) {
    this.MouseEnter.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseEnter = function (sender, args) { };
UIElement.Instance._EmitMouseLeave = function (absolutePos) {
    this.MouseLeave.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeave = function (sender, args) { };
UIElement.Instance._EmitLostMouseCapture = function (absolutePos) {
    this.LostMouseCapture.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnLostMouseCapture = function (sender, args) { };
UIElement.Instance._EmitKeyDown = function (args) {
    this.KeyDown.Raise(this, args);
};
UIElement.Instance._EmitKeyUp = function (args) {
    this.KeyUp.Raise(this, args);
};
UIElement.Instance.OnKeyDown = function (sender, args) {
};
UIElement.Instance.OnKeyUp = function (sender, args) {
};
UIElement.Instance.Focus = function (recurse) {
    return false;
};
UIElement.Instance._EmitFocusChange = function (type) {
    if (type === "got")
        this._EmitGotFocus();
    else if (type === "lost")
        this._EmitLostFocus();
};
UIElement.Instance._EmitGotFocus = function () {
    this.GotFocus.Raise(this, new EventArgs());
};
UIElement.Instance.OnGotFocus = function (sender, args) { };
UIElement.Instance._EmitLostFocus = function () {
    this.LostFocus.Raise(this, new EventArgs());
};
UIElement.Instance.OnLostFocus = function (sender, args) { };
UIElement._IsOpacityInvisible = function (opacity) {
    return opacity * 255 < .5;
};
UIElement._IsOpacityTranslucent = function (opacity) {
    return opacity * 255 < 245.5;
};
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
Nullstone.FinishCreate(UIElement);

var Collection = Nullstone.Create("Collection", DependencyObject);
Collection.Instance.Init = function () {
    this.Init$DependencyObject();
    this._ht = [];
    this.Changed = new MulticastEvent();
    this.ItemChanged = new MulticastEvent();
};
Collection.CountProperty = DependencyProperty.RegisterFull("Count", function () { return Number; }, Collection, 0);
Collection.Instance.GetCount = function () {
    return this._ht.length;
};
Collection.Instance.GetValueAt = function (index) {
    return this._ht[index];
};
Collection.Instance.Add = function (value) {
    var rv = this.Insert(this._ht.length, value);
    return rv ? this._ht.length - 1 : -1;
};
Collection.Instance.Insert = function (index, value) {
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
Collection.Instance.Remove = function (value) {
    var index = this.IndexOf(value);
    if (index == -1)
        return false;
    return this.RemoveAt(index);
};
Collection.Instance.RemoveAt = function (index) {
    if (index < 0 || index >= this._ht.length)
        return false;
    var value = this._ht[index];
    this._ht.splice(index, 1);
    this.RemovedFromCollection(value, true);
    this._RaiseChanged(CollectionChangedArgs.Action.Remove, value, null, index);
    return true;
};
Collection.Instance.Clear = function () {
    this._RaiseChanged(CollectionChangedArgs.Action.Clearing, null, null, -1);
    var old = this._ht;
    this._ht = [];
    for (var i = 0; i < old.length; i++) {
        this.RemovedFromCollection(old[i], true);
    }
    this._RaiseChanged(CollectionChangedArgs.Action.Cleared, null, null, -1);
    return true;
};
Collection.Instance.IndexOf = function (value) {
    for (var i = 0; i < this.GetCount(); i++) {
        if (value == this._ht[i])
            return i;
    }
    return -1;
};
Collection.Instance.Contains = function (value) {
    return this.IndexOf(value) > -1;
};
Collection.Instance.CanAdd = function (value) { return true; };
Collection.Instance.AddedToCollection = function (value, error) { return true; };
Collection.Instance.RemovedFromCollection = function (value, isValueSafe) { };
Collection.Instance.GetIterator = function () {
    return new CollectionIterator(this);
};
Collection.Instance._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
    this.ItemChanged.Raise(this, new ItemChangedArgs(obj, propd, oldValue, newValue));
};
Collection.Instance._RaiseChanged = function (action, oldValue, newValue, index) {
    this.Changed.Raise(this, new CollectionChangedArgs(action, oldValue, newValue, index));
};
Nullstone.FinishCreate(Collection);

var DependencyObjectCollection = Nullstone.Create("DependencyObjectCollection", Collection, 1);
DependencyObjectCollection.Instance.Init = function (setsParent) {
    this.Init$Collection();
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
};
DependencyObjectCollection.Instance.IsElementType = function (value) {
    return value instanceof DependencyObject;
};
DependencyObjectCollection.Instance._GetIsSecondaryParent = function () {
    return this._IsSecondaryParent;
};
DependencyObjectCollection.Instance._SetIsSecondaryParent = function (value) {
    this._IsSecondaryParent = value;
};
DependencyObjectCollection.Instance._OnMentorChanged = function (oldValue, newValue) {
    this._OnMentorChanged$Collection(oldValue, newValue);
    for (var i = 0; i < this._ht.length; i++) {
        if (this._ht[i] instanceof DependencyObject)
            this._ht[i].SetMentor(newValue);
    }
};
DependencyObjectCollection.Instance.AddedToCollection = function (value, error) {
    if (this._SetsParent) {
        var existingParent = value._GetParent();
        value._AddParent(this, true, error);
        if (!error.IsErrored() && existingParent == null && this._GetIsSecondaryParent() != null)
            value._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
    } else {
        value.SetMentor(this.GetMentor());
    }
    this.AddPropertyChangedListener(value);
    var rv = this.AddedToCollection$Collection(value, error);
    value._SetIsAttached(rv && this._IsAttached);
    if (!rv) {
        if (this._SetsParent) {
            value._RemoveParent(this, error);
            value.SetMentor(this.GetMentor());
        } else {
            value.SetMentor(null);
        }
    }
    return rv;
};
DependencyObjectCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            this.RemovePropertyChangedListener(value);
            if (this._GetIsSecondaryParent())
                value._RemoveSecondaryParent(this);
            if (this._SetsParent && Nullstone.RefEquals(value._GetParent(), this))
                value._RemoveParent(this, null);
            value._SetIsAttached(false);
        }
    }
};
DependencyObjectCollection.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$Collection(value);
    for (var i = 0; i < this.GetCount(); i++) {
        var val = this.GetValueAt(i);
        if (val instanceof DependencyObject)
            val._SetIsAttached(value);
    }
};
DependencyObjectCollection.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
};
Nullstone.FinishCreate(DependencyObjectCollection);

var ResourceDictionary = Nullstone.Create("ResourceDictionary", Collection);
ResourceDictionary.Instance.Init = function () {
    this.Init$Collection();
    this._KeyIndex = [];
};
ResourceDictionary.MergedDictionariesProperty = DependencyProperty.RegisterFull("MergedDictionaries", function () { return ResourceDictionaryCollection; }, ResourceDictionary, null, { GetValue: function () { return new ResourceDictionaryCollection(); } });
ResourceDictionary.Instance.GetMergedDictionaries = function () {
    return this.$GetValue(ResourceDictionary.MergedDictionariesProperty);
};
ResourceDictionary.Instance.ContainsKey = function (key) {
    return this._KeyIndex[key] != undefined;
};
ResourceDictionary.Instance._GetIndexFromKey = function (key) {
    return this._KeyIndex[key];
};
ResourceDictionary.Instance.Get = function (key) {
    if (this.ContainsKey(key))
        return this.GetValueAt(this._GetIndexFromKey(key));
    return this._GetFromMergedDictionaries(key);
};
ResourceDictionary.Instance._GetFromMergedDictionaries = function (key) {
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
ResourceDictionary.Instance.Set = function (key, value) {
    var oldValue;
    if (this.ContainsKey(key)) {
        oldValue = this.Get(key);
        this.Remove(oldValue);
    }
    var index = this.Add$Collection(value);
    this._KeyIndex[key] = index;
    this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
    return true;
};
ResourceDictionary.Instance.Add = function (key, value) {
    this.Set(key, value);
};
ResourceDictionary.Instance.Remove = function (key) {
    var index = this._GetIndexFromKey(key);
    if (index > -1)
        return this.RemoveAt(index);
};
ResourceDictionary.Instance.AddedToCollection = function (value, error) {
    var obj = null;
    var rv = false;
    if (value instanceof DependencyObject) {
        obj = Nullstone.As(value, DependencyObject);
        if (obj._GetParent() != null && !ResourceDictionary._CanBeAddedTwice(value)) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return false;
        }
        obj._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        obj._SetIsAttached(this._IsAttached);
        this.AddPropertyChangedListener(obj);
    }
    rv = this.AddedToCollection$Collection(value, error);
    if (rv /* && !from_resource_dictionary_api */ && obj != null) {
        this._RaiseChanged(CollectionChangedArgs.Action.Add, null, obj, obj.GetName());
    }
    return rv;
};
ResourceDictionary.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe && value instanceof DependencyObject) {
        var obj = Nullstone.As(value, DependencyObject);
        if (obj != null) {
            this.RemovePropertyChangedListener(obj);
            obj._RemoveParent(this, null);
            obj._SetIsAttached(false);
        }
    }
    this.RemovedFromCollection$Collection(value, isValueSafe);
};
ResourceDictionary.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$Collection(value);
    for (var i = 0; i < this._ht.length; i++) {
        var obj = this._ht[i];
        if (obj instanceof DependencyObject)
            obj._SetIsAttached(value);
    }
};
ResourceDictionary.Instance._OnMentorChanged = function (oldValue, newValue) {
    this._OnMentorChanged$Collection(oldValue, newValue);
    for (var i = 0; i < this._KeyIndex.length; i++) {
        DependencyObject._PropagateMentor(this._KeyIndex[i], this.GetValueAt(this._KeyIndex[i]), newValue);
    }
};
ResourceDictionary.Instance._RegisterAllNamesRootedAt = function (namescope, error) {
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._RegisterAllNamesRootedAt(namescope, error);
    }
    this._RegisterAllNamesRootedAt$Collection(namescope, error);
};
ResourceDictionary.Instance._UnregisterAllNamesRootedAt = function (fromNs) {
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._UnregisterAllNamesRootedAt(fromNs);
    }
    this._UnregisterAllNamesRootedAt$Collection(fromNs);
};
ResourceDictionary._CanBeAddedTwice = function (value) {
    var twices = [
        FrameworkTemplate,
        Style,
        Brush,
    ];
    for (var i = 0; i < twices.length; i++) {
        if (value instanceof twices[i])
            return true;
    }
    return true;
};
Nullstone.FinishCreate(ResourceDictionary);

var ResourceDictionaryCollection = Nullstone.Create("ResourceDictionaryCollection", DependencyObjectCollection);
ResourceDictionaryCollection.Instance.AddedToCollection = function (value, error) {
    if (!this.AddedToCollection$DependencyObjectCollection(value, error))
        return false;
    var parent = this._GetParent();
    if (!parent)
        return true;
    return this._WalkSubtreeLookingForCycle(value, parent, error);
};
ResourceDictionaryCollection.Instance.IsElementType = function (value) {
    return value instanceof ResourceDictionary;
};
ResourceDictionaryCollection.Instance._WalkSubtreeLookingForCycle = function (subtreeRoot, firstAncestor, error) {
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
    var children = subtreeRoot.GetMergedDictionaries();
    for (var i = 0; i < children.GetCount(); i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }
    return true;
};
Nullstone.FinishCreate(ResourceDictionaryCollection);

var UIElementCollection = Nullstone.Create("UIElementCollection", DependencyObjectCollection);
UIElementCollection.Instance.Init = function () {
    this.Init$DependencyObjectCollection();
    this._ZSorted = [];
};
UIElementCollection.Instance.GetValueAtZIndex = function (index) {
    return this._ZSorted[index];
};
UIElementCollection.Instance.GetZSortedCount = function () {
    return this._ZSorted.length;
};
UIElementCollection.Instance.ResortByZIndex = function () {
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
UIElementCollection.Instance.IsElementType = function (value) {
    return value instanceof UIElement;
};
Nullstone.FinishCreate(UIElementCollection);

var _CollectionViewNode = Nullstone.Create("_CollectionViewNode", _PropertyPathNode, 3);
_CollectionViewNode.Instance.Init = function (bindsDirectlyToSource, bindToView, viewChanged) {
    this.Init$_PropertyPathNode();
    this.SetBindsDirectlyToSource(bindsDirectlyToSource === true);
    this.SetBindToView(bindToView === true);
    this.SetViewChangedHandler(this.ViewChanged);
};
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
    if (this.GetNext() != null)
        this.GetNext().SetSource(this.GetValue());
};
_CollectionViewNode.Instance.SetValue = function () {
    throw new NotImplementedException();
};
_CollectionViewNode.Instance.UpdateValue = function () {
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
_CollectionViewNode.Instance._CheckIsBroken = function () {
    return this.GetSource() == null;
};
_CollectionViewNode.Instance.ConnectViewHandlers = function (source, view) {
    if (source != null) {
        this._ViewPropertyListener = new PropertyChangedListener(source, source.constructor.ViewProperty, this, this.ViewChanged);
        view = source.GetView();
    }
    if (view != null)
        this._ViewListener = new CurrentChangedListener(view, this, this.ViewCurrentChanged);
};
_CollectionViewNode.Instance.DisconnectViewHandlers = function (onlyView) {
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
_CollectionViewNode.Instance.GetBindsDirectlyToSource = function () {
    return this._BindsDirectlyToSource;
};
_CollectionViewNode.Instance.SetBindsDirectlyToSource = function (value) {
    this._BindsDirectlyToSource = value;
};
_CollectionViewNode.Instance.GetBindToView = function () {
    return this._BindToView;
};
_CollectionViewNode.Instance.SetBindToView = function (value) {
    this._BindToView = value;
};
_CollectionViewNode.Instance.GetViewChangedHandler = function () {
    return this._ViewChangedHandler;
};
_CollectionViewNode.Instance.SetViewChangedHandler = function (value) {
    this._ViewChangedHandler = value;
};
Nullstone.FinishCreate(_CollectionViewNode);

var CollectionViewSource = Nullstone.Create("CollectionViewSource", DependencyObject);
CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, CollectionViewSource);
CollectionViewSource.Instance.GetSource = function () {
    return this.$GetValue(CollectionViewSource.SourceProperty);
};
CollectionViewSource.Instance.SetSource = function (value) {
    this.$SetValue(CollectionViewSource.SourceProperty, value);
};
CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);
CollectionViewSource.Instance.GetView = function () {
    return this.$GetValue(CollectionViewSource.ViewProperty);
};
CollectionViewSource.Instance.SetView = function (value) {
    this.$SetValue(CollectionViewSource.ViewProperty, value);
};
Nullstone.FinishCreate(CollectionViewSource);

var _IndexedPropertyPathNode = Nullstone.Create("_IndexedPropertyPathNode", _PropertyPathNode, 1);
_IndexedPropertyPathNode.Instance.Init = function (index) {
    this.Init$_PropertyPathNode();
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
};
_IndexedPropertyPathNode.Instance._CheckIsBroken = function () {
    return this._isBroken || this._CheckIsBroken$_PropertyPathNode();
};
_IndexedPropertyPathNode.Instance.UpdateValue = function () {
    NotImplemented("_IndexedPropertyPathNode.UpdateValue");
};
_IndexedPropertyPathNode.Instance.GetIndex = function () {
    return this._Index;
};
_IndexedPropertyPathNode.Instance.SetIndex = function (value) {
    this._Index = value;
};
Nullstone.FinishCreate(_IndexedPropertyPathNode);

var TextElement = Nullstone.Create("TextElement", DependencyObject);
TextElement.Instance.Init = function () {
    this.Init$DependencyObject();
    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    this._Font = new Font();
    this._UpdateFont(true);
};
TextElement.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextElement, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextElement.Instance.GetForeground = function () {
    return this.$GetValue(TextElement.ForegroundProperty);
};
TextElement.Instance.SetForeground = function (value) {
    this.$SetValue(TextElement.ForegroundProperty, value);
};
TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY);
TextElement.Instance.GetFontFamily = function () {
    return this.$GetValue(TextElement.FontFamilyProperty);
};
TextElement.Instance.SetFontFamily = function (value) {
    this.$SetValue(TextElement.FontFamilyProperty, value);
};
TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH);
TextElement.Instance.GetFontStretch = function () {
    return this.$GetValue(TextElement.FontStretchProperty);
};
TextElement.Instance.SetFontStretch = function (value) {
    this.$SetValue(TextElement.FontStretchProperty, value);
};
TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE);
TextElement.Instance.GetFontStyle = function () {
    return this.$GetValue(TextElement.FontStyleProperty);
};
TextElement.Instance.SetFontStyle = function (value) {
    this.$SetValue(TextElement.FontStyleProperty, value);
};
TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextElement, Font.DEFAULT_WEIGHT);
TextElement.Instance.GetFontWeight = function () {
    return this.$GetValue(TextElement.FontWeightProperty);
};
TextElement.Instance.SetFontWeight = function (value) {
    this.$SetValue(TextElement.FontWeightProperty, value);
};
TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextElement, Font.DEFAULT_SIZE);
TextElement.Instance.GetFontSize = function () {
    return this.$GetValue(TextElement.FontSizeProperty);
};
TextElement.Instance.SetFontSize = function (value) {
    this.$SetValue(TextElement.FontSizeProperty, value);
};
TextElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, TextElement);
TextElement.Instance.GetLanguage = function () {
    return this.$GetValue(TextElement.LanguageProperty);
};
TextElement.Instance.SetLanguage = function (value) {
    this.$SetValue(TextElement.LanguageProperty, value);
};
TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return new Enum(TextDecorations); }, TextElement, TextDecorations.None);
TextElement.Instance.GetTextDecorations = function () {
    return this.$GetValue(TextElement.TextDecorationsProperty);
};
TextElement.Instance.SetTextDecorations = function (value) {
    this.$SetValue(TextElement.TextDecorationsProperty, value);
};
TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextElement);
TextElement.Instance.GetFontResource = function () {
    return this.$GetValue(TextElement.FontResourceProperty);
};
TextElement.Instance.SetFontResource = function (value) {
    this.$SetValue(TextElement.FontResourceProperty, value);
};
TextElement.Instance.GetBackground = function (selected) { return null; }
TextElement.Instance.GetFont = function () { return this._Font; };
TextElement.Instance.GetDirection = function () { return FlowDirection.LeftToRight; };
TextElement.Instance._SerializeText = function (str) { return str; };
TextElement.Instance._UpdateFont = function (force) {
    var changed = false;
    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());
    return changed || force;
};
TextElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextElement) {
        this._OnPropertyChanged$DependencyObject(args, error);
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
Nullstone.FinishCreate(TextElement);

var TextElementCollection = Nullstone.Create("TextElementCollection", DependencyObjectCollection);
Nullstone.FinishCreate(TextElementCollection);

var App = Nullstone.Create("App", DependencyObject);
App.Instance.Init = function () {
    this.Init$DependencyObject();
    this.MainSurface = new Surface(this);
    this._Clock = new Clock();
    this._Storyboards = [];
    this.Loaded = new MulticastEvent();
};
App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, null, { GetValue: function () { return new ResourceDictionary(); } });
App.Instance.GetResources = function () {
    return this.$GetValue(App.ResourcesProperty);
};
App.Instance.SetResources = function (value) {
    this.$SetValue(App.ResourcesProperty, value);
};
App.Instance.GetAddress = function () {
    return this._Address;
};
App.Instance.SetAddress = function (value) {
    this._Address = value;
};
App.Instance.Load = function (element, containerId, width, height) {
    this.SetAddress(new Uri(document.URL));
    this.MainSurface.Register(containerId, width, height);
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.Instance.OnLoaded = function () {
    this.Loaded.RaiseAsync(this, new EventArgs());
};
App.Instance.Start = function () {
    this._Clock.RegisterTimer(this);
};
App.Instance._Tick = function (lastTime, nowTime) {
    this.ProcessStoryboards(lastTime, nowTime);
    this.ProcessDirty();
};
App.Instance._Stop = function () {
    this._Clock.UnregisterTimer(this);
};
App.Instance.ProcessStoryboards = function (lastTime, nowTime) {
    for (var i = 0; i < this._Storyboards.length; i++) {
        this._Storyboards[i]._Tick(lastTime, nowTime);
    }
};
App.Instance.ProcessDirty = function () {
    if (this._IsRunning)
        return;
    this._IsRunning = true;
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
        this.MainSurface.ProcessDirtyElements(region);
    this._IsRunning = false;
};
App.Instance.RegisterStoryboard = function (storyboard) {
    Array.addDistinctNullstone(this._Storyboards, storyboard);
};
App.Instance.UnregisterStoryboard = function (storyboard) {
    Array.removeNullstone(this._Storyboards, storyboard);
};
App.Instance._GetImplicitStyles = function (fe, styleMask) {
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
        appResourcesStyle = this.GetResources().Get(fe.constructor);
        if (appResourcesStyle == null)
            appResourcesStyle = this.GetResources().Get(fe._TypeName);
    }
    if ((styleMask & _StyleMask.VisualTree) != 0) {
        var isControl = fe instanceof Control;
        var el = fe;
        while (el != null) {
            if (el.GetTemplateOwner() != null && fe.GetTemplateOwner() == null) {
                el = el.GetTemplateOwner();
                continue;
            }
            if (!isControl && el == fe.GetTemplateOwner())
                break;
            visualTreeStyle = el.GetResources().Get(fe.constructor);
            if (visualTreeStyle != null)
                break;
            visualTreeStyle = el.GetResources().Get(fe._TypeName);
            if (visualTreeStyle != null)
                break;
            el = el.GetVisualParent();
        }
    }
    var styles = [];
    styles[_StyleIndex.GenericXaml] = genericXamlStyle;
    styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
    styles[_StyleIndex.VisualTree] = visualTreeStyle;
    return styles;
};
App.Instance._GetGenericXamlStyleFor = function (type) {
    NotImplemented("App._GetGenericXamlStyleFor");
};
Nullstone.FinishCreate(App);

var Brush = Nullstone.Create("Brush", DependencyObject);
Brush.Instance.Init = function () {
    this.Init$DependencyObject();
};
Brush.ChangedProperty = DependencyProperty.Register("Changed", function () { return Boolean; }, Brush);
Brush.Instance.GetChanged = function () {
    return this.$GetValue(Brush.ChangedProperty);
};
Brush.Instance.SetChanged = function (value) {
    this.$SetValue(Brush.ChangedProperty, value);
};
Brush.Instance.SetupBrush = function (ctx, bounds) {
};
Brush.Instance.ToHtml5Object = function () {
    return this._Brush;
};
Brush.Instance._OnSubPropertyChanged = function (sender, args) {
    var newArgs = {
        Property: Brush.ChangedProperty,
        OldValue: false,
        NewValue: true
    };
    this.PropertyChanged.Raise(this, newArgs);
    this._OnSubPropertyChanged$DependencyObject(sender, args);
};
Nullstone.FinishCreate(Brush);

var GeneralTransform = Nullstone.Create("GeneralTransform", DependencyObject);
GeneralTransform.Instance.Init = function () {
    this._NeedUpdate = true;
    this._Matrix = new Matrix();
};
GeneralTransform.Instance.GetInverse = function () {
    AbstractMethod("GeneralTransform.GetInverse");
};
GeneralTransform.Instance.TransformBounds = function (rect) {
    AbstractMethod("GeneralTransform.TransformBounds");
};
GeneralTransform.Instance.Transform = function (point) {
    var po = { Value: null };
    if (this.TryTransform(point, po))
        return po.Value;
    throw new InvalidOperationException("Could not transform.");
};
GeneralTransform.Instance.TryTransform = function (inPoint, outPointOut) {
    AbstractMethod("GeneralTransform.TryTransform");
};
GeneralTransform.Instance._TransformPoint = function (p) {
    return this._Matrix.MultiplyPoint(p);
};
GeneralTransform.Instance._MaybeUpdateTransform = function () {
    if (this._NeedUpdate) {
        this._UpdateTransform();
        this._NeedUpdate = false;
    }
};
GeneralTransform.Instance._UpdateTransform = function () {
    AbstractMethod("GeneralTransform._UpdateTransform");
};
GeneralTransform.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== GeneralTransform) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._NeedUpdate = true;
    this.PropertyChanged.Raise(this, args);
};
Nullstone.FinishCreate(GeneralTransform);

var Geometry = Nullstone.Create("Geometry", DependencyObject);
Geometry.Instance.Init = function () {
    this.Init$DependencyObject();
    this.$Path = null;
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};
Geometry.TransformProperty = DependencyProperty.Register("Transform", function () { return Transform; }, Geometry);
Geometry.Instance.GetTransform = function () {
    return this.$GetValue(Geometry.TransformProperty);
};
Geometry.Instance.SetTransform = function (value) {
    this.$SetValue(Geometry.TransformProperty, value);
};
Geometry.Instance.Draw = function (ctx) {
    if (this.$Path == null)
        return;
    var transform = this.GetTransform();
    if (transform != null) {
        ctx.Save();
        ctx.Transform(transform);
    }
    this.$Path.Draw(ctx);
    if (transform != null)
        ctx.Restore();
};
Geometry.Instance.GetBounds = function (thickness) {
    var compute = this._LocalBounds.IsEmpty();
    if (this.$Path == null) {
        this._Build();
        compute = true;
    }
    if (compute)
        this._LocalBounds = this.ComputePathBounds(thickness);
    var bounds = this._LocalBounds;
    var transform = this.GetTransform();
    if (transform != null) {
        bounds = transform.TransformBounds(bounds);
    }
    return bounds;
};
Geometry.Instance.ComputePathBounds = function (thickness) {
    this._EnsureBuilt();
    if (this.$Path == null)
        return new Rect();
    return this.$Path.CalculateBounds(thickness);
};
Geometry.Instance._EnsureBuilt = function () {
    if (this.$Path == null)
        this._Build();
};
Geometry.Instance._Build = function () {
};
Geometry.Instance._InvalidateCache = function () {
    this.$Path = null;
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};
Geometry.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Geometry
        && args.Property._ID !== PathGeometry.FillRuleProperty
        && args.Property._ID !== GeometryGroup.FillRuleProperty) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, args);
};
Geometry.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    this.PropertyChanged.Raise(this, {
        Property: propd,
        OldValue: null,
        NewValue: this.$GetValue(propd)
    });
    this._OnSubPropertyChanged$DependencyObject();
};
Nullstone.FinishCreate(Geometry);

var GeometryCollection = Nullstone.Create("GeometryCollection", DependencyObjectCollection);
GeometryCollection.Instance.IsElementType = function (value) {
    return val instanceof Geometry;
};
Nullstone.FinishCreate(GeometryCollection);

var GeometryGroup = Nullstone.Create("GeometryGroup", Geometry);
GeometryGroup.Instance.Init = function () {
    this.Init$Geometry();
};
GeometryGroup.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, GeometryGroup, FillRule.EvenOdd);
GeometryGroup.Instance.GetFillRule = function () {
    return this.$GetValue(GeometryGroup.FillRuleProperty);
};
GeometryGroup.Instance.SetFillRule = function (value) {
    this.$SetValue(GeometryGroup.FillRuleProperty, value);
};
GeometryGroup.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return GeometryCollection; }, GeometryGroup, null, { GetValue: function () { return new GeometryCollection(); } });
GeometryGroup.Instance.GetChildren = function () {
    return this.$GetValue(GeometryGroup.ChildrenProperty);
};
GeometryGroup.Instance.SetChildren = function (value) {
    this.$SetValue(GeometryGroup.ChildrenProperty, value);
};
GeometryGroup.Instance.ComputePathBounds = function () {
    var bounds = new Rect();
    var children = this.GetChildren();
    var count = children.GetCount();
    var g;
    for (var i = 0; i < count; i++) {
        g = children.GetValueAt(i);
        bounds = bounds.Union(g.GetBounds(), true);
    }
    return bounds;
};
GeometryGroup.Instance.Draw = function (ctx) {
    var transform = this.GetTransform();
    if (transform != null) {
        ctx.Save();
        ctx.Transform(transform);
    }
    var children = this.GetChildren();
    var count = children.GetCount();
    var g;
    for (var i = 0; i < count; i++) {
        g = children.GetValueAt(i);
        g.Draw(ctx);
    }
    if (transform != null)
        ctx.Restore();
};
GeometryGroup.prototype._OnCollectionChanged = function (sender, args) {
    this._InvalidateCache();
    if (!this._PropertyHasValueNoAutoCreate(GeometryGroup.ChildrenProperty, sender)) {
        this._OnCollectionChanged(sender, args);
        return;
    }
    this.PropertyChanged.Raise(this, {
        Property: GeometryGroup.ChildrenProperty,
        OldValue: null,
        NewValue: this.GetChildren()
    });
};
GeometryGroup.prototype._OnCollectionItemChanged = function (sender, args) {
    this._InvalidateCache();
    if (!this._PropertyHasValueNoAutoCreate(GeometryGroup.ChildrenProperty, sender)) {
        this._OnCollectionItemChanged(sender, args);
        return;
    }
    this.PropertyChanged.Raise(this, {
        Property: GeometryGroup.ChildrenProperty,
        OldValue: null,
        NewValue: this.GetChildren()
    });
};
Nullstone.FinishCreate(GeometryGroup);

var GradientBrush = Nullstone.Create("GradientBrush", Brush);
GradientBrush.Instance._GetMappingModeTransform = function (bounds) {
    if (this.GetMappingMode() === BrushMappingMode.Absolute)
        return new Matrix();
    return new Matrix.CreateScale(bounds.Width, bounds.Height);
};
GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.Instance.GetGradientStops = function () {
    return this.$GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return new Enum(BrushMappingMode); }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);
GradientBrush.Instance.GetMappingMode = function () {
    return this.$GetValue(GradientBrush.MappingModeProperty);
};
GradientBrush.Instance.SetMappingMode = function (value) {
    this.$SetValue(GradientBrush.MappingModeProperty, value);
};
GradientBrush.Annotations = {
    ContentProperty: GradientBrush.GradientStopsProperty
};
Nullstone.FinishCreate(GradientBrush);

var GradientStop = Nullstone.Create("GradientStop", DependencyObject);
GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
GradientStop.Instance.GetColor = function () {
    return this.$GetValue(GradientStop.ColorProperty);
};
GradientStop.Instance.SetColor = function (value) {
    this.$SetValue(GradientStop.ColorProperty, value);
};
GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);
GradientStop.Instance.GetOffset = function () {
    return this.$GetValue(GradientStop.OffsetProperty);
};
GradientStop.Instance.SetOffset = function (value) {
    this.$SetValue(GradientStop.OffsetProperty, value);
};
Nullstone.FinishCreate(GradientStop);

var GradientStopCollection = Nullstone.Create("GradientStopCollection", DependencyObjectCollection);
GradientStopCollection.Instance.IsElementType = function (value) {
    return value instanceof GradientStop;
};
Nullstone.FinishCreate(GradientStopCollection);

var ImageSource = Nullstone.Create("ImageSource", DependencyObject);
ImageSource.Instance.Init = function () {
    this.Init$DependencyObject();
};
ImageSource.Instance.GetPixelWidth = function () { return 0; };
ImageSource.Instance.SetPixelWidth = function (width) { };
ImageSource.Instance.GetPixelHeight = function () { return 0; };
ImageSource.Instance.SetPixelHeight = function (height) { };
ImageSource.Instance.Lock = function () { };
ImageSource.Instance.Unlock = function () { };
Nullstone.FinishCreate(ImageSource);

var LinearGradientBrush = Nullstone.Create("LinearGradientBrush", GradientBrush);
LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.Instance.GetStartPoint = function () {
    return this.$GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.Instance.SetStartPoint = function (value) {
    this.$SetValue(LinearGradientBrush.StartPointProperty, value);
};
LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));
LinearGradientBrush.Instance.GetEndPoint = function () {
    return this.$GetValue(LinearGradientBrush.EndPointProperty);
};
LinearGradientBrush.Instance.SetEndPoint = function (value) {
    this.$SetValue(LinearGradientBrush.EndPointProperty, value);
};
LinearGradientBrush.Instance.SetupBrush = function (ctx, bounds) {
    var transform = this._GetMappingModeTransform(bounds);
    var start = this.GetStartPoint().Apply(transform);
    var end = this.GetEndPoint().Apply(transform);
    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GetGradientStops();
    for (var i = 0; i < stops.GetCount(); i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.GetOffset(), stop.GetColor().toString());
    }
    this._Brush = grd;
};
Nullstone.FinishCreate(LinearGradientBrush);

var PathFigure = Nullstone.Create("PathFigure", DependencyObject);
PathFigure.Instance.Init = function () {
    this._Path = null;
};
PathFigure.IsClosedProperty = DependencyProperty.RegisterCore("IsClosed", function () { return Boolean; }, PathFigure, false);
PathFigure.Instance.GetIsClosed = function () {
    return this.$GetValue(PathFigure.IsClosedProperty);
};
PathFigure.Instance.SetIsClosed = function (value) {
    this.$SetValue(PathFigure.IsClosedProperty, value);
};
PathFigure.SegmentsProperty = DependencyProperty.RegisterFull("Segments", function () { return PathSegmentCollection; }, PathFigure, null, { GetValue: function () { return new PathSegmentCollection(); } });
PathFigure.Instance.GetSegments = function () {
    return this.$GetValue(PathFigure.SegmentsProperty);
};
PathFigure.Instance.SetSegments = function (value) {
    this.$SetValue(PathFigure.SegmentsProperty, value);
};
PathFigure.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () { return Point; }, PathFigure, new Point());
PathFigure.Instance.GetStartPoint = function () {
    return this.$GetValue(PathFigure.StartPointProperty);
};
PathFigure.Instance.SetStartPoint = function (value) {
    this.$SetValue(PathFigure.StartPointProperty, value);
};
PathFigure.IsFilledProperty = DependencyProperty.RegisterCore("IsFilled", function () { return Boolean; }, PathFigure, true);
PathFigure.Instance.GetIsFilled = function () {
    return this.$GetValue(PathFigure.IsFilledProperty);
};
PathFigure.Instance.SetIsFilled = function (value) {
    this.$SetValue(PathFigure.IsFilledProperty, value);
};
PathFigure.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== PathFigure) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._Path = null;
    this.PropertyChanged.Raise(this, args);
};
PathFigure.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, sender)) {
        this._OnCollectionChanged$DependencyObject(sender, args);
        return;
    }
    this._Path = null;
    var newArgs = {
        Property: PathFigure.SegmentsProperty,
        OldValue: null,
        NewValue: this.$GetValue(PathFigure.SegmentsProperty)
    };
    this.PropertyChanged.Raise(this, newArgs);
};
PathFigure.Instance._OnCollectionItemChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathFigure.SegmentsProperty, sender)) {
        this._OnCollectionItemChanged$DependencyObject(sender, args);
        return;
    }
    this._Path = null;
    var newArgs = {
        Property: PathFigure.SegmentsProperty,
        OldValue: null,
        NewValue: this.$GetValue(PathFigure.SegmentsProperty)
    };
    this.PropertyChanged.Raise(this, newArgs);
};
PathFigure.Instance._Build = function () {
    this._Path = [];
    var start = this.GetStartPoint();
    this._Path.push({ type: PathEntryType.Move, x: start.X, y: start.Y });
    var segments = this.GetSegments();
    var segmentCount = segments.GetCount();
    for (var i = 0; i < segmentCount; i++) {
        var segment = segments[i];
        segment._Append(this._Path);
    }
    if (this.GetIsClosed())
        this._Path.push({ type: PathEntryType.Close });
};
Nullstone.FinishCreate(PathFigure);

var PathFigureCollection = Nullstone.Create("PathFigureCollection", DependencyObjectCollection);
PathFigureCollection.Instance.Init = function () {
};
PathFigureCollection.Instance.IsElementType = function (value) {
    return value instanceof PathFigure;
};
Nullstone.FinishCreate(PathFigureCollection);

var PathGeometry = Nullstone.Create("PathGeometry", Geometry);
PathGeometry.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, PathGeometry);
PathGeometry.Instance.GetFillRule = function () {
    return this.$GetValue(PathGeometry.FillRuleProperty);
};
PathGeometry.Instance.SetFillRule = function (value) {
    this.$SetValue(PathGeometry.FillRuleProperty, value);
};
PathGeometry.FiguresProperty = DependencyProperty.RegisterFull("Figures", function () { return PathFigureCollection; }, PathGeometry, null, { GetValue: function () { return new PathFigureCollection(); } });
PathGeometry.Instance.GetFigures = function () {
    return this.$GetValue(PathGeometry.FiguresProperty);
};
PathGeometry.Instance.SetFigures = function (value) {
    this.$SetValue(PathGeometry.FiguresProperty, value);
};
PathGeometry.Annotations = {
    ContentProperty: PathGeometry.FiguresProperty
};
PathGeometry.prototype._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathGeometry.FiguresProperty, sender)) {
        this._OnCollectionChanged$Geometry(sender, args);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, {
        Property: PathGeometry.FiguresProperty,
        OldValue: null,
        NewValue: this.GetFigures()
    });
};
PathGeometry.prototype._OnCollectionItemChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathGeometry.FiguresProperty, sender)) {
        this._OnCollectionItemChanged$Geometry(sender, args);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, {
        Property: PathGeometry.FiguresProperty,
        OldValue: null,
        NewValue: this.GetFigures()
    });
};
PathGeometry.Instance._Build = function () {
    this.$Path = new RawPath();
    var figures = this.GetFigures();
    if (figures == null)
        return;
    var count = figures.GetCount();
    var f;
    for (var i = 0; i < count; i++) {
        f = figures.GetValueAt(i);
        f._EnsureBuilt();
        RawPath.Merge(this.$Path, f.$Path);
    }
};
Nullstone.FinishCreate(PathGeometry);

var PathSegment = Nullstone.Create("PathSegment", DependencyObject);
PathSegment.Instance.Init = function () {
};
PathSegment.Instance._Append = function (path) {
    AbstractMethod("PathSegment._Append");
};
Nullstone.FinishCreate(PathSegment);

var PathSegmentCollection = Nullstone.Create("PathSegmentCollection", DependencyObjectCollection);
PathSegmentCollection.Instance.Init = function () {
};
PathSegmentCollection.Instance.IsElementType = function (value) {
    return value instanceof PathSegment;
};
Nullstone.FinishCreate(PathSegmentCollection);

var RadialGradientBrush = Nullstone.Create("RadialGradientBrush", GradientBrush);
RadialGradientBrush.CenterProperty = DependencyProperty.RegisterFull("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.Instance.GetCenter = function () {
    return this.$GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.Instance.SetCenter = function (value) {
    this.$SetValue(RadialGradientBrush.CenterProperty, value);
};
RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterFull("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.Instance.GetGradientOrigin = function () {
    return this.$GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.Instance.SetGradientoOrigin = function (value) {
    this.$SetValue(RadialGradientBrush.GradientOriginProperty, value);
};
RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterFull("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.Instance.GetRadiusX = function () {
    return this.$GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.Instance.SetRadiusX = function (value) {
    this.$SetValue(RadialGradientBrush.RadiusXProperty, value);
};
RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterFull("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.Instance.GetRadiusY = function () {
    return this.$GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.Instance.SetRadiusY = function (value) {
    this.$SetValue(RadialGradientBrush.RadiusYProperty, value);
};
RadialGradientBrush.Instance.SetupBrush = function (ctx, bounds) {
    NotImplemented("RadialGradientBrush.SetupBrush");
};
Nullstone.FinishCreate(RadialGradientBrush);

var RectangleGeometry = Nullstone.Create("RectangleGeometry", Geometry);
RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry, new Rect());
RectangleGeometry.Instance.GetRect = function () {
    return this.$GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.Instance.SetRect = function (value) {
    this.$SetValue(RectangleGeometry.RectProperty, value);
};
RectangleGeometry.RadiusXProperty = DependencyProperty.Register("RadiusX", function () { return Number; }, RectangleGeometry, 0);
RectangleGeometry.Instance.GetRadiusX = function () {
    return this.$GetValue(RectangleGeometry.RadiusXProperty);
};
RectangleGeometry.Instance.SetRadiusX = function (value) {
    this.$SetValue(RectangleGeometry.RadiusXProperty, value);
};
RectangleGeometry.RadiusYProperty = DependencyProperty.Register("RadiusY", function () { return Number; }, RectangleGeometry, 0);
RectangleGeometry.Instance.GetRadiusY = function () {
    return this.$GetValue(RectangleGeometry.RadiusYProperty);
};
RectangleGeometry.Instance.SetRadiusY = function (value) {
    this.$SetValue(RectangleGeometry.RadiusYProperty, value);
};
RectangleGeometry.Instance.ComputePathBounds = function () {
    var rect = this.GetRect();
    if (rect)
        return rect;
    return new Rect(0.0, 0.0, 0.0, 0.0);
};
RectangleGeometry.Instance._Build = function () {
    var rect = this.GetRect();
    if (rect == null)
        return;
    var radiusX = this.GetRadiusX();
    var radiusY = this.GetRadiusY();
    this.$Path = new RawPath();
    this.$Path.RoundedRect(rect.X, rect.Y, rect.Width, rect.Height, radiusX, radiusY);
};
Nullstone.FinishCreate(RectangleGeometry);

var SolidColorBrush = Nullstone.Create("SolidColorBrush", Brush);
SolidColorBrush.Instance.Init = function (args) {
    this.Init$Brush();
    if (args.length === 1) {
        if (args[0] instanceof Color)
            this.SetColor(args[0]);
    }
};
SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush);
SolidColorBrush.Instance.GetColor = function () {
    return this.$GetValue(SolidColorBrush.ColorProperty);
};
SolidColorBrush.Instance.SetColor = function (value) {
    this.$SetValue(SolidColorBrush.ColorProperty, value);
};
SolidColorBrush.Instance.SetupBrush = function (ctx, bounds) {
    var color = this.GetColor();
    if (color == null)
        this._Brush = "#000000";
    else
        this._Brush = color.toString();
};
Nullstone.FinishCreate(SolidColorBrush);

var TileBrush = Nullstone.Create("TileBrush", Brush);
TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () { return new Enum(AlignmentX); }, TileBrush, AlignmentX.Center);
TileBrush.Instance.GetAlignmentX = function () {
    return this.$GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.Instance.SetAlignmentX = function (value) {
    this.$SetValue(TileBrush.AlignmentXProperty, value);
};
TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () { return new Enum(AlignmentY); }, TileBrush, AlignmentY.Center);
TileBrush.Instance.GetAlignmentY = function () {
    return this.$GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.Instance.SetAlignmentY = function (value) {
    this.$SetValue(TileBrush.AlignmentYProperty, value);
};
TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, TileBrush, Stretch.Fill);
TileBrush.Instance.GetStretch = function () {
    return this.$GetValue(TileBrush.StretchProperty);
};
TileBrush.Instance.SetStretch = function (value) {
    this.$SetValue(TileBrush.StretchProperty, value);
};
Nullstone.FinishCreate(TileBrush);

var Transform = Nullstone.Create("Transform", GeneralTransform);
Transform.Instance.Init = function () {
};
Transform.Instance.GetInverse = function () {
    var inv = this._Matrix.GetInverse();
    if (inv == null)
        throw new InvalidOperationException("Transform is not invertible");
    var mt = new MatrixTransform();
    mt.SetMatrix(inv);
    return mt;
};
Transform.Instance.TransformBounds = function (rect) {
    var p1 = this._TransformPoint(new Point(rect.X, rect.Y));
    var p2 = this._TransformPoint(new Point(rect.X + rect.Width, rect.Y + rect.Height));
    return new Rect(
        Math.min(p1.X, p2.X), 
        Math.min(p1.Y, p2.Y),
        Math.abs(p2.X - p1.X), 
        Math.abs(p2.Y - p1.Y));
};
Transform.Instance.TryTransform = function (inPoint, outPointOut) {
    this._MaybeUpdateTransform();
    outPointOut.Value = this._TransformPoint(inPoint);
    return true;
};
Transform.Instance.GetMatrix = function () {
    AbstractMethod("Transform.GetMatrix");
};
Nullstone.FinishCreate(Transform);

var KeyFrame = Nullstone.Create("KeyFrame", DependencyObject);
KeyFrame.Instance.Init = function () {
    this.Init$DependencyObject();
    this._ResolvedKeyTime = null;
    this._Resolved = false;
};
KeyFrame.Instance.GetKeyTime = function () {
    throw new AbstractMethodException();
};
KeyFrame.Instance.SetKeyTime = function (value) {
    throw new AbstractMethodException();
};
KeyFrame.Instance.CoerceKeyTime = function (dobj, propd, value, coerced, error) {
    if (value == null)
        coerced.Value = this.GetKeyTime();
    else
        coerced.Value = value;
    return true;
};
KeyFrame.Instance.InterpolateValue = function () {
    throw new AbstractMethodException();
};
KeyFrame.Comparer = function (kf1, kf2) {
    var ts1 = kf1._ResolvedKeyTime;
    var ts2 = kf2._ResolvedKeyTime;
    return ts1.CompareTo(ts2);
};
Nullstone.FinishCreate(KeyFrame);

var KeyFrameCollection = Nullstone.Create("KeyFrameCollection", DependencyObjectCollection);
KeyFrameCollection.Instance.Init = function () {
    this.Init$DependencyObjectCollection();
    this._Resolved = false;
    this._SortedList = [];
};
KeyFrameCollection.Instance.GetKeyFrameForTime = function (t, prevFrameRef) {
    var currentKeyFrame = null;
    var previousKeyFrame = null;
    var i;
    if (this._SortedList.length == 0) {
        prevFrameRef.Value = null;
        return null;
    }
    var keyFrame;
    var valuePropd;
    for (i = 0; i < this._SortedList.length; i++) {
        keyFrame = this._SortedList[i];
        var keyEndTime = keyFrame._ResolvedKeyTime;
        if (keyEndTime.CompareTo(t) >= 0 || (i + 1) >= this._SortedList.length)
            break;
    }
    for (; i >= 0; i--) {
        keyFrame = this._SortedList[i];
        valuePropd = keyFrame.GetDependencyProperty("Value");
        if (keyFrame.$GetValue(valuePropd) != null) {
            currentKeyFrame = keyFrame;
            break;
        }
    }
    for (i--; i >= 0; i--) {
        keyFrame = this._SortedList[i];
        valuePropd = keyFrame.GetDependencyProperty("Value");
        if (keyFrame.$GetValue(valuePropd) != null) {
            previousKeyFrame = keyFrame;
            break;
        }
    }
    prevFrameRef.Value = previousKeyFrame;
    return currentKeyFrame;
};
KeyFrameCollection.Instance.Clear = function () {
    this._Resolved = false;
    this.Clear$DependencyObjectCollection();
};
KeyFrameCollection.Instance.AddedToCollection = function (value, error) {
    if (!this.AddedToCollection$DependencyObjectCollection(value, error))
        return false;
    this._Resolved = false;
    return true;
};
KeyFrameCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    this.RemovedFromCollection$DependencyObjectCollection(value, isValueSafe);
    this._Resolved = false;
};
KeyFrameCollection.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (args.Property.Name === "KeyTime")
        this._Resolved = false;
    this._OnSubPropertyChanged$DependencyObjectCollection(propd, sender, args);
};
KeyFrameCollection.ResolveKeyFrames = function (animation, coll) {
    if (coll._Resolved)
        return;
    coll._Resolved = true;
    var totalInterpolationTime;
    var hasTimeSpanKeyFrame = false;
    var highestKeyTimeTimeSpan = 0;
    var keyFrame;
    var value;
    var count = coll.GetCount();
    var i;
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyFrame._ResolvedTime = 0;
        keyFrame._Resolved = false;
    }
    var keyTime;
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.HasTimeSpan()) {
            hasTimeSpanKeyFrame = true;
            var ts = keyTime.GetTimeSpan();
            if (ts.CompareTo(highestKeyTimeTimeSpan) > 0)
                highestKeyTimeTimeSpan = ts;
            keyFrame._ResolvedKeyTime = ts;
            keyFrame._Resolved = true;
        }
    }
    var d = animation.GetDuration();
    if (d.HasTimeSpan()) {
        totalInterpolationTime = d.GetTimeSpan();
    } else if (hasTimeSpanKeyFrame) {
        totalInterpolationTime = highestKeyTimeTimeSpan;
    } else {
        totalInterpolationTime = new TimeSpan(TimeSpan._TicksPerSecond);
    }
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.HasPercent()) {
            keyFrame._ResolvedTime = totalInterpolationTime.Multiply(keyTime.GetPercent())
            keyFrame._Resolved = true;
        }
    }
    if (count > 0) {
        value = coll.GetValueAt(count - 1);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.IsPaced() || keyTime.IsUniform()) {
            keyFrame._ResolvedKeyTime = totalInterpolationTime;
            keyFrame._Resolved = true;
        }
    }
    /* if the first frame is KeyTime Paced:
    **   1. if there is only 1 frame, its KeyTime is the total interpolation time.
    **   2. if there is more than 1 frame, its KeyTime is 0.
    **
    ** note 1 is handled in the above block so we only have to
    ** handle 2 here.
    */
    if (count > 0) {
        value = coll.GetValueAt(count - 1);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (!keyFrame._Resolved && keyTime.IsPaced()) {
            keyFrame._ResolvedKeyTime = new TimeSpan(0);
            keyFrame._Resolved = true;
        }
    }
    this._SortedList = [];
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        this._SortedList.push(keyFrame);
    }
    this._SortedList.sort(KeyFrame.Comparer);
};
Nullstone.FinishCreate(KeyFrameCollection);

var ObjectKeyFrame = Nullstone.Create("ObjectKeyFrame", KeyFrame);
ObjectKeyFrame.KeyTimeProperty = DependencyProperty.RegisterFull("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, KeyTime.CreateUniform(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });
ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);
Nullstone.FinishCreate(ObjectKeyFrame);

var ObjectKeyFrameCollection = Nullstone.Create("ObjectKeyFrameCollection", KeyFrameCollection);
ObjectKeyFrameCollection.Instance.IsElementType = function (value) {
    return value instanceof ObjectKeyFrame;
};
Nullstone.FinishCreate(ObjectKeyFrameCollection);

var Timeline = Nullstone.Create("Timeline", DependencyObject);
Timeline.Instance.Init = function () {
    this.Init$DependencyObject();
    this.Completed = new MulticastEvent();
    this.Reset();
};
Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () { return TimeSpan; }, Timeline);
Timeline.Instance.GetBeginTime = function () {
    return this.$GetValue(Timeline.BeginTimeProperty);
};
Timeline.Instance.SetBeginTime = function (value) {
    this.$SetValue(Timeline.BeginTimeProperty, value);
};
Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.Instance.GetDuration = function () {
    return this.$GetValue(Timeline.DurationProperty);
};
Timeline.Instance.SetDuration = function (value) {
    this.$SetValue(Timeline.DurationProperty, value);
};
Timeline.Instance.HasManualTarget = function () {
    return this._ManualTarget != null;
};
Timeline.Instance.GetManualTarget = function () {
    return this._ManualTarget;
};
Timeline.Instance.Reset = function () {
    this._IsFirstUpdate = true;
    this._BeginStep = null;
    this._HasReachedBeg = false;
};
Timeline.Instance.IsAfterBeginTime = function (nowTime) {
    var beginTime = this.GetBeginTime();
    if (beginTime == null || beginTime.IsZero())
        return true;
    var ts = new TimeSpan();
    ts.AddMilliseconds(nowTime - this._InitialStep);
    if (ts.CompareTo(beginTime) < 0)
        return false;
    return true;
};
Timeline.Instance.CreateClockData = function (nowTime) {
    var clockData = {
        BeginTicks: this._BeginStep,
        RealTicks: nowTime,
        CurrentTime: new TimeSpan(nowTime - this._BeginStep),
        Progress: 1.0
    };
    var duration = this.GetDuration();
    if (duration != null && duration.HasTimeSpan()) {
        var elapsedMs = nowTime - this._BeginStep;
        var durMs = duration.GetTimeSpan().GetMilliseconds();
        if (durMs > 0) {
            clockData.Progress = elapsedMs / durMs;
            if (clockData.Progress > 1.0)
                clockData.Progress = 1.0;
        }
    }
    return clockData;
};
Timeline.Instance.OnDurationReached = function () {
    this.Completed.Raise(this, {});
};
Timeline.Instance.Update = function (nowTime) {
    try {
        if (this._IsFirstUpdate) {
            this._InitialStep = nowTime;
            this._HasReachedBeg = false;
            this._IsFirstUpdate = false;
        }
        if (!this._HasReachedBeg) {
            if (!this.IsAfterBeginTime(nowTime))
                return;
            this._BeginStep = nowTime;
            this._HasReachedBeg = true;
        }
        var clockData = this.CreateClockData(nowTime);
        if (clockData.Progress === 1.0) {
            this.UpdateInternal(clockData);
            this.OnDurationReached();
            return;
        }
        this.UpdateInternal(clockData);
    } finally {
        this._LastStep = nowTime;
    }
};
Timeline.Instance.UpdateInternal = function (nowTime) { };
Nullstone.FinishCreate(Timeline);

var TimelineCollection = Nullstone.Create("TimelineCollection", Collection);
Nullstone.FinishCreate(TimelineCollection);

var BitmapSource = Nullstone.Create("BitmapSource", ImageSource);
BitmapSource.Instance.Init = function () {
    this.Init$ImageSource();
    this.ResetImage();
};
BitmapSource.PixelWidthProperty = DependencyProperty.RegisterFull("PixelWidth", function () { return Number; }, BitmapSource, 0, null, null, null, BitmapSource.IntGreaterThanZeroValidator);
BitmapSource.Instance.GetPixelWidth = function () {
    return this.$GetValue(BitmapSource.PixelWidthProperty);
};
BitmapSource.Instance.SetPixelWidth = function (value) {
    this.$SetValue(BitmapSource.PixelWidthProperty, value);
};
BitmapSource.PixelHeightProperty = DependencyProperty.RegisterFull("PixelHeight", function () { return Number; }, BitmapSource, 0, null, null, null, BitmapSource.IntGreaterThanZeroValidator);
BitmapSource.Instance.GetPixelHeight = function () {
    return this.$GetValue(BitmapSource.PixelHeightProperty);
};
BitmapSource.Instance.SetPixelHeight = function (value) {
    this.$SetValue(BitmapSource.PixelHeightProperty, value);
};
BitmapSource.IntGreaterThanZeroValidator = function (instance, propd, value, error) {
    if (typeof value !== "number")
        return false;
    return value > 0;
};
BitmapSource.Instance.ResetImage = function () {
    this._Image = new Image();
    var bs = this;
    this._Image.onerror = function (e) { bs._OnErrored(e); };
    this._Image.onload = function (e) { bs._OnLoad(e); };
    this.SetPixelWidth(0);
    this.SetPixelHeight(0);
};
BitmapSource.Instance.UriSourceChanged = function (oldValue, newValue) {
    this._Image.src = newValue.toString();
};
BitmapSource.Instance._OnErrored = function (e) {
    Info("Failed to load: " + this._Image.src.toString());
    if (this._ErroredCallback)
        this._ErroredCallback(e);
};
BitmapSource.Instance._OnLoad = function (e) {
    this.SetPixelWidth(this._Image.naturalWidth);
    this.SetPixelHeight(this._Image.naturalHeight);
    if (this._LoadedCallback)
        this._LoadedCallback(e);
};
Nullstone.FinishCreate(BitmapSource);

var VisualState = Nullstone.Create("VisualState", DependencyObject);
VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.Instance.GetStoryboard = function () {
    return this.$GetValue(VisualState.StoryboardProperty);
};
VisualState.Instance.SetStoryboard = function (value) {
    this.$SetValue(VisualState.StoryboardProperty, value);
};
VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};
Nullstone.FinishCreate(VisualState);
var VisualStateCollection = Nullstone.Create("VisualStateCollection", DependencyObjectCollection);
VisualStateCollection.Instance.IsElementType = function (value) {
    return value instanceof VisualState;
};
Nullstone.FinishCreate(VisualStateCollection);

var VisualStateGroup = Nullstone.Create("VisualStateGroup", DependencyObject);
VisualStateGroup.Instance.Init = function () {
    this.Init$DependencyObject();
    this.CurrentStateChanging = new MulticastEvent();
    this.CurrentStateChanged = new MulticastEvent();
};
VisualStateGroup.Instance.GetStates = function () {
    if (this._States == null)
        this._States = new VisualStateCollection();
    return this._States;
};
VisualStateGroup.Instance.GetCurrentStoryboards = function () {
    if (this._CurrentStoryboards == null)
        this._CurrentStoryboards = new StoryboardCollection();
    return this._CurrentStoryboards;
};
VisualStateGroup.Instance.GetTransitions = function () {
    if (this._Transitions == null)
        this._Transitions = new VisualTransitionCollection();
    return this._Transitions;
};
VisualStateGroup.Instance.GetCurrentState = function () {
    return this._CurrentState;
};
VisualStateGroup.Instance.SetCurrentState = function (value) {
    this._CurrentState = value;
};
VisualStateGroup.Instance.GetState = function (stateName) {
    var states = this.GetStates();
    for (var i = 0; i < states.GetCount(); i++) {
        var state = states.GetValueAt(i);
        if (state.GetName() === stateName)
            return state;
    }
    return null;
};
VisualStateGroup.Instance.StartNewThenStopOld = function (element, newStoryboards) {
    var i;
    var storyboard;
    for (i = 0; i < newStoryboards.length; i++) {
        storyboard = newStoryboards[i];
        if (storyboard == null)
            continue;
        element.GetResources().Add(storyboard._ID, storyboard);
        try {
            storyboard.Begin();
        } catch (err) {
            for (var j = 0; j <= i; j++) {
                if (newStoryboards[i] != null)
                    element.GetResources().Remove(newStoryboards[i]._ID);
            }
            throw err;
        }
    }
    var currentStoryboards = this.GetCurrentStoryboards();
    for (i = 0; i < currentStoryboards.GetCount(); i++) {
        storyboard = currentStoryboards.GetValueAt(i);
        if (storyboard == null)
            continue;
        element.GetResources().Remove(storyboard._ID);
        storyboard.Stop();
    }
    currentStoryboards.Clear();
    for (i = 0; i < newStoryboards.length; i++) {
        if (newStoryboards[i] == null)
            continue;
        currentStoryboards.Add(newStoryboards[i]);
    }
};
VisualStateGroup.Instance.RaiseCurrentStateChanging = function (element, oldState, newState, control) {
    this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.Instance.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
    this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.Annotations = {
    ContentProperty: "States"
};
Nullstone.FinishCreate(VisualStateGroup);
var VisualStateGroupCollection = Nullstone.Create("VisualStateGroupCollection", DependencyObjectCollection);
VisualStateGroupCollection.Instance.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}
Nullstone.FinishCreate(VisualStateGroupCollection);

var VisualStateManager = Nullstone.Create("VisualStateManager", DependencyObject);
VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.$GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.$SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};
VisualStateManager._GetVisualStateGroupsInternal = function (d) {
    var groups = this.GetVisualStateGroups(d);
    if (groups == null) {
        groups = new VisualStateGroupCollection();
        VisualStateManager.SetVisualStateGroups(d, groups);
    }
    return groups;
};
VisualStateManager.CustomVisualStateManagerProperty = DependencyProperty.RegisterAttached("CustomVisualStateManager", function () { return VisualStateManager }, VisualStateManager, null);
VisualStateManager.GetCustomVisualStateManager = function (d) {
    return d.$GetValue(VisualStateManager.CustomVisualStateManagerProperty);
};
VisualStateManager.SetCustomVisualStateManager = function (d, value) {
    d.$SetValue(VisualStateManager.CustomVisualStateManagerProperty, value);
};
VisualStateManager.Instance.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
    return VisualStateManager.GoToStateInternal(control, element, group, state, useTransitions);
};
VisualStateManager.GoToState = function (control, stateName, useTransitions) {
    var root = VisualStateManager._GetTemplateRoot(control);
    if (root == null)
        return false;
    var groups = VisualStateManager._GetVisualStateGroupsInternal(root);
    if (groups == null)
        return false;
    var data = {};
    if (!VisualStateManager._TryGetState(groups, stateName, data))
        return false;
    var customVsm = VisualStateManager.GetCustomVisualStateManager(root);
    if (customVsm != null) {
        return customVsm.GoToStateCore(control, root, stateName, data.group, data.state, useTransitions);
    } else if (data.state != null) {
        return VisualStateManager.GoToStateInternal(control, root, data.group, data.state, useTransitions);
    }
    return false;
};
VisualStateManager.GoToStateInternal = function (control, element, group, state, useTransitions) {
    var lastState = group.GetCurrentState();
    if (Nullstone.RefEquals(lastState, state))
        return true;
    var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
    if (transition == null || (transition.GetGeneratedDuration().IsZero() && (transition.GetStoryboard() == null || transition.GetStoryboard().GetDuration().IsZero()))) {
        if (transition != null && transition.GetStoryboard() != null) {
            group.StartNewThenStopOld(element, [transition.GetStoryboard(), state.GetStoryboard()]);
        } else {
            group.StartNewThenStopOld(element, [state.GetStoryboard()]);
        }
        group.RaiseCurrentStateChanging(element, lastState, state, control);
        group.RaiseCurrentStateChanged(element, lastState, state, control);
    } else {
        var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
        dynamicTransition.$SetValue(Control.IsTemplateItemProperty, true);
        var eventClosure = new Closure();
        transition.SetDynamicStoryboardCompleted(false);
        var dynamicCompleted = function (sender, e) {
            if (transition.GetStoryboard() == null || transition.GetExplicitStoryboardCompleted() === true) {
                group.StartNewThenStopOld(element, [state.GetStoryboard()]);
                group.RaiseCurrentStateChanged(element, lastState, state, control);
            }
            transition.SetDynamicStoryboardCompleted(true);
        };
        dynamicTransition.Completed.Subscribe(dynamicCompleted, eventClosure);
        if (transition.GetStoryboard() != null && transition.GetExplicitStoryboardCompleted() === true) {
            var transitionCompleted = function (sender, e) {
                if (transition.GetDynamicStoryboardCompleted() === true) {
                    group.StartNewThenStopOld(element, [state.GetStoryboard()]);
                    group.RaiseCurrentStateChanged(element, lastState, state, control);
                }
                transition.GetStoryboard().Completed.Unsubscribe(transitionCompleted, eventClosure);
                transition.SetExplicitStoryboardCompleted(true);
            };
            transition.SetExplicitStoryboardCompleted(false);
            transition.GetStoryboard().Completed.Subscribe(transitionCompleted, eventClosure);
        }
        group.StartNewThenStopOld(element, [transition.GetStoryboard(), dynamicTransition]);
        group.RaiseCurrentStateChanging(element, lastState, state, control);
    }
    group.SetCurrentState(state);
    return true;
};
VisualStateManager._GetTemplateRoot = function (control) {
    var userControl = Nullstone.As(control, UserControl);
    if (userControl != null)
        return Nullstone.As(userControl.GetContent(), FrameworkElement);
    if (VisualTreeHelper.GetChildrenCount(control) > 0)
        return Nullstone.As(VisualTreeHelper.GetChild(control, 0), FrameworkElement);
    return null;
};
VisualStateManager._TryGetState = function (groups, stateName, data) {
    for (var i = 0; i < groups.GetCount(); i++) {
        data.group = groups.GetValueAt(i);
        data.state = data.group.GetState(stateName);
        if (data.state != null)
            return true;
    }
    data.group = null;
    data.state = null;
    return false;
};
VisualStateManager._GetTransition = function (element, group, from, to) {
    if (element == null)
        throw new ArgumentException("element");
    if (group == null)
        throw new ArgumentException("group");
    if (to == null)
        throw new ArgumentException("to");
    var best = null;
    var defaultTransition = null;
    var bestScore = -1;
    var transitions = group.GetTransitions();
    if (transitions != null) {
        var transition;
        for (var i = 0; i < transitions.GetCount(); i++) {
            transition = transitions.GetValueAt(i);
            if (defaultTransition == null && transition.GetIsDefault()) {
                defaultTransition = transition;
                continue;
            }
            var score = -1;
            var transFromState = group.GetState(transition.GetFrom());
            var transToState = group.GetState(transition.GetTo());
            if (Nullstone.RefEquals(from, transFromState))
                score += 1;
            else if (transFromState != null)
                continue;
            if (Nullstone.RefEquals(to, transToState))
                score += 2;
            else if (transToState != null)
                continue;
            if (score > bestScore) {
                bestScore = score;
                best = transition;
            }
        }
    }
    if (best != null)
        return best;
    return defaultTransition;
};
VisualStateManager._GenerateDynamicTransitionAnimations = function (root, group, state, transition) {
    var dynamic = new Storyboard();
    if (transition != null) {
        dynamic.SetDuration(transition.GetGeneratedDuration());
    } else {
        dynamic.SetDuration(new Duration(0));
    }
    var currentAnimations; //FlattenTimelines
    var transitionAnimations; //FlattenTimelines
    var newStateAnimations; //FlattenTimelines
    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
    return dynamic;
};
Nullstone.FinishCreate(VisualStateManager);

var VisualTransition = Nullstone.Create("VisualTransition", DependencyObject);
VisualTransition.Instance.Init = function () {
    this.Init$DependencyObject();
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
};
VisualTransition.Instance.GetFrom = function () {
    return this._From;
};
VisualTransition.Instance.SetFrom = function (value) {
    this._From = value;
};
VisualTransition.Instance.GetTo = function () {
    return this._To;
};
VisualTransition.Instance.SetTo = function (value) {
    this._To = value;
};
VisualTransition.Instance.GetStoryboard = function () {
    return this._Storyboard;
};
VisualTransition.Instance.SetStoryboard = function (value) {
    this._Storyboard = value;
};
VisualTransition.Instance.GetGeneratedDuration = function () {
    return this._GeneratedDuration;
};
VisualTransition.Instance.SetGeneratedDuration = function (value) {
    this._GeneratedDuration = value;
};
VisualTransition.Instance.GetDynamicStoryboardCompleted = function () {
    return this._DynamicStoryboardCompleted;
};
VisualTransition.Instance.SetDynamicStoryboardCompleted = function (value) {
    this._DynamicStoryboardCompleted = value;
};
VisualTransition.Instance.GetExplicitStoryboardCompleted = function () {
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.Instance.SetExplicitStoryboardCompleted = function (value) {
    this._ExplicitStoryboardCompleted = value;
};
VisualTransition.Instance.GetGeneratedEasingFunction = function () {
    return this._GeneratedEasingFunction;
};
VisualTransition.Instance.SetGeneratedEasingFunction = function (value) {
    this._GeneratedEasingFunction = value;
};
Nullstone.FinishCreate(VisualTransition);
var VisualTransitionCollection = Nullstone.Create("VisualTransitionCollection", DependencyObjectCollection);
VisualTransitionCollection.Instance.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};
Nullstone.FinishCreate(VisualTransitionCollection);

var PointCollection = Nullstone.Create("PointCollection", Collection);
PointCollection.Instance.Init = function () {
    this.Init$Collection();
};
Nullstone.FinishCreate(PointCollection);

var ColumnDefinition = Nullstone.Create("ColumnDefinition", DependencyObject);
ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", function () { return GridLength; }, ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.Instance.GetWidth = function () {
    return this.$GetValue(ColumnDefinition.WidthProperty);
};
ColumnDefinition.Instance.SetWidth = function (value) {
    this.$SetValue(ColumnDefinition.WidthProperty, value);
};
ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.Instance.GetMaxWidth = function () {
    return this.$GetValue(ColumnDefinition.MaxWidthProperty);
};
ColumnDefinition.Instance.SetMaxWidth = function (value) {
    this.$SetValue(ColumnDefinition.MaxWidthProperty, value);
};
ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.Instance.GetMinWidth = function () {
    return this.$GetValue(ColumnDefinition.MinWidthProperty);
};
ColumnDefinition.Instance.SetMinWidth = function (value) {
    this.$SetValue(ColumnDefinition.MinWidthProperty, value);
};
ColumnDefinition.ActualWidthProperty = DependencyProperty.Register("ActualWidth", function () { return Number; }, ColumnDefinition, 0.0);
ColumnDefinition.Instance.GetActualWidth = function () {
    return this.$GetValue(ColumnDefinition.ActualWidthProperty);
};
ColumnDefinition.Instance.SetActualWidth = function (value) {
    this.$SetValue(ColumnDefinition.ActualWidthProperty, value);
};
Nullstone.FinishCreate(ColumnDefinition);

var ColumnDefinitionCollection = Nullstone.Create("ColumnDefinitionCollection", DependencyObjectCollection);
ColumnDefinitionCollection.Instance.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$DependencyObjectCollection(value, error);
};
ColumnDefinitionCollection.Instance.IsElementType = function (value) {
    return value instanceof ColumnDefinition;
};
Nullstone.FinishCreate(ColumnDefinitionCollection);

var ControlTemplate = Nullstone.Create("ControlTemplate", FrameworkTemplate, 2);
ControlTemplate.Instance.Init = function (targetType, json) {
    this.Init$FrameworkTemplate();
    this.SetTargetType(targetType);
    this._TempJson = json;
};
ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);
ControlTemplate.Instance.GetTargetType = function () {
    return this.$GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.Instance.SetTargetType = function (value) {
    this.$SetValue(ControlTemplate.TargetTypeProperty, value);
};
ControlTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
    if (this._TempJson) {
        var namescope = new NameScope();
        var parser = new JsonParser();
        parser._TemplateBindingSource = templateBindingSource;
        var root = parser.CreateObject(this._TempJson, namescope);
        NameScope.SetNameScope(root, namescope);
        return root;
    }
    this._GetVisualTreeWithError$FrameworkTemplate(templateBindingSource, error);
};
Nullstone.FinishCreate(ControlTemplate);

var RowDefinition = Nullstone.Create("RowDefinition", DependencyObject);
RowDefinition.HeightProperty = DependencyProperty.Register("Height", function () { return GridLength; }, RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.Instance.GetHeight = function () {
    return this.$GetValue(RowDefinition.HeightProperty);
};
RowDefinition.Instance.SetHeight = function (value) {
    this.$SetValue(RowDefinition.HeightProperty, value);
};
RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.Instance.GetMaxHeight = function () {
    return this.$GetValue(RowDefinition.MaxHeightProperty);
};
RowDefinition.Instance.SetMaxHeight = function (value) {
    this.$SetValue(RowDefinition.MaxHeightProperty, value);
};
RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.Instance.GetMinHeight = function () {
    return this.$GetValue(RowDefinition.MinHeightProperty);
};
RowDefinition.Instance.SetMinHeight = function (value) {
    this.$SetValue(RowDefinition.MinHeightProperty, value);
};
RowDefinition.ActualHeightProperty = DependencyProperty.Register("ActualHeight", function () { return Number; }, RowDefinition, 0.0);
RowDefinition.Instance.GetActualHeight = function () {
    return this.$GetValue(RowDefinition.ActualHeightProperty);
};
RowDefinition.Instance.SetActualHeight = function (value) {
    this.$SetValue(RowDefinition.ActualHeightProperty, value);
};
Nullstone.FinishCreate(RowDefinition);

var RowDefinitionCollection = Nullstone.Create("RowDefinitionCollection", DependencyObjectCollection);
RowDefinitionCollection.Instance.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$DependencyObjectCollection(value, error);
};
RowDefinitionCollection.Instance.IsElementType = function (value) {
    return value instanceof RowDefinition;
};
Nullstone.FinishCreate(RowDefinitionCollection);

var _PasswordBoxDynamicPropertyValueProvider = Nullstone.Create("_PasswordBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider, 2);
_PasswordBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, 
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
};
Nullstone.FinishCreate(_PasswordBoxDynamicPropertyValueProvider);

var DataTemplate = Nullstone.Create("DataTemplate", FrameworkTemplate);
DataTemplate.CreateTemplateFromJson = function (json) {
    var template = new DataTemplate();
    var namescope = new NameScope();
    var parser = new JsonParser();
    var root = parser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};
Nullstone.FinishCreate(DataTemplate);

var FrameworkElement = Nullstone.Create("FrameworkElement", UIElement);
FrameworkElement.Instance.Init = function () {
    this.Init$UIElement();
    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();
    this._Providers[_PropertyPrecedence.LocalStyle] = new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle);
    this._Providers[_PropertyPrecedence.ImplicitStyle] = new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle);
    this._Providers[_PropertyPrecedence.DynamicValue] = new FrameworkElementPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._Providers[_PropertyPrecedence.InheritedDataContext] = new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext);
    this.SizeChanged = new MulticastEvent();
};
FrameworkElement.HeightProperty = DependencyProperty.Register("Height", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.Instance.GetHeight = function () {
    return this.$GetValue(FrameworkElement.HeightProperty);
};
FrameworkElement.Instance.SetHeight = function (value) {
    this.$SetValue(FrameworkElement.HeightProperty, value);
};
FrameworkElement.WidthProperty = DependencyProperty.Register("Width", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.Instance.GetWidth = function () {
    return this.$GetValue(FrameworkElement.WidthProperty);
};
FrameworkElement.Instance.SetWidth = function (value) {
    this.$SetValue(FrameworkElement.WidthProperty, value);
};
FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () { return Number; }, FrameworkElement);
FrameworkElement.Instance.GetActualHeight = function () {
    return this.$GetValue(FrameworkElement.ActualHeightProperty);
};
FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () { return Number; }, FrameworkElement);
FrameworkElement.Instance.GetActualWidth = function () {
    return this.$GetValue(FrameworkElement.ActualWidthProperty);
};
FrameworkElement.DataContextProperty = DependencyProperty.Register("DataContext", function () { return Object; }, FrameworkElement);
FrameworkElement.Instance.GetDataContext = function () {
    return this.$GetValue(FrameworkElement.DataContextProperty);
};
FrameworkElement.Instance.SetDataContext = function (value) {
    this.$SetValue(FrameworkElement.DataContextProperty, value);
};
FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", function () { return new Enum(HorizontalAlignment); }, FrameworkElement, HorizontalAlignment.Stretch);
FrameworkElement.Instance.GetHorizontalAlignment = function () {
    return this.$GetValue(FrameworkElement.HorizontalAlignmentProperty);
};
FrameworkElement.Instance.SetHorizontalAlignment = function (value) {
    this.$SetValue(FrameworkElement.HorizontalAlignmentProperty, value);
};
FrameworkElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, FrameworkElement);
FrameworkElement.Instance.GetLanguage = function () {
    return this.$GetValue(FrameworkElement.LanguageProperty);
};
FrameworkElement.Instance.SetLanguage = function (value) {
    this.$SetValue(FrameworkElement.LanguageProperty, value);
};
FrameworkElement.MarginProperty = DependencyProperty.Register("Margin", function () { return Thickness; }, FrameworkElement, new Thickness());
FrameworkElement.Instance.GetMargin = function () {
    return this.$GetValue(FrameworkElement.MarginProperty);
};
FrameworkElement.Instance.SetMargin = function (value) {
    this.$SetValue(FrameworkElement.MarginProperty, value);
};
FrameworkElement.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.Instance.GetMaxHeight = function () {
    return this.$GetValue(FrameworkElement.MaxHeightProperty);
};
FrameworkElement.Instance.SetMaxHeight = function (value) {
    this.$SetValue(FrameworkElement.MaxHeightProperty, value);
};
FrameworkElement.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.Instance.GetMaxWidth = function () {
    return this.$GetValue(FrameworkElement.MaxWidthProperty);
};
FrameworkElement.Instance.SetMaxWidth = function (value) {
    this.$SetValue(FrameworkElement.MaxWidthProperty, value);
};
FrameworkElement.MinHeightProperty = DependencyProperty.Register("MinHeight", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.Instance.GetMinHeight = function () {
    return this.$GetValue(FrameworkElement.MinHeightProperty);
};
FrameworkElement.Instance.SetMinHeight = function (value) {
    this.$SetValue(FrameworkElement.MinHeightProperty, value);
};
FrameworkElement.MinWidthProperty = DependencyProperty.Register("MinWidth", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.Instance.GetMinWidth = function () {
    return this.$GetValue(FrameworkElement.MinWidthProperty);
};
FrameworkElement.Instance.SetMinWidth = function (value) {
    this.$SetValue(FrameworkElement.MinWidthProperty, value);
};
FrameworkElement.VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", function () { return new Enum(VerticalAlignment); }, FrameworkElement, VerticalAlignment.Stretch);
FrameworkElement.Instance.GetVerticalAlignment = function () {
    return this.$GetValue(FrameworkElement.VerticalAlignmentProperty);
};
FrameworkElement.Instance.SetVerticalAlignment = function (value) {
    this.$SetValue(FrameworkElement.VerticalAlignmentProperty, value);
};
FrameworkElement.StyleProperty = DependencyProperty.Register("Style", function () { return Style; }, FrameworkElement);
FrameworkElement.Instance.GetStyle = function () {
    return this.$GetValue(FrameworkElement.StyleProperty);
};
FrameworkElement.Instance.SetStyle = function (value) {
    this.$SetValue(FrameworkElement.StyleProperty, value);
};
FrameworkElement.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return new Enum(FlowDirection); }, FrameworkElement);
FrameworkElement.Instance.GetFlowDirection = function () {
    return this.$GetValue(FrameworkElement.FlowDirectionProperty);
};
FrameworkElement.Instance.SetFlowDirection = function (value) {
    this.$SetValue(FrameworkElement.FlowDirectionProperty, value);
};
FrameworkElement.Instance.SetTemplateBinding = function (propd, tb) {
    try {
        this.$SetValue(propd, tb);
    } catch (err) {
    }
};
FrameworkElement.Instance.SetBinding = function (propd, binding) {
    return BindingOperations.SetBinding(this, propd, binding);
};
FrameworkElement.Instance._ApplySizeConstraints = function (size) {
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
FrameworkElement.Instance._ComputeActualSize = function () {
    var parent = this.GetVisualParent();
    if (this.GetVisibility() !== Visibility.Visible)
        return new Size(0.0, 0.0);
    if ((parent && !(parent instanceof Canvas)) || this.IsLayoutContainer())
        return this._GetRenderSize();
    var actual = new Size(0, 0);
    actual = this._ApplySizeConstraints(actual);
    return actual;
};
FrameworkElement.Instance._ComputeBounds = function () {
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
FrameworkElement.Instance._ComputeGlobalBounds = function () {
    this._ComputeGlobalBounds$UIElement();
    this._GlobalBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._LocalProjection);
};
FrameworkElement.Instance._ComputeSurfaceBounds = function () {
    this._ComputeSurfaceBounds$UIElement();
    this._SurfaceBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteProjection);
};
FrameworkElement.Instance._GetSubtreeExtents = function () {
    if (this._GetSubtreeObject())
        return this._ExtentsWithChildren;
    return this._Extents;
};
FrameworkElement.Instance._GetGlobalBounds = function () {
    if (this._GetSubtreeObject())
        return this._GlobalBoundsWithChildren;
    return this._GlobalBounds;
};
FrameworkElement.Instance._GetSubtreeBounds = function () {
    if (this._GetSubtreeObject())
        return this._SurfaceBoundsWithChildren;
    return this._SurfaceBounds;
};
FrameworkElement.Instance.Measure = function (availableSize) {
    var error = new BError();
    this._MeasureWithError(availableSize, error);
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;
    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        return;
    }
    var last = LayoutInformation.GetPreviousConstraint(this);
    var shouldMeasure = (this._DirtyFlags & _Dirty.Measure) > 0;
    shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);
    if (this.GetVisibility() !== Visibility.Visible) {
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
    if (!parent || parent instanceof Canvas) {
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
FrameworkElement.Instance._MeasureOverrideWithError = function (availableSize, error) {
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
FrameworkElement.Instance.Arrange = function (finalRect) {
    var error = new BError();
    this._ArrangeWithError(finalRect, error);
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;
    var slot = this.ReadLocalValue(LayoutInformation.LayoutSlotProperty);
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
    if (this.GetVisibility() !== Visibility.Visible) {
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
    if (horiz === HorizontalAlignment.Stretch)
        framework.Width = Math.max(framework.Width, stretched.Width);
    if (vert === VerticalAlignment.Stretch)
        framework.Height = Math.max(framework.Height, stretched.Height);
    offer = offer.Max(framework);
    LayoutInformation.SetLayoutSlot(this, finalRect);
    var response;
    if (this.ArrangeOverride)
        response = this.ArrangeOverride(offer);
    else
        response = this._ArrangeOverrideWithError(offer, error);
    if (horiz === HorizontalAlignment.Stretch)
        response.Width = Math.max(response.Width, framework.Width);
    if (vert === VerticalAlignment.Stretch)
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
    var layoutXform = new Matrix();
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
FrameworkElement.Instance._ArrangeOverrideWithError = function (finalSize, error) {
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
FrameworkElement.Instance._HitTestPoint = function (ctx, p, uielist) {
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
        if (!Nullstone.RefEquals(node, uielist.First())) {
            hit = true;
            break;
        }
    }
    if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, p.X, p.Y)))
        uielist.Remove(node);
};
FrameworkElement.Instance._InsideObject = function (ctx, x, y) {
    var np = new Point(x, y);
    this._TransformPoint(np);
    var extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    if (!extents.ContainsPointXY(np.X, np.Y))
        return false;
    if (!this._InsideLayoutClip(x, y))
        return false;
    return this._InsideObject$UIElement(ctx, x, y);
};
FrameworkElement.Instance._InsideLayoutClip = function (x, y) {
    return true;
};
FrameworkElement.Instance._HasLayoutClip = function () {
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
FrameworkElement.Instance._RenderLayoutClip = function (ctx) {
    var element = this;
    var iX = 0;
    var iY = 0;
    while (element) {
        var geom = LayoutInformation.GetLayoutClip(element);
        if (geom)
            ctx.Clip(geom);
        if (element instanceof Canvas || element instanceof UserControl)
            break;
        var visualOffset = LayoutInformation.GetVisualOffset(element);
        if (visualOffset) {
            ctx.Transform(Matrix.CreateTranslate(-visualOffset.X, -visualOffset.Y));
            iX += visualOffset.X;
            iY += visualOffset.Y;
        }
        element = element.GetVisualParent();
    }
    ctx.Transform(Matrix.CreateTranslate(iX, iY));
};
FrameworkElement.Instance._ElementRemoved = function (value) {
    this._ElementRemoved$UIElement(value);
    if (this._GetSubtreeObject() == value)
        this._SetSubtreeObject(null);
};
FrameworkElement.Instance._UpdateLayer = function (pass, error) {
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
        if (element.GetVisibility() === Visibility.Visible) {
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
                if (child.GetVisibility() !== Visibility.Visible || !child._HasFlag(flag)) {
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
                        if (child.ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
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
                    fe.SizeChanged.Raise(fe, new SizeChangedEventArgs(last, fe._GetRenderSize()));
                }
            }
            Info("Completed _SizeList Update");
        } else {
            break;
        }
    }
};
FrameworkElement.Instance._SetImplicitStyles = function (styleMask, styles) {
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
                Warn("Style validation failed. [" + error.Message + "]");
                return;
            }
        }
    }
    this._Providers[_PropertyPrecedence.ImplicitStyle].SetStyles(styleMask, styles, error);
};
FrameworkElement.Instance._ClearImplicitStyles = function (styleMask) {
    var error = new BError();
    this._Providers[_PropertyPrecedence.ImplicitStyle].ClearStyles(styleMask, error);
};
FrameworkElement.Instance.OnApplyTemplate = function () { };
FrameworkElement.Instance._ApplyTemplateWithError = function (error) {
    if (this._GetSubtreeObject())
        return false;
    var result = this._DoApplyTemplateWithError(error);
    if (result)
        this.OnApplyTemplate();
    return result;
};
FrameworkElement.Instance._DoApplyTemplateWithError = function (error) {
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
FrameworkElement.Instance._GetDefaultTemplate = function () {
    if (this._GetDefaultTemplateCallback)
        return this._GetDefaultTemplateCallback(this);
    return null;
};
FrameworkElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        this._OnPropertyChanged$UIElement(args, error);
        return;
    }
    if (args.Property === FrameworkElement.WidthProperty
        || args.Property === FrameworkElement.MaxWidthProperty
        || args.Property === FrameworkElement.MinWidthProperty
        || args.Property === FrameworkElement.HeightProperty
        || args.Property === FrameworkElement.MaxHeightProperty
        || args.Property === FrameworkElement.MinHeightProperty
        || args.Property === FrameworkElement.MarginProperty
        || args.Property === FrameworkElement.FlowDirectionProperty) {
        this._FullInvalidate(false);
        var visualParent = this.GetVisualParent();
        if (visualParent)
            visualParent._InvalidateMeasure();
        this._InvalidateMeasure();
        this._InvalidateArrange();
        this._UpdateBounds();
    } else if (args.Property === FrameworkElement.StyleProperty) {
        var newStyle = args.NewValue;
        if (!error.IsErrored())
            this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
        if (error.IsErrored())
            return;
    } else if (args.Property === FrameworkElement.HorizontalAlignmentProperty
        || args.Property == FrameworkElement.VerticalAlignmentProperty) {
        this._InvalidateArrange();
        this._FullInvalidate(true);
    }
    this.PropertyChanged.Raise(this, args);
};
FrameworkElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
};
FrameworkElement.Instance.InvokeLoaded = function () {
};
FrameworkElement.Instance._OnIsLoadedChanged = function (loaded) {
    if (loaded)
        this._SetImplicitStyles(_StyleMask.All);
    else
        this._ClearImplicitStyles(_StyleMask.VisualTree);
    this._OnIsLoadedChanged$UIElement(loaded);
    if (loaded)
        this.InvokeLoaded();
    if (this._Providers[_PropertyPrecedence.InheritedDataContext])
        this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
};
FrameworkElement.Instance.SetVisualParent = function (/* UIElement */value) {
    this.SetVisualParent$UIElement(value);
    if (!this._LogicalParent && (this._VisualParent == null || this._VisualParent instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(this._VisualParent);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};
FrameworkElement.Instance._SetLogicalParent = function (value, error) {
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
FrameworkElement.Instance._GetLogicalParent = function () {
    return this._LogicalParent;
};
FrameworkElement.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
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
FrameworkElement.Instance._HasFocus = function () {
    for (var doh = Nullstone.As(FocusManager.GetFocusedElement(), DependencyObject); doh != null; doh = VisualTreeHelper.GetParent(doh)) {
        if (Nullstone.RefEquals(doh, this))
            return true;
    }
    return false;
};
FrameworkElement.Instance.OnMouseLeftButtonDown = function (sender, args) { };
Nullstone.FinishCreate(FrameworkElement);

var Setter = Nullstone.Create("Setter", SetterBase);
Setter.PropertyProperty = DependencyProperty.Register("Property", function () { return DependencyProperty; }, Setter);
Setter.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, Setter);
Setter.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, Setter);
Nullstone.FinishCreate(Setter);

var SetterBaseCollection = Nullstone.Create("SetterBaseCollection", DependencyObjectCollection);
SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);
SetterBaseCollection.Instance.GetIsSealed = function () {
    return this.$GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.Instance.SetIsSealed = function (value) {
    this.$SetValue(SetterBaseCollection.IsSealedProperty, value);
};
SetterBaseCollection.Instance._Seal = function () {
    this.SetIsSealed(true);
    var error = new BError();
    var iterator = this.GetIterator();
    var setter;
    while (iterator.Next(error) && (setter = iterator.GetCurrent(error))) {
        setter._Seal();
    }
};
SetterBaseCollection.Instance.AddedToCollection = function (value, error) {
    if (!value || !this._ValidateSetter(value, error))
        return false;
    if (value instanceof SetterBase) {
        value.SetAttached(true);
        value._Seal();
    }
    return this.AddedToCollection$DependencyObjectCollection(value, error);
};
SetterBaseCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value.SetAttached(false);
    }
    this.RemovedFromCollection$DependencyObjectCollection(value, isValueSafe);
};
SetterBaseCollection.Instance.IsElementType = function (value) {
    return value instanceof SetterBase;
};
SetterBaseCollection.Instance._ValidateSetter = function (value, error) {
    var s;
    if (value instanceof Setter) {
        s = Nullstone.As(value, Setter);
        if (s.$GetValue(Setter.PropertyProperty) == null) {
            error.SetErrored(BError.Exception, "Cannot have a null PropertyProperty value");
            return false;
        }
        if (s.ReadLocalValue(Setter.ValueProperty) == null) {
            error.SetErrored(BError.Exception, "Cannot have a null ValueProperty value");
            return false;
        }
    }
    if (value instanceof SetterBase) {
        s = Nullstone.As(value, SetterBase);
        if (s.GetAttached()) {
            error.SetErrored(BError.InvalidOperation, "Setter is currently attached to another style");
            return false;
        }
    }
    if (this.GetIsSealed()) {
        error.SetErrored(BError.Exception, "Cannot add a setter to a sealed style");
        return false;
    }
    return true;
};
Nullstone.FinishCreate(SetterBaseCollection);

var Block = Nullstone.Create("Block", TextElement);
Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.Instance.GetInlines = function () {
    return this.$GetValue(Block.InlinesProperty);
};
Block.Instance.SetInlines = function (value) {
    this.$SetValue(Block.InlinesProperty, value);
};
Nullstone.FinishCreate(Block);

var BlockCollection = Nullstone.Create("BlockCollection", TextElementCollection);
Nullstone.FinishCreate(BlockCollection);

var Inline = Nullstone.Create("Inline", TextElement);
Inline.Instance.Init = function () {
    this.Init$TextElement();
    this._Autogen = false;
};
Inline.Instance.Equals = function (inline) {
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
Inline.Instance._GetAutogenerated = function () {
    return this._Autogen;
};
Inline.Instance._SetAutogenerated = function (value) {
    this._Autogen = value;
};
Nullstone.FinishCreate(Inline);

var InlineCollection = Nullstone.Create("InlineCollection", TextElementCollection);
InlineCollection.Instance.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return this.AddedToCollection$TextElementCollection(value, error);
};
InlineCollection.Instance.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.Instance.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.Instance._SetIsForHyperlink = function () { this._ForHyperlink = true; };
Nullstone.FinishCreate(InlineCollection);

var LineBreak = Nullstone.Create("LineBreak", Inline);
Nullstone.FinishCreate(LineBreak);

var Paragraph = Nullstone.Create("Paragraph", Block);
Nullstone.FinishCreate(Paragraph);

var Run = Nullstone.Create("Run", Inline);
Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return new Enum(FlowDirection); }, Run, FlowDirection.LeftToRight);
Run.Instance.GetFlowDirection = function () {
    return this.$GetValue(Run.FlowDirectionProperty);
};
Run.Instance.SetFlowDirection = function (value) {
    this.$SetValue(Run.FlowDirectionProperty, value);
};
Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);
Run.Instance.GetText = function () {
    return this.$GetValue(Run.TextProperty);
};
Run.Instance.SetText = function (value) {
    this.$SetValue(Run.TextProperty, value);
};
Run.Instance._SerializeText = function (str) {
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};
Nullstone.FinishCreate(Run);

var Section = Nullstone.Create("Section", TextElement);
Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);
Section.Instance.GetBlocks = function () {
    return this.$GetValue(Section.BlocksProperty);
};
Section.Instance.SetBlocks = function (value) {
    this.$SetValue(Section.BlocksProperty, value);
};
Nullstone.FinishCreate(Section);

var Span = Nullstone.Create("Span", Inline);
Span._CreateInlineCollection = function (obj) {
    var inlines = new InlineCollection();
    if (obj instanceof Hyperlink)
        inlines._SetIsForHyperlink();
    return inlines;
};
Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, null, { GetValue: function (obj) { return Span._CreateInlineCollection(obj); } });
Span.Instance.GetInlines = function () {
    return this.$GetValue(Span.InlinesProperty);
};
Span.Instance._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
Span.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
        if (args.Action === CollectionChangedArgs.Action.Add)
            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
        this._NotifyLayoutContainerOnCollectionChanged(sender, args);
    } else {
        this._OnCollectionChanged$Inline(sender, args);
    }
};
Nullstone.FinishCreate(Span);

var ArcSegment = Nullstone.Create("ArcSegment", PathSegment);
ArcSegment.Instance.Init = function () {
};
ArcSegment.IsLargeArcProperty = DependencyProperty.RegisterCore("IsLargeArc", function () { return Boolean; }, ArcSegment, false);
ArcSegment.Instance.GetIsLargeArc = function () {
    return this.$GetValue(ArcSegment.IsLargeArcProperty);
};
ArcSegment.Instance.SetIsLargeArc = function (value) {
    this.$SetValue(ArcSegment.IsLargeArcProperty, value);
};
ArcSegment.PointProperty = DependencyProperty.Register("Point", function () { return Point; }, ArcSegment, new Point());
ArcSegment.Instance.GetPoint = function () {
    return this.$GetValue(ArcSegment.PointProperty);
};
ArcSegment.Instance.SetPoint = function (value) {
    this.$SetValue(ArcSegment.PointProperty, value);
};
ArcSegment.RotationAngleProperty = DependencyProperty.Register("RotationAngle", function () { return Number; }, ArcSegment, 0.0);
ArcSegment.Instance.GetRotationAngle = function () {
    return this.$GetValue(ArcSegment.RotationAngleProperty);
};
ArcSegment.Instance.SetRotationAngle = function (value) {
    this.$SetValue(ArcSegment.RotationAngleProperty, value);
};
ArcSegment.SizeProperty = DependencyProperty.Register("Size", function () { return Size; }, ArcSegment, new Size());
ArcSegment.Instance.GetSize = function () {
    return this.$GetValue(ArcSegment.SizeProperty);
};
ArcSegment.Instance.SetSize = function (value) {
    this.$SetValue(ArcSegment.SizeProperty, value);
};
ArcSegment.SweepDirectionProperty = DependencyProperty.Register("SweepDirection", function () { return new Enum(SweepDirection); }, ArcSegment, SweepDirection.Counterclockwise);
ArcSegment.Instance.GetSweepDirection = function () {
    return this.$GetValue(ArcSegment.SweepDirectionProperty);
};
ArcSegment.Instance.SetSweepDirection = function (value) {
    this.$SetValue(ArcSegment.SweepDirectionProperty, value);
};
ArcSegment.Instance._Append = function (path) {
    NotImplemented("ArcSegment._Append");
};
Nullstone.FinishCreate(ArcSegment);

var ImageBrush = Nullstone.Create("ImageBrush", TileBrush);
ImageBrush.Instance.Init = function () {
    this.Init$TileBrush();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
};
ImageBrush.ImageSourceProperty = DependencyProperty.RegisterFull("ImageSource", function () { return ImageBrush; }, ImageBrush, null, { GetValue: function (propd, obj) { return new BitmapImage(); } });
ImageBrush.Instance.GetImageSource = function () {
    return this.$GetValue(ImageBrush.ImageSourceProperty);
};
ImageBrush.Instance.SetImageSource = function (value) {
    this.$SetValue(ImageBrush.ImageSourceProperty, value);
};
ImageBrush.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ImageBrush) {
        this._OnPropertyChanged$TileBrush(args, error);
        return;
    }
    if (args.Property._ID === ImageBrush.ImageSourceProperty._ID) {
        var oldBmpSrc = Nullstone.As(args.OldValue, BitmapSource);
        if (oldBmpSrc != null) {
            oldBmpSrc._ErroredCallback = null;
            oldBmpSrc._LoadedCallback = null;
        }
        var newBmpSrc = Nullstone.As(args.NewValue, BitmapSource);
        if (newBmpSrc != null) {
            var ib = this;
            newBmpSrc._ErroredCallback = function () { ib.ImageFailed.Raise(this, new EventArgs()); };
            newBmpSrc._LoadedCallback = function () { ib.ImageOpened.Raise(this, new EventArgs()); };
        }
    }
    this.PropertyChanged.Raise(this, args);
};
ImageBrush.Instance.SetupBrush = function (ctx, bounds) {
    var source = this.GetSource();
    if (source == null)
        return null;
    var pattern = ctx.createPattern(source._Image, "no-repeat");
    NotImplemented("ImageBrush.SetupBrush");
};
Nullstone.FinishCreate(ImageBrush);

var MatrixTransform = Nullstone.Create("MatrixTransform", Transform);
MatrixTransform.Instance.Init = function () {
};
MatrixTransform.MatrixProperty = DependencyProperty.RegisterCore("Matrix", function() { return Matrix; }, MatrixTransform, new Matrix());
MatrixTransform.Instance.GetMatrix = function () {
	return this.$GetValue(MatrixTransform.MatrixProperty);
};
MatrixTransform.Instance.SetMatrix = function (value) {
	this.$SetValue(MatrixTransform.MatrixProperty, value);
};
MatrixTransform.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== MatrixTransform) {
        this._OnPropertyChanged$Transform(args, error);
        return;
    }
    if (args.Property._ID === MatrixTransform.MatrixProperty._ID) {
        if (args.OldValue != null)
            args.OldValue._ChangedCallback = null;
        if (args.NewValue != null) {
            var mt = this;
            args.NewValue._ChangedCallback = function () { mt._OnSubPropertyChanged(MatrixTransform.MatrixProperty, this, args) };
        }
    }
    this.PropertyChanged.Raise(this, args);
};
MatrixTransform.prototype._OnSubPropertyChanged = function (propd, sender, args) {
    this._NeedUpdate = true;
    this._OnSubPropertyChanged$Transform(propd, sender, args);
    var newArgs = {
        Property: propd,
        OldValue: null,
        NewValue: this.$GetValue(propd)
    };
    this.PropertyChanged.Raise(this, newArgs);
};
Nullstone.FinishCreate(MatrixTransform);

var Animation = Nullstone.Create("Animation", Timeline);
Animation.Instance.Resolve = function () { return true; };
Animation.Instance.HookupStorage = function (targetObj, targetProp) {
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};
Animation.Instance.Stop = function () {
    if (this._Storage == null)
        return;
    this._Storage.Stop();
};
Animation.Instance.UpdateInternal = function (clockData) {
    if (this._Storage != null)
        this._Storage.UpdateCurrentValueAndApply(clockData);
};
Animation.Instance._GetTargetValue = function (defaultOriginValue) { return null; };
Animation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) { return null; };
Nullstone.FinishCreate(Animation);

var ColorAnimation = Nullstone.Create("ColorAnimation", Animation);
ColorAnimation.ByProperty = DependencyProperty.Register("By", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetBy = function () {
    return this.$GetValue(ColorAnimation.ByProperty);
};
ColorAnimation.Instance.SetBy = function (value) {
    this.$SetValue(ColorAnimation.ByProperty, value);
};
/*
ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, ColorAnimation);
ColorAnimation.Instance.GetEasingFunction = function () {
return this.$GetValue(ColorAnimation.EasingFunctionProperty);
};
ColorAnimation.Instance.SetEasingFunction = function (value) {
this.$SetValue(ColorAnimation.EasingFunctionProperty, value);
};
*/
ColorAnimation.FromProperty = DependencyProperty.Register("From", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetFrom = function () {
    return this.$GetValue(ColorAnimation.FromProperty);
};
ColorAnimation.Instance.SetFrom = function (value) {
    this.$SetValue(ColorAnimation.FromProperty, value);
};
ColorAnimation.ToProperty = DependencyProperty.Register("To", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetTo = function () {
    return this.$GetValue(ColorAnimation.ToProperty);
};
ColorAnimation.Instance.SetTo = function (value) {
    this.$SetValue(ColorAnimation.ToProperty, value);
};
ColorAnimation.Instance._GetTargetValue = function (defaultOriginValue) {
    this._EnsureCache();
    var start = new Color();
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && defaultOriginValue instanceof Color)
        start = defaultOriginValue;
    if (this._ToCached != null)
        return this._ToCached;
    else if (this._ByCached != null)
        return start.Add(this._ByCached);
    return start;
};
ColorAnimation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    this._EnsureCache();
    var start = new Color();
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && defaultOriginValue instanceof Color)
        start = defaultOriginValue;
    var end = start;
    if (this._ToCached != null)
        end = this._ToCached;
    else if (this._ByCached != null)
        end = start.Add(this._ByCached);
    else if (defaultDestinationValue != null && defaultDestinationValue instanceof Number)
        end = defaultDestinationValue;
    return start.Add(end.Subtract(start).Multiply(clockData.Progress));
};
ColorAnimation.Instance._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};
Nullstone.FinishCreate(ColorAnimation);

var DiscreteObjectKeyFrame = Nullstone.Create("DiscreteObjectKeyFrame", ObjectKeyFrame);
DiscreteObjectKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0) {
        return this.GetConvertedValue();
    }
    return baseValue;
};
Nullstone.FinishCreate(DiscreteObjectKeyFrame);

var DoubleAnimation = Nullstone.Create("DoubleAnimation", Animation);
DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetBy = function () {
    return this.$GetValue(DoubleAnimation.ByProperty);
};
DoubleAnimation.Instance.SetBy = function (value) {
    this.$SetValue(DoubleAnimation.ByProperty, value);
};
/*
DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, DoubleAnimation);
DoubleAnimation.Instance.GetEasingFunction = function () {
return this.$GetValue(DoubleAnimation.EasingFunctionProperty);
};
DoubleAnimation.Instance.SetEasingFunction = function (value) {
this.$SetValue(DoubleAnimation.EasingFunctionProperty, value);
};
*/
DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetFrom = function () {
    return this.$GetValue(DoubleAnimation.FromProperty);
};
DoubleAnimation.Instance.SetFrom = function (value) {
    this.$SetValue(DoubleAnimation.FromProperty, value);
};
DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetTo = function () {
    return this.$GetValue(DoubleAnimation.ToProperty);
};
DoubleAnimation.Instance.SetTo = function (value) {
    this.$SetValue(DoubleAnimation.ToProperty, value);
};
DoubleAnimation.Instance._GetTargetValue = function (defaultOriginValue) {
    this._EnsureCache();
    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;
    if (this._ToCached != null)
        return this._ToCached;
    else if (this._ByCached != null)
        return start + this._ByCached;
    return start;
};
DoubleAnimation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    this._EnsureCache();
    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;
    var end = start;
    if (this._ToCached != null)
        end = this._ToCached;
    else if (this._ByCached != null)
        end = start + this._ByCached;
    else if (defaultDestinationValue != null && Number.isNumber(defaultDestinationValue))
        end = defaultDestinationValue;
    return start + ((end - start) * clockData.Progress);
};
DoubleAnimation.Instance._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};
DoubleAnimation.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== DoubleAnimation) {
        this._OnPropertyChanged$Animation(args, error);
        return;
    }
    this._FromCached = null;
    this._ToCached = null;
    this._ByCached = null;
    this._HasCached = false;
    this.PropertyChanged.Raise(this, args);
};
Nullstone.FinishCreate(DoubleAnimation);

var ObjectAnimationUsingKeyFrames = Nullstone.Create("ObjectAnimationUsingKeyFrames", Animation);
ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, null, { GetValue: function () { return new ObjectKeyFrameCollection(); } });
ObjectAnimationUsingKeyFrames.Instance.GetKeyFrames = function () {
    return this.$GetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty);
};
ObjectAnimationUsingKeyFrames.Instance.SetKeyFrames = function (value) {
    this.$SetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty, value);
};
ObjectAnimationUsingKeyFrames.Instance.Resolve = function (target, propd) {
    var frames = this.GetKeyFrames();
    var count = frames.GetCount();
    for (var i = 0; i < count; i++) {
        var frame = Nullstone.As(frames.GetValueAt(i), ObjectKeyFrame);
        var value = frame.$GetValue(ObjectKeyFrame.ValueProperty);
        if (value == null) {
            frame.$SetValue(ObjectKeyFrame.ConvertedValueProperty, null);
        } else {
            var converted = value;
            frame.$SetValue(ObjectKeyFrame.ConvertedValueProperty, converted);
        }
    }
    KeyFrameCollection.ResolveKeyFrames(this, frames);
    return true;
};
ObjectAnimationUsingKeyFrames.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    var keyFrames = this.GetKeyFrames();
    var prevFrameRef = {};
    var currentKeyFrame = keyFrames.GetKeyFrameForTime(clockData.CurrentTime, prevFrameRef);
    var prevFrame = prevFrameRef.Value;
    if (currentKeyFrame == null)
        return null;
    var baseValue;
    var keyStartTime;
    var keyEndTime = currentKeyFrame._ResolvedKeyTime;
    if (prevFrame == null) {
        baseValue = defaultOriginValue;
        keyStartTime = 0;
    } else {
        baseValue = prevFrame.GetConvertedValue();
        keyStartTime = prevFrame._ResolvedKeyTime;
    }
    var progress;
    if (clockData.CurrentTime.CompareTo(keyEndTime) >= 0) {
        progress = 1.0;
    } else {
        var keyDuration = keyEndTime.Subtract(keyStartTime);
        if (keyDuration <= 0)
            progress = 1.0;
        else
            progress = (clockData.CurrentTime.Subtract(keyStartTime)).Divide(keyDuration);
    }
    return currentKeyFrame.InterpolateValue(baseValue, progress);
};
ObjectAnimationUsingKeyFrames.Instance.AddKeyFrame = function (frame) {
    this.GetKeyFrames().Add(frame);
};
ObjectAnimationUsingKeyFrames.Instance.RemoveKeyFrame = function (frame) {
    this.GetKeyFrames().Remove(frame);
};
Nullstone.FinishCreate(ObjectAnimationUsingKeyFrames);

var Storyboard = Nullstone.Create("Storyboard", Timeline);
Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.Instance.GetChildren = function () {
    return this.$GetValue(Storyboard.ChildrenProperty);
};
Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    return d.$GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    d.$SetValue(Storyboard.TargetNameProperty, value);
};
Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    return d.$GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    d.$SetValue(Storyboard.TargetPropertyProperty, value);
};
Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};
Storyboard.Instance.Begin = function () {
    var error = new BError();
    this.BeginWithError(error);
    if (error.IsErrored())
        throw error.CreateException();
};
Storyboard.Instance.BeginWithError = function (error) {
    this.Reset();
    if (!this._HookupAnimations(error))
        return false;
    App.Instance.RegisterStoryboard(this);
};
Storyboard.Instance.Pause = function () {
    this._IsPaused = true;
};
Storyboard.Instance.Resume = function () {
    var nowTime = new Date().getTime();
    this._LastStep = nowTime;
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren(i).GetValueAt(i)._LastStep = nowTime;
    }
    this._IsPaused = false;
};
Storyboard.Instance.Stop = function () {
    App.Instance.UnregisterStoryboard(this);
    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        children.GetValueAt(i).Stop();
    }
};
Storyboard.Instance._HookupAnimations = function (error) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        var animation = this.GetChildren(i).GetValueAt(i);
        animation.Reset();
        if (!this._HookupAnimation(animation, null, null, error))
            return false;
    }
    return true;
};
Storyboard.Instance._HookupAnimation = function (animation, targetObject, targetPropertyPath, error) {
    var localTargetObject = null;
    var localTargetPropertyPath = null;
    if (animation.HasManualTarget()) {
        localTargetObject = animation.GetManualTarget();
    } else {
        var name = Storyboard.GetTargetName(animation);
        if (name)
            localTargetObject = animation.FindName(name);
    }
    localTargetPropertyPath = Storyboard.GetTargetProperty(animation);
    if (localTargetObject != null)
        targetObject = localTargetObject;
    if (localTargetPropertyPath != null)
        targetPropertyPath = localTargetPropertyPath;
    var refobj = {
        Value: targetObject
    };
    targetPropertyPath.TryResolveDependencyProperty(targetObject);
    var targetProperty = DependencyProperty.ResolvePropertyPath(refobj, targetPropertyPath);
    if (targetProperty == null) {
        Warn("Could not resolve property for storyboard. [" + localTargetPropertyPath.GetPath().toString() + "]");
        return false;
    }
    if (!animation.Resolve(refobj.Value, targetProperty)) {
        error.SetErrored(BError.InvalidOperation, "Storyboard value could not be converted to the correct type");
        return false;
    }
    animation.HookupStorage(refobj.Value, targetProperty);
    return true;
};
Storyboard.Instance._Tick = function (lastTime, nowTime) {
    if (this._IsPaused)
        return;
    this.Update(nowTime);
};
Storyboard.Instance.UpdateInternal = function (clockData) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren().GetValueAt(i).Update(clockData.RealTicks);
    }
};
Storyboard.Instance.OnDurationReached = function () {
    App.Instance.UnregisterStoryboard(this);
    this.OnDurationReached$Timeline();
};
Nullstone.FinishCreate(Storyboard);
var StoryboardCollection = Nullstone.Create("StoryboardCollection", Collection);
StoryboardCollection.Instance.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};
Nullstone.FinishCreate(StoryboardCollection);

var BitmapImage = Nullstone.Create("BitmapImage", BitmapSource, 1);
BitmapImage.Instance.Init = function (uri) {
    this.Init$BitmapSource();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
    if (uri == null)
        return;
    this.SetUriSource(uri);
};
BitmapImage.UriSourceProperty = DependencyProperty.RegisterFull("UriSource", function () { return Uri; }, BitmapImage, new Uri(), null, null, true);
BitmapImage.Instance.GetUriSource = function () {
    return this.$GetValue(BitmapImage.UriSourceProperty);
};
BitmapImage.Instance.SetUriSource = function (value) {
    this.$SetValue(BitmapImage.UriSourceProperty, value);
};
BitmapImage.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== BitmapImage) {
        this._OnPropertyChanged$BitmapSource(args, error);
        return;
    }
    if (args.Property._ID === BitmapImage.UriSourceProperty._ID) {
        var uri = args.NewValue;
        if (Uri.IsNullOrEmpty(uri)) {
            this.ResetImage();
        } else {
            this.UriSourceChanged(args.OldValue, uri);
        }
    }
    this.PropertyChanged.Raise(this, args);
};
BitmapImage.Instance._OnErrored = function (e) {
    this._OnErrored$BitmapSource(e);
    this.ImageFailed.Raise(this, new EventArgs());
};
BitmapImage.Instance._OnLoad = function (e) {
    this._OnLoad$BitmapSource(e);
    this.ImageOpened.Raise(this, new EventArgs());
};
Nullstone.FinishCreate(BitmapImage);

var Shape = Nullstone.Create("Shape", FrameworkElement);
Shape.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._ShapeFlags = 0;
    this._StretchTransform = new Matrix();
    this._NaturalBounds = new Rect();
};
Shape.FillProperty = DependencyProperty.Register("Fill", function () { return Brush; }, Shape);
Shape.Instance.GetFill = function () {
    return this.$GetValue(Shape.FillProperty);
};
Shape.Instance.SetFill = function (value) {
    this.$SetValue(Shape.FillProperty, value);
};
Shape.StretchProperty = DependencyProperty.Register("Stretch", function () { return new Enum(Stretch); }, Shape, Stretch.None);
Shape.Instance.GetStretch = function () {
    return this.$GetValue(Shape.StretchProperty);
};
Shape.Instance.SetStretch = function (value) {
    this.$SetValue(Shape.StretchProperty, value);
};
Shape.StrokeProperty = DependencyProperty.Register("Stroke", function () { return Brush; }, Shape);
Shape.Instance.GetStroke = function () {
    return this.$GetValue(Shape.StrokeProperty);
};
Shape.Instance.SetStroke = function (value) {
    this.$SetValue(Shape.StrokeProperty, value);
};
Shape.StrokeThicknessProperty = DependencyProperty.Register("StrokeThickness", function () { return Number; }, Shape, 1.0);
Shape.Instance.GetStrokeThickness = function () {
    return this.$GetValue(Shape.StrokeThicknessProperty);
};
Shape.Instance.SetStrokeThickness = function (value) {
    this.$SetValue(Shape.StrokeThicknessProperty, value);
};
Shape.StrokeDashArrayProperty = DependencyProperty.Register("StrokeDashArray", function () { return DoubleCollection; }, Shape);
Shape.Instance.GetStrokeDashArray = function () {
    return this.$GetValue(Shape.StrokeDashArrayProperty);
};
Shape.Instance.SetStrokeDashArray = function (value) {
    this.$SetValue(Shape.StrokeDashArrayProperty, value);
};
Shape.StrokeDashCapProperty = DependencyProperty.Register("StrokeDashCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeDashCap = function () {
    return this.$GetValue(Shape.StrokeDashCapProperty);
};
Shape.Instance.SetStrokeDashCap = function (value) {
    this.$SetValue(Shape.StrokeDashCapProperty, value);
};
Shape.StrokeDashOffsetProperty = DependencyProperty.Register("StrokeDashOffset", function () { return Number; }, Shape, 0.0);
Shape.Instance.GetStrokeDashOffset = function () {
    return this.$GetValue(Shape.StrokeDashOffsetProperty);
};
Shape.Instance.SetStrokeDashOffset = function (value) {
    this.$SetValue(Shape.StrokeDashOffsetProperty, value);
};
Shape.StrokeEndLineCapProperty = DependencyProperty.Register("StrokeEndLineCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeEndLineCap = function () {
    return this.$GetValue(Shape.StrokeEndLineCapProperty);
};
Shape.Instance.SetStrokeEndLineCap = function (value) {
    this.$SetValue(Shape.StrokeEndLineCapProperty, value);
};
Shape.StrokeLineJoinProperty = DependencyProperty.Register("StrokeLineJoin", function () { return new Enum(PenLineJoin); }, Shape, PenLineJoin.Miter);
Shape.Instance.GetStrokeLineJoin = function () {
    return this.$GetValue(Shape.StrokeLineJoinProperty);
};
Shape.Instance.SetStrokeLineJoin = function (value) {
    this.$SetValue(Shape.StrokeLineJoinProperty, value);
};
Shape.StrokeMiterLimitProperty = DependencyProperty.Register("StrokeMiterLimit", function () { return Number; }, Shape, 10.0);
Shape.Instance.GetStrokeMiterLimit = function () {
    return this.$GetValue(Shape.StrokeMiterLimitProperty);
};
Shape.Instance.SetStrokeMiterLimit = function (value) {
    this.$SetValue(Shape.StrokeMiterLimitProperty, value);
};
Shape.StrokeStartLineCapProperty = DependencyProperty.Register("StrokeStartLineCap", function () { return new Enum(PenLineCap); }, Shape, PenLineCap.Flat);
Shape.Instance.GetStrokeStartLineCap = function () {
    return this.$GetValue(Shape.StrokeStartLineCapProperty);
};
Shape.Instance.SetStrokeStartLineCap = function (value) {
    this.$SetValue(Shape.StrokeStartLineCapProperty, value);
};
Shape.Instance._IsEmpty = function () { return this._ShapeFlags & ShapeFlags.Empty; };
Shape.Instance._IsNormal = function () { return this._ShapeFlags & ShapeFlags.Normal; };
Shape.Instance._IsDegenerate = function () { return this._ShapeFlags & ShapeFlags.Degenerate; };
Shape.Instance._HasRadii = function () { return this._ShapeFlags & ShapeFlags.Radii; };
Shape.Instance._SetShapeFlags = function (sf) { this._ShapeFlags = sf; };
Shape.Instance._AddShapeFlags = function (sf) { this._ShapeFlags |= sf; };
Shape.Instance._IsStroked = function () { return this._Stroke != null; };
Shape.Instance._IsFilled = function () { return this._Fill != null; };
Shape.Instance._CanFill = function () { return false; };
Shape.Instance._CanFindElement = function () { return this._IsFilled() || this._IsStroked(); };
Shape.Instance._GetFillRule = function () {
    return FillRule.Nonzero;
};
Shape.Instance._ShiftPosition = function (point) {
    var dx = this._Bounds.X - point.X;
    var dy = this._Bounds.Y - point.Y;
    this._ShiftPosition$FrameworkElement(point);
};
Shape.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = availableSize;
    var shapeBounds = this._GetNaturalBounds();
    var sx = 0.0;
    var sy = 0.0;
    if (this instanceof Rectangle || this instanceof Ellipse) {
        desired = new Size(0, 0);
    }
    var stretch = this.GetStretch();
    if (stretch === Stretch.None)
        return new Size(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height);
    if (!isFinite(availableSize.Width))
        desired.Width = shapeBounds.Width;
    if (!isFinite(availableSize.Height))
        desired.Height = shapeBounds.Height;
    if (shapeBounds.Width > 0)
        sx = desired.Width / shapeBounds.Width;
    if (shapeBounds.Height > 0)
        sy = desired.Height / shapeBounds.Height;
    if (!isFinite(availableSize.Width))
        sx = sy;
    if (!isFinite(availableSize.Height))
        sy = sx;
    switch (stretch) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.Fill:
            if (!isFinite(availableSize.Width))
                sx = 1.0;
            if (!isFinite(availableSize.Height))
                sy = 1.0;
            break;
        default:
            break;
    }
    desired = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
    return desired;
};
Shape.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;
    var sx = 1.0;
    var sy = 1.0;
    var shapeBounds = this._GetNaturalBounds();
    this._InvalidateStretch();
    var stretch = this.GetStretch();
    if (stretch === Stretch.None)
        return arranged.Max(new Size(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height));
    if (shapeBounds.Width === 0)
        shapeBounds.Width = arranged.Width;
    if (shapeBounds.Height === 0)
        shapeBounds.Height = arranged.Height;
    if (shapeBounds.Width !== arranged.Width)
        sx = arranged.Width / shapeBounds.Width;
    if (shapeBounds.Height !== arranged.Height)
        sy = arranged.Height / shapeBounds.Height;
    switch (stretch) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        default:
            break;
    }
    arranged = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
    return arranged;
};
Shape.Instance._InvalidateNaturalBounds = function () {
    this._NaturalBounds = new Rect();
    this._InvalidateStretch();
};
Shape.Instance._InvalidateStretch = function () {
    this._ExtentsWithChildren = this._Extents = new Rect();
    this._StretchTransform = new Matrix();
    this._InvalidatePathCache();
};
Shape.Instance._InvalidatePathCache = function (free) {
    this._Path = null;
    if (!free) {
        this._UpdateBounds(true);
    }
    this._InvalidateSurfaceCache();
};
Shape.Instance._InvalidateSurfaceCache = function () {
};
Shape.Instance._InvalidateStrokeBounds = function () {
    this._InvalidateFillBounds();
};
Shape.Instance._InvalidateFillBounds = function () {
    this._InvalidateNaturalBounds();
};
Shape.Instance._CacheInvalidateHint = function () {
    this._InvalidatePathCache();
};
Shape.Instance._GetStretchExtents = function () {
    if (this._Extents.IsEmpty()) {
        this._ExtentsWithChildren = this._Extents = this._ComputeStretchBounds();
    }
    return this._Extents;
};
Shape.Instance._ComputeActualSize = function () {
    var desired = this._ComputeActualSize$FrameworkElement();
    var shapeBounds = this._GetNaturalBounds();
    var sx = 1.0;
    var sy = 1.0;
    var parent = this.GetVisualParent();
    if (parent != null && !(parent instanceof Canvas)) {
        if (LayoutInformation.GetPreviousConstraint(this) != null || this.ReadLocalValue(LayoutInformation.LayoutSlotProperty)) {
            return desired;
        }
    }
    if (!this._IsAttached)
        return desired;
    if (shapeBounds.Width <= 0 && shapeBounds.Height <= 0)
        return desired;
    var stretch = this.GetStretch();
    if (stretch === Stretch.None && shapeBounds.Width > 0 && shapeBounds.Height > 0)
        return new Size(shapeBounds.Width, shapeBounds.Height);
    if (!isFinite(desired.Width))
        desired.Width = shapeBounds.Width;
    if (!isFinite(desired.Height))
        desired.Height = shapeBounds.Height;
    if (shapeBounds.Width > 0)
        sx = desired.Width / shapeBounds.Width;
    if (shapeBounds.Height > 0)
        sy = desired.Height / shapeBounds.Height;
    switch (stretch) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        default:
            break;
    }
    desired = desired.Min(shapeBounds.Width * sx, shapeBounds.Height * sy);
    return desired;
};
Shape.Instance._GetSizeForBrush = function (ctx) {
    var se = this._GetStretchExtents();
    return new Size(se.Width, se.Height);
};
Shape.Instance._GetNaturalBounds = function () {
    if (this._NaturalBounds.IsEmpty())
        this._NaturalBounds = this._ComputeShapeBoundsImpl(false, null);
    return this._NaturalBounds;
};
Shape.Instance._TransformBounds = function () {
};
Shape.Instance._ComputeBounds = function () {
    this._BoundsWithChildren = this._Bounds = this._IntersectBoundsWithClipPath(this._GetStretchExtents()/*.GrowBy(this._EffectPadding)*/, false); //.Transform(this._AbsoluteXform);
    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Shape.Instance._ComputeStretchBounds = function () {
    var autoDim = isNaN(this.GetWidth());
    var stretch = this.GetStretch();
    var shapeBounds = this._GetNaturalBounds();
    if (shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    var specified = new Size(this.GetWidth(), this.GetHeight());
    if (specified.Width <= 0.0 || specified.Height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    var visualParent = this.GetVisualParent();
    if (visualParent != null && visualParent instanceof Canvas) {
        framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
        framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
        if (!isNaN(specified.Width))
            framework.Width = specified.Width;
        if (!isNaN(specified.Height))
            framework.Height = specified.Height;
    } else if (!LayoutInformation.GetPreviousConstraint(this)) {
        framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
        framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
    }
    if (stretch === Stretch.None) {
        shapeBounds = shapeBounds.Transform(this._StretchTransform);
        return shapeBounds;
    }
    if (framework.Width === 0.0 || framework.Height === 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    var logicalBounds = this._ComputeShapeBoundsImpl(true, null);
    var adjX = logicalBounds.Width !== 0.0;
    var adjY = logicalBounds.Height !== 0.0;
    var diffX = shapeBounds.Width - logicalBounds.Width;
    var diffY = shapeBounds.Height - logicalBounds.Height;
    var sw = adjX ? (framework.Width - diffX) / logicalBounds.Width : 1.0;
    var sh = adjY ? (framework.Height - diffY) / logicalBounds.Height : 1.0;
    var center = false;
    switch (stretch) {
        case Stretch.Fill:
            center = true;
            break;
        case Stretch.Uniform:
            sw = sh = (sw < sh) ? sw : sh;
            center = true;
            break;
        case Stretch.UniformToFill:
            sw = sh = (sw > sh) ? sw : sh;
            break;
    }
    if ((adjX && Shape.IsSignificant(sw - 1, shapeBounds.Width)) || (adjY && Shape.IsSignificant(sh - 1, shapeBounds.Height))) {
        var temp = new Matrix();
        temp = Matrix.Scale(temp, adjX ? sw : 1.0, adjY ? sh : 1.0);
        var stretchBounds = this._ComputeShapeBoundsImpl(false, temp);
        if (stretchBounds.Width !== shapeBounds.Width && stretchBounds.Height !== shapeBounds.Height) {
            sw *= adjX ? (framework.Width - stretchBounds.Width + logicalBounds.Width * sw) / (logicalBounds.Width * sw) : 1.0;
            sh *= adjY ? (framework.Height - stretchBounds.Height + logicalBounds.Height * sh) / (logicalBounds.Height * sh) : 1.0;
            switch (stretch) {
                case Stretch.Uniform:
                    sw = sh = (sw < sh) ? sw : sh;
                    break;
                case Stretch.UniformToFill:
                    sw = sh = (sw > sh) ? sw : sh;
                    break;
            }
        }
    }
    var x = (!autoDim || adjX) ? shapeBounds.X : 0;
    var y = (!autoDim || adjY) ? shapeBounds.Y : 0;
    var st = this._StretchTransform;
    if (!(this instanceof Line) || !autoDim)
        st = Matrix.Translate(st, -x, -y);
    st = Matrix.Translate(st,
        adjX ? -shapeBounds.Width * 0.5 : 0.0,
        adjY ? -shapeBounds.Height * 0.5 : 0.0);
    st = Matrix.Scale(st,
        adjX ? sw : 1.0,
        adjY ? sh : 1.0);
    if (center) {
        st = Matrix.Translate(st,
            adjX ? framework.Width * 0.5 : 0,
            adjY ? framework.Height * 0.5 : 0);
    } else {
        st = Matrix.Translate(st,
            adjX ? (logicalBounds.Width * sw + diffX) * 0.5 : 0,
            adjY ? (logicalBounds.Height * sh + diffY) * 0.5 : 0);
    }
    this._StretchTransform = st;
    shapeBounds = shapeBounds.Transform(this._StretchTransform);
    return shapeBounds;
};
Shape.IsSignificant = function (dx, x) {
    return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
};
Shape.Instance._ComputeShapeBounds = function (logical) {
    this._ComputeShapeBoundsImpl(logical, null);
};
Shape.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    var thickness = (logical || !this._IsStroked()) ? 0.0 : this.GetStrokeThickness();
    if (this._Path == null)
        this._BuildPath();
    if (this._IsEmpty())
        return new Rect();
    if (logical) {
    } else if (thickness > 0) {
    } else {
    }
    NotImplemented("Shape._ComputeShapeBoundsImpl");
};
Shape.Instance._InsideObject = function (ctx, x, y) {
    if (!this._InsideLayoutClip(x, y))
        return false;
    if (!this._InsideClip(ctx, x, y))
        return false;
    var p = new Point(x, y);
    this._TransformPoint(p);
    x = p.X;
    y = p.Y;
    if (!this._GetStretchExtents().ContainsPointXY(x, y))
        return false;
    return this._InsideShape(ctx, x, y);
};
Shape.Instance._InsideShape = function (ctx, x, y) {
    if (this._IsEmpty())
        return false;
    var ret = false;
    var area = this._GetStretchExtents();
    ctx.Save();
    ctx.PreTransform(this._StretchTransform);
    if (this._Fill != null) {
        this._DrawPath(ctx);
        if (ctx.IsPointInPath(new Point(x, y)))
            ret = true;
    }
    if (!ret && this._Stroke != null) {
        NotImplemented("Shape._InsideShape-Stroke");
    }
    ctx.Restore();
    return ret;
};
Shape.Instance._Render = function (ctx, region) {
    if (this._IsEmpty())
        return;
    var area = this._GetStretchExtents();
    ctx.Save();
    ctx.PreTransform(this._StretchTransform);
    this._DrawPath(ctx);
    if (this._Fill != null)
        ctx.Fill(this._Fill, area);
    if (this._Stroke != null)
        ctx.Stroke(this._Stroke, this.GetStrokeThickness(), area);
    ctx.Restore();
};
Shape.Instance._BuildPath = function () { };
Shape.Instance._DrawPath = function (ctx) {
    this._Path.Draw(ctx);
};
Shape.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Shape) {
        if (args.Property._ID === FrameworkElement.HeightProperty || args.Property._ID === FrameworkElement.WidthProperty)
            this._InvalidateStretch();
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property._ID === Shape.StretchProperty._ID) {
        this._InvalidateMeasure();
        this._InvalidateStretch();
    } else if (args.Property._ID === Shape.StrokeProperty._ID) {
        var newStroke = Nullstone.As(args.NewValue, Brush);
        if (this._Stroke == null || newStroke == null) {
            this._InvalidateStrokeBounds();
        } else {
            this._InvalidateSurfaceCache();
        }
        this._Stroke = newStroke;
    } else if (args.Property._ID === Shape.FillProperty._ID) {
        var newFill = Nullstone.As(args.NewValue, Brush);
        if (this._Fill == null || newFill == null) {
            this._InvalidateFillBounds();
        } else {
            this._InvalidateSurfaceCache();
        }
        this._Fill = newFill;
    } else if (args.Property._ID === Shape.StrokeThicknessProperty._ID) {
        this._InvalidateStrokeBounds();
    } else if (args.Property._ID === Shape.StrokeDashCapProperty._ID
        || args.Property._ID === Shape.StrokeDashArrayProperty._ID
        || args.Property._ID === Shape.StrokeEndLineProperty._ID
        || args.Property._ID === Shape.StrokeLineJoinProperty._ID
        || args.Property._ID === Shape.StrokeMiterLimitProperty._ID
        || args.Property._ID === Shape.StrokeStartLineCapProperty._ID) {
        this._InvalidateStrokeBounds();
    }
    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Shape.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === Shape.FillProperty._ID || propd._ID === Shape.StrokeProperty._ID)) {
        this._Invalidate();
        this._InvalidateSurfaceCache();
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
Nullstone.FinishCreate(Shape);

var Border = Nullstone.Create("Border", FrameworkElement);
Border.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () { return Brush; }, Border);
Border.Instance.GetBackground = function () {
    return this.$GetValue(Border.BackgroundProperty);
};
Border.Instance.SetBackground = function (value) {
    this.$SetValue(Border.BackgroundProperty, value);
};
Border.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () { return Brush; }, Border);
Border.Instance.GetBorderBrush = function () {
    return this.$GetValue(Border.BorderBrushProperty);
};
Border.Instance.SetBorderBrush = function (value) {
    this.$SetValue(Border.BorderBrushProperty, value);
};
Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.Instance.GetBorderThickness = function () {
    return this.$GetValue(Border.BorderThicknessProperty);
};
Border.Instance.SetBorderThickness = function (value) {
    this.$SetValue(Border.BorderThicknessProperty, value);
};
Border.ChildProperty = DependencyProperty.RegisterCore("Child", function () { return UIElement; }, Border);
Border.Instance.GetChild = function () {
    return this.$GetValue(Border.ChildProperty);
};
Border.Instance.SetChild = function (value) {
    this.$SetValue(Border.ChildProperty, value);
};
Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () { return CornerRadius; }, Border, new CornerRadius(0), null, null, null, Border._CornerRadiusValidator);
Border.Instance.GetCornerRadius = function () {
    return this.$GetValue(Border.CornerRadiusProperty);
};
Border.Instance.SetCornerRadius = function (value) {
    this.$SetValue(Border.CornerRadiusProperty, value);
};
Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.Instance.GetPadding = function () {
    return this.$GetValue(Border.PaddingProperty);
};
Border.Instance.SetPadding = function (value) {
    this.$SetValue(Border.PaddingProperty, value);
};
Border.Instance.IsLayoutContainer = function () { return true; };
Border.Instance._MeasureOverrideWithError = function (availableSize, error) {
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
Border.Instance._ArrangeOverrideWithError = function (finalSize, error) {
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
Border.Instance._Render = function (ctx, region) {
    var borderBrush = this.GetBorderBrush();
    var paintBorder = this._Extents;
    if (!this.GetBackground() && !borderBrush)
        return;
    if (paintBorder.IsEmpty())
        return;
    if (borderBrush || !this.GetCornerRadius().IsZero()) {
        this._RenderImpl(ctx, region);
        return;
    }
    if (!this._HasLayoutClip() && false /* TODO: IsIntegerTranslation  */) {
    } else {
        this._RenderImpl(ctx, region);
    }
};
Border.Instance._RenderImpl = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    ctx.CustomRender(Border._Painter, this.GetBackground(), this.GetBorderBrush(), this._Extents, this.GetBorderThickness(), this.GetCornerRadius());
    ctx.Restore();
};
Border.Instance._CanFindElement = function () {
    return this.GetBackground() != null || this.GetBorderBrush() != null;
};
Border.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Border) {
        this._OnPropertyChanged$FrameworkElement(args, error)
        return;
    }
    if (args.Property._ID === Border.ChildProperty._ID) {
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
    } else if (args.Property._ID === Border.PaddingProperty._ID || args.Property._ID === Border.BorderThicknessProperty._ID) {
        this._InvalidateMeasure();
    } else if (args.Property._ID === Border.BackgroundProperty._ID) {
        this._Invalidate();
    } else if (args.Property._ID === Border.BorderBrushProperty._ID) {
        this._Invalidate();
    }
    this.PropertyChanged.Raise(this, args);
};
Border.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === Border.BackgroundProperty._ID || propd._ID === Border.BorderBrushProperty._ID))
        this._Invalidate();
    else
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
};
Border.Annotations = {
    ContentProperty: Border.ChildProperty
};
Border._Painter = function (args) {
    var canvasCtx = args[0];
    var backgroundBrush = args[1];
    var borderBrush = args[2];
    var boundingRect = args[3];
    var thickness = args[4];
    var cornerRadius = args[5];
    var pathOnly = args[6];
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
        canvasCtx.lineTo(right - cornerRadius.TopRight, top);
        if (cornerRadius.TopRight > 0)
            canvasCtx.quadraticCurveTo(right, top, right, top + cornerRadius.TopRight);
        canvasCtx.lineTo(right, bottom - cornerRadius.BottomRight);
        if (cornerRadius.BottomRight > 0)
            canvasCtx.quadraticCurveTo(right, bottom, right - cornerRadius.BottomRight, bottom);
        canvasCtx.lineTo(left + cornerRadius.BottomLeft, bottom);
        if (cornerRadius.BottomLeft > 0)
            canvasCtx.quadraticCurveTo(left, bottom, left, bottom - cornerRadius.BottomLeft);
        canvasCtx.lineTo(left, top + cornerRadius.TopLeft);
        if (cornerRadius.TopLeft > 0)
            canvasCtx.quadraticCurveTo(left, top, left + cornerRadius.TopLeft, top);
    }
    if (backgroundBrush) {
        backgroundBrush.SetupBrush(canvasCtx, pathRect);
        canvasCtx.fillStyle = backgroundBrush.ToHtml5Object();
        canvasCtx.fill();
    }
    if (borderBrush && !thickness.IsEmpty()) {
        canvasCtx.lineWidth = thickness;
        borderBrush.SetupBrush(canvasCtx, pathRect);
        canvasCtx.strokeStyle = borderBrush.ToHtml5Object();
        canvasCtx.stroke();
    }
    canvasCtx.closePath();
};
Border._ThicknessValidator = function () {
};
Nullstone.FinishCreate(Border);

var ContentPresenter = Nullstone.Create("ContentPresenter", FrameworkElement);
ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, ContentPresenter);
ContentPresenter.Instance.GetContent = function () {
    return this.$GetValue(ContentPresenter.ContentProperty);
};
ContentPresenter.Instance.SetContent = function (value) {
    this.$SetValue(ContentPresenter.ContentProperty, value);
};
ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentPresenter);
ContentPresenter.Instance.GetContentTemplate = function () {
    return this.$GetValue(ContentPresenter.ContentTemplateProperty);
};
ContentPresenter.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentPresenter.ContentTemplateProperty, value);
};
ContentPresenter.Instance.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentPresenter.Instance._GetDefaultTemplate = function () {
    var templateOwner = this.GetTemplateOwner();
    if (templateOwner) {
        if (this.ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
            this.$SetValue(ContentPresenter.ContentProperty,
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this.ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
            this.$SetValue(ContentPresenter.ContentTemplateProperty,
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
        }
    }
    var template = this.GetContentTemplate();
    if (template != null) {
        this._ContentRoot = Nullstone.As(template.GetVisualTree(this), UIElement);
    } else {
        var content = this.GetContent();
        this._ContentRoot = Nullstone.As(content, UIElement);
        if (this._ContentRoot == null && content != null)
            this._ContentRoot = this.GetFallbackRoot();
    }
    return this._ContentRoot;
};
ContentPresenter.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentPresenter) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property._ID === ContentPresenter.ContentProperty._ID) {
        if ((args.NewValue && args.NewValue instanceof UIElement)
            || (args.OldValue && args.OldValue instanceof UIElement)) {
            this._ClearRoot();
        }
        if (args.NewValue && !(args.NewValue instanceof UIElement))
            this.$SetValue(FrameworkElement.DataContextProperty, args.NewValue);
        else
            this.ClearValue(FrameworkElement.DataContextProperty);
        this._InvalidateMeasure();
    } else if (args.Property._ID === ContentPresenter.ContentTemplateProperty._ID) {
        this._ClearRoot();
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};
ContentPresenter.Instance._ClearRoot = function () {
    if (this._ContentRoot != null)
        this._ElementRemoved(this._ContentRoot);
    this._ContentRoot = null;
};
ContentPresenter.Instance.InvokeLoaded = function () {
    if (this.GetContent() instanceof UIElement)
        this.ClearValue(FrameworkElement.DataContextProperty);
    else
        this.SetDataContext(this.GetContent());
    this.InvokeLoaded$FrameworkElement();
};
ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};
Nullstone.FinishCreate(ContentPresenter);

var Control = Nullstone.Create("Control", FrameworkElement);
Control.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
};
Control.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Control);
Control.Instance.GetBackground = function () {
    return this.$GetValue(Control.BackgroundProperty);
};
Control.Instance.SetBackground = function (value) {
    this.$SetValue(Control.BackgroundProperty, value);
};
Control.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Control);
Control.Instance.GetBorderBrush = function () {
    return this.$GetValue(Control.BorderBrushProperty);
};
Control.Instance.SetBorderBrush = function (value) {
    this.$SetValue(Control.BorderBrushProperty, value);
};
Control.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, Control, new Thickness());
Control.Instance.GetBorderThickness = function () {
    return this.$GetValue(Control.BorderThicknessProperty);
};
Control.Instance.SetBorderThickness = function (value) {
    this.$SetValue(Control.BorderThicknessProperty, value);
};
Control.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, Control, Font.DEFAULT_FAMILY);
Control.Instance.GetFontFamily = function () {
    return this.$GetValue(Control.FontFamilyProperty);
};
Control.Instance.SetFontFamily = function (value) {
    this.$SetValue(Control.FontFamilyProperty, value);
};
Control.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, Control, Font.DEFAULT_SIZE);
Control.Instance.GetFontSize = function () {
    return this.$GetValue(Control.FontSizeProperty);
};
Control.Instance.SetFontSize = function (value) {
    this.$SetValue(Control.FontSizeProperty, value);
};
Control.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, Control, Font.DEFAULT_STRETCH);
Control.Instance.GetFontStretch = function () {
    return this.$GetValue(Control.FontStretchProperty);
};
Control.Instance.SetFontStretch = function (value) {
    this.$SetValue(Control.FontStretchProperty, value);
};
Control.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, Control, Font.DEFAULT_STYLE);
Control.Instance.GetFontStyle = function () {
    return this.$GetValue(Control.FontStyleProperty);
};
Control.Instance.SetFontStyle = function (value) {
    this.$SetValue(Control.FontStyleProperty, value);
};
Control.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, Control, Font.DEFAULT_WEIGHT);
Control.Instance.GetFontWeight = function () {
    return this.$GetValue(Control.FontWeightProperty);
};
Control.Instance.SetFontWeight = function (value) {
    this.$SetValue(Control.FontWeightProperty, value);
};
Control.ForegroundProperty = DependencyProperty.Register("Foreground", function () { return Brush; }, Control);
Control.Instance.GetForeground = function () {
    return this.$GetValue(Control.ForegroundProperty);
};
Control.Instance.SetForeground = function (value) {
    this.$SetValue(Control.ForegroundProperty, value);
};
Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", function () { return new Enum(HorizontalAlignment); }, Control, HorizontalAlignment.Center);
Control.Instance.GetHorizontalContentAlignment = function () {
    return this.$GetValue(Control.HorizontalContentAlignmentProperty);
};
Control.Instance.SetHorizontalContentAlignment = function (value) {
    this.$SetValue(Control.HorizontalContentAlignmentProperty, value);
};
Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", function () { return Boolean; }, Control, true, function (d, args, error) { d.OnIsEnabledChanged(args); });
Control.Instance.GetIsEnabled = function () {
    return this.$GetValue(Control.IsEnabledProperty);
};
Control.Instance.SetIsEnabled = function (value) {
    this.$SetValue(Control.IsEnabledProperty, value);
};
Control.IsTabStopProperty = DependencyProperty.Register("IsTabStop", function () { return Boolean; }, Control, true);
Control.Instance.GetIsTabStop = function () {
    return this.$GetValue(Control.IsTabStopProperty);
};
Control.Instance.SetIsTabStop = function (value) {
    this.$SetValue(Control.IsTabStopProperty, value);
};
Control.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, Control, new Thickness());
Control.Instance.GetPadding = function () {
    return this.$GetValue(Control.PaddingProperty);
};
Control.Instance.SetPadding = function (value) {
    this.$SetValue(Control.PaddingProperty, value);
};
Control.TabIndexProperty = DependencyProperty.Register("TabIndex", function () { return Number; }, Control, Number.MAX_VALUE);
Control.Instance.GetTabIndex = function () {
    return this.$GetValue(Control.TabIndexProperty);
};
Control.Instance.SetTabIndex = function (value) {
    this.$SetValue(Control.TabIndexProperty, value);
};
Control.TabNavigationProperty = DependencyProperty.Register("TabNavigation", function () { return Number; }, Control);
Control.Instance.GetTabNavigation = function () {
    return this.$GetValue(Control.TabNavigationProperty);
};
Control.Instance.SetTabNavigation = function (value) {
    this.$SetValue(Control.TabNavigationProperty, value);
};
Control.TemplateProperty = DependencyProperty.Register("Template", function () { return ControlTemplate; }, Control);
Control.Instance.GetTemplate = function () {
    return this.$GetValue(Control.TemplateProperty);
};
Control.Instance.SetTemplate = function (value) {
    this.$SetValue(Control.TemplateProperty, value);
};
Control.VerticalContentAlignmentProperty = DependencyProperty.Register("VerticalContentAlignment", function () { return new Enum(VerticalAlignment); }, Control, VerticalAlignment.Center);
Control.Instance.GetVerticalContentAlignment = function () {
    return this.$GetValue(Control.VerticalContentAlignmentProperty);
};
Control.Instance.SetVerticalContentAlignment = function (value) {
    this.$SetValue(Control.VerticalContentAlignmentProperty, value);
};
Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () { return Function; }, Control);
Control.Instance.GetDefaultStyleKey = function () {
    return this.$GetValue(Control.DefaultStyleKeyProperty);
};
Control.Instance.SetDefaultStyleKey = function (value) {
    this.$SetValue(Control.DefaultStyleKeyProperty, value);
};
Control.IsTemplateItemProperty = DependencyProperty.RegisterAttached("IsTemplateItem", function () { return Boolean; }, Control, false);
Control.GetIsTemplateItem = function (d) {
    return d.$GetValue(Control.IsTemplateItemProperty);
};
Control.SetIsTemplateItem = function (d, value) {
    d.$SetValue(Control.IsTemplateItemProperty, value);
};
Control.Instance.GetIsFocused = function () {
    return this._IsFocused;
};
Control.Instance.GetDefaultStyle = function () {
    return null;
};
Control.Instance.GetTemplateChild = function (name) {
    if (this._TemplateRoot)
        return this._TemplateRoot.FindName(name);
    return null;
};
Control.Instance.SetVisualParent = function (visualParent) {
    if (this.GetVisualParent() != visualParent) {
        this.SetVisualParent$FrameworkElement(visualParent);
        this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
    }
};
Control.Instance._ElementAdded = function (item) {
    var error = new BError();
    item._AddParent(this, true, error);
    this._SetSubtreeObject(item);
    this._ElementAdded$FrameworkElement(item);
};
Control.Instance._ElementRemoved = function (item) {
    var error;
    if (this._TemplateRoot) {
        this._TemplateRoot._RemoveParent(this, error);
        this._TemplateRoot = null;
    }
    item._RemoveParent(this, error);
    this._ElementRemoved$FrameworkElement(item);
};
Control.Instance.IsLayoutContainer = function () {
    return true;
};
Control.Instance.CanCaptureMouse = function () {
    return this.GetIsEnabled();
};
Control.Instance._CanFindElement = function () {
    return this.GetIsEnabled();
};
Control.Instance._InsideObject = function (x, y) {
    return false;
};
Control.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (this.GetIsEnabled())
        this._HitTestPoint$FrameworkElement(ctx, p, uielist);
};
Control.Instance._UpdateIsEnabledSource = function (control) {
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(control);
};
Control.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Control) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property._ID === Control.TemplateProperty._ID) {
    } else if (args.Property._ID === Control.PaddingProperty._ID
        || args.Property._ID === Control.BorderThicknessProperty._ID) {
        this._InvalidateMeasure();
    } else if (args.Property._ID === Control.IsEnabledProperty._ID) {
        if (!args.NewValue) {
        }
    } else if (args.Property._ID === Control.HorizontalContentAlignmentProperty._ID
        || args.Property._ID === Control.VerticalContentAlignmentProperty._ID) {
        this._InvalidateArrange();
    }
    this.PropertyChanged.Raise(this, args);
};
Control.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
    this._OnLogicalParentChanged$FrameworkElement(oldParent, newParent);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(newParent);
};
Control.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$FrameworkElement(value);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
};
Control.Instance._DoApplyTemplateWithError = function (error) {
    var t = this.GetTemplate();
    if (!t)
        return this._DoApplyTemplateWithError$FrameworkElement(error);
    var root = t._GetVisualTreeWithError(this, error);
    if (root && !(root instanceof UIElement)) {
        Warn("Root element in template was not a UIElement.");
        root = null;
    }
    if (!root)
        return this._DoApplyTemplateWithError$FrameworkElement(error);
    if (this._TemplateRoot != root && this._TemplateRoot != null) {
        this._TemplateRoot._RemoveParent(this, null);
        this._TemplateRoot = null;
    }
    this._TemplateRoot = root;
    this._ElementAdded(this._TemplateRoot);
    if (this._IsLoaded) {
    }
    return true;
};
Control.Instance.OnMouseLeftButtonDown = function (sender, args) { };
Control.Instance._GoToState = function (useTransitions, stateName) {
    return VisualStateManager.GoToState(this, stateName, useTransitions);
};
Control.Instance.Focus = function (recurse) {
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
        var c = Nullstone.As(uie, Control);
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
Control.Instance.OnGotFocus = function (sender, args) {
    this._IsFocused = true;
    this.OnGotFocus$FrameworkElement(sender, args);
};
Control.Instance.OnLostFocus = function (sender, args) {
    this._IsFocused = false;
    this.OnLostFocus$FrameworkElement(sender, args);
};
Control.Instance.OnIsEnabledChanged = function (args) {
}
Nullstone.FinishCreate(Control);

Fayde.Image = Nullstone.Create("Image", FrameworkElement);
Fayde.Image.Instance.Init = function () {
    this.Init$FrameworkElement();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
};
Fayde.Image.SourceProperty = DependencyProperty.RegisterFull("Source", function () { return ImageSource; }, Fayde.Image, null, { GetValue: function (propd, obj) { return new BitmapImage(); } });
Fayde.Image.Instance.GetSource = function () {
    return this.$GetValue(Fayde.Image.SourceProperty);
};
Fayde.Image.Instance.SetSource = function (value) {
    value = this.SetSource.Converter(value);
    this.$SetValue(Fayde.Image.SourceProperty, value);
};
Fayde.Image.Instance.SetSource.Converter = function (value) {
    if (value instanceof Uri)
        return new BitmapImage(value);
    return value;
};
Fayde.Image.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, Fayde.Image, Stretch.Uniform);
Fayde.Image.Instance.GetStretch = function () {
    return this.$GetValue(Fayde.Image.StretchProperty);
};
Fayde.Image.Instance.SetStretch = function (value) {
    this.$SetValue(Fayde.Image.StretchProperty, value);
};
Fayde.Image.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = availableSize;
    var shapeBounds = new Rect();
    var source = this.GetSource();
    var sx = sy = 0.0;
    if (source != null)
        shapeBounds = new Rect(0, 0, source.GetPixelWidth(), source.GetPixelHeight());
    if (!isFinite(desired.Width))
        desired.Width = shapeBounds.Width;
    if (!isFinite(desired.Height))
        desired.Height = shapeBounds.Height;
    if (shapeBounds.Width > 0)
        sx = desired.Width / shapeBounds.Width;
    if (shapeBounds.Height > 0)
        sy = desired.Height / shapeBounds.Height;
    if (!isFinite(availableSize.Width))
        sx = sy;
    if (!isFinite(availableSize.Height))
        sy = sx;
    switch (this.GetStretch()) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.Fill:
            if (!isFinite(availableSize.Width))
                sx = sy;
            if (!isFinite(availableSize.Height))
                sy = sx;
            break;
        case Stretch.None:
            sx = sy = 1.0;
            break;
    }
    desired = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
    return desired;
};
Fayde.Image.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;
    var shapeBounds = new Rect();
    var source = this.GetSource();
    var sx = 1.0;
    var sy = 1.0;
    if (source != null)
        shapeBounds = new Rect(0, 0, source.GetPixelWidth(), source.GetPixelHeight());
    if (shapeBounds.Width === 0)
        shapeBounds.Width = arranged.Width;
    if (shapeBounds.Height === 0)
        shapeBounds.Height = arguments.Height;
    if (shapeBounds.Width !== arranged.Width)
        sx = arranged.Width / shapeBounds.Width;
    if (shapeBounds.Height !== arranged.Height)
        sy = arranged.Height / shapeBounds.Height;
    switch (this.GetStretch()) {
        case Stretch.Uniform:
            sx = sy = Math.min(sx, sy);
            break;
        case Stretch.UniformToFill:
            sx = sy = Math.max(sx, sy);
            break;
        case Stretch.None:
            sx = sy = 1.0;
            break;
        default:
            break;
    }
    arranged = new Size(shapeBounds.Width * sx, shapeBounds.Height * sy);
    return arranged;
};
Fayde.Image.Instance._CanFindElement = function () { return true; };
Fayde.Image.Instance._InsideObject = function (ctx, x, y) {
    if (!this._InsideObject$FrameworkElement(ctx, x, y))
        return false;
    var source = this.GetSource();
    if (!source)
        return false;
    var stretch = this.GetStretch();
    if (stretch === Stretch.Fill || stretch === Stretch.UniformToFill)
        return true;
    var metrics = this._CalculateRenderMetrics(source);
    if (!metrics)
        return null;
    var rect = new Rect(0, 0, source.GetPixelWidth(), source.GetPixelHeight());
    rect = rect.Transform(metrics.Matrix);
    var np = new Point(x, y);
    this._TransformPoint(np);
    return rect.ContainsPoint(np);
};
Fayde.Image.Instance._Render = function (ctx, region) {
    var source = this.GetSource();
    if (source == null)
        return;
    source.Lock();
    var metrics = this._CalculateRenderMetrics(source);
    if (!metrics) {
        source.Unlock();
        return;
    }
    ctx.Save();
    if (metrics.Overlap !== RectOverlap.In || this._HasLayoutClip())
        this._RenderLayoutClip(ctx);
    ctx.PreTransform(metrics.Matrix);
    ctx.CustomRender(Fayde.Image._ImagePainter, source._Image);
    ctx.Restore();
    source.Unlock();
};
Fayde.Image.Instance._CalculateRenderMetrics = function (source) {
    var stretch = this.GetStretch();
    var specified = new Size(this.GetActualWidth(), this.GetActualHeight());
    var stretched = this._ApplySizeConstraints(specified);
    var adjust = !Rect.Equals(specified, this._GetRenderSize());
    var pixelWidth = source.GetPixelWidth();
    var pixelHeight = source.GetPixelHeight();
    if (pixelWidth === 0 || pixelHeight === 0)
        return null;
    if (stretch !== Stretch.UniformToFill)
        specified = specified.Min(stretched);
    var paint = new Rect(0, 0, specified.Width, specified.Height);
    var image = new Rect(0, 0, pixelWidth, pixelHeight);
    if (stretch === Stretch.None)
        paint = paint.Union(image);
    var matrix = Fayde.Image.ComputeMatrix(paint.Width, paint.Height, image.Width, image.Height,
        stretch, AlignmentX.Center, AlignmentY.Center);
    if (adjust) {
        var error = new BError();
        this._MeasureOverrideWithError(specified, error);
        paint = new Rect((stretched.Width - specified.Width) * 0.5, (stretched.Height - specified.Height) * 0.5, specified.Width, specified.Height);
    }
    var overlap = RectOverlap.In;
    if (stretch === Stretch.UniformToFill || adjust) {
        var bounds = new Rect(paint.RoundOut());
        var box = image.Transform(matrix).RoundIn();
        overlap = bounds.RectIn(box);
    }
    return {
        Matrix: matrix,
        Overlap: overlap
    };
};
Fayde.Image.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === Fayde.Image.SourceProperty._ID)) {
        this._InvalidateMeasure();
        this._Invalidate();
        return;
    }
};
Fayde.Image.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property._ID === Fayde.Image.SourceProperty._ID) {
        var oldBmpSrc = Nullstone.As(args.OldValue, BitmapSource);
        if (oldBmpSrc != null) {
            oldBmpSrc._ErroredCallback = null;
            oldBmpSrc._LoadedCallback = null;
        }
        var newBmpSrc = Nullstone.As(args.NewValue, BitmapSource);
        if (newBmpSrc != null) {
            var i = this;
            newBmpSrc._ErroredCallback = function () { i.ImageFailed.Raise(this, new EventArgs()); };
            newBmpSrc._LoadedCallback = function () { i.ImageOpened.Raise(this, new EventArgs()); };
        } else {
            this._UpdateBounds();
            this._Invalidate();
        }
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};
Fayde.Image.ComputeMatrix = function (width, height, sw, sh, stretch, alignX, alignY) {
    var sx = width / sw;
    var sy = height / sh;
    if (width === 0)
        sx = 1.0;
    if (height === 0)
        sy = 1.0;
    if (stretch === Stretch.Fill) {
        return new Matrix.CreateScale(sx, sy);
    }
    var scale = 1.0;
    var dx = 0.0;
    var dy = 0.0;
    switch (stretch) {
        case Stretch.Uniform:
            scale = sx < sy ? sx : sy;
            break;
        case Stretch.UniformToFill:
            scale = sx < sy ? sy : sx;
            break;
        case Stretch.None:
            break;
    }
    switch (alignX) {
        case AlignmentX.Left:
            dx = 0.0;
            break;
        case AlignmentX.Center:
            dx = (width - (scale * sw)) / 2;
            break;
        case AlignmentX.Right:
        default:
            dx = width - (scale * sw);
            break;
    }
    switch (alignY) {
        case AlignmentY.Top:
            dy = 0.0;
            break;
        case AlignmentY.Center:
            dy = (height - (scale * sh)) / 2;
            break;
        case AlignmentY.Bottom:
        default:
            dy = height - (scale * sh);
            break;
    }
    return new Matrix([scale, 0, dx, 0, scale, dy],
        [1 / scale, 0, -dx, 0, 1 / scale, -dy]);
};
Fayde.Image._ImagePainter = function (args) {
    var ctx = args[0];
    var img = args[1];
    ctx.drawImage(img, 0, 0);
};
Nullstone.FinishCreate(Fayde.Image);

var ItemCollection = {};//TODO: Implement
var ItemsControl = Nullstone.Create("ItemsControl", Control);
ItemsControl.GetItemsOwner = function (ele) {
    var panel = Nullstone.As(ele, Panel);
    if (panel == null || !panel.GetIsItemsHost())
        return null;
    var owner = Nullstone.As(panel.GetTemplateOwner(), ItemsPresenter);
    if (owner != null)
        return Nullstone.As(owner.GetTemplateOwner(), ItemsControl);
    return null;
};
ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl);
ItemsControl.Instance.GetItems = function () {
    return this.$GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.Instance.SetItems = function (value) {
    this.$SetValue(ItemsControl.ItemsProperty, value);
};
ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};
Nullstone.FinishCreate(ItemsControl);

var ItemsPresenter = Nullstone.Create("ItemsPresenter", FrameworkElement);
Nullstone.FinishCreate(ItemsPresenter);

var MediaElement = Nullstone.Create("MediaElement", FrameworkElement);
Nullstone.FinishCreate(MediaElement);

var Panel = Nullstone.Create("Panel", FrameworkElement);
Panel.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Panel);
Panel.Instance.GetBackground = function () {
    return this.$GetValue(Panel.BackgroundProperty);
};
Panel.Instance.SetBackground = function (value) {
    this.$SetValue(Panel.BackgroundProperty, value);
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
Panel.Instance.GetChildren = function () {
    return this.$GetValue(Panel.ChildrenProperty);
};
Panel.Instance.SetChildren = function (value) {
    this.$SetValue(Panel.ChildrenProperty, value);
};
Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", function () { return Boolean; }, Panel, false);
Panel.Instance.GetIsItemsHost = function () {
    return this.$GetValue(Panel.IsItemsHostProperty);
};
Panel.Instance.SetIsItemsHost = function (value) {
    this.$SetValue(Panel.IsItemsHostProperty, value);
};
Panel.Instance.IsLayoutContainer = function () { return true; };
Panel.Instance.IsContainer = function () { return true; };
Panel.Instance._ComputeBounds = function () {
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
Panel.Instance._GetCoverageBounds = function () {
    var background = this.GetBackground();
    if (background && background.IsOpaque())
        return this._Bounds;
    return new Rect();
};
Panel.Instance._ShiftPosition = function (point) {
    var dx = point.X - this._Bounds.X;
    var dy = point.Y - this._Bounds.Y;
    this._ShiftPosition$FrameworkElement(point);
    this._BoundsWithChildren.X += dx;
    this._BoundsWithChildren.Y += dy;
};
Panel.Instance._EmptyBackground = function () {
    return this.GetBackground() == null;
};
Panel.Instance._MeasureOverrideWithError = function (availableSize, error) {
    Info("Panel._MeasureOverrideWithError [" + this._TypeName + "]");
    var result = new Size(0, 0);
    return result;
};
Panel.Instance._Render = function (ctx, region) {
    var background = this.GetBackground();
    if (!background)
        return;
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    framework = this._ApplySizeConstraints(framework);
    if (framework.Width <= 0 || framework.Height <= 0)
        return;
    var area = new Rect(0, 0, framework.Width, framework.Height);
    if (!this._HasLayoutClip() && false/* TODO: IsIntegerTranslation */) {
    } else {
        ctx.Save();
        this._RenderLayoutClip(ctx);
        ctx.FillRect(background, area);
        ctx.Restore();
    }
};
Panel.Instance._CanFindElement = function () { return this.GetBackground() != null; }
Panel.Instance._InsideObject = function (ctx, x, y) {
    if (this.GetBackground())
        return this._InsideObject$FrameworkElement(ctx, x, y);
    return false;
};
Panel.Instance._ElementAdded = function (item) {
    this._ElementAdded$FrameworkElement(item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.Instance._ElementRemoved = function (item) {
    this._ElementRemoved$FrameworkElement(item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Panel) {
        this._OnPropertyChanged$FrameworkElement(args, error);
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
Panel.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && propd._ID === Panel.BackgroundProperty._ID) {
        this._Invalidate();
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
Panel.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        var error = new BError();
        switch (args.Action) {
            case CollectionChangedArgs.Action.Replace:
                if (args.OldValue instanceof FrameworkElement)
                    args.OldValue._SetLogicalParent(null, error);
                this._ElementRemoved(args.OldValue);
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
        this._OnCollectionChanged$FrameworkElement(sender, args);
    }
};
Panel.Instance._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property == Canvas.ZIndexProperty || args.Property == Canvas.ZProperty) {
            args.Item._Invalidate();
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
            return;
        }
    }
    this._OnCollectionItemChanged$FrameworkElement(sender, args);
};
Panel.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$FrameworkElement(value);
    if (value) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.Annotations = {
    ContentProperty: Panel.ChildrenProperty
};
Nullstone.FinishCreate(Panel);

var Popup = Nullstone.Create("Popup", FrameworkElement);
Nullstone.FinishCreate(Popup);

var _RichTextBoxView = Nullstone.Create("_RichTextBoxView", FrameworkElement);
_RichTextBoxView.Instance.Init = function () {
    this.Init$FrameworkElement();
};
Nullstone.FinishCreate(_RichTextBoxView);

var ScrollContentPresenter = Nullstone.Create("ScrollContentPresenter", ContentPresenter, null, [IScrollInfo]);
ScrollContentPresenter.Instance.Init = function () {
    this.Init$ContentPresenter();
    this.$IsClipPropertySet = false;
    this.$ScrollData = new ScrollData();
};
ScrollContentPresenter.Instance.GetScrollOwner = function () {
    return this.$ScrollData.ScrollOwner;
};
ScrollContentPresenter.Instance.SetScrollOwner = function (value) {
    this.$ScrollData.ScrollOwner = value;
};
ScrollContentPresenter.Instance.GetCanHorizontallyScroll = function () {
    return this.$ScrollData.CanHorizontallyScroll;
};
ScrollContentPresenter.Instance.SetCanHorizontallyScroll = function (value) {
    if (this.$ScrollData.CanHorizontallyScroll !== value) {
        this.$ScrollData.CanHorizontallyScroll = value;
        this._InvalidateMeasure();
    }
};
ScrollContentPresenter.Instance.GetCanVerticallyScroll = function () {
    return this.$ScrollData.CanVerticallyScroll;
};
ScrollContentPresenter.Instance.SetCanVerticallyScroll = function (value) {
    if (this.$ScrollData.CanVerticallyScroll !== value) {
        this.$ScrollData.CanVerticallyScroll = value;
        this._InvalidateMeasure();
    }
};
ScrollContentPresenter.Instance.GetExtentWidth = function () {
    return this.$ScrollData.Extent.Width;
};
ScrollContentPresenter.Instance.GetExtentHeight = function () {
    return this.$ScrollData.Extent.Height;
};
ScrollContentPresenter.Instance.GetHorizontalOffset = function () {
    return this.$ScrollData.Offset.X;
};
ScrollContentPresenter.Instance.GetVerticalOffset = function () {
    return this.$ScrollData.Offset.Y;
};
ScrollContentPresenter.Instance.GetViewportHeight = function () {
    return this.$ScrollData.Viewport.Height;
};
ScrollContentPresenter.Instance.GetViewportWidth = function () {
    return this.$ScrollData.Viewport.Width;
};
ScrollContentPresenter.Instance.ChangeHorizontalOffset = function (offset) {
    if (!this.GetCanHorizontallyScroll())
        return;
    var valid = ScrollContentPresenter._ValidateInputOffset(offset);
    if (DoubleUtil.AreClose(this.$ScrollData.Offset.X, valid))
        return;
    this.$ScrollData.CachedOffset.X = num;
    this._InvalidateArrange();
};
ScrollContentPresenter.Instance.ChangeVerticalOffset = function (offset) {
    if (!this.GetCanVerticallyScroll())
        return;
    var valid = ScrollContentPresenter._ValidateInputOffset(offset);
    if (DoubleUtil.AreClose(this.$ScrollData.Offset.Y, valid))
        return;
    this.$ScrollData.CachedOffset.Y = valid;
    this._InvalidateArrange();
};
ScrollContentPresenter._ValidateInputOffset = function (offset) {
    if (!isNaN(offset))
        return Math.max(0, offset);
    throw new ArgumentException("Offset is not a number.");
};
ScrollContentPresenter.Instance.MeasureOverride = function (constraint) {
    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner == null || this._ContentRoot == null)
        return this._MeasureOverrideWithError(constraint);
    var ideal = new Size(this.GetCanHorizontallyScroll() ? Number.POSITIVE_INFINITY : constraint.Width,
        this.GetCanVerticallyScroll() ? Number.POSITIVE_INFINITY : constraint.Height);
    this._ContentRoot.Measure(ideal);
    this._UpdateExtents(constraint, this._ContentRoot._DesiredSize);
    return constraint.Min(this.$ScrollData.Extent);
};
ScrollContentPresenter.Instance.ArrangeOverride = function (arrangeSize) {
    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner == null || this._ContentRoot == null)
        return this._ArrangeOverrideWithError(arrangeSize);
    if (this._ClampOffsets())
        scrollOwner._InvalidateScrollInfo();
    var desired = this._ContentRoot._DesiredSize;
    var start = new Point(-this.GetHorizontalOffset(), -this.GetVerticalOffset());
    var offerSize = desired.Max(arrangeSize);
    this._ContentRoot.Arrange(new Rect(start.X, start.Y, offerSize.Width, offerSize.Height));
    this._UpdateClip(arrangeSize);
    this._UpdateExtents(arrangeSize, this.$ScrollData.Extent);
    return arrangeSize;
};
ScrollContentPresenter.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentPresenter();
    var sv = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    if (sv == null)
        return;
    var content = this.GetContent();
    var info = Nullstone.As(content, IScrollInfo);
    if (info == null) {
        var presenter = Nullstone.As(content, ItemsPresenter);
        if (presenter != null) {
            if (presenter._ElementRoot == null)
                presenter.ApplyTemplate();
            info = Nullstone.As(presenter._ElementRoot, IScrollInfo);
        }
    }
    if (info == null)
        info = this;
    info.SetCanHorizontallyScroll(sv.GetHorizontalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetCanVerticallyScroll(sv.GetVerticalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetScrollOwner(sv);
    sv.SetScrollInfo(info);
    sv._InvalidateScrollInfo();
};
ScrollContentPresenter.Instance.MakeVisible = function (visual, rectangle) {
    if (rectangle.IsEmpty() || visual == null || Nullstone.RefEquals(visual, this) || !this.IsAncestorOf(visual))
        return new Rect();
    var generalTransform = visual.TransformToVisual(this);
    var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
    rectangle.X = point.X;
    rectangle.Y = point.Y;
    return rectangle;
    var rect = new Rect(this.GetHorizontalOffset(), this.GetVerticalOffset(), this.GetViewportWidth(), this.GetViewportHeight());
    rectangle.X += rect.X;
    rectangle.Y += rect.Y;
    var num = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.X, rect.GetRight(), rectangle.X, rectangle.GetRight());
    var num1 = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.Y, rect.GetBottom(), rectangle.Y, rectangle.GetBottom());
    this.ChangeHorizontalOffset(num);
    this.ChangeVerticalOffset(num1);
    rect.X = num;
    rect.Y = num1;
    rectangle = rectangle.Intersection(rect)
    if (!rectangle.IsEmpty()) {
        rectangle.X -= rect.X;
        rectangle.Y -= rect.Y;
    }
    return rectangle;
};
ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll = function (topView, bottomView, topChild, bottomChild) {
    var flag = DoubleUtil.LessThan(topChild, topView) && DoubleUtil.LessThan(bottomChild, bottomView);
    var flag1 = DoubleUtil.GreaterThan(topChild, topView) && DoubleUtil.GreaterThan(bottomChild, bottomView);
    var flag4 = (bottomChild - topChild) > (bottomView - topView);
    if ((!flag || flag4) && (!flag1 || !flag4)) {
        if (flag || flag1)
            return bottomChild - bottomView - topView;
        return topView;
    }
    return topChild;
};
ScrollContentPresenter.Instance._UpdateExtents = function (viewport, extents) {
    var changed = !Size.Equals(this.$ScrollData.Viewport, viewport)
        || !Size.Equals(this.$ScrollData.Extent, extents);
    this.$ScrollData.Viewport = viewport;
    this.$ScrollData.Extent = extents;
    changed |= this._ClampOffsets();
    if (changed)
        this.GetScrollOwner()._InvalidateScrollInfo();
};
ScrollContentPresenter.Instance._ClampOffsets = function () {
    var changed = false;
    var result = this.GetCanHorizontallyScroll() ? Math.min(this.$ScrollData.CachedOffset.X, this.GetExtentWidth() - this.GetViewportWidth()) : 0;
    result = Math.max(0, result);
    if (!DoubleUtil.AreClose(result, this.GetHorizontalOffset())) {
        this.$ScrollData.Offset.X = result;
        changed = true;
    }
    result = this.GetCanVerticallyScroll() ? Math.min(this.$ScrollData.CachedOffset.Y, this.GetExtentHeight() - this.GetViewportHeight()) : 0;
    result = Math.max(0, result);
    if (!DoubleUtil.AreClose(result, this.GetVerticalOffset())) {
        this.$ScrollData.Offset.Y = result;
        changed = true;
    }
    return changed;
};
ScrollContentPresenter.Instance._UpdateClip = function (arrangeSize) {
    if (!this.$IsClipPropertySet) {
        this.$ClippingRectangle = new RectangleGeometry();
        this.SetClip(this.$ClippingRectangle);
        this.$IsClipPropertySet = true;
    }
    if (Nullstone.As(this.GetTemplateOwner(), ScrollViewer) == null || Nullstone.As(this.GetContent(), _TextBoxView) == null && Nullstone.As(this.GetContent(), _RichTextBoxView) == null) {
        this.$ClippingRectangle.SetRect(new Rect(0, 0, arrangeSize.Width, arrangeSize.Height));
    } else {
        this.$ClippingRectangle.SetRect(this._CalculateTextBoxClipRect(arrangeSize));
    }
};
ScrollContentPresenter.Instance._CalculateTextBoxClipRect = function (arrangeSize) {
    var left = 0;
    var right = 0;
    var templatedParent = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    var width = this.$ScrollData.Extent.Width;
    var num = this.$ScrollData.Viewport.Width;
    var x = this.$ScrollData.Offset.X;
    var textbox = Nullstone.As(templatedParent.GetTemplateOwner(), TextBox);
    var richtextbox = Nullstone.As(templatedParent.GetTemplateOwner(), RichTextBox);
    var textWrapping = TextWrapping.NoWrap;
    var horizontalScrollBarVisibility = ScrollBarVisibility.Disabled;
    if (richtextbox != null) {
        textWrapping = richtextbox.GetTextWrapping();
        horizontalScrollBarVisibility = richtextbox.GetHorizontalScrollBarVisibility();
    } else if (textbox != null) {
        textWrapping = textbox.GetTextWrapping();
        horizontalScrollBarVisibility = textbox.GetHorizontalScrollBarVisibility();
    }
    var padding = templatedParent.GetPadding();
    if (textWrapping !== TextWrapping.Wrap) {
        if (num > width || x === 0)
            left = padding.Left + 1;
        if (num > width || horizontalScrollBarVisibility !== ScrollBarVisibility.Disabled && Math.abs(width - x + num) <= 1)
            right = padding.Right + 1;
    } else {
        left = padding.Left + 1;
        right = padding.Right + 1;
    }
    left = Math.max(0, left);
    right = Math.max(0, right);
    return new Rect(-left, 0, arrangeSize.Width + left + right, arrangeSize.Height);
};
ScrollContentPresenter.Instance.LineUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + 16);
};
ScrollContentPresenter.Instance.LineDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - 16);
};
ScrollContentPresenter.Instance.LineLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - 16);
};
ScrollContentPresenter.Instance.LineRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + 16);
};
ScrollContentPresenter.Instance.MouseWheelUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + 48);
};
ScrollContentPresenter.Instance.MouseWheelDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + 48);
};
ScrollContentPresenter.Instance.PageUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - this.GetViewportWidth());
};
ScrollContentPresenter.Instance.PageRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + this.GetViewportWidth());
};
Nullstone.FinishCreate(ScrollContentPresenter);

var StackPanel = Nullstone.Create("StackPanel", Panel);
StackPanel._OrientationChanged = function (d, args) {
    var sp = Nullstone.As(d, StackPanel);
    if (sp == null)
        return;
    d._InvalidateMeasure();
    d._InvalidateArrange();
};
StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, StackPanel, Orientation.Vertical, StackPanel._OrientationChanged);
StackPanel.Instance.GetOrientation = function () {
    return this.$GetValue(StackPanel.OrientationProperty);
};
StackPanel.Instance.SetOrientation = function (value) {
    this.$SetValue(StackPanel.OrientationProperty, value);
};
StackPanel.Instance.MeasureOverride = function (constraint) {
    var childAvailable = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    var measured = new Size(0, 0);
    if (this.GetOrientation() === Orientation.Vertical) {
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
        if (this.GetOrientation() === Orientation.Vertical) {
            measured.Height += size.Height;
            measured.Width = Math.max(measured.Width, size.Width);
        } else {
            measured.Width += size.Width;
            measured.Height = Math.max(measured.Height, size.Height);
        }
    }
    return measured;
};
StackPanel.Instance.ArrangeOverride = function (arrangeSize) {
    var arranged = arrangeSize;
    if (this.GetOrientation() === Orientation.Vertical)
        arranged.Height = 0;
    else
        arranged.Width = 0;
    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        var child = children.GetValueAt(i);
        var size = child._DesiredSize;
        var childFinal;
        if (this.GetOrientation() === Orientation.Vertical) {
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
    if (this.GetOrientation() === Orientation.Vertical)
        arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
    else
        arranged.Width = Math.max(arranged.Width, arrangeSize.Width);
    return arranged;
};
Nullstone.FinishCreate(StackPanel);

var TextBlock = Nullstone.Create("TextBlock", FrameworkElement);
TextBlock.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Layout = new TextLayout();
    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._SetsValue = true;
    this._WasSet = true;
    this._Dirty = true;
    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._Font = new Font();
};
TextBlock.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, TextBlock, new Thickness());
TextBlock.Instance.GetPadding = function () {
    return this.$GetValue(TextBlock.PaddingProperty);
};
TextBlock.Instance.SetPadding = function (value) {
    this.$SetValue(TextBlock.PaddingProperty, value);
};
TextBlock.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextBlock, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextBlock.Instance.GetForeground = function () {
    return this.$GetValue(TextBlock.ForegroundProperty);
};
TextBlock.Instance.SetForeground = function (value) {
    this.$SetValue(TextBlock.ForegroundProperty, value);
};
TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextBlock, Font.DEFAULT_FAMILY);
TextBlock.Instance.GetFontFamily = function () {
    return this.$GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.Instance.SetFontFamily = function (value) {
    this.$SetValue(TextBlock.FontFamilyProperty, value);
};
TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextBlock, Font.DEFAULT_STRETCH);
TextBlock.Instance.GetFontStretch = function () {
    return this.$GetValue(TextBlock.FontStretchProperty);
};
TextBlock.Instance.SetFontStretch = function (value) {
    this.$SetValue(TextBlock.FontStretchProperty, value);
};
TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextBlock, Font.DEFAULT_STYLE);
TextBlock.Instance.GetFontStyle = function () {
    return this.$GetValue(TextBlock.FontStyleProperty);
};
TextBlock.Instance.SetFontStyle = function (value) {
    this.$SetValue(TextBlock.FontStyleProperty, value);
};
TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextBlock, Font.DEFAULT_WEIGHT);
TextBlock.Instance.GetFontWeight = function () {
    return this.$GetValue(TextBlock.FontWeightProperty);
};
TextBlock.Instance.SetFontWeight = function (value) {
    this.$SetValue(TextBlock.FontWeightProperty, value);
};
TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextBlock, Font.DEFAULT_SIZE);
TextBlock.Instance.GetFontSize = function () {
    return this.$GetValue(TextBlock.FontSizeProperty);
};
TextBlock.Instance.SetFontSize = function (value) {
    this.$SetValue(TextBlock.FontSizeProperty, value);
};
TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return new Enum(TextDecorations); }, TextBlock, TextDecorations.None);
TextBlock.Instance.GetTextDecorations = function () {
    return this.$GetValue(TextBlock.TextDecorationsProperty);
};
TextBlock.Instance.SetTextDecorations = function (value) {
    this.$SetValue(TextBlock.TextDecorationsProperty, value);
};
TextBlock.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextBlock);
TextBlock.Instance.GetFontResource = function () {
    return this.$GetValue(TextBlock.FontResourceProperty);
};
TextBlock.Instance.SetFontResource = function (value) {
    this.$SetValue(TextBlock.FontResourceProperty, value);
};
TextBlock.FontSourceProperty = DependencyProperty.Register("FontSource", function () { return Object; }, TextBlock);
TextBlock.Instance.GetFontSource = function () {
    return this.$GetValue(TextBlock.FontSourceProperty);
};
TextBlock.Instance.SetFontSource = function (value) {
    this.$SetValue(TextBlock.FontSourceProperty, value);
};
TextBlock.TextProperty = DependencyProperty.Register("Text", function () { return String; }, TextBlock, "");
TextBlock.Instance.GetText = function () {
    return this.$GetValue(TextBlock.TextProperty);
};
TextBlock.Instance.SetText = function (value) {
    this.$SetValue(TextBlock.TextProperty, value);
};
TextBlock.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, TextBlock, null, { GetValue: function () { return new InlineCollection(); } });
TextBlock.Instance.GetInlines = function () {
    return this.$GetValue(TextBlock.InlinesProperty);
};
TextBlock.LineStackingStrategyProperty = DependencyProperty.Register("LineStackingStrategy", function () { return new Enum(LineStackingStrategy); }, TextBlock);
TextBlock.Instance.GetLineStackingStrategy = function () {
    return this.$GetValue(TextBlock.LineStackingStrategyProperty);
};
TextBlock.Instance.SetLineStackingStrategy = function (value) {
    this.$SetValue(TextBlock.LineStackingStrategyProperty, value);
};
TextBlock.LineHeightProperty = DependencyProperty.Register("LineHeight", function () { return Number; }, TextBlock, 0.0);
TextBlock.Instance.GetLineHeight = function () {
    return this.$GetValue(TextBlock.LineHeightProperty);
};
TextBlock.Instance.SetLineHeight = function (value) {
    this.$SetValue(TextBlock.LineHeightProperty, value);
};
TextBlock.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () { return new Enum(TextAlignment); }, TextBlock, TextAlignment.Left);
TextBlock.Instance.GetTextAlignment = function () {
    return this.$GetValue(TextBlock.TextAlignmentProperty);
};
TextBlock.Instance.SetTextAlignment = function (value) {
    this.$SetValue(TextBlock.TextAlignmentProperty, value);
};
TextBlock.TextTrimmingProperty = DependencyProperty.Register("TextTrimming", function () { return new Enum(TextTrimming); }, TextBlock, TextTrimming.None);
TextBlock.Instance.GetTextTrimming = function () {
    return this.$GetValue(TextBlock.TextTrimmingProperty);
};
TextBlock.Instance.SetTextTrimming = function (value) {
    this.$SetValue(TextBlock.TextTrimmingProperty, value);
};
TextBlock.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () { return new Enum(TextWrapping); }, TextBlock, TextWrapping.NoWrap);
TextBlock.Instance.GetTextWrapping = function () {
    return this.$GetValue(TextBlock.TextWrappingProperty);
};
TextBlock.Instance.SetTextWrapping = function (value) {
    this.$SetValue(TextBlock.TextWrappingProperty, value);
};
TextBlock.Instance._ComputeBounds = function () {
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
TextBlock.Instance._ComputeActualSize = function () {
    var padding = this.GetPadding();
    var constraint = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    var result = new Size(0.0, 0.0);
    if (this.ReadLocalValue(LayoutInformation.LayoutSlotProperty) != null || LayoutInformation.GetPreviousConstraint(this) != null) {
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
TextBlock.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var padding = this.GetPadding();
    var constraint = availableSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    desired = new Size(this._ActualWidth, this._ActualHeight).GrowByThickness(padding);
    return desired;
};
TextBlock.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var padding = this.GetPadding();
    var constraint = finalSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    var arranged = new Size(this._ActualWidth, this._ActualHeight);
    arranged = arranged.Max(constraint);
    this._Layout.SetAvailableWidth(constraint.Width);
    arranged = arranged.GrowByThickness(padding);
    return finalSize;
};
TextBlock.Instance._Render = function (ctx, region) {
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
TextBlock.Instance.Layout = function (constraint) {
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
TextBlock.Instance._UpdateFont = function (force) {
    var changed = false;
    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());
    changed = changed || force;
    return changed;
};
TextBlock.Instance._UpdateFonts = function (force) {
    if (!this._UpdateFont(force))
        return false;
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Dirty = true;
    return true;
};
TextBlock.Instance._UpdateLayoutAttributes = function () {
    var inlines = this.GetInlines();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateFont(false);
    var length = 0;
    var runs = new LinkedList();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
    }
    if (count > 0)
        this._WasSet = true;
    this._Layout.SetText(this.GetText(), length);
    this._Layout.SetTextAttributes(runs);
};
TextBlock.Instance._UpdateLayoutAttributesForInline = function (item, length, runs) {
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
TextBlock.Instance._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
TextBlock.Instance._GetTextInternal = function (inlines) {
    if (!inlines)
        return "";
    var block = "";
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        block = block.concat(inlines.GetValueAt(i)._SerializeText());
    }
    return block;
};
TextBlock.Instance._SetTextInternal = function (text) {
    this._SetsValue = false;
    var value;
    var inlines = this.$GetValue(TextBlock.InlinesProperty);
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
TextBlock.Instance._CanFindElement = function () {
    return true;
};
TextBlock.Instance._OnPropertyChanged = function (args, error) {
    var invalidate = true;
    if (args.Property.OwnerType !== TextBlock) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        if (args.Property !== FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFonts(false))
            return;
    }
    if (args.Property._ID === TextBlock.FontFamilyProperty._ID
        || args.Property._ID === TextBlock.FontSizeProperty._ID
        || args.Property._ID === TextBlock.FontStretchProperty._ID
        || args.Property._ID === TextBlock.FontStyleProperty._ID
        || args.Property._ID === TextBlock.FontWeightProperty._ID) {
        this._UpdateFonts(false);
    } else if (args.Property._ID === TextBlock.TextProperty._ID) {
        if (this._SetsValue) {
            this._SetTextInternal(args.NewValue)
            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property._ID === TextBlock.InlinesProperty._ID) {
        if (this._SetsValue) {
            this._SetsValue = false;
            this.$SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
            this._SetsValue = true;
            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property._ID === TextBlock.LineStackingStrategyProperty._ID) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property._ID === TextBlock.LineHeightProperty._ID) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
    } else if (args.Property._ID === TextBlock.TextDecorationsProperty._ID) {
        this._Dirty = true;
    } else if (args.Property._ID === TextBlock.TextAlignmentProperty._ID) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
    } else if (args.Property._ID === TextBlock.TextTrimmingProperty._ID) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property._ID === TextBlock.TextWrappingProperty._ID) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
    } else if (args.Property._ID === TextBlock.PaddingProperty._ID) {
        this._Dirty = true;
    } else if (args.Property._ID === TextBlock.FontSourceProperty._ID) {
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
TextBlock.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && propd._ID === TextBlock.ForegroundProperty._ID) {
        this._Invalidate();
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
TextBlock.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(TextBlock.InlinesProperty, sender)) {
        this._OnCollectionChanged$FrameworkElement(sender, args);
        return;
    }
    var inlines = this.GetInlines();
    if (args.Action === CollectionChangedArgs.Action.Clearing)
        return;
    if (!this._SetsValue)
        return;
    if (args.Action === CollectionChangedArgs.Add)
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
    this._SetsValue = false;
    this.$SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
    this._SetsValue = true;
    this._UpdateLayoutAttributes();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Invalidate();
};
TextBlock.Annotations = {
    ContentProperty: TextBlock.InlinesProperty
};
Nullstone.FinishCreate(TextBlock);

var TextBoxBase = Nullstone.Create("TextBoxBase", Control);
TextBoxBase.Instance.Init = function () {
    this.Init$Control();
    this._Undo = new _TextBoxUndoStack(10);
    this._Redo = new _TextBoxUndoStack(10);
    this._Buffer = new _TextBuffer();
    this._MaxLength = 0;
    this._Emit = _TextBoxEmitChanged.NOTHING;
    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._CursorOffset = 0;
    this._Batch = 0;
    this._Font = new Font();
    this.ModelChanged = new MulticastEvent();
    this._NeedIMReset = false;
    this._Selecting = false;
    this._Captured = false;
    this._IsFocused = false;
    this._SettingValue = true;
};
TextBoxBase.Instance.HasSelectedText = function () {
    return this._SelectionCursor !== this._SelectionAnchor;
};
TextBoxBase.Instance.GetFont = function () {
    return this._Font;
};
TextBoxBase.Instance.GetTextDecorations = function () {
    return TextDecorations.None;
};
TextBoxBase.Instance.GetSelectionCursor = function () {
    return this._SelectionCursor;
};
TextBoxBase.Instance.GetSelectionStart = function () {
    AbstractMethod("TextBoxBase.GetSelectionStart");
};
TextBoxBase.Instance.SetSelectionStart = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionStart");
};
TextBoxBase.Instance.GetSelectionLength = function () {
    AbstractMethod("TextBoxBase.GetSelectionLength");
};
TextBoxBase.Instance.SetSelectionLength = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionLength");
};
TextBoxBase.Instance.GetCaretBrush = function () {
    return null;
};
TextBoxBase.Instance.OnApplyTemplate = function () {
    this._ContentElement = this.GetTemplateChild("ContentElement");
    if (this._ContentElement == null) {
        Warn("No ContentElement found");
        this.OnApplyTemplate$Control();
        return;
    }
    if (this._View != null) {
        this._View.SetTextBox(null);
    }
    this._View = new _TextBoxView();
    this._View.SetEnableCursor(!this._IsReadOnly);
    this._View.SetTextBox(this);
    if (this._ContentElement instanceof ContentPresenter) {
        this._ContentElement.SetContent(this._View);
    } else if (this._ContentElement instanceof ContentControl) {
        this._ContentElement.SetContent(this._View);
    } else if (this._ContentElement instanceof Border) {
        this._ContentElement.SetChild(this._View);
    } else if (this._ContentElement instanceof Panel) {
        this._ContentElement.GetChildren().Add(this._View);
    } else {
        Warn("Can't handle ContentElement.");
        this._View.SetTextBox(null);
        this._View = null;
    }
    this.OnApplyTemplate$Control();
};
TextBoxBase.Instance._BatchPush = function () {
    this._Batch++;
};
TextBoxBase.Instance._BatchPop = function () {
    if (this._Batch == 0) {
        Warn("TextBoxBase._Batch underflow");
        return;
    }
    this._Batch--;
};
TextBoxBase.Instance._SyncAndEmit = function (syncText) {
    if (syncText === undefined)
        syncText = true;
    if (this._Batch != 0 || this._Emit === _TextBoxEmitChanged.NOTHING)
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
TextBoxBase.Instance._SyncText = function () {
    AbstractMethod("TextBoxBase._SyncText");
};
TextBoxBase.Instance._EmitTextChanged = function () { };
TextBoxBase.Instance.SelectAll = function () {
    this._Select(0, this._Buffer.GetLength());
};
TextBoxBase.Instance.ClearSelection = function (start) {
    this._BatchPush();
    this.SetSelectionStart(start);
    this.SetSelectionLength(0);
    this._BatchPop();
};
TextBoxBase.Instance.Select = function (start, length) {
    if (start < 0)
        throw new ArgumentException("start < 0");
    if (length < 0)
        throw new ArgumentException("length < 0");
    if (start > this._Buffer.GetLength())
        start = this._Buffer.GetLength();
    if (length > (this._Buffer.GetLength() - start))
        length = this._Buffer.GetLength() - start;
    this._BatchPush();
    this.SetSelectionStart(start);
    this.SetSelectionLength(length);
    this._BatchPop();
    this._ResetIMContext();
    this._SyncAndEmit();
    return true;
};
TextBoxBase.Instance._SyncSelectedText = function () {
    AbstractMethod("TextBoxBase._SyncSelectedText");
};
TextBoxBase.Instance._EmitSelectionChanged = function () { };
TextBoxBase.Instance._ResetIMContext = function () {
    if (this._NeedIMReset) {
        this._NeedIMReset = false;
    }
};
TextBoxBase.Instance.CanUndo = function () {
    return !this._Undo.IsEmpty();
};
TextBoxBase.Instance.Undo = function () {
    if (this._Undo.IsEmpty())
        return;
    var action = this._Undo.Pop();
    this._Redo.Push(action);
    if (action instanceof _TextBoxUndoActionInsert) {
        this._Buffer.Cut(action._Start, action._Length);
    } else if (action instanceof _TextBoxUndoActionDelete) {
        this._Buffer.Insert(action._Start, action._Text);
    } else if (action instanceof _TextBoxUndoActionReplace) {
        this._Buffer.Cut(action._Start, action._Inserted.length);
        this._Buffer.Insert(action._Start, action._Deleted);
    }
    var anchor = action._SelectionAnchor;
    var cursor = action._SelectionCursor;
    this._BatchPush();
    this.SetSelectionStart(Math.min(anchor, cursor));
    this.SetSelectionLength(Math.abs(cursor - anchor));
    this._Emit = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;
    this._SelectionAnchor = anchor;
    this._SelectionCursor = cursor;
    this._BatchPop();
    this._SyncAndEmit();
};
TextBoxBase.Instance.CanRedo = function () {
    return !this._Redo.IsEmpty();
};
TextBoxBase.Instance.Redo = function () {
    if (this._Redo.IsEmpty())
        return;
    var action = this._Redo.Pop();
    this._Undo.Push(action);
    var anchor;
    var cursor;
    if (action instanceof _TextBoxUndoActionInsert) {
        this._Buffer.Insert(action._Start, action._Buffer._Text);
        anchor = cursor = action._Start + action._Buffer.GetLength();
    } else if (action instanceof _TextBoxUndoActionDelete) {
        this._Buffer.Cut(action._Start, action._Length);
        anchor = cursor = action._Start;
    } else if (action instanceof _TextBoxUndoActionReplace) {
        this._Buffer.Cut(action._Start, action._Length);
        this._Buffer.Insert(action._Start, action._Inserted);
        anchor = cursor = action._Start + action._Inserted.length;
    }
    this._BatchPush();
    this.SetSelectionStart(Math.min(anchor, cursor));
    this.SetSelectionLength(Math.abs(cursor - anchor));
    this._Emit = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;
    this._SelectionAnchor = anchor;
    this._SelectionCursor = cursor;
    this._BatchPop();
    this._SyncAndEmit();
};
TextBoxBase.Instance._OnPropertyChanged = function (args, error) {
    var changed = _TextBoxModelChanged.Nothing;
    if (args.Property._ID === Control.FontFamilyProperty._ID) {
        this._Font.SetFamily(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontSizeProperty._ID) {
        this._Font.SetSize(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontStretchProperty._ID) {
        this._Font.SetStretch(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontStyleProperty._ID) {
        this._Font.SetStyle(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontWeightProperty._ID) {
        this._Font.SetWeight(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    }
    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));
    if (args.Property.OwnerType !== TextBoxBase) {
        this._OnPropertyChanged$Control(args, error);
        return;
    }
    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === Control.BackgroundProperty._ID
        || propd._ID === Control.ForegroundProperty._ID)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush, args));
        this._Invalidate();
    }
    if (propd != null && propd.OwnerType !== TextBoxBase)
        this._OnSubPropertyChanged$Control(propd, sender, args);
};
TextBoxBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.Focus();
    if (this._View) {
        var p = args.GetPosition(this._View);
        var cursor = this._View.GetCursorFromXY(p.X, p.Y);
        this._ResetIMContext();
        this._Captured = this.CaptureMouse();
        this._Selecting = true;
        this._BatchPush();
        this._Emit = _TextBoxEmitChanged.NOTHING;
        this.SetSelectionStart(cursor);
        this.SetSelectionLength(0);
        this._BatchPop();
        this._SyncAndEmit();
    }
};
TextBoxBase.Instance.OnMouseLeftButtonUp = function (sender, args) {
    if (this._Captured)
        this.ReleaseMouseCapture();
    this._Selecting = false;
    this._Captured = false;
};
TextBoxBase.Instance.OnMouseMove = function (sender, args) {
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    if (this._Selecting) {
        var p = args.GetPosition(this._View);
        cursor = this._View.GetCursorFromXY(p.X, p.Y);
        this._BatchPush();
        this._Emit = _TextBoxEmitChanged.NOTHING;
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._BatchPop();
        this._SyncAndEmit();
    }
};
TextBoxBase.Instance.CursorDown = function (cursor, isPage) {
    return cursor;
};
TextBoxBase.Instance.CursorUp = function (cursor, isPage) {
    return cursor;
};
TextBoxBase.Instance.CursorNextWord = function (cursor) {
    return cursor;
};
TextBoxBase.Instance.CursorPrevWord = function (cursor) {
    return cursor;
};
TextBoxBase.Instance.CursorLineBegin = function (cursor) {
    return cursor;
};
TextBoxBase.Instance.CursorLineEnd = function (cursor) {
    return cursor;
};
TextBoxBase.Instance._EmitCursorPositionChanged = function (height, x, y) {
};
TextBoxBase.Instance.OnKeyDown = function (sender, args) {
    switch (args.KeyCode) {
        case 16: //shift
        case 17: //ctrl
        case 18: //alt
            return;
    }
    var handled = false;
    this._Emit = _TextBoxEmitChanged.NOTHING;
    this._BatchPush();
    switch (args.KeyCode) {
        case Keys.Backspace:
            if (this._IsReadOnly)
                break;
            handled = this._KeyDownBackSpace(args.Modifiers);
            break;
        case Keys.Delete:
            if (this._IsReadOnly)
                break;
            if (args.Modifiers.Shift) {
                handled = true;
            } else {
                handled = this._KeyDownDelete(args.Modifiers);
            }
            break;
        case Keys.Insert:
            if (args.Modifiers.Shift) {
                handled = true;
            } else if (args.Modifiers.Ctrl) {
                handled = true;
            }
            break;
        case Keys.PageDown:
            handled = this._KeyDownPageDown(args.Modifiers);
            break;
        case Keys.PageUp:
            handled = this._KeyUpPageDown(args.Modifiers);
            break;
        case Keys.Home:
            handled = this._KeyDownHome(args.Modifiers);
            break;
        case Keys.End:
            handled = this._KeyDownEnd(args.Modifiers);
            break;
        case Keys.Left:
            handled = this._KeyDownLeft(args.Modifiers);
            break;
        case Keys.Right:
            handled = this._KeyDownRight(args.Modifiers);
            break;
        case Keys.Down:
            handled = this._KeyDownDown(args.Modifiers);
            break;
        case Keys.Up:
            handled = this._KeyDownUp(args.Modifiers);
            break;
        default:
            if (args.Modifiers.Ctrl) {
                switch (args.KeyCode) {
                    case 65:
                        handled = true;
                        this.SelectAll();
                        break;
                    case 67:
                        handled = true;
                        break;
                    case 88:
                        if (this._IsReadOnly)
                            break;
                        this.SetSelectedText("");
                        handled = true;
                        break;
                    case 89:
                        if (!this.IsReadOnly) {
                            handled = true;
                            this.Redo();
                        }
                        break;
                    case 90:
                        if (!this.IsReadOnly) {
                            handled = true;
                            this.Undo();
                        }
                        break;
                }
            }
            break;
    }
    if (handled) {
        args.Handled = handled;
        this._ResetIMContext();
    }
    this._BatchPop();
    this._SyncAndEmit();
    if (!args.Handled)
        this.PostOnKeyDown(sender, args);
};
TextBoxBase.Instance.PostOnKeyDown = function (sender, args) {
    if (args.Handled)
        return;
    /*
    if (!this._IsReadOnly && this._IMCtx.FilterKeyPress()) {
    this._NeedIMReset = true;
    return;
    }
    */
    if (this._IsReadOnly || args.Modifiers.Alt || args.Modifiers.Ctrl)
        return;
    this._Emit = _TextBoxEmitChanged.NOTHING;
    this._BatchPush();
    switch (args.KeyCode) {
        case Keys.Enter:
            this._KeyDownChar('\r');
            break;
        default:
            if (!args.Modifiers.Ctrl && !args.Modifiers.Alt) {
                this._KeyDownChar(String.fromCharCode(args.KeyCode));
            }
            break;
    }
    this._BatchPop();
    this._SyncAndEmit();
};
TextBoxBase.Instance._KeyDownBackSpace = function (modifiers) {
    if (modifiers.Shift || modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var start = 0;
    var length = 0;
    var handled = false;
    if (cursor !== anchor) {
        length = Math.abs(cursor - anchor);
        start = Math.min(anchor, cursor);
    } else if (modifiers.Ctrl) {
        start = this.CursorPrevWord(cursor);
        length = cursor - start;
    } else if (cursor > 0) {
        if (cursor >= 2 && this._Buffer._Text && this._Buffer._Text.charAt(cursor - 2) == '\r' && this._Buffer._Text.charAt(cursor - 1) == '\n') {
            start = cursor - 2;
            length = 2;
        } else {
            start = cursor - 1;
            length = 1;
        }
    }
    if (length > 0) {
        action = new _TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length);
        this._Undo.Push(action);
        this._Redo.Clear();
        this._Buffer.Cut(start, length);
        this._Emit |= _TextBoxEmitChanged.TEXT;
        anchor = start;
        cursor = start;
        handled = true;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownDelete = function (modifiers) {
    if (modifiers.Shift || modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var start = 0;
    var length = 0;
    var handled = false;
    if (cursor !== anchor) {
        length = Math.abs(cursor - anchor);
        start = Math.min(anchor, cursor);
    } else if (modifiers.Ctrl) {
        length = this.CursorNextWord(cursor) - cursor;
        start = cursor;
    } else if (this._Buffer._Text && cursor < this._Buffer._Text.length) {
        if (this._Buffer._Text.charAt(cursor) === '\r' && this._Buffer._Text.charAt(cursor + 1) === '\n')
            length = 2;
        else
            length = 1;
        start = cursor;
    }
    if (length > 0) {
        action = new _TextBoxUndoActionDelete(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length);
        this._Undo.Push(action);
        this._Redo.Clear();
        this._Buffer.Cut(start, length);
        this._Emit |= _TextBoxEmitChanged.TEXT;
        handled = true;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownPageDown = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    cursor = this.CursorDown(cursor, true);
    var have = this._HaveOffset;
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = have;
    }
    return true;
};
TextBoxBase.Instance._KeyDownPageUp = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    cursor = this.CursorUp(cursor, true);
    var have = this._HaveOffset;
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = have;
    }
    return true;
};
TextBoxBase.Instance._KeyDownHome = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    if (modifiers.Ctrl) {
        cursor = 0;
    } else {
        cursor = this.CursorLineBegin(cursor);
    }
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = false;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownEnd = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    if (modifiers.Ctrl) {
        cursor = this._Buffer.GetLength();
    } else {
        cursor = this.CursorLineEnd(cursor);
    }
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = false;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownLeft = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    if (modifiers.Ctrl) {
        cursor = this.CursorPrevWord(cursor);
    } else if (!modifiers.Shift && anchor !== cursor) {
        cursor = Math.min(anchor, cursor);
    } else {
        if (cursor >= 2 && this._Buffer._Text && this._Buffer._Text.charAt(cursor - 2) === '\r' && this._Buffer._Text.charAt(cursor - 1) === '\n')
            cursor -= 2;
        else if (cursor > 0)
            cursor--;
    }
    if (!modifiers.Shift)
        anchor = cursor;
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownRight = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    if (modifiers.Ctrl) {
        cursor = this.CursorNextWord(cursor);
    } else if (!modifiers.Shift && anchor !== cursor) {
        cursor = Math.max(anchor, cursor);
    } else {
        if (this._Buffer._Text && this._Buffer._Text.charAt(cursor) === '\r' && this._Buffer._Text.charAt(cursor + 1) === '\n')
            cursor += 2;
        else if (cursor < this._Buffer.GetLength())
            cursor++;
    }
    if (!modifiers.Shift)
        anchor = cursor;
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownDown = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    cursor = this.CursorDown(cursor, false);
    var have = this._HaveOffset;
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = have;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownUp = function (modifiers) {
    if (modifiers.Alt)
        return false;
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var handled = false;
    cursor = this.CursorUp(cursor, false);
    var have = this._HaveOffset;
    if (!modifiers.Shift) {
        anchor = cursor;
    }
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._HaveOffset = have;
        handled = true;
    }
    return handled;
};
TextBoxBase.Instance._KeyDownChar = function (c) {
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;
    var length = Math.abs(cursor - anchor);
    var start = Math.min(anchor, cursor);
    var action;
    if ((this._MaxLength > 0 && this._Buffer.GetLength() >= this._MaxLength) || (c === '\r') && !this._AcceptsReturn)
        return false;
    if (length > 0) {
        action = new _TextBoxUndoActionReplace(anchor, cursor, this._Buffer, start, length, c);
        this._Undo.Push(action);
        this._Redo.Clear();
        this._Buffer.Replace(start, length, c);
    } else {
        var ins = null;
        action = this._Undo.Peek();
        if (action instanceof _TextBoxUndoActionInsert) {
            ins = action;
            if (!ins.Insert(start, c))
                ins = null;
        }
        if (!ins) {
            ins = new _TextBoxUndoActionInsert(anchor, cursor, start, c);
            this._Undo.Push(ins);
        }
        this._Redo.Clear();
        this._Buffer.Insert(start, c);
    }
    this._Emit |= _TextBoxEmitChanged.TEXT;
    cursor = start + 1;
    anchor = cursor;
    if (this._SelectionAnchor !== anchor || this._SelectionCursor !== cursor) {
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
    }
    return true;
};
TextBoxBase.Instance.OnLostFocus = function (sender, args) {
    this._IsFocused = false;
    if (this._View)
        this._View.OnLostFocus();
    if (!this._IsReadOnly) {
        this._NeedIMReset = true;
    }
};
TextBoxBase.Instance.OnGotFocus = function (sender, args) {
    this._IsFocused = true;
    if (this._View)
        this._View.OnGotFocus();
    if (!this._IsReadOnly) {
        this._NeedIMReset = true;
    }
};
Nullstone.FinishCreate(TextBoxBase);

var _TextBoxView = Nullstone.Create("_TextBoxView", FrameworkElement);
_TextBoxView.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Cursor = new Rect();
    this._Layout = new TextLayout();
    this._SelectionChanged = false;
    this._HadSelectedText = false;
    this._CursorVisible = false;
    this._EnableCursor = true;
    this._BlinkTimeout = 0;
    this._TextBox = null;
    this._Dirty = false;
    this.SetCursor(CursorType.IBeam);
};
_TextBoxView.Instance.SetTextBox = function (value) {
    if (this._TextBox == value)
        return;
    if (this._TextBox) {
        this._TextBox.ModelChanged.Unsubscribe(this._OnModelChanged, this);
    }
    this._TextBox = value;
    if (this._TextBox) {
        this._TextBox.ModelChanged.Subscribe(this._OnModelChanged, this);
        this._Layout.SetTextAttributes(new LinkedList());
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
_TextBoxView.Instance.SetEnableCursor = function (value) {
    if (this._EnableCursor == value)
        return;
    this._EnableCursor = value;
    if (value)
        this._ResetCursorBlink(false);
    else
        this._EndCursorBlink();
};
_TextBoxView.Instance._Blink = function () {
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
_TextBoxView.Instance._ConnectBlinkTimeout = function (multiplier) {
    if (!this._IsAttached)
        return;
    var view = this;
    var timeout = this._GetCursorBlinkTimeout() * multiplier / _TextBoxView.CURSOR_BLINK_DIVIDER;
    this._BlinkTimeout = setTimeout(function () { view._Blink(); }, timeout);
};
_TextBoxView.Instance._DisconnectBlinkTimeout = function () {
    if (this._BlinkTimeout != 0) {
        if (!this._IsAttached)
            return;
        clearTimeout(this._BlinkTimeout);
        this._BlinkTimeout = 0;
    }
};
_TextBoxView.Instance._GetCursorBlinkTimeout = function () {
    return _TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT;
};
_TextBoxView.Instance._ResetCursorBlink = function (delay) {
    if (this._TextBox._IsFocused && !this._TextBox.HasSelectedText()) {
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
_TextBoxView.Instance._DelayCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER);
    this._UpdateCursor(true);
    this._ShowCursor();
};
_TextBoxView.Instance._BeginCursorBlink = function () {
    if (this._BlinkTimeout == 0) {
        this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER);
        this._UpdateCursor(true);
        this._ShowCursor();
    }
};
_TextBoxView.Instance._EndCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    if (this._CursorVisible)
        this._HideCursor();
};
_TextBoxView.Instance._InvalidateCursor = function () {
    this._Invalidate(this._Cursor/*.Transform(this._AbsoluteTransform)*/);
};
_TextBoxView.Instance._ShowCursor = function () {
    this._CursorVisible = true;
    this._InvalidateCursor();
};
_TextBoxView.Instance._HideCursor = function () {
    this._CursorVisible = false;
    this._InvalidateCursor();
};
_TextBoxView.Instance._UpdateCursor = function (invalidate) {
    var cur = this._TextBox.GetSelectionCursor();
    var current = this._Cursor;
    var rect;
    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
    this._Cursor = this._Layout.GetSelectionCursor(new Point(), cur);
    rect = this._Cursor; //.Transform(this._AbsoluteTransform);
    if (this._Cursor != current)
        this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);
    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
};
_TextBoxView.Instance._UpdateText = function () {
    var text = this._TextBox.GetDisplayText();
    this._Layout.SetText(text ? text : "", -1);
};
_TextBoxView.Instance._ComputeActualSize = function () {
    if (this.ReadLocalValue(LayoutInformation.LayoutSlotProperty))
        return this._ComputeActualSize$FrameworkElement();
    this.Layout(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    return this._Layout.GetActualExtents();
};
_TextBoxView.Instance._MeasureOverrideWithError = function (availableSize, error) {
    this.Layout(availableSize);
    var desired = this._Layout.GetActualExtents();
    if (!isFinite(availableSize.Width))
        desired.Width = Math.max(desired.Width, 11);
    return desired.Min(availableSize);
};
_TextBoxView.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    this.Layout(finalSize);
    var arranged = this._Layout.GetActualExtents();
    arranged = arranged.Max(finalSize);
    return arranged;
};
_TextBoxView.Instance.Layout = function (constraint) {
    this._Layout.SetMaxWidth(constraint.Width);
    this._Layout.Layout();
    this._Dirty = false;
};
_TextBoxView.Instance.GetBaselineOffset = function () {
    return this._Layout.GetBaselineOffset();
};
_TextBoxView.Instance.GetLineFromY = function (y) {
    return this._Layout.GetLineFromY(new Point(), y);
};
_TextBoxView.Instance.GetLineFromIndex = function (index) {
    return this._Layout.GetLineFromIndex(index);
};
_TextBoxView.Instance.GetCursorFromXY = function (x, y) {
    return this._Layout.GetCursorFromXY(new Point(), x, y);
};
_TextBoxView.Instance._Render = function (ctx, region) {
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
_TextBoxView.Instance._RenderImpl = function (ctx, region) {
    ctx.Save();
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), new Point());
    if (this._CursorVisible) {
        var caretBrush = this._TextBox.GetCaretBrush();
        if (!caretBrush)
            caretBrush = new SolidColorBrush(new Color(0, 0, 0));
        ctx.CustomRender(_TextBoxView._CursorPainter, this._Cursor, caretBrush);
    }
    ctx.Restore();
};
_TextBoxView.Instance.OnLostFocus = function () {
    this._EndCursorBlink();
};
_TextBoxView.Instance.OnGotFocus = function () {
    this._ResetCursorBlink(false);
};
_TextBoxView.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this._TextBox.OnMouseLeftButtonDown(sender, args);
};
_TextBoxView.Instance.OnMouseLeftButtonUp = function (args) {
    this._TextBox.OnMouseLeftButtonUp(args);
};
_TextBoxView.Instance._OnModelChanged = function (sender, args) {
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
_TextBoxView._CursorPainter = function (args) {
    var canvasCtx = args[0];
    var rect = args[1];
    var brush = args[2];
    canvasCtx.moveTo(rect.X + 0.5, rect.Y);
    canvasCtx.lineTo(rect.X + 0.5, rect.Y + rect.Height);
    canvasCtx.lineWidth = 1.0;
    brush.SetupBrush(canvasCtx, rect);
    canvasCtx.strokeStyle = brush.ToHtml5Object();
    canvasCtx.stroke();
};
Nullstone.FinishCreate(_TextBoxView);

var UserControl = Nullstone.Create("UserControl", Control);
UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, UserControl);
UserControl.Instance.GetContent = function () {
    return this.$GetValue(UserControl.ContentProperty);
};
UserControl.Instance.SetContent = function (value) {
    this.$SetValue(UserControl.ContentProperty, value);
};
UserControl.Instance.IsLayoutContainer = function () { return true; };
UserControl.Instance._MeasureOverrideWithError = function (availableSize, error) {
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
UserControl.Instance._ArrangeOverrideWithError = function (finalSize, error) {
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
UserControl.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType != UserControl) {
        this._OnPropertyChanged$FrameworkElement(args, error);
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
UserControl.Annotations = {
    ContentProperty: UserControl.ContentProperty
};
Nullstone.FinishCreate(UserControl);

var RangeBase = Nullstone.Create("RangeBase", Control);
RangeBase.Instance.Init = function () {
    this.Init$Control();
    this.SetMinimum(0);
    this.SetMaximum(1);
    this.SetValue(0);
    this.SetSmallChange(0.1);
    this.SetLargeChange(1);
    this.ValueChanged = new MulticastEvent();
    this._LevelsFromRootCall = 0;
};
RangeBase._OnMinimumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Minimum property.");
    if (d._LevelsFromRootCall === 0) {
        d._InitialMax = args.GetMaximum();
        d._InitialVal = d.GetValue();
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        d._OnMinimumChanged(args.OldValue, args.OldValue);
        var max = d.GetMaximum();
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.GetValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }
};
RangeBase.MinimumProperty = DependencyProperty.Register("Minimum", function () { return Number; }, RangeBase, 0, RangeBase._OnMinimumPropertyChanged);
RangeBase.Instance.GetMinimum = function () {
    return this.$GetValue(RangeBase.MinimumProperty);
};
RangeBase.Instance.SetMinimum = function (value) {
    this.$SetValue(RangeBase.MinimumProperty, value);
};
RangeBase._OnMaximumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Maximum property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedMax = args.NewValue;
        d._InitialMax = args.OldValue;
        d._InitialVal = d.GetValue();
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var max = d.GetMaximum();
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.GetValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }
};
RangeBase.MaximumProperty = DependencyProperty.Register("Maximum", function () { return Number; }, RangeBase, 1, RangeBase._OnMaximumPropertyChanged);
RangeBase.Instance.GetMaximum = function () {
    return this.$GetValue(RangeBase.MaximumProperty);
};
RangeBase.Instance.SetMaximum = function (value) {
    if (this._LevelsFromRootCall === 0)
        this._RequestedMax = value;
    this.$SetValue(RangeBase.MaximumProperty, value);
};
RangeBase._OnLargeChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Large Change Value.");
    }
};
RangeBase.LargeChangeProperty = DependencyProperty.Register("LargeChange", function () { return Number; }, RangeBase, 1, RangeBase._OnLargeChangePropertyChanged);
RangeBase.Instance.GetLargeChange = function () {
    return this.$GetValue(RangeBase.LargeChangeProperty);
};
RangeBase.Instance.SetLargeChange = function (value) {
    this.$SetValue(RangeBase.LargeChangeProperty, value);
};
RangeBase._OnSmallChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Small Change Value.");
    }
};
RangeBase.SmallChangeProperty = DependencyProperty.Register("SmallChange", function () { return Number; }, RangeBase, 0.1, RangeBase._OnSmallChangePropertyChanged);
RangeBase.Instance.GetSmallChange = function () {
    return this.$GetValue(RangeBase.SmallChangeProperty);
};
RangeBase.Instance.SetSmallChange = function (value) {
    this.$SetValue(RangeBase.SmallChangeProperty, value);
};
RangeBase._OnValuePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Value property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedVal = args.NewValue;
        d._InitialVal = args.OldValue;
    }
    d._LevelsFromRootCall++;
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var val = d.GetValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }
};
RangeBase.ValueProperty = DependencyProperty.Register("Value", function () { return Number; }, RangeBase, 0, RangeBase._OnValuePropertyChanged);
RangeBase.Instance.GetValue = function () {
    return this.$GetValue(RangeBase.ValueProperty);
};
RangeBase.Instance.SetValue = function (value) {
    this.$SetValue(RangeBase.ValueProperty, value);
};
RangeBase.Instance._CoerceMaximum = function () {
    var min = this.GetMinimum();
    var max = this.GetMaximum();
    if (!DoubleUtil.AreClose(this._RequestedMax, max) && this._RequestedMax >= min) {
        this.SetMaximum(this._RequestedMax);
        return;
    }
    if (max < min)
        this.SetMaximum(min);
};
RangeBase.Instance._CoerceValue = function () {
    var min = this.GetMinimum();
    var max = this.GetMaximum();
    var val = this.GetValue();
    if (!DoubleUtil.AreClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max) {
        this.SetValue(this._RequestedVal);
        return;
    }
    if (val < min)
        this.SetValue(min);
    if (val > max)
        this.SetValue(max);
};
RangeBase._IsValidChange = function (value) {
    if (!RangeBase._IsValidDoubleValue(value))
        return false;
    return value >= 0;
};
RangeBase._IsValidDoubleValue = function (value) {
    if (typeof value !== "number")
        return false;
    if (isNaN(value))
        return false;
    if (!isFinite(value))
        return false;
    return true;
};
RangeBase.Instance._OnMinimumChanged = function (oldMin, newMin) { };
RangeBase.Instance._OnMaximumChanged = function (oldMax, newMax) { };
RangeBase.Instance._OnValueChanged = function (oldValue, newValue) {
    this.ValueChanged.Raise(this, new RoutedPropertyChangedEventArgs(oldValue, newValue));
};
Nullstone.FinishCreate(RangeBase);

var ScrollBar = Nullstone.Create("ScrollBar", RangeBase);
ScrollBar.Instance.Init = function () {
    this.Init$RangeBase();
    this.Scroll = new MulticastEvent();
    this.SizeChanged.Subscribe(this._HandleSizeChanged, this);
};
ScrollBar._OnOrientationPropertyChanged = function (d, args) {
    d._OnOrientationChanged();
};
ScrollBar.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, ScrollBar, Orientation.Horizontal, ScrollBar._OnOrientationPropertyChanged);
ScrollBar.Instance.GetOrientation = function () {
    return this.$GetValue(ScrollBar.OrientationProperty);
};
ScrollBar.Instance.SetOrientation = function (value) {
    this.$SetValue(ScrollBar.OrientationProperty, value);
};
ScrollBar._OnViewportSizePropertyChanged = function (d, args) {
    d._UpdateTrackLayout(d._GetTrackLength());
};
ScrollBar.ViewportSizeProperty = DependencyProperty.Register("ViewportSize", function () { return Number; }, ScrollBar, 0, ScrollBar._OnViewportSizePropertyChanged);
ScrollBar.Instance.GetViewportSize = function () {
    return this.$GetValue(ScrollBar.ViewportSizeProperty);
};
ScrollBar.Instance.SetViewportSize = function (value) {
    this.$SetValue(ScrollBar.ViewportSizeProperty, value);
};
ScrollBar.Instance.GetIsDragging = function () {
    if (this.$ElementHorizontalThumb != null)
        return this.$ElementHorizontalThumb.GetIsDragging();
    if (this.$ElementVerticalThumb != null)
        return this.$ElementVerticalThumb.GetIsDragging();
    return false;
};
ScrollBar.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$RangeBase();
    this.$ElementHorizontalTemplate = Nullstone.As(this.GetTemplateChild("HorizontalRoot"), FrameworkElement);
    this.$ElementHorizontalLargeIncrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeIncrease"), RepeatButton);
    this.$ElementHorizontalLargeDecrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeDecrease"), RepeatButton);
    this.$ElementHorizontalSmallIncrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallIncrease"), RepeatButton);
    this.$ElementHorizontalSmallDecrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallDecrease"), RepeatButton);
    this.$ElementHorizontalThumb = Nullstone.As(this.GetTemplateChild("HorizontalThumb"), Thumb);
    this.$ElementVerticalTemplate = Nullstone.As(this.GetTemplateChild("VerticalRoot"), FrameworkElement);
    this.$ElementVerticalLargeIncrease = Nullstone.As(this.GetTemplateChild("VerticalLargeIncrease"), RepeatButton);
    this.$ElementVerticalLargeDecrease = Nullstone.As(this.GetTemplateChild("VerticalLargeDecrease"), RepeatButton);
    this.$ElementVerticalSmallIncrease = Nullstone.As(this.GetTemplateChild("VerticalSmallIncrease"), RepeatButton);
    this.$ElementVerticalSmallDecrease = Nullstone.As(this.GetTemplateChild("VerticalSmallDecrease"), RepeatButton);
    this.$ElementVerticalThumb = Nullstone.As(this.GetTemplateChild("VerticalThumb"), Thumb);
    if (this.$ElementHorizontalThumb != null) {
        this.$ElementHorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this.$ElementHorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this.$ElementHorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this.$ElementHorizontalLargeIncrease != null) {
        this.$ElementHorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementHorizontalLargeDecrease != null) {
        this.$ElementHorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementHorizontalSmallIncrease != null) {
        this.$ElementHorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementHorizontalSmallDecrease != null) {
        this.$ElementHorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
    }
    if (this.$ElementVerticalThumb != null) {
        this.$ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this.$ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this.$ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this.$ElementVerticalLargeIncrease != null) {
        this.$ElementVerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementVerticalLargeDecrease != null) {
        this.$ElementVerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementVerticalSmallIncrease != null) {
        this.$ElementVerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementVerticalSmallDecrease != null) {
        this.$ElementVerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
    }
    this._OnOrientationChanged();
    this.UpdateVisualState(false);
};
ScrollBar.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$RangeBase(args);
    if (!this.GetIsEnabled())
        this._IsMouseOver = false;
    this.UpdateVisualState();
};
ScrollBar.Instance.OnLostMouseCapture = function (sender, args) {
    this.OnLostMouseCapture$RangeBase(sender, args);
    this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$RangeBase(sender, args);
    this._IsMouseOver = true;
    var orientation = this.GetOrientation();
    var shouldUpdate = false;
    if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb != null && !this.$ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null && !this.$ElementVerticalThumb.GetIsDragging())
        shouldUpdate = true;
    if (shouldUpdate)
        this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$RangeBase(sender, args);
    this._IsMouseOver = false;
    var orientation = this.GetOrientation();
    var shouldUpdate = false;
    if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb != null && !this.$ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null && !this.$ElementVerticalThumb.GetIsDragging())
        shouldUpdate = true;
    if (shouldUpdate)
        this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$RangeBase(sender, args);
    if (args.Handled)
        return;
    args.Handled = true;
    this.CaptureMouse();
};
ScrollBar.Instance.OnMouseLeftButtonUp = function (sender, args) {
    this.OnMouseLeftButtonUp$RangeBase(sender, args);
    if (args.Handled)
        return;
    args.Handled = true;
    this.ReleaseMouseCapture();
    this.UpdateVisualState();
};
ScrollBar.Instance._OnMaximumChanged = function (oldMax, newMax) {
    var trackLength = this._GetTrackLength();
    this._OnMaximumChanged$RangeBase(oldMax, newMax);
    this._UpdateTrackLayout(trackLength);
};
ScrollBar.Instance._OnMinimumChanged = function (oldMin, newMin) {
    var trackLength = this._GetTrackLength();
    this._OnMinimumChanged$RangeBase(oldMax, newMax);
    this._UpdateTrackLayout(trackLength);
};
ScrollBar.Instance._OnValueChanged = function (oldValue, newValue) {
    var trackLength = this._GetTrackLength();
    this._OnValueChanged$RangeBase(oldValue, newValue);
    this._UpdateTrackLayout(trackLength);
};
ScrollBar.Instance._OnThumbDragStarted = function (sender, args) {
    this._DragValue = this.GetValue();
};
ScrollBar.Instance._OnThumbDragDelta = function (sender, args) {
    var change = 0;
    var zoomFactor = 1; //TODO: FullScreen?
    var num = zoomFactor;
    var max = this.GetMaximum();
    var min = this.GetMinimum();
    var diff = max - min;
    var trackLength = this._GetTrackLength();
    var orientation = this.GetOrientation();
    if (this.$ElementVerticalThumb != null && orientation === Orientation.Vertical) {
        change = num * args.VerticalChange / (trackLength - this.$ElementVerticalThumb.GetActualHeight()) * diff;
    }
    if (this.$ElementHorizontalThumb != null && orientation === Orientation.Horizontal) {
        change = num * args.HorizontalChange / (trackLength - this.$ElementHorizontalThumb.GetActualWidth()) * diff;
    }
    if (!isNaN(change) && isFinite(change)) {
        this._DragValue += change;
        var num1 = Math.min(max, Math.max(min, this._DragValue));
        if (num1 !== this.GetValue()) {
            this.SetValue(num1);
            this._RaiseScroll(ScrollEventType.ThumbTrack);
        }
    }
};
ScrollBar.Instance._OnThumbDragCompleted = function (sender, args) {
    this._RaiseScroll(ScrollEventType.EndScroll);
};
ScrollBar.Instance._SmallDecrement = function (sender, args) {
    var curValue = this.GetValue();
    var num = Math.max(curValue - this.GetSmallChange(), this.GetMinimum());
    if (curValue !== num) {
        this.SetValue(num);
        this._RaiseScroll(ScrollEventType.SmallDecrement);
    }
};
ScrollBar.Instance._SmallIncrement = function (sender, args) {
    var curValue = this.GetValue();
    var num = Math.min(curValue + this.GetSmallChange(), this.GetMaximum());
    if (curValue !== num) {
        this.SetValue(num);
        this._RaiseScroll(ScrollEventType.SmallIncrement);
    }
};
ScrollBar.Instance._LargeDecrement = function (sender, args) {
    var curValue = this.GetValue();
    var num = Math.max(curValue - this.GetLargeChange(), this.GetMinimum());
    if (curValue !== num) {
        this.SetValue(num);
        this._RaiseScroll(ScrollEventType.LargeDecrement);
    }
};
ScrollBar.Instance._LargeIncrement = function (sender, args) {
    var curValue = this.GetValue();
    var num = Math.min(curValue + this.GetLargeChange(), this.GetMaximum());
    if (curValue !== num) {
        this.SetValue(num);
        this._RaiseScroll(ScrollEventType.LargeIncrement);
    }
};
ScrollBar.Instance._HandleSizeChanged = function () {
    this._UpdateTrackLayout(this._GetTrackLength());
};
ScrollBar.Instance._OnOrientationChanged = function () {
    var orientation = this.GetOrientation();
    if (this.$ElementHorizontalTemplate != null) {
        this.$ElementHorizontalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Visible : Visibility.Collapsed);
    }
    if (this.$ElementVerticalTemplate != null) {
        this.$ElementVerticalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Collapsed : Visibility.Visible);
    }
    this._UpdateTrackLayout(this._GetTrackLength());
};
ScrollBar.Instance._UpdateTrackLayout = function (trackLength) {
    var max = this.GetMaximum();
    var min = this.GetMinimum();
    var val = this.GetValue();
    var multiplier = (val - min) / (max - min);
    var thumbSize = this._UpdateThumbSize(trackLength);
    var orientation = this.GetOrientation();
    if (orientation === Orientation.Horizontal && this.$ElementHorizontalLargeDecrease != null && this.$ElementHorizontalThumb != null) {
        this.$ElementHorizontalLargeDecrease.SetWidth(Math.max(0, multiplier * (trackLength - thumbSize)));
    } else if (orientation === Orientation.Vertical && this.$ElementVerticalLargeDecrease != null && this.$ElementVerticalThumb != null) {
        this.$ElementVerticalLargeDecrease.SetHeight(Math.max(0, multiplier * (trackLength - thumbSize)));
    }
};
ScrollBar.Instance._UpdateThumbSize = function (trackLength) {
    var result = Number.NaN;
    var hideThumb = trackLength <= 0;
    if (trackLength > 0) {
        var orientation = this.GetOrientation();
        var max = this.GetMaximum();
        var min = this.GetMinimum();
        if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb != null) {
            if (max - min !== 0)
                result = Math.max(this.$ElementHorizontalThumb.GetMinWidth(), this._ConvertViewportSizeToDisplayUnits(trackLength));
            if (max - min === 0 || result > this.GetActualWidth() || trackLength <= this.$ElementHorizontalThumb.GetMinWidth()) {
                hideThumb = true;
            } else {
                this.$ElementHorizontalThumb.SetVisibility(Visibility.Visible);
                this.$ElementHorizontalThumb.SetWidth(result);
            }
        } else if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null) {
            if (max - min !== 0)
                result = Math.max(this.$ElementVerticalThumb.GetMinHeight(), this._ConvertViewportSizeToDisplayUnits(trackLength));
            if (max - min === 0 || result > this.GetActualHeight() || trackLength <= this.$ElementVerticalThumb.GetMinHeight()) {
                hideThumb = true;
            } else {
                this.$ElementVerticalThumb.SetVisibility(Visibility.Visible);
                this.$ElementVerticalThumb.SetHeight(result);
            }
        }
    }
    if (hideThumb) {
        if (this.$ElementHorizontalThumb != null) {
            this.$ElementHorizontalThumb.SetVisibility(Visibility.Collapsed);
        }
        if (this.$ElementVerticalThumb != null) {
            this.$ElementVerticalThumb.SetVisibility(Visibility.Collapsed);
        }
    }
    return result;
};
ScrollBar.Instance._GetTrackLength = function () {
    var actual = NaN;
    if (this.GetOrientation() === Orientation.Horizontal) {
        actual = this.GetActualWidth();
        if (this.$ElementHorizontalSmallDecrease != null) {
            var thickness = this.$ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
        if (this.$ElementHorizontalSmallIncrease != null) {
            var thickness = this.$ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
    } else {
        actual = this.GetActualHeight();
        if (this.$ElementHorizontalSmallDecrease != null) {
            var thickness = this.$ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Top + thickness.Bottom;
        }
        if (this.$ElementHorizontalSmallIncrease != null) {
            var thickness = this.$ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Top + thickness.Bottom;
        }
    }
    return actual;
};
ScrollBar.Instance._ConvertViewportSizeToDisplayUnits = function (trackLength) {
    var viewportSize = this.GetViewportSize();
    return trackLength * viewportSize / (viewportSize + this.GetMaximum() - this.GetMinimum());
};
ScrollBar.Instance._RaiseScroll = function (scrollEvtType) {
    var args = new ScrollEventArgs(scrollEvtType, this.GetValue());
    args.OriginalSource = this;
    this.Scroll.Raise(this, args);
};
ScrollBar.Instance.UpdateVisualState = function (useTransitions) {
    if (useTransitions === undefined) useTransitions = true;
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this._IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }
};
ScrollBar.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: ScrollBar
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinWidth"),
        Value: "17"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinHeight"),
        Value: "17"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ScrollBar
            },
            Content: {
                Type: Grid,
                Name: "Root",
                Props: {
                    Resources: [
{
    Type: ControlTemplate,
    Key: "RepeatButtonTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
}]
}]
        }
]
    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalIncrementTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundAnimation",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 8,
        Width: 4,
        Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]
    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalDecrementTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 8,
        Width: 4,
        Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]
    }
},
{
    Type: ControlTemplate,
    Key: "VerticalIncrementTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 4,
        Width: 8,
        Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]
    }
},
{
    Type: ControlTemplate,
    Key: "VerticalDecrementTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 4,
        Width: 8,
        Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]
    }
},
{
    Type: ControlTemplate,
    Key: "VerticalThumbTemplate",
    Props: {
        TargetType: Thumb
    },
    Content: {
        Type: Grid,
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ThumbVisual"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Grid,
    Name: "ThumbVisual",
    Props: {
        Margin: new Thickness(1, 0, 1, 0)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF818F99"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFC2C9CE"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFB3BBC1"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF96A4B1"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0
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
        Offset: 0.6
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
}]
}]
    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalThumbTemplate",
    Props: {
        TargetType: Thumb
    },
    Content: {
        Type: Grid,
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ThumbVisual"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
        }
],
        Children: [
{
    Type: Grid,
    Name: "ThumbVisual",
    Props: {
        Margin: new Thickness(0, 1, 0, 1)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF818F99"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFC2C9CE"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFB3BBC1"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF96A4B1"),
        Offset: 0.35
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
}]
}]
    }
}]
                },
                AttachedProps: [{
                    Owner: VisualStateManager,
                    Prop: "VisualStateGroups",
                    Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver"
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 0.5,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Root"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
}]
                }
],
                Children: [
{
    Type: Grid,
    Name: "HorizontalRoot",
    Props: {
        ColumnDefinitions: [
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
}]
    },
    Children: [
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.5, 1),
                EndPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF4F6F7"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF0F4F7"),
        Offset: 0.344
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFDFE3E6"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFE9EEF4"),
        Offset: 0.527
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: new TemplateBindingMarkup("Background")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Opacity: 0.375,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 0.125),
                StartPoint: new Point(0.5, 0.875)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#33FFFFFF")
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#99FFFFFF"),
        Offset: 1
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalSmallDecrease",
    Props: {
        Width: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("HorizontalDecrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalLargeDecrease",
    Props: {
        Width: 0,
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
]
},
{
    Type: Thumb,
    Name: "HorizontalThumb",
    Props: {
        Background: new TemplateBindingMarkup("Background"),
        MinWidth: 18,
        Width: 18,
        Template: new StaticResourceMarkup("HorizontalThumbTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 2
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalLargeIncrease",
    Props: {
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 3
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalSmallIncrease",
    Props: {
        Width: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("HorizontalIncrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 4
    }
]
}]
},
{
    Type: Grid,
    Name: "VerticalRoot",
    Props: {
        Visibility: Visibility.Collapsed,
        RowDefinitions: [
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
}]
    },
    Children: [
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(1, 0.5),
                EndPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF4F6F7"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF0F4F7"),
        Offset: 0.344
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFDFE3E6"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFE9EEF4"),
        Offset: 0.527
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Opacity: 0.375,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.125, 0.5),
                StartPoint: new Point(0.875, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#33FFFFFF")
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#99FFFFFF"),
        Offset: 1
    }
}]
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalSmallDecrease",
    Props: {
        Height: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("VerticalDecrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 0
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalLargeDecrease",
    Props: {
        Height: 0,
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 1
    }
]
},
{
    Type: Thumb,
    Name: "VerticalThumb",
    Props: {
        MinHeight: 18,
        Height: 18,
        Template: new StaticResourceMarkup("VerticalThumbTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 2
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalLargeIncrease",
    Props: {
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 3
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalSmallIncrease",
    Props: {
        Height: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("VerticalIncrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 4
    }
]
}]
}]
            }
        }
    }
}]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};
Nullstone.FinishCreate(ScrollBar);

var Thumb = Nullstone.Create("Thumb", Control);
Thumb.Instance.Init = function () {
    this.Init$Control();
    this.DragCompleted = new MulticastEvent();
    this.DragDelta = new MulticastEvent();
    this.DragStarted = new MulticastEvent();
};
Thumb.IsDraggingProperty = DependencyProperty.RegisterReadOnly("IsDragging", function () { return Boolean; }, Thumb, false, function (d, args) { d.OnDraggingChanged(args); });
Thumb.Instance.GetIsDragging = function () {
    return this.$GetValue(Thumb.IsDraggingProperty);
};
Thumb.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, Thumb);
Thumb.Instance.GetIsFocused = function () {
    return this.$GetValue(Thumb.IsFocusedProperty);
};
Thumb.Instance.CancelDrag = function () {
    if (this.GetIsDragging()) {
        this._SetValueInternal(Thumb.IsDraggingProperty, false);
        this._RaiseDragCompleted(true);
    }
};
Thumb.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$Control();
    this.UpdateVisualState(false);
};
Thumb.Instance._FocusChanged = function (hasFocus) {
    this._SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
    this.UpdateVisualState();
};
Thumb.Instance.OnDraggingChanged = function (args) {
    this.UpdateVisualState();
};
Thumb.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$Control(args);
    if (!this.GetIsEnabled())
        this._IsMouseOver = false;
    this.UpdateVisualState();
};
Thumb.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};
Thumb.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};
Thumb.Instance.OnLostMouseCapture = function (sender, args) {
    this.OnLostMouseCapture$Control(sender, args);
    this._RaiseDragCompleted(false);
    this._SetValueInternal(Thumb.IsDraggingProperty, false);
};
Thumb.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$Control(sender, args);
    if (this.GetIsEnabled()) {
        this._IsMouseOver = true;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$Control(sender, args);
    if (this.GetIsEnabled()) {
        this._IsMouseOver = false;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$Control(sender, args);
    if (args.Handled)
        return;
    if (!this.GetIsDragging() && this.GetIsEnabled()) {
        args.Handled = true;
        this.CaptureMouse();
        this._SetValueInternal(Thumb.IsDraggingProperty, true);
        this._Origin = this._PreviousPosition = args.GetPosition(this._GetLogicalParent());
        var success = false;
        try {
            this._RaiseDragStarted();
            success = true;
        } finally {
            if (!success)
                this.CancelDrag();
        }
    }
};
Thumb.Instance.OnMouseMove = function (sender, args) {
    this.OnMouseMove$Control(sender, args);
    if (!this.GetIsDragging())
        return;
    var p = args.GetPosition(this._GetLogicalParent());
    if (!Point.Equals(p, this._PreviousPosition)) {
        this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
        this._PreviousPosition = p;
    }
};
Thumb.Instance.UpdateVisualState = function (useTransitions) {
    if (useTransitions === undefined) useTransitions = true;
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.GetIsDragging()) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this._IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }
    if (this.GetIsFocused() && this.GetIsEnabled())
        this._GoToState(useTransitions, "Focused");
    else
        this._GoToState(useTransitions, "Unfocused");
};
Thumb.Instance._RaiseDragStarted = function () {
    this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
};
Thumb.Instance._RaiseDragDelta = function (x, y) {
    this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
};
Thumb.Instance._RaiseDragCompleted = function (canceled) {
    this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
};
Thumb.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: Thumb
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderBrush"),
        Value: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: Thumb
            },
            Content: {
                Type: Grid,
                AttachedProps: [{
                    Owner: VisualStateManager,
                    Prop: "VisualStateGroups",
                    Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.Background).(SolidColorBrush.Color)")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#D8FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#8CFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#3FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.55
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
},
{
    Type: VisualStateGroup,
    Name: "FocusStates",
    Children: [
{
    Type: VisualState,
    Name: "Focused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "FocusVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Unfocused"
}]
}]
                }
],
                Children: [
{
    Type: Border,
    Name: "Background",
    Props: {
        CornerRadius: new CornerRadius(2, 2, 2, 2),
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Grid,
        Props: {
            Background: new TemplateBindingMarkup("Background"),
            Margin: new Thickness(1, 1, 1, 1)
        },
        Children: [
{
    Type: Border,
    Name: "BackgroundAnimation",
    Props: {
        Opacity: 0,
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
}]
    }
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Opacity: 0,
        IsHitTestVisible: false
    }
}]
            }
        }
    }
}]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};
Nullstone.FinishCreate(Thumb);

var Hyperlink = Nullstone.Create("Hyperlink", Span);
Nullstone.FinishCreate(Hyperlink);

var Ellipse = Nullstone.Create("Ellipse", Shape);
Ellipse.Instance.Init = function () {
    this.Init$Shape();
    this.SetStretch(Stretch.Fill);
};
Ellipse.Instance._DrawPath = function (ctx) {
    if (this._Path == null)
        this._BuildPath();
    this._DrawPath$Shape(ctx);
};
Ellipse.Instance._BuildPath = function () {
    var stretch = this.GetStretch();
    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    switch (stretch) {
        case Stretch.None:
            rect.Width = rect.Height = 0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }
    if (t >= rect.Width || t >= rect.Height) {
        rect.Width = Math.max(rect.Width, t + t * 0.001);
        rect.Height = Math.max(rect.Height, t + t * 0.001);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        this._SetShapeFlags(ShapeFlags.Normal);
    }
    var ht = -t / 2;
    rect = rect.GrowBy(ht, ht, ht, ht);
    var path = new RawPath();
    path.Ellipse(rect.X, rect.Y, rect.Width, rect.Height);
    this._Path = path;
};
Ellipse.Instance._ComputeStretchBounds = function () {
    return this._ComputeShapeBounds(false);
};
Ellipse.Instance._ComputeShapeBounds = function (logical) {
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    this._SetShapeFlags(ShapeFlags.Normal);
    var width = this.GetWidth();
    var height = this.GetHeight();
    if (rect.Width < 0.0 || rect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    var visualParent = this.GetVisualParent();
    if (visualParent != null && visualParent instanceof Canvas) {
        if (isNaN(width) !== isNaN(height)) {
            this._SetShapeFlags(ShapeFlags.Empty);
            return new Rect();
        }
    }
    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    switch (this.GetStretch()) {
        case Stretch.None:
            rect.Width = rect.Height = 0.0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }
    if (t >= rect.Width || t >= rect.Height) {
        rect.Width = Math.max(rect.Width, t + t * 0.001);
        rect.Height = Math.max(rect.Height, t + t * 0.001);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        this._SetShapeFlags(ShapeFlags.Normal);
    }
    return rect;
};
Ellipse.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    return logical ? new Rect(0, 0, 1.0, 1.0) : new Rect();
};
Nullstone.FinishCreate(Ellipse);

var Line = Nullstone.Create("Line", Shape);
Line.Instance.Init = function () {
    this.Init$Shape();
};
Line.X1Property = DependencyProperty.Register("X1", function () { return Number; }, Line, 0);
Line.Instance.GetX1 = function () {
    return this.$GetValue(Line.X1Property);
};
Line.Instance.SetX1 = function (value) {
    this.$SetValue(Line.X1Property, value);
};
Line.Y1Property = DependencyProperty.Register("Y1", function () { return Number; }, Line, 0);
Line.Instance.GetY1 = function () {
    return this.$GetValue(Line.Y1Property);
};
Line.Instance.SetY1 = function (value) {
    this.$SetValue(Line.Y1Property, value);
};
Line.X2Property = DependencyProperty.Register("X2", function () { return Number; }, Line, 0);
Line.Instance.GetX2 = function () {
    return this.$GetValue(Line.X2Property);
};
Line.Instance.SetX2 = function (value) {
    this.$SetValue(Line.X2Property, value);
};
Line.Y2Property = DependencyProperty.Register("Y2", function () { return Number; }, Line, 0);
Line.Instance.GetY2 = function () {
    return this.$GetValue(Line.Y2Property);
};
Line.Instance.SetY2 = function (value) {
    this.$SetValue(Line.Y2Property, value);
};
Line.Instance._DrawPath = function (ctx) {
    if (this._Path == null)
        this._BuildPath();
    this._DrawPath$Shape(ctx);
};
Line.Instance._BuildPath = function () {
    this._SetShapeFlags(ShapeFlags.Normal);
    this._Path = new RawPath();
    var x1 = this.GetX1();
    var y1 = this.GetY1();
    var x2 = this.GetX2();
    var y2 = this.GetY2();
    this._Path.Move(x1, y1);
    this._Path.Line(x2, y2);
};
Line.Instance._ComputeShapeBounds = function (logical) {
    var shapeBounds = new Rect();
    var thickness = 0;
    if (!logical)
        thickness = this.GetStrokeThickness();
    if (thickness <= 0.0 && !logical)
        return shapeBounds;
    var x1 = this.GetX1();
    var y1 = this.GetY1();
    var x2 = this.GetX2();
    var y2 = this.GetY2();
    shapeBounds = new Rect(
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.abs(x2 - x1),
        Math.abs(y2 - y1)
    );
    return shapeBounds;
};
Line.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Line) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }
    if (args.Property._ID == Line.X1Property._ID
        || args.Property._ID == Line.X2Property._ID
        || args.Property._ID == Line.Y1Property._ID
        || args.Property._ID == Line.Y2Property._ID) {
        this._InvalidateNaturalBounds();
    }
    this.PropertyChanged.Raise(this, args);
};
Nullstone.FinishCreate(Line);

var Path = Nullstone.Create("Path", Shape);
Path.Instance.Init = function () {
    this.Init$Shape();
};
Path.DataProperty = DependencyProperty.RegisterCore("Data", function () { return Geometry; }, Path);
Path.Instance.GetData = function () {
    return this.$GetValue(Path.DataProperty);
};
Path.Instance.SetData = function (value) {
    this.$SetValue(Path.DataProperty, value);
};
Path.Instance.SetData.Converter = function (value) {
    if (value instanceof Geometry)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.GeometryFromString(value);
    return value;
};
Path.Instance._GetFillRule = function () {
    var geom = this.GetData();
    if (geom == null)
        return this._GetFillRule$Shape();
    return geom.GetFillRule();
};
Path.Instance._DrawPath = function (ctx) {
    var geom = this.GetData();
    if (geom == null)
        return;
    geom.Draw(ctx);
};
Path.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    var geom = this.GetData();
    if (geom == null) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    if (logical)
        return geom.GetBounds();
    var thickness = (logical || !this._IsStroked()) ? 0.0 : this.GetStrokeThickness();
    return geom.GetBounds(thickness);
    return shapeBounds;
};
Path.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Path) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }
};
Path.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && propd._ID === Path.DataProperty._ID) {
        this._InvalidateNaturalBounds();
        return;
    }
    this._OnSubPropertyChanged$Shape(propd, sender, args);
};
Nullstone.FinishCreate(Path);

var Polygon = Nullstone.Create("Polygon", Shape);
Polygon.Instance.Init = function () {
    this.Init$Shape();
};
Polygon.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, Polygon, FillRule.EvenOdd);
Polygon.Instance.GetFillRule = function () {
    return this.$GetValue(Polygon.FillRuleProperty);
};
Polygon.Instance.SetFillRule = function (value) {
    this.$SetValue(Polygon.FillRuleProperty, value);
};
Polygon.PointsProperty = DependencyProperty.RegisterFull("Points", function () { return PointCollection; }, Polygon, null, { GetValue: function () { return new PointCollection(); } });
Polygon.Instance.GetPoints = function () {
    return this.$GetValue(Polygon.PointsProperty);
};
Polygon.Instance.SetPoints = function (value) {
    this.$SetValue(Polygon.PointsProperty, value);
};
Polygon.Instance.SetPoints.Converter = function (value) {
    if (value instanceof PointCollection)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.PointCollectionFromString(value);
    return value;
};
Polygon.Instance._BuildPath = function () {
    var points = this.GetPoints();
    var count;
    if (points == null || (count = points.GetCount()) < 2) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return;
    }
    this.SetShapeFlags(ShapeFlags.Normal);
    var path = new RawPath();
    if (count === 2) {
        var thickness = this.GetStrokeThickness();
        var p1 = points.GetValueAt(0);
        var p2 = points.GetValueAt(1);
        Polygon._ExtendLine(p1, p2, thickness);
        path.Move(p1.X, p1.Y);
        path.Line(p2.X, p2.Y);
    } else {
        var p = points.GetValueAt(0);
        path.Move(p.X, p.Y);
        for (var i = 1; i < count; i++) {
            p = points.GetValueAt(i);
            path.Line(p.X, p.Y);
        }
    }
    path.Close();
    this._Path = path;
};
Polygon._ExtendLine = function (p1, p2, thickness) {
    var t5 = thickness * 5.0;
    var dx = p1.X - p2.X;
    var dy = p1.Y - p2.Y;
    if (dy === 0.0) {
        t5 -= thickness / 2.0;
        if (dx > 0.0) {
            p1.X += t5;
            p2.X -= t5;
        } else {
            p1.X -= t5;
            p2.X += t5;
        }
    } else if (dx === 0.0) {
        t5 -= thickness / 2.0;
        if (dy > 0.0) {
            p1.Y += t5;
            p2.Y -= t5;
        } else {
            p1.Y -= t5;
            p2.Y += t5;
        }
    } else {
        var angle = Math.atan2(dy, dx);
        var ax = Math.abs(Math.sin(angle) * t5);
        if (dx > 0.0) {
            p1.X += ax;
            p2.X -= ax;
        } else {
            p1.X -= ax;
            p2.X += ax;
        }
        var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
        if (dy > 0.0) {
            p1.Y += ay;
            p2.Y -= ay;
        } else {
            p1.Y -= ay;
            p2.Y += ay;
        }
    }
};
Polygon.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Polygon) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }
    if (args.Property._ID === Polygon.PointsProperty._ID) {
        var oldPoints = args.OldValue;
        var newPoints = args.NewValue;
        if (newPoints != null && oldPoints != null) {
            var nc = newPoints.GetCount();
            var oc = oldPoints.GetCount();
            if (nc === oc) {
                var equal = true;
                var np;
                var op;
                for (var i = 0; i < nc; i++) {
                    np = newPoints.GetValueAt(i);
                    op = oldPoints.GetValueAt(i);
                    if (true) {
                        equal = false;
                        break;
                    }
                }
                if (equal) {
                    this.PropertyChanged.Raise(this, args);
                    return;
                }
            }
        }
        this._InvalidateNaturalBounds();
    }
    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Polygon.Instance._OnCollectionChanged = function (sender, args) {
    this._OnCollectionChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};
Polygon.Instance._OnCollectionItemChanged = function (sender, args) {
    this._OnCollectionItemChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};
Nullstone.FinishCreate(Polygon);

var Polyline = Nullstone.Create("Polyline", Shape);
Polyline.Instance.Init = function () {
    this.Init$Shape();
};
Polyline.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, Polyline, FillRule.EvenOdd);
Polyline.Instance.GetFillRule = function () {
    return this.$GetValue(Polyline.FillRuleProperty);
};
Polyline.Instance.SetFillRule = function (value) {
    this.$SetValue(Polyline.FillRuleProperty, value);
};
Polyline.PointsProperty = DependencyProperty.RegisterFull("Points", function () { return PointCollection; }, Polyline, null, { GetValue: function () { return new PointCollection(); } });
Polyline.Instance.GetPoints = function () {
    return this.$GetValue(Polyline.PointsProperty);
};
Polyline.Instance.SetPoints = function (value) {
    this.$SetValue(Polyline.PointsProperty, value);
};
Polyline.Instance.SetPoints.Converter = function (value) {
    if (value instanceof PointCollection)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.PointCollectionFromString(value);
    return value;
};
Polyline.Instance._BuildPath = function () {
    var points = this.GetPoints();
    var count;
    if (points == null || (count = points.GetCount()) < 2) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return;
    }
    this._SetShapeFlags(ShapeFlags.Normal);
    this._Path = new RawPath();
    var p = points.GetValueAt(0);
    this._Path.Move(p.X, p.Y);
    for (var i = 1; i < count; i++) {
        p = points.GetValueAt(i);
        this._Path.Line(p.X, p.Y);
    }
};
Polyline.Instance._CanFill = function () { return true; };
Polyline.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Polyline) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }
    if (args.Property._ID === Polyline.PointsProperty._ID) {
        this._InvalidateNaturalBounds();
    }
    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Polyline.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(Polyline.PointsProperty, sender)) {
        this._OnCollectionChanged$Shape(sender, args);
        return;
    }
    this._InvalidateNaturalBounds();
};
Polyline.Instance._OnCollectionItemChanged = function (sender, args) {
    this._OnCollectionItemChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};
Nullstone.FinishCreate(Polyline);

var Rectangle = Nullstone.Create("Rectangle", Shape);
Rectangle.Instance.Init = function () {
    this.Init$Shape();
    this.SetStretch(Stretch.Fill);
};
Rectangle.RadiusXProperty = DependencyProperty.Register("RadiusX", function () { return Number; }, Rectangle, 0.0);
Rectangle.Instance.GetRadiusX = function () {
    return this.$GetValue(Rectangle.RadiusXProperty);
};
Rectangle.Instance.SetRadiusX = function (value) {
    this.$SetValue(Rectangle.RadiusXProperty, value);
};
Rectangle.RadiusYProperty = DependencyProperty.Register("RadiusY", function () { return Number; }, Rectangle, 0.0);
Rectangle.Instance.GetRadiusY = function () {
    return this.$GetValue(Rectangle.RadiusYProperty);
};
Rectangle.Instance.SetRadiusY = function (value) {
    this.$SetValue(Rectangle.RadiusYProperty, value);
};
Rectangle.Instance._DrawPath = function (ctx) {
    if (this._Path == null)
        this._BuildPath();
    this._DrawPath$Shape(ctx);
};
Rectangle.Instance._BuildPath = function () {
    var stretch = this.GetStretch();
    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    var radiusX = this.GetRadiusX();
    var radiusY = this.GetRadiusY();
    switch (stretch) {
        case Stretch.None:
            rect.Width = rect.Height = 0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }
    if (rect.Width === 0)
        rect.X = t * 0.5;
    if (rect.Height === 0)
        rect.Y = t * 0.5;
    var ta;
    if (t >= rect.Width || t >= rect.Height) {
        ta = t * 0.001;
        rect = rect.GrowBy(ta, ta, ta, ta);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        ta = -t * 0.5;
        rect = rect.GrowBy(ta, ta, ta, ta);
        this._SetShapeFlags(ShapeFlags.Normal);
    }
    var path = new RawPath();
    if ((radiusX === 0.0 && radiusY === 0.0) || (radiusX === radiusY))
        path.RoundedRect(rect.X, rect.Y, rect.Width, rect.Height, radiusX, radiusY);
    else
        NotImplemented("Rectangle._BuildPath with RadiusX !== RadiusY");
    this._Path = path;
};
Rectangle.Instance._ComputeStretchBounds = function () {
    return this._ComputeShapeBounds(false);
};
Rectangle.Instance._ComputeShapeBounds = function (logical) {
    var rect = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
    this._SetShapeFlags(ShapeFlags.Normal);
    var width = this.GetWidth();
    var height = this.GetHeight();
    if (rect.Width < 0.0 || rect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    var visualParent = this.GetVisualParent();
    if (visualParent != null && visualParent instanceof Canvas) {
        if (isNaN(width) !== isNaN(height)) {
            this._SetShapeFlags(ShapeFlags.Empty);
            return new Rect();
        }
    }
    var t = this._IsStroked() ? this.GetStrokeThickness() : 0.0;
    switch (this.GetStretch()) {
        case Stretch.None:
            rect.Width = rect.Height = 0.0;
            break;
        case Stretch.Uniform:
            rect.Width = rect.Height = Math.min(rect.Width, rect.Height);
            break;
        case Stretch.UniformToFill:
            rect.Width = rect.Height = Math.max(rect.Width, rect.Height);
            break;
        case Stretch.Fill:
            break;
    }
    if (rect.Width === 0)
        rect.X = t * 0.5;
    if (rect.Height === 0)
        rect.Y = t * 0.5;
    if (t >= rect.Width || t >= rect.Height) {
        var g = t * 0.5005;
        rect = rect.GrowBy(g, g, g, g);
        this._SetShapeFlags(ShapeFlags.Degenerate);
    } else {
        this._SetShapeFlags(ShapeFlags.Normal);
    }
    return rect;
};
Rectangle.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    return logical ? new Rect(0, 0, 1.0, 1.0) : new Rect();
};
Rectangle.Instance._GetCoverageBounds = function () {
    var fill = this.GetFill();
    if (fill != null && fill.IsOpaque()) {
        var halfST = this.GetStrokeThickness / 2.0;
        var xr = this.GetRadiusX() + halfST;
        var yr = this.GetRadiusY() + halfST;
        return this._Bounds.GrowBy(-xr, -yr).RoundIn();
    }
    return new Rect();
}
Rectangle.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Rectangle) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }
    if (args.Property._ID === Rectangle.RadiusXProperty || args.Property._ID === Rectangle.RadiusYProperty) {
        this._InvalidateMeasure();
        this._InvalidatePathCache();
    }
    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Nullstone.FinishCreate(Rectangle);

var Canvas = Nullstone.Create("Canvas", Panel);
Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", function () { return Number; }, Canvas, 0.0);
Canvas.GetLeft = function (d) {
    return d.$GetValue(Canvas.LeftProperty);
};
Canvas.SetLeft = function (d, value) {
    d.$SetValue(Canvas.LeftProperty, value);
};
Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", function () { return Number; }, Canvas, 0.0);
Canvas.GetTop = function (d) {
    return d.$GetValue(Canvas.TopProperty);
};
Canvas.SetTop = function (d, value) {
    d.$SetValue(Canvas.TopProperty, value);
};
Canvas.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () { return Number; }, Canvas, 0);
Canvas.GetZIndex = function (d) {
    return d.$GetValue(Canvas.ZIndexProperty);
};
Canvas.SetZIndex = function (d, value) {
    d.$SetValue(Canvas.ZIndexProperty, value);
};
Canvas.ZProperty = DependencyProperty.RegisterAttached("Z", function () { return Number; }, Canvas, NaN);
Canvas.GetZ = function (d) {
    return d.$GetValue(Canvas.ZProperty);
};
Canvas.SetZ = function (d, value) {
    d.$SetValue(Canvas.ZProperty, value);
};
Nullstone.FinishCreate(Canvas);

var Grid = Nullstone.Create("Grid", Panel);
Grid.Instance.Init = function () {
    this.Init$Panel();
    this._RowMatrix = null;
    this._ColMatrix = null;
};
Grid.ColumnProperty = DependencyProperty.RegisterAttached("Column", function () { return Number; }, Grid, 0);
Grid.GetColumn = function (d) {
    return d.$GetValue(Grid.ColumnProperty);
};
Grid.SetColumn = function (d, value) {
    d.$SetValue(Grid.ColumnProperty, value);
};
Grid.ColumnSpanProperty = DependencyProperty.RegisterAttached("ColumnSpan", function () { return Number; }, Grid, 1);
Grid.GetColumnSpan = function (d) {
    return d.$GetValue(Grid.ColumnSpanProperty);
};
Grid.SetColumnSpan = function (d, value) {
    d.$SetValue(Grid.ColumnSpanProperty, value);
};
Grid.RowProperty = DependencyProperty.RegisterAttached("Row", function () { return Number; }, Grid, 0);
Grid.GetRow = function (d) {
    return d.$GetValue(Grid.RowProperty);
};
Grid.SetRow = function (d, value) {
    d.$SetValue(Grid.RowProperty, value);
};
Grid.RowSpanProperty = DependencyProperty.RegisterAttached("RowSpan", function () { return Number; }, Grid, 1);
Grid.GetRowSpan = function (d) {
    return d.$GetValue(Grid.RowSpanProperty);
};
Grid.SetRowSpan = function (d, value) {
    d.$SetValue(Grid.RowSpanProperty, value);
};
Grid.ShowGridLinesProperty = DependencyProperty.Register("ShowGridLines", function () { return Boolean; }, Grid, false);
Grid.Instance.GetShowGridLines = function () {
    return this.$GetValue(Grid.ShowGridLinesProperty);
};
Grid.Instance.SetShowGridLines = function (value) {
    this.$SetValue(Grid.ShowGridLinesProperty, value);
};
Grid.ColumnDefinitionsProperty = DependencyProperty.RegisterFull("ColumnDefinitions", function () { return ColumnDefinitionCollection; }, Grid, null, { GetValue: function () { return new ColumnDefinitionCollection(); } });
Grid.Instance.GetColumnDefinitions = function () {
    return this.$GetValue(Grid.ColumnDefinitionsProperty);
};
Grid.RowDefinitionsProperty = DependencyProperty.RegisterFull("RowDefinitions", function () { return RowDefinitionCollection; }, Grid, null, { GetValue: function () { return new RowDefinitionCollection(); } });
Grid.Instance.GetRowDefinitions = function () {
    return this.$GetValue(Grid.RowDefinitionsProperty);
};
Grid.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var totalSize = availableSize.Copy();
    var cols = this._GetColumnDefinitionsNoAutoCreate();
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var colCount = cols ? cols.GetCount() : 0;
    var rowCount = rows ? rows.GetCount() : 0;
    var totalStars = new Size(0, 0);
    var emptyRows = rowCount === 0;
    var emptyCols = colCount === 0;
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
            if (height.Type === GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(height.Value);
                rowdef.SetActualHeight(cell._SetDesiredToOffered());
            } else if (height.Type === GridUnitType.Star) {
                cell._Stars = height.Value;
                totalStars.Height += height.Value;
            } else if (height.Type === GridUnitType.Auto) {
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
            if (width.Type === GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(width.Value);
                coldef.SetActualWidth(cell._SetDesiredToOffered());
            } else if (width.Type === GridUnitType.Star) {
                cell._Stars = width.Value;
                totalStars.Width += width.Value;
            } else if (width.Type === GridUnitType.Auto) {
                cell._OfferedSize = cell._Clamp(0);
                cell._SetDesiredToOffered();
            }
            this._ColMatrix[i][i] = cell;
        }
    }
    var sizes = new LinkedList();
    var separator = new _GridNode(null, 0, 0, 0);
    sizes.Append(separator);
    var c;
    var r;
    var node;
    var gridWalker = new _GridWalker(this, this._RowMatrix, this._RowMatrixDim, this._ColMatrix, this._ColMatrixDim);
    for (i = 0; i < 6; i++) {
        var autoAuto = i === 0;
        var starAuto = i === 1;
        var autoStar = i === 2;
        var starAutoAgain = i === 3;
        var nonStar = i === 4;
        var remainingStar = i === 5;
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
            for (r = row; r < row + rowspan; r++) {
                starRow |= this._RowMatrix[r][r]._Type === GridUnitType.Star;
                autoRow |= this._RowMatrix[r][r]._Type === GridUnitType.Auto;
            }
            for (c = col; c < col + colspan; c++) {
                starCol |= this._ColMatrix[c][c]._Type === GridUnitType.Star;
                autoCol |= this._ColMatrix[c][c]._Type === GridUnitType.Auto;
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
                sizes.InsertBefore(node, node._Row === node._Col ? separator.Next : separator);
            }
            node = new _GridNode(this._ColMatrix, col + colspan - 1, col, desired.Width);
            sizes.InsertBefore(node, node._Row === node._Col ? separator.Next : separator);
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
Grid.Instance._ArrangeOverrideWithError = function (finalSize, error) {
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
    if (totalConsumed.Width !== finalSize.Width)
        this._ExpandStarCols(finalSize);
    if (totalConsumed.Height !== finalSize.Height)
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
Grid.Instance._ExpandStarRows = function (availableSize) {
    var availSize = availableSize.Copy();
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var rowsCount = rows ? rows.GetCount() : 0;
    var i;
    var cur;
    for (i = 0; i < this._RowMatrixDim; i++) {
        cur = this._RowMatrix[i][i];
        if (cur._Type === GridUnitType.Star)
            cur._OfferedSize = 0;
        else
            availSize.Height = Math.max(availSize.Height - cur._OfferedSize, 0);
    }
    availSize.Height = this._AssignSize(this._RowMatrix, 0, this._RowMatrixDim - 1, availSize.Height, GridUnitType.Star, false);
    if (rowsCount > 0) {
        for (i = 0; i < this._RowMatrixDim; i++) {
            cur = this._RowMatrix[i][i];
            if (cur._Type === GridUnitType.Star)
                rows.GetValueAt(i).SetActualHeight(cur._OfferedSize);
        }
    }
};
Grid.Instance._ExpandStarCols = function (availableSize) {
    var availSize = availableSize.Copy();
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var columnsCount = columns ? columns.GetCount() : 0;
    var i;
    var cur;
    for (i = 0; i < this._ColMatrixDim; i++) {
        cur = this._ColMatrix[i][i];
        if (cur._Type === GridUnitType.Star)
            cur._OfferedSize = 0;
        else
            availSize.Width = Math.max(availSize.Width - cur._OfferedSize, 0);
    }
    availSize.Width = this._AssignSize(this._ColMatrix, 0, this._ColMatrixDim - 1, availSize.Width, GridUnitType.Star, false);
    if (columnsCount > 0) {
        for (i = 0; i < this._ColMatrixDim; i++) {
            cur = this._ColMatrix[i][i];
            if (cur._Type === GridUnitType.Star) {
                columns.GetValueAt(i).SetActualWidth(cur._OfferedSize);
            }
        }
    }
};
Grid.Instance._AllocateDesiredSize = function (rowCount, colCount) {
    for (var i = 0; i < 2; i++) {
        var matrix = i === 0 ? this._RowMatrix : this._ColMatrix;
        var count = i === 0 ? rowCount : colCount;
        for (var row = count - 1; row >= 0; row--) {
            for (var col = row; col >= 0; col--) {
                var spansStar = false;
                for (var j = row; j >= col; j--) {
                    spansStar |= matrix[j][j]._Type === GridUnitType.Star;
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
Grid.Instance._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
    var count = 0;
    var assigned;
    var segmentSize;
    var i;
    var cur;
    for (i = start; i <= end; i++) {
        cur = matrix[i][i];
        segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
        if (segmentSize < cur._Max)
            count += (unitType === GridUnitType.Star) ? cur._Stars : 1;
    }
    do {
        assigned = false;
        var contribution = size / count;
        for (i = start; i <= end; i++) {
            cur = matrix[i][i];
            segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
            if (!(cur._Type === unitType && segmentSize < cur._Max))
                continue;
            var newSize = segmentSize;
            newSize += contribution * (unitType === GridUnitType.Star ? cur._Stars : 1);
            newSize = Math.min(newSize, cur._Max);
            assigned |= newSize > segmentSize;
            size -= newSize - segmentSize;
            if (desiredSize)
                cur._DesiredSize = newSize;
            else
                cur._OfferedSize = newSize;
        }
    } while (assigned);
    return size;
};
Grid.Instance._CreateMatrices = function (rowCount, colCount) {
    if (this._RowMatrix == null || this._ColMatrix == null || this._RowMatrixDim !== rowCount || this._ColMatrixDim !== colCount) {
        this._DestroyMatrices();
        this._RowMatrixDim = rowCount;
        this._RowMatrix = [];
        for (var i = 0; i < rowCount; i++) {
            this._RowMatrix.push([]);
        }
        this._ColMatrixDim = colCount;
        this._ColMatrix = [];
        for (var j = 0; j < colCount; j++) {
            this._ColMatrix.push([]);
        }
    }
    for (var r = 0; r < rowCount; r++) {
        this._RowMatrix[r] = [];
        for (var rr = 0; rr <= r; rr++) {
            this._RowMatrix[r].push(new _Segment());
        }
    }
    for (var c = 0; c < colCount; c++) {
        this._ColMatrix[c] = [];
        for (var cc = 0; cc <= c; cc++) {
            this._ColMatrix[c].push(new _Segment());
        }
    }
};
Grid.Instance._DestroyMatrices = function () {
    this._RowMatrix = null;
    this._ColMatrix = null;
};
Grid.Instance._SaveMeasureResults = function () {
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
Grid.Instance._RestoreMeasureResults = function () {
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
Grid.Instance._ComputeBounds = function () {
    this._ComputeBounds$Panel();
    if (this.GetShowGridLines()) {
        this._Extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
        this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/* .GrowByThickness(this._EffectPadding) */, false); //.Transform(this._AbsoluteTransform);
        this._BoundsWithChildren = this._BoundsWithChildren.Union(this._Bounds);
        this._ComputeGlobalBounds();
        this._ComputeSurfaceBounds();
    }
};
Grid.Instance._GetRowDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.RowDefinitionsProperty);
    return value === undefined ? null : value;
}
Grid.Instance._GetColumnDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.ColumnDefinitionsProperty);
    return value === undefined ? null : value;
}
Grid.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Grid) {
        this._OnPropertyChanged$Panel(args, error);
        return;
    }
    if (args.Property._ID === Grid.ShowGridLinesProperty._ID) {
        this._Invalidate();
    }
    this._InvalidateMeasure();
    this.PropertyChanged.Raise(this, args);
};
Grid.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Grid.ColumnDefinitionsProperty, sender)
        || this._PropertyHasValueNoAutoCreate(Grid.RowDefinitionsProperty, sender)) {
        this._InvalidateMeasure();
    } else {
        this._OnCollectionChanged$Panel(sender, args);
    }
};
Grid.Instance._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property._ID === Grid.ColumnProperty._ID
            || args.Property._ID === Grid.RowProperty._ID
            || args.Property._ID === Grid.ColumnSpanProperty._ID
            || args.Property._ID === Grid.RowSpanProperty._ID) {
            this._InvalidateMeasure();
            args.Item._InvalidateMeasure();
            return;
        }
    } else if (Nullstone.RefEquals(sender, this._GetColumnDefinitionsNoAutoCreate())
        || Nullstone.RefEquals(sender, this._GetRowDefinitionsNoAutoCreate())) {
        if (args.Property._ID !== ColumnDefinition.ActualWidthProperty._ID
            && args.Property._ID !== RowDefinition.ActualHeightProperty._ID) {
            this._InvalidateMeasure();
        }
        return;
    }
    this._OnCollectionChanged$Panel(sender, args);
};
Grid.__DebugMatrix = function (matrix) {
    var str = "";
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            str += "[";
            str += matrix[i][j].toString();
            str += "]";
        }
        str += "\n";
    }
    return str;
};
Grid.__DebugDiagonalMatrix = function (matrix) {
    var str = "";
    for (var i = 0; i < matrix.length; i++) {
        str += "[";
        str += matrix[i][i].toString();
        str += "]";
        str += "\n";
    }
    return str;
};
Nullstone.FinishCreate(Grid);
var _Segment = Nullstone.Create("_Segment", null, 4);
_Segment.Instance.Init = function (offered, min, max, unitType) {
    if (offered == null) offered = 0.0;
    if (min == null) min = 0.0;
    if (max == null) max = Number.POSITIVE_INFINITY;
    if (unitType == null) unitType = GridUnitType.Pixel;
    this._DesiredSize = 0;
    this._Min = min;
    this._Max = max;
    this._Stars = 0;
    this._Type = unitType;
    this._OfferedSize = this._Clamp(offered);
    this._OriginalSize = this._OfferedSize;
};
_Segment.Instance._SetOfferedToDesired = function () {
    this._OfferedSize = this._DesiredSize;
    return this._OfferedSize;
};
_Segment.Instance._SetDesiredToOffered = function () {
    this._DesiredSize = this._OfferedSize;
    return this._DesiredSize;
};
_Segment.Instance._Clamp = function (value) {
    if (value < this._Min)
        return this._Min;
    if (value > this._Max)
        return this._Max;
    return value;
}
_Segment.Instance.toString = function () {
    return this._OfferedSize.toString() + ";" + this._DesiredSize.toString();
};
Nullstone.FinishCreate(_Segment);
var _GridNode = Nullstone.Create("_GridNode", LinkedListNode, 4);
_GridNode.Instance.Init = function (matrix, row, col, size) {
    this._Matrix = matrix;
    this._Row = row;
    this._Col = col;
    this._Size = size;
    this._Cell = this._Matrix == null ? null : this._Matrix[row][col];
};
Nullstone.FinishCreate(_GridNode);
var _GridWalker = Nullstone.Create("_GridWalker", null, 5);
_GridWalker.Instance.Init = function (grid, rowMatrix, rowCount, colMatrix, colCount) {
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
            starRow |= rowMatrix[r][r].Type === GridUnitType.Star;
            autoRow |= rowMatrix[r][r].Type === GridUnitType.Auto;
        }
        for (var c = col; c < col + colspan; c++) {
            starCol |= colMatrix[c][c].Type === GridUnitType.Star;
            autoCol |= colMatrix[c][c].Type === GridUnitType.Auto;
        }
        this._HasAutoAuto |= autoRow && autoCol && !starRow && !starCol;
        this._HasStarAuto |= starRow && autoCol;
        this._HasAutoStar |= autoRow && starCol;
    }
};
Nullstone.FinishCreate(_GridWalker);

var PasswordBox = Nullstone.Create("PasswordBox", TextBoxBase);
PasswordBox.Instance.Init = function () {
    this.Init$TextBoxBase();
    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
};
Nullstone.FinishCreate(PasswordBox);

var TextBox = Nullstone.Create("TextBox", TextBoxBase);
TextBox.Instance.Init = function () {
    this.Init$TextBoxBase();
    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;
    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
};
TextBox.AcceptsReturnProperty = DependencyProperty.RegisterCore("AcceptsReturn", function () { return Boolean; }, TextBox, false);
TextBox.Instance.GetAcceptsReturn = function () {
    return this.$GetValue(TextBox.AcceptsReturnProperty);
};
TextBox.Instance.SetAcceptsReturn = function (value) {
    this.$SetValue(TextBox.AcceptsReturnProperty, value);
};
TextBox.CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", function () { return Brush; }, TextBox);
TextBox.Instance.GetCaretBrush = function () {
    return this.$GetValue(TextBox.CaretBrushProperty);
};
TextBox.Instance.SetCaretBrush = function (value) {
    this.$SetValue(TextBox.CaretBrushProperty, value);
};
TextBox.MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", function () { return Number; }, TextBox, 0, null, null, null, TextBox.PositiveIntValidator);
TextBox.Instance.GetMaxLength = function () {
    return this.$GetValue(TextBox.MaxLengthProperty);
};
TextBox.Instance.SetMaxLength = function (value) {
    this.$SetValue(TextBox.MaxLengthProperty, value);
};
TextBox.PositiveIntValidator = function (instance, propd, value, error) {
    if (typeof value !== 'number')
        return false;
    return value >= 0;
};
TextBox.IsReadOnlyProperty = DependencyProperty.RegisterCore("IsReadOnly", function () { return Boolean; }, TextBox);
TextBox.Instance.GetIsReadOnly = function () {
    return this.$GetValue(TextBox.IsReadOnlyProperty);
};
TextBox.Instance.SetIsReadOnly = function (value) {
    this.$SetValue(TextBox.IsReadOnlyProperty, value);
};
TextBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () { return Brush; }, TextBox);
TextBox.Instance.GetSelectionForeground = function () {
    return this.$GetValue(TextBox.SelectionForegroundProperty);
};
TextBox.Instance.SetSelectionForeground = function (value) {
    this.$SetValue(TextBox.SelectionForegroundProperty, value);
};
TextBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () { return Brush; }, TextBox);
TextBox.Instance.GetSelectionBackground = function () {
    return this.$GetValue(TextBox.SelectionBackgroundProperty);
};
TextBox.Instance.SetSelectionBackground = function (value) {
    this.$SetValue(TextBox.SelectionBackgroundProperty, value);
};
TextBox.BaselineOffsetProperty = DependencyProperty.RegisterCore("BaselineOffset", function () { return Number; }, TextBox);
TextBox.Instance.GetBaselineOffset = function () {
    return this.$GetValue(TextBox.BaselineOffsetProperty);
};
TextBox.Instance.SetBaselineOffset = function (value) {
    this.$SetValue(TextBox.BaselineOffsetProperty, value);
};
TextBox.SelectedTextProperty = DependencyProperty.RegisterFull("SelectedText", function () { return String; }, TextBox, "", null, null, true);
TextBox.Instance.GetSelectedText = function () {
    return this.$GetValue(TextBox.SelectedTextProperty);
};
TextBox.SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", function () { return Number; }, TextBox, 0, null, null, true, TextBox.PositiveIntValidator);
TextBox.Instance.GetSelectionLength = function () {
    return this.$GetValue(TextBox.SelectionLengthProperty);
};
TextBox.Instance.SetSelectionLength = function (value) {
    this.$SetValue(TextBox.SelectionLengthProperty, value);
};
TextBox.SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", function () { return Number; }, TextBox, 0, null, null, true, TextBox.PositiveIntValidator);
TextBox.Instance.GetSelectionStart = function () {
    return this.$GetValue(TextBox.SelectionStartProperty);
};
TextBox.Instance.SetSelectionStart = function (value) {
    this.$SetValue(TextBox.SelectionStartProperty, value);
};
TextBox.TextProperty = DependencyProperty.RegisterCore("Text", function () { return String; }, TextBox);
TextBox.Instance.GetText = function () {
    return this.$GetValue(TextBox.TextProperty);
};
TextBox.Instance.SetText = function (value) {
    this.$SetValue(TextBox.TextProperty, value);
};
TextBox.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () { return new Enum(TextAlignment); }, TextBox, TextAlignment.Left);
TextBox.Instance.GetTextAlignment = function () {
    return this.$GetValue(TextBox.TextAlignmentProperty);
};
TextBox.Instance.SetTextAlignment = function (value) {
    this.$SetValue(TextBox.TextAlignmentProperty, value);
};
TextBox.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () { return new Enum(TextWrapping); }, TextBox, TextWrapping.NoWrap);
TextBox.Instance.GetTextWrapping = function () {
    return this.$GetValue(TextBox.TextWrappingProperty);
};
TextBox.Instance.SetTextWrapping = function (value) {
    this.$SetValue(TextBox.TextWrappingProperty, value);
};
TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("HorizontalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, TextBox, ScrollBarVisibility.Hidden);
TextBox.Instance.GetHorizontalScrollBarVisibility = function () {
    return this.$GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.Instance.SetHorizontalScrollBarVisibility = function (value) {
    this.$SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};
TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("VerticalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, TextBox, ScrollBarVisibility.Hidden);
TextBox.Instance.GetVerticalScrollBarVisibility = function () {
    return this.$GetValue(TextBox.VerticalScrollBarVisibilityProperty);
};
TextBox.Instance.SetVerticalScrollBarVisibility = function (value) {
    this.$SetValue(TextBox.VerticalScrollBarVisibilityProperty, value);
};
TextBox.Instance.GetIsMouseOver = function () {
    return this._IsMouseOver;
};
TextBox.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$TextBoxBase();
    if (!this._ContentElement)
        return;
    var prop;
    if ((prop = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
        this._ContentElement.$SetValue(prop, this.$GetValue(TextBox.VerticalScrollBarVisibilityProperty));
    if ((prop = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
        if (this.GetTextWrapping() === TextWrapping.Wrap)
            this._ContentElement.$SetValue(prop, ScrollBarVisibility.Disabled);
        else
            this._ContentElement.$SetValue(prop, this.$GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
    }
};
TextBox.Instance._SyncSelectedText = function () {
    if (this._SelectionCursor !== this._SelectionAnchor) {
        var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        var len = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        var text = this._Buffer._Text == null ? '' : this._Buffer._Text.substr(start, len);
        this._SettingValue = false;
        this._SetValueInternal(TextBox.SelectedTextProperty, text);
        this._SettingValue = true;
    } else {
        this._SettingValue = false;
        this._SetValueInternal(TextBox.SelectedTextProperty, "");
        this._SettingValue = true;
    }
};
TextBox.Instance._EmitSelectionChanged = function () {
    this.SelectionChanged.RaiseAsync(this, {});
};
TextBox.Instance.GetDisplayText = function () {
    return this.GetText();
};
TextBox.Instance._SyncText = function () {
    this._SettingValue = false;
    this._SetValueInternal(TextBox.TextProperty, this._Buffer._Text);
    this._SettingValue = true;
};
TextBox.Instance._EmitTextChanged = function () {
    this.TextChanged.RaiseAsync(this, {});
};
TextBox.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextBox) {
        this._OnPropertyChanged$TextBoxBase(args, error);
        return;
    }
    var changed = _TextBoxModelChanged.Nothing;
    var propd;
    var start;
    var length;
    var action;
    var value;
    var text;
    if (args.Property._ID === TextBox.AcceptsReturnProperty._ID) {
        this._AcceptsReturn = args.NewValue === true;
    } else if (args.Property._ID === TextBox.CaretBrushProperty._ID) {
    } else if (args.Property._ID === TextBox.IsReadOnlyProperty._ID) {
        this._IsReadOnly = args.NewValue === true;
        if (this._IsFocused) {
            if (this._IsReadOnly) {
                this._ResetIMContext();
            } else {
            }
        }
        if (this._View)
            this._View.SetEnableCursor(!this._IsReadOnly);
    } else if (args.Property._ID === TextBox.MaxLengthProperty._ID) {
        this._MaxLength = args.NewValue === true;
    } else if (args.Property._ID === TextBox.SelectedTextProperty._ID) {
        if (this._SettingValue) {
            value = args.NewValue;
            text = !value ? '' : value;
            length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            start = Math.min(this._SelectionAnchor, this._SelectionCursor);
            if (text) {
                if (length > 0) {
                    action = new _TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length, text);
                    this._Buffer.Replace(start, length, text);
                } else if (text.length > 0) {
                    action = new _TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, start, text);
                    this._Buffer.Insert(start, text);
                }
                if (action != null) {
                    this._Emit |= _TextBoxEmitChanged.TEXT;
                    this._Undo.Push(action);
                    this._Redo.Clear();
                    this.ClearSelection(start + text.length);
                    this._ResetIMContext();
                    this._SyncAndEmit();
                }
            }
        }
    } else if (args.Property._ID === TextBox.SelectionStartProperty._ID) {
        length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        start = args.NewValue;
        if (start > this._Buffer.GetLength()) {
            this.SetSelectionStart(this._Buffer.GetLength());
            return;
        }
        if (start + length > this._Buffer.GetLength()) {
            this._BatchPush();
            length = this._Buffer.GetLength() - start;
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
    } else if (args.Property._ID === TextBox.SelectionLengthProperty._ID) {
        start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        length = args.NewValue;
        if (start + length > this._Buffer.GetLength()) {
            length = this._Buffer.GetLength() - start;
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
    } else if (args.Property._ID === TextBox.SelectionBackgroundProperty._ID) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property._ID === TextBox.SelectionForegroundProperty._ID) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property._ID === TextBox.TextProperty._ID) {
        value = args.NewValue;
        text = !value ? '' : value;
        if (this._SettingValue) {
            if (text) {
                if (this._Buffer.GetLength() > 0) {
                    action = new _TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, 0, this._Buffer.GetLength(), text);
                    this._Buffer.Replace(0, this._Buffer.GetLength(), text);
                } else {
                    action = new _TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, 0, text);
                    this._Buffer.Prepend(text);
                }
                this._Undo.Push(action);
                this._Redo.Clear();
                this._Emit |= _TextBoxEmitChanged.TEXT;
                this.ClearSelection(0);
                this._ResetIMContext();
                this._SyncAndEmit(false);
            }
        }
        changed = _TextBoxModelChanged.Text;
    } else if (args.Property._ID === TextBox.TextAlignmentProperty._ID) {
        changed = _TextBoxModelChanged.TextAlignment;
    } else if (args.Property._ID === TextBox.TextWrappingProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (args.NewValue === TextWrapping.Wrap)
                    this._ContentElement.$SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.$SetValue(propd, this.$GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
            }
        }
        changed = _TextBoxModelChanged.TextWrapping
    } else if (args.Property._ID === TextBox.HorizontalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (this.GetTextWrapping() === TextWrapping.Wrap)
                    this._ContentElement.$SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.$SetValue(propd, args.NewValue);
            }
        }
    } else if (args.Property._ID === TextBox.VerticalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
                this._ContentElement.$SetValue(propd, args.NewValue);
        }
    }
    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));
    this.PropertyChanged.Raise(this, args);
};
TextBox.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === TextBox.SelectionBackgroundProperty._ID
        || propd._ID === TextBox.SelectionForegroundProperty._ID)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush));
        this._Invalidate();
    }
    if (propd == null || propd.OwnerType !== TextBox)
        this._OnSubPropertyChanged$TextBoxBase(propd, sender, args);
};
TextBox.Instance.OnMouseEnter = function (sender, args) {
    this._IsMouseOver = true;
    this._ChangeVisualState(true);
    this.OnMouseEnter$TextBoxBase(sender, args);
};
TextBox.Instance.OnMouseLeave = function (sender, args) {
    this._IsMouseOver = false;
    this._ChangeVisualState(true);
    this.OnMouseLeave$TextBoxBase(sender, args);
};
TextBox.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$TextBoxBase(sender, args);
    this._ChangeVisualState(true);
};
TextBox.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$TextBoxBase(sender, args);
    this._ChangeVisualState(true);
};
TextBox.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        VisualStateManager.GoToState(this, "Disabled", useTransitions);
    } else if (this.GetIsReadOnly()) {
        VisualStateManager.GoToState(this, "ReadOnly", useTransitions);
    } else if (this.GetIsMouseOver()) {
        VisualStateManager.GoToState(this, "MouseOver", useTransitions);
    } else {
        VisualStateManager.GoToState(this, "Normal", useTransitions);
    }
    if (this.GetIsFocused()) {
        VisualStateManager.GoToState(this, "Focused", useTransitions);
    } else {
        VisualStateManager.GoToState(this, "Unfocused", useTransitions);
    }
};
TextBox.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: TextBox
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Cursor"),
                    Value: CursorType.IBeam
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderThickness"),
                    Value: new Thickness(1, 1, 1, 1)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
                    Value: new SolidColorBrush(Color.FromHex("#FFFFFFFF"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
                    Value: new SolidColorBrush(Color.FromHex("#FF000000"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
                    Value: new Thickness(2, 2, 2, 2)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
                    Value: {
                        Type: LinearGradientBrush,
                        Props: {
                            StartPoint: new Point(0.5, 0),
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
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Template"),
                    Value: new ControlTemplate(TextBox, {
                        Type: Grid,
                        Name: "RootElement",
                        AttachedProps: [
                            {
                                Owner: VisualStateManager,
                                Prop: "VisualStateGroups",
                                Value: [
                                    {
                                        Type: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Normal"
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "MouseOver",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#FF99C1E2") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "MouseOverBorder" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Disabled",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "DisabledVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "ReadOnly",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "ReadOnlyVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        Type: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Focused",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Unfocused",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 0.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        Children: [
                            {
                                Type: Border,
                                Name: "Border",
                                Props: {
                                    CornerRadius: new CornerRadius(1, 1, 1, 1),
                                    Opacity: 1.0,
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background"),
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush")
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
                                                    Padding: new TemplateBindingMarkup("Padding"),
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
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Opacity: 0.0,
                                    IsHitTestVisible: false
                                }
                            },
                            {
                                Type: Border,
                                Name: "FocusVisualElement",
                                Props: {
                                    BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Margin: new Thickness(1, 1, 1, 1),
                                    Opacity: 0.0,
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
Nullstone.FinishCreate(TextBox);

var ContentControl = Nullstone.Create("ContentControl", Control);
ContentControl._FallbackTemplate = (function () {
    return new ControlTemplate(ContentControl, {
        Type: Grid,
        Children: [
            {
                Type: TextBlock,
                Props: {
                    Text: new BindingMarkup()
                }
            }
        ]
    });
})();
ContentControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, ContentControl);
ContentControl.Instance.GetContent = function () {
    return this.$GetValue(ContentControl.ContentProperty);
};
ContentControl.Instance.SetContent = function (value) {
    this.$SetValue(ContentControl.ContentProperty, value);
};
ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentControl);
ContentControl.Instance.GetContentTemplate = function () {
    return this.$GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentControl.ContentTemplateProperty, value);
};
ContentControl.Instance.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentControl.Instance._GetDefaultTemplate = function () {
    return this.GetFallbackRoot();
};
ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};
Nullstone.FinishCreate(ContentControl);

var ScrollViewer = Nullstone.Create("ScrollViewer", ContentControl);
ScrollViewer.Instance.Init = function () {
    this.Init$ContentControl();
    this.RequestBringIntoView.Subscribe(this._OnRequestBringIntoView, this);
};
ScrollViewer.OnScrollBarVisibilityPropertyChanged = function (d, args) {
    if (d == null)
        return;
    d._InvalidateMeasure();
    var scrollInfo = d.GetScrollInfo();
    if (scrollInfo != null) {
        scrollInfo.SetCanHorizontallyScroll(d.GetHorizontalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
        scrollInfo.SetCanVerticallyScroll(d.GetVerticalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    }
    d._UpdateScrollBarVisibility();
};
ScrollViewer.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("HorizontalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, ScrollViewer, ScrollBarVisibility.Disabled, ScrollViewer.OnScrollBarVisibilityPropertyChanged);
ScrollViewer.Instance.GetHorizontalScrollBarVisibility = function () {
    return this.$GetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetHorizontalScrollBarVisibility = function (value) {
    this.$SetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty, value);
};
ScrollViewer.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("VerticalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, ScrollViewer, ScrollBarVisibility.Disabled, ScrollViewer.OnScrollBarVisibilityPropertyChanged);
ScrollViewer.Instance.GetVerticalScrollBarVisibility = function () {
    return this.$GetValue(ScrollViewer.VerticalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetVerticalScrollBarVisibility = function (value) {
    this.$SetValue(ScrollViewer.VerticalScrollBarVisibilityProperty, value);
};
ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedHorizontalScrollBarVisibility", function () { return new Enum(Visibility); }, ScrollViewer);
ScrollViewer.Instance.GetComputedHorizontalScrollBarVisibility = function () {
    return this.$GetValue(ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty);
};
ScrollViewer.ComputedVerticalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedVerticalScrollBarVisibility", function () { return new Enum(Visibility); }, ScrollViewer);
ScrollViewer.Instance.GetComputedVerticalScrollBarVisibility = function () {
    return this.$GetValue(ScrollViewer.ComputedVerticalScrollBarVisibilityProperty);
};
ScrollViewer.HorizontalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("HorizontalOffset", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetHorizontalOffset = function () {
    return this.$GetValue(ScrollViewer.HorizontalOffsetProperty);
};
ScrollViewer.VerticalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("VerticalOffset", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetVerticalOffset = function () {
    return this.$GetValue(ScrollViewer.VerticalOffsetProperty);
};
ScrollViewer.ScrollableWidthProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetScrollableWidth = function () {
    return this.$GetValue(ScrollViewer.ScrollableWidthProperty);
};
ScrollViewer.ScrollableHeightProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetScrollableHeight = function () {
    return this.$GetValue(ScrollViewer.ScrollableHeightProperty);
};
ScrollViewer.ViewportWidthProperty = DependencyProperty.RegisterReadOnlyCore("ViewportWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetViewportWidth = function () {
    return this.$GetValue(ScrollViewer.ViewportWidthProperty);
};
ScrollViewer.ViewportHeightProperty = DependencyProperty.RegisterReadOnlyCore("ViewportHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetViewportHeight = function () {
    return this.$GetValue(ScrollViewer.ViewportHeightProperty);
};
ScrollViewer.ExtentWidthProperty = DependencyProperty.RegisterReadOnlyCore("ExtentWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetExtentWidth = function () {
    return this.$GetValue(ScrollViewer.ExtentWidthProperty);
    return this.$xExtent;
};
ScrollViewer.ExtentHeightProperty = DependencyProperty.RegisterReadOnlyCore("ExtentHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetExtentHeight = function () {
    return this.$GetValue(ScrollViewer.ExtentHeightProperty);
};
ScrollViewer.Instance.GetScrollInfo = function () {
    return this.$ScrollInfo;
};
ScrollViewer.Instance.SetScrollInfo = function (value) {
    this.$ScrollInfo = value;
    if (value != null) {
        value.SetCanHorizontallyScroll(this.GetHorizontalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
        value.SetCanVerticallyScroll(this.GetVerticalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    }
};
ScrollViewer.Instance.LineUp = function () {
    this._HandleVerticalScroll(new ScrollEventArgs(ScrollEventType.SmallDecrement, 0));
};
ScrollViewer.Instance.LineDown = function () {
    this._HandleVerticalScroll(new ScrollEventArgs(ScrollEventType.SmallIncrement, 0));
};
ScrollViewer.Instance.LineLeft = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.SmallDecrement, 0));
};
ScrollViewer.Instance.LineRight = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.SmallIncrement, 0));
};
ScrollViewer.Instance.PageHome = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.First, 0));
};
ScrollViewer.Instance.PageEnd = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.Last, 0));
};
ScrollViewer.Instance.PageUp = function () {
    this._HandleVerticalScroll(new ScrollEventArgs(ScrollEventType.LargeDecrement, 0));
};
ScrollViewer.Instance.PageDown = function () {
    this._HandleVerticalScroll(new ScrollEventArgs(ScrollEventType.LargeIncrement, 0));
};
ScrollViewer.Instance.PageLeft = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.LargeDecrement, 0));
};
ScrollViewer.Instance.PageRight = function () {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.LargeIncrement, 0));
};
ScrollViewer.Instance._ScrollInDirection = function (key) {
    switch (key) {
        case Key.PageUp:
            this.PageUp();
            break;
        case Key.PageDown:
            this.PageDown();
            break;
        case Key.End:
            this.PageEnd();
            break;
        case Key.Home:
            this.PageHome();
            break;
        case Key.Left:
            this.LineLeft();
            break;
        case Key.Up:
            this.LineUp();
            break;
        case Key.Right:
            this.LineRight();
            break;
        case Key.Down:
            this.LineDown();
            break;            
    }
};
ScrollViewer.Instance.ScrollToHorizontalOffset = function (offset) {
    this._HandleHorizontalScroll(new ScrollEventArgs(ScrollEventType.ThumbPosition, offset));
};
ScrollViewer.Instance.ScrollToVerticalOffset = function (offset) {
    this._HandleVerticalScroll(new ScrollEventArgs(ScrollEventType.ThumbPosition, offset));
};
ScrollViewer.Instance._HandleScroll = function (orientation, e) {
    if (orientation !== Orientation.Horizontal)
        this._HandleVerticalScroll(e);
    else
        this._HandleHorizontalScroll(e);
};
ScrollViewer.Instance._HandleHorizontalScroll = function (e) {
    var scrollInfo = this.GetScrollInfo();
    if (scrollInfo == null)
        return;
    var offset = scrollInfo.GetHorizontalOffset();
    var newValue = offset;
    switch (e.ScrollEventType) {
        case ScrollEventType.SmallDecrement:
            scrollInfo.LineLeft();
            break;
        case ScrollEventType.SmallIncrement:
            scrollInfo.LineRight();
            break;
        case ScrollEventType.LargeDecrement:
            scrollInfo.PageLeft();
            break;
        case ScrollEventType.LargeIncrement:
            scrollInfo.PageRight();
            break;
        case ScrollEventType.ThumbPosition:
        case ScrollEventType.ThumbTrack:
            newValue = e.Value;
            break;
        case ScrollEventType.First:
            newValue = -1.79769313486232E+308;
            break;
        case ScrollEventType.Last:
            newValue = 1.79769313486232E+308;
            break;
    }
    newValue = Math.max(newValue, 0);
    newValue = Math.min(this.GetScrollableWidth(), newValue);
    if (!DoubleUtil.AreClose(offset, newValue))
        scrollInfo.ChangeHorizontalOffset(newValue);
};
ScrollViewer.Instance._HandleVerticalScroll = function (e) {
    var scrollInfo = this.GetScrollInfo();
    if (scrollInfo == null)
        return;
    var offset = scrollInfo.GetVerticalOffset();
    var newValue = offset;
    switch (e.ScrollEventType) {
        case ScrollEventType.SmallDecrement:
            scrollInfo.LineUp();
            break;
        case ScrollEventType.SmallIncrement:
            scrollInfo.LineDown();
            break;
        case ScrollEventType.LargeDecrement:
            scrollInfo.PageUp();
            break;
        case ScrollEventType.LargeIncrement:
            scrollInfo.PageDown();
            break;
        case ScrollEventType.ThumbPosition:
        case ScrollEventType.ThumbTrack:
            newValue = e.Value;
            break;
        case ScrollEventType.First:
            newValue = -1.79769313486232E+308;
            break;
        case ScrollEventType.Last:
            newValue = 1.79769313486232E+308;
            break;
    }
    newValue = Math.max(newValue, 0);
    newValue = Math.min(this.GetScrollableHeight(), newValue);
    if (!DoubleUtil.AreClose(offset, newValue))
        scrollInfo.ChangeVerticalOffset(newValue);
};
ScrollViewer.Instance.OnMouseLeftButtonDown = function (sender, args) {
    args.Handled = this.Focus();
    this.OnMouseLeftButtonDown$ContentControl(sender, args);
    if (args.Handled)
        return;
};
ScrollViewer.Instance.OnMouseWheel = function (sender, args) {
    this.OnMouseWheel$ContentControl(sender, args);
    if (args.Handled)
        return;
    var scrollInfo = this.GetScrollInfo();
    if (scrollInfo == null)
        return;
    if ((args.Delta > 0 && scrollInfo.GetVerticalOffset() !== 0) || (args.Delta < 0 && scrollInfo.GetVerticalOffset() < this.GetScrollableHeight())) {
        if (args.Delta >= 0)
            scrollInfo.MouseWheelUp();
        else
            scrollInfo.MouseWheelDown();
        args.Handled = true;
    }
};
ScrollViewer.Instance.OnKeyDown = function (sender, args) {
    this.OnKeyDown$ContentControl(sender, args);
    this._HandleKeyDown(args);
};
ScrollViewer.Instance._HandleKeyDown = function (args) {
    if (args.Handled)
        return;
    if (!this.$TemplatedParentHandlesScrolling)
        return;
    var orientation = Orientation.Vertical;
    var scrollEventType = ScrollEventType.ThumbTrack;
    switch (args.KeyCode) {
        case Keys.PageUp:
            scrollEventType = ScrollEventType.LargeDecrement;
            break;
        case Keys.PageDown:
            scrollEventType = ScrollEventType.LargeIncrement;
            break;
        case Keys.End:
            if (!args.Modifiers.Ctrl)
                orientation = Orientation.Horizontal;
            scrollEventType = ScrollEventType.Last;
            break;
        case Keys.Home:
            if (!args.Modifiers.Ctrl)
                orientation = Orientation.Horizontal;
            scrollEventType = ScrollEventType.First;
            break;
        case Keys.Left:
            orientation = Orientation.Horizontal;
            scrollEventType = ScrollEventType.SmallDecrement;
        case Keys.Up:
            scrollEventType = ScrollEventType.SmallDecrement;
            break;
        case Keys.Right:
            orientation = Orientation.Horizontal;
            scrollEventType = ScrollEventType.SmallIncrement;
        case Keys.Down:
            scrollEventType = ScrollEventType.SmallIncrement;
            break;
    }
    if (scrollEventType !== ScrollEventType.ThumbTrack) {
        this._HandleScroll(orientation, new ScrollEventArgs(scrollEventType, 0));
        args.Handled = true;
    }
};
ScrollViewer.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentControl();
    this.$ElementScrollContentPresenter = Nullstone.As(this.GetTemplateChild("ScrollContentPresenter"), ScrollContentPresenter);
    this.$ElementHorizontalScrollBar = Nullstone.As(this.GetTemplateChild("HorizontalScrollBar"), ScrollBar);
    if (this.$ElementHorizontalScrollBar != null) {
        this.$ElementHorizontalScrollBar.Scroll.Subscribe(function (sender, e) { this._HandleScroll(Orientation.Horizontal, e); }, this);
    }
    this.$ElementVerticalScrollBar = Nullstone.As(this.GetTemplateChild("VerticalScrollBar"), ScrollBar);
    if (this.$ElementVerticalScrollBar != null) {
        this.$ElementVerticalScrollBar.Scroll.Subscribe(function (sender, e) { this._HandleScroll(Orientation.Vertical, e); }, this);
    }
    this._UpdateScrollBarVisibility();
};
ScrollViewer.Instance.MakeVisible = function (uie, targetRect) {
    var escp = this.$ElementScrollContentPresenter;
    if (uie != null && escp != null && (Nullstone.RefEquals(escp, uie) || escp.IsAncestorOf(uie)) && this.IsAncestorOf(escp) && this._IsAttached) {
        if (targetRect.IsEmpty()) {
            targetRect = new Rect(0, 0, uie._RenderSize.Width, uie._RenderSize.Height);
        }
        var rect2 = escp.MakeVisible(uie, targetRect);
        if (!rect2.IsEmpty()) {
            var p = escp.TransformToVisual(this).Transform(new Point(rect2.X, rect2.Y));
            rect2.X = p.X;
            rect2.Y = p.Y;
        }
        this.BringIntoView(rect2);
    }
};
ScrollViewer.Instance._InvalidateScrollInfo = function () {
    var scrollInfo = this.GetScrollInfo();
    if (scrollInfo != null) {
        this._SetValueInternal(ScrollViewer.ExtentWidthProperty, scrollInfo.GetExtentWidth());
        this._SetValueInternal(ScrollViewer.ExtentHeightProperty, scrollInfo.GetExtentHeight());
        this._SetValueInternal(ScrollViewer.ViewportWidthProperty, scrollInfo.GetViewportWidth());
        this._SetValueInternal(ScrollViewer.ViewportHeightProperty, scrollInfo.GetViewportHeight());
        this._UpdateScrollBar(Orientation.Horizontal, scrollInfo.GetHorizontalOffset());
        this._UpdateScrollBar(Orientation.Vertical, scrollInfo.GetVerticalOffset());
        this._UpdateScrollBarVisibility();
    }
    this._RaiseViewportChanged(this.GetViewportWidth(), this.GetViewportHeight());
    var w = Math.max(0, this.GetExtentWidth() - this.GetViewportWidth());
    if (w !== this.GetScrollableWidth()) {
        this._SetValueInternal(ScrollViewer.ScrollableWidthProperty, w);
        this._InvalidateMeasure();
    }
    var h = Math.max(0, this.GetExtentHeight() - this.GetViewportHeight());
    if (h !== this.GetScrollableHeight()) {
        this._SetValueInternal(ScrollViewer.ScrollableHeightProperty, h);
        this._InvalidateMeasure();
    }
};
ScrollViewer.Instance._UpdateScrollBarVisibility = function () {
    var scrollInfo = this.GetScrollInfo();
    var horizontalVisibility = Visibility.Visible;
    var hsbv = this.GetHorizontalScrollBarVisibility();
    switch (hsbv) {
        case ScrollBarVisibility.Visible:
            break;
        case ScrollBarVisibility.Disabled:
        case ScrollBarVisibility.Hidden:
            horizontalVisibility = Visibility.Collapsed;
            break;
        case ScrollBarVisibility.Auto:
        default:
            horizontalVisibility = (scrollInfo == null || scrollInfo.GetExtentWidth() <= scrollInfo.GetViewportWidth()) ? Visibility.Collapsed : Visibility.Visible;
            break;
    }
    if (horizontalVisibility !== this.GetComputedHorizontalScrollBarVisibility()) {
        this._SetValueInternal(ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty, horizontalVisibility);
        this._RaiseVisibilityChanged(horizontalVisibility, Orientation.Horizontal);
        this._InvalidateMeasure();
    }
    var verticalVisibility = Visibility.Visible;
    var vsbv = this.GetVerticalScrollBarVisibility();
    switch (vsbv) {
        case ScrollBarVisibility.Visible:
            break;
        case ScrollBarVisibility.Disabled:
        case ScrollBarVisibility.Hidden:
            verticalVisibility = Visibility.Collapsed;
            break;
        case ScrollBarVisibility.Auto:
        default:
            verticalVisibility = (scrollInfo == null || scrollInfo.GetExtentHeight() <= scrollInfo.GetViewportHeight()) ? Visibility.Collapsed : Visibility.Visible;
            break;
    }
    if (verticalVisibility !== this.GetComputedVerticalScrollBarVisibility()) {
        this._SetValueInternal(ScrollViewer.ComputedVerticalScrollBarVisibilityProperty, verticalVisibility);
        this._RaiseVisibilityChanged(verticalVisibility, Orientation.Vertical);
        this._InvalidateMeasure();
    }
};
ScrollViewer.Instance._UpdateScrollBar = function (orientation, value) {
    try {
        var scrollInfo = this.GetScrollInfo();
        if (orientation === Orientation.Horizontal) {
            this._SetValueInternal(ScrollViewer.HorizontalOffsetProperty, value);
            this._RaiseOffsetChanged(scrollInfo.GetHorizontalOffset(), Orientation.Horizontal);
            if (this.$ElementHorizontalScrollBar != null) {
                this.$ElementHorizontalScrollBar.SetValue(value);
            }
        } else {
            this._SetValueInternal(ScrollViewer.VerticalOffsetProperty, value);
            this._RaiseOffsetChanged(scrollInfo.GetVerticalOffset(), Orientation.Vertical);
            if (this.$ElementVerticalScrollBar != null) {
                this.$ElementVerticalScrollBar.SetValue(value);
            }
        }
    } finally {
    }
};
ScrollViewer.Instance._RaiseOffsetChanged = function (offset, orientation) {
};
ScrollViewer.Instance._RaiseVisibilityChanged = function (visibility, orientation) {
};
ScrollViewer.Instance._RaiseViewportChanged = function (viewportWidth, viewportHeight) {
};
ScrollViewer.Instance._OnRequestBringIntoView = function (sender, args) {
    var sv = Nullstone.As(sender, ScrollViewer);
    var targetObj = args.TargetObject;
    if (targetObj != null && sv != null && !Nullstone.RefEquals(sv, targetObj) && sv.IsAncestorOf(targetObj)) {
        sv.MakeVisible(targetObj, args.TargetRect);
        args.Handled = true;
    }
};
ScrollViewer.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: ScrollViewer
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
        Value: "Visible"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Padding"),
        Value: "4"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderBrush"),
        Value: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ScrollViewer
            },
            Content: {
                Type: Border,
                Props: {
                    CornerRadius: new CornerRadius(2, 2, 2, 2),
                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                    BorderThickness: new TemplateBindingMarkup("BorderThickness")
                },
                Content: {
                    Type: Grid,
                    Props: {
                        Background: new TemplateBindingMarkup("Background"),
                        RowDefinitions: [
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
}]
,
                        ColumnDefinitions: [
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
}]
                    },
                    Children: [
{
    Type: ScrollContentPresenter,
    Name: "ScrollContentPresenter",
    Props: {
        Cursor: new TemplateBindingMarkup("Cursor"),
        Margin: new TemplateBindingMarkup("Padding"),
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate")
    }
},
{
    Type: Rectangle,
    Props: {
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFE9EEF4")
            }
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 1
}
]
},
{
    Type: ScrollBar,
    Name: "VerticalScrollBar",
    Props: {
        Width: 18,
        IsTabStop: false,
        Visibility: new TemplateBindingMarkup("ComputedVerticalScrollBarVisibility"),
        Orientation: Orientation.Vertical,
        ViewportSize: new TemplateBindingMarkup("ViewportHeight"),
        Maximum: new TemplateBindingMarkup("ScrollableHeight"),
        Minimum: 0,
        Value: new TemplateBindingMarkup("VerticalOffset"),
        Margin: new Thickness(0, -1, -1, -1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 0
}
]
},
{
    Type: ScrollBar,
    Name: "HorizontalScrollBar",
    Props: {
        Height: 18,
        IsTabStop: false,
        Visibility: new TemplateBindingMarkup("ComputedHorizontalScrollBarVisibility"),
        Orientation: Orientation.Horizontal,
        ViewportSize: new TemplateBindingMarkup("ViewportWidth"),
        Maximum: new TemplateBindingMarkup("ScrollableWidth"),
        Minimum: 0,
        Value: new TemplateBindingMarkup("HorizontalOffset"),
        Margin: new Thickness(-1, 0, -1, -1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 1
}
]
}]
                }
            }
        }
    }
}]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};
Nullstone.FinishCreate(ScrollViewer);

var ButtonBase = Nullstone.Create("ButtonBase", ContentControl);
ButtonBase.Instance.Init = function () {
    this.Init$ContentControl();
    this._IsMouseCaptured = false;
    this._IsMouseLeftButtonDown = false;
    this._IsSpaceKeyDown = false;
    this._MousePosition = new Point();
    this.Click = new MulticastEvent();
    this.Loaded.Subscribe(function () { this._IsLoaded = true; this.UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}
ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return new Enum(ClickMode); }, ButtonBase, ClickMode.Release);
ButtonBase.Instance.GetClickMode = function () {
    return this.$GetValue(ButtonBase.ClickModeProperty);
};
ButtonBase.Instance.SetClickMode = function (value) {
    this.$SetValue(ButtonBase.ClickModeProperty, value);
};
ButtonBase.IsPressedProperty = DependencyProperty.RegisterReadOnly("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.Instance.GetIsPressed = function () {
	return this.$GetValue(ButtonBase.IsPressedProperty);
};
ButtonBase.Instance.SetIsPressed = function (value) {
	this.$SetValue(ButtonBase.IsPressedProperty, value);
};
ButtonBase.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, ButtonBase, false);
ButtonBase.Instance.GetIsFocused = function () {
    return this.$GetValue(ButtonBase.IsFocusedProperty);
};
ButtonBase.Instance.SetIsFocused = function (value) {
    this.$SetValue(ButtonBase.IsFocusedProperty, value);
};
ButtonBase.IsMouseOverProperty = DependencyProperty.RegisterReadOnly("IsMouseOver", function () { return Boolean; }, ButtonBase, false);
ButtonBase.Instance.GetIsMouseOver = function () {
    return this.$GetValue(ButtonBase.IsMouseOverProperty);
};
ButtonBase.Instance.SetIsMouseOver = function (value) {
    this.$SetValue(ButtonBase.IsMouseOverProperty, value);
};
ButtonBase.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ContentControl(e);
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
ButtonBase.Instance.OnIsPressedChanged = function (e) {
    this.UpdateVisualState();
};
ButtonBase.Instance.UpdateVisualState = function (useTransitions) {
    if (this._SuspendStateChanges)
        return;
    this._ChangeVisualState(useTransitions === true);
};
ButtonBase.Instance._ChangeVisualState = function (useTransitions) {
};
ButtonBase.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$ContentControl(sender, args);
    this.SetIsMouseOver(true);
    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled()) {
            this.SetIsPressed(true);
            this.OnClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$ContentControl(sender, args);
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
ButtonBase.Instance.OnMouseMove = function (sender, args) {
    this.OnMouseMove$ContentControl(sender, args);
    this._MousePosition = args.GetPosition(this);
    if (this._IsMouseLeftButtonDown && this.GetIsEnabled() && this.GetClickMode() !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.SetIsPressed(this._IsValidMousePosition());
    }
};
ButtonBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$ContentControl(sender, args);
    this._IsMouseLeftButtonDown = true;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;
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
        this.OnClick();
};
ButtonBase.Instance.OnMouseLeftButtonUp = function (sender, args) {
    this.OnMouseLeftButtonDown$ContentControl(sender, args);
    this._IsMouseLeftButtonDown = false;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;
    if (!this._IsSpaceKeyDown && this.GetIsPressed() && clickMode === ClickMode.Release)
        this.OnClick();
    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.SetIsPressed(false);
    }
};
ButtonBase.Instance.OnClick = function () {
    this.Click.Raise(this, null);
};
ButtonBase.Instance._CaptureMouseInternal = function () {
    if (!this._IsMouseCaptured)
        this._IsMouseCaptured = this.CaptureMouse();
};
ButtonBase.Instance._ReleaseMouseCaptureInternal = function () {
    this.ReleaseMouseCapture();
    this._IsMouseCaptured = false;
};
ButtonBase.Instance._IsValidMousePosition = function () {
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
};
ButtonBase.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$ContentControl(sender, args);
    this.SetIsFocused(true);
    this.UpdateVisualState();
};
ButtonBase.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ContentControl(sender, args);
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
ButtonBase._GetVisualRoot = function (d) {
    var parent = d;
    while (parent != null) {
        d = parent;
        parent = VisualTreeHelper.GetParent(parent);
    }
    return d;
};
Nullstone.FinishCreate(ButtonBase);

var RepeatButton = Nullstone.Create("RepeatButton", ButtonBase);
RepeatButton.Instance.Init = function () {
    this.Init$ButtonBase();
    this.SetClickMode(ClickMode.Press);
};
RepeatButton.DelayProperty = DependencyProperty.Register("Delay", function () { return Number; }, RepeatButton, 500, function (d, args) { d.OnDelayChanged(args); });
RepeatButton.Instance.GetDelay = function () {
    return this.$GetValue(RepeatButton.DelayProperty);
};
RepeatButton.Instance.SetDelay = function (value) {
    this.$SetValue(RepeatButton.DelayProperty, value);
};
RepeatButton.IntervalProperty = DependencyProperty.Register("Interval", function () { return Number; }, RepeatButton, 33, function (d, args) { d.OnIntervalChanged(args); });
RepeatButton.Instance.GetInterval = function () {
    return this.$GetValue(RepeatButton.IntervalProperty);
};
RepeatButton.Instance.SetInterval = function (value) {
    this.$SetValue(RepeatButton.IntervalProperty, value);
};
RepeatButton.Instance.OnDelayChanged = function (args) {
    if (args.NewValue < 0)
        throw new ArgumentException("Delay Property cannot be negative.");
};
RepeatButton.Instance.OnIntervalChanged = function (args) {
    if (args.NewValue < 0)
        throw new ArgumentException("Interval Property cannot be negative.");
};
RepeatButton.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ButtonBase(e);
    this._KeyboardCausingRepeat = false;
    this._MouseCausingRepeat = false;
    this._UpdateRepeatState();
};
RepeatButton.Instance.OnKeyDown = function (sender, args) {
    if (args.KeyCode === Keys.Space && this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = true;
        this._UpdateRepeatState();
    }
    this.OnKeyDown$ButtonBase(sender, args);
};
RepeatButton.Instance.OnKeyUp = function (sender, args) {
    this.OnKeyUp$ButtonBase(sender, args);
    if (args.KeyCode === Keys.Space && this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = false;
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
};
RepeatButton.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$ButtonBase(sender, args);
    if (this.GetClickMode() === ClickMode.Hover) {
        this._MouseCausingRepeat = true;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
    var parent = this;
    while (true) {
        var fe = Nullstone.As(parent, FrameworkElement);
        if (fe == null)
            break;
        parent = fe._GetLogicalParent();
    }
    this._MousePosition = args.GetPosition(parent);
};
RepeatButton.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$ButtonBase(sender, args);
    if (this.GetClickMode() === ClickMode.Hover) {
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnMouseLeftButtonDown = function (sender, args) {
    if (args.Handled)
        return;
    this.OnMouseLeftButtonDown$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._MouseCausingRepeat = true;
        this._UpdateRepeatState();
    }
};
RepeatButton.Instance.OnMouseLeftButtonUp = function (sender, args) {
    if (args.Handled)
        return;
    this.OnMouseLeftButtonUp$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnMouseMove = function (sender, args) {
    var parent = this;
    while (true) {
        var fe = Nullstone.As(parent, FrameworkElement);
        if (fe == null)
            break;
        parent = fe._GetLogicalParent();
    }
    this._MousePosition = args.GetPosition(parent);
};
RepeatButton.Instance._UpdateRepeatState = function () {
    if (this._MouseCausingRepeat || this._KeyboardCausingRepeat)
        this._StartTimer();
    else
        this._StopTimer();
};
RepeatButton.Instance._StartTimer = function () {
    if (this._Timer == null) {
        this._Timer = new Timer();
        this._Timer.Tick.Subscribe(this._OnTimeout, this);
    } else if (this._Timer.IsEnabled) {
        return;
    }
    this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, this.GetDelay()));
    this._Timer.Start();
};
RepeatButton.Instance._StopTimer = function () {
    if (this._Timer != null)
        this._Timer.Stop();
};
RepeatButton.Instance._OnTimeout = function (sender, e) {
    var interval = this.GetInterval();
    var timespan = this._Timer.GetInterval();
    if (timespan.Milliseconds !== interval) {
        this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, interval));
    }
    if (this.GetIsPressed() || this._KeyboardCausingRepeat) {
        this.OnClick();
        return;
    }
    var els = VisualTreeHelper.FindElementsInHostCoordinates(this._MousePosition);
    for (var i = 0; i < els.length; i++) {
        if (Nullstone.RefEquals(els[i], this)) {
            this.OnClick();
            break;
        }
    }
};
RepeatButton.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }
    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
    }
};
RepeatButton.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: RepeatButton
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderBrush"),
        Value: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: RepeatButton
            },
            Content: {
                Type: Grid,
                AttachedProps: [{
                    Owner: VisualStateManager,
                    Prop: "VisualStateGroups",
                    Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.Background).(SolidColorBrush.Color)")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#D8FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#8CFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#3FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.55
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
}]
},
{
    Type: VisualStateGroup,
    Name: "FocusStates",
    Children: [
{
    Type: VisualState,
    Name: "Focused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "FocusVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Unfocused"
}]
}]
                }
],
                Children: [
{
    Type: Border,
    Name: "Background",
    Props: {
        CornerRadius: new CornerRadius(3, 3, 3, 3),
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Grid,
        Props: {
            Background: new TemplateBindingMarkup("Background"),
            Margin: new Thickness(1, 1, 1, 1)
        },
        Children: [
{
    Type: Border,
    Name: "BackgroundAnimation",
    Props: {
        Opacity: 0,
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
}]
    }
},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        RadiusX: 3,
        RadiusY: 3,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Opacity: 0,
        IsHitTestVisible: false
    }
}]
            }
        }
    }
}]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};
Nullstone.FinishCreate(RepeatButton);

var ToggleButton = Nullstone.Create("ToggleButton", ButtonBase);
ToggleButton.IsCheckedProperty = DependencyProperty.RegisterReadOnly("IsChecked", function () { return Boolean; }, ToggleButton, false, function (d, args) { d.OnIsCheckedChanged(args); });
ToggleButton.Instance.GetIsChecked = function () {
    return this.$GetValue(ToggleButton.IsCheckedProperty);
};
ToggleButton.Instance.SetIsChecked = function (value) {
    this.$SetValue(ToggleButton.IsCheckedProperty, value);
};
ToggleButton.Instance.OnIsCheckedChanged = function (e) {
    var isChecked = e.NewValue;
    this.UpdateVisualState();
};
ToggleButton.Instance.OnClick = function () {
    alert('clicked');
    this.SetIsChecked(true);
};
Nullstone.FinishCreate(ToggleButton);

var Button = Nullstone.Create("Button", ButtonBase);
Button.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ButtonBase();
    this.UpdateVisualState(false);
};
Button.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }
    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
    }
};
Button.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ButtonBase(e);
    this.SetIsTabStop(e.NewValue);
};
Button.Instance.GetDefaultStyle = function () {
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
                            StartPoint: new Point(0.5, 0.0),
                            EndPoint: new Point(0.5, 1.0),
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
                        AttachedProps: [
                            {
                                Owner: VisualStateManager,
                                Prop: "VisualStateGroups",
                                Value: [
                                    {
                                        Type: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Normal"
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "MouseOver",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundAnimation" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#F2FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#CCFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#7FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Pressed",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#FF6DBDD1") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "Background" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(SolidColorBrush.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundAnimation" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#D8FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#C6FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#8CFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#3FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Disabled",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 0.55 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "DisabledVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        Type: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Focused",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Unfocused"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        Children: [
                            {
                                Type: Border,
                                Name: "Background",
                                Props: {
                                    CornerRadius: new CornerRadius(3, 3, 3, 3),
                                    Background: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                },
                                Content: {
                                    Type: Grid,
                                    Props: {
                                        Background: new TemplateBindingMarkup("Background"),
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
                                            Type: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
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
                                                    }
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
                                    Content: new TemplateBindingMarkup("Content"),
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding")
                                }
                            },
                            {
                                Type: Rectangle,
                                Name: "DisabledVisualElement",
                                Props: {
                                    Fill: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                    IsHitTestVisible: false,
                                    Opacity: 0.0,
                                    RadiusX: 3,
                                    RadiusY: 3
                                }
                            },
                            {
                                Type: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    IsHitTestVisible: false,
                                    Margin: new Thickness(1, 1, 1, 1),
                                    Opacity: 0.0,
                                    RadiusX: 2,
                                    RadiusY: 2,
                                    Stroke: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                    StrokeThickness: 1
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
Nullstone.FinishCreate(Button);

var CheckBox = Nullstone.Create("CheckBox", ToggleButton);
CheckBox.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: CheckBox
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Background"),
        Value: "#FF448DCA"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Padding"),
        Value: "4,1,0,0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderBrush"),
        Value: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
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
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: CheckBox
            },
            Content: {
                Type: Grid,
                Props: {
                    ColumnDefinitions: [
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(16, GridUnitType.Pixel)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Star)
    }
}]
                },
                AttachedProps: [{
                    Owner: VisualStateManager,
                    Prop: "VisualStateGroups",
                    Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundOverlay"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddleBackground"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundOverlay"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddleBackground"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[3].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[0].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[1].(GradientStop.Color)")
}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[2].(GradientStop.Color)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.55
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "contentPresenter"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.55
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
}]
    }
}]
},
{
    Type: VisualStateGroup,
    Name: "CheckStates",
    Children: [
{
    Type: VisualState,
    Name: "Checked",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "CheckIcon"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Unchecked"
},
{
    Type: VisualState,
    Name: "Indeterminate",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "IndeterminateIcon"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")
}
]
}]
    }
}]
},
{
    Type: VisualStateGroup,
    Name: "FocusStates",
    Children: [
{
    Type: VisualState,
    Name: "Focused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ContentFocusVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")
}
]
}]
    }
},
{
    Type: VisualState,
    Name: "Unfocused"
}]
},
{
    Type: VisualStateGroup,
    Name: "ValidationStates",
    Children: [
{
    Type: VisualState,
    Name: "Valid"
},
{
    Type: VisualState,
    Name: "InvalidUnfocused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ValidationErrorElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Visibility")
}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value: Visibility.Visible
    }
}]
}]
    }
},
{
    Type: VisualState,
    Name: "InvalidFocused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ValidationErrorElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Visibility")
}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value: Visibility.Visible
    }
}]
},
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "validationTooltip"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("IsOpen")
}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value:
                          true
    }
}]
}]
    }
}]
}]
                }
],
                Children: [
{
    Type: Grid,
    Props: {
        HorizontalAlignment: HorizontalAlignment.Left,
        VerticalAlignment: VerticalAlignment.Top
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Width: 14,
        Height: 14,
        RadiusX: 1,
        RadiusY: 1,
        Stroke: new TemplateBindingMarkup("BorderBrush"),
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Rectangle,
    Name: "BackgroundOverlay",
    Props: {
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFC4DBEE")
            }
        },
        Opacity: 0,
        Width: 14,
        Height: 14,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BoxMiddleBackground",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
        Fill: new TemplateBindingMarkup("Background"),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        StrokeThickness: 1
    }
},
{
    Type: Rectangle,
    Name: "BoxMiddle",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.375
    }
}]
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.62, 0.15),
                EndPoint: new Point(0.64, 0.88)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
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
        Color: Color.FromHex("#EAFFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#D8FFFFFF"),
        Offset: 1
    }
}]
        }
    }
},
{
    Type: Rectangle,
    Name: "BoxMiddleLine",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
        Stroke: new TemplateBindingMarkup("BorderBrush"),
        StrokeThickness: 1,
        Opacity: 0.2
    }
},
{
    Type: Path,
    Name: "CheckIcon",
    Props: {
        Margin: new Thickness(1, 1, 0, 1.5),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        Stretch: Stretch.Fill,
        Opacity: 0,
        Width: 10.5,
        Height: 10,
        Data: "M102.03442,598.79645 L105.22962,597.78918 L106.78825,600.42358 C106.78825,600.42358 108.51028,595.74304 110.21724,593.60419 C112.00967,591.35822 114.89314,591.42316 114.89314,591.42316 C114.89314,591.42316 112.67844,593.42645 111.93174,594.44464 C110.7449,596.06293 107.15683,604.13837 107.15683,604.13837 z",
        FlowDirection: FlowDirection.LeftToRight
    }
},
{
    Type: Rectangle,
    Name: "IndeterminateIcon",
    Props: {
        Height: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        Opacity: 0,
        Width: 6
    }
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Width: 14,
        Height: 14,
        Opacity: 0,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "ContentFocusVisualElement",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Width: 16,
        Height: 16
    }
},
{
    Type: Border,
    Name: "ValidationErrorElement",
    Props: {
        Margin: new Thickness(1, 1, 1, 1),
        BorderThickness: new Thickness(1, 1, 1, 1),
        CornerRadius: new CornerRadius(1, 1, 1, 1),
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDB000C")
            }
        },
        Visibility: Visibility.Collapsed
    },
    Content: {
        Type: Grid,
        Props: {
            Width: 10,
            Height: 10,
            HorizontalAlignment: HorizontalAlignment.Right,
            Margin: new Thickness(0, -4, -4, 0),
            VerticalAlignment: VerticalAlignment.Top,
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        },
        Children: [
{
    Type: Path,
    Props: {
        Margin: new Thickness(0, 3, 0, 0),
        Data: "M 1,0 L5,0 A 2,2 90 0 1 7,2 L7,6 z",
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDC000C")
            }
        }
    }
},
{
    Type: Path,
    Props: {
        Margin: new Thickness(0, 3, 0, 0),
        Data: "M 0,0 L2,0 L 7,5 L7,7",
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#ffffff")
            }
        }
    }
}]
    }
}]
},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
],
    Content: new TemplateBindingMarkup("Content")
}]
            }
        }
    }
}]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};
Nullstone.FinishCreate(CheckBox);

var HyperlinkButton = Nullstone.Create("HyperlinkButton", ButtonBase);
HyperlinkButton.StateDisabled = "Disabled";
HyperlinkButton.StatePressed = "Pressed";
HyperlinkButton.StateMouseOver = "MouseOver";
HyperlinkButton.StateNormal = "Normal";
HyperlinkButton.StateFocused = "Focused";
HyperlinkButton.StateUnfocused = "Unfocused";
HyperlinkButton.NavigateUriProperty = DependencyProperty.Register("NavigateUri", function () { return Uri; }, HyperlinkButton, null);
HyperlinkButton.Instance.GetNavigateUri = function () {
    return this.$GetValue(HyperlinkButton.NavigateUriProperty);
};
HyperlinkButton.Instance.SetNavigateUri = function (value) {
    this.$SetValue(HyperlinkButton.NavigateUriProperty, value);
};
HyperlinkButton.TargetNameProperty = DependencyProperty.Register("TargetName", function () { return String; }, HyperlinkButton, null);
HyperlinkButton.Instance.GetTargetName = function () {
    return this.$GetValue(HyperlinkButton.TargetNameProperty);
};
HyperlinkButton.Instance.SetTargetName = function (value) {
    this.$SetValue(HyperlinkButton.TargetNameProperty, value);
};
HyperlinkButton.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ButtonBase();
    this.UpdateVisualState(false);
};
HyperlinkButton.Instance.OnClick = function () {
    this.OnClick$ButtonBase();
    if (this.GetNavigateUri() != null) {
        this._Navigate();
    }
};
HyperlinkButton.Instance._GetAbsoluteUri = function () {
    var destination = this.GetNavigateUri();
    if (!destination.IsAbsoluteUri) {
        var original = destination.OriginalString;
        if (original && original.charAt(0) !== '/')
            throw new NotSupportedException();
        destination = new Uri(App.Instance.GetHost().GetSource(), destination);
    }
    return destination;
};
HyperlinkButton.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, HyperlinkButton.StateDisabled);
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, HyperlinkButton.StatePressed);
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, HyperlinkButton.StateMouseOver);
    } else {
        this._GoToState(useTransitions, HyperlinkButton.StateNormal);
    }
    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, HyperlinkButton.StateFocused);
    } else {
        this._GoToState(useTransitions, HyperlinkButton.StateUnfocused);
    }
};
HyperlinkButton.Instance._Navigate = function () {
    window.location.href = this.GetNavigateUri().toString();
};
HyperlinkButton.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: HyperlinkButton
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Cursor"),
                    Value: CursorType.Hand
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Foreground"),
                    Value: new SolidColorBrush(Color.FromHex("#FF73A9D8"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Padding"),
                    Value: new Thickness(2, 0, 2, 0)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "HorizontalContentAlignment"),
                    Value: HorizontalAlignment.Left
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "VerticalContentAlignment"),
                    Value: VerticalAlignment.Top
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Background"),
                    Value: new SolidColorBrush(Color.FromHex("#00FFFFFF"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Template"),
                    Value: new ControlTemplate(HyperlinkButton, {
                        Type: Grid,
                        Name: "RootElement",
                        Props: {
                            Cursor: new TemplateBindingMarkup("Cursor"),
                            Background: new TemplateBindingMarkup("Background")
                        },
                        AttachedProps: [
                            {
                                Owner: VisualStateManager,
                                Prop: "VisualStateGroups",
                                Value: [
                                {
                                    Type: VisualStateGroup,
                                    Name: "CommonStates",
                                    Children: [
                                        {
                                            Type: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                    {
                                                        Type: ObjectAnimationUsingKeyFrames,
                                                        Props: { Duration: new Duration(0.0) },
                                                        AttachedProps: [
                                                            { Owner: Storyboard, Prop: "TargetName", Value: "UnderlineTextBlock" },
                                                            { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Visibility") }
                                                        ],
                                                        Children: [
                                                            {
                                                                Type: DiscreteObjectKeyFrame,
                                                                Props:
                                                                {
                                                                    KeyTime: new KeyTime(0.0),
                                                                    Value: Visibility.Visible
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                    {
                                                        Type: ObjectAnimationUsingKeyFrames,
                                                        Props: { Duration: new Duration(0.0) },
                                                        AttachedProps: [
                                                            { Owner: Storyboard, Prop: "TargetName", Value: "UnderlineTextBlock" },
                                                            { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Visibility") }
                                                        ],
                                                        Children: [
                                                            {
                                                                Type: DiscreteObjectKeyFrame,
                                                                Props:
                                                                {
                                                                    KeyTime: new KeyTime(0.0),
                                                                    Value: Visibility.Visible
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                    {
                                                        Type: ObjectAnimationUsingKeyFrames,
                                                        Props: { Duration: new Duration(0.0) },
                                                        AttachedProps: [
                                                            { Owner: Storyboard, Prop: "TargetName", Value: "DisabledOverlay" },
                                                            { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Visibility") }
                                                        ],
                                                        Children: [
                                                            {
                                                                Type: DiscreteObjectKeyFrame,
                                                                Props:
                                                                {
                                                                    KeyTime: new KeyTime(0.0),
                                                                    Value: Visibility.Visible
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    Type: VisualStateGroup,
                                    Name: "FocusStates",
                                    Children: [
                                        {
                                            Type: VisualState,
                                            Name: "Unfocused"
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                    {
                                                        Type: DoubleAnimation,
                                                        Props: { Duration: new Duration(0.0), To: 1.0 },
                                                        AttachedProps: [
                                                            { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                            { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                            }
                        ],
                        Children: [
                            {
                                Type: TextBlock,
                                Name: "UnderlineTextBlock",
                                Props: {
                                    Text: new TemplateBindingMarkup("Content"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    TextDecorations: TextDecorations.Underline,
                                    Visibility: Visibility.Collapsed
                                }
                            },
                            {
                                Type: TextBlock,
                                Name: "DisabledOverlay",
                                Props: {
                                    Text: new TemplateBindingMarkup("Content"),
                                    Foreground: new SolidColorBrush(Color.FromHex("#FFAAAAAA")),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    Visibility: Visibility.Collapsed
                                }
                            },
                            {
                                Type: ContentPresenter,
                                Name: "Normal",
                                Props: {
                                    Content: new TemplateBindingMarkup("Content"),
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding")
                                }
                            },
                            {
                                Type: Border,
                                Name: "FocusVisualElement",
                                Props: {
                                    BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                    BorderThickness: new Thickness(1, 1, 1, 1),
                                    Opacity: 0.0,
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
Nullstone.FinishCreate(HyperlinkButton);

