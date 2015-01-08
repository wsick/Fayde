define(["require", "exports"], function (require, exports) {
    var DoubleValueConverter = (function () {
        function DoubleValueConverter() {
        }
        DoubleValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value === undefined)
                return null;
            return value.toFixed(2);
        };
        DoubleValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw new Error("This ValueConverter only does conversion. It cannot convert back.");
        };
        return DoubleValueConverter;
    })();
    nullstone.addTypeInterfaces(DoubleValueConverter, Fayde.Data.IValueConverter_);
    return DoubleValueConverter;
});
//# sourceMappingURL=DoubleValueConverter.js.map