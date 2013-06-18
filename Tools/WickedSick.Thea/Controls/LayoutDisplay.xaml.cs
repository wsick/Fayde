using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.Controls
{
    public partial class LayoutDisplay : UserControl
    {
        public static readonly DependencyProperty LayoutMetricsProperty = DependencyProperty.Register(
            "LayoutMetrics", typeof(LayoutMetrics), typeof(LayoutDisplay), new PropertyMetadata(LayoutMetricsPropertyChanged));

        public LayoutMetrics LayoutMetrics
        {
            get { return (LayoutMetrics)GetValue(LayoutMetricsProperty); }
            set { SetValue(LayoutMetricsProperty, value); }
        }

        private static void LayoutMetricsPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs args)
        {
            (d as LayoutDisplay).Update(args.NewValue as LayoutMetrics);
        }

        private Point _Min;
        private Point _Max;

        public LayoutDisplay()
        {
            InitializeComponent();
        }

        private void UserControl_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            Fit();
        }

        protected void InitBackground()
        {
            var sx = Math.Floor(_Min.X / 100.0) * 100.0 - 100.0;
            var sy = Math.Floor(_Min.Y / 100.0) * 100.0 - 100.0;
            var ex = Math.Ceiling(_Max.X / 100.0) * 100.0 + 100.0;
            var ey = Math.Ceiling(_Max.Y / 100.0) * 100.0 + 100.0;

            for (var i = sx; i < ex; i += 100.0)
            {
                TheCanvas.Children.Add(CreateBackgroundLine(i, sy, i, ey));
            }
            for (var j = sy; j < ey; j += 100.0)
            {
                TheCanvas.Children.Add(CreateBackgroundLine(sx, j, ex, j));
            }
        }
        protected Line CreateBackgroundLine(double x1, double y1, double x2, double y2)
        {
            var line = new Line
            {
                X1 = x1,
                X2 = x2,
                Y1 = y1,
                Y2 = y2,
            };
            line.StrokeThickness = 1.0;
            line.Stroke = new SolidColorBrush(Colors.Gray);
            line.StrokeDashArray = new DoubleCollection(new[] { 5.0, 5.0 });
            return line;
        }

        protected void Update(LayoutMetrics metrics)
        {
            if (metrics == null)
                return;
            try
            {
                TheCanvas.Children.Clear();

                _Min = new Point(metrics.VisualOffset.X, metrics.VisualOffset.Y);
                _Max = new Point(_Min.X + (metrics.ActualWidth ?? 0.0), _Min.Y + (metrics.ActualHeight ?? 0.0));

                var actualr = new Rectangle { Width = (metrics.ActualWidth ?? 0.0), Height = (metrics.ActualHeight ?? 0.0) };
                Canvas.SetLeft(actualr, metrics.VisualOffset.X);
                Canvas.SetTop(actualr, metrics.VisualOffset.Y);
                var ax = metrics.AbsoluteXform;
                actualr.RenderTransform = new MatrixTransform(ax[0], ax[1], ax[3], ax[4], ax[2], ax[5]);
                actualr.Stroke = new SolidColorBrush(Colors.Black);
                actualr.StrokeThickness = 2;
                TheCanvas.Children.Add(actualr);
            }
            catch (Exception)
            {
            }

            InitBackground();

            Fit();
        }
        protected void Fit()
        {
            try
            {
                var px = 10.0;
                var py = 10.0;

                var avail = new Size(Math.Max(0.0, ActualWidth - px * 2), Math.Max(0.0, ActualHeight - py * 2));
                var view = new Rect(_Min.X, _Min.Y, _Max.X - _Min.X, _Max.Y - _Min.Y);

                var x = new TransformGroup();
                x.Children.Add(new TranslateTransform(-view.X, -view.Y));
                if (view.Width > 0 && view.Height > 0)
                    x.Children.Add(new ScaleTransform(1 / view.Width, 1 / view.Height));
                x.Children.Add(new ScaleTransform(avail.Width, avail.Height));
                x.Children.Add(new TranslateTransform(view.X, view.Y));
                TheCanvas.LayoutTransform = x;

                TheCanvas.RenderTransform = new TranslateTransform(px, py);
            }
            catch (Exception)
            {
            }
        }
    }
}