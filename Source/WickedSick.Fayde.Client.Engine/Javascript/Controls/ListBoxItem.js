/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="ContentControl.js" />

//#region ListBox
var ListBoxItem = Nullstone.Create("ListBoxItem", ContentControl);

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

ListBoxItem.Instance.Init = function () {
    this._parentSelectorChanged = new MulticastEvent();
    this.DefaultStyleKey = this.constructor;
};

ListBoxItem.Instance.OnIsSelectedChanged = function (e) {
    this._ChangeVisualState();
};

ListBoxItem.Instance.InvokeLoaded = function () {
    this.InvokeLoaded$ContentControl();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemLoaded(this);
    }
};

ListBoxItem.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentControl();
    this._ChangeVisualState();
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

ListBoxItem.Instance.OnMouseEnter = function (sender, args) {
    this._isMouseOver = true;
    this._ChangeVisualState();
};

ListBoxItem.Instance.OnMouseLeave = function (sender, args) {
    this._isMouseOver = false;
    this._ChangeVisualState();
};

ListBoxItem.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$ContentControl();
    this._ChangeVisualState();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemGotFocus(this);
    }
};

ListBoxItem.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ContentControl();
    this._ChangeVisualState();
    if (this._parentSelector) {
        this._parentSelector.NotifyListItemLostFocus(this);
    }
};

ListBoxItem.Instance._ChangeVisualState = function () {
    var isFocused = this.IsFocused;
    var isEnabled = this.IsEnabled;
    var isSelected = this.IsSelected;
    var isMouseOver = this.IsMouseOver;

    if (isFocused) {
        this._GoToState("Focused", true);
    } else {
        this._GoToState("Unfocused", true);
    }

    if (!isEnabled) {
        this._GoToState(Nullstone.Is(this.Content, Control) ? "Normal" : "Disabled", true);
    } else if (isMouseOver) {
        this._GoToState("MouseOver", true);
    } else {
        this._GoToState("Normal", true);
    }

    if (isSelected && isFocused) {
        this._GoToState("Selected", true);
    } else if (isSelected) {
        this._GoToState("SelectedUnfocused", true);
    } else {
        this._GoToState("Unselected", true);
    }
};

Nullstone.FinishCreate(ListBoxItem);
//#endregion