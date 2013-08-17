/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Core/XamlObject.ts" />
/// <reference path="../Core/DependencyProperty.ts" />

module Fayde {
    export class Markup {
        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]) {
            //Abstract Method
        }
    }
}