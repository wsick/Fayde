using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public partial class ListBoxTest : UserControl
    {
        public ListBoxTest()
        {
            InitializeComponent();
            LayoutUpdated += ListBoxTest_LayoutUpdated;
        }

        private void ListBoxTest_LayoutUpdated(object sender, EventArgs e)
        {
            Debug.WriteLine("Walking");
            Walk(this);
        }

        private void Walk(DependencyObject cur, int tabLevel = 1)
        {
            for (var i = 0; i < VisualTreeHelper.GetChildrenCount(cur); i++)
            {
                var child = VisualTreeHelper.GetChild(cur, i);
                Debug.WriteLine(string.Join("\t", Enumerable.Range(0, tabLevel).Select(j => "")) + child.GetType().Name);
                Walk(child, tabLevel + 1);
            }
        }
    }
}
