/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var _TextBoxModelChangedEventArgs = Nullstone.Create("_TextBoxModelChangedEventArgs", undefined, 2);

    _TextBoxModelChangedEventArgs.Instance.Init = function (changed, propArgs) {
        this.Changed = changed;
        this.PropArgs = propArgs;
    };

    namespace._TextBoxModelChangedEventArgs = Nullstone.FinishCreate(_TextBoxModelChangedEventArgs);
})(window);