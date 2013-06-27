/// <reference path="../../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../../Primitives/Color.ts" />
/// <reference path="../../Media/SolidColorBrush.ts" />

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode implements IBoundsComputable, IPostComputeTransformable {
        XObject: Popup;
        GetInheritedEnumerator(): IEnumerator<DONode> {
            var popup = (<Popup>this.XObject);
            if (!popup)
                return ArrayEx.EmptyEnumerator;
            var child = popup.Child;
            if (!child)
                return ArrayEx.EmptyEnumerator;
            return ArrayEx.GetEnumerator([popup.Child.XamlNode]);
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) { }

        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            if (!newIsAttached && this.XObject.IsOpen)
                this.XObject.IsOpen = false;
        }

        private _HorizontalOffset: number = 0;
        private _VerticalOffset: number = 0;
        private _IsVisible: bool = false;
        private _IsCatchingClick: bool = false;
        private _Catcher: Canvas = null;
        private _VisualChild: FrameworkElement;
        
        _ChildChanged(oldChild: FrameworkElement, newChild: FrameworkElement) {
            var popup = this.XObject;
            this._Hide();
            if (oldChild)
                Providers.InheritedStore.ClearInheritedOnRemove(popup, oldChild.XamlNode);
            this._PrepareVisualChild(newChild);
            if (newChild) {
                Providers.InheritedStore.PropagateInheritedOnAdd(popup, newChild.XamlNode);
                if (popup.IsOpen)
                    this._Show();
            }
        }
        private _PrepareVisualChild(newChild: UIElement) {
            if (!newChild)
                return;
            if (this._IsCatchingClick) {
                var root = <Canvas>this._VisualChild;
                if (!root) {
                    var root = new Canvas();
                    var clickCatcher = new Canvas();
                    clickCatcher.Background = Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0));
                    clickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
                    clickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
                    root.Children.Add(clickCatcher);
                    this._Catcher = clickCatcher;
                    this._VisualChild = root;
                } else {
                    root.Children.RemoveAt(1);
                }
                root.Children.Add(newChild);
            } else {
                this._VisualChild = <FrameworkElement>newChild;
            }
        }
        CatchClickedOutside() {
            if (!this._IsCatchingClick)
                this._VisualChild = null;
            this._IsCatchingClick = true;
            this._PrepareVisualChild(this.XObject.Child);
        }
        private _UpdateCatcher() {
            var root = this._VisualChild;
            if (!root)
                return;
            var surfaceExtents = this._Surface.Extents;
            root.Width = surfaceExtents.Width;
            root.Height = surfaceExtents.Height;

            var catcher = this._Catcher;
            if (!catcher)
                return;
            catcher.Width = root.Width;
            catcher.Height = root.Height;
        }
        private _RaiseClickedOutside(sender, e) {
            this.XObject.ClickedOutside.Raise(this, EventArgs.Empty);
        }
        
        PostCompute(lu: LayoutUpdater, hasLocalProjection: bool) {
            var child = this.XObject.Child;
            if (!child)
                return;
            var childLu = child.XamlNode.LayoutUpdater;
            var popup = this.XObject;
            if (lu.TotalRenderProjection) {
                var projection = mat4.clone(lu.AbsoluteProjection);
                var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                mat4.multiply(m, projection, projection); //projection = projection * m

                childLu.CarrierProjection = projection;
                childLu.CarrierXform = null;
                childLu.UpdateProjection();
            } else {
                var xform = mat3.clone(lu.AbsoluteXform);
                mat3.translate(xform, popup.HorizontalOffset, popup.VerticalOffset);

                childLu.CarrierProjection = null;
                childLu.CarrierXform = xform;
                childLu.UpdateTransform();
            }
        }

        OnHorizontalOffsetChanged(args: IDependencyPropertyChangedEventArgs) {
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
        OnVerticalOffsetChanged(args: IDependencyPropertyChangedEventArgs) {
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

        _Hide() {
            var child = this._VisualChild;
            if (!this._IsVisible || !child)
                return;
            this._IsVisible = false;
            this.LayoutUpdater.ShouldSkipHitTest = true;
            this._Surface.DetachLayer(child);
        }
        _Show() {
            this._UpdateCatcher();
            var child = this._VisualChild;
            if (this._IsVisible || !child)
                return;
            this._IsVisible = true;
            this.LayoutUpdater.ShouldSkipHitTest = false;
            this._Surface.AttachLayer(child);
        }
    }
    Nullstone.RegisterType(PopupNode, "PopupNode");

    export class Popup extends FrameworkElement {
        XamlNode: PopupNode;
        CreateNode(): PopupNode { return new PopupNode(this); }

        static ChildProperty = DependencyProperty.Register("Child", () => UIElement, Popup, undefined, (d, args) => (<Popup>d)._OnChildChanged(args));
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d).XamlNode.OnHorizontalOffsetChanged(args));
        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d).XamlNode.OnVerticalOffsetChanged(args));
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Popup, false, (d, args) => (<Popup>d)._OnIsOpenChanged(args));
        Child: UIElement;
        HorizontalOffset: number;
        VerticalOffset: number;
        IsOpen: bool;

        static Annotations = { ContentProperty: Popup.ChildProperty }

        Opened: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        Closed: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        ClickedOutside: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        private _OnChildChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldFE: FrameworkElement;
            if (args.OldValue instanceof FrameworkElement) oldFE = <FrameworkElement>args.OldValue;
            var newFE: FrameworkElement;
            if (args.NewValue instanceof FrameworkElement) newFE = <FrameworkElement>args.NewValue;
            this.XamlNode._ChildChanged(oldFE, newFE);
        }
        private _OnIsOpenChanged(args: IDependencyPropertyChangedEventArgs) {
            if (args.NewValue) {
                this.XamlNode._Show();
                this.Opened.RaiseAsync(this, EventArgs.Empty);
            } else {
                this.XamlNode._Hide();
                this.Closed.RaiseAsync(this, EventArgs.Empty);
            }
        }
    }
    Nullstone.RegisterType(Popup, "Popup");
}