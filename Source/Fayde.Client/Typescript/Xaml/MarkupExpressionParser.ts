/// CODE
/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Xaml {
    export interface IMarkupParseContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        ResourceChain: ResourceDictionary[];
        TemplateBindingSource: DependencyObject;
        Resolver: INamespacePrefixResolver;
    }

    export class MarkupExpressionParser {
        static Parse(value: string, ctx: IMarkupParseContext): any {
            return undefined;
        }
    }
}