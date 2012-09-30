/// <reference path="ListBoxItem.js"/>
/// CODE
/// <reference path="ComboBox.js"/>

//#region ComboBoxItem
var ComboBoxItem = Nullstone.Create("ComboBoxItem", ListBoxItem);

ComboBoxItem.Instance.Init = function () {
    this.Init$ListBoxItem();
    this.DefaultStyleKey = this.constructor;
};

ComboBoxItem.Instance.OnMouseLeftButtonUp = function (sender, e) {
    this.OnMouseLeftButtonUp$ListBoxItem(sender, e);
    if (this._ParentSelector instanceof ComboBox)
        this._ParentSelector.IsDropDownOpen = false;
};

Nullstone.FinishCreate(ComboBoxItem);
//#endregion