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
using System.Windows.Controls.Primitives;

namespace LitmusTests
{
    public class ScrollTestOverride : Control
    {
        public ScrollTestOverride()
        {
            DefaultStyleKey = typeof(ScrollTestOverride);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();
            var rb = GetTemplateChild("RawrButton") as Button;
            var h = rb.ActualHeight;
            var w = rb.ActualWidth;
        }
    }
}