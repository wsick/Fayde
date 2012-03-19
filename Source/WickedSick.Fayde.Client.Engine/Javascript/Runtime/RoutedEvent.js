/// <reference path="Nullstone.js"/>
/// CODE

//#region RoutedEvent
var RoutedEvent = Nullstone.Create("RoutedEvent");

RoutedEvent.Instance.Init = function () {
    this._Listeners = [];
};

RoutedEvent.Instance.Subscribe = function (pre, on, post, closure) {
    this._Listeners.push({
        PreCallback: pre,
        Callback: on,
        PostCallback: post,
        Closure: closure
    });
};
RoutedEvent.Instance.Raise = function () {
    
};

Nullstone.FinishCreate(RoutedEvent);
//#endregion