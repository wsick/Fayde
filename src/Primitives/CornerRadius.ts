/// <reference path="../Runtime/TypeManagement.ts" />

class CornerRadius extends minerva.CornerRadius implements ICloneable {
    Clone (): CornerRadius {
        return new CornerRadius(this.topLeft, this.topRight, this.bottomRight, this.bottomLeft);
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