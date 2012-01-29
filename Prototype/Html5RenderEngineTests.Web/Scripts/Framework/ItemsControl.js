/// <reference path="Control.js"/>

var ItemCollection = {};//TODO: Implement

//#region ItemsControl

ItemsControl.prototype = new Control;
ItemsControl.prototype.constructor = ItemsControl;
function ItemsControl() {
    Control.call(this);
}
ItemsControl.GetBaseClass = function () { return Control; };

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