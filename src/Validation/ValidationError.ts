module Fayde.Validation {
    export class ValidationError {
        ErrorContent: any;
        Exception: Exception;

        constructor (content: any, exception: Exception) {
            this.ErrorContent = content;
            this.Exception = exception;
            Object.freeze(this);
        }
    }
}