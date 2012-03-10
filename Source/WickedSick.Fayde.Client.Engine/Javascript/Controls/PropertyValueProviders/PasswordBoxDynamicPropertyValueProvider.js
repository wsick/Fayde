/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="PasswordBox.js"/>

//#region _PasswordBoxDynamicPropertyValueProvider
var _PasswordBoxDynamicPropertyValueProvider = Nullstone.Create("_PasswordBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider, 2);

_PasswordBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, 
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
};

Nullstone.FinishCreate(_PasswordBoxDynamicPropertyValueProvider);
//#endregion