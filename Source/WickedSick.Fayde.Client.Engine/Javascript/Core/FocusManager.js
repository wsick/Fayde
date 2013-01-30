/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Engine/App.js"/>

(function (Fayde) {
    var FocusManager = {};
    FocusManager.GetFocusedElement = function () {
        return App.Instance.MainSurface._FocusedElement;
    };
    Fayde.FocusManager = FocusManager;
})(Nullstone.Namespace("Fayde"));