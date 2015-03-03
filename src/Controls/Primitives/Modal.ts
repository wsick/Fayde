/// <reference path="../../Core/FrameworkElement" />

module Fayde.Controls.Primitives {
    import ModalUpdater = minerva.controls.modal.ModalUpdater;
    var DEFAULT_MASK_BRUSH = "#33000000";

    export class ModalNode extends FENode {
        LayoutUpdater: ModalUpdater;
        XObject: Modal;

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
            this.XObject.SetCurrentValue(Modal.IsOpenProperty, false);
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

    export class Modal extends FrameworkElement {
        XamlNode: ModalNode;
        CreateNode (): ModalNode { return new ModalNode(this); }
        CreateLayoutUpdater (): ModalUpdater { return new ModalUpdater(); }

        static ChildProperty = DependencyProperty.Register("Child", () => UIElement, Modal);
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, Modal);
        static MaskBrushProperty = DependencyProperty.Register("MaskBrush", () => Media.Brush, Modal);
        Child: UIElement;
        IsOpen: boolean;
        MaskBrush: Media.Brush;

        Opened = new nullstone.Event<nullstone.IEventArgs>();
        Closed = new nullstone.Event<nullstone.IEventArgs>();
    }
    Fayde.CoreLibrary.add(Modal);
    Markup.Content(Modal, Modal.ChildProperty);

    module reactions {
        UIReaction<boolean>(Modal.IsOpenProperty, (upd, ov, nv, modal?: Modal) => {
            if (nv === true) {
                modal.Opened.raiseAsync(modal, null);
            } else {
                modal.Closed.raiseAsync(modal, null);
            }
            minerva.controls.modal.reactTo.isOpen(upd, ov, nv);
        }, false);
        UIReaction<UIElement>(Modal.ChildProperty, (upd, ov, nv, modal?: Modal) => {
            var layer = modal.XamlNode.EnsureLayer();
            if (ov)
                layer.Children.Remove(ov);
            if (nv)
                layer.Children.Add(nv);
        }, false, false);
        DPReaction<Media.Brush>(Modal.MaskBrushProperty, (modal: Modal, ov, nv) => {
            modal.XamlNode.UpdateMask();
        });
    }
}