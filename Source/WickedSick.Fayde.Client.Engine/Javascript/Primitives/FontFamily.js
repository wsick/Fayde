/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region FontFamily
var FontFamily = Nullstone.Create("FontFamily");

FontFamily.Instance.Init = function (familyNames) {
    this.FamilyNames = familyNames;
};

FontFamily.Instance.toString = function () {
    return this.FamilyNames;
};

Nullstone.FinishCreate(FontFamily);
//#endregion