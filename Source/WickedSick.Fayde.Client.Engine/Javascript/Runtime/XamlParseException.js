/// <reference path="Exception.js"/>
/// CODE

//#region XamlParseException
var XamlParseException = Nullstone.Create("XamlParseException", Exception);

XamlParseException.Instance.toString = function () {
    return "XamlParseException: " + this.toString();
};

Nullstone.FinishCreate(XamlParseException);
//#endregion