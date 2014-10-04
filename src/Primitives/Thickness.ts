/// <reference path="../Runtime/TypeManagement.ts" />

minerva.Thickness.prototype.Clone = function(): Thickness {
    return new minerva.Thickness(this.left, this.top, this.right, this.bottom);
};
Fayde.RegisterType(minerva.Thickness, "window", Fayde.XMLNSX);

Fayde.RegisterTypeConverter(minerva.Thickness, (val: any): Thickness => {
    if (!val)
        return new minerva.Thickness();
    if (typeof val === "number")
        return new minerva.Thickness(val, val, val, val);
    if (val instanceof minerva.Thickness) {
        var t = <minerva.Thickness>val;
        return new minerva.Thickness(t.left, t.top, t.right, t.bottom);
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
    return new minerva.Thickness(left, top, right, bottom);
});