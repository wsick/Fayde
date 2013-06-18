/// <reference path="../Runtime/Nullstone.ts" />
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
    IsZero(): bool {
        return this.TopLeft === 0
            && this.TopRight === 0
            && this.BottomRight === 0
            && this.BottomLeft === 0;
    }
    Equals(other: CornerRadius): bool {
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
Nullstone.RegisterType(CornerRadius, "CornerRadius");