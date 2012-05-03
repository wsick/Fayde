/// <reference path="ButtonBase.js"/>
/// CODE

//#region ToggleButton
var ToggleButton = Nullstone.Create("ToggleButton", ButtonBase);

ToggleButton.IsCheckedProperty = DependencyProperty.RegisterReadOnly("IsChecked", function () { return Boolean; }, ToggleButton, false, function (d, args) { d.OnIsCheckedChanged(args); });
ToggleButton.Instance.GetIsChecked = function () {
    return this.$GetValue(ToggleButton.IsCheckedProperty);
};
ToggleButton.Instance.SetIsChecked = function (value) {
    this.$SetValue(ToggleButton.IsCheckedProperty, value);
};

ToggleButton.Instance.OnIsCheckedChanged = function (e) {
    var isChecked = e.NewValue;
    //TODO: add the code for raising the appropriate routed event
    //      OnChecked, OnUnchecked, OnIndeterminate
    this.UpdateVisualState();
};

ToggleButton.Instance.OnClick = function () {
    alert('clicked');
    this.SetIsChecked(true);
};

Nullstone.FinishCreate(ToggleButton);
//#endregion