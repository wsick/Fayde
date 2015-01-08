define(["require", "exports"], function (require, exports) {
    var StatVisibilityValueConverter = (function () {
        function StatVisibilityValueConverter() {
        }
        StatVisibilityValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            switch (value.PrimaryPosition) {
                case "QB":
                    if (parameter == "Passing" || parameter == "Rushing")
                        return "Visible";
                    break;
                case "RB":
                    if (parameter == "Rushing" || parameter == "Receiving")
                        return "Visible";
                    break;
                case "WR":
                    if (parameter == "Receiving" || parameter == "Rushing")
                        return "Visible";
                    break;
                case "TE":
                    if (parameter == "Receiving" || parameter == "Rushing")
                        return "Visible";
                    break;
            }
            return "Collapsed";
        };
        StatVisibilityValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw new Error("This ValueConverter only does conversion. It cannot convert back.");
        };
        return StatVisibilityValueConverter;
    })();
    nullstone.addTypeInterfaces(StatVisibilityValueConverter, Fayde.Data.IValueConverter_);
    return StatVisibilityValueConverter;
});
//# sourceMappingURL=StatVisibilityValueConverter.js.map