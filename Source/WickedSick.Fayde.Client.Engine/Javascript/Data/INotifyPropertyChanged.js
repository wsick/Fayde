/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

(function (namespace) {
    var INotifyPropertyChanged = Nullstone.Create("INotifyPropertyChanged");

    INotifyPropertyChanged.Instance.Init = function () {
        this.PropertyChanged = new MulticastEvent();
    };

    INotifyPropertyChanged.Instance.RaisePropertyChanged = function (propertyName) {
        this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
    };

    namespace.INotifyPropertyChanged = Nullstone.FinishCreate(INotifyPropertyChanged);
})(window);