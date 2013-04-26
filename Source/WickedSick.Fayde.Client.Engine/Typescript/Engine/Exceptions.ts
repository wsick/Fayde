/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
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
        super("Index is out of range: " + index.toString());
    }
}
Nullstone.RegisterType(IndexOutOfRangeException, "IndexOutOfRangeException");