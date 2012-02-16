/// <reference path="../Runtime/RefObject.js" />
/// <reference path="TextBoxBase.js"/>
/// <reference path="../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="PropertyValueProviders/PasswordBoxDynamicPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region PasswordBox

function PasswordBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
}
PasswordBox.InheritFrom(TextBoxBase);

//#endregion
