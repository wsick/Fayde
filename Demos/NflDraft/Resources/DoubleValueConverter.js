/// <reference path="../scripts/Fayde.d.ts" />
var NflDraft;
(function (NflDraft) {
    (function (Resources) {
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
        Resources.DoubleValueConverter = DoubleValueConverter;
        Fayde.RegisterType(DoubleValueConverter, "NflDraft.Resources", "folder:Resources");
        Fayde.RegisterTypeInterfaces(DoubleValueConverter, Fayde.Data.IValueConverter_);
    })(NflDraft.Resources || (NflDraft.Resources = {}));
    var Resources = NflDraft.Resources;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=DoubleValueConverter.js.map
