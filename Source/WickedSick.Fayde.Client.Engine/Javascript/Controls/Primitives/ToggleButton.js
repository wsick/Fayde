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
    this.UpdateVisualState();
};

ToggleButton.Instance._ChangeVisualState = function (useTransitions) {
    // Cache dependency properties we'll check more than once
    var isChecked = this.IsChecked;
    var isEnabled = this.IsEnabled;

    // Update the Interaction state group 
    if (!isEnabled) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.IsPressed) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
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
    } else if (isChecked == false) {
        this._GoToState(useTransitions, "Unchecked");
    } else {
        // isChecked is null
        if (!this._GoToState(useTransitions, "Indeterminate")) {
            this._GoToState(useTransitions, "Unchecked");
        }
    }

    if (this.IsFocused && isEnabled) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
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