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
    this._Queue = new Array();
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
    Object.call(this);
    this._Selector = jSelector;
};
HUD.prototype.SetMessage = function (message) {
    $(this._Selector)[0].innerText = message;
};
var HUDs = new Array();
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
};
var DurationType = {
    Automatic: 0,
    Forever: 1,
    TimeSpan: 2
};

Object.Clone = function (o) {
    return eval(uneval(o));
};
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
Array.indexOfRefObject = function (arr, ro) {
    for (var i = 0; i < arr.length; i++) {
        if (RefObject.RefEquals(arr[i], ro))
            return i;
    }
    return -1;
};
Array.containsRefObject = function (arr, ro) {
    return Array.indexOfRefObject(arr, ro) > -1;
};
Array.addDistinctRefObject = function (arr, ro) {
    if (Array.containsRefObject(arr, ro))
        return false;
    arr.push(ro);
    return true;
};
Array.removeRefObject = function (arr, ro) {
    var index = Array.indexOfRefObject(arr, ro);
    if (index > -1)
        arr.splice(index, 1);
};
Number.isNumber = function (o) {
    return typeof o == "number";
};
function IsDocumentReady() {
    return false;
}

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

function _LayoutWord() {
    RefObject.call(this);
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._BreakOps = null;
    this._Font = new Font();
}
_LayoutWord.InheritFrom(RefObject);

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
        if (index < cursor + line._Length)
            return line;
        cursor += line._Length;
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
TextLayout.prototype.__Debug = function () {
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
        var advance = Surface.MeasureText(tempText, word._Font).Width;
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
        word._BreakOps = new Array();
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
        area = new Rect(origin.X, origin.Y, this._Advance, font.GetActualHeight());
        ctx.Fill(area, brush); //selection background
    }
    if (!(brush = attrs.GetForeground(this._Selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster.Painter, this._Text, attrs.GetForeground(), attrs.GetFont());
    if (attrs.IsUnderlined()) {
    }
};
_TextLayoutGlyphCluster.Painter = function (canvasCtx, text, foreground, font) {
    canvasCtx.fillStyle = foreground._Translate(canvasCtx);
    canvasCtx.font = font._Translate();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};

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
}
_TextLayoutLine.InheritFrom(RefObject);
_TextLayoutLine.prototype._Render = function (ctx, origin, left, top) {
    var run;
    var x0 = left;
    var y0 = top;
    for (var i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        run._Render(ctx, origin, x0, y0);
        x0 += run._Advance;
    }
};
_TextLayoutLine.prototype.__Debug = function (allText) {
    var t = "";
    t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
    for (var i = 0; i < this._Runs.length; i++) {
        t += "\t\t\tRun " + i.toString() + ": ";
        t += this._Runs[i].__Debug(allText);
        t += "\n";
    }
    return t;
};

function _TextLayoutRun(line, attrs, start) {
    RefObject.call(this);
    this._Clusters = new Array();
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0; //after layout, will contain horizontal distance this run advances
    this._Length = 0;
}
_TextLayoutRun.InheritFrom(RefObject);
_TextLayoutRun.prototype._GenerateCache = function () {
    var selectionLength = this._Line._Layout.GetSelectionLength();
    var selectionStart = this._Line._Layout.GetSelectionStart();
    var text = this._Line._Layout.GetText();
    var font = this._Attrs.GetFont();
    var len;
    var index = this._Start;
    if (selectionLength == 0 || this._Start < selectionStart) {
        len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(this._Start, this._Length), font));
        index += len;
    }
    var selectionEnd = this._Start + selectionStart + selectionLength;
    var runEnd = this.Start + this._Length;
    if (index < runEnd && index < selectionEnd) {
        len = Math.min(runEnd - index, selectionEnd - index);
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(index, len), font, true));
        index += len;
    }
    if (index < runEnd) {
        len = runEnd - index;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.substr(index, len), font));
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
_TextLayoutRun.prototype.__Debug = function (allText) {
    return allText.substr(this._Start, this._Length);
};

function _WordBreakOp() {
    RefObject.call(this);
    this._Advance = 0.0;
    this._Index = 0;
    this._Btype = 0;
    this._C = '';
}
_WordBreakOp.InheritFrom(RefObject);
_WordBreakOp.prototype.Copy = function () {
    var newOp = new _WordBreakOp();
    newOp._Advance = this._Advance;
    newOp._Btype = this._Btype;
    newOp._C = this._C;
    newOp._Index = this._Index;
};
_WordBreakOp.prototype.SetWordBasics = function (word) {
    word._Length = this._Index;
    word._Advance = this._Advance;
};

function GridLength(value, type) {
    RefObject.call(this);
    this.Value = value == null ? 0 : value;
    this.Type = type == null ? GridUnitType.Auto : type;
}
GridLength.InheritFrom(RefObject);
GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};

function _TextBoxModelChangedEventArgs(changed, propArgs) {
    RefObject.call(this);
    this.Changed = changed;
    this.PropArgs = propArgs;
}
_TextBoxModelChangedEventArgs.InheritFrom(RefObject);

function BindingOperations() {
    RefObject.call(this);
}
BindingOperations.InheritFrom(RefObject);
BindingOperations.SetBinding = function (target, dp, binding) {
    if (target == null)
        throw new ArgumentNullException("target");
    if (dp == null)
        throw new ArgumentNullException("dp");
    if (binding == null)
        throw new ArgumentNullException("binding");
    var e = new BindingExpression(binding, target, dp);
    target.SetValue(dp, e);
    return e;
};

function _DeepStyleWalker(styles) {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
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
        for (var i = setters.GetCount() - 1; i >= 0; i--) {
            var setter = setters.GetValueAt(i);
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
_DeepStyleWalker.SetterSort = function (setter1, setter2) {
    var a = setter1.GetProperty();
    var b = setter2.GetProperty();
    return (a === b) ? 0 : ((a > b) ? 1 : -1);
};

function _DeepTreeWalker(top, direction) {
    RefObject.call(this);
    if (!top)
        return;
    this._WalkList = new LinkedList();
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
    var ownerTypeName = this.OwnerType.GetName();
    return ownerTypeName + "." + this.Name.toString();
};
DependencyProperty.prototype.GetDefaultValue = function (obj) {
    if (this._HasDefaultValue)
        return this.DefaultValue;
    return this._GetAutoCreatedValue(obj);
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
        if ((value = data.lu.GetValue(data.res)) == null)
            return false;
        if ((newLu = RefObject.As(value, DependencyObject)) == null)
            return false;
        if (data.promotedValues != null && !cloned && data.promotedValues[value._ID] == null && !(value instanceof UIElement)) {
            var clonedValue = Object.Clone(value);
            var clonedDo = RefObject.As(clonedValue, DependencyObject);
            if (clonedDo != null) {
                newLu = clonedDo;
                data.lu.SetValue(data.res, clonedValue);
                clonedValue = data.lu.GetValue(data.res);
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
        if ((value = data.lu.GetValue(data.res)) == null)
            return false;
    }
    if ((data.collection = RefObject.As(value, Collection)) == null)
        return false;
    if ((value = data.collection.GetValueAt(data.i)) == null)
        return false;
    if ((data.lu = RefObject.As(value, DependencyObject)) == null)
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
    if (!data.res._IsAttached && !data.lu.constructor.DoesInheritFrom(data.type)) {
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
function UnsetValue() {
    RefObject.call(this);
}
UnsetValue.InheritFrom(RefObject);

function Expression() {
    RefObject.call(this);
}
Expression.InheritFrom(RefObject);
Expression.prototype.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.prototype._OnAttached = function (element) {
    this.SetAttached(true);
};
Expression.prototype._OnDetached = function (element) {
    this.SetAttached(false);
};
Expression.prototype.GetAttached = function () {
    return this._Attached;
};
Expression.prototype.SetAttached = function (value) {
    this._Attached = value;
};
Expression.prototype.GetUpdating = function () {
    return this._Updating;
};
Expression.prototype.SetUpdating = function (value) {
    this._Updating = value;
};

function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
}
TemplateBindingExpression.InheritFrom(Expression);
TemplateBindingExpression.prototype.GetValue = function (propd) {
    var source = this.Target.GetTemplateOwner();
    var value = null;
    if (source != null)
        value = source.GetValue(this.SourceProperty);
    return value; //TODO: Send through TypeConverter
};
TemplateBindingExpression.prototype._OnAttached = function (element) {
    Expression.prototype._OnAttached.call(this, element);
    this.Target = element;
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        listener = null;
        this.SetListener(listener);
    }
    var c = RefObject.As(this.Target, ContentControl);
    if (this.TargetProperty === ContentControl.ContentProperty && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }
    var source = this.Target.GetTemplateOwner();
    if (source != null) {
        listener = new PropertyChangedListener(source, this.SourceProperty, this, this.OnPropertyChanged);
        this.SetListener(listener);
    }
};
TemplateBindingExpression.prototype._OnDetached = function (element) {
    Expression.prototype._OnDetached.call(this, element);
    var listener = this.GetListener();
    if (listener == null)
        return;
    var c = RefObject.As(this.Target, ContentControl);
    if (c != null)
        c._ContentSetsParent = this.SetsParent;
    listener.Detach();
    listener = null;
    this.SetListener(listener);
    this.Target = null;
};
TemplateBindingExpression.prototype.OnPropertyChanged = function (sender, args) {
    try {
        this.SetUpdating(true);
        try {
            this.Target.SetValue(this.TargetProperty, this.GetValue(null));
        } catch (err2) {
            this.Target.SetValue(this.TargetProperty, this.TargetProperty.GetDefaultValue(this.Target));
        }
    } catch (err) {
    } finally {
        this.SetUpdating(false);
    }
};
TemplateBindingExpression.prototype.GetListener = function () {
    return this._Listener;
};
TemplateBindingExpression.prototype.SetListener = function (value) {
    this._Listener = value;
};

function Validators() {
}
Validators.StyleValidator = function (instance, propd, value, error) {
    NotImplemented("Validators.StyleValidator");
    return true;
};

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

function _VisualTreeWalker(obj, direction) {
    RefObject.call(this);
    if (!obj)
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

function CollectionChangedArgs(action, oldValue, newValue, index) {
    RefObject.call(this);
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}
CollectionChangedArgs.InheritFrom(RefObject);
CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};

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

function ItemChangedArgs(item, propd, oldValue, newValue) {
    RefObject.call(this);
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}
ItemChangedArgs.InheritFrom(RefObject);

function _InheritedContext() {
    RefObject.call(this);
    if (arguments.length > 2) {
        this._InitFull.apply(this, arguments);
    } else if (arguments.length == 2) {
        this._InitFromObj(arguments[0], arguments[1]);
    }
}
_InheritedContext.InheritFrom(RefObject);
_InheritedContext.prototype._InitFull = function () {
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
};
_InheritedContext.prototype._InitFromObj = function (obj, parentContext) {
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
    var walkPropd = null;
    var walker = new _DeepStyleWalker(this._Style);
    var setter;
    while (setter = walker.Step()) {
        walkPropd = setter.GetValue_Prop();
        if (walkPropd != propd)
            continue;
        newValue = setter.GetValue_Prop();
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
            oldProp = oldSetter.GetProperty();
        if (newSetter)
            newProp = newSetter.GetProperty();
        if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
            oldValue = oldSetter.GetValue_Prop();
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        } else if (oldProp === newProp) {
            oldValue = oldSetter.GetValue_Prop();
            newValue = newSetter.GetValue_Prop();
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
            oldValue = null;
            newValue = newSetter.GetValue_Prop();
            this._ht[newProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, newProp, oldValue, newValue, true, true, false, error);
            newSetter = newWalker.Step();
        }
    }
    this._Style = style;
};

function BindingBase() {
    RefObject.call(this);
}
BindingBase.InheritFrom(RefObject);
BindingBase.prototype.CheckSealed = function () {
    if (this.GetSealed())
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.prototype.Seal = function () {
    this.SetSealed(true);
};
BindingBase.prototype.GetFallbackValue = function () {
    return this._FallbackValue;
};
BindingBase.prototype.SetFallbackValue = function (value) {
    this.CheckSealed();
    this._FallbackValue = value;
};
BindingBase.prototype.GetSealed = function () {
    return this._Sealed;
};
BindingBase.prototype.SetSealed = function (value) {
    this._Sealed = value;
};
BindingBase.prototype.GetStringFormat = function () {
    return this._StringFormat;
};
BindingBase.prototype.SetStringFormat = function (value) {
    this.CheckSealed();
    this._StringFormat = value;
};
BindingBase.prototype.GetTargetNullValue = function () {
    return this._TargetNullValue;
};
BindingBase.prototype.SetTargetNullValue = function (value) {
    this.CheckSealed();
    this._TargetNullValue = value;
};

function BindingExpressionBase(binding, target, propd) {
    Expression.call(this);
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
}
BindingExpressionBase.InheritFrom(Expression);
BindingExpressionBase.prototype.GetValue = function (propd) {
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
BindingExpressionBase.prototype._OnAttached = function (element) {
    if (this.GetAttached())
        return;
    Expression.prototype._OnAttached.call(this, element);
    this._CalculateDataSource();
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Subscribe(this._TextBoxLostFocus, this);
    var targetFE = RefObject.As(element, FrameworkElement);
    if (this.GetBinding().GetMode() === BindingMode.TwoWay && this.GetProperty()._IsCustom) {
        var updateDataSourceCallback = function () {
            try {
                if (!this.GetUpdating())
                    this._TryUpdateSourceObject(this.GetTarget().GetValue(this.GetProperty()));
            } catch (err) {
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.GetTarget(), this.GetProperty(), this, updateDataSourceCallback);
    }
};
BindingExpressionBase.prototype._OnDetached = function (element) {
    if (!this.GetAttached())
        return;
    Expression.prototype._OnDetached.call(this, element);
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Unsubscribe(this._TextBoxLostFocus, this);
    var targetFE = RefObject.As(element, FrameworkElement);
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
BindingExpressionBase.prototype._TextBoxLostFocus = function () {
    this._UpdateSourceObject();
};
BindingExpressionBase.prototype._TryUpdateSourceObject = function (value) {
    if (!this.GetUpdating() && this.GetBinding().GetUpdateSourceTrigger() === UpdateSourceTrigger.Default) {
        this._UpdateSourceObject(value, false);
    }
};
BindingExpressionBase.prototype._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = GetTarget().GetValue(GetProperty());
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
                if (RefObject.RefEquals(this.GetBinding().GetTargetNullValue(), value))
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
BindingExpressionBase.prototype._MaybeEmitError = function (dataError, exception) {
    NotImplemented("BindingExpressionBase._MaybeEmitError");
};
BindingExpressionBase.prototype._ConvertFromTargetToSource = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromTargetToSource");
    return value;
};
BindingExpressionBase.prototype._ConvertFromSourceToTarget = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromSourceToTarget");
    return value;
};
BindingExpressionBase.prototype._ConvertToType = function (propd, value) {
    NotImplemented("BindingExpressionBase._ConvertToType");
    return value;
};
BindingExpressionBase.prototype._AttachToNotifyError = function (element) {
    NotImplemented("BindingExpressionBase._AttachToNotifyError");
};
BindingExpressionBase.prototype._NotifyErrorsChanged = function (o, e) {
    NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
};
BindingExpressionBase.prototype._CalculateDataSource = function () {
    var source = null;
    if (this.GetBinding().GetSource() != null) {
        this.GetPropertyPathWalker().Update(this.GetBinding().GetSource());
    } else if (this.GetBinding().GetElementName() != null) {
        source = this._FindSourceByElementName();
        var feTarget = RefObject.As(this.GetTarget(), FrameworkElement);
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
        var fe = RefObject.As(this.GetTarget(), FrameworkElement);
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
BindingExpressionBase.prototype.SetDataContextSource = function (value) {
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
BindingExpressionBase.prototype._InvalidateAfterMentorChanged = function (sender, e) {
    this.GetTarget().MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
    var source = this._FindSourceByElementName();
    if (source == null) {
        this.GetTarget().GetMentor().Loaded.Subscribe(this._HandleFeTargetLoaded, this);
    } else {
        this.GetPropertyPathWalker().Update(source);
    }
    this._Invalidate();
    this.GetTarget().SetValue(this.GetProperty(), this);
};
BindingExpressionBase.prototype._HandleFeTargetLoaded = function (sender, e) {
    var fe = sender;
    fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);
    var source = this._FindSourceByElementName();
    if (source != null)
        this.GetPropertyPathWalker().Update(source);
    this._Invalidate();
    this.GetTarget().SetValue(this.GetProperty(), this);
};
BindingExpressionBase.prototype._FindSourceByElementName = function () {
    var source = null;
    var fe = RefObject.As(this.GetTarget(), FrameworkElement);
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
BindingExpressionBase.prototype._Invalidate = function () {
    this._Cached = false;
    this._CachedValue = null;
};
BindingExpressionBase.prototype._MentorChanged = function (sender, e) {
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
BindingExpressionBase.prototype._ParentChanged = function (sender, e) {
    try {
        var targetFE = this.GetTarget();
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
    }
};
BindingExpressionBase.prototype._DataContextChanged = function (sender, e) {
    try {
        var fe = sender;
        this.GetPropertyPathWalker().Update(fe.GetDataContext());
        if (this.GetBinding().GetMode() === BindingMode.OneTime)
            this.Refresh();
    } catch (err) {
        Warn(err.message);
    }
};
BindingExpressionBase.prototype._PropertyPathValueChanged = function () {
    this.Refresh();
};
BindingExpressionBase.prototype.Refresh = function () {
    var dataError = null;
    var exception = null;
    if (!this.GetAttached())
        return;
    var oldUpdating = this.GetUpdating();
    try {
        this.SetUpdating(true);
        this._Invalidate();
        this.GetTarget().SetValue(this.GetProperty(), this);
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
BindingExpressionBase.prototype.GetBinding = function () {
    return this._Binding;
};
BindingExpressionBase.prototype.GetCurrentError = function () {
    return this._CurrentError;
};
BindingExpressionBase.prototype.SetCurrentError = function (/* ValidationError */value) {
    this._CurrentError = value;
};
BindingExpressionBase.prototype.GetCurrentNotifyError = function () {
    return this._CurrentNotifyError;
};
BindingExpressionBase.prototype.SetCurrentNotifyError = function (/* INotifyDataErrorInfo */value) {
    this._CurrentNotifyError = value;
};
BindingExpressionBase.prototype.GetDataContextSource = function () {
    return this._DataContextSource;
};
BindingExpressionBase.prototype.GetDataSource = function () {
    return this.GetPropertyPathWalker().GetSource();
};
BindingExpressionBase.prototype.GetIsBoundToAnyDataContext = function () {
    return !this.GetBinding().GetElementName() && this.GetBinding().GetSource() == null;
};
BindingExpressionBase.prototype.GetIsSelfDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && this.GetProperty() !== FrameworkElement.DataContextProperty;
};
BindingExpressionBase.prototype.GetIsParentDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty);
};
BindingExpressionBase.prototype.GetIsMentorDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && !(this.GetTarget() instanceof FrameworkElement);
};
BindingExpressionBase.prototype.GetTarget = function () {
    return this._Target;
};
BindingExpressionBase.prototype.SetTarget = function (/* DependencyObject */value) {
    this._Target = value;
};
BindingExpressionBase.prototype.GetProperty = function () {
    return this._Property;
};
BindingExpressionBase.prototype.SetProperty = function (/* DependencyProperty */value) {
    this._Property = value;
};
BindingExpressionBase.prototype.GetPropertyPathWalker = function () {
    return this._PropertyPathWalker;
};
BindingExpressionBase.prototype.SetPropertyPathWalker = function (/* _PropertyPathWalker */value) {
    this._PropertyPathWalker = value;
};
BindingExpressionBase.prototype.GetIsTwoWayTextBoxText = function () {
    return this.GetTarget() instanceof TextBox && this.GetProperty() === TextBox.TextProperty && this.GetBinding().GetMode() === BindingMode.TwoWay;
};

function CurrentChangedListener(source, closure, func) {
    RefObject.call(this);
    if (!source)
        return;
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    this._Source.CurrentChanged.Subscribe(this, this.OnCurrentChangedInternal);
}
CurrentChangedListener.InheritFrom(RefObject);
CurrentChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.CurrentChanged.Unsubscribe(this, this.OnCurrentChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
CurrentChangedListener.prototype.OnCurrentChangedInternal = function (s, e) {
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

function NPCListener(source, closure, func) {
    RefObject.call(this);
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    if (this._Source)
        this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
}
NPCListener.InheritFrom(RefObject);
NPCListener.prototype.Detach = function () {
    this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
};

function PropertyChangedListener(source, propd, closure, func) {
    RefObject.call(this);
    if (!source)
        return;
    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
}
PropertyChangedListener.InheritFrom(RefObject);
PropertyChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.PropertyChanged.Unsubscribe(this, this.OnPropertyChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
PropertyChangedListener.prototype.OnPropertyChangedInternal = function (s, e) {
    if (e.Property !== this._Property)
        return;
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

function _PropertyPath(path, expandedPath) {
    RefObject.call(this);
    this._Path = path;
    this._ExpandedPath = expandedPath;
}
_PropertyPath.InheritFrom(RefObject);
_PropertyPath.CreateFromParameter = function (parameter) {
    var p = new _PropertyPath();
    p._Propd = RefObject.As(parameter, DependencyProperty);
    p._Path = null;
    if (parameter instanceof String)
        p._Path = parameter;
    return p;
};
_PropertyPath.prototype.HasDependencyProperty = function () {
    return this._Propd != null;
};
_PropertyPath.prototype.TryResolveDependencyProperty = function (dobj) {
    if (this.HasDependencyProperty())
        return;
    if (dobj == null)
        return;
    this._Propd = dobj.GetDependencyProperty(this.GetPath());
};
_PropertyPath.prototype.GetDependencyProperty  = function () {
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
_PropertyPathParser.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathParser.prototype.SetPath = function (value) {
    this._Path = value;
};

function RelativeSource(mode) {
    RefObject.call(this);
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
}
RelativeSource.InheritFrom(RefObject);
RelativeSource.prototype.GetMode = function () {
    return this._Mode;
};
RelativeSource.prototype.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};

function Clock() {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Timers = new Array();
}
Clock.InheritFrom(RefObject);
Clock.prototype.RegisterTimer = function (timer) {
    if (!Array.addDistinctRefObject(this._Timers, timer))
        return;
    if (this._Timers.length === 1)
        this.RequestAnimationTick();
};
Clock.prototype.UnregisterTimer = function (timer) {
    Array.removeRefObject(this._Timers, timer);
};
Clock.prototype.DoTick = function () {
    var nowTime = new Date().getTime();
    if (!this._RunTimers(this._LastTime, nowTime)) {
        return;
    }
    this._LastTime = nowTime;
    this.RequestAnimationTick();
};
Clock.prototype._RunTimers = function (lastTime, nowTime) {
    if (this._Timers.length === 0)
        return false;
    for (var i = 0; i < this._Timers.length; i++) {
        var timer = this._Timers[i];
        timer._Tick(this._LastTime, nowTime);
    }
    return true;
};
Clock.prototype.RequestAnimationTick = function () {
    var clock = this;
    Clock._RequestAnimationFrame(function () { clock.DoTick(); });
};
Clock._RequestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function _DirtyList() {
    RefObject.call(this);
    this._DirtyNodes = new LinkedList();
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

function JsonParser() {
    RefObject.call(this);
}
JsonParser.InheritFrom(RefObject);
JsonParser.prototype.CreateObject = function (json, namescope) {
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
            dobj.SetValue(contentPropd, this.CreateObject(json.Content, namescope));
        }
    } else if (contentPropd != null && contentPropd.constructor === String) {
        var setFunc = dobj["Set" + contentPropd];
        var getFunc = dobj["Get" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope));
        } else if (getFunc) {
            var coll = getFunc.call(dobj);
            for (var j in json.Children) {
                var fobj = this.CreateObject(json.Children[j], namescope);
                if (fobj instanceof DependencyObject)
                    fobj._AddParent(coll, true);
                coll.Add(fobj);
            }
        }
    }
    return dobj;
};
JsonParser.prototype.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached, ownerType, propName) {
    if (!(propValue instanceof RefObject) && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }
    if (propValue instanceof Markup)
        propValue = propValue.Transmute(dobj, propd, this._TemplateBindingSource);
    if (propd) {
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;
        dobj.SetValue(propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propName];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        Warn("Could not find attached property: " + ownerType.GetName() + "." + propName);
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
        if (coll instanceof DependencyObject)
            coll._AddParent(dobj, true);
        dobj.SetValue(propd, coll);
    }
    for (var i in subJson) {
        var fobj = this.CreateObject(subJson[i], namescope);
        if (fobj instanceof DependencyObject)
            fobj._AddParent(coll, true);
        coll.Add(fobj);
    }
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

function Markup() {
    RefObject.call(this);
}
Markup.InheritFrom(RefObject);
Markup.prototype.Transmute = function (propd, templateBindingSource) {
    AbstractMethod("Markup.Transmute");
};

function StaticResourceMarkup(key) {
    Markup.call(this);
    this.Key = key;
}
StaticResourceMarkup.InheritFrom(Markup);
StaticResourceMarkup.prototype.Transmute = function (propd, templateBindingSource) {
    NotImplemented("StaticResourceMarkup.Transmute");
};

function TemplateBindingMarkup(path) {
    Markup.call(this);
    this.Path = path;
}
TemplateBindingMarkup.InheritFrom(Markup);
TemplateBindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};

function AnimationStorage(timeline, targetobj, targetprop) {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Timeline = timeline;
    this._TargetObj = targetobj;
    this._TargetProp = targetprop;
    var prevStorage = targetobj._AttachAnimationStorage(targetprop, this);
    this._BaseValue = this._TargetObj.GetValue(this._TargetProp);
    if (this._BaseValue === undefined) {
        var targetType = this._TargetProp.GetTargetType();
        if (targetType === Number)
            this._BaseValue = 0;
        else if (targetType === RefObject)
            this._BaseValue = new targetType();
        else if (targetType === String)
            this._BaseValue = "";
    }
    if (prevStorage != null)
        this.SetStopValue(prevStorage.GetStopValue());
    else
        this.SetStopValue(targetobj.ReadLocalValue(targetprop));
}
AnimationStorage.InheritFrom(RefObject);
AnimationStorage.prototype.GetStopValue = function () {
    return this._StopValue;
};
AnimationStorage.prototype.SetStopValue = function (value) {
    this._StopValue = value;
};
AnimationStorage.prototype.Enable = function () {
    NotImplemented("AnimationStorage.Enable");
};
AnimationStorage.prototype.Disable = function () {
    NotImplemented("AnimationStorage.Disable");
};
AnimationStorage.prototype.Stop = function () {
    this.DetachFromObject();
    this.ResetPropertyValue();
};
AnimationStorage.prototype.DetachFromObject = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj._DetachAnimationStorage(this._TargetProp, this);
};
AnimationStorage.prototype.ResetPropertyValue = function () {
    if (this._TargetObj == null || this._TargetProp == null)
        return;
    this._TargetObj.SetValue(this._TargetProp, this.GetStopValue());
};
AnimationStorage.prototype.UpdateCurrentValueAndApply = function (progress) {
    if (this._TargetObj == null)
        return;
    this._CurrentValue = this._Timeline._GetCurrentValue(this._BaseValue, this._StopValue !== undefined ? this._StopValue : this._BaseValue, progress);
    this.ApplyCurrentValue();
};
AnimationStorage.prototype.ApplyCurrentValue = function () {
    if (this._CurrentValue == null)
        return;
    this._TargetObj.SetValue(this._TargetProp, this._CurrentValue);
};

function VisualStateChangedEventArgs() {
    RefObject.call(this);
}
VisualStateChangedEventArgs.InheritFrom(RefObject);

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
Color.prototype.Add = function (color2) {
    return new Color(this.R + color2.R, this.G + color2.G, this.B + color2.B, this.A + color2.A);
};
Color.prototype.Subtract = function (color2) {
    return new Color(this.R - color2.R, this.G - color2.G, this.B - color2.B, this.A - color2.A);
};
Color.prototype.Multiply = function (factor) {
    return new Color(this.R * factor, this.G * factor, this.B * factor, this.A * factor);
};
Color.prototype._Translate = function () {
    return this.toString();
};
Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};

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

function Duration(value) {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
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
}
Duration.InheritFrom(RefObject);
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
Duration.prototype.GetType = function () {
    return this._Type;
};
Duration.prototype.GetTimeSpan = function () {
    if (this.HasTimeSpan())
        return this._TimeSpan;
    throw new InvalidOperationException();
};
Duration.prototype.HasTimeSpan = function () {
    return this.GetType() === DurationType.TimeSpan;
};

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
    this._PurgeCache();
    return true;
};
Font.prototype.GetStretch = function () {
    return this._Stretch;
};
Font.prototype.SetStretch = function (value) {
    if (this._Stretch == value)
        return false;
    this._Stretch = value;
    this._PurgeCache();
    return true;
};
Font.prototype.GetStyle = function () {
    return this._Style;
};
Font.prototype.SetStyle = function (value) {
    if (this._Style == value)
        return false;
    this._Style = value;
    this._PurgeCache();
    return true;
};
Font.prototype.GetWeight = function () {
    return this._Weight;
};
Font.prototype.SetWeight = function (value) {
    if (this._Weight == value)
        return false;
    this._Weight = value;
    this._PurgeCache();
    return true;
};
Font.prototype.GetSize = function () {
    return this._Size;
};
Font.prototype.SetSize = function (value) {
    if (this._Size == value)
        return false;
    this._Size = value;
    this._PurgeCache();
    return true;
};
Font.prototype.GetActualHeight = function () {
    return Surface._MeasureHeight(this);
};
Font.prototype._Descender = function () { return 0.0; }; //most likely removable
Font.prototype._Ascender = function () { return 0.0; }; //most likely removable
Font.prototype._PurgeCache = function () {
    this._CachedHeight = undefined;
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
Font.DEFAULT_FAMILY = "'Lucida Sans Unicode'";
Font.DEFAULT_STRETCH = FontStretches.Normal;
Font.DEFAULT_STYLE = FontStyles.Normal;
Font.DEFAULT_WEIGHT = FontWeights.Normal;
Font.DEFAULT_SIZE = "11px";

function KeyTime() {
    RefObject.call(this);
}
KeyTime.InheritFrom(RefObject);
KeyTime.CreateUniform = function () {
    var kt = new KeyTime();
    kt._IsUniform = true;
    return kt;
};
KeyTime.prototype.IsPaced = function () {
    return this._IsPaced == true;
};
KeyTime.prototype.IsUniform = function () {
    return this._IsUniform == true;
};

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
Size.prototype.Copy = function () {
    return new Size(this.Width, this.Height);
};

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

function TimeSpan() {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Initialize.apply(this, arguments);
}
TimeSpan.InheritFrom(RefObject);
TimeSpan.prototype._Initialize = function () {
    if (arguments.length === 0) {
        this._Ticks = 0;
        return;
    }
    if (arguments.length === 1) { //ticks
        this._Ticks = arguments[0];
        return;
    }
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    if (arguments.length === 3) { //hours, minutes, seconds
        hours = arguments[0];
        minutes = arguments[1];
        seconds = arguments[2];
    } else if (arguments.length === 4) { //days, hours, minutes, seconds
        days = arguments[0];
        hours = arguments[1];
        minutes = arguments[2];
        seconds = arguments[3];
    } else if (arguments.length === 5) { //days, hours, minutes, seconds, milliseconds
        days = arguments[0];
        hours = arguments[1];
        minutes = arguments[2];
        seconds = arguments[3];
        milliseconds = arguments[4];
    }
    this._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute)
        + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
};
TimeSpan.prototype.GetDays = function () {
    return Math.floor(this._Ticks / TimeSpan._TicksPerDay);
};
TimeSpan.prototype.GetHours = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    return Math.floor(remTicks / TimeSpan._TicksPerHour);
};
TimeSpan.prototype.GetMinutes = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    return Math.floor(remTicks / TimeSpan._TicksPerMinute);
};
TimeSpan.prototype.GetSeconds = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    return Math.floor(remTicks / TimeSpan._TicksPerSecond);
};
TimeSpan.prototype.GetMilliseconds = function () {
    var remTicks = this._Ticks % TimeSpan._TicksPerDay;
    remTicks = remTicks % TimeSpan._TicksPerHour;
    remTicks = remTicks % TimeSpan._TicksPerMinute;
    remTicks = remTicks % TimeSpan._TicksPerSecond;
    return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
};
TimeSpan.prototype.GetTicks = function () {
    return this._Ticks;
};
TimeSpan.prototype.GetTotalDays = function () {
    return this._Ticks / TimeSpan._TicksPerDay;
};
TimeSpan.prototype.GetTotalHours = function () {
    return this._Ticks / TimeSpan._TicksPerHour;
};
TimeSpan.prototype.GetTotalMinutes = function () {
    return this._Ticks / TimeSpan._TicksPerMinute;
};
TimeSpan.prototype.GetTotalSeconds = function () {
    return this._Ticks / TimeSpan._TicksPerSecond;
};
TimeSpan.prototype.GetTotalMilliseconds = function () {
    return this._Ticks / TimeSpan._TicksPerMillisecond;
};
TimeSpan.prototype.AddTicks = function (ticks) {
    if (ticks == null)
        return;
    if (isNaN(ticks))
        return;
    this._Ticks += ticks;
};
TimeSpan.prototype.AddMilliseconds = function (milliseconds) {
    this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
};
TimeSpan.prototype.Add = function (ts2) {
    return new TimeSpan(this._Ticks + ts2._Ticks);
};
TimeSpan.prototype.Subtract = function (ts2) {
    return new TimeSpan(this._Ticks - ts2._Ticks);
};
TimeSpan.prototype.Multiply = function (v) {
    if (v instanceof TimeSpan) {
    } else if (typeof v == "number") {
        return new TimeSpan(Math.round(this._Ticks * v));
    }
}
TimeSpan.prototype.Divide = function (ts2) {
    return new TimeSpan(this._Ticks / ts2._Ticks);
};
TimeSpan.prototype.CompareTo = function (ts2) {
    if (this._Ticks === ts2)
        return 0;
    return (this._Ticks > ts2) ? 1 : -1;
};
TimeSpan.prototype.IsZero = function () {
    return this._Ticks === 0;
};
TimeSpan._TicksPerMillisecond = 1;
TimeSpan._TicksPerSecond = 1000;
TimeSpan._TicksPerMinute = TimeSpan._TicksPerSecond * 60;
TimeSpan._TicksPerHour = TimeSpan._TicksPerMinute * 60;
TimeSpan._TicksPerDay = TimeSpan._TicksPerHour * 24;

function Uri(os) {
    RefObject.call(this);
    if (!os)
        return;
    this._OriginalString = os;
}
Uri.InheritFrom(RefObject);
Uri.prototype.GetFragment = function () {
};
Uri.prototype.toString = function () {
    return this._OriginalString;
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
BError.prototype.CreateException = function () {
    return new Exception();
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
    this.Clear();
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

function _TextLayoutAttributes(source, start) {
    LinkedListNode.call(this);
    this._Source = source;
    this._Start = start == null ? 0 : start;
}
_TextLayoutAttributes.InheritFrom(LinkedListNode);
_TextLayoutAttributes.prototype.GetBackground = function (selected) { return this._Source.GetBackground(selected); };
_TextLayoutAttributes.prototype.GetForeground = function (selected) { return this._Source.GetForeground(selected); };
_TextLayoutAttributes.prototype.GetFont = function () { return this._Source.GetFont(); };
_TextLayoutAttributes.prototype.GetDirection = function () { return this._Source.GetDirection(); };
_TextLayoutAttributes.prototype.IsUnderlined = function () { return this._Source.GetTextDecorations() & TextDecorations.Underline; };

function FrameworkElementPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
    this._ActualHeight = null;
    this._ActualWidth = null;
    this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
FrameworkElementPropertyValueProvider.InheritFrom(_PropertyValueProvider);
FrameworkElementPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd !== FrameworkElement.ActualHeightProperty && propd !== FrameworkElement.ActualWidthProperty)
        return undefined;
    var actual = this._Object._ComputeActualSize();
    if (!this._Last.Equals(actual)) {
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

function LayoutInformation() {
    RefObject.call(this);
}
LayoutInformation.InheritFrom(RefObject);
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

function LayoutPass() {
    RefObject.call(this);
    this._MeasureList = new LinkedList();
    this._ArrangeList = new LinkedList();
    this._SizeList = new LinkedList();
    this._Count = 0;
    this._Updated = false;
}
LayoutPass.InheritFrom(RefObject);
LayoutPass.MaxCount = 250;

function UIElementNode(element) {
    LinkedListNode.call(this);
    this.UIElement = element;
}
UIElementNode.InheritFrom(LinkedListNode);

function _AutoCreatePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_AutoCreatePropertyValueProvider.InheritFrom(_PropertyValueProvider);
_AutoCreatePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    var value = this.ReadLocalValue(propd);
    if (value !== undefined)
        return value;
    value = propd._IsAutoCreated() ? propd._GetAutoCreatedValue(this._Object) : null;
    if (value == null)
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

function _DefaultValuePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
}
_DefaultValuePropertyValueProvider.InheritFrom(_PropertyValueProvider);
_DefaultValuePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return propd.DefaultValue;
};

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
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = null;
            delete this._ht[oldProp];
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
        }
        else if (oldProp == newProp) {
            oldValue = oldSetter.GetValue(Setter.ValueProperty);
            newValue = newSetter.GetValue(Setter.ValueProperty);
            this._ht[oldProp] = newValue;
            this._Object._ProviderValueChanged(this._PropertyPrecedence, oldProp, oldValue, newValue, true, true, false, error);
            oldSetter = oldWalker.Step();
            newSetter = newWalker.Step();
        } else {
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
    if (RefObject.RefEquals(this._Source, source))
        return;
    var oldValue = this._Source != null ? this._Source.GetValue(FrameworkElement.DataContextProperty) : null;
    var newValue = source != null ? source.GetValue(FrameworkElement.DataContextProperty) : null;
    this._DetachListener(this._Source);
    this._Source = source;
    this._AttachListener(this._Source);
    if (!RefObject.Equals(oldValue, newValue)) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
    }
};
_InheritedDataContextPropertyValueProvider.prototype._AttachListener = function (source) {
    if (source != null) {
        this._DataContextListener = new PropertyChangedListener(source, FrameworkElement.DataContextProperty, this, this._SourceDataContextChanged);
    }
};
_InheritedDataContextPropertyValueProvider.prototype._DetachListener = function (source) {
    if (this._DataContextListener != null) {
        this._DataContextListener.Detach();
        this._DataContextListener = null;
    }
    if (source != null) {
    }
};
_InheritedDataContextPropertyValueProvider.prototype._SourceDataContextChanged = function (sender, args) {
    var error = new BError();
    this._Object._ProviderValueChanged(this._PropertyPrecedence, args.Property, args.OldValue, args.NewValue, true, false, false, error);
};
_InheritedDataContextPropertyValueProvider.prototype.EmitChanged = function () {
    if (this._Source != null) {
        var error = new BError();
        this._Object._ProviderValueChanged(this._PropertyPrecedence, FrameworkElement.DataContextProperty, null, this._Source.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
    }
};

function _InheritedIsEnabledPropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._Source = null;
    this._CurrentValue = this._Object.GetValue(Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
}
_InheritedIsEnabledPropertyValueProvider.InheritFrom(_PropertyValueProvider);
_InheritedIsEnabledPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd === Control.IsEnabledProperty)
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
            return this === args.Property; //Closure - Control.IsEnabledProperty
        };
        source.PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Control.IsEnabledProperty);
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._DetachListener = function (source) {
    if (source) {
        source.PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Control.IsEnabledProperty);
    }
};
_InheritedIsEnabledPropertyValueProvider.prototype._IsEnabledChanged = function (sender, args) {
    this.LocalValueChanged(args.Property);
};
_InheritedIsEnabledPropertyValueProvider.prototype.LocalValueChanged = function (propd) {
    if (propd && propd !== Control.IsEnabledProperty)
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

function _LocalValuePropertyValueProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.ProvidesLocalValue);
    this._ht = new Array();
}
_LocalValuePropertyValueProvider.InheritFrom(_PropertyValueProvider);
_LocalValuePropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    return this._ht[propd];
};
_LocalValuePropertyValueProvider.prototype.SetValue = function (propd, value) {
    this._ht[propd] = value;
};
_LocalValuePropertyValueProvider.prototype.ClearValue = function (propd) {
    delete this._ht[propd];
};

function Binding(path) {
    BindingBase.call(this);
    if (!path)
        path = "";
    this.SetMode(BindingMode.OneWay);
    this.SetPath(new _PropertyPath(path));
    this.SetValidatesOnNotifyDataErrors(true);
    this.SetUpdateSourceTrigger(UpdateSourceTrigger.Default);
}
Binding.InheritFrom(BindingBase);
Binding.prototype.GetBindsDirectlyToSource = function () { return this._BindsDirectlyToSource; };
Binding.prototype.SetBindsDirectlyToSource = function (/* Boolean */value) { this.CheckSealed(); this._BindsDirectlyToSource = value; };
Binding.prototype.GetConverter = function () { return this._Converter; };
Binding.prototype.SetConverter = function (/* IValueConverter */value) { this.CheckSealed(); this._Converter = value; };
Binding.prototype.GetConverterCulture = function () { return this._ConverterCulture; };
Binding.prototype.SetConverterCulture = function (/* Culture */value) { this.CheckSealed(); this._ConverterCulture = value; };
Binding.prototype.GetConverterParameter = function () { return this._ConverterParameter; };
Binding.prototype.SetConverterParameter = function (/* Object */value) { this.CheckSealed(); this._ConverterParameter = value; };
Binding.prototype.GetElementName = function () { return this._ElementName; };
Binding.prototype.SetElementName = function (/* String */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("ElementName cannot be set if either RelativeSource or Source is set");
    this._ElementName = value;
};
Binding.prototype.GetMode = function () { return this._Mode; };
Binding.prototype.SetMode = function (/* Number */value) { this.CheckSealed(); this._Mode = value; };
Binding.prototype.GetNotifyOnValidationError = function () { return this._NotifyOnValidationError; };
Binding.prototype.SetNotifyOnValidationError = function (/* Boolean */value) { this.CheckSealed(); this._NotifyOnValidationError = value; };
Binding.prototype.GetRelativeSource = function () {
    return this._RelativeSource; 
 };
Binding.prototype.SetRelativeSource = function (/* RelativeSource */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetElementName() != null)
        throw new InvalidOperationException("RelativeSource cannot be set if either ElementName or Source is set");
    this._RelativeSource = value;
};
Binding.prototype.GetPath = function () { return this._Path; };
Binding.prototype.SetPath = function (/* PropertyPath */value) {
    this.CheckSealed();
    if (value.HasDependencyProperty())
        throw new ArgumentException("PropertyPaths which are instantiated with a DependencyProperty are not supported");
    this._Path = value;
};
Binding.prototype.GetSource = function () { return this._Source; };
Binding.prototype.SetSource = function (/* RefObject */value) {
    this.CheckSealed();
    if (this.GetElementName() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("Source cannot be set if either ElementName or RelativeSource is set");
    this._Source = value; 
};
Binding.prototype.GetUpdateSourceTrigger = function () { return this._UpdateSourceTrigger; };
Binding.prototype.SetUpdateSourceTrigger = function (/* Number */value) { this.CheckSealed(); this._UpdateSourceTrigger = value; };
Binding.prototype.GetValidatesOnExceptions = function () { return this._ValidatesOnExceptions; };
Binding.prototype.SetValidatesOnExceptions = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnExceptions = value; };
Binding.prototype.GetValidatesOnDataErrors = function () { return this._ValidatesOnDataErrors; };
Binding.prototype.SetValidatesOnDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnDataErrors = value; };
Binding.prototype.GetValidatesOnNotifyDataErrors = function () { return this._ValidatesOnNotifyDataErrors; };
Binding.prototype.SetValidatesOnNotifyDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnNotifyDataErrors = value; };

function BindingExpression(binding, target, propd) {
    BindingExpressionBase.call(this, binding, target, propd);
}
BindingExpression.InheritFrom(BindingExpressionBase);
BindingExpression.prototype.GetParentBinding = function () {
    return this.GetBinding();
};
BindingExpression.prototype.GetDataItem = function () {
    return this.GetDataSource();
};
BindingExpression.prototype.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};

function ICollectionView() {
    RefObject.call(this);
    this.CurrentChanged = new MulticastEvent();
}
ICollectionView.InheritFrom(RefObject);

function INotifyPropertyChanged() {
    RefObject.call(this);
    this.PropertyChanged = new MulticastEvent();
}
INotifyPropertyChanged.InheritFrom(RefObject);
INotifyPropertyChanged.prototype.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

function PropertyChangedEventArgs() {
    EventArgs.call(this);
}
PropertyChangedEventArgs.InheritFrom(EventArgs);
PropertyChangedEventArgs.prototype.GetPropertyName = function () {
    return this._PropertyName;
};
PropertyChangedEventArgs.prototype.SetPropertyName = function (value) {
    this._PropertyName = value;
};

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
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.prototype.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.prototype.SetSource = function (value) {
    if (value == null || !RefObject.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }
        this._Source = value;
        if (this._Source != null && this._Source instanceof RefObject && this._Source.DoesImplement(INotifyPropertyChanged)) {
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
_PropertyPathNode.prototype.GetIsBroken = function () {
    return this._IsBroken;
};
_PropertyPathNode.prototype.SetIsBroken = function (value) {
    this._IsBroken = value;
};
_PropertyPathNode.prototype.GetDependencyProperty = function () {
    return this._DependencyProperty;
};
_PropertyPathNode.prototype.SetDependencyProperty = function (value) {
    this._DependencyProperty = value;
};
_PropertyPathNode.prototype.GetNext = function () {
    return this._Next;
};
_PropertyPathNode.prototype.SetNext = function (value) {
    this._Next = value;
};
_PropertyPathNode.prototype.GetPropertyInfo = function () {
    return this._PropertyInfo;
};
_PropertyPathNode.prototype.SetPropertyInfo = function (value) {
    this._PropertyInfo = value;
};
_PropertyPathNode.prototype.GetListener = function () {
    return this._Listener;
};
_PropertyPathNode.prototype.SetListener = function (value) {
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
    this.GetFinalNode().IsBrokenChanged.Subscribe(function (s, a) {
        this.SetValueInternal(RefObject.As(s, _PropertyPathNode).GetValue());
        this.IsBrokenChanged.Raise(this, new EventArgs());
    },
    this);
    this.GetFinalNode().ValueChanged.Subscribe(function (s, a) {
        this.SetValueInternal(RefObject.As(s, _PropertyPathNode).GetValue());
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
_PropertyPathWalker.prototype.GetSource = function () {
    return this._Source;
};
_PropertyPathWalker.prototype.SetSource = function (value) {
    this._Source = value;
};
_PropertyPathWalker.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathWalker.prototype.SetPath = function (value) {
    this._Path = value;
};
_PropertyPathWalker.prototype.GetValueInternal = function () {
    return this._ValueInternal;
};
_PropertyPathWalker.prototype.SetValueInternal = function (value) {
    this._ValueInternal = value;
};
_PropertyPathWalker.prototype.GetIsDataContextBound = function () {
    return this._IsDataContextBound;
};
_PropertyPathWalker.prototype.SetIsDataContextBound = function (value) {
    this._IsDataContextBound = value;
};
_PropertyPathWalker.prototype.GetNode = function () {
    return this._Node;
};
_PropertyPathWalker.prototype.SetNode = function (value) {
    this._Node = value;
};
_PropertyPathWalker.prototype.GetFinalNode = function () {
    return this._FinalNode;
};
_PropertyPathWalker.prototype.SetFinalNode = function (value) {
    this._FinalNode = value;
};
_PropertyPathWalker.prototype.GetIsPathBroken = function () {
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
_StandardPropertyPathNode.prototype.GetTypeName = function () {
    return this._STypeName;
};
_StandardPropertyPathNode.prototype.GetPropertyName = function () {
    return this._PropertyName;
};

function DirtyNode(element) {
    LinkedListNode.call(this);
    this.Element = element;
}
DirtyNode.InheritFrom(LinkedListNode);

function FocusChangedNode(lostFocus, gotFocus) {
    LinkedListNode.call(this);
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
}
FocusChangedNode.InheritFrom(LinkedListNode);

function Surface(app) {
    RefObject.call(this);
    if (!IsDocumentReady())
        return;
    this._App = app;
    this._Clock = new Clock();
    this._InputList = new LinkedList();
    this._FocusChangedEvents = new LinkedList();
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
Surface.prototype._Attach = function (element) {
    if (this._TopLevel) {
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
    };
    setTimeout(postAttach, 1);
};
Surface.prototype._AttachLayer = function (layer) {
    if (RefObject.RefEquals(layer, this._TopLevel))
        this._Layers.Insert(0, layer);
    else
        this._Layers.Add(layer);
    layer._FullInvalidate(true);
    layer._InvalidateMeasure();
    layer._SetIsAttached(true);
    layer._SetIsLoaded(true);
};
Surface.prototype._HandleTopLevelLoaded = function (sender, args) {
    var element = sender;
    this._TopLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded);
    if (RefObject.RefEquals(element, this._TopLevel)) {
        element._UpdateTotalRenderVisibility();
        element._UpdateTotalHitTestVisibility();
        element._FullInvalidate(true);
        element._InvalidateMeasure();
    }
};
Surface.prototype._IsTopLevel = function (top) {
    if (!top || !this._Layers)
        return false;
    var ret = false; //TODO: full-screen message
    var count = this._Layers.GetCount();
    for (var i = 0; i < count && !ret; i++) {
        var layer = this._Layers.GetValueAt(i);
        ret = RefObject.RefEquals(top, layer);
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
    if (!this._InvalidatedRect)
        this._InvalidatedRect = rect;
    else
        this._InvalidatedRect = this._InvalidatedRect.Union(rect);
    this._QueueRender();
};
Surface.prototype._QueueRender = function () {
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
Surface.prototype._AddDirtyElement = function (element, dirt) {
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
};
Surface.prototype._RemoveDirtyElement = function (element) {
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
        if (RefObject.RefEquals(ui1.UIElement, ui2.UIElement)) {
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
Surface.prototype.SetMouseCapture = function (uie) {
    if (this._Captured || this._PendingCapture)
        return RefObject.RefEquals(uie, this._Captured) || RefObject.RefEquals(uie, this._PendingCapture);
    if (!this._EmittingMouseEvent)
        return false;
    this._PendingCapture = uie;
    return true;
};
Surface.prototype.ReleaseMouseCapture = function (uie) {
    if (!RefObject.RefEquals(uie, this._Captured) && !RefObject.RefEquals(uie, this._PendingCapture))
        return;
    if (this._EmittingMouseEvent)
        this._PendingReleaseCapture = true;
    else
        this._PerformReleaseCapture();
};
Surface.prototype._PerformCapture = function (uie) {
    this._Captured = uie;
    var newInputList = new LinkedList();
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
    this._HandleMouseEvent("noop", null, this._CurrentPos, false, true);
};
Surface.prototype._FocusElement = function (uie) {
    if (RefObject.RefEquals(uie, this._FocusedElement))
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
Surface.MeasureText = function (text, font) {
    if (!Surface._TestCanvas)
        Surface._TestCanvas = document.createElement('canvas');
    var ctx = Surface._TestCanvas.getContext('2d');
    ctx.font = font._Translate();
    return new Size(ctx.measureText(text).width, Surface._MeasureHeight(font));
};
Surface._MeasureHeight = function (font) {
    if (font._CachedHeight)
        return font._CachedHeight;
    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font._Translate() + ";");
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

function BindingMarkup(data) {
    Markup.call(this);
    if (!data)
        data = {};
    this._Data = data;
}
BindingMarkup.InheritFrom(Markup);
BindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    return new BindingExpression(this._BuildBinding(), target, propd);
};
BindingMarkup.prototype._BuildBinding = function () {
    var b = new Binding(this._Data.Path);
    if (this._Data.FallbackValue !== undefined)
        b.SetFallbackValue(this._Data.FallbackValue);
    if (this._Data.Mode !== undefined)
        b.SetMode(this._Data.Mode);
    return b;
};

function Clip(rect) {
    Rect.call(this);
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
}
Clip.InheritFrom(Rect);

function _TextBlockDynamicPropertyValueProvider(obj, propPrecedence) {
    FrameworkElementPropertyValueProvider.call(this, obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
}
_TextBlockDynamicPropertyValueProvider.InheritFrom(FrameworkElementPropertyValueProvider);
_TextBlockDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return FrameworkElementPropertyValueProvider.prototype.GetPropertyValue.call(this, propd);
};

function _TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    FrameworkElementPropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
}
_TextBoxBaseDynamicPropertyValueProvider.InheritFrom(FrameworkElementPropertyValueProvider);
_TextBoxBaseDynamicPropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;
    FrameworkElementPropertyValueProvider.prototype.RecomputePropertyValue.call(this, propd, providerFlags, error);
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
    return FrameworkElementPropertyValueProvider.prototype.GetPropertyValue.call(this, propd);
};
_TextBoxBaseDynamicPropertyValueProvider.prototype._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(new Color(68, 68, 68));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(new Color(255, 255, 255));
};

function _TextBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!obj)
        return;
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence,
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
}
_TextBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

function DependencyObject() {
    RefObject.call(this);
    this._Initialize();
}
DependencyObject.InheritFrom(RefObject);
DependencyObject.NameProperty = DependencyProperty.RegisterFull("Name", function () { return String; }, DependencyObject, "", null, null, false, DependencyObject._NameValidator);
DependencyObject.prototype.GetName = function () {
    return this.GetValue(DependencyObject.NameProperty);
};
DependencyObject.prototype.SetName = function (value) {
    this.SetValue(DependencyObject.NameProperty, value);
};
DependencyObject.prototype.GetTemplateOwner = function () {
    return this._TemplateOwner;
};
DependencyObject.prototype.SetTemplateOwner = function (value) {
    this._TemplateOwner = value;
};
DependencyObject.prototype.GetMentor = function () {
    return this._Mentor;
};
DependencyObject.prototype.SetMentor = function (value) {
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
DependencyObject.prototype.GetDependencyProperty = function (propName) {
    return DependencyProperty.GetDependencyProperty(this.constructor, propName);
};
DependencyObject.prototype._Initialize = function () {
    this._IsAttached = false;
    this._Providers = new Array();
    this._Providers[_PropertyPrecedence.LocalValue] = new _LocalValuePropertyValueProvider(this, _PropertyPrecedence.LocalValue);
    this._Providers[_PropertyPrecedence.DefaultValue] = new _DefaultValuePropertyValueProvider(this, _PropertyPrecedence.DefaultValue);
    this._Providers[_PropertyPrecedence.AutoCreate] = new _AutoCreatePropertyValueProvider(this, _PropertyPrecedence.AutoCreate);
    this._ProviderBitmasks = new Array();
    this._SecondaryParents = new Array();
    this.PropertyChanged = new MulticastEvent();
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
        if (!RefObject.RefEquals(expression, existing)) {
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
    if ((currentValue = this.ReadLocalValue(propd)) == null)
        if (propd._IsAutoCreated())
            currentValue = this._Providers[_PropertyPrecedence.AutoCreate].ReadLocalValue(propd);
    if (currentValue != null && value != null) {
        if (currentValue instanceof RefObject) {
            equal = !propd._AlwaysChange && RefObject.RefEquals(currentValue, value);
        } else {
            equal = !propd._AlwaysChange && currentValue === value;
        }
    }
    else
        equal = currentValue == null && value == null;
    if (!equal) {
        var newValue;
        this._Providers[_PropertyPrecedence.LocalValue].ClearValue(propd);
        if (propd._IsAutoCreated())
            this._Providers[_PropertyPrecedence.AutoCreate].ClearValue(propd);
        if (value != null && (!propd._IsAutoCreated() || !(value instanceof DependencyObject) || RefObject.As(value, DependencyObject) != null))
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
    var bitmask = this._ProviderBitmasks[propd] || 0;
    bitmask |= (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
    if (propd._IsAutoCreated())
        bitmask |= 1 << _PropertyPrecedence.AutoCreate;
    if (propd._HasDefaultValue())
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
DependencyObject.prototype.ClearValue = function (propd, notifyListeners, error) {
    if (notifyListeners == undefined)
        notifyListeners = true;
    if (error == undefined)
        error = new BError();
    if (this._GetAnimationStorageFor(propd) != null) {
        return;
    }
    var oldLocalValue;
    if ((oldLocalValue = this.ReadLocalValue(propd)) == null) {
        if (propd._IsAutoCreated())
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
DependencyObject.prototype.ReadLocalValue = function (propd) {
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
        equal = !propd._AlwaysChange && RefObject.Equals(oldValue, newValue);
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
                newDO.Changed.Subscribe(this._OnCollectionChanged, this);
                newDO.ItemChanged.Subscribe(this._OnCollectionItemChanged, this);
            }
            newDO.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);
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
    return true;
};
DependencyObject.prototype._RemoveExpression = function (propd) {
    var data = {};
    if (this._Expressions != null && this._Expressions.TryGetValue(propd, data)) {
        this._Expressions.Remove(propd);
        data.Value._OnDetached(this);
    }
};
DependencyObject.prototype._AddTarget = function (obj) {
};
DependencyObject.prototype._RemoveTarget = function (obj) {
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
DependencyObject.prototype.FindName = function (name, isTemplateItem) {
    if (isTemplateItem === undefined)
        isTemplateItem = Control.GetIsTemplateItem(this);
    var scope = NameScope.GetNameScope(this);
    if (scope && (isTemplateItem === scope.GetIsLocked()))
        return scope.FindName(name);
    if (this._Parent)
        return this._Parent.FindName(name, isTemplateItem);
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
    while (current != null) {
        if (RefObject.RefEquals(current, this)) {
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
DependencyObject.prototype._RemoveParent = function (parent, error) {
    if (this._RemoveSecondaryParent(parent)) {
        if (this._HasSecondaryParents() || !(parent instanceof DependencyObjectCollection) || !(parent._GetIsSecondaryParent()))
            return;
    } else {
        if (!RefObject.RefEquals(this._Parent, parent))
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
        if (RefObject.RefEquals(this._Parent, parent))
            this._Parent = null;
    }
};
DependencyObject.prototype._AddSecondaryParent = function (obj) {
    this._SecondaryParents.push(obj);
};
DependencyObject.prototype._RemoveSecondaryParent = function (obj) {
    var index = -1;
    for (var i = 0; i < this._SecondaryParents.length; i++) {
        if (RefObject.RefEquals(this._SecondaryParents[i], obj)) {
            index = i;
            break;
        }
    }
    if (index < 0)
        return false;
    this._SecondaryParents.splice(index, 1);
    return true;
};
DependencyObject.prototype._GetSecondaryParents = function () {
    return this._SecondaryParents;
};
DependencyObject.prototype._HasSecondaryParents = function () {
    return this._SecondaryParents.length > 0;
};
DependencyObject.prototype._GetAnimationStorageFor = function (propd) {
    if (this._StorageRepo == null)
        return null;
    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return null;
    return list.Last().Storage;
};
DependencyObject.prototype._AttachAnimationStorage = function (propd, storage) {
    var attachedStorage = null;
    if (this._StorageRepo == null)
        this._StorageRepo = new Array();
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
DependencyObject.prototype._DetachAnimationStorage = function (propd, storage) {
    if (this._StorageRepo == null)
        return;
    var list = this._StorageRepo[propd];
    if (!list || list.IsEmpty())
        return;
    var last = list.Last();
    if (RefObject.RefEquals(last.Storage, storage)) {
        list.Remove(last);
        if (!list.IsEmpty())
            list.Last().Storage.Enable();
    } else {
        var node = list.First();
        while (node) {
            if (RefObject.RefEquals(node.Storage, storage)) {
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

function FrameworkTemplate() {
    DependencyObject.call(this);
}
FrameworkTemplate.InheritFrom(DependencyObject);
FrameworkTemplate.prototype.GetVisualTree = function (bindingSource) {
    var error = new BError();
    return this._GetVisualTreeWithError(bindingSource, error);
};
FrameworkTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};

function NameScope() {
    DependencyObject.call(this);
    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
}
NameScope.InheritFrom(DependencyObject);
NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", function () { return NameScope; }, NameScope);
NameScope.GetNameScope = function (d) {
    return d.GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    d.SetValue(NameScope.NameScopeProperty, value);
};
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
    }
    this._Names[name] = obj;
};
NameScope.prototype.UnregisterName = function (name) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        return;
    var objd = this._Names[name];
    if (objd instanceof DependencyObject) {
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

function SetterBase() {
    DependencyObject.call(this);
    this.SetAttached(false);
}
SetterBase.InheritFrom(DependencyObject);
SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);
SetterBase.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBase.IsSealedProperty);
};
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

function Style() {
    DependencyObject.call(this);
}
Style.InheritFrom(DependencyObject);
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
Style.Annotations = {
    ContentProperty: Style.SettersProperty
};
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

function UIElement() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
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
    this.GotFocus = new MulticastEvent();
    this.GotFocus.Subscribe(this.OnGotFocus, this);
    this.LostFocus = new MulticastEvent();
    this.LostFocus.Subscribe(this.OnLostFocus, this);
}
UIElement.InheritFrom(DependencyObject);
UIElement.ClipProperty = DependencyProperty.Register("Clip", function () { return Geometry; }, UIElement);
UIElement.prototype.GetClip = function () {
    return this.GetValue(UIElement.ClipProperty);
};
UIElement.prototype.SetClip = function (value) {
    this.SetValue(UIElement.ClipProperty, value);
};
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
    if (!this._GetRenderVisible() || UIElement._IsOpacityInvisible(this._TotalOpacity))
        return;
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
        this._DirtyRegion = this._DirtyRegion.Union(rect);
        this._OnInvalidated();
    }
};
UIElement.prototype._InvalidateMeasure = function () {
    this._DirtyFlags |= _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
};
UIElement.prototype._InvalidateArrange = function () {
    this._DirtyFlags |= _Dirty.Arrange;
    this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
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
};
UIElement.prototype._UpdateProjection = function () {
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
};
UIElement.prototype._ComputeLocalProjection = function () {
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
    region = region.RoundOut();
    region = region.Intersection(parentRegion);
    if (UIElement._IsOpacityInvisible(this._TotalOpacity)) {
        return;
    }
    if (!this._GetRenderVisible()) {
        Info("Render invisible. [" + this._TypeName + ":" + this.GetName() + "]");
        return;
    }
    if (region.IsEmpty()) {
        Info("Nothing to render. [" + this._TypeName + "]");
        return;
    }
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
    return box.Intersection(unclipped);
};
UIElement.prototype._ElementRemoved = function (item) {
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
        this.Unloaded.Raise(this, new EventArgs());
        var iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            var v = iter.GetCurrent();
            v = RefObject.As(v, FrameworkElement);
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
        var iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            var v = iter.GetCurrent();
            v = RefObject.As(v, FrameworkElement);
            if (v != null)
                v._SetIsLoaded(loaded);
        }
        this.Loaded.RaiseAsync(this, new EventArgs());
    }
};
UIElement.prototype._OnIsAttachedChanged = function (value) {
    if (this._SubtreeObject)
        this._SubtreeObject._SetIsAttached(value);
    this._InvalidateVisibility();
    DependencyObject.prototype._OnIsAttachedChanged.call(this, value);
    if (!value) {
        this._CacheInvalidateHint();
        var surface = App.Instance.MainSurface;
        if (surface) {
            surface._RemoveDirtyElement(this);
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
    }
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
UIElement.prototype.Focus = function (recurse) {
    return false;
};
UIElement.prototype._EmitFocusChange = function (type) {
    if (type === "got")
        this._EmitGotFocus();
    else if (type === "lost")
        this._EmitLostFocus();
};
UIElement.prototype._EmitGotFocus = function () {
    this.GotFocus.Raise(this, new EventArgs());
};
UIElement.prototype.OnGotFocus = function (sender, args) { };
UIElement.prototype._EmitLostFocus = function () {
    this.LostFocus.Raise(this, new EventArgs());
};
UIElement.prototype.OnLostFocus = function (sender, args) { };
UIElement._IsOpacityInvisible = function (opacity) {
    return opacity <= 0.0;
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

function Collection() {
    DependencyObject.call(this);
    this._ht = new Array();
    this.Changed = new MulticastEvent();
    this.ItemChanged = new MulticastEvent();
}
Collection.InheritFrom(DependencyObject);
Collection.CountProperty = DependencyProperty.RegisterFull("Count", function () { return Number; }, Collection, 0);
Collection.prototype.GetCount = function () {
    return this._ht.length;
};
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
            this._ht[i].SetMentor(newValue);
    }
};
DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
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
    value.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);
    var rv = Collection.prototype.AddedToCollection.call(this, value, error);
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
DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            value.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            if (this._GetIsSecondaryParent())
                value._RemoveSecondaryParent(this);
            if (this._SetsParent && RefObject.RefEquals(value._GetParent(), this))
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

function ResourceDictionary() {
    Collection.call(this);
    this._KeyIndex = new Array();
}
ResourceDictionary.InheritFrom(Collection);
ResourceDictionary.MergedDictionariesProperty = DependencyProperty.RegisterFull("MergedDictionaries", function () { return ResourceDictionaryCollection; }, ResourceDictionary, null, { GetValue: function () { return new ResourceDictionaryCollection(); } });
ResourceDictionary.prototype.GetMergedDictionaries = function () {
    return this.GetValue(ResourceDictionary.MergedDictionariesProperty);
};
ResourceDictionary.prototype.ContainsKey = function (key) {
    return this._KeyIndex[key] != undefined;
};
ResourceDictionary.prototype._GetIndexFromKey = function (key) {
    return this._KeyIndex[key];
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
    var index = Collection.prototype.Add.call(this, value);
    this._KeyIndex[key] = index;
    this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
    return true;
};
ResourceDictionary.prototype.Add = function (key, value) {
    this.Set(key, value);
};
ResourceDictionary.prototype.Remove = function (key) {
    var index = this._GetIndexFromKey(key);
    if (index > -1)
        return this.RemoveAt(index);
};
ResourceDictionary.prototype.AddedToCollection = function (value, error) {
    var obj = null;
    var rv = false;
    if (value instanceof DependencyObject) {
        obj = RefObject.As(value, DependencyObject);
        if (obj._GetParent() != null && !ResourceDictionary._CanBeAddedTwice(value)) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return false;
        }
        obj._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        obj._SetIsAttached(this._IsAttached);
        obj.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);
    }
    rv = Collection.prototype.AddedToCollection.call(this, value, error);
    if (rv /* && !from_resource_dictionary_api */ && obj != null) {
        this._RaiseChanged(CollectionChangedArgs.Action.Add, null, obj, obj.GetName());
    }
    return rv;
};
ResourceDictionary.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe && value instanceof DependencyObject) {
        var obj = RefObject.As(value, DependencyObject);
        if (obj != null) {
            obj.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            obj._RemoveParent(this, null);
            obj._SetIsAttached(false);
        }
    }
    Collection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
};
ResourceDictionary.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);
    for (var i = 0; i < this._ht.length; i++) {
        var obj = this._ht[i];
        if (obj instanceof DependencyObject)
            obj._SetIsAttached(value);
    }
};
ResourceDictionary.prototype._OnMentorChanged = function (oldValue, newValue) {
    Collection.prototype._OnMentorChanged.call(this, oldValue, newValue);
    for (var i = 0; i < this._KeyIndex.length; i++) {
        DependencyObject._PropagateMentor(this._KeyIndex[i], this.GetValueAt(this._KeyIndex[i]), newValue);
    }
};
ResourceDictionary.prototype._RegisterAllNamesRootedAt = function (namescope, error) {
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._RegisterAllNamesRootedAt(namescope, error);
    }
    Collection.prototype._RegisterAllNamesRootedAt.call(this, namescope, error);
};
ResourceDictionary.prototype._UnregisterAllNamesRootedAt = function (fromNs) {
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._UnregisterAllNamesRootedAt(fromNs);
    }
    Collection.prototype._UnregisterAllNamesRootedAt.call(this, fromNs);
};
ResourceDictionary._CanBeAddedTwice = function (value) {
    NotImplemented("ResourceDictionary._CanBeAddedTwice");
    return true;
};

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
    var children = subtreeRoot.GetMergedDictionaries();
    for (var i = 0; i < children.GetCount(); i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }
    return true;
};

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
    if (source != null) {
        this._ViewPropertyListener = new PropertyChangedListener(source, source.constructor.ViewProperty, this, this.ViewChanged);
        view = source.GetView();
    }
    if (view != null)
        this._ViewListener = new CurrentChangedListener(view, this, this.ViewCurrentChanged);
};
_CollectionViewNode.prototype.DisconnectViewHandlers = function (onlyView) {
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
_CollectionViewNode.prototype.GetBindsDirectlyToSource = function () {
    return this._BindsDirectlyToSource;
};
_CollectionViewNode.prototype.SetBindsDirectlyToSource = function (value) {
    this._BindsDirectlyToSource = value;
};
_CollectionViewNode.prototype.GetBindToView = function () {
    return this._BindToView;
};
_CollectionViewNode.prototype.SetBindToView = function (value) {
    this._BindToView = value;
};
_CollectionViewNode.prototype.GetViewChangedHandler = function () {
    return this._ViewChangedHandler;
};
_CollectionViewNode.prototype.SetViewChangedHandler = function (value) {
    this._ViewChangedHandler = value;
};

function CollectionViewSource() {
    DependencyObject.call(this);
}
CollectionViewSource.InheritFrom(DependencyObject);
CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return RefObject; }, CollectionViewSource);
CollectionViewSource.prototype.GetSource = function () {
    return this.GetValue(CollectionViewSource.SourceProperty);
};
CollectionViewSource.prototype.SetSource = function (value) {
    this.SetValue(CollectionViewSource.SourceProperty, value);
};
CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);
CollectionViewSource.prototype.GetView = function () {
    return this.GetValue(CollectionViewSource.ViewProperty);
};
CollectionViewSource.prototype.SetView = function (value) {
    this.SetValue(CollectionViewSource.ViewProperty, value);
};

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

function TextElement() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    this._Font = new Font();
    this._UpdateFont(true);
}
TextElement.InheritFrom(DependencyObject);
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
TextElement.prototype.GetBackground = function (selected) { return null; }
TextElement.prototype.GetFont = function () { return this._Font; };
TextElement.prototype.GetDirection = function () { return FlowDirection.LeftToRight; };
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

function TextElementCollection() {
    DependencyObjectCollection.call(this);
}
TextElementCollection.InheritFrom(DependencyObjectCollection);

function App() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this.MainSurface = new Surface(this);
    this._Clock = new Clock();
    this._Storyboards = new Array();
}
App.InheritFrom(DependencyObject);
App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, null, { GetValue: function () { return new ResourceDictionary(); } });
App.prototype.GetResources = function () {
    return this.GetValue(App.ResourcesProperty);
};
App.prototype.SetResources = function (value) {
    this.SetValue(App.ResourcesProperty, value);
};
App.prototype.GetAddress = function () {
    return this._Address;
};
App.prototype.SetAddress = function (value) {
    this._Address = value;
};
App.prototype.Load = function (element, containerId, width, height) {
    this.SetAddress(new Uri(document.URL));
    this.MainSurface.Init(containerId, width, height);
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.prototype.Start = function () {
    this._Clock.RegisterTimer(this);
};
App.prototype._Tick = function (lastTime, nowTime) {
    this.ProcessStoryboards(lastTime, nowTime);
    this.ProcessDirty();
};
App.prototype._Stop = function () {
    this._Clock.UnregisterTimer(this);
};
App.prototype.ProcessStoryboards = function (lastTime, nowTime) {
    for (var i = 0; i < this._Storyboards.length; i++) {
        this._Storyboards[i]._Tick(lastTime, nowTime);
    }
};
App.prototype.ProcessDirty = function () {
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
App.prototype.RegisterStoryboard = function (storyboard) {
    Array.addDistinctRefObject(this._Storyboards, storyboard);
};
App.prototype.UnregisterStoryboard = function (storyboard) {
    Array.removeRefObject(this._Storyboards, storyboard);
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
    var styles = new Array();
    styles[_StyleIndex.GenericXaml] = genericXamlStyle;
    styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
    styles[_StyleIndex.VisualTree] = visualTreeStyle;
    return styles;
};
App.prototype._GetGenericXamlStyleFor = function (type) {
    NotImplemented("App._GetGenericXamlStyleFor");
};

function Brush() {
    DependencyObject.call(this);
};
Brush.InheritFrom(DependencyObject);
Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

function Geometry() {
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Geometry.InheritFrom(DependencyObject);
Geometry.prototype.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();
    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;
    return bounds;
};
Geometry.prototype.ComputePathBounds = function () {
};

function GradientBrush() {
    Brush.call(this);
}
GradientBrush.InheritFrom(Brush);
GradientBrush.prototype._GetMappingModeTransform = function (bounds) {
    if (this.GetMappingMode() === BrushMappingMode.Absolute)
        return new Matrix();
    return new ScalingMatrix(bounds.Width, bounds.Height);
};
GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.prototype.GetGradientStops = function () {
    return this.GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return Number; }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);
GradientBrush.prototype.GetMappingMode = function () {
    return this.GetValue(GradientBrush.MappingModeProperty);
};
GradientBrush.prototype.SetMappingMode = function (value) {
    this.SetValue(GradientBrush.MappingModeProperty, value);
};

function GradientStop() {
    DependencyObject.call(this);
}
GradientStop.InheritFrom(DependencyObject);
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

function GradientStopCollection() {
    DependencyObjectCollection.call(this);
}
GradientStopCollection.InheritFrom(DependencyObjectCollection);
GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

function LinearGradientBrush() {
    GradientBrush.call(this);
}
LinearGradientBrush.InheritFrom(GradientBrush);
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
LinearGradientBrush.prototype._Translate = function (ctx, bounds) {
    var transform = this._GetMappingModeTransform(bounds);
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

function RadialGradientBrush() {
    GradientBrush.call(this);
}
RadialGradientBrush.InheritFrom(GradientBrush);
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
RadialGradientBrush.prototype._Translate = function (ctx, bounds) {
    NotImplemented("RadialGradientBrush._Translate");
};

function RectangleGeometry() {
    Geometry.call(this);
}
RectangleGeometry.InheritFrom(Geometry);
RectangleGeometry.RectProperty = DependencyProperty.Register("Rect", function () { return Rect; }, RectangleGeometry);
RectangleGeometry.prototype.GetRect = function () {
    return this.GetValue(RectangleGeometry.RectProperty);
};
RectangleGeometry.prototype.SetRect = function (value) {
    this.SetValue(RectangleGeometry.RectProperty, value);
};
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

function SolidColorBrush() {
    Brush.call(this);
    if (!IsDocumentReady())
        return;
    if (arguments.length === 1) {
        if (arguments[0] instanceof Color)
            this.SetColor(arguments[0]);
    }
}
SolidColorBrush.InheritFrom(Brush);
SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush);
SolidColorBrush.prototype.GetColor = function () {
    return this.GetValue(SolidColorBrush.ColorProperty);
};
SolidColorBrush.prototype.SetColor = function (value) {
    this.SetValue(SolidColorBrush.ColorProperty, value);
};
SolidColorBrush.prototype._Translate = function (ctx) {
    var color = this.GetColor();
    if (color == null)
        return "#000000";
    return color.toString();
};

function TileBrush() {
    Brush.call(this);
}
TileBrush.InheritFrom(Brush);
TileBrush.AlignmentXProperty = DependencyProperty.Register("AlignmentX", function () { return Number; }, TileBrush, AlignmentX.Center);
TileBrush.prototype.GetAlignmentX = function () {
    return this.GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.prototype.SetAlignmentX = function (value) {
    this.SetValue(TileBrush.AlignmentXProperty, value);
};
TileBrush.AlignmentYProperty = DependencyProperty.Register("AlignmentY", function () { return Number; }, TileBrush, AlignmentY.Center);
TileBrush.prototype.GetAlignmentY = function () {
    return this.GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.prototype.SetAlignmentY = function (value) {
    this.SetValue(TileBrush.AlignmentYProperty, value);
};
TileBrush.StretchProperty = DependencyProperty.Register("Stretch", function () { return Number; }, TileBrush, Stretch.Fill);
TileBrush.prototype.GetStretch = function () {
    return this.GetValue(TileBrush.StretchProperty);
};
TileBrush.prototype.SetStretch = function (value) {
    this.SetValue(TileBrush.StretchProperty, value);
};

function KeyFrame() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this._ResolvedKeyTime = null;
    this._Resolved = false;
}
KeyFrame.InheritFrom(DependencyObject);
KeyFrame.prototype.GetKeyTime = function () {
    throw new AbstractMethodException();
};
KeyFrame.prototype.SetKeyTime = function (value) {
    throw new AbstractMethodException();
};
KeyFrame.prototype.CoerceKeyTime = function (dobj, propd, value, coerced, error) {
    if (value == null)
        coerced.Value = this.GetKeyTime();
    else
        coerced.Value = value;
    return true;
};
KeyFrame.prototype.InterpolateValue = function () {
    throw new AbstractMethodException();
};
KeyFrame.Comparer = function (kf1, kf2) {
    var ts1 = kf1._ResolvedKeyTime;
    var ts2 = kf2._ResolvedKeyTime;
    return ts1.CompareTo(ts2);
};

function KeyFrameCollection() {
    DependencyObjectCollection.call(this);
    if (!IsDocumentReady())
        return;
    this._Resolved = false;
    this._SortedList = new Array();
}
KeyFrameCollection.InheritFrom(DependencyObjectCollection);
KeyFrameCollection.prototype.GetKeyFrameForTime = function (t, prevFrameRef) {
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
        if (keyFrame.GetValue(valuePropd) != null) {
            currentKeyFrame = keyFrame;
            break;
        }
    }
    for (i--; i >= 0; i--) {
        keyFrame = this._SortedList[i];
        valuePropd = keyFrame.GetDependencyProperty("Value");
        if (keyFrame.GetValue(valuePropd) != null) {
            previousKeyFrame = keyFrame;
            break;
        }
    }
    prevFrameRef.Value = previousKeyFrame;
    return currentKeyFrame;
};
KeyFrameCollection.prototype.Clear = function () {
    this._Resolved = false;
    DependencyObjectCollection.prototype.Clear.call(this);
};
KeyFrameCollection.prototype.AddedToCollection = function (value, error) {
    if (!DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error))
        return false;
    this._Resolved = false;
    return true;
};
KeyFrameCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    DependencyObjectCollection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
    this._Resolved = false;
};
KeyFrameCollection.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property.Name === "KeyTime")
        this._Resolved = false;
    Collection.prototype._OnSubPropertyChanged.call(this, sender, args);
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
        keyFrame = RefObject.As(value, KeyFrame);
        keyFrame._ResolvedTime = 0;
        keyFrame._Resolved = false;
    }
    var keyTime;
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = RefObject.As(value, KeyFrame);
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
        keyFrame = RefObject.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.HasPercent()) {
            keyFrame._ResolvedTime = totalInterpolationTime.Multiply(keyTime.GetPercent())
            keyFrame._Resolved = true;
        }
    }
    if (count > 0) {
        value = coll.GetValueAt(count - 1);
        keyFrame = RefObject.As(value, KeyFrame);
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
        keyFrame = RefObject.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (!keyFrame._Resolved && keyTime.IsPaced()) {
            keyFrame._ResolvedKeyTime = new TimeSpan(0);
            keyFrame._Resolved = true;
        }
    }
    this._SortedList = new Array();
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = RefObject.As(value, KeyFrame);
        this._SortedList.push(keyFrame);
    }
    this._SortedList.sort(KeyFrame.Comparer);
};

function ObjectKeyFrame() {
    KeyFrame.call(this);
}
ObjectKeyFrame.InheritFrom(KeyFrame);
ObjectKeyFrame.KeyTimeProperty = DependencyProperty.RegisterFull("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, KeyTime.CreateUniform(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });
ObjectKeyFrame.prototype.GetKeyTime = function () {
    return this.GetValue(ObjectKeyFrame.KeyTimeProperty);
};
ObjectKeyFrame.prototype.SetKeyTime = function (value) {
    this.SetValue(ObjectKeyFrame.KeyTimeProperty, value);
};
ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.prototype.GetValue_Prop = function () {
    return this.GetValue(ObjectKeyFrame.ValueProperty);
};
ObjectKeyFrame.prototype.SetValue_Prop = function (value) {
    this.SetValue(ObjectKeyFrame.ValueProperty, value);
};
ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.prototype.GetConvertedValue = function () {
    return this.GetValue(ObjectKeyFrame.ConvertedValueProperty);
};
ObjectKeyFrame.prototype.SetConvertedValue = function (value) {
    this.SetValue(ObjectKeyFrame.ConvertedValueProperty, value);
};

function ObjectKeyFrameCollection() {
    KeyFrameCollection.call(this);
}
ObjectKeyFrameCollection.InheritFrom(KeyFrameCollection);
ObjectKeyFrameCollection.prototype.IsElementType = function (value) {
    return value instanceof ObjectKeyFrame;
};

function Timeline() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this.Completed = new MulticastEvent();
    this.Reset();
}
Timeline.InheritFrom(DependencyObject);
Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () { return TimeSpan; }, Timeline);
Timeline.prototype.GetBeginTime = function () {
    return this.GetValue(Timeline.BeginTimeProperty);
};
Timeline.prototype.SetBeginTime = function (value) {
    this.SetValue(Timeline.BeginTimeProperty, value);
};
Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.prototype.GetDuration = function () {
    return this.GetValue(Timeline.DurationProperty);
};
Timeline.prototype.SetDuration = function (value) {
    this.SetValue(Timeline.DurationProperty, value);
};
Timeline.prototype.HasManualTarget = function () {
    return this._ManualTarget != null;
};
Timeline.prototype.GetManualTarget = function () {
    return this._ManualTarget;
};
Timeline.prototype.Reset = function () {
    this._IsFirstUpdate = true;
    this._BeginStep = null;
    this._HasReachedBeg = false;
};
Timeline.prototype.IsAfterBeginTime = function (nowTime) {
    var beginTime = this.GetBeginTime();
    if (beginTime == null || beginTime.IsZero())
        return true;
    var ts = new TimeSpan();
    ts.AddMilliseconds(nowTime - this._InitialStep);
    if (ts.CompareTo(beginTime) < 0)
        return false;
    return true;
};
Timeline.prototype.CreateClockData = function (nowTime) {
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
Timeline.prototype.OnDurationReached = function () {
    this.Completed.Raise(this, {});
};
Timeline.prototype.Update = function (nowTime) {
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
Timeline.prototype.UpdateInternal = function (nowTime) { };

function TimelineCollection() {
    Collection.call(this);
}
TimelineCollection.InheritFrom(Collection);

function VisualState() {
    DependencyObject.call(this);
}
VisualState.InheritFrom(DependencyObject);
VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.prototype.GetStoryboard = function () {
    return this.GetValue(VisualState.StoryboardProperty);
};
VisualState.prototype.SetStoryboard = function (value) {
    this.SetValue(VisualState.StoryboardProperty, value);
};
VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};
function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.InheritFrom(DependencyObjectCollection);
VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

function VisualStateGroup() {
    DependencyObject.call(this);
    this.CurrentStateChanging = new MulticastEvent();
    this.CurrentStateChanged = new MulticastEvent();
}
VisualStateGroup.InheritFrom(DependencyObject);
VisualStateGroup.prototype.GetStates = function () {
    if (this._States == null)
        this._States = new VisualStateCollection();
    return this._States;
};
VisualStateGroup.prototype.GetCurrentStoryboards = function () {
    if (this._CurrentStoryboards == null)
        this._CurrentStoryboards = new StoryboardCollection();
    return this._CurrentStoryboards;
};
VisualStateGroup.prototype.GetTransitions = function () {
    if (this._Transitions == null)
        this._Transitions = new VisualTransitionCollection();
    return this._Transitions;
};
VisualStateGroup.prototype.GetCurrentState = function () {
    return this._CurrentState;
};
VisualStateGroup.prototype.SetCurrentState = function (value) {
    this._CurrentState = value;
};
VisualStateGroup.prototype.GetState = function (stateName) {
    var states = this.GetStates();
    for (var i = 0; i < states.GetCount(); i++) {
        var state = states.GetValueAt(i);
        if (state.GetName() === stateName)
            return state;
    }
    return null;
};
VisualStateGroup.prototype.StartNewThenStopOld = function (element, newStoryboards) {
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
VisualStateGroup.prototype.RaiseCurrentStateChanging = function (element, oldState, newState, control) {
    this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.prototype.RaiseCurrentStateChanged = function (element, oldState, newState, control) {
    this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
};
VisualStateGroup.Annotations = {
    ContentProperty: "States"
};
function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.InheritFrom(DependencyObjectCollection);
VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.InheritFrom(DependencyObject);
VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
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
    return d.GetValue(VisualStateManager.CustomVisualStateManagerProperty);
};
VisualStateManager.SetCustomVisualStateManager = function (d, value) {
    d.SetValue(VisualStateManager.CustomVisualStateManagerProperty, value);
};
VisualStateManager.prototype.GoToStateCore = function (control, element, stateName, group, state, useTransitions) {
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
    if (RefObject.RefEquals(lastState, state))
        return true;
    var transition = useTransitions ? VisualStateManager._GetTransition(element, group, lastState, state) : null;
    var dynamicTransition = VisualStateManager._GenerateDynamicTransitionAnimations(element, group, state, transition);
    dynamicTransition.SetValue(Control.IsTemplateItemProperty, true);
    if (transition == null || (transition.GetGeneratedDuration().IsZero() && (transition.GetStoryboard() == null || transition.GetStoryboard().GetDuration().IsZero()))) {
        if (transition != null && transition.GetStoryboard() != null) {
            group.StartNewThenStopOld(element, [transition.GetStoryboard(), state.GetStoryboard()]);
        } else {
            group.StartNewThenStopOld(element, [state.GetStoryboard()]);
        }
        group.RaiseCurrentStateChanging(element, lastState, state, control);
        group.RaiseCurrentStateChanged(element, lastState, state, control);
    } else {
        var eventClosure = new RefObject();
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
    var userControl = RefObject.As(control, UserControl);
    if (userControl != null)
        return RefObject.As(userControl.GetContent(), FrameworkElement);
    if (VisualTreeHelper.GetChildrenCount(control) > 0)
        return RefObject.As(VisualTreeHelper.GetChild(control, 0), FrameworkElement);
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
    NotImplemented("VisualStateManager._GetTransition");
    return null;
};
VisualStateManager._GenerateDynamicTransitionAnimations = function (root, group, state, transition) {
    NotImplemented("VisualStateManager._GenerateDynamicTransitionAnimations");
    return new Storyboard();
};

function VisualTransition() {
    DependencyObject.call(this);
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
}
VisualTransition.InheritFrom(DependencyObject);
VisualTransition.prototype.GetFrom = function () {
    return this._From;
};
VisualTransition.prototype.SetFrom = function (value) {
    this._From = value;
};
VisualTransition.prototype.GetTo = function () {
    return this._To;
};
VisualTransition.prototype.SetTo = function (value) {
    this._To = value;
};
VisualTransition.prototype.GetStoryboard = function () {
    return this._Storyboard;
};
VisualTransition.prototype.SetStoryboard = function (value) {
    this._Storyboard = value;
};
VisualTransition.prototype.GetGeneratedDuration = function () {
    return this._GeneratedDuration;
};
VisualTransition.prototype.SetGeneratedDuration = function (value) {
    this._GeneratedDuration = value;
};
VisualTransition.prototype.GetDynamicStoryboardCompleted = function () {
    return this._DynamicStoryboardCompleted;
};
VisualTransition.prototype.SetDynamicStoryboardCompleted = function (value) {
    this._DynamicStoryboardCompleted = value;
};
VisualTransition.prototype.GetExplicitStoryboardCompleted = function () {
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.prototype.SetExplicitStoryboardCompleted = function (value) {
    this._ExplicitStoryboardCompleted = value;
};
VisualTransition.prototype.GetGeneratedEasingFunction = function () {
    return this._GeneratedEasingFunction;
};
VisualTransition.prototype.SetGeneratedEasingFunction = function (value) {
    this._GeneratedEasingFunction = value;
};
function VisualTransitionCollection() {
    DependencyObjectCollection.call(this);
}
VisualTransitionCollection.InheritFrom(DependencyObjectCollection);
VisualTransitionCollection.prototype.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};

function ColumnDefinition() {
    DependencyObject.call(this);
}
ColumnDefinition.InheritFrom(DependencyObject);
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
ColumnDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof ColumnDefinition;
};

function ControlTemplate(targetType, json) {
    FrameworkTemplate.call(this);
    this.SetTargetType(targetType);
    this._TempJson = json;
}
ControlTemplate.InheritFrom(FrameworkTemplate);
ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);
ControlTemplate.prototype.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.prototype.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};
ControlTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
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

function RowDefinition() {
    DependencyObject.call(this);
}
RowDefinition.InheritFrom(DependencyObject);
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
RowDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof RowDefinition;
};

function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!obj)
        return;
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence,
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}
_PasswordBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

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

function FrameworkElement() {
    UIElement.call(this);
    this.TemplatedApplied = new MulticastEvent();
    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();
    this._Providers[_PropertyPrecedence.LocalStyle] = new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle);
    this._Providers[_PropertyPrecedence.ImplicitStyle] = new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle);
    this._Providers[_PropertyPrecedence.DynamicValue] = new FrameworkElementPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._Providers[_PropertyPrecedence.InheritedDataContext] = new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext);
}
FrameworkElement.InheritFrom(UIElement);
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
FrameworkElement.prototype.SetTemplateBinding = function (propd, tb) {
    try {
        this.SetValue(propd, tb);
    } catch (err) {
    }
};
FrameworkElement.prototype.SetBinding = function (propd, binding) {
    return BindingOperations.SetBinding(this, propd, binding);
};
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
        if (!RefObject.RefEquals(node, uielist.First())) {
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
FrameworkElement.prototype.InvokeLoaded = function () {
};
FrameworkElement.prototype._OnIsLoadedChanged = function (loaded) {
    if (loaded)
        this._SetImplicitStyles(_StyleMask.All);
    else
        this._ClearImplicitStyles(_StyleMask.VisualTree);
    UIElement.prototype._OnIsLoadedChanged.call(this, loaded);
    if (loaded)
        this.InvokeLoaded();
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

function Setter() {
    SetterBase.call(this);
}
Setter.InheritFrom(SetterBase);
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

function SetterBaseCollection() {
    DependencyObjectCollection.call(this);
}
SetterBaseCollection.InheritFrom(DependencyObjectCollection);
SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);
SetterBaseCollection.prototype.GetIsSealed = function () {
    return this.GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.prototype.SetIsSealed = function (value) {
    this.SetValue(SetterBaseCollection.IsSealedProperty, value);
};
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

function Block() {
    TextElement.call(this);
}
Block.InheritFrom(TextElement);
Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.prototype.GetInlines = function () {
    return this.GetValue(Block.InlinesProperty);
};
Block.prototype.SetInlines = function (value) {
    this.SetValue(Block.InlinesProperty, value);
};

function BlockCollection() {
    TextElementCollection.call(this);
}
BlockCollection.InheritFrom(TextElementCollection);

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

function InlineCollection() {
    TextElementCollection.call(this);
}
InlineCollection.InheritFrom(TextElementCollection);
function InlineCollection() {
    TextElementCollection.call(this);
}
InlineCollection.InheritFrom(TextElementCollection);
InlineCollection.prototype.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return TextElementCollection.prototype.AddedToCollection.call(this, value, error);
};
InlineCollection.prototype.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.prototype.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.prototype._SetIsForHyperlink = function () { this._ForHyperlink = true; };

function LineBreak() {
    Inline.call(this);
}
LineBreak.InheritFrom(Inline);

function Paragraph() {
    Block.call(this);
}
Paragraph.InheritFrom(Block);

function Run() {
    Inline.call(this);
}
Run.InheritFrom(Inline);
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
Run.prototype._SerializeText = function (str) {
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};

function Section() {
    TextElement.call(this);
}
Section.InheritFrom(TextElement);
Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);
Section.prototype.GetBlocks = function () {
    return this.GetValue(Section.BlocksProperty);
};
Section.prototype.SetBlocks = function (value) {
    this.SetValue(Section.BlocksProperty, value);
};

function Span() {
    Inline.call(this);
}
Span.InheritFrom(Inline);
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

function ImageBrush() {
    TileBrush.call(this);
}
ImageBrush.InheritFrom(TileBrush);

function Animation() {
    Timeline.call(this);
}
Animation.InheritFrom(Timeline);
Animation.prototype.Resolve = function () { return true; };
Animation.prototype.HookupStorage = function (targetObj, targetProp) {
    this._Storage = new AnimationStorage(this, targetObj, targetProp);
    return this._Storage;
};
Animation.prototype.Stop = function () {
    if (this._Storage == null)
        return;
    this._Storage.Stop();
};
Animation.prototype.UpdateInternal = function (clockData) {
    if (this._Storage != null)
        this._Storage.UpdateCurrentValueAndApply(clockData);
};
Animation.prototype._GetTargetValue = function (defaultOriginValue) { return null; };
Animation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) { return null; };

function ColorAnimation() {
    Animation.call(this);
}
ColorAnimation.InheritFrom(Animation);
ColorAnimation.ByProperty = DependencyProperty.Register("By", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetBy = function () {
    return this.GetValue(ColorAnimation.ByProperty);
};
ColorAnimation.prototype.SetBy = function (value) {
    this.SetValue(ColorAnimation.ByProperty, value);
};
/*
ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, ColorAnimation);
ColorAnimation.prototype.GetEasingFunction = function () {
    return this.GetValue(ColorAnimation.EasingFunctionProperty);
};
ColorAnimation.prototype.SetEasingFunction = function (value) {
    this.SetValue(ColorAnimation.EasingFunctionProperty, value);
};
*/
ColorAnimation.FromProperty = DependencyProperty.Register("From", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetFrom = function () {
    return this.GetValue(ColorAnimation.FromProperty);
};
ColorAnimation.prototype.SetFrom = function (value) {
    this.SetValue(ColorAnimation.FromProperty, value);
};
ColorAnimation.ToProperty = DependencyProperty.Register("To", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetTo = function () {
    return this.GetValue(ColorAnimation.ToProperty);
};
ColorAnimation.prototype.SetTo = function (value) {
    this.SetValue(ColorAnimation.ToProperty, value);
};
ColorAnimation.prototype._GetTargetValue = function (defaultOriginValue) {
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
ColorAnimation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
ColorAnimation.prototype._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};

function DiscreteObjectKeyFrame() {
    ObjectKeyFrame.call(this);
}
DiscreteObjectKeyFrame.InheritFrom(ObjectKeyFrame);
DiscreteObjectKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
    if (keyFrameProgress >= 1.0) {
        return this.GetConvertedValue();
    }
    return baseValue;
};

function DoubleAnimation() {
    Animation.call(this);
}
DoubleAnimation.InheritFrom(Animation);
DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetBy = function () {
    return this.GetValue(DoubleAnimation.ByProperty);
};
DoubleAnimation.prototype.SetBy = function (value) {
    this.SetValue(DoubleAnimation.ByProperty, value);
};
/*
DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, DoubleAnimation);
DoubleAnimation.prototype.GetEasingFunction = function () {
    return this.GetValue(DoubleAnimation.EasingFunctionProperty);
};
DoubleAnimation.prototype.SetEasingFunction = function (value) {
    this.SetValue(DoubleAnimation.EasingFunctionProperty, value);
};
*/
DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetFrom = function () {
    return this.GetValue(DoubleAnimation.FromProperty);
};
DoubleAnimation.prototype.SetFrom = function (value) {
    this.SetValue(DoubleAnimation.FromProperty, value);
};
DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetTo = function () {
    return this.GetValue(DoubleAnimation.ToProperty);
};
DoubleAnimation.prototype.SetTo = function (value) {
    this.SetValue(DoubleAnimation.ToProperty, value);
};
DoubleAnimation.prototype._GetTargetValue = function (defaultOriginValue) {
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
DoubleAnimation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
DoubleAnimation.prototype._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};
DoubleAnimation.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== DoubleAnimation) {
        Animation.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    this._FromCached = null;
    this._ToCached = null;
    this._ByCached = null;
    this._HasCached = false;
    this.PropertyChanged.Raise(this, args);
};

function ObjectAnimationUsingKeyFrames() {
    Animation.call(this);
}
ObjectAnimationUsingKeyFrames.InheritFrom(Animation);
ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, null, { GetValue: function () { return new ObjectKeyFrameCollection(); } });
ObjectAnimationUsingKeyFrames.prototype.GetKeyFrames = function () {
    return this.GetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty);
};
ObjectAnimationUsingKeyFrames.prototype.SetKeyFrames = function (value) {
    this.SetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty, value);
};
ObjectAnimationUsingKeyFrames.prototype.Resolve = function (target, propd) {
    var frames = this.GetKeyFrames();
    var count = frames.GetCount();
    for (var i = 0; i < count; i++) {
        var frame = RefObject.As(frames.GetValueAt(i), ObjectKeyFrame);
        var value = frame.GetValue_Prop();
        if (value == null) {
            frame.SetValue(ObjectKeyFrame.ConvertedValueProperty, null);
        } else {
            var converted = value;
            frame.SetValue(ObjectKeyFrame.ConvertedValueProperty, converted);
        }
    }
    KeyFrameCollection.ResolveKeyFrames(this, frames);
    return true;
};
ObjectAnimationUsingKeyFrames.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
ObjectAnimationUsingKeyFrames.prototype.AddKeyFrame = function (frame) {
    this.GetKeyFrames().Add(frame);
};
ObjectAnimationUsingKeyFrames.prototype.RemoveKeyFrame = function (frame) {
    this.GetKeyFrames().Remove(frame);
};

function Storyboard() {
    Timeline.call(this);
}
Storyboard.InheritFrom(Timeline);
Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.prototype.GetChildren = function () {
    return this.GetValue(Storyboard.ChildrenProperty);
};
Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    return d.GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    d.SetValue(Storyboard.TargetNameProperty, value);
};
Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    return d.GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    d.SetValue(Storyboard.TargetPropertyProperty, value);
};
Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};
Storyboard.prototype.Begin = function () {
    var error = new BError();
    this.BeginWithError(error);
    if (error.IsErrored())
        throw error.CreateException();
};
Storyboard.prototype.BeginWithError = function (error) {
    this.Reset();
    if (!this._HookupAnimations(error))
        return false;
    App.Instance.RegisterStoryboard(this);
};
Storyboard.prototype.Pause = function () {
    this._IsPaused = true;
};
Storyboard.prototype.Resume = function () {
    var nowTime = new Date().getTime();
    this._LastStep = nowTime;
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren(i).GetValueAt(i)._LastStep = nowTime;
    }
    this._IsPaused = false;
};
Storyboard.prototype.Stop = function () {
    App.Instance.UnregisterStoryboard(this);
    var children = this.GetChildren();
    for (var i = 0; i < children.GetCount(); i++) {
        children.GetValueAt(i).Stop();
    }
};
Storyboard.prototype._HookupAnimations = function (error) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        var animation = this.GetChildren(i).GetValueAt(i);
        animation.Reset();
        if (!this._HookupAnimation(animation, error))
            return false;
    }
    return true;
};
Storyboard.prototype._HookupAnimation = function (animation, targetObject, targetPropertyPath, error) {
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
Storyboard.prototype._Tick = function (lastTime, nowTime) {
    if (this._IsPaused)
        return;
    this.Update(nowTime);
};
Storyboard.prototype.UpdateInternal = function (clockData) {
    for (var i = 0; i < this.GetChildren().GetCount(); i++) {
        this.GetChildren().GetValueAt(i).Update(clockData.RealTicks);
    }
};
Storyboard.prototype.OnDurationReached = function () {
    App.Instance.UnregisterStoryboard(this);
    Timeline.prototype.OnDurationReached.call(this);
};
function StoryboardCollection() {
    Collection.call(this);
}
StoryboardCollection.InheritFrom(Collection);
StoryboardCollection.prototype.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};

function Border() {
    FrameworkElement.call(this);
}
Border.InheritFrom(FrameworkElement);
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
    if (borderBrush || !this.GetCornerRadius().IsZero()) {
        ctx.Save();
        this._RenderImpl(ctx, region);
        ctx.Restore();
        return;
    }
    if (!this._HasLayoutClip() && false /* TODO: IsIntegerTranslation  */) {
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
Border.Annotations = {
    ContentProperty: Border.ChildProperty
};
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
        canvasCtx.fillStyle = backgroundBrush._Translate(canvasCtx, pathRect);
        canvasCtx.fill();
    }
    if (borderBrush && !thickness.IsEmpty()) {
        canvasCtx.lineWidth = thickness;
        canvasCtx.strokeStyle = borderBrush._Translate(canvasCtx, pathRect);
        canvasCtx.stroke();
    }
    canvasCtx.closePath();
};
Border._ThicknessValidator = function () {
};

function ContentPresenter() {
    FrameworkElement.call(this);
}
ContentPresenter.InheritFrom(FrameworkElement);
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
ContentPresenter.prototype.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentPresenter.prototype._GetDefaultTemplate = function () {
    var templateOwner = this.GetTemplateOwner();
    if (templateOwner) {
        if (this.ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
            this.SetValue(ContentPresenter.ContentProperty, 
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this.ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
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
        if (this._ContentRoot == null && content != null)
            this._ContentRoot = this.GetFallbackRoot();
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
    if (this._ContentRoot != null)
        this._ElementRemoved(this._ContentRoot);
    this._ContentRoot = null;
};
ContentPresenter.prototype.InvokeLoaded = function () {
    if (this.GetContent() instanceof UIElement)
        this.ClearValue(FrameworkElement.DataContextProperty);
    else
        this.SetDataContext(this.GetContent());
    FrameworkElement.prototype.InvokeLoaded.call(this);
};
ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};

function Control() {
    FrameworkElement.call(this);
    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
}
Control.InheritFrom(FrameworkElement);
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
Control.prototype.GetIsFocused = function () {
    return this._IsFocused;
};
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
    var error = new BError();
    item._AddParent(this, true, error);
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
        }
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
    }
    return true;
};
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
        var c = RefObject.As(uie, Control);
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
Control.prototype.OnGotFocus = function (sender, args) {
    this._IsFocused = true;
    FrameworkElement.prototype.OnGotFocus.call(this, sender, args);
};
Control.prototype.OnLostFocus = function (sender, args) {
    this._IsFocused = false;
    FrameworkElement.prototype.OnLostFocus.call(this, sender, args);
};
Control.prototype.OnIsEnabledChanged = function (args) {
}

var ItemCollection = {};//TODO: Implement
function ItemsControl() {
    Control.call(this);
}
ItemsControl.InheritFrom(Control);
ItemsControl.GetItemsOwner = function (ele) {
    var panel = RefObject.As(ele, Panel);
    if (panel == null || !panel.GetIsItemsHost())
        return null;
    var owner = RefObject.As(panel.GetTemplateOwner(), ItemsPresenter);
    if (owner != null)
        return RefObject.As(owner.GetTemplateOwner(), ItemsControl);
    return null;
};
ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl);
ItemsControl.prototype.GetItems = function () {
    return this.GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.prototype.SetItems = function (value) {
    this.SetValue(ItemsControl.ItemsProperty, value);
};
ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};
function ItemsPresenter() {
    FrameworkElement.call(this);
}
ItemsPresenter.InheritFrom(FrameworkElement);

function MediaElement() {
    FrameworkElement.call(this);
}
MediaElement.InheritFrom(FrameworkElement);

function Panel() {
    FrameworkElement.call(this);
}
Panel.InheritFrom(FrameworkElement);
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
Panel.Annotations = {
    ContentProperty: Panel.ChildrenProperty
};

function Popup() {
    FrameworkElement.call(this);
}
Popup.InheritFrom(FrameworkElement);

function StackPanel() {
    Panel.call(this);
}
StackPanel.InheritFrom(Panel);
StackPanel._OrientationChanged = function (d, args) {
    var sp = RefObject.As(d, StackPanel);
    if (sp == null)
        return;
    d._InvalidateMeasure();
    d._InvalidateArrange();
};
StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return Number; }, StackPanel, Orientation.Vertical, StackPanel._OrientationChanged);
StackPanel.prototype.GetOrientation = function () {
    return this.GetValue(StackPanel.OrientationProperty);
};
StackPanel.prototype.SetOrientation = function (value) {
    this.SetValue(StackPanel.OrientationProperty, value);
};
StackPanel.prototype.MeasureOverride = function (constraint) {
    Info("StackPanel.MeasureOverride [" + this._TypeName + "]");
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
StackPanel.prototype.ArrangeOverride = function (arrangeSize) {
    Info("StackPanel.ArrangeOverride [" + this._TypeName + "]");
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
        if (args.Property !== FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFonts(false))
            return;
    }
    if (args.Property === TextBlock.FontFamilyProperty
        || args.Property === TextBlock.FontSizeProperty
        || args.Property === TextBlock.FontStretchProperty
        || args.Property === TextBlock.FontStyleProperty
        || args.Property === TextBlock.FontWeightProperty) {
        this._UpdateFonts(false);
    } else if (args.Property === TextBlock.TextProperty) {
        if (this._SetsValue) {
            this._SetTextInternal(args.NewValue)
            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property === TextBlock.InlinesProperty) {
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
    } else if (args.Property === TextBlock.LineStackingStrategyProperty) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property === TextBlock.LineHeightProperty) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
    } else if (args.Property === TextBlock.TextDecorationsProperty) {
        this._Dirty = true;
    } else if (args.Property === TextBlock.TextAlignmentProperty) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
    } else if (args.Property === TextBlock.TextTrimmingProperty) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property === TextBlock.TextWrappingProperty) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
    } else if (args.Property === TextBlock.PaddingProperty) {
        this._Dirty = true;
    } else if (args.Property === TextBlock.FontSourceProperty) {
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
    if (args.Property != null && args.Property === TextBlock.ForegroundProperty) {
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
    if (args.Action === CollectionChangedArgs.Action.Clearing)
        return;
    if (!this._SetsValue)
        return;
    if (args.Action === CollectionChangedArgs.Add)
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
TextBlock.Annotations = {
    ContentProperty: TextBlock.InlinesProperty
};

function TextBoxBase() {
    Control.call(this);
    if (!IsDocumentReady())
        return;
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
    this._ContentElement = this.GetTemplateChild("ContentElement");
    if (this._ContentElement == null) {
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
    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
};
_TextBoxView.prototype._UpdateText = function () {
    var text = this._TextBox.GetDisplayText();
    this._Layout.SetText(text ? text : "", -1);
};
_TextBoxView.prototype._ComputeActualSize = function () {
    if (this.ReadLocalValue(LayoutInformation.LayoutSlotProperty))
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
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), new Point());
    if (this._CursorVisible) {
        var caretBrush = this._TextBox.GetCaretBrush();
        if (!caretBrush)
            caretBrush = new SolidColorBrush(new Color(0, 0, 0));
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

function UserControl() {
    Control.call(this);
}
UserControl.InheritFrom(Control);
UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, UserControl);
UserControl.prototype.GetContent = function () {
    return this.GetValue(UserControl.ContentProperty);
};
UserControl.prototype.SetContent = function (value) {
    this.SetValue(UserControl.ContentProperty, value);
};
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
UserControl.Annotations = {
    ContentProperty: UserControl.ContentProperty
};

function Hyperlink() {
    Span.call(this);
}
Hyperlink.InheritFrom(Span);

function Canvas() {
    Panel.call(this);
}
Canvas.InheritFrom(Panel);
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

function Grid() {
    Panel.call(this);
    this._RowMatrix = null;
    this._ColMatrix = null;
}
Grid.InheritFrom(Panel);
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
Grid.prototype._MeasureOverrideWithError = function (availableSize, error) {
    Info("Grid._MeasureOverrideWithError [" + this._TypeName + "]");
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
Grid.prototype._ExpandStarCols = function (availableSize) {
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
Grid.prototype._AllocateDesiredSize = function (rowCount, colCount) {
    for (var i = 0; i < 2; i++) {
        var matrix = i === 0 ? this._RowMatrix : this._ColMatrix;
        var count = i === 0 ? rowCount : colCount;
        for (var row = count - 1; row >= 0; row--) {
            for (var col = row; col >= 0; col--) {
                var spansStar = false;
                for (var j = row; j >= col; j--) {
                    spansStar = spansStar || (matrix[j][j]._Type === GridUnitType.Star);
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
    if (this._RowMatrix == null || this._ColMatrix == null || this._RowMatrixDim !== rowCount || this._ColMatrixDim !== colCount) {
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
    return value === undefined ? null : value;
}
Grid.prototype._GetColumnDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.ColumnDefinitionsProperty);
    return value === undefined ? null : value;
}
Grid.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Grid) {
        Panel.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property === Grid.ShowGridLinesProperty) {
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
        if (args.Property === Grid.ColumnProperty
            || args.Property === Grid.RowProperty
            || args.Property === Grid.ColumnSpanProperty
            || args.Property === Grid.RowSpanProperty) {
            this._InvalidateMeasure();
            args.Item._InvalidateMeasure();
            return;
        }
    } else if (RefObject.RefEquals(sender, this._GetColumnDefinitionsNoAutoCreate())
        || RefObject.RefEquals(sender, this._GetRowDefinitionsNoAutoCreate())) {
        if (args.Property !== ColumnDefinition.ActualWidthProperty
            && args.Property !== RowDefinition.ActualHeightProperty) {
            this._InvalidateMeasure();
        }
        return;
    }
    Panel.prototype._OnCollectionChanged.call(this, sender, args);
};
function _Segment(offered, min, max, unitType) {
    RefObject.call(this);
    this._DesiredSize = 0;
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
function _GridNode(matrix, row, col, size) {
    LinkedListNode.call(this);
    this._Matrix = matrix;
    this._Row = row;
    this._Col = col;
    this._Size = size;
    this._Cell = this._Matrix == null ? null : this._Matrix[row][col];
}
_GridNode.InheritFrom(LinkedListNode);
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

function PasswordBox() {
    TextBoxBase.call(this);
    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
}
PasswordBox.InheritFrom(TextBoxBase);

function TextBox() {
    TextBoxBase.call(this);
    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;
    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
}
TextBox.InheritFrom(TextBoxBase);
TextBox.IsReadOnlyProperty = DependencyProperty.Register("IsReadOnly", function () { return Boolean; }, TextBox);
TextBox.prototype.GetIsReadOnly = function () {
    return this.GetValue(TextBox.IsReadOnlyProperty);
};
TextBox.prototype.SetIsReadOnly = function (value) {
    this.SetValue(TextBox.IsReadOnlyProperty, value);
};
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
TextBox.prototype.GetIsMouseOver = function () {
    return this._IsMouseOver;
};
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
            this.ClearSelection(start + textLen);
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
            this._Emit |= _TextBoxEmitChanged.TEXT;
            this.ClearSelection(0);
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
TextBox.prototype.OnMouseEnter = function (sender, args) {
    this._IsMouseOver = true;
    this._ChangeVisualState(true);
    TextBoxBase.prototype.OnMouseEnter.call(this, sender, args);
};
TextBox.prototype.OnMouseLeave = function (sender, args) {
    this._IsMouseOver = false;
    this._ChangeVisualState(true);
    TextBoxBase.prototype.OnMouseLeave.call(this, sender, args);
};
TextBox.prototype.OnGotFocus = function (sender, args) {
    TextBoxBase.prototype.OnGotFocus.call(this, sender, args);
    this._ChangeVisualState(true);
};
TextBox.prototype.OnLostFocus = function (sender, args) {
    TextBoxBase.prototype.OnLostFocus.call(this, sender, args);
    this._ChangeVisualState(true);
};
TextBox.prototype._ChangeVisualState = function (useTransitions) {
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
TextBox.prototype.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: Button
        },
        Children: [
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
                                                            Props: { Duration: new Duration(0.0), To: 0.0 },
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

function ContentControl() {
    Control.call(this);
}
ContentControl.InheritFrom(Control);
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
ContentControl.prototype.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentControl.prototype._GetDefaultTemplate = function () {
    return this.GetFallbackRoot();
};
ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

function ButtonBase() {
    ContentControl.call(this);
    if (!IsDocumentReady())
        return;
    this._IsMouseCaptured = false;
    this._IsMouseLeftButtonDown = false;
    this._IsSpaceKeyDown = false;
    this._MousePosition = new Point();
    this.Click = new MulticastEvent();
    this.Loaded.Subscribe(function () { this._IsLoaded = true; this.UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}
ButtonBase.InheritFrom(ContentControl);
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
ButtonBase.prototype.UpdateVisualState = function (useTransitions) {
    if (this._SuspendStateChanges)
        return;
    this._ChangeVisualState(useTransitions === true);
};
ButtonBase.prototype._ChangeVisualState = function (useTransitions) {
};
ButtonBase.prototype._GoToState = function (useTransitions, stateName) {
    return VisualStateManager.GoToState(this, stateName, useTransitions);
};
ButtonBase.prototype.OnMouseEnter = function (sender, args) {
    ContentControl.prototype.OnMouseEnter.call(this, sender, args);
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
ButtonBase.prototype.OnMouseLeftButtonUp = function (sender, args) {
    ContentControl.prototype.OnMouseLeftButtonUp.call(this, sender, args);
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
ButtonBase.prototype.OnClick = function () {
    this.Click.Raise(this, null);
};
ButtonBase.prototype._CaptureMouseInternal = function () {
    if (!this._IsMouseCaptured)
        this._IsMouseCaptured = this.CaptureMouse();
};
ButtonBase.prototype._ReleaseMouseCaptureInternal = function () {
    this.ReleaseMouseCapture();
    this._IsMouseCaptured = false;
};
ButtonBase.prototype._IsValidMousePosition = function () {
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
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
ButtonBase._GetVisualRoot = function (d) {
    var parent = d;
    while (parent != null) {
        d = parent;
        parent = VisualTreeHelper.GetParent(parent);
    }
    return d;
};

function HyperlinkButton() {
    ButtonBase.call(this);
}
HyperlinkButton.InheritFrom(ButtonBase);
HyperlinkButton.StateDisabled = "Disabled";
HyperlinkButton.StatePressed = "Pressed";
HyperlinkButton.StateMouseOver = "MouseOver";
HyperlinkButton.StateNormal = "Normal";
HyperlinkButton.StateFocused = "Focused";
HyperlinkButton.StateUnfocused = "Unfocused";
HyperlinkButton.NavigateUriProperty = DependencyProperty.Register("NavigateUri", function() { return Uri; }, HyperlinkButton, null);
HyperlinkButton.prototype.GetNavigateUri = function () {
	return this.GetValue(HyperlinkButton.NavigateUriProperty);
};
HyperlinkButton.prototype.SetNavigateUri = function (value) {
	this.SetValue(HyperlinkButton.NavigateUriProperty, value);
};
HyperlinkButton.TargetNameProperty = DependencyProperty.Register("TargetName", function() { return String; }, HyperlinkButton, null);
HyperlinkButton.prototype.GetTargetName = function () {
	return this.GetValue(HyperlinkButton.TargetNameProperty);
};
HyperlinkButton.prototype.SetTargetName = function (value) {
	this.SetValue(HyperlinkButton.TargetNameProperty, value);
};
HyperlinkButton.prototype.OnApplyTemplate = function () {
    ButtonBase.prototype.OnApplyTemplate.call(this);
    this.UpdateVisualState(false);
};
HyperlinkButton.prototype.OnClick = function () {
    ButtonBase.prototype.OnClick.call(this);
    if (this.GetNavigateUri() != null) {
        this._Navigate();
    }
};
HyperlinkButton.prototype._GetAbsoluteUri = function () {
    var destination = this.GetNavigateUri();
    if (!destination.IsAbsoluteUri) {
        var original = destination.OriginalString;
        if (original && original.charAt(0) !== '/')
            throw new NotSupportedException();
        destination = new Uri(App.Instance.GetHost().GetSource(), destination);
    }
    return destination;
};
HyperlinkButton.prototype._ChangeVisualState = function (useTransitions) {
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
HyperlinkButton.prototype._Navigate = function () {
    window.location.href = this.GetNavigateUri().toString();
};
HyperlinkButton.prototype.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: HyperlinkButton
        },
        Children: [
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

function Button() {
    ButtonBase.call(this);
}
Button.InheritFrom(ButtonBase);
Button.StateDisabled = "Disabled";
Button.StatePressed = "Pressed";
Button.StateMouseOver = "MouseOver";
Button.StateNormal = "Normal";
Button.StateFocused = "Focused";
Button.StateUnfocused = "Unfocused";
Button.prototype.OnApplyTemplate = function () {
    ButtonBase.prototype.OnApplyTemplate.call(this);
    this.UpdateVisualState(false);
};
Button.prototype._ChangeVisualState = function (useTransitions) {
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
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#CCFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#7FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
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
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[0].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#C6FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#8CFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#3FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
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

