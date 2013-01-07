/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Data/INotifyPropertyChanged.js"/>
/// <reference path="../Data/PropertyChangedEventArgs.js"/>

(function (namespace) {
    var ObservableObject = Nullstone.Create("ObservableObject", undefined, 0, [INotifyPropertyChanged]);
    ObservableObject.Instance.Init = function () {
        this.PropertyChanged = new MulticastEvent();
    };
    ObservableObject.Instance.OnPropertyChanged = function (propertyName) {
        this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
    };
    Nullstone.FinishCreate(ObservableObject);
    namespace.ObservableObject = ObservableObject;
})(Nullstone.Namespace("Fayde.MVVM"));