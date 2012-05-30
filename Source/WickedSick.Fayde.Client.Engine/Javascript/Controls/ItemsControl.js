/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// <reference path="../Core/Collections/IListenCollectionChanged.js" />
/// CODE
/// <reference path="Panel.js"/>
/// <reference path="ItemsPresenter.js"/>

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
            if (panel.GetChildren().GetCount() > 0) {
                this.RemoveItemsFromPresenter(new GeneratorPosition(0, 0), panel.GetChildren().GetCount());
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
        var item = this.GetItems()[newIndex + 1];
        var data = {};
        var container = this._itemContainerGenerator.GenerateNext(data);

    }
};

ItemsControl.Instance.RemoveItemsFromPresenter = function (position, count) {
};

ItemsControl.GetItemsOwner = function (ele) {
    var panel = Nullstone.As(ele, Panel);
    if (!panel || !panel.GetIsItemsHost())
        return null;
    var owner = Nullstone.As(panel.GetTemplateOwner(), ItemsPresenter);
    if (owner)
        return Nullstone.As(owner.GetTemplateOwner(), ItemsControl);
    return null;
};

//#region DEPENDENCY PROPERTIES
ItemsControl.DisplayMemberPathProperty = DependencyProperty.RegisterCore("DisplayMemberPath", function () { return String; }, ItemsControl, null, function (d, args) { d.OnDisplayMemberPathChanged(args); });
ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl, null);
ItemsControl.ItemsPanelProperty = DependencyProperty.RegisterCore("ItemsPanel", function () { return ItemsPanelTemplate; }, ItemsControl);
ItemsControl.ItemsSourceProperty = DependencyProperty.RegisterCore("ItemsSource", function () { return Object; }, ItemsControl);
ItemsControl.ItemTemplateProperty = DependencyProperty.RegisterCore("ItemTemplate", function () { return DataTemplate; }, ItemsControl, undefined, function (d, args) { d.OnItemTemplateChanged(args); });
//#endregion

ItemsControl.Instance.OnDisplayMemberPathChanged = function (e) {
    var items = this.GetItems();
    var count = items.GetCount();
    for (var i = 0; i < count; i++) {
        this.UpdateContentTemplateOnContainer(ItemContainerGenerator.ContainerFromIndex(i), items.GetValueAt(i));
    }
};

ItemsControl.Instance.OnItemTemplateChanged = function (e) {
    var items = this.GetItems();
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
        template = this.GetItemTemplate();
        if (!template) {
            template = this._GetDisplayMemberTemplate();
        }
    }

    if (presenter) {
        presenter.SetContentTemplate(template);
        presenter.SetContent(item);
    } else if (control) {
        control.SetContentTemplate(template);
        control.SetContent(item);
    }
};

ItemsControl.Instance.ItemsControlFromItemContainer = function (container) {
    var e = Nullstone.As(container, FrameworkElement);
    if (!e) {
        return null;
    }

    var itctl = NullStone.As(e.GetParent(), ItemsControl);
    if (!itctl) {
        return ItemsControl.GetItemsOwner(e.GetParent());
    }
    if (itctl.IsItemItsOwnContainer(e)) {
        return itctl;
    }
    return null;
};

ItemsControl.Instance._GetPanel = function () {
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
                    Text: new BindingMarkup({ Path: this.GetDisplayMemberPath() })
                }
            }
        ]
        });
    }
    return this._DisplayMemberTemplate;
};

Nullstone.FinishCreate(ItemsControl);
//#endregion