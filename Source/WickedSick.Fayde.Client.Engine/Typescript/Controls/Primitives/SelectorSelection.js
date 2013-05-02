var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// CODE
        /// <reference path="../Enums.ts" />
        /// <reference path="Selector.ts" />
        (function (Primitives) {
            var SelectorSelection = (function () {
                function SelectorSelection(owner) {
                    this._SelectedItems = [];
                    this._SelectedItem = null;
                    this._IsUpdating = false;
                    this.Mode = Controls.SelectionMode.Single;
                    this._Owner = owner;
                    this._Owner.SelectedItems.CollectionChanged.Subscribe(this._HandleOwnerSelectionChanged, this);
                }
                Object.defineProperty(SelectorSelection.prototype, "IsUpdating", {
                    get: function () {
                        return this._IsUpdating;
                    },
                    enumerable: true,
                    configurable: true
                });
                SelectorSelection.prototype._HandleOwnerSelectionChanged = function (sender, e) {
                    if(this._IsUpdating) {
                        return;
                    }
                    if(this.Mode === Controls.SelectionMode.Single) {
                        throw new InvalidOperationException("SelectedItems cannot be modified directly when in Single select mode");
                    }
                    try  {
                        var items = this._SelectedItems;
                        this._IsUpdating = true;
                        switch(e.Action) {
                            case Fayde.Collections.NotifyCollectionChangedAction.Add:
                                if(items.indexOf(e.NewItems[0]) < 0) {
                                    this.AddToSelected(e.NewItems[0]);
                                }
                                break;
                            case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                                if(items.indexOf(e.OldItems[0]) > -1) {
                                    this.RemoveFromSelected(e.OldItems[0]);
                                }
                                break;
                            case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                                if(items.indexOf(e.OldItems[0]) > -1) {
                                    this.RemoveFromSelected(e.OldItems[0]);
                                }
                                if(items.indexOf(e.NewItems[0]) < 0) {
                                    this.AddToSelected(e.NewItems[0]);
                                }
                                break;
                            case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                                var ownerItems = this._Owner.SelectedItems;
                                var item;
                                var enumerator = ownerItems.GetEnumerator();
                                while(enumerator.MoveNext()) {
                                    item = enumerator.Current;
                                    if(ownerItems.Contains(item)) {
                                        continue;
                                    }
                                    if(items.indexOf(item) > -1) {
                                        this.RemoveFromSelected(item);
                                    }
                                }
                                enumerator = ownerItems.GetEnumerator();
                                while(enumerator.MoveNext()) {
                                    item = enumerator.Current;
                                    if(items.indexOf(item) < 0) {
                                        this.AddToSelected(item);
                                    }
                                }
                                break;
                        }
                        this._Owner._SelectedItemsIsInvalid = true;
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.RepopulateSelectedItems = function () {
                    if(!this._IsUpdating) {
                        try  {
                            this._IsUpdating = true;
                            var si = this._Owner.SelectedItems;
                            si.Clear();
                            si.AddRange(this._SelectedItems);
                        }finally {
                            this._IsUpdating = false;
                        }
                    }
                };
                SelectorSelection.prototype.ClearSelection = function (ignoreSelectedValue) {
                    if(ignoreSelectedValue === undefined) {
                        ignoreSelectedValue = false;
                    }
                    if(this._SelectedItems.length === 0) {
                        this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);
                        return;
                    }
                    try  {
                        this._IsUpdating = true;
                        var oldSelection = this._SelectedItems.slice(0);
                        this._SelectedItems = [];
                        this._SelectedItem = null;
                        this.UpdateSelectorProperties(null, -1, ignoreSelectedValue ? this._Owner.SelectedValue : null);
                        this._Owner._SelectedItemsIsInvalid = true;
                        this._Owner._RaiseSelectionChanged(oldSelection, []);
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.Select = function (item, ignoreSelectedValue) {
                    if(ignoreSelectedValue === undefined) {
                        ignoreSelectedValue = false;
                    }
                    var ownerItems = this._Owner.Items;
                    if(!ownerItems.Contains(item)) {
                        return;
                    }
                    var ownerSelectedValue = this._Owner.SelectedValue;
                    var selectedItems = this._SelectedItems;
                    var selected = selectedItems.indexOf(item) > -1;
                    try  {
                        this._IsUpdating = true;
                        switch(this.Mode) {
                            case Controls.SelectionMode.Single:
                                if(selected) {
                                    if(Fayde.Input.Keyboard.HasControl()) {
                                        this.ClearSelection(ignoreSelectedValue);
                                    } else {
                                        this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                                    }
                                } else {
                                    this.ReplaceSelection(item);
                                }
                                break;
                            case Controls.SelectionMode.Extended:
                                if(Fayde.Input.Keyboard.HasShift()) {
                                    var sIndex = ownerItems.IndexOf(this._SelectedItem);
                                    if(selectedItems.length === 0) {
                                        this.SelectRange(0, ownerItems.IndexOf(item));
                                    } else {
                                        this.SelectRange(sIndex, ownerItems.IndexOf(item));
                                    }
                                } else if(Fayde.Input.Keyboard.HasControl()) {
                                    if(!selected) {
                                        this.AddToSelected(item);
                                    }
                                } else {
                                    if(selected) {
                                        this.RemoveFromSelected(item);
                                    } else {
                                        this.AddToSelected(item);
                                    }
                                }
                                break;
                            case Controls.SelectionMode.Multiple:
                                if(selectedItems.indexOf(item) > -1) {
                                    this.UpdateSelectorProperties(this._SelectedItem, ownerItems.IndexOf(this._SelectedItem), ownerSelectedValue);
                                } else {
                                    this.AddToSelected(item);
                                }
                                break;
                            default:
                                throw new NotSupportedException("SelectionMode " + this.Mode + " is not support");
                        }
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.SelectRange = function (startIndex, endIndex) {
                    var ownerItems = this._Owner.Items;
                    var selectedItems = this._SelectedItems;
                    //Get owner items in range
                    var newlySelected = ownerItems.GetRange(startIndex, endIndex);
                    var newlyUnselected = [];
                    //Remove already selected from selected
                    //Add to unselected not in new selection
                    var enumerator = Fayde.ArrayEx.GetEnumerator(selectedItems);
                    var item;
                    while(enumerator.MoveNext()) {
                        item = enumerator.Current;
                        var index = newlySelected.indexOf(item);
                        if(index > -1) {
                            newlySelected.splice(index, 1);
                        } else {
                            newlyUnselected.push(item);
                        }
                    }
                    //Remove selected that were found in unselected list
                    selectedItems = selectedItems.filter(function (v) {
                        return newlyUnselected.indexOf(v) < 0;
                    });
                    //Add newly selected items
                    selectedItems.push(newlySelected);
                    if(selectedItems.indexOf(this._SelectedItem) < 0) {
                        this._SelectedItem = selectedItems[0];
                        this.UpdateSelectorProperties(this._SelectedItem, this._SelectedItem == null ? -1 : ownerItems.IndexOf(this._SelectedItem), this._Owner._GetValueFromItem(this._SelectedItem));
                    }
                    this._Owner._SelectedItemsIsInvalid = true;
                    this._Owner._RaiseSelectionChanged(newlyUnselected, newlySelected.slice(0));
                };
                SelectorSelection.prototype.SelectAll = function (items) {
                    try  {
                        this._IsUpdating = true;
                        if(this.Mode === Controls.SelectionMode.Single) {
                            throw new NotSupportedException("Cannot call SelectAll when in Single select mode");
                        }
                        var selectedItems = this._SelectedItems;
                        var select = Fayde.ArrayEx.Except(items, selectedItems);
                        if(select.length === 0) {
                            return;
                        }
                        var owner = this._Owner;
                        selectedItems.push(select);
                        if(this._SelectedItem == null) {
                            this._SelectedItem = select[0];
                            this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
                        }
                        owner._SelectedItemsIsInvalid = true;
                        owner._RaiseSelectionChanged([], select);
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.SelectOnly = function (item) {
                    if(this._SelectedItem === item && this._SelectedItems.length === 1) {
                        return;
                    }
                    try  {
                        this._IsUpdating = true;
                        this.ReplaceSelection(item);
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.Unselect = function (item) {
                    if(this._SelectedItems.indexOf(item) < 0) {
                        return;
                    }
                    try  {
                        this._IsUpdating = true;
                        this.RemoveFromSelected(item);
                    }finally {
                        this._IsUpdating = false;
                    }
                };
                SelectorSelection.prototype.AddToSelected = function (item) {
                    this._SelectedItems.push(item);
                    var owner = this._Owner;
                    if(this._SelectedItems.length === 1) {
                        this._SelectedItem = item;
                        this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));
                    }
                    owner._SelectedItemsIsInvalid = true;
                    owner._RaiseSelectionChanged([], [
                        item
                    ]);
                };
                SelectorSelection.prototype.RemoveFromSelected = function (item) {
                    var selectedItems = this._SelectedItems;
                    var index = selectedItems.indexOf(item);
                    if(index > -1) {
                        selectedItems.splice(index, 1);
                    }
                    var owner = this._Owner;
                    if(this._SelectedItem === item) {
                        var newItem = selectedItems[0];
                        this._SelectedItem = newItem;
                        this.UpdateSelectorProperties(newItem, newItem == null ? -1 : owner.Items.IndexOf(newItem), owner._GetValueFromItem(item));
                    }
                    owner._SelectedItemsIsInvalid = true;
                    owner._RaiseSelectionChanged([
                        item
                    ], []);
                };
                SelectorSelection.prototype.ReplaceSelection = function (item) {
                    var owner = this._Owner;
                    if(!this.UpdateCollectionView(item)) {
                        this.UpdateSelectorProperties(this._SelectedItem, owner.Items.IndexOf(this._SelectedItem), owner._GetValueFromItem(this._SelectedItem));
                        return;
                    }
                    var added = [];
                    var oldItems = [];
                    var selectedItems = this._SelectedItems;
                    var count = selectedItems.length;
                    var cur;
                    for(var i = 0; i < count; i++) {
                        cur = selectedItems[i];
                        if(cur !== item) {
                            oldItems.push(cur);
                        }
                    }
                    selectedItems = Fayde.ArrayEx.Except(selectedItems, oldItems);
                    if(selectedItems.length === 0) {
                        added = [
                            item
                        ];
                        selectedItems.push(item);
                    }
                    this._SelectedItem = item;
                    this.UpdateSelectorProperties(item, owner.Items.IndexOf(item), owner._GetValueFromItem(item));
                    if(added.length !== 0 || oldItems.length !== 0) {
                        owner._SelectedItemsIsInvalid = true;
                        owner._RaiseSelectionChanged(oldItems, added);
                    }
                };
                SelectorSelection.prototype.UpdateSelectorProperties = function (item, index, value) {
                    var owner = this._Owner;
                    if(owner.SelectedItem !== item) {
                        owner.SelectedItem = item;
                    }
                    if(owner.SelectedIndex !== index) {
                        owner.SelectedIndex = index;
                    }
                    if(owner.SelectedValue !== value) {
                        owner.SelectedValue = value;
                    }
                    this.UpdateCollectionView(item);
                };
                SelectorSelection.prototype.UpdateCollectionView = function (item) {
                    var icv;
                    var is = this._Owner.ItemsSource;
                    if(Nullstone.ImplementsInterface(is, Fayde.Data.ICollectionView_)) {
                        icv = is;
                    }
                    if(icv) {
                        icv.MoveCurrentTo(item);
                        return item === icv.CurrentItem;
                    }
                    return true;
                };
                return SelectorSelection;
            })();
            Primitives.SelectorSelection = SelectorSelection;            
            Nullstone.RegisterType(SelectorSelection, "SelectorSelection");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=SelectorSelection.js.map
