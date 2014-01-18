/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Xaml/XamlDocument.ts" />
/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde.Controls {
    var fxd = new Xaml.XamlDocument("<DataTemplate xmlns=\"" + Fayde.XMLNS + "\"><Grid><TextBlock Text=\"{Binding}\" /></Grid></DataTemplate>");
    var fallbackTemplate = <DataTemplate>Xaml.Load(fxd.Document);

    export class ContentPresenterNode extends FENode {
        private _ContentRoot: UIElement;
        get ContentRoot(): UIElement { return this._ContentRoot; }

        XObject: ContentPresenter;
        constructor(xobj: ContentPresenter) {
            super(xobj);
        }

        DoApplyTemplateWithError(error: BError): boolean {
            if (this._ContentRoot)
                return false;
                
            var xobj = this.XObject;
            if (xobj.TemplateOwner instanceof ContentControl) {
                if (xobj.ReadLocalValue(ContentPresenter.ContentProperty) === DependencyProperty.UnsetValue) {
                    xobj.SetValue(ContentPresenter.ContentProperty,
                        new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
                }
                if (xobj.ReadLocalValue(ContentPresenter.ContentTemplateProperty) === DependencyProperty.UnsetValue) {
                    xobj.SetValue(ContentPresenter.ContentTemplateProperty,
                        new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
                }
            }

            var content = xobj.Content;
            if (!content)
                return false;

            if (content instanceof UIElement)
                this._ContentRoot = content;
            else
                this._ContentRoot = (xobj.ContentTemplate || fallbackTemplate).GetVisualTree(xobj);

            if (!this._ContentRoot)
                return false;

            return this.AttachVisualChild(this._ContentRoot, error);
        }

        ClearRoot() {
            if (this._ContentRoot)
                this.DetachVisualChild(this._ContentRoot, null);
            this._ContentRoot = null;
        }

        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            var newContent = args.NewValue;
            var newUie: UIElement;
            if (newContent instanceof UIElement) newUie = newContent;
            
            if (newUie || args.OldValue instanceof UIElement)
                this.ClearRoot();
            
            if (newContent && !newUie)
                this.XObject.DataContext = newContent;
            else
                this.XObject.DataContext = undefined;

            this.LayoutUpdater.InvalidateMeasure();
        }
        _ContentTemplateChanged() {
            this.ClearRoot();
            this.LayoutUpdater.InvalidateMeasure();
        }
    }
    Fayde.RegisterType(ContentPresenterNode, "Fayde.Controls");

    export class ContentPresenter extends FrameworkElement {
        XamlNode: ContentPresenterNode;
        CreateNode(): ContentPresenterNode { return new ContentPresenterNode(this); }

        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentPresenter, undefined, (d, args) => (<ContentPresenterNode>(<ContentPresenter>d).XamlNode)._ContentChanged(args));
        static ContentTemplateProperty: DependencyProperty = DependencyProperty.Register("ContentTemplate", () => DataTemplate, ContentPresenter, undefined, (d, args) => (<ContentPresenterNode>(<ContentPresenter>d).XamlNode)._ContentTemplateChanged());
        Content: any;
        ContentTemplate: DataTemplate;

        static Annotations = { ContentProperty: ContentPresenter.ContentProperty }
    }
    Fayde.RegisterType(ContentPresenter, "Fayde.Controls", Fayde.XMLNS);
}