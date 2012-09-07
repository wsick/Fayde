/// <reference path="Primitives/Selector.js" />
/// CODE
/// <reference path="ListBoxItem.js"/>
/// <reference path="Enums.js"/>

//#region ListBox
var ListBox = Nullstone.Create("ListBox", Selector);

ListBox.Instance.Init = function () {
    this.Init$Selector();
    this.DefaultStyleKey = this.constructor;
    this._FocusedIndex = -1;
};

//#region Properties

ListBox.ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", function () { return Style; }, ListBox, undefined, function (d, args) { d.OnItemContainerStyleChanged(args.OldValue, args.NewValue); });
ListBox.SelectionModeProperty = DependencyProperty.RegisterCore("SelectionMode", function () { return new Enum(SelectionMode); }, ListBox, undefined, function (d, args) { d._Selection.Mode = args.NewValue; });
ListBox.IsSelectionActiveProperty = DependencyProperty.RegisterReadOnlyCore("IsSelectionActive", function () { return Boolean; }, ListBox);

Nullstone.AutoProperties(ListBox, [
    ListBox.ItemContainerStyleProperty,
    ListBox.SelectionModeProperty
]);

Nullstone.AutoPropertyReadOnly(ListBox, ListBox.IsSelectionActiveProperty, true);

//#endregion

ListBox.Instance.SelectAll = function () {
    this._Selection.SelectAll(this.Items);
};
ListBox.Instance.ScrollIntoView = function (item) {
    if (this.$TemplateScrollViewer == null)
        return;
    var items = this.Items;
    if (!items.Contains(item))
        return;


};

ListBox.Instance.OnItemContainerStyleChanged = function (oldStyle, newStyle) {
    var count = this.Items.GetCount();
    for (var i = 0; i < count; i++) {
        var lbi = this.ItemContainerGenerator.ContainerFromIndex(i);
        if (lbi != null && Nullstone.RefEquals(lbi.Style, oldStyle))
            lbi.Style = newStyle;
    }
};

//#region Overrides

ListBox.Instance.IsItemItsOwnContainer = function (item) {
    return item instanceof ListBoxItem;
};
ListBox.Instance.GetContainerForItem = function () {
    var item = new ListBoxItem();
    var ics = this.ItemContainerStyle;
    if (ics != null)
        item.Style = ics;
    return item;
};
ListBox.Instance.PrepareContainerForItem = function (element, item) {
    this.PrepareContainerForItem$Selector(element, item);
    var ics = this.ItemContainerStyle;
    if (element.Style == null && ics != null)
        element.Style = ics;
};

//#endregion

//#region Focus

ListBox.Instance.OnGotFocus = function (e) {
    this.OnGotFocus$Selector(e);
    this.$SetValueInternal(ListBox.IsSelectionActiveProperty, true);
};
ListBox.Instance.OnLostFocus = function (e) {
    this.OnLostFocus$Selector(e);
    this.$SetValueInternal(ListBox.IsSelectionActiveProperty, false);
};

//#endregion

//#region ListItem Notifications

ListBox.Instance.NotifyListItemGotFocus = function (lbi) {
    this._FocusedIndex = this.ItemContainerGenerator.IndexFromContainer(lbi);
};
ListBox.Instance.NotifyListItemLostFocus = function (lbi) {
    this._FocusedIndex = -1;
};

//#endregion

Nullstone.FinishCreate(ListBox);
//#endregion