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

        _MeasureOverride(availableSize: size, error: BError): size {
            var desired: size;
            availableSize = size.copyTo(availableSize);

            var padding = this.Padding;
            var borderThickness = this.BorderThickness;
            var border: Thickness = null;
            if (!padding)
                border = borderThickness;
            else if (!borderThickness)
                border = padding;
            else
                border = padding.Plus(borderThickness);
            
            if (border) size.shrinkByThickness(availableSize, border);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childLu = (<UINode>enumerator.Current).LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.copyTo(childLu.DesiredSize);
            }
            if (!desired) desired = new size();
            if (border) size.growByThickness(desired, border);
            return desired;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var padding = this.Padding;
            var borderThickness = this.BorderThickness;
            var border: Thickness = null;
            if (!padding)
                border = borderThickness;
            else if (!borderThickness)
                border = padding;
            else
                border = padding.Plus(borderThickness);

            var arranged: size = null;

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childLu = (<UINode>enumerator.Current).LayoutUpdater;
                var childRect = rect.fromSize(finalSize);
                if (border) rect.shrinkByThickness(childRect, border);
                childLu._Arrange(childRect, error);
                arranged = size.fromRect(childRect);
                if (border) size.growByThickness(arranged, border);
            }
            if (arranged)
                return arranged;
            return finalSize;
        }
    }
    Nullstone.RegisterType(UserControl, "UserControl");
}