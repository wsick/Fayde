/// <reference path="Control.js"/>
/// CODE

//#region Slider
var Slider = Nullstone.Create("Slider", Control);

Slider.Instance.Init = function () {
    this.Init$Control();
    this.DefaultStyleKey = this.constructor;
    NotImplemented("Slider");
};

Nullstone.FinishCreate(Slider);
//#endregion