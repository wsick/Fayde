/// <reference path="../../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../../Primitives/Color.ts" />
/// <reference path="../../Media/SolidColorBrush.ts" />

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode implements IBoundsComputable {
        XObject: Popup;
        GetInheritedEnumerator(): IEnumerator {
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

        _HitTestPoint(ctx: RenderContext, p: Point, uinlist: UINode[]) {
            if (this.XObject.IsVisible)
                super._HitTestPoint(ctx, p, uinlist);
        }
    }
    Nullstone.RegisterType(PopupNode, "PopupNode");

    export class Popup extends FrameworkElement {
        CreateNode(): PopupNode {
            return new PopupNode(this);
        }

        static ChildProperty = DependencyProperty.Register("Child", () => UIElement, Popup, undefined, (d, args) => (<Popup>d)._OnChildChanged(args));
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d)._OnOffsetChanged(args));
        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, Popup, 0.0, (d, args) => (<Popup>d)._OnOffsetChanged(args));
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Popup, false, (d, args) => (<Popup>d)._OnIsOpenChanged(args));
        Child: UIElement;
        HorizontalOffset: number;
        VerticalOffset: number;
        IsOpen: bool;

        static Annotations = { ContentProperty: Popup.ChildProperty }

        private _ClickCatcher: Canvas = null;
        private _IsVisible: bool = false;
        get IsVisible(): bool { return this._IsVisible; }
        Opened: MulticastEvent = new MulticastEvent();
        Closed: MulticastEvent = new MulticastEvent();
        ClickedOutside: MulticastEvent = new MulticastEvent();

        get RealChild(): FrameworkElement {
            if (this._ClickCatcher)
                return <FrameworkElement>(<Canvas>this.Child).Children.GetValueAt(1);
            return <FrameworkElement>this.Child;
        }

        private _Hide(child: UIElement) {
            if (!this._IsVisible || !child)
                return;
            this._IsVisible = false;
            App.Instance.MainSurface.DetachLayer(child);
        }
        private _Show(child: UIElement) {
            if (this._IsVisible || !child)
                return;
            this._IsVisible = true;
            App.Instance.MainSurface.AttachLayer(child);
        }

        private _OnOpened() {
            this._UpdateCatcher();
            this.Opened.RaiseAsync(this, EventArgs.Empty);
        }
        private _OnClosed() {
            this.Closed.RaiseAsync(this, EventArgs.Empty);
        }

        CatchClickedOutside() {
            var child = this.Child;
            if (!child)
                return;

            var root = new Canvas();
            this._ClickCatcher = new Canvas();

            this._ClickCatcher.Background = Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0));
            this.Child = root;
            root.Children.Add(this._ClickCatcher);
            root.Children.Add(child);
            this._ClickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
            this._ClickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
        }
        private _UpdateCatcher() {
            if (!this._ClickCatcher)
                return;

            try {
                var xform = this.Child.TransformToVisual(null);
                if (xform instanceof Media.Transform) {
                    this._ClickCatcher.Projection = null;
                    this._ClickCatcher.RenderTransform = (<Media.Transform>xform).Inverse;
                } else if (xform instanceof Media.InternalTransform) {
                    var projection = (<Media.InternalTransform>xform).CreateMatrix3DProjection();
                    this._ClickCatcher.RenderTransform = null;
                    this._ClickCatcher.Projection = projection;
                }
            } catch (err) {
                if (!(err instanceof ArgumentException))
                    throw err;
            }
            var surfaceExtents = App.Instance.MainSurface.Extents;
            this._ClickCatcher.Width = surfaceExtents.Width;
            this._ClickCatcher.Height = surfaceExtents.Height;
        }
        private _RaiseClickedOutside(sender, e) {
            this.ClickedOutside.Raise(this, EventArgs.Empty);
        }

        private _OnChildChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldFE: FrameworkElement;
            if (args.OldValue instanceof FrameworkElement) oldFE = <FrameworkElement>args.OldValue;
            var newFE: FrameworkElement;
            if (args.NewValue instanceof FrameworkElement) newFE = <FrameworkElement>args.NewValue;

            var error = new BError();
            if (oldFE) {
                if (this.IsOpen)
                    this._Hide(oldFE);
                //TODO: Fix this
                //this.XamlNode.DetachVisualChild(oldFE, error);
                this._Store.ClearInheritedOnRemove(oldFE.XamlNode);
            }
            if (newFE) {
                //TODO: Fix this
                //this.XamlNode.AttachVisualChild(newFE, error);
                this._Store.PropagateInheritedOnAdd(newFE.XamlNode);
                if (this.IsOpen)
                    this._Show(newFE);
            }
            if (error.Message)
                error.ThrowException();
        }
        private _OnOffsetChanged(args: IDependencyPropertyChangedEventArgs) {
            var child = this.Child;
            if (child)
                child.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        private _OnIsOpenChanged(args: IDependencyPropertyChangedEventArgs) {
            if (args.NewValue) {
                this._Show(this.Child);
                this._OnOpened();
            } else {
                this._Hide(this.Child);
                this._OnClosed();
            }
        }
    }
    Nullstone.RegisterType(Popup, "Popup");
}