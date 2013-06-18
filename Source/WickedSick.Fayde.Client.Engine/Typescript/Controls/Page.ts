/// <reference path="UserControl.ts" />
/// CODE

module Fayde.Controls {
    export class Page extends UserControl {
        static TitleProperty: DependencyProperty = DependencyProperty.Register("Title", () => String, Page);
        Title: string;
    }
    Nullstone.RegisterType(Page, "Page");
}