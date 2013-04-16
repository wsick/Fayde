module Fayde {
    export enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
}

module Fayde {
    export class Expression {
        IsUpdating: bool;
        IsAttached: bool;
        GetValue(propd: DependencyProperty): any { }
        OnAttached(dobj: DependencyObject) {
            this.IsAttached = true;
        }
        OnDetached(dobj: DependencyObject) {
            this.IsAttached = false;
        }
    }
}

module Fayde {
    export class LayoutInformation {
        /*
        static GetLayoutClip(uie: UIElement): Media.Geometry {
        }
        static SetLayoutClip(uie: UIElement, value: Media.Geometry) {
        }
        static GetLayoutExceptionElement(uie: UIElement): UIElement {
        }
        static SetLayoutExceptionElement(uie: UIElement, value: UIElement) {
        }
        static GetLayoutSlot(uie: UIElement): rect {
        }
        static SetLayoutSlot(uie: UIElement, value: rect) {
        }
        */
    }
}

module Fayde {
    export class NameScope {
        IsRoot: bool = false;
        private XNodes = {};
        constructor(isRoot?: bool) {
            if (isRoot)
                this.IsRoot = isRoot;
        }
        FindName(name: string): XamlNode {
            return this.XNodes[name];
        }
        RegisterName(name: string, xnode: XamlNode) {
            var existing = this.XNodes[name];
            if (existing && existing !== xnode)
                throw new InvalidOperationException("Name is already registered.");
            this.XNodes[name] = xnode;
        }
        UnregisterName(name: string) {
            this.XNodes[name] = undefined;
        }
        Absorb(otherNs: NameScope) {
            var on = otherNs.XNodes;
            for (var name in on) {
                this.RegisterName(name, on[name]);
            }
        }
    }
}

module Fayde {
    export function CreatePropertyChangedListener(func: Function, closure: any) {
        return {
            OnPropertyChanged: function (sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) { func.call(closure, sender, args); }
        };
    }
}

module Fayde {
    class TypeConverters {
        static ThicknessConverter(str: string): Thickness {
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
                throw new XamlParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        }
        static CornerRadiusConverter(str: string): CornerRadius {
            if (!str)
                return new CornerRadius();
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
                throw new XamlParseException("Cannot parse CornerRadius value '" + str + "'");
            }
            return new CornerRadius(topLeft, topRight, bottomRight, bottomLeft);
        }
        static BrushConverter(str: string): Media.Brush {
            var scb = new Media.SolidColorBrush();
            scb.Color = ColorConverter(str);
            return scb;
        }
        static ColorConverter(str: string): Color {
            if (!str)
                return new Color();
            if (str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if (!color)
                    throw new NotSupportedException("Unknown Color: " + str);
                return color;
            }
            return Color.FromHex(str);
        }
    }
    export class TypeConverter {
        static ConvertObject(propd: DependencyProperty, val: any, objectType: Function, doStringConversion: bool) {
            if (val == null)
                return val;
            var targetType = propd.GetTargetType();
            if (typeof targetType === "function" && (<any>targetType)._IsNullstone) {
                if (val instanceof targetType)
                    return val;
                var converter = TypeConverters[(<any>targetType)._TypeName + "Converter"];
                if (converter)
                    return converter(val);
            } else if (targetType instanceof Enum) {
                if (typeof val === "string") {
                    var ret = (<Enum><any>targetType).Object[val];
                    if (ret !== undefined)
                        return ret;
                    return val;
                }
            } else if (typeof targetType === "number" || targetType === Number) {
                if (typeof val === "number")
                    return val;
                if (!val)
                    return 0;
                if (val instanceof Thickness)
                    return val.Left;
                return parseFloat(val.toString());
            }
            if (typeof targetType === "string" || targetType === String)
                return doStringConversion ? val.toString() : "";
            var tc;
            if (propd._IsAttached) {
            } else {
            }
            return val;
        }
        static GeometryFromString(val: string): Media.Geometry {
            return Media.ParseGeometry(val);
        }
        static PointCollectionFromString(val: string): Shapes.PointCollection {
            return Shapes.ParsePointCollection(val);
        }
    }
}

module Fayde {
    export interface IWalker {
        Step(): any;
    }
    export interface IStyleWalker extends IWalker {
        Step(): Setter;
    }
    export interface IDeepTreeWalker extends IWalker {
        Step(): UINode;
        SkipBranch();
    }
    function setterSort(setter1: Setter, setter2: Setter) {
        var a = setter1.Property;
        var b = setter2.Property;
        return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
    }
    function mergeSetters(arr: any[], dps: any[], style: Style) {
        var enumerator = style.Setters.GetEnumerator(true);
        var setter: Setter;
        while (enumerator.MoveNext()) {
            setter = <Setter>enumerator.Current;
            if (!(setter instanceof Fayde.Setter))
                continue;
            var propd = setter.Property;
            if (!propd)
                continue;
            if (dps[propd._ID])
                continue;
            dps[propd._ID] = setter;
            arr.push(setter);
        }
    }
    export function SingleStyleWalker(style: Style): IStyleWalker {
        var dps = [];
        var flattenedSetters = [];
        var cur = style;
        while (cur) {
            mergeSetters(flattenedSetters, dps, cur);
            cur = cur.BasedOn;
        }
        flattenedSetters.sort(setterSort);
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    export function MultipleStylesWalker(styles: Style[]): IStyleWalker {
        var flattenedSetters = [];
        if (styles) {
            var dps = [];
            var stylesSeen = [];
            var len = styles.length;
            for (var i = 0; i < len; i++) {
                var style = styles[i];
                while (style) {
                    if (stylesSeen.indexOf(style) > -1)
                        continue;
                    mergeSetters(flattenedSetters, dps, style);
                    stylesSeen.push(style);
                    style = style.BasedOn;
                }
            }
            flattenedSetters.sort(setterSort);
        }
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    export function DeepTreeWalker(top: UIElement, direction?: VisualTreeDirection): IDeepTreeWalker {
        var last: UINode = undefined;
        var dir = VisualTreeDirection.Logical;
        var walkList: UINode[] = [top.XamlNode];
        if (direction)
            dir = direction;
        return {
            Step: function () {
                if (last) {
                    var enumerator = last.GetVisualTreeEnumerator(dir);
                    var insertIndex = 0;
                    while (enumerator.MoveNext()) {
                        walkList.splice(insertIndex, 0, enumerator.Current);
                        insertIndex++;
                    }
                }
                var next = walkList[0];
                if (!next) {
                    last = undefined;
                    return;
                }
                var curNode: UINode;
                return curNode;
            },
            SkipBranch: function () {
                last = undefined;
            }
        };
    }
}

module Fayde {
    declare var Warn;
    export enum VisualTreeDirection {
        Logical = 0,
        LogicalReverse = 1,
        ZFoward = 2,
        ZReverse = 3,
    }
    export class XamlNode {
        XObject: XamlObject;
        ParentNode: XamlNode = null;
        Name: string = "";
        NameScope: NameScope = null;
        private _OwnerNameScope: NameScope = null;
        constructor(xobj: XamlObject) {
            this.XObject = xobj;
        }
        SetName(name: string) {
            this.Name = name;
            var ns = this.FindNameScope();
            if (ns)
                ns.RegisterName(name, this);
        }
        FindNameScope(): NameScope {
            if (this._OwnerNameScope)
                return this._OwnerNameScope;
            var curNode = this;
            var ns;
            while (curNode) {
                ns = curNode.NameScope;
                if (ns) {
                    this._OwnerNameScope = ns;
                    return ns;
                }
                curNode = curNode.ParentNode;
            }
            return undefined;
        }
        IsAttached: bool = false;
        SetIsAttached(value: bool) {
            if (this.IsAttached !== value)
                return;
            this.IsAttached = value;
            this.OnIsAttachedChanged(value);
        }
        OnIsAttachedChanged(newIsAttached: bool) { }
        AttachTo(parentNode: XamlNode, error: BError): bool {
            this.SetIsAttached(parentNode.IsAttached);
            var curNode = parentNode;
            while (curNode) {
                if (curNode === this) {
                    error.Message = "AddParentNode - Cycle found.";
                    return false;
                }
                curNode = curNode.ParentNode;
            }
            if (this.ParentNode) {
                error.Message = "Element is already a child of another element.";
                error.Number = BError.InvalidOperation;
                return false;
            }
            var parentScope = parentNode.FindNameScope();
            var thisScope = this.NameScope;
            if (thisScope) {
                if (!thisScope.IsRoot) {
                    parentScope.Absorb(thisScope);
                    this.NameScope = null;
                    this._OwnerNameScope = parentScope;
                }
            } else if (parentScope) {
                var name = this.Name;
                if (name) {
                    var existing = parentScope.FindName(name);
                    if (existing && existing !== this) {
                        error.Message = "Name is already registered in parent namescope.";
                        error.Number = BError.Argument;
                        return false;
                    }
                    parentScope.RegisterName(name, this);
                }
                this._OwnerNameScope = parentScope;
            }
            var old = this.ParentNode;
            this.ParentNode = parentNode;
            this.OnParentChanged(old, parentNode);
            return true;
        }
        Detach() {
            var name = this.Name;
            if (name && !this.NameScope) {
                var ns = this.FindNameScope();
                if (ns) ns.UnregisterName(this.Name);
            }
            this.SetIsAttached(false);
            this._OwnerNameScope = null;
            var old = this.ParentNode;
            this.ParentNode = null;
            this.OnParentChanged(old, null);
        }
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) { }
        GetInheritedEnumerator(): IEnumerator { return undefined; }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator { return undefined; }
    }
}

module Fayde {
    export class XamlObject {
        XamlNode: Fayde.XamlNode;
        constructor() {
            this.XamlNode = this.CreateNode();
        }
        CreateNode(): XamlNode {
            return new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
    }
}

module Fayde.Providers {
    export enum _PropertyPrecedence {
        IsEnabled = 0,
        LocalValue = 1,
        DynamicValue = 2,
        LocalStyle = 3,
        ImplicitStyle = 4,
        Inherited = 5,
        InheritedDataContext = 6,
        DefaultValue = 7,
        AutoCreate = 8,
        Lowest = 8,
        Highest = 0,
        Count = 9,
    }
    export enum _StyleIndex {
        VisualTree = 0,
        ApplicationResources = 1,
        GenericXaml = 2,
        Count = 3,
    }
    export enum _StyleMask {
        None = 0,
        VisualTree = 1 << _StyleIndex.VisualTree,
        ApplicationResources = 1 << _StyleIndex.ApplicationResources,
        GenericXaml = 1 << _StyleIndex.GenericXaml,
        All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml,
    }
    export enum _Inheritable {
        Foreground = 1 << 0,
        FontFamily = 1 << 1,
        FontStretch = 1 << 2,
        FontStyle = 1 << 3,
        FontWeight = 1 << 4,
        FontSize = 1 << 5,
        Language = 1 << 6,
        FlowDirection = 1 << 7,
        UseLayoutRounding = 1 << 8,
        TextDecorations = 1 << 9,
        All = 0x7ff,
        None = 0,
    }
}

module Fayde.Providers {
    export interface IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any;
    }
    export interface IPropertyChangedListener {
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs);
    }
    export interface IProviderStore {
        GetValue(propd: DependencyProperty): any;
        GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any;
        SetValue(propd: DependencyProperty, value: any);
        ClearValue(propd: DependencyProperty, notifyListeners?: bool);
        ReadLocalValue(propd: DependencyProperty): any;
        _Object: DependencyObject;
        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, error: BError);
    }
}

module Fayde.Data {
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
    }
    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
    export enum _PropertyNodeType {
        AttachedProperty = 0,
        Property = 1,
        Indexed = 2,
        None = 3,
    }
}

class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
    }
}
class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}

module Fayde.Media {
    export class Brush {
    }
}

module Fayde.Media {
    export class Geometry {
    }
}

module Fayde.Media {
    export function ParseGeometry(val: string): Geometry {
        return new Geometry();
    }
}

class Clip {
    static _TypeName = "Clip";
    X: number;
    Y: number;
    Width: number;
    Height: number;
    constructor(r: rect) {
        var rounded = rect.roundOut(rect.clone(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
}

class Color {
    private static __NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    private static __AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    R: number = 0;
    G: number = 0;
    B: number = 0;
    A: number = 1.0;
    Add(color2: Color) {
        var c = new Color();
        c.R = this.R + color2.R;
        c.G = this.G + color2.G;
        c.B = this.B + color2.B;
        c.A = this.A + color2.A;
        return c;
    }
    Subtract(color2: Color) {
        var c = new Color();
        c.R = this.R - color2.R;
        c.G = this.G - color2.G;
        c.B = this.B - color2.B;
        c.A = this.A - color2.A;
        return c;
    }
    Multiply(factor: number) {
        var c = new Color();
        c.R = this.R * factor;
        c.G = this.G * factor;
        c.B = this.B * factor;
        c.A = this.A * factor;
        return c;
    }
    Equals(other: Color) {
        return this.R === other.R
            && this.G === other.G
            && this.B === other.B
            && this.A === other.A;
    }
    toString() {
        return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
    }
    ToHexStringNoAlpha(): string {
        return "#" + this.R.toString(16) + this.G.toString(16) + this.B.toString(16);
    }
    static LERP(start: Color, end: Color, p: number): Color {
        var c = new Color();
        c.R = start.R + (end.R - start.R) * p;
        c.G = start.G + (end.G - start.G) * p;
        c.B = start.B + (end.B - start.B) * p;
        c.A = start.A + (end.A - start.A) * p;
        return c;
    }
    static FromRgba(r: number, g: number, b: number, a: number): Color {
        var c = new Color();
        c.R = r;
        c.G = g;
        c.B = b;
        c.A = a;
        return c;
    }
    static FromHex(hex: string): Color {
        var match;
        var c = new Color();
        if ((match = Color.__AlphaRegex.exec(hex)) != null) {
            c.A = parseInt(match[1], 16) / 255.0;
            c.R = parseInt(match[2], 16);
            c.G = parseInt(match[3], 16);
            c.B = parseInt(match[4], 16);
        } else if ((match = Color.__NoAlphaRegex.exec(hex)) != null) {
            c.A = 1.0;
            c.R = parseInt(match[1], 16);
            c.G = parseInt(match[2], 16);
            c.B = parseInt(match[3], 16);
        }
        return c;
    }
    static KnownColors = {
        AliceBlue: Color.FromHex("#FFF0F8FF"),
        AntiqueWhite: Color.FromHex("#FFFAEBD7"),
        Aqua: Color.FromHex("#FF00FFFF"),
        Aquamarine: Color.FromHex("#FF7FFFD4"),
        Azure: Color.FromHex("#FFF0FFFF"),
        Beige: Color.FromHex("#FFF5F5DC"),
        Bisque: Color.FromHex("#FFFFE4C4"),
        Black: Color.FromHex("#FF000000"),
        BlanchedAlmond: Color.FromHex("#FFFFEBCD"),
        Blue: Color.FromHex("#FF0000FF"),
        BlueViolet: Color.FromHex("#FF8A2BE2"),
        Brown: Color.FromHex("#FFA52A2A"),
        BurlyWood: Color.FromHex("#FFDEB887"),
        CadetBlue: Color.FromHex("#FF5F9EA0"),
        Chartreuse: Color.FromHex("#FF7FFF00"),
        Chocolate: Color.FromHex("#FFD2691E"),
        Coral: Color.FromHex("#FFFF7F50"),
        CornflowerBlue: Color.FromHex("#FF6495ED"),
        Cornsilk: Color.FromHex("#FFFFF8DC"),
        Crimson: Color.FromHex("#FFDC143C"),
        Cyan: Color.FromHex("#FF00FFFF"),
        DarkBlue: Color.FromHex("#FF00008B"),
        DarkCyan: Color.FromHex("#FF008B8B"),
        DarkGoldenrod: Color.FromHex("#FFB8860B"),
        DarkGray: Color.FromHex("#FFA9A9A9"),
        DarkGreen: Color.FromHex("#FF006400"),
        DarkKhaki: Color.FromHex("#FFBDB76B"),
        DarkMagenta: Color.FromHex("#FF8B008B"),
        DarkOliveGreen: Color.FromHex("#FF556B2F"),
        DarkOrange: Color.FromHex("#FFFF8C00"),
        DarkOrchid: Color.FromHex("#FF9932CC"),
        DarkRed: Color.FromHex("#FF8B0000"),
        DarkSalmon: Color.FromHex("#FFE9967A"),
        DarkSeaGreen: Color.FromHex("#FF8FBC8F"),
        DarkSlateBlue: Color.FromHex("#FF483D8B"),
        DarkSlateGray: Color.FromHex("#FF2F4F4F"),
        DarkTurquoise: Color.FromHex("#FF00CED1"),
        DarkViolet: Color.FromHex("#FF9400D3"),
        DeepPink: Color.FromHex("#FFFF1493"),
        DeepSkyBlue: Color.FromHex("#FF00BFFF"),
        DimGray: Color.FromHex("#FF696969"),
        DodgerBlue: Color.FromHex("#FF1E90FF"),
        Firebrick: Color.FromHex("#FFB22222"),
        FloralWhite: Color.FromHex("#FFFFFAF0"),
        ForestGreen: Color.FromHex("#FF228B22"),
        Fuchsia: Color.FromHex("#FFFF00FF"),
        Gainsboro: Color.FromHex("#FFDCDCDC"),
        GhostWhite: Color.FromHex("#FFF8F8FF"),
        Gold: Color.FromHex("#FFFFD700"),
        Goldenrod: Color.FromHex("#FFDAA520"),
        Gray: Color.FromHex("#FF808080"),
        Green: Color.FromHex("#FF008000"),
        GreenYellow: Color.FromHex("#FFADFF2F"),
        Honeydew: Color.FromHex("#FFF0FFF0"),
        HotPink: Color.FromHex("#FFFF69B4"),
        IndianRed: Color.FromHex("#FFCD5C5C"),
        Indigo: Color.FromHex("#FF4B0082"),
        Ivory: Color.FromHex("#FFFFFFF0"),
        Khaki: Color.FromHex("#FFF0E68C"),
        Lavender: Color.FromHex("#FFE6E6FA"),
        LavenderBlush: Color.FromHex("#FFFFF0F5"),
        LawnGreen: Color.FromHex("#FF7CFC00"),
        LemonChiffon: Color.FromHex("#FFFFFACD"),
        LightBlue: Color.FromHex("#FFADD8E6"),
        LightCoral: Color.FromHex("#FFF08080"),
        LightCyan: Color.FromHex("#FFE0FFFF"),
        LightGoldenrodYellow: Color.FromHex("#FFFAFAD2"),
        LightGray: Color.FromHex("#FFD3D3D3"),
        LightGreen: Color.FromHex("#FF90EE90"),
        LightPink: Color.FromHex("#FFFFB6C1"),
        LightSalmon: Color.FromHex("#FFFFA07A"),
        LightSeaGreen: Color.FromHex("#FF20B2AA"),
        LightSkyBlue: Color.FromHex("#FF87CEFA"),
        LightSlateGray: Color.FromHex("#FF778899"),
        LightSteelBlue: Color.FromHex("#FFB0C4DE"),
        LightYellow: Color.FromHex("#FFFFFFE0"),
        Lime: Color.FromHex("#FF00FF00"),
        LimeGreen: Color.FromHex("#FF32CD32"),
        Linen: Color.FromHex("#FFFAF0E6"),
        Magenta: Color.FromHex("#FFFF00FF"),
        Maroon: Color.FromHex("#FF800000"),
        MediumAquamarine: Color.FromHex("#FF66CDAA"),
        MediumBlue: Color.FromHex("#FF0000CD"),
        MediumOrchid: Color.FromHex("#FFBA55D3"),
        MediumPurple: Color.FromHex("#FF9370DB"),
        MediumSeaGreen: Color.FromHex("#FF3CB371"),
        MediumSlateBlue: Color.FromHex("#FF7B68EE"),
        MediumSpringGreen: Color.FromHex("#FF00FA9A"),
        MediumTurquoise: Color.FromHex("#FF48D1CC"),
        MediumVioletRed: Color.FromHex("#FFC71585"),
        MidnightBlue: Color.FromHex("#FF191970"),
        MintCream: Color.FromHex("#FFF5FFFA"),
        MistyRose: Color.FromHex("#FFFFE4E1"),
        Moccasin: Color.FromHex("#FFFFE4B5"),
        NavajoWhite: Color.FromHex("#FFFFDEAD"),
        Navy: Color.FromHex("#FF000080"),
        OldLace: Color.FromHex("#FFFDF5E6"),
        Olive: Color.FromHex("#FF808000"),
        OliveDrab: Color.FromHex("#FF6B8E23"),
        Orange: Color.FromHex("#FFFFA500"),
        OrangeRed: Color.FromHex("#FFFF4500"),
        Orchid: Color.FromHex("#FFDA70D6"),
        PaleGoldenrod: Color.FromHex("#FFEEE8AA"),
        PaleGreen: Color.FromHex("#FF98FB98"),
        PaleTurquoise: Color.FromHex("#FFAFEEEE"),
        PaleVioletRed: Color.FromHex("#FFDB7093"),
        PapayaWhip: Color.FromHex("#FFFFEFD5"),
        PeachPuff: Color.FromHex("#FFFFDAB9"),
        Peru: Color.FromHex("#FFCD853F"),
        Pink: Color.FromHex("#FFFFC0CB"),
        Plum: Color.FromHex("#FFDDA0DD"),
        PowderBlue: Color.FromHex("#FFB0E0E6"),
        Purple: Color.FromHex("#FF800080"),
        Red: Color.FromHex("#FFFF0000"),
        RosyBrown: Color.FromHex("#FFBC8F8F"),
        RoyalBlue: Color.FromHex("#FF4169E1"),
        SaddleBrown: Color.FromHex("#FF8B4513"),
        Salmon: Color.FromHex("#FFFA8072"),
        SandyBrown: Color.FromHex("#FFF4A460"),
        SeaGreen: Color.FromHex("#FF2E8B57"),
        SeaShell: Color.FromHex("#FFFFF5EE"),
        Sienna: Color.FromHex("#FFA0522D"),
        Silver: Color.FromHex("#FFC0C0C0"),
        SkyBlue: Color.FromHex("#FF87CEEB"),
        SlateBlue: Color.FromHex("#FF6A5ACD"),
        SlateGray: Color.FromHex("#FF708090"),
        Snow: Color.FromHex("#FFFFFAFA"),
        SpringGreen: Color.FromHex("#FF00FF7F"),
        SteelBlue: Color.FromHex("#FF4682B4"),
        Tan: Color.FromHex("#FFD2B48C"),
        Teal: Color.FromHex("#FF008080"),
        Thistle: Color.FromHex("#FFD8BFD8"),
        Tomato: Color.FromHex("#FFFF6347"),
        Transparent: Color.FromHex("#00FFFFFF"),
        Turquoise: Color.FromHex("#FF40E0D0"),
        Violet: Color.FromHex("#FFEE82EE"),
        Wheat: Color.FromHex("#FFF5DEB3"),
        White: Color.FromHex("#FFFFFFFF"),
        WhiteSmoke: Color.FromHex("#FFF5F5F5"),
        Yellow: Color.FromHex("#FFFFFF00"),
        YellowGreen: Color.FromHex("#FF9ACD32")
    }
}

class CornerRadius {
    static _TypeName = "CornerRadius";
    TopLeft: number;
    TopRight: number;
    BottomRight: number;
    BottomLeft: number;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number) {
        this.TopLeft = topLeft == null ? 0 : topLeft;
        this.TopRight = topRight == null ? 0 : topRight;
        this.BottomRight = bottomRight == null ? 0 : bottomRight;
        this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
    }
    IsZero(): bool {
        return this.TopLeft === 0
            && this.TopRight === 0
            && this.BottomRight === 0
            && this.BottomLeft === 0;
    }
    Equals(other: CornerRadius): bool {
        return this.TopLeft === other.TopLeft
            && this.TopRight === other.TopRight
            && this.BottomRight === other.BottomRight
            && this.BottomLeft === other.BottomLeft;
    }
    toString(): string {
        return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
    }
}

enum DurationType {
    Automatic = 0,
    Forever = 1,
    TimeSpan = 2,
}
class Duration {
    static _TypeName = "Duration";
    private _Type: DurationType;
    private _TimeSpan: TimeSpan;
    static CreateAutomatic(): Duration {
        var d = new Duration();
        d._Type = DurationType.Automatic;
        return d;
    }
    static CreateForever(): Duration {
        var d = new Duration();
        d._Type = DurationType.Forever;
        return d;
    }
    static CreateTimeSpan(ts: TimeSpan): Duration {
        var d = new Duration();
        d._Type = DurationType.TimeSpan;
        d._TimeSpan = ts;
        return d;
    }
    get Type(): DurationType { return this._Type; }
    get TimeSpan(): TimeSpan {
        if (this._Type === DurationType.TimeSpan)
            return this._TimeSpan;
        throw new InvalidOperationException("");
    }
    get HasTimeSpan(): bool { return this._Type === DurationType.TimeSpan }
    get IsForever(): bool { return this._Type === DurationType.Forever; }
    get IsAutomatic(): bool { return this._Type === DurationType.Automatic; }
}

var FontStyle = {
    Normal: "normal",
    Italic: "italic",
    Oblique: "oblique"
};
var FontStretch = {
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
var FontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Normal: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
    ExtraBlack: 950
};
class Font {
    static _TypeName = "Font";
    static DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
    static DEFAULT_STRETCH = FontStretch.Normal;
    static DEFAULT_STYLE = FontStyle.Normal;
    static DEFAULT_WEIGHT = FontWeight.Normal;
    static DEFAULT_SIZE = 14;
    private _Family = Font.DEFAULT_FAMILY;
    private _Stretch = Font.DEFAULT_STRETCH;
    private _Style = Font.DEFAULT_STYLE;
    private _Weight = Font.DEFAULT_WEIGHT;
    private _Size = Font.DEFAULT_SIZE;
    private _CachedTranslation: string;
    private _CachedHeight: number;
    get Family() { return this._Family; }
    set Family(value) {
        if (this._Family == value)
            return;
        this._Family = value;
        this._PurgeCache();
    }
    get Stretch() { return this._Stretch; }
    set Stretch(value) {
        if (this._Stretch == value)
            return;
        this._Stretch = value;
        this._PurgeCache();
    }
    get Style() { return this._Style; }
    set Style(value) {
        if (this._Style == value)
            return;
        this._Style = value;
        this._PurgeCache();
    }
    get Weight() { return this._Weight; }
    set Weight(value) {
        if (this._Weight == value)
            return;
        this._Weight = value;
        this._PurgeCache();
    }
    get Size() { return this._Size; }
    set Size(value) {
        if (this._Size == value)
            return;
        this._Size = value;
        this._PurgeCache();
    }
    get IsChanged() { return this._CachedTranslation == null; }
    GetActualHeight() { return Font._MeasureHeight(this); }
    private _Descender() { return 0.0; } //most likely removable
    private _Ascender() { return 0.0; } //most likely removable
    private _PurgeCache() {
        this._CachedHeight = undefined;
        this._CachedTranslation = undefined;
    }
    ToHtml5Object(): string {
        if (!this._CachedTranslation)
            this._CachedTranslation = this._BuildTranslation();
        return this._CachedTranslation;
    }
    private _BuildTranslation(): string {
        var s = "";
        s += this.Style.toString() + " ";
        s += "normal ";
        s += this.Weight.toString() + " ";
        s += this.Size + "px ";
        s += this.Family.toString();
        return s;
    }
    private static _MeasureHeight(font: Font) {
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
    }
}

class FontFamily {
    static _TypeName = "FontFamily";
    constructor(public FamilyNames: string) {
    }
    toString(): string {
        return this.FamilyNames;
    }
}

class KeyTime {
    static _TypeName = "KeyTime";
    private _IsPaced: bool = false;
    private _IsUniform: bool = false;
    private _TimeSpan: TimeSpan = null;
    private _Percent: number = 0;
    static CreateUniform(): KeyTime {
        var kt = new KeyTime();
        kt._IsUniform = true;
        return kt;
    }
    static CreateTimeSpan(ts: TimeSpan): KeyTime {
        var kt = new KeyTime();
        kt._TimeSpan = ts;
        return kt;
    }
    get IsPaced(): bool { return this._IsPaced; }
    get IsUniform(): bool { return this._IsUniform; }
    get HasTimeSpan(): bool { return this._TimeSpan != null; }
    get TimeSpan(): TimeSpan { return this._TimeSpan; }
    get HasPercent(): bool { return this._Percent != null; }
    get Percent(): number { return this._Percent; }
}

class Point {
    static _TypeName = "Point";
    X: number;
    Y: number;
    constructor(x?: number, y?: number) {
        this.X = x == null ? 0 : x;
        this.Y = y == null ? 0 : y;
    }
    toString(): string {
        return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
    };
    Equals(other: Point): bool {
        return this.X === other.X && this.Y === other.Y;
    }
    static Equals(p1: Point, p2: Point) {
        if (p1 == null)
            return p2 == null;
        if (p2 == null)
            return false;
        return p1.X === p2.X && p1.Y === p2.Y;
    }
    static LERP(start: Point, end: Point, p: number) {
        var x = start.X + (end.X - start.X) * p;
        var y = start.Y + (end.Y - start.Y) * p;
        return new Point(x, y);
    }
}

declare var vec2;
declare var vec4;
declare var mat3;
declare var mat4;
var RectOverlap = {
    Out: 0,
    In: 1,
    Part: 2
};
class rect {
    X: number = 0;
    Y: number = 0;
    Width: number = 0;
    Height: number = 0;
    toString(): string {
        return "{" + this.X + "," + this.Y + "," + this.Width + "," + this.Height + "}";
    }
    static _TypeName = "rect";
    static fromSize(size: size): rect {
        var r = new rect();
        r.Width = size.Width;
        r.Height = size.Height;
        return r;
    }
    static clear(dest: rect) {
        dest.X = 0;
        dest.Y = 0;
        dest.Width = 0;
        dest.Height = 0;
    }
    static set (dest: rect, x: number, y: number, width: number, height: number) {
        dest.X = x;
        dest.Y = y;
        dest.Width = width;
        dest.Height = height;
    }
    static isEmpty(rect1: rect) {
        return rect1.Width <= 0
            || rect1.Height <= 0;
    }
    static isEmptyLogical(rect1: rect) {
        return rect1.Width <= 0
            && rect1.Height <= 0;
    }
    static copyTo(src: rect, dest: rect) {
        dest.X = src.X;
        dest.Y = src.Y;
        dest.Width = src.Width;
        dest.Height = src.Height;
    }
    static clone(src: rect): rect {
        var r = new rect();
        r.X = src.X;
        r.Y = src.Y;
        r.Width = src.Width;
        r.Height = src.Height;
        return r;
    }
    static isEqual(rect1: rect, rect2: rect): bool {
        return rect1.X === rect2.X
            && rect1.Y === rect2.Y
            && rect1.Width === rect2.Width
            && rect1.Height === rect2.Height;
    }
    static intersection(rect1: rect, rect2: rect) {
        var x = Math.max(rect1.X, rect2.X);
        var y = Math.max(rect2.Y, rect2.Y);
        rect1.Width = Math.max(0, Math.min(rect1.X + rect1.Width, rect2.X + rect2.Width) - x);
        rect1.Height = Math.max(0, Math.min(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y);
        rect1.X = x;
        rect1.Y = y;
    }
    static union(rect1: rect, rect2: rect) {
        if (rect.isEmpty(rect2))
            return;
        if (rect.isEmpty(rect1)) {
            rect.copyTo(rect2, rect1);
            return;
        }
        var x = Math.min(rect1.X, rect2.X);
        var y = Math.min(rect1.Y, rect2.Y);
        rect1.Width = Math.max(rect1.X + rect1.Width, rect2.X + rect2.Width) - x;
        rect1.Height = Math.max(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y;
        rect1.X = x;
        rect1.Y = y;
    }
    static unionLogical(rect1: rect, rect2: rect) {
        if (rect.isEmptyLogical(rect2))
            return;
        if (rect.isEmptyLogical(rect1)) {
            rect.copyTo(rect2, rect1);
            return;
        }
        var x = Math.min(rect1.X, rect2.X);
        var y = Math.min(rect1.Y, rect2.Y);
        rect1.Width = Math.max(rect1.X + rect1.Width, rect2.X + rect2.Width) - x;
        rect1.Height = Math.max(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y;
        rect1.X = x;
        rect1.Y = y;
    }
    static growBy(dest: rect, left: number, top: number, right: number, bottom: number) {
        dest.X -= left;
        dest.Y -= top;
        dest.Width += left + right;
        dest.Height += top + bottom;
        if (dest.Width < 0)
            dest.Width = 0;
        if (dest.Height < 0)
            dest.Height = 0;
    }
    static growByThickness(dest: rect, thickness) {
        dest.X -= thickness.Left;
        dest.Y -= thickness.Top;
        dest.Width += thickness.Left + thickness.Right;
        dest.Height += thickness.Top + thickness.Bottom;
        if (dest.Width < 0)
            dest.Width = 0;
        if (dest.Height < 0)
            dest.Height = 0;
    }
    static shrinkBy(dest: rect, left: number, top: number, right: number, bottom: number) {
        dest.X += left;
        dest.Y += top;
        dest.Width -= left + right;
        dest.Height -= top + bottom;
        if (dest.Width < 0)
            dest.Width = 0;
        if (dest.Height < 0)
            dest.Height = 0;
    }
    static shrinkByThickness(dest: rect, thickness) {
        dest.X += thickness.Left;
        dest.Y += thickness.Top;
        dest.Width -= thickness.Left + thickness.Right;
        dest.Height -= thickness.Top + thickness.Bottom;
        if (dest.Width < 0)
            dest.Width = 0;
        if (dest.Height < 0)
            dest.Height = 0;
    }
    static extendTo(rect1: rect, x: number, y: number) {
        var rx = rect1.X;
        var ry = rect1.Y;
        var rw = rect1.Width;
        var rh = rect1.Height;
        if (x < rx || x > (rx + rw))
            rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
        if (y < ry || y > (ry + rh))
            rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));
        rect1.X = Math.min(rx, x);
        rect1.Y = Math.min(ry, y);
        rect1.Width = rw;
        rect1.Height = rh;
    }
    static transform(dest: rect, xform) {
        if (!xform)
            return;
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec2.createFrom(x, y);
        var p2 = vec2.createFrom(x + width, y);
        var p3 = vec2.createFrom(x + width, y + height);
        var p4 = vec2.createFrom(x, y + height);
        mat3.transformVec2(xform, p1);
        mat3.transformVec2(xform, p2);
        mat3.transformVec2(xform, p3);
        mat3.transformVec2(xform, p4);
        var l = Math.min(p1[0], p2[0], p3[0], p4[0]);
        var t = Math.min(p1[1], p2[1], p3[1], p4[1]);
        var r = Math.max(p1[0], p2[0], p3[0], p4[0]);
        var b = Math.max(p1[1], p2[1], p3[1], p4[1]);
        dest.X = l;
        dest.Y = t;
        dest.Width = r - l;
        dest.Height = b - t;
    }
    private static clipmask(clip) {
        var mask = 0;
        if (-clip[0] + clip[3] < 0) mask |= (1 << 0);
        if (clip[0] + clip[3] < 0) mask |= (1 << 1);
        if (-clip[1] + clip[3] < 0) mask |= (1 << 2);
        if (clip[1] + clip[3] < 0) mask |= (1 << 3);
        if (clip[2] + clip[3] < 0) mask |= (1 << 4);
        if (-clip[2] + clip[3] < 0) mask |= (1 << 5);
        return mask;
    };
    static transform4(dest: rect, projection) {
        if (!projection)
            return;
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec4.createFrom(x, y, 0.0, 1.0);
        var p2 = vec4.createFrom(x + width, y, 0.0, 1.0);
        var p3 = vec4.createFrom(x + width, y + height, 0.0, 1.0);
        var p4 = vec4.createFrom(x, y + height, 0.0, 1.0);
        mat4.transformVec4(projection, p1);
        mat4.transformVec4(projection, p2);
        mat4.transformVec4(projection, p3);
        mat4.transformVec4(projection, p4);
        var vs = 65536.0;
        var vsr = 1.0 / vs;
        p1[0] *= vsr;
        p1[1] *= vsr;
        p2[0] *= vsr;
        p2[1] *= vsr;
        p3[0] *= vsr;
        p3[1] *= vsr;
        p4[0] *= vsr;
        p4[1] *= vsr;
        var cm1 = clipmask(p1);
        var cm2 = clipmask(p2);
        var cm3 = clipmask(p3);
        var cm4 = clipmask(p4);
        if ((cm1 | cm2 | cm3 | cm4) !== 0) {
            if ((cm1 & cm2 & cm3 & cm4) === 0) {
                rect.clear(dest);
            }
        } else {
            var p1w = 1.0 / p1[3];
            var p2w = 1.0 / p2[3];
            var p3w = 1.0 / p3[3];
            var p4w = 1.0 / p4[3];
            p1[0] *= p1w * vs;
            p1[1] *= p1w * vs;
            p2[0] *= p2w * vs;
            p2[1] *= p2w * vs;
            p3[0] *= p3w * vs;
            p3[1] *= p3w * vs;
            p4[0] *= p4w * vs;
            p4[1] *= p4w * vs;
            dest.X = p1[0];
            dest.Y = p1[1];
            dest.Width = 0;
            dest.Height = 0;
            rect.extendTo(dest, p2[0], p2[1]);
            rect.extendTo(dest, p3[0], p3[1]);
            rect.extendTo(dest, p4[0], p4[1]);
        }
    }
    static round(dest: rect): rect {
        dest.X = Math.round(dest.X);
        dest.Y = Math.round(dest.Y);
        dest.Width = Math.round(dest.Width);
        dest.Height = Math.round(dest.Height);
        return dest;
    }
    static roundOut(dest: rect): rect {
        var x = Math.floor(dest.X);
        var y = Math.floor(dest.Y);
        dest.Width = Math.ceil(dest.X + dest.Width) - Math.floor(dest.X);
        dest.Height = Math.ceil(dest.Y + dest.Height) - Math.floor(dest.Y);
        dest.X = x;
        dest.Y = y;
        return dest;
    }
    static roundIn(dest: rect): rect {
        var x = Math.ceil(dest.X);
        var y = Math.ceil(dest.Y);
        dest.Width = Math.floor(dest.X + dest.Width) - Math.ceil(dest.X);
        dest.Height = Math.floor(dest.Y + dest.Height) - Math.ceil(dest.Y);
        dest.X = x;
        dest.Y = y;
        return dest;
    }
    static copyGrowTransform(dest: rect, src: rect, thickness, xform) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform(dest, xform);
    }
    static copyGrowTransform4(dest: rect, src: rect, thickness, projection) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform4(dest, projection);
    }
    static containsPoint(rect1: rect, p): bool {
        return rect1.X <= p.X
            && rect1.Y <= p.Y
            && (rect1.X + rect1.Width) >= p.X
            && (rect1.Y + rect1.Height) >= p.Y;
    }
    static containsPointXY(rect1: rect, x: number, y: number): bool {
        return rect1.X <= x
            && rect1.Y <= y
            && (rect1.X + rect1.Width) >= x
            && (rect1.Y + rect1.Height) >= y;
    }
    static rectIn(rect1: rect, rect2: rect) {
        var copy = rect.clone(rect1);
        rect.intersection(copy, rect2);
        if (rect.isEmpty(copy))
            return RectOverlap.Out;
        if (rect.isEqual(copy, rect2))
            return RectOverlap.In;
        return RectOverlap.Part;
    }
    static isRectContainedIn(src: rect, test: rect) {
        var copy = rect.clone(src);
        rect.intersection(copy, test);
        return !rect.isEqual(src, copy);
    }
}

class size {
    Width: number = 0;
    Height: number = 0;
    toString(): string {
        return "{" + this.Width + "," + this.Height + "}";
    }
    static _TypeName = "size";
    static fromRaw(width: number, height: number): size {
        var s = new size();
        s.Width = width;
        s.Height = height;
        return s;
    }
    static fromRect(src: rect): size {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    }
    static createInfinite(): size {
        var s = new size();
        s.Width = Number.POSITIVE_INFINITY;
        s.Height = Number.POSITIVE_INFINITY;
        return s;
    }
    static createNegativeInfinite(): size {
        var s = new size();
        s.Width = Number.NEGATIVE_INFINITY;
        s.Height = Number.NEGATIVE_INFINITY;
        return s;
    }
    static copyTo(src: size, dest: size) {
        dest.Width = src.Width;
        dest.Height = src.Height;
    }
    static clone(src: size): size {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    }
    static clear(dest: size) {
        dest.Width = 0;
        dest.Height = 0;
    }
    static isEqual(size1: size, size2: size): bool {
        return size1.Width === size2.Width
            && size1.Height === size2.Height;
    }
    static growBy(dest: size, width: number, height: number) {
        var h = dest.Height;
        var w = dest.Width;
        if (h != Number.POSITIVE_INFINITY)
            h += height;
        if (w != Number.POSITIVE_INFINITY)
            w += width;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    }
    static growByThickness(dest: size, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if (w != Number.POSITIVE_INFINITY)
            w += thickness.Left + thickness.Right;
        if (h != Number.POSITIVE_INFINITY)
            h += thickness.Top + thickness.Bottom;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    }
    static shrinkBy(dest: size, width: number, height: number) {
        var h = dest.Height;
        var w = dest.Width;
        if (h != Number.POSITIVE_INFINITY)
            h -= height;
        if (w != Number.POSITIVE_INFINITY)
            w -= width;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    }
    static shrinkByThickness(dest: size, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if (w != Number.POSITIVE_INFINITY)
            w -= thickness.Left + thickness.Right;
        if (h != Number.POSITIVE_INFINITY)
            h -= thickness.Top + thickness.Bottom;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    }
    static min(dest: size, other: size) {
        dest.Width = Math.min(dest.Width, other.Width);
        dest.Height = Math.min(dest.Height, other.Height);
        return dest;
    }
    static max(dest: size, other: size) {
        dest.Width = Math.max(dest.Width, other.Width);
        dest.Height = Math.max(dest.Height, other.Height);
        return dest;
    }
}

class Thickness {
    static _TypeName = "Thickness";
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number) {
        this.Left = left == null ? 0 : left;
        this.Top = top == null ? 0 : top;
        this.Right = right == null ? 0 : right;
        this.Bottom = bottom == null ? 0 : bottom;
    }
    Plus(thickness2: Thickness) {
        var t = new Thickness();
        t.Left = this.Left + thickness2.Left;
        t.Right = this.Right + thickness2.Right;
        t.Top = this.Top + thickness2.Top;
        t.Bottom = this.Bottom + thickness2.Bottom;
        return t;
    }
    IsEmpty(): bool {
        return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
    }
    IsBalanced(): bool {
        return this.Left === this.Top
            && this.Left === this.Right
            && this.Left === this.Bottom;
    }
    toString(): string {
        return "(" + this.Left + ", " + this.Top + ", " + this.Right + ", " + this.Bottom + ")";
    }
    static Equals(thickness1: Thickness, thickness2: Thickness) {
        if (thickness1 == null && thickness2 == null)
            return true;
        if (thickness1 == null || thickness2 == null)
            return false;
        return thickness1.Left === thickness2.Left
            && thickness1.Top === thickness2.Top
            && thickness1.Right === thickness2.Right
            && thickness1.Bottom === thickness2.Bottom;
    }
}

class TimeSpan {
    static _TypeName = "TimeSpan";
    private static _TicksPerMillisecond = 1;
    private static _TicksPerSecond = 1000;
    private static _TicksPerMinute = TimeSpan._TicksPerSecond * 60;
    private static _TicksPerHour = TimeSpan._TicksPerMinute * 60;
    private static _TicksPerDay = TimeSpan._TicksPerHour * 24;
    private _Ticks: number = 0;
    static FromTicks(ticks: number): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = ticks;
        return ts;
    }
    static FromArgs(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute)
            + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
        return ts;
    }
    get Days(): number { return Math.floor(this._Ticks / TimeSpan._TicksPerDay); }
    get Hours(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        return Math.floor(remTicks / TimeSpan._TicksPerHour);
    }
    get Minutes(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        return Math.floor(remTicks / TimeSpan._TicksPerMinute);
    }
    get Seconds(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        remTicks = remTicks % TimeSpan._TicksPerMinute;
        return Math.floor(remTicks / TimeSpan._TicksPerSecond);
    }
    get Milliseconds(): number {
        var remTicks = this._Ticks % TimeSpan._TicksPerDay;
        remTicks = remTicks % TimeSpan._TicksPerHour;
        remTicks = remTicks % TimeSpan._TicksPerMinute;
        remTicks = remTicks % TimeSpan._TicksPerSecond;
        return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
    }
    get Ticks(): number { return this._Ticks; }
    get TotalDays(): number { return this._Ticks / TimeSpan._TicksPerDay; }
    get TotalHours(): number { return this._Ticks / TimeSpan._TicksPerHour; }
    get TotalMinutes(): number { return this._Ticks / TimeSpan._TicksPerMinute; }
    get TotalSeconds(): number { return this._Ticks / TimeSpan._TicksPerSecond; }
    get TotalMilliseconds(): number { return this._Ticks / TimeSpan._TicksPerMillisecond; }
    AddTicks(ticks: number) {
        if (ticks == null)
            return;
        if (isNaN(ticks))
            return;
        this._Ticks += ticks;
    }
    AddMilliseconds(milliseconds: number) {
        this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
    }
    Add(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks + ts2._Ticks;
        return ts;
    }
    Subtract(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks - ts2._Ticks;
        return ts;
    }
    Multiply(v: number): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = Math.round(this._Ticks * v);
        return ts;
    }
    Divide(ts2: TimeSpan): TimeSpan {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks / ts2._Ticks;
        return ts;
    }
    CompareTo(ts2: TimeSpan): number {
        if (this._Ticks === ts2._Ticks)
            return 0;
        return (this._Ticks > ts2._Ticks) ? 1 : -1;
    }
    IsZero(): bool {
        return this._Ticks === 0;
    }
    GetJsDelay(): number {
        return this._Ticks * TimeSpan._TicksPerMillisecond;
    }
}

class Uri {
    static _TypeName = "Uri";
    private _OriginalString: string;
    constructor(originalString: string) {
        this._OriginalString = originalString;
    }
    GetFragment(): string {
        return "";
    }
    toString(): string {
        return this._OriginalString;
    }
    static IsNullOrEmpty(uri: Uri): bool {
        if (uri == null)
            return true;
        if (uri._OriginalString)
            return false;
        return true;
    }
}

class BError {
    static Argument: number = 2;
    static InvalidOperation: number = 3;
    static XamlParse: number = 5;
    Message: string;
    Number: number;
    ThrowException() {
        throw new Exception(this.Message);
    }
}

class Enum {
    constructor(public Object: any) {
    }
}

module Fayde {
    export interface IEnumerable {
        GetEnumerator(reverse?: bool): IEnumerator;
    }
    export interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
    export class ArrayEx {
        static GetEnumerator(arr: any[], isReverse?: bool) {
            var len = arr.length;
            var e = { MoveNext: undefined, Current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.MoveNext = function () {
                    index--;
                    if (index < 0) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            } else {
                index = -1;
                e.MoveNext = function () {
                    index++;
                    if (index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            }
            return e;
        }
    }
}

class Nullstone {
    static Equals(val1: any, val2: any): bool {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        if (val1.Equals)
            return val1.Equals(val2);
        return false;
    }
    static DoesInheritFrom(t: Function, type: Function) {
        var temp = t;
        while (temp && temp !== type) {
            temp = (<any>temp)._BaseClass;
        }
        return temp != null;
    }
}

module Fayde.Shapes {
    export class PointCollection {
    }
}

module Fayde.Shapes {
    export function ParsePointCollection(val: string): PointCollection {
        return new PointCollection();
    }
}

module Fayde {
    export class UnsetValue { }
    export class DependencyObject extends XamlObject {
        private _Expressions: Expression[] = [];
        _Store: Providers.BasicProviderStore;
        _CachedValues: any[] = [];
        constructor() {
            super();
            this._Store = this.CreateStore();
        }
        CreateStore(): Providers.BasicProviderStore {
            var s = new Providers.BasicProviderStore(this);
            s.SetProviders([null, 
                new Providers.LocalValueProvider(), 
                null,
                null,
                null,
                null,
                null,
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        GetValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            return this._Store.GetValue(propd);
        }
        SetValue(propd: DependencyProperty, value: any) {
            if (!propd)
                throw new ArgumentException("No property specified.");
            if (propd.IsReadOnly)
                throw new InvalidOperationException("DependencyProperty '" + (<any>propd.OwnerType)._TypeName + "." + propd.Name + "' is read only.");
            this.SetValueInternal(propd, value);
        }
        SetValueInternal(propd: DependencyProperty, value: any) {
            var expression: Fayde.Expression;
            if (value instanceof Fayde.Expression)
                expression = value;
            if (expression instanceof Fayde.Data.BindingExpressionBase) {
                var binding = (<Data.BindingExpressionBase>expression).Binding;
                var path = binding.Path.Path;
                if ((!path || path === ".") && binding.Mode === Fayde.Data.BindingMode.TwoWay)
                    throw new ArgumentException("TwoWay bindings require a non-empty Path.");
                binding.Seal();
            }
            var existing = this._Expressions[propd._ID];
            var updateTwoWay = false;
            var addingExpression = false;
            if (expression) {
                if (expression !== existing) {
                    if (expression.IsAttached)
                        throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");
                    if (existing)
                        this._RemoveExpression(propd);
                    this._AddExpression(propd, expression);
                }
                addingExpression = true;
                value = expression.GetValue(propd);
            } else if (existing) {
                if (existing instanceof Fayde.Data.BindingExpressionBase) {
                    var binding = (<Data.BindingExpressionBase>existing).Binding;
                    if (binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                        updateTwoWay = !existing.IsUpdating && !propd.IsCustom;
                    } else if (!existing.IsUpdating || binding.Mode === Fayde.Data.BindingMode.OneTime) {
                        this._RemoveExpression(propd);
                    }
                } else if (!existing.IsUpdating) {
                    this._RemoveExpression(propd);
                }
            }
            try {
                this._Store.SetValue(propd, value);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            } catch (err) {
                if (!addingExpression)
                    throw err;
                this._Store.SetValue(propd, propd.DefaultValue);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            }
        }
        ClearValue(propd: DependencyProperty) {
            if (!propd)
                throw new ArgumentException("No dependency property.");
            if (propd.IsReadOnly && !propd.IsCustom)
                throw new ArgumentException("This property is readonly.");
            this._RemoveExpression(propd);
            this._Store.ClearValue(propd, true);
        }
        ReadLocalValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            var expr = this._Expressions[propd._ID]
            if (expr)
                return expr;
            return this._Store.ReadLocalValue(propd);
        }
        _OnPropertyChanged(args: IDependencyPropertyChangedEventArgs) { }
        private _AddExpression(propd: DependencyProperty, expr: Expression) {
            this._Expressions[propd._ID] = expr;
            expr.OnAttached(this);
        }
        private _RemoveExpression(propd: DependencyProperty) {
            var expr = this._Expressions[propd._ID];
            if (expr) {
                this._Expressions[propd._ID] = undefined;
                expr.OnDetached(this);
            }
        }
    }
}

interface IAutoCreator {
    GetValue(propd: DependencyProperty, dobj: Fayde.DependencyObject): any;
}
interface IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}
interface IOutIsValid {
    IsValid: bool;
}
module Fayde.Providers {
    var pp = _PropertyPrecedence;
    export function BuildBitmask(propd: DependencyProperty): number {
        var bitmask = (1 << pp.Inherited) | (1 << pp.DynamicValue);
        if (propd._IsAutoCreated)
            bitmask |= (1 << pp.AutoCreate);
        if (propd._HasDefaultValue)
            bitmask |= (1 << pp.DefaultValue);
        return bitmask;
    }
}
class DependencyProperty {
    private static _IDs: DependencyProperty[] = [];
    private static _Inherited: DependencyProperty[][] = [];
    private static _LastID: number = 0;
    _ID: number;
    Name: string;
    GetTargetType: () => Function;
    OwnerType: Function;
    DefaultValue: any;
    IsReadOnly: bool;
    IsCustom: bool;
    _HasDefaultValue: bool;
    _ChangedCallback: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void;
    _AutoCreator: IAutoCreator;
    _IsAutoCreated: bool;
    private _Coercer: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any;
    _AlwaysChange: bool;
    private _Validator: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool;
    _IsAttached: bool;
    _BitmaskCache: number;
    _Inheritable: number;
    static Register(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback);
    }
    static RegisterReadOnly(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, true);
    }
    static RegisterAttached(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, undefined, true);
    }
    static RegisterCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true);
    }
    static RegisterReadOnlyCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, true);
    }
    static RegisterAttachedCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, undefined, true);
    }
    static RegisterInheritable(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void , autocreator?: IAutoCreator, inheritable?) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, undefined, undefined, undefined, undefined, undefined, undefined, inheritable);
    }
    static RegisterFull(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, autocreator?: IAutoCreator, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: bool, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool, isCustom?: bool, isReadOnly?: bool, isAttached?: bool, inheritable?): DependencyProperty {
        var registeredDPs = (<any>ownerType)._RegisteredDPs;
        if (!registeredDPs)
            (<any>ownerType)._RegisteredDPs = registeredDPs = [];
        if (registeredDPs[name] !== undefined)
            throw new InvalidOperationException("Dependency Property is already registered. [" + (<any>ownerType)._TypeName + "." + name + "]");
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd._HasDefaultValue = defaultValue !== undefined;
        propd._ChangedCallback = changedCallback;
        propd._AutoCreator = autocreator;
        propd._IsAutoCreated = autocreator != null;
        propd._Coercer = coercer;
        propd._AlwaysChange = alwaysChange;
        propd._Validator = validator;
        propd.IsCustom = isCustom;
        propd.IsReadOnly = isReadOnly === true;
        propd._IsAttached = isAttached === true;
        propd._ID = _LastID = _LastID + 1;
        propd._BitmaskCache = Fayde.Providers.BuildBitmask(propd);
        propd._Inheritable = inheritable;
        if (inheritable !== undefined) {
            var i = _Inherited;
            if (!i[inheritable])
                i[inheritable] = [];
            i[inheritable].push(propd);
        }
        registeredDPs[name] = propd;
        _IDs[propd._ID] = propd;
        return propd;
    }
    ValidateSetValue(dobj: Fayde.DependencyObject, value: any, isValidOut: IOutIsValid) {
        isValidOut.IsValid = false;
        var coerced = value;
        if (this._Coercer && !(coerced = this._Coercer(dobj, this, coerced)))
            return coerced;
        /* TODO: Handle Type Problems
        if (!this._IsValueValid(dobj, coerced))
            return coerced;
        */
        if (this._Validator && !this._Validator(dobj, this, coerced))
            return coerced;
        isValidOut.IsValid = true;
        return coerced;
    }
}

module Fayde {
    export class Style extends XamlObject {
        private _IsSealed: bool = false;
        Setters: SetterCollection;
        BasedOn: Style;
        TargetType: Function;
        constructor() {
            super();
            var coll = new SetterCollection();
            coll.XamlNode.AttachTo(this.XamlNode, undefined);
            this.Setters = coll;
        }
        Seal() {
            if (this._IsSealed)
                return;
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;
            var base = this.BasedOn;
            if (base)
                base.Seal();
        }
        Validate(instance: DependencyObject, error: BError): bool {
            var parentType = <Function>(<any>instance).constructor;
            if (this._IsSealed) {
                if (!(instance instanceof this.TargetType)) {
                    error.Number = BError.XamlParse;
                    error.Message = "Style.TargetType (" + (<any>this.TargetType)._TypeName + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                    return false;
                }
                return true;
            }
            var cycles = [];
            var root = this;
            while (root) {
                if (cycles[(<any>root)._ID]) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Circular reference in Style.BasedOn";
                    return false;
                }
                cycles[(<any>root)._ID] = true;
                root = root.BasedOn;
            }
            cycles = null;
            root = this;
            var targetType: Function;
            while (root) {
                targetType = root.TargetType;
                if (root === this) {
                    if (!targetType) {
                        error.Number = BError.InvalidOperation;
                        error.Message = "TargetType cannot be null";
                        return false;
                    } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                        error.Number = BError.XamlParse; 
                        error.Message = "Style.TargetType (" + (<any>targetType)._TypeName + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                        return false;
                    }
                } else if (!targetType || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Style.TargetType (" + (targetType ? (<any>targetType)._TypeName : "<Not Specified>") + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                    return false;
                }
                parentType = targetType;
                root = root.BasedOn;
            }
            this.Seal();
            return true;
        }
    }
}

module Fayde {
    export class UINode extends XamlNode {
        XObject: UIElement;
        constructor(xobj: UIElement) {
            super(xobj);
        }
        VisualParentNode: UINode;
        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }
        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            if (!newIsAttached) {
            }
        }
        _ElementAdded(uie: UIElement) {
            uie.XamlNode.VisualParentNode = this;
            this.XObject._Store.PropagateInheritedOnAdd(uie);
        }
        _ElementRemoved(uie: UIElement) {
            uie.XamlNode.VisualParentNode = null;
            this.XObject._Store.ClearInheritedOnRemove(uie);
        }
    }
    export class UIElement extends DependencyObject {
        XamlNode: UINode;
        _Store: Providers.InheritedProviderStore;
        CreateStore(): Providers.InheritedProviderStore {
            var s = new Providers.InheritedProviderStore(this);
            s.SetProviders([null, 
                new Providers.LocalValueProvider(), 
                null,
                null,
                null,
                new Providers.InheritedProvider(),
                null,
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        CreateNode(): XamlNode {
            return new UINode(this);
        }
        static TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
        static VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () { return new Enum(Fayde.Visibility); }, UIElement, Fayde.Visibility.Visible);
        static UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () { return Boolean; }, UIElement, true, undefined, undefined, Providers._Inheritable.UseLayoutRounding);
    }
}

module Fayde {
    export class XamlObjectCollection extends XamlObject implements IEnumerable {
        private _ht: XamlObject[] = [];
        private _listeners = [];
        get Count() { return this._ht.length; }
        GetValueAt(index: number): XamlObject {
            return this._ht[index];
        }
        SetValueAt(index: number, value: XamlObject): bool {
            if (!this.CanAdd(value))
                return false;
            if (index < 0 || index >= this._ht.length)
                return false;
            var removed = this._ht[index];
            var added = value;
            var error = new BError();
            if (this.AddedToCollection(added, error)) {
                this._ht[index] = added;
                this.RemovedFromCollection(removed, true);
                this._RaiseItemReplaced(removed, added, index);
                return true;
            }
            return false;
        }
        Add(value: XamlObject): number {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        }
        Insert(index: number, value: XamlObject): bool {
            if (!this.CanAdd(value))
                return false;
            if (index < 0)
                return false;
            var count = this._ht.length;
            if (index > count)
                index = count;
            var error = new BError();
            if (this.AddedToCollection(value, error)) {
                this._ht.splice(index, 0, value);
                this._RaiseItemAdded(value, index);
                return true;
            }
            if (error.Message)
                throw new Exception(error.Message);
            return false;
        }
        Remove(value: XamlObject): bool {
            var index = this.IndexOf(value);
            if (index == -1)
                return false;
            return this.RemoveAt(index);
        }
        RemoveAt(index: number): bool {
            if (index < 0 || index >= this._ht.length)
                return false;
            var value = this._ht[index];
            this._ht.splice(index, 1);
            this.RemovedFromCollection(value, true);
            this._RaiseItemRemoved(value, index);
            return true;
        }
        Clear(): bool {
            var old = this._ht;
            this._ht = [];
            var len = old.length;
            for (var i = 0; i < len; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        }
        IndexOf(value: XamlObject): number {
            var count = this._ht.length;
            for (var i = 0; i < count; i++) {
                if (Nullstone.Equals(value, this._ht[i]))
                    return i;
            }
            return -1;
        }
        Contains(value: XamlObject): bool { return this.IndexOf(value) > -1; }
        CanAdd (value: XamlObject): bool { return true; }
        AddedToCollection(value: XamlObject, error: BError): bool {
            return value.XamlNode.AttachTo(this.XamlNode, error);
        }
        RemovedFromCollection(value: XamlObject, isValueSafe: bool) {
            value.XamlNode.Detach();
        }
        GetEnumerator(reverse?: bool): IEnumerator {
            return ArrayEx.GetEnumerator(this._ht, reverse);
        }
        _RaiseItemAdded(value: XamlObject, index: number) { }
        _RaiseItemRemoved(value: XamlObject, index: number) { }
        _RaiseItemReplaced(removed: XamlObject, added: XamlObject, index: number) { }
        _RaiseCleared() { }
    }
}

module Fayde.Providers {
    export class DefaultValueProvider implements IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return propd.DefaultValue;
        }
    }
    export class AutoCreateProvider implements IPropertyProvider {
        private _ht: any[] = [];
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var value = this.ReadLocalValue(propd);
            if (value !== undefined)
                return value;
            value = propd._IsAutoCreated ? propd._AutoCreator.GetValue(propd, store._Object) : undefined;
            if (value === undefined)
                return undefined;
            this._ht[propd._ID] = value;
            var error = new BError();
            store._ProviderValueChanged(_PropertyPrecedence.AutoCreate, propd, undefined, value, false, error);
            return value;
        }
        ReadLocalValue(propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
        ClearValue(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
    }
    export class LocalValueProvider implements IPropertyProvider {
        private _ht: any[] = [];
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        SetValue(propd: DependencyProperty, value: any) {
            this._ht[propd._ID] = value;
        }
        ClearValue(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
    }
    export class BasicProviderStore {
        _Object: DependencyObject;
        private _Providers: IPropertyProvider[] = [null, null, null, null, null, null, null, null, null];
        private _PropertyChangedListeners: IPropertyChangedListener[] = [];
        _ProviderBitmasks: number[] = [];
        private _AnimStorage: any[][] = [];
        private _LocalValueProvider: LocalValueProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;
        constructor(dobj: DependencyObject) {
            this._Object = dobj;
        }
        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }
        GetValue(propd: DependencyProperty):any {
            var startingPrecedence = _PropertyPrecedence.Highest;
            var endingPrecedence = _PropertyPrecedence.Lowest;
            var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
            for (var i = startingPrecedence; i <= endingPrecedence; i++) {
                if (!(bitmask & (1 << i)))
                    continue;
                var provider = this._Providers[i];
                if (!provider)
                    continue;
                var val = provider.GetPropertyValue(this, propd);
                if (val === undefined)
                    continue;
                return val;
            }
            return undefined;
        }
        GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any {
            if (startingPrecedence === undefined)
                startingPrecedence = _PropertyPrecedence.Highest;
            if (endingPrecedence === undefined)
                endingPrecedence = _PropertyPrecedence.Lowest;
            var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
            for (var i = startingPrecedence; i <= endingPrecedence; i++) {
                if (!(bitmask & (1 << i)))
                    continue;
                var provider = this._Providers[i];
                if (!provider)
                    continue;
                var val = provider.GetPropertyValue(this, propd);
                if (val === undefined)
                    continue;
                return val;
            }
            return undefined;
        }
        SetValue(propd: DependencyProperty, value: any) {
            if (value instanceof Fayde.UnsetValue) {
                this.ClearValue(propd, true);
                return;
            }
            if (value && propd.GetTargetType() === String) {
                if (typeof value !== "string")
                    value = value.toString();
            }
            var isValidOut = { IsValid: false };
            value = propd.ValidateSetValue(this._Object, value, isValidOut);
            if (!isValidOut.IsValid)
                return;
            var currentValue;
            var equal = false;
            if ((currentValue = this.ReadLocalValue(propd)) === undefined)
                if (propd._IsAutoCreated)
                    currentValue = this._AutoCreateProvider.ReadLocalValue(propd);
            if (currentValue !== undefined && value !== undefined)
                equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
            else
                equal = currentValue === undefined && value === undefined;
            if (!equal) {
                var newValue;
                this._LocalValueProvider.ClearValue(propd);
                if (propd._IsAutoCreated)
                    this._AutoCreateProvider.ClearValue(propd);
                newValue = value;
                if (newValue !== undefined) {
                    this._LocalValueProvider.SetValue(propd, newValue);
                }
                var error = new BError();
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, error);
                if (error.Message)
                    throw new Exception(error.Message);
            }
        }
        ClearValue(propd: DependencyProperty, notifyListeners?: bool) {
            if (notifyListeners === undefined)
                notifyListeners = true;
            if (this._GetAnimationStorageFor(propd))
                return;
            var oldLocalValue;
            if ((oldLocalValue = this.ReadLocalValue(propd)) === undefined) {
                if (propd._IsAutoCreated)
                    oldLocalValue = this._AutoCreateProvider.ReadLocalValue(propd);
            }
            var error = new BError();
            if (oldLocalValue !== undefined) {
                this._DetachValue(oldLocalValue);
                this._LocalValueProvider.ClearValue(propd);
                if (propd._IsAutoCreated)
                    this._AutoCreateProvider.ClearValue(propd);
            }
            /*
            var count = _PropertyPrecedence.Count;
            for (var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnClear(propd, error);
            }
            */
            if (oldLocalValue !== undefined) {
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, error);
                if (error.Message)
                    throw new Exception(error.Message);
            }
        }
        ReadLocalValue(propd: DependencyProperty): any {
            var val = this._LocalValueProvider.GetPropertyValue(this, propd);
            if (val === undefined)
                return new UnsetValue();
            return val;
        }
        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, error: BError) {
            delete this._Object._CachedValues[propd._ID];
            var bitmask = this._ProviderBitmasks[propd._ID] | 0;
            if (newProviderValue !== undefined)
                bitmask |= 1 << providerPrecedence;
            else
                bitmask &= ~(1 << providerPrecedence);
            this._ProviderBitmasks[propd._ID] = bitmask;
            var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;
            var propPrecHighest = _PropertyPrecedence.Highest;
            for (var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                if (!(higher & (1 << j)))
                    continue;
                var provider = this._Providers[j];
                if (!provider)
                    continue;
                if (provider.GetPropertyValue(this, propd) !== undefined)
                    return;
            }
            var oldValue;
            var newValue;
            if (oldProviderValue === undefined || newProviderValue === undefined) {
                var lowerPriorityValue = this.GetValueSpec(propd, providerPrecedence + 1);
                if (newProviderValue === undefined) {
                    oldValue = oldProviderValue;
                    newValue = lowerPriorityValue;
                } else if (oldProviderValue === undefined) {
                    oldValue = lowerPriorityValue;
                    newValue = newProviderValue;
                }
            } else {
                oldValue = oldProviderValue;
                newValue = newProviderValue;
            }
            if (oldValue === null && newValue === null)
                return;
            if (oldValue === undefined && newValue === undefined)
                return;
            if (!propd._AlwaysChange && Nullstone.Equals(oldValue, newValue))
                return;
            this._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
        }
        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            this._DetachValue(oldValue);
            this._AttachValue(newValue, error);
            if (notifyListeners) {
                var args = {
                    Property: propd,
                    OldValue: oldValue,
                    NewValue: newValue
                };
                try { this._Object._OnPropertyChanged(args); }
                catch (err) { error.Message = err.Message; }
                this._RaisePropertyChanged(args);
                if (propd && propd._ChangedCallback)
                    propd._ChangedCallback(this._Object, args);
            }
        }
        private _GetAnimationStorageFor(propd: DependencyProperty): any {
            var list = this._AnimStorage[propd._ID];
            if (list && list.length > 0)
                return list[list.length - 1];
            return undefined;
        }
        private _CloneAnimationStorage(sourceStore: BasicProviderStore) {
            var srcRepo = sourceStore._AnimStorage;
            var thisRepo = this._AnimStorage;
            var list;
            for (var key in srcRepo) {
                thisRepo[key] = srcRepo[0].slice(0);
            }
        }
        private _AttachAnimationStorage(propd: DependencyProperty, storage) {
            var list = this._AnimStorage[propd._ID];
            if (!list) {
                this._AnimStorage[propd._ID] = list = [storage];
                return undefined;
            }
            var attached = list[list.length - 1];
            if (attached)
                attached.Disable();
            list.push(storage);
            return attached;
        }
        private _DetachAnimationStorage(propd: DependencyProperty, storage) {
            var list = this._AnimStorage[propd._ID];
            if (!list)
                return;
            var len = list.length;
            if (len < 1)
                return;
            var i;
            var cur;
            for (i = len - 1; i >= 0; i++) {
                cur = list[i];
                if (cur === storage)
                    break;
            }
            if (i === (len - 1)) {
                list.pop();
                if (len > 1)
                    list[len - 2].Enable();
            } else {
                list.splice(i, 1);
                if (i > 0)
                    list[i - 1].StopValue = storage.StopValue;
            }
        }
        _SubscribePropertyChanged(listener: IPropertyChangedListener) {
            var l = this._PropertyChangedListeners;
            if (l.indexOf(listener) < 0)
                l.push(listener);
        }
        _UnsubscribePropertyChanged(listener: IPropertyChangedListener) {
            var l = this._PropertyChangedListeners;
            var index = l.indexOf(listener);
            if (index > -1)
                l.splice(index, 1);
        }
        _RaisePropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            var l = this._PropertyChangedListeners;
            var len = l.length;
            for (var i = 0; i < len; i++) {
                l[i].OnPropertyChanged(this._Object, args);
            }
        }
        _AttachValue(value: any, error: BError): bool {
            if (!value)
                return true;
            if (value instanceof DependencyObject) {
                return (<XamlObject>value).XamlNode.AttachTo(this._Object.XamlNode, error);
            } else if (value instanceof XamlObject) {
                return (<XamlObject>value).XamlNode.AttachTo(this._Object.XamlNode, error);
            }
        }
        _DetachValue(value: any) {
            if (!value)
                return;
            if (value instanceof DependencyObject) {
                (<XamlObject>value).XamlNode.Detach();
            } else if (value instanceof XamlObject) {
                (<XamlObject>value).XamlNode.Detach();
            }
        }
    }
}

module Fayde.Providers {
    export class FrameworkElementDynamicProvider implements IPropertyProvider {
        private _ActualHeight: number;
        private _ActualWidth: number;
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var isWidth = propd._ID === FrameworkElement.ActualWidthProperty._ID;
            var isHeight = propd._ID === FrameworkElement.ActualHeightProperty._ID;
            if (!isWidth && !isHeight)
                return undefined;
            var actual = (<FrameworkElement>store._Object)._ComputeActualSize();
            this._ActualWidth = actual.Width;
            this._ActualHeight = actual.Height;
            if (isWidth)
                return this._ActualWidth;
            return this._ActualHeight;
        }
    }
}

module Fayde.Providers {
    export class ImplicitStyleProvider implements IPropertyProvider {
        private _ht: any[] = [];
        private _Styles: any[] = [null, null, null];
        private _StyleMask: _StyleMask = _StyleMask.None;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) {
            if (!this._Styles)
                return;
            var oldValue;
            var newValue;
            var prop;
            var walker = MultipleStylesWalker(this._Styles);
            var setter: Setter;
            while (setter = walker.Step()) {
                prop = setter.Property;
                if (prop._ID !== propd._ID)
                    continue;
                newValue = setter.ConvertedValue;
                oldValue = this._ht[propd._ID];
                this._ht[propd._ID] = newValue;
                this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, propd, oldValue, newValue, true, error);
                if (error.Message)
                    return;
            }
        }
        SetStyles(styleMask: _StyleMask, styles: Style[], error: BError) {
            if (!styles)
                return;
            var newStyles = [null, null, null];
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
        }
        ClearStyles(styleMask: _StyleMask, error: BError) {
            if (!this._Styles)
                return;
            var newStyles = this._Styles.slice(0);
            if (styleMask & _StyleMask.GenericXaml)
                newStyles[_StyleIndex.GenericXaml] = null;
            if (styleMask & _StyleMask.ApplicationResources)
                newStyles[_StyleIndex.ApplicationResources] = null;
            if (styleMask & _StyleMask.VisualTree)
                newStyles[_StyleIndex.VisualTree] = null;
            this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
        }
        private _ApplyStyles(styleMask: _StyleMask, styles: Style[], error: BError) {
            var isChanged = !this._Styles || styleMask !== this._StyleMask;
            if (!isChanged) {
                for (var i = 0; i < _StyleIndex.Count; i++) {
                    if (styles[i] !== this._Styles[i]) {
                        isChanged = true;
                        break;
                    }
                }
            }
            if (!isChanged)
                return;
            var oldValue;
            var newValue;
            var oldWalker = MultipleStylesWalker(this._Styles);
            var newWalker = MultipleStylesWalker(styles);
            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp: DependencyProperty;
            var newProp: DependencyProperty;
            while (oldSetter || newSetter) {
                if (oldSetter)
                    oldProp = oldSetter.Property;
                if (newSetter)
                    newProp = newSetter.Property;
                if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                    oldValue = oldSetter.ConvertedValue;
                    newValue = undefined;
                    this._ht[oldProp._ID] = undefined;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                }
                else if (oldProp === newProp) {
                    oldValue = oldSetter.ConvertedValue;
                    newValue = newSetter.ConvertedValue;
                    this._ht[oldProp._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                    newSetter = newWalker.Step();
                } else {
                    oldValue = undefined;
                    newValue = newSetter.ConvertedValue;
                    this._ht[newProp._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, newProp, oldValue, newValue, true, error);
                    newSetter = newWalker.Step();
                }
            }
            this._Styles = styles;
            this._StyleMask = styleMask;
        }
    }
}

module Fayde.Providers {
    export class InheritedDataContextProvider implements IPropertyProvider {
        private _Source: FrameworkElement;
        private _Store: IProviderStore;
        private _Listener = null;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var source = this._Source;
            if (!source)
                return;
            if (propd._ID !== FrameworkElement.DataContextProperty._ID)
                return;
            return source._Store.GetValue(FrameworkElement.DataContextProperty);
        }
        SetDataSource(source: FrameworkElement) {
            var oldSource = this._Source;
            if (oldSource === source)
                return;
            var oldValue = oldSource ? oldSource._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;
            var newValue = source ? source._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;
            this._DetachListener(oldSource);
            this._Source = source;
            this._AttachListener(source);
            if (!Nullstone.Equals(oldValue, newValue)) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, oldValue, newValue, false, error);
            }
        }
        private _AttachListener(source: FrameworkElement) {
            if (!source)
                return;
            var listener = Fayde.CreatePropertyChangedListener(this._SourceDataContextChanged, this);
            this._Listener = listener;
            source._Store._SubscribePropertyChanged(listener);
        }
        private _DetachListener(source: FrameworkElement) {
            if (!source)
                return;
            if (this._Listener) {
                source._Store._UnsubscribePropertyChanged(this._Listener);
                this._Listener = null;
            }
        }
        private _SourceDataContextChanged(sender, args) {
            var propd = args.Property;
            if (propd !== FrameworkElement.DataContextProperty)
                return;
            var error = new BError();
            this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, propd, args.OldValue, args.NewValue, true, error);
        }
        private EmitChanged() {
            if (this._Source) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(FrameworkElement.DataContextProperty), true, error);
            }
        }
    }
}

module Fayde.Providers {
    export class InheritedIsEnabledProvider implements IPropertyProvider {
        private _Source: Fayde.Controls.Control;
        private _CurrentValue: bool = true;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            if (propd._ID === Controls.Control.IsEnabledProperty._ID)
                return this._CurrentValue;
            return undefined;
        }
        SetDataSource(source: DependencyObject) {
            if (source) {
                var curNode = source.XamlNode;
                while (curNode) {
                    if (curNode.XObject instanceof Controls.Control)
                        break;
                    else if (curNode.XObject instanceof FrameworkElement)
                        curNode = curNode.ParentNode;
                    else
                        curNode = null;
                }
                source = (curNode) ? (<DependencyObject>curNode.XObject) : null;
            }
            if (this._Source !== source) {
                this._DetachListener(<Controls.Control>this._Source);
                this._Source = <Controls.Control>source;
                this._AttachListener(<Controls.Control>source);
            }
            if (!source && (this._Store._Object.XamlNode.IsAttached))
                this.LocalValueChanged();
        }
        private _AttachListener(source: Controls.Control) {
            if (!source)
                return;
            var matchFunc = function (sender, args) {
                return this === args.Property; //Closure - Control.IsEnabledProperty
            };
            (<any>source).PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Fayde.Controls.Control.IsEnabledProperty);
        }
        private _DetachListener(source: Controls.Control) {
            if (!source)
                return;
            (<any>source).PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Fayde.Controls.Control.IsEnabledProperty);
        }
        private _IsEnabledChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            this.LocalValueChanged();
        }
        LocalValueChanged(propd?: DependencyProperty): bool {
            if (propd && propd._ID !== Controls.Control.IsEnabledProperty._ID)
                return false;
            var store = this._Store;
            var localEnabled = store.GetValueSpec(Controls.Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
            var parentEnabled = false;
            var source = this._Source;
            if (source && (<UINode>store._Object.XamlNode).VisualParentNode)
                parentEnabled = source.GetValue(Controls.Control.IsEnabledProperty) === true;
            var newValue = localEnabled === true && parentEnabled;
            if (newValue !== this._CurrentValue) {
                var oldValue = this._CurrentValue;
                this._CurrentValue = newValue;
                var error = new BError();
                store._ProviderValueChanged(_PropertyPrecedence.IsEnabled, Controls.Control.IsEnabledProperty, oldValue, newValue, true, error);
                return true;
            }
            return false;
        }
    }
}

module Fayde.Providers {
    export class _InheritedContext {
        ForegroundSource: DependencyObject;
        FontFamilySource: DependencyObject;
        FontStretchSource: DependencyObject;
        FontStyleSource: DependencyObject;
        FontWeightSource: DependencyObject;
        FontSizeSource: DependencyObject;
        LanguageSource: DependencyObject;
        FlowDirectionSource: DependencyObject;
        UseLayoutRoundingSource: DependencyObject;
        TextDecorationsSource: DependencyObject;
        static FromSources(foregroundSource: DependencyObject, fontFamilySource: DependencyObject, fontStretchSource: DependencyObject, fontStyleSource: DependencyObject, fontWeightSource: DependencyObject, fontSizeSource: DependencyObject, languageSource: DependencyObject, flowDirectionSource: DependencyObject, useLayoutRoundingSource: DependencyObject, textDecorationsSource: DependencyObject) {
            var ic = new _InheritedContext();
            ic.ForegroundSource = foregroundSource;
            ic.FontFamilySource = fontFamilySource;
            ic.FontStretchSource = fontStretchSource;
            ic.FontStyleSource = fontStyleSource;
            ic.FontWeightSource = fontWeightSource;
            ic.FontSizeSource = fontSizeSource;
            ic.LanguageSource = languageSource;
            ic.FlowDirectionSource = flowDirectionSource;
            ic.UseLayoutRoundingSource = useLayoutRoundingSource;
            ic.TextDecorationsSource = textDecorationsSource;
            return ic;
        }
        static FromObject(dobj: DependencyObject, parentContext: _InheritedContext) {
            var ic = new _InheritedContext();
            ic.ForegroundSource = ic.GetLocalSource(dobj, _Inheritable.Foreground);
            if (!ic.ForegroundSource && parentContext) ic.ForegroundSource = parentContext.ForegroundSource;
            ic.FontFamilySource = ic.GetLocalSource(dobj, _Inheritable.FontFamily);
            if (!ic.FontFamilySource && parentContext) ic.FontFamilySource = parentContext.FontFamilySource;
            ic.FontStretchSource = ic.GetLocalSource(dobj, _Inheritable.FontStretch);
            if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;
            ic.FontStyleSource = ic.GetLocalSource(dobj, _Inheritable.FontStyle);
            if (!ic.FontStretchSource && parentContext) ic.FontStretchSource = parentContext.FontStretchSource;
            ic.FontWeightSource = ic.GetLocalSource(dobj, _Inheritable.FontWeight);
            if (!ic.FontWeightSource && parentContext) ic.FontWeightSource = parentContext.FontWeightSource;
            ic.FontSizeSource = ic.GetLocalSource(dobj, _Inheritable.FontSize);
            if (!ic.FontSizeSource && parentContext) ic.FontSizeSource = parentContext.FontSizeSource;
            ic.LanguageSource = ic.GetLocalSource(dobj, _Inheritable.Language);
            if (!ic.LanguageSource && parentContext) ic.LanguageSource = parentContext.LanguageSource;
            ic.FlowDirectionSource = ic.GetLocalSource(dobj, _Inheritable.FlowDirection);
            if (!ic.FlowDirectionSource && parentContext) ic.FlowDirectionSource = parentContext.FlowDirectionSource;
            ic.UseLayoutRoundingSource = ic.GetLocalSource(dobj, _Inheritable.UseLayoutRounding);
            if (!ic.UseLayoutRoundingSource && parentContext) ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;
            ic.TextDecorationsSource = ic.GetLocalSource(dobj, _Inheritable.TextDecorations);
            if (!ic.TextDecorationsSource && parentContext) ic.TextDecorationsSource = parentContext.TextDecorationsSource;
            return ic;
        }
        Compare(withContext: _InheritedContext, props) {
            var rv = _Inheritable.None;
            if (props & _Inheritable.Foreground && withContext.ForegroundSource === this.ForegroundSource)
                rv |= _Inheritable.Foreground;
            if (props & _Inheritable.FontFamily && withContext.FontFamilySource === this.FontFamilySource)
                rv |= _Inheritable.FontFamily;
            if (props & _Inheritable.FontStretch && withContext.FontStretchSource === this.FontStretchSource)
                rv |= _Inheritable.FontStretch;
            if (props & _Inheritable.FontStyle && withContext.FontStyleSource === this.FontStyleSource)
                rv |= _Inheritable.FontStyle;
            if (props & _Inheritable.FontWeight && withContext.FontWeightSource === this.FontWeightSource)
                rv |= _Inheritable.FontWeight;
            if (props & _Inheritable.FontSize && withContext.FontSizeSource === this.FontSizeSource)
                rv |= _Inheritable.FontSize;
            if (props & _Inheritable.Language && withContext.LanguageSource === this.LanguageSource)
                rv |= _Inheritable.Language;
            if (props & _Inheritable.FlowDirection && withContext.FlowDirectionSource === this.FlowDirectionSource)
                rv |= _Inheritable.FlowDirection;
            if (props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource === this.UseLayoutRoundingSource)
                rv |= _Inheritable.UseLayoutRounding;
            if (props & _Inheritable.TextDecorations && withContext.TextDecorationsSource === this.TextDecorationsSource)
                rv |= _Inheritable.TextDecorations;
            return rv;
        }
        GetLocalSource(dobj: DependencyObject, prop) {
            var propd = getProperty(prop, dobj);
            if (!propd)
                return;
            if ((dobj._Store._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)
                return dobj;
        }
    }
    function getInheritable(dobj: DependencyObject, propd: DependencyProperty) {
        var inh = propd._Inheritable || 0;
        if (inh && propd.Name === "FlowDirection" && (dobj instanceof Fayde.Controls.Image || dobj instanceof Fayde.Controls.MediaElement))
            inh = 0;
        return inh;
    }
    function getProperty(inheritable: _Inheritable, ancestor: DependencyObject) {
        var list = DependencyProperty._Inherited[inheritable];
        if (!list)
            return;
        var len = list.length;
        if (len > 0 && list[0].Name === "FlowDirection") {
            if (ancestor instanceof Fayde.Controls.Image || ancestor instanceof Fayde.Controls.MediaElement)
                return;
        }
        for (var i = 0; i < len; i++) {
            var propd = list[i];
            if (ancestor instanceof propd.OwnerType)
                return propd;
        }
    }
    function propagateInheritedValue(inheritable: _Inheritable, source: DependencyObject, newValue: any) {
        var provider: InheritedProvider = this._InheritedProvider;
        if (!provider)
            return true;
        provider._SetPropertySource(inheritable, source);
        var propd = getProperty(inheritable, this._Object);
        if (!propd)
            return false;
        var error = new BError();
        this._ProviderValueChanged(_PropertyPrecedence.Inherited, propd, undefined, newValue, true, error);
    }
    function getInheritedValueSource(inheritable: _Inheritable): DependencyObject {
        var provider: InheritedProvider = this._InheritedProvider;
        if (provider)
            return provider._GetPropertySource(inheritable);
    }
    export class InheritedProvider implements IPropertyProvider {
        private _ht: DependencyObject[] = [];
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var inheritable = getInheritable(store._Object, propd);
            if (!inheritable)
                return undefined;
            var ancestor = this._GetPropertySource(inheritable);
            if (!ancestor)
                return undefined;
            var ancestorPropd = getProperty(inheritable, ancestor);
            if (!ancestorPropd)
                return undefined;
            return ancestor.GetValue(ancestorPropd);
        }
        WalkSubtree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props, adding) {
            var enumerator = element.XamlNode.GetInheritedEnumerator();
            if (!enumerator)
                return;
            while (enumerator.MoveNext()) {
                this.WalkTree(rootParent, enumerator.Current, context, props, adding);
            }
        }
        WalkTree(rootParent: DependencyObject, element: DependencyObject, context: _InheritedContext, props: _Inheritable, adding: bool) {
            if (props === _Inheritable.None)
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
                var eleContext = _InheritedContext.FromObject(element, context);
                props = eleContext.Compare(context, props);
                if (props === _Inheritable.None)
                    return;
                this.WalkSubtree(rootParent, element, eleContext, props, adding);
            } else {
                var eleContext2 = _InheritedContext.FromObject(element, context);
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
                props = eleContext2.Compare(context, props);
                if (props === _Inheritable.None)
                    return;
                this.WalkSubtree(rootParent, element, context, props, adding);
            }
        }
        MaybePropagateInheritedValue(source: DependencyObject, prop, props, element: DependencyObject) {
            if (!source) return;
            if ((props & prop) == 0) return;
            var sourceProperty = getProperty(prop, source);
            var value = source.GetValue(sourceProperty);
            if (value !== undefined)
                propagateInheritedValue.call(element._Store, prop, source, value);
        }
        MaybeRemoveInheritedValue(source: DependencyObject, prop, props, element: DependencyObject) {
            if (!source) return;
            if ((props & prop) == 0) return;
            if (source === getInheritedValueSource.call(element, prop))
                propagateInheritedValue.call(element._Store, prop, undefined, undefined);
        }
        PropagateInheritedPropertiesOnAddingToTree(store: IProviderStore, subtree: DependencyObject) {
            var inhEnum = _Inheritable;
            var baseContext = _InheritedContext.FromSources(
                    this._GetPropertySource(inhEnum.Foreground),
                    this._GetPropertySource(inhEnum.FontFamily),
                    this._GetPropertySource(inhEnum.FontStretch),
                    this._GetPropertySource(inhEnum.FontStyle),
                    this._GetPropertySource(inhEnum.FontWeight),
                    this._GetPropertySource(inhEnum.FontSize),
                    this._GetPropertySource(inhEnum.Language),
                    this._GetPropertySource(inhEnum.FlowDirection),
                    this._GetPropertySource(inhEnum.UseLayoutRounding),
                    this._GetPropertySource(inhEnum.TextDecorations));
            var objContext = _InheritedContext.FromObject(store._Object, baseContext);
            this.WalkTree(store._Object, subtree, objContext, inhEnum.All, true);
        }
        PropagateInheritedProperty(store: IProviderStore, propd: DependencyProperty, source: DependencyObject, subtree: DependencyObject) {
            var inheritable = getInheritable(source, propd);
            if (inheritable === 0)
                return;
            var objContext = _InheritedContext.FromObject(store._Object, null);
            this.WalkSubtree(source, subtree, objContext, inheritable, true);
        }
        ClearInheritedPropertiesOnRemovingFromTree(store: IProviderStore, subtree: DependencyObject) {
            var baseContext = _InheritedContext.FromSources(
                    this._GetPropertySource(_Inheritable.Foreground),
                    this._GetPropertySource(_Inheritable.FontFamily),
                    this._GetPropertySource(_Inheritable.FontStretch),
                    this._GetPropertySource(_Inheritable.FontStyle),
                    this._GetPropertySource(_Inheritable.FontWeight),
                    this._GetPropertySource(_Inheritable.FontSize),
                    this._GetPropertySource(_Inheritable.Language),
                    this._GetPropertySource(_Inheritable.FlowDirection),
                    this._GetPropertySource(_Inheritable.UseLayoutRounding),
                    this._GetPropertySource(_Inheritable.TextDecorations));
            var objContext = _InheritedContext.FromObject(store._Object, baseContext);
            this.WalkTree(store._Object, subtree, objContext, _Inheritable.All, false);
        }
        _GetPropertySource(inheritable: _Inheritable): DependencyObject {
            return this._ht[inheritable];
        }
        _SetPropertySource(inheritable: _Inheritable, source: DependencyObject) {
            if (source)
                this._ht[inheritable] = source;
            else
                this._ht[inheritable] = undefined;
        }
    }
}

module Fayde.Providers {
    export interface IInheritedProvider extends IPropertyProvider {
        PropagateInheritedProperty(store: IProviderStore, propd: DependencyProperty, source: DependencyObject, subtree: DependencyObject);
        PropagateInheritedPropertiesOnAddingToTree(store: IProviderStore, subtree: DependencyObject);
        ClearInheritedPropertiesOnRemovingFromTree(store: IProviderStore, subtree: DependencyObject);
    }
    export class InheritedProviderStore extends BasicProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }
        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }
        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _InheritedProvider: IInheritedProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;
        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            super._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
            if (!notifyListeners)
                return;
            if (propd._Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                var inheritedProvider = this._InheritedProvider;
                if (inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0))
                    inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
            }
        }
        PropagateInheritedOnAdd(subtree: DependencyObject) {
            this._InheritedProvider.PropagateInheritedPropertiesOnAddingToTree(this, subtree);
        }
        ClearInheritedOnRemove(subtree: DependencyObject) {
            this._InheritedProvider.ClearInheritedPropertiesOnRemovingFromTree(this, subtree);
        }
    }
}

module Fayde.Providers {
    export class LocalStyleProvider implements IPropertyProvider {
        private _ht: any[] = [];
        private _Style: Style;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) {
            var oldValue;
            var newValue;
            var walkPropd;
            var walker = SingleStyleWalker(this._Style);
            var setter: Setter;
            while (setter = walker.Step()) {
                walkPropd = setter.Property;
                if (walkPropd._ID !== propd._ID)
                    continue;
                newValue = setter.ConvertedValue;
                oldValue = this._ht[propd._ID];
                this._ht[propd._ID] = newValue;
                this._Store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, error);
                if (error.Message)
                    return;
            }
        }
        UpdateStyle(style: Style, error: BError) {
            var store = this._Store;
            var oldValue = undefined;
            var newValue = undefined;
            var oldWalker = SingleStyleWalker(this._Style);
            var newWalker = SingleStyleWalker(style);
            style.Seal();
            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp: DependencyProperty;
            var newProp: DependencyProperty;
            while (oldSetter || newSetter) {
                if (oldSetter)
                    oldProp = oldSetter.Property;
                if (newSetter)
                    newProp = newSetter.Property;
                if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                    oldValue = oldSetter.ConvertedValue;
                    newValue = undefined;
                    this._ht[oldProp._ID] = undefined;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                } else if (oldProp === newProp) {
                    oldValue = oldSetter.ConvertedValue;
                    newValue = newSetter.ConvertedValue;
                    this._ht[oldProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                    newSetter = newWalker.Step();
                } else {
                    oldValue = undefined;
                    newValue = newSetter.ConvertedValue;
                    this._ht[newProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, error);
                    newSetter = newWalker.Step();
                }
            }
            this._Style = style;
        }
    }
}

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression {
        private _Binding;
        get Binding() { return this._Binding; }
        _TryUpdateSourceObject(value) {
        }
    }
}

module Fayde.Documents {
    export class TextElementNode extends XamlNode {
        XObject: TextElement;
        InheritedWalkProperty: DependencyProperty;
        GetInheritedEnumerator(): IEnumerator {
            var coll = this.XObject.GetValue(this.InheritedWalkProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    export class TextElement extends DependencyObject {
        _Store: Providers.InheritedProviderStore;
        CreateStore(): Providers.BasicProviderStore {
            return new Providers.InheritedProviderStore(this);
        }
        CreateNode(): XamlNode {
            return new TextElementNode(this);
        }
    }
}

module Fayde.Media {
    export class SolidColorBrush extends Brush {
        Color: Color;
    }
}

module Fayde {
    export class DependencyObjectCollection extends XamlObjectCollection implements Providers.IPropertyChangedListener {
        private _HandleItemChanged: bool;
        constructor(handleItemChanged: bool) {
            super();
            this._HandleItemChanged = handleItemChanged;
        }
        AddedToCollection(value: DependencyObject, error: BError): bool {
            super.AddedToCollection(value, error);
            if (this._HandleItemChanged)
                value._Store._SubscribePropertyChanged(this);
            return true;
        }
        RemovedFromCollection(value: DependencyObject, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            if (this._HandleItemChanged)
                value._Store._UnsubscribePropertyChanged(this);
        }
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
        }
        _RaiseItemChanged(item, propd: DependencyProperty, oldValue: DependencyObject, newValue: DependencyObject) { }
    }
}

module Fayde {
    export class FENode extends UINode {
        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode) {
            var error = new BError();
            if (!subtreeNode.AttachTo(this, error))
                error.ThrowException();
            this.SubtreeNode = subtreeNode;
        }
        IsLoaded: bool = false;
        SetIsLoaded(value: bool) {
            if (this.IsLoaded === value)
                return;
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        }
        OnIsLoadedChanged(newIsLoaded: bool) {
            var res = this.XObject.Resources;
            var store = this.XObject._Store;
            if (!newIsLoaded) {
                store.ClearImplicitStyles(Providers._StyleMask.VisualTree);
            } else {
                store.SetImplicitStyles(Providers._StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                (<FENode>enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if (newIsLoaded) {
                this.XObject.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        }
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            var store = this.XObject._Store;
            var visualParentNode: FENode;
            if (newParentNode && newParentNode instanceof FENode)
                store.SetDataContextSource(<FrameworkElement>newParentNode.XObject);
            else if ((visualParentNode = <FENode>this.VisualParentNode) && visualParentNode instanceof FENode)
                store.SetDataContextSource(visualParentNode.XObject);
            else
                store.SetDataContextSource(null);
            if (this.IsLoaded)
                store.EmitDataContextChanged();
        }
        OnIsAttachedChanged(newIsAttached: bool) {
            if (this.SubtreeNode)
                this.SubtreeNode.SetIsAttached(newIsAttached);
            super.OnIsAttachedChanged(newIsAttached);
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode) {
                if (this.SubtreeNode instanceof XamlObjectCollection)
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            }
        }
    }
    export class FrameworkElement extends UIElement {
        XamlNode: FENode;
        Resources: ResourceDictionary;
        constructor() {
            super();
            Object.defineProperty(this, "Resources", {
                value: new ResourceDictionary(),
                writable: false
            });
        }
        _Store: Providers.FrameworkProviderStore;
        CreateStore(): Providers.FrameworkProviderStore {
            var s = new Providers.FrameworkProviderStore(this);
            s.SetProviders([null,
                new Providers.LocalValueProvider(),
                new Providers.FrameworkElementDynamicProvider(),
                new Providers.LocalStyleProvider(s),
                new Providers.ImplicitStyleProvider(s),
                new Providers.InheritedProvider(),
                new Providers.InheritedDataContextProvider(s),
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        CreateNode(): XamlNode {
            return new FENode(this);
        }
        static ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () { return Number; }, FrameworkElement);
        static ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () { return Number; }, FrameworkElement);
        static DataContextProperty = DependencyProperty.RegisterCore("DataContext", function () { return Object; }, FrameworkElement);
        static StyleProperty = DependencyProperty.RegisterCore("Style", function () { return Style; }, FrameworkElement);
        _ComputeActualSize(): size {
            return new size();
        }
        InvokeLoaded() {
        }
    }
}

module Fayde {
    export class ResourceDictionaryCollection extends XamlObjectCollection {
        AddedToCollection(value: ResourceDictionary, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            return this._AssertNoCycles(value, value.XamlNode.ParentNode, error);
        }
        private _AssertNoCycles(subtreeRoot: ResourceDictionary, firstAncestorNode: XamlNode, error: BError) {
            var curNode = firstAncestorNode;
            while (curNode) {
                var rd = <ResourceDictionary>curNode.XObject;
                if (rd instanceof ResourceDictionary) {
                    var cycleFound = false;
                    if (rd === subtreeRoot)
                        cycleFound = true;
                    else if (rd.Source === subtreeRoot.Source)
                        cycleFound = true;
                    if (cycleFound) {
                        error.Message = "Cycle found in resource dictionaries.";
                        error.Number = BError.InvalidOperation;
                        return false;
                    }
                }
                curNode = curNode.ParentNode;
            }
            var enumerator = subtreeRoot.MergedDictionaries.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (!this._AssertNoCycles(enumerator.Current, firstAncestorNode, error))
                    return false;
            }
            return true;
        }
    }
    export class ResourceDictionary extends XamlObjectCollection {
        private _KeyIndex: number[] = [];
        MergedDictionaries: ResourceDictionaryCollection;
        Source: string = "";
        constructor() {
            super();
            Object.defineProperty(this, "MergedDictionaries", {
                value: new ResourceDictionaryCollection(),
                writable: false
            });
        }
        ContainsKey(key: any): bool {
            return this._KeyIndex[key] !== undefined;
        }
        Get(key: any): XamlObject {
            var index = this._KeyIndex[key];
            if (index !== undefined)
                return this.GetValueAt(index);
            return this._GetFromMerged(key);
        }
        Set(key: any, value: XamlObject) {
            var oldValue;
            if (this.ContainsKey(key)) {
                oldValue = this.Get(key);
                this.Remove(oldValue);
            }
            var index = super.Add(value);
            this._KeyIndex[key] = index;
            this._RaiseItemReplaced(oldValue, value, index);
            return true;
        }
        Add(value: XamlObject): number {
            throw new InvalidOperationException("Cannot add to ResourceDictionary. Use Set instead.");
        }
        Remove(value: XamlObject): bool {
            throw new InvalidOperationException("Cannot remove from ResourceDictionary. Use Set instead.");
        }
        private _GetFromMerged(key: any): XamlObject {
            var merged = this.MergedDictionaries;
            if (!merged)
                return undefined;
            var enumerator = merged.GetEnumerator();
            var cur;
            while (enumerator.MoveNext()) {
                cur = (<ResourceDictionary>enumerator.Current).Get(key);
                if (cur !== undefined)
                    return cur;
            }
            return undefined;
        }
    }
}

module Fayde {
    export class SetterCollection extends XamlObjectCollection {
        private _IsSealed: bool = false;
        _Seal(targetType: Function) {
            if (this._IsSealed)
                return;
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Setter>enumerator.Current)._Seal(targetType);
            }
            this._IsSealed = true;
        }
        AddedToCollection(value: XamlObject, error: BError): bool {
            if (!value || !this._ValidateSetter(<Setter>value, error))
                return false;
            return super.AddedToCollection(value, error);
        }
        private _ValidateSetter(setter: Setter, error: BError) {
            if (setter.Property === undefined) {
                error.Message = "Cannot have a null PropertyProperty value";
                return false;
            }
            if (setter.Value === undefined) {
                error.Message = "Cannot have a null ValueProperty value";
                return false;
            }
            if (this._IsSealed) {
                error.Message = "Cannot add a setter to a sealed style";
                return false;
            }
            return true;
        }
    }
    export class Setter extends XamlObject {
        private _IsSealed: bool = false;
        Property: DependencyProperty;
        Value: any;
        ConvertedValue: any;
        _Seal(targetType: Function) {
            var propd = this.Property;
            var val = this.Value;
            if (typeof propd.GetTargetType() === "string") {
                if (typeof val !== "string")
                    throw new XamlParseException("Setter value does not match property type.");
            }
            try {
                this.ConvertedValue = Fayde.TypeConverter.ConvertObject(propd, val, targetType, true);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        }
    }
}

module Fayde.Providers {
    declare var App;
    export interface ILocalStylesProvider extends IPropertyProvider {
        UpdateStyle(style: Style, error: BError);
    }
    export interface IImplicitStylesProvider extends IPropertyProvider {
        SetStyles(styleMask: _StyleMask, styles: Style[], error: BError);
        ClearStyles(styleMask: _StyleMask, error: BError);
    }
    export interface IInheritedDataContextProvider extends IPropertyProvider {
        EmitChanged();
        SetDataSource(source: FrameworkElement);
    }
    export class FrameworkProviderStore extends InheritedProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }
        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DynamicValueProvider = this._Providers[2] = providerArr[2];
            this._LocalStyleProvider = this._Providers[3] = <ILocalStylesProvider>providerArr[3];
            this._ImplicitStyleProvider = this._Providers[4] = <IImplicitStylesProvider>providerArr[4];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._InheritedDataContextProvider = this._Providers[6] = <IInheritedDataContextProvider>providerArr[6];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }
        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: IPropertyProvider;
        private _LocalStyleProvider: ILocalStylesProvider;
        private _ImplicitStyleProvider: IImplicitStylesProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IInheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;
        SetImplicitStyles(styleMask: _StyleMask, styles?: Style[]) {
            var app;
            if (!styles && App && (app = App.Instance))
                styles = app._GetImplicitStyles(this, styleMask);
            if (styles) {
                var error = new BError();
                var len = Providers._StyleIndex.Count;
                for (var i = 0; i < len; i++) {
                    var style = styles[i];
                    if (!style)
                        continue;
                    if (!style.Validate(this._Object, error)) {
                        error.ThrowException();
                        return;
                    }
                }
            }
            this._ImplicitStyleProvider.SetStyles(styleMask, styles, error);
        }
        ClearImplicitStyles(styleMask: _StyleMask) {
            var error = new BError();
            this._ImplicitStyleProvider.ClearStyles(styleMask, error);
        }
        SetLocalStyle(style: Style, error: BError) {
            this._LocalStyleProvider.UpdateStyle(style, error);
        }
        EmitDataContextChanged() {
            this._InheritedDataContextProvider.EmitChanged();
        }
        SetDataContextSource(source: FrameworkElement) {
            this._InheritedDataContextProvider.SetDataSource(source);
        }
    }
}

module Fayde.Documents {
    export class Block extends TextElement {
    }
}

module Fayde.Documents {
    export class Inline extends TextElement {
    }
}

module Fayde.Documents {
    export class Paragraph extends Block {
        static InlinesProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this)
            tenode.InheritedWalkProperty = Paragraph.InlinesProperty;
            return tenode;
        }
    }
}

module Fayde.Documents {
    export class Section extends TextElement {
        static BlocksProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this);
            tenode.InheritedWalkProperty = Section.BlocksProperty;
            return tenode;
        }
    }
}

module Fayde.Documents {
    export class Span extends Inline {
        static InlinesProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this);
            tenode.InheritedWalkProperty = Span.InlinesProperty;
            return tenode;
        }
    }
}

module Fayde.Controls {
    export class Control extends FrameworkElement {
        _Store: Providers.ControlProviderStore;
        CreateStore() {
            return new Providers.ControlProviderStore(this);
        }
        static IsEnabledProperty: DependencyProperty;
    }
}

module Fayde.Controls {
    export class Image extends FrameworkElement {
    }
}

module Fayde.Controls {
    export class MediaElement extends FrameworkElement {
    }
}

module Fayde.Controls {
    function zIndexComparer(uin1: UINode, uin2: UINode) {
        var zi1 = Controls.Panel.GetZIndex(uin1.XObject);
        var zi2 = Controls.Panel.GetZIndex(uin2.XObject);
        if (zi1 === zi2) {
            var z1 = Controls.Panel.GetZ(uin1.XObject);
            var z2 = Controls.Panel.GetZ(uin2.XObject);
            if (isNaN(z1) || isNaN(z2))
                return 0;
            return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
        }
        return zi1 - zi2;
    }
    class PanelChildrenNode extends XamlNode {
        ParentNode: PanelNode;
        private _Nodes: UINode[] = [];
        private _ZSorted: UINode[] = [];
        ResortByZIndex() {
            var zs = this._Nodes.slice(0);
            this._ZSorted = zs;
            if (zs.length > 1)
                zs.sort(zIndexComparer);
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            switch (direction) {
                case VisualTreeDirection.Logical:
                    return ArrayEx.GetEnumerator(this._Nodes);
                case VisualTreeDirection.LogicalReverse:
                    return ArrayEx.GetEnumerator(this._Nodes, true);
                case VisualTreeDirection.ZFoward:
                    if (this._ZSorted.length !== this._Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted);
                case VisualTreeDirection.ZReverse:
                    if (this._ZSorted.length !== this._Nodes.length)
                        this.ResortByZIndex();
                    return ArrayEx.GetEnumerator(this._ZSorted, true);
            }
        }
    }
    class PanelChildrenCollection extends DependencyObjectCollection {
        XamlNode: PanelChildrenNode;
        constructor() {
            super(false);
        }
        CreateNode(): XamlNode {
            return new PanelChildrenNode(this);
        }
        _RaiseItemAdded(value: UIElement, index: number) {
            this.XamlNode.ParentNode._ElementAdded(value);
        }
        _RaiseItemRemoved(value: UIElement, index: number) {
            this.XamlNode.ParentNode._ElementRemoved(value);
        }
        _RaiseItemReplaced(removed: UIElement, added: UIElement, index: number) {
            var panelNode = this.XamlNode.ParentNode;
            panelNode._ElementRemoved(removed);
            panelNode._ElementAdded(added);
        }
    }
    export class PanelNode extends FENode {
        XObject: Panel;
        constructor(xobj: Panel) {
            super(xobj);
            var coll = new PanelChildrenCollection();
            Object.defineProperty(xobj, "Children", {
                value: coll,
                writable: false
            });
            this.SetSubtreeNode(coll.XamlNode);
        }
        _ElementAdded(uie: UIElement) {
            super._ElementAdded(uie);
            this._InvalidateChildrenZIndices();
        }
        _ElementRemoved(uie: UIElement) {
            super._ElementRemoved(uie);
            this._InvalidateChildrenZIndices();
        }
        _InvalidateChildrenZIndices() {
            if (this.IsAttached) {
            }
        }
    }
    function zIndexPropertyChanged(dobj: DependencyObject, args) {
        (<PanelNode>dobj.XamlNode.ParentNode)._InvalidateChildrenZIndices();
    }
    export class Panel extends FrameworkElement {
        XamlNode: PanelNode;
        static BackgroundProperty: DependencyProperty = DependencyProperty.Register("Background", () => { return Media.Brush; }, Panel);
        static IsItemsHostProperty: DependencyProperty = DependencyProperty.Register("IsItemHost", () => { return Boolean; }, Panel, false);
        static ZIndexProperty: DependencyProperty = DependencyProperty.RegisterAttached("ZIndex", () => { return Number; }, Panel, 0, zIndexPropertyChanged);
        static ZProperty: DependencyProperty = DependencyProperty.RegisterAttached("Z", () => { return Number; }, Panel, NaN);
        Children: DependencyObjectCollection;
        static GetZIndex(uie: UIElement): number { return uie.GetValue(ZIndexProperty); }
        static SetZIndex(uie: UIElement, value: number) { uie.SetValue(ZIndexProperty, value); }
        static GetZ(uie: UIElement): number { return uie.GetValue(ZProperty); }
        static SetZ(uie: UIElement, value: number) { uie.SetValue(ZProperty, value); }
        CreateNode(): XamlNode {
            return new PanelNode(this);
        }
    }
}

module Fayde.Controls {
    export class TextBlockNode extends UINode {
        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    export class TextBlock extends FrameworkElement {
        static InlinesProperty;
        CreateNode(): XamlNode {
            return new TextBlockNode(this);
        }
    }
}

module Fayde.Controls.Primitives {
    export class PopupNode extends UINode {
        GetInheritedWalker(): IEnumerator {
            var popup = (<Popup>this.XObject);
            if (!popup)
                return;
            var index = -1;
            return {
                MoveNext: function () {
                    index++;
                    return index === 0;
                },
                Current: popup.Child
            };
        }
    }
    export class Popup extends Fayde.FrameworkElement {
        Child: UIElement;
        CreateNode(): XamlNode {
            return new PopupNode(this);
        }
    }
}

module Fayde.Providers {
    export interface IInheritedIsEnabledProvider extends IPropertyProvider {
        LocalValueChanged(propd?: DependencyProperty): bool;
        SetDataSource(source: DependencyObject);
    }
    export class ControlProviderStore extends FrameworkProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }
        SetProviders(providerArr: IPropertyProvider[]) {
            this._InheritedIsEnabledProvider = this._Providers[0] = <IInheritedIsEnabledProvider>providerArr[0];
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DynamicValueProvider = this._Providers[2] = providerArr[2];
            this._LocalStyleProvider = this._Providers[3] = providerArr[3];
            this._ImplicitStyleProvider = this._Providers[4] = providerArr[4];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }
        private _Providers: IPropertyProvider[];
        private _InheritedIsEnabledProvider: IInheritedIsEnabledProvider;
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: IPropertyProvider;
        private _LocalStyleProvider: IPropertyProvider;
        private _ImplicitStyleProvider: IPropertyProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IPropertyProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;
        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            var iiep: IInheritedIsEnabledProvider;
            if (providerPrecedence !== _PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd))
                return;
            super._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
        }
        SetIsEnabledSource(source: DependencyObject) {
            this._InheritedIsEnabledProvider.SetDataSource(source);
        }
    }
}

