/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/EventArgs.js"/>
/// CODE

(function (namespace) {
    var PropertyChangedEventArgs = Nullstone.Create("PropertyChangedEventArgs", EventArgs, 1);

    Nullstone.Property(PropertyChangedEventArgs, "PropertyName", {
        get: function () { return this._PropertyName; }
    });

    PropertyChangedEventArgs.Instance.Init = function (propertyName) {
        this._PropertyName = propertyName;
    };

    namespace.PropertyChangedEventArgs = Nullstone.FinishCreate(PropertyChangedEventArgs);
})(Nullstone.Namespace("Fayde.Data"));