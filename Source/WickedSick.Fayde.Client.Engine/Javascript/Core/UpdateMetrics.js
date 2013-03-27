/// <reference path="../Primitives.js"/>
/// <reference path="Enums.js"/>
/// CODE

(function (Fayde) {
    "use asm";
    function CreateUpdateMetrics() {
        var metrics = {
            //UIElement
            Opacity: +1,
            UseLayoutRounding: 1 | 0,
            Visibility: 0 | 0, //Fayde.Visibility.Visible
            //FrameworkElement
            Width: +NaN,
            Height: +NaN,
            MinWidth: +0,
            MinHeight: +0,
            MaxWidth: +Infinity,
            MaxHeight: +Infinity,
            HorizontalAlignment: 3 | 0, //Fayde.HorizontalAlignment.Stretch
            VerticalAlignment: 3 | 0, //Fayde.VerticalAlignment.Stretch
            FlowDirection: 0 | 0, //Fayde.FlowDirection.LeftToRight
            PreviousConstraint: null,
            CoerceSize: function (s) {
                var spw = this.Width;
                var sph = this.Height;
                var cw = this.MinWidth;
                var ch = this.MinHeight;

                cw = Math.max(cw, s.Width);
                ch = Math.max(ch, s.Height);

                if (!isNaN(spw))
                    cw = spw;

                if (!isNaN(sph))
                    ch = sph;

                cw = Math.max(Math.min(cw, this.MaxWidth), this.MinWidth);
                ch = Math.max(Math.min(ch, this.MaxHeight), this.MinHeight);

                if (this.UseLayoutRounding) {
                    cw = Math.round(cw);
                    ch = Math.round(ch);
                }

                s.Width = cw;
                s.Height = ch;
                return s;
            }
        };
        return metrics;
    };
    Fayde.CreateUpdateMetrics = CreateUpdateMetrics;

    function CreateMeasurePass(fe, override) {
        /// <param name="fe" type="Fayde.FrameworkElement"></param>
        /// <param name="override" type="Function"></param>
        var pass = {
            IsContainer: fe.IsContainer(),
            IsLayoutContainer: fe.IsLayoutContainer(),
            VisualParent: fe._VisualParent,
            Error: undefined,
            Metrics: fe._UpdateMetrics,
            IsAttached: fe._IsAttached,
            Do: function () {
                var last = this.Metrics.PreviousConstraint;
                var parent = this.VisualParent;

                if (!this.IsAttached && !last && !parent && this.IsLayoutContainer) {
                    last = size.createInfinite();
                }

                if (last) {
                    var previousDesired = size.clone(fe._DesiredSize);
                    this.Measure(last);
                    if (size.isEqual(previousDesired, fe._DesiredSize))
                        return;
                }

                if (parent)
                    parent._InvalidateMeasure();

                fe._DirtyFlags &= ~_Dirty.Measure;
            },
            Measure: function (availableSize) {
                if (this.Error)
                    return;

                if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
                    this.Error = "Cannot call Measure using a size with NaN values";
                    Fayde.LayoutInformation.SetLayoutExceptionElement(fe);
                    return;
                }

                var metrics = this.Metrics;
                var last = metrics.PreviousConstraint;
                var shouldMeasure = (fe._DirtyFlags & _Dirty.Measure) > 0;
                shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

                if (metrics.Visibility !== Fayde.Visibility.Visible) {
                    metrics.PreviousConstraint = availableSize;
                    size.clear(fe._DesiredSize);
                    return;
                }

                var error = new BError();
                fe._ApplyTemplateWithError(error);
                this.Error = error.Message;

                if (!shouldMeasure)
                    return;

                metrics.PreviousConstraint = availableSize;

                fe._InvalidateArrange();
                fe._UpdateBounds();

                var margin = fe.Margin;
                var s = size.clone(availableSize);
                size.shrinkByThickness(s, margin);
                metrics.CoerceSize(s);

                s = override.call(fe, s, pass);

                if (this.Error)
                    return;

                fe._DirtyFlags &= ~_Dirty.Measure;
                fe._HiddenDesire = size.clone(s);

                var parent = this.VisualParent;
                if (!parent || parent instanceof Fayde.Controls.Canvas) {
                    if (fe instanceof Fayde.Controls.Canvas || !this.IsLayoutContainer) {
                        size.clear(fe._DesiredSize);
                        return;
                    }
                }

                metrics.CoerceSize(s);
                size.growByThickness(s, margin);
                size.min(s, availableSize);

                if (metrics.UseLayoutRounding) {
                    s.Width = Math.round(s.Width);
                    s.Height = Math.round(s.Height);
                }

                size.copyTo(s, fe._DesiredSize);
            }
        };
        return pass;
    };
    Fayde.CreateMeasurePass = CreateMeasurePass;
})(Fayde || (Fayde = {}));