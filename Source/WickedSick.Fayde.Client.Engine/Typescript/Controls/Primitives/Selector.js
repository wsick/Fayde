var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../ItemsControl.ts" />
        /// CODE
        /// <reference path="../ListBoxItem.ts" />
        /// <reference path="SelectorSelection.ts" />
        /// <reference path="../../Collections/ObservableCollection.ts" />
        /// <reference path="SelectionChangedEventArgs.ts" />
        (function (Primitives) {
            var Selector = (function (_super) {
                __extends(Selector, _super);
                function Selector() {
                                _super.call(this);
                    this.SelectionChanged = new MulticastEvent();
                    this._SelectedItems = new Fayde.Collections.ObservableCollection();
                    this._Initializing = false;
                    this._SelectedItemsIsInvalid = false;
                    this.$TemplateScrollViewer = null;
                    this._SelectedValueWalker = null;
                    this.SelectionChanged = new MulticastEvent();
                    this._Selection = new Primitives.SelectorSelection(this);
                }
                Selector.IsSynchronizedWithCurrentItemProperty = DependencyProperty.Register("IsSynchronizedWithCurrentItem", function () {
                    return Boolean;
                }, Selector, null, function (d, args) {
                    return (d)._OnIsSynchronizedWithCurrentItemChanged(args);
                });
                Selector.SelectedIndexProperty = DependencyProperty.Register("SelectedIndex", function () {
                    return Number;
                }, Selector, -1, function (d, args) {
                    return (d)._OnSelectedIndexChanged(args);
                });
                Selector.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () {
                    return Object;
                }, Selector, undefined, function (d, args) {
                    return (d)._OnSelectedItemChanged(args);
                });
                Selector.SelectedValueProperty = DependencyProperty.Register("SelectedValue", function () {
                    return Object;
                }, Selector, undefined, function (d, args) {
                    return (d)._OnSelectedValueChanged(args);
                });
                Selector.SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", function () {
                    return String;
                }, Selector, "", function (d, args) {
                    return (d)._OnSelectedValuePathChanged(args);
                });
                Selector.IsSelectionActiveProperty = DependencyProperty.RegisterReadOnlyCore("IsSelectionActive", function () {
                    return Boolean;
                }, Selector);
                Object.defineProperty(Selector.prototype, "SynchronizeWithCurrentItem", {
                    get: function () {
                        if(!Nullstone.ImplementsInterface(this.ItemsSource, Fayde.Data.ICollectionView_)) {
                            return false;
                        }
                        return this.IsSynchronizedWithCurrentItem !== false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Selector.prototype, "SelectedItems", {
                    get: function () {
                        if(this._SelectedItemsIsInvalid) {
                            this._Selection.RepopulateSelectedItems();
                        }
                        return this._SelectedItems;
                    },
                    enumerable: true,
                    configurable: true
                });
                Selector.prototype._OnIsSynchronizedWithCurrentItemChanged = function (args) {
                    if(args.NewValue === true) {
                        throw new ArgumentException("Setting IsSynchronizedWithCurrentItem to 'true' is not supported");
                    }
                    if(args.NewValue == null && Nullstone.ImplementsInterface(this.ItemsSource, Fayde.Data.ICollectionView_)) {
                        this.SelectedItem = (this.ItemsSource).CurrentItem;
                    } else {
                        this.SelectedItem = null;
                    }
                };
                Selector.prototype._OnSelectedIndexChanged = function (args) {
                    if(this._Selection.IsUpdating || this._Initializing) {
                        return;
                    }
                    var items = this.Items;
                    if(args.NewValue < 0 || args.NewValue >= items.Count) {
                        this._Selection.ClearSelection();
                    } else {
                        this._Selection.Select(items.GetValueAt(args.NewValue));
                    }
                };
                Selector.prototype._OnSelectedItemChanged = function (args) {
                    if(this._Selection.IsUpdating || this._Initializing) {
                        return;
                    }
                    if(args.NewValue == null) {
                        this._Selection.ClearSelection();
                    } else if(this.Items.IndexOf(args.NewValue) != -1) {
                        this._Selection.Select(args.NewValue);
                    } else if(this.Items.IndexOf(args.OldValue) != -1) {
                        this._Selection.Select(args.OldValue);
                    } else {
                        this._Selection.ClearSelection();
                    }
                };
                Selector.prototype._OnSelectedValueChanged = function (args) {
                    if(this._Selection.IsUpdating || this._Initializing) {
                        return;
                    }
                    this._SelectItemFromValue(args.NewValue, false);
                };
                Selector.prototype._OnSelectedValuePathChanged = function (args) {
                    this._SelectedValueWalker = !args.NewValue ? null : new Fayde.Data.PropertyPathWalker(args.NewValue);
                    if(this._Initializing) {
                        return;
                    }
                    this._SelectItemFromValue(this.SelectedValue, true);
                };
                Selector.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    var temp = this.GetTemplateChild("ScrollViewer");
                    var tsv = (temp instanceof Controls.ScrollViewer) ? temp : null;
                    this.$TemplateScrollViewer = tsv;
                    if(tsv) {
                        tsv.$TemplatedParentHandlesScrolling = true;
                        tsv.HorizontalScrollBarVisibility = Fayde.Controls.ScrollViewer.GetHorizontalScrollBarVisibility(this);
                        tsv.VerticalScrollBarVisibility = Fayde.Controls.ScrollViewer.GetVerticalScrollBarVisibility(this);
                    }
                };
                Selector.prototype.OnItemsChanged = function (e) {
                    if(this._Initializing) {
                        _super.prototype.OnItemsChanged.call(this, e);
                        return;
                    }
                    var item;
                    switch(e.Action) {
                        case Fayde.Collections.NotifyCollectionChangedAction.Add:
                            var lbi;
                            if(e.NewItems[0] instanceof Controls.ListBoxItem) {
                                lbi = e.NewItems[0];
                            }
                            if(lbi != null && lbi.IsSelected && !this.SelectedItems.Contains(lbi)) {
                                this._Selection.Select(lbi);
                            } else if(this.SelectedItem != null) {
                                this._Selection.Select(this.SelectedItem);
                            }
                            break;
                        case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                            var o;
                            var itemsSource = this.ItemsSource;
                            if(Nullstone.ImplementsInterface(itemsSource, Fayde.Data.ICollectionView_) && this.SynchronizeWithCurrentItem) {
                                o = (itemsSource).CurrentItem;
                            } else {
                                o = this.SelectedItem;
                            }
                            if(this.Items.Contains(o)) {
                                this._Selection.Select(o);
                            } else {
                                this._Selection.ClearSelection();
                            }
                            break;
                        case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                            item = e.OldItems[0];
                            if(this.SelectedItems.Contains(item)) {
                                this._Selection.Unselect(item);
                            } else if(e.OldStartingIndex <= this.SelectedIndex) {
                                this._Selection.Select(this.SelectedItem);
                            }
                            break;
                        case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                            item = e.OldItems[0];
                            this._Selection.Unselect(item);
                            break;
                        default:
                            throw new NotSupportedException("Collection changed action '" + e.Action + "' not supported");
                    }
                    _super.prototype.OnItemsChanged.call(this, e);
                };
                Selector.prototype.OnItemsSourceChanged = function (args) {
                    _super.prototype.OnItemsSourceChanged.call(this, args);
                    var view;
                    if(Nullstone.ImplementsInterface(args.OldValue, Fayde.Data.ICollectionView_)) {
                        view = args.OldValue;
                    }
                    if(view) {
                        view.CurrentChanged.Unsubscribe(this._OnCurrentItemChanged, this);
                    }
                    if(Nullstone.ImplementsInterface(args.NewValue, Fayde.Data.ICollectionView_)) {
                        view = args.NewValue;
                    }
                    if(view) {
                        view.CurrentChanged.Subscribe(this._OnCurrentItemChanged, this);
                        if(this.SynchronizeWithCurrentItem) {
                            this._Selection.SelectOnly(view.CurrentItem);
                        } else {
                            this._Selection.ClearSelection();
                        }
                    } else {
                        this._Selection.ClearSelection();
                    }
                };
                Selector.prototype.OnItemContainerStyleChanged = function (oldStyle, newStyle) {
                };
                Selector.prototype.ClearContainerForItem = function (element, item) {
                    _super.prototype.ClearContainerForItem.call(this, element, item);
                    var lbi = element;
                    lbi.ParentSelector = null;
                    if(lbi !== item) {
                        lbi.Content = null;
                    }
                };
                Selector.prototype.PrepareContainerForItem = function (element, item) {
                    _super.prototype.PrepareContainerForItem.call(this, element, item);
                    var lbi = element;
                    lbi.ParentSelector = this;
                    if(this.SelectedItems.Contains(item)) {
                        lbi.IsSelected = true;
                    }
                    if(lbi.IsSelected && !this.SelectedItems.Contains(item)) {
                        this._Selection.Select(item);
                    }
                };
                Selector.prototype._GetValueFromItem = function (item) {
                    if(this._SelectedValueWalker == null) {
                        return item;
                    }
                    if(item == null) {
                        return item;
                    }
                    return this._SelectedValueWalker.GetValue(item);
                };
                Selector.prototype._SelectItemFromValue = function (selectedValue, ignoreSelectedValue) {
                    if(selectedValue == null) {
                        this._Selection.ClearSelection(ignoreSelectedValue);
                        return;
                    }
                    var items = this.Items;
                    var count = items.Count;
                    for(var i = 0; i < count; i++) {
                        var item = items.GetValueAt(i);
                        var val = this._GetValueFromItem(item);
                        if(Nullstone.Equals(selectedValue, val)) {
                            if(!this.SelectedItems.Contains(item)) {
                                this._Selection.Select(item, ignoreSelectedValue);
                            }
                            return;
                        }
                    }
                    this._Selection.ClearSelection(ignoreSelectedValue);
                };
                Selector.prototype._OnCurrentItemChanged = function (sender, e) {
                    if(!this._Selection.IsUpdating && this.SynchronizeWithCurrentItem) {
                        var icv = this.ItemsSource;
                        if(!Nullstone.Equals(icv.CurrentItem, this.SelectedItem)) {
                            this._Selection.SelectOnly(icv.CurrentItem);
                        }
                    }
                };
                Selector.prototype._RaiseSelectionChanged = function (oldVals, newVals) {
                    if(!oldVals) {
                        oldVals = [];
                    }
                    if(!newVals) {
                        newVals = [];
                    }
                    var lbi;
                    var oldCount = oldVals.length;
                    var oldValue;
                    for(var i = 0; i < oldCount; i++) {
                        oldValue = oldVals[i];
                        if(oldValue == null) {
                            continue;
                        }
                        lbi = null;
                        if(oldValue instanceof Controls.ListBoxItem) {
                            lbi = oldValue;
                        }
                        lbi = lbi || this.ItemContainerGenerator.ContainerFromItem(oldValue);
                        if(lbi) {
                            lbi.IsSelected = false;
                        }
                    }
                    var newCount = newVals.length;
                    var newValue;
                    for(var i = 0; i < newCount; i++) {
                        newValue = newVals[i];
                        if(newValue == null) {
                            continue;
                        }
                        lbi = null;
                        if(newValue instanceof Controls.ListBoxItem) {
                            lbi = newValue;
                        }
                        lbi = lbi || this.ItemContainerGenerator.ContainerFromItem(newValue);
                        if(lbi) {
                            lbi.IsSelected = true;
                            lbi.Focus();
                        }
                    }
                    this.SelectionChanged.Raise(this, new Primitives.SelectionChangedEventArgs(oldVals, newVals));
                };
                Selector.prototype.NotifyListItemClicked = function (lbi) {
                    this._Selection.Select(this.ItemContainerGenerator.ItemFromContainer(lbi));
                };
                Selector.prototype.NotifyListItemLoaded = function (lbi) {
                    if(this.ItemContainerGenerator.ItemFromContainer(lbi) === this.SelectedItem) {
                        lbi.IsSelected = true;
                        lbi.Focus();
                    }
                };
                Selector.prototype.NotifyListItemGotFocus = function (lbi) {
                };
                Selector.prototype.NotifyListItemLostFocus = function (lbi) {
                };
                return Selector;
            })(Controls.ItemsControl);
            Primitives.Selector = Selector;            
            Nullstone.RegisterType(Selector, "Selector");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Selector.js.map
