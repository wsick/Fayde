/// <reference path="Panel.ts" />
/// CODE

module Fayde.Controls {
    export class StackPanel extends Panel implements IMeasurableHidden, IArrangeableHidden {
        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => Orientation, StackPanel, Orientation.Vertical, (d, args) => (<StackPanel>d)._OrientationChanged(args));
        Orientation: Orientation;

        private _OrientationChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
        }
        private _MeasureOverride(availableSize: size, error: BError): size {
            var childAvailable = size.createInfinite();
            var measured = new size();

            var isVertical = this.Orientation === Orientation.Vertical;
            if (isVertical) {
                childAvailable.Width = availableSize.Width;
                var width = this.Width;
                if (!isNaN(width))
                    childAvailable.Width = width;
                childAvailable.Width = Math.min(childAvailable.Width, this.MaxWidth);
                childAvailable.Width = Math.max(childAvailable.Width, this.MinWidth);
            } else {
                childAvailable.Height = availableSize.Height;
                var height = this.Height;
                if (!isNaN(height))
                    childAvailable.Height = height;
                childAvailable.Height = Math.min(childAvailable.Height, this.MaxHeight);
                childAvailable.Height = Math.max(childAvailable.Height, this.MinHeight);
            }

            var enumerator = this.Children.GetEnumerator();
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
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var arranged = size.clone(finalSize);
            var isVertical = this.Orientation === Orientation.Vertical;
            if (isVertical)
                arranged.Height = 0;
            else
                arranged.Width = 0;
            
            var enumerator = this.Children.GetEnumerator();
            var child: UIElement;
            var childNode: UINode;
            var childLu: LayoutUpdater;
            while (enumerator.MoveNext()) {
                child = enumerator.Current;
                childNode = child.XamlNode;
                var childLu = childNode.LayoutUpdater;

                var s = size.clone(childLu.DesiredSize);
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
    Nullstone.RegisterType(StackPanel, "StackPanel");
}