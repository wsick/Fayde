/// <reference path="Control.ts" />

module Fayde.Controls {
    export class ContentControlNode extends ControlNode {
        XObject: ContentControl;
        constructor(xobj: ContentControl) {
            super(xobj);
        }

        OnContentChanged(o: any, n: any) {
            if (o instanceof UIElement) {
                var err = new BError();
                this.DetachVisualChild(o, err);
                if (err.Message)
                    err.ThrowException();
            }
        }

        GetDefaultVisualTree(): UIElement {
            var xobj = this.XObject;
            var content = xobj.Content;
            if (content instanceof UIElement)
                return <UIElement>content;

            var presenter = new ContentPresenter();
            presenter.TemplateOwner = this.XObject;
            presenter.SetValue(ContentPresenter.ContentProperty,
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
            presenter.SetValue(ContentPresenter.ContentTemplateProperty,
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
            return presenter;
        }

        OnTemplateChanged(oldTemplate: ControlTemplate, newTemplate: ControlTemplate) {
            var content = <UIElement>this.XObject.Content;
            if (oldTemplate && content instanceof UIElement) {
                var vpNode = <FENode>content.XamlNode.VisualParentNode;
                if (vpNode instanceof FENode) {
                    var err = new BError();
                    vpNode.DetachVisualChild(content, err);
                    if (err.Message)
                        err.ThrowException();
                }
            }
            super.OnTemplateChanged(oldTemplate, newTemplate);
        }
    }
    Fayde.RegisterType(ContentControlNode, "Fayde.Controls");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentPropertyChanged(args));
        Content: any;
        private OnContentPropertyChanged(args: DependencyPropertyChangedEventArgs) {
            this.XamlNode.OnContentChanged(args.OldValue, args.NewValue);
            this.OnContentChanged(args.OldValue, args.NewValue);
        }
        OnContentChanged(oldContent: any, newContent: any) { }

        static ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", () => DataTemplate, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentTemplateChanged(args.OldValue, args.NewValue));
        ContentTemplate: DataTemplate;
        OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate) { }

        static ContentUriProperty = DependencyProperty.Register("ContentUri", () => Uri, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentUriPropertyChanged(args));
        ContentUri: Uri;
        private OnContentUriPropertyChanged(args: DependencyPropertyChangedEventArgs) {
            var oldUri: Uri;
            if (args.OldValue instanceof Uri) {
                this.Content = undefined;
                oldUri = <Uri>args.OldValue;
            }
            var newUri: Uri;
            if (args.NewValue instanceof Uri) {
                newUri = <Uri>args.NewValue;
                Xaml.XamlDocument.GetAsync(newUri)
                    .success(xd => this._OnLoadedUri(xd))
                    .error(err => this._OnErroredUri(err, newUri));
            }
            this.OnContentUriChanged(oldUri, newUri);
        }
        OnContentUriChanged(oldSourceUri: Uri, newSourceUri: Uri) { }

        private _OnLoadedUri(xd: Xaml.XamlDocument) {
            this.Content = Xaml.Load(xd.Document);
        }
        private _OnErroredUri(err: any, src: Uri) {
            console.warn("Error resolving XamlResource: '" + src.toString() + "'.")
            //TODO: Set content to error message?
        }
    }
    Fayde.RegisterType(ContentControl, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(ContentControl, ContentControl.ContentProperty);
}