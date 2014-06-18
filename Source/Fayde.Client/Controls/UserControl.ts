/// <reference path="Control.ts" />

module Fayde.Controls {
    export class UserControl extends Control {
        static ContentProperty: DependencyProperty = DependencyProperty.Register("Content", () => Object, UserControl, undefined, (d, args) => (<UserControl>d)._InvalidateContent(args));
        Content: any;

        CreateLayoutUpdater(node: UINode) { return new UserControlLayoutUpdater(node); }

        InitializeComponent() {
            this.ApplyTemplate();
        }

        private _InvalidateContent(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            var error = new BError();
            if (args.OldValue instanceof UIElement)
                node.DetachVisualChild(<UIElement>args.OldValue, error);
            if (args.NewValue instanceof UIElement)
                node.AttachVisualChild(<UIElement>args.NewValue, error);
            if (error.Message)
                error.ThrowException();
            node.LayoutUpdater.UpdateBounds();
        }
    }
    Fayde.RegisterType(UserControl, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(UserControl, UserControl.ContentProperty);

    export class UserControlLayoutUpdater extends LayoutUpdater {
        constructor(node: UINode) {
            super(node);
            this.BreaksLayoutClipRender = true;
            this.SetContainerMode(true);
        }

        MeasureOverride(availableSize: size, error: BError): size {
            var desired: size;
            availableSize = size.copyTo(availableSize);

            var uc = <UserControl>this.Node.XObject;
            var padding = uc.Padding;
            var borderThickness = uc.BorderThickness;
            var border: Thickness = null;
            if (!padding)
                border = borderThickness;
            else if (!borderThickness)
                border = padding;
            else
                border = padding.Plus(borderThickness);

            if (border) size.shrinkByThickness(availableSize, border);

            var enumerator = this.Node.GetVisualTreeEnumerator();
            while (enumerator.moveNext()) {
                var childLu = (<UINode>enumerator.Current).LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.copyTo(childLu.DesiredSize);
            }
            if (!desired) desired = new size();
            if (border) size.growByThickness(desired, border);
            return desired;
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            var uc = <UserControl>this.Node.XObject;
            var padding = uc.Padding;
            var borderThickness = uc.BorderThickness;
            var border: Thickness = null;
            if (!padding)
                border = borderThickness;
            else if (!borderThickness)
                border = padding;
            else
                border = padding.Plus(borderThickness);

            var arranged: size = null;

            var enumerator = this.Node.GetVisualTreeEnumerator();
            while (enumerator.moveNext()) {
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
}