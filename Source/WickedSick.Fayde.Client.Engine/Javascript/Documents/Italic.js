/// <reference path="Span.js"/>

(function (namespace) {
    var Italic = Nullstone.Create("Italic", namespace.Span);
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Italic.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$Span();
            rootEl.appendChild(document.createElement("i"));
            return rootEl;
        };
        Italic.Instance.GetContentHtmlElement = function () {
            return this.GetRootHtmlElement().firstChild;
        };
    }
    //#endif
    namespace.Italic = Nullstone.FinishCreate(Italic);
})(Nullstone.Namespace("Fayde.Documents"));