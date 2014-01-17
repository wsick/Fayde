/// <reference path="../scripts/Fayde.d.ts" />
var NflDraft;
(function (NflDraft) {
    (function (Resources) {
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
        Resources.AgeValueConverter = AgeValueConverter;
        Fayde.RegisterType(AgeValueConverter, "NflDraft.Resources", "folder:Resources");
        Fayde.RegisterTypeInterfaces(AgeValueConverter, Fayde.Data.IValueConverter_);
    })(NflDraft.Resources || (NflDraft.Resources = {}));
    var Resources = NflDraft.Resources;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=AgeValueConverter.js.map
