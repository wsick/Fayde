/// <reference path="Primitives/RangeBase.js"/>
/// CODE

//#region Slider
var Slider = Nullstone.Create("Slider", RangeBase);

Slider.Instance.Init = function () {
    this.Init$Control();
    this.DefaultStyleKey = this.constructor;
    NotImplemented("Slider");
};

Nullstone.FinishCreate(Slider);
//#endregion