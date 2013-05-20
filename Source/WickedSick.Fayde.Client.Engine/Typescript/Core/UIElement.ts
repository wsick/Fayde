/// <reference path="DependencyObject.ts" />
/// <reference path="XamlNode.ts" />
/// <reference path="Providers/InheritedStore.ts" />
/// <reference path="Enums.ts" />
/// <reference path="../Media/Effects/Effect.ts"/>
/// <reference path="../Media/Transform.ts"/>
/// <reference path="../Media/Projection.ts"/>
/// <reference path="../Primitives/Point.ts"/>
/// <reference path="InheritableOwner.ts" />
/// CODE
/// <reference path="../Engine/Surface.ts" />
/// <reference path="Walkers.ts" />
/// <reference path="LayoutUpdater.ts" />
/// <reference path="../Runtime/MulticastEvent.ts"/>
/// <reference path="RoutedEvent.ts"/>
/// <reference path="../Engine/Interfaces.ts"/>
/// <reference path="../Media/GeneralTransform.ts"/>
/// <reference path="Triggers.ts"/>

module Fayde {
    export class UINode extends DONode {
        XObject: UIElement;
        LayoutUpdater: LayoutUpdater;
        IsTopLevel: bool = false;
        private _Surface: Surface;
        IsMouseOver: bool = false;

        SetSurfaceFromVisualParent(): UINode {
            if (this._Surface)
                return this.VisualParentNode;
            var vpNode = this.VisualParentNode;
            if (vpNode)
                this.SetSurface(vpNode._Surface);
            return vpNode;
        }
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
        GetVisualRoot(): UINode {
            var curNode = this;
            var vpNode: UINode;
            while (vpNode = curNode.VisualParentNode) {
                curNode = vpNode;
            }
            return curNode;
        }

        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            var vpNode: UINode = null;
            if (newIsAttached)
                vpNode = this.SetSurfaceFromVisualParent();
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, vpNode);
            super.OnIsAttachedChanged(newIsAttached);
        }

        IsLoaded: bool = false;
        SetIsLoaded(value: bool) { }

        OnVisualChildAttached(uie: UIElement) {
            var lu = this.LayoutUpdater;
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.PreviousConstraint = undefined;

            var un = uie.XamlNode;
            un.SetVisualParentNode(this);
            Providers.InheritedStore.PropagateInheritedOnAdd(this.XObject, un);
            un.LayoutUpdater.OnAddedToTree();
        }
        OnVisualChildDetached(uie: UIElement) {
            var lu = this.LayoutUpdater;
            var un = uie.XamlNode;
            lu.Invalidate(un.LayoutUpdater.SurfaceBoundsWithChildren);
            lu.InvalidateMeasure();

            un.SetVisualParentNode(null);
            un.LayoutUpdater.OnRemovedFromTree();
            Providers.InheritedStore.ClearInheritedOnRemove(this.XObject, un);
        }

        private SetVisualParentNode(visualParentNode: UINode) {
            if (this.VisualParentNode === visualParentNode)
                return;
            this.VisualParentNode = visualParentNode;
            if (visualParentNode) {
                this.SetSurface(visualParentNode._Surface);
            } else {
                this.SetSurface(null);
            }
        }

        Focus(recurse?: bool): bool { return false; }

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
        _EmitMouseEvent(type: InputType, isLeftButton: bool, isRightButton: bool, args: Input.MouseEventArgs): bool {
            var x = this.XObject;
            switch (type) {
                case InputType.MouseUp:
                    if (isLeftButton) {
                        x.OnMouseLeftButtonUp(<Input.MouseButtonEventArgs>args);
                        x.MouseLeftButtonUp.Raise(x, args);
                    } else if (isRightButton) {
                        x.OnMouseRightButtonUp(<Input.MouseButtonEventArgs>args);
                        x.MouseRightButtonUp.Raise(x, args);
                    }
                    break;
                case InputType.MouseDown:
                    if (isLeftButton) {
                        x.OnMouseLeftButtonDown(<Input.MouseButtonEventArgs>args);
                        x.MouseLeftButtonDown.Raise(x, args);
                    } else if (isRightButton) {
                        x.OnMouseRightButtonDown(<Input.MouseButtonEventArgs>args);
                        x.MouseRightButtonDown.Raise(x, args);
                    }
                    break;
                case InputType.MouseLeave:
                    this.IsMouseOver = false;
                    x.OnMouseLeave(args);
                    x.MouseLeave.Raise(x, args);
                    break;
                case InputType.MouseEnter:
                    this.IsMouseOver = true;
                    x.OnMouseEnter(args);
                    x.MouseEnter.Raise(x, args);
                    break;
                case InputType.MouseMove:
                    x.OnMouseMove(args);
                    x.MouseMove.Raise(x, args);
                    break;
                case InputType.MouseWheel:
                    x.OnMouseWheel(<Input.MouseWheelEventArgs>args);
                    x.MouseWheel.Raise(x, args);
                    break;
                default:
                    return false;
            }
            return args.Handled;
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

        InvalidateParent(r: rect) {
            var vpNode = this.VisualParentNode;
            if (vpNode)
                vpNode.LayoutUpdater.Invalidate(r);
            else if (this.IsAttached)
                this._Surface._Invalidate(r);
        }
        InvalidateClip(oldClip: Media.Geometry, newClip: Media.Geometry) {
            var lu = this.LayoutUpdater;
            if (!newClip)
                rect.clear(lu.ClipBounds);
            else
                rect.copyTo(newClip.GetBounds(), lu.ClipBounds);
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
            lu.UpdateBounds(true);
            lu.UpdateClip();
        }
        InvalidateEffect(oldEffect: Media.Effects.Effect, newEffect: Media.Effects.Effect) {
            var lu = this.LayoutUpdater;
            var changed = (newEffect) ? newEffect.GetPadding(lu.EffectPadding) : false;
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
            if (changed)
                lu.UpdateBounds();
            lu.ComputeComposite();

            if (oldEffect !== newEffect && this.IsAttached)
                this._Surface._AddDirtyElement(this.LayoutUpdater, _Dirty.Transform);
        }
        InvalidateOpacity() {
            var lu = this.LayoutUpdater;
            lu.UpdateTotalRenderVisibility();
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
        }
        InvalidateVisibility(newVisibility: Visibility) {
            var lu = this.LayoutUpdater;

            if (newVisibility === Visibility.Visible)
                lu.Flags |= UIElementFlags.RenderVisible;
            else
                lu.Flags &= ~UIElementFlags.RenderVisible;

            lu.UpdateTotalRenderVisibility();
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);

            lu.InvalidateMeasure();
            var vpNode = this.VisualParentNode;
            if (vpNode)
                vpNode.LayoutUpdater.InvalidateMeasure();
            var surface = this._Surface;
            if (surface) surface._RemoveFocusFrom(lu);
        }

        IsAncestorOf(uin: UINode) {
            var vpNode = uin;
            while (vpNode && vpNode !== this)
                vpNode = vpNode.VisualParentNode;
            return vpNode === this;
        }

        TransformToVisual(uin: UINode): Media.GeneralTransform {
            if (uin && !uin.IsAttached)
                throw new ArgumentException("UIElement not attached.");

            var curNode = this;
            var ok = false;
            var surface = this._Surface;
            if (this.IsAttached) {
                while (curNode) {
                    if (curNode.IsTopLevel)
                        ok = true;
                    curNode = curNode.VisualParentNode;
                }
            }

            if (!ok)
                throw new ArgumentException("UIElement not attached.");

            if (uin && !uin.IsTopLevel) {
                ok = false;
                curNode = uin.VisualParentNode;
                if (curNode && uin.IsAttached) {
                    while (curNode) {
                        if (curNode.IsTopLevel)
                            ok = true;
                        curNode.VisualParentNode;
                    }
                }
                if (!ok)
                    throw new ArgumentException("UIElement not attached.");
            }

            return this.LayoutUpdater.TransformToVisual(uin);
        }
    }
    Nullstone.RegisterType(UINode, "UINode");

    export class UIElement extends DependencyObject implements Providers.IIsPropertyInheritable {
        XamlNode: UINode;
        private _ClipListener: Media.IGeometryListener = null;
        private _EffectListener: Media.Effects.IEffectListener = null;
        CreateNode(): UINode { return new UINode(this); }

        static AllowDropProperty: DependencyProperty;
        static CacheModeProperty: DependencyProperty;
        static ClipProperty = DependencyProperty.RegisterCore("Clip", () => Media.Geometry, UIElement, undefined, (d, args) => (<UIElement>d)._ClipChanged(args));
        static EffectProperty = DependencyProperty.Register("Effect", () => Media.Effects.Effect, UIElement, undefined, (d, args) => (<UIElement>d)._EffectChanged(args));
        static IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", () => Boolean, UIElement, true, (d, args) => (<UIElement>d)._IsHitTestVisibleChanged(args));
        static OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", () => Media.Brush, UIElement);
        static OpacityProperty = DependencyProperty.RegisterCore("Opacity", () => Number, UIElement, 1.0, (d, args) => (<UIElement>d).XamlNode.InvalidateOpacity());
        static ProjectionProperty = DependencyProperty.Register("Projection", () => Media.Projection, UIElement, undefined, (d, args) => (<UIElement>d).XamlNode.LayoutUpdater.UpdateProjection());
        static RenderTransformProperty = DependencyProperty.Register("RenderTransform", () => Media.Transform, UIElement, undefined, (d, args) => (<UIElement>d).XamlNode.LayoutUpdater.UpdateTransform());
        static RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", () => Point, UIElement, undefined, (d, args) => (<UIElement>d).XamlNode.LayoutUpdater.UpdateTransform());
        static TagProperty = DependencyProperty.Register("Tag", () => Object, UIElement);
        static TriggersProperty: DependencyProperty = DependencyProperty.RegisterCore("Triggers", () => TriggerCollection, UIElement, undefined, (d, args) => (<UIElement>d)._TriggersChanged(args));
        static UseLayoutRoundingProperty = InheritableOwner.UseLayoutRoundingProperty.ExtendTo(UIElement);
        static VisibilityProperty = DependencyProperty.RegisterCore("Visibility", () => new Enum(Visibility), UIElement, Visibility.Visible, (d, args) => (<UIElement>d).XamlNode.InvalidateVisibility(args.NewValue));
        
        private IsInheritable(propd: DependencyProperty): bool {
            return propd === UIElement.UseLayoutRoundingProperty;
        }

        get IsMouseOver() { return this.XamlNode.IsMouseOver; }
        get DesiredSize(): size { return this.XamlNode.LayoutUpdater.DesiredSize; }
        get RenderSize(): size { return this.XamlNode.LayoutUpdater.RenderSize; }

        //AllowDrop: bool;
        //CacheMode;
        Clip: Media.Geometry;
        Effect: Media.Effects.Effect;
        IsHitTestVisible: bool;
        Cursor: string;
        OpacityMask: Media.Brush;
        Opacity: number;
        Projection: Media.Projection;
        RenderTransform: Media.Transform;
        RenderTransformOrigin: Point;
        Tag: any;
        Triggers: TriggerCollection;
        UseLayoutRounding: bool;
        Visibility: Visibility;
        
        Focus(): bool { return this.XamlNode.Focus(); }
        CaptureMouse():bool { return this.XamlNode.CaptureMouse(); }
        ReleaseMouseCapture() { this.XamlNode.ReleaseMouseCapture(); }

        IsAncestorOf(uie: UIElement): bool {
            if (!uie) return false;
            return this.XamlNode.IsAncestorOf(uie.XamlNode);
        }
        TransformToVisual(uie: UIElement): Media.GeneralTransform {
            var uin = (uie) ? uie.XamlNode : null;
            return this.XamlNode.TransformToVisual(uin);
        }

        InvalidateMeasure() { this.XamlNode.LayoutUpdater.InvalidateMeasure(); }
        Measure(availableSize: size) {
            var error = new BError();
            this.XamlNode.LayoutUpdater._Measure(availableSize, error);
            if (error.Message)
                error.ThrowException();
        }
        InvalidateArrange() { this.XamlNode.LayoutUpdater.InvalidateArrange(); }
        Arrange(finalRect: rect) {
            var error = new BError();
            this.XamlNode.LayoutUpdater._Arrange(finalRect, error);
            if (error.Message)
                error.ThrowException();
        }

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

        private _ClipChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldClip: Media.Geometry = args.OldValue;
            var newClip: Media.Geometry = args.NewValue;
            this.XamlNode.InvalidateClip(oldClip, newClip);
            if (oldClip == newClip)
                return;
            if (oldClip)
                oldClip.Unlisten(this._ClipListener);
            if (newClip) {
                if (!this._ClipListener)
                    this._ClipListener = { GeometryChanged: (newGeometry: Media.Geometry) => this.XamlNode.InvalidateClip(newGeometry, newGeometry) };
                newClip.Listen(this._ClipListener);
            }
        }
        private _EffectChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldEffect: Media.Effects.Effect = args.OldValue;
            var newEffect: Media.Effects.Effect = args.NewValue;
            this.XamlNode.InvalidateEffect(oldEffect, newEffect);
            if (oldEffect === newEffect)
                return;
            if (oldEffect)
                oldEffect.Unlisten(this._EffectListener);
            if (newEffect) {
                if (!this._EffectListener)
                    this._EffectListener = { EffectChanged: (effect: Media.Effects.Effect) => this.XamlNode.InvalidateEffect(effect, effect) };
                newEffect.Listen(this._EffectListener);
            }
        }
        private _UseLayoutRoundingChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
        }
        private _IsHitTestVisibleChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            if (args.NewValue === true) {
                lu.Flags |= UIElementFlags.HitTestVisible;
            } else {
                lu.Flags &= ~UIElementFlags.HitTestVisible;
            }
            lu.UpdateTotalHitTestVisibility();
        }
        private _TriggersChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldTriggers = <TriggerCollection>args.OldValue;
            var newTriggers = <TriggerCollection>args.NewValue;
            if (oldTriggers instanceof TriggerCollection)
                oldTriggers.DetachTarget(this);
            if (newTriggers instanceof TriggerCollection)
                newTriggers.AttachTarget(this);
        }
    }
    Nullstone.RegisterType(UIElement, "UIElement");
}