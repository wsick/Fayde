/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="TextBox.js"/>

//#region _TextBoxDynamicPropertyValueProvider
var _TextBoxDynamicPropertyValueProvider = Nullstone.Create("_TextBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider, 2);

_TextBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, 
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
};

Nullstone.FinishCreate(_TextBoxDynamicPropertyValueProvider);
//#endregion