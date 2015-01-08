define(["require", "exports"], function (require, exports) {
    var PlayerOpacityValueConverter = (function () {
        function PlayerOpacityValueConverter() {
        }
        PlayerOpacityValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value)
                return ".3";
            else
                return "1";
        };
        PlayerOpacityValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw new Error("This ValueConverter only does conversion. It cannot convert back.");
        };
        return PlayerOpacityValueConverter;
    })();
    nullstone.addTypeInterfaces(PlayerOpacityValueConverter, Fayde.Data.IValueConverter_);
    return PlayerOpacityValueConverter;
});
//# sourceMappingURL=PlayerOpacityValueConverter.js.map