/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region INotifyPropertyChanged

function INotifyPropertyChanged() {
    RefObject.call(this);
    this.PropertyChanged = new MulticastEvent();
}
INotifyPropertyChanged.InheritFrom(RefObject);
INotifyPropertyChanged.prototype.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

//#endregion
