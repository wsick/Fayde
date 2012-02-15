/// <reference path="../Core/FrameworkElement.js"/>
/// <reference path="Control.js"/>
/// CODE
/// <reference path="Panel.js"/>

var ItemCollection = {};//TODO: Implement

//#region ItemsControl

function ItemsControl() {
    Control.call(this);
}
ItemsControl.InheritFrom(Control);

ItemsControl.GetItemsOwner = function (ele) {
    var panel = RefObject.As(ele, Panel);
    if (panel == null || !panel.GetIsItemsHost())
        return null;
    var owner = RefObject.As(panel.GetTemplateOwner(), ItemsPresenter);
    if (owner != null)
        return RefObject.As(owner.GetTemplateOwner(), ItemsControl);
    return null;
};

//#region DEPENDENCY PROPERTIES

ItemsControl.ItemsProperty = DependencyProperty.Register("Items", function () { return ItemCollection; }, ItemsControl);
ItemsControl.prototype.GetItems = function () {
    return this.GetValue(ItemsControl.ItemsProperty);
};
ItemsControl.prototype.SetItems = function (value) {
    this.SetValue(ItemsControl.ItemsProperty, value);
};

//#endregion

//#region ANNOTATIONS

ItemsControl.Annotations = {
    ContentProperty: ItemsControl.ItemsProperty
};

//#endregion

//#endregion

//#region ItemsPresenter

function ItemsPresenter() {
    FrameworkElement.call(this);
}
ItemsPresenter.InheritFrom(FrameworkElement);

//#endregion