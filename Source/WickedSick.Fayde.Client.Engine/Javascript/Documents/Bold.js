/// <reference path="Span.js"/>

//#region Bold
var Bold = Nullstone.Create("Bold", Span);

Bold.Instance.CreateHtmlObjectImpl = function () {
    var rootEl = this.CreateHtmlObjectImpl$Span();
    rootEl.appendChild(document.createElement("b"));
    return rootEl;
};
Bold.Instance.GetContentHtmlElement = function () {
    return this.GetRootHtmlElement().firstChild;
};

Nullstone.FinishCreate(Bold);
//#endregion