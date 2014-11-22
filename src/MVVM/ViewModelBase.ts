/// <reference path="ObservableObject.ts"/>

module Fayde.MVVM {
    export class ViewModelBase extends ObservableObject {
    }
    Fayde.RegisterType(ViewModelBase, Fayde.XMLNS);
}