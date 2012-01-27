/// <reference path="ButtonBase.js"/>

//#region Button

Button.prototype = new ButtonBase;
Button.prototype.constructor = Button;
function Button() {
    ButtonBase.call(this);
    this.SetIsTabStop(false);
}
Button.GetBaseClass = function () { return ButtonBase; };

//#endregion