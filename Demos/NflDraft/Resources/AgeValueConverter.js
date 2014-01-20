/// <reference path="../scripts/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    var AgeValueConverter = (function () {
        function AgeValueConverter() {
        }
        AgeValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value === undefined)
                return null;
            var today = new Date();
            var age = today.getFullYear() - value.getFullYear();
            if (today.getMonth() < value.getMonth())
                age--;
            if (value.getMonth() - 1 == today.getMonth() && today.getDate() < value.getDate())
                age--;
            return age;
        };
        AgeValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        };
        return AgeValueConverter;
    })();
    Fayde.RegisterTypeInterfaces(AgeValueConverter, Fayde.Data.IValueConverter_);
    
    return AgeValueConverter;
});
//# sourceMappingURL=AgeValueConverter.js.map
