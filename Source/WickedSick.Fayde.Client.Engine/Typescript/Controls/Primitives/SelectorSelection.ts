/// <reference path="../../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Enums.ts" />
/// <reference path="Selector.ts" />

module Fayde.Controls.Primitives {
    export class SelectorSelection {
        private _Owner: Selector;
        private _SelectedItems: any[] = [];
        private _SelectedItem: any = null;
        private _IsUpdating: bool = false;
        Mode: SelectionMode = SelectionMode.Single;

        get IsUpdating(): bool { return this._IsUpdating; }

        constructor(owner: Selector) {
            this._Owner = owner;
            this._Owner.SelectedItems.CollectionChanged.Subscribe(this._HandleOwnerSelectionChanged, this);
        }

        private _HandleOwnerSelectionChanged(sender, e: Collections.NotifyCollectionChangedEventArgs) {
            if (this._IsUpdating)
                return;
            if (this.Mode === SelectionMode.Single)
                throw new InvalidOperationException("SelectedItems cannot be modified directly when in Single select mode");
            try {
                var items = this._SelectedItems;
                this._IsUpdating = true;
                switch (e.Action) {
                    case Collections.NotifyCollectionChangedAction.Add:
                        if (items.indexOf(e.NewItems[0]) < 0)
                            this.AddToSelected(e.NewItems[0]);
                        break;
                    case Collections.NotifyCollectionChangedAction.Remove:
                        if (items.indexOf(e.OldItems[0]) > -1)
                            this.RemoveFromSelected(e.OldItems[0]);
                        break;
                    case Collections.NotifyCollectionChangedAction.Replace:
                        if (items.indexOf(e.OldItems[0]) > -1)
                            this.RemoveFromSelected(e.OldItems[0]);
                        if (items.indexOf(e.NewItems[0]) < 0)
                            this.AddToSelected(e.NewItems[0]);
                        break;
                    case Collections.NotifyCollectionChangedAction.Reset:
                        var ownerItems = this._Owner.SelectedItems;

                        var item: any;
                        var enumerator = ownerItems.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            item = enumerator.Current;
                            if (ownerItems.Contains(item))
                                continue;
                            if (items.indexOf(item) > -1)
                                this.RemoveFromSelected(item);
                        }

                        enumerator = ownerItems.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            item = enumerator.Current;
                            if (items.indexOf(item) < 0)
                                this.AddToSelected(item);
                        }
                        break;
                }

                this._Owner._SelectedItemsIsInvalid = true;
            } finally {
                this._IsUpdating = false;
            }
        }
        RepopulateSelectedItems() {
            if (!this._IsUpdating) {
                try {
                    this._IsUpdating = true;
                    var si: Collections.ObservableCollection = this._Owner.SelectedItems;
                    si.Clear();
                    si.AddRange(this._SelectedItems);
                } finally {
                    this._IsUpdating = false;
                }
            }
        }
        ClearSelection(ignoreSelectedValue?: bool) {
            if (ignoreSelectedValue === undefined) ignoreSelectedValue = false;
            if (this._SelectedItems.length === 0) {
                this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);
                return;
            }

            try {
                this._IsUpdating = true
                var oldSelection = this._SelectedItems.slice(0);

                this._SelectedItems = [];
                this._SelectedItem = null;
                this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);

                this._Owner._SelectedItemsIsInvalid = true;
                this._Owner._RaiseSelectionChanged(oldSelection, []);
            } finally {
                this._IsUpdating = false;
            }
        }
        Select(item: any, ignoreSelectedValue?: bool) {
            if (ignoreSelectedValue === undefined) ignoreSelectedValue = false;

            var ownerItems = this._Owner.Items;
            if (!ownerItems.Contains(item))
                return;
            var ownerSelectedValue = this._Owner.SelectedValue;

            var selectedItems = this._SelectedItems;
            var selected = selectedItems.indexOf(item) > -1;

            try {
                this._IsUpdating = true;

                switch (this.Mode) {
                    case SelectionMode.Single:
                        if (selected) {
                            if (Fayde.Input.Keyboard.HasControl())
                                this.ClearSelection(ignoreSelectedValue);
                            else
                                this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                        } else {
                            this.ReplaceSelection(item);
                        }
                        break;
                    case SelectionMode.Extended:
                        if (Fayde.Input.Keyboard.HasShift()) {
                            var sIndex = ownerItems.IndexOf(this._SelectedItem);
                            if (selectedItems.length === 0)
                                this.SelectRange(0, ownerItems.IndexOf(item));
                            else
                                this.SelectRange(sIndex, ownerItems.IndexOf(item));
                        } else if (Fayde.Input.Keyboard.HasControl()) {
                            if (!selected)
                                this.AddToSelected(item);
                        } else {
                            if (selected)
                                this.RemoveFromSelected(item);
                            else
                                this.AddToSelected(item);
                        }
                        break;
                    case SelectionMode.Multiple:
                        if (selectedItems.indexOf(item) > -1)
                            this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                        else
                            this.AddToSelected(item);
                        break;
                    default:
                        throw new NotSupportedException("SelectionMode " + this.Mode + " is not supported.");
                }
            } finally {
                this._IsUpdating = false;
            }
        }
        SelectRange(startIndex: number, endIndex: number) {
            var ownerItems = this._Owner.Items;
            var selectedItems = this._SelectedItems;

            //Get owner items in range
            var newlySelected = ownerItems.GetRange(startIndex, endIndex);
            var newlyUnselected = [];

            //Remove already selected from selected
            //Add to unselected not in new selection
            var enumerator = ArrayEx.GetEnumerator(selectedItems);
            var item: any;
            while (enumerator.MoveNext()) {
                item = enumerator.Current;
                var index = newlySelected.indexOf(item);
                if (index > -1)
                    newlySelected.splice(index, 1);
                else
                    newlyUnselected.push(item);
            }

            //Remove selected that were found in unselected list
            selectedItems = selectedItems.filter((v) => newlyUnselected.indexOf(v) < 0);
            //Add newly selected items
            selectedItems.push(newlySelected);

            if (selectedItems.indexOf(this._SelectedItem) < 0) {
                this._SelectedItem = selectedItems[0];
                this.UpdateSelectorProperties(this._SelectedItem, this._SelectedItem == null ? -1 : ownerItems.IndexOf(this._SelectedItem), this._Owner._GetValueFromItem(this._SelectedItem));
            }

            this._Owner._SelectedItemsIsInvalid = true;
            this._Owner._RaiseSelectionChanged(newlyUnselected, newlySelected.slice(0));
        }
        SelectAll(items: any[]) {
            try {
                this._IsUpdating = true;
                if (this.Mode === SelectionMode.Single)
                    throw new NotSupportedException("Cannot call SelectAll when in Single select mode");

                var selectedItems = this._SelectedItems;
                var select = ArrayEx.Except(items, selectedItems);
                if (select.length === 0)
                    return;

                var owner = this._Owner;
                selectedItems.push(select);
                if (this._SelectedItem == null) {
                    this._SelectedItem = select[0];
                    this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
                }

                owner._SelectedItemsIsInvalid = true;
                owner._RaiseSelectionChanged([], select);
            } finally {
                this._IsUpdating = false;
            }
        }
        SelectOnly(item: any) {
            if (this._SelectedItem === item && this._SelectedItems.length === 1)
                return;

            try {
                this._IsUpdating = true;
                this.ReplaceSelection(item);
            } finally {
                this._IsUpdating = false;
            }
        }
        Unselect(item: any) {
            if (this._SelectedItems.indexOf(item) < 0)
                return;

            try {
                this._IsUpdating = true;
                this.RemoveFromSelected(item);
            } finally {
                this._IsUpdating = false;
            }
        }
        AddToSelected(item: any) {
            this._SelectedItems.push(item);
            var owner = this._Owner;
            if (this._SelectedItems.length === 1) {
                this._SelectedItem = item;
                this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));
            }
            owner._SelectedItemsIsInvalid = true;
            owner._RaiseSelectionChanged([], [item]);
        }
        RemoveFromSelected(item: any) {
            var selectedItems = this._SelectedItems;
            var index = selectedItems.indexOf(item);
            if (index > -1) selectedItems.splice(index, 1);
            var owner = this._Owner;
            if (this._SelectedItem === item) {
                var newItem = selectedItems[0];
                this._SelectedItem = newItem;
                this.UpdateSelectorProperties(newItem, newItem == null ? -1 : owner.Items.IndexOf(newItem), owner._GetValueFromItem(item));
            }
            owner._SelectedItemsIsInvalid = true;
            owner._RaiseSelectionChanged([item], []);
        }
        ReplaceSelection(item: any) {
            var owner = this._Owner;
            if (!this.UpdateCollectionView(item)) {
                this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
                return;
            }

            var oldItems = this._SelectedItems.slice(0);
            var newItems = [];
            var itemIndex = oldItems.indexOf(item);
            if (itemIndex > -1) {
                oldItems.splice(itemIndex, 1);
            } else {
                newItems.push(item);
            }
            this._SelectedItems = [item];

            this._SelectedItem = item;
            this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));

            if (newItems.length !== 0 || oldItems.length !== 0) {
                owner._SelectedItemsIsInvalid = true;
                owner._RaiseSelectionChanged(oldItems, newItems);
            }
        }
        UpdateSelectorProperties(item: any, index: number, value: any) {
            var owner = this._Owner;
            if (owner.SelectedItem !== item)
                owner.SelectedItem = item;

            if (owner.SelectedIndex !== index)
                owner.SelectedIndex = index;

            if (owner.SelectedValue !== value)
                owner.SelectedValue = value;

            this.UpdateCollectionView(item);
        }
        UpdateCollectionView(item: any) {
            var icv: Data.ICollectionView;
            var is = this._Owner.ItemsSource;
            if (Nullstone.ImplementsInterface(is, Data.ICollectionView_)) icv = <Data.ICollectionView>is;
            if (icv) {
                icv.MoveCurrentTo(item);
                return item === icv.CurrentItem;
            }
            return true;
        }
    }
    Nullstone.RegisterType(SelectorSelection, "SelectorSelection");
}