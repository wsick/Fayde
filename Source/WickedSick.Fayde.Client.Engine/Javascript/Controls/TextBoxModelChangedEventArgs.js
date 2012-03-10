/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _TextBoxModelChangedEventArgs
var _TextBoxModelChangedEventArgs = Nullstone.Create("_TextBoxModelChangedEventArgs", null, 2);

_TextBoxModelChangedEventArgs.Instance.Init = function (changed, propArgs) {
    this.Changed = changed;
    this.PropArgs = propArgs;
};

Nullstone.FinishCreate(_TextBoxModelChangedEventArgs);
//#endregion