/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/TemplateBindingExpression.ts" />
/// <reference path="ContentControl.ts" />
/// <reference path="ControlTemplate.ts" />
/// <reference path="Grid.ts" />
/// <reference path="../Markup/BindingMarkup.ts" />

module Fayde.Controls {
    export class ContentPresenterNode extends FENode {
        _ContentRoot: UIElement;

        XObject: ContentPresenter;
        constructor(xobj:ContentPresenter) {
            super(xobj);
        }

        _ClearRoot() {
            if (this._ContentRoot)
                this.DetachVisualChild(this._ContentRoot, null);
            this._ContentRoot = null;
        }

        private _FallbackRoot: UIElement;
        private _FallbackTemplate: ControlTemplate;
        get FallbackRoot(): UIElement {
            var fr = this._FallbackRoot;
            if (!fr) {
                var ft = this._FallbackTemplate;
                if (!ft)
                    ft = this._CreateFallbackTemplate();
                fr = this._FallbackRoot = <UIElement>ft.GetVisualTree(this.XObject);
            }
            return fr;
        }
        // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
        private _CreateFallbackTemplate(): ControlTemplate {
            return new ControlTemplate(ContentPresenter, {
                ParseType: Grid,
                Children: [
                    {
                        ParseType: TextBlock,
                        Props: {
                            Text: new BindingMarkup({})
                        }
                    }
                ]
            });
            //TODO: ControlTemplate wants a res chain, do we need to pass it our res chain?
        }

        InvokeLoaded() {
            var xobj = this.XObject;
            if (xobj.Content instanceof UIElement)
                xobj.ClearValue(DependencyObject.DataContextProperty);
            else
                xobj.SetValue(DependencyObject.DataContextProperty, xobj.Content);
        }

        _GetDefaultTemplate(): UIElement {
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
            
            if (xobj.ContentTemplate instanceof ControlTemplate) {
                var vt = (<ControlTemplate>xobj.ContentTemplate).GetVisualTree(this.XObject);
                if (vt instanceof UIElement)
                    this._ContentRoot = <UIElement>vt;
            } else {
                var content = xobj.Content;
                if (content instanceof UIElement)
                    this._ContentRoot = content;
                if (!this._ContentRoot && content)
                    this._ContentRoot = this.FallbackRoot;
            }
            return this._ContentRoot;
        }
    }
    Nullstone.RegisterType(ContentPresenterNode, "ContentPresenterNode");

    export class ContentPresenter extends FrameworkElement {
        XamlNode: ContentPresenterNode;
        CreateNode(): ContentPresenterNode { return new ContentPresenterNode(this); }

        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, ContentPresenter, undefined, (d, args) => (<ContentPresenter>d)._ContentChanged(args));
        static ContentTemplateProperty: DependencyProperty = DependencyProperty.Register("ContentTemplate", () => ControlTemplate, ContentPresenter, undefined, (d, args) => (<ContentPresenter>d)._ContentTemplateChanged(args));
        Content: any;
        ContentTemplate: ControlTemplate;

        static Annotations = { ContentProperty: ContentPresenter.ContentProperty }
        
        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;

            var newContent = args.NewValue;
            var newUie: UIElement;
            if (newContent instanceof UIElement)
                newUie = newContent;

            if (newUie || args.OldValue instanceof UIElement)
                node._ClearRoot();

            if (newContent && !newUie)
                this._Store.SetValue(DependencyObject.DataContextProperty, newContent);
            else
                this._Store.ClearValue(DependencyObject.DataContextProperty);
            node.LayoutUpdater.InvalidateMeasure();
        }
        _ContentTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            node._ClearRoot();
            node.LayoutUpdater.InvalidateMeasure();
        }
    }
    Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
}