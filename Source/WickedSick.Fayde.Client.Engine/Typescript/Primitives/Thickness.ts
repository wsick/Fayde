/// <reference path="../Runtime/Nullstone.ts" />
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
    IsEmpty(): bool {
        return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
    }
    IsBalanced(): bool {
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
Nullstone.RegisterType(Thickness, "Thickness");