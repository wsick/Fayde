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
        GetDefaultTemplate(): UIElement {
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

    export class UserControl extends Control implements IMeasurableHidden, IArrangeableHidden {
        XamlNode: UCNode;
        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, UserControl, undefined, (d, args) => (<UserControl>d)._InvalidateContent(args));
        Content: any;
        static Annotations = { ContentProperty: UserControl.ContentProperty }

        CreateNode(): UCNode { return new UCNode(this); }

        InitializeComponent() {
            this.ApplyTemplate();
        }

        private _InvalidateContent(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            if (node._IsParsing)
                return;
            var error = new BError();
            if (args.OldValue instanceof UIElement)
                node.DetachVisualChild(<UIElement>args.OldValue, error);
            if (args.NewValue instanceof UIElement)
                node.AttachVisualChild(<UIElement>args.NewValue, error);
            if (error.Message)
                error.ThrowException();
            node.LayoutUpdater.UpdateBounds();
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