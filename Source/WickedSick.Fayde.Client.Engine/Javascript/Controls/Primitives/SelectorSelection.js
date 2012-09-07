/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Enums.js"/>
/// <reference path="../../Collections/Enums.js"/>
/// <reference path="../../Core/Collections/Collection.js"/>

//#region SelectorSelection
var SelectorSelection = Nullstone.Create("SelectorSelection", undefined, 1);

SelectorSelection.Instance.Init = function (owner) {
    this._Owner = owner;
    this._Owner.SelectedItems.CollectionChanged.Subscribe(this._HandleOwnerSelectionChanged, this);
    this._SelectedItems = new Collection();
    this.Mode = SelectionMode.Single;
};

SelectorSelection.Instance._HandleOwnerSelectionChanged = function (sender, e) {
    if (this._Updating)
        return;
    if (this.Mode === SelectionMode.Single)
        throw new InvalidOperationException("SelectedItems cannot be modified directly when in Single select mode");
    try {
        this._Updating = true;
        switch (e.Action) {
            case NotifyCollectionChangedAction.Add:
                if (!this._SelectedItems.Contains(e.NewItems[0]))
                    this.AddToSelected(e.NewItems[0]);
                break;
            case NotifyCollectionChangedAction.Remove:
                if (this._SelectedItems.Contains(e.OldItems[0]))
                    this.RemoveFromSelected(e.OldItems[0]);
                break;
            case NotifyCollectionChangedAction.Replace:
                if (this._SelectedItems.Contains(e.OldItems[0]))
                    this.RemoveFromSelected(e.OldItems[0]);
                if (!this._SelectedItems.Contains(e.NewItems[0]))
                        this.AddToSelected(e.NewItems[0]);
                break;
            case NotifyCollectionChangedAction.Reset:
                var items = this._SelectedItems;
                var ownerItems = this._Owner._SelectedItems;

                var count = items.GetCount();
                var item;
                for (var i = 0; i < count; i++) {
                    item = items.GetValueAt(i);
                    if (ownerItems.Contains(item))
                        continue;
                    if (items.Contains(item))
                        this.RemoveFromSelected(item);
                }

                count = ownerItems.GetCount();
                for (var i = 0; i < count; i++) {
                    item = ownerItems.GetValueAt(i);
                    if (!items.Contains(item))
                        this.AddToSelected(item);
                }
                break;
        }

        this._Owner._SelectedItemsIsInvalid = true;
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.RepopulateSelectedItems = function () {
    if (!this._Updating) {
        try {
            this._Updating = true;
            this._Owner._SelectedItems.Clear();
            this._Owner._SelectedItems.AddRange(this._SelectedItems);
        } finally {
            this._Updating = false;
        }
    }
};
SelectorSelection.Instance.ClearSelection = function (ignoreSelectedValue) {
    if (ignoreSelectedValue === undefined) ignoreSelectedValue = false;
    if (this._SelectedItems.GetCount() === 0) {
        this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);
        return;
    }

    try {
        this._Updating = true
        var oldSelection = this._SelectedItems.ToArray();

        this._SelectedItems.Clear();
        this._SelectedItem = null;
        this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);

        this._Owner._SelectedItemsIsInvalid = true;
        this._Owner._RaiseSelectionChanged(oldSelection, []);
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.Select = function (item, ignoreSelectedValue) {
    if (ignoreSelectedValue === undefined) ignoreSelectedValue = false;

    var ownerItems = this._Owner.Items;
    if (!ownerItems.Contains(item))
        return;
    var ownerSelectedValue = this._Owner.SelectedValue;

    var selected = this._SelectedItems.Contains(item);

    try {
        this._Updating = true;

        switch (this.Mode) {
            case SelectionMode.Single:
                if (selected) {
                    if (false/* TODO: ModifierKeys.Control */)
                        this.ClearSelection(ignoreSelectedValue);
                    else
                        this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                } else {
                    this.ReplaceSelection(item);
                }
                break;
            case SelectionMode.Extended:
                if (false/* TODO: ModifierKeys.Shift */) {
                    var sIndex = ownerItems.IndexOf(this._SelectedItem);
                    if (this._SelectedItems.GetCount() === 0)
                        this.SelectRange(0, ownerItems.IndexOf(item));
                    else
                        this.SelectRange(sIndex, ownerItems.IndexOf(item));
                } else if (false/* TODO: ModifierKeys.Control */) {
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
                if (this._SelectedItems.Contains(item))
                    this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                else
                    this.AddToSelected(item);
                break;
            default:
                throw new NotSupportedException("SelectionMode " + this.Mode + " is not support");
        }
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.SelectRange = function (startIndex, endIndex) {
    var ownerItems = this._Owner.Items;
    var selectedItems = this._SelectedItems;

    var select = new Collection();
    for (var i = startIndex; i <= endIndex; i++) {
        select.Add(ownerItems.GetValueAt(i));
    }

    var unselect = [];
    var count = selectedItems.GetCount();
    var item;
    for (var i = 0; i < count; i++) {
        item = selectedItems.GetValueAt(i);
        if (!select.Contains(item))
            unselect.push(item);
        else
            select.Remove(item);
    }

    count = unselect.length;
    for (var i = 0; i < count; i++) {
        selectedItems.Remove(unselect[i]);
    }

    count = select.GetCount();
    for (var i = 0; i < count; i++) {
        selectedItems.Add(select[i]);
    }

    if (!selectedItems.Contains(this._SelectedItem)) {
        this._SelectedItem = selectedItems.GetCount() === 0 ? null : selectedItems.GetValueAt(0);
        this.UpdateSelectorProperties(this._SelectedItem, this._SelectedItem == null ? -1 : ownerItems.IndexOf(this._SelectedItem), this._Owner._GetValueFromItem(this._SelectedItem));
    }

    this._Owner._SelectedItemsIsInvalid = true;
    this._Owner._RaiseSelectionChanged(unselect, select.ToArray());
};
SelectorSelection.Instance.SelectAll = function (items) {
    try {
        this._Updating = true;
        if (this.Mode === SelectionMode.Single)
            throw new NotSupportedException ("Cannot call SelectAll when in Single select mode");
        
        var selectedItems = this._SelectedItems;

        var select = [];
        var count = items.GetCount();
        var item;
        for (var i = 0; i < count; i++) {
            item = items.GetValueAt(i);
            if (!selectedItems.Contains(item))
                select.push(item);
        }

        if (select.length === 0)
            return;

        var owner = this._Owner;
        selectedItems.AddRange(select);
        if (this._SelectedItem == null) {
            this._SelectedItem = select[0];
            this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
        }

        owner._SelectedItemsIsInvalid = true;
        owner._RaiseSelectionChanged([], select);
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.SelectOnly = function (item) {
    if (Nullstone.Equals(this._SelectedItem, item) && this._SelectedItems.GetCount() === 1)
        return;

    try {
        this._Updating = true;
        this.ReplaceSelection(item);
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.Unselect = function (item) {
    if (!this._SelectedItems.Contains(item))
        return;

    try {
        this._Updating = true;
        this.RemoveFromSelected(item);
    } finally {
        this._Updating = false;
    }
};
SelectorSelection.Instance.AddToSelected = function (item) {
    this._SelectedItems.Add(item);
    var owner = this._Owner;
    if (this._SelectedItems.GetCount() === 1) {
        this._SelectedItem = item;
        this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));
    }
    owner._SelectedItemsIsInvalid = true;
    owner._RaiseSelectionChanged([], [item]);
};
SelectorSelection.Instance.RemoveFromSelected = function (item) {
    this._SelectedItems.Remove(item);
    var owner = this._Owner;
    if (Nullstone.Equals(this._SelectedItem, item)) {
        var newItem = this._SelectedItems.GetCount() === 0 ? null : this._SelectedItems.GetValueAt(0);
        this._SelectedItem = newItem;
        this.UpdateSelectorProperties(newItem, newItem == null ? -1 : owner.Items.IndexOf(newItem), owner._GetValueFromItem(item));
    }
    owner._SelectedItemsIsInvalid = true;
    owner._RaiseSelectionChanged([item], []);
};
SelectorSelection.Instance.ReplaceSelection = function (item) {
    var owner = this._Owner;
    if (!this.UpdateCollectionView(item)) {
        this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
        return;
    }

    var added = [];
    var oldItems = [];
    var selectedItems = this._SelectedItems;
    var count = selectedItems.GetCount();
    var cur;
    for (var i = 0; i < count; i++) {
        cur = selectedItems.GetValueAt(i);
        if (!Nullstone.Equals(cur, item))
            oldItems.push(cur);
    }

    count = oldItems.length;
    for (var i = 0; i < count; i++) {
        selectedItems.Remove(oldItems[i]);
    }

    if (selectedItems.GetCount() === 0) {
        added = [item];
        selectedItems.Add(item);
    }

    this._SelectedItem = item;
    this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));

    if (added.length !== 0 || oldItems.length !== 0) {
        owner._SelectedItemsIsInvalid = true;
        owner._RaiseSelectionChanged(oldItems, added);
    }
};
SelectorSelection.Instance.UpdateSelectorProperties = function (item, index, value) {
    var owner = this._Owner;
    if (!Nullstone.Equals(owner.SelectedItem, item))
        owner.SelectedItem = item;

    if (owner.SelectedIndex !== index)
        owner.SelectedIndex = index;

    if (!Nullstone.Equals(owner.SelectedValue, value))
        owner.SelectedValue = value;

    this.UpdateCollectionView(item);
};
SelectorSelection.Instance.UpdateCollectionView = function (item) {
    var icv = Nullstone.As(this._Owner.ItemsSource, ICollectionView);
    if (icv != null) {
        icv.MoveCurrentTo(item);
        return Nullstone.Equals(item, icv.CurrentItem);
    }
    return true;
};

Nullstone.FinishCreate(SelectorSelection);
//#endregion