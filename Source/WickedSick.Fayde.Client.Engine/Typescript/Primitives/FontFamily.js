/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var FontFamily = (function () {
    function FontFamily(FamilyNames) {
        this.FamilyNames = FamilyNames;
    }
    FontFamily.prototype.toString = function () {
        return this.FamilyNames;
    };
    return FontFamily;
})();
Nullstone.RegisterType(FontFamily, "FontFamily");
//@ sourceMappingURL=FontFamily.js.map
