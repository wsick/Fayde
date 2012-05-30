/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// <reference path="../Core/Collections/IListenCollectionChanged.js" />
/// CODE
/// <reference path="Panel.js"/>
/// <reference path="ItemsPresenter.js"/>
/// <reference path="../Collections/NotifyCollectionChangedEventArgs.js" />

//#region ItemsControl
var ItemsControl = Nullstone.Create("ItemsControl", Control, 0, [IListenCollectionChanged]);

ItemsControl.Instance.Init = function () {
    this.Init$Control();
    this._itemContainerGenerator = new ItemContainerGenerator(this);
    this._itemContainerGenerator.ItemsChanged.Subscribe(this.OnItemContainerGeneratorChanged, this);
};

ItemsControl.Instance.OnItemContainerGeneratorChanged = function (sender, e) {
    if (!this._presenter || Nullstone.Is(_presenter._GetElementRoot(), VirtualizingPanel)) {
        return;
    }

    var panel = this._presenter._GetElementRoot();
    switch (e.GetAction()) {
        case NotifyCollectionChangedAction.Reset:
            if (panel.Children.GetCount() > 0) {
                this.RemoveItemsFromPresenter(new GeneratorPosition(0, 0), panel.Children.GetCount());
            }
            break;
        case NotifyCollectionChangedAction.Add:
            this.AddItemsToPresenter(e.Position, e.ItemCount);
            break;
        case NotifyCollectionChangedAction.Remove:
            this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
            break;
        case NotifyCollectionChangedAction.Replace:
            this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
            this.AddItemsToPresenter(e.Position, e.ItemCount);
            break;
    }
};

ItemsControl.Instance.AddItemsToPresenter = function (position, count) {
    if (!this._presenter || !this._presenter._GetElementRoot() || Nullstone.Is(this._presenter._GetElementRoot(), VirtualizingPanel)) {
        return;
    }

    var panel = this._presenter._GetElementRoot();
    var newIndex = this._itemContainerGenerator.GetIndexFromGeneratorPosition(position);
    var p = this._itemContainerGenerator.StartAt(position, GeneratorDirection.Forward, true);
    for (var i = 0; i < count; i++) {
        var item = this.Items.GetValueAt(newIndex + 1);
        var data = {};
        var container = this._itemContainerGenerator.GenerateNext(data);

    }
};

ItemsControl.Instance.RemoveItemsFromPresenter = function (position, count) {
    if (!this._presenter || !this._presenter._GetElementRoot() || Nullstone.Is(this._presenter._GetElementRoot(), VirtualizingPanel)) {
        return;
    }

    var panel = this._presenter._GetElementRoot();
    while (count > 0) {
        panel.Children.RemoveAt(position.Index);
        count--;
    }
};

ItemsControl.Instance.PrepareContainerForItemOverride = function (element, item) {
    if (this.DisplayMemberPath != null && this.ItemTemplate) {
        throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");
    }

    this.UpdateContentTemplateOnContainer(element, item);
};

ItemsControl.Instance._GetDefaultTemplate = function () {
    var presenter = this._presenter;
    if (!presenter) {
        presenter = new ItemsPresenter();
        presenter.TemplateOwner = this;
    }
    return presenter;
};

ItemsControl.Instance._SetItemsPresenter = function (presenter) {
    if (this._presenter) {
        this._presenter._GetElementRoot().Children.Clear();
    }

    this._presenter = presenter;
    this.AddItemsToPresenter(new GeneratorPosition(-1, 1), this.Items.GetCount());
};

ItemsControl.GetItemsOwner = function (ele) {
    var panel = Nullstone.As(ele, Panel);
    if (!panel || !panel.IsItemsHost)
        return null;
    var owner = Nullstone.As(panel.TemplateOwner, ItemsPresenter);
    if (owner)
        return Nullstone.As(owner.TemplateOwner, ItemsControl);
    return null;
};

//#region DEPENDENCY PROPERTIES
ItemsControl.DisplayMemberPathProperty = DependencyProperty.RegisterCore("DisplayMemberPath", function () { return String; }, ItemsControl, null, function (d, args) { d.OnDisplayMemberPathChanged(args); });
ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl, null);
ItemsControl.ItemsPanelProperty = DependencyProperty.RegisterCore("ItemsPanel", function () { return ItemsPanelTemplate; }, ItemsControl);
ItemsControl.ItemsSourceProperty = DependencyProperty.RegisterCore("ItemsSource", function () { return Object; }, ItemsControl, null, function (d, args) { d.OnItemsSourceChanged(args); });
ItemsControl.ItemTemplateProperty = DependencyProperty.RegisterCore("ItemTemplate", function () { return DataTemplate; }, ItemsControl, undefined, function (d, args) { d.OnItemTemplateChanged(args); });

Nullstone.AutoProperties(ItemsControl, [
    ItemsControl.DisplayMemberPathProperty,
    ItemsControl.ItemsPanelProperty,
    ItemsControl.ItemTemplateProperty
]);

Nullstone.Property(ItemsControl, "Items", {
    get: function () {
        var items = Nullstone.As(this.$GetValue(ItemsControl.ItemsProperty), ItemCollection);
        if (!items) {
            items = new ItemCollection();
            this._itemsIsDataBound = false;
            items.ItemsChanged.Subscribe(this.InvokeItemsChanged, this);
            items.Clearing.Subscribe(this.OnItemsClearing, this);
            this.$SetValue(ItemsControl.ItemsProperty, items);
        }
        return items;
    }
});

Nullstone.Property(ItemsControl, "ItemsSource", {
    get: function () {
        return this.$GetValue(ItemsControl.ItemsSourceProperty);
    },
    set: function (value) {
        if (!this._itemsIsDataBound && this.Items.GetCount() > 0) {
            throw new InvalidOperationException("Items collection must be empty before using ItemsSource");
        }
        this.$SetValue(ItemsControl.ItemsSourceProperty, value);
    }
});
//#endregion

ItemsControl.Instance.OnDisplayMemberPathChanged = function (e) {
    var items = this.Items;
    var count = items.GetCount();
    for (var i = 0; i < count; i++) {
        this.UpdateContentTemplateOnContainer(ItemContainerGenerator.ContainerFromIndex(i), items.GetValueAt(i));
    }
};

ItemsControl.Instance.IsItemItsOwnContainer = function (item) {
    return Nullstone.Is(item, FrameworkElement);
};

ItemsControl.Instance.OnItemsClearing = function (object, e) {
    this._SetLogicalParent(this.Items);
};

ItemsControl.Instance.OnItemsChanged = function (e) {
    
};

ItemsControl.Instance.SetLogicalParent = function (parent, items) {
    if (this.ItemsSource) {
        return;
    }

    var count = items.GetCount();
    for (var i = 0; i < count; i++) {
        var fe = Nullstone.As(items.GetValueAt(i), FrameworkElement);
        if (fe) {
            var error = new BError();
            this._SetLogicalParent(parent, error);
            if (error.IsErrored()) {
                throw error.CreateException();
            }
        }
    }
};

ItemsControl.Instance.InvokeItemsChanged = function (object, e) {
    switch (e.Action) {
        case NotifyCollectionChangedAction.Add:
            this._SetLogicalParent(e.NewItems);
            break;
        case NotifyCollectionChangedAction.Remove:
            this._SetLogicalParent(e.OldItems);
            break;
        case NotifyCollectionChangedAction.Replace:
            this._SetLogicalParent(e.NewItems);
            break;
    }

    this._ItemContainerGenerator.OnOwnerItemsChanged(object, e);
    if (!this._itemsIsDataBound) {
        this.OnItemsChanged(e);
    }
};

ItemsControl.Instance.OnItemsSourceChanged = function (e) {
    if (!e.OldValue && Nullstone.Is(e.OldValue, INotifyCollectionChanged)) {
        e.OldValue.CollectionChanged.Unsubscribe(this._CollectionChanged, this);
    }

    if (!e.NewValue) {
        if (Nullstone.Is(e.NewValue, INotifyCollectionChanged)) {
            e.NewValue.CollectionChanged.Subscribe(this._CollectionChanged, this);
        }

        this.Items.$SetIsReadOnly(true);
        this._itemsIsDataBound = true;
        this.Items._ClearImpl();

        var count = e.NewValue.GetCount();
        for (var i = 0; i < count; i++) {
            this.Items._AddImpl(e.NewValue.GetValueAt(i));
        }

        this.OnItemsChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
    }
    else {
        this._itemsIsDataBound = false;
        this.Items.$SetIsReadyOnly(false);
        this.Items._ClearImpl();
    }

    this._InvalidateMeasure();
};

ItemsControl.Instance._CollectionChanged = function (sender, e) {
    switch (e.Action) {
        case NotifyCollectionChangedAction.Add:
            var count = e.NewItems.GetCount();
            for (var i = 0; i < count; i++) {
                this.Items._InsertImpl(e.NewStartingIndex + 1, e.NewItems.GetValueAt(i));
            }
            break;
        case NotifyCollectionChangedAction.Remove:
            var count = e.OldItems.GetCount();
            for (var i = 0; i < count; i++) {
                this.Items._RemoveAtImpl(e.OldStartingIndex);
            }
            break;
        case NotifyCollectionChangedAction.Replace:
            var count = e.NewItems.GetCount();
            for (var i = 0; i < count; i++) {
                this.Items._SetItemImpl(e.NewStartingIndex + 1, e.NewItems.GetValueAt(i));
            }
            break;
        case NotifyCollectionChangedAction.Reset:
            this.Items._ClearImpl();
            var count = this.ItemsSource.GetCount();
            for (var i = 0; i < count; i++) {
                this.Items._AddImpl(this.ItemsSource.GetValueAt(i));
            }
            break;
    }

};

ItemsControl.Instance.OnItemTemplateChanged = function (e) {
    var items = this.Items;
    var count = items.GetCount();
    for (var i = 0; i < count; i++) {
        this.UpdateContentTemplateOnContainer(ItemContainerGenerator.ContainerFromIndex(i), items.GetValueAt(i));
    }
};

ItemsControl.Instance.UpdateContentTemplateOnContainer = function (element, item) {
    if (Nullstone.RefEquals(element, item)) {
        return;
    }

    var presenter = Nullstone.As(element, ContentPresenter);
    var control = Nullstone.As(element, ContentControl);

    var template;
    if (!(item instanceof UIElement)) {
        template = this.ItemTemplate;
        if (!template) {
            template = this._GetDisplayMemberTemplate();
        }
    }

    if (presenter) {
        presenter.ContentTemplate = template;
        presenter.Content = item;
    } else if (control) {
        control.ContentTemplate = template;
        control.Content = item;
    }
};

ItemsControl.Instance.ItemsControlFromItemContainer = function (container) {
    var e = Nullstone.As(container, FrameworkElement);
    if (!e) {
        return null;
    }

    var itctl = NullStone.As(e._GetLogicalParent(), ItemsControl);
    if (!itctl) {
        return ItemsControl.GetItemsOwner(e._GetLogicalParent());
    }
    if (itctl.IsItemItsOwnContainer(e)) {
        return itctl;
    }
    return null;
};

ItemsControl.Instance._Panel = function () {
    ///<returns type="Panel"></returns>
    if (this._presenter) {
        return _presenter._GetElementRoot();
    } else {
        return null;
    }
};

//#region ANNOTATIONS

ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};

//#endregion

// <DataTemplate><Grid><TextBlock Text="{Binding @DisplayMemberPath}" /></Grid></DataTemplate>
ItemsControl.Instance._GetDisplayMemberTemplate = function () {
    if (!this._DisplayMemberTemplate) {
        this._DisplayMemberTemplate = new DataTemplate({
            Type: Grid,
            Children: [
            {
                Type: TextBlock,
                Props: {
                    Text: new BindingMarkup({ Path: this.DisplayMemberPath })
                }
            }
        ]
        });
    }
    return this._DisplayMemberTemplate;
};

Nullstone.FinishCreate(ItemsControl);
//#endregion