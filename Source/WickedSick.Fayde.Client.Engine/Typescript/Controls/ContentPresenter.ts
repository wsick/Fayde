/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/TemplateBindingExpression.ts" />
/// <reference path="ContentControl.ts" />
/// <reference path="Grid.ts" />
/// <reference path="../Markup/BindingMarkup.ts" />
/// <reference path="../Core/DataTemplate.ts" />

module Fayde.Controls {
    export class ContentPresenterNode extends FENode {
        private _ContentRoot: UIElement;
        get ContentRoot(): UIElement { return this._ContentRoot; }

        XObject: ContentPresenter;
        constructor(xobj: ContentPresenter) {
            super(xobj);
        }

        DoApplyTemplateWithError(error: BError): bool {
            if (this._ContentRoot)
                return false;
                
            var xobj = this.XObject;
            if (xobj.TemplateOwner instanceof ContentControl) {
                if (xobj.ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
                    xobj.SetValue(ContentPresenter.ContentProperty,
                        new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty, "Content"));
                }
                if (xobj.ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
                    xobj.SetValue(ContentPresenter.ContentTemplateProperty,
                        new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty, "ContentTemplate"));
                }
            }

            var content = xobj.Content;
            if (!content)
                return false;

            if (content instanceof UIElement)
                this._ContentRoot = content;
            else
                this._ContentRoot = (xobj.ContentTemplate || this.FallbackTemplate).GetVisualTree(xobj);

            if (!this._ContentRoot)
                return false;

            return this.AttachVisualChild(this._ContentRoot, error);
        }

        ClearRoot() {
            if (this._ContentRoot)
                this.DetachVisualChild(this._ContentRoot, null);
            this._ContentRoot = null;
        }
        
        // <DataTemplate><Grid><TextBlock Text="{Binding}" /></Grid></DataTemplate>
        get FallbackTemplate(): DataTemplate {
            return new DataTemplate({
                ParseType: Grid,
                Children: [
                    {
                        ParseType: TextBlock,
                        Props: { Text: new BindingMarkup({}) }
                    }
                ]
            });
        }
    }
    Nullstone.RegisterType(ContentPresenterNode, "ContentPresenterNode");

    export class ContentPresenter extends FrameworkElement {
        XamlNode: ContentPresenterNode;
        CreateNode(): ContentPresenterNode { return new ContentPresenterNode(this); }

        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentPresenter, undefined, (d, args) => (<ContentPresenter>d)._ContentChanged(args));
        static ContentTemplateProperty: DependencyProperty = DependencyProperty.Register("ContentTemplate", () => DataTemplate, ContentPresenter, undefined, (d, args) => (<ContentPresenter>d)._ContentTemplateChanged(args));
        Content: any;
        ContentTemplate: DataTemplate;

        static Annotations = { ContentProperty: ContentPresenter.ContentProperty }
        
        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;

            var newContent = args.NewValue;
            var newUie: UIElement;
            if (newContent instanceof UIElement)
                newUie = newContent;
            else
                this.DataContext = newContent;

            if (newUie || args.OldValue instanceof UIElement)
                node.ClearRoot();

            node.LayoutUpdater.InvalidateMeasure();
        }
        _ContentTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            node.ClearRoot();
            node.LayoutUpdater.InvalidateMeasure();
        }
    }
    Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
}