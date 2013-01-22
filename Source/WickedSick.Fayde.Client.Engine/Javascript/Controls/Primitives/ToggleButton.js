/// <reference path="ButtonBase.js"/>
/// CODE

(function (namespace) {
    var ToggleButton = Nullstone.Create("ToggleButton", ButtonBase);

    ToggleButton.Instance.Init = function () {
        this.Init$ButtonBase();
        this.DefaultStyleKey = this.constructor;

        this.Checked = new MulticastEvent();
        this.Indeterminate = new MulticastEvent();
        this.Unchecked = new MulticastEvent();
    };

    //#region Properties

    ToggleButton.IsCheckedProperty = DependencyProperty.RegisterCore("IsChecked", function () { return Boolean; }, ToggleButton, false, function (d, args) { d._OnIsCheckedChanged(args); });
    ToggleButton.IsThreeStateProperty = DependencyProperty.RegisterCore("IsThreeState", function () { return Boolean; }, ToggleButton, false);

    Nullstone.AutoProperties(ToggleButton, [
        ToggleButton.IsCheckedProperty,
        ToggleButton.IsThreeStateProperty
    ]);

    //#endregion

    ToggleButton.Instance._OnIsCheckedChanged = function (e) {
        var isChecked = e.NewValue;
        this.$UpdateVisualState();
        if (isChecked === true) {
            this.Checked.Raise(this, new EventArgs());
        } else if (isChecked === false) {
            this.Unchecked.Raise(this, new EventArgs());
        } else {
            this.Indeterminate.Raise(this, new EventArgs());
        }
    };

    ToggleButton.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$ButtonBase();
        this.$UpdateVisualState(false);
    };

    ToggleButton.Instance.OnClick = function () {
        this._OnToggle();
        this.OnClick$ButtonBase();
    };
    ToggleButton.Instance._OnToggle = function () {
        var isChecked = this.IsChecked;
        if (isChecked === true) {
            this.IsChecked = this.IsThreeState ? null : false;
        } else {
            this.IsChecked = isChecked != null;
        }
    };

    ToggleButton.Instance.OnContentChanged = function (oldContent, newContent) {
        this.OnContentChanged$ButtonBase(oldContent, newContent);
        this.$UpdateVisualState();
    };

    ToggleButton.Instance.$UpdateVisualState = function (useTransitions) {
        useTransitions = useTransitions !== false;
        this.$UpdateVisualState$ButtonBase(useTransitions);

        var isChecked = this.IsChecked;
        var vsm = Fayde.Media.VisualStateManager.VisualStateManager;
        if (isChecked === true) {
            vsm.GoToState(this, "Checked", useTransitions);
        } else if (isChecked === false) {
            vsm.GoToState(this, "Unchecked", useTransitions);
        } else {
            // isChecked is null
            if (!vsm.GoToState(this, "Indeterminate", useTransitions)) {
                vsm.GoToState(this, "Unchecked", useTransitions)
            }
        }
    };

    namespace.ToggleButton = Nullstone.FinishCreate(ToggleButton);
})(window);