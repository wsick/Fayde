/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE

class CornerRadius implements ICloneable {
    TopLeft: number;
    TopRight: number;
    BottomRight: number;
    BottomLeft: number;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number) {
        this.TopLeft = topLeft == null ? 0 : topLeft;
        this.TopRight = topRight == null ? 0 : topRight;
        this.BottomRight = bottomRight == null ? 0 : bottomRight;
        this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
    }
    IsZero(): boolean {
        return this.TopLeft === 0
            && this.TopRight === 0
            && this.BottomRight === 0
            && this.BottomLeft === 0;
    }
    Equals(other: CornerRadius): boolean {
        return this.TopLeft === other.TopLeft
            && this.TopRight === other.TopRight
            && this.BottomRight === other.BottomRight
            && this.BottomLeft === other.BottomLeft;
    }
    toString(): string {
        return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
    }

    Clone(): CornerRadius {
        return new CornerRadius(this.TopLeft, this.TopRight, this.BottomRight, this.BottomLeft);
    }
}
Fayde.RegisterType(CornerRadius, {
	Name: "CornerRadius",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});

Fayde.RegisterTypeConverter(CornerRadius, (val: any): CornerRadius => {
    if (!val)
        return new CornerRadius();
    if (typeof val === "number")
        return new CornerRadius(val, val, val, val);
    var tokens = val.toString().split(",");
    var topLeft, topRight, bottomRight, bottomLeft;
    if (tokens.length === 1) {
        topLeft = topRight = bottomRight = bottomLeft = parseFloat(tokens[0]);
    } else if (tokens.length === 4) {
        topLeft = parseFloat(tokens[0]);
        topRight = parseFloat(tokens[1]);
        bottomRight = parseFloat(tokens[2]);
        bottomLeft = parseFloat(tokens[3]);
    } else {
        throw new Exception("Cannot parse CornerRadius value '" + val + "'");
    }
    return new CornerRadius(topLeft, topRight, bottomRight, bottomLeft);
});