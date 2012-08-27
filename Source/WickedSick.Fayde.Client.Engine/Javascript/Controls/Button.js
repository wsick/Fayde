/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Primitives/ButtonBase.js"/>
/// CODE
/// <reference path="Style.js"/>
/// <reference path="JsonParser.js"/>
/// <reference path="Brushes.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="VisualStateManager.js"/>
/// <reference path="Animation.js"/>

//#region Button
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

Nullstone.FinishCreate(Button);
//#endregion