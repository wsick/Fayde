/// <reference path="Control.ts" />
/// CODE

module Fayde.Controls {
    export class ContentControl extends Control {
        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.RegisterCore("Content", function () { return Object; }, ContentControl, undefined, function (d, args) { (<ContentControl>d).OnContentChanged(args.OldValue, args.NewValue); });
        static ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () { return ControlTemplate; }, ContentControl, undefined, function (d, args) { (<ContentControl>d).OnContentTemplateChanged(args.OldValue, args.NewValue); });
        
        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: ControlTemplate, newContentTemplate: ControlTemplate) { }
    }
    Nullstone.RegisterType(ContentControl, "ContentControl");
}