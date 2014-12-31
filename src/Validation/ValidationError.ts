module Fayde.Validation {
    export class ValidationError {
        ErrorContent: any;
        Exception: Exception;

        constructor (content: any, exception: Exception);
        constructor (content: any, exception: Error);
        constructor (content: any, exception: any) {
            this.ErrorContent = content;
            this.Exception = exception;
            if (this.Exception instanceof Exception)
                this.ErrorContent = this.ErrorContent || (<Exception>exception).Message;
            if (this.Exception instanceof Error)
                this.ErrorContent = this.ErrorContent || (<Error>exception).message;
            Object.freeze(this);
        }
    }
}