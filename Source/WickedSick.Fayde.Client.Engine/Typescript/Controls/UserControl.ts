/// <reference path="Control.ts" />
/// CODE

module Fayde.Controls {
    export class UCNode extends ControlNode {
        _IsParsing: bool = false;
        XObject: UserControl;
        constructor(xobj: UserControl) {
            super(xobj);
            this.LayoutUpdater.BreaksLayoutClipRender = true;
        }
        _GetDefaultTemplate(): UIElement {
            var xobj = this.XObject;
            var type = (<any>xobj).constructor;
            var json = type.__TemplateJson;
            if (json) {
                this._IsParsing = true;
                return JsonParser.ParseUserControl(json, this);
                this._IsParsing = false;
            }
        }
    }
    Nullstone.RegisterType(UCNode, "UCNode");

    export class UserControl extends Control {
        XamlNode: UCNode;
        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, UserControl, undefined, (d, args) => (<UserControl>d)._InvalidateContent(args));
        Content: any;
        static Annotations = { ContentProperty: UserControl.ContentProperty }

        CreateNode(): UCNode {
            var n = new UCNode(this);
            n.LayoutUpdater.SetContainerMode(true);
            return n;
        }

        InitializeComponent() {
            this.ApplyTemplate();
        }

        private _InvalidateContent(args: IDependencyPropertyChangedEventArgs) {
            var n = this.XamlNode;
            if (n._IsParsing)
                return;
            if (args.OldValue instanceof UIElement) {
                n.SetSubtreeNode(null);
                n._ElementRemoved(<UIElement>args.OldValue);
            }
            if (args.NewValue instanceof UIElement) {
                var newContent: UIElement = args.NewValue;
                n.SetSubtreeNode(newContent.XamlNode);
                n._ElementAdded(newContent);
            }
            n.LayoutUpdater.UpdateBounds();
        }
    }
    Nullstone.RegisterType(UserControl, "UserControl");
}