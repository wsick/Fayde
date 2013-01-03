/// <reference path="../../../scripts/Fayde.js" />

var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            (function (ViewModels) {
                var oo = Nullstone.Create("ObservableObject", undefined, 0, [INotifyPropertyChanged]);

                oo.Instance.Init = function () {
                    this.PropertyChanged = new MulticastEvent();
                };

                oo.Instance.OnPropertyChanged = function (propertyName) {
                    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
                };

                Nullstone.FinishCreate(oo);
                ViewModels.ObservableObject = oo;
            })(SDB.ViewModels || (SDB.ViewModels = {}));
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));