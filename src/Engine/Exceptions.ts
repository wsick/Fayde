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
Fayde.RegisterType(Exception, Fayde.XMLNSX);

class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(ArgumentException, Fayde.XMLNSX);

class ArgumentNullException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(ArgumentNullException, Fayde.XMLNSX);

class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(InvalidOperationException, Fayde.XMLNSX);

class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlParseException, Fayde.XMLNSX);

class XamlMarkupParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlMarkupParseException, Fayde.XMLNSX);

class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(NotSupportedException, Fayde.XMLNSX);

class IndexOutOfRangeException extends Exception {
    constructor(index: number) {
        super(index.toString());
    }
}
Fayde.RegisterType(IndexOutOfRangeException, Fayde.XMLNSX);

class ArgumentOutOfRangeException extends Exception {
    constructor(msg: string) {
        super(msg);
    }
}
Fayde.RegisterType(ArgumentOutOfRangeException, Fayde.XMLNSX);

class AttachException extends Exception {
    Data: any;
    constructor(message: string, data: any) {
        super(message);
        this.Data = data;
    }
}
Fayde.RegisterType(AttachException, Fayde.XMLNSX);

class InvalidJsonException extends Exception {
    JsonText: string;
    InnerException: Error;
    constructor(jsonText: string, innerException: Error) {
        super("Invalid json.");
        this.JsonText = jsonText;
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(InvalidJsonException, Fayde.XMLNSX);

class TargetInvocationException extends Exception {
    InnerException: Exception;
    constructor(message: string, innerException: Exception) {
        super(message);
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(TargetInvocationException, Fayde.XMLNSX);

class UnknownTypeException extends Exception {
    FullTypeName: string;
    constructor(fullTypeName: string) {
        super(fullTypeName);
        this.FullTypeName = fullTypeName;
    }
}
Fayde.RegisterType(UnknownTypeException, Fayde.XMLNSX);

class FormatException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(FormatException, Fayde.XMLNSX);
