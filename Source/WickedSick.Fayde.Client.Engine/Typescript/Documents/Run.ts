/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Run extends Inline {
        static FlowDirectionProperty: DependencyProperty = InheritableOwner.FlowDirectionProperty;
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, Run);
        FlowDirection: FlowDirection;
        Text: string;

        private _SerializeText(): string { return this.Text; }
    }
    Nullstone.RegisterType(Run, "Run");
}