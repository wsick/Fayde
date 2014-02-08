/// <reference path="../lib/Fayde/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
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
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        };
        return PlayerOpacityValueConverter;
    })();
    Fayde.RegisterTypeInterfaces(PlayerOpacityValueConverter, Fayde.Data.IValueConverter_);
    
    return PlayerOpacityValueConverter;
});
//# sourceMappingURL=PlayerOpacityValueConverter.js.map
