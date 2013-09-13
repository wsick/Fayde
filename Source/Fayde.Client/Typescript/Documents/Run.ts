/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Run extends Inline implements Providers.IIsPropertyInheritable {
        static FlowDirectionProperty: DependencyProperty = InheritableOwner.FlowDirectionProperty.ExtendTo(Run);
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, Run);
        FlowDirection: FlowDirection;
        Text: string;

        _SerializeText(): string { return this.Text; }

        IsInheritable(propd: DependencyProperty): boolean {
            if (propd === Run.FlowDirectionProperty)
                return true;
            return (<Providers.IIsPropertyInheritable>super).IsInheritable.call(this, propd);
        }
    }
    Fayde.RegisterType(Run, {
    	Name: "Run",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });
}