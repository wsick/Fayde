using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests.Controls
{
    public class PanelMonitor : Panel
    {
        protected override Size MeasureOverride(Size availableSize)
        {
            return new Size();
        }
        protected override Size ArrangeOverride(Size finalSize)
        {
            return finalSize;
        }
    }
}
