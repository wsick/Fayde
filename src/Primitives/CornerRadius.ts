/// <reference path="../Runtime/TypeManagement.ts" />

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

    static Equals(cr1: CornerRadius, cr2: CornerRadius): boolean {
        if (cr1 == null && cr2 == null)
            return true;
        if (cr1 == null || cr2 == null)
            return false;
        return cr1.TopLeft === cr2.TopLeft
            && cr1.TopRight === cr2.TopRight
            && cr1.BottomRight === cr2.BottomRight
            && cr1.BottomLeft === cr2.BottomLeft;
    }

    Clone(): CornerRadius {
        return new CornerRadius(this.TopLeft, this.TopRight, this.BottomRight, this.BottomLeft);
    }
}
Fayde.RegisterType(CornerRadius, "window", Fayde.XMLNSX);

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