/// <reference path="Control.js"/>

//#region ComboBox
var ComboBox = Nullstone.Create("ComboBox", Control);

ComboBox.Instance.Init = function () {
    this.Init$Control();
    this.DefaultStyleKey = this.constructor;
    NotImplemented("ComboBox");
};

Nullstone.FinishCreate(ComboBox);
//#endregion