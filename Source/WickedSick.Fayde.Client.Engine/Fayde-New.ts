module Fayde {
    export enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
    export var CursorType = {
        Default: "",
        Hand: "pointer",
        IBeam: "text",
        Wait: "wait",
        SizeNESW: "ne-resize",
        SizeNWSE: "nw-resize",
        SizeNS: "n-resize",
        SizeWE: "w-resize"
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
    export interface ITabNavigationWalker {
        FocusChild(): bool;
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
    function compare(left: Controls.ControlNode, right: Controls.ControlNode) {
        if (!left)
            return !right ? 0 : -1;
        if (!right)
            return 1;
        var v1 = left.XObject.TabIndex;
        var v2 = right.XObject.TabIndex;
        if (v1 == null) {
            return v2 != null ? -1 : 0;
        } else if (v2 == null) {
            return 1;
        }
        if (v1 > v2)
            return 1;
        return v1 === v2 ? 0 : -1;
    }
    function getParentNavigationMode(uin: UINode): Input.KeyboardNavigationMode {
        while (uin) {
            if (uin instanceof Controls.ControlNode)
                return (<Controls.ControlNode>uin).XObject.TabNavigation;
            return Input.KeyboardNavigationMode.Local;
        }
        return Input.KeyboardNavigationMode.Local;
    }
    function getActiveNavigationMode(uin: UINode): Input.KeyboardNavigationMode {
        while (uin) {
            if (uin instanceof Controls.ControlNode)
                return (<Controls.ControlNode>uin).XObject.TabNavigation;
            uin = uin.VisualParentNode;
        }
        return Input.KeyboardNavigationMode.Local;
    }
    function walkChildren(root: UINode, cur?: UINode, forwards?: bool) {
        var walker = new TabNavigationWalker(root, cur, forwards);
        return walker.FocusChild();
    }
    export class TabNavigationWalker implements ITabNavigationWalker {
        private _Root: UINode;
        private _Current: UINode;
        private _Forwards: bool;
        private _TabSorted: UINode[];
        constructor(root: UINode, cur: UINode, forwards: bool) {
            this._Root = root;
            this._Current = cur;
            this._Forwards = forwards;
            this._TabSorted = [];
        }
        FocusChild(): bool {
            var childNode: UINode;
            var childIsControl;
            var curIndex = -1;
            var childWalker = DeepTreeWalker(this._Root.XObject);
            while (childNode = childWalker.Step()) {
                if (childNode === this._Root || !(childNode instanceof Controls.ControlNode))
                    continue;
                this._TabSorted.push(childNode);
                childWalker.SkipBranch();
            }
            if (this._TabSorted.length > 1) {
                this._TabSorted.sort(compare);
                if (!this._Forwards)
                    this._TabSorted = this._TabSorted.reverse();
            }
            var len = this._TabSorted.length;
            for (var i = 0; i < len; i++) {
                if (this._TabSorted[i] === this._Current)
                    curIndex = i;
            }
            if (curIndex !== -1 && getActiveNavigationMode(this._Root) === Input.KeyboardNavigationMode.Once) {
                if (!this._Forwards && this._Root instanceof Controls.ControlNode)
                    return (<Controls.ControlNode>this._Root).TabTo();
                return false;
            }
            var len = this._TabSorted.length;
            if (len > 0) {
                for (var j = 0; j < len; j++) {
                    if ((j + curIndex + 1) === len && getActiveNavigationMode(this._Root) !== Input.KeyboardNavigationMode.Cycle)
                        break;
                    childNode = this._TabSorted[(j + curIndex + 1) % len];
                    childIsControl = childNode instanceof Controls.ControlNode;
                    if (childIsControl && !(<Controls.ControlNode>childNode).XObject.IsEnabled)
                        continue;
                    if (!this._Forwards && walkChildren(childNode))
                        return true;
                    if (childIsControl && (<Controls.ControlNode>childNode).TabTo())
                        return true;
                    if (this._Forwards && walkChildren(childNode))
                        return true;
                }
            }
            if (curIndex !== -1 && !this._Forwards) {
                if (this._Root instanceof Controls.ControlNode)
                    return (<Controls.ControlNode>this._Root).TabTo();
            }
            return false;
        }
        static Focus(uin: UINode, forwards?: bool): bool {
            var focused = false;
            var cur = uin;
            var root = uin;
            if ((root.VisualParentNode && getParentNavigationMode(root.VisualParentNode) === Input.KeyboardNavigationMode.Once)
                || (!forwards && root && root.VisualParentNode)) {
                while (root = root.VisualParentNode)
                    if (root.XObject instanceof Fayde.Controls.Control || !root.VisualParentNode)
                        break;
            }
            do {
                focused = focused || walkChildren(root, cur, forwards);
                if (!focused && getActiveNavigationMode(root) === Fayde.Input.KeyboardNavigationMode.Cycle)
                    return true;
                cur = root;
                root = root.VisualParentNode;
                while (root && !(root.XObject instanceof Fayde.Controls.Control) && root.VisualParentNode)
                    root = root.VisualParentNode
            } while (!focused && root);
            if (!focused)
                focused = focused || walkChildren(cur, null, forwards);
            return focused;
        }
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

enum _Dirty {
    Transform = 1 << 0,
    LocalTransform = 1 << 1,
    LocalProjection = 1 << 2,
    Clip = 1 << 3,
    LocalClip = 1 << 4,
    RenderVisibility = 1 << 5,
    HitTestVisibility = 1 << 6,
    Measure = 1 << 7,
    Arrange = 1 << 8,
    ChildrenZIndices = 1 << 9,
    Bounds = 1 << 20,
    NewBounds = 1 << 21,
    Invalidate = 1 << 22,
    InUpDirtyList = 1 << 30,
    InDownDirtyList = 1 << 31,
    DownDirtyState = Transform | LocalTransform | LocalProjection 
        | Clip | LocalClip | RenderVisibility | HitTestVisibility | ChildrenZIndices,
    UpDirtyState = Bounds | Invalidate,
}

module Fayde {
    export interface IRenderContext {
    }
    export interface IStoryboard {
        Update(nowTime: number);
    }
}

module Fayde.Media {
    export interface ICoordinates {
        x: number;
        y: number;
    }
    export class GradientMetrics {
        static Calculate(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            if (dir.y === 0) {
                if (dir.x < 0)
                    W(dir, first, last, bounds);
                else
                    E(dir, first, last, bounds);
            } else if (dir.x === 0) {
                if (dir.y < 0)
                    N(dir, first, last, bounds);
                else
                    S(dir, first, last, bounds);
            } else if (dir.x < 0 && dir.y < 0) { // e\s
                NW(dir, first, last, bounds);
            } else if (dir.x < 0 && dir.y > 0) { // e/s
                SW(dir, first, last, bounds);
            } else if (dir.x > 0 && dir.y < 0) { // s/e
                NE(dir, first, last, bounds);
            } else if (dir.x > 0 && dir.y > 0) { // s\e
                SE(dir, first, last, bounds);
            }
        }
        private static E(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            while (first.x >= bounds.X)
                first.x -= dir.x;
            while (last.x <= maxX)
                last.x += dir.x;
        }
        private static W(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            while (first.x <= maxX)
                first.x -= dir.x;
            while (last.x >= bounds.X)
                last.x += dir.x;
        }
        private static S(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxY = bounds.Y + bounds.Height;
            while (first.y >= bounds.Y)
                first.y -= dir.y;
            while (last.y <= maxY)
                last.y += dir.y;
        }
        private static N(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxY = bounds.Y + bounds.Height;
            while (first.y <= maxY)
                first.y -= dir.y;
            while (last.y >= bounds.Y)
                last.y += dir.y;
        }
        private static NW(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            var maxY = bounds.Y + bounds.Height;
            while (first.x <= maxX && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.X && last.y >= bounds.Y) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        private static SW(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            var maxY = bounds.Y + bounds.Height;
            while (first.x <= maxX && first.y >= bounds.Y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.X && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        private static NE(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            var maxY = bounds.Y + bounds.Height;
            while (first.x >= bounds.X && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y >= bounds.Y) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
        private static SE(dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: rect) {
            var maxX = bounds.X + bounds.Width;
            var maxY = bounds.Y + bounds.Height;
            while (first.x >= bounds.X && first.y >= bounds.Y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
    }
}

module Fayde.Media {
    export function ParseGeometry(val: string): Geometry {
        return new Geometry();
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
    static RegisterType(type: Function, name: string) {
        var t: any = type;
        t._TypeName = name;
        t._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
    }
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
    static DoesInheritFrom(t: Function, type: Function): bool {
        var temp = t;
        while (temp && temp !== type) {
            temp = (<any>temp)._BaseClass;
        }
        return temp != null;
    }
    static GetPropertyDescriptor(obj: any, name: string): PropertyDescriptor {
        if (!obj)
            return;
        var type: Function = (<any>obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if (propDesc)
            return propDesc;
        return Object.getOwnPropertyDescriptor(obj, name);
    }
    static HasProperty(obj: any, name: string): bool {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    }
}

module Fayde.Shapes {
    export class PointCollection {
    }
    Nullstone.RegisterType(PointCollection, "PointCollection");
}

module Fayde.Shapes {
    export function ParsePointCollection(val: string): PointCollection {
        return new PointCollection();
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
        var registeredDPs: DependencyProperty[] = (<any>ownerType)._RegisteredDPs;
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
    static GetDependencyProperty(ownerType: Function, name: string) {
        if (!ownerType)
            return null;
        var reg: DependencyProperty[] = (<any>ownerType)._RegisteredDPs;
        var propd: DependencyProperty;
        if (reg)
            propd = reg[name];
        if (!propd)
            propd = DependencyProperty.GetDependencyProperty((<any>ownerType)._BaseClass, name);
        return propd;
    }
}
Nullstone.RegisterType(DependencyProperty, "DependencyProperty");

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
    Nullstone.RegisterType(Expression, "Expression");
}

module Fayde {
    export class LayoutInformation {
        static GetLayoutClip(uie: UIElement): Media.Geometry {
            return uie.XamlNode.LayoutUpdater.LayoutClip;
        }
        static SetLayoutClip(uie: UIElement, value: Media.Geometry) {
            uie.XamlNode.LayoutUpdater.LayoutClip = value;
        }
        static GetLayoutExceptionElement(uie: UIElement): UIElement {
            return uie.XamlNode.LayoutUpdater.LayoutExceptionElement;
        }
        static SetLayoutExceptionElement(uie: UIElement, value: UIElement) {
            uie.XamlNode.LayoutUpdater.LayoutExceptionElement = value;
        }
        static GetLayoutSlot(uie: UIElement): rect {
            return uie.XamlNode.LayoutUpdater.LayoutSlot;
        }
        static SetLayoutSlot(uie: UIElement, value: rect) {
            uie.XamlNode.LayoutUpdater.LayoutSlot = value;
        }
    }
    Nullstone.RegisterType(LayoutInformation, "LayoutInformation");
}

module Fayde {
    var dirtyEnum = _Dirty;
    var localTransformFlag = _Dirty.LocalTransform;
    var localProjectionFlag = _Dirty.LocalProjection;
    var transformFlag = _Dirty.Transform;
    var rvFlag = _Dirty.RenderVisibility;
    var htvFlag = _Dirty.HitTestVisibility;
    var localClipFlag = _Dirty.LocalClip;
    var clipFlag = _Dirty.Clip;
    var downDirtyFlag = _Dirty.DownDirtyState
    var upDirtyFlag = _Dirty.UpDirtyState;
    export enum UIElementFlags {
        None = 0,
        RenderVisible = 0x02,
        HitTestVisible = 0x04,
        TotalRenderVisible = 0x08,
        TotalHitTestVisible = 0x10,
        DirtyArrangeHint = 0x800,
        DirtyMeasureHint = 0x1000,
        DirtySizeHint = 0x2000,
        RenderProjection = 0x4000,
    }
    export interface ILayoutPass {
        MeasureList: LayoutUpdater[];
        ArrangeList: LayoutUpdater[];
        SizeList: LayoutUpdater[];
        Count: number;
        Updated: bool;
    }
    var maxPassCount = 250;
    export class LayoutUpdater {
        private _Surface: Surface;
        LayoutClip: Media.Geometry = undefined;
        LayoutExceptionElement: UIElement = undefined;
        LayoutSlot: rect = undefined;
        PreviousConstraint: size = undefined;
        LastRenderSize: size = undefined;
        RenderSize: size = new size();
        TotalIsRenderVisible: bool = true;
        Extents: rect = new rect();
        Bounds: rect = new rect();
        Global: rect = new rect();
        Surface: rect = new rect();
        EffectPadding: Thickness = new Thickness();
        ClipBounds: rect = new rect();
        SubtreeExtents: rect;
        SubtreeBounds: rect;
        GlobalBounds: rect;
        LayoutClipBounds: rect = new rect();
        Flags: Fayde.UIElementFlags = Fayde.UIElementFlags.None;
        DirtyFlags: _Dirty = 0;
        InUpDirty: bool = false;
        InDownDirty: bool = false;
        DirtyRegion: rect = null;
        private _ForceInvalidateOfNewBounds: bool = false;
        constructor(public Node: UINode) { }
        SetSurface(surface: Surface) {
            this._Surface = surface;
        }
        OnIsAttachedChanged(newIsAttached: bool, visualParentNode: UINode) {
            this.UpdateTotalRenderVisibility();
            if (!newIsAttached) {
                this._CacheInvalidateHint();
                this._Surface.OnNodeDetached(this);
            } else if (visualParentNode) {
                this._Surface = visualParentNode.LayoutUpdater._Surface;
            }
        }
        OnAddedToTree() {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            this.Invalidate();
            this.SetLayoutClip(undefined);
            size.clear(this.RenderSize);
            this.UpdateTransform();
            this.UpdateProjection();
            this.InvalidateMeasure();
            this.InvalidateArrange();
            if (this._HasFlag(UIElementFlags.DirtySizeHint) || this.LastRenderSize !== undefined)
                this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
        OnRemovedFromTree() {
            this.LayoutSlot = new rect();
            this.SetLayoutClip(undefined);
        }
        IsContainer() {
        }
        HasMeasureArrangeHint(): bool {
            return (this.Flags & (UIElementFlags.DirtyMeasureHint | UIElementFlags.DirtyArrangeHint)) > 0;
        }
        ProcessDown() {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu: Fayde.LayoutUpdater;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;
            var f = this.DirtyFlags;
            /*
            DirtyDebug.Level++;
            DirtyDebug("[" + uie.__DebugToString() + "]" + uie.__DebugDownDirtyFlags());
            */
            if (f & rvFlag) {
                f &= ~rvFlag;
                var ovisible = this.TotalIsRenderVisible;
                this.UpdateBounds();
                if (visualParentLu)
                    visualParentLu.UpdateBounds();
                this.UpdateRenderVisibility(visualParentLu);
                if (!this.TotalIsRenderVisible)
                    this._CacheInvalidateHint();
                if (ovisible !== this.TotalIsRenderVisible)
                    this._Surface._AddDirtyElement(this, dirtyEnum.NewBounds);
                this._PropagateDirtyFlagToChildren(rvFlag);
            }
            if (f & htvFlag) {
                f &= ~htvFlag;
                this.UpdateHitTestVisibility(visualParentLu);
                this._PropagateDirtyFlagToChildren(htvFlag);
            }
            var isLT = f & localTransformFlag;
            var isLP = f & localProjectionFlag;
            var isT = isLT || isLP || f & transformFlag;
            f &= ~(localTransformFlag | localProjectionFlag | transformFlag);
            if (isLT) {
                this.ComputeLocalTransform();
            }
            if (isLP) {
                this.ComputeLocalProjection();
            }
            if (isT) {
                this.ComputeTransform();
                if (visualParentLu)
                    visualParentLu.UpdateBounds();
                this._PropagateDirtyFlagToChildren(dirtyEnum.Transform);
            }
            var isLocalClip = f & localClipFlag;
            var isClip = isLocalClip || f & clipFlag;
            f &= ~(localClipFlag | clipFlag);
            if (isClip)
                this._PropagateDirtyFlagToChildren(dirtyEnum.Clip);
            if (f & dirtyEnum.ChildrenZIndices) {
                f &= ~dirtyEnum.ChildrenZIndices;
                thisNode._ResortChildrenByZIndex();
            }
            this.DirtyFlags = f;
            return !(f & downDirtyFlag);
        }
        ProcessUp(): bool {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu: Fayde.LayoutUpdater;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;
            var f = this.DirtyFlags;
            var invalidateSubtreePaint = false;
            if (f & dirtyEnum.Bounds) {
                f &= ~dirtyEnum.Bounds;
                var oextents = rect.clone(this.SubtreeExtents);
                var oglobalbounds = rect.clone(this.GlobalBounds);
                var osubtreebounds = rect.clone(this.SubtreeBounds);
                this.ComputeBounds();
                if (!rect.isEqual(oglobalbounds, this.GlobalBounds)) {
                    if (visualParentLu) {
                        visualParentLu.UpdateBounds();
                        visualParentLu.Invalidate(osubtreebounds);
                        visualParentLu.Invalidate(this.SubtreeBounds);
                    }
                }
                invalidateSubtreePaint = !rect.isEqual(oextents, this.SubtreeExtents) || this._ForceInvalidateOfNewBounds;
                this._ForceInvalidateOfNewBounds = false;
            }
            if (f & dirtyEnum.NewBounds) {
                if (visualParentLu)
                    visualParentLu.Invalidate(this.SubtreeBounds);
                else if (thisNode.IsTopLevel)
                    invalidateSubtreePaint = true;
                f &= ~dirtyEnum.NewBounds;
            }
            if (invalidateSubtreePaint)
                this.Invalidate(this.SubtreeBounds);
            if (f & dirtyEnum.Invalidate) {
                f &= ~dirtyEnum.Invalidate;
                var dirty = this.DirtyRegion;
                if (visualParentLu) {
                    visualParentLu.Invalidate(dirty);
                } else {
                    if (thisNode.IsAttached) {
                        this._Surface._Invalidate(dirty);
                        /*
                        OPTIMIZATION NOT IMPLEMENTED
                        var count = dirty.GetRectangleCount();
                        for (var i = count - 1; i >= 0; i--) {
                        surface._Invalidate(dirty.GetRectangle(i));
                        }
                        */
                    }
                }
                rect.clear(dirty);
            }
            this.DirtyFlags = f;
            return !(f & upDirtyFlag);
        }
        private _PropagateDirtyFlagToChildren(dirt: _Dirty) {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            if (!enumerator)
                return;
            var s = this._Surface;
            while (enumerator.MoveNext()) {
                s._AddDirtyElement((<UINode>enumerator.Current).LayoutUpdater, dirt);
            }
        }
        FullInvalidate(invTransforms?: bool) {
            this.Invalidate();
            if (invTransforms) {
                this.UpdateTransform();
                this.UpdateProjection();
            }
            this.UpdateBounds(true);
        }
        Invalidate(r?: rect) {
        }
        private _CacheInvalidateHint() {
        }
        InvalidateMeasure() {
        }
        InvalidateArrange() {
        }
        UpdateBounds(forceRedraw?: bool) {
        }
        UpdateTransform() {
        }
        ComputeLocalTransform() {
        }
        ComputeLocalProjection() {
        }
        ComputeTransform() {
        }
        UpdateProjection() {
        }
        UpdateRenderVisibility(vpLu: Fayde.LayoutUpdater) {
        }
        UpdateTotalRenderVisibility() {
        }
        UpdateHitTestVisibility(vpLu: Fayde.LayoutUpdater) {
        }
        UpdateTotalHitTestVisibility() {
        }
        ComputeBounds() {
        }
        SetLayoutClip(layoutClip: Media.Geometry) {
            this.LayoutClip = layoutClip;
            if (!layoutClip)
                rect.clear(this.LayoutClipBounds);
            else
                rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
        }
        GetRenderVisible(): bool {
            return true;
        }
        UpdateLayer(pass: Fayde.ILayoutPass, error: BError) {
            var elNode = this.Node;
            var parentNode: Fayde.UINode;
            while (parentNode = elNode.VisualParentNode)
                elNode = parentNode;
            var element = elNode.XObject;
            var layout = elNode.LayoutUpdater;
            var lu: Fayde.LayoutUpdater;
            while (pass.Count < maxPassCount) {
                while (lu = pass.ArrangeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
                }
                while (lu = pass.SizeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                }
                pass.Count = pass.Count + 1;
                var flag = UIElementFlags.None;
                if (element.Visibility === Fayde.Visibility.Visible) {
                    if (layout._HasFlag(UIElementFlags.DirtyMeasureHint))
                        flag = UIElementFlags.DirtyMeasureHint;
                    else if (layout._HasFlag(UIElementFlags.DirtyArrangeHint))
                        flag = UIElementFlags.DirtyArrangeHint;
                    else if (layout._HasFlag(UIElementFlags.DirtySizeHint))
                        flag = UIElementFlags.DirtySizeHint;
                }
                if (flag !== UIElementFlags.None) {
                    var measureWalker = Fayde.DeepTreeWalker(element);
                    var childNode: Fayde.UINode;
                    while (childNode = measureWalker.Step()) {
                        lu = childNode.LayoutUpdater;
                        if (childNode.XObject.Visibility !== Fayde.Visibility.Visible || !lu._HasFlag(flag)) {
                            measureWalker.SkipBranch();
                            continue;
                        }
                        lu._ClearFlag(flag);
                        switch (flag) {
                            case UIElementFlags.DirtyMeasureHint:
                                if (lu.DirtyFlags & _Dirty.Measure)
                                    pass.MeasureList.push(lu);
                                break;
                            case UIElementFlags.DirtyArrangeHint:
                                if (lu.DirtyFlags & _Dirty.Arrange)
                                    pass.ArrangeList.push(lu);
                                break;
                            case UIElementFlags.DirtySizeHint:
                                if (lu.LastRenderSize !== undefined)
                                    pass.SizeList.push(lu);
                                break;
                            default:
                                break;
                        }
                    }
                }
                if (flag === UIElementFlags.DirtyMeasureHint) {
                    while (lu = pass.MeasureList.shift()) {
                        lu._DoMeasureWithError(error);
                        pass.Updated = true;
                    }
                } else if (flag === UIElementFlags.DirtyArrangeHint) {
                    while (lu = pass.ArrangeList.shift()) {
                        lu._DoArrangeWithError(error);
                        pass.Updated = true;
                        if (layout._HasFlag(UIElementFlags.DirtyMeasureHint))
                            break;
                    }
                } else if (flag === UIElementFlags.DirtySizeHint) {
                    while (lu = pass.SizeList.shift()) {
                        pass.Updated = true;
                        var last = lu.LastRenderSize
                        if (last) {
                            lu.LastRenderSize = undefined;
                            lu._UpdateActualSize();
                            var fe = <FrameworkElement>lu.Node.XObject;
                            fe.SizeChanged.Raise(fe, new Fayde.SizeChangedEventArgs(last, lu.RenderSize));
                        }
                    }
                } else {
                    break;
                }
            }
        }
        private _UpdateActualSize() {
        }
        private _HasFlag(flag: Fayde.UIElementFlags): bool { return (this.Flags & flag) === flag; }
        private _ClearFlag(flag: Fayde.UIElementFlags) { this.Flags &= ~flag; }
        private _SetFlag(flag: Fayde.UIElementFlags) { this.Flags |= flag; }
        private _PropagateFlagUp(flag: Fayde.UIElementFlags) {
            this.Flags |= flag;
            var node = this.Node;
            var lu: Fayde.LayoutUpdater;
            while ((node = node.VisualParentNode) && (lu = node.LayoutUpdater) && !lu._HasFlag(flag)) {
                lu.Flags |= flag;
            }
        }
        private _DoMeasureWithError(error: BError) {
        }
        private _DoArrangeWithError(error: BError) {
        }
        DoRender(ctx: Fayde.RenderContext, r: rect) {
        }
    }
    Nullstone.RegisterType(LayoutUpdater, "LayoutUpdater");
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
    Nullstone.RegisterType(NameScope, "NameScope");
}

module Fayde {
    export class StaticResourceExpression extends Expression {
        Key: any;
        Target: XamlObject;
        Property: DependencyProperty;
        PropertyName: string;
        constructor(key, target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: XamlObject) {
            super();
            this.Key = key;
            this.Target = target;
            this.Property = propd;
            this.PropertyName = propName;
        }
        GetValue(propd: DependencyProperty): any {
            return undefined;
        }
        private _GetValue(resChain: ResourceDictionary[]): any {
            var o: XamlObject;
            var key = this.Key;
            var len = resChain.length;
            for (var i = len - 1; i >= 0; i--) {
                o = resChain[i].Get(key);
                if (o)
                    return o;
            }
            var cur = this.Target;
            var rd: ResourceDictionary;
            var curNode = cur ? cur.XamlNode : null;
            while (curNode) {
                cur = curNode.XObject;
                if (cur instanceof FrameworkElement)
                    rd = (<FrameworkElement>cur).Resources;
                else if (cur instanceof ResourceDictionary)
                    rd = <ResourceDictionary>cur;
                if (rd && (o = rd.Get(key)))
                    return o;
                curNode = curNode.ParentNode;
            }
            return App.Instance.Resources.Get(key);
        }
        Resolve(parser: JsonParser, resChain: ResourceDictionary[]) {
            var isAttached = false;
            var ownerType;
            var propd = this.Property;
            if (propd) {
                isAttached = propd._IsAttached;
                ownerType = propd.OwnerType;
            }
            var value = this._GetValue(resChain);
            if (value instanceof ResourceTarget)
                value = value.CreateResource();
            if (!value)
                throw new XamlParseException("Could not resolve StaticResource: '" + this.Key.toString() + "'.");
            parser.TrySetPropertyValue(this.Target, propd, value, null, isAttached, ownerType, this.PropertyName);
        }
    }
    Nullstone.RegisterType(StaticResourceExpression, "StaticResourceExpression");
}

module Fayde {
    export class TemplateBindingExpression extends Expression {
        private _Target: DependencyObject;
        private _Listener: Providers.IPropertyChangedListener;
        SourceProperty: DependencyProperty;
        TargetProperty: DependencyProperty;
        TargetPropertyName: string;
        private _SetsParent: bool = false;
        constructor(sourcePropd: DependencyProperty, targetPropd: DependencyProperty, targetPropName) {
            super();
            this.SourceProperty = sourcePropd;
            this.TargetProperty = targetPropd;
            this.TargetPropertyName = targetPropName;
        }
        GetValue(propd: DependencyProperty) {
            var target = this._Target;
            var source = target.TemplateOwner;
            var value;
            if (source)
                value = source._Store.GetValue(this.SourceProperty);
            value = TypeConverter.ConvertObject(this.TargetProperty, value, (<any>target).constructor, true);
            return value;
        }
        OnAttached(dobj: DependencyObject) {
            super.OnAttached(dobj);
            this._Target = dobj;
            this._DetachListener();
            var cc: Controls.ContentControl;
            if (this._Target instanceof Controls.ContentControl)
                cc = <Controls.ContentControl>this._Target;
            if (cc && this.TargetProperty._ID === Controls.ContentControl.ContentProperty._ID) {
                this._SetsParent = cc._ContentSetsParent;
                cc._ContentSetsParent = false;
            }
            this._AttachListener();
        }
        OnDetached(dobj: DependencyObject) {
            super.OnDetached(dobj);
            var listener = this._Listener;
            if (!listener)
                return;
            var cc: Controls.ContentControl;
            if (this._Target instanceof Controls.ContentControl)
                cc = <Controls.ContentControl>this._Target;
            if (cc)
                cc._ContentSetsParent = this._SetsParent;
            this._DetachListener();
            this._Target = null;
        }
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if (this.SourceProperty._ID !== args.Property._ID)
                return;
            try {
                this.IsUpdating = true;
                var store = this._Target._Store;
                var targetProp = this.TargetProperty;
                try {
                    store.SetValue(targetProp, this.GetValue(null));
                } catch (err2) {
                    var val = targetProp.DefaultValue;
                    if (val === undefined)
                        val = targetProp._IsAutoCreated ? targetProp._AutoCreator.GetValue(targetProp, this._Target) : undefined;
                    store.SetValue(targetProp, val);
                }
            } catch (err) {
            } finally {
                this.IsUpdating = false;
            }
        }
        private _AttachListener() {
            var source = this._Target.TemplateOwner;
            if (!source)
                return;
            this._Listener = this;
            source._Store._SubscribePropertyChanged(this);
        }
        private _DetachListener() {
            var listener = this._Listener;
            if (!listener)
                return;
            this._Target.TemplateOwner._Store._UnsubscribePropertyChanged(listener);
            this._Listener = listener = null;
        }
    }
    Nullstone.RegisterType(TemplateBindingExpression, "TemplateBindingExpression");
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
            if (this.IsAttached === value)
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
    Nullstone.RegisterType(XamlNode, "XamlNode");
}

module Fayde {
    export class XamlObject {
        XamlNode: Fayde.XamlNode;
        TemplateOwner: DependencyObject = null;
        constructor() {
            this.XamlNode = this.CreateNode();
        }
        CreateNode(): XamlNode {
            return new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
    }
    Nullstone.RegisterType(XamlObject, "XamlObject");
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
    Nullstone.RegisterType(XamlObjectCollection, "XamlObjectCollection");
}

module Fayde.Providers {
    export class DefaultValueProvider implements IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return propd.DefaultValue;
        }
    }
    Nullstone.RegisterType(DefaultValueProvider, "DefaultValueProvider");
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
    Nullstone.RegisterType(AutoCreateProvider, "AutoCreateProvider");
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
    Nullstone.RegisterType(LocalValueProvider, "LocalValueProvider");
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
        _SubscribePropertyChanged(listener: Providers.IPropertyChangedListener) {
            var l = this._PropertyChangedListeners;
            if (l.indexOf(listener) < 0)
                l.push(listener);
        }
        _UnsubscribePropertyChanged(listener: Providers.IPropertyChangedListener) {
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
    Nullstone.RegisterType(BasicProviderStore, "BasicProviderStore");
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
    Nullstone.RegisterType(FrameworkElementDynamicProvider, "FrameworkElementDynamicProvider");
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
    Nullstone.RegisterType(ImplicitStyleProvider, "ImplicitStyleProvider");
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
    Nullstone.RegisterType(InheritedDataContextProvider, "InheritedDataContextProvider");
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
    Nullstone.RegisterType(InheritedIsEnabledProvider, "InheritedIsEnabledProvider");
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
    Nullstone.RegisterType(InheritedProvider, "InheritedProvider");
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
    Nullstone.RegisterType(InheritedProviderStore, "InheritedProviderStore");
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
    Nullstone.RegisterType(LocalStyleProvider, "LocalStyleProvider");
}

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression {
        private _Binding;
        get Binding() { return this._Binding; }
        _TryUpdateSourceObject(value) {
        }
    }
    Nullstone.RegisterType(BindingExpressionBase, "BindingExpressionBase");
}

class App {
    static Version: string = "0.9.4.0";
    static Instance: App;
    MainSurface: Surface;
    Resources: Fayde.ResourceDictionary;
    Loaded: MulticastEvent = new MulticastEvent();
    Address: Uri = null;
    NavService: Fayde.Navigation.NavService;
    private _IsRunning: bool = false;
    private _Storyboards: Fayde.IStoryboard[] = [];
    private _ClockTimer: Fayde.ClockTimer = new Fayde.ClockTimer();
    private static _GenericResourceDictionary: Fayde.ResourceDictionary = null;
    constructor() {
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
        this.Resources.XamlNode.NameScope = new Fayde.NameScope(true);
    }
    get RootVisual(): Fayde.UIElement {
        return this.MainSurface._TopLevel;
    }
    LoadResources(json: any) {
        Fayde.JsonParser.ParseResourceDictionary(this.Resources, json);
    }
    LoadInitial(canvas: HTMLCanvasElement, json: any) {
        this.Address = new Uri(document.URL);
        this.MainSurface.Register(canvas);
        this.NavService = new Fayde.Navigation.NavService(this);
        var element = Fayde.JsonParser.Parse(json);
        if (element instanceof Fayde.UIElement)
            this.MainSurface.Attach(<Fayde.UIElement>element);
        this.Start();
        this.EmitLoaded();
    }
    private EmitLoaded() {
        this.Loaded.RaiseAsync(this, EventArgs.Empty);
    }
    private Start() {
        this._ClockTimer.RegisterTimer(this);
    }
    private Tick(lastTime: number, nowTime: number) {
        this.ProcessStoryboards(lastTime, nowTime);
        this.Update();
        this.Render();
    }
    private Stop() {
        this._ClockTimer.UnregisterTimer(this);
    }
    private ProcessStoryboards(lastTime: number, nowTime: number) {
        var sbs = this._Storyboards;
        var len = sbs.length;
        for (var i = 0; i < len; i++) {
            sbs[i].Update(nowTime);
        }
    }
    private Update() {
        if (this._IsRunning)
            return;
        this._IsRunning = true;
        var updated = this.MainSurface.ProcessDirtyElements();
        this._IsRunning = false;
    }
    private Render() {
        this.MainSurface.Render();
    }
    RegisterStoryboard(storyboard: Fayde.IStoryboard) {
        var sbs = this._Storyboards;
        var index = sbs.indexOf(storyboard);
        if (index === -1)
            sbs.push(storyboard);
    }
    UnregisterStoryboard(storyboard: Fayde.IStoryboard) {
        var sbs = this._Storyboards;
        var index = sbs.indexOf(storyboard);
        if (index !== -1)
            sbs.splice(index, 1);
    }
    static GetGenericResourceDictionary(): Fayde.ResourceDictionary {
        var rd = App._GenericResourceDictionary;
        if (!rd)
            App._GenericResourceDictionary = rd = App.GetGenericResourceDictionaryImpl();
        return rd;
    }
    private static GetGenericResourceDictionaryImpl(): Fayde.ResourceDictionary { return undefined; }
}
Nullstone.RegisterType(App, "App");

module Fayde {
    export interface ITimerListener {
        Tick(lastTime: number, nowTime: number);
    }
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            (<any>window).webkitRequestAnimationFrame ||
            (<any>window).mozRequestAnimationFrame ||
            (<any>window).oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 200);
            };
    })();
    export class ClockTimer {
        private _Listeners: Fayde.ITimerListener[] = [];
        private _LastTime: number = 0;
        RegisterTimer(listener: Fayde.ITimerListener) {
            var ls = this._Listeners;
            var index = ls.indexOf(listener);
            if (index > -1)
                return;
            ls.push(listener);
            if (ls.length === 1)
                this._RequestAnimationTick();
        }
        UnregisterTimer(listener: Fayde.ITimerListener) {
            var ls = this._Listeners;
            var index = ls.indexOf(listener);
            if (index > -1)
                ls.splice(index, 1);
        }
        private _DoTick() {
            var nowTime = new Date().getTime();
            var lastTime = this._LastTime;
            this._LastTime = nowTime;
            var ls = this._Listeners;
            var len = ls.length;
            if (len === 0)
                return;
            for (var i = 0; i < len; i++) {
                ls[i].Tick(lastTime, nowTime);
            }
            this._RequestAnimationTick();
        }
        private _RequestAnimationTick() {
            requestAnimFrame(() => this._DoTick());
        }
    }
    Nullstone.RegisterType(ClockTimer, "ClockTimer");
}

class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
    }
}
Nullstone.RegisterType(Exception, "Exception");
class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(ArgumentException, "ArgumentException");
class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(InvalidOperationException, "InvalidOperationException");
class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(XamlParseException, "XamlParseException");
class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(NotSupportedException, "NotSupportedException");

module Fayde {
    export class RenderContext implements IRenderContext {
        CanvasContext: CanvasRenderingContext2D;
        CurrentTransform: number[] = null;
        private _Transforms: number[][] = [];
        constructor(ctx: CanvasRenderingContext2D) {
            this.CanvasContext = ctx;
            if (!ctx.hasOwnProperty("currentTransform")) {
                Object.defineProperty(ctx, "currentTransform", {
                    get: () => this.CurrentTransform,
                    set: (value: number[]) => {
                        ctx.setTransform(value[0], value[1], value[3], value[4], value[2], value[5]);
                        this.CurrentTransform = value;
                    }
                });
            }
        }
        DoRender(layers: Fayde.UINode[], r: rect) {
            this.Clear(r);
            this.CanvasContext.save();
            this.ClipRect(r);
            if (layers) {
                var len = layers.length;
                for (var i = 0; i < len; i++) {
                    layers[i].LayoutUpdater.DoRender(this, r);
                }
            }
            this.CanvasContext.restore();
        }
        Save() {
            this.CanvasContext.save();
            var ct = this.CurrentTransform;
            this._Transforms.push(ct);
            this.CurrentTransform = ct == null ? mat3.identity() : mat3.create(ct);
        }
        Restore() {
            var curXform = this._Transforms.pop();
            this.CurrentTransform = curXform;
            this.CanvasContext.restore();
        }
        ClipRect(r: rect) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            cc.clip();
        }
        ClipGeometry(g: Media.Geometry) {
            g.Draw(this);
            this.CanvasContext.clip();
        }
        ClipRawPath(p: any/* Change to Fayde.Shapes.RawPath */) {
            p.Draw(this);
            this.CanvasContext.clip();
        }
        IsPointInPath(p: Point): bool {
            return this.CanvasContext.isPointInPath(p.X, p.Y);
        }
        IsPointInClipPath(clip: Media.Geometry, p: Point): bool {
            clip.Draw(this);
            return this.CanvasContext.isPointInPath(p.X, p.Y);
        }
        Rect(r: rect) {
            var cc = this.CanvasContext;
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
        }
        Fill(brush: Media.Brush, r: rect) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
        }
        FillRect(brush: Media.Brush, r: rect) {
            var cc = this.CanvasContext;
            brush.SetupBrush(cc, r);
            cc.beginPath();
            cc.rect(r.X, r.Y, r.Width, r.Height);
            cc.fillStyle = brush.ToHtml5Object();
            cc.fill();
        }
        StrokeAndFillRect(strokeBrush: Media.Brush, thickness: number, strokeRect: rect, fillBrush: Media.Brush, fillRect: rect) {
            var cc = this.CanvasContext;
            strokeBrush.SetupBrush(cc, strokeRect);
            fillBrush.SetupBrush(cc, fillRect);
            cc.beginPath();
            cc.rect(fillRect.X, fillRect.Y, fillRect.Width, fillRect.Height);
            cc.fillStyle = fillBrush.ToHtml5Object();
            cc.fill();
            cc.lineWidth = thickness;
            cc.strokeStyle = strokeBrush.ToHtml5Object();
            cc.stroke();
        }
        Stroke(stroke: Media.Brush, thickness: number, region: rect) {
            var cc = this.CanvasContext;
            stroke.SetupBrush(cc, region);
            cc.lineWidth = thickness;
            cc.strokeStyle = stroke.ToHtml5Object();
            cc.stroke();
        }
        Clear(r: rect) {
            this.CanvasContext.clearRect(r.X, r.Y, r.Width, r.Height);
        }
        PreTransformMatrix(mat: number[]) {
            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct); //ct = ct * matrix
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
        }
        PreTransform(transform: Fayde.Media.Transform) {
            var v = transform.Value;
            var mat: number[];
            if (!v || !(mat = v._Raw))
                return;
            var ct = this.CurrentTransform;
            mat3.multiply(mat, ct, ct); //ct = ct * matrix
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
        }
        TransformMatrix(mat: number[]) {
            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct); //ct = matrix * ct
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
        }
        Transform(transform: Fayde.Media.Transform) {
            var v = transform.Value;
            var mat: number[];
            if (!v || !(mat = v._Raw))
                return;
            var ct = this.CurrentTransform;
            mat3.multiply(ct, mat, ct); //ct = matrix * ct
            var cc = this.CanvasContext;
            this.CanvasContext.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            this.CurrentTransform = ct;
        }
        Translate(x: number, y: number) {
            var ct = this.CurrentTransform;
            mat3.translate(ct, x, y);
            this.CanvasContext.translate(x, y);
        }
    }
    Nullstone.RegisterType(RenderContext, "RenderContext");
}

declare var Warn;
var resizeTimeout: number;
interface IFocusChangedEvents {
    GotFocus: Fayde.UINode[];
    LostFocus: Fayde.UINode[];
}
class Surface {
    static TestCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
    private _App: App;
    _TopLevel: Fayde.UIElement;
    private _Layers: Fayde.UINode[] = [];
    private _UpDirty: Fayde.LayoutUpdater[] = [];
    private _DownDirty: Fayde.LayoutUpdater[] = [];
    private _Canvas: HTMLCanvasElement = null;
    private _Ctx: CanvasRenderingContext2D = null;
    private _PercentageWidth: number = 0;
    private _PercentageHeight: number = 0;
    private _CanvasOffset: any = null;
    private _Extents: size = null;
    private _KeyInterop: Fayde.Input.KeyInterop;
    private _InputList: Fayde.UINode[] = [];
    private _FocusedNode: Fayde.UINode = null;
    private _FocusChangedEvents: IFocusChangedEvents[] = [];
    private _FirstUserInitiatedEvent: bool = false;
    private _UserInitiatedEvent: bool = false;
    private _Captured: Fayde.UINode = null;
    private _PendingCapture: Fayde.UINode = null;
    private _PendingReleaseCapture: bool = false;
    private _CurrentPos: Point = null;
    private _EmittingMouseEvent: bool = false;
    private _Cursor: string = Fayde.CursorType.Default;
    private _InvalidatedRect: rect;
    private _RenderContext: Fayde.RenderContext;
    constructor(app: App) {
        this._App = app;
        this._KeyInterop = Fayde.Input.KeyInterop.CreateInterop(this);
    }
    get Extents(): size {
        if (!this._Extents)
            this._Extents = size.fromRaw(this._Canvas.offsetWidth, this._Canvas.offsetHeight);
        return this._Extents;
    }
    Register(canvas: HTMLCanvasElement, width?: number, widthType?: string, height?: number, heightType?: string) {
        this._Canvas = canvas;
        this._Ctx = this._Canvas.getContext("2d");
        if (!width) {
            width = 100;
            widthType = "Percentage";
        } else if (!widthType) {
            widthType = "Percentage";
        }
        if (!height) {
            height = 100;
            heightType = "Percentage";
        } else if (!heightType) {
            heightType = "Percentage";
        }
        this._InitializeCanvas(canvas, width, widthType, height, heightType);
        this._CalculateOffset();
        this._RegisterEvents();
    }
    private _InitializeCanvas(canvas: HTMLCanvasElement, width, widthType, height, heightType) {
        var resizesWithWindow = false;
        if (widthType === "Percentage") {
            resizesWithWindow = true;
            this._PercentageWidth = width;
        } else {
            canvas.width = width;
        }
        if (heightType === "Percentage") {
            resizesWithWindow = true;
            this._PercentageHeight = height;
        } else {
            canvas.height = height;
        }
        if (resizesWithWindow) {
            this._ResizeCanvas();
            window.onresize = (e) => this._HandleResize(window.event ? <any>window.event : e);
        }
    }
    private _CalculateOffset() {
        var left = 0;
        var top = 0;
        var cur: HTMLElement = this._Canvas;
        if (cur.offsetParent) {
            do {
                left += cur.offsetLeft;
                top += cur.offsetTop;
            } while (cur = <HTMLElement>cur.offsetParent);
        }
        this._CanvasOffset = { left: left, top: top };
    }
    private _RegisterEvents() {
        var canvas = this._Canvas;
        canvas.addEventListener("mousedown", (e) => this._HandleButtonPress(window.event ? <any>window.event : e));
        canvas.addEventListener("mouseup", (e) => this._HandleButtonRelease(window.event ? <any>window.event : e));
        canvas.addEventListener("mouseout", (e) => this._HandleOut(window.event ? <any>window.event : e));
        canvas.addEventListener("mousemove", (e) => this._HandleMove(window.event ? <any>window.event : e));
        canvas.addEventListener("mousewheel", (e) => this._HandleWheel(window.event ? <any>window.event : e));
        canvas.addEventListener("DOMMouseScroll", (e) => this._HandleWheel(window.event ? <any>window.event : e));
        this._KeyInterop.RegisterEvents();
    }
    Attach(uie: Fayde.UIElement) {
        if (this._TopLevel)
            this._DetachLayer(this._TopLevel);
        if (!uie) {
            this._Invalidate();
            return;
        }
        if (!(uie instanceof Fayde.UIElement))
            throw new Exception("Unsupported top level element.");
        var un = uie.XamlNode;
        if (un.NameScope == null)
            un.NameScope = new Fayde.NameScope(true);
        else if (!un.NameScope.IsRoot)
            un.NameScope.IsRoot = true;
        this._TopLevel = uie;
        this._AttachLayer(uie);
    }
    private _AttachLayer(layer: Fayde.UIElement) {
        var n = layer.XamlNode;
        this._Layers.unshift(n);
        n.IsTopLevel = true;
        var lu = n.LayoutUpdater;
        lu.SetSurface(this);
        lu.FullInvalidate(true);
        lu.InvalidateMeasure();
        n.SetIsAttached(true);
        n.SetIsLoaded(true);
    }
    private _DetachLayer(layer: Fayde.UIElement) {
        var n = layer.XamlNode;
        n.IsTopLevel = false;
        var il = this._InputList;
        if (il[il.length - 1] === n)
            this._InputList = [];
        var f = this._FocusedNode;
        if (f) {
            while (f) {
                if (f === n) {
                    this._FocusNode();
                    break;
                }
                f = f.VisualParentNode;
            }
        }
        var index = this._Layers.indexOf(layer.XamlNode);
        if (index > -1)
            this._Layers.splice(index, 1);
        n.SetIsLoaded(false);
        n.SetIsAttached(false);
        this._Invalidate(n.LayoutUpdater.SubtreeBounds);
    }
    ProcessDirtyElements(): bool {
        var error = new BError();
        var dirty = this._UpdateLayout(error);
        if (error.Message)
            error.ThrowException();
        if (!dirty)
            return false;
        return true;
    }
    private _UpdateLayout(error: BError): bool {
        var maxPassCount = 250;
        var layers = this._Layers;
        if (!layers)
            return false;
        var pass = {
            MeasureList: [],
            ArrangeList: [],
            SizeList: [],
            Count: 0,
            Updated: true
        };
        var dirty = false;
        var updatedLayout = false;
        while (pass.Count < maxPassCount && pass.Updated) {
            pass.Updated = false;
            for (var i = 0; i < layers.length; i++) {
                var node = layers[i];
                var lu = node.LayoutUpdater;
                if (!lu.HasMeasureArrangeHint())
                    continue;
                var last = lu.PreviousConstraint;
                var available = size.clone(this.Extents);
                if (lu.IsContainer() && (!last || (!size.isEqual(last, available)))) {
                    lu.InvalidateMeasure();
                    lu.PreviousConstraint = available;
                }
                lu.UpdateLayer(pass, error);
            }
            dirty = dirty || this._DownDirty.length > 0 || this._UpDirty.length > 0;
            this._ProcessDownDirtyElements();
            this._ProcessUpDirtyElements();
            if (pass.Updated || dirty)
                updatedLayout = true;
        }
        if (pass.Count >= maxPassCount) {
            if (error)
                error.Message = "UpdateLayout has entered infinite loop and has been aborted.";
        }
        return updatedLayout;
    }
    private _ProcessDownDirtyElements() {
        var list = this._DownDirty;
        var lu: Fayde.LayoutUpdater;
        while ((lu = list[0])) {
            if (!lu.InDownDirty) {
                list.shift();
                continue;
            }
            var vp = lu.Node.VisualParentNode;
            if (vp && vp.LayoutUpdater.InDownDirty) {
                list.push(list.shift());
                continue;
            }
            if (lu.ProcessDown()) {
                lu.InDownDirty = false;
                list.shift();
            }
        }
        if (list.length > 0) {
            Warn("Finished DownDirty pass, not empty.");
        }
    }
    private _ProcessUpDirtyElements() {
        var list = this._UpDirty;
        var lu: Fayde.LayoutUpdater;
        while ((lu = list[0])) {
            if (!lu.InUpDirty) {
                list.shift();
                continue;
            }
            var childNodeIndex = this._GetChildNodeInUpListIndex(lu);
            if (childNodeIndex > -1) {
                list.splice(childNodeIndex + 1, 0, list.shift());
                continue;
            }
            if (lu.ProcessUp()) {
                lu.InUpDirty = false;
                list.shift();
            }
        }
        if (list.length > 0) {
            Warn("Finished UpDirty pass, not empty.");
        }
    }
    private _GetChildNodeInUpListIndex(lu: Fayde.LayoutUpdater): number {
        var list = this._UpDirty;
        var len = list.length;
        var node = lu.Node;
        for (var i = len - 1; i >= 0; i--) {
            var cur = list[i];
            if (cur.InUpDirty && cur.Node.VisualParentNode === node)
                return i;
        }
        return -1;
    }
    private _PropagateDirtyFlagToChildren(element, dirt) {
    }
    _AddDirtyElement(lu: Fayde.LayoutUpdater, dirt) {
        if (lu.Node.VisualParentNode == null && !lu.Node.IsTopLevel)
            return;
        lu.DirtyFlags |= dirt;
        if (dirt & _Dirty.DownDirtyState && !lu.InDownDirty) {
            this._DownDirty.push(lu);
            lu.InDownDirty = true;
        }
        if (dirt & _Dirty.UpDirtyState && !lu.InUpDirty) {
            this._UpDirty.push(lu);
            lu.InUpDirty = true;
        }
    }
    private _RemoveDirtyElement(lu: Fayde.LayoutUpdater) {
        lu.InUpDirty = false;
        lu.InDownDirty = false;
    }
    OnNodeDetached(lu: Fayde.LayoutUpdater) {
        this._RemoveDirtyElement(lu);
        this._RemoveFocusFrom(lu);
    }
    _Invalidate(r?: rect) {
        if (!r)
            r = rect.fromSize(this.Extents);
        if (!this._InvalidatedRect)
            this._InvalidatedRect = rect.clone(r);
        else
            rect.union(this._InvalidatedRect, r);
    }
    Render() {
        var r = this._InvalidatedRect;
        if (!r)
            return;
        if (!(r.Width > 0 && r.Height > 0))
            return;
        if (!this._RenderContext)
            this._RenderContext = new Fayde.RenderContext(this._Ctx);
        this._RenderContext.DoRender(this._Layers, r);
    }
    private _HandleResize(evt) {
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this._HandleResizeTimeout(evt), 20);
    }
    private _HandleResizeTimeout(evt) {
        this._ResizeCanvas();
        this._Extents = null;
        var layers = this._Layers;
        var len = layers.length;
        var node: Fayde.UINode;
        for (var i = 0; i < len; i++) {
            node = layers[i];
            node.LayoutUpdater.InvalidateMeasure();
        }
        resizeTimeout = null;
    }
    private _ResizeCanvas() {
        var width = this._PercentageWidth;
        var height = this._PercentageHeight;
        if (width != null)
            this._Canvas.width = window.innerWidth * width / 100.0;
        if (height != null)
            this._Canvas.height = window.innerHeight * height / 100.0;
    }
    private _UpdateCursorFromInputList() {
        var newCursor = Fayde.CursorType.Default;
        var list = this._InputList;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            newCursor = list[i].XObject.Cursor;
            if (newCursor !== Fayde.CursorType.Default)
                break;
        }
        this._SetCursor(newCursor);
    }
    private _SetCursor(cursor: string) {
        this._Cursor = cursor;
        this._Canvas.style.cursor = cursor;
    }
    _HandleKeyDown(args): bool {
        this._SetUserInitiatedEvent(true);
        Fayde.Input.Keyboard.RefreshModifiers(args);
        var handled = false;
        if (this._FocusedNode) {
            var focusToRoot = Surface._ElementPathToRoot(this._FocusedNode);
            handled = this._EmitKeyDown(focusToRoot, args);
        }
        if (!handled && args.Key === Fayde.Input.Key.Tab) {
            if (this._FocusedNode)
                Fayde.TabNavigationWalker.Focus(this._FocusedNode, args.Shift);
            else
                this._EnsureElementFocused();
        }
        this._SetUserInitiatedEvent(false);
        return handled;
    }
    private _EmitKeyDown(list: Fayde.UINode[], args, endIndex?: number) {
        if (endIndex === 0)
            return;
        if (!endIndex || endIndex === -1)
            endIndex = list.length;
        var i = 0;
        var cur = list.shift();
        while (cur && i < endIndex) {
            cur._EmitKeyDown(args);
            cur = list.shift();
            i++;
        }
        return args.Handled;
    }
    private _HandleButtonPress(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var button = evt.which ? evt.which : evt.button;
        var pos = this._GetMousePosition(evt);
        this._SetUserInitiatedEvent(true);
        this._HandleMouseEvent("down", button, pos);
        this._UpdateCursorFromInputList();
        this._SetUserInitiatedEvent(false);
    }
    private _HandleButtonRelease(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var button = evt.which ? evt.which : evt.button;
        var pos = this._GetMousePosition(evt);
        this._SetUserInitiatedEvent(true);
        this._HandleMouseEvent("up", button, pos);
        this._UpdateCursorFromInputList();
        this._SetUserInitiatedEvent(false);
        if (this._Captured)
            this._PerformReleaseCapture();
    }
    private _HandleOut(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var pos = this._GetMousePosition(evt);
        this._HandleMouseEvent("out", null, pos);
    }
    private _HandleMove(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var pos = this._GetMousePosition(evt);
        this._HandleMouseEvent("move", null, pos);
        this._UpdateCursorFromInputList();
    }
    private _HandleWheel(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var delta = 0;
        if (evt.wheelDelta)
            delta = evt.wheelDelta / 120;
        else if (evt.detail)
            delta = -evt.detail / 3;
        if (evt.preventDefault)
            evt.preventDefault();
        evt.returnValue = false;
        this._HandleMouseEvent("wheel", null, this._GetMousePosition(evt), delta);
        this._UpdateCursorFromInputList();
    }
    private _HandleMouseEvent(type: string, button: number, pos: Point, delta?: number, emitLeave?: bool, emitEnter?: bool) {
        this._CurrentPos = pos;
        if (this._EmittingMouseEvent)
            return false;
        if (this._TopLevel == null)
            return false;
        this._EmittingMouseEvent = true;
        if (this._Captured) {
            this._EmitMouseList(type, button, pos, delta, this._InputList);
        } else {
            this.ProcessDirtyElements();
            var ctx = this._RenderContext;
            var newInputList: Fayde.UINode[] = [];
            var layers = this._Layers;
            var layerCount = layers.length;
            for (var i = layerCount - 1; i >= 0 && newInputList.length === 0; i--) {
                var layer = layers[i];
                layer._HitTestPoint(ctx, pos, newInputList);
            }
            var indices = { Index1: -1, Index2: -1 };
            this._FindFirstCommonElement(this._InputList, newInputList, indices);
            if (emitLeave === undefined || emitLeave === true)
                this._EmitMouseList("leave", button, pos, delta, this._InputList, indices.Index1);
            if (emitEnter === undefined || emitEnter === true)
                this._EmitMouseList("enter", button, pos, delta, newInputList, indices.Index2);
            if (type !== "noop")
                this._EmitMouseList(type, button, pos, delta, newInputList);
            this._InputList = newInputList;
        }
        if (this._PendingCapture)
            this._PerformCapture(this._PendingCapture);
        if (this._PendingReleaseCapture || (this._Captured && !this._Captured.CanCaptureMouse()))
            this._PerformReleaseCapture();
        this._EmittingMouseEvent = false;
    }
    private _GetMousePosition(evt): Point {
        return new Point(
            evt.clientX + window.pageXOffset + this._CanvasOffset.left,
            evt.clientY + window.pageYOffset + this._CanvasOffset.top);
    }
    private _FindFirstCommonElement(list1: Fayde.UINode[], list2: Fayde.UINode[], outObj) {
        var len1 = list1.length;
        var len2 = list2.length;
        outObj.Index1 = -1;
        outObj.Index2 = -1;
        var i = 0;
        var j = 0;
        for (i = 0; i < len1 && j < len2; i++, j++) {
            var n1 = list1[i];
            var n2 = list2[i];
            if (n1 !== n2)
                return;
            outObj.Index1 = i;
            outObj.Index2 = j;
        }
    }
    private _EmitMouseList(type: string, button: number, pos: Point, delta: number, list: Fayde.UINode[], endIndex?: number) {
        var handled = false;
        if (endIndex === 0)
            return handled;
        if (!endIndex || endIndex === -1)
            endIndex = list.length;
        var args = this._CreateEventArgs(type, pos, delta);
        var node = list[0];
        if (node && args instanceof Fayde.RoutedEventArgs)
            args.Source = node.XObject;
        var isL = Surface.IsLeftButton(button);
        var isR = Surface.IsRightButton(button);
        for (var i = 0; i < endIndex; i++) {
            node = list[i];
            if (type === "leave")
                args.Source = node.XObject;
            if (node._EmitMouseEvent(type, isL, isR, args))
                handled = true;
            if (type === "leave") //MouseLeave gets new event args on each emit
                args = this._CreateEventArgs(type, pos, delta);
        }
        return handled;
    }
    private _CreateEventArgs(type: string, pos: Point, delta: number): Fayde.Input.MouseEventArgs {
        if (type === "up") {
            return new Fayde.Input.MouseButtonEventArgs(pos);
        } else if (type === "down") {
            return new Fayde.Input.MouseButtonEventArgs(pos);
        } else if (type === "leave") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "enter") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "move") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "wheel") {
            return new Fayde.Input.MouseWheelEventArgs(pos, delta);
        }
    }
    SetMouseCapture(uin: Fayde.UINode) {
        if (this._Captured || this._PendingCapture)
            return uin === this._Captured || uin === this._PendingCapture;
        if (!this._EmittingMouseEvent)
            return false;
        this._PendingCapture = uin;
        return true;
    }
    ReleaseMouseCapture(uin: Fayde.UINode) {
        if (uin !== this._Captured && uin !== this._PendingCapture)
            return;
        if (this._EmittingMouseEvent)
            this._PendingReleaseCapture = true;
        else
            this._PerformReleaseCapture();
    }
    private _PerformCapture(uin: Fayde.UINode) {
        this._Captured = uin;
        var newInputList = [];
        while (uin != null) {
            newInputList.push(uin);
            uin = uin.VisualParentNode;
        }
        this._InputList = newInputList;
        this._PendingCapture = null;
    }
    private _PerformReleaseCapture() {
        var oldCaptured = this._Captured;
        this._Captured = null;
        this._PendingReleaseCapture = false;
        oldCaptured._EmitLostMouseCapture(this._CurrentPos);
        this._HandleMouseEvent("noop", null, this._CurrentPos, undefined, false, true);
    }
    private _SetUserInitiatedEvent(val: bool) {
        this._EmitFocusChangeEvents();
        this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
        this._UserInitiatedEvent = val;
    }
    Focus(ctrl: Fayde.Controls.Control, recurse?: bool): bool {
        recurse = recurse === undefined || recurse === true;
        if (!ctrl.XamlNode.IsAttached)
            return false;
        var surface = App.Instance.MainSurface;
        var walker = Fayde.DeepTreeWalker(ctrl);
        var uin: Fayde.UINode;
        while (uin = walker.Step()) {
            if (uin.XObject.Visibility !== Fayde.Visibility.Visible) {
                walker.SkipBranch();
                continue;
            }
            if (!(uin instanceof Fayde.Controls.ControlNode))
                continue;
            var cn = <Fayde.Controls.ControlNode>uin;
            var c = cn.XObject;
            if (!c.IsEnabled) {
                if (!recurse)
                    return false;
                walker.SkipBranch();
                continue;
            }
            var loaded = false;
            for (var check = <Fayde.UINode>ctrl.XamlNode; !loaded && check != null; check = check.VisualParentNode)
                loaded = loaded || check.IsLoaded;
            if (loaded && cn.LayoutUpdater.GetRenderVisible() && c.IsTabStop)
                return this._FocusNode(cn);
            if (!recurse)
                return false;
        }
        return false;
    }
    private _FocusNode(uin?: Fayde.UINode) {
        if (uin === this._FocusedNode)
            return true;
        var fn = this._FocusedNode;
        if (fn) {
            this._FocusChangedEvents.push({
                LostFocus: Surface._ElementPathToRoot(fn),
                GotFocus: null
            });
        }
        this._FocusedNode = uin;
        if (uin) {
            this._FocusChangedEvents.push({
                LostFocus: null,
                GotFocus: Surface._ElementPathToRoot(uin)
            });
        }
        if (this._FirstUserInitiatedEvent)
            this._EmitFocusChangeEventsAsync();
        return true;
    }
    private _EnsureElementFocused() {
        var layers = this._Layers;
        if (!this._FocusedNode) {
            var last = layers.length - 1;
            for (var i = last; i >= 0; i--) {
                if (Fayde.TabNavigationWalker.Focus(layers[i]))
                    break;
            }
            if (!this._FocusedNode && last !== -1)
                this._FocusNode(layers[last]);
        }
        if (this._FirstUserInitiatedEvent)
            this._EmitFocusChangeEventsAsync();
    }
    private _RemoveFocusFrom(lu: Fayde.LayoutUpdater) {
        if (this._FocusedNode === lu.Node)
            this._FocusNode(null);
    }
    private _EmitFocusChangeEventsAsync() {
        setTimeout(() => this._EmitFocusChangeEvents(), 1);
    }
    private _EmitFocusChangeEvents() {
        var evts = this._FocusChangedEvents;
        var cur = evts.shift();
        while (cur) {
            this._EmitFocusList("lost", cur.LostFocus);
            this._EmitFocusList("got", cur.GotFocus);
            cur = evts.shift();
        }
    }
    private _EmitFocusList(type: string, list: Fayde.UINode[]) {
        if (!list)
            return;
        var cur = list.shift();
        while (cur) {
            cur._EmitFocusChange(type);
            cur = list.shift();
        }
    }
    private static _ElementPathToRoot(source: Fayde.UINode): Fayde.UINode[] {
        var list: Fayde.UINode[] = [];
        while (source) {
            list.push(source);
            source = source.VisualParentNode;
        }
        return list;
    }
    private static IsLeftButton(button: number): bool {
        return button === 1;
    }
    private static IsRightButton(button: number): bool {
        return button === 2;
    }
}
Nullstone.RegisterType(Surface, "Surface");

module Fayde.Input {
    export enum KeyboardNavigationMode {
        Continue = 0,
        Once = 1,
        Cycle = 2,
        None = 3,
        Contained = 4,
        Local = 5,
    }
    export enum ModifierKeys {
        None = 0,
        Alt = 1,
        Control = 2,
        Shift = 4,
        Windows = 8,
        Apple = 16,
    }
    export interface IModifiersOn {
        Shift: bool;
        Ctrl: bool;
        Alt: bool;
    }
    export class Keyboard {
        static Modifiers: ModifierKeys = ModifierKeys.None;
        static RefreshModifiers(e: Fayde.Input.IModifiersOn) {
            if (e.Shift)
                Keyboard.Modifiers |= ModifierKeys.Shift;
            else
                Keyboard.Modifiers &= ~ModifierKeys.Shift;
            if (e.Ctrl)
                Keyboard.Modifiers |= ModifierKeys.Control;
            else
                Keyboard.Modifiers &= ~ModifierKeys.Control;
            if (e.Alt)
                Keyboard.Modifiers |= ModifierKeys.Alt;
            else
                Keyboard.Modifiers &= ~ModifierKeys.Alt;
        }
        static HasControl() {
            return (Keyboard.Modifiers & ModifierKeys.Control) === ModifierKeys.Control;
        }
        static HasAlt() {
            return (Keyboard.Modifiers & ModifierKeys.Alt) === ModifierKeys.Alt;
        }
        static HasShift() {
            return (Keyboard.Modifiers & ModifierKeys.Shift) === ModifierKeys.Shift;
        }
    }
    Nullstone.RegisterType(Keyboard, "Keyboard");
}

module Fayde {
    export interface IAttachedDefinition {
        Owner: Function;
        Prop: string;
        Value: any;
    }
    function isArray(o) {
        if (Array.isArray)
            return Array.isArray(o);
        return o && o.constructor === Array;
    }
    export class JsonParser {
        private _ResChain: Fayde.ResourceDictionary[] = [];
        private _RootXamlObject: XamlObject = null;
        private _TemplateBindingSource: DependencyObject = null;
        private _SRExpressions: any[] = [];
        static Parse(json: any, templateBindingSource?: DependencyObject, namescope?: NameScope, resChain?: Fayde.ResourceDictionary[], rootXamlObject?: XamlObject): XamlObject {
            var parser = new JsonParser();
            if (resChain)
                parser._ResChain = resChain;
            parser._TemplateBindingSource = templateBindingSource;
            parser._RootXamlObject = rootXamlObject;
            if (!namescope)
                namescope = new Fayde.NameScope();
            var xobj = parser.CreateObject(json, namescope);
            return xobj;
        }
        static ParseUserControl(uc: Controls.UserControl, json: any) {
            var parser = new JsonParser();
            parser._RootXamlObject = uc;
            parser.SetObject(json, uc, new Fayde.NameScope(true));
        }
        static ParseResourceDictionary(rd: Fayde.ResourceDictionary, json: any) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser.SetObject(json, rd, rd.XamlNode.NameScope);
        }
        CreateObject(json: any, namescope: NameScope, ignoreResolve?: bool): XamlObject {
            var type = json.ParseType;
            if (!type)
                return json;
            if (type === Number || type === String || type === Boolean)
                return json.Value;
            if (type === Controls.ControlTemplate) {
                var targetType = json.Props == null ? null : json.Props.TargetType;
                return new Controls.ControlTemplate(targetType, json.Content, this._ResChain);
            }
            if (type === DataTemplate)
                return new DataTemplate(json.Content, this._ResChain);
            var xobj = new type();
            if (!this._RootXamlObject)
                this._RootXamlObject = xobj;
            this.SetObject(json, xobj, namescope, ignoreResolve);
            return xobj;
        }
        SetObject(json: any, xobj: XamlObject, namescope: NameScope, ignoreResolve?: bool) {
            if (xobj && namescope)
                xobj.XamlNode.NameScope = namescope;
            var name = json.Name;
            if (name)
                xobj.XamlNode.SetName(name);
            xobj.TemplateOwner = this._TemplateBindingSource;
            var dobj: DependencyObject;
            if (xobj instanceof DependencyObject)
                dobj = <DependencyObject>xobj;
            var type = json.ParseType;
            var propd: DependencyProperty;
            var propValue;
            if (json.Props) {
                for (var propName in json.Props) {
                    propValue = json.Props[propName];
                    if (propValue === undefined)
                        continue;
                    var ctor = (<any>xobj).constructor;
                    if (dobj)
                        propd = DependencyProperty.GetDependencyProperty(ctor, propName);
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, false, ctor, propName);
                }
            }
            var attachedProps: IAttachedDefinition[] = json.AttachedProps;
            if (attachedProps) {
                if (!isArray(attachedProps))
                    throw new Exception("json.AttachedProps is not an array");
                for (var i in attachedProps) {
                    var attachedDef: IAttachedDefinition = attachedProps[i];
                    propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
                    propValue = attachedDef.Value;
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, true, attachedDef.Owner, attachedDef.Prop);
                }
            }
            if (json.Events) {
                for (var i in json.Events) {
                    var targetEvent = xobj[i];
                    if (!targetEvent || !(targetEvent instanceof MulticastEvent))
                        throw new ArgumentException("Could not locate event '" + i + "' on object '" + type._TypeName + "'.");
                    var root = this._RootXamlObject;
                    var callbackName = json.Events[i];
                    var targetCallback = root[callbackName];
                    if (!targetCallback || typeof targetCallback !== "function")
                        throw new ArgumentException("Could not locate event callback '" + callbackName + "' on object '" + (<any>root).constructor._TypeName + "'.");
                    targetEvent.Subscribe(targetCallback, root);
                }
            }
            var contentProp = this.GetAnnotationMember(type, "ContentProperty");
            var pd: DependencyProperty;
            var pn: string;
            if (contentProp) {
                if (contentProp instanceof DependencyProperty) {
                    pd = contentProp;
                    pn = pd.Name;
                } else if (typeof contentProp === "string") {
                    pn = contentProp;
                }
                var content = json.Content;
                if (content) {
                    if (content instanceof Markup)
                        content = content.Transmute(xobj, contentProp, "Content", this._TemplateBindingSource);
                    else
                        content = this.CreateObject(content, namescope, true);
                    this.SetValue(xobj, pd, pn, content);
                }
            }
            if (json.Children) {
                this.TrySetCollectionProperty(<any[]>json.Children, xobj, pd, pn, namescope);
            }
            if (!ignoreResolve) {
                this.ResolveStaticResourceExpressions();
            }
        }
        TrySetPropertyValue(xobj: XamlObject, propd: DependencyProperty, propValue: any, namescope: NameScope, isAttached: bool, ownerType: Function, propName: string) {
            if (propValue.ParseType) {
                propValue = this.CreateObject(propValue, namescope, true);
            }
            if (propValue instanceof Markup)
                propValue = propValue.Transmute(xobj, propd, propName, this._TemplateBindingSource);
            if (propValue instanceof StaticResourceExpression) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            }
            if (propd) {
                if (this.TrySetCollectionProperty(propValue, xobj, propd, undefined, namescope))
                    return;
                if (!(propValue instanceof Fayde.Expression)) {
                    var targetType = propd.GetTargetType();
                    if (!(propValue instanceof targetType)) {
                        var propDesc = Nullstone.GetPropertyDescriptor(xobj, propName);
                        if (propDesc) {
                            var setFunc = propDesc.set;
                            var converter: (val: any) => any;
                            if (setFunc && (converter = (<any>setFunc).Converter) && converter instanceof Function)
                                propValue = converter(propValue);
                        }
                    }
                }
                this.SetValue(xobj, propd, propName, propValue);
            } else if (!isAttached) {
                if (Nullstone.HasProperty(xobj, propName)) {
                    xobj[propName] = propValue;
                } else {
                    var func = xobj["Set" + propName];
                    if (func && func instanceof Function)
                        func.call(xobj, propValue);
                }
            } else {
                Warn("Could not find attached property: " + (<any>ownerType)._TypeName + "." + propName);
            }
        }
        TrySetCollectionProperty(subJson: any[], xobj: XamlObject, propd: DependencyProperty, propertyName: string, namescope: NameScope) {
            if (!subJson)
                return false;
            if (!((Array.isArray && Array.isArray(subJson)) || (<any>subJson).constructor === Array))
                return false;
            var coll: XamlObjectCollection;
            if (propd) {
                var targetType = propd.GetTargetType();
                if (!Nullstone.DoesInheritFrom(targetType, XamlObjectCollection))
                    return false;
                if (propd._IsAutoCreated) {
                    coll = (<DependencyObject>xobj).GetValue(propd);
                } else {
                    coll = <XamlObjectCollection>(new <any>targetType());
                    (<DependencyObject>xobj).SetValue(propd, coll);
                }
            } else if (typeof propertyName === "string") {
                coll = xobj[propertyName];
            } else if (xobj instanceof XamlObjectCollection) {
                coll = <XamlObjectCollection>xobj;
            }
            if (!(coll instanceof XamlObjectCollection))
                return false;
            if (coll instanceof ResourceDictionary) {
                this.SetResourceDictionary(<ResourceDictionary>coll, subJson, namescope);
            } else {
                for (var i = 0; i < subJson.length; i++) {
                    coll.Add(this.CreateObject(subJson[i], namescope, true));
                }
            }
            return true;
        }
        SetResourceDictionary(rd: ResourceDictionary, subJson: any[], namescope: NameScope) {
            var oldChain = this._ResChain;
            this._ResChain = this._ResChain.slice(0);
            this._ResChain.push(rd);
            var fobj: XamlObject;
            var cur: any;
            var key: any;
            var val: any;
            for (var i = 0; i < subJson.length; i++) {
                cur = subJson[i];
                key = cur.Key;
                val = cur.Value;
                if (val.ParseType === Style) {
                    fobj = this.CreateObject(val, namescope, true);
                    if (!key)
                        key = (<Style>fobj).TargetType;
                } else {
                    fobj = new ResourceTarget(val, namescope, this._TemplateBindingSource, this._ResChain);
                }
                if (key)
                    rd.Set(key, fobj);
            }
            this._ResChain = oldChain;
        }
        ResolveStaticResourceExpressions() {
            var srs = this._SRExpressions;
            if (!srs || srs.length === 0)
                return;
            var cur: any;
            while (cur = srs.shift()) {
                cur.Resolve(this);
            }
        }
        SetValue(xobj:XamlObject, propd: DependencyProperty, propName: string, value: any) {
            if (propd) {
                if (value instanceof StaticResourceExpression) {
                    this._SRExpressions.push(value);
                    (<DependencyObject>xobj).SetValueInternal(propd, new DeferredValueExpression());
                } else if (value instanceof Expression) {
                    (<DependencyObject>xobj).SetValueInternal(propd, value);
                } else {
                    (<DependencyObject>xobj)._Store.SetValue(propd, value);
                }
            } else if (propName) {
                xobj[propName] = value;
            }
        }
        private GetAnnotationMember(type: Function, member: string) {
            if (!type)
                return;
            var t = <any>type;
            var anns = t.Annotations;
            var annotation;
            if (anns && (annotation = anns[member]))
                return annotation;
            return this.GetAnnotationMember(t._BaseClass, member);
        }
    }
    Nullstone.RegisterType(JsonParser, "JsonParser");
}

module Fayde {
    export class Markup {
        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject) {
        }
    }
    Nullstone.RegisterType(Markup, "Markup");
}

module Fayde {
    export class StaticResourceMarkup extends Markup {
        Key: any;
        constructor(key: any) {
            super();
            this.Key = key;
        }
        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject) {
            return new StaticResourceExpression(this.Key, target, propd, propName, templateBindingSource);
        }
    }
    Nullstone.RegisterType(StaticResourceMarkup, "StaticResourceMarkup");
}

module Fayde {
    export class TemplateBindingMarkup extends Markup {
        Path: string;
        constructor(path: string) {
            super();
            this.Path = path;
        }
        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject) {
            var sourcePropd = DependencyProperty.GetDependencyProperty((<any>templateBindingSource).constructor, this.Path);
            return new TemplateBindingExpression(sourcePropd, propd, propName);
        }
    }
    Nullstone.RegisterType(TemplateBindingMarkup, "TemplateBindingMarkup");
}

module Fayde.Media {
    export class Geometry {
        GetBounds(): rect {
            return new rect();
        }
        Draw(ctx: Fayde.RenderContext) {
        }
    }
    Nullstone.RegisterType(Geometry, "Geometry");
}

module Fayde.Media {
    export interface IMatrixChangedListener {
        MatrixChanged(newMatrix: Matrix);
    }
    export class Matrix {
        _Raw: number[];
        private _Inverse: Matrix = null;
        private _Listener: IMatrixChangedListener;
        get M11() { return this._Raw[0]; }
        set M11(val: number) { this._Raw[0] = val; this._OnChanged(); }
        get M12() { return this._Raw[1]; }
        set M12(val: number) { this._Raw[1] = val; this._OnChanged(); }
        get M21() { return this._Raw[3]; }
        set M21(val: number) { this._Raw[3] = val; this._OnChanged(); }
        get M22() { return this._Raw[4]; }
        set M22(val: number) { this._Raw[4] = val; this._OnChanged(); }
        get OffsetX() { return this._Raw[2]; }
        set OffsetX(val: number) { this._Raw[2] = val; this._OnChanged(); }
        get OffsetY() { return this._Raw[5]; }
        set OffsetY(val: number) { this._Raw[5] = val; this._OnChanged(); }
        get Inverse(): Matrix {
            var inverse = this._Inverse;
            if (!inverse) {
                var i = mat3.identity();
                mat3.inverse(this._Raw, i);
                if (!i)
                    return;
                inverse = new Matrix();
                inverse._Raw = i;
                this._Inverse = inverse;
            }
            return inverse;
        }
        Listen(listener: IMatrixChangedListener) {
            this._Listener = listener;
        }
        Unlisten(listener: IMatrixChangedListener) {
            this._Listener = null;
        }
        private _OnChanged() {
            this._Inverse = null;
            var listener = this._Listener;
            if (listener)
                listener.MatrixChanged(this);
        }
        toString(): string { return mat3.str(this._Raw); }
    }
    Nullstone.RegisterType(Matrix, "Matrix");
}

module Fayde.Media {
    export class Projection {
    }
    Nullstone.RegisterType(Projection, "Projection");
}

module Fayde.Media.Effects {
    export class Effect {
    }
    Nullstone.RegisterType(Effect, "Effect");
}

module Fayde.Navigation {
    export class NavService {
        App: App;
        Href: string;
        Hash: string;
        LocationChanged: MulticastEvent = new MulticastEvent();
        constructor(app: App) {
            this.App = app;
            this.Href = window.location.href;
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
                this.Href = this.Href.substring(0, this.Href.indexOf('#'));
            }
            window.onhashchange = () => this._HandleFragmentChange();
        }
        private _HandleFragmentChange() {
            this.App.Address = new Uri(document.URL);
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
            }
            this.LocationChanged.Raise(this, EventArgs.Empty);
        }
    }
    Nullstone.RegisterType(NavService, "NavService");
}

class Clip {
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
Nullstone.RegisterType(Clip, "Clip");

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
Nullstone.RegisterType(Color, "Color");

class CornerRadius {
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
Nullstone.RegisterType(CornerRadius, "CornerRadius");

enum DurationType {
    Automatic = 0,
    Forever = 1,
    TimeSpan = 2,
}
class Duration {
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
Nullstone.RegisterType(Duration, "Duration");

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
Nullstone.RegisterType(Font, "Font");

class FontFamily {
    constructor(public FamilyNames: string) {
    }
    toString(): string {
        return this.FamilyNames;
    }
}
Nullstone.RegisterType(FontFamily, "FontFamily");

class KeyTime {
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
Nullstone.RegisterType(KeyTime, "KeyTime");

class Point {
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
Nullstone.RegisterType(Point, "Point");

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
    static transform(dest: rect, xform: number[]): rect {
        if (!xform)
            return dest;
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
        return dest;
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
    static transform4(dest: rect, projection: number[]): rect {
        if (!projection)
            return dest;
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
        return dest;
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
Nullstone.RegisterType(rect, "rect");

class size {
    Width: number = 0;
    Height: number = 0;
    toString(): string {
        return "{" + this.Width + "," + this.Height + "}";
    }
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
Nullstone.RegisterType(size, "size");

class Thickness {
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
Nullstone.RegisterType(Thickness, "Thickness");

class TimeSpan {
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
Nullstone.RegisterType(TimeSpan, "TimeSpan");

class Uri {
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
Nullstone.RegisterType(Uri, "Uri");

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
Nullstone.RegisterType(BError, "BError");

class Enum {
    constructor(public Object: any) {
    }
}
Nullstone.RegisterType(Enum, "Enum");

class EventArgs {
    static Empty: EventArgs = new EventArgs();
}
Nullstone.RegisterType(EventArgs, "EventArgs");

class MulticastEvent {
    Raise(sender: any, args: EventArgs) {
    }
    RaiseAsync(sender: any, args: EventArgs) {
    }
}
Nullstone.RegisterType(MulticastEvent, "MulticastEvent");

module Fayde {
    export class DeferredValueExpression extends Expression {
        GetValue(propd: DependencyProperty): any {
            return undefined;
        }
    }
    Nullstone.RegisterType(DeferredValueExpression, "DeferredValueExpression");
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
    Nullstone.RegisterType(DependencyObject, "DependencyObject");
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
    Nullstone.RegisterType(DependencyObjectCollection, "DependencyObjectCollection");
}

module Fayde {
    export class FrameworkTemplate extends XamlObject {
        GetVisualTree(bindingSource: DependencyObject): XamlObject {
            var error = new BError();
            var vt = this._GetVisualTreeWithError(bindingSource, error);
            if (error.Message)
                error.ThrowException();
            return vt;
        }
        _GetVisualTreeWithError(templateBindingSource: DependencyObject, error: BError): XamlObject {
            error.Message = "Abstract Method";
            return undefined;
        }
    }
    Nullstone.RegisterType(FrameworkTemplate, "FrameworkTemplate");
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
    Nullstone.RegisterType(ResourceDictionaryCollection, "ResourceDictionaryCollection");
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
    Nullstone.RegisterType(ResourceDictionary, "ResourceDictionary");
}

module Fayde {
    export class ResourceTarget extends XamlObject {
        private _Json: any;
        private _Namescope: NameScope;
        private _TemplateBindingSource: DependencyObject;
        private _ResChain: ResourceDictionary[];
        constructor(json: any, namescope: NameScope, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]) {
            super();
            this._Json = json;
            this._Namescope = namescope;
            this._TemplateBindingSource = templateBindingSource;
            this._ResChain = resChain;
        }
        CreateResource(): XamlObject {
            return JsonParser.Parse(this._Json, this._TemplateBindingSource, this._Namescope, this._ResChain);
        }
    }
    Nullstone.RegisterType(ResourceTarget, "ResourceTarget");
}

module Fayde {
    export class RoutedEvent extends MulticastEvent {
        Raise(sender: any, args: RoutedEventArgs) {
        }
    }
    Nullstone.RegisterType(RoutedEvent, "RoutedEvent");
}

module Fayde {
    export class RoutedEventArgs extends EventArgs {
        Handled: bool = false;
        Source: any = null;
    }
    Nullstone.RegisterType(RoutedEventArgs, "RoutedEventArgs");
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
    Nullstone.RegisterType(SetterCollection, "SetterCollection");
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
    Nullstone.RegisterType(Setter, "Setter");
}

module Fayde {
    export class SizeChangedEventArgs extends RoutedEventArgs {
        PreviousSize: size;
        NewSize: size;
        constructor(previousSize: size, newSize: size) {
            super();
            Object.defineProperty(this, "PreviousSize", {
                get: function () { return size.clone(previousSize); }
            });
            Object.defineProperty(this, "NewSize", {
                get: function () { return size.clone(newSize); }
            });
        }
    }
    Nullstone.RegisterType(SizeChangedEventArgs, "SizeChangedEventArgs");
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
    Nullstone.RegisterType(Style, "Style");
}

module Fayde.Providers {
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
            if (!styles)
                styles = this._GetImplicitStyles(styleMask);
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
        private _GetImplicitStyles(styleMask: _StyleMask): Style[] {
            var fe = <FrameworkElement>this._Object;
            var feType = (<any>fe).constructor;
            var feTypeName = (<any>fe)._TypeName;
            var genericXamlStyle: Style = undefined;
            if ((styleMask & _StyleMask.GenericXaml) != 0) {
                if (fe instanceof Controls.Control) {
                    genericXamlStyle = (<Controls.Control>fe).GetDefaultStyle();
                    if (!genericXamlStyle) {
                        var styleKey = fe.DefaultStyleKey;
                        if (styleKey)
                            genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
                    }
                }
            }
            var appResourcesStyle: Style = undefined;
            var rd = App.Instance.Resources;
            if ((styleMask & _StyleMask.ApplicationResources) != 0) {
                appResourcesStyle = <Style>rd.Get(feType);
                if (!appResourcesStyle)
                    appResourcesStyle = <Style>rd.Get(feTypeName);
            }
            var visualTreeStyle: Style = undefined;
            if ((styleMask & _StyleMask.VisualTree) != 0) {
                var cur = fe;
                var curNode = fe.XamlNode;
                var isControl = curNode instanceof Controls.ControlNode;
                while (curNode) {
                    cur = curNode.XObject;
                    if (cur.TemplateOwner && !fe.TemplateOwner) {
                        cur = <FrameworkElement>cur.TemplateOwner;
                        curNode = cur.XamlNode;
                        continue;
                    }
                    if (!isControl && cur === fe.TemplateOwner)
                        break;
                    rd = cur.Resources;
                    if (rd) {
                        visualTreeStyle = <Style>rd.Get(feType);
                        if (!visualTreeStyle)
                            visualTreeStyle = <Style>rd.Get(feTypeName);
                        if (visualTreeStyle)
                            break;
                    }
                    curNode = <FENode>curNode.VisualParentNode;
                }
            }
            var styles = [];
            styles[_StyleIndex.GenericXaml] = genericXamlStyle;
            styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
            styles[_StyleIndex.VisualTree] = visualTreeStyle;
            return styles;
        }
        private _GetGenericXamlStyleFor(type: any): Style {
            var rd = App.GetGenericResourceDictionary();
            if (rd)
                return <Style>rd.Get(type);
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
    Nullstone.RegisterType(FrameworkProviderStore, "FrameworkProviderStore");
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
    Nullstone.RegisterType(TextElementNode, "TextElementNode");
    export class TextElement extends DependencyObject {
        _Store: Providers.InheritedProviderStore;
        CreateStore(): Providers.BasicProviderStore {
            return new Providers.InheritedProviderStore(this);
        }
        CreateNode(): XamlNode {
            return new TextElementNode(this);
        }
    }
    Nullstone.RegisterType(TextElement, "TextElement");
}

module Fayde.Input {
    export enum Key {
        None = 0,
        Back = 1,
        Tab = 2,
        Enter = 3,
        Shift = 4,
        Ctrl = 5,
        Alt = 6,
        CapsLock = 7,
        Escape = 8,
        Space = 9,
        PageUp = 10,
        PageDown = 11,
        End = 12,
        Home = 13,
        Left = 14,
        Up = 15,
        Right = 16,
        Down = 17,
        Insert = 18,
        Delete = 19,
        D0 = 20,
        D1 = 21,
        D2 = 22,
        D3 = 23,
        D4 = 24,
        D5 = 25,
        D6 = 26,
        D7 = 27,
        D8 = 28,
        D9 = 29,
        A = 30,
        B = 31,
        C = 32,
        D = 33,
        E = 34,
        F = 35,
        G = 36,
        H = 37,
        I = 38,
        J = 39,
        K = 40,
        L = 41,
        M = 42,
        N = 43,
        O = 44,
        P = 45,
        Q = 46,
        R = 47,
        S = 48,
        T = 49,
        U = 50,
        V = 51,
        W = 52,
        X = 53,
        Y = 54,
        Z = 55,
        F1 = 56,
        F2 = 57,
        F3 = 58,
        F4 = 59,
        F5 = 60,
        F6 = 61,
        F7 = 62,
        F8 = 63,
        F9 = 64,
        F10 = 65,
        F11 = 66,
        F12 = 67,
        NumPad0 = 68,
        NumPad1 = 69,
        NumPad2 = 70,
        NumPad3 = 71,
        NumPad4 = 72,
        NumPad5 = 73,
        NumPad6 = 74,
        NumPad7 = 75,
        NumPad8 = 76,
        NumPad9 = 77,
        Multiply = 78,
        Add = 79,
        Subtract = 80,
        Decimal = 81,
        Divide = 82,
        Unknown = 255,
    }
    export class KeyboardEventArgs extends RoutedEventArgs {
    }
    Nullstone.RegisterType(KeyboardEventArgs, "KeyboardEventArgs");
    export class KeyEventArgs extends KeyboardEventArgs {
        Modifiers: any;
        PlatformKeyCode: number;
        Key: Key;
        Char: string;
        constructor(modifiers: any, keyCode: number, key: Key, char?: string) {
            super();
            this.Modifiers = modifiers;
            this.PlatformKeyCode = keyCode;
            this.Key = key;
            if (this.Key == null)
                this.Key = Key.Unknown;
            this.Char = char;
        }
    }
    Nullstone.RegisterType(KeyEventArgs, "KeyEventArgs");
}

module Fayde.Input {
    var keyFromKeyCode: Key[] = [];
    keyFromKeyCode[8] = Key.Back;
    keyFromKeyCode[9] = Key.Tab;
    keyFromKeyCode[13] = Key.Enter;
    keyFromKeyCode[16] = Key.Shift;
    keyFromKeyCode[17] = Key.Ctrl;
    keyFromKeyCode[18] = Key.Alt;
    keyFromKeyCode[20] = Key.CapsLock;
    keyFromKeyCode[27] = Key.Escape;
    keyFromKeyCode[32] = Key.Space;
    keyFromKeyCode[33] = Key.PageUp;
    keyFromKeyCode[34] = Key.PageDown;
    keyFromKeyCode[35] = Key.End;
    keyFromKeyCode[36] = Key.Home;
    keyFromKeyCode[37] = Key.Left;
    keyFromKeyCode[38] = Key.Up;
    keyFromKeyCode[39] = Key.Right;
    keyFromKeyCode[40] = Key.Down;
    keyFromKeyCode[45] = Key.Insert;
    keyFromKeyCode[46] = Key.Delete;
    keyFromKeyCode[48] = Key.D0;
    keyFromKeyCode[49] = Key.D1;
    keyFromKeyCode[50] = Key.D2;
    keyFromKeyCode[51] = Key.D3;
    keyFromKeyCode[52] = Key.D4;
    keyFromKeyCode[53] = Key.D5;
    keyFromKeyCode[54] = Key.D6;
    keyFromKeyCode[55] = Key.D7;
    keyFromKeyCode[56] = Key.D8;
    keyFromKeyCode[57] = Key.D9;
    keyFromKeyCode[65] = Key.A;
    keyFromKeyCode[66] = Key.B;
    keyFromKeyCode[67] = Key.C;
    keyFromKeyCode[68] = Key.D;
    keyFromKeyCode[69] = Key.E;
    keyFromKeyCode[70] = Key.F;
    keyFromKeyCode[71] = Key.G;
    keyFromKeyCode[72] = Key.H;
    keyFromKeyCode[73] = Key.I;
    keyFromKeyCode[74] = Key.J;
    keyFromKeyCode[75] = Key.K;
    keyFromKeyCode[76] = Key.L;
    keyFromKeyCode[77] = Key.M;
    keyFromKeyCode[78] = Key.N;
    keyFromKeyCode[79] = Key.O;
    keyFromKeyCode[80] = Key.P;
    keyFromKeyCode[81] = Key.Q;
    keyFromKeyCode[82] = Key.R;
    keyFromKeyCode[83] = Key.S;
    keyFromKeyCode[84] = Key.T;
    keyFromKeyCode[85] = Key.U;
    keyFromKeyCode[86] = Key.V;
    keyFromKeyCode[87] = Key.W;
    keyFromKeyCode[88] = Key.X;
    keyFromKeyCode[89] = Key.Y;
    keyFromKeyCode[90] = Key.Z;
    keyFromKeyCode[96] = Key.NumPad0;
    keyFromKeyCode[97] = Key.NumPad1;
    keyFromKeyCode[98] = Key.NumPad2;
    keyFromKeyCode[99] = Key.NumPad3;
    keyFromKeyCode[100] = Key.NumPad4;
    keyFromKeyCode[101] = Key.NumPad5;
    keyFromKeyCode[102] = Key.NumPad6;
    keyFromKeyCode[103] = Key.NumPad7;
    keyFromKeyCode[104] = Key.NumPad8;
    keyFromKeyCode[105] = Key.NumPad9;
    keyFromKeyCode[106] = Key.Multiply;
    keyFromKeyCode[107] = Key.Add;
    keyFromKeyCode[109] = Key.Subtract;
    keyFromKeyCode[110] = Key.Decimal;
    keyFromKeyCode[111] = Key.Divide;
    keyFromKeyCode[112] = Key.F1;
    keyFromKeyCode[113] = Key.F2;
    keyFromKeyCode[114] = Key.F3;
    keyFromKeyCode[115] = Key.F4;
    keyFromKeyCode[116] = Key.F5;
    keyFromKeyCode[117] = Key.F6;
    keyFromKeyCode[118] = Key.F7;
    keyFromKeyCode[119] = Key.F8;
    keyFromKeyCode[120] = Key.F9;
    keyFromKeyCode[121] = Key.F10;
    keyFromKeyCode[122] = Key.F11;
    keyFromKeyCode[123] = Key.F12;
    export class KeyInterop {
        constructor(public Surface: Surface) { }
        RegisterEvents() {
            document.onkeypress = (e) => {
                var args = this.CreateArgsPress(e);
                if (args) {
                    if (this.Surface._HandleKeyDown(args)) {
                        return false;
                    }
                }
            };
            document.onkeydown = (e) => {
                var args = this.CreateArgsDown(e);
                if (args) {
                    if (this.Surface._HandleKeyDown(args)) {
                        return false;
                    }
                }
            };
        }
        CreateArgsPress(e): Fayde.Input.KeyEventArgs { return undefined; }
        CreateArgsDown(e): Fayde.Input.KeyEventArgs { return undefined; }
        static CreateInterop(surface: Surface): KeyInterop {
            if (navigator.appName === "Microsoft Internet Explorer")
                return new IEKeyInterop(surface);
            else if (navigator.appName === "Netscape")
                return new NetscapeKeyInterop(surface);
            return new KeyInterop(surface);
        }
    }
    Nullstone.RegisterType(KeyInterop, "KeyInterop");
    var udkie = [];
    udkie[41] = 48;
    udkie[33] = 49;
    udkie[64] = 50;
    udkie[35] = 51;
    udkie[36] = 52;
    udkie[37] = 53;
    udkie[94] = 54;
    udkie[38] = 55;
    udkie[42] = 56;
    udkie[34] = Key.Unknown;
    export class IEKeyInterop extends KeyInterop {
        constructor(surface: Surface) {
            super(surface);
        }
        CreateArgsPress(e): Fayde.Input.KeyEventArgs {
            if (e.char == null)
                return;
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            var keyCode = e.keyCode;
            var unshifted = udkie[keyCode];
            if (unshifted)
                keyCode = unshifted;
            return new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], e.char);
        }
        CreateArgsDown(e): Fayde.Input.KeyEventArgs {
            if (e.char != null && e.keyCode !== 8)
                return;
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
        }
    }
    Nullstone.RegisterType(IEKeyInterop, "IEKeyInterop");
    var sknet = [];
    sknet[8] = Key.Back;
    sknet[9] = Key.Tab;
    sknet[20] = Key.CapsLock;
    sknet[27] = Key.Escape;
    sknet[33] = Key.PageUp;
    sknet[34] = Key.PageDown;
    sknet[35] = Key.End;
    sknet[36] = Key.Home;
    sknet[37] = Key.Left;
    sknet[38] = Key.Up;
    sknet[39] = Key.Right;
    sknet[40] = Key.Down;
    sknet[45] = Key.Insert;
    sknet[46] = Key.Delete;
    var udknet = [];
    udknet[41] = 48;
    udknet[33] = 49;
    udknet[64] = 50;
    udknet[35] = 51;
    udknet[36] = 52;
    udknet[37] = 53;
    udknet[94] = 54;
    udknet[38] = 55;
    udknet[42] = 56;
    udknet[34] = Key.Unknown;
    export class NetscapeKeyInterop extends KeyInterop {
        constructor(surface: Surface) {
            super(surface);
        }
        CreateArgsPress(e): Fayde.Input.KeyEventArgs {
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            var keyCode = e.keyCode;
            var unshifted = udknet[keyCode];
            if (unshifted)
                keyCode = unshifted;
            return new Fayde.Input.KeyEventArgs(modifiers, keyCode, keyFromKeyCode[keyCode], String.fromCharCode(e.which || e.keyCode));
        }
        CreateArgsDown(e): Fayde.Input.KeyEventArgs {
            if (sknet[e.keyCode] === undefined)
                return null;
            var modifiers = {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
            return new Fayde.Input.KeyEventArgs(modifiers, e.keyCode, keyFromKeyCode[e.keyCode]);
        }
    }
    Nullstone.RegisterType(NetscapeKeyInterop, "NetscapeKeyInterop");
}

module Fayde.Input {
    export class MouseEventArgs extends RoutedEventArgs {
        private _AbsolutePos: Point;
        constructor(absolutePos: Point) {
            super();
            this._AbsolutePos = absolutePos;
        }
        GetPosition(relativeTo: UIElement): Point {
            return new Point();
        }
    }
    Nullstone.RegisterType(MouseEventArgs, "MouseEventArgs");
    export class MouseButtonEventArgs extends MouseEventArgs {
        constructor(absolutePos: Point) {
            super(absolutePos);
        }
    }
    Nullstone.RegisterType(MouseButtonEventArgs, "MouseButtonEventArgs");
    export class MouseWheelEventArgs extends MouseEventArgs {
        Delta: number;
        constructor(absolutePos: Point, delta: number) {
            super(absolutePos);
            this.Delta = delta;
        }
    }
    Nullstone.RegisterType(MouseWheelEventArgs, "MouseWheelEventArgs");
}

module Fayde.Media {
    export class GeneralTransform extends DependencyObject {
        Inverse: GeneralTransform;
        Transform(p: Point): Point { return p; }
        TransformBounds(r: rect): rect { return r; }
        TryTransform(inPoint: Point, outPoint: Point): bool { return false; }
    }
    Nullstone.RegisterType(GeneralTransform, "GeneralTransform");
    export class InternalTransform extends GeneralTransform {
        private _Raw: number[] = mat4.identity();
        get Inverse(): InternalTransform {
            var it = new InternalTransform();
            it._Raw = mat4.create();
            mat4.inverse(this._Raw, it._Raw);
            return it;
        }
        get Value(): Matrix {
            var m = new Matrix();
            m._Raw = mat4.create(this._Raw);
            return m;
        }
        Transform(p: Point): Point {
            var pi = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
            var po = vec4.create();
            mat4.transformVec4(this._Raw, pi, po);
            if (po[3] !== 0.0) {
                var w = 1.0 / po[3];
                return new Point(po[0] * w, p[1] * w);
            }
            return new Point(NaN, NaN);
        }
        TransformBounds(r: rect): rect {
            if (r)
                return rect.transform4(rect.clone(r), this._Raw);
            return undefined;
        }
    }
    Nullstone.RegisterType(InternalTransform, "InternalTransform");
}

module Fayde.Media {
    export interface IGradientStopListener {
        GradientStopChanged(newGradientStop: GradientStop);
    }
    export class GradientStop extends DependencyObject {
        private _Listener: IGradientStopListener;
        static ColorProperty: DependencyProperty = DependencyProperty.Register("Color", () => Color, GradientStop, undefined, (d, args) => (<GradientStop>d)._GradientStopChanged());
        static OffsetProperty: DependencyProperty = DependencyProperty.Register("Offset", () => Number, GradientStop, 0.0, (d, args) => (<GradientStop>d)._GradientStopChanged());
        Color: Color;
        Offset: number;
        Listen(listener: IGradientStopListener) { this._Listener = listener; }
        Unlisten(listener: IGradientStopListener) { if (this._Listener === listener) this._Listener = null; }
        private _GradientStopChanged() {
            var listener = this._Listener;
            if (listener) listener.GradientStopChanged(this);
        }
        toString(): string { return this.Color.toString() + " @ " + this.Offset.toString(); }
    }
    Nullstone.RegisterType(GradientStop, "GradientStop");
    export interface IGradientStopsListener {
        GradientStopsChanged(newGradientStops: GradientStopCollection);
    }
    export class GradientStopCollection extends XamlObjectCollection implements IGradientStopListener {
        private _Listener: IGradientStopsListener;
        Listen(listener: IGradientStopsListener) { this._Listener = listener; }
        Unlisten(listener: IGradientStopsListener) { if (this._Listener === listener) this._Listener = null; }
        private AddedToCollection(value: GradientStop, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
        }
        private RemovedFromCollection(value: GradientStop, isValueSafe: bool) {
            if (!super.RemovedFromCollection(value, isValueSafe))
                return false;
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
        }
        private GradientStopChanged(newGradientStop: GradientStop) {
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
        }
    }
    Nullstone.RegisterType(GradientStopCollection, "GradientStopCollection");
}

module Fayde.Media {
    export interface ITransformChangedListener {
        TransformChanged(source: Transform);
    }
    export class Transform extends GeneralTransform {
        private _Value: Matrix;
        _Listener: ITransformChangedListener = null;
        get Value(): Matrix {
            var val = this._Value;
            if (!val) {
                var val = new Matrix();
                val._Raw = this._BuildValue();
                this._Value = val;
            }
            return val;
        }
        get Inverse(): Transform {
            var inverse = this.Value.Inverse;
            if (inverse == null)
                return;
            var mt = new MatrixTransform();
            mt.Matrix = inverse;
            return mt;
        }
        Transform(p: Point): Point {
            var v = this.Value;
            if (!v || !v._Raw)
                return new Point(p.X, p.Y);
            var v = mat3.transformVec2(v._Raw, vec2.createFrom(p.X, p.Y));
            return new Point(v[0], v[1]);
        }
        TransformBounds(r: rect): rect {
            if (!r)
                return undefined;
            var v = this.Value;
            if (!v || !v._Raw)
                return rect.clone(r);
            return rect.transform(rect.clone(r), v._Raw);
        }
        TryTransform(inPoint: Point, outPoint: Point): bool {
            return false;
        }
        Listen(listener: ITransformChangedListener) { this._Listener = listener; }
        Unlisten(listener: ITransformChangedListener) { if (this._Listener === listener) this._Listener = null; }
        _InvalidateValue() {
            if (this._Value === undefined)
                return;
            this._Value = undefined;
            var listener = this._Listener;
            if (listener) listener.TransformChanged(this);
        }
        _BuildValue(): number[] {
            return undefined;
        }
    }
    Nullstone.RegisterType(Transform, "Transform");
    export class MatrixTransform extends Transform implements IMatrixChangedListener {
        static MatrixProperty: DependencyProperty = DependencyProperty.RegisterFull("Matrix", () => Matrix, MatrixTransform, undefined, (d, args) => (<MatrixTransform>d)._MatrixChanged(args), { GetValue: () => new Matrix() });
        Matrix: Matrix;
        _BuildValue(): number[] {
            var m = this.Matrix;
            if (m)
                return m._Raw;
            return mat3.identity();
        }
        private _MatrixChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldv: Matrix = args.OldValue;
            var newv: Matrix = args.NewValue;
            if (oldv)
                oldv.Unlisten(this);
            if (newv)
                newv.Listen(this);
            this.MatrixChanged(newv);
        }
        MatrixChanged(newMatrix: Matrix) {
            var listener = this._Listener;
            if (listener) listener.TransformChanged(this);
        }
    }
    Nullstone.RegisterType(MatrixTransform, "MatrixTransform");
}

module Fayde.Media {
    export class RotateTransform extends Transform {
        static AngleProperty: DependencyProperty = DependencyProperty.Register("Angle", () => Number, RotateTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static CenterXProperty: DependencyProperty = DependencyProperty.Register("CenterX", () => Number, RotateTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static CenterYProperty: DependencyProperty = DependencyProperty.Register("CenterY", () => Number, RotateTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        Angle: number;
        CenterX: number;
        CenterY: number;
        private _BuildValue(): number[] {
            var cx = this.CenterX;
            var cy = this.CenterY;
            var angleRad = Math.PI / 180 * this.Angle;
            var m = mat3.createRotate(angleRad);
            if (cx === 0 && cy === 0)
                return m;
            mat3.multiply(mat3.createTranslate(-cx, -cy), m, m); //m = m * translation
            mat3.translate(m, cx, cy);
            return m;
        }
    }
    Nullstone.RegisterType(RotateTransform, "RotateTransform");
    export class ScaleTransform extends Transform {
        static CenterXProperty: DependencyProperty = DependencyProperty.Register("CenterX", () => Number, ScaleTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static CenterYProperty: DependencyProperty = DependencyProperty.Register("CenterY", () => Number, ScaleTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static ScaleXProperty: DependencyProperty = DependencyProperty.Register("ScaleX", () => Number, ScaleTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static ScaleYProperty: DependencyProperty = DependencyProperty.Register("ScaleY", () => Number, ScaleTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        CenterX: number;
        CenterY: number;
        ScaleX: number;
        ScaleY: number;
        private _BuildValue(): number[] {
            var cx = this.CenterX;
            var cy = this.CenterY;
            var m = mat3.createScale(this.ScaleX, this.ScaleY);
            if (cx === 0 && cy === 0)
                return m;
            mat3.multiply(mat3.createTranslate(-cx, -cy), m, m); //m = m * translation
            mat3.translate(m, cx, cy);
            return m;
        }
    }
    Nullstone.RegisterType(ScaleTransform, "ScaleTransform");
    export class SkewTransform extends Transform {
        static AngleXProperty: DependencyProperty = DependencyProperty.Register("AngleX", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static AngleYProperty: DependencyProperty = DependencyProperty.Register("AngleY", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static CenterXProperty: DependencyProperty = DependencyProperty.Register("CenterX", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static CenterYProperty: DependencyProperty = DependencyProperty.Register("CenterY", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        AngleX: number;
        AngleY: number;
        CenterX: number;
        CenterY: number;
        private _BuildValue(): number[] {
            var cx = this.CenterX;
            var cy = this.CenterY;
            var angleXRad = Math.PI / 180 * this.AngleX;
            var angleYRad = Math.PI / 180 * this.AngleY;
            var m = mat3.createSkew(angleXRad, angleYRad);
            if (cx === 0 && cy === 0)
                return m;
            mat3.multiply(mat3.createTranslate(-cx, -cy), m, m); //m = m * translation
            mat3.translate(m, cx, cy);
            return m;
        }
    }
    Nullstone.RegisterType(SkewTransform, "SkewTransform");
    export class TranslateTransform extends Transform {
        static XProperty: DependencyProperty = DependencyProperty.Register("X", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        static YProperty: DependencyProperty = DependencyProperty.Register("Y", () => Number, SkewTransform, 0, (d, args) => (<Transform>d)._InvalidateValue());
        X: number;
        Y: number;
        private _BuildValue(): number[] {
            return mat3.createTranslate(this.X, this.Y);
        }
    }
    Nullstone.RegisterType(TranslateTransform, "TranslateTransform");
    export class TransformCollection extends XamlObjectCollection implements ITransformChangedListener {
        private _Listener: ITransformChangedListener;
        Listen(listener: ITransformChangedListener) { this._Listener = listener; }
        Unlisten(listener: ITransformChangedListener) { if (this._Listener === listener) this._Listener = null; }
        AddedToCollection(value: Transform, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            value.Listen(this);
            this.TransformChanged();
        }
        RemovedFromCollection(value: Transform, isValueSafe: bool) {
            if (!super.RemovedFromCollection(value, isValueSafe))
                return false;
            value.Unlisten(this);
            this.TransformChanged();
        }
        private TransformChanged(transform?: Transform) {
            var listener = this._Listener;
            if (listener) listener.TransformChanged(transform);
        }
    }
    Nullstone.RegisterType(TransformCollection, "TransformCollection");
    export class TransformGroup extends Transform implements ITransformChangedListener {
        Children: TransformCollection;
        constructor() {
            super();
            var coll = new TransformCollection();
            coll.Listen(this);
            Object.defineProperty(this, "Children", {
                value: coll,
                writable: false
            });
        }
        private TransformChanged(source: Transform) { this._InvalidateValue(); }
        private _BuildValue(): number[] {
            var enumerator = this.Children.GetEnumerator(true);
            var cur = mat3.identity();
            while (enumerator.MoveNext()) {
                mat3.multiply((<Transform>enumerator.Current).Value._Raw, cur, cur); //cur = cur * child
            }
            return cur;
        }
    }
    Nullstone.RegisterType(TransformGroup, "TransformGroup");
}

module Fayde.Controls {
    export class ControlTemplate extends FrameworkTemplate {
        private _TempJson: any;
        private _ResChain: ResourceDictionary[];
        TargetType: Function;
        constructor(targetType: Function, json: any, resChain: ResourceDictionary[]) {
            super();
            Object.defineProperty(this, "TargetType", {
                value: targetType,
                writable: false
            });
            this._TempJson = json;
            this._ResChain = resChain;
        }
        _GetVisualTreeWithError(templateBindingSource: FrameworkElement, error: BError): XamlObject {
            if (this._TempJson)
                return Fayde.JsonParser.Parse(this._TempJson, templateBindingSource, new Fayde.NameScope(), this._ResChain);
            return super._GetVisualTreeWithError(templateBindingSource, error);
        }
    }
    Nullstone.RegisterType(ControlTemplate, "ControlTemplate");
}

module Fayde {
    export class DataTemplate extends FrameworkTemplate {
        private _TempJson: any;
        private _ResChain: ResourceDictionary[];
        constructor(json: any, resChain: ResourceDictionary[]) {
            super();
            this._TempJson = json;
            this._ResChain = resChain;
        }
        _GetVisualTreeWithError(templateBindingSource: FrameworkElement, error: BError): XamlObject {
            if (this._TempJson)
                return JsonParser.Parse(this._TempJson, templateBindingSource);
            return super._GetVisualTreeWithError(templateBindingSource, error);
        }
    }
    Nullstone.RegisterType(DataTemplate, "DataTemplate");
}

module Fayde {
    export class UINode extends XamlNode {
        XObject: UIElement;
        LayoutUpdater: LayoutUpdater;
        IsTopLevel: bool = false;
        constructor(xobj: UIElement) {
            super(xobj);
            this.LayoutUpdater = new LayoutUpdater(this);
        }
        VisualParentNode: UINode;
        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }
        OnIsAttachedChanged(newIsAttached: bool) {
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
        }
        _ElementAdded(uie: UIElement) {
            var lu = this.LayoutUpdater;
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.PreviousConstraint = undefined;
            var un = uie.XamlNode;
            un.VisualParentNode = this;
            this.XObject._Store.PropagateInheritedOnAdd(uie);
            un.LayoutUpdater.OnAddedToTree();
            un.SetIsLoaded(this.IsLoaded);
        }
        _ElementRemoved(uie: UIElement) {
            var lu = this.LayoutUpdater;
            var un = uie.XamlNode;
            lu.Invalidate(un.LayoutUpdater.SubtreeBounds);
            lu.InvalidateMeasure();
            un.VisualParentNode = null;
            un.SetIsLoaded(false);
            un.LayoutUpdater.OnRemovedFromTree();
            this.XObject._Store.ClearInheritedOnRemove(uie);
        }
        IsLoaded: bool = false;
        SetIsLoaded(value: bool) {
            if (this.IsLoaded === value)
                return;
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        }
        OnIsLoadedChanged(newIsLoaded: bool) { }
        _EmitFocusChange(type: string) {
            if (type === "got")
                this._EmitGotFocus();
            else if (type === "lost")
                this._EmitLostFocus();
        }
        private _EmitLostFocus() {
            var e = new Fayde.RoutedEventArgs();
            var x = this.XObject;
            x.OnLostFocus(e);
            x.LostFocus.Raise(x, e);
        }
        private _EmitGotFocus() {
            var e = new Fayde.RoutedEventArgs();
            var x = this.XObject;
            x.OnGotFocus(e);
            x.GotFocus.Raise(x, e);
        }
        _EmitKeyDown(args: Fayde.Input.KeyEventArgs) {
            var x = this.XObject;
            x.OnKeyDown(args);
            x.KeyDown.Raise(x, args);
        }
        _EmitKeyUp(args: Fayde.Input.KeyEventArgs) {
            var x = this.XObject;
            x.OnKeyUp(args);
            x.KeyUp.Raise(x, args);
        }
        _EmitLostMouseCapture(pos: Point) {
        }
        _EmitMouseEvent(type: string, isLeftButton: bool, isRightButton: bool, args: Input.MouseEventArgs): bool {
            var x = this.XObject;
            if (type === "up") {
                if (isLeftButton) {
                    x.MouseLeftButtonUp.Raise(x, args);
                } else if (isRightButton) {
                    x.MouseRightButtonUp.Raise(x, args);
                }
            } else if (type === "down") {
                if (isLeftButton) {
                    x.MouseLeftButtonDown.Raise(x, args);
                } else if (isRightButton) {
                    x.MouseRightButtonDown.Raise(x, args);
                }
            } else if (type === "leave") {
                (<any>x)._IsMouseOver = false;
                x.OnMouseLeave(args);
                x.MouseLeave.Raise(x, args);
            } else if (type === "enter") {
                (<any>x)._IsMouseOver = true;
                x.OnMouseEnter(args);
                x.MouseEnter.Raise(x, args);
            } else if (type === "move") {
                x.MouseMove.Raise(x, args);
            } else if (type === "wheel") {
                x.MouseWheel.Raise(x, args);
            } else {
                return false;
            }
            return args.Handled;
        }
        _HitTestPoint(ctx: IRenderContext, p: Point, uielist: UINode[]) {
            uielist.unshift(this);
        }
        CanCaptureMouse(): bool { return true; }
        _ResortChildrenByZIndex() {
            Warn("_Dirty.ChildrenZIndices only applies to Panel subclasses");
        }
    }
    Nullstone.RegisterType(UINode, "UINode");
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
        static ClipProperty = DependencyProperty.RegisterCore("Clip", function () { return Media.Geometry; }, UIElement);
        static EffectProperty = DependencyProperty.Register("Effect", function () { return Media.Effects.Effect; }, UIElement);
        static IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", function () { return Boolean; }, UIElement, true);
        static OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", function () { return Media.Brush; }, UIElement);
        static OpacityProperty = DependencyProperty.RegisterCore("Opacity", function () { return Number; }, UIElement, 1.0);
        static ProjectionProperty = DependencyProperty.Register("Projection", function () { return Media.Projection; }, UIElement);
        static RenderTransformProperty = DependencyProperty.Register("RenderTransform", function () { return Media.Transform; }, UIElement);
        static RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", function () { return Point; }, UIElement);
        static TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
        static UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () { return Boolean; }, UIElement, true, undefined, undefined, Providers._Inheritable.UseLayoutRounding);
        static VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () { return new Enum(Visibility); }, UIElement, Visibility.Visible);
        private _IsMouseOver: bool = false;
        get IsMouseOver() { return this._IsMouseOver; }
        Cursor: string;
        Visibility: Visibility;
        LostFocus: RoutedEvent = new RoutedEvent();
        GotFocus: RoutedEvent = new RoutedEvent();
        Focus(): bool { return false; }
        OnGotFocus(e: RoutedEventArgs) { }
        OnLostFocus(e: RoutedEventArgs) { }
        KeyDown: MulticastEvent = new MulticastEvent();
        KeyUp: MulticastEvent = new MulticastEvent();
        OnKeyDown(args: Input.KeyEventArgs) { }
        OnKeyUp(args: Input.KeyEventArgs) { }
        MouseLeftButtonUp: RoutedEvent = new RoutedEvent();
        MouseRightButtonUp: RoutedEvent = new RoutedEvent();
        MouseLeftButtonDown: RoutedEvent = new RoutedEvent();
        MouseRightButtonDown: RoutedEvent = new RoutedEvent();
        MouseLeave: RoutedEvent = new RoutedEvent();
        OnMouseLeave(args: Input.MouseEventArgs) { }
        MouseEnter: RoutedEvent = new RoutedEvent();
        OnMouseEnter(args: Input.MouseEventArgs) { }
        MouseMove: RoutedEvent = new RoutedEvent();
        MouseWheel: RoutedEvent = new RoutedEvent();
    }
    Nullstone.RegisterType(UIElement, "UIElement");
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
    Nullstone.RegisterType(ControlProviderStore, "ControlProviderStore");
}

module Fayde.Documents {
    export class Block extends TextElement {
    }
    Nullstone.RegisterType(Block, "Block");
}

module Fayde.Documents {
    export class Inline extends TextElement {
    }
    Nullstone.RegisterType(Inline, "Inline");
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
    Nullstone.RegisterType(Paragraph, "Paragraph");
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
    Nullstone.RegisterType(Section, "Section");
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
    Nullstone.RegisterType(Span, "Span");
}

module Fayde.Media {
    export interface IBrushChangedListener {
        BrushChanged(newBrush: Brush);
    }
    export class Brush extends DependencyObject implements ITransformChangedListener {
        static TransformProperty: DependencyProperty = DependencyProperty.RegisterCore("Transform", () => Fayde.Media.Transform, Brush, undefined, (d, args) => (<Brush>d)._TransformChanged(args));
        Transform: Fayde.Media.Transform;
        private _CachedBounds: rect = null;
        private _CachedBrush: any = null;
        private _Listener: IBrushChangedListener = null;
        SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect) {
            if (this._CachedBrush && this._CachedBounds && rect.isEqual(this._CachedBounds, bounds))
                return;
            this._CachedBounds = bounds;
            var transform = this.Transform;
            if (transform) {
                var transformedBounds = transform.TransformBounds(bounds);
                var raw = transform.Value._Raw;
                var tmpBrush = this.CreateBrush(ctx, bounds);
                var fillExtents = rect.clone(bounds);
                rect.growBy(fillExtents, raw[2], raw[5], 0, 0);
                var tmpCanvas = <HTMLCanvasElement>document.createElement("canvas");
                tmpCanvas.width = Math.max(transformedBounds.Width, bounds.Width);
                tmpCanvas.height = Math.max(transformedBounds.Height, bounds.Height);
                var tmpCtx = tmpCanvas.getContext("2d");
                tmpCtx.setTransform(raw[0], raw[1], raw[3], raw[4], raw[2], raw[5]);
                tmpCtx.fillStyle = tmpBrush;
                tmpCtx.fillRect(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height);
                this._CachedBrush = ctx.createPattern(tmpCanvas, "no-repeat");
            } else {
                this._CachedBrush = this.CreateBrush(ctx, bounds);
            }
        }
        CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any { return undefined; }
        ToHtml5Object(): any { return this._CachedBrush; }
        Listen(listener: IBrushChangedListener) { this._Listener = listener; }
        Unlisten(listener: IBrushChangedListener) { if (this._Listener === listener) this._Listener = null; }
        InvalidateBrush() {
            this._CachedBrush = null;
            this._CachedBounds = null;
            var listener = this._Listener;
            if (listener) listener.BrushChanged(this);
        }
        private TransformChanged(source: Transform) {
            this.InvalidateBrush();
        }
        private _TransformChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldt = <Transform>args.OldValue;
            var newt = <Transform>args.NewValue;
            if (oldt)
                oldt.Unlisten(this);
            if (newt)
                newt.Listen(this);
            this.InvalidateBrush();
        }
    }
    Nullstone.RegisterType(Brush, "Brush");
}

module Fayde.Media {
    export enum BrushMappingMode {
        Absolute = 0,
        RelativeToBoundingBox = 1,
    }
    export enum GradientSpreadMethod {
        Pad = 0,
        Reflect = 1,
        Repeat = 2,
    }
    export class GradientBrush extends Brush implements IGradientStopsListener {
        static MappingModeProperty = DependencyProperty.Register("MappingMode", () => new Enum(BrushMappingMode), GradientBrush, BrushMappingMode.RelativeToBoundingBox, (d, args) => (<Brush>d).InvalidateBrush());
        static SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", () => new Enum(GradientSpreadMethod), GradientBrush, GradientSpreadMethod.Pad, (d, args) => (<Brush>d).InvalidateBrush());
        GradientStops: GradientStopCollection;
        MappingMode: BrushMappingMode;
        SpreadMethod: GradientSpreadMethod;
        static Annotations = { ContentProperty: "GradientStops" }
        constructor() {
            super();
            var coll = new GradientStopCollection();
            coll.Listen(this);
            Object.defineProperty(this, "GradientStops", {
                value: coll,
                writable: false
            });
        }
        private CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
            var spread = this.SpreadMethod;
            switch (spread) {
                case GradientSpreadMethod.Pad:
                default:
                    return this._CreatePad(ctx, bounds);
                case GradientSpreadMethod.Repeat:
                    return this._CreateRepeat(ctx, bounds);
                case GradientSpreadMethod.Reflect:
                    return this._CreateReflect(ctx, bounds);
            }
        }
        _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect) { }
        _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect) { }
        _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect) { }
        _GetMappingModeTransform(bounds: rect): number[] {
            if (!bounds)
                return mat3.identity();
            if (this.MappingMode === BrushMappingMode.Absolute)
                return mat3.identity();
            return mat3.createScale(bounds.Width, bounds.Height);
        }
        private GradientStopsChanged(newGradientStops: GradientStopCollection) { this.InvalidateBrush(); }
    }
    Nullstone.RegisterType(GradientBrush, "GradientBrush");
}

module Fayde.Media {
    export class LinearGradientBrush extends GradientBrush {
        static StartPointProperty: DependencyProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, LinearGradientBrush);
        static EndPointProperty: DependencyProperty = DependencyProperty.RegisterCore("EndPoint", () => Point, LinearGradientBrush);
        StartPoint: Point;
        EndPoint: Point;
        private _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
            var enumerator = this.GradientStops.GetEnumerator();
            while (enumerator.MoveNext()) {
                var stop: GradientStop = enumerator.Current;
                grd.addColorStop(stop.Offset, stop.Color.toString());
            }
            return grd;
        }
        private _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var dir = { x: end.X - start.X, y: end.Y - start.Y };
            var first = { x: start.X, y: start.Y };
            var last = { x: end.X, y: end.Y };
            GradientMetrics.Calculate(dir, first, last, bounds);
            var grd = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
            var steps = (last.x - first.x) / dir.x;
            var curOffset = 0.0;
            for (var i = 0; i < steps; i++) {
                var enumerator = this.GradientStops.GetEnumerator();
                while (enumerator.MoveNext()) {
                    var stop: GradientStop = enumerator.Current;
                    grd.addColorStop(curOffset + (stop.Offset / steps), stop.Color.toString());
                }
                curOffset += (1.0 / steps);
            }
            return grd;
        }
        private _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
        }
        private _GetPointData(bounds: rect) {
            var transform = this._GetMappingModeTransform(bounds);
            var sp = this.StartPoint;
            var ep = this.EndPoint;
            var s = mat3.transformVec2(transform, vec2.createFrom(sp.X, sp.Y));
            var e = mat3.transformVec2(transform, vec2.createFrom(ep.X, ep.Y));
            return {
                start: new Point(s[0], s[1]),
                end: new Point(e[0], e[1])
            };
        }
        toString(): string {
            var enumerator = this.GradientStops.GetEnumerator();
            var ser = [];
            while (enumerator.MoveNext()) {
                ser.push(enumerator.Current.toString());
            }
            return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
        }
    }
}

module Fayde.Media {
    export class RadialGradientBrush extends GradientBrush {
    }
}

module Fayde.Media {
    export class SolidColorBrush extends Brush {
        static ColorProperty: DependencyProperty = DependencyProperty.Register("Color", () => Color, SolidColorBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        Color: Color;
        constructor() {
            super();
            if (arguments.length === 1 && arguments[0] instanceof Color)
                this.Color = arguments[0];
        }
        private CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
            var color = this.Color;
            if (color)
                return "#000000";
            return color.toString();
        }
    }
    Nullstone.RegisterType(SolidColorBrush, "SolidColorBrush");
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
                (<UINode>enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if (newIsLoaded) {
                this.XObject.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode) {
                if (this.SubtreeNode instanceof XamlObjectCollection)
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            }
        }
    }
    Nullstone.RegisterType(FENode, "FENode");
    export class FrameworkElement extends UIElement {
        DefaultStyleKey: any;
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
        SizeChanged: RoutedEvent;
        _ComputeActualSize(): size {
            return new size();
        }
        InvokeLoaded() {
        }
    }
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
}

module Fayde.Controls {
    export class ControlNode extends FENode {
        XObject: Control;
        constructor(xobj: Control) {
            super(xobj);
        }
        TabTo() {
            var xobj = this.XObject;
            return xobj.IsEnabled && xobj.IsTabStop && xobj.Focus();
        }
    }
    Nullstone.RegisterType(ControlNode, "ControlNode");
    export class Control extends FrameworkElement {
        XamlNode: ControlNode;
        _Store: Providers.ControlProviderStore;
        CreateStore(): Providers.ControlProviderStore {
            return new Providers.ControlProviderStore(this);
        }
        CreateNode(): XamlNode {
            return new ControlNode(this);
        }
        IsEnabled: bool;
        IsTabStop: bool;
        TabNavigation: Input.KeyboardNavigationMode;
        TabIndex: number;
        static IsEnabledProperty: DependencyProperty;
        Focus(): bool {
            return App.Instance.MainSurface.Focus(this);
        }
        GetDefaultStyle(): Style {
            return undefined;
        }
    }
    Nullstone.RegisterType(Control, "Control");
}

module Fayde.Controls {
    export class Image extends FrameworkElement {
    }
    Nullstone.RegisterType(Image, "Image");
}

module Fayde.Controls {
    export class MediaElement extends FrameworkElement {
    }
    Nullstone.RegisterType(MediaElement, "MediaElement");
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
    Nullstone.RegisterType(PanelChildrenNode, "PanelChildrenNode");
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
    Nullstone.RegisterType(PanelChildrenCollection, "PanelChildrenCollection");
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
        _ResortChildrenByZIndex() {
            (<PanelChildrenCollection>this.XObject.Children).XamlNode.ResortByZIndex();
        }
    }
    Nullstone.RegisterType(PanelNode, "PanelNode");
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
    Nullstone.RegisterType(Panel, "Panel");
}

module Fayde.Controls {
    export class TextBlockNode extends UINode {
        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    Nullstone.RegisterType(TextBlockNode, "TextBlockNode");
    export class TextBlock extends FrameworkElement {
        static InlinesProperty;
        CreateNode(): XamlNode {
            return new TextBlockNode(this);
        }
    }
    Nullstone.RegisterType(TextBlock, "TextBlock");
}

module Fayde.Controls {
    export class UserControl extends Control {
    }
    Nullstone.RegisterType(UserControl, "UserControl");
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
    Nullstone.RegisterType(PopupNode, "PopupNode");
    export class Popup extends Fayde.FrameworkElement {
        Child: UIElement;
        CreateNode(): XamlNode {
            return new PopupNode(this);
        }
    }
    Nullstone.RegisterType(Popup, "Popup");
}

module Fayde.Controls {
    export class ContentControl extends Control {
        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.RegisterCore("Content", function () { return Object; }, ContentControl, undefined, function (d, args) { (<ContentControl>d).OnContentChanged(args.OldValue, args.NewValue); });
        static ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () { return ControlTemplate; }, ContentControl, undefined, function (d, args) { (<ContentControl>d).OnContentTemplateChanged(args.OldValue, args.NewValue); });
        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: ControlTemplate, newContentTemplate: ControlTemplate) { }
    }
    Nullstone.RegisterType(ContentControl, "ContentControl");
}

