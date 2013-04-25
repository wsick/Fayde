var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Panel.ts" />
    /// CODE
    (function (Controls) {
        var StackPanel = (function (_super) {
            __extends(StackPanel, _super);
            function StackPanel() {
                _super.apply(this, arguments);

            }
            StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () {
                return Fayde.Orientation;
            }, StackPanel, Fayde.Orientation.Vertical, function (d, args) {
                return (d)._OrientationChanged(args);
            });
            StackPanel.prototype._OrientationChanged = function (args) {
                var lu = this.XamlNode.LayoutUpdater;
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
            };
            StackPanel.prototype._MeasureOverride = function (availableSize, error) {
                var childAvailable = size.createInfinite();
                var measured = new size();
                var isVertical = this.Orientation === Fayde.Orientation.Vertical;
                if(isVertical) {
                    childAvailable.Width = availableSize.Width;
                    var width = this.Width;
                    if(!isNaN(width)) {
                        childAvailable.Width = width;
                    }
                    childAvailable.Width = Math.min(childAvailable.Width, this.MaxWidth);
                    childAvailable.Width = Math.max(childAvailable.Width, this.MinWidth);
                } else {
                    childAvailable.Height = availableSize.Height;
                    var height = this.Height;
                    if(!isNaN(height)) {
                        childAvailable.Height = height;
                    }
                    childAvailable.Height = Math.min(childAvailable.Height, this.MaxHeight);
                    childAvailable.Height = Math.max(childAvailable.Height, this.MinHeight);
                }
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    var childLu = (enumerator.Current).LayoutUpdater;
                    childLu._Measure(childAvailable, error);
                    var s = childLu.DesiredSize;
                    if(isVertical) {
                        measured.Height += s.Height;
                        measured.Width = Math.max(measured.Width, s.Width);
                    } else {
                        measured.Width += s.Width;
                        measured.Height = Math.max(measured.Height, s.Height);
                    }
                }
                return measured;
            };
            StackPanel.prototype._ArrangeOverride = function (finalSize, error) {
                var arranged = size.clone(finalSize);
                var isVertical = this.Orientation === Fayde.Orientation.Vertical;
                if(isVertical) {
                    arranged.Height = 0;
                } else {
                    arranged.Width = 0;
                }
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    var childLu = (enumerator.Current).LayoutUpdater;
                    var s = size.clone(childLu.DesiredSize);
                    if(isVertical) {
                        s.Width = finalSize.Width;
                        var childFinal = rect.fromSize(s);
                        childFinal.Y = arranged.Height;
                        if(rect.isEmpty(childFinal)) {
                            rect.clear(childFinal);
                        }
                        childLu._Arrange(childFinal, error);
                        arranged.Width = Math.max(arranged.Width, s.Width);
                        arranged.Height += s.Height;
                    } else {
                        s.Height = finalSize.Height;
                        var childFinal = rect.fromSize(s);
                        childFinal.X = arranged.Width;
                        if(rect.isEmpty(childFinal)) {
                            rect.clear(childFinal);
                        }
                        childLu._Arrange(childFinal, error);
                        arranged.Width += s.Width;
                        arranged.Height = Math.max(arranged.Height, s.Height);
                    }
                }
                if(isVertical) {
                    arranged.Height = Math.max(arranged.Height, finalSize.Height);
                } else {
                    arranged.Width = Math.max(arranged.Width, finalSize.Width);
                }
                return arranged;
            };
            return StackPanel;
        })(Controls.Panel);
        Controls.StackPanel = StackPanel;        
        Nullstone.RegisterType(StackPanel, "StackPanel");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=StackPanel.js.map
