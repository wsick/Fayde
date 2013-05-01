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
        _GetDefaultTemplate(): UIElement {
            var xobj = this.XObject;
            var content = xobj.Content;
            if (content instanceof UIElement)
                return <UIElement>content;
            if (content)
                return this.FallbackRoot;
        }
        
        private _FallbackRoot: UIElement;
        private _FallbackTemplate: ControlTemplate;
        get FallbackRoot(): UIElement {
            var fr = this._FallbackRoot;
            if (!fr) {
                fr = new ContentPresenter();
                fr.TemplateOwner = this.XObject;

                //var ft = this._FallbackTemplate;
                //if (!ft)
                    //ft = this._CreateFallbackTemplate();
                //fr = this._FallbackRoot = <UIElement>ft.GetVisualTree(this.XObject);
            }
            return fr;
        }
        // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
        private _CreateFallbackTemplate(): ControlTemplate {
            return new ControlTemplate(ContentControl, {
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
    }
    Nullstone.RegisterType(ContentControlNode, "ContentControlNode");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.RegisterCore("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentChanged(args));
        static ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", () => ControlTemplate, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentTemplateChanged(args));
        Content: any;
        ContentTemplate: ControlTemplate;

        static Annotations = { ContentProperty: ContentControl.ContentProperty }

        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: ControlTemplate, newContentTemplate: ControlTemplate) { }

        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            if (args.OldValue instanceof UIElement)
                this.XamlNode.DetachVisualChild(<UIElement>args.OldValue, null);

            this.OnContentChanged(args.OldValue, args.NewValue);
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        _ContentTemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnContentTemplateChanged(args.OldValue, args.NewValue);
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
    }
    Nullstone.RegisterType(ContentControl, "ContentControl");
}