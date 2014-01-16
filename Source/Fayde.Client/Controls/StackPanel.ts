/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class StackPanel extends Panel {
        CreateLayoutUpdater(node: PanelNode) { return new StackPanelLayoutUpdater(node); }

        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), StackPanel, Orientation.Vertical, (d, args) => (<StackPanel>d)._OrientationChanged(args));
        Orientation: Orientation;

        private _OrientationChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
        }
    }
    Fayde.RegisterType(StackPanel, "Fayde.Controls", Fayde.XMLNS);

    export class StackPanelLayoutUpdater extends PanelLayoutUpdater {
        MeasureOverride(availableSize: size, error: BError): size {
            var sp = <StackPanel>this.Node.XObject;
            var childAvailable = size.createInfinite();
            var measured = new size();

            var isVertical = sp.Orientation === Orientation.Vertical;
            if (isVertical) {
                childAvailable.Width = availableSize.Width;
                var width = sp.Width;
                if (!isNaN(width))
                    childAvailable.Width = width;
                childAvailable.Width = Math.min(childAvailable.Width, sp.MaxWidth);
                childAvailable.Width = Math.max(childAvailable.Width, sp.MinWidth);
            } else {
                childAvailable.Height = availableSize.Height;
                var height = sp.Height;
                if (!isNaN(height))
                    childAvailable.Height = height;
                childAvailable.Height = Math.min(childAvailable.Height, sp.MaxHeight);
                childAvailable.Height = Math.max(childAvailable.Height, sp.MinHeight);
            }

            var enumerator = sp.Children.GetEnumerator();
            var child: UIElement;
            var childNode: UINode;
            var childLu: LayoutUpdater;
            while (enumerator.MoveNext()) {
                child = enumerator.Current;
                childNode = child.XamlNode;
                var childLu = childNode.LayoutUpdater;

                childLu._Measure(childAvailable, error);
                var s = childLu.DesiredSize;

                if (isVertical) {
                    measured.Height += s.Height;
                    measured.Width = Math.max(measured.Width, s.Width);
                } else {
                    measured.Width += s.Width;
                    measured.Height = Math.max(measured.Height, s.Height);
                }
            }

            return measured;
        }
        ArrangeOverride(finalSize: size, error: BError): size {
            var sp = <StackPanel>this.Node.XObject;
            var arranged = size.copyTo(finalSize);
            var isVertical = sp.Orientation === Orientation.Vertical;
            if (isVertical)
                arranged.Height = 0;
            else
                arranged.Width = 0;

            var enumerator = sp.Children.GetEnumerator();
            var child: UIElement;
            var childNode: UINode;
            var childLu: LayoutUpdater;
            while (enumerator.MoveNext()) {
                child = enumerator.Current;
                childNode = child.XamlNode;
                var childLu = childNode.LayoutUpdater;

                var s = size.copyTo(childLu.DesiredSize);
                if (isVertical) {
                    s.Width = finalSize.Width;

                    var childFinal = rect.fromSize(s);
                    childFinal.Y = arranged.Height;

                    if (rect.isEmpty(childFinal))
                        rect.clear(childFinal);
                    childLu._Arrange(childFinal, error);

                    arranged.Width = Math.max(arranged.Width, s.Width);
                    arranged.Height += s.Height;
                } else {
                    s.Height = finalSize.Height;

                    var childFinal = rect.fromSize(s);
                    childFinal.X = arranged.Width;

                    if (rect.isEmpty(childFinal))
                        rect.clear(childFinal);
                    childLu._Arrange(childFinal, error);

                    arranged.Width += s.Width;
                    arranged.Height = Math.max(arranged.Height, s.Height);
                }
            }

            if (isVertical)
                arranged.Height = Math.max(arranged.Height, finalSize.Height);
            else
                arranged.Width = Math.max(arranged.Width, finalSize.Width);

            return arranged;
        }
    }
}