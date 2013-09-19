var NflDraft;
(function (NflDraft) {
    /// <reference path="../scripts/Fayde.d.ts" />
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
        Fayde.RegisterType(DateValueConverter, {
            Name: "DateValueConverter",
            Namespace: "NflDraft.Resources",
            XmlNamespace: "folder:Resources",
            Interfaces: [Fayde.Data.IValueConverter_]
        });
    })(NflDraft.Resources || (NflDraft.Resources = {}));
    var Resources = NflDraft.Resources;
})(NflDraft || (NflDraft = {}));
