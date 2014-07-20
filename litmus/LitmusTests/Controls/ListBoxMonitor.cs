using System;
using System.Diagnostics;
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
    public class ListBoxMonitor : ListBox
    {
        protected override Size MeasureOverride(Size availableSize)
        {
            Debug.WriteLine("MeasureOverride (ListBox): " + availableSize.ToString());
            return base.MeasureOverride(availableSize);
        }
    }
}