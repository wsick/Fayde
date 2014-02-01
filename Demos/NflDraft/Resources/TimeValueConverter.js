/// <reference path="../scripts/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    var TimeValueConverter = (function () {
        function TimeValueConverter() {
        }
        TimeValueConverter.prototype.Convert = function (value, targetType, parameter, culture) {
            if (value === undefined)
                return "0:00";
            var div = Math.floor(value / 60).toString();
            var rem = (value % 60).toString();
            if (rem.length == 1)
                rem = "0" + rem;
            return div + ":" + rem;
        };
        TimeValueConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        };
        return TimeValueConverter;
    })();
    Fayde.RegisterTypeInterfaces(TimeValueConverter, Fayde.Data.IValueConverter_);
    
    return TimeValueConverter;
});
//# sourceMappingURL=TimeValueConverter.js.map
