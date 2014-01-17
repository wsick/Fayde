/// <reference path="../scripts/Fayde.d.ts" />
var NflDraft;
(function (NflDraft) {
    (function (Resources) {
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
        Resources.DateValueConverter = DateValueConverter;
        Fayde.RegisterType(DateValueConverter, "NflDraft.Resources", "folder:Resources");
        Fayde.RegisterTypeInterfaces(DateValueConverter, Fayde.Data.IValueConverter_);
    })(NflDraft.Resources || (NflDraft.Resources = {}));
    var Resources = NflDraft.Resources;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=DateValueConverter.js.map
