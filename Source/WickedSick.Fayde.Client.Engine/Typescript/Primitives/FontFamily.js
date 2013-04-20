/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var FontFamily = (function () {
    function FontFamily(FamilyNames) {
        this.FamilyNames = FamilyNames;
    }
    FontFamily.prototype.toString = function () {
        return this.FamilyNames;
    };
    FontFamily.prototype.Clone = function () {
        return new FontFamily(this.FamilyNames);
    };
    return FontFamily;
})();
Nullstone.RegisterType(FontFamily, "FontFamily");
//@ sourceMappingURL=FontFamily.js.map
