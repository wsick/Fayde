/// CODE

//#region _TextBoxModelChangedEventArgs

function _TextBoxModelChangedEventArgs(changed, propArgs) {
    RefObject.call(this);
    this.Changed = changed;
    this.PropArgs = propArgs;
}
_TextBoxModelChangedEventArgs.InheritFrom(RefObject);

//#endregion