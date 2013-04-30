/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
    }
    toString(): string {
        var typeName = (<any>this).constructor._TypeName;
        if (typeName)
            return typeName + ": " + this.Message;
        return this.Message;
    }
}
Nullstone.RegisterType(Exception, "Exception");

class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(ArgumentException, "ArgumentException");

class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(InvalidOperationException, "InvalidOperationException");

class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(XamlParseException, "XamlParseException");

class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Nullstone.RegisterType(NotSupportedException, "NotSupportedException");

class IndexOutOfRangeException extends Exception {
    constructor(index: number) {
        super(index.toString());
    }
}
Nullstone.RegisterType(IndexOutOfRangeException, "IndexOutOfRangeException");

class AttachException extends Exception {
    Data: any;
    constructor(message: string, data: any) {
        super(message);
        this.Data = data;
    }
}
Nullstone.RegisterType(AttachException, "AttachException");

class InvalidJsonException extends Exception {
    JsonText: string;
    InnerException: Error;
    constructor(jsonText: string, innerException: Error) {
        super("Invalid json.");
        this.JsonText = jsonText;
        this.InnerException = innerException;
    }
}
Nullstone.RegisterType(InvalidJsonException, "InvalidJsonException");

class TargetInvocationException extends Exception {
    InnerException: Exception;
    constructor(message: string, innerException: Exception) {
        super(message);
        this.InnerException = innerException;
    }
}
Nullstone.RegisterType(TargetInvocationException, "TargetInvocationException");