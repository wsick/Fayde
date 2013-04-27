/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    export class ContentPresenter extends FrameworkElement {
        _ContentRoot: UIElement;

        Content: any;
        ContentTemplate: ControlTemplate;
    }
    Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
}