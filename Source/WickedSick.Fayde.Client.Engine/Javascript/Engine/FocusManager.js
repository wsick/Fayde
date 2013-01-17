/// CODE
/// <reference path="App.js"/>

(function (namespace) {
    namespace.FocusManager = {};
    FocusManager.GetFocusedElement = function () {
        return App.Instance.MainSurface._FocusedElement;
    };
})(window);