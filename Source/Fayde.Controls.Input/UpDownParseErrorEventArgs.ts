/// <reference path="Fayde.d.ts" />
/// <reference path="_.ts" />

module Fayde.Controls.Input {
    export class UpDownParseErrorEventArgs extends RoutedEventArgs {
        Text: string;
        Error: Error;
        Handled: boolean = false;
        constructor(text: string, error: Error) {
            super();
            Object.defineProperty(this, "Text", { value: text, writable: false });
            Object.defineProperty(this, "Error", { value: error, writable: false });
        }
    }
    Fayde.RegisterType(UpDownParseErrorEventArgs, {
        Name: "UpDownParseErrorEventArgs",
        Namespace: Input.XMLNS
    });
}