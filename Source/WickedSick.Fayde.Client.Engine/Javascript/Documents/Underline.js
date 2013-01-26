/// <reference path="Span.js"/>

(function (namespace) {
    var Underline = Nullstone.Create("Underline", namespace.Span);
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Underline.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$Span();
            rootEl.appendChild(document.createElement("u"));
            return rootEl;
        };
        Underline.Instance.GetContentHtmlElement = function () {
            return this.GetRootHtmlElement().firstChild;
        };
    }
    //#endif
    namespace.Underline = Nullstone.FinishCreate(Underline);
})(Nullstone.Namespace("Fayde.Documents"));