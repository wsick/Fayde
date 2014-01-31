/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class VirtualizingPanel extends Panel {
        private _ICG: ItemContainerGenerator = null;
        get ItemContainerGenerator(): ItemContainerGenerator {
            var icg = this._ICG;
            if (!icg) {
                var icOwner = ItemsControl.GetItemsOwner(this);
                if (!icOwner)
                    throw new InvalidOperationException("VirtualizingPanels must be in the Template of an ItemsControl in order to generate items");
                var icg = this._ICG = icOwner.ItemContainerGenerator;
                icg.ItemsChanged.Subscribe(this.OnItemContainerGeneratorChanged, this);
            }
            return icg;
        }

        AddInternalChild(child) {
            this.Children.Add(child);
        }
        InsertInternalChild(index: number, child) {
            this.Children.Insert(index, child);
        }
        RemoveInternalChildRange(index: number, range: number) {
            var children = this.Children;
            for (var i = 0; i < range; i++) {
                children.RemoveAt(index);
            }
        }
        BringIndexIntoView(index) { }
        OnClearChildren() { }
        private OnItemContainerGeneratorChanged(sender, e: Primitives.ItemsChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
            if (e.Action === Collections.NotifyCollectionChangedAction.Reset) {
                this.Children.Clear();
                this.ItemContainerGenerator.RemoveAll();
                this.OnClearChildren();
            }
            this.OnItemsChanged(sender, e);
        }
        OnItemsChanged(sender: any, e: Primitives.ItemsChangedEventArgs) { }
    }
    Fayde.RegisterType(VirtualizingPanel, "Fayde.Controls", Fayde.XMLNS);
}