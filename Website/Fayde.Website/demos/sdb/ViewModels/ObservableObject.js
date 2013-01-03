/// <reference path="../../../scripts/Fayde.js" />

(function (namespace) {
    var oo = Nullstone.Create("ObservableObject", undefined, 0, [INotifyPropertyChanged]);
    oo.Instance.Init = function () {
        this.PropertyChanged = new MulticastEvent();
    };
    oo.Instance.OnPropertyChanged = function (propertyName) {
        this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
    };
    Nullstone.FinishCreate(oo);
    namespace.ObservableObject = oo;
})(Nullstone.Namespace("Fayde.Demos.SDB.ViewModels"));