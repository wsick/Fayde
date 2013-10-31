/// <reference path="Inline.ts" />

module Fayde.Documents {
    export class LineBreak extends Inline {
    }
    Fayde.RegisterType(LineBreak, {
    	Name: "LineBreak",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });
}