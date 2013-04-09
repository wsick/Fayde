var FontFamily = (function () {
    function FontFamily(FamilyNames) {
        this.FamilyNames = FamilyNames;
    }
    FontFamily._TypeName = "FontFamily";
    FontFamily.prototype.toString = function () {
        return this.FamilyNames;
    };
    return FontFamily;
})();
//@ sourceMappingURL=FontFamily.js.map
