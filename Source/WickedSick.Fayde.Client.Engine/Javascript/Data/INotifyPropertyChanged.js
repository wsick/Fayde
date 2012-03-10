/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region INotifyPropertyChanged
var INotifyPropertyChanged = Nullstone.Create("INotifyPropertyChanged", null);

INotifyPropertyChanged.Instance.Init = function () {
    this.PropertyChanged = new MulticastEvent();
};

INotifyPropertyChanged.Instance.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

Nullstone.FinishCreate(INotifyPropertyChanged);
//#endregion