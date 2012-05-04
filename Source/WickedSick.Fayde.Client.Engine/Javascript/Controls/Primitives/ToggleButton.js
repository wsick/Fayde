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

ToggleButton.IsThreeStateProperty = DependencyProperty.RegisterReadOnly("IsThreeState", function () { return Boolean; }, ToggleButton, false);
ToggleButton.Instance.GetIsThreeState = function () {
    return this.$GetValue(ToggleButton.IsThreeStateProperty);
};
ToggleButton.Instance.SetIsThreeState = function (value) {
    this.$SetValue(ToggleButton.IsThreeStateProperty, value);
};

ToggleButton.Instance.OnIsCheckedChanged = function (e) {
    var isChecked = e.NewValue;
    //TODO: add the code for raising the appropriate routed event
    //      OnChecked, OnUnchecked, OnIndeterminate
    this.UpdateVisualState();
};

ToggleButton.Instance._ChangeVisualState = function (useTransitions) {
    // Cache dependency properties we'll check more than once
    var isChecked = this.GetIsChecked();
    var isEnabled = this.GetIsEnabled();

    // Update the Interaction state group 
    if (!isEnabled) {
        this._GoToState(useTransitions, "Disabled");
    }
    else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, "Pressed");
    }
    else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, "MouseOver");
    }
    else {
        this._GoToState(useTransitions, "Normal");
    }

    // Update the validation state group
    //TODO: put the validation state group logic back in
    //if (Validation.GetErrors (this).Count > 0) {
    //GoToState (useTransitions, this.IsFocused ? "InvalidFocused" : "InvalidUnfocused");
    //} else {
    //GoToState (useTransitions, "Valid");
    //}

    // Update the Check state group 
    if (isChecked == true) {
        this._GoToState(useTransitions, "Checked");
    }
    else if (isChecked == false) {
        this._GoToState(useTransitions, "Unchecked");
    }
    else {
        // isChecked is null
        if (!this._GoToState(useTransitions, "Indeterminate")) {
            this._GoToState(useTransitions, "Unchecked");
        }
    }

    if (this.GetIsFocused() && isEnabled) {
        this._GoToState(useTransitions, "Focused");
    }
    else {
        this._GoToState(useTransitions, "Unfocused");
    }
};

ToggleButton.Instance.OnClick = function () {
    var isChecked = this.GetIsChecked();
    if (isChecked == true) {
        if (this.GetIsThreeState()) {
            this.SetIsChecked(null);
        } else {
            this.SetIsChecked(false);
        }
    }
    else if (isChecked == false) {
        this.SetIsChecked(true);
    }
    else {
        this.SetIsChecked(false);
    }

    alert(this.GetIsChecked());
    this.OnClick$ButtonBase();
};

Nullstone.FinishCreate(ToggleButton);
//#endregion