/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde {
    export interface IEventFilter {
        Filter(sender: any, e: EventArgs, parameter: any): boolean;
    }
    export var IEventFilter_ = Fayde.RegisterInterface<IEventFilter>("IEventFilter");

    export class EventBinding implements Xaml.IMarkup {
        CommandBinding: Data.Binding = null;
        CommandParameterBinding: Data.Binding = null;
        Filter: IEventFilter = null;

        Transmute(ctx: Xaml.ITransmuteContext): Expression {
            return new EventBindingExpression(this);
        }
    }
    Fayde.RegisterType(EventBinding, "Fayde", Fayde.XMLNS);
}