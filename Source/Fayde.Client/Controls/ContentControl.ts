/// <reference path="Control.ts" />

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
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
            presenter.SetValue(ContentPresenter.ContentTemplateProperty,
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
            return presenter;
        }
    }
    Fayde.RegisterType(ContentControlNode, "Fayde.Controls");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        _ContentSetsParent: boolean = true;

        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d).OnContentChanged(args.OldValue, args.NewValue));
        Content: any;
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
                Xaml.XamlDocument.Resolve(newUri)
                    .success(xd => this._OnLoadedUri(xd))
                    .error(err => this._OnErroredUri(err, newUri));
            }
            this.OnContentUriChanged(oldUri, newUri);
        }
        OnContentUriChanged(oldSourceUri: Uri, newSourceUri: Uri) { }

        static Annotations = { ContentProperty: ContentControl.ContentProperty }

        private _OnLoadedUri(xd: Xaml.XamlDocument) {
            this.Content = Xaml.Load(xd.Document);
        }
        private _OnErroredUri(err: any, src: Uri) {
            console.warn("Error resolving XamlResource: '" + src.toString() + "'.")
            //TODO: Set content to error message?
        }
    }
    Fayde.RegisterType(ContentControl, "Fayde.Controls", Fayde.XMLNS);
}