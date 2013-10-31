/// <reference path="ObservableObject.ts"/>

module Fayde.MVVM {
    export class ViewModelBase extends ObservableObject {
    }
    Fayde.RegisterType(ViewModelBase, {
    	Name: "ViewModelBase",
    	Namespace: "Fayde.MVVM",
    	XmlNamespace: Fayde.XMLNS
    });
}