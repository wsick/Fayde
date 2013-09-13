/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE

module Fayde.Shapes {
    export class DoubleCollection extends XamlObjectCollection<XamlObject> {
    }
    Fayde.RegisterType(DoubleCollection, {
    	Name: "DoubleCollection",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });
}