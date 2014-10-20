/// <reference path="../../Core/FrameworkElement.ts" />

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode {
        XObject: Popup;

        GetInheritedEnumerator (): IEnumerator<DONode> {
            var popup = (<Popup>this.XObject);
            if (!popup)
                return ArrayEx.EmptyEnumerator;
            var child = popup.Child;
            if (!child)
                return ArrayEx.EmptyEnumerator;
            return ArrayEx.GetEnumerator([popup.Child.XamlNode]);
        }

        OnIsAttachedChanged (newIsAttached: boolean) {
            super.OnIsAttachedChanged(newIsAttached);
            if (!newIsAttached && this.XObject.IsOpen)
                this.XObject.IsOpen = false;
        }

        private _HorizontalOffset: number = 0;
        private _VerticalOffset: number = 0;
        private _IsVisible: boolean = false;
        private _IsCatchingClick: boolean = false;
        private _Catcher: Canvas = null;
        private _VisualChild: FrameworkElement;
        private _OverlayBrush: Media.Brush = null;

        constructor (popup: Popup) {
            super(popup);
            this.SetOverlayBrush(Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0)));
        }

        SetOverlayBrush (brush: Media.Brush) {
            this._OverlayBrush = brush;
            if (this._Catcher)
                this._Catcher.Background = brush;
        }

        _ChildChanged (oldChild: FrameworkElement, newChild: FrameworkElement) {
            var popup = this.XObject;
            this._Hide();
            if (oldChild) {
                Providers.InheritedStore.ClearInheritedOnRemove(popup, oldChild.XamlNode);
                oldChild.XamlNode.LayoutUpdater.CarrierProjection = null;
                oldChild.XamlNode.LayoutUpdater.CarrierXform = null;
            }
            this._PrepareVisualChild(newChild);
            if (newChild) {
                Providers.InheritedStore.PropagateInheritedOnAdd(popup, newChild.XamlNode);
                newChild.XamlNode.LayoutUpdater.CarrierXform = mat3.identity();
                if (popup.IsOpen)
                    this._Show();
            }
        }

        private _PrepareVisualChild (newChild: UIElement) {
            if (!newChild)
                return;

            var root = <Canvas>this._VisualChild;
            if (!root) {
                root = new Canvas();
                root.Children.Add(newChild);
                this._VisualChild = root;
            }

            if (this._IsCatchingClick && !this._Catcher) {
                var clickCatcher = new Canvas();
                clickCatcher.Background = this._OverlayBrush;
                clickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
                clickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
                root.Children.Insert(0, clickCatcher);
                this._Catcher = clickCatcher;
            }
        }

        CatchClickedOutside () {
            this._IsCatchingClick = true;
            this._PrepareVisualChild(this.XObject.Child);
        }

        private _UpdateCatcher () {
            var root = this._VisualChild;
            if (!root)
                return;
            var surface = this._Surface || Fayde.Application.Current.MainSurface;
            var surfaceExtents = surface.Extents;
            root.Width = surfaceExtents.Width;
            root.Height = surfaceExtents.Height;

            var catcher = this._Catcher;
            if (!catcher)
                return;
            catcher.Width = root.Width;
            catcher.Height = root.Height;
        }

        private _RaiseClickedOutside (sender, e) {
            this.XObject.ClickedOutside.Raise(this, EventArgs.Empty);
        }

        OnHorizontalOffsetChanged (args: IDependencyPropertyChangedEventArgs) {
            var child = this.XObject.Child;
            if (!child)
                return;
            var childLu = child.XamlNode.LayoutUpdater;
            var tween = <number>args.NewValue - this._HorizontalOffset;
            if (tween === 0)
                return;
            this._HorizontalOffset = args.NewValue;
            if (childLu.CarrierProjection) {
                var m = mat4.createTranslate(tween, 0.0, 0.0);
                mat4.multiply(m, childLu.CarrierProjection, childLu.CarrierProjection);
            } else if (childLu.CarrierXform) {
                mat3.translate(childLu.CarrierXform, tween, 0.0);
            }
            this._VisualChild.InvalidateMeasure();
        }

        OnVerticalOffsetChanged (args: IDependencyPropertyChangedEventArgs) {
            var child = this.XObject.Child;
            if (!child)
                return;
            var childLu = child.XamlNode.LayoutUpdater;
            var tween = <number>args.NewValue - this._VerticalOffset;
            if (tween === 0)
                return;
            this._VerticalOffset = args.NewValue;
            if (childLu.CarrierProjection) {
                var m = mat4.createTranslate(0.0, tween, 0.0);
                mat4.multiply(m, childLu.CarrierProjection, childLu.CarrierProjection);
            } else if (childLu.CarrierXform) {
                mat3.translate(childLu.CarrierXform, 0.0, tween);
            }
            this._VisualChild.InvalidateMeasure();
        }

        _Hide () {
            var child = this._VisualChild;
            if (!this._IsVisible || !child)
                return;
            this._IsVisible = false;
            this.LayoutUpdater.ShouldSkipHitTest = true;
            var surface = this._Surface || Fayde.Application.Current.MainSurface;
            surface.DetachLayer(child);
        }

        _Show () {
            this._UpdateCatcher();
            var child = this._VisualChild;
            if (this._IsVisible || !child)
                return;
            this._IsVisible = true;
            this.LayoutUpdater.ShouldSkipHitTest = false;
            var surface = this._Surface || Fayde.Application.Current.MainSurface;
            surface.AttachLayer(child);
        }
    }
    Fayde.RegisterType(PopupNode, "Fayde.Controls.Primitives");

    export class Popup extends FrameworkElement {
        XamlNode: PopupNode;

        CreateNode (): PopupNode {
            return new PopupNode(this);
        }

        CreateLayoutUpdater (node: PopupNode) {
            return new PopupLayoutUpdater(node);
        }

        static ChildProperty = DependencyProperty.Register("Child", () => UIElement, Popup, undefined, (d, args) => (<Popup>d)._OnChildChanged(args));
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d).XamlNode.OnHorizontalOffsetChanged(args));
        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d).XamlNode.OnVerticalOffsetChanged(args));
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Popup, false, (d, args) => (<Popup>d)._OnIsOpenChanged(args));
        Child: UIElement;
        HorizontalOffset: number;
        VerticalOffset: number;
        IsOpen: boolean;

        Opened = new MulticastEvent<EventArgs>();
        Closed = new MulticastEvent<EventArgs>();
        ClickedOutside = new MulticastEvent<EventArgs>();

        private _OnChildChanged (args: IDependencyPropertyChangedEventArgs) {
            var oldFE: FrameworkElement;
            if (args.OldValue instanceof FrameworkElement) oldFE = <FrameworkElement>args.OldValue;
            var newFE: FrameworkElement;
            if (args.NewValue instanceof FrameworkElement) newFE = <FrameworkElement>args.NewValue;
            this.XamlNode._ChildChanged(oldFE, newFE);
        }

        private _OnIsOpenChanged (args: IDependencyPropertyChangedEventArgs) {
            if (args.NewValue) {
                this.XamlNode._Show();
                this.Opened.RaiseAsync(this, EventArgs.Empty);
            } else {
                this.XamlNode._Hide();
                this.Closed.RaiseAsync(this, EventArgs.Empty);
            }
        }
    }
    Fayde.RegisterType(Popup, "Fayde.Controls.Primitives", Fayde.XMLNS);
    Xaml.Content(Popup, Popup.ChildProperty);

    export class PopupLayoutUpdater extends LayoutUpdater {
        ComputeBounds () {
        }

        PostComputeTransform (hasProjection: boolean) {
            var popup = <Popup>this.Node.XObject;
            var child = popup.Child;
            if (!child)
                return;
            var childLu = child.XamlNode.LayoutUpdater;
            if (this.TotalRenderProjection) {
                var projection = mat4.clone(this.AbsoluteProjection);
                var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                mat4.multiply(m, projection, projection); //projection = projection * m

                childLu.CarrierProjection = projection;
                childLu.CarrierXform = null;
                childLu.UpdateProjection();
            } else {
                var xform = mat3.clone(this.AbsoluteXform);
                mat3.translate(xform, popup.HorizontalOffset, popup.VerticalOffset);

                childLu.CarrierProjection = null;
                childLu.CarrierXform = xform;
                childLu.UpdateTransform();
            }
        }
    }
}