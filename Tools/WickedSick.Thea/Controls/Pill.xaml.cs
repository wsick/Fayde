using System.Windows;
using System.Windows.Controls;

namespace WickedSick.Thea.Controls
{
    public partial class Pill : UserControl
    {
        public Pill()
        {
            InitializeComponent();
            SizeChanged += (s, e) => MetricsChanged();
        }

        public static readonly DependencyProperty StartProperty = DependencyProperty.Register(
            "Start", typeof(int), typeof(Pill), new PropertyMetadata(0, (d, args) => (d as Pill).MetricsChanged()));

        public static readonly DependencyProperty LengthProperty = DependencyProperty.Register(
            "Length", typeof(int), typeof(Pill), new PropertyMetadata(0, (d, args) => (d as Pill).MetricsChanged()));

        public static readonly DependencyProperty TotalLengthProperty = DependencyProperty.Register(
            "TotalLength", typeof(int), typeof(Pill), new PropertyMetadata(0, (d, args) => (d as Pill).MetricsChanged()));

        public int Start
        {
            get { return (int)GetValue(StartProperty); }
            set { SetValue(StartProperty, value); }
        }
        
        public int Length
        {
            get { return (int)GetValue(LengthProperty); }
            set { SetValue(LengthProperty, value); }
        }

        public int TotalLength
        {
            get { return (int)GetValue(TotalLengthProperty); }
            set { SetValue(TotalLengthProperty, value); }
        }

        protected void MetricsChanged()
        {
            if (TotalLength == 0)
            {
                LayoutRoot.ColumnDefinitions[0].Width = new GridLength(0, GridUnitType.Pixel);
                LayoutRoot.ColumnDefinitions[2].Width = new GridLength(0, GridUnitType.Pixel);
            }
            else
            {
                LayoutRoot.ColumnDefinitions[0].Width = new GridLength((double)Start / (double)TotalLength * ActualWidth, GridUnitType.Pixel);
                LayoutRoot.ColumnDefinitions[2].Width = new GridLength(((double)TotalLength - (double)Start - (double)Length) / (double)TotalLength * ActualWidth, GridUnitType.Pixel);
            }
        }
    }
}