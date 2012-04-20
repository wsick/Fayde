/// <reference path="../Core/FrameworkElement.js"/>
/// CODE

//#region _RichTextBoxView
var _RichTextBoxView = Nullstone.Create("_RichTextBoxView", FrameworkElement);

_RichTextBoxView.Instance.Init = function () {
    this.Init$FrameworkElement();
};

Nullstone.FinishCreate(_RichTextBoxView);
//#endregion