/// <reference path="Control.ts" />
/// CODE
/// <reference path="Grid.ts" />
/// <reference path="../Markup/BindingMarkup.ts" />

module Fayde.Controls {
    export class ContentControlNode extends ControlNode {
        XObject: ContentControl;
        constructor(xobj: ContentControl) {
            super(xobj);
        }

        GetDefaultVisualTree(): UIElement {
            var xobj = this.XObject;
            var content = xobj.Content;
            if (content instanceof UIElement)
                return <UIElement>content;

            var presenter = new ContentPresenter();
            presenter.TemplateOwner = this.XObject;
            presenter.SetValue(ContentPresenter.ContentProperty,
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty, "Content"));
            presenter.SetValue(ContentPresenter.ContentTemplateProperty,
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty, "ContentTemplate"));
            return presenter;
        }
    }
    Nullstone.RegisterType(ContentControlNode, "ContentControlNode");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentChanged(args.OldValue, args.NewValue));
        static ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", () => DataTemplate, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentTemplateChanged(args.OldValue, args.NewValue));
        Content: any;
        ContentTemplate: DataTemplate;

        static Annotations = { ContentProperty: ContentControl.ContentProperty }

        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate) { }
    }
    Nullstone.RegisterType(ContentControl, "ContentControl");
}