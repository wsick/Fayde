/// CODE
/// <reference path="DependencyObject.ts" />
var Fayde;
(function (Fayde) {
    function CreatePropertyChangedListener(func, closure) {
        return {
            OnPropertyChanged: function (sender, args) {
                func.call(closure, sender, args);
            }
        };
    }
    Fayde.CreatePropertyChangedListener = CreatePropertyChangedListener;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PropertyChangedListener.js.map
