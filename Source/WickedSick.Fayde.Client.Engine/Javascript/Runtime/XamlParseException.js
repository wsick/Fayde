/// <reference path="Exception.js"/>
/// CODE

//#region XamlParseException
var XamlParseException = Nullstone.Create("XamlParseException", Exception, 1);

XamlParseException.Instance.Init = function (message) {
    this.Message = message;
};

XamlParseException.Instance.toString = function () {
    return "Xaml Parse Exception: " + this.Message;
};

Nullstone.FinishCreate(XamlParseException);
//#endregion