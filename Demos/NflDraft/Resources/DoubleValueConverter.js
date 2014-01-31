/// <reference path="../scripts/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    var DoubleValueConverter = (function () {
        function DoubleValueConverter() {
        }
        DoubleValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value === undefined)
                return null;
            return value.toFixed(2);
        };
        DoubleValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        };
        return DoubleValueConverter;
    })();
    Fayde.RegisterTypeInterfaces(DoubleValueConverter, Fayde.Data.IValueConverter_);
    
    return DoubleValueConverter;
});
//# sourceMappingURL=DoubleValueConverter.js.map
