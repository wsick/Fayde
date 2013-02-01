/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="ContentControl.js" />

(function (namespace) {
    var ListBoxItem = Nullstone.Create("ListBoxItem", namespace.ContentControl);

    ListBoxItem.Instance.Init = function () {
        this.Init$ContentControl();
        this._ParentSelectorChanged = new MulticastEvent();
        this.DefaultStyleKey = this.constructor;
    };

    //#region Properties

    ListBoxItem.IsSelectedProperty = DependencyProperty.RegisterCore("IsSelected", function () { return Boolean; }, ListBoxItem, null, function (d, args) { d.OnIsSelectedChanged(args); });

    Nullstone.AutoProperties(ListBoxItem, [
        ListBoxItem.IsSelectedProperty
    ]);

    Nullstone.Property(ListBoxItem, "ParentSelector", {
        get: function () { return this._ParentSelector; },
        set: function (value) {
            if (Nullstone.RefEquals(this._ParentSelector, value))
                return;
            this._ParentSelector = value;
            this._ParentSelectorChanged.Raise(this, new EventArgs());
        }
    });

    //#endregion

    ListBoxItem.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$ContentControl();
        this.$UpdateVisualState(false);
    };

    ListBoxItem.Instance.OnIsSelectedChanged = function (e) {
        this.$UpdateVisualState();
    };

    ListBoxItem.Instance.InvokeLoaded = function () {
        this.InvokeLoaded$ContentControl();
        if (this._ParentSelector != null) {
            this._ParentSelector.NotifyListItemLoaded(this);
        }
    };

    //#region Mouse/Focus Handling

    ListBoxItem.Instance.OnMouseLeftButtonDown = function (sender, args) {
        if (args.Handled)
            return;
        args.Handled = true;
        if (!this.Focus(true))
            return;
        if (this._ParentSelector != null) {
            this._ParentSelector.NotifyListItemClicked(this);
        }
    };
    ListBoxItem.Instance.OnMouseEnter = function (e) {
        this.OnMouseEnter$ContentControl(e);
        this.$UpdateVisualState();
    };
    ListBoxItem.Instance.OnMouseLeave = function (e) {
        this.OnMouseLeave$ContentControl(e);
        this.$UpdateVisualState();
    };
    ListBoxItem.Instance.OnGotFocus = function (e) {
        this.OnGotFocus$ContentControl(e);
        this.$UpdateVisualState();
        if (this._ParentSelector != null) {
            this._ParentSelector.NotifyListItemGotFocus(this);
        }
    };
    ListBoxItem.Instance.OnLostFocus = function (e) {
        this.OnLostFocus$ContentControl(e);
        this.$UpdateVisualState();
        if (this._ParentSelector != null) {
            this._ParentSelector.NotifyListItemLostFocus(this);
        }
    };

    //#endregion

    //#region Visual State

    ListBoxItem.Instance.$GetVisualStateNamesToActivate = function () {
        var arr = this.$GetVisualStateNamesToActivate$ContentControl();
        arr.push(this.$GetVisualStateSelection());
        return arr;
    };
    ListBoxItem.Instance.$GetVisualStateCommon = function () {
        if (!this.IsEnabled) {
            return this.Content instanceof Control ? "Normal" : "Disabled";
        } else if (this.IsMouseOver) {
            return "MouseOver";
        } else {
            return "Normal";
        }
    };
    ListBoxItem.Instance.$GetVisualStateSelection = function () {
        if (this.IsSelected) {
            return this.IsFocused ? "Selected" : "SelectedUnfocused";
        } else {
            return "Unselected";
        }
    };

    //#endregion

    namespace.ListBoxItem = Nullstone.FinishCreate(ListBoxItem);
})(Nullstone.Namespace("Fayde.Controls"));