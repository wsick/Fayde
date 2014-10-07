/// <reference path="../../Core/FrameworkElement.ts" />

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode {
        LayoutUpdater: minerva.controls.popup.PopupUpdater;
        XObject: Popup;

        ClickedOutside = new MulticastEvent<EventArgs>();

        OnIsAttachedChanged (newIsAttached: boolean) {
            super.OnIsAttachedChanged(newIsAttached);
            if (!newIsAttached && this.XObject.IsOpen)
                this.XObject.IsOpen = false;
        }

        private _Overlay: Canvas = null;
        private _Catcher: Canvas = null;

        EnsureOverlay (): Canvas {
            if (!this._Overlay) {
                this._Overlay = new Canvas();
                this.LayoutUpdater.tree.visualChild = this._Overlay.XamlNode.LayoutUpdater;
            }
            return this._Overlay;
        }

        EnsureCatcher (): Canvas {
            var catcher = this._Catcher;
            if (this.ClickedOutside.HasListeners && !catcher) {
                catcher = this._Catcher = new Canvas();
                catcher.Background = Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0));
                catcher.LayoutUpdated.Subscribe(this.UpdateCatcher, this);
                catcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
                this.EnsureOverlay().Children.Insert(0, catcher);
            }
            return catcher;
        }

        UpdateCatcher () {
            var root = this._Overlay;
            if (!root)
                return;
            var surface = root.XamlNode.LayoutUpdater.tree.surface;
            if (!surface)
                return;
            root.Width = surface.width;
            root.Height = surface.height;
            var catcher = this._Catcher;
            if (!catcher)
                return;
            catcher.Width = root.Width;
            catcher.Height = root.Height;
        }

        private _RaiseClickedOutside (sender, e) {
            this.ClickedOutside.Raise(this, EventArgs.Empty);
        }

    }
    Fayde.RegisterType(PopupNode, "Fayde.Controls.Primitives");

    export class Popup extends FrameworkElement {
        XamlNode: PopupNode;

        CreateNode (): PopupNode {
            return new PopupNode(this);
        }

        CreateLayoutUpdater () {
            return new minerva.controls.popup.PopupUpdater();
        }

        static ChildProperty = DependencyProperty.Register("Child", () => UIElement, Popup);
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, Popup, 0.0);
        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, Popup, 0.0);
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Popup, false);
        Child: UIElement;
        HorizontalOffset: number;
        VerticalOffset: number;
        IsOpen: boolean;

        Opened = new MulticastEvent<EventArgs>();
        Closed = new MulticastEvent<EventArgs>();

        WatchOutsideClick (callback: () => void, closure: any) {
            this.XamlNode.ClickedOutside.Subscribe(callback, closure);
            this.XamlNode.EnsureCatcher();
        }
    }
    Fayde.RegisterType(Popup, "Fayde.Controls.Primitives", Fayde.XMLNS);
    Xaml.Content(Popup, Popup.ChildProperty);

    module reactions {
        UIReaction<boolean>(Popup.IsOpenProperty, (upd, ov, nv, popup?: Popup) => {
            if (nv === true) {
                popup.Opened.RaiseAsync(popup, EventArgs.Empty);
                popup.XamlNode.UpdateCatcher();
            } else {
                popup.Closed.RaiseAsync(popup, EventArgs.Empty);
            }
            minerva.controls.popup.reactTo.isOpen(upd, ov, nv);
        }, false);
        UIReaction<UIElement>(Popup.ChildProperty, (upd, ov, nv, popup?: Popup) => {
            var overlay = popup.XamlNode.EnsureOverlay();
            if (ov) {
                Providers.InheritedStore.ClearInheritedOnRemove(popup, ov.XamlNode);
                overlay.Children.Remove(ov);
                upd.tree.child = null;
            }
            upd.setChild(nv.XamlNode.LayoutUpdater);
            if (nv) {
                upd.tree.child = nv.XamlNode.LayoutUpdater;
                popup.XamlNode.EnsureCatcher();
                overlay.Children.Add(nv);
                Providers.InheritedStore.PropagateInheritedOnAdd(popup, nv.XamlNode);
            }
        }, false, false);
        UIReaction<number>(Popup.HorizontalOffsetProperty, minerva.controls.popup.reactTo.horizontalOffset, false);
        UIReaction<number>(Popup.VerticalOffsetProperty, minerva.controls.popup.reactTo.verticalOffset, false);
    }
}