var NflDraft;
(function (NflDraft) {
    /// <reference path="../scripts/Fayde.d.ts" />
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
        Fayde.RegisterType(DoubleValueConverter, {
            Name: "DoubleValueConverter",
            Namespace: "NflDraft.Resources",
            XmlNamespace: "folder:Resources",
            Interfaces: [Fayde.Data.IValueConverter_]
        });
    })(NflDraft.Resources || (NflDraft.Resources = {}));
    var Resources = NflDraft.Resources;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=DoubleValueConverter.js.map
