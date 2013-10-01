/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Data/Binding.ts" />
/// <reference path="EventBindingExpression.ts" />

module Fayde {
    export interface IEventFilter {
        Filter(sender: any, e: EventArgs, parameter: any): boolean;
    }
    export var IEventFilter_ = Fayde.RegisterInterface("IEventFilter");

    export class EventBinding implements Xaml.IMarkup {
        CommandBinding: Data.Binding;
        CommandParameterBinding: Data.Binding;
        Filter: IEventFilter;

        Transmute(ctx: Xaml.IMarkupParseContext): Expression {
            return new EventBindingExpression(this);
        }
    }
    Fayde.RegisterType(EventBinding, {
    	Name: "EventBinding",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}