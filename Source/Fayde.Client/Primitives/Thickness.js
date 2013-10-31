/// <reference path="../Runtime/TypeManagement.ts" />
var Thickness = (function () {
    function Thickness(left, top, right, bottom) {
        this.Left = left == null ? 0 : left;
        this.Top = top == null ? 0 : top;
        this.Right = right == null ? 0 : right;
        this.Bottom = bottom == null ? 0 : bottom;
    }
    Thickness.prototype.Plus = function (thickness2) {
        var t = new Thickness();
        t.Left = this.Left + thickness2.Left;
        t.Right = this.Right + thickness2.Right;
        t.Top = this.Top + thickness2.Top;
        t.Bottom = this.Bottom + thickness2.Bottom;
        return t;
    };
    Thickness.prototype.IsEmpty = function () {
        return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
    };
    Thickness.prototype.IsBalanced = function () {
        return this.Left === this.Top && this.Left === this.Right && this.Left === this.Bottom;
    };

    Thickness.prototype.toString = function () {
        return "(" + this.Left + ", " + this.Top + ", " + this.Right + ", " + this.Bottom + ")";
    };

    Thickness.prototype.Clone = function () {
        return new Thickness(this.Left, this.Top, this.Right, this.Bottom);
    };

    Thickness.Equals = function (thickness1, thickness2) {
        if (thickness1 == null && thickness2 == null)
            return true;
        if (thickness1 == null || thickness2 == null)
            return false;
        return thickness1.Left === thickness2.Left && thickness1.Top === thickness2.Top && thickness1.Right === thickness2.Right && thickness1.Bottom === thickness2.Bottom;
    };
    return Thickness;
})();
Fayde.RegisterType(Thickness, {
    Name: "Thickness",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});

Fayde.RegisterTypeConverter(Thickness, function (val) {
    if (!val)
        return new Thickness();
    if (typeof val === "number")
        return new Thickness(val, val, val, val);
    if (val instanceof Thickness) {
        var t = val;
        return new Thickness(t.Left, t.Top, t.Right, t.Bottom);
    }
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
        throw new Exception("Cannot parse Thickness value '" + val + "'");
    }
    return new Thickness(left, top, right, bottom);
});
//# sourceMappingURL=Thickness.js.map
