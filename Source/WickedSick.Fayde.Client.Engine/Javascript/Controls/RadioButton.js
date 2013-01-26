/// <reference path="Primitives/ToggleButton.js"/>
/// CODE

(function (namespace) {
    var RadioButton = Nullstone.Create("RadioButton", namespace.Primitives.ToggleButton);

    RadioButton.Instance.Init = function () {
        this.Init$ToggleButton();
        RadioButton.Register("", this);
        this.DefaultStyleKey = this.constructor;
    };

    //#region Properties

    RadioButton.GroupNameProperty = DependencyProperty.RegisterReadOnly("GroupName", function () { return RadioButton; }, RadioButton, false, function (d, args) { d.OnGroupNameChanged(args); });

    Nullstone.AutoProperties(RadioButton, [
        RadioButton.GroupNameProperty
    ]);

    //#endregion

    RadioButton.Instance.OnGroupNameChanged = function (e) {
        RadioButton.Unregister(e.OldValue, this);
        RadioButton.Register(e.NewValue, this);
    };

    RadioButton._GroupNameToElements = [];

    RadioButton.Register = function (groupName, radioButton) {
        // Treat null as being string.Empty
        if (!groupName) groupName = "";

        var list = RadioButton._GroupNameToElements[groupName];
        if (!list) {
            list = [];
            RadioButton._GroupNameToElements[groupName] = list;
        }
        list.push(radioButton);
    };

    RadioButton.Unregister = function (groupName, radioButton) {
        // Treat null as being string.Empty
        if (!groupName) groupName = "";

        var list = RadioButton._GroupNameToElements[groupName];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (Nullstone.RefEquals(radioButton, list[i])) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    };

    RadioButton.Instance._OnIsCheckedChanged = function (e) {
        if (e.NewValue === true) {
            this.UpdateRadioButtonGroup();
        }
        this._OnIsCheckedChanged$ToggleButton(e);
    };

    RadioButton.Instance._OnToggle = function () {
        this.IsChecked = true;
    };

    RadioButton.Instance.UpdateRadioButtonGroup = function () {
        var groupName = this.GroupName;
        if (!groupName) groupName = "";

        //if this RadioButton has been assigned a group
        if (groupName) {
            var visualRoot = this.GetVisualRoot();
            var elements = RadioButton._GroupNameToElements[groupName];
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    if (!Nullstone.RefEquals(elements[i], this) &&
                    elements[i].IsChecked &&
                    Nullstone.RefEquals(visualRoot, elements[i].GetVisualRoot())) {
                        elements[i].IsChecked = false;
                    }
                }
            }
        } else {
            //no group has been assigned
            //it is automatically groups with all RadioButtons with no group and with the same visual root
            var elements = RadioButton._GroupNameToElements[groupName];
            var visualParent = this.GetVisualParent();
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    if (!Nullstone.RefEquals(elements[i], this) &&
                    elements[i].IsChecked &&
                    Nullstone.RefEquals(visualParent, elements[i].GetVisualParent())) {
                        elements[i].IsChecked = false;
                    }
                }
            }
        }
    };

    namespace.RadioButton = Nullstone.FinishCreate(RadioButton);
})(Nullstone.Namespace("Fayde.Controls"));