/// <reference path="Primitives/ToggleButton.js"/>
/// CODE

(function (namespace) {
    var CheckBox = Nullstone.Create("CheckBox", ToggleButton);

    CheckBox.Instance.Init = function () {
        this.Init$ToggleButton();
        this.DefaultStyleKey = this.constructor;
    };

    namespace.CheckBox = Nullstone.FinishCreate(CheckBox);
})(window);