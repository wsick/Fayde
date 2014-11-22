module Fayde {
    export interface IEventFilter {
        Filter(sender: any, e: nullstone.IEventArgs, parameter: any): boolean;
    }
    export var IEventFilter_ = new nullstone.Interface<IEventFilter>("IEventFilter");

    export class EventBinding implements nullstone.markup.IMarkupExtension {
        CommandBinding: Data.Binding = null;
        CommandParameterBinding: Data.Binding = null;
        Filter: IEventFilter = null;

        init (val: string) {
        }

        transmute (os: any[]): any {
            this.$$coerce();
            Object.freeze(this);
            return new EventBindingExpression(this);
        }

        private $$coerce () {
        }
    }
    Fayde.RegisterType(EventBinding, Fayde.XMLNS);
}