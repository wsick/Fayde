/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="ObservableObject.js"/>

(function (namespace) {
    var ViewModelBase = Nullstone.Create("ViewModelBase", Fayde.MVVM.ObservableObject);
    Nullstone.FinishCreate(ViewModelBase);
    namespace.ViewModelBase = ViewModelBase;
})(Nullstone.Namespace("Fayde.MVVM"));