/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

enum UriKind {
    Absolute = 0,
    Relative = 1,
    RelativeOrAbsolute = 2,
}
Fayde.RegisterEnum(UriKind, {
    Name: "UriKind",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNS
});

class Uri implements ICloneable {
    private _OriginalString: string;
    private _Kind: UriKind;
    constructor(originalString: string, kind?: UriKind) {
        this._OriginalString = originalString;
        if (kind == null) kind = UriKind.RelativeOrAbsolute;
        this._Kind = kind;
    }

    get OriginalString(): string { return this._OriginalString; }

    get Fragment(): string {
        var index = this._OriginalString.indexOf("#");
        if (index > -1)
            return this._OriginalString.substr(index + 1);
        return "";
    }
    toString(): string {
        return this._OriginalString;
    }
    Clone(): Uri {
        return new Uri(this._OriginalString, this._Kind);
    }

    static IsNullOrEmpty(uri: Uri): boolean {
        if (uri == null)
            return true;
        if (uri._OriginalString)
            return false;
        return true;
    }
}
Fayde.RegisterType(Uri, {
	Name: "Uri",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});
Fayde.RegisterTypeConverter(Uri, (val: any): any => {
    if (val == null)
        val = "";
    return new Uri(val.toString());
});