using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests.Tests
{
    public partial class ResourceTest : UserControl
    {
        public ResourceTest()
        {
            InitializeComponent();

            var brush = Resources["TheBrush"] as SolidColorBrush;
            brush.Color = Colors.Black;
            //Changes both borders

            (LeftBorder.Background as SolidColorBrush).Color = Colors.Blue;
            //Changes both borders

            var sb = new Storyboard();
            Storyboard.SetTarget(sb, LeftBorder);
            Storyboard.SetTargetProperty(sb, new PropertyPath("(Border.Background).(SolidColorBrush.Color)"));
            sb.Children.Add(new ColorAnimation
            {
                To = Colors.Cyan,
            });
            sb.Begin();
            //Changes only LeftBorder
        }
    }
}
