/// <reference path="UserControl.js"/>
/// CODE

(function (namespace) {
    var Page = Nullstone.Create("Page", namespace.UserControl);

    //#region Properties

    Page.TitleProperty = DependencyProperty.Register("Title", function () { return String; }, Page);

    Nullstone.AutoProperties(Page, [
        Page.TitleProperty
    ]);

    //#endregion

    namespace.Page = Nullstone.FinishCreate(Page);
})(Nullstone.Namespace("Fayde.Controls"));