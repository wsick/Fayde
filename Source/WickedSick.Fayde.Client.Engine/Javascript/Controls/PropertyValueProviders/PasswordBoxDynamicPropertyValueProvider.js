/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="PasswordBox.js"/>

//#region _PasswordBoxDynamicPropertyValueProvider

function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!obj)
        return;
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence,
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}
_PasswordBoxDynamicPropertyValueProvider.InheritFrom(_TextBoxBaseDynamicPropertyValueProvider);

//#endregion
