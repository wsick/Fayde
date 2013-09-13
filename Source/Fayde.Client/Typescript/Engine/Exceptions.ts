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
Fayde.RegisterType(Exception, {
	Name: "Exception",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(ArgumentException, {
	Name: "ArgumentException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(InvalidOperationException, {
	Name: "InvalidOperationException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlParseException, {
	Name: "XamlParseException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class XamlMarkupParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(XamlMarkupParseException, {
	Name: "XamlMarkupParseException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
Fayde.RegisterType(NotSupportedException, {
	Name: "NotSupportedException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class IndexOutOfRangeException extends Exception {
    constructor(index: number) {
        super(index.toString());
    }
}
Fayde.RegisterType(IndexOutOfRangeException, {
	Name: "IndexOutOfRangeException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class AttachException extends Exception {
    Data: any;
    constructor(message: string, data: any) {
        super(message);
        this.Data = data;
    }
}
Fayde.RegisterType(AttachException, {
	Name: "AttachException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class InvalidJsonException extends Exception {
    JsonText: string;
    InnerException: Error;
    constructor(jsonText: string, innerException: Error) {
        super("Invalid json.");
        this.JsonText = jsonText;
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(InvalidJsonException, {
	Name: "InvalidJsonException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class TargetInvocationException extends Exception {
    InnerException: Exception;
    constructor(message: string, innerException: Exception) {
        super(message);
        this.InnerException = innerException;
    }
}
Fayde.RegisterType(TargetInvocationException, {
	Name: "TargetInvocationException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

class UnknownTypeException extends Exception {
    FullTypeName: string;
    constructor(fullTypeName: string) {
        super(fullTypeName);
        this.FullTypeName = fullTypeName;
    }
}
Fayde.RegisterType(UnknownTypeException, {
	Name: "UnknownTypeException",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});