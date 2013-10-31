var Fayde;
(function (Fayde) {
    function Clone(value) {
        if (value === undefined)
            return undefined;
        if (value === null)
            return null;
        if (value instanceof Fayde.XamlObject)
            return (value).Clone();

        if (typeof value === "number" || typeof value === "string")
            return value;

        var typeName = value.constructor._TypeName;
        switch (typeName) {
            case "Uri":
            case "rect":
            case "size":
            case "FontFamily":
            case "Point":
            case "Color":
            case "PropertyPath":
            case "RepeatBehavior":
            case "Duration":
            case "KeyTime":
            case "GridLength":
            case "CornerRadius":
            case "Thickness":
                return (value).Clone();
        }

        return new value.constructor();
    }
    Fayde.Clone = Clone;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Clone.js.map
