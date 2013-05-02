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
            if (content) {
                var fr = this.FallbackRoot;
                fr.XamlNode.DataContext = content;
                return fr;
            }
        }

        OnContentChanged(newContent: any) {
            //if (this._FallbackRoot)
            //  this._FallbackRoot.XamlNode.DataContext = newContent;
        }

        private _FallbackRoot: UIElement;
        get FallbackRoot(): UIElement {
            var fr = this._FallbackRoot;
            if (!fr) {
                var ft = ContentControlNode._FallbackTemplate;
                if (!ft)
                    ft = ContentControlNode._CreateFallbackTemplate();
                fr = this._FallbackRoot = <UIElement>ft.GetVisualTree(this.XObject);
            }
            return fr;
        }
        private static _FallbackTemplate: DataTemplate;
        // <DataTemplate><Grid><TextBlock Text="{Binding}" /></Grid></DataTemplate>
        private static _CreateFallbackTemplate(): DataTemplate {
            return new DataTemplate({
                ParseType: Grid,
                Children: [
                    {
                        ParseType: TextBlock,
                        Props: { Text: new BindingMarkup({}) }
                    }
                ]
            });
            //TODO: DataTemplate wants a res chain, do we need to pass it our res chain?
        }
    }
    Nullstone.RegisterType(ContentControlNode, "ContentControlNode");

    export class ContentControl extends Control {
        XamlNode: ContentControlNode;
        CreateNode(): ContentControlNode { return new ContentControlNode(this); }

        _ContentSetsParent: bool = true;
        static ContentProperty: DependencyProperty = DependencyProperty.RegisterCore("Content", () => Object, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentChanged(args));
        static ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", () => DataTemplate, ContentControl, undefined, (d, args) => (<ContentControl>d)._ContentTemplateChanged(args));
        Content: any;
        ContentTemplate: DataTemplate;

        static Annotations = { ContentProperty: ContentControl.ContentProperty }

        OnContentChanged(oldContent: any, newContent: any) { }
        OnContentTemplateChanged(oldContentTemplate: DataTemplate, newContentTemplate: DataTemplate) { }

        _ContentChanged(args: IDependencyPropertyChangedEventArgs) {
            if (args.OldValue instanceof UIElement)
                this.XamlNode.DetachVisualChild(<UIElement>args.OldValue, null);
            this.XamlNode.OnContentChanged(args.NewValue);
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