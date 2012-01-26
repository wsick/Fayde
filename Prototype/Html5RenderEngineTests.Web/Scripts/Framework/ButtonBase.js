/// <reference path="ContentControl.js"/>

//#region ButtonBase

ButtonBase.prototype = new ContentControl;
ButtonBase.prototype.constructor = ButtonBase;
function ButtonBase() {
    ContentControl.call(this);
}
ButtonBase.GetBaseClass = function () { return ContentControl; };

//#endregion