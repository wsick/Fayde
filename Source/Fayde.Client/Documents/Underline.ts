/// <reference path="Span.ts" />

module Fayde.Documents {
    export class Underline extends Span {
    }
    Fayde.RegisterType(Underline, {
    	Name: "Underline",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });
}