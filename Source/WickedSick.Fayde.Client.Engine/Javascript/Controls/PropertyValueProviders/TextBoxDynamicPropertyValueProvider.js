/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="TextBox.js"/>

//#region _TextBoxDynamicPropertyValueProvider

function _TextBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence,
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
}
Nullstone.Extend(_TextBoxDynamicPropertyValueProvider, "_TextBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider);

//#endregion
