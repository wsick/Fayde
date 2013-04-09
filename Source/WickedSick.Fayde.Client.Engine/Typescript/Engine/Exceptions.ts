class Exception {
    Message: string;
    constructor(message: string) {
        this.Message = message;
    }
}

class ArgumentException extends Exception {
    constructor(message: string) {
        super(message);
    }
}

class InvalidOperationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}

class XamlParseException extends Exception {
    constructor(message: string) {
        super(message);
    }
}


class NotSupportedException extends Exception {
    constructor(message: string) {
        super(message);
    }
}