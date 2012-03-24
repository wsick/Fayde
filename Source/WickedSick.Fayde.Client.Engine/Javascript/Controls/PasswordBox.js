/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextBoxBase.js"/>
/// CODE
/// <reference path="../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="PropertyValueProviders/PasswordBoxDynamicPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

//#region PasswordBox
var PasswordBox = Nullstone.Create("PasswordBox", TextBoxBase);

PasswordBox.Instance.Init = function () {
    this.Init$TextBoxBase();
    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
};

Nullstone.FinishCreate(PasswordBox);
//#endregion