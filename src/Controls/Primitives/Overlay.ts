/// <reference path="../../Core/FrameworkElement" />

module Fayde.Controls.Primitives {
    import OverlayUpdater = minerva.controls.overlay.OverlayUpdater;
    var DEFAULT_MASK_BRUSH = "#33000000";

    export class OverlayNode extends FENode {
        LayoutUpdater: OverlayUpdater;
        XObject: Overlay;

        private _Layer: Panel = null;
        private _Mask: Border = null;

        EnsureLayer () {
            if (!this._Layer) {
                this._Layer = new Panel();
                this.LayoutUpdater.setLayer(this._Layer.XamlNode.LayoutUpdater);
            }
            return this._Layer;
        }

        EnsureMask () {
            if (!this._Mask) {
                this._Mask = new Border();
                this._Mask.MouseLeftButtonDown.on(this._OnMaskMouseDown, this);
                this.UpdateMask();
            }
            return this._Mask;
        }

        private _OnMaskMouseDown (sender, args: Input.MouseButtonEventArgs) {
            this.XObject.SetCurrentValue(Overlay.IsOpenProperty, false);
        }

        UpdateMask () {
            var mask = this._Mask;
            if (mask) {
                var mb = this.XObject.MaskBrush;
                if (mb === undefined)
                    mb = nullstone.convertAnyToType(DEFAULT_MASK_BRUSH, Media.Brush);
                this._Mask.Background = mb;
            }
        }

        OnIsAttachedChanged (newIsAttached: boolean) {
            super.OnIsAttachedChanged(newIsAttached);
            this.RegisterInitiator(this.VisualParentNode.XObject);
            if (newIsAttached) {
                this.EnsureLayer().Children.Insert(0, this.EnsureMask());
            }
            if (!newIsAttached && this.XObject.IsOpen)
                this.XObject.IsOpen = false;
        }

        RegisterInitiator (initiator: UIElement) {
            if (!(initiator instanceof UIElement))
                return;
            this.LayoutUpdater.setInitiator(initiator.XamlNode.LayoutUpdater);
        }
    }

    export class Overlay extends FrameworkElement {
        XamlNode: OverlayNode;
        CreateNode (): OverlayNode { return new OverlayNode(this); }
        CreateLayoutUpdater (): OverlayUpdater { return new OverlayUpdater(); }

        static VisualProperty = DependencyProperty.Register("Visual", () => UIElement, Overlay);
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Overlay);
        static MaskBrushProperty = DependencyProperty.Register("MaskBrush", () => Media.Brush, Overlay);
        Visual: UIElement;
        IsOpen: boolean;
        MaskBrush: Media.Brush;

        Opened = new nullstone.Event<nullstone.IEventArgs>();
        Closed = new nullstone.Event<nullstone.IEventArgs>();
    }
    Fayde.CoreLibrary.add(Overlay);
    Markup.Content(Overlay, Overlay.VisualProperty);

    module reactions {
        UIReaction<boolean>(Overlay.IsOpenProperty, (upd, ov, nv, overlay?: Overlay) => {
            ov = ov || false;
            nv = nv || false;
            if (ov === nv)
                return;
            if (nv === true) {
                overlay.Opened.raiseAsync(overlay, null);
            } else {
                overlay.Closed.raiseAsync(overlay, null);
            }
            minerva.controls.overlay.reactTo.isOpen(upd, ov, nv);
        }, false);
        UIReaction<UIElement>(Overlay.VisualProperty, (upd, ov, nv, overlay?: Overlay) => {
            var layer = overlay.XamlNode.EnsureLayer();
            if (ov)
                layer.Children.Remove(ov);
            if (nv)
                layer.Children.Add(nv);
        }, false, false);
        DPReaction<Media.Brush>(Overlay.MaskBrushProperty, (overlay: Overlay, ov, nv) => {
            overlay.XamlNode.UpdateMask();
        });
    }
}