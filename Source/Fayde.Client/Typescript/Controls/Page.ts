/// <reference path="UserControl.ts" />

module Fayde.Controls {
    export class Page extends UserControl {
        static TitleProperty: DependencyProperty = DependencyProperty.Register("Title", () => String, Page);
        Title: string;

        constructor() {
            super();
        }
    }
    Fayde.RegisterType(Page, {
    	Name: "Page",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}