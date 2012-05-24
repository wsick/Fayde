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

ItemsControl.Instance.OnItemContainerGeneratorChanged = function(sender, e) {
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
ItemsControl.Instance.GetDisplayMemberPath = function () {
    ///<returns type="String"></returns>
    return this.GetValue(ItemCollection.DisplayMemberPathProperty);
};
ItemsControl.Instance.SetDisplayMemberPath = function (value) {
    ///<param name="value" type="String"></param>
    this.SetValue(ItemCollection.DisplayMemberPathProperty, value);
};

ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl, null);
ItemsControl.Instance.GetItems = function () {
    return this.$GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.Instance.SetItems = function (value) {
    this.$SetValue(ItemsControl.ItemsProperty, value);
};

ItemsControl.ItemsPanelProperty = DependencyProperty.RegisterCore("ItemsPanel", function () { return ItemsPanelTemplate; }, ItemsControl);
ItemsControl.Instance.GetItemsPanel = function () {
    ///<returns type="ItemsPanelTemplate"></returns>
    return this.GetValue(ItemsControl.ItemsPanelProperty);
};
ItemsControl.Instance.SetItemsPanel = function (value) {
    ///<param name="value" type="ItemsPanelTemplate"></param>
    this.SetValue(ItemsControl.ItemsPanelProperty, value);
};

ItemsControl.ItemsSourceProperty = DependencyProperty.RegisterCore("ItemsSource", function () { return Object; }, ItemsControl);
ItemsControl.Instance.GetItemsSource = function () {
    ///<returns type="Object"></returns>
    return this.GetValue(ItemsControl.ItemsSourceProperty);
};
ItemsControl.Instance.SetItemsSource = function (value) {
    ///<param name="value" type="Object"></param>
    this.SetValue(ItemsControl.ItemsSourceProperty, value);
};

ItemsControl.ItemTemplateProperty = DependencyProperty.RegisterCore("ItemTemplate", function () { return DataTemplate; }, ItemsControl, undefined, function (d, args) { d.OnItemTemplateChanged(args); });
ItemsControl.Instance.GetItemTemplate = function () {
    ///<returns type="DataTemplate"></returns>
    return this.GetValue(ItemsControl.ItemTemplateProperty);
};
ItemsControl.Instance.SetItemTemplate = function (value) {
    ///<param name="value" type="DataTemplate"></param>
    this.SetValue(ItemsControl.ItemTemplateProperty, value);
};

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