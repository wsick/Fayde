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
    public class TestClass
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public TestClass()
        {
            Name = "Brad";
            Age = 28;
        }
    }
}
