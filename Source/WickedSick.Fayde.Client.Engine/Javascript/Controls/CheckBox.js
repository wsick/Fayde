/// <reference path="Primitives/ToggleButton.js"/>
/// CODE

//#region CheckBox
var CheckBox = Nullstone.Create("CheckBox", ToggleButton);

CheckBox.Instance.Init = function () {
    this.Init$ToggleButton();
    this.DefaultStyleKey = this.constructor;
};

Nullstone.FinishCreate(CheckBox);
//#endregion