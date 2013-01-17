/// <reference path="Primitives/ButtonBase.js"/>
/// CODE

(function (namespace) {
    var Button = Nullstone.Create("Button", ButtonBase);

    Button.Instance.Init = function () {
        this.Init$ButtonBase();
        this.DefaultStyleKey = this.constructor;
    };

    Button.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$ButtonBase();
        this.$UpdateVisualState(false);
    };

    Button.Instance.OnIsEnabledChanged = function (e) {
        this.OnIsEnabledChanged$ButtonBase(e);
        this.IsTabStop = e.NewValue;
    };

    namespace.Button = Nullstone.FinishCreate(Button);
})(window);