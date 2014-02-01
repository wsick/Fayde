/// <reference path="../scripts/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value === undefined)
                return null;
            return value.getMonth() + "/" + value.getDate() + "/" + value.getFullYear();
        };
        DateValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        };
        return DateValueConverter;
    })();
    Fayde.RegisterTypeInterfaces(DateValueConverter, Fayde.Data.IValueConverter_);
    
    return DateValueConverter;
});
//# sourceMappingURL=DateValueConverter.js.map
