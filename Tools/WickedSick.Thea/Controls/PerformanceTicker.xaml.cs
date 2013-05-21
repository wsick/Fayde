using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using System.Windows.Shapes;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.Controls
{
    public partial class PerformanceTicker : UserControl
    {
        public static readonly DependencyProperty DataProperty = DependencyProperty.Register(
            "Data", typeof(ObservableCollection<FrameInfo>), typeof(PerformanceTicker), new PropertyMetadata(DataPropertyChanged));

        public ObservableCollection<FrameInfo> Data
        {
            get { return (ObservableCollection<FrameInfo>)GetValue(DataProperty); }
            set { SetValue(DataProperty, value); }
        }

        private static void DataPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs args)
        {
            var pt = d as PerformanceTicker;
            pt.DetachData(args.OldValue as ObservableCollection<FrameInfo>);
            pt.AttachData(args.NewValue as ObservableCollection<FrameInfo>);
        }

        private Path _Path = new Path();
        private PathGeometry _PathGeom = new PathGeometry();
        private Point _EndPoint = new Point(0.0, 1.0);
        private static readonly double SEPARATION_CONSTANT = 1.0 / 100.0;
        private static readonly double MAX_FPS = 60.0;

        private TranslateTransform _ChartScrollBarTransform = new TranslateTransform(0.0, 0.0);

        public PerformanceTicker()
        {
            InitializeComponent();
            _Path.Data = _PathGeom;
            _Path.Stroke = new SolidColorBrush(Colors.ForestGreen);
            _Path.StrokeThickness = 1.0;
            ChartCanvas.Children.Add(_Path);

            ChartCanvas.RenderTransform = _ChartScrollBarTransform;

            ChartScrollBar.Minimum = 0.0;
            ChartScrollBar.SmallChange = 1.0 * SEPARATION_CONSTANT;
            ChartScrollBar.LargeChange = ChartScrollBar.SmallChange * 10;
            ChartScrollBar.ValueChanged += ChartScrollBar_ValueChanged;
        }

        protected void AttachData(ObservableCollection<FrameInfo> data)
        {
            if (data == null)
                return;
            data.CollectionChanged += data_CollectionChanged;
        }
        protected void DetachData(ObservableCollection<FrameInfo> data)
        {
            if (data == null)
                return;
            data.CollectionChanged -= data_CollectionChanged;
        }
        private void data_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
        {
            switch (e.Action)
            {
                case System.Collections.Specialized.NotifyCollectionChangedAction.Add:
                    AddFrameInfo(e.NewItems[0] as FrameInfo);
                    break;
                case System.Collections.Specialized.NotifyCollectionChangedAction.Reset:
                    _EndPoint.X = 0.0;
                    _PathGeom.Figures.Clear();
                    break;
            }
        }
        private void AddFrameInfo(FrameInfo newfi)
        {
            if (newfi.TimeDiff <= 0)
                return;
            var newEndPoint = _EndPoint;
            newEndPoint.X += newfi.TimeDiff;
            var ts = TimeSpan.FromMilliseconds(newfi.TimeDiff);
            newEndPoint.Y = Math.Min(MAX_FPS, newfi.NumFrames / ts.TotalSeconds) / MAX_FPS;
            _PathGeom.Figures.Add(new PathFigure(_EndPoint, new[] { new LineSegment(newEndPoint, true) }, false));
            _EndPoint = newEndPoint;
            UpdateScrollBar();
        }

        private void ChartCanvas_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            _PathGeom.Transform = new TransformGroup
            {
                Children = new TransformCollection
                {
                    new ScaleTransform(SEPARATION_CONSTANT, ChartCanvas.ActualHeight),
                    new ScaleTransform(1.0, -1.0),
                    new TranslateTransform(0.0, ChartCanvas.ActualHeight),
                }
            };
            UpdateScrollBar();
        }
        protected void UpdateScrollBar()
        {
            var isAtMax = ChartScrollBar.Value == ChartScrollBar.Maximum;
            var actualEndPoint = _PathGeom.Transform.Transform(_EndPoint);
            ChartScrollBar.Maximum = Math.Max(0.0, actualEndPoint.X - ChartCanvas.ActualWidth);
            if (isAtMax)
                ChartScrollBar.Value = ChartScrollBar.Maximum;
        }
        private void ChartScrollBar_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            _ChartScrollBarTransform.X = -ChartScrollBar.Value;
        }
    }
}