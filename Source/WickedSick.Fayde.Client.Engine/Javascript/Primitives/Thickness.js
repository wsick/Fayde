/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Thickness
var Thickness = Nullstone.Create("Thickness", null, 4);

Thickness.Instance.Init = function (left, top, right, bottom) {
    this.Left = left == null ? 0 : left;
    this.Top = top == null ? 0 : top;
    this.Right = right == null ? 0 : right;
    this.Bottom = bottom == null ? 0 : bottom;
};

Thickness.Instance.Plus = function (thickness2) {
    var t = new Thickness();
    t.Left = this.Left + thickness2.Left;
    t.Right = this.Right + thickness2.Right;
    t.Top = this.Top + thickness2.Top;
    t.Bottom = this.Bottom + thickness2.Bottom;
    return t;
};
Thickness.Instance.IsEmpty = function () {
    return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
};
Thickness.Instance.IsBalanced = function () {
    return this.Left === this.Top
        && this.Left === this.Right
        && this.Left === this.Bottom;
};

Thickness.Instance.toString = function () {
    return "(" + this.Left + ", " + this.Top + ", " + this.Right + ", " + this.Bottom + ")";
};

Nullstone.FinishCreate(Thickness);
//#endregion