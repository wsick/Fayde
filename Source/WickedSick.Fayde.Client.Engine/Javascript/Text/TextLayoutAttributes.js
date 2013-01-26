/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

(function (namespace) {
    var _TextLayoutAttributes = Nullstone.Create("_TextLayoutAttributes", null, 2);

    _TextLayoutAttributes.Instance.Init = function (source, start) {
        this._Source = source;
        this._Start = start == null ? 0 : start;
    };

    _TextLayoutAttributes.Instance.GetBackground = function (selected) {
        if (selected)
            return this._Source.SelectionBackground;
        return null;
    };
    _TextLayoutAttributes.Instance.GetForeground = function (selected) {
        if (selected)
            return this._Source.SelectionForeground;
        return this._Source.Foreground;
    };
    _TextLayoutAttributes.Instance.GetFont = function () { return this._Source.GetFont(); };
    _TextLayoutAttributes.Instance.GetDirection = function () { return this._Source.GetDirection(); };
    _TextLayoutAttributes.Instance.IsUnderlined = function () { return this._Source.TextDecorations & Fayde.TextDecorations.Underline; };

    namespace._TextLayoutAttributes = Nullstone.FinishCreate(_TextLayoutAttributes);
})(window);