/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class Uri implements ICloneable {
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
    Clone():Uri {
        return new Uri(this._OriginalString);
    }

    static IsNullOrEmpty(uri: Uri): boolean {
        if (uri == null)
            return true;
        if (uri._OriginalString)
            return false;
        return true;
    }
}
Nullstone.RegisterType(Uri, "Uri");
