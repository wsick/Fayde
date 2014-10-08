/// <reference path="Panel.ts" />

module Fayde.Controls {
    export enum VirtualizationMode {
        Standard = 0,
        Recycling = 1,
    }
    Fayde.RegisterEnum(VirtualizationMode, "VirtualizationMode", Fayde.XMLNS);

    export class VirtualizingPanel extends Panel {
        static VirtualizationModeProperty = DependencyProperty.RegisterAttached("VirtualizationMode", () => new Enum(VirtualizationMode), VirtualizingPanel, VirtualizationMode.Recycling, VirtualizingPanel.OnVirtualizationModePropertyChanged);
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode { return d.GetValue(VirtualizingPanel.VirtualizationModeProperty); }
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode) { d.SetValue(VirtualizingPanel.VirtualizationModeProperty, value); }
        private static OnVirtualizationModePropertyChanged(dobj: DependencyObject, args: DependencyPropertyChangedEventArgs) {
            var ic = <ItemsControl>dobj;
            if (ic instanceof ItemsControl)
                ic.ItemContainersManager.IsRecycling = args.NewValue === VirtualizationMode.Recycling;
        }

        static IsVirtualizingProperty = DependencyProperty.RegisterAttached("IsVirtualizing", () => Boolean, VirtualizingPanel, false);
        static GetIsVirtualizing(d: DependencyObject): boolean { return d.GetValue(VirtualizingPanel.IsVirtualizingProperty); }
        static SetIsVirtualizing(d: DependencyObject, value: boolean) { d.SetValue(VirtualizingPanel.IsVirtualizingProperty, value); }

        get ItemsControl(): ItemsControl {
            var presenter = ItemsPresenter.Get(this);
            return presenter ? presenter.ItemsControl : null;
        }

        OnItemsAdded(index: number, newItems: any[]) { 
            this.XamlNode.LayoutUpdater.invalidateMeasure();
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            this.XamlNode.LayoutUpdater.invalidateMeasure();
        }
    }
    Fayde.RegisterType(VirtualizingPanel, "Fayde.Controls", Fayde.XMLNS);
}