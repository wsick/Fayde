/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE

//#region Popup

function Popup() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(Popup, "Popup", FrameworkElement);

//#endregion
