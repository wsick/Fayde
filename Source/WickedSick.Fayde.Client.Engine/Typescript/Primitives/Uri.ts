class Uri {
    static _TypeName = "Uri";

    private _OriginalString: string;
    constructor(originalString: string) {
        this._OriginalString = originalString;
    }

    GetFragment(): string {
        //this._OriginalString.lastIndexOf("");
        return "";
    }
    toString(): string {
        return this._OriginalString;
    }

    static IsNullOrEmpty(uri: Uri): bool {
        if (uri == null)
            return true;
        if (uri._OriginalString)
            return false;
        return true;
    }
}