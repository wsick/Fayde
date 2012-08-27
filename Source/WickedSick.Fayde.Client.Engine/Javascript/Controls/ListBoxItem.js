/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="ContentControl.js" />

//#region ListBox
var ListBoxItem = Nullstone.Create("ListBoxItem", ContentControl);

//#region Properties

ListBoxItem.IsSelectedProperty = DependencyProperty.RegisterCore("IsSelected", function () { return Boolean; }, ListBoxItem, null, function (d, args) { d.OnIsSelectedChanged(args); });

Nullstone.AutoProperties(ListBoxItem, [
    ListBoxItem.IsSelectedProperty]);

Nullstone.Property(ListBoxItem, "ParentSelector", {
    get: function () {
        return this._parentSelector;
    },
    set: function () {
        if (this._parentSelector == value) {
            return;
        }
        this._parentSelector = value;
        this._parentSelectorChanged.Raise(this, null);
    }
});

//#endregion

ListBoxItem.Instance.Init = function () {
    this.Init$ContentControl();
    this._parentSelectorChanged = new MulticastEvent();
    this.DefaultStyleKey = this.constructor;
};

ListBoxItem.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentControl();
    this.$UpdateVisualState(false);
};

ListBoxItem.Instance.OnIsSelectedChanged = function (e) {
    this.$UpdateVisualState();
};

ListBoxItem.Instance.InvokeLoaded = function () {
    this.InvokeLoaded$ContentControl();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemLoaded(this);
    }
};

ListBoxItem.Instance.OnMouseLeftButtonDown = function (sender, args) {
    if (!args.Handled) {
        args.Handled = true;
        if (this.Focus(true)) {
            if (this._parentSelector) {
                this._parentSelector.NotifyListItemClicked(this);
            }
        }
    }
};
ListBoxItem.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$ContentControl();
    this.$UpdateVisualState();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemGotFocus(this);
    }
};
ListBoxItem.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ContentControl();
    this.$UpdateVisualState();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemLostFocus(this);
    }
};

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

Nullstone.FinishCreate(ListBoxItem);
//#endregion