/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class BError {
    static Argument: number = 2;
    static InvalidOperation: number = 3;
    static XamlParse: number = 5;
    Message: string;
    Number: number;
    ThrowException() {
        throw new Exception(this.Message);
    }
}
Nullstone.RegisterType(BError, "BError");