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

namespace WickedSick.LitmusTests
{
    public partial class MainPage : UserControl
    {
        public MainPage()
        {
            InitializeComponent();
            LayoutUpdated += MainPage_LayoutUpdated;
        }

        void MainPage_LayoutUpdated(object sender, EventArgs e)
        {
            var cds = TestGrid.ColumnDefinitions.Select(cd => cd.ActualWidth).ToList();
        }
    }
}
