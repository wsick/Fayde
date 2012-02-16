/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="TextBox.js"/>

//#region _TextBoxDynamicPropertyValueProvider

function _TextBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!obj)
        return;
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence,
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
}
_TextBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

//#endregion
