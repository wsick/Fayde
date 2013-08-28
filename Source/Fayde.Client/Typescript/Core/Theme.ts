/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="ResourceDictionary.ts" />

module Fayde {
    export class Theme extends DependencyObject {
        static ResourcesProperty = DependencyProperty.RegisterImmutable("Resources", () => ResourceDictionary, Theme);
        Resources: ResourceDictionary;
        constructor() {
            super();
            var rd = Theme.ResourcesProperty.Initialize<ResourceDictionary>(this);
        }
    }
    Fayde.RegisterType(Theme, {
        Name: "Theme",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });
}