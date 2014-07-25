using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests.Tests
{
    public partial class ScrollBarTest : UserControl
    {
        public ScrollBarTest()
        {
            InitializeComponent();
            LayoutUpdated += ScrollBarTest_LayoutUpdated;
        }

        void ScrollBarTest_LayoutUpdated(object sender, EventArgs e)
        {
            if (VisualTreeHelper.GetChildrenCount(TheScrollBar) < 1)
                return;
            LayoutUpdated -= ScrollBarTest_LayoutUpdated;
            var child = VisualTreeHelper.GetChild(TheScrollBar, 0) as FrameworkElement;
            var thumb = child.FindName("VerticalThumb") as Thumb;
            thumb.MouseLeave += thumb_MouseLeave;
            thumb.MouseEnter += thumb_MouseEnter;
        }

        //These will occur like normal even if mouse is capture on the item

        void thumb_MouseEnter(object sender, MouseEventArgs e)
        {
            Debug.WriteLine("Mouse Enter");
        }

        private void thumb_MouseLeave(object sender, MouseEventArgs e)
        {
            Debug.WriteLine("Mouse Leave");
        }
    }
}
