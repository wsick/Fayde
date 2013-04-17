/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Core/StaticResourceExpression.ts" />

module Fayde {
    export class StaticResourceMarkup extends Markup {
        Key: any;
        constructor(key: any) {
            super();
            this.Key = key;
        }

        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject) {
            return new StaticResourceExpression(this.Key, target, propd, propName, templateBindingSource);
        }
    }
}