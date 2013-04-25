/// <reference path="DependencyObject.ts" />
/// <reference path="XamlNode.ts" />
/// <reference path="Providers/Enums.ts" />
/// <reference path="Enums.ts" />
/// <reference path="../Media/Effects/Effect.ts"/>
/// <reference path="../Media/Transform.ts"/>
/// <reference path="../Media/Projection.ts"/>
/// <reference path="../Primitives/Point.ts"/>
/// CODE
/// <reference path="../Engine/Surface.ts" />
/// <reference path="Walkers.ts" />
/// <reference path="LayoutUpdater.ts" />
/// <reference path="Providers/InheritedProvider.ts" />
/// <reference path="Providers/InheritedProviderStore.ts"/>
/// <reference path="../Runtime/MulticastEvent.ts"/>
/// <reference path="RoutedEvent.ts"/>
/// <reference path="../Engine/Interfaces.ts"/>

module Fayde {
    export class UINode extends XamlNode {
        XObject: UIElement;
        LayoutUpdater: LayoutUpdater;
        IsTopLevel: bool = false;
        private _Surface: Surface;

        SetSurface(surface: Surface) {
            this._Surface = surface;
            this.LayoutUpdater.Surface = surface;
        }

        constructor(xobj: UIElement) {
            super(xobj);
            this.LayoutUpdater = new LayoutUpdater(this);
            this.LayoutUpdater.SetContainerMode(false);
        }

        VisualParentNode: UINode;

        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
        }

        AttachVisualChild(uie: UIElement) {
            var lu = this.LayoutUpdater;
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.PreviousConstraint = undefined;

            var un = uie.XamlNode;
            un.VisualParentNode = this;
            un.VisualParentNode.SetSurface(this._Surface);
            this.XObject._Store.PropagateInheritedOnAdd(uie);
            un.LayoutUpdater.OnAddedToTree();
            un.SetIsLoaded(this.IsLoaded);
        }
        DetachVisualChild(uie: UIElement) {
            var lu = this.LayoutUpdater;
            var un = uie.XamlNode;
            lu.Invalidate(un.LayoutUpdater.SubtreeBounds);
            lu.InvalidateMeasure();

            un.VisualParentNode.SetSurface(null);
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
            var x = this.XObject;
            var e = new Input.MouseEventArgs(pos);
            x.OnLostMouseCapture(e);
            x.LostMouseCapture.Raise(x, e);
        }
        _EmitMouseEvent(type: string, isLeftButton: bool, isRightButton: bool, args: Input.MouseEventArgs): bool {
            var x = this.XObject;
            if (type === "up") {
                if (isLeftButton) {
                    x.OnMouseLeftButtonUp(<Input.MouseButtonEventArgs>args);
                    x.MouseLeftButtonUp.Raise(x, args);
                } else if (isRightButton) {
                    x.OnMouseRightButtonUp(<Input.MouseButtonEventArgs>args);
                    x.MouseRightButtonUp.Raise(x, args);
                }
            } else if (type === "down") {
                if (isLeftButton) {
                    x.OnMouseLeftButtonDown(<Input.MouseButtonEventArgs>args);
                    x.MouseLeftButtonDown.Raise(x, args);
                } else if (isRightButton) {
                    x.OnMouseRightButtonDown(<Input.MouseButtonEventArgs>args);
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
                x.OnMouseMove(args);
                x.MouseMove.Raise(x, args);
            } else if (type === "wheel") {
                x.OnMouseWheel(<Input.MouseWheelEventArgs>args);
                x.MouseWheel.Raise(x, args);
            } else {
                return false;
            }
            return args.Handled;
        }

        _HitTestPoint(ctx: RenderContext, p: Point, uielist: UINode[]) {
            uielist.unshift(this);
        }
        _InsideClip(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            var clip = this.XObject.Clip;
            if (!clip)
                return true;

            var np = new Point(x, y);
            lu.TransformPoint(np);

            if (!rect.containsPoint(clip.GetBounds(), np))
                return false;

            return ctx.IsPointInClipPath(clip, np);
        }

        CanCaptureMouse(): bool { return true; }
        CaptureMouse(): bool {
            if (!this.IsAttached)
                return false;
            this._Surface.SetMouseCapture(this);
            return true;
        }
        ReleaseMouseCapture() {
            if (!this.IsAttached)
                return;
            this._Surface.ReleaseMouseCapture(this);
        }

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
        CreateNode(): UINode { return new UINode(this); }
        
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

        Clip: Media.Geometry;
        Effect: Media.Effects.Effect;
        IsHitTestVisible: bool;
        Cursor: string;
        OpacityMask: Media.Brush;
        Opacity: number;
        RenderTransform: Media.Transform;
        RenderTransformOrigin: Point;
        Tag: any;
        UseLayoutRounding: bool;
        Visibility: Visibility;
        
        Focus(): bool { return false; }

        LostFocus: RoutedEvent = new RoutedEvent();
        GotFocus: RoutedEvent = new RoutedEvent();
        LostMouseCapture: RoutedEvent = new RoutedEvent();
        KeyDown: MulticastEvent = new MulticastEvent();
        KeyUp: MulticastEvent = new MulticastEvent();
        MouseLeftButtonUp: RoutedEvent = new RoutedEvent();
        MouseRightButtonUp: RoutedEvent = new RoutedEvent();
        MouseLeftButtonDown: RoutedEvent = new RoutedEvent();
        MouseRightButtonDown: RoutedEvent = new RoutedEvent();
        MouseLeave: RoutedEvent = new RoutedEvent();
        MouseEnter: RoutedEvent = new RoutedEvent();
        MouseMove: RoutedEvent = new RoutedEvent();
        MouseWheel: RoutedEvent = new RoutedEvent();
        
        OnGotFocus(e: RoutedEventArgs) { }
        OnLostFocus(e: RoutedEventArgs) { }
        OnLostMouseCapture(e: Input.MouseEventArgs) { }
        OnKeyDown(e: Input.KeyEventArgs) { }
        OnKeyUp(e: Input.KeyEventArgs) { }
        OnMouseEnter(e: Input.MouseEventArgs) { }
        OnMouseLeave(e: Input.MouseEventArgs) { }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) { }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) { }
        OnMouseMove(e: Input.MouseEventArgs) { }
        OnMouseRightButtonDown(e: Input.MouseButtonEventArgs) { }
        OnMouseRightButtonUp(e: Input.MouseButtonEventArgs) { }
        OnMouseWheel(e: Input.MouseWheelEventArgs) { }
    }
    Nullstone.RegisterType(UIElement, "UIElement");
}