/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE

class Thickness implements ICloneable {
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number) {
        this.Left = left == null ? 0 : left;
        this.Top = top == null ? 0 : top;
        this.Right = right == null ? 0 : right;
        this.Bottom = bottom == null ? 0 : bottom;
    }

    Plus(thickness2: Thickness) {
        var t = new Thickness();
        t.Left = this.Left + thickness2.Left;
        t.Right = this.Right + thickness2.Right;
        t.Top = this.Top + thickness2.Top;
        t.Bottom = this.Bottom + thickness2.Bottom;
        return t;
    }
    IsEmpty(): boolean {
        return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
    }
    IsBalanced(): boolean {
        return this.Left === this.Top
            && this.Left === this.Right
            && this.Left === this.Bottom;
    }

    toString(): string {
        return "(" + this.Left + ", " + this.Top + ", " + this.Right + ", " + this.Bottom + ")";
    }

    Clone(): Thickness {
        return new Thickness(this.Left, this.Top, this.Right, this.Bottom);
    }

    static Equals(thickness1: Thickness, thickness2: Thickness) {
        if (thickness1 == null && thickness2 == null)
            return true;
        if (thickness1 == null || thickness2 == null)
            return false;
        return thickness1.Left === thickness2.Left
            && thickness1.Top === thickness2.Top
            && thickness1.Right === thickness2.Right
            && thickness1.Bottom === thickness2.Bottom;
    }
}
Fayde.RegisterType(Thickness, {
	Name: "Thickness",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

Fayde.RegisterTypeConverter(Thickness, (val: any): Thickness => {
    if (!val)
        return new Thickness();
    if (typeof val === "number")
        return new Thickness(val, val, val, val);
    var tokens = val.toString().split(",");
    var left, top, right, bottom;
    if (tokens.length === 1) {
        left = top = right = bottom = parseFloat(tokens[0]);
    } else if (tokens.length === 2) {
        left = right = parseFloat(tokens[0]);
        top = bottom = parseFloat(tokens[1]);
    } else if (tokens.length === 4) {
        left = parseFloat(tokens[0]);
        top = parseFloat(tokens[1]);
        right = parseFloat(tokens[2]);
        bottom = parseFloat(tokens[3]);
    } else {
        throw new XamlParseException("Cannot parse Thickness value '" + val + "'");
    }
    return new Thickness(left, top, right, bottom);
});