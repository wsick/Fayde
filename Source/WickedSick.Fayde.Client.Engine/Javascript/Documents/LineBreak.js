/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

(function (namespace) {
    var LineBreak = Nullstone.Create("LineBreak", Inline);

    LineBreak.Instance.CreateHtmlObjectImpl = function () {
        return document.createElement("br");
    };

    namespace.LineBreak = Nullstone.FinishCreate(LineBreak);
})(window);