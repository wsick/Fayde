/// <reference path="Inline.ts" />

module Fayde.Documents {
    export class Run extends Inline implements Providers.IIsPropertyInheritable {
        static FlowDirectionProperty = InheritableOwner.FlowDirectionProperty.ExtendTo(Run);
        static TextProperty = DependencyProperty.Register("Text", () => String, Run);
        FlowDirection: FlowDirection;
        Text: string;

        _SerializeText(): string { return this.Text; }

        IsInheritable(propd: DependencyProperty): boolean {
            if (propd === Run.FlowDirectionProperty)
                return true;
            return super.IsInheritable(propd);
        }
    }
    Fayde.RegisterType(Run, "Fayde.Documents", Fayde.XMLNS);
}