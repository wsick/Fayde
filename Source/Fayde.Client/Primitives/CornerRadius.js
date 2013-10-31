/// <reference path="../Runtime/TypeManagement.ts" />
var CornerRadius = (function () {
    function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
        this.TopLeft = topLeft == null ? 0 : topLeft;
        this.TopRight = topRight == null ? 0 : topRight;
        this.BottomRight = bottomRight == null ? 0 : bottomRight;
        this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
    }
    CornerRadius.prototype.IsZero = function () {
        return this.TopLeft === 0 && this.TopRight === 0 && this.BottomRight === 0 && this.BottomLeft === 0;
    };
    CornerRadius.prototype.Equals = function (other) {
        return this.TopLeft === other.TopLeft && this.TopRight === other.TopRight && this.BottomRight === other.BottomRight && this.BottomLeft === other.BottomLeft;
    };
    CornerRadius.prototype.toString = function () {
        return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
    };

    CornerRadius.prototype.Clone = function () {
        return new CornerRadius(this.TopLeft, this.TopRight, this.BottomRight, this.BottomLeft);
    };
    return CornerRadius;
})();
Fayde.RegisterType(CornerRadius, {
    Name: "CornerRadius",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});

Fayde.RegisterTypeConverter(CornerRadius, function (val) {
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
//# sourceMappingURL=CornerRadius.js.map
