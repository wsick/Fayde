/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region INotifyPropertyChanged

function INotifyPropertyChanged() {
    if (!Nullstone.IsReady)
        return;
    this.PropertyChanged = new MulticastEvent();
}
Nullstone.Create(INotifyPropertyChanged, "INotifyPropertyChanged");
INotifyPropertyChanged.prototype.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

//#endregion