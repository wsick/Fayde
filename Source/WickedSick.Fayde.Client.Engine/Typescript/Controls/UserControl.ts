/// <reference path="Control.ts" />
/// CODE

module Fayde.Controls {
    export class UCNode extends ControlNode {
        _IsParsing: bool = false;
        XObject: UserControl;
        constructor(xobj: UserControl) {
            super(xobj);
            this.LayoutUpdater.BreaksLayoutClipRender = true;
            this.LayoutUpdater.SetContainerMode(true);
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

        CreateNode(): UCNode { return new UCNode(this); }

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

        private _MeasureOverride(availableSize: size, error: BError): size {
            var desired: size;
            availableSize = size.clone(availableSize);
            var border = this.Padding.Plus(this.BorderThickness);
            size.shrinkByThickness(availableSize, border);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childLu = (<UINode>enumerator.Current).LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.clone(childLu.DesiredSize);
            }
            if (!desired)
                desired = new size();
            size.growByThickness(desired, border);
            return desired;
        }
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var border = this.Padding.Plus(this.BorderThickness);
            var arranged;
            
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childLu = (<UINode>enumerator.Current).LayoutUpdater;
                var childRect = rect.fromSize(finalSize);
                rect.shrinkByThickness(childRect, border);
                childLu._Arrange(childRect, error);
                arranged = size.fromRect(childRect);
                size.growByThickness(arranged, border);
            }
            if (!arranged)
                return finalSize;
            return arranged;
        }
    }
    Nullstone.RegisterType(UserControl, "UserControl");
}