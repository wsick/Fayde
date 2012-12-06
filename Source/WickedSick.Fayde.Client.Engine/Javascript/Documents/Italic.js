/// <reference path="Span.js"/>

//#region Italic
var Italic = Nullstone.Create("Italic", Span);

Italic.Instance.CreateHtmlObjectImpl = function () {
    var rootEl = this.CreateHtmlObjectImpl$Span();
    rootEl.appendChild(document.createElement("i"));
    return rootEl;
};
Italic.Instance.GetContentHtmlElement = function () {
    return this.GetRootHtmlElement().firstChild;
};

Nullstone.FinishCreate(Italic);
//#endregion