/// <reference path="Fayde.d.ts" />
/// CODE

module Fayde.Controls.Input {
    export class UpDownParsingEventArgs<T> extends RoutedEventArgs {
        Text: string;
        Value: T = null;
        Handled: boolean = false;
        constructor(text:string) {
            super();
            Object.defineProperty(this, "Text", { value: text, writable: false });
        }
    }
    Fayde.RegisterType(UpDownParsingEventArgs, {
        Name: "UpDownParsingEventArgs",
        Namespace: "Fayde.Controls.Input"
    });
}