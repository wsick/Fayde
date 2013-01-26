/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

(function (namespace) {
    var LineBreak = Nullstone.Create("LineBreak", namespace.Inline);
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        LineBreak.Instance.CreateHtmlObjectImpl = function () {
            return document.createElement("br");
        };
    }
    //#endif
    namespace.LineBreak = Nullstone.FinishCreate(LineBreak);
})(Nullstone.Namespace("Fayde.Documents"));