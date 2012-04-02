/// CODE
/// <reference path="App.js"/>

var FocusManager = {};
FocusManager.GetFocusedElement = function () {
    return App.Instance.MainSurface._FocusedElement;
};