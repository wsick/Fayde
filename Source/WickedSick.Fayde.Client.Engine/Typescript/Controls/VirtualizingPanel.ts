/// <reference path="Panel.ts" />
/// CODE
/// <reference path="ItemContainerGenerator.ts" />
/// <reference path="ItemsControl.ts" />

module Fayde.Controls {
    export class VirtualizingPanel extends Panel {
        private _ICG: ItemContainerGenerator = null;
        get ItemContainerGenerator(): ItemContainerGenerator {
            if (!this._ICG) {
                var icOwner = ItemsControl.GetItemsOwner(this);
                if (!icOwner)
                    throw new InvalidOperationException("VirtualizingPanels must be in the Template of an ItemsControl in order to generate items");
                var icg = this._ICG = icOwner.ItemContainerGenerator;
                icg.ItemsChanged.Subscribe(this.OnItemContainerGeneratorChanged, this);
            }
            return this._ICG;
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
        OnItemContainerGeneratorChanged(sender, e: Primitives.ItemsChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
            if (e.Action === Collections.NotifyCollectionChangedAction.Reset) {
                this.Children.Clear();
                this.ItemContainerGenerator.RemoveAll();
                this.OnClearChildren();
            }
        }
    }
    Nullstone.RegisterType(VirtualizingPanel, "VirtualizingPanel");
}