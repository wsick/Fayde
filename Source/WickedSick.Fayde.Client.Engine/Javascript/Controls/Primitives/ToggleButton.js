/// <reference path="ButtonBase.js"/>
/// CODE

//#region ToggleButton
var ToggleButton = Nullstone.Create("ToggleButton", ButtonBase);

//#region Properties

ToggleButton.IsCheckedProperty = DependencyProperty.Register("IsChecked", function () { return Boolean; }, ToggleButton, false, function (d, args) { d.OnIsCheckedChanged(args); });
ToggleButton.IsThreeStateProperty = DependencyProperty.Register("IsThreeState", function () { return Boolean; }, ToggleButton, false);

Nullstone.AutoProperties(ToggleButton, [
    ToggleButton.IsCheckedProperty,
    ToggleButton.IsThreeStateProperty
]);

//#endregion

ToggleButton.Instance.Init = function () {
    this.Init$ButtonBase();
    this.DefaultStyleKey = this.constructor;
};

ToggleButton.Instance.OnIsCheckedChanged = function (e) {
    var isChecked = e.NewValue;
    //TODO: add the code for raising the appropriate routed event
    //      OnChecked, OnUnchecked, OnIndeterminate
    this.$UpdateVisualState();
};

ToggleButton.Instance.$UpdateVisualState = function (useTransitions) {
    useTransitions = useTransitions !== false;
    this.$UpdateVisualState$ButtonBase(useTransitions);

    var isChecked = this.IsChecked;
    if (isChecked === true) {
        VisualStateManager.GoToState(this, "Checked", useTransitions);
    } else if (isChecked === false) {
        VisualStateManager.GoToState(this, "Unchecked", useTransitions);
    } else {
        // isChecked is null
        if (!VisualStateManager.GoToState(this, "Indeterminate", useTransitions)) {
            VisualStateManager.GoToState(this, "Unchecked", useTransitions)
        }
    }
};

ToggleButton.Instance.OnClick = function () {
    this.OnToggle();
    this.OnClick$ButtonBase();
};

ToggleButton.Instance.OnToggle = function () {
    var isChecked = this.IsChecked;
    if (isChecked === true) {
        if (this.IsThreeState) {
            this.IsChecked = null;
        } else {
            this.IsChecked = false;
        }
    } else if (isChecked === false) {
        this.IsChecked = true;
    } else {
        this.IsChecked = false;
    }
};

Nullstone.FinishCreate(ToggleButton);
//#endregion