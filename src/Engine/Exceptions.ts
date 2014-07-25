/// <reference path="../Runtime/TypeManagement.ts" />

class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
    }
    toString(): string {
        var typeName = (<any>this).constructor.name;
        if (typeName)
            return typeName + ": " + this.Message;
        return this.Message;
    }
}
Fayde.RegisterType(Exception, "window", Fayde.XMLNSX);

class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(ArgumentException, "window", Fayde.XMLNSX);

class ArgumentNullException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(ArgumentNullException, "window", Fayde.XMLNSX);

class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(InvalidOperationException, "window", Fayde.XMLNSX);

class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlParseException, "window", Fayde.XMLNSX);

class XamlMarkupParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlMarkupParseException, "window", Fayde.XMLNSX);

class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(NotSupportedException, "window", Fayde.XMLNSX);

class IndexOutOfRangeException extends Exception {
    constructor(index: number) {
        super(index.toString());
    }
}
Fayde.RegisterType(IndexOutOfRangeException, "window", Fayde.XMLNSX);

class ArgumentOutOfRangeException extends Exception {
    constructor(msg: string) {
        super(msg);
    }
}
Fayde.RegisterType(ArgumentOutOfRangeException, "window", Fayde.XMLNSX);

class AttachException extends Exception {
    Data: any;
    constructor(message: string, data: any) {
        super(message);
        this.Data = data;
    }
}
Fayde.RegisterType(AttachException, "window", Fayde.XMLNSX);

class InvalidJsonException extends Exception {
    JsonText: string;
    InnerException: Error;
    constructor(jsonText: string, innerException: Error) {
        super("Invalid json.");
        this.JsonText = jsonText;
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(InvalidJsonException, "window", Fayde.XMLNSX);

class TargetInvocationException extends Exception {
    InnerException: Exception;
    constructor(message: string, innerException: Exception) {
        super(message);
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(TargetInvocationException, "window", Fayde.XMLNSX);

class UnknownTypeException extends Exception {
    FullTypeName: string;
    constructor(fullTypeName: string) {
        super(fullTypeName);
        this.FullTypeName = fullTypeName;
    }
}
Fayde.RegisterType(UnknownTypeException, "window", Fayde.XMLNSX);

class FormatException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(FormatException, "window", Fayde.XMLNSX);
