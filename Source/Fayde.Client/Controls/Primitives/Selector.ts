/// <reference path="../ItemsControl.ts" />

module Fayde.Controls.Primitives {
    export class Selector extends ItemsControl {
        static IsSynchronizedWithCurrentItemProperty = DependencyProperty.Register("IsSynchronizedWithCurrentItem", () => Boolean, Selector, null, (d, args) => (<Selector>d)._OnIsSynchronizedWithCurrentItemChanged(args));
        static SelectedIndexProperty = DependencyProperty.Register("SelectedIndex", () => Number, Selector, -1, (d, args) => (<Selector>d)._OnSelectedIndexChanged(args));
        static SelectedItemProperty = DependencyProperty.Register("SelectedItem", () => Object, Selector, undefined, (d, args) => (<Selector>d)._OnSelectedItemChanged(args));
        static SelectedValueProperty = DependencyProperty.Register("SelectedValue", () => Object, Selector, undefined, (d, args) => (<Selector>d)._OnSelectedValueChanged(args));
        static SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", () => String, Selector, "", (d, args) => (<Selector>d)._OnSelectedValuePathChanged(args));
        static IsSelectionActiveProperty = DependencyProperty.RegisterReadOnlyCore("IsSelectionActive", () => Boolean, Selector);
        IsSynchronizedWithCurrentItem: boolean;
        SelectedIndex: number;
        SelectedItem: any;
        SelectedValue: any;
        SelectedValuePath: string;
        IsSelectionActive: boolean;

        SelectionChanged: RoutedEvent<SelectionChangedEventArgs> = new RoutedEvent<SelectionChangedEventArgs>();
        _Selection: SelectorSelection;
        private _SelectedItems: Collections.ObservableCollection<any> = new Collections.ObservableCollection<any>();
        private _Initializing: boolean = false;
        _SelectedItemsIsInvalid: boolean = false;
        $TemplateScrollViewer: ScrollViewer = null;
        private _SelectedValueWalker: Data.PropertyPathWalker = null;

        private get SynchronizeWithCurrentItem(): boolean {
            if (!Nullstone.ImplementsInterface(this.ItemsSource, Data.ICollectionView_))
                return false;
            return this.IsSynchronizedWithCurrentItem !== false;
        }

        constructor() {
            super();
            this._Selection = new SelectorSelection(this);
        }

        get SelectedItems(): Collections.ObservableCollection<any> {
            if (this._SelectedItemsIsInvalid)
                this._Selection.RepopulateSelectedItems();
            return this._SelectedItems;
        }

        private _OnIsSynchronizedWithCurrentItemChanged(args: IDependencyPropertyChangedEventArgs) {
            if (args.NewValue === true)
                throw new ArgumentException("Setting IsSynchronizedWithCurrentItem to 'true' is not supported");

            if (args.NewValue == null && Nullstone.ImplementsInterface(this.ItemsSource, Data.ICollectionView_))
                this.SelectedItem = (<Data.ICollectionView>this.ItemsSource).CurrentItem;
            else
                this.SelectedItem = null;
        }
        private _OnSelectedIndexChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._Selection.IsUpdating || this._Initializing)
                return;

            var items = this.Items;
            if (args.NewValue < 0 || args.NewValue >= items.Count)
                this._Selection.ClearSelection();
            else
                this._Selection.Select(items.GetValueAt(args.NewValue));
        }
        private _OnSelectedItemChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._Selection.IsUpdating || this._Initializing)
                return;

            if (args.NewValue == null)
                this._Selection.ClearSelection();
            else if (this.Items.IndexOf(args.NewValue) !== -1)
                this._Selection.Select(args.NewValue);
            else if (this.Items.IndexOf(args.OldValue) !== -1)
                this._Selection.Select(args.OldValue);
            else
                this._Selection.ClearSelection();
        }
        private _OnSelectedValueChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._Selection.IsUpdating || this._Initializing)
                return;
            this._SelectItemFromValue(args.NewValue, false);
        }
        private _OnSelectedValuePathChanged(args: IDependencyPropertyChangedEventArgs) {
            this._SelectedValueWalker = !args.NewValue ? null : new Data.PropertyPathWalker(args.NewValue);

            if (this._Initializing)
                return;
            this._SelectItemFromValue(this.SelectedValue, true);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            var temp = this.GetTemplateChild("ScrollViewer");
            var tsv: ScrollViewer = (temp instanceof ScrollViewer) ? <ScrollViewer>temp : null;
            this.$TemplateScrollViewer = tsv;
            if (tsv) {
                tsv.$TemplatedParentHandlesScrolling = true;
                tsv.HorizontalScrollBarVisibility = Controls.ScrollViewer.GetHorizontalScrollBarVisibility(this);
                tsv.VerticalScrollBarVisibility = Controls.ScrollViewer.GetVerticalScrollBarVisibility(this);
            }
        }

        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            if (this._Initializing) {
                super.OnItemsChanged(e);
                return;
            }

            var item: any;
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    var lbi: ListBoxItem;
                    if (e.NewItems[0] instanceof ListBoxItem) lbi = <ListBoxItem>e.NewItems[0];
                    if (lbi != null && lbi.IsSelected && !this.SelectedItems.Contains(lbi)) {
                        this._Selection.Select(lbi);
                    } else if (this.SelectedItem != null) {
                        this._Selection.Select(this.SelectedItem);
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    var o;
                    var itemsSource = this.ItemsSource;
                    if (Nullstone.ImplementsInterface(itemsSource, Data.ICollectionView_) && this.SynchronizeWithCurrentItem)
                        o = (<Data.ICollectionView>itemsSource).CurrentItem;
                    else
                        o = this.SelectedItem;
                    if (this.Items.Contains(o))
                        this._Selection.Select(o);
                    else
                        this._Selection.ClearSelection();
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    item = e.OldItems[0];
                    if (this.SelectedItems.Contains(item))
                        this._Selection.Unselect(item);
                    else if (e.OldStartingIndex <= this.SelectedIndex)
                        this._Selection.Select(this.SelectedItem);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    item = e.OldItems[0];
                    this._Selection.Unselect(item);
                    break;
                default:
                    throw new NotSupportedException("Collection changed action '" + e.Action + "' not supported");
            }

            super.OnItemsChanged(e);
        }
        OnItemsSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            super.OnItemsSourceChanged(args);

            var view: Data.ICollectionView;
            if (Nullstone.ImplementsInterface(args.OldValue, Data.ICollectionView_)) view = args.OldValue;
            if (view)
                view.CurrentChanged.Unsubscribe(this._OnCurrentItemChanged, this);

            if (Nullstone.ImplementsInterface(args.NewValue, Data.ICollectionView_)) view = args.NewValue;
            if (view) {
                view.CurrentChanged.Subscribe(this._OnCurrentItemChanged, this);
                if (this.SynchronizeWithCurrentItem)
                    this._Selection.SelectOnly(view.CurrentItem);
                else
                    this._Selection.ClearSelection();
            } else {
                this._Selection.ClearSelection();
            }
        }
        OnItemContainerStyleChanged(oldStyle, newStyle) { }
        ClearContainerForItem(element: DependencyObject, item: any) {
            super.ClearContainerForItem(element, item);
            var lbi = <ListBoxItem>element;
            lbi.ParentSelector = null;
            if (lbi !== item)
                lbi.Content = null;
        }
        PrepareContainerForItem(element: DependencyObject, item: any) {
            super.PrepareContainerForItem(element, item);
            var lbi = <ListBoxItem>element;
            lbi.ParentSelector = this;
            if (this.SelectedItems.Contains(item))
                lbi.IsSelected = true;
            if (lbi.IsSelected && !this.SelectedItems.Contains(item))
                this._Selection.Select(item);
        }

        _GetValueFromItem(item: any) {
            if (this._SelectedValueWalker == null)
                return item;
            if (item == null)
                return item;
            return this._SelectedValueWalker.GetValue(item);
        }
        private _SelectItemFromValue(selectedValue: any, ignoreSelectedValue?: boolean) {
            if (selectedValue == null) {
                this._Selection.ClearSelection(ignoreSelectedValue);
                return;
            }

            var items = this.Items;
            var count = items.Count;
            for (var i = 0; i < count; i++) {
                var item = items.GetValueAt(i);
                var val = this._GetValueFromItem(item);
                if (Nullstone.Equals(selectedValue, val)) {
                    if (!this.SelectedItems.Contains(item))
                        this._Selection.Select(item, ignoreSelectedValue);
                    return;
                }
            }
            this._Selection.ClearSelection(ignoreSelectedValue);
        }

        private _OnCurrentItemChanged(sender, e: EventArgs) {
            if (!this._Selection.IsUpdating && this.SynchronizeWithCurrentItem) {
                var icv = <Data.ICollectionView>this.ItemsSource;
                if (!Nullstone.Equals(icv.CurrentItem, this.SelectedItem))
                    this._Selection.SelectOnly(icv.CurrentItem);
            }
        }

        _RaiseSelectionChanged(oldVals: any[], newVals: any[]) {
            if (!oldVals) oldVals = [];
            if (!newVals) newVals = [];

            var lbi: ListBoxItem;
            var oldCount = oldVals.length;
            var oldValue;
            for (var i = 0; i < oldCount; i++) {
                oldValue = oldVals[i];
                if (oldValue == null)
                    continue;
                lbi = null;
                if (oldValue instanceof ListBoxItem) lbi = <ListBoxItem>oldValue;
                lbi = lbi || <ListBoxItem>this.ItemContainerGenerator.ContainerFromItem(oldValue);
                if (lbi)
                    lbi.IsSelected = false;
            }

            var newCount = newVals.length;
            var newValue;
            for (var i = 0; i < newCount; i++) {
                newValue = newVals[i];
                if (newValue == null)
                    continue;
                lbi = null;
                if (newValue instanceof ListBoxItem) lbi = <ListBoxItem>newValue;
                lbi = lbi || <ListBoxItem>this.ItemContainerGenerator.ContainerFromItem(newValue);
                if (lbi) {
                    lbi.IsSelected = true;
                    lbi.Focus();
                }
            }

            var args = new SelectionChangedEventArgs(oldVals, newVals);
            this.OnSelectionChanged(args);
            this.SelectionChanged.Raise(this, args);
        }
        OnSelectionChanged(args: SelectionChangedEventArgs) { }

        NotifyListItemClicked(lbi: ListBoxItem) {
            this._Selection.Select(this.ItemContainerGenerator.ItemFromContainer(lbi));
        }
        NotifyListItemLoaded(lbi: ListBoxItem) {
            if (this.ItemContainerGenerator.ItemFromContainer(lbi) === this.SelectedItem) {
                lbi.IsSelected = true;
                lbi.Focus();
            }
        }
        NotifyListItemGotFocus(lbi: ListBoxItem) { }
        NotifyListItemLostFocus(lbi: ListBoxItem) { }
    }
    Fayde.RegisterType(Selector, {
    	Name: "Selector",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });
}