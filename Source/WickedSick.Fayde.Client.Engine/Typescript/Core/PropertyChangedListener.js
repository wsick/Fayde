/// CODE
/// <reference path="DependencyObject.ts" />
var Fayde;
(function (Fayde) {
    function CreatePropertyChangedListener(property, func, closure) {
        return {
            Detach: function () {
            },
            Property: property,
            OnPropertyChanged: function (sender, args) {
                func.call(closure, sender, args);
            }
        };
    }
    Fayde.CreatePropertyChangedListener = CreatePropertyChangedListener;
    function ListenToPropertyChanged(target, property, func, closure) {
        var listener = CreatePropertyChangedListener(property, func, closure);
        listener.Detach = function () {
            target._Store._UnsubscribePropertyChanged(listener);
        };
        target._Store._SubscribePropertyChanged(listener);
        return listener;
    }
    Fayde.ListenToPropertyChanged = ListenToPropertyChanged;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PropertyChangedListener.js.map
