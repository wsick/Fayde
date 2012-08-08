/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region Page
var Page = Nullstone.Create("Page", DependencyObject);

//#region Dependency Properties

Page.TitleProperty = DependencyProperty.Register("Title", function () { return String; }, Page);
Page.ContentProperty = DependencyProperty.Register("Content", function () { return UIElement; }, Page);

Nullstone.AutoProperties(Page, [
    Page.TitleProperty,
    Page.ContentProperty
]);

//#endregion

//#region Annotations

Page.Annotations = {
    ContentProperty: Page.ContentProperty
};

//#endregion

Nullstone.FinishCreate(Page);
//#endregion