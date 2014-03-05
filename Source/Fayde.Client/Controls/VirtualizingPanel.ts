/// <reference path="Panel.ts" />

module Fayde.Controls {
    export enum VirtualizationMode {
        Standard = 0,
        Recycling = 1,
    }
    Fayde.RegisterEnum(VirtualizationMode, "VirtualizationMode", Fayde.XMLNS);

    export class CleanUpVirtualizedItemEventArgs extends RoutedEventArgs {
        Cancel: boolean = false;
        UIElement: UIElement;
        Value: any;
        constructor(uiElement: UIElement, value: any) {
            super();
            Object.defineProperty(this, "UIElement", { value: uiElement, writable: false });
            Object.defineProperty(this, "Value", { value: value, writable: false });
        }
    }

    export class VirtualizingPanel extends Panel {
        static VirtualizationModeProperty = DependencyProperty.RegisterAttached("VirtualizationMode", () => new Enum(VirtualizationMode), VirtualizingPanel, VirtualizationMode.Recycling);
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode { return d.GetValue(VirtualizingStackPanel.VirtualizationModeProperty); }
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode) { d.SetValue(VirtualizingStackPanel.VirtualizationModeProperty, value); }

        static IsVirtualizingProperty = DependencyProperty.RegisterAttached("IsVirtualizing", () => new Boolean, VirtualizingPanel, false);
        static GetIsVirtualizing(d: DependencyObject): boolean { return d.GetValue(VirtualizingStackPanel.IsVirtualizingProperty); }
        static SetIsVirtualizing(d: DependencyObject, value: boolean) { d.SetValue(VirtualizingStackPanel.IsVirtualizingProperty, value); }

        CleanUpVirtualizedItemEvent = new RoutedEvent<CleanUpVirtualizedItemEventArgs>();

        private _ItemContainersManager: Internal.IItemContainersManager = null;
        get ItemContainersManager(): Internal.IItemContainersManager {
            var icm = this._ItemContainersManager;
            if (!icm) {
                var presenter = ItemsPresenter.Get(this);
                var ic = presenter ? presenter.ItemsControl : null;
                if (!ic)
                    throw new InvalidOperationException("VirtualizingPanels must be in the Template of an ItemsControl in order to generate items");
                var icm = this._ItemContainersManager = ic.ItemContainersManager;
                icm.ItemsChanged.Subscribe(this.OnICGItemsChanged, this);
            }
            return icm;
        }

        private OnICGItemsChanged(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    this.OnAddChildren(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    this.OnRemoveChildren(e.OldStartingIndex, e.OldItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    this.OnRemoveChildren(e.NewStartingIndex, e.OldItems);
                    this.OnAddChildren(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    this.OnRemoveChildren(0, e.OldItems);
                    break;
            }
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        OnAddChildren(index: number, newItems: any[]) { }
        OnRemoveChildren(index: number, oldItems: any[]) {
            this.CleanupContainers(index, oldItems.length);
        }
        CleanupContainers(index: number, count: number) {
            var isRecycling = VirtualizingStackPanel.GetVirtualizationMode(this) === VirtualizationMode.Recycling;
            var remover = this.ItemContainersManager.CreateRemover(index, count);
            while (remover.MoveNext()) {
                var args = new CleanUpVirtualizedItemEventArgs(remover.Current, remover.CurrentItem);
                this.CleanUpVirtualizedItemEvent.Raise(this, args);
                if (args.Cancel)
                    continue;
                this.Children.RemoveAt(remover.CurrentIndex);
                remover.Remove(isRecycling);
            }
        }
    }
    Fayde.RegisterType(VirtualizingPanel, "Fayde.Controls", Fayde.XMLNS);
}