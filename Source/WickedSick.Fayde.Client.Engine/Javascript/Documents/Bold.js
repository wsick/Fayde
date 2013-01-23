/// <reference path="Span.js"/>

(function (namespace) {
    var Bold = Nullstone.Create("Bold", Span);
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Bold.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$Span();
            rootEl.appendChild(document.createElement("b"));
            return rootEl;
        };
        Bold.Instance.GetContentHtmlElement = function () {
            return this.GetRootHtmlElement().firstChild;
        };
    }
    //#endif
    namespace.Bold = Nullstone.FinishCreate(Bold);
})(window);