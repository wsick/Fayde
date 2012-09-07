/// <reference path="../ItemsControl.js" />
/// <reference path="../../Core/ISupportInitialize.js"/>
/// CODE
/// <reference path="../ScrollViewer.js"/>
/// <reference path="../ListBoxItem.js"/>
/// <reference path="SelectionChangedEventArgs.js"/>
/// <reference path="SelectorSelection.js"/>
/// <reference path="../../Collections/ObservableCollection.js"/>

//#region Selector
var Selector = Nullstone.Create("Selector", ItemsControl, 0, [ISupportInitialize]);

Selector.Instance.Init = function () {
    this.Init$ItemsControl();
    this.SelectionChanged = new MulticastEvent();
    this._SelectedItems = new ObservableCollection();
    this._Selection = new SelectorSelection(this);
};

//#region Properties

Selector.IsSynchronizedWithCurrentItemProperty = DependencyProperty.Register("IsSynchronizedWithCurrentItem", function () { return Boolean; }, Selector, null, function (d, args) { d._OnIsSynchronizedWithCurrentItemChanged(args); });
Selector.SelectedIndexProperty = DependencyProperty.Register("SelectedIndex", function () { return Number; }, Selector, -1, function (d, args) { d._OnSelectedIndexChanged(args); });
Selector.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () { return Object; }, Selector, undefined, function (d, args) { return d._OnSelectedItemChanged(args); });
Selector.SelectedValueProperty = DependencyProperty.Register("SelectedValue", function () { return Object; }, Selector, undefined, function (d, args) { return d._OnSelectedValueChanged(args); });
Selector.SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", function () { return String; }, Selector, "", function (d, args) { return d._OnSelectedValuePathChanged(args); });

Selector.IsSelectionActiveProperty = DependencyProperty.RegisterReadOnlyCore("IsSelectionActive", function () { return Boolean; }, Selector);

Nullstone.AutoProperties(Selector, [
    Selector.IsSynchronizedWithCurrentItemProperty,
    Selector.SelectedIndexProperty,
    Selector.SelectedItemProperty,
    Selector.SelectedValueProperty,
    Selector.SelectedValuePathProperty
]);

Nullstone.Property(Selector, "$HasItems", {
    get: function () { return this._HasItems; }
});

Nullstone.AutoPropertiesReadOnly(Selector, [
    Selector.IsSelectionActiveProperty
]);

Nullstone.Property(Selector, "$SynchronizeWithCurrentItem", {
    get: function () {
        if (!Nullstone.Is(this.ItemsSource, ICollectionView))
            return false;
        if (this.IsSynchronizedWithCurrentItem === false)
            return false;
        return true;
    }
});

Nullstone.Property(Selector, "SelectedItems", {
    get: function () {
        if (this._SelectedItemsIsInvalid)
            this._Selection.RepopulateSelectedItems();
        return this._SelectedItems;
    }
});

Nullstone.AbstractProperty(Selector, "IsSelectionActive", true);

//#endregion

//#region Property Changed Callbacks

Selector.Instance._OnIsSynchronizedWithCurrentItemChanged = function (args) {
    if (args.NewValue === true)
        throw new ArgumentException("Setting IsSynchronizedWithCurrentItem to 'true' is not supported");

    if (args.NewValue == null && Nullstone.Is(this.ItemsSource, ICollectionView))
        this.SelectedItem = this.ItemsSource.CurrentItem;
    else
        this.SelectedItem = null;
};
Selector.Instance._OnSelectedIndexChanged = function (args) {
    if (this._Selection.Updating || this._Initializing)
        return;

    if (args.NewValue < 0 || args.NewValue >= Items.GetCount())
        this._Selection.ClearSelection();
    else
        this._Selection.Select(this.Items.GetValueAt(args.NewValue));
};
Selector.Instance._OnSelectedItemChanged = function (args) {
    if (this._Selection.Updating || this._Initializing)
        return;

    if (args.NewValue == null)
        this._Selection.ClearSelection();
    else if (this.Items.IndexOf(args.NewValue) != -1)
        this._Selection.Select(args.NewValue);
    else if (this.Items.IndexOf(args.OldValue) != -1)
        this._Selection.Select(args.OldValue);
    else
        this._Selection.ClearSelection();
};
Selector.Instance._OnSelectedValueChanged = function (args) {
    if (this._Selection.Updating || this._Initializing)
        return;
    this._SelectItemFromValue(args.NewValue, false);
};
Selector.Instance._OnSelectedValuePathChanged = function (args) {
    this._SelectedValueWalker = !args.NewValue ? null : new _PropertyPathWalker(args.NewValue);

    if (this._Initializing)
        return;
    this._SelectItemFromValue(this.SelectedValue, true);
};

//#endregion

Selector.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ItemsControl();
    this.$TemplateScrollViewer = Nullstone.As(this.GetTemplateChild("ScrollViewer"), ScrollViewer);
    if (this.$TemplateScrollViewer != null) {
        this.$TemplateScrollViewer.TemplatedParentHandlesScrolling = true;
        this.$TemplateScrollViewer.HorizontalScrollBarVisibility = ScrollViewer.GetHorizontalScrollBarVisibility(this);
        this.$TemplateScrollViewer.VerticalScrollBarVisibility = ScrollViewer.GetVerticalScrollBarVisibility(this);
    }
};

Selector.Instance.OnItemsChanged = function (e) {
    if (this._Initializing) {
        this.OnItemsChanged$ItemsControl(e);
        return;
    }

    var item;
    switch (e.Action) {
        case NotifyCollectionChangedAction.Add:
            item = Nullstone.As(e.NewItems[0], ListBoxItem);
            if (item != null && item.IsSelected && !this.SelectedItems.Contains(item)) {
                this._Selection.Select(item);
            } else if (this.SelectedItem != null) {
                this._Selection.Select(this.SelectedItem);
            }
            break;
        case NotifyCollectionChangedAction.Reset:
            var o;
            var itemsSource = this.ItemsSource;
            if (Nullstone.Is(itemsSource, ICollectionView) && this.$SynchronizeWithCurrentItem)
                o = itemsSource.CurrentItem;
            else
                o = this.SelectedItem;
            if (this.Items.Contains(o))
                this._Selection.Select(o);
            else
                this._Selection.ClearSelection();
            break;
        case NotifyCollectionChangedAction.Remove:
            item = e.OldItems[0];
            if (this.SelectedItems.Contains(item))
                this._Selection.Unselect(item);
            else if (e.OldStartingIndex <= this.SelectedIndex)
                this._Selection.Select(this.SelectedItem);
            break;
        case NotifyCollectionChangedAction.Replace:
            item = e.OldItems[0];
            this._Selection.Unselect(item);
            break;
        default:
            throw new NotSupportedException("Collection changed action '" + e.Action + "' not supported");
    }

    this.OnItemsChanged$ItemsControl(e);
};
Selector.Instance.OnItemsSourceChanged = function (args) {
    this.OnItemsSourceChanged$ItemsControl(args);

    var view = Nullstone.As(args.OldValue, ICollectionView);
    if (view != null)
        view.CurrentChanged.Unsubscribe(this._OnCurrentItemChanged, this);

    view = Nullstone.As(args.NewValue, ICollectionView);
    if (view != null) {
        view.CurrentChanged.Subscribe(this._OnCurrentItemChanged, this);
        if (this.$SynchronizeWithCurrentItem)
            this._Selection.SelectOnly(view.CurrentItem);
        else
            this._Selection.ClearSelection();
    } else {
        this._Selection.ClearSelection();
    }
};
Selector.Instance.OnItemContainerStyleChanged = function (oldStyle, newStyle) { };
Selector.Instance.ClearContainerForItem = function (element, item) {
    this.ClearContainerForItem$ItemsControl(element, item);
    element.ParentSelector = null;
    if (!Nullstone.RefEquals(element, item))
        element.Content = null;
};
Selector.Instance.PrepareContainerForItem = function (element, item) {
    this.PrepareContainerForItem$ItemsControl(element, item);
    element.ParentSelector = this;
    if (this.SelectedItems.Contains(item))
        element.IsSelected = true;
    if (element.IsSelected && !this.SelectedItems.Contains(item))
        this._Selection.Select(item);
};

Selector.Instance._GetValueFromItem = function (item) {
    if (this._SelectedValueWalker == null)
        return item;
    if (item == null)
        return item;
    return this._SelectedValueWalker.GetValue(item);
};
Selector.Instance._SelectItemFromValue = function (selectedValue, ignoreSelectedValue) {
    if (selectedValue == null) {
        this._Selection.ClearSelection(ignoreSelectedValue);
        return;
    }

    var items = this.Items;
    var count = items.GetCount();
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
};

Selector.Instance._OnCurrentItemChanged = function (sender, e) {
    if (!this._Selection.Updating && this.$SynchronizeWithCurrentItem) {
        var icv = this.ItemsSource;
        if (!Nullstone.Equals(icv.CurrentItem, this.SelectedItem))
            this._Selection.SelectOnly(icv.CurrentItem);
    }
};

Selector.Instance._RaiseSelectionChanged = function (oldVals, newVals) {
    if (oldVals == null)
        oldVals = [];
    if (newVals == null)
        newVals = [];

    var oldCount = oldVals.length;
    var oldValue;
    for (var i = 0; i < oldCount; i++) {
        oldValue = oldVals[i];
        if (oldValue == null)
            continue;
        var oldItem = Nullstone.As(oldValue, ListBoxItem);
        if (oldItem == null)
            oldItem = this.ItemContainerGenerator.ContainerFromItem(oldValue);
        if (oldItem != null)
            oldItem.IsSelected = false;
    }

    var newCount = newVals.length;
    var newValue;
    for (var i = 0; i < newCount; i++) {
        newValue = newVals[i];
        if (newValue == null)
            continue;
        var newItem = Nullstone.As(newValue, ListBoxItem);
        if (newItem == null)
            newItem = this.ItemContainerGenerator.ContainerFromItem(newValue);
        if (newItem != null) {
            newItem.IsSelected = true;
            newItem.Focus();
        }
    }

    this.SelectionChanged.Raise(this, new SelectionChangedEventArgs(oldVals, newVals));
};

Selector.Instance.NotifyListItemClicked = function (lbi) {
    this._Selection.Select(this.ItemContainerGenerator.ItemFromContainer(lbi));
};
Selector.Instance.NotifyListItemLoaded = function (lbi) {
    if (Nullstone.RefEquals(this.ItemContainerGenerator.ItemFromContainer(lbi), this.SelectedItem)) {
        lbi.IsSelected = true;
        lbi.Focus();
    }
};
Selector.Instance.NotifyListItemGotFocus = function (lbi) { };
Selector.Instance.NotifyListItemLostFocus = function (lbi) { };

//#region ISupportInitialize Members

Selector.Instance.BeginInit =function()
{
    this._Initializing = true;
    this._InitState = new {
        Index: this.SelectedIndex,
        Item: this.SelectedItem,
        Value: this.SelectedValue,
        ValuePath: this.SelectedValuePath,
    };
};
Selector.Instance.EndInit = function () {
    this._Initializing = false;

    if (!Nullstone.RefEquals(this.SelectedValue, this._InitState.Value)) {
        this.SelectItemFromValue(this._SelectedValueWalker == null ? this.SelectedValue : this._SelectedValueWalker.Value, false);
    } else if (this.SelectedIndex !== this._InitState.Index) {
        this._Selection.Select(this.SelectedIndex < Items.GetCount() ? this.Items.GetValueAt(this.SelectedIndex) : null);
    } else if (!Nullstone.RefEquals(this.SelectedItem, this._InitState.Item)) {
        this._Selection.Select(this.SelectedItem);
    } else if (SelectedValuePath != this._InitState.ValuePath) {
        this.SelectItemFromValue(this._SelectedValueWalker == null ? this.SelectedValue : this._SelectedValueWalker.Value, false);
    }

    delete this._InitState;
};

//#endregion

Nullstone.FinishCreate(Selector);
//#endregion