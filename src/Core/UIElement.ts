/// <reference path="DependencyObject.ts" />
/// <reference path="Providers/InheritedStore.ts" />
/// <reference path="Enums.ts" />
/// <reference path="InheritableOwner.ts" />

module Fayde {
    export class UINode extends DONode {
        XObject: UIElement;
        LayoutUpdater: minerva.core.Updater;
        IsMouseOver: boolean = false;

        constructor(xobj: UIElement) {
            super(xobj);
            this.LayoutUpdater = xobj.CreateLayoutUpdater();
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

        GetInheritedEnumerator(): IEnumerator<DONode> {
            //TODO: May need to change this
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }

        IsLoaded: boolean = false;
        SetIsLoaded(value: boolean) { }

        OnVisualChildAttached(uie: UIElement) {
            var un = uie.XamlNode;
            Providers.InheritedStore.PropagateInheritedOnAdd(this.XObject, un);
            un.SetVisualParentNode(this);
        }
        OnVisualChildDetached(uie: UIElement) {
            var un = uie.XamlNode;
            un.SetVisualParentNode(null);
            Providers.InheritedStore.ClearInheritedOnRemove(this.XObject, un);
        }

        private SetVisualParentNode(visualParentNode: UINode) {
            if (this.VisualParentNode === visualParentNode)
                return;
            this.VisualParentNode = visualParentNode;
            this.LayoutUpdater.setVisualParent(visualParentNode.LayoutUpdater);
        }

        Focus(recurse?: boolean): boolean { return false; }

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
        _EmitMouseEvent(type: Input.MouseInputType, isLeftButton: boolean, isRightButton: boolean, args: Input.MouseEventArgs): boolean {
            var x = this.XObject;
            switch (type) {
                case Input.MouseInputType.MouseUp:
                    if (isLeftButton) {
                        x.OnMouseLeftButtonUp(<Input.MouseButtonEventArgs>args);
                        x.MouseLeftButtonUp.Raise(x, args);
                    } else if (isRightButton) {
                        x.OnMouseRightButtonUp(<Input.MouseButtonEventArgs>args);
                        x.MouseRightButtonUp.Raise(x, args);
                    }
                    break;
                case Input.MouseInputType.MouseDown:
                    if (isLeftButton) {
                        x.OnMouseLeftButtonDown(<Input.MouseButtonEventArgs>args);
                        x.MouseLeftButtonDown.Raise(x, args);
                    } else if (isRightButton) {
                        x.OnMouseRightButtonDown(<Input.MouseButtonEventArgs>args);
                        x.MouseRightButtonDown.Raise(x, args);
                    }
                    break;
                case Input.MouseInputType.MouseLeave:
                    this.IsMouseOver = false;
                    x.OnMouseLeave(args);
                    x.MouseLeave.Raise(x, args);
                    break;
                case Input.MouseInputType.MouseEnter:
                    this.IsMouseOver = true;
                    x.OnMouseEnter(args);
                    x.MouseEnter.Raise(x, args);
                    break;
                case Input.MouseInputType.MouseMove:
                    x.OnMouseMove(args);
                    x.MouseMove.Raise(x, args);
                    break;
                case Input.MouseInputType.MouseWheel:
                    x.OnMouseWheel(<Input.MouseWheelEventArgs>args);
                    x.MouseWheel.Raise(x, <Input.MouseWheelEventArgs>args);
                    break;
                default:
                    return false;
            }
            return args.Handled;
        }
        _EmitTouchEvent(type: Input.TouchInputType, args: Input.TouchEventArgs) {
            var x = this.XObject;
            switch (type) {
                case Input.TouchInputType.TouchDown:
                    x.OnTouchDown(args);
                    x.TouchDown.Raise(x, args);
                    break;
                case Input.TouchInputType.TouchUp:
                    x.OnTouchUp(args);
                    x.TouchUp.Raise(x, args);
                    break;
                case Input.TouchInputType.TouchMove:
                    x.OnTouchMove(args);
                    x.TouchMove.Raise(x, args);
                    break;
                case Input.TouchInputType.TouchEnter:
                    x.OnTouchEnter(args);
                    x.TouchEnter.Raise(x, args);
                    break;
                case Input.TouchInputType.TouchLeave:
                    x.OnTouchLeave(args);
                    x.TouchLeave.Raise(x, args);
                    break;
                default:
                    return false;
            }
            return args.Handled;
        }
        _EmitGotTouchCapture(e: Input.TouchEventArgs) {
            var x = this.XObject;
            x.OnGotTouchCapture(e);
            x.GotTouchCapture.Raise(this, e);
        }
        _EmitLostTouchCapture(e: Input.TouchEventArgs) {
            var x = this.XObject;
            x.OnLostTouchCapture(e);
            x.LostTouchCapture.Raise(this, e);
        }

        CanCaptureMouse(): boolean { return true; }
        CaptureMouse(): boolean {
            if (!this.IsAttached)
                return false;
            Surface.SetMouseCapture(this);
            return true;
        }
        ReleaseMouseCapture() {
            if (!this.IsAttached)
                return;
            Surface.ReleaseMouseCapture(this);
        }

        InvalidateParent(r: minerva.Rect) {
            var vpNode = this.VisualParentNode;
            if (vpNode)
                vpNode.LayoutUpdater.Invalidate(r);
            else if (this.IsAttached)
                this._Surface.invalidate(r);
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
                        curNode = curNode.VisualParentNode;
                    }
                }
                if (!ok)
                    throw new ArgumentException("UIElement not attached.");
            }

            return this.LayoutUpdater.TransformToVisual(uin);
        }
    }
    Fayde.RegisterType(UINode, "Fayde");

    export class UIElement extends DependencyObject implements Providers.IIsPropertyInheritable {
        XamlNode: UINode;
        private _ClipListener: Media.IGeometryListener = null;
        private _EffectListener: Media.Effects.IEffectListener = null;
        private _TransformListener: Media.ITransformChangedListener = null;
        CreateNode(): UINode { return new UINode(this); }
        CreateLayoutUpdater(): minerva.core.Updater { return new minerva.core.Updater(); }

        get IsItemsControl(): boolean { return false; }

        get VisualParent() {
            var vpNode = this.XamlNode.VisualParentNode;
            if (vpNode) return vpNode.XObject;
            return undefined;
        }

        static AllowDropProperty: DependencyProperty;
        static CacheModeProperty: DependencyProperty;
        static ClipProperty = DependencyProperty.RegisterCore("Clip", () => Media.Geometry, UIElement, undefined, MLReaction('clip'));
        static EffectProperty = DependencyProperty.Register("Effect", () => Media.Effects.Effect, UIElement, undefined, MLReaction('effect'));
        static IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", () => Boolean, UIElement, true, MReaction('isHitTestVisible'));
        static OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", () => Media.Brush, UIElement);
        static OpacityProperty = DependencyProperty.RegisterCore("Opacity", () => Number, UIElement, 1.0, MReaction('opacity'));
        static ProjectionProperty = DependencyProperty.Register("Projection", () => Media.Projection, UIElement, undefined, MReaction('projection',  Media.Projection.copyMatTo));
        static RenderTransformProperty = DependencyProperty.RegisterFull("RenderTransform", () => Media.Transform, UIElement, undefined, MLReaction('renderTransform', Media.Transform.copyMatTo), undefined, undefined, undefined, false);
        static RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", () => Point, UIElement, undefined, MReaction('renderTransformOrigin'));
        static TagProperty = DependencyProperty.Register("Tag", () => Object, UIElement);
        static TriggersProperty: DependencyProperty = DependencyProperty.RegisterCore("Triggers", () => TriggerCollection, UIElement, undefined, (d, args) => (<UIElement>d)._TriggersChanged(args));
        static UseLayoutRoundingProperty = InheritableOwner.UseLayoutRoundingProperty.ExtendTo(UIElement);
        static VisibilityProperty = DependencyProperty.RegisterCore("Visibility", () => new Enum(Visibility), UIElement, Visibility.Visible, MReaction('visibility', null, (uie, nv, ov) => Surface.RemoveFocusFrom(uie)));

        IsInheritable(propd: DependencyProperty): boolean {
            return propd === UIElement.UseLayoutRoundingProperty;
        }

        get IsMouseOver() { return this.XamlNode.IsMouseOver; }
        get DesiredSize(): Size { return this.XamlNode.LayoutUpdater.DesiredSize; }
        get RenderSize(): Size { return this.XamlNode.LayoutUpdater.RenderSize; }

        //AllowDrop: boolean;
        //CacheMode;
        Clip: Media.Geometry;
        Effect: Media.Effects.Effect;
        IsHitTestVisible: boolean;
        Cursor: CursorType;
        OpacityMask: Media.Brush;
        Opacity: number;
        Projection: Media.Projection;
        RenderTransform: Media.Transform;
        RenderTransformOrigin: Point;
        Tag: any;
        Triggers: TriggerCollection;
        UseLayoutRounding: boolean;
        Visibility: Visibility;

        Focus(): boolean { return this.XamlNode.Focus(); }
        CaptureMouse():boolean { return this.XamlNode.CaptureMouse(); }
        ReleaseMouseCapture() { this.XamlNode.ReleaseMouseCapture(); }

        IsAncestorOf(uie: UIElement): boolean {
            if (!uie) return false;
            return this.XamlNode.IsAncestorOf(uie.XamlNode);
        }
        TransformToVisual(uie: UIElement): Media.GeneralTransform {
            var uin = (uie) ? uie.XamlNode : null;
            return this.XamlNode.TransformToVisual(uin);
        }

        InvalidateMeasure() { this.XamlNode.LayoutUpdater.invalidateMeasure(); }
        Measure(availableSize: minerva.Size) {
            this.XamlNode.LayoutUpdater.measure(availableSize);
        }
        InvalidateArrange() { this.XamlNode.LayoutUpdater.invalidateArrange(); }
        Arrange(finalRect: minerva.Rect) {
            this.XamlNode.LayoutUpdater.arrange(finalRect);
        }

        LostFocus = new RoutedEvent<RoutedEventArgs>();
        GotFocus = new RoutedEvent<RoutedEventArgs>();
        LostMouseCapture = new RoutedEvent<Input.MouseEventArgs>();
        KeyDown = new RoutedEvent<Input.KeyEventArgs>();
        KeyUp = new RoutedEvent<Input.KeyEventArgs>();
        MouseLeftButtonUp = new RoutedEvent<Input.MouseButtonEventArgs>();
        MouseRightButtonUp = new RoutedEvent<Input.MouseButtonEventArgs>();
        MouseLeftButtonDown = new RoutedEvent<Input.MouseButtonEventArgs>();
        MouseRightButtonDown = new RoutedEvent<Input.MouseButtonEventArgs>();
        MouseLeave = new RoutedEvent<Input.MouseEventArgs>();
        MouseEnter = new RoutedEvent<Input.MouseEventArgs>();
        MouseMove = new RoutedEvent<Input.MouseEventArgs>();
        MouseWheel = new RoutedEvent<Input.MouseWheelEventArgs>();
        TouchDown = new RoutedEvent<Input.TouchEventArgs>();
        TouchUp = new RoutedEvent<Input.TouchEventArgs>();
        TouchEnter = new RoutedEvent<Input.TouchEventArgs>();
        TouchLeave = new RoutedEvent<Input.TouchEventArgs>();
        TouchMove = new RoutedEvent<Input.TouchEventArgs>();
        GotTouchCapture = new RoutedEvent<Input.TouchEventArgs>();
        LostTouchCapture = new RoutedEvent<Input.TouchEventArgs>();

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
        OnTouchDown(e: Input.TouchEventArgs) { }
        OnTouchUp(e: Input.TouchEventArgs) { }
        OnTouchEnter(e: Input.TouchEventArgs) { }
        OnTouchLeave(e: Input.TouchEventArgs) { }
        OnTouchMove(e: Input.TouchEventArgs) { }
        OnGotTouchCapture(e: Input.TouchEventArgs) { }
        OnLostTouchCapture(e: Input.TouchEventArgs) { }

        private _TriggersChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldTriggers = <TriggerCollection>args.OldValue;
            var newTriggers = <TriggerCollection>args.NewValue;
            if (oldTriggers instanceof TriggerCollection)
                oldTriggers.DetachTarget(this);
            if (newTriggers instanceof TriggerCollection)
                newTriggers.AttachTarget(this);
        }
    }
    Fayde.RegisterType(UIElement, "Fayde", Fayde.XMLNS);
}