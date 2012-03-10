/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _TextBoxModelChangedEventArgs

function _TextBoxModelChangedEventArgs(changed, propArgs) {
    if (!Nullstone.IsReady)
        return;
    this.Changed = changed;
    this.PropArgs = propArgs;
}
Nullstone.Create(_TextBoxModelChangedEventArgs, "_TextBoxModelChangedEventArgs");

//#endregion