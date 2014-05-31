module Fayde.Controls {
    export class DatePickerDateValidationErrorEventArgs extends EventArgs {
        Exception: Exception;
        Text: string;
        ThrowException: boolean = false;
        constructor(exception: Exception, text: string) {
            super();
            Object.defineProperty(this, "Exception", { value: exception, writable: false });
            Object.defineProperty(this, "Text", { value: text, writable: false });
        }
    }
}