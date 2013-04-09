class BError {
    static Argument: number = 2;
    static InvalidOperation: number = 3;
    Message: string;
    Number: number;
    ThrowException() {
        throw new Exception(this.Message);
    }
}