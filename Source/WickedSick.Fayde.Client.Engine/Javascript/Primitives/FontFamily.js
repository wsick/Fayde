/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var FontFamily = Nullstone.Create("FontFamily");

    FontFamily.Instance.Init = function (familyNames) {
        this.FamilyNames = familyNames;
    };

    FontFamily.Instance.toString = function () {
        return this.FamilyNames;
    };

    namespace.FontFamily = Nullstone.FinishCreate(FontFamily);
})(window);