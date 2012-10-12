/// <reference path="UserControl.js"/>
/// CODE

//#region Page
var Page = Nullstone.Create("Page", UserControl);

//#region Properties

Page.TitleProperty = DependencyProperty.Register("Title", function () { return String; }, Page);

Nullstone.AutoProperties(Page, [
    Page.TitleProperty
]);

//#endregion

Nullstone.FinishCreate(Page);
//#endregion