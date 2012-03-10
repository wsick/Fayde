/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="PasswordBox.js"/>

//#region _PasswordBoxDynamicPropertyValueProvider

function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence,
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}
Nullstone.Extend(_PasswordBoxDynamicPropertyValueProvider, "_PasswordBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider);

//#endregion
