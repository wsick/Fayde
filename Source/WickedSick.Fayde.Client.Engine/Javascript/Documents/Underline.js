/// <reference path="Span.js"/>

//#region Underline
var Underline = Nullstone.Create("Underline", Span);

Underline.Instance.CreateHtmlObjectImpl = function () {
    var rootEl = this.CreateHtmlObjectImpl$Span();
    rootEl.appendChild(document.createElement("u"));
    return rootEl;
};
Underline.Instance.GetContentHtmlElement = function () {
    return this.GetRootHtmlElement().firstChild;
};

Nullstone.FinishCreate(Underline);
//#endregion