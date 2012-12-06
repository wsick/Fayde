/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region LineBreak
var LineBreak = Nullstone.Create("LineBreak", Inline);

LineBreak.Instance.CreateHtmlObjectImpl = function () {
    return document.createElement("br");
};

Nullstone.FinishCreate(LineBreak);
//#endregion