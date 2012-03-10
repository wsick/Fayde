/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TileBrush.js"/>
/// CODE

//#region ImageBrush

function ImageBrush() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(ImageBrush, "ImageBrush", TileBrush);

//#endregion
