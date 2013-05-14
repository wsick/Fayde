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

        private _Presenter: ContentPresenter = null;
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
            this._Presenter = presenter;
            return presenter;
        }
        ClearPresenter() {
            var presenter = this._Presenter;
            if (presenter) {
                presenter.ClearValue(ContentPresenter.ContentProperty);
                presenter.ClearValue(ContentPresenter.ContentTemplateProperty);
                this.DetachVisualChild(presenter, null);
            }
            this._Presenter = null;
        }
    }
    Nullstone.RegisterType(ContentControlNode, "ContentControlNode");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentChanged(args));
        static ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", () => DataTemplate, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentTemplateChanged(args));
        Content: any;
        ContentTemplate: DataTemplate;

        static Annotations = { ContentProperty: ContentControl.ContentProperty }

        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate) { }

        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            if (args.OldValue instanceof UIElement)
                node.DetachVisualChild(<UIElement>args.OldValue, null);
            if (args.NewValue instanceof UIElement)
                node.ClearPresenter();
            this.OnContentChanged(args.OldValue, args.NewValue);
            this.InvalidateMeasure();
        }
        _ContentTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnContentTemplateChanged(args.OldValue, args.NewValue);
            this.InvalidateMeasure();
        }
    }
    Nullstone.RegisterType(ContentControl, "ContentControl");
}