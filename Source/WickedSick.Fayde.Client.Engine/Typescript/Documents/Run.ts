/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Run extends Inline {
        static FlowDirectionProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FlowDirection", () => new Enum(FlowDirection), Run, FlowDirection.LeftToRight, undefined, Providers._Inheritable.FlowDirection);
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, Run);
        FlowDirection: FlowDirection;
        Text: string;

        private _SerializeText(): string { return this.Text; }
    }
    Nullstone.RegisterType(Run, "Run");
}