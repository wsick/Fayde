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

namespace BaselineClient
{
    public partial class MainPage : UserControl
    {


        public int TestProperty
        {
            get { return (int)GetValue(TestPropertyProperty); }
            set { SetValue(TestPropertyProperty, value); }
        }

        public static readonly DependencyProperty TestPropertyProperty =
            DependencyProperty.Register("TestProperty", typeof(int), typeof(MainPage), new PropertyMetadata((d, args) => {
                d.ToString();
            }));



        public MainPage()
        {
            InitializeComponent();
            TestProperty = 1;
            TestProperty = 0;
            TestProperty = 0;
        }

        private void StackPanel_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {

        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {

        }
    }
}
