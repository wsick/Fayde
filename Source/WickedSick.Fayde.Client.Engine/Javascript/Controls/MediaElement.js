/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE

//#region MediaElement

function MediaElement() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(MediaElement, "MediaElement", FrameworkElement);

//#endregion
